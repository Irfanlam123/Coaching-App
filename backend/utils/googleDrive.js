const { google } = require("googleapis");

const SCOPES = ["https://www.googleapis.com/auth/drive.file"];

// env me string hai → JSON.parse karke object banana hoga
const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT);

const auth = new google.auth.GoogleAuth({
  credentials,  // yaha credentials object aa gya
  scopes: SCOPES,
});

const drive = google.drive({ version: "v3", auth });

module.exports = drive;
