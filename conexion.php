<?php  
  $db_database = 'dbsome';
  $db_hostname = '127.0.0.1:3306';
  $db_username = 'root';
  $db_password = 'some';

  $mysqli = new mysqli($db_hostname, $db_username, $db_password, $db_database);
  if (mysqli_connect_errno()) {
      printf("Falló la conexión: %s\n", mysqli_connect_error());
      exit();
  }
?>