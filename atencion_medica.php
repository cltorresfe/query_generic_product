<?php
include_once("../../conexion/conexion.php");	
include_once("../../recursos/php/funciones.php");	


$myfile = fopen("version.txt", "r") or die("No se puede abrir el archivo!");
$version= fread($myfile,filesize("version.txt"));
fclose($myfile);


$codAtencion=$_GET['atencion'];
$codInst = $_GET['codInst'];
$codUsr = $_GET['codUsr'];

$box=0;
$admision=0;
$derivacion=0;
$area=0;

$sql1 = "select fk_box,fk_condicion_ing,fk_admision from eme_dau_atencion where cod_aten=$codAtencion ";
$result = mysql_query( $sql1);
while ($row=mysql_fetch_array($result)){	
	$box=$row[0];
	$cond_ing=$row[1];
	$admision=$row[2];
}

$sql = "select fk_especialidadue from eme_dau_triage where fk_admision=$admision ";
$result = mysql_query( $sql);
while ($row=mysql_fetch_array($result)){	
	$derivacion=$row[0];
}

$sql = "select valor from eme_usr_configuracion where fk_usuario=$codUsr and denominacion='Ultima_Area_Seleccionada'";
$result = mysql_query( $sql);
while ($row=mysql_fetch_array($result)){	
	//$area=$row[0];
}


//************* DATOS DE ATENCION *************************
	$sql = "select
eme_dau_admision.tipo_admision
from
eme_dau_admision,
eme_dau_atencion
where
eme_dau_atencion.cod_aten=$codAtencion and
eme_dau_admision.cod_adm=eme_dau_atencion.fk_admision";
	$result = mysql_query( $sql);
	while ($row=mysql_fetch_array($result)){
		$tipo=$row[0];
	}
$area = $tipo+1;

?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>

<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

<style type="text/css">
body{
	font-family: "Lucida Sans Unicode", "Lucida Grande","Trebuchet MS", Helvetica, sans-serif !important;
}
</style>
<link href="../../recursos/estilo/css/bootstrap.min.css" rel="stylesheet">
<script src="../../recursos/js/jQuery-1.11.3/jquery-1.11.3.min.js"></script>
<script src="../../recursos/estilo/js/bootstrap.min.js"></script>

<link rel="stylesheet" href="../../recursos/jquery/calendario/jquery-ui.css" />
<link rel="stylesheet" href="../../recursos/jquery/calendario/jquery.ui.datepicker.css" />  
<script src="../../recursos/jquery/calendario/jquery-1.8.3.min.js"></script>
<script src="../../recursos/jquery/calendario/jquery-ui-1.9.2.js"></script>

<!-- ventana tickbox -->
<script type="text/javascript" src="../../recursos/jquery/thickbox/thickbox.js"></script>
<link rel="stylesheet" href="../../recursos/jquery/thickbox/thickbox.css" type="text/css" media="screen" />
<!-- ventana tickbox -->  

<!-- <link href="../../recursos/estilo/self_datos.css<?php echo '?'.rand();?>" rel="stylesheet" /> -->
<script src="funciones.js<?php echo '?'.rand();?>"></script>
<script src="funciones_atencion.js<?php echo '?'.rand();?>"></script>


<script>


function cuenta_caracteres(idLavel, idTaxtArea, cantMax){
	
	var cantCaract = document.getElementById(idTaxtArea).value.length;
	
	if(cantCaract > cantMax){
	
		document.getElementById(idTaxtArea).value = (document.getElementById(idTaxtArea).value).substring(1, cantMax); ;
	}
	
    document.getElementById(idLavel).innerHTML = cantMax - document.getElementById(idTaxtArea).value.length;
}

function fn_abrirVMBuscaCIE10(){
		
	var descripcionCIE10 = document.getElementById("cie10").value;
		
    //alert("descripcionCIE10: " + descripcionCIE10);
		
    if(descripcionCIE10.length >= 3){
		
		pagina='busca_CIE10.php';
		variables = 'd=' + descripcionCIE10;
		configuracion = "KeepThis=true&TB_iframe=true&width=800&height=700&modal=false";
		url = pagina+"?"+variables+"&"+configuracion+"&"+Math.random();
		tb_show('Busqueda cie10', url);
	}
	
}

