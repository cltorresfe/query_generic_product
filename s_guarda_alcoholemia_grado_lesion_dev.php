<?php

//include_once('conexion/conexion.php');

$cod_atencion = $_POST['a'];
$codEstadoEtilico = $_POST['ee'];
$nroFrascoAlco = $_POST['nf'];
$codGradoLesion = $_POST['gl'];

$parte = 0;
$unidad_policia = 0;
$juzgado =  0;
$condicion_transito =  0;
$placa_policia =  0;
$observacionOH =  0;
$tec_oh =  0;
$drogas_oh =  0;
$rechaza_oh =  0;

$parte = $_POST['parte'] == '' ? null : $_POST['parte'];
$unidad_policia = $_POST['unidad_policia'] == '' ? null : $_POST['unidad_policia'];
$juzgado =  $_POST['juzgado'] == '' ? null : $_POST['juzgado'];
$condicion_transito =  $_POST['condicion_transito'] == '' ? null : $_POST['condicion_transito'];
$placa_policia =  $_POST['placa_policia'] == '' ? null : $_POST['placa_policia'];
$observacionOH =  $_POST['observacionOH']== '' ? null : $_POST['observacionOH'];
$tec_oh =  $_POST['tec_oh'] == "false" ? 0 : 1;
$drogas_oh =  $_POST['drogas_oh'] == "false" ? 0 : 1;
$rechaza_oh =  $_POST['rechaza_oh'] == "false" ? 0 : 1;

$fechahora = date("d-m-Y H:i");

if($codEstadoEtilico != 0){
	$db_database = 'dau';
	$db_hostname = '10.6.85.218';
	$db_username = 'root';
	$db_password = '208266';

	$mysqli = mysqli_connect($db_hostname, $db_username, $db_password, $db_database);
	if($mysqli){

		echo "conexion exitosa. <br />";
		$sql0 = "INSERT INTO eme_dau_atencion_alcoholemia
		(fk_atencion, cond_transito, tec, drogas, rechaza, placa_policia, parte, comiseria, juzgado, observaciones) 
		VALUES 
		('$cod_atencion', 
		'$codEstadoEtilico', 
		'$tec_oh', 
		'$drogas_oh', 
		'$rechaza_oh', 
		'$placa_policia', 
		'$parte', 
		'$unidad_policia',
		'$juzgado', 
		'$observacionOH')";

		$resultado=mysqli_query($mysqli,$sql0);
		if ($resultado) {
			echo "perfil almacenado. <br />";
		}
		else {
			echo "error en la ejecución de la consulta. <br />";
		}
		
		if (mysqli_close($mysqli)){ 
			echo "desconexion realizada. <br />";
		} 
		else {
			echo "error en la desconexión";
		}

	}

	//file_put_contents('prueba_alcoholemia.txt', $sql0."\n", FILE_APPEND);
}

?>