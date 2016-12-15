  <br>
  <form id= "new_product_form" class="form-horizontal" data-toggle="validator" role="form">
    <div class="form-group ">
      <div class="ui-widget ">
        <label for="product" class="col-sm-1 col-sm-offset-1 control-label">Productos: </label>
        <div class="col-sm-5">
          <input id="product" class="form-control" name="product" type="text" placeholder="buscar producto" required>
          <input type="hidden" id="product_id" required>
          <div id="product_stock" class="badge" 
            style="position: absolute;top: 25px;left: 97%;background-color: #a1471b !important;"></div>
        </div>
        <label for="product" class="col-sm-2 control-label">Vía Adm.: </label>
        <div class="col-sm-2">
          <select name="via" id="via" class="form-control">
            <option value="Vía Oral">VO</option>
            <option value="IM">IM</option>
            <option value="Intra Venoso">IV</option>
            <option value="SC">SC</option>
          </select>
        </div>
      </div>
    </div>
    <div class="form-group">
      <label for="product" class="col-sm-2 col-sm-offset-1 control-label">Frecuencia: </label>
      <div class="col-sm-2">
        <input id="composicion" class="form-control" name="comp" type="text" placeholder="composición"data-validate="true" required>
      </div>
      <label class="col-sm-1 control-label">Cada: </label>
      <div class="col-sm-2">
        <select name="hora" id="hour" class="form-control">
          <option value="2">2 hrs.</option>
          <option value="4">4 hrs.</option>
          <option value="6">6 hrs.</option>
          <option value="8">8 hrs.</option>
          <option value="12">12 hrs.</option>
          <option value="24">24 hrs.</option>
        </select> 
      </div>
      <label class="col-sm-1 control-label">Por: </label>
      <div class="col-sm-2">
        <input id="days" class="form-control" name="days" type="text" placeholder="días" style="width: 100%" required>
      </div>
      <div class="row col-sm-12 control-label">
          <div class="btn btn-info btn-sm" id="add_product" style="width: 97%">Agregar</div>
      </div>
      
    </div>
  </form>
