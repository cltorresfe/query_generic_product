<?php

$con = mysqli_connect("10.6.85.218","root","208266", "dau");
if (!$con)
  {
  die('Could not connect: ' . mysql_error());
  }
mysqli_query ($con,"SET NAMES 'utf8'");

?>
