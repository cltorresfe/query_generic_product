<?php
include_once("conexion/conexion.php");	

$myfile = fopen("version.txt", "r") or die("No se puede abrir el archivo!");
$version= fread($myfile,filesize("version.txt"));
fclose($myfile);

$codAtencion = 193707;
$codUsuario  = 1155;
$codInst = 10;


?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Signos Vitales y Alcoholemia</title>
<style type="text/css">
body{
	font-family: "Lucida Sans Unicode", "Lucida Grande","Trebuchet MS", Helvetica, sans-serif !important;
}
</style>
<link href="css/bootstrap-3.3.7.min.css" rel="stylesheet">
<script src="js/jquery-1.12.3.min.js"></script>
<script src="js/bootstrap-3.3.7.min.js"></script>
<script src="js/jquery-ui-1.11.4.min.js"></script>
<script type="text/javascript" src="js/thickbox.js"></script>

<script type="text/javascript" src="js/validator.min.js"></script>

<link rel="stylesheet" href="css/jquery-ui-1.11.4.min.css" />
<link rel="stylesheet" href="css/jquery.ui.datepicker.css" />  
<link rel="stylesheet" href="css/thickbox.css" type="text/css" media="screen" /> 

<!-- <link href="../../recursos/estilo/self_datos.css<?php echo '?'.rand();?>" rel="stylesheet" /> -->
<script src="js/funciones.js<?php echo '?'.rand();?>"></script>


<script>
function validacionCampoNumericoSimple(valor){

	if( (valor == null) || (valor.length == 0) || ( /^\s+$/.test(valor) ) || (isNaN(valor)==true ) ) {
		return false;
	}
	else{
		return true;
	}
}

function validacionCampoTexto(valor){

	if( (valor == null) || (valor.length == 0) || ( /^\s+$/.test(valor) ) ) {
		return false;
	}
	else{
		return true;
	}
}

</script>

