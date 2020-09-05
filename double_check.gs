function i_func() {
    const sheet = ss.getSheetByName('[GAS]insta重複チェック');
    const active_cell = sheet.getActiveCell();
    const active_name = active_cell.getValue();
    const column = active_cell.getColumn();
    const row = active_cell.getRow();
    let first_row = 2;
    let name = sheet.getRange(row, 1).getValue();
    if (name == "")
    {
      active_cell.setBackground("#FFFFFF");
      return true;
    }
    while (first_row < row)
    {
      name = sheet.getRange(first_row, 1).getValue();
      if (name == active_name)
      {
        active_cell.setBackground("#FF0000");
        active_cell.setValue(first_row + "行目と重複！");
        break;
      }
      first_row++;
    }
}

function t_func() {
    const sheet = ss.getSheetByName('[GAS]twitter重複チェック');
    const active_cell = sheet.getActiveCell();
    const active_name = active_cell.getValue();
    const column = active_cell.getColumn();
    const row = active_cell.getRow();
    let first_row = 2;
    let name = sheet.getRange(row, 1).getValue();
    if (name == "")
    {
      active_cell.setBackground("#FFFFFF");
      return true;
    }
    while (first_row < row)
    {
      name = sheet.getRange(first_row, 1).getValue();
      if (name == active_name)
      {
        active_cell.setBackground("#FF0000");
        active_cell.setValue(first_row + "行目と重複！");
        break;
      }
      first_row++;
    }
}

const ss = SpreadsheetApp.getActiveSpreadsheet();

if (ss.getActiveSheet().getName() == '[GAS]insta重複チェック')
  i_func();
if (ss.getActiveSheet().getName() == '[GAS]twitter重複チェック')
  t_func();	
