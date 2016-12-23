function error_sesion(){
	pagina='/dau/vista/expira.php';
	configuracion = "KeepThis=true&TB_iframe=true&width=410&height=510&modal=true";
	url = pagina+"?"+configuracion+"&"+Math.random();
	tb_show('Sesion expirada', url);
	}

function stringToDate(_date,_format,_delimiter){
			//stringToDate("17/9/2014","dd/MM/yyyy","/");
            var formatLowerCase=_format.toLowerCase();
            var formatItems=formatLowerCase.split(_delimiter);
            var dateItems=_date.split(_delimiter);
            var monthIndex=formatItems.indexOf("mm");
            var dayIndex=formatItems.indexOf("dd");
            var yearIndex=formatItems.indexOf("yyyy");
            var month=parseInt(dateItems[monthIndex]);
            month-=1;
            var formatedDate = new Date(dateItems[yearIndex],month,dateItems[dayIndex]);
            return formatedDate;
}

function getValue(){

	var start = document.getElementById("fur").value;
		
	var today = new Date();
	//alert('Hoy: '+today);
	var fur = stringToDate(start,"dd-mm-yyyy","-");
	//alert('FUR: '+fur);
	var eg = Math.floor((today - fur)/ 86400000);
	var ege = '';
	if ((eg < 7)&&(eg>0)) {
		ege = eg + "d";
	}else if(eg<=0) {
		ege='<span class="text-danger"> Error! La fecha de última regla no puede ser igual o mayor que la actual</span>'
	}else if (eg>7){
		var dia = eg % 7;
		var sem = Math.floor(eg / 7);
		if (dia > 0 ) {
			ege =  sem + "s" + "+" + dia + "d";	
		}else {
			ege =  sem + "s";	
		}
	}
	document.getElementById('div_fur').innerHTML=ege;
	var fpp = '';	
	//fpp = new Date();
	fpp = fur;
	//alert(fpp.getDate());
	fpp.setDate(fur.getDate() + 280);
	//alert(fpp);
	document.getElementById('div_fpp').innerHTML=fpp.getDate()+'/'+(fpp.getMonth()+1)+'/'+fpp.getFullYear();
}


function guarda(tipo)
{
	
	var menu=document.getElementById('idmenu').value;
	guarda_atencion_medica();
	
	if (tipo=='bloqueo'){
		document.getElementById('estado').style.visibility="hidden";
		document.getElementById('detalle').value='';
		
		window.frames[1].anamnesis.value='';
		window.frames[1].examen_fisico.value='';
		window.frames[1].hipotesis.value='';
		window.frames[2].observaciones.value='';
		window.frames[4].indicaciones_alta.value='';
		
		fn_bloqueo();
	}else{
		//alert('guardado correctamente');
		document.getElementById('estado').style.visibility="visible";
		var v=setTimeout(function(){document.getElementById('estado').style.visibility="hidden"},8000);
	}
	
	if (document.getElementById('tipoAtencion').value==3)
		guarda_uego();
	
	
}

	function cambia_cant(c){
		if(c.value==1){
			//document.getElementById('lab_cant').innerHTML="Vez";
		}else{
			//document.getElementById('lab_cant').innerHTML="Veces";	
		}
	}
	

function guarda_atencion_medica() {
   	
	var anamnesis=window.frames[1].anamnesis.value;	
	var examen_fisico= window.frames[1].examen_fisico.value;
	var hipotesis= window.frames[1].hipotesis.value;
	var observacion=window.frames[2].observaciones.value;
	var indicaciones=window.frames[4].indicaciones_alta.value;
	var auge=window.frames[4].selectAuge.value;
	
	var destino=window.frames[4].destino_consultante.value;
	var pertinencia=window.frames[4].selectPertinencia.value;
	
	var sospecha_ges=window.frames[1].sospecha_ges.value;
	
	
	// COMENTE ESTO POR LA Ñ Y LOS TILES
	//anamnesis=decode_utf8(anamnesis);
	//examen_fisico=decode_utf8(examen_fisico);
	//hipotesis=decode_utf8(hipotesis);
	//observacion=decode_utf8(observacion);
	//indicaciones=decode_utf8(indicaciones);
	
	
	var box=window.frames[1].box.value;
	var condicion=window.frames[1].condicion_ingreso.value;
	var derivacion=window.frames[1].derivar_a.value;	
		
	var usuario= document.getElementById('codUsuario').value;
	var institucion= document.getElementById('codInstitucion').value;
	var atencion= document.getElementById('codAtencion').value;
	var detalle=  document.getElementById('detalle').value;
	
	
	//GUARDA ALCOHOLEMIA
	guarda_alcoholemia_grado_lesion('fuera');
	
	if (detalle=='')
		detalle=0;
	
	var iurl = 'guarda_atencion_medica.php?'+Math.random();

		var parametros = {
			"anamnesis" : anamnesis,
			"examen_fisico" : examen_fisico,
			"hipotesis" : hipotesis,
			"detalle" : detalle,
			"institucion": institucion,
			"usuario": usuario,
			"atencion": atencion,
			"observacion": observacion,
			"indicaciones": indicaciones,
			"box": box,
			"condicion": condicion,
			"derivacion": derivacion,
			"auge": auge,
			"destino": destino,
			"pertinencia": pertinencia,
			"sospecha_ges": sospecha_ges
		};
		//console.log(parametros);
		$.ajax({
			data:  parametros,
			url:   iurl,
			type:  'post',
			success:  function (response) {
						texto="";
						
						if(response.trim() >0){
							document.getElementById('detalle').value=response;
							obtiene_ananamnesis();
							obtiene_examen_fisico();
							obtiene_hipotesis();
							obtiene_indicaciones_alta();
							obtiene_examen_observacion('fuera');
							obtiene_cie10('fuera');
							
						}else if(response=='v')
							var a=1; //no hace  nada dummy
						else
							alert('Los datos de atencion no fueron registrados, favor intente nuevamente');
			}, 
			error: function (){
				alert('Error inesperado, al intentar registrar datos de atencion, intente más tarde');
			} 			
		});	
}


function if_auge_ges2(atencion,lugar){
	
	var iurl = 'obtener_if_ges.php?'+Math.random();
		var parametros = {
			"a" : atencion
		};
		
		$.ajax({
			data:  parametros,
			url:   iurl,
			type:  'get',
			success:  function (response) {
					if (lugar=='fuera')
						window.frames[4].div_destino_ges.innerHTML=response;
					else	
						document.getElementById('div_destino_ges').innerHTML=response;
					
											
			}, 
			error: function (){
				alert('Error inesperado, no se pudo obtener listado ges');
			} 			
		});	
}



function auge_ges(){
	if(document.getElementById('selectAuge').value=='Si')
		fn_datos_ges();
}


function fn_datos_ges(){
	pagina='datos_ges.php';
	configuracion = "KeepThis=true&TB_iframe=true&width=500&height=200&modal=false";
	url = pagina+"?"+configuracion+"&"+Math.random();
	tb_show('Datos GES', url);
}



function agitacion_uego(){
	if (document.getElementById('agitacion').value==1){
		document.getElementById('medidas').style.visibility="visible";
		document.getElementById('lab_medidas').style.visibility="visible";
		//document.getElementById('con_medidas').style.visibility="visible";
	}else {
		document.getElementById('medidas').style.visibility="hidden";
		//document.getElementById('con_medidas').style.visibility="hidden";
		document.getElementById('lab_medidas').style.visibility="hidden";
	}
}







function imprimir_eco(eco) {

	pagina='ecografia_p.php';
	variables = "eco="+eco;
	configuracion = "KeepThis=true&TB_iframe=true&width=600&height=450&modal=false";
	url = pagina+"?"+variables+"&"+configuracion+"&"+Math.random();
	tb_show('Impresion Ecografia', url);
}


function guarda_uego_eco(codigo,resultado) {
	
	var atencion= parent.document.getElementById('codAtencion').value;
	var detalle=  parent.document.getElementById('detalle').value;
	var institucion=  parent.document.getElementById('codInstitucion').value;
	var usuario=  parent.document.getElementById('codUsuario').value;
	var eco=  document.getElementById('ecografia').value;
	
	if (detalle=='')
		detalle=0;
	
	var iurl = 'guarda_uego_eco.php';

			var parametros = {
			"eco" : codigo,
			"detalle" : detalle,
			"atencion": atencion,
			"institucion": institucion,
			"usuario": usuario,
			"resultado": resultado,
			"eco":eco
			
		};

		$.ajax({
			data:  parametros,
			url:   iurl,
			type:  'post',
			success:  function (response) {
						//alert(response);
						if(response.trim() > 0){
							imprimir_eco(response);
							obtiene_uego_eco();
							fn_cerrar_modal();
						}else{
							alert('El examen no fue registrado, favor intente nuevamente');
						}
			}, 
			error: function (){
				alert('Error inesperado, al intentar registrar la ecografia, intente más tarde');
			} 			
		});	
}


function limpia_uego_control() {
	
	var lcf=  document.getElementById('lcf').value="";
	var dilatacion=  document.getElementById('dilatacion').value="";
	var estado=  document.getElementById('membrana').value="";
	var rbne=  document.getElementById('rbne').selectedIndex=0;
	var hidratacion=  document.getElementById('hidratacion').selectedIndex=0;
	var agitacion=  document.getElementById('agitacion').selectedIndex=0;
	var medidas=  document.getElementById('medidas').selectedIndex=0;
}

function guarda_uego_control(codigo) {
	
	var atencion= parent.document.getElementById('codAtencion').value;
	var detalle=  parent.document.getElementById('detalle').value;
	var institucion=  parent.document.getElementById('codInstitucion').value;
	var usuario=  parent.document.getElementById('codUsuario').value;
	var lcf=  document.getElementById('lcf').value;
	var dilatacion=  document.getElementById('dilatacion').value;
	var estado=  document.getElementById('membrana').value;
	var rbne=  document.getElementById('rbne').value;
	var hidratacion=  document.getElementById('hidratacion').value;
	var agitacion=  document.getElementById('agitacion').value;
	var medidas=  document.getElementById('medidas').value;

	if (agitacion==2)//si agitacion es no, tambien medidas
		medidas=2;

	
	if (detalle=='')
		detalle=0;
	
	var iurl = 'guarda_uego_control.php';

			var parametros = {
			"codigo" : codigo,
			"detalle" : detalle,
			"atencion": atencion,
			"institucion": institucion,
			"usuario": usuario,
			"lcf": lcf,
			"dilatacion":dilatacion,
			"estado":estado,
			"rbne":rbne,
			"hidratacion":hidratacion,
			"agitacion":agitacion,
			"medidas":medidas
		};

		$.ajax({
			data:  parametros,
			url:   iurl,
			type:  'post',
			success:  function (response) {
						if(response.trim() >0){
							limpia_uego_control();
							obtiene_uego_control();
						}else{
							alert('El examen no fue registrado, favor intente nuevamente');
						}
			}, 
			error: function (){
				alert('Error inesperado, al intentar registrar el diagnostico, intente más tarde');
			} 			
		});	
		
}


function control_obstetrico(){

if (document.getElementById('tipo_atencion').value==1){
	document.getElementById('div_control').style.visibility="hidden";
}else{
	document.getElementById('div_control').style.visibility="visible";
}
}

function guarda_uego() {
	
	var atencion= document.getElementById('codAtencion').value;
	
	var paridad= window.frames[1].paridad.value;
	var clasificacion= window.frames[1].clasificacion.value;
	
	var anticonceptivos=window.frames[5].anticonceptivos.value;
	var peritaje=window.frames[5].peritaje.value;
	var diagnostico= window.frames[5].diagnostico_ref.value;
	var tipo_atencion=window.frames[5].tipo_atencion.value;
	var fur= window.frames[5].fur.value;
	
	

	var iurl = 'guarda_uego.php';

			var parametros = {
			"atencion": atencion,
			"paridad": paridad,
			"clasificacion": clasificacion,
			"anticonceptivos":anticonceptivos,
			"peritaje":peritaje,
			"diagnostico":diagnostico,
			"tipo_atencion":tipo_atencion
			
		};
		//console.log(parametros);

		$.ajax({
			data:  parametros,
			url:   iurl,
			type:  'post',
			success:  function (response) {
						if((response.trim() =='g')||(response.trim() =='m')){

						}else{
							alert('Los datos ginecologicos no fueron guardados, favor intente nuevamente');
						}
			}, 
			error: function (){
				alert('Error inesperado, al intentar registrar el diagnostico, intente más tarde');
			} 			
		});	
		
}


function obtiene_uego(){
		//alert('a');
		var atencion= parent.document.getElementById('codAtencion').value;
				
		var data = {
		  "action": "test",
		  "atencion": atencion
		};
		data = $(this).serialize() + "&" + $.param(data);
		$.ajax({
		  type: "POST",
		  dataType: "json",
		  url: "busca_uego.php", //Relative or absolute path to response.php file
		  data: data,
		  success: function(data) {	
			if (data["paridad"]>0){
				//alert(data["tipo_atencion"]);
				document.getElementById('tipo_atencion').selectedIndex=recorrer(document.getElementById('tipo_atencion'),data["tipo_atencion"]);
				document.getElementById('anticonceptivos').selectedIndex=recorrer(document.getElementById('anticonceptivos'),data["anticonceptivos"]);			
				document.getElementById('peritaje').selectedIndex=recorrer(document.getElementById('peritaje'),data["peritaje"]);			
				document.getElementById('diagnostico_ref').selectedIndex=recorrer(document.getElementById('diagnostico_ref'),data["diagnostico"]);	
				control_obstetrico();			
			}			
		  }
		});
		return false;
}


