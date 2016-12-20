<?php
include_once("conexion/conexion_sig_vitales.php");

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

$parte = $_POST['parte'];
$unidad_policia = $_POST['unidad_policia'];
$juzgado =  $_POST['juzgado'];
$condicion_transito =  $_POST['condicion_transito'];
$placa_policia =  $_POST['placa_policia'];
$observacionOH =  $_POST['observacionOH'];
$tec_oh =  $_POST['tec_oh'];
$drogas_oh =  $_POST['drogas_oh'];
$rechaza_oh =  $_POST['rechaza_oh'];

$fechahora = strftime( "%Y-%m-%d %H:%M:%S", time() );

if($codEstadoEtilico != 0){
		
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

	file_put_contents('prueba_alcoholemia.txt', $sql0."\n", FILE_APPEND);
	$resultado =mysqli_query($con, $sql0);
	if ($resultado) {
				echo "alcoholemia ingresada. <br />";
			}
	else {
		echo "error en la ejecución de la consulta. <br />";
	}
}


if($codGradoLesion != 0 || $codEstadoEtilico != 0){
	$sql1 = 'update eme_dau_atencion set '; 
	if($codGradoLesion != 0){
		$sql1 .=	'fk_grado_lesion="'.$codGradoLesion.'" ,';
		$sql1 .=	'informe_lesiones = "'.$codGradoLesion.'" ';
	}
	if($codEstadoEtilico != 0){
		if($codGradoLesion != 0){
			$sql1 .= ', ';
		}
		$sql1 .=	'fk_estado_etilico = "'.$codEstadoEtilico.'" ';
	}
	if(isset($nroFrascoAlco) && $nroFrascoAlco != ''){
		if($codGradoLesion != 0 || $codEstadoEtilico != 0){
			$sql1 .= ', ';
		}
		
		$sql1 .= ' alcoholemia = "'.$nroFrascoAlco.'", fecha_alcoholemia ="'. $fechahora.'" ';
	}
	$sql1 .= 'where cod_aten = '.$cod_atencion;


	$resultado = mysqli_query($con, $sql1);
	file_put_contents('prueba_alcoholemia.txt', $sql1."\n", FILE_APPEND);
	//echo "sql1: ".$sql1." ";

	if ($resultado) {
				echo "alcoholemia.txt ingresada. <br />";
			}
	else {
		echo "error en la ejecución de la consulta. <br />";
	}
}
if (mysqli_close($con)){ 
		echo "desconexion realizada. <br />";
	} 
	else {
		echo "error en la desconexión";
	}
?>