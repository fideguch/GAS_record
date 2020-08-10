const SS = SpreadsheetApp.getActiveSheet();

function set_trigger() {
  const active_cell = SS.getActiveCell();
  var   search_word;
  const column = active_cell.getColumn(); // 列番号
  const row = active_cell.getRow(); // 行番号
  
  if (column == 3)
  {
    set_the_values(row, column);
  }
 return ;
}

function set_the_values(line, row) {
  var   url;
  var   html;
  var   t_name;
  var   date = new Date();
  var   d_value = Utilities.formatDate(date, 'Asia/Tokyo', 'yyyy/MM/dd');
  
    if (SS.getRange(line, row).getValue() == "")
    {
        SS.getRange(line, row - 2).setValue("");
        SS.getRange(line, row - 1).setValue("");
    }
    else if (SS.getRange(line, row).getValue() != "" && SS.getRange(line, row - 1).getValue() == "")
    {
        url = SS.getRange(line, row).getValue();
        html = UrlFetchApp.fetch(url).getContentText('UTF-8');
        t_name =  Parser.data(html).from('<title>').to('</title>').iterate();
        SS.getRange(line, row - 2).setValue(t_name);
        SS.getRange(line, row - 1).setValue(d_value);
        line++;
    }
    else
        return ;
  return ;
}