function obtiene_destino_pertinencia(lugar){
		
		var atencion= parent.document.getElementById('codAtencion').value;
				
		var data = {
		  "action": "test",
		  "atencion": atencion
		};
		data = $(this).serialize() + "&" + $.param(data);
		$.ajax({
		  type: "POST",
		  dataType: "json",
		  url: "obtener_destino_pertinencia.php", //Relative or absolute path to response.php file
		  data: data,
		  success: function(data) {	
		  
			if (data["destino"]>0){
				//alert(data["destino"]);
				if(lugar=='local'){	
					//alert(data["pertinencia"]);	
					document.getElementById('destino').selectedIndex=recorrer(document.getElementById('destino'),data["destino"]);				
					document.getElementById('selectPertinencia').selectedIndex=recorrer(document.getElementById('selectPertinencia'),data["pertinencia"]);
					obtiene_destino_consultante_selecciona(data["destino_consultante"]);
				
				}else{
					
					window.frames[4].destino.selectedIndex=recorrer(document.getElementById('destino'),data["destino"]);					
					window.frames[4].selectPertinencia.selectedIndex=recorrer(document.getElementById('selectPertinencia'),data["pertinencia"]);
					obtiene_destino_consultante_selecciona(data["destino_consultante"]);
					//window.frames[4].destino_consultante.selectedIndex=recorrer(document.getElementById('destino_consultante'),data["destino_consultante"]);

					
				}
			}			
		  }
		});
		return false;
}


			
			
			

function obtiene_uego_datos_clinicos(){
		//alert('a');
		var atencion= parent.document.getElementById('codAtencion').value;
				
		var data = {
		  "action": "test",
		  "atencion": atencion
		};
		data = $(this).serialize() + "&" + $.param(data);
		$.ajax({
		  type: "POST",
		  dataType: "json",
		  url: "busca_uego.php", //Relative or absolute path to response.php file
		  data: data,
		  success: function(data) {	
			if (data["paridad"]>0){
				document.getElementById('paridad').selectedIndex=recorrer(document.getElementById('paridad'),data["paridad"]);
				document.getElementById('clasificacion').selectedIndex=recorrer(document.getElementById('clasificacion'),data["clasificacion"]);			

			}			
		  }
		});
		return false;
}




function obtiene_uego_control(origen) {
	if(origen=='fuera')
		var atencion=  document.getElementById('codAtencion').value;
	else
		var atencion=  parent.document.getElementById('codAtencion').value;
		
	var iurl = 'obtener_uego_control.php?'+Math.random();


		var parametros = {
			"atencion" : atencion
		};
		
		$.ajax({
			data:  parametros,
			url:   iurl,
			type:  'get',
			success:  function (response) {
					
					if(origen=='fuera')
						window.frames[1].listado_control.innerHTML=response;
					else
						document.getElementById('listado_control').innerHTML=response;
			}, 
			error: function (){
				alert('Error inesperado, no se pudo obtener listado de diagnosticos CIE10');
			} 			
		});	
}




function obtiene_uego_eco(origen) {
	if(origen=='fuera')
		var atencion=  document.getElementById('codAtencion').value;
	else
		var atencion=  parent.document.getElementById('codAtencion').value;
		
	var iurl = 'obtener_uego_eco.php?'+Math.random();


		var parametros = {
			"atencion" : atencion
		};
		
		$.ajax({
			data:  parametros,
			url:   iurl,
			type:  'get',
			success:  function (response) {
					//alert(response);
					if(origen=='fuera')
						window.frames[1].listado_eco.innerHTML=response;
					else
						document.getElementById('listado_eco').innerHTML=response;
			}, 
			error: function (){
				alert('Error inesperado, no se pudo obtener listado de diagnosticos CIE10');
			} 			
		});	
}




function fn_informe_eco(tipo) {
	
	var valor=tipo.value;
	pagina='ecografia.php';
	variables = "valor="+valor;
	configuracion = "KeepThis=true&TB_iframe=true&width=600&height=340&modal=false";
	url = pagina+"?"+variables+"&"+configuracion+"&"+Math.random();
	tb_show('Informe Ecografia', url);
}




function fn_dau_cerrado(){
	var usuario= document.getElementById('codUsuario').value;
	var institucion= document.getElementById('codInstitucion').value;
	location.href = "/dau/vista/listadoPacientesBox/index.php?u="+usuario+"&i="+institucion;
}


function lanza_error(cantErrores,box,condicionIngreso,derivarA,destinoConsultante,anamnesis,diagnosticos,solPendientes,indiPendientes,clasificacion,paridad,derivacionCAE,selectAuge_e) {
	pagina='error.php';
	variables = "cantErrores="+cantErrores+"&box="+box+"&condicionIngreso="+condicionIngreso+"&derivarA="+derivarA+"&destinoConsultante="+destinoConsultante;
	variables = variables + "&anamnesis="+anamnesis+"&diagnosticos="+diagnosticos+"&solPendientes="+solPendientes+"&indiPendientes="+indiPendientes+"&clasificacion="+clasificacion+"&paridad="+paridad+"&derivacionCAE="+derivacionCAE+"&selectAuge_e="+selectAuge_e;
	configuracion = "KeepThis=true&TB_iframe=true&width=300&height=300&modal=false";
	url = pagina+"?"+variables+"&"+configuracion+"&"+Math.random();
	tb_show('Error finalizar atencion', url);
}


function error(valor) {
	
	pagina='error2.php';
	variables = "valor="+valor;
	configuracion = "KeepThis=true&TB_iframe=true&width=300&height=300&modal=false";
	url = pagina+"?"+variables+"&"+configuracion+"&"+Math.random();
	tb_show('Error al intentar finalizar', url);
}




function validar_finalizar_atencion() {

	guarda_atencion_medica();
	
	if (document.getElementById('tipoAtencion').value==3)
		guarda_uego();
	
	guarda_alcoholemia_grado_lesion('fuera');

	var hayErrores = 0
	var datosFaltantes = "";
	var box = window.frames[1].box.value;
	var selectAuge = window.frames[4].selectAuge.value;
	
	
	if(window.frames[1].lugar_atencion.value==3){
		var paridad = window.frames[1].paridad.value;
		var clasificacion = window.frames[1].clasificacion.value;
	}
	
	var condicionIngreso = window.frames[1].condicion_ingreso.value; 
	var derivarA = window.frames[1].derivar_a.value;
	var destinoConsultante = window.frames[4].destino_consultante.value;
	
	
	var atencion=  document.getElementById('codAtencion').value;
	var am=0;// 1 indica si hay error en pagina atencion medica
	var exa=0;//1 indica si hay error en pgina de examenes
	var box_e = "";
	var condicionIngreso_e = "";
	var derivarA_e = "";
	var destinoConsultante_e = "";
	var anamnesis_e = "";
	var diagnosticos_e = "";
	var solicitudes_pendientes_e = "";
	var indicaciones_pendientes_e = "";
	var clasificacion_e="";
	var paridad_e="";
	var derivacionCAE_e = "";	
	var selectAuge_e=" ";
	var iurl = 'valida_cierre.php?'+Math.random();

		
	var data = {
      "a" : atencion
    };
	
	data = $(this).serialize() + "&" + $.param(data);		 
			 
	  $.ajax({
		  type: "GET",
		  dataType: "json",
		  url: "valida_cierre.php", //Relative or absolute path to response.php file
		  async: false, // RODOLFO, ESTA ES LA LINEA
		  data: data,
		  success: function(data) {	
				

				window.frames[2].divListadoExaLab.style.border="hidden";
				window.frames[2].divListadoExaRayos.style.border="hidden";
				window.frames[2].divListadoIndicaciones.style.border="hidden";
				
				window.frames[1].anamnesis.style.borderColor='#999';
				//window.frames[1].cie.style.borderColor='#999';
				window.frames[1].box.style.borderColor='#999';
				window.frames[1].condicion_ingreso.style.borderColor='#999';
				window.frames[1].derivar_a.style.borderColor='#999';
		
				
				//atencion medica
				if(data["anamnesis"]==0){
					window.frames[1].anamnesis.style.borderColor='#F00';
					hayErrores = hayErrores + 1;
					anamnesis_e='e';
				}	
				
				//EN CASO DE SER ATENCION GINECOLOGICA
				if(window.frames[1].lugar_atencion.value==3){
					if(paridad==0){
						window.frames[1].paridad.style.borderColor='#F00';
						hayErrores = hayErrores + 1;
						paridad_e='e';							
					}

					if(clasificacion==0){
						window.frames[1].clasificacion.style.borderColor='#F00';
						hayErrores = hayErrores + 1;
						clasificacion_e='e';							
					}
				}
			

				if(data["diagnosticos"]==0){
					window.frames[1].cie10.style.borderColor='#F00';
					hayErrores = hayErrores + 1;
					diagnosticos_e='e';
				}

				if (box == 0){
					window.frames[1].box.style.borderColor='#F00';
					hayErrores = hayErrores + 1;
					box_e='e';
				}
				
				if (condicionIngreso == 0){
					window.frames[1].condicion_ingreso.style.borderColor='#F00';
					hayErrores = hayErrores + 1;
					condicionIngreso_e='e';
				}
				
				if (derivarA == 0){
					window.frames[1].derivar_a.style.borderColor='#F00';
					hayErrores = hayErrores + 1;
					derivarA_e='e';
				}

				
				if (hayErrores>0){// si hay errores en la atencion medica visualizo el frame
					am=1;
					document.getElementById("datos_med").style.visibility="visible";
					document.getElementById("datos_exa").style.visibility="hidden";
					document.getElementById("datos_sig").style.visibility="hidden";
					document.getElementById("datos_alta").style.visibility="hidden";
					document.getElementById("datos").style.visibility="hidden"					
				}
				
				
				if(data["solicitudes_pendientes"]>0){
					hayErrores = hayErrores + 1;
					solicitudes_pendientes_e = 'e';
					window.frames[2].divListadoExaLab.style.borderStyle="solid";
					window.frames[2].divListadoExaLab.style.borderColor='#F00';

					window.frames[2].divListadoExaRayos.style.borderStyle="solid";
					window.frames[2].divListadoExaRayos.style.borderColor='#F00';
				}
				
				
				if(data["indicaciones_pendientes"]>0){
					hayErrores = hayErrores + 1;
					indicaciones_pendientes_e='e';					
					window.frames[2].divListadoIndicaciones.style.borderStyle="solid";
					window.frames[2].divListadoIndicaciones.style.borderColor='#F00'					
				}	

				if ((am==0)&&(hayErrores>0 )){
					exa=1;
					document.getElementById("datos_med").style.visibility="hidden";
					document.getElementById("datos_exa").style.visibility="visible";
					document.getElementById("datos_sig").style.visibility="hidden";
					document.getElementById("datos_alta").style.visibility="hidden";
					document.getElementById("datos").style.visibility="hidden"										
				}
								
				if (destinoConsultante == 0 ){
					window.frames[4].destino_consultante.style.borderColor='#F00';
					window.frames[4].destino.style.borderColor='#F00';
					hayErrores = hayErrores + 1;
					destinoConsultante_e='e';
				}
				
				
				if (selectAuge == 0 ){
					window.frames[4].selectAuge.style.borderStyle="solid";
					window.frames[4].selectAuge.style.borderColor='#F00';
					hayErrores = hayErrores + 1;
					selectAuge_e='e';
					//alert('falta auge');
				}


				

				var  dcc = window.frames[4].destino_consultante_consultorio;	
				if( !(typeof dcc === 'undefined' || dcc === null) ){
			    
					var cod_dcc =  dcc.value;
			
					if(cod_dcc == 0){
						window.frames[4].destino_consultante_consultorio.style.borderColor='#F00';
						hayErrores = hayErrores + 1;
					        derivacionCAE_e = "e";
					}
				}


	
				if((am==0)&&(exa==0)){
					document.getElementById("datos_med").style.visibility="hidden";
					document.getElementById("datos_exa").style.visibility="hidden";
					document.getElementById("datos_sig").style.visibility="hidden";
					document.getElementById("datos_alta").style.visibility="visible";
					document.getElementById("datos").style.visibility="hidden"
				}
	
				//COMPRUEBA QUE NO EXISTAN ERRORES
				if(hayErrores > 0){
					lanza_error(hayErrores,box_e,condicionIngreso_e,derivarA_e,destinoConsultante_e,anamnesis_e,diagnosticos_e,solicitudes_pendientes_e,indicaciones_pendientes_e,clasificacion_e,paridad_e,derivacionCAE_e,selectAuge_e);
				}else
					finalizar_atencion();
			}, 
			error: function (){
				alert('Error inesperado, no se pudo validar el cierre del DAU');
			} 			
		});	
}


function fn_consulta(){
	pagina='consulta.php';
	configuracion = "KeepThis=true&TB_iframe=true&width=250&height=340&modal=false";
	url = pagina+"&"+configuracion+"&"+Math.random();
	tb_show('Consulta', url);
}


function finalizar_atencion() {
	
	var pagina='consulta.php?d=1';
	var configuracion = "KeepThis=true&TB_iframe=true&width=350&height=210&modal=false";
	var url = pagina+"&"+configuracion+"&"+Math.random();
	tb_show('Consulta', url);	
}





