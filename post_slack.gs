function postRichMessage(channel,username,icon,text,attachments){
  var slackApp = SlackApp.create(PropertiesService.getScriptProperties().getProperty('SLACK_ACCESS_TOKEN')); 
  slackApp.chatPostMessage("bot_test", text, {
    "icon_emoji" :icon,
    "channel" : channel,
    "username": username,
    "attachments": attachments
  });
}

function postInitialKintai(){
  var spreadsheet = SpreadsheetApp.openById(PropertiesService.getScriptProperties().getProperty('SHIFT_SHEET_ID'));
  var sheet = spreadsheet.getSheets()[0];
  var sheetdata = sheet.getSheetValues(1, 1, sheet.getLastRow(), sheet.getLastColumn());
  
  postRichMessage(
    "bot_test",
    "KINTAI_MAN",
    ":ghost:",
    "ここは勤怠管理を行うチャンネルです。以降の勤務予定をpostするのでスタンプにてご回答ください:heart:\nまた、当日中の勤務に関する報告はそれぞれのpostにコメントをする形でお願いします。", 
    "");
    
  for(var i = 1; i < sheet.getLastRow(); i++) {
    d = Utilities.formatDate(new Date(sheetdata[i][0]), "JST", "MM/dd");
    t1 = Utilities.formatDate(new Date(sheetdata[i][2]), "JST", "H:mm");
    t2 = Utilities.formatDate(new Date(sheetdata[i][3]), "JST", "H:mm");
    t3 = Utilities.formatDate(new Date(sheetdata[i][4]), "JST", "H:mm");
    postRichMessage(
      "bot_test",
      "KINTAI_MAN",
      ":ghost:",
      d + "(" + sheetdata[i][1] + ") " + sheetdata[0][2] + " " + t1 + "~ " + sheetdata[0][3] + " " + t2 + "~ " + sheetdata[0][4] + " " + t3 + "~ ", 
      "");
  }
}
