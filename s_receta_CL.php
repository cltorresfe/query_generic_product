<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>DOCUMENTO DE ATENCION URGENCIA (DAU)</title>
<link href="css/bootstrap-3.3.7.min.css" rel="stylesheet">
<link rel="stylesheet" href="css/jquery-ui-1.11.4.min.css" type="text/css" media="all"/>
<script src="js/jquery-1.12.3.min.js"></script> 
<script type="text/javascript" src="js/s_receta_vp.js"></script>
<script type="text/javascript" src="js/bootstrap-3.3.7.min.js"></script>   
<script type="text/javascript" src="js/jquery-ui-1.11.4.min.js"></script>
<script type="text/javascript" src="js/validator.min.js"></script>

</head>
	<body>
		<div class="container">
		<div class="row">
		<?php include("s_receta_productos_vp.php"); ?>
			<div class="row">
				<div class="col-sm-12">
					
					<form id="form1" name="form1" method="post" action="">
					<label for="obs"></label>
					<textarea class="form-control" name="obs" cols="90" rows="10" id="obs"></textarea>
					<input class="btn btn-success btn-sm" name="enviar" id="enviar" type="button" onclick="guarda_sol_receta();" value="Enviar" style="width: 100%"/>
	        </form>
	      </div>
	    </div>
	  </div> 
  </body>
</html>