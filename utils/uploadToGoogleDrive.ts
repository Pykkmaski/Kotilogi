import { google } from 'googleapis';
const stream = require('stream');

const auth = new google.auth.GoogleAuth({
  keyFile: './kotidok-service-credentials.json', // Ensure this file exists and is configured
  scopes: ['https://www.googleapis.com/auth/drive'],
});

// Utility function to upload a file buffer to Google Drive
export async function uploadToGoogleDrive(buffer: Buffer, fileName: string, mimeType: string) {
  const drive = google.drive({ version: 'v3', auth });
  //const parentFolderId = '1AqenT6wfN0AkIoKy07M4JcgLZIlG4iyc'; // ID of the parent folder in Google Drive
  const fileMetadata = {
    name: fileName,
    parents: ['root'], // Destination folder ID in Google Drive
  };

  const bufferStream = new stream.PassThrough();
  bufferStream.end(buffer);

  const media = {
    mimeType,
    body: bufferStream,
  };

  const response = await drive.files.create({
    requestBody: fileMetadata,
    media: media,
    fields: 'id',
  });

  return response.data.id;
}
