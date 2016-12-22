<?php

	error_reporting(E_ALL);
	
	function mostrarFecha($fechaInformix){
		$fecha=substr($fechaInformix,8,2)."/".substr($fechaInformix,5 , 2)."/".substr($fechaInformix, 0, 4);	
		return $fecha;
	}
	
	function guardaFecha($fechaInformix){
		$fecha=substr($fechaInformix,6,4)."-".substr($fechaInformix,3,2)."-".substr($fechaInformix,0,2);
		return $fecha;
	}
	
	function calcularEdad($fechNac){
		
		$edad='';
		$dia_na    = substr($fechNac,0,2);  //al dia de nacimiento
		$mes_na    = substr($fechNac,3,2);  //mes de nacimiento
		$ano_na    = substr($fechNac,6,4);  //ano de nacimiento 
		//               en formato de 4 numeros  ( ej: 2008) 
	
		$diaactual= date("j");
		$mesactual= date("n");
		$anoactual= date("Y");
		$DxDias	=0;
		$DxMeses=0;
		$DxAnos	=0;
		
		if($dia_na == $diaactual && $mes_na == $mesactual && $ano_na == $anoactual){
			return "Nacido hoy";
		}
	
		//Calcular la diferencia de Dias
		$DxDias = $diaactual - $dia_na;
		if ($DxDias < 0){			
			$DxDias = 30 + $DxDias;
			$TxDias = "$DxDias D&iacute;as";
			$DxMeses++;
		}else{
			if($DxDias == 0){			
				$TxDias = "";
			}else{
				$TxDias = "$DxDias D&iacute;as";
			}
		}	
		//Diferencia de Meses
		$DxMeses = $mesactual - $mes_na - $DxMeses;
		if ($DxMeses < 0) {
			$DxMeses = 12 + $DxMeses;
			$TxAnos = "$DxAnos A&ntilde;os";
			$DxAnos++;
		}	
		if ($DxMeses > 1 ) {
			$TxMeses = "$DxMeses Meses";
		}else{
			if ($DxMeses == 1 ) {
				$TxMeses = "$DxMeses Mes";
			}
		}	
	
		//Diferencia de Anos
		$DxAnos = $anoactual - $ano_na - $DxAnos;
		if ($DxAnos > 1 ) {
			$TxAnos = "$DxAnos A&ntilde;os";
		}else{
			if ($DxAnos == 1) 
				$TxAnos = "$DxAnos A&ntilde;o";
			else 
				$TxAnos = "";
		}
		$edad = $TxAnos." ".$TxMeses." ".$TxDias;
		return $edad;
	}



	function calcularEdad_ano($fechNac){
		
		$edad='';
		$dia_na    = substr($fechNac,0,2);  //al dia de nacimiento
		$mes_na    = substr($fechNac,3,2);  //mes de nacimiento
		$ano_na    = substr($fechNac,6,4);  //ano de nacimiento 
		//               en formato de 4 numeros  ( ej: 2008) 
	
		$diaactual= date("j");
		$mesactual= date("n");
		$anoactual= date("Y");
		$DxDias	=0;
		$DxMeses=0;
		$DxAnos	=0;
		
		if($dia_na == $diaactual && $mes_na == $mesactual && $ano_na == $anoactual){
			return 0;
		}
	
	
		//Diferencia de Anos
		$DxAnos = $anoactual - $ano_na - $DxAnos;

		$edad = $DxAnos;
		return $edad;
	}

