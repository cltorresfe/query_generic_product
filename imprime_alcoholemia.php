<?php
include_once("conexion/conexion.php");

$imprime = $_POST['imprime'];
$cod_atencion = $_POST['a'];
echo "Imprime: $imprime";
echo "Atencion: $cod_atencion";

if($imprime == 'imprime'){
  $consulta="SELECT * FROM eme_dau_atencion_alcoholemia WHERE fk_atencion= $cod_atencion";
  $result_consulta=mysql_query($consulta) or die (mysql_error());
  if (mysql_num_rows($result_consulta)>0)
  { 
    $sql0 = "UPDATE eme_dau_atencion_alcoholemia SET imprime = 1 where fk_atencion = $cod_atencion";
    $resultado = mysql_query($sql0) or die(mysql_error());
    if (!$resultado) {
      mysql_close($con);
      echo "error";
      return;
    }
    echo "Ok";
    return;
  }
}

?>