</script> 
<style media="screen">
	.table{
		margin-bottom: 10px !important;
		
	}
	#TB_iframeContent {
		padding-right: 7px;
    }
     #TB_window{
	    top: 35% !important;
    }
</style>
<title>Atención Médica</title>
</head>

<body>
<div class="row">
	<div class="col-sm-12">
		<h3>Atención Médica</h3>
		<?php include_once('atenciones_previas.php'); ?>
	</div>
    

    
</div>

<div class="row">
	<div class="col-sm-12">
		<strong>DATOS ATENCI&Oacute;N:</strong>
		<input type="hidden" name="lugar_atencion" id="lugar_atencion"  value="<?php echo $tipo;?>"/>
		<table style="width: 100%" class="tabla1 table-bordered table-condensed table-striped small">
			<tr>
				<td>Box <span class="text-danger">*</span></td>
					<td>
						<select name="box" id="box"  style="width:150px" class="form-control input-sm"> 
            <?php
	            $si=0;
	            $sql = "select cod_box,descripcion from eme_dau_box where  fk_institucion=$codInst and fk_area_ue=$area ";
	            //echo $sql;
				echo '<option></option>';
				$result = mysql_query( $sql);
								while ($row=mysql_fetch_array($result)){	
									if ($box==$row[0]){
										echo '<option value="'.$row[0].'" selected="selected">'.$row[1]. '</option>';
									}else{
										echo '<option value="'.$row[0].'">'.$row[1].'</option>';
									}
									$si=1;
								}
								if ($si==0){
									//en caso de no encontrar box se deja por default
									if($area == 1){
										echo '<option value="2" selected="selected">1</option>';	
									}elseif($area == 2){
										echo '<option value="15" selected="selected">1</option>';
									}elseif($area == 3){
										echo '<option value="14" selected="selected">Dental</option>';
									}elseif($area == 4){
										echo '<option value="24" selected="selected">1</option>';	
									}
									//file_put_contents('log_error_box_15.txt', $sql."\n", FILE_APPEND);
								
								
								}
			?>
					</select>
				</td>
				<td>Condici&oacute;n de Ingreso <span class="text-danger">*</span></td> 
				<td><select name="condicion_ingreso" id="condicion_ingreso"  style="width:150px" class="form-control input-sm">
			<?php 
			$sql = "select cod_condicion,descripcion from eme_dau_condicioningreso where registroactivo=1";
			echo '<option value="0"></option>';
			$result = mysql_query( $sql);
			while ($row=mysql_fetch_array($result)){	
				if ($cond_ing==$row[0]){
					echo '<option value="'.$row[0].'" selected="selected">'.$row[1]. '</option>';
				}else{
					echo '<option value="'.$row[0].'">'.$row[1]. '</option>';
				}
			}
			?>
					</select>
				</td>
				<td>Derivar a <span class="text-danger">*</span></td>
				<td><select name="derivar_a" id="derivar_a"  style="width:150px" class="form-control input-sm">
			<?php 
			$sql = "select codigo,descripcion from eme_dau_triage_especialidad where registroactivo=1 and fk_institucion = $codInst";
			echo '<option value="0"></option>';
			$result = mysql_query( $sql);
			while ($row=mysql_fetch_array($result)){	
				if ($derivacion==$row[0]){
					echo '<option value="'.$row[0].'" selected="selected">'.$row[1]. '</option>';
				}else{	
					echo '<option value="'.$row[0].'">'.$row[1]. '</option>';
				}
			}
			?>
					</select>
				</td>
				<td>Sospecha GES <span class="text-danger">*</span></td>
				<td><label for="sospecha_ges"></label>
				  <select name="sospecha_ges" id="sospecha_ges">
				    <option value="0"></option>
				    <option value="1">SI</option>
				    <option value="2">NO</option>
	            </select></td>
			</tr>
		</table>
	</div>
