/**
 * Google Apps Script for Code Hunt Registration
 * 
 * FOLDER_ID for Google Drive
 */
const FOLDER_ID = "1WvJNle3C5WPfqIMK1RCwVvCtW3vUW4T6"; 

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return ContentService.createTextOutput(JSON.stringify({ status: "error", message: "No data received" }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    const data = JSON.parse(e.postData.contents);
    
    // 1. Try Saving Image to Google Drive
    let fileUrl = "No image uploaded";
    if (data.paymentImageBase64) {
      try {
        const folder = DriveApp.getFolderById(FOLDER_ID);
        let ext = "png";
        if (data.mimeType && (data.mimeType.includes("jpeg") || data.mimeType.includes("jpg"))) {
          ext = "jpg";
        }
        
        const safeTeamName = (data.teamName || "Team").replace(/[^a-zA-Z0-9]/g, "_");
        const blob = Utilities.newBlob(
          Utilities.base64Decode(data.paymentImageBase64), 
          data.mimeType || "image/png", 
          `${safeTeamName}_Payment_${Date.now()}.${ext}`
        );
        
        const file = folder.createFile(blob);
        file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
        fileUrl = file.getUrl();
      } catch (driveErr) {
        fileUrl = "Drive Error: " + driveErr.toString();
      }
    }

    // 2. Append Row to Active Google Sheet
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getActiveSheet();
    
    // If sheet is empty, add headers automatically
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Timestamp", "Registration Email", "Team Name", "College Name",
        "Leader Name", "Leader Dept", "Leader Year", "Leader Phone", "Leader Email",
        "Member 1 Name", "Member 1 Dept", "Member 1 Year", "Member 1 Phone", "Member 1 Email",
        "Member 2 Name", "Member 2 Dept", "Member 2 Year", "Member 2 Phone", "Member 2 Email",
        "Member 3 Name", "Member 3 Dept", "Member 3 Year", "Member 3 Phone", "Member 3 Email",
        "Payment Proof Link"
      ]);
    }

    sheet.appendRow([
      new Date(),
      data.generalEmail || "",
      data.teamName || "",
      data.collegeName || "",
      data.leaderName || "",
      data.leaderDept || "",
      data.leaderYear || "",
      data.leaderPhone || "",
      data.leaderEmail || "",
      data.m1Name || "",
      data.m1Dept || "",
      data.m1Year || "",
      data.m1Phone || "",
      data.m1Email || "",
      data.m2Name || "",
      data.m2Dept || "",
      data.m2Year || "",
      data.m2Phone || "",
      data.m2Email || "",
      data.m3Name || "",
      data.m3Dept || "",
      data.m3Year || "",
      data.m3Phone || "",
      data.m3Email || "",
      fileUrl
    ]);

    return ContentService.createTextOutput(JSON.stringify({ status: "success", fileUrl: fileUrl }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Function to test permissions and sheet writing directly inside Apps Script editor
function testScript() {
  const dummyEvent = {
    postData: {
      contents: JSON.stringify({
        generalEmail: "test@example.com",
        teamName: "Test Team Alpha",
        collegeName: "AIEMS Test",
        leaderName: "John Doe",
        leaderDept: "Computer Science",
        leaderYear: "3rd Year",
        leaderPhone: "9876543210",
        leaderEmail: "leader@example.com",
        m1Name: "Jane Smith",
        m1Dept: "Information Science",
        m1Year: "3rd Year",
        m1Phone: "9876543211",
        m1Email: "member1@example.com",
        m2Name: "",
        m2Dept: "",
        m2Year: "",
        m2Phone: "",
        m2Email: "",
        m3Name: "",
        m3Dept: "",
        m3Year: "",
        m3Phone: "",
        m3Email: "",
        paymentImageBase64: "", // Empty for quick test
        paymentFileName: "",
        mimeType: ""
      })
    }
  };
  
  const result = doPost(dummyEvent);
  Logger.log("Result: " + result.getContent());
}

function doGet(e) {
  return ContentService.createTextOutput("CodeHunt 3.0 Registration Endpoint is Live!")
    .setMimeType(ContentService.MimeType.TEXT);
}
