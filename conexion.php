<?php  
  $db_database = 'dbsome';
  $db_hostname = '10.6.87.150:3306';
  $db_username = 'administrador';
  $db_password = 'c35famcvp';

  $mysqli = new mysqli($db_hostname, $db_username, $db_password, $db_database);
  if (mysqli_connect_errno()) {
      printf("Falló la conexión: %s\n", mysqli_connect_error());
      exit();
  }
?>