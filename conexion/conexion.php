<?php

$con = mysql_connect("10.6.85.218","root","208266", "dau");
if (!$con)
  {
  die('Could not connect: ' . mysql_error());
  }
mysql_query ("SET NAMES 'utf8'");


$con_ris = mysql_connect("10.6.85.218","root","208266", "dau");
if (!$con_ris)
  {
  die('Could not connect: ' . mysql_error());
  }
mysql_query ("SET NAMES 'utf8'");

?>
