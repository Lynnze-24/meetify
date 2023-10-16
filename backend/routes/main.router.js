const express = require('express');

const mainController = require('../controllers/main.controller');

const mainRouter = express.Router();

// mainRouter.get('/', mainController.get);
mainRouter.get('/authorize', mainController.gotoLogin);
mainRouter.get('/token', mainController.requestToken);
mainRouter.get('/meetings', mainController.goToMeetings);
mainRouter.get('/oauth2callback', mainController.createTokens);
mainRouter.get('/home', mainController.home);
mainRouter.post('/calendar', mainController.createGoogleMeeting);
mainRouter.get('/calendar/:googleId', mainController.getAllGoogleMeetings);
mainRouter.delete(
  '/calendar/:googleId/meeting/:meetingId',
  mainController.deleteGoogleMeeting
);
module.exports = mainRouter;
