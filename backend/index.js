const express = require('express');
const path = require('path');
const cors = require('cors');
const connectDB = require('./config/db');

require('dotenv').config();

connectDB();

const mainRouter = require('./routes/main.router');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = 4000;

app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'http://localhost:5500',
      'http://localhost:13230',
      'https://sandboxexpressmanager.tutormandarin.net',
    ],
  })
);
// app.use(express.static(path.join(__dirname, '..', 'views')));
app.use('/api', mainRouter);

app.use(express.static(path.join(__dirname, '../frontend/dist')));
app.get('*', (req, res) =>
  res.sendFile(path.resolve(__dirname, '../', 'frontend', 'dist', 'index.html'))
);

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}...`);
});