</head>
<body >
<div class="content">
	<div class="row">
		<div class="col-sm-12">
			<h3>Signos Vitales y Alcoholemia </h3>
			<strong>Control Signos Vitales:</Strong>
			<form class="form-inline">
				<input type="hidden" name="cod_aten" id="cod_aten" value="<?php echo $codAtencion;?>"/>
                <input type="hidden" name="cod_usr" id="cod_usr" value="<?php echo $codUsuario;?>"/>
                <div class="row">
                <div class="form-group col-sm-3">
	                <label for="txtPresion1">PAS:</label><br />
	                <input class="form-control" type="number" id="txtPresion1" size="3" placeholder="mmHg" style="width: 100%"/>
                </div>
				<div class="form-group col-sm-3">
					<label for="txtPresion2">PAD:</label><br />
					<input class="form-control" type="number" min="1" id="txtPresion2" size="3" placeholder="mmHg" style="width: 100%"/>
				</div>
				<div class="form-group col-sm-3">
					<label for="txtTRectal">Tº Rectal:</label><br />
					<input class="form-control" type="number" id="txtTRectal" size="3" placeholder="ºC" style="width: 100%"/>
				</div>
				<div class="form-group col-sm-3">
					<label for="txtTAxilar">Tº Axilar:</label><br />
					<input class="form-control" type="number" id="txtTAxilar" size="3" placeholder="ºC" style="width: 100%"/>
				</div>
                </div>
                <div class="row">
				<div class="form-group col-sm-3">
					<label for="txtPulso">Pulso:</label><br />
					<input class="form-control" type="number" id="txtPulso" size="3" placeholder="LPM"  style="width: 100%"/>
				</div>
				<div class="form-group col-sm-3">
					<label for="txtHemo">HGT:</label><br />
					<input class="form-control" type="number" id="txtHemo" size="3" placeholder="mg/dL" style="width: 100%"/>
				</div>
				<div class="form-group col-sm-3">
					<label for="txtFR">FR:</label><br />
					<input class="form-control" type="number" id="txtFR" size="3" placeholder="RPM" style="width: 100%"/>
				</div>
				<div class="form-group col-sm-3">
					<label for="txtSaturo">Sat.:</label><br />
					<input class="form-control" type="number" id="txtSaturo" size="3" placeholder="%" style="width: 100%"/>
				</div>
                </div>
				<div class="row">
	                <div class="col-sm-12">
		                <div class="alert alert-danger" role="alert" id='divTxTErores' style="display: none; margin-top: 10px;"><p id="lblTxTErores"></p></div>
	                </div>
	            </div>
                <div class="row">
	                <div class="col-sm-12">
						<input class="btn btn-default" type="button" value="Agregar" id="btn_agrega_signos_vitales"  onclick="guarda_signos_vitales();"  style="width: 100%"/>
	                </div>
	            </div>
			</form>
		</div>
	</div>
	<div class="row">
		<div class="col-sm-12">
			<div id="tablaControlSignosVitales"><p class="text-danger">Sin controles de signos vitales.</p></div>
		</div>
	</div>
                    
                    <?php 
						$codEstadoEtilico = 0; 
						$codGradoLesion = 0;
						$numeroFrascoAlcoholemia = "";
					
						$sql0 = "Select alcoholemia,fk_estado_etilico,informe_lesiones From eme_dau_atencion Where cod_aten = ".$codAtencion;
						
						$result0 = mysql_query($sql0);
						while ($row0=mysql_fetch_array($result0)){	
						
							$numeroFrascoAlcoholemia = $row0[0];
							$codEstadoEtilico = $row0[1];
							$codGradoLesion   = $row0[2];
						
						}
						mysql_free_result($result0);
					?>
			












					
					
	<strong>Accidente y Alcoholemia:</strong>
	<form id="sv_form" data-toggle="validator" role="form">

		<div class="form-inline row">
			<div class="form-group col-sm-3">
				<label for="estadoEtilico" class="control-label">Estado etílico:</label>
				<select name="estadoEtilico" id="estadoEtilico" class="form-control"> 
					<?php 
						$sql1 = "Select cod_e_etilico,descripcion_e_etilico From eme_dau_estado_etilico where registroactivo=1 order by cod_e_etilico";
						echo '<option value="0">Selec. estado</option>';
						$result1 = mysql_query($sql1);
						while ($row1=mysql_fetch_array($result1)){	
			            	if ($codEstadoEtilico == $row1[0]){
			                	echo '<option value="'.$row1[0].'" selected="selected">'.$row1[1].'</option>';
			                }else{
				                echo '<option value="'.$row1[0].'">'.$row1[1].'</option>';
				            }
				        }
						mysql_free_result($result1);
		       ?>
		    </select>
			</div>
			<div class="form-group col-sm-3">
				<label for="nroFracoAlcoholemia" class="control-label">Nº frasco alcoholemia</label>
				<input class="form-control" type="text" id="nroFracoAlcoholemia">
			</div>
			<div class="form-group col-sm-3">
				<label for="parteOH" class="control-label">N° Parte:</label>
				<input class="form-control col-sm-12" type="text" id="parteOH" <?php if($codInst != 10){echo 'disabled'; } ?> />
			</div>
			<div class="form-group col-sm-3">
				<label for="unidad_policia" class="control-label">Unidad Policial:</label>
				<input class="form-control col-sm-12" type="text" id="unidad_policia" <?php if($codInst != 10){echo 'disabled'; } ?> data-error="Debe ingresar datos" required>
				<div class="help-block with-errors col-sm-12"></div>
			</div>
		</div>
		<div class="form-inline row">
			<div class="form-group col-sm-3">
				<label for="gradoLesion" class="control-label">Pronóstico médico-legal:</label>
				<select name="gradoLesion" id="gradoLesion" class="form-control"> 
					<?php 
						$sql2 = "Select cod_grado,descripcion_lesion From eme_dau_atencion_grado_lesion where registroactivo=1 order by cod_grado";
                echo '<option value="0">Selec. grado</option>';
                $result2 = mysql_query($sql2);
                while ($row2=mysql_fetch_array($result2)){	
                  if ($codGradoLesion == $row2[0]){
                  	echo '<option value="'.$row2[0].'" selected="selected">'.$row2[1]. '</option>';
                  }else{
                    echo '<option value="'.$row2[0].'">'.$row2[1]. '</option>';
                  }
                }
						mysql_free_result($result2);
	        ?>
	      </select>
			</div>
			<div class="form-group col-sm-3">
				<label for="juzgado" class="control-label">Juzgado:</label>
				<input class="form-control" type="text" id="juzgado" <?php if($codInst != 10){echo 'disabled'; } ?> />
			</div>

			<div class="form-group col-sm-3">
				<label for="condicion_transito" class="control-label">Condición Tránsito:</label>
				<select name="condicion_transito" id="condicion_transito" class="form-control " <?php if($codInst != 10){echo 'disabled'; } ?>>
					<option value="7">Peatón</option>
					<option value="0">Conductor</option>
					<option value="5">Otro</option>
				</select>
			</div>
			<div class="form-group col-sm-3">
				<label for="placa_policia" class="control-label">N° Placa:</label>
				<input class="form-control" type="text" id="placa_policia" <?php if($codInst != 10){echo 'disabled'; } ?> data-error="Debe ingresar datos" required>
				<div class="help-block with-errors"></div>
			</div>
		</div>
		<div class="form-inline row">
			<div class="form-group col-sm-3">
				<label class="checkbox"><input type="checkbox" value="1" name="tec_oh" id="tec_oh" <?php if($codInst != 10){echo 'disabled'; } ?>>Presencia de TEC</label>

				<label class="checkbox"><input type="checkbox" value="1" name="drogas_oh" id="drogas_oh" <?php if($codInst != 10){echo 'disabled'; } ?>>Presencia de Otras Drogas</label>

				<label class="checkbox"><input type="checkbox" value="1" name="rechaza_oh" id="rechaza_oh" <?php if($codInst != 10){echo 'disabled'; } ?>>Rechaza toma alcoholemia</label>
			</div>
			<div class="form-group col-sm-9">
				<label for="observacionOH" class="control-label col-sm-12">Observaciones Alcoholemia:</label>
				<input class="form-control" type="text" id="observacionOH" <?php if($codInst != 10){echo 'disabled'; } ?> />
			</div>
		</div>
		<div class="form-group col-sm-12">
			<input class="btn btn-default" type="button" value="Guardar" style="width: 100%" onclick="<?php if($codInst == 10){echo 'guarda_alcoholemia_grado_lesion_dev();'; }else{echo 'guarda_alcoholemia_grado_lesion();'; } ?>" />
			<script> 
				fn_carga_tabla_signos_vitales();
			</script>
		</div>
	</form>
	<div id="resultado" class="row" align="center" />

</div>
</body>

</html>
<?php
mysql_close($con);
?>