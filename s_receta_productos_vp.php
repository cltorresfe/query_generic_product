  <form id= "new_product_form" data-toggle="validator" role="form">
    <div class="form-inline row" style="position: relative; top: 6px;text-align: center;">
      <div class="form-group col-xs-4">
            <input id="product" class="form-control" name="product" type="text" placeholder="Ingrese Medicamento" style="width: 100%;" required>
            <input type="hidden" id="product_id">
      </div>
      <div class="form-group col-xs-2">
            <select name="via" id="via" class="form-control" style="width: 100%;">
              <option value="VIA ORAL" selected>VO</option>
              <option value="VIA INTRAMUSCULAR">IM</option>
              <option value="VIA INTRAVENOSA">IV</option>
              <option value="VIA SUBCUTANEA">SC</option>
            </select>
      </div>
      <div class="form-group col-xs-2">
        <input id="composicion" class="form-control" name="cantidad" min="1" type="number" placeholder="cantidad" style="width: 100%;" required>
      </div>
      <div class="form-group col-xs-2">
        <select name="hora" id="hora" class="form-control col-xs-7" style="width: 100%;">
          <option value="2">2 hrs.</option>
          <option value="4">4 hrs.</option>
          <option value="6">6 hrs.</option>
          <option value="8" selected>8 hrs.</option>
          <option value="12">12 hrs.</option>
          <option value="24">24 hrs.</option>
        </select>
      </div>
      <div class="form-group col-xs-2">
        <input id="days" class="form-control" name="days" type="number" min="1" placeholder="días" style="width: 100%;" required>
      </div>
    </div>
    <div style="position: relative; top: -6px;text-align: center;">
     <div id="product_stock"></div>
    </div>
    <div class="form-inline row">
      <div class="control-label col-xs-12">
        <button class="btn btn-info btn-sm" id="add_product" style="width: 100%">Agregar</button>
      </div> 
    </div>  
  </form>
  </div>
  </div>
