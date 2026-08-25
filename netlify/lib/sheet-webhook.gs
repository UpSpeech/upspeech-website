/**
 * Google Apps Script for the early-access leads spreadsheet.
 *
 * Setup, once:
 *   1. Create the spreadsheet that will hold the leads.
 *   2. Extensions > Apps Script, replace Code.gs with this file, save.
 *   3. Project Settings > Script properties > Add: SHEET_SECRET = <a long random string>.
 *   4. Deploy > New deployment > Web app.
 *      Execute as: Me.  Who has access: Anyone.
 *   5. Copy the /exec URL.
 *   6. In Netlify > Site configuration > Environment variables set
 *      SHEETS_WEBHOOK_URL = the /exec URL
 *      SHEETS_WEBHOOK_SECRET = the same string as SHEET_SECRET.
 *
 * Editing this script later needs Deploy > Manage deployments > Edit > Version:
 * New version. Saving alone does not change what the /exec URL runs.
 *
 * "Who has access: Anyone" makes the URL world-postable, which is why every
 * request has to carry the shared secret.
 */

var HEADERS = [
  "Submitted at",
  "Name",
  "Email",
  "Role",
  "Clinic size",
  "Language",
  "Status",
  "Notes",
];

function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    // Two people submitting at once would otherwise race for the same row.
    lock.waitLock(10000);

    var body = JSON.parse(e.postData.contents);
    var expected =
      PropertiesService.getScriptProperties().getProperty("SHEET_SECRET");

    if (!expected || body.secret !== expected) {
      return jsonResponse({ ok: false, error: "unauthorized" });
    }

    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    ensureHeaderRow(sheet);

    // Status and Notes are left empty on purpose: they are yours to fill in.
    sheet.appendRow([
      body.submittedAt || new Date().toISOString(),
      body.name || "",
      body.email || "",
      body.role || "",
      body.clinicSize || "",
      body.locale || "",
      "New",
      "",
    ]);

    return jsonResponse({ ok: true });
  } catch (err) {
    return jsonResponse({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

function ensureHeaderRow(sheet) {
  if (sheet.getLastRow() > 0) return;
  sheet.appendRow(HEADERS);
  sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
  sheet.setFrozenRows(1);
}

/**
 * Apps Script web apps cannot set a status code, so every reply is a 200 and
 * the body carries the outcome. The Netlify function checks for "ok":true.
 */
function jsonResponse(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
