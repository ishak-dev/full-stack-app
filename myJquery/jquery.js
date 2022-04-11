$("#addUserForm").validate({
  submitHandler: function(form) {
    var users = Object.fromEntries((new FormData(form)).entries());
    console.log(users);

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
        getUsers();
        console.log(result);
      },
    })
  }
})


function getUsers() {
  $.get("rest/home", function(data) {
    $("#user-list").html("");
    var html = "";
    for (let i = 0; i < data.length; i++) {
      html += `
      <tr>
        <td>${data[i].id_users}</td>
        <td>${data[i].username}</td>
        <td>${data[i].email}</td>
        <td>dolor</td>
        <td>sit</td>
        <td><button type="button" onclick="modalLoad(${data[i].id_users})" class="btn btn-primary" id="modal-btn" data-toggle="modal" data-target="#exampleModal" >
            view</button>
        </td>
      </tr>
      `
    }
    $("#user-list").html(html);
    console.log(data);
  });

}

getUsers();

function modalLoad(id) {
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

function saveChanges() {
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
      getUsers();
      console.log(result);
    },
  })
}

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