function elimina_diagnostico(diagnostico){

var atencion=  parent.document.getElementById('codAtencion').value;

		var iurl = 'elimina_cie.php?'+Math.random();
	
			var parametros = {
				"cie": diagnostico,
				"at": atencion
			};
			
			$.ajax({
				data:  parametros,
				url:   iurl,
				type:  'get',
				
				success:  function (response) {												
							if(response =='e'){
								obtiene_cie10();
							}
							
				}, 
				error: function (){
					alert('Error inesperado, al intentar registrar la observacion, intente más tarde');
				} 			
			});

}



function mostrar_anamnesis(codigo,texto){
	
	try {
		document.getElementById('anamnesis').value = texto.trim();
	}
	catch(err) {
		document.getElementById('anamnesis').value = texto;
	}
		
	parent.document.getElementById('detalle').value = codigo;
}

function mostrar_examen_fisico(codigo,texto){
	
	try {
    	document.getElementById('examen_fisico').value = texto.trim();
	}
	catch(err) {
		document.getElementById('examen_fisico').value = texto;
	}

	parent.document.getElementById('detalle').value = codigo;
}


function mostrar_hipotesis(codigo,texto){
	
	try {
    	document.getElementById('hipotesis').value = texto.trim();
	}
	catch(err) {
		document.getElementById('hipotesis').value = texto;
	}
		
	parent.document.getElementById('detalle').value = codigo;
}

function mostrar_observacion(codigo,texto){
	
	try {
    	document.getElementById('observaciones').value = texto.trim();
	}
	catch(err) {
		document.getElementById('observaciones').value = texto;
	}
	
	parent.document.getElementById('detalle').value = codigo;
}

function mostrar_indicaciones_alta(codigo,texto){
	
	try {
    	document.getElementById('indicaciones_alta').value = texto.trim();
	}
	catch(err) {
		document.getElementById('indicaciones_alta').value = texto;
	}

	parent.document.getElementById('detalle').value=codigo;
}




function fn_finaliza(){
		var auge = window.frames[4].selectAuge.value;	 
		var pertinencia = window.frames[4].selectPertinencia.value;	
		var destinoConsultante = window.frames[4].destino_consultante.value;
        var usuario = document.getElementById('codUsuario').value;
		var institucion = document.getElementById('codInstitucion').value;
		var atencion = document.getElementById('codAtencion').value;
		var detalle =  document.getElementById('detalle').value;
	
		var destinoConsultorio = null;
		var  dcc = window.frames[4].destino_consultante_consultorio;	
		if( !(typeof dcc === 'undefined' || dcc === null) ){
	    			
 			destinoConsultorio = dcc.value; 	 
		}

		//alert("dcc: " + destinoConsultorio);

		if (detalle=='')
			detalle=0;
		
		var iurl = 'finalizar_atencion.php?'+Math.random();
	
			var parametros = {
				
				"a": atencion,
				"au": auge,
				"p": pertinencia,
				"d": destinoConsultante,
                "dc": destinoConsultorio,
				"da": detalle,
				"u":usuario
			};
			//console.log(parametros);
			$.ajax({
				data:  parametros,
				url:   iurl,
				type:  'get',
				success:  function (response) {						
							if(response.trim() =='g'){
								fn_guarda_prestaciones();
								fn_lee_prestaciones();
								imprimir(atencion);
							}
							else
								error(response);
							
							
				}, 
				error: function (){
					//alert(response);
					alert('Error inesperado, al intentar registrar la atención, intente más tarde');
				} 			
			});
	
	
}



function guarda_cie10(codigo) {
   
	//var codigo= document.getElementById('cod_cie').value;
	var atencion= parent.document.getElementById('codAtencion').value;
	var detalle=  parent.document.getElementById('detalle').value;
	
	var institucion=  parent.document.getElementById('codInstitucion').value;
	var usuario=  parent.document.getElementById('codUsuario').value;
	if (detalle=='')
		detalle=0;
	
	
	var iurl = 'guarda_cie.php';

	if (codigo>0)
	{
		var parametros = {
			"cie" : codigo,
			"detalle" : detalle,
			"atencion": atencion,
			"institucion": institucion,
			"usuario": usuario
		};

		$.ajax({
			data:  parametros,
			url:   iurl,
			type:  'post',
			success:  function (response) {
						
						if(response.trim() >0){
							document.getElementById('listado_cie').value=response;
							//window.frames[1].listado_examen_observacion.innerHTML=response;
							obtiene_cie10();
						}else{
							alert('El diagnostico no fue registrado, favor intente nuevamente');
						}
			}, 
			error: function (){
				alert('Error inesperado, al intentar registrar el diagnostico, intente más tarde');
			} 			
		});	
	}else
		alert('Debe seleccionar un diagnostico')
		
}

function decode_utf8(s) { 

  return escape(s); 

}


function enterpressalert(e, textarea,tipo){
	var code = (e.keyCode ? e.keyCode : e.which);
	if(code == 13) { 
		if (tipo=='cie')
			fn_abrirVMBuscaCIE10();
		else
			guarda_indicacion();
	}
}

function guarda_indicacion() {
	var indicacion = document.getElementById('indicacion').value.trim();
	var cantidad = document.getElementById('cantidad').value;
	var usuario = parent.document.getElementById('codUsuario').value;
	var institucion = parent.document.getElementById('codInstitucion').value;
	var atencion = parent.document.getElementById('codAtencion').value;
	//indicacion=decode_utf8(indicacion);
	if( document.getElementById('cod_prestacion').value=="" ){
		var u = 'obtener_prestacion_por_descripcion.php?'+Math.random();
		var p = {
			"i" : indicacion
		};
		
		$.ajax({
			data:  p,
			url:   u,
			type:  'post',
			success:  function (response) {
				document.getElementById('cod_prestacion').value=response;
				//alert(document.getElementById('cod_prestacion').value);
				
				if( document.getElementById('cod_prestacion').value=="0" ){
					var iurl = 's_guarda_indicacion.php?'+Math.random();
				}else{
					var iurl = 's_guarda_indicacion_con_prestacion.php?'+Math.random();
				}
				var parametros = {
					"indicacion" : indicacion,
					"institucion": institucion,
					"usuario": usuario,
					"atencion": atencion,
					"cantidad": cantidad,
					"prestacion": document.getElementById('cod_prestacion').value
				};
				
				$.ajax({
					data:  parametros,
					url:   iurl,
					type:  'post',
					success:  function (response) {
								if(response.trim() != '0'){
									document.getElementById('indicacion').value="";
									document.getElementById('cod_prestacion').value="";
									for (i = 0; i < cantidad; i++) { 
										$.get("s_indicaciones_p.php", { cod_detalle: response },function(out){}, "json"); //equivalent to ajax.php?id=hash
									}
									document.getElementById("cantidad").selectedIndex = 0;
									fn_carga_tabla_indicaciones(atencion);	
								}else{
									alert('La indicacion no fue registrada, favor intente nuevamente');
								}
					}, 
					error: function (){
						alert('Error inesperado, al intentar registrar la indicacion, intente más tarde');
					} 			
				});
				
			}
		});
		
	}else{
		var iurl = 's_guarda_indicacion_con_prestacion.php?'+Math.random();
		
		var parametros = {
			"indicacion" : indicacion,
			"institucion": institucion,
			"usuario": usuario,
			"atencion": atencion,
			"cantidad": cantidad,
			"prestacion": document.getElementById('cod_prestacion').value
		};
		
		$.ajax({
			data:  parametros,
			url:   iurl,
			type:  'post',
			success:  function (response) {
						if(response.trim() != '0'){
							document.getElementById('indicacion').value="";
							document.getElementById('cod_prestacion').value="";
							for (i = 0; i < cantidad; i++) { 
								$.get("s_indicaciones_p.php", { cod_detalle: response },function(out){}, "json"); //equivalent to ajax.php?id=hash
								}
							document.getElementById("cantidad").selectedIndex = 0;
							fn_carga_tabla_indicaciones(atencion);	
						}else{
							alert('La indicacion no fue registrada, favor intente nuevamente');
						}
			}, 
			error: function (){
				alert('Error inesperado, al intentar registrar la indicacion, intente más tarde');
			} 			
		});
		
	}
}

function toggleDisabled(el) {
	try {
		el.disabled = el.disabled ? false : true;
	}catch(E){}
	if (el.childNodes && el.childNodes.length > 0) {
		for (var x = 0; x < el.childNodes.length; x++) {
			toggleDisabled(el.childNodes[x]);
		}
	}
}



function comprueba_permisos(usuario,institucion) {
   	//alert('usuario: ' + usuario + " institucion " + institucion);	
	//console.log('usuario: ' + usuario + " institucion " + institucion);	
	var data = {
		  "action": "test",
		  "usuario": usuario,
		  "institucion": institucion
		};
		//console.log(data);
		data = $(this).serialize() + "&" + $.param(data);
		$.ajax({
		  type: "POST",
		  dataType: "json",
		  url: "comprueba_permisos.php", //Relative or absolute path to response.php file
		  data: data,
		  success: function(data) {	

			if (data["permisos"]!=''){
				var permisos=  data["permisos"];
				var campos=  data["campos"];
				//console.log(permisos);
				//alert(permisos);
				for (var i=0; i<permisos.length; i++){ //itero sobre todos los campos recibidos como resultado
					if (campos[i]==1){ // bn_agrega_signos_vitales
						if (permisos[i]==0)
							window.frames[3].btn_agrega_signos_vitales.disabled="disabled";
						else
							window.frames[3].btn_agrega_signos_vitales.disabled="";
					}
					
					
					if (campos[i]==2){ // div_accidentes_y_alcoholemia

						if (permisos[i]==0){
							window.frames[3].estadoEtilico.disabled="disabled";
							window.frames[3].nroFracoAlcoholemia.disabled="disabled";
							window.frames[3].gradoLesion.disabled="disabled";	 
						}else{
							window.frames[3].estadoEtilico.disabled="";
							window.frames[3].nroFracoAlcoholemia.disabled="";
							window.frames[3].gradoLesion.disabled="";	 						
						}
					}

					if (campos[i]==3){ // anamnesis
						if (permisos[i]==0)
							window.frames[1].anamnesis.disabled="disabled";
						else
							window.frames[1].anamnesis.disabled="";
					}


					if (campos[i]==4){ // condicion_ingreso
						if (permisos[i]==0)
							window.frames[1].condicion_ingreso.disabled="disabled";
						else
							window.frames[1].condicion_ingreso.disabled="";
					}


					if (campos[i]==5){ // derivar_a
						if (permisos[i]==0)
							window.frames[1].derivar_a.disabled="disabled";
						else
							window.frames[1].derivar_a.disabled="";
						
					}


					if (campos[i]==6){ // hipotesis
						if (permisos[i]==0){
							window.frames[1].hipotesis.disabled="disabled"; 
							window.frames[1].cie10.disabled="disabled";
							window.frames[1].btnBuscar.disabled="disabled";
							window.frames[1].listado_hipotesis.disabled="disabled";
							window.frames[1].listado_cie.disabled="disabled";
							obtiene_cie10('fuera',1);
							document.getElementById('elimina').value=1;
							
						}else{
							window.frames[1].hipotesis.disabled="";
							window.frames[1].cie10.disabled="";
							window.frames[1].btnBuscar.disabled="";
							obtiene_cie10('fuera',0);
							document.getElementById('elimina').value=0;
							
						}
					}


					if (campos[i]==8){ // Indicacion
						if (permisos[i]==0){
							window.frames[2].indicacion.disabled="disabled";
							window.frames[2].btnGuardarIndi.disabled="disabled";
							window.frames[2].cantidad.disabled="disabled";
								
						}else{
							window.frames[2].indicacion.disabled="";
							window.frames[2].btnGuardarIndi.disabled="";
							window.frames[2].cantidad.disabled="";
						}
					}
					
					
					if (campos[i]==10){ // solicitud exam. imag
						if (permisos[i]==0)
							window.frames[2].lnk_sol_examen_imagenologia.style.display="none";
						else
							window.frames[2].lnk_sol_examen_imagenologia.style.display="";
					}

					if (campos[i]==11){ // observaciones
						if (permisos[i]==0)
							window.frames[2].observaciones.disabled="disabled";
						else
							window.frames[2].observaciones.disabled="";
						
					}
					
					
					if (campos[i]==12){ // destino
						if (permisos[i]==0)
							window.frames[4].destino.disabled="disabled";
						else
							window.frames[4].destino.disabled="";
						
					}
					
					
					if (campos[i]==13){ // destino_consultante
						if (permisos[i]==0)
							window.frames[4].destino_consultante.disabled="disabled";
						else
							window.frames[4].destino_consultante.disabled="";
						
					}
					
					
					if (campos[i]==14){ // selectAuge
						if (permisos[i]==0)
							window.frames[4].selectAuge.disabled="disabled";
						else
							window.frames[4].selectAuge.disabled="";
						
					}
					
					
					if (campos[i]==15){ // selectPertinencia
						if (permisos[i]==0)
							window.frames[4].selectPertinencia.disabled="disabled";
						else
							window.frames[4].selectPertinencia.disabled="";
						
					}
					
					if (campos[i]==16){ // examen_fisico
						if (permisos[i]==0)
							window.frames[1].examen_fisico.disabled="disabled";
						else
							window.frames[1].examen_fisico.disabled="";
					}


					if (campos[i]==17){ // indicaciones_alta
						if (permisos[i]==0)
							window.frames[4].indicaciones_alta.disabled="disabled";
						else
							window.frames[4].indicaciones_alta.disabled="";
					}
					
					if (campos[i]==18){ // lnk_sol_scanner
						if (permisos[i]==0)
							window.frames[2].lnk_sol_scanner.style.display="none";
						else
							window.frames[2].lnk_sol_scanner.style.display="";
					}

					if (campos[i]==19){ // lnk_sol_examen_laboratorio
						if (permisos[i]==0)
							window.frames[2].lnk_sol_examen_laboratorio.style.display="none";
						else
							window.frames[2].lnk_sol_examen_laboratorio.style.display="";
					}
					
					if (campos[i]==20){ // lnk_sol_receta
						if (permisos[i]==0){
							window.frames[2].lnk_sol_receta.style.display="none";
							window.frames[2].lnk_sol_receta_oca.style.display="none";
							
						}else{
							window.frames[2].lnk_sol_receta.style.display="";
							//window.frames[2].lnk_sol_receta_oca.style.display="";
						}
					}
					
					if (document.getElementById('alta_post_tto').value>0){ // en caso de haber dejado paciente como alta post tto
						bloquea_campos_alta_post_tto();
					}

				}
			}			
		  }
		});
		return false;
}

