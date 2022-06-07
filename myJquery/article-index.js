var articleIndex = {
  init: function() {
    $("#add-article-form").validate({
      submitHandler: function(form) {
        var article = Object.fromEntries((new FormData(form)).entries());
        console.log(article);
        articleService.add(article);
        articleService.list();
      }
    })
    articleIndex.listLastAdded();
  },
  listLastAdded: function() {
    $.ajax({
      url: "rest/article",
      type: "GET",
      beforeSend: function(xhr) {
        xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
      },
      success: function(data) {
        $(".last-added").html("");
        var html = "";
        for (let i = 0; i < 3; i++) {

          if (i == 0) {
            html += `<div class="card first-card" style="width: 32rem;">
              <img src="img/img1.jpg" style="max-height:235px;" class="card-img-top" alt="...">
              <div class="card-body">
                <h5 class="card-title">${data[i].title}</h5>
              </div>
            </div>`
          } else {
            html += `<div class="card" style="width: 18rem;">
              <img src="img/img2.jpg" class="card-img-top" alt="...">
              <div class="card-body">
                <h5 class="card-title">${data[i].title}</h5>

              </div>
            </div>`
          }

        }
        $(".last-added").html(html);
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        toastr.error(XMLHttpRequest.responseJSON.message);
        loginService.logout();
      }
    });

  },
  listSpecialDeals: function() {

  }
}
