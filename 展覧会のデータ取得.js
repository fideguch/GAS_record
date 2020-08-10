const SS = SpreadsheetApp.getActiveSheet();

function set_trigger() {
  const    active_cell = SS.getActiveCell();
  
  if (active_cell.getColumn() == 3)
    set_the_values();
 return ;
}

function set_the_values() {
  var   line = 2;
  var   row = 3;
  var   url;
  var   html;
  var   t_name;
  var   date = new Date();
  var   d_value = Utilities.formatDate( date, 'Asia/Tokyo', 'yyyy/MM/dd');
  
  while (line <= 1000)
  {
    if (SS.getRange(line, row).getValue() == "")
    {
      while (SS.getRange(line, row).getValue() == "")
      {
        SS.getRange(line, row - 2).setValue("");
        SS.getRange(line, row - 1).setValue("");
        line++;
      }
      continue ;
    }
    else if (SS.getRange(line, row).getValue() != "" && SS.getRange(line, row - 1).getValue() == "")
    {
      while (SS.getRange(line, row).getValue() != "" && SS.getRange(line, row - 1).getValue() == "")
      {
        url = SS.getRange(line, row).getValue();
        html = UrlFetchApp.fetch(url).getContentText('UTF-8');
        t_name =  Parser.data(html).from('<title>').to('</title>').iterate();
        Logger.log(t_name);
        Logger.log(d_value);
        SS.getRange(line, row - 2).setValue(t_name);
        SS.getRange(line, row - 1).setValue(d_value);
        line++;
      }
      continue ;
    }
    else
        line++;
  }
  return ;
}
