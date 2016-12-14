<?php
    @ob_start();
    session_start();
    //get search term
    $searchTerm = $_GET['term'];
    $arrayProducts = $_SESSION['array_products'];
    // foreach($arrayProducts->label as $position){
    //     echo var_dump($position);
    // }
    //$data = unserialize(urldecode($arrayProducts));
    var_dump($arrayProducts);
    // $input = preg_quote($searchTerm, '~');
    // $result = preg_grep('~^' . $input . '~', $arrayProducts);
    // echo json_encode($result);
    //var_dump($arrayProducts);
?>


<!--search.php <?php
    include("conexion.php");
    //get search term
    $searchTerm = $_GET['term'];
    // $query = "SELECT p.Id, p.codigo_producto as codigo, p.nombre as nombre, p.estado as estado FROM producto_generico p JOIN stock s ON s.codigo_producto = p.Id WHERE estado = 1 and s.cantidad > 10"; 
    $result = $mysqli->query("SELECT * FROM producto_generico p JOIN stock s ON s.codigo_producto = p.Id WHERE s.cantidad > 10 ORDER BY nombre ASC");
    while ($row = $result->fetch_assoc()) {
        $nombre = $row["nombre"];
        $codigo_producto = $row["codigo_producto"];
        $data[] = array( 
            'label' => $nombre,                                   
            'value' => $nombre,
            'codigo_producto'=> $codigo_producto
            );
    }
    //echo json_encode($data);
    $_SESSION['array_products'] = $data;
?> 
salida OK de autocomplete
[{ 
    "label":"BOLSA COLESTOMIA 75 MM",
    "codigo_producto":"404",
    "value":"BOLSA COLESTOMIA 75 MM"
}
,
{
    "label":"COLESTIRAMINA 250 gr",
    "codigo_producto":"1",
    "value":"COLESTIRAMINA 250 gr"
}]
-->


