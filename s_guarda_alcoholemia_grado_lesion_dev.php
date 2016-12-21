<?php
include_once("conexion/conexion.php");

$cod_atencion = $_POST['a'];
$cod_user = $_POST['u'];
$codEstadoEtilico = $_POST['ee'];
$nroFrascoAlco = $_POST['nf'];
$codGradoLesion = $_POST['gl'];
$parte = $_POST['parte'];
$unidad_policia = $_POST['unidad_policia'];
$juzgado =  $_POST['juzgado'];
$condicion_transito =  $_POST['condicion_transito'];
$placa_policia =  $_POST['placa_policia'];
$observacionOH =  $_POST['observacionOH'];
$tec_oh =  $_POST['tec_oh'] == "false" ? 0 : 1;
$drogas_oh =  $_POST['drogas_oh'] == "false" ? 0 : 1;
$rechaza_oh =  $_POST['rechaza_oh'] == "false" ? 0 : 1;

$fechahora = strftime( "%Y-%m-%d %H:%M:%S", time() );
if($codEstadoEtilico != 0){
	$consulta="select * from eme_dau_atencion_alcoholemia where fk_atencion=".$cod_atencion;
	$result_consulta=mysql_query($consulta) or die (mysql_error());
	if (mysql_num_rows($result_consulta)>0)
	{
	mysql_close($con);
	echo "exits";
	return;
	}
		
	$sql0 = "INSERT INTO `eme_dau_atencion_alcoholemia`
						(`fk_atencion`, `cond_transito`, `tec`, `drogas`, `rechaza`, `placa_policia`, `parte`, `comiseria`, `juzgado`, `observaciones`, `fk_usr`) 
					VALUES 
						('$cod_atencion', 
						'$condicion_transito', 
						'$tec_oh', 
						'$drogas_oh', 
						'$rechaza_oh', 
						'$placa_policia', 
						'$parte', 
						'$unidad_policia',
						'$juzgado', 
						'$observacionOH',
						'$cod_user')";

	file_put_contents('prueba_alcoholemia.txt', $sql0."\n", FILE_APPEND);

	$resultado = mysql_query($sql0) or die(mysql_error());
	if (!$resultado) {
		mysql_close($con);
		echo "Error";
		return;
	}
}

if($codGradoLesion != 0 || $codEstadoEtilico != 0){
	$sql1 = "update `eme_dau_atencion` set "; 
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

	$resultado = mysql_query($sql1);
	file_put_contents('prueba_alcoholemia.txt', $sql1."\n", FILE_APPEND);
	//echo "sql1: ".$sql1." ";

	if (!$resultado) {
		echo "ng";
		mysql_close($con);
		return;
	}
}
mysql_close($con);
echo "Ok";
?>