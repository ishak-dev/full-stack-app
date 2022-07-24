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
           <td>${data[i].price}</td>
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
  get: function(){
    $.ajax({
      url: `rest/orderadmin/${id}`,
      type: "GET",
      beforeSend: function(xhr) {
        xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
      },
      success: function(data) {
        console.log(data);
        $("#id").html(data.id);
        $("#input-title").val(data.title);
        $("#input-price").val(data.price);
        $("#input-description").val(data.description);
        $("#input-delivery").val(data.delivery_time);
        $("#input-type").val(data.type);
        $("#input-special-price").val(data.special_deals);
        $("#input-link").val(data.img_link);
        $('#form-group-btn').html(html);

        $("#modal-btn").attr("disabled", false);
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        toastr.error(XMLHttpRequest.responseJSON.message);
        loginService.logout();
      },
    })
  }
}




orderService.list();