function desbloquea_campos_alta_post_tto(){
							
							window.frames[3].btn_agrega_signos_vitales.disabled="";
							window.frames[3].estadoEtilico.disabled="";
							window.frames[3].nroFracoAlcoholemia.disabled="";
							window.frames[3].gradoLesion.disabled="";	 						
							window.frames[1].anamnesis.disabled="";
							window.frames[1].condicion_ingreso.disabled="";
							window.frames[1].derivar_a.disabled="";
							window.frames[1].sospecha_ges.disabled="";

							
							
							window.frames[1].hipotesis.disabled="";
							window.frames[1].cie10.disabled="";
							window.frames[1].btnBuscar.disabled="";
							
							
							window.frames[2].indicacion.disabled="";
							window.frames[2].btnGuardarIndi.disabled="";
							window.frames[2].cantidad.disabled="";
							window.frames[2].observaciones.disabled="";
							
							window.frames[4].destino.disabled="";
							window.frames[4].destino_consultante.disabled="";
							window.frames[4].selectAuge.disabled="";
							window.frames[4].selectPertinencia.disabled="";
							window.frames[1].examen_fisico.disabled="";
							window.frames[4].indicaciones_alta.disabled="";
							window.frames[2].lnk_sol_scanner.style.display="";
							window.frames[2].lnk_sol_examen_laboratorio.style.display="";
							window.frames[2].lnk_sol_receta.style.display="";
							//window.frames[2].lnk_sol_receta_oca.style.display="";

}

function bloquea_campos_alta_post_tto(){
							
							obtiene_cie10('fuera',1);
							document.getElementById('elimina').value=0;
							obtiene_cie10('fuera',0);
							document.getElementById('elimina').value=0;
							
							window.frames[3].btn_agrega_signos_vitales.disabled="disabled";
							window.frames[3].estadoEtilico.disabled="disabled";
							window.frames[3].nroFracoAlcoholemia.disabled="disabled";
							window.frames[3].gradoLesion.disabled="disabled";	 
							window.frames[1].anamnesis.disabled="disabled";
							window.frames[1].condicion_ingreso.disabled="disabled";
							window.frames[1].derivar_a.disabled="disabled";
							window.frames[1].sospecha_ges.disabled="disabled";
							window.frames[1].hipotesis.disabled="disabled"; 
							window.frames[1].cie10.disabled="disabled";
							window.frames[1].btnBuscar.disabled="disabled";
							window.frames[1].listado_hipotesis.disabled="disabled";
							window.frames[1].listado_cie.disabled="disabled";
							window.frames[2].indicacion.disabled="disabled";
							window.frames[2].btnGuardarIndi.disabled="disabled";
							window.frames[2].cantidad.disabled="disabled";
							window.frames[2].lnk_sol_examen_imagenologia.style.display="none";
							window.frames[2].lnk_sol_examen_imagenologia.style.display="";
							//window.frames[2].observaciones.disabled="disabled";
							window.frames[4].destino.disabled="disabled"; // ** debe eestar registrado
							window.frames[4].destino_consultante.disabled="disabled"; // ** debe eestar registrado
							window.frames[4].selectAuge.disabled="disabled"; // ** debe eestar registrado
							window.frames[4].selectPertinencia.disabled="disabled"; // ** debe eestar registrado
							window.frames[1].examen_fisico.disabled="disabled";
							window.frames[4].indicaciones_alta.disabled="disabled";
							window.frames[2].lnk_sol_scanner.style.display="none";
							window.frames[2].lnk_sol_examen_laboratorio.style.display="none";
							window.frames[2].lnk_sol_receta.style.display="none";
							//window.frames[2].lnk_sol_receta_oca.style.display="none";
							
}


function valida_alta_post_tto(){
	//2°
	var hayErrores = 0
	var datosFaltantes = "";
	var box = window.frames[1].box.value;
	var selectAuge = window.frames[4].selectAuge.value;
	
	
	
	if(window.frames[1].lugar_atencion.value==3){
		var paridad = window.frames[1].paridad.value;
		var clasificacion = window.frames[1].clasificacion.value;
	}
	
	var condicionIngreso = window.frames[1].condicion_ingreso.value; 
	var derivarA = window.frames[1].derivar_a.value;
	var sospecha_ges = window.frames[1].sospecha_ges.value;
	var destinoConsultante = window.frames[4].destino_consultante.value;
	
	
	var atencion=  document.getElementById('codAtencion').value;
	var am=0;// 1 indica si hay error en pagina atencion medica
	var exa=0;//1 indica si hay error en pgina de examenes
	var box_e = "";
	var condicionIngreso_e = "";
	var derivarA_e = "";
	var destinoConsultante_e = "";
	var anamnesis_e = "";
	var diagnosticos_e = "";
	var solicitudes_pendientes_e = "";
	var indicaciones_pendientes_e = "";
	var clasificacion_e="";
	var paridad_e="";
	var derivacionCAE_e = "";	
	var selectAuge_e=" ";
	var iurl = 'valida_alta_post_tto.php?'+Math.random();

		
	var data = {
      "a" : atencion
    };
	
	data = $(this).serialize() + "&" + $.param(data);		 
			 
	  $.ajax({
		  type: "GET",
		  dataType: "json",
		  url: "valida_alta_post_tto.php", //Relative or absolute path to response.php file
		  async: false, // RODOLFO, ESTA ES LA LINEA
		  data: data,
		  success: function(data) {	
					
				
				//atencion medica
				if(data["anamnesis"]==0){
					window.frames[1].anamnesis.style.borderColor='#F00';
					hayErrores = hayErrores + 1;
					anamnesis_e='e';
				}	
				
				//EN CASO DE SER ATENCION GINECOLOGICA
				if(window.frames[1].lugar_atencion.value==3){
					if(paridad==0){
						window.frames[1].paridad.style.borderColor='#F00';
						hayErrores = hayErrores + 1;
						paridad_e='e';							
					}

					if(clasificacion==0){
						window.frames[1].clasificacion.style.borderColor='#F00';
						hayErrores = hayErrores + 1;
						clasificacion_e='e';							
					}
				}
			

				if(data["diagnosticos"]==0){
					window.frames[1].cie10.style.borderColor='#F00';
					hayErrores = hayErrores + 1;
					diagnosticos_e='e';
				}

				if (box == 0){
					window.frames[1].box.style.borderColor='#F00';
					hayErrores = hayErrores + 1;
					box_e='e';
				}
				
				if (condicionIngreso == 0){
					window.frames[1].condicion_ingreso.style.borderColor='#F00';
					hayErrores = hayErrores + 1;
					condicionIngreso_e='e';
				}
				
				if (derivarA == 0){
					window.frames[1].derivar_a.style.borderColor='#F00';
					hayErrores = hayErrores + 1;
					derivarA_e='e';
				}

				
				if (hayErrores>0){// si hay errores en la atencion medica visualizo el frame
					am=1;
					document.getElementById("datos_med").style.visibility="visible";
					document.getElementById("datos_exa").style.visibility="hidden";
					document.getElementById("datos_sig").style.visibility="hidden";
					document.getElementById("datos_alta").style.visibility="hidden";
					document.getElementById("datos").style.visibility="hidden"					
				}
				
				
				if ((am==0)&&(hayErrores>0 )){
					exa=1;
					document.getElementById("datos_med").style.visibility="hidden";
					document.getElementById("datos_exa").style.visibility="visible";
					document.getElementById("datos_sig").style.visibility="hidden";
					document.getElementById("datos_alta").style.visibility="hidden";
					document.getElementById("datos").style.visibility="hidden"										
				}
								
				if (destinoConsultante == 0 ){
					window.frames[4].destino_consultante.style.borderColor='#F00';
					window.frames[4].destino.style.borderColor='#F00';
					hayErrores = hayErrores + 1;
					destinoConsultante_e='e';
				}
				
				
				if (selectAuge == 0 ){
					window.frames[4].selectAuge.style.borderStyle="solid";
					window.frames[4].selectAuge.style.borderColor='#F00';
					hayErrores = hayErrores + 1;
					selectAuge_e='e';
					//alert('falta auge');
				}


				var  dcc = window.frames[4].destino_consultante_consultorio;	
				if( !(typeof dcc === 'undefined' || dcc === null) ){
			    
					var cod_dcc =  dcc.value;
			
					if(cod_dcc == 0){
						window.frames[4].destino_consultante_consultorio.style.borderColor='#F00';
						hayErrores = hayErrores + 1;
					        derivacionCAE_e = "e";
					}
				}


	
				if((am==0)&&(exa==0)){
					document.getElementById("datos_med").style.visibility="hidden";
					document.getElementById("datos_exa").style.visibility="hidden";
					document.getElementById("datos_sig").style.visibility="hidden";
					document.getElementById("datos_alta").style.visibility="visible";
					document.getElementById("datos").style.visibility="hidden"
				}
	
				//COMPRUEBA QUE NO EXISTAN ERRORES
				if(hayErrores > 0){
					error_alta_post_tto(hayErrores,box_e,condicionIngreso_e,derivarA_e,destinoConsultante_e,anamnesis_e,diagnosticos_e,solicitudes_pendientes_e,indicaciones_pendientes_e,clasificacion_e,paridad_e,derivacionCAE_e,selectAuge_e);
				}else
					alta_post_tto();
			}, 
			error: function (){
				alert('Error inesperado, no se pudo validar el cierre del DAU');
			} 			
		});		
	
	
}

function consulta_alta_post_tto() {
	//1°
	//if (document.getElementById('codUsuario').value==3 || document.getElementById('codUsuario').value==585 || document.getElementById('codUsuario').value==227){ //solo permite bloequear FVG
		if (document.getElementById('alta_post_tto').value== document.getElementById('codUsuario').value){ // si el que bloqueo es el mismo que presiona el boton nuevamente			
			var pagina='consulta_anula_alta_post_tto.php?';
			var configuracion = "KeepThis=true&TB_iframe=true&width=350&height=210&modal=false";
			var url = pagina+"&"+configuracion+"&"+Math.random();
			tb_show('Consulta', url);	

		}else{
			var pagina='consulta_alta_post_tto.php?d=1';
			var configuracion = "KeepThis=true&TB_iframe=true&width=350&height=210&modal=false";
			var url = pagina+"&"+configuracion+"&"+Math.random();
			tb_show('Consulta', url);	
		}
	//}
}



function anula_alta_post_tto() {
		var usuario= document.getElementById('codUsuario').value;
		var codigo= document.getElementById('codAtencion').value;	
		var data = {
			 
			  "usuario": usuario,
			  "codigo": codigo
			};
			//console.log(data);
			data = $(this).serialize() + "&" + $.param(data);
			$.ajax({
			  type: "POST",
			  dataType: "text",
			  url: "anula_alta_post_tto.php", 
			  data: data,
			  success: function(data) {	
				
				if (data==1){
					desbloquea_campos_alta_post_tto();
					document.getElementById('alta_post_tto').value=0;						
					alert("Alta Post Tratamiento anulada correctamente");
					fn_cerrar_modal();
				}else
					alert("no se logro anular el alta post tto.");
			  }
			});
			return false;
		
}



function alta_post_tto() {
	//3°
	var usuario= document.getElementById('codUsuario').value;

	
		var institucion= document.getElementById('codInstitucion').value;
		var codigo= document.getElementById('codAtencion').value;	
		var data = {
			  "action": "test",
			  "usuario": usuario,
			  "institucion": institucion,
			  "codigo": codigo
			};
			//console.log(data);
			data = $(this).serialize() + "&" + $.param(data);
			$.ajax({
			  type: "POST",
			  dataType: "text",
			  url: "guarda_alta_post_tto.php", 
			  data: data,
			  success: function(data) {	
				if (data==1){
					//if (condiciones_alta_post_tto()==true){
						guarda();
						bloquea_campos_alta_post_tto();
						
						alert("Alta Post Tratamiento registrada correctamente");
						fn_bloqueo();
						//obligatoriamente debe tener guardado el destino consultante, pertinencia y ges
					//}
				}
				else if(data==-1)
					alert("No tiene permisos suficientes para dar Alta Post Tratamiento");
				else
					alert("no se logro relizar el alta post tto.");
			  }
			});
			return false;
		
}


function error_alta_post_tto(cantErrores,box,condicionIngreso,derivarA,destinoConsultante,anamnesis,diagnosticos,solPendientes,indiPendientes,clasificacion,paridad,derivacionCAE,selectAuge_e) {
	pagina='error.php';
	variables = "cantErrores="+cantErrores+"&box="+box+"&condicionIngreso="+condicionIngreso+"&derivarA="+derivarA+"&destinoConsultante="+destinoConsultante;
	variables = variables + "&anamnesis="+anamnesis+"&diagnosticos="+diagnosticos+"&solPendientes="+solPendientes+"&indiPendientes="+indiPendientes+"&clasificacion="+clasificacion+"&paridad="+paridad+"&derivacionCAE="+derivacionCAE+"&selectAuge_e="+selectAuge_e;
	configuracion = "KeepThis=true&TB_iframe=true&width=300&height=300&modal=false";
	url = pagina+"?"+variables+"&"+configuracion+"&"+Math.random();
	tb_show('Error al intentar registrar Alta Post Trantamiento', url);
}



