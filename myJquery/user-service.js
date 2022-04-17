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
    $.get("rest/home", function(data) {
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
            <button type="button" onclick="userService.listComments(${data[i].id})" class="btn btn-success" id="modal-btn" data-bs-toggle="modal" data-bs-target="#commentsModal" >
                Manage comments</button>
        </td>
      </tr>
      `
      }
      $("#user-list").html(html);
      console.log(data);
    });
  },
  add: function(users) {
    $.ajax({
      url: `rest/home`,
      type: 'POST',
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
      },
    })
  },
  delete: function() {
    $.ajax({
      url: `rest/home/${$('#id').html()}`,
      type: 'DELETE',
      success: function(result) {
        $("#exampleModal").modal("hide");
        $("#delete-btn").attr("disabled", false);
        $("#user-list").html(`<td><div class="spinner-border" role="status">
      <span class="sr-only"></span>
      </div></td>`);
        userService.list();
        console.log(result);
      },
    })
  },
  update: function() {
    var users = {};
    $("#save-users-btn").attr("disabled", true);
    users.username = $('#username').val();
    users.email = $('#email').val();
    $.ajax({
      url: `rest/home/${$('#id').html()}`,
      type: 'PUT',
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
      get: function(id) {
        $("#modal-btn").attr("disabled", true);
        $.get(`rest/home/${id}`, function(data) {
          console.log(data);
          $("#id").html(data.id_users);
          $("#username").val(data.username);
          $("#email").val(data.email);
          $("#exampleModal").modal("show");
          $("#modal-btn").attr("disabled", false);
        })
      }
    })
  },
  get: function(id) {
    $("#modal-btn").attr("disabled", true);
    $.get(`rest/home/${id}`, function(data) {
      console.log(data);
      $("#id").html(data.id);
      $("#username").val(data.username);
      $("#email").val(data.email);
      $("#exampleModal").modal("show");
      $("#modal-btn").attr("disabled", false);
    })

  },
  listComments: function(id){
    $("#modal-btn").attr("disabled",true);
    $('#comment-list').html("");
    var html = "";
    for(let i=0;i<5;i++){
      html+=`  <div class="form-group">
          <label style="display:block;"for="exampleInputEmail1">Comment </label>
          <div class="row">
          <p class="col-12 col-md-10" >This is random comment from user and delete this asda asd asd a sdas das das dasd </p>
          <button class="col-2 col-md-2 btn btn-warning float-end" style="max-height:40px;">Delete</button>
          </div>
        </div>
        <hr>
        `;
    }
    $('#comment-list').html(html);
    $("#modal-btn").attr("disabled",false);

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
