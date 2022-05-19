var commentService = {
  listComments: function(id) {
    $("#modal-btn").attr("disabled", true);
    $('#comment-list').html("");
    $.ajax({
      url: `rest/home/${id}/comments`,
      type: "GET",
      beforeSend: function(xhr) {
        xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
      },
      success: function(data) {
        $("#modal-btn").attr("disabled", true);
        $('#comment-list').html("");
        console.log(id);
        var html = "";
        for (let i = 0; i < data.length; i++) {
          html += `  <div class="form-group">
            <label style="display:block;"for="exampleInputEmail1">Comment (${data[i].created})</label>
            <div class="row">
            <p class="col-12 col-md-10" >${data[i].description} </p>
            <button type='button' class="col-2 col-md-2 btn btn-warning float-end" id="delte-comment-btn" style="max-height:40px;" onclick="commentService.delete(${data[i].id},${data[i].id_user})">Delete</button>
            </div>
          </div>
          <hr>
          `;
          $('#comment-list').html(html);
          $("#modal-btn").attr("disabled", false);
        }
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        toastr.error(XMLHttpRequest.responseJSON.message);
      },
    })
  },
  delete: function(id,id_user) {
    $.ajax({
      url: `rest/comment/${id}`,
      type: 'DELETE',
      beforeSend: function(xhr) {
        xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
      },
      success: function(result) {
        toastr.success("Successfully deleted comment");
        $("#delete-comment-btn").attr("disabled", false);
        commentService.listComments(id_user);
      },
    })
  }
}
