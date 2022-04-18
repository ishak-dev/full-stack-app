var commentService = {
  listComments: function(id){
    $.get(`rest/home/${id}/comments`, function(data) {
      $("#modal-btn").attr("disabled", true);
      $('#comment-list').html("");
      console.log(id);
      var html = "";
      for (let i = 0; i < data.length; i++) {
        html += `  <div class="form-group">
          <label style="display:block;"for="exampleInputEmail1">Comment (${data[i].created})</label>
          <div class="row">
          <p class="col-12 col-md-10" >${data[i].description} </p>
          <button type='button' class="col-2 col-md-2 btn btn-warning float-end" id="delte-comment-btn" style="max-height:40px;" onclick="commentService.delete(${data[i].id})">Delete</button>
          </div>
        </div>
        <hr>
        `;
      }
      $('#comment-list').html(html);
      $("#modal-btn").attr("disabled", false);
    })
  },
  delete: function(id){
    $.ajax({
      url: `rest/comment/${id}`,
      type: 'DELETE',
      success: function(result) {
        $("#delete-comment-btn").attr("disabled", false);
        commentService.listComments(id);
      },
    })
  }
}
