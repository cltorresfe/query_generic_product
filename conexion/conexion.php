<?php
$con = mysql_connect("10.6.85.218","root","208266");
if (!$con)
  {
  die('Could not connect: ' . mysql_error());
  }
mysql_select_db("dau", $con);
mysql_query ("SET NAMES 'utf8'");


$con_ris = mysql_connect("10.6.85.218","root","208266");
if (!$con_ris)
  {
  die('Could not connect: ' . mysql_error());
  }
mysql_select_db("dau", $con_ris);
mysql_query ("SET NAMES 'utf8'");

?>