function guarda_signos_vitales() {
   	
	var hayErrores = false;
	var mensajeError = "";
	
	var txtPSistolica  = document.getElementById('txtPresion1').value;
	var txtPDiastolica = document.getElementById('txtPresion2').value;
	var txtTRectal  = document.getElementById('txtTRectal').value;
	var txtTAxilar  = document.getElementById('txtTAxilar').value;
	var txtPulso    = document.getElementById('txtPulso').value;
	var txtHemo     = document.getElementById('txtHemo').value;
	var txtFR       = document.getElementById('txtFR').value;
	var txtSaturo   = document.getElementById('txtSaturo').value;
	var codAtencion = document.getElementById('cod_aten').value;
	var codUsuario = parent.document.getElementById('codUsuario').value;
	var institucion=  parent.document.getElementById('codInstitucion').value;
	
	//alert(txtPSistolica);
	//console.log(txtPSistolica);
	//alert(txtPDiastolica);
	if(txtPSistolica != "" && txtPDiastolica != ""){
		var presion = txtPSistolica + "/" + txtPDiastolica;	
	}else{
		var presion = '';
	}
	
	
	// Validaciones	
	if (!hayErrores){
		if(txtPSistolica == "" && txtPDiastolica == "" && txtTRectal == "" && txtTAxilar == "" && txtPulso == "" && txtHemo == "" && txtFR == "" && txtSaturo == "")	{
			
			mensajeError = "Debe completar al menos un campo";
		 	hayErrores = true;
		}
	}
	
	if (!hayErrores){
		if(txtPSistolica != "" && txtPDiastolica == "" ){
			
			mensajeError = "Debe completar la Presión Diastólica";
		 	hayErrores = true;
		}
	}
	if (!hayErrores){
		if(txtPSistolica == "" && txtPDiastolica != "" ){
			
			mensajeError = "Debe completar la Presión Sistólica";
		 	hayErrores = true;
		}
	}
	
	if (!hayErrores){
		
		if(validacionCampoNumericoSimple(txtPSistolica)){
			
			if(txtPSistolica > 250){
				
				mensajeError = "La presión 'Sistólica' no puede ser mayor que 250 mm.";
		 		hayErrores = true;
			}
						
		}
 		
 	}
	
	
	if (!hayErrores){
 		
		if(validacionCampoNumericoSimple(txtPDiastolica)){
			
			if(txtPDiastolica > 250){
				
				mensajeError = "La presión 'Diastólica' no puede ser mayor que 250 mm.";
		 		hayErrores = true;
			}
						
		}
		
	}
	
	
	if(!hayErrores && validacionCampoNumericoSimple(txtPSistolica) && validacionCampoNumericoSimple(txtPDiastolica)){
		
		if(txtPSistolica != "" && txtPDiastolica != ""){
		
			
			if(parseInt(txtPSistolica)<=parseInt(txtPDiastolica)){
				
				mensajeError = "La presión 'Diastólica' no puede ser mayor que la 'Sistólica'.";
		 		hayErrores = true;
			}
		}
	}
		
	
	if (!hayErrores){
 		
		if(validacionCampoTexto(txtTRectal)){
			
			if(txtTRectal > 42){
				
				mensajeError = "La 'Tª Rectal' no puede ser mayor que 42 ºC.";
		 		hayErrores = true;
			}
						
		}	
 		
 	}
	
	if (!hayErrores){
 		
		if(validacionCampoTexto(txtTAxilar)){
			
			if(txtTAxilar > 42){
				
				mensajeError = "La 'Tª Axilar' no puede ser mayor que 42 ºC.";
		 		hayErrores = true;
			}
						
		}
 		
 	}
		
	if(!hayErrores && validacionCampoTexto(txtTRectal) && validacionCampoTexto(txtTAxilar)){
		
		if(parseInt(txtTRectal)<=parseInt(txtTAxilar)){
			
			mensajeError = "La Tª Axilar no puede ser mayor que la Tª Rectal.";
	 		hayErrores = true;
		}
	}
		
	if (!hayErrores){
 		
		if(validacionCampoNumericoSimple(txtPulso)){
			
			if(txtPulso > 400){
				
				mensajeError = "El 'Pulso' no puede ser mayor que 400 FC.";
		 		hayErrores = true;
			}
						
		}
		
 	}
		
	if (!hayErrores){
 		
		if(validacionCampoNumericoSimple(txtFR)){
			
			if(txtFR > 50){
				
				mensajeError = "La 'Frecuencia Respiratoria' no puede ser mayor que 50 RPM.";
		 		hayErrores = true;
			}
						
		}
		
 	}	
		
	if (!hayErrores && validacionCampoTexto(txtSaturo)){
 		
		
		var saturometria = new Number(txtSaturo);
		if(saturometria > 100){
			
			mensajeError= "La 'Saturometria' no puede exceder el 100%.";
			hayErrores = true;
		}
		
 	}
	
	
	
	
	//indicacion=decode_utf8(indicacion);
		
    //alert("pr: "+presion+" tr: "+txtTRectal+" ta: "+txtTAxilar+" pu: "+txtPulso+" fr: "+txtFR+" s: "+txtSaturo+" h: "+txtHemo+" a: "+codAtencion+" u: "+codUsuario);
		
	if(!hayErrores){
		mensajeError = "";
		document.getElementById('divTxTErores').style.display="none";
		var iurl = 's_guarda_control_signos_vitales.php?'+Math.random();
		
		var parametros = {
			
			"pr": presion,
			"tr": txtTRectal,
			"ta": txtTAxilar,
			"pu": txtPulso,		
			"fr": txtFR,
			"s": txtSaturo,
			"h": txtHemo,			
			"a": codAtencion,
			"u": codUsuario,
			"institucion": institucion		
					
		};
		
		$.ajax({
			data:  parametros,
			url:   iurl,
			type:  'post',
			success:  function (response) {
						//console.log(parametros);
						//alert("r: " + response);
						
						if(response.trim() == 'g'){
						
							//alert('Signos vitales guardados correctamente');
							//document.getElementById('indicacion').value="";
							fn_carga_tabla_signos_vitales();
							
							document.getElementById('txtPresion1').value='';
							document.getElementById('txtPresion2').value='';
							document.getElementById('txtTRectal').value='';
							document.getElementById('txtTAxilar').value='';
							document.getElementById('txtPulso').value='';
							document.getElementById('txtHemo').value='';
							document.getElementById('txtFR').value='';
							document.getElementById('txtSaturo').value='';
													
						}else{
							alert('Los signos vitales no fueron registrados, favor intente nuevamente');
						}
			}, 
			error: function (){
				alert('Error inesperado, al intentar registrar la indicacion, intente más tarde');
			} 			
		});	
		
	}
	else{
		document.getElementById('divTxTErores').style.display="inherit";
		document.getElementById('lblTxTErores').innerHTML = mensajeError;
		//alert(mensajeError);
	}
}

function guarda_alcoholemia_grado_lesion(lugar) {
   	
   	if (lugar=='fuera'){
		var codEstadoEtilico = window.frames[3].document.getElementById('estadoEtilico').value;
		var nroFrascoAlco = window.frames[3].document.getElementById('nroFracoAlcoholemia').value;
		var codGradoLesion  = window.frames[3].document.getElementById('gradoLesion').value;
		var codAtencion = window.frames[3].document.getElementById('cod_aten').value;   	
   	}else{
	   	var codEstadoEtilico = document.getElementById('estadoEtilico').value;
	   	var nroFrascoAlco = document.getElementById('nroFracoAlcoholemia').value;
	   	var codGradoLesion  = document.getElementById('gradoLesion').value;
	   	var codAtencion = document.getElementById('cod_aten').value;
   	}
		
		
	
		
		
		
		//alert("ee: "+codEstadoEtilico+" nf: "+nroFrascoAlco+" gl: "+codGradoLesion+" a: "+codAtencion);
		
	var iurl = 's_guarda_alcoholemia_grado_lesion.php?'+Math.random();
	
	var parametros = {
		
		"ee": codEstadoEtilico,
		"nf": nroFrascoAlco,
		"gl": codGradoLesion,
		"a":  codAtencion
								
	};
	//console.log(parametros);
	$.ajax({
		data:  parametros,
		url:   iurl,
		type:  'post',
		success:  function (response) {
					
					//alert(response);
					//document.getElementById('nroFracoAlcoholemia').value=response;
					
					if(response.trim() == 'g'){
					
						//alert('Datos guardados correctamente');
						//document.getElementById('indicacion').value="";
						
					}else{
						
						alert('Los datos de la alcoholemia no fueron registrados, favor intente nuevamente');
					}
		}, 
		error: function (){
			alert('Error inesperado, al intentar registrar la indicacion, intente más tarde');
		} 			
	});
		
		
		
	
			
}

function guarda_alcoholemia_grado_lesion_dev(lugar) {
	var msg = "";
	var div_result = "<div class='alert alert-danger alert-dismissible' role='alert'>"+
		  "<button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button>"+
		  "<strong>Advertencia:!</strong> ";
  if (lugar=='fuera'){
		var codEstadoEtilico = window.frames[3].document.getElementById('estadoEtilico').value;
		var nroFrascoAlco = window.frames[3].document.getElementById('nroFracoAlcoholemia').value;
		var codGradoLesion  = window.frames[3].document.getElementById('gradoLesion').value;
		var codAtencion = window.frames[3].document.getElementById('cod_aten').value;
		var parte = window.frames[3].document.getElementById('parteOH').value;
		var unidad_policia = window.frames[3].document.getElementById('unidad_policia').value;
		var juzgado = window.frames[3].document.getElementById('juzgado').value;
		var condicion_transito = window.frames[3].document.getElementById('condicion_transito').value;
		var placa_policia = window.frames[3].document.getElementById('placa_policia').value;
		var observacionOH = window.frames[3].document.getElementById('observacionOH').value;
		var tec_oh = window.frames[3].document.getElementById('tec_oh').value;
		var drogas_oh = window.frames[3].document.getElementById('drogas_oh').value;
		var rechaza_oh = window.frames[3].document.getElementById('rechaza_oh').value;
  }
  else{
   	var codEstadoEtilico = document.getElementById('estadoEtilico').value;
   	var nroFrascoAlco = document.getElementById('nroFracoAlcoholemia').value;
   	var codGradoLesion  = document.getElementById('gradoLesion').value;
   	var codAtencion = document.getElementById('cod_aten').value;
   	var codUser = document.getElementById('cod_usr').value;
		var parte = document.getElementById('parteOH').value;
		var unidad_policia = document.getElementById('unidad_policia').value;
		var juzgado = document.getElementById('juzgado').value;
		var condicion_transito = document.getElementById('condicion_transito').value;
		var placa_policia = document.getElementById('placa_policia').value;
		var observacionOH = document.getElementById('observacionOH').value;
		var tec_oh = document.getElementById('tec_oh').checked;
		var drogas_oh = document.getElementById('drogas_oh').checked;
		var rechaza_oh = document.getElementById('rechaza_oh').checked;
 	}

	var iurl = 's_guarda_alcoholemia_grado_lesion_dev.php';
	var parametros = {
		"ee": codEstadoEtilico,
		"nf": nroFrascoAlco,
		"gl": codGradoLesion,
		"a":  codAtencion,
		"u": codUser,
		"parte": parte,
		"unidad_policia": unidad_policia,
		"juzgado": juzgado,
		"condicion_transito": condicion_transito,
		"placa_policia": placa_policia,
		"observacionOH": observacionOH,
		"tec_oh": tec_oh,
		"drogas_oh": drogas_oh,
		"rechaza_oh": rechaza_oh						
	};
	$.ajax({
		data:  parametros,
		url:   's_guarda_alcoholemia_grado_lesion_dev.php',
		type:  'post',
		beforeSend: function () {
		  $("#resultado").html("Procesando, espere por favor...");
		},
		success:  function (response) {
			if(response.trim() == 'ng' || response.trim() == 'error'){
				msg = "Ocurrió un Error en la Consulta de Datos</div>";
				$("#resultado").html(div_result+msg);
			}
			if(response.trim() == 'exitsOk' || response.trim() == 'Ok'){
				$("#resultado").html("Datos Guardados exitosamente.");
			}
		}, 
		error: function (){
			alert('Error inesperado, al intentar registrar la indicacion, intente más tarde');
		} 			
	});	
}

$(document).ready(function(){
	$('#imprime-alcoholemia').on('show.bs.modal', function(e) {
	  $(this).find('.btn-ok').attr('href', $(e.relatedTarget).data('href'));
	  $('.debug-url').html('Responsable: <strong>' + $("#cod_aten").val() + '</strong>');
	});
});

