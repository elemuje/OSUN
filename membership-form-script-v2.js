// ============================================================
// RTIFN OSUN — MEMBERSHIP REGISTRATION FORM SCRIPT (v2)
// Google Sheet ID: 1E1RWn9sZ0DePNvo41AOVgS7ueved_fsgKDqcegFrs04
// ============================================================
// IMPORTANT: Redeploy this updated version as a NEW deployment
// after pasting — use the new URL it gives you
// ============================================================

function doGet(e) {
  try {
    var params = e.parameter;

    // If parameters are present, save the registration
    if (params.fullName || params.phone) {

      var sheet = SpreadsheetApp
        .openById('1E1RWn9sZ0DePNvo41AOVgS7ueved_fsgKDqcegFrs04')
        .getSheets()[0];

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

      // Append the registration row
      sheet.appendRow([
        new Date().toLocaleString('en-NG', { timeZone: 'Africa/Lagos' }),
        params.fullName   || '',
        params.lga        || '',
        params.ward       || '',
        params.phone      || '',
        params.email      || '',
        params.occupation || ''
      ]);

      // Return success with CORS headers
      return ContentService
        .createTextOutput(JSON.stringify({ status: 'success', message: 'Registration saved!' }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // No params — just a health check
    return ContentService
      .createTextOutput('✅ RTIFN Osun Membership Form endpoint is live!')
      .setMimeType(ContentService.MimeType.TEXT);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doPost(e) {
  // Also handle POST just in case
  return doGet(e);
}
