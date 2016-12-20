var name_product = '';
var total = 0;
var stock = 0;
var name_product_select= $("#product").val();
var bandera = true;
var comp_product= $("#composicion").val();
var hour_product= $("#hora").val();
var days_product= $("#days").val();
var via_product= $("#via").val();

$(document).ready(function(){

  var items = [];
  $.getJSON( "s_search_product.php", function( data ) {
    $.each( data, function( key, val ) {
      items.push(val);
    });
  });

  $("#product").autocomplete({                   
          source: items,
          minLength: 4,
          select:
             function(event, ui) { 
                  var codigo_producto = ui.item ? ui.item.codigo_producto : '';
                  $("#product_id").val(ui.item.codigo_producto);
                  name_product = ui.item.value;
                  stock= ui.item.stock;
             }
        })
        .autocomplete( "instance" )._renderItem = function( ul, item ) {
            return $( "<li>" )
              .append( "<div>" + item.label + " (Stock: " + item.stock + ")</div>" )
              .appendTo( ul );
        };

  $('#days').bind('click keyup', function (){
    if( validate_form() ){
      total = comp_product*(24/hour_product)*days_product;
      if(total>stock)$("#product_stock").html("<div class='btn btn-warning btn-xs'>Total: "+total+" - Stock: "+stock+"</div>");
      else $("#product_stock").html("<div class='btn btn-success btn-xs'>Total: "+total+" - Stock: "+stock+"</div>");
    }
  });
});

$(document).on('click','#add_product',function(event){
  bandera = validate_form();
  var obs= $("#obs").val();

  if( bandera ){
    total = comp_product*(24/hour_product)*days_product;
    var row_product = name_product_select+"\n"+comp_product+" CADA "+
      hour_product+ " HORAS POR "+days_product+" DIAS "+
      via_product+"\n"+"TOTAL: "+total+"\n";
    $('#obs').val($('#obs').val()+row_product +' ').focus();
    //$('#obs').append(obs+row_product);
    $('#product').attr("placeholder", "buscar producto").val("").focus().blur();
    $('#composicion').attr("placeholder", "cantidad").val("").focus().blur();
    $('#days').attr("placeholder", "días").val("").focus().blur();
    $("#product_stock").html("");
    $( "#new_product_form" ).submit();
  }

 return false;
});

function validate_form(){
  bandera = true;
  name_product_select= $("#product").val();
  comp_product= $("#composicion").val();
  hour_product= $("#hora").val();
  days_product= $("#days").val();
  via_product= $("#via").val();
  if(comp_product == '' || comp_product < 1)bandera = false;
  if(days_product == '' || days_product < 1)bandera = false;
  if($("#product_id").val() == '' || name_product != name_product_select )bandera = false;
  return bandera;
}