function abrir_boleta_alcoholemia(codAten, imprime) {
	var ancho=600; var alto=720;
	pagina='formularios/alcoholemia.php';
	variables = "a="+codAten;
	configuracion = "KeepThis=true&TB_iframe=true&width="+ancho+"&height="+alto+"&modal=false";
	url = pagina+"?"+variables+"&"+configuracion+"&"+Math.random();
	tb_show('Boleta Alcoholemia', url);
	var iurl = 's_guarda_alcoholemia_grado_lesion_dev.php';
	if(imprime == 0){
		var parametros = {
			"imprime": "imprime",
			"a": codAten
		};
		$.ajax({
			data:  parametros,
			url:   's_guarda_alcoholemia_grado_lesion_dev.php',
			type:  'post',
			beforeSend: function () {
			  $("#resultado").html("Procesando, espere por favor...");
			},
			success:  function (response) {
				if(response.trim() == 'error'){
					msg = "Ocurrió un Error en la Consulta de Datos</div>";
					$("#resultado").html(div_result+msg);
				}
				if(response.trim() == 'Ok'){
					$("#resultado").html("Datos Guardados exitosamente.");
				}
			}, 
			error: function (){
				alert('Error inesperado, al intentar registrar la indicacion, intente más tarde');
			}
		});
	}
}

 function obtiene_examen_observacion(origen) {
    if (origen=='fuera'){
		var atencion=  document.getElementById('codAtencion').value;
		var usr = document.getElementById('codUsuario').value;
	}else{
		var atencion=  parent.document.getElementById('codAtencion').value;
		var usr = parent.document.getElementById('codUsuario').value;
	}

	
	var iurl = 'obtener_examen_observacion.php?'+Math.random();


		var parametros = {
			"atencion" : atencion,
			"usuario" : usr
		};
		
		$.ajax({
			data:  parametros,
			url:   iurl,
			type:  'get',
			success:  function (response) {
				if (origen=='fuera')
					window.frames[2].listado_examen_observacion.innerHTML=response;
				else
					document.getElementById('listado_examen_observacion').innerHTML=response;

			}, 
			error: function (){
				alert('Error inesperado, no se pudo obtener listado de observaciones');
			} 			
		});	
}


function obtiene_sic(origen) {
    if (origen=='fuera'){
		var atencion=  document.getElementById('codAtencion').value;
		var inst = document.getElementById('codInstitucion').value;
	}else{
		var atencion=  parent.document.getElementById('codAtencion').value;
		var inst = parent.document.getElementById('codInstitucion').value;
	}

	
	var iurl = 'obtener_lista_sic.php?'+Math.random();


		var parametros = {
			"a" : atencion,
			"i" : inst
		};
		
		$.ajax({
			data:  parametros,
			url:   iurl,
			type:  'get',
			success:  function (response) {
				if (origen=='fuera')
					window.frames[2].divlistadoInterconsulta.innerHTML=response;
				else
					document.getElementById('divlistadoInterconsulta').innerHTML=response;

			}, 
			error: function (){
				alert('Error inesperado, no se pudo obtener listado de observaciones');
			} 			
		});	
}

	

function obtiene_destino_consultante_selecciona(destino_c) {
	
	
	document.getElementById('div_destino_consultante_consultorio').innerHTML = "";   

	var destino=  document.getElementById('destino').value;
	var institucion=  document.getElementById('codInstitucion').value;
	var usuario=document.getElementById('codUsuario').value;
	
	var iurl = 'obtener_destino_consultante.php?'+Math.random();
	

		var parametros = {
			"destino" : destino,
			"institucion" : institucion
		};
		
		$.ajax({
			data:  parametros,
			url:   iurl,
			type:  'get',
			success:  function (response) {
				document.getElementById('div_destino_consultante').innerHTML=response;
				document.getElementById('destino_consultante').selectedIndex=recorrer(document.getElementById('destino_consultante'),destino_c);
			}, 
			error: function (){
				alert('Error inesperado, no se pudo obtener listado de destinos');
			} 			
		});	
}



function obtiene_destino_consultante() {
	
	document.getElementById('div_destino_consultante_consultorio').innerHTML = "";   

	var destino=  document.getElementById('destino').value;
	var institucion=  document.getElementById('codInstitucion').value;
	var usuario=document.getElementById('codUsuario').value;
	
	var iurl = 'obtener_destino_consultante.php?'+Math.random();
	

		var parametros = {
			"destino" : destino,
			"institucion" : institucion
		};
		
		$.ajax({
			data:  parametros,
			url:   iurl,
			type:  'get',
			success:  function (response) {
				document.getElementById('div_destino_consultante').innerHTML=response;
			}, 
			error: function (){
				alert('Error inesperado, no se pudo obtener listado de destinos');
			} 			
		});	
}


function obtiene_destino_consultante_consultorio() {
   
	document.getElementById('div_destino_consultante_consultorio').innerHTML = "";
	
	var usuario=document.getElementById('codUsuario').value;
	var cod_dcc = document.getElementById('destino_consultante').value;
	
	if(cod_dcc == 2)
	{	

	    var iurl = 'obtener_destino_consultante_consultorio.php?'+Math.random();
		var parametros = {
			
		};
		
		$.ajax({
			data:  parametros,
			url:   iurl,
			type:  'get',
			success:  function (response) {
				document.getElementById('div_destino_consultante_consultorio').innerHTML=response;
			}, 
			error: function (){
				alert('Error inesperado, no se pudo obtener listado de destinos');
			} 			
		});	
	}
	else if(cod_dcc == 4)
	{
		if (usuario==3 || usuario==803 || usuario ==585)
		{
			levanta_sgh();
		}
	}
}


function obtiene_indicaciones_alta(lugar) {
   
	var atencion=  document.getElementById('codAtencion').value;
	var iurl = 'obtener_indicaciones_alta.php?'+Math.random();
	

		var parametros = {
			"atencion" : atencion
		};
		
		$.ajax({
			data:  parametros,
			url:   iurl,
			type:  'get',
			
			success:  function (response) {
				if(lugar=='local')		
					document.getElementById('listado_indicaciones_alta').innerHTML=response;
				else
					window.frames[4].listado_indicaciones_alta.innerHTML=response;
			}, 
			error: function (){
				alert('Error inesperado, no se pudo obtener listado de indicaciones');
			} 			
		});	
}



   function obtiene_ananamnesis(lugar) {
   	if(lugar=='local'){
		var atencion=  parent.document.getElementById('codAtencion').value;
		var usr = parent.document.getElementById('codUsuario').value;
	}else{
		var atencion=  document.getElementById('codAtencion').value;
		var usr = document.getElementById('codUsuario').value;
	}
	var iurl = 'obtener_anamnesis.php?'+Math.random();


		var parametros = {
			"atencion" : atencion,
			"usuario" : usr
		};
		
		$.ajax({
			data:  parametros,
			url:   iurl,
			type:  'get',
			success:  function (response) {
				if(lugar=='local')		
					document.getElementById('listado_anamnesis').innerHTML=response;
				else
					window.frames[1].listado_anamnesis.innerHTML=response;
				
			}, 
			error: function (){
				alert('Error inesperado, no se pudo obtener listado de anamnesis');
			} 			
		});	
}


	 function obtiene_hipotesis(lugar) {
   
	if(lugar=='local'){
		var atencion=  parent.document.getElementById('codAtencion').value;
		var usr = parent.document.getElementById('codUsuario').value;
	}else{
		var atencion=  document.getElementById('codAtencion').value;
		var usr = document.getElementById('codUsuario').value;
	}
	
	var iurl = 'obtener_hipotesis.php?'+Math.random();


		var parametros = {
			"atencion" : atencion,
			"usuario" : usr
		};
		
		$.ajax({
			data:  parametros,
			url:   iurl,
			type:  'get',
			success:  function (response) {
				if(lugar=='local')		
					document.getElementById('listado_hipotesis').innerHTML=response;
				else
					window.frames[1].listado_hipotesis.innerHTML=response;
				}, 
			error: function (){
				alert('Error inesperado, no se pudo obtener listado de hipotesis');
			} 			
		});	
}


	 function obtiene_examen_fisico(lugar) {
   
	if(lugar=='local'){
		var atencion=  parent.document.getElementById('codAtencion').value;
		var usr = parent.document.getElementById('codUsuario').value;
	}else{
		var atencion=  document.getElementById('codAtencion').value;
		var usr = document.getElementById('codUsuario').value;
	}
	
	var iurl = 'obtener_examen_fisico.php?'+Math.random();


		var parametros = {
			"atencion" : atencion,
			"usuario" : usr
		};
		
		$.ajax({
			data:  parametros,
			url:   iurl,
			type:  'get',
			success:  function (response) {
				if(lugar=='local')		
					document.getElementById('listado_examen_fisico').innerHTML=response;
				else
					window.frames[1].listado_examen_fisico.innerHTML=response;
			}, 
			error: function (){
				alert('Error inesperado, no se pudo obtener listado de examenes fisicos');
			} 			
		});	
}



function obtiene_cie10(origen,elimina) {
	if(origen=='fuera')
		var atencion=  document.getElementById('codAtencion').value;
	else
		var atencion=  parent.document.getElementById('codAtencion').value;
		
	var iurl = 'obtener_cie.php?'+Math.random();
	
	//if (elimina!=0)
		//elimina=1;
	
//	if (elimina==0)
	//	alert (elimina);

		var parametros = {
			"atencion" : atencion,
			"elimina": elimina
		};
		
		$.ajax({
			data:  parametros,
			url:   iurl,
			type:  'get',
			success:  function (response) {
					if(origen=='fuera'){
						window.frames[1].listado_cie.innerHTML=response;
						window.frames[4].if_auge_ges2(atencion);	
					}else{
						document.getElementById('listado_cie').innerHTML=response;
						parent.if_auge_ges2(atencion,'fuera');	
					}
					
			}, 
			error: function (){
				alert('Error inesperado, no se pudo obtener listado de diagnosticos CIE10');
			} 			
		});	
}


function levanta_sgh() {
	var codPacie= parent.document.getElementById('codPacie').value;
	var codUsuario= parent.document.getElementById('codUsuario').value;
	var codInst= document.getElementById('codInstitucion').value;
	pagina='http://10.6.85.228:8085/SGH/ingreso/add_ing.php?v=n&paciente_id='+codPacie+'&profesional_id='+codUsuario+'&codInst='+codInst;
	configuracion = "KeepThis=true&TB_iframe=true&width=800&height=800&modal=false";
	url = pagina+"&"+configuracion+"&"+Math.random();
	tb_show('Hospitalizacion Paciente', url);
}


function imprimir(atencion) {
	pagina='dau_p.php';
	variables = "a="+atencion;
	configuracion = "KeepThis=true&TB_iframe=true&width=600&height=600&modal=false";
	url = pagina+"?"+variables+"&"+configuracion+"&"+Math.random();
	tb_show('Impresion DAU', url);
}

function imprimir_receta(codigo) {
	pagina='s_receta_p.php';
	variables = "rct="+codigo;
	configuracion = "KeepThis=true&TB_iframe=true&width=600&height=600&modal=false";
	url = pagina+"?"+variables+"&"+configuracion+"&"+Math.random();
	tb_show('Impresion Receta', url);
}

function imprimir_sic(codigo,institucion) {
	pagina='s_sic_p.php';
	variables = "sic="+codigo+"&i="+institucion;
	configuracion = "KeepThis=true&TB_iframe=true&width=600&height=600&modal=false";
	url = pagina+"?"+variables+"&"+configuracion+"&"+Math.random();
	tb_show('Impresion SIC', url);
}


function vm_cambio_estado_solicitud(codSol, codUsr){
	pagina='../examenes/estado.php';
	variables = "s="+codSol+"&u="+codUsr;
	configuracion = "KeepThis=true&TB_iframe=true&width=300&height=300&modal=false";
	url = pagina+"?"+variables+"&"+configuracion+"&"+Math.random();
	tb_show('Cambiar Estado Solicitud', url);
}

function imprimir_examen(detalle,pagina) {
	if (pagina==1){
		pagina='s_rayos_p.php';
	}else{
		pagina='s_laboratorio_p.php';
	}
	variables = "d="+detalle;
	configuracion = "KeepThis=true&TB_iframe=true&width=600&height=600&modal=false";
	url = pagina+"?"+variables+"&"+configuracion+"&"+Math.random();
	tb_show('Impresion Examen', url);
}

function cambia_estado_proc(detalle,usuario) {
	pagina='/dau/vista/examenes/estado_proc.php';
	var tipo =  parent.document.getElementById('tipoAtencion').value;
	variables = "d="+detalle+"&u="+usuario+"&t="+tipo;
	configuracion = "KeepThis=true&TB_iframe=true&width=500&height=300&modal=false";
	url = pagina+"?"+variables+"&"+configuracion+"&"+Math.random();
	tb_show('Cambio Estado Indicacion', url);
}

function abrir_ventana(pagina,detalle,texto,alto,ancho) {
	pagina=''+pagina+'.php';
	variables = "detalle="+detalle;
	configuracion = "KeepThis=true&TB_iframe=true&width="+ancho+"&height="+alto+"&modal=false";
	url = pagina+"?"+variables+"&"+configuracion+"&"+Math.random();
	tb_show(texto, url);
}

function abrir_ventana_II(pagina,codAten,codInst,codUsr,texto,alto,ancho) {
	
	codUsr=parent.document.getElementById('codUsuario').value;
	pagina='/dau/vista/atencion/'+pagina+'.php';
	variables = "codAten="+codAten+"&codInst="+codInst+"&codUsr="+codUsr;
	configuracion = "KeepThis=true&TB_iframe=true&width="+ancho+"&height="+alto+"&modal=false";
	url = pagina+"?"+variables+"&"+configuracion+"&"+Math.random();
	tb_show(texto, url);
}
function abrir_ventana_III(pagina,parametros,texto,alto,ancho) {
		
	configuracion = "KeepThis=true&TB_iframe=true&width="+ancho+"&height="+alto+"&modal=false";
	url = pagina+"?"+parametros+"&"+configuracion+"&"+Math.random();
	tb_show(texto, url);
}


