const { google } = require('googleapis');

const Token = require('../models/TokenModel');
const CalendarEvent = require('../models/EventModel');

let oauth2Client = new google.auth.OAuth2(
  process.env.Google_Client_ID,
  process.env.Google_Client_SECRET,
  process.env.Google_REDIRECT_URI
);

function get(req, res, next) {
  res.send('Server is working!');
}

async function gotoLogin(req, res) {
  // Generate the authorization URL with the required parameters
  let authUrl = oauth2Client.generateAuthUrl({
    scope: [
      'https://www.googleapis.com/auth/calendar.events',
      'openid',
      'profile',
    ], // Add additional scopes as needed
    access_type: 'offline',
    prompt: 'consent',
  });

  res.json({ authUrl });
}

function notFound(req, res) {
  res.render('notFound');
}

function handleAllRoutes(req, res) {
  // console.log()
  //  res.redirect('/notFound')
  res.render('notFound');
}

function success(req, res) {
  if (!req.query.clientUrl) {
    return res.redirect('/api/notFound');
  }
  const data = {
    url: req.query.clientUrl,
  };
  res.render('success', { data });
}

function error(req, res) {
  if (!req.query.clientUrl) {
    return res.redirect('/api/notFound');
  }
  const data = {
    url: req.query.clientUrl,
    msg: req.query?.msg,
  };
  res.render('error', { data });
}

function goToMeetings(req, res) {
  res.render('meetings');
}

function policy(req, res) {
  res.render('privacyPolicy');
}

function home(req, res) {
  res.render('home');
}

function decodeIdToken(idToken) {
  const base64Url = idToken.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(atob(base64));
  return JSON.parse(jsonPayload);
}

async function createTokens(req, res, next) {
  try {
    // Retrieve and parse the state parameter
    // const state = JSON.parse(callbackState);
    console.log(req.query);
    const { code } = req.query;

    oauth2Client.getToken(code, async (err, tokens) => {
      if (err) {
        // Handle the error
        console.error('Error getting tokens:', err);
        res.redirect('/api/error');
        return;
      }

      const decodedToken = decodeIdToken(tokens.id_token);
      console.log(tokens, decodedToken);
      if (tokens.refresh_token) {
        const tokenDoc = await Token.findOne({ googleId: decodedToken.sub });
        //
        if (tokenDoc) {
          tokenDoc.token = tokens.refresh_token;
          await tokenDoc.save();
        } else {
          await Token.create({
            googleId: decodedToken.sub,
            token: tokens.refresh_token,
            name: decodedToken.name,
            pic: decodedToken.picture,
          });
        }
        res.redirect(`${process.env.FRONTEND_URL}?id=${decodedToken.sub}`);
      } else {
        const errorMsg = 'no refresh token in tokens, needs revoke';
        console.log(errorMsg);
        res.redirect(`/api/error?&msg=${encodeURIComponent(errorMsg)}`);
      }
    });
  } catch (e) {
    console.log(e);
  }
}

async function createGoogleMeeting(req, res, next) {
  try {
    const { googleId, event } = req.body;
    console.log(req.body);
    if (!googleId) {
      console.log('need googleId');
      return res.status(400).send('Bad Request.Need googleId parameter');
    }

    let tokenData = await Token.findOne({ googleId });
    console.log(googleId, event, tokenData);
    if (!tokenData?.token) {
      console.log('no token in db');
      return res.status(400).send('Bad Request.googleId is invalid');
    }

    oauth2Client.setCredentials({ refresh_token: tokenData.token });
    const calendar = google.calendar('v3');
    const response = await calendar.events.insert({
      conferenceDataVersion: 1,
      calendarId: 'primary',
      auth: oauth2Client,
      requestBody: event,
    });
    const { id, start, end, hangoutLink, summary, creator } = response.data;
    const docCreated = await CalendarEvent.create({
      id,
      googleId,
      hangoutLink,
      summary,
      start: start.dateTime,
      end: end.dateTime,
      creator: creator.email,
      attendees: event.attendees,
    });

    console.log(docCreated);
    res.status(200).send(docCreated);
  } catch (e) {
    if (e?.response?.data?.error === 'invalid_grant') {
      res.status(403).json({ error: 'invalid_grant' });
    }
  }
}

async function getAllGoogleMeetings(req, res, next) {
  try {
    const { googleId } = req.params;
    if (!googleId) {
      console.log('need googleId');
      return res.status(400).send('Bad Request.Need googleId parameter');
    }
    const doc = await CalendarEvent.find({ googleId });
    res.json(doc);
  } catch (e) {
    if (e?.response?.data?.error === 'invalid_grant') {
      res.status(403).json({ error: 'invalid_grant' });
    }
  }
}

async function deleteGoogleMeeting(req, res, next) {
  try {
    const { googleId, meetingId } = req.params;
    if (!googleId) {
      console.log('need googleId');
      return res.status(400).send('Bad Request.Need googleId parameter');
    }
    if (!meetingId) {
      console.log('need meetingId');
      return res.status(400).send('Bad Request.Need meetingId parameter');
    }
    const doc = await CalendarEvent.deleteOne({ googleId, id: meetingId });
    res.json(doc);
  } catch (e) {
    if (e?.response?.data?.error === 'invalid_grant') {
      res.status(403).json({ error: 'invalid_grant' });
    }
  }
}

async function requestToken(req, res) {
  try {
    if (!req.query.googleId) {
      return res.status(400).send('Bad request');
    }
    let googleId = req.query.googleId;
    let doc = await Token.findOne({ googleId });
    if (doc?.token)
      return res.status(200).json({
        googleId: doc?.googleId,
        name: doc?.name,
        pic: doc?.pic,
        token: true,
      });
    res.status(200).json({ token: false });
  } catch {
    res.status(400).send('Something went wrong!');
    console.log('fail requesting token');
  }
}

// async function revokeTokens(req, res) {
//   try {
//     if (!req.query.accId) {
//       return res.status(400).send('Bad request');
//     }
//     let accId = req.query.accId;
//     let resText = await revokeMongo(accId, oauth2Client);
//     if (resText === 'success') {
//       console.log('successs revoke 200');
//       return res.status(200).send('Revoked token successfully');
//     }
//     console.log('fail revoke 400', resText);
//     return res.status(400).send(resText);
//   } catch {
//     console.log('fail requesting token');
//     return res.send('Something went wrong!');
//   }
// }

module.exports = {
  get,
  gotoLogin,
  createTokens,
  home,
  success,
  error,
  policy,
  createGoogleMeeting,
  deleteGoogleMeeting,
  notFound,
  handleAllRoutes,
  requestToken,
  goToMeetings,
  getAllGoogleMeetings,
  // revokeTokens,
};
