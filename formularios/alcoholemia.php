<?php

include_once("../conexion/conexion.php");
include_once("../recursos/php/funciones.php");
$atencion = ($_GET['a']);

function createXFDF( $file, $info, $enc='UTF-8' )
{
    $data = '<?xml version="1.0" encoding="'.$enc.'"?>' . "\n" .
        '<xfdf xmlns="http://ns.adobe.com/xfdf/" xml:space="preserve">' . "\n" .
        '<fields>' . "\n";
    foreach( $info as $field => $val )
    {
        $data .= '<field name="' . $field . '">' . "\n";
        if( is_array( $val ) )
        {
            foreach( $val as $opt )
                $data .= '<value>' .
					//htmlspecialchars($opt).
                    htmlentities( $opt, ENT_COMPAT, $enc ) .
                    '</value>' . "\n";
        }
        else
        {
            $data .= '<value>' .
				//htmlspecialchars($val).
				//($val).
                htmlentities( $val, ENT_COMPAT, $enc ) .
                '</value>' . "\n";
        }
        $data .= '</field>' . "\n";
    }
    $data .= '</fields>' . "\n" .
        '<ids original="' . md5( $file ) . '" modified="' .
            time() . '" />' . "\n" .
        '<f href="' . $file . '" />' . "\n" .
        '</xfdf>' . "\n";
    return $data;
}





$sql = "SELECT
eme_dau_atencion.nfrasco,
eme_dau_atencion.alcoholemia,
eme_dau_atencion.fecha_alcoholemia,
sapat001.rut,
sapat001.digiver,
sapat001.apellpat,
sapat001.apellmat,
sapat001.nombres,
sapat001.fechanac,
sapat001.sexo,
eme_dau_atencion_alcoholemia.cond_transito,
eme_dau_atencion_alcoholemia.tec,
eme_dau_atencion_alcoholemia.drogas,
eme_dau_atencion_alcoholemia.rechaza,
eme_dau_atencion_alcoholemia.placa_policia,
eme_dau_atencion_alcoholemia.parte,
eme_dau_atencion_alcoholemia.comiseria,
eme_dau_atencion_alcoholemia.juzgado,
eme_dau_atencion_alcoholemia.observaciones,
eme_dau_atencion.fk_estado_etilico,
eme_usr_usuario.rut,
eme_usr_usuario.dv,
eme_usr_usuario.nombres,
eme_usr_usuario.apaterno,
eme_usr_usuario.amaterno,
eme_usr_institucion.descripcion
FROM
eme_dau_atencion_alcoholemia
INNER JOIN eme_dau_atencion ON eme_dau_atencion_alcoholemia.fk_atencion = eme_dau_atencion.cod_aten
INNER JOIN eme_dau_admision ON eme_dau_atencion.fk_admision = eme_dau_admision.cod_adm
INNER JOIN sapat001 ON eme_dau_admision.fk_cp = sapat001.codpacie
INNER JOIN eme_usr_usuario ON eme_dau_atencion_alcoholemia.fk_usr = eme_usr_usuario.codigo
INNER JOIN eme_usr_institucion ON eme_dau_admision.fk_inst = eme_usr_institucion.codigo
where eme_dau_atencion_alcoholemia.fk_atencion = ".$atencion;

$result = mysql_query($sql);

while ($row=mysql_fetch_array($result)){
		$establecimiento = $row[25];
		$pac_nom	=TRIM($row[7]);
		$pac_AP		=TRIM($row[5]);
		$pac_AM		=TRIM($row[6]);
		$pac_rut	=TRIM($row[3]);
		$pac_dv		=TRIM($row[4]);
		$fechanac	= $row[8];
		$genero		= $row[9];
		$prof_nombre	= ($row[22]);
		$prof_ap		= ($row[23]);
		$prof_am		= ($row[24]);
		$prof_rut		= ($row[20]);
		$prof_dv		= ($row[21]);
		$fecha			= date("dmy",strtotime($row[2]));
		$hora			= date("Hi",strtotime($row[2]));
		$nofrasco = $row[1];
		$cond_transito = $row[10];
		$tec = $row[11];
		$drogas = $row[12];
		$rechaza = $row[13];
		$placa = $row[14];
		$parte = $row[15];
		$unidad_policial = $row[16];
		$juzgado = $row[17];
		$observaciones = $row[18];
		$estado_etilico = $row[19];
		
		
		
}
if($cond_transito == 7){
	$peaton = 'Sí';
	$otro = 'Off';
	$conductor = 'Off';
}elseif($cond_transito == 0){
	$peaton = 'Off';
	$otro = 'Off';
	$conductor = 'Sí';
}elseif($cond_transito == 5){
	$peaton = 'Off';
	$otro = 'Sí';
	$conductor = 'Off';
}

