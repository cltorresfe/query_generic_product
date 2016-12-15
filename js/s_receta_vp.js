$(document).ready(function(){
  var name_product = '';
  $('#add_product').click(function(){
    var name_product_select= $("#product").val();
    if($("#product_id").val() != '' && name_product == name_product_select ){
      var comp_product= $("#composicion").val();
      var hour_product= $("#hora").val();
      var days_product= $("#days").val();
      var total = comp_product*(24/hour_product)*days_product;
      var row_product = name_product_select+"\n"+comp_product+" CADA "+
        hour_product+ " HORAS POR "+days_product+" DIAS\n"+
        "TOTAL: "+total+"\n";
      $('#obs').append(row_product);
      $('#product').attr("placeholder", "buscar producto").val("").focus().blur();
      $('#composicion').attr("placeholder", "composición").val("").focus().blur();
      $('#days').attr("placeholder", "días").val("").focus().blur();
      $("#product_stock").html("");
      $("#new_product_form").validator('update');
    }
  });

  $("#product").autocomplete({                   
          source:
              function( request, response ) {
                 $.getJSON( "search_product.php", {
                                   term: request.term
                 }, response );
          },
          minLength: 4,
          select:
             function(event, ui) { 
                  var codigo_producto = ui.item ? ui.item.codigo_producto : '';
                  $("#product_id").val(ui.item.codigo_producto);
                  $("#product_stock").html("stock:"+ui.item.stock);
                  name_product = ui.item.value;
             }
        });
});

$(document).on('click','#add_product',function(event){
  $( "#new_product_form" ).submit();
 return false;
});
