const { google } = require("googleapis");

const SCOPES = ["https://www.googleapis.com/auth/drive.file"];

// Env variable ko safely parse karo
const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT || '{}');

// Check karo agar env variable missing ya invalid ho
if (!credentials || !credentials.client_email) {
  throw new Error(
    "❌ GOOGLE_SERVICE_ACCOUNT env variable is missing or invalid. Please check your .env or Render environment variables."
  );
}

// Google Auth setup
const auth = new google.auth.GoogleAuth({
  credentials, // credentials object ab sahi hai
  scopes: SCOPES,
});

// Google Drive client
const drive = google.drive({ version: "v3", auth });

module.exports = drive;
