<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Autocomplete</title>
    <script>
      $(function() { 
        $("#products").autocomplete({                   
          source:
              function( request, response ) {
                 $.getJSON( "search.php", {
                                   term: request.term
                 }, response );
          },
          minLength: 4
        });  
       });
    </script>
  </head>
  <body>
   
    <div><br>
      <form id= "new_product_form">
        <div id="new_product">
        <label for="products">Productos: </label>
        <input id="products" class="products" name="product" type="text" placeholder="buscar producto" style="width: 40%">
        <input id="composicion" name="comp" id="comp" type="text" placeholder="por composición">
        <select name="hora" id="hour">
          <option value="2">2 hrs.</option>
          <option value="4">4 hrs.</option>
          <option value="6">6 hrs.</option>
          <option value="8">8 hrs.</option>
          <option value="12">12 hrs.</option>
          <option value="24">24 hrs.</option>
        </select>
        <input id="days" name="days" type="text" placeholder="días" style="width: 50px" value="">
        <div class="btn btn-info btn-sm" id="add_product">Agregar</div>
        </div>
      </form>
    </div>

  </body>
</html>