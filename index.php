<!DOCTYPE html>
<html lang="es-ES">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <script src="//code.jquery.com/jquery-1.10.2.js"></script>
    <script src="//code.jquery.com/ui/1.11.4/jquery-ui.js"></script>
    <script src="js/app.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js" integrity="sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS" crossorigin="anonymous"></script>
    <title>Productos Genericos </title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">
    <link rel="stylesheet" href="//code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css">
  </head>
  <body>
    <?php
      include("conexion.php");
      $query = "SELECT p.Id, p.codigo_producto as codigo, p.nombre as nombre, p.estado as estado FROM producto_generico p JOIN stock s ON s.codigo_producto = p.Id WHERE estado = 1 and s.cantidad > 10"; 
      $resultado = $mysqli->query($query);
    ?>
    <select name="product">
      <?php while ($product = $resultado->fetch_assoc()) { ?>
        <option ><?php echo $product["nombre"]; ?></option>
      <?php } ?>
    </select>
    <?php
      $resultado->free();
      $mysqli->close();
    ?>
    <script>
      $(function() {
          $( "#products" ).autocomplete({
              source: 'search.php'
          });
      });
    </script>   
  </body>
</html>