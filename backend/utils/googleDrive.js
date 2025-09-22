const { google } = require("googleapis");
const path = require("path");

// Google Drive folder ID
const FOLDER_ID = "1WkIzT_rPHlqTtv-m9bzITCvd2Le2sPFt";

// Path to your service account key file
const KEYFILE_PATH = path.join(__dirname, '../service-account-key.json');

// Google Auth using key file
const auth = new google.auth.GoogleAuth({
  keyFile: KEYFILE_PATH,
  scopes: ["https://www.googleapis.com/auth/drive"],
});

const drive = google.drive({ version: "v3", auth });

// Test authentication
auth.getClient()
  .then(() => {
    console.log("✅ Google Drive authentication successful");
  })
  .catch((err) => {
    console.error("❌ Google Drive authentication failed:", err);
  });

module.exports = { drive, FOLDER_ID };