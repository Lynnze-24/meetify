const mongoose = require('mongoose');

const calendarEventSchema = new mongoose.Schema(
  {
    googleId: {
      type: String,
      require: [true, 'GoogleId Required!'],
    },
    id: {
      type: String,
      require: [true, 'GoogleId Required!'],
    },
    summary: {
      type: String,
      require: [true, 'Required name!'],
    },
    start: {
      type: String,
      require: [true, 'Required name!'],
    },
    end: {
      type: String,
      require: [true, 'Required pic!'],
    },
    hangoutLink: {
      type: String,
      require: [true, 'Required pic!'],
    },
    creator: {
      type: String,
      require: [true, 'Required pic!'],
    },
    attendees: {
      type: Array,
      require: [true, 'Required pic!'],
    },
  },
  {
    timestamps: true,
  }
);

const CalendarEvent = mongoose.model('calendarEvent', calendarEventSchema);

module.exports = CalendarEvent;
