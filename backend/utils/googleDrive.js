const { google } = require("googleapis");

const SCOPES = ["https://www.googleapis.com/auth/drive"];

let credentials;

try {
  // Parse GOOGLE_SERVICE_ACCOUNT from env
  credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT);
  
  // Fix private_key newlines for OpenSSL
  if (credentials.private_key) {
    credentials.private_key = credentials.private_key.replace(/\\n/g, "\n");
  }
} catch (err) {
  console.error("❌ GOOGLE_SERVICE_ACCOUNT env variable is not valid JSON:", err);
  throw new Error("GOOGLE_SERVICE_ACCOUNT env variable is not valid JSON.");
}

// Google Auth
const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: SCOPES,
});

const drive = google.drive({ version: "v3", auth });

module.exports = drive;