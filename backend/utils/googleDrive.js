const { google } = require("googleapis");
const path = require("path");

const KEYFILEPATH = path.join(__dirname, "service-account.json"); // service account JSON
const SCOPES = ["https://www.googleapis.com/auth/drive.file"];

const auth = new google.auth.GoogleAuth({
  keyFile: KEYFILEPATH,
  scopes: SCOPES,
});

const drive = google.drive({ version: "v3", auth });

module.exports = drive;
