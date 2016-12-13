<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>DOCUMENTO DE ATENCION URGENCIA (DAU)</title>
<link href="css/bootstrap.min.css" rel="stylesheet">
<script src="js/jquery-1.4.2.js"></script> 
<script type="text/javascript" src="js/app.js"></script>   
<link rel="stylesheet" href="css/jquery-ui-1.8.2.custom.css" type="text/css" media="all"/>
<script type="text/javascript" src="js/jquery-ui-1.8.2.custom.min.js"></script>

</head>
	<body>
		<div class="container">
			<div class="row">
				<div class="col-sm-12">
					<?php include("index.php"); ?>
					<form id="form1" name="form1" method="post" action="">
<!-- 					<input type="hidden" id="codDetalle" name="CodDetalle" value="<?php echo $codDetalle; ?>"/>
					<input type="hidden" id="codAten" name="codAten" value="<?php echo $codAten; ?>"/>
					<input type="hidden" id="codUsr" name="codUsr" value="<?php echo $codUsr; ?>"/>
					<input type="hidden" id="codInst" name="codInst" value="<?php echo $codInst; ?>"/> -->
					<label for="obs"></label>
					<textarea class="form-control" name="obs" cols="90" rows="10" id="obs"></textarea>
					<!--<input type="button" name="enviar" id="enviar" value="Enviar" onclick="guarda_sol_receta();" />-->
					<input class="btn btn-success btn-sm" name="enviar" id="enviar" type="button" onclick="guarda_sol_receta();" value="Enviar" style="width: 100%"/>
	        </form>
	      </div>
	    </div>
	  </div> 
  </body>
</html>