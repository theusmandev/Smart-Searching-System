function doPost(e) {
  try {
    var spreadsheetId = "1JLumUQXKVQU7JaNCrTtxn5qkswuB6kct1TpGJq5xz3I";
    var spreadsheet = SpreadsheetApp.openById(spreadsheetId);
    var sheet = spreadsheet.getSheetByName("Searches");

    if (!sheet) {
      throw new Error("Sheet named 'Searches' not found.");
    }

    var params = e.parameter;
    var search = params.search || "N/A";
    var timestamp = params.timestamp || Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "yyyy-MM-dd HH:mm:ss");
    var device = params.device || "N/A";
    var userId = params.userId || "N/A";
    
    // 🚀 MAGIC FIX: Ab yeh "true" aur "Yes" dono ko theek se parhega
    var rawNoResults = params.noResults;
    var noResults = (rawNoResults === "true" || rawNoResults === "Yes" || rawNoResults === true);

    var row = [timestamp, search, device, userId, noResults ? "Yes" : "No"];
    sheet.appendRow(row);

    var lastRow = sheet.getLastRow();
    if (noResults) {
      var range = sheet.getRange(lastRow, 1, 1, sheet.getLastColumn());
      range.setBackground("yellow");
    }

    return ContentService.createTextOutput("Success").setMimeType(ContentService.MimeType.TEXT);
  } catch (error) {
    Logger.log("Error: " + error.toString());
    return ContentService.createTextOutput("Error: " + error.toString()).setMimeType(ContentService.MimeType.TEXT);
  }
}