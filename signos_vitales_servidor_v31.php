<?php
include_once("../../conexion/conexion.php");	

$myfile = fopen("version.txt", "r") or die("No se puede abrir el archivo!");
$version= fread($myfile,filesize("version.txt"));
fclose($myfile);

$codAtencion = $_GET['atencion'];
$codUsuario  = $_GET['codUsr'];
$codInst = $_GET['codInst'];

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
			#TB_iframeContent {
				padding-right: 7px;
		  }
		  #TB_window{
			  top: 20% !important;
		  }
		</style>

		<script src="../../recursos/js/jQuery-1.11.3/jquery-1.11.3.min.js"></script>
		<script src="../../recursos/jquery/calendario/jquery-ui-1.9.2.js"></script>
		<script src="../../recursos/estilo/js/bootstrap.min.js"></script>
		<script src="../../recursos/estilo/js/bootstrap-validator.min.js"></script>
		<script src="../../recursos/jquery/thickbox/thickbox.js"></script>

		<link rel="stylesheet" href="../../recursos/jquery/calendario/jquery-ui.css" />
		<link rel="stylesheet" href="../../recursos/estilo/css/bootstrap.min.css">
		<link rel="stylesheet" href="../../recursos/estilo/css/custom.css">
		<link rel="stylesheet" href="../../recursos/jquery/calendario/jquery.ui.datepicker.css" />
		<link rel="stylesheet" href="../../recursos/jquery/thickbox/thickbox.css" type="text/css" media="screen" />

		<script src="funciones.js<?php echo '?'.rand();?>"></script>

		<script>
		
		
		$(document).ready(function(){
	$('#imprime-alcoholemia').on('show.bs.modal', function(e) {
	  $(this).find('.btn-ok').attr('href', $(e.relatedTarget).data('href'));
	  $('.debug-url').html('Responsable: <strong>' + $("#cod_aten").val() + '</strong>');
	});
});

		
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
									<input class="form-control" type="number" id="txtPresion2" size="3" placeholder="mmHg" style="width: 100%"/>
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

					$condicion_transito = 0;
					$tec_oh = 0;
					$drogas_oh = 0;
					$rechaza_oh = 0;
					$placa_policia = "";
					$parteOH = "";
					$unidad_policia = "";
					$juzgado = "";
					$observacionOH = "";
					$imprimeOH ="0";
					$idOH = "";

					$sql1 = "SELECT cond_transito, tec, drogas, rechaza, placa_policia, parte, comiseria, juzgado, observaciones, imprime, id FROM eme_dau_atencion_alcoholemia WHERE fk_atencion = ".$codAtencion;
					$result1 = mysql_query($sql1);
					while ($row1=mysql_fetch_array($result1)){
						$condicion_transito = $row1[0];
						$tec_oh = $row1[1];
						$drogas_oh = $row1[2];
						$rechaza_oh = $row1[3];
						$placa_policia = $row1[4];
						$parteOH = $row1[5];
						$unidad_policia = $row1[6];
						$juzgado = $row1[7];
						$observacionOH = $row1[8];
						$imprimeOH = $row1[9];
						$idOH = $row1[10];
					}
					mysql_free_result($result1);
				?>
				<strong>Accidente y Alcoholemia:</strong>
				<form id="sv_form" data-toggle="validator" role="form">
					<input type="hidden" name="imprime_oh" id="imprime_oh" value="<?php echo $imprimeOH;?>"/>
					<div class="form-inline row">
						<div class="form-group col-sm-3">
							<label for="estadoEtilico" class="control-label">Estado etílico:</label>
							<select name="estadoEtilico" id="estadoEtilico" class="form-control" style="width: 100%" <?php if($imprimeOH == 1){echo 'disabled';} ?>> 
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
							<input class="form-control" type="text" id="nroFracoAlcoholemia" value="<?php echo $idOH;?>" style="width: 100%" />
						</div>
						<div class="form-group col-sm-3">
							<label for="parteOH" class="control-label">N° Parte:</label>
							<input class="form-control col-sm-12" type="text" id="parteOH" value="<?php echo $parteOH;?>" style="width: 100%" <?php if($codInst != 10 || $imprimeOH == 1){echo 'disabled'; } ?>/>
						</div>
						<div class="form-group col-sm-3">
							<label for="unidad_policia" class="control-label">Unidad Policial:</label>
							<input class="form-control col-sm-12" type="text" id="unidad_policia" style="width: 100%" <?php if($codInst != 10 || $imprimeOH == 1){echo 'disabled'; } ?> value="<?php echo $unidad_policia;?>">
						</div>
					</div>
					<div class="form-inline row">
						<div class="form-group col-sm-3">
							<label for="gradoLesion" class="control-label">Pronóstico médico-legal:</label>
							<select name="gradoLesion" id="gradoLesion" class="form-control" style="width: 100%"> 
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
							<input class="form-control" type="text" id="juzgado" style="width: 100%" <?php if($codInst != 10 || $imprimeOH == 1 ){echo 'disabled'; } ?> value="<?php echo $juzgado;?>" />
						</div>
						<div class="form-group col-sm-3">
							<label for="condicion_transito" class="control-label">Condición Tránsito:</label>
							<select name="condicion_transito" id="condicion_transito" class="form-control" style="width: 100%" <?php if($codInst != 10 || $imprimeOH == 1){echo 'disabled'; } ?>>
							<?php 
								echo ($condicion_transito == 7 ? "<option value='7' selected='selected'>Peatón</option>" : "<option value='7'>Peatón</option>");
								echo ($condicion_transito == 0 ? "<option value='0' selected='selected'>Conductor</option>" : "<option value='0'>Conductor</option>");
								echo ($condicion_transito == 5 ? "<option value='5' selected='selected'>Otro</option>" : "<option value='5'>Otro</option>");
							?>
							</select>
						</div>
						<div class="form-group col-sm-3">
							<label for="placa_policia" class="control-label">N° Placa:</label>
							<input class="form-control" type="text" id="placa_policia" style="width: 100%" <?php if($codInst != 10 || $imprimeOH == 1){echo 'disabled'; } ?> value="<?php echo $placa_policia;?>">
						</div>
					</div>
					<div class="row">
						<div class="form-group col-sm-3"  style="padding-left: 40px !important">
							<label class="checkbox">
							<input type="checkbox" value="1" name="tec_oh" id="tec_oh"
							<?php echo ($codInst != 10 || $imprimeOH == 1 ? 'disabled' : '');?> 
							<?php if($tec_oh==1){echo 'checked';}?>>Presencia de TEC</label>

							<label class="checkbox">
							<input type="checkbox" value="1" name="drogas_oh" id="drogas_oh" 
							<?php echo ($codInst != 10 || $imprimeOH == 1 ? 'disabled' : '');?> 
							<?php if($drogas_oh==1){echo 'checked';}?>>Presencia de Otras Drogas</label>

							<label class="checkbox">
							<input type="checkbox" value="1" name="rechaza_oh" id="rechaza_oh" 
							<?php echo ($codInst != 10 || $imprimeOH == 1 ? 'disabled' : '');?> 
							<?php if($rechaza_oh==1){echo 'checked';}?>>Rechaza toma alcoholemia</label>
						</div>
						<div class="form-group col-sm-9">
							<label for="observacionOH" class="control-label">Observaciones Alcoholemia:</label>
							<input class="form-control" type="text" id="observacionOH" style="width: 100%" <?php if($codInst != 10 || $imprimeOH == 1){echo 'disabled'; } ?> value="<?php echo $observacionOH;?>" />
						</div>
					</div>
					<div class="form-group col-sm-6">
						<input class="btn btn-default" type="button" id="btn_guardar_alcoholemia" value="Guardar" style="width: 100%" onclick="<?php if($codInst == 10){echo 'guarda_alcoholemia_grado_lesion_dev();'; }else{echo 'guarda_alcoholemia_grado_lesion();'; } ?>" <?php if($codInst == 10 && $imprimeOH == 1){echo 'disabled'; } ?>/>
						</div>
						<div class="form-group col-sm-6">
					   <input class="btn btn-default" type="button" value="Imprimir Boleta Alcoholemia" style="width: 100%" data-href="" data-toggle="modal" data-send="false"  data-target="#imprime-alcoholemia" <?php if($codInst != 10){echo 'disabled'; } ?>/>
					</div>
					<div class="form-group col-sm-12">
						<div id="resultado" class="row" align="center" />
					</div>
				</form>
			<?php
			$sql = 'SELECT 
			penetracion, 
			anticoncepcion, 
			profilaxis_vih, 
			profilaxis_its, 
			victimario, 
			embarazo
			FROM 
			eme_dau_atencion_as
			WHERE
			fk_atencion ='.$codAtencion.' LIMIT 1';

			$result = mysql_query($sql);

			$si_hay_as = mysql_num_rows($result);

			if($si_hay_as > 0){
				while ($row = mysql_fetch_array($result)){
					$cod_as_tpopen = $row[0];
					$cod_as_aco = $row[1];
					$cod_as_vih = $row[2];
					$cod_as_its = $row[3];
					$cod_as_vic = $row[4];
					$cod_as_emb = $row[5];
				}
			}

			?>
				<strong>Agresión Sexual:</strong>
				<div class="row" id="agresion_sexual">
					<div class="col-sm-6">
						<label for="if_as">Sospecha Violencia Sexual</label>
						<select id="if_as" name="if_as" onchange="muestra_as();" class="form-control">
							<option value="0" <?php if($si_hay_as == 0){ echo 'selected="selected"'; } ?>>No</option>
							<option value="1" <?php if($si_hay_as > 0){ echo 'selected="selected"'; } ?>>Si</option>
						</select>
					</div>
				</div>
				<div id="agresion_sexual_detalle" <?php if($si_hay_as == 0){ echo 'style="display: none"'; } ?>>
				<div class="row">
					<div class="col-sm-3">
						<label for="if_pen">Penetración</label>
						<select id="if_pen" name="if_pen" class="form-control">
							<?php
								$sql3 = "SELECT id,opcion FROM eme_dau_atencion_as_op_tpopen WHERE registroactivo=1 order by id";
	              echo '<option></option>';
	              $result3 = mysql_query($sql3);
	              while ($row3 = mysql_fetch_array($result3)){
	                if ($cod_as_tpopen == $row3[0]){
	                  echo '<option value="'.$row3[0].'" selected="selected">'.$row3[1]. '</option>';
	                }else{
	                  echo '<option value="'.$row3[0].'">'.$row3[1]. '</option>';
									}
		            }
								mysql_free_result($result3);
			        ?>
						</select>
					</div>
					<div class="col-sm-3">
						<label for="if_acoe">Anticoncepción Emergencia</label>
						<select id="if_acoe" name="if_acoe" class="form-control">
								<option></option>
								<option value="0" <?php if($cod_as_aco == '0'){ echo 'selected="selected"'; } ?>>No</option>
								<option value="1" <?php if($cod_as_aco == '1'){ echo 'selected="selected"'; } ?>>Si</option>
							</select>
					</div>
					<div class="col-sm-3">
							<label for="if_as_emb">Embarazo</label>
							<select id="if_as_emb" name="if_as_emb" class="form-control">
								<option></option>
								<option value="0" <?php if($cod_as_emb == '0'){ echo 'selected="selected"'; } ?>>No</option>
								<option value="1" <?php if($cod_as_emb == '1'){ echo 'selected="selected"'; } ?>>Si</option>
							</select>
					</div>
					<div class="col-sm-3">
							<label for="if_prof_vih">Profilaxis VIH</label>
							<select id="if_prof_vih" name="if_prof_vih" class="form-control">
								<option></option>
								<option value="0" <?php if($cod_as_vih == '0'){ echo 'selected="selected"'; } ?>>No</option>
								<option value="1" <?php if($cod_as_vih == '1'){ echo 'selected="selected"'; } ?>>Si</option>
							</select>
					</div>
				</div>
				<div class="row">
					<div class="col-sm-3">
							<label for="if_prof_its">Profilaxis ITS</label>
							<select id="if_prof_its" name="if_prof_its" class="form-control">
								<option></option>
								<option value="0" <?php if($cod_as_its == '0'){ echo 'selected="selected"'; } ?>>No</option>
								<option value="1" <?php if($cod_as_its == '1'){ echo 'selected="selected"'; } ?>>Si</option>
							</select>
					</div>
					<div class="col-sm-3">
							<label for="as_victimario">Victimario</label>
							<select id="as_victimario" name="as_victimario" class="form-control">
								<?php
									$sql3 = "SELECT id,opcion FROM eme_dau_atencion_as_op_vic WHERE registroactivo=1 order by id";
	                echo '<option></option>';
	                $result3 = mysql_query($sql3);
	                while ($row3 = mysql_fetch_array($result3)){
	                  if ($cod_as_vic == $row3[0]){
	                    echo '<option value="'.$row3[0].'" selected="selected">'.$row3[1]. '</option>';
	                  }else{
	                  	echo '<option value="'.$row3[0].'">'.$row3[1]. '</option>';
										}
	                }
									mysql_free_result($result3);
			          ?>
							</select>
					</div>
					<div class="col-sm-6">
						<label for="Guardar">&nbsp;</label>
						<input class="btn btn-default" style="width: 100%" type="button" value="Guardar"  onclick="guarda_as();" />
					</div>

				</div>
				</div>
			</div>
			<div class="modal fade" id="imprime-alcoholemia" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
				<div class="modal-dialog">
				 <div class="modal-content">
					<div class="modal-header">
					   <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
					   <h4 class="modal-title" id="myModalLabel">Imprime Alcoholemia</h4>
					</div>
				  <div class="modal-body">
						<p>¿Está seguro que quiere imprimir Alcoholemia?</p><br>
						<p style="font-size: 11px; color:#ff7701"><strong>Advertencia:</strong> Este es un <strong>Documento Legal</strong> y después no podrá ser modificado.</p>
				  </div>
				  <div class="modal-footer">
						<button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
						<a class="btn btn-danger btn-ok" id="accion_ver_imprimir" onclick="<?php if($codInst == 10){echo "abrir_boleta_alcoholemia($codAtencion,$imprimeOH );"; }else{echo ''; } ?>" data-dismiss="modal"><?php echo ($imprimeOH == 0 ? "Imprimir" : "Ver") ?></a>
				  </div>
				 </div>
				</div>
			</div>
		</body>
	<script> 
		fn_carga_tabla_signos_vitales();
	</script>
</html>
<?php
mysql_close($con);
?>