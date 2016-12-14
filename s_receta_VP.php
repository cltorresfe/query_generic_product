<?php 
$codAten  = $_GET['codAten'];
$codInst  = $_GET['codInst'];
$codUsr   = $_GET['codUsr'];
$codDetalle = $_GET['codDetalle'];

$myfile = fopen("version.txt", "r") or die("No se puede abrir el archivo!");
$version= fread($myfile,filesize("version.txt"));
fclose($myfile);
						
 ?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>DOCUMENTO DE ATENCION URGENCIA (DAU)</title>
<link href="../../recursos/estilo/css/bootstrap.min.css" rel="stylesheet">
<script src="../../recursos/jquery/jquery-1.4.2.js"></script>
<script src="s_funciones.js<?php echo '?'.$version;?>"></script>
<script type="text/javascript" src="../../recursos/js/s_receta_vp.js"></script>   
<script type="text/javascript" src="../../recursos/jquery/jquery-ui-1.8.2.custom.min.js"></script>
</head>
    <body>
	<body>
	<div class="container">
		<div class="row">
			<div class="col-sm-12">
				<?php include("s_receta_productos_vp.php"); ?>
				<form id="form1" name="form1" method="post" action="">
				<input type="hidden" id="codDetalle" name="CodDetalle" value="<?php echo $codDetalle; ?>"/>
				<input type="hidden" id="codAten" name="codAten" value="<?php echo $codAten; ?>"/>
				<input type="hidden" id="codUsr" name="codUsr" value="<?php echo $codUsr; ?>"/>
				<input type="hidden" id="codInst" name="codInst" value="<?php echo $codInst; ?>"/>
				<label for="obs"></label>
				<textarea class="form-control" name="obs" cols="90" rows="10" id="obs"></textarea>
				<!--<input type="button" name="enviar" id="enviar" value="Enviar" onclick="guarda_sol_receta();" />-->
				<input class="btn btn-success btn-sm" name="enviar" id="enviar" type="button" onclick="guarda_sol_receta();" value="Enviar" style="width: 100%"/>
        </form>
    </body>
</html>