function calcularEdadCorta($fechNac){
		
		$edad='';
		$dia_na    = substr($fechNac,0,2);  //al dia de nacimiento
		$mes_na    = substr($fechNac,3,2);  //mes de nacimiento
		$ano_na    = substr($fechNac,6,4);  //ano de nacimiento 
		//               en formato de 4 numeros  ( ej: 2008) 
	
		$diaactual= date("j");
		$mesactual= date("n");
		$anoactual= date("Y");
		$DxDias	=0;
		$DxMeses=0;
		$DxAnos	=0;
		
		if($dia_na == $diaactual && $mes_na == $mesactual && $ano_na == $anoactual){
			return 0;
		}
	
	
		//Diferencia de Anos
		$DxAnos = $anoactual - $ano_na;
		$DxMeses = $mesactual - $mes_na;
		$DxDias = $diaactual - $dia_na;
		if($DxAnos == 0){
			if($DxMeses == 0){
				$edad = $DxDias.'D';
			}else{
				$edad = $DxMeses.'M';
			}
		}else{
			$edad = $DxAnos.'A';
		}
		
		return $edad;
	}

	
	
	function calcularTiempoEspera($fecha){
		
		$tiempo_espera_horas = 0;
		$tiempo_espera_minutos = 0;
		$tiempo_espera = 'No Hay Tiempo para calcular';
									
		$tiempo_total_minutos = time() - strtotime($fecha);
		$tiempo_total_minutos = $tiempo_total_minutos / 60;
				
		$tiempo_total_minutos = (int)($tiempo_total_minutos);
				
		if($tiempo_total_minutos >= 60){
			
			$tiempo_espera_horas = $tiempo_total_minutos / 60;
			$tiempo_espera_horas = (int)($tiempo_espera_horas);
			$tiempo_espera_minutos = $tiempo_total_minutos - ($tiempo_espera_horas * 60);
			$tiempo_espera = $tiempo_espera_horas." hrs. ".$tiempo_espera_minutos." min.";
		}elseif($tiempo_total_minutos < 60){
			$tiempo_espera = $tiempo_total_minutos.' min.';
		}
		
		return $tiempo_espera;
	}
		function calcularTiempoEspera_corta($fecha){
		
		$tiempo_espera_horas = 0;
		$tiempo_espera_minutos = 0;
		$tiempo_espera = 'No Hay Tiempo para calcular';
									
		$tiempo_total_minutos = time() - strtotime($fecha);
		$tiempo_total_minutos = $tiempo_total_minutos / 60;
				
		$tiempo_total_minutos = (int)($tiempo_total_minutos);
				
		if($tiempo_total_minutos >= 60){
			
			$tiempo_espera_horas = $tiempo_total_minutos / 60;
			$tiempo_espera_horas = (int)($tiempo_espera_horas);
			$tiempo_espera_minutos = $tiempo_total_minutos - ($tiempo_espera_horas * 60);
			$tiempo_espera = $tiempo_espera_horas."h".$tiempo_espera_minutos."m";
		}elseif($tiempo_total_minutos < 60){
			$tiempo_espera = $tiempo_total_minutos.'m';
		}
		
		return $tiempo_espera;
	}

	function calcularTiempoEspera_Minutos($fecha){
		
		$tiempo_espera_horas = 0;
		$tiempo_espera_minutos = 0;
									
		$tiempo_total_minutos = time() - strtotime($fecha);
		$tiempo_total_minutos = $tiempo_total_minutos / 60;
				
		$tiempo_total_minutos = (int)($tiempo_total_minutos);
					
		return $tiempo_total_minutos;
	}


	function gestionar_atencion_detalle($detalle, $atencion, $institucion, $usuario1, $anamnesis, $examen_fisico, $hipotesis,$indicacion_alta, $indicaciones, $observaciones){

		include_once("../../conexion/conexion.php");	
		
		$g=0;
		
		//OBTIENE ATENCION
		$sql_atencion = "select fk_admision from eme_dau_atencion where cod_aten=$atencion";
		$result_atencion = mysql_query($sql_atencion);
		$admision = mysql_result($result_atencion,0);
	
		$fechacrea = strftime( "%Y-%m-%d %H:%M", time() );
		
		if ($detalle==0){ //en caso de no tener detalle, agrega uno nuevo
		
			$sql0 = "insert into eme_dau_atencion_detalle
			(fecha_inicio,fecha_termino,fk_atencion,fk_usuario,pertinencia,registroactivo,codestadoindi,codusrejecindi, anamnesis,diagnostico,examen_fisico,indicacion_alta, indicaciones,observacion) 
			values 
			('$fechacrea','$fechacrea',$atencion,$usuario1,1,1,2,1,'$anamnesis','$hipotesis','$examen_fisico','$indicacion_alta', '$indicaciones', '$observaciones')";		
			$result0 = mysql_query( $sql0);
			
			$detalle=mysql_insert_id();
			if ($detalle>0){
				$g=1;		
			}
			
			
		}else{
			
			if(strlen($anamnesis)>0){
				$sql0 = "update eme_dau_atencion_detalle
				set anamnesis='$anamnesis',fk_usuario=$usuario1 where cod_detalle=$detalle";		
				$result0 = mysql_query( $sql0);
				if ($result0)$g=1;else$g=0;
			}
		
			if (strlen($hipotesis)>0){
				$sql0 = "update eme_dau_atencion_detalle
				set diagnostico='$hipotesis',fk_usuario=$usuario1 where cod_detalle=$detalle";		
				$result0 = mysql_query( $sql0);
				if ($result0)$g=1;else$g=0;
			}
		
			if(strlen($examen_fisico)>0){
				$sql0 = "update eme_dau_atencion_detalle
				set examen_fisico='$examen_fisico',fk_usuario=$usuario1 where cod_detalle=$detalle";		
				$result0 = mysql_query( $sql0);
				if ($result0)$g=1;else$g=0;
			}
			
			if (strlen($indicacion_alta)>0){
				$sql0 = "update eme_dau_atencion_detalle
				set indicacion_alta='$indicacion_alta',fk_usuario=$usuario1 where cod_detalle=$detalle";		
				$result0 = mysql_query( $sql0);			
				if ($result0)$g=1;else$g=0;
			}
			
			if (strlen($indicaciones)>0){
				$sql0 = "update eme_dau_atencion_detalle
				set indicaciones='$indicaciones',fk_usuario=$usuario1 where cod_detalle=$detalle";		
				$result0 = mysql_query( $sql0);
				if ($result0)$g=1;else$g=0;
			}
			
			if (strlen($observaciones)>0){
				$sql0 = "update eme_dau_atencion_detalle
				set observacion='$observaciones',fk_usuario=$usuario1 where cod_detalle=$detalle";		
				$result0 = mysql_query( $sql0);
				if ($result0)$g=1;else$g=0;
			}
			
						
		}
		
		//SI AGREGA ALGUN TEXTO
			if (strlen($observaciones)>0 || strlen($indicaciones)>0 || strlen($indicacion_alta)>0 || strlen($examen_fisico)>0 ||strlen($hipotesis)>0 || strlen($anamnesis)>0){
				//CAMBIA EL ESTADO DEL PACIENTE
				$estado = 8; // Estado: 8 Atención en box
				$sql_ice = "Insert into eme_dau_cambio_estado_atencion(fecha_registro,fk_admision,fk_estado,fk_usuario) values('".$fechacrea."',".$admision.",".$estado.",".$usuario1.")";
				$result_ice = mysql_query($sql_ice);
				mysql_free_result($result_ice);
			}
		
		
		
		if ($g==1)
			return $detalle;
		else
			return $sql0;
			
		//include_once("../../conexion/cerrar_conexion.php");
	}


	function gestionar_atencion_detalle_veces($veces,$detalle, $atencion, $institucion, $usuario1, $anamnesis, $examen_fisico, $hipotesis,$indicacion_alta, $indicaciones, $observaciones){

		include_once("../../conexion/conexion.php");		
		
		$g=0;
		$indicaciones=mysql_real_escape_string($indicaciones);
		$fechacrea = strftime( "%Y-%m-%d %H:%M", time() );
		
		if ($detalle==0){ //en caso de no tener detalle, agrega uno nuevo
		
			//ITERA LA CANTIDAD DE VECES INDICADAS EN SELECT
			for($i=0;$i<$veces;$i++){
				$sql0 = "insert into eme_dau_atencion_detalle
				(fecha_inicio,fecha_termino,fk_atencion,fk_usuario,pertinencia,registroactivo,codestadoindi,codusrejecindi, anamnesis,diagnostico,examen_fisico,indicacion_alta, indicaciones,observacion) 
				values 
				('$fechacrea','$fechacrea',$atencion,$usuario1,1,1,2,1,'$anamnesis','$hipotesis','$examen_fisico','$indicacion_alta', '$indicaciones', '$observaciones')";		
				$result0 = mysql_query( $sql0);
			}
			
			$detalle=mysql_insert_id();
			if ($detalle>0)
				$g=1;								
		}
		
		if ($g==1)
			return $detalle;
		else
			return 0;
			
		//include_once("../../conexion/cerrar_conexion.php");
	}

	

?>