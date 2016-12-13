$(document).ready(function(){
  $.ajax({
    url:'https://dailyverses.net/getdailyverse.ashx?language=es&isdirect=1&url=' + window.location.hostname,
    dataType: 'JSONP',
    success:function(json){
    $(".dailyVersesWrapper").prepend(json.html);
  }
  });

  $('#add_product').click(function(event, ui){
    var name_product= $(".products").val( ui );
    var comp_product= $("#composicion").val(ui);
    var hour_product= $("#hour").val(ui);
    var days_product= $("#days").val(ui);
    var total = comp_product*(24/hour_product)*days_product;
    var row_product = "Medicamento: "+name_product+"  Composición: "+comp_product+"  - "+
      hour_product+ " cada "+days_product+" días"+
      "   Total: "+total+"</strong>";
    $('#obs').append(row_product);
  });
});


