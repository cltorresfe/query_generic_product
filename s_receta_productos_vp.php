  <br>
  <form id= "new_product_form" class="navbar-form" role="search">
    <div class="ui-widget">
      <label for="product">Productos: </label>
      <input id="product" class="product" name="product" type="text" placeholder="buscar producto" style="width: 30%">
      <input type="hidden" id="product_id" />
    
    <input id="composicion" name="comp" id="comp" type="text" placeholder="composición" style="width: 50px" >
    cada
    <select name="hora" id="hour">
      <option value="2">2 hrs.</option>
      <option value="4">4 hrs.</option>
      <option value="6">6 hrs.</option>
      <option value="8">8 hrs.</option>
      <option value="12">12 hrs.</option>
      <option value="24">24 hrs.</option>
    </select> por
    <input id="days" name="days" type="text" placeholder="días" style="width: 50px" value="">
    <div id="product_stock" class="badge"></div>
    <div class="btn btn-info btn-sm" id="add_product" style="width: 100%">Agregar</div>
    

    </div>
  </form>
