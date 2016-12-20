// JavaScript Document

function decode_utf8(s) { 

  return escape(s); 

}

function fn_cerrar_modal(){
	try{
		tb_remove(true);
	}catch(e){
		
		window.close();
	}
}

function guardar_laboratorio() {
   
   var estaTodoOk = 1;  
   	
   var usuario= document.getElementById('codUsr').value;
   var institucion= document.getElementById('codInst').value;	
   var atencion= document.getElementById('codAten').value;

   var observacion= document.getElementById('observacion').value;
   	   
   //recupero sólo los opt seleccionados
   var at="";
   for (i=0;i<document.getElementsByName('opt[]').length;i++){
		if(document.getElementsByName('opt[]').item(i).checked==true)	
			at= at+','+(document.getElementsByName('opt[]').item(i).value);
	}
	
    //alert("at: " + at + " observacion: " + observacion);
	
	
	if(at != ""){
		
		if (at.indexOf(',73') != -1) {
			
			if (observacion == "") {
		
				estaTodoOk = 0;			
				alert("Debe indicar el nombre del otro examen");
			}
		}
	
	}
	else{
	
		estaTodoOk = 0;
		alert("Debe seleccionar al menos un examen");	
	}
	
	
	if(estaTodoOk == 1){
		
		var iurl = 's_guarda_lab.php?'+Math.random();

		//jquery
		var parametros = {
			"at" : at,
			"observacion" : observacion,
			"institucion": institucion,
			"usuario": usuario,
			"atencion": atencion
	
		};
		
		$.ajax({
			data:  parametros,
			url:   iurl,
			type:  'post',
			success:  function (response) {
						texto="";
						
						if(response.trim() >0){
							ddetalle=response;
							document.getElementById('zz').disabled="true";
							location.href = "http://10.6.85.218/dau/vista/atencion/s_laboratorio_p.php?d="+ddetalle;	
						}else
							alert('La solicitud no puedo ser registrada, intente nuevamente');
			}, 
			error: function (){
				alert('Error inesperado, intente más tarde');
			} 			
		});
	}
	
}


function guardar_rayos() {
   
   	var estaTodoOk = 1;
   
	var usuario= document.getElementById('codUsr').value;
	var institucion= document.getElementById('codInst').value;	
	var atencion= document.getElementById('codAten').value;

   var observacion= document.getElementById('observacion').value;

   if (document.getElementById('izq').checked==true)
   		var izqu=1;
	else
		var izqu=0;

   if (document.getElementById('der').checked==true)
   		var dere=1;
	else
		var dere=0;
	   
   //recupero sólo los opt seleccionados
   var at="";
   for (i=0;i<document.getElementsByName('opt[]').length;i++){
		if(document.getElementsByName('opt[]').item(i).checked==true)	
			at= at+','+(document.getElementsByName('opt[]').item(i).value);
	}
	
	
	//alert("at: " + at + " observacion: " + observacion);
	
	if(at != ""){
		
		if (at.indexOf(',74') != -1) {
			
			if (observacion == "") {
		
				estaTodoOk = 0;			
				alert("Debe indicar el nombre del otro examen");
			}
		}
	
	}
	else{
	
		estaTodoOk = 0;
		alert("Debe seleccionar al menos un examen");	
	}
	
	
	if(estaTodoOk == 1){
	
		var iurl = 's_guarda_rayos.php?'+Math.random();
	
		//jquery
		var parametros = {
			"at" : at,
			"observacion" : observacion,
			"izq" : izqu,
			"der" : dere,
			"institucion": institucion,
			"usuario": usuario,
			"atencion": atencion
		};
		
		$.ajax({
			data:  parametros,
			url:   iurl,
			type:  'post',
			success:  function (response) {
						texto="";
						//alert(response);
						if(response.trim() > 0){
							ddetalle=response;
							document.getElementById('zz').disabled="true";
							location.href = "http://10.6.85.218/dau/vista/atencion/s_rayos_p.php?d="+ddetalle;					
						}else{
							alert('La solicitud no puedo ser registrada, intente nuevamente');
						}
			}, 
			error: function (){
				alert('Error inesperado, intente más tarde');
			} 			
		});	
	}
		
}




	function guarda_sol_receta() {
   
	var obs = document.getElementById('obs').value;
	var usuario= document.getElementById('codUsr').value;
	var institucion= document.getElementById('codInst').value;	
	var atencion= document.getElementById('codAten').value;

	
	
	var iurl = 's_guarda_receta.php?'+Math.random();

		var parametros = {
			"observacion" : obs,
			"institucion": institucion,
			"usuario": usuario,
			"atencion": atencion
		};
		
		$.ajax({
			data:  parametros,
			url:   iurl,
			type:  'post',
			success:  function (response) {
						texto="";
						
						if(response.trim() >0){
							window.location.replace("http://10.6.85.218/dau/vista/atencion/s_receta_p.php?rct="+response);						
						}else{
							alert('La recera no pudo ser registrada, intente nuevamente');
						}
			}, 
			error: function (){
				alert('Error inesperado, intente más tarde');
			} 			
		});	
}





