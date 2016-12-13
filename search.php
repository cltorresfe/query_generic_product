<?php
    include("conexion.php");
    //get search term
    $searchTerm = $_GET['term'];
    // $query = "SELECT p.Id, p.codigo_producto as codigo, p.nombre as nombre, p.estado as estado FROM producto_generico p JOIN stock s ON s.codigo_producto = p.Id WHERE estado = 1 and s.cantidad > 10"; 
    $result = $mysqli->query("SELECT * FROM producto_generico p JOIN stock s ON s.codigo_producto = p.Id WHERE nombre LIKE '%".$searchTerm."%' AND s.cantidad > 10 ORDER BY nombre ASC");
    while ($row = $result->fetch_assoc()) {
        $nombre = $row["nombre"];
        $codigo_producto = $row["codigo_producto"];
        $data[] = array( 
            'label' => $nombre, 
            'codigo_producto' => $codigo_producto,                                   
            'value' => $nombre
            );
    }
    echo json_encode($data);
?>
