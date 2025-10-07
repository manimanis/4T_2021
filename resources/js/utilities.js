function draw_table(tablename, values, startindex) {
  document.writeln("<table class=\"draw-table\">");
  document.writeln("<tr>");
  document.writeln("<th width=\"30\">", tablename,"</th>");
  for (let v of values) {
    document.writeln("<th width=\"30\" style=\"border: solid 1px;\">", v, "</th>");
  }
  document.writeln("</tr>");
  document.writeln("<tr>");
  document.writeln("<th>&nbsp;</th>");
  for (let i = 0; i < values.length; i++) {
    document.writeln("<th>", i +startindex, "</th>");
  }
  document.writeln("</tr>");
  document.writeln("</table>");
}