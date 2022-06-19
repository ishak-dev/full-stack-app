var articleService = {
  init: function() {
    $("#add-article-form").validate({
      submitHandler: function(form) {
        var article = Object.fromEntries((new FormData(form)).entries());
        console.log(article);
        articleService.add(article);
        articleService.list();
      }
    })
    articleService.list();
  },
  list: function() {
    $.ajax({
      url: "rest/article",
      type: "GET",
      beforeSend: function(xhr) {
        xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
      },
      success: function(data) {
        $("#article-list").html("");
        var html = "";
        for (let i = 0; i < data.length; i++) {
          html += `
         <tr>
           <td>${data[i].id}</td>
           <td>${data[i].title}</td>
           <td>${data[i].type}</td>
           <td>${data[i].description}</td>
           <td>${data[i].price}</td>

           <td><button type="button" onclick="articleService.get(${data[i].id})" class="btn btn-primary" id="modal-btn" data-bs-toggle="modal" data-bs-target="#add-article-modal">
               view</button>
               <button type="button" onclick="commentService.listComments(${data[i].id})" class="btn btn-success" id="modal-btn" data-bs-toggle="modal" data-bs-target="#commentsModal" >
                   Manage reviews</button>
           </td>
         </tr>
         `
        }
        $("#article-list").html(html);
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        toastr.error(XMLHttpRequest.responseJSON.message);
        loginService.logout();
      }
    });


  },
  add: function(article) {
    $.ajax({
      url: `rest/article`,
      type: 'POST',
      beforeSend: function(xhr) {
        xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
      },
      data: JSON.stringify(article),
      contentType: "application/json",
      dataType: "json",

      success: function(result) {
        $("#add-article-modal").modal("hide");
        $("#save-users-btn").attr("disabled", false);
        $("#article-list").html(`<td><div class="spinner-border" role="status">
      <span class="sr-only"></span>
      </div></td>`);
        articleService.list();
        console.log(result);
        toastr.success("You added article");
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        toastr.error(XMLHttpRequest.responseJSON.message);
      }
    })
  },
  delete: function(id) {
    $.ajax({
      url: `rest/article/${id}`,
      type: 'DELETE',
      beforeSend: function(xhr) {
        xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
      },
      success: function(result) {


        $("#article-list").html(`<td><div class="spinner-border" role="status">
      <span class="sr-only"></span>
      </div></td>`);
        articleService.list();
        $("#add-article-modal").modal("hide");
        console.log(result);
        toastr.success("You deleted successfully");
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        toastr.error(XMLHttpRequest.responseJSON.message);
      }

    })
  },
  update: function(id) {
    var article = {};

    article.title=$("#input-title").val();
    article.price=$("#input-price").val();
    article.description=$("#input-description").val();
    article.delivery_time=$("#input-delivery").val();
    article.type=$("#input-type").find(":selected").text();
    article.special_deals=$("#input-special-price").val();
    console.log(article.type);
    $.ajax({
      url: `rest/article/${id}`,
      type: 'PUT',
      beforeSend: function(xhr) {
        xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
      },
      data: JSON.stringify(article),
      contentType: "application/json",
      dataType: "json",
      success: function(result) {
        $("#article-list").html(`<td><div class="spinner-border" role="status">
        <span class="sr-only"></span>
        </div></td>`);
        $("#add-article-modal").modal("hide");
        articleService.list();
        console.log(result);
        toastr.success("You update successfully");
      },

    })
  },
  get: function(id) {
    $("#modal-btn").attr("disabled", true);
    $('#form-group-btn').html("");
    var html = `<button type="button" class="btn btn-warning" id="update-article-btn" onclick="articleService.update(${id})">Update</button>
                <button type="button" class="btn btn-danger" id="delete-article-btn" onclick="articleService.delete(${id})">Delete</button>`
    $.ajax({
      url: `rest/article/${id}`,
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
        
        $('#form-group-btn').html(html);

        $("#modal-btn").attr("disabled", false);
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        toastr.error(XMLHttpRequest.responseJSON.message);
        loginService.logout();
      },
    })
  },

}

articleService.init();

$("#add-article-btn").click(function() {
  $('#form-group-btn').html('<button type="submit" class="btn btn-primary" id="add-article-btn">Add</button>');
});






// function addUser() {
//   console.log("save todo");
//
//   var users = {};
//   $("#save-users-btn").attr("disabled", true);
//   users.username = $('#add_username').val();
//   users.email = $('#add_email').val();
//
//   $.ajax({
//     url: `rest/home`,
//     type: 'POST',
//     data: JSON.stringify(users),
//     contentType: "application/json",
//     dataType: "json",
//     success: function(result) {
//       $("#addModal").modal("hide");
//       $("#save-users-btn").attr("disabled", false);
//       $("#user-list").html(`<td><div class="spinner-border" role="status">
//       <span class="sr-only"></span>
//       </div></td>`);
//       getUsers();
//       console.log(result);
//     },
//   })
// }
