
function setupHourlyTrigger() {
  const functionName = 'importKoboSubmissions';
  const triggers = ScriptApp.getProjectTriggers();
  triggers.forEach(trigger => {
    if (trigger.getHandlerFunction() === functionName) {
      ScriptApp.deleteTrigger(trigger);
    }
  });
  ScriptApp.newTrigger(functionName)
    .timeBased()
    .everyHours(1)
    .create();
  Logger.log('✅ Hourly trigger created.');
}
function deleteAllTriggers() {
  const triggers = ScriptApp.getProjectTriggers();
  triggers.forEach(trigger => ScriptApp.deleteTrigger(trigger));
  Logger.log('⚙️ All triggers deleted.');
}
