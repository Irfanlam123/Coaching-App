const { google } = require("googleapis");
const path = require("path");
const fs = require("fs");

// Google Drive folder ID
const FOLDER_ID = "16ObQgGBcQ7OEV1gaRCBtiPmcZAxo4Vwm";

let auth;

try {
  if (process.env.GOOGLE_SERVICE_ACCOUNT) {
    // Production: use environment variable
    console.log("🔑 Using environment variable for Google Auth");
    const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT);
    auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ["https://www.googleapis.com/auth/drive"],
    });
  } else {
    // Development: use local JSON file
    console.log("📁 Using local file for Google Auth");
    const KEYFILE_PATH = path.join(__dirname, "service-account-key.json");
    auth = new google.auth.GoogleAuth({
      keyFile: KEYFILE_PATH,
      scopes: ["https://www.googleapis.com/auth/drive"],
    });
  }
} catch (error) {
  console.error("❌ Error setting up Google Auth:", error.message);
  auth = null;
}

const drive = auth ? google.drive({ version: "v3", auth }) : null;

// Test authentication
if (auth) {
  auth.getClient()
    .then(() => console.log("✅ Google Drive authentication successful"))
    .catch((err) => console.error("❌ Google Drive authentication failed:", err.message));
} else {
  console.warn("⚠️ Google Auth not configured - file uploads will not work");
}

// Function to upload file
async function uploadFile(filePath, fileName) {
  if (!drive) {
    throw new Error("Google Drive is not configured");
  }

  const fileMetadata = {
    name: fileName,
    parents: [FOLDER_ID],
  };

  const media = {
    mimeType: "application/octet-stream",
    body: fs.createReadStream(filePath),
  };

  try {
    const response = await drive.files.create({
      resource: fileMetadata,
      media: media,
      fields: "id, name",
    });
    console.log(`✅ File uploaded: ${response.data.name} (ID: ${response.data.id})`);
    return response.data;
  } catch (error) {
    console.error("❌ Upload failed:", error.message);
    throw error;
  }
}

// Example usage:
// uploadFile("./test.txt", "test.txt");

module.exports = { drive, FOLDER_ID, uploadFile };