</div>
<?php if ($tipo==3){ ?>
<div class="row">
	<div class="col-sm-12">
		<table border="0" style="width: 100%" class="tabla1 table-bordered table-condensed table-striped small">
			<tr class="header">
				<td>Paridad<span class="alert2">*</span></td>
				<td>
					<select name="paridad" id="paridad"  style="width:150px" class="form-control input-sm">
					<?php 
						$sql = "select cod_paridad,desc_paridad from eme_dau_atencion_uego_paridad";
						echo '<option value="0"></option>';
						$result = mysql_query($sql);
						while ($row=mysql_fetch_array($result)){	
							echo '<option value="'.$row[0].'">'.$row[1]. '</option>';
						}
					?>
					</select>
				</td>
				<td>Clasificación REM<span class="alert2">*</span></td>
				<td>
					<select name="clasificacion" id="clasificacion" class="form-control input-sm">
						<option value="0"></option>
						<option value="1">Preclamsia severa</option>
						<option value="2">Eclampsia</option>
						<option value="3">Síndrome Hipertensivo del Embarazo (SHE )</option>
						<option value="4">HELLP</option>
						<option value="5">Parto Prematuro</option>
						<option value="6">Hemorragia I Trimestre</option>
						<option value="7">Hemorragia II Trimestre</option>
						<option value="8">Hemorragia III Trimestre</option>
						<option value="9">Rotura prematura de membrana</option>
						<option value="10">Otras patologías </option>
						<option value="11">Trabajo de Parto sin patología </option>
					</select>
				</td>
			</tr>
		</table>
	</div>
</div>
<?php } ?>
<div class="row">
	<div class="col-sm-6">
		<strong>ANAMNESIS: <span class="text-danger">*</span></strong>
		<label for="anamnesis" class="small">Agregar una nueva anamnesis (<span id="cantCaractAnamnesis">800</span> caracteres disponibles, max. 800)</label>
		<textarea name="anamnesis" id="anamnesis" class="form-control" cols="72" rows="5" onkeydown="cuenta_caracteres('cantCaractAnamnesis', 'anamnesis', 800)" onkeyup="cuenta_caracteres('cantCaractAnamnesis', 'anamnesis', 800)" ></textarea>
		<div id="listado_anamnesis" name="listado_anamnesis"></div>
	</div>
	<div class="col-sm-6">
		<strong>EXAMEN FÍSICO:</strong>
		<label for="examen_fisico" class="small">Agregar una nuevo examen físico (<span id="cantCaractExamenFisico" >800</span> caracteres disponibles, max. 800)</label>
		<textarea name="examen_fisico" id="examen_fisico" class="form-control" cols="72" rows="5" onKeyDown="cuenta_caracteres('cantCaractExamenFisico', 'examen_fisico', 800)" onKeyUp="cuenta_caracteres('cantCaractExamenFisico', 'examen_fisico', 800)"></textarea>
		<div id="listado_examen_fisico"> </div>
	</div>
</div>
<div class="row">
	<div class="col-sm-12">
		<strong>CODIFICACIÓN DIAGNÓSTICO CIE10: <span class="text-danger">*</span></strong>
		<div class="form-inline">
			<input type="text" name="cie10" id="cie10" class="form-control input-sm" style="width:85%;" onkeypress="enterpressalert(event, this,'cie');" />
			<input id="btnBuscar" type="button" class="btn btn-default btn-sm" value="Buscar" style="width:10%;" onclick="fn_abrirVMBuscaCIE10();" />
			<input type="hidden" name="cod_cie" id="cod_cie" />
		</div>
		
		<div id="listado_cie"> </div>
	</div>
</div>
<div class="row">
	<div class="col-sm-12">
		<strong>PRECISIÓN DIAGNÓSTICA:</strong>
			<label for="hipotesis" class="small">Agregar una nueva precisión diagnóstica (<span id="cantCaractHD">800</span> caracteres disponibles, max. 800)</label>
	        <textarea name="hipotesis" id="hipotesis" class="form-control" cols="150" rows="5" onkeydown="cuenta_caracteres('cantCaractHD', 'hipotesis', 800)" onkeyup="cuenta_caracteres('cantCaractHD', 'hipotesis', 800)"></textarea>
			<div id="listado_hipotesis"></div>
	</div>
</div>


</body>
<script> 
	//obtiene_ananamnesis('local');
	//obtiene_hipotesis('local');
	//obtiene_examen_fisico('local');
	//obtiene_cie10();
	 <?php if ($tipo==3){ ?>
	obtiene_uego_datos_clinicos();
	 <?php } ?>
</script>
</html>

<?php mysql_close($con);?>