function abrir_resultado_img(rut) {
	//var pagina='http://10.6.85.164/ZFP?lights=on&mode=proxy#view&pid='+rut+'&un=emergencia&pw=emergencia';
	var pagina="resultado.php?rut="+rut;
	configuracion = "KeepThis=true&TB_iframe=true&width=850&height=800&modal=false";
	url = pagina+"&"+configuracion;
	//window.open(pagina);
	tb_show('RESULTADO DE EXAMENES IMAGENOLOGIA', url);
}


	function abrir_eno(codAten,codDiag) {
	var ancho=600; var alto=720;
	codUsr=parent.document.getElementById('codUsuario').value;
	pagina='/dau/vista/atencion/formularios/eno.php';
	variables = "a="+codAten+"&d="+codDiag;
	configuracion = "KeepThis=true&TB_iframe=true&width="+ancho+"&height="+alto+"&modal=false";
	url = pagina+"?"+variables+"&"+configuracion+"&"+Math.random();
	tb_show('ENO', url);
}


	function abrir_farm_uso_ocasional(codAten,codDiag) {
	var ancho=600; var alto=720;
	codUsr=parent.document.getElementById('codUsuario').value;
	pagina='/dau/vista/atencion/formularios/fuo.php';
	variables = "a="+codAten+"&d="+codDiag;
	configuracion = "KeepThis=true&TB_iframe=true&width="+ancho+"&height="+alto+"&modal=false";
	url = pagina+"?"+variables+"&"+configuracion+"&"+Math.random();
	tb_show('s', url);
}


// /dau/vista/atencion/formularios/fuo.php?a=38011

//para la puta visualizacion de rayos
function abrir_rayos(alto,ancho) {
	pagina='http://usuario:password@10.6.85.180/';
	variables = "";
	configuracion = "KeepThis=true&TB_iframe=true&width="+ancho+"&height="+alto+"&modal=false";
	url = pagina+"?"+variables+"&"+configuracion+"&"+Math.random();
	tb_show('Ver Scanner', url);
}




function abrir_scanner(alto,ancho) {
	pagina='http://10.6.85.124:8085/FormularioHospital/Scanner/indexSolicitar.php';
	
	variables = "ctacte=10674770&coddiag=&codpacie=657817&solicitante=5499&especialidad=109&servicio=60&pielo=&codTablaExterna=3216&procedencia=5";
	
	configuracion = "KeepThis=true&TB_iframe=true&width="+ancho+"&height="+alto+"&modal=false";
	url = pagina+"?"+variables+"&"+configuracion+"&"+Math.random();
	tb_show('Solicitud de Scanner', url);
}


//function abrir_sol_scanner(ctacte,coddiag,codpacie,solicitante,especialidad,servicio,pielo,codTablaExterna,procedencia, alto,ancho) {
function abrir_sol_scanner(rut,alto,ancho) {	
	//alert(ctacte+" | "+coddiag+" | "+codpacie+" | "+solicitante+" | "+especialidad+" | "+servicio+" | "+pielo+" | "+codTablaExterna+" | "+procedencia+" | "+alto+" | "+ancho);
	pagina='http://10.6.85.124:8085/FormularioHospital/Admision/index.php';
	//pagina='http://10.6.85.124:8085/FormularioHospital/Scanner/indexSolicitar.php';
	//variables = "ctacte="+ctacte+"&coddiag="+coddiag+"&codpacie="+codpacie+"&solicitante="+solicitante+"&especialidad="+especialidad+"&servicio="+servicio+"&pielo="+pielo+"&codTablaExterna="+codTablaExterna+"&procedencia="+procedencia;
	variables = 'rutprof='+rut;
	configuracion = "KeepThis=true&TB_iframe=true&width="+ancho+"&height="+alto+"&modal=false";
	url = pagina+"?"+variables+"&"+configuracion+"&"+Math.random();
	tb_show('Solicitud de Scanner', url);
}

/*
$ctacte			= $_GET['ctacte'];
$coddiag 		= $_GET['coddiag'];
$codpacie		= $_GET['codpacie'];
$solicitante	= $_GET['solicitante'];
$especialidad 	= $_GET['especialidad'];
$servicio 		= $_GET['servicio'];
$codTablaExterna= $_GET['codTablaExterna'];           
$fk_procedencia = $_GET['procedencia'];
$hipodiag = $_GET['hipodiag'];
$pielo      = $_GET['pielo'];
*/

function abrir_sol_scanner2(ctacte,coddiag,codpacie,rutSol,especialidad,servicio,codTablaExterna,procedencia,pielo,hipodiag,anamnesis, alto,ancho) {
	//alert(ctacte+" | "+coddiag+" | "+codpacie+" | rut: "+rutSol+" | "+especialidad+" | "+servicio+" | "+codTablaExterna+" | "+procedencia+" | "+pielo+" | "+hipodiag+" | "+alto+" | "+ancho);
	
	pagina='http://10.6.85.124:8085/FormularioHospital/Scanner/indexSolicitar.php';
	variables = "ctacte="+ctacte+"&coddiag="+coddiag+"&codpacie="+codpacie+"&rutSol="+rutSol+"&especialidad="+especialidad+"&servicio="+servicio+"&codTablaExterna="+codTablaExterna+"&procedencia="+procedencia+"&pielo="+pielo+"&hipodiag="+hipodiag+"&anamnesis="+anamnesis;
	configuracion = "KeepThis=true&TB_iframe=true&width="+ancho+"&height="+alto+"&modal=false";
	url = pagina+"?"+variables+"&"+configuracion+"&"+Math.random();
	tb_show('Solicitud de Scanner', url);
}


function abrir_sic(admision,institucion, usuario) {
	var detalle= parent.document.getElementById('detalle').value;
	//alert(d);
	pagina='s_sic.php';
	variables = "a="+admision+"&i="+institucion+"&u="+usuario+"&d="+detalle;
	configuracion = "KeepThis=true&TB_iframe=true&width=600&height=730&modal=false";
	url = pagina+"?"+variables+"&"+configuracion+"&"+Math.random();
	tb_show('Solicitud de Interconsultas', url);
}




function fn_carga_datos_paciente(atencion){
	
	
	iurl='datos_paciente.php?'+Math.random();
	
	var parametros = {
		"atencion" : atencion
	};
	
	$.ajax({
		data:  parametros,
		url:   iurl,
		type:  'get',
		success:  function (response) {
					document.getElementById("datos_paciente").innerHTML = response;
		}, 
		error: function (){
			alert('Error inesperado, no se pudieron obtener datos de pacientes, intente más tarde');
		} 			
	});	
}

function fn_carga_botones(codigo){
	
	iurl='botones.php?codigo='+codigo+'&'+Math.random();
	$.ajax({
		
		url:   iurl,
		type:  'get',
		success:  function (response) {
					document.getElementById("botones").innerHTML = response;
		}, 
		error: function (){
			alert('Error inesperado, no se pudieron cargar los botones, intente más tarde');
		} 			
	});	
}

function fn_carga_menu(){
	
	iurl='menu.php?'+Math.random();
	
	var atencion = document.getElementById('codAtencion').value;
	
	var parametros = {
		"atencion" : atencion
	};
	
	$.ajax({
		data:  parametros,
		url:   iurl,
		type:  'get',
		success:  function (response) {
					document.getElementById("menu").innerHTML = response;
		}, 
		error: function (){
			alert('Error inesperado, no se pudo cargar el menu, intente más tarde');
		} 			
	});	
}


function fn_bloqueo(){
	
	var codAdmision = document.getElementById('codAdmision').value;
	var codInstitucion = document.getElementById('codInstitucion').value;
	var codUsuario = document.getElementById('codUsuario').value;
	var codAtencion = document.getElementById('codAtencion').value;
	
	//alert("0 codAdmision:" + codAdmision);
	
	document.getElementById('codUsuario').value=0;
	pagina='bloqueo.php';
	configuracion = "at="+codAtencion+"&u="+codUsuario+"&a=" + codAdmision + "&l=a"+"&i="+ codInstitucion +"&KeepThis=true&TB_iframe=true&width=270&height=340&modal=true";
	url = pagina+"?"+configuracion+"&"+Math.random();
	tb_show('Autentificación de usuario', url);
	
}

function fn_carga_datos_inicio(){
	
	var atencion = document.getElementById('codAtencion').value;
	var institucion = document.getElementById('codInstitucion').value;
	var usuario = document.getElementById('codUsuario').value;
	
	iurl='datos_ingreso';
	iurl = iurl+'.php?'+Math.random();
	document.getElementById("datos").src ="/dau/vista/atencion/"+iurl+"&atencion="+atencion+"&codInst="+institucion+"&codUsr="+usuario;
	
	iurl='atencion_medica';
	iurl = iurl+'.php?'+Math.random();
	document.getElementById("datos_med").src ="/dau/vista/atencion/"+iurl+"&atencion="+atencion+"&codInst="+institucion+"&codUsr="+usuario;	
	
	iurl='examenes';
	iurl = iurl+'.php?'+Math.random();
	document.getElementById("datos_exa").src ="/dau/vista/atencion/"+iurl+"&atencion="+atencion+"&codInst="+institucion+"&codUsr="+usuario;	
	
	iurl='signos_vitales';
	iurl = iurl+'.php?'+Math.random();
	document.getElementById("datos_sig").src ="/dau/vista/atencion/"+iurl+"&atencion="+atencion+"&codInst="+institucion+"&codUsr="+usuario;	

	iurl='uego';
	iurl = iurl+'.php?'+Math.random();
	document.getElementById("datos_uego").src ="/dau/vista/atencion/"+iurl+"&atencion="+atencion+"&codInst="+institucion+"&codUsr="+usuario;	
	
	iurl='indicaciones_alta';
	iurl = iurl+'.php?'+Math.random();
	document.getElementById("datos_alta").src ="/dau/vista/atencion/"+iurl+"&atencion="+atencion+"&codInst="+institucion+"&codUsr="+usuario;		


	document.getElementById("datos_med").style.visibility="hidden";
	document.getElementById("datos_exa").style.visibility="hidden";
	document.getElementById("datos_sig").style.visibility="hidden";
	document.getElementById("datos_alta").style.visibility="hidden";
	document.getElementById("datos_uego").style.visibility="hidden";
	document.getElementById("datos").style.visibility="visible"

}


function fn_cerrar_modal(usr){
	try{
		tb_remove(true);
						
	}catch(e){
		window.close();
	}
}

function fn_carga_datos(iurl){
	document.getElementById('idmenu').value=iurl;
	
	var elimina = document.getElementById('elimina').value; //permite saber si el perfil de usuario que hizo login puede elmiminar cie10
	
	if(iurl=='datos_ingreso'){		
		document.getElementById("datos_med").style.visibility="hidden";
		document.getElementById("datos_exa").style.visibility="hidden";
		document.getElementById("datos_sig").style.visibility="hidden";
		document.getElementById("datos_alta").style.visibility="hidden";
		document.getElementById("datos_uego").style.visibility="hidden";
		document.getElementById("datos").style.visibility="visible";
	}
	
	if(iurl=='atencion_medica'){
		document.getElementById("datos").style.visibility="hidden";
		document.getElementById("datos_exa").style.visibility="hidden";
		document.getElementById("datos_sig").style.visibility="hidden";
		document.getElementById("datos_alta").style.visibility="hidden";
		document.getElementById("datos_uego").style.visibility="hidden";
		document.getElementById("datos_med").style.visibility="visible";
		
		//actualiza las tablas x si hubiera un cambio desde otro pc
		
		obtiene_ananamnesis();
		obtiene_examen_fisico();
		obtiene_hipotesis();
		obtiene_cie10('fuera',elimina);

		
		if (window.frames[1].condicion_ingreso.value==0)
			window.frames[1].condicion_ingreso.selectedIndex=recorrer(window.frames[1].condicion_ingreso,1);

	}
	if(iurl=='examenes'){
		
		document.getElementById("datos").style.visibility="hidden";
		document.getElementById("datos_med").style.visibility="hidden";
		document.getElementById("datos_exa").style.visibility="visible";
		document.getElementById("datos_sig").style.visibility="hidden";
		document.getElementById("datos_uego").style.visibility="hidden";
		document.getElementById("datos_alta").style.visibility="hidden";	
	
		//actualiza las tablas x si hubiera un cambio desde otro pc
		
		fn_carga_tabla_exa_rayos('fuera');
		fn_carga_tabla_exa_lab('fuera');
		fn_carga_tabla_indicaciones('fuera');
		
		fn_carga_tabla_recetas('fuera');
		obtiene_examen_observacion('fuera');		
		fn_carga_tabla_exa_scanner('fuera');
		obtiene_sic('fuera');
		

		
	}
	if(iurl=='signos_vitales'){
		
		document.getElementById("datos").style.visibility="hidden";
		document.getElementById("datos_med").style.visibility="hidden";
		document.getElementById("datos_exa").style.visibility="hidden";
		document.getElementById("datos_sig").style.visibility="visible";
		document.getElementById("datos_uego").style.visibility="hidden";
		document.getElementById("datos_alta").style.visibility="hidden";	
		
		
		}


	if(iurl=='uego'){
		
		document.getElementById("datos").style.visibility="hidden";
		document.getElementById("datos_med").style.visibility="hidden";
		document.getElementById("datos_exa").style.visibility="hidden";
		document.getElementById("datos_sig").style.visibility="hidden";
		document.getElementById("datos_alta").style.visibility="hidden";
		document.getElementById("datos_uego").style.visibility="visible";
	}


	if(iurl=='indicaciones_alta'){
		
		document.getElementById("datos").style.visibility="hidden";
		document.getElementById("datos_med").style.visibility="hidden";
		document.getElementById("datos_exa").style.visibility="hidden";
		document.getElementById("datos_sig").style.visibility="hidden";
		document.getElementById("datos_alta").style.visibility="visible";
		document.getElementById("datos_uego").style.visibility="hidden";	

		//actualiza las tablas x si hubiera un cambio desde otro pc
		
		obtiene_indicaciones_alta('fuera');
	}	
}


