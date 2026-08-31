/**
 * Google Apps Script for Code Hunt Registration
 * 
 * SETUP INSTRUCTIONS:
 * 1. Create a new Google Sheet.
 * 2. Add these headers to the first row (A1 to W1):
 *    Timestamp, General Email, Team Name, College, 
 *    Leader Name, Leader Dept, Leader Year, Leader Phone, Leader Email,
 *    Member 1 Name, Member 1 Dept, Member 1 Year, Member 1 Phone, Member 1 Email,
 *    Member 2 Name, Member 2 Dept, Member 2 Year, Member 2 Phone, Member 2 Email,
 *    Member 3 Name, Member 3 Dept, Member 3 Year, Member 3 Phone, Member 3 Email,
 *    Payment Proof URL
 * 3. Create a folder in your Google Drive named "Code Hunt Payments" and get its Folder ID from the URL (e.g., the string after /folders/).
 * 4. Go to Extensions > Apps Script in your Google Sheet.
 * 5. Paste this code, replacing `YOUR_FOLDER_ID_HERE` with your actual Folder ID.
 * 6. Click Deploy > New Deployment.
 * 7. Select type: Web App.
 * 8. Execute as: Me. Who has access: Anyone.
 * 9. Click Deploy and copy the resulting Web App URL. Paste it in `RegistrationForm.tsx`.
 */

const FOLDER_ID = "YOUR_FOLDER_ID_HERE"; 

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    
    // Save image to Drive
    let fileUrl = "";
    if (data.paymentImageBase64) {
      const folder = DriveApp.getFolderById(FOLDER_ID);
      // Determine file extension
      let ext = "png";
      if (data.mimeType && data.mimeType.includes("jpeg")) ext = "jpg";
      
      const blob = Utilities.newBlob(
        Utilities.base64Decode(data.paymentImageBase64), 
        data.mimeType || "image/png", 
        `${data.teamName.replace(/[^a-zA-Z0-9]/g, "_")}_Payment.${ext}`
      );
      
      const file = folder.createFile(blob);
      fileUrl = file.getUrl();
    }

    // Append to sheet
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    sheet.appendRow([
      new Date(),
      data.generalEmail,
      data.teamName,
      data.collegeName,
      data.leaderName,
      data.leaderDept,
      data.leaderYear,
      data.leaderPhone,
      data.leaderEmail,
      data.m1Name,
      data.m1Dept,
      data.m1Year,
      data.m1Phone,
      data.m1Email,
      data.m2Name,
      data.m2Dept,
      data.m2Year,
      data.m2Phone,
      data.m2Email,
      data.m3Name,
      data.m3Dept,
      data.m3Year,
      data.m3Phone,
      data.m3Email,
      fileUrl
    ]);

    return ContentService.createTextOutput(JSON.stringify({ status: "success" }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Required to handle CORS preflight requests
function doOptions(e) {
  return ContentService.createTextOutput("")
    .setMimeType(ContentService.MimeType.TEXT);
}
