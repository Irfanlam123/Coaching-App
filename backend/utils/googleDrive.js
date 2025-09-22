const { google } = require("googleapis");

const SCOPES = ["https://www.googleapis.com/auth/drive.file"];

let credentials;

try {
  credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT);
  
  // Fix private_key newlines
  credentials.private_key = credentials.private_key.replace(/\\n/g, "\n");
} catch (err) {
  throw new Error("❌ GOOGLE_SERVICE_ACCOUNT env variable is not valid JSON.");
}

if (!credentials.client_email || !credentials.private_key) {
  throw new Error("❌ GOOGLE_SERVICE_ACCOUNT env variable is missing required fields.");
}

const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: SCOPES,
});

const drive = google.drive({ version: "v3", auth });

module.exports = drive;
