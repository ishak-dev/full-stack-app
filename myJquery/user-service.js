var userService = {
  init: function() {
    $("#addUserForm").validate({
      submitHandler: function(form) {
        var users = Object.fromEntries((new FormData(form)).entries());
        console.log(users);
        userService.add(users);
        userService.list();
      }
    })
    userService.list();
  },
  list: function() {
    $.ajax({
      url: "rest/home",
      type: "GET",
      beforeSend: function(xhr) {
        xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
      },
      success: function(data) {
        $("#user-list").html("");
        var html = "";
        for (let i = 0; i < data.length; i++) {
          html += `
         <tr>
           <td>${data[i].id}</td>
           <td>${data[i].username}</td>
           <td>${data[i].email}</td>
           <td>dolor</td>
           <td>sit</td>
           <td><button type="button" onclick="userService.get(${data[i].id})" class="btn btn-primary" id="modal-btn" data-toggle="modal" data-target="#exampleModal" >
               view</button>
               <button type="button" onclick="commentService.listComments(${data[i].id})" class="btn btn-success" id="modal-btn" data-bs-toggle="modal" data-bs-target="#commentsModal" >
                   Manage comments</button>
           </td>
         </tr>
         `
        }
        $("#user-list").html(html);
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        toastr.error(XMLHttpRequest.responseJSON.message);
        loginService.logout();
      }
    });


  },
  add: function(users) {
    $.ajax({
      url: `rest/home`,
      type: 'POST',
      beforeSend: function(xhr) {
        xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
      },
      data: JSON.stringify(users),
      contentType: "application/json",
      dataType: "json",

      success: function(result) {
        $("#addModal").modal("hide");
        $("#save-users-btn").attr("disabled", false);
        $("#user-list").html(`<td><div class="spinner-border" role="status">
      <span class="sr-only"></span>
      </div></td>`);
        userService.list();
        console.log(result);
        toastr.success("You added user");
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        toastr.error(XMLHttpRequest.responseJSON.message);
      }
    })
  },
  delete: function() {
    $.ajax({
      url: `rest/home/${$('#id').html()}`,
      type: 'DELETE',
      beforeSend: function(xhr) {
        xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
      },
      success: function(result) {
        $("#exampleModal").modal("hide");
        $("#delete-btn").attr("disabled", false);
        $("#user-list").html(`<td><div class="spinner-border" role="status">
      <span class="sr-only"></span>
      </div></td>`);
        userService.list();
        console.log(result);
        toastr.success("You deleted successfully");
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        toastr.error(XMLHttpRequest.responseJSON.message);
      }

    })
  },
  update: function() {
    var users = {};
    $("#save-users-btn").attr("disabled", true);
    users.username = $('#username').val();
    users.email = $('#email').val();
    users.admin = $('#admin').val();
    console.log($('#id').html());
    $.ajax({
      url: `rest/home/${$('#id').html()}`,
      type: 'PUT',
      beforeSend: function(xhr) {
        xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
      },
      data: JSON.stringify(users),
      contentType: "application/json",
      dataType: "json",
      success: function(result) {
        $("#exampleModal").modal("hide");
        $("#save-users-btn").attr("disabled", false);
        $("#user-list").html(`<td><div class="spinner-border" role="status">
        <span class="sr-only"></span>
        </div></td>`);
        userService.list();
        console.log(result);
      },

    })
  },
  get: function(id) {
    $("#modal-btn").attr("disabled", true);
    $.ajax({
      url: `rest/home/${id}`,
      type: "GET",
      beforeSend: function(xhr) {
        xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
      },
      success: function(data) {
        console.log(data);
        $("#id").html(data.id);
        $("#username").val(data.username);
        $("#email").val(data.email);
        $("#admin").val(data.admin);
        $("#exampleModal").modal("show");
        $("#modal-btn").attr("disabled", false);
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        toastr.error(XMLHttpRequest.responseJSON.message);
        loginService.logout();
      },
    })
  }


}

userService.init();







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
