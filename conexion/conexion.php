<?php

$con = mysqli_connect("10.6.85.218","root","208266", "dau");
if (!$con)
  {
  die('Could not connect: ' . mysql_error());
  }
mysqli_query ($con, "SET NAMES 'utf8'");


$con_ris = mysqli_connect("10.6.85.218","root","208266", "dau");
if (!$con_ris)
  {
  die('Could not connect: ' . mysql_error());
  }
mysqli_query ($con_ris, "SET NAMES 'utf8'");

?>
