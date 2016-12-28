<?php
	$codAdmision  = $_GET['a'];
	$codAtencion  = $_GET['at'];
	$codUsuario   = $_GET['u'];	
	$lugar   	= $_GET['l'];	//lugar de ocurrencia
	$codInstitucion  	= $_GET['i'];	//lugar de ocurrencia
	$codTipoAdm   = $_GET['t'];
	if ($codTipoAdm=='')
		$codTipoAdm=1;	
	if ($codUsuario =='')
		$codUsuario =1;
	if ($codInstitucion=='')
		$codInstitucion=1;
	if ($codAtencion=='')
		$codAtencion=0;
	//echo $lugar;
	//echo "tipo: ".$codTipoAdm." admision: ".$codAdmision." usuario: ".$codUsuario." insitucion: ".$codInstitucion." tipo: ".$tipo;


	
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<link href="../../recursos/estilo/css/bootstrap.min.css" rel="stylesheet">
<script src="../../recursos/jquery/jquery-1.4.2.js"></script>
<script language="JavaScript">
	function inicio(){
		document.getElementById('clave').focus();
	}
	
	function valida(codAdmision){
		
		
		
		//alert("codAdmision: " + codAdmision);
		
		var clave =  document.getElementById('clave').value;
		var codigoUsuario =  document.getElementById('codUsuario').value;
		var lugar= '<?php echo $lugar; ?>';
		var tipo = '<?php echo $codTipoAdm; ?>';
		var iurl = 'valida_usuario.php?'+Math.random();
		var institucion = '<?php echo $codInstitucion; ?>';
		var at= <?php echo $codAtencion; ?>;

		var parametros = {
			"c" : clave,
			"a" : codAdmision,
			"u" : codigoUsuario,
			"l" : lugar,
			"t" : tipo,
			"i" : institucion,
			"at": at
		};
		//console.log(parametros);
		$.ajax({
			data:  parametros,
			url:   iurl,
			type:  'post',
			success:  function (rpta) {
				
				//alert("rpta: " + rpta);
				//console.log("rpta: " + rpta);
			var array 	= rpta.split("|");
			var rpta 	= array[0];
			var medico	= array[1];
			var enfermera = array[2];
			var alta_ptto = array[3];
			//console.log("rpta: " + rpta);
			//console.log(lugar);
				
			if (rpta>0){
				//console.log(lugar);
				if (lugar=='a'){ // solo para cuando se esta atendiendo
					parent.detalle.value='';
					parent.codUsuario.value=rpta;
					parent.fn_carga_tabla_recetas('fuera');
					parent.fn_carga_tabla_exa_rayos('fuera');
					parent.fn_carga_tabla_exa_lab('fuera');
					parent.fn_carga_tabla_indicaciones('fuera');
					parent.obtiene_ananamnesis('fuera');
					parent.obtiene_hipotesis('fuera');
					parent.obtiene_examen_fisico('fuera');
					parent.obtiene_examen_observacion('fuera');
					//if (rpta==3||rpta==816)
					parent.comprueba_permisos(rpta,<?php echo $codInstitucion; ?>);
					parent.document.getElementById('alta_post_tto').value=alta_ptto;
						//console.log(rpta,<?php echo $codInstitucion; ?>);
				}else if(lugar=='ll'){
					parent.ejecuta_llamado(<?php echo $codTipoAdm; ?>,<?php  echo $codAdmision; ?>,rpta,<?php echo $codInstitucion; ?>);
				}else if(lugar=='ns'){
					parent.ejecuta_nsp(<?php echo $codTipoAdm; ?>,<?php  echo $codAdmision; ?>,rpta,<?php echo $codInstitucion; ?>);		
				}else if(lugar=='pf'){
					if (medico==1)
						parent.ejecuta_fuga(<?php echo $codAtencion; ?>,<?php echo $codTipoAdm; ?>,<?php  echo $codAdmision; ?>,rpta,<?php echo $codInstitucion; ?>);
					else
						alert ('no tiene permisos suficientes');
				}else if(lugar=='rc'){
					if (medico==1)
						parent.ejecuta_categorizacion(<?php echo $codAtencion; ?>,<?php  echo $codAdmision; ?>,rpta);		
					else
						alert ('no tiene permisos suficientes');
				} else if(lugar=='rcl'){
					if (medico==1 || enfermera==1){
						parent.ejecuta_recategorizar(<?php  echo $codAdmision; ?>);		
					}else{
						alert ('no tiene permisos suficientes');
					}
				}
				
				
				parent.fn_cerrar_modal(rpta); //invoca el metodo del padre para cerrar 
				
				
			}else
				//document.getElementById('mensaje').style.visibility="visible";
				document.getElementById('mensaje').style.display="inherit";
			}, 
			error: function (){
				alert('Error inesperado, no se pudo comprobar el usuario');
			} 			
		});		
	
	}

function texto(e, textarea){
	var code = (e.keyCode ? e.keyCode : e.which);
	if(code == 13) { //Enter keycode
   		valida(<?php echo $codAdmision; ?>);
 }
}

</script>

<title>Documento sin título</title>
<style type="text/css">
body {
	background-color: #EAEAEA;
}
body,td,th {
	font-family: Arial, Helvetica, sans-serif;
}
</style>
</head>

<body onload="inicio();">
	<div class="container">
		<div class="row">
			<div class="col-sm-12 text-center">
				<img src="../../recursos/imagenes/Iconos/Color/secure.png" width="160" height="160" />
			</div>
		</div>
		<div class="row">
			<div class="col-sm-12">
				<div class="alert alert-danger" id="mensaje" style="display:none; margin-bottom:0px !important;">
					<strong>Error!</strong> Usuario sin permisos o contraseña invalida.
				</div>
				<!--<label id="mensaje" style="visibility:hidden; color:#F00">Contraseña inválida </label>-->
				<input type="hidden" id="codUsuario" name="codUsuario" value="<?php echo $codUsuario; ?>" /> 
			</div>
		</div>
		<div class="row">
			<div class="col-sm-6">
				<label for="clave">Contraseña</label>
			</div>
			<div class="col-sm-6">
				<input class="form-control" name="clave" type="password" id="clave" size="10" maxlength="20" onkeypress="texto(event, this);" />
			</div>
		</div>
		<div class="row">
			<div class="col-sm-12">
				<input class="btn btn-success" style="width: 100%" type="button" name="ingresa" id="ingresa" value="Autentificar" onclick="valida(<?php echo $codAdmision; ?>);" /> 
			</div>
		</div>
	</div>
</body>
</html>
