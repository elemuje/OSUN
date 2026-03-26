// ============================================================
// RTIFN OSUN — MEMBERSHIP REGISTRATION FORM SCRIPT
// Google Sheet: https://docs.google.com/spreadsheets/d/1E1RWn9sZ0DePNvo41AOVgS7ueved_fsgKDqcegFrs04
// ============================================================
// HOW TO DEPLOY:
// 1. Go to script.google.com → New Project
// 2. Delete all existing code
// 3. Paste this entire script
// 4. Click Deploy → New deployment → Web app
//    - Execute as: Me
//    - Who has access: Anyone
// 5. Click Deploy → Copy the Web App URL
// 6. Send the URL to Claude to update the website
// ============================================================

function doPost(e) {
  try {
    var params = e.parameter;

    var sheet = SpreadsheetApp
      .openById('1E1RWn9sZ0DePNvo41AOVgS7ueved_fsgKDqcegFrs04')
      .getSheetByName('Form Responses 1');

    // If sheet not found, use the first sheet
    if (!sheet) {
      sheet = SpreadsheetApp
        .openById('1E1RWn9sZ0DePNvo41AOVgS7ueved_fsgKDqcegFrs04')
        .getSheets()[0];
    }

    // Add headers if sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'Timestamp',
        'Full Name',
        'Local Government',
        'Ward',
        'Phone Number',
        'Email Address',
        'Occupation'
      ]);
    }

    // Append the new registration
    sheet.appendRow([
      new Date().toLocaleString('en-NG', { timeZone: 'Africa/Lagos' }),
      params.fullName   || '',
      params.lga        || '',
      params.ward       || '',
      params.phone      || '',
      params.email      || '',
      params.occupation || ''
    ]);

    // Return success response with CORS headers
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'success', message: 'Registration received!' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Test endpoint — visit the Web App URL in browser to confirm it's live
function doGet(e) {
  return ContentService
    .createTextOutput('✅ RTIFN Osun Membership Form endpoint is live!')
    .setMimeType(ContentService.MimeType.TEXT);
}
