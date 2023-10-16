export interface CalendarEvent {
  summary: string;
  start: {
    dateTime: string;
    timeZone: string;
  };
  end: {
    dateTime: string;
    timeZone: string;
  };
  attendees: string[];
  conferenceData: {
    createRequest: {
      requestId: string;
    };
  };
}

export interface CalendarEventMongo {
  id: string;
  googleId: string;
  hangoutLink: string;
  summary: string;
  start: string;
  end: string;
  creator: string;
  attendees: string[];
}
