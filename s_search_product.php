<?php
    include("conexion_bd_vp.php");
    $query = "SELECT p.nombre as nombre, p.codigo_producto as codigo_producto, s.cantidad as cantidad FROM producto_generico p JOIN stock s ON s.codigo_producto = p.Id WHERE s.cantidad > 0 ORDER BY nombre ASC";
    $result = $mysqli->query($query);
    while ($row = $result->fetch_assoc()) {
        $nombre = utf8_encode($row["nombre"]);
        $codigo_producto = utf8_encode($row["codigo_producto"]);
        $stock = utf8_encode($row["cantidad"]);
        $data[] = array( 
            'label' => $nombre, 
            'codigo_producto' => $codigo_producto,                                   
            'value' => $nombre,
            'stock' => $stock
            );
    }
    echo json_encode($data);
?>