function guardar_receta() {
   
	var detalle= document.getElementById('detalle').value;
	var observacion= document.getElementById('observacion').value;
	observacion = decode_utf8(observacion);
		
	var iurl = 'guarda_receta.php?'+Math.random();

	if (observacion.length>0)
	{
		var parametros = {
			'detalle' : detalle,
			'observacion' : observacion
		};
		
		$.ajax({
			data:  parametros,
			url:   iurl,
			type:  'post',
			success:  function (response) {
						texto='';
						
						if(response.trim() >0){
							ddetalle=response;
							document.getElementById('zz').disabled='true';
							location.href = "http://10.6.85.218/dau/vista/atencion/receta_p.php?rct="+ddetalle+'&cda='+detalle;						
						}else{
							alert('La receta no puedo ser registrada, intente nuevamente');
						}
			}, 
			error: function (){
				alert('Error inesperado, intente más tarde');
			} 			
		});	
	}else
		alert('Debe ingresar prescripciones');
}




function guardar_cambio_estado_indi() {
			
   
	//var detalle= frames.iframeCambioEstadoIndicacion.document.getElementById('detalle').value;
	var detalle= document.getElementById('detalle').value;
	var estado= document.getElementById('estado').value;
	var usuario= document.getElementById('usuario').value;
	var observacion= document.getElementById('observacion').value;
	
	var iurl = 'guarda_estado_proc.php?'+Math.random();

	if (estado>0)
	{
		var parametros = {
			"detalle" : detalle,
			"estado" : estado,
			"usuario": usuario,
			"observacion": observacion
		};
		
		$.ajax({
			data:  parametros,
			url:   iurl,
			type:  'post',
			success:  function (response) {
						texto="";
						if(response.trim() =='g'){
							 fn_cerrar_modal();
							
							alert('OK');
											
						}else{
							alert('El cambio de estado no pudo ser registrado, intente nuevamente');
						}
			}, 
			error: function (){
				alert('Error inesperado, intente más tarde');
			} 			
		});	
	}else
		alert('Debe seleccionar un estado')
}


function guarda_sic() {
   
	var d = document.getElementById('d').value;
	var i = document.getElementById('i').value;
	var a = document.getElementById('a').value;
	var u = document.getElementById('u').value;
	var centro = document.getElementById('centro').value;
	var espe = document.getElementById('espe').value;
	var para = document.getElementById('para').value;
	var diag = document.getElementById('diag').value;
	var ges = document.getElementById('ges').value;
	var fund = document.getElementById('fund').value;
	var exam = document.getElementById('exam').value;
	
		var iurl = 's_guarda_sic.php?'+Math.random();

	//alert(espe);

	if (espe>0 && fund.length>0){
		var parametros = {
			'd' : d,
			'i' : i,
			'a' : a,
			'u' : u,
			'centro' : centro,
			'espe' : espe,
			'para' : para,
			'diag' : diag,
			'ges' : ges,
			'fund' : fund,
			'exam' : exam
		};
		console.log(parametros);
		$.ajax({
			data:  parametros,
			url:   iurl,
			type:  'post',
			success:  function (response) {
						//alert(response);
						if(response.trim() >0){
							parent.obtiene_sic();
							location.href = "http://10.6.85.218/dau/vista/atencion/s_sic_p.php?sic="+response+"&i="+i;						
						}else{
							alert('La IC no puedo ser registrada, intente nuevamente');
							console.log(response);
						}
			}, 
			error: function (){
				alert('Error inesperado, intente más tarde');
			}
		});	
	}else
		alert('debe seleccionar la especialidad y/o fundamentos');
}