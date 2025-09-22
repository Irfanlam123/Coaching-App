const { google } = require("googleapis");
const path = require("path");

// Google Drive folder ID
const FOLDER_ID = "1WkIzT_rPHlqTtv-m9bzITCvd2Le2sPFt";

let auth;

try {
  if (process.env.GOOGLE_SERVICE_ACCOUNT) {
    // Use environment variable (for production - Render)
    console.log("🔑 Using environment variable for Google Auth");
    const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT);
    auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ["https://www.googleapis.com/auth/drive"],
    });
  } else {
    // Use local file (for development)
    console.log("📁 Using local file for Google Auth");
    const KEYFILE_PATH = path.join(__dirname, 'service-account-key.json');
    auth = new google.auth.GoogleAuth({
      keyFile: KEYFILE_PATH,
      scopes: ["https://www.googleapis.com/auth/drive"],
    });
  }
} catch (error) {
  console.error("❌ Error setting up Google Auth:", error.message);
  // Don't crash the app, but log the error
  auth = null;
}

const drive = auth ? google.drive({ version: "v3", auth }) : null;

// Test authentication
if (auth) {
  auth.getClient()
    .then(() => {
      console.log("✅ Google Drive authentication successful");
    })
    .catch((err) => {
      console.error("❌ Google Drive authentication failed:", err.message);
    });
} else {
  console.warn("⚠️ Google Auth not configured - file uploads will not work");
}

module.exports = { drive, FOLDER_ID };