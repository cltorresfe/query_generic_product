<?php
include_once("../../conexion/conexion.php");
include_once("../../recursos/php/funciones.php");	

$presion = $_POST['pr'];
$pulso = $_POST['pu'];
$trectal = $_POST['tr'];
$taxilar = $_POST['ta'];
$fr = $_POST['fr'];
$saturo = $_POST['s'];
$hemo = $_POST['h'];
$cod_atencion = $_POST['a'];
$cod_usuario = $_POST['u'];
$institucion=$_POST['institucion'];

$fechahora = strftime( "%Y-%m-%d %H:%M:%S", time() );

//echo "cod_atencion: ".$cod_atencion;
/*
$sql0 = " Select limit 1 cod_detalle from eme_dau_atencion_detalle
		  Where fk_atencion = ".$cod_atencion." and fk_usuario = ".$cod_usuario."
		  Order by cod_detalle desc";		
$result0 = mysql_query($sql0);
while ($row0=mysql_fetch_array($result0)){	
	
	$cod_detalle = $row0[0];
}
*/
$detalle=0;
$cod_detalle= gestionar_atencion_detalle($detalle,$cod_atencion,$institucion,$cod_usuario,'','','','','','');


//echo " sql0: ".$sql0.";  row0[0]: ".$row0[0].";  ";

$sql1 = "insert into eme_dau_atencion_detalle_signos_v (presion,pulso,trectal,taxilar,fr,saturometria,hemoglucotest,fechahora,fk_detalle,fk_usuario) values ('$presion','$pulso','$trectal','$taxilar','$fr','$saturo','$hemo','$fechahora',$cod_detalle,$cod_usuario)";		
$result1 = mysql_query($sql1);

//echo "sql1: ".$sql1;

if ($result1)
	echo "g";
else
	echo "ng";
mysql_free_result($result1);
mysql_close($con);
?>