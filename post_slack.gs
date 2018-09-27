function postRichMessage(channel,username,icon,text,attachments){
  var token = PropertiesService.getScriptProperties().getProperty('SLACK_ACCESS_TOKEN')
  var slackApp = SlackApp.create(token); 
  slackApp.chatPostMessage(
    channel
    ,text
    ,{
      "icon_emoji" :icon
      ,"username": username
      ,"attachments": attachments
    }
  );
}

function postInitialKintai(){
  var sheet_id = PropertiesService.getScriptProperties().getProperty('SHIFT_SHEET_ID')
  var spreadsheet = SpreadsheetApp.openById(sheet_id);
  var sheet = spreadsheet.getSheets()[0];
  var sheetdata = sheet.getSheetValues(1, 1, sheet.getLastRow(), sheet.getLastColumn());
  
  postRichMessage(
    "CD1U5L1C3"
    ,"KINTAI_MAN"
    ,":ghost:"
    ,"ここは勤怠管理を行うチャンネルです。以降の勤務予定をpostするのでスタンプにてご回答ください:heart:\nまた、当日中の勤務に関する報告はそれぞれのpostにコメントをする形でお願いします。"
    ,"");
    
  for(var i = 1; i < sheet.getLastRow(); i++) {
    d = Utilities.formatDate(new Date(sheetdata[i][0]), "JST", "MM/dd");
    t1 = Utilities.formatDate(new Date(sheetdata[i][2]), "JST", "H:mm");
    t2 = Utilities.formatDate(new Date(sheetdata[i][3]), "JST", "H:mm");
    t3 = Utilities.formatDate(new Date(sheetdata[i][4]), "JST", "H:mm");
    postRichMessage(
      "CD1U5L1C3"
      ,"KINTAI_MAN"
      ,":ghost:"
      ,d + "(" + sheetdata[i][1] + ") " + sheetdata[0][2] + " " + t1 + "~ " + sheetdata[0][3] + " " + t2 + "~ " + sheetdata[0][4] + " " + t3 + "~ ", 
      "");
  }
}

function getShift(){
  var token = PropertiesService.getScriptProperties().getProperty('SLACK_ACCESS_TOKEN')
  var slackApp = SlackApp.create(token); 
  var url = "https://slack.com/api/channels.history?token=" + token + "&channel=" + "CD1U5L1C3" + "";
  var response = UrlFetchApp.fetch(url);
  var json = response.getContentText();
  var data = JSON.parse(json);
  var post_text = ""
  for (var i=0; i<data.messages.length; i++) {
    message = data.messages[i]["text"]
    reactions = data.messages[i]["reactions"]
    if(message.indexOf('11/02') != -1){
      Logger.log(message)
      postRichMessage("DB8EK0XDM","KINTAI_MAN",":ghost:","お疲れ様です。11/02の勤務の参加者候補リストが確定しました。","")
      for(var j=0;j<reactions.length;j++){
        post_text = post_text + "\n" + ":" + reactions[j].name + ": <@" + reactions[j].users + ">"
      }
      postRichMessage("DB8EK0XDM","KINTAI_MAN",":ghost:", post_text , "")
    }
  }
}
