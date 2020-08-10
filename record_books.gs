const SS = SpreadsheetApp.getActiveSheet();
const date = new Date();
const d_value = Utilities.formatDate( date, 'Asia/Tokyo', 'yyyy/MM/dd');

function set_trigger() {
  const active_cell = SS.getActiveCell();
  var   search_word;
  const column = active_cell.getColumn();
  const row = active_cell.getRow();
  
  if (row == 1)
    return ;
  if (column == 1)
  {
    search_word = SS.getRange(row, column).getValue();
    set_the_values(search_word, row, column);
  }
  if (column == 6)
  {
     // 以下は、ドキュメントを見終わった後に見て。
     // ここの「完」が「読了？」の列に埋めると読了日が入力される条件になる。
     // 好きな文字で大丈夫。例：「完了」「読んだ」「done」など。
    if (SS.getRange(row, column).getValue() == '完')
      SS.getRange(row, column - 1).setValue(d_value);
    else
      SS.getRange(row, column - 1).setValue("");
  }
  return ;
}

function set_the_values(b_t, r, c) {
  const  url_base = 'https://www.googleapis.com/books/v1/volumes?q=';
  const  url_region = '&country=JP';
  const  result_is_ja = '&langRestrict=ja';
  const  results_max = '&maxResults=1';
  const  clean_cells = [["", "", "", "", "", ""]];
  
  if (b_t == "")
  {
    SS.getRange(r, 1, 1, 6).setValues(clean_cells);
    return ;
  }
  
  var response = UrlFetchApp.fetch(url_base.concat(b_t, url_region, result_is_ja, results_max))
  var content = response.getContentText("UTF-8");
  var obj = JSON.parse(content).items;
  var info = obj[0].volumeInfo;
  //debug
  console.log(obj);
  console.log(info);
  
  var book_name = info.title;
  //debug
  console.log(book_name);
  var author = info.authors;
  //debug
  console.log(author);
  var book_dis = info.description;
  //debug
  console.log(book_dis);

  SS.getRange(r, c, 1, 4).setValues([[book_name, author.join("\n"), book_dis, d_value]]);
  return ;
}
