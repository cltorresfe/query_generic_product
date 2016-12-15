  <br>
  <form id= "new_product_form" data-toggle="validator" role="form">
    <div class="form-inline" style="position: relative; top: -8px;text-align: center;">
      <div class="form-group">
            <input id="product" class="form-control" name="product" type="text" placeholder="Ingrese Medicamento" style="width: 280px;" aria-describedby="inputSuccess2Status" required>
            <input type="hidden" id="product_id">
      </div>
      
      <div class="form-group">
          <label class="control-label">Vía Adm.: </label>
            <select name="via" id="via" class="form-control" style="width: 60px;">
              <option value="VIA ORAL" selected>VO</option>
              <option value="IM">IM</option>
              <option value="INTRAVENOSE">IV</option>
              <option value="SC">SC</option>
            </select>
      </div>
      <div class="form-group">
          <input id="composicion" class="form-control" name="comp" min="1" type="number" placeholder="composición" style="width: 60px;" required>
      </div>
      <div class="form-group">
        <label class="control-label">Cada: </label>
        <select name="hora" id="hora" class="form-control" style="width: 60px;">
          <option value="2">2 hrs.</option>
          <option value="4">4 hrs.</option>
          <option value="6">6 hrs.</option>
          <option value="8" selected>8 hrs.</option>
          <option value="12">12 hrs.</option>
          <option value="24">24 hrs.</option>
        </select>
      </div>
      <div class="form-group">
        <label class="control-label">Por: </label>
        <input id="days" class="form-control" name="days" type="number" min="1" placeholder="días" style="width: 60px;" required>
      </div>
    </div>
    <div style="position: relative; top: -6px;text-align: center;">
     <div id="product_stock" class="badge"></div>
    </div>
    <div class="form-inline">
      <div class="control-label">
        <button class="btn btn-info btn-sm" id="add_product" style="width: 100%">Agregar</button>
      </div> 
    </div>  
  </form>