function fn_carga_tabla_recetas(origen){		
		
		if(origen=='fuera')
			codAtencion=document.getElementById('codAtencion').value;
		else
			codAtencion=parent.document.getElementById('codAtencion').value;
			
		var iurl = 'obtener_lista_recetas.php?'+Math.random();
		
		var parametros = {
			"a" : codAtencion
		};
		
		$.ajax({
			data:  parametros,
			url:   iurl,
			type:  'get',
			success:  function (response) {
					if(origen=='fuera')
						window.frames[2].divListadoRecetas.innerHTML=response;
					else
						document.getElementById("divListadoRecetas").innerHTML = response;
			}, 
			error: function (){
				alert('Error inesperado, no se pudo obtener listado de recetas, intente más tarde');
			} 			
		});	
	}
	
	function fn_carga_tabla_exa_rayos(origen){
		
		var ate=0;
		var usr=0;
		if (origen=='fuera'){
			ate=document.getElementById('codAtencion').value;
			usr=document.getElementById('codUsuario').value;				
		}else{
			ate=parent.document.getElementById('codAtencion').value;
			usr=parent.document.getElementById('codUsuario').value;							
		}
		
		//alert('ate: '+ ate +' usr: '+usr);
		var iurl = 'obtener_lista_exa_rayo.php?'+Math.random();
		
		var parametros = {
			"a" : ate,
			"u":usr
			
		};
		
		$.ajax({
			data:  parametros,
			url:   iurl,
			type:  'get',
			success:  function (response) {
						if (origen=='fuera')
							window.frames[2].divListadoExaRayos.innerHTML=response;
						else
							document.getElementById("divListadoExaRayos").innerHTML = response;
			}, 
			error: function (){
				alert('Error inesperado, no se pudo obtener listado de solicitudes de rayos, intente más tarde');
			} 			
		});	
	}

	function fn_carga_tabla_exa_lab(origen){
		var ate=0;
		var usr=0;
		if (origen=='fuera'){
			ate=document.getElementById('codAtencion').value;
			usr=document.getElementById('codUsuario').value;		
		}else{
			ate=parent.document.getElementById('codAtencion').value;
			usr=parent.document.getElementById('codUsuario').value;		
		}
				
		
		var iurl = 'obtener_lista_exa_laboratorio.php?'+Math.random();
		
		var parametros = {
			"a" : ate,
			"u":usr
		};
		
		$.ajax({
			data:  parametros,
			url:   iurl,
			type:  'get',
			success:  function (response) {
					if (origen=='fuera')
						window.frames[2].divListadoExaLab.innerHTML=response;
					else
						document.getElementById("divListadoExaLab").innerHTML = response;
			}, 
			error: function (){
				alert('Error inesperado, no se pudo obtener listado de solicitudes de laboratorio, intente más tarde');
			} 			
		});	
	}
	
	function fn_carga_tabla_exa_scanner(origen){
					
		//var iurl = 'obtener_lista_exa_scanner.php?'+Math.random();
		//var iurl = 'http://10.6.85.124:8085/DAU_Electronico/vista/atencion/obtener_lista_exa_scanner.php?'+Math.random();
		var iurl = 'http://10.6.85.124:8085/daue/vista/atencion/obtener_lista_exa_scanner.php?'+Math.random();
		
				
		if(origen == 'fuera'){
			ctacte = document.getElementById('ctacte').value;
			codPacie = document.getElementById('codPacie').value;
		}
		else{
			ctacte = parent.document.getElementById('ctacte').value;
			codPacie = parent.document.getElementById('codPacie').value;
		}
		
		//alert("ctacte: " + ctacte);	
		
		var parametros = {
			"c" : ctacte,
			"cp" : codPacie
		};
		
		$.ajax({
			data:  parametros,
			url:   iurl,
			type:  'get',
			success:  function (response) {
					if(origen=='fuera')
						window.frames[2].divListadoScanner.innerHTML=response;
					else
						document.getElementById("divListadoScanner").innerHTML = response;
			}, 
			error: function (){
				alert('Error inesperado, no se pudo obtener listado de solicitudes de scanner, intente más tarde');
			} 			
		});	


		
		
	}
	
	function fn_carga_tabla_indicaciones(origen){
		
		var ate=0;
		var usr=0;
		
		if (origen=='fuera'){
			ate=document.getElementById('codAtencion').value;
			usr=document.getElementById('codUsuario').value;			
		}else{
			ate=parent.document.getElementById('codAtencion').value;
			usr=parent.document.getElementById('codUsuario').value;					
		}
		
		var iurl = 'obtener_lista_indicaciones.php?'+Math.random();
		
		var parametros = {
			"a" : ate,
			"u":usr
		};
		
		$.ajax({
			data:  parametros,
			url:   iurl,
			type:  'get',
			success:  function (response) {
					if (origen=='fuera')
						window.frames[2].divListadoIndicaciones.innerHTML=response;
					else
						document.getElementById("divListadoIndicaciones").innerHTML = response;
						
			}, 
			error: function (){
				alert('Error inesperado, no se pudo obtener listado de indicaciones, intente más tarde');
			} 			
		});	
	}
	
	function fn_carga_tabla_signos_vitales(origen){
		
		var ate=0;
		var usr=0;
		
		if (origen=='fuera'){
			ate=document.getElementById('codAtencion').value;
			usr=document.getElementById('codUsuario').value;			
		}else{
			ate=parent.document.getElementById('codAtencion').value;
			usr=parent.document.getElementById('codUsuario').value;					
		}
		
		var iurl = 'obtener_listado_signos_vitales.php?'+Math.random();
		
		var parametros = {
			"a" : ate,
			"u":usr
		};
		
		$.ajax({
			data:  parametros,
			url:   iurl,
			type:  'get',
			success:  function (response) {
					if (origen=='fuera')
						window.frames[2].tablaControlSignosVitales.innerHTML=response;
					else
						document.getElementById("tablaControlSignosVitales").innerHTML = response;
						
			}, 
			error: function (){
				alert('Error inesperado, no se pudo obtener listado de indicaciones, intente más tarde');
			} 			
		});	
	}
	
	
	
	function recorrer(selec, valueabuscar) {
	var w = 0;
	for(w=0; w < selec.options.length; w++){
		if(selec.options[w].value == valueabuscar){
			return w;
		}
	}
}


function fn_pagina_en_construccion(){
	
	pagina='pagina_en_construccion.php';
	configuracion = "KeepThis=true&TB_iframe=true&width=250&height=100&modal=true";
	url = pagina+"?"+configuracion+"&"+Math.random();
	tb_show('Página en construccián', url);
}

function guarda_cie10t(codigo,tapsa) {
   
	//var codigo= document.getElementById('cod_cie').value;
	var atencion= parent.document.getElementById('codAtencion').value;
	var detalle=  parent.document.getElementById('detalle').value;
	
	var institucion=  parent.document.getElementById('codInstitucion').value;
	var usuario=  parent.document.getElementById('codUsuario').value;
	if (detalle=='')
		detalle=0;
	
	//alert(tapsa);
	var iurl = 'guarda_cie_tapsa.php';

	if (codigo>0)
	{
		var parametros = {
			"cie" : codigo,
			"detalle" : detalle,
			"atencion": atencion,
			"institucion": institucion,
			"usuario": usuario,
                        "tapsa":tapsa
		};

		$.ajax({
			data:  parametros,
			url:   iurl,
			type:  'post',
			success:  function (response) {
						
						if(response.trim() >0){
							document.getElementById('listado_cie').value=response;
							//window.frames[1].listado_examen_observacion.innerHTML=response;
							obtiene_cie10();
						}else{
							alert('El diagnostico no fue registrado, favor intente nuevamente');
						}
			}, 
			error: function (){
				alert('Error inesperado, al intentar registrar el diagnostico, intente más tarde');
			} 			
		});	
	}else
		alert('Debe seleccionar un diagnostico')
		
}


function fn_muestra_documento(tipo){
	
	var codAdmision = parent.document.getElementById('codAdmision').value;
	var codInstitucion = document.getElementById('codInstitucion').value;
	var codUsuario = document.getElementById('codUsuario').value;
	
	if(tipo == "consentimiento"){
		pagina="/dau/vista/cartas/consentimientos/index.php";
	}
	if(tipo == "carta"){
		pagina="/dau/vista/cartas/informacion_al_paciente/index.php";
	}
	if(tipo == "documento"){
		pagina="/dau/vista/cartas/documentos_informacion/index.php";
	}
	
	//alert("0 codAdmision:" + codAdmision);
	
	//document.getElementById('codUsuario').value=0;
	//pagina='bloqueo.php';
	configuracion = "i="+codInstitucion+"&u="+codUsuario+"&a="+codAdmision+"&KeepThis=true&TB_iframe=true&width=800&height=500&modal=false";
	url = pagina+"?"+configuracion+"&"+Math.random();
	tb_show('Autentificación de usuario', url);
}

function muestra_as(){
	$( "#agresion_sexual_detalle" ).toggle();
	var valor_mustra_as = document.getElementById('if_as').value;
	var cod_aten = document.getElementById('cod_aten').value;
	var iurl = 's_guarda_as.php?'+Math.random();
	var parametros = {
		"a" : cod_aten,
		"elimina" : valor_mustra_as			
	};
	
	$.ajax({
		data:  parametros,
		url:   iurl,
		type:  'post',
		success:  function (response) {
			if(response.trim() == 'g'){
					//console.log(response);
			}else{
				alert('Los datos de la agresión sexual no fueron recuperados, favor intente nuevamente');
				alert(response);
			}
		}, 
		error: function (){
			alert('Error inesperado, al intentar registrar la indicacion, intente más tarde');
		} 			
	});
	
	
}


function guarda_as(lugar) {
   	
if (lugar=='fuera'){
		var AnticonEmerg = window.frames[3].document.getElementById('if_acoe').value;
		var tpoPenetracion = window.frames[3].document.getElementById('if_pen').value;
		var profilaxisVIH  = window.frames[3].document.getElementById('if_prof_vih').value;
		var profilaxisITS = window.frames[3].document.getElementById('if_prof_its').value;
		var victimario = window.frames[3].document.getElementById('as_victimario').value;
		var cod_aten = window.frames[3].document.getElementById('cod_aten').value;
		var cod_usr = window.frames[3].document.getElementById('cod_usr').value;
		var Embarazo = window.frames[3].document.getElementById('if_as_emb').value;		
}else{
		var AnticonEmerg = document.getElementById('if_acoe').value;
		var tpoPenetracion = document.getElementById('if_pen').value;
		var profilaxisVIH  = document.getElementById('if_prof_vih').value;
		var profilaxisITS = document.getElementById('if_prof_its').value;
		var victimario = document.getElementById('as_victimario').value;
		var cod_aten = document.getElementById('cod_aten').value;
		var cod_usr = document.getElementById('cod_usr').value;
		var Embarazo = document.getElementById('if_as_emb').value;
}

	var iurl = 's_guarda_as.php?'+Math.random();
	
	var parametros = {
		
		"ae" : AnticonEmerg,
		"tp" : tpoPenetracion,
		"pvih" : profilaxisVIH,
		"pits" :  profilaxisITS,
		"vic" : victimario,
		"a" : cod_aten,
		"u" : cod_usr,
		"emb" : Embarazo
								
	};
	//console.log(parametros);
	$.ajax({
		data:  parametros,
		url:   iurl,
		type:  'post',
		success:  function (response) {
					if(response.trim() == 'g'){
						
					}else{
						alert('Los datos de la agresión sexual no fueron registrados, favor intente nuevamente');
						alert(response);
					}
		}, 
		error: function (){
			alert('Error inesperado, al intentar registrar la indicacion, intente más tarde');
		} 			
	});

}

function fn_guarda_prestaciones(){
	var iurl = 'dau_guarda_prestaciones/prestacionesPorAdmision.php';
	var usuario = document.getElementById('codUsuario').value;
	var institucion = document.getElementById('codInstitucion').value;
	var atencion = document.getElementById('codAtencion').value;
	var codAdmision = document.getElementById('codAdmision').value;
	var parametros = {
		'u' : usuario,
		'a' : codAdmision,
		'i' : institucion
	};

	$.ajax({
		data:  parametros,
		url:   iurl,
		type:  'post',
		success:  function (response) {
			//alert(response);
		},
		error: function (){
			alert('Error inesperado, al intentar registrar las prestaciones, intente más tarde');
		}
	});
}

function fn_lee_prestaciones(){
	var iurl = 'lectura_prestaciones/leerPrestacionesPorAdmision.php';
	var codAdmision = document.getElementById('codAdmision').value;
	var parametros = {
		'a' : codAdmision
	};
	$.ajax({
		data:  parametros,
		url:   iurl,
		type:  'get',
		success:  function (response) {
			//console.log(response);
		},
		error: function (){
			//alert('Error inesperado, al intentar registrar el diagnostico, intente más tarde');
		}
	});
}