if($estado_etilico ==1){
	$sobrio = 'Sí';
	$aliento = 'Off';
	$ebrio = 'Off';
	$coma = 'Off';
}elseif($estado_etilico ==2){
	$sobrio = 'Off';
	$aliento = 'Sí';
	$ebrio = 'Off';
	$coma = 'Off';
}elseif($estado_etilico ==3){
	$sobrio = 'Off';
	$aliento = 'Off';
	$ebrio = 'Sí';
	$coma = 'Off';
}elseif($estado_etilico ==4){
	$sobrio = 'Off';
	$aliento = 'Off';
	$ebrio = 'Off';
	$coma = 'Sí';
}

if($rechaza == 1){
	$rechaza = 'Sí';
}else{
	$rechaza = 'Off';
}

if($drogas == 1){
	$drogas = 'Sí';
}else{
	$drogas = 'Off';
}

if($tec == 1){
	$tec = 'Sí';
}else{
	$tec = 'Off';
}


if($genero == 1){
	$genero = 'M';
}elseif($genero == 2){
	$genero = 'F';
}


$fechanac = date("Y-m-d",strtotime($fechanac));
function calculateAge($dob){
	$dobObject = new DateTime($dob);
	$nowObject = new DateTime();
	$diff = $dobObject->diff($nowObject);
	return array('3'=>$diff->y, '2'=>$diff->m, '1'=>$diff->d);
}
$edad = calculateAge($fechanac);



$data = [

'ESTABLECIMIENTO' => $establecimiento,
'FECHA_TOMA' => $fecha,
'N_FRASCO' => $nofrasco,
'HORA_MUESTRA' => $hora,
'NOMBRE COMPLETO' => $pac_nom.' '.$pac_AP.' '.$pac_AM,
'RUT_PACIENTE' => $pac_rut,
'DV_PACIENTE' => $pac_dv,
'EDAD' => $edad[3],
'OBSERVACIONES' => $observaciones,
'NOMBRE_MEDICO' => $prof_nombre. ' '.$prof_ap. ' '.$prof_am,
'RUN_MEDICO' => $prof_rut.'-'.$prof_dv,
'N_PLACA' => $placa,
'N_PARTE' => $parte,
'UNIDAD_POLICIAL' => $unidad_policial,
'JUZGADO' => $juzgado,
'PEATON' => $peaton,
'CONDUCTOR' => $conductor,
'OTRO' => $otro,
'SEXO' => $genero,
'SOBRIO' => $sobrio,
'ALIENTO_ETILICO' => $aliento, 
'EBRIEDAD_MANIFIESTA' => $ebrio,
'COMA' => $coma,
'RECHAZO' => $rechaza,
'OTRAS_DROGAS' => $drogas,
'TEC' => $tec
	
	
];


//print_r($data);


$XFDF = createXFDF('BOLETA_ALCOHOLEMIA_FORM.pdf', $data);
$FDFfile = tempnam(sys_get_temp_dir(), gethostname());
$PDFfile = tempnam(sys_get_temp_dir(), gethostname());
file_put_contents($FDFfile, $XFDF);
$pdf_template = dirname( __FILE__ ) . '/BOLETA_ALCOHOLEMIA_FORM.pdf';
//echo($XFDF);

exec("/usr/bin/pdftk $pdf_template fill_form $FDFfile output $PDFfile", $output, $return);

// Force Download the output file
//header('Content-Description: File Transfer');
header('Content-Transfer-Encoding: binary');
header('Content-Type: application/pdf');
header('Content-Disposition: inline; filename=' . 'ALCOHOLEMIA-'.$pac_rut.'.PDF');
header('Content-Length: ' . filesize($PDFfile));
header('Accept-Ranges: bytes');


readfile($PDFfile);
unlink($FDFfile);
unlink($PDFfile);
exit;

?>