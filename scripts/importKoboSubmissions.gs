
function importKoboSubmissions() {
  const token_id = PropertiesService.getScriptProperties().getProperty("Authorization");
  if (!token_id) {
    Logger.log("❌ ERROR: Authorization token not found.");
    return;
  }
  const BASE_URL = "https://eu.kobotoolbox.org/api/v2/assets/";
  const FORMS = [
    { asset_uid: "aqsanfCTzw3Ut4eYn93hpp", sheet_name: "responses_formulario1" },
    { asset_uid: "aWv4QZNmBmnkP5PwueZJcl", sheet_name: "responses_formulario2" }
  ];
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  FORMS.forEach(form => {
    const url = `${BASE_URL}${form.asset_uid}/data.json`;
    try {
      const response = UrlFetchApp.fetch(url, {
        method: "get",
        headers: {
          Authorization: `Token ${token_id}`,
          Accept: "application/json"
        }
      });
      const json = JSON.parse(response.getContentText());
      const submissions = json.results;
      if (!submissions || submissions.length === 0) {
        Logger.log(`⚠️ WARNING: No submissions found for '${form.sheet_name}'.`);
        return;
      }
      let sheet = spreadsheet.getSheetByName(form.sheet_name);
      if (!sheet) {
        sheet = spreadsheet.insertSheet(form.sheet_name);
      } else {
        sheet.clearContents();
      }
      const headers = Object.keys(submissions[0]);
      sheet.appendRow(headers);
      submissions.forEach(record => {
        const row = headers.map(h => record[h] !== undefined ? record[h] : "");
        sheet.appendRow(row);
      });
      Logger.log(`✅ SUCCESS: Imported submissions for '${form.sheet_name}'.`);
    } catch (e) {
      Logger.log(`❌ ERROR: Failed to import submissions for '${form.sheet_name}'. Error: ${e}`);
    }
  });
}
