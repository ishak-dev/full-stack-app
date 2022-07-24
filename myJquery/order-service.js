var orderService = {
  init: function(){

  },
  list: function(){
    $.ajax({
      url: `rest/adminorder`,
      type: "GET",
      beforeSend: function(xhr) {
        xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
      },
      success: function(data) {
        $("#order-list").html("");
        var html = "";
        for (let i = 0; i < data.length; i++) {
          html += `
         <tr>
           <td>${data[i].items}</td>
           <td>${data[i].name} ${data[i].surname}</td>
           <td>${data[i].address}</td>
           <td>${data[i].price} $</td>
           <td>${data[i].id}</td>

           <td><button type="button" onclick="orderService.get(${data[i].id})" class="btn btn-primary" id="modal-btn" data-bs-toggle="modal" data-bs-target="#orderModal">
               view</button>
           </td>
         </tr>
         `
        }
        $("#order-list").html(html);
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        toastr.error(XMLHttpRequest.responseJSON.message);
        loginService.logout();
      }
    });
  },
  get: function(id){
    $.ajax({
      url: `rest/adminorder/${id}`,
      type: "GET",
      beforeSend: function(xhr) {
        xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
      },
      success: function(data) {
        console.log(data);
        $("#items").html(data.items);
        $("#name").html(data.name);
        $("#price").html(data.price  + " $");
        $("#address").html(data.address);
        $("#order-id").html(data.id);

        $("#modal-btn").attr("disabled", false);
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        toastr.error(XMLHttpRequest.responseJSON.message);
        loginService.logout();
      },
    })
  },
  approveOrder: function(id){
    $.ajax({
      url: `rest/adminorder/${id}`,
      type: 'PUT',
      beforeSend: function(xhr) {
        xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
      },
      contentType: "application/json",
      dataType: "json",
      success: function(result) {
        $("#orderModal").modal("hide");
        orderService.list();
        toastr.success("You approved successfully");
      },

    })
  }
}

orderService.list();


$("#approve-order-btn").click(function(){
  let id = $("#order-id").html();
  orderService.approveOrder(id);
})
