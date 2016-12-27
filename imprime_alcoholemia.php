<?php

$array = array("medico", "odontolog","nutricionista","enfermera", "matrona");
$long = count($array);
echo "<ul>";
for($i = 0 ; $i<$long ; $i++){
  echo "<li>".$array[$i]."</li>";
}
echo "</ul";

?>