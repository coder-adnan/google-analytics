// lib/google.js
import { google } from "googleapis";

export const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID, // Replace with your client ID
  process.env.GOOGLE_CLIENT_SECRET, // Replace with your client secret
  process.env.GOOGLE_REDIRECT_URI // Replace with your redirect URI
);

export const analytics = google.analyticsreporting("v4");
