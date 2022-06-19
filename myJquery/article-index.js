var articleIndex = {
  init: function() {
    articleIndex.listLastAdded();
    articleIndex.listSpecialDeals();
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
                <div class="row">
                  <div class="col-10">
                    <p class="card-type">${data[i].type}</p>
                  </div>
                  <div class="col-2">
                    <p class="card-price">${data[i].price}$</p>
                  </div>
                </div>
              </div>
            </div>`
          } else {
            html += `<div class="card" style="width: 18rem;">
              <img src="img/img2.jpg" class="card-img-top" alt="...">
              <div class="card-body">
                <h5 class="card-title">${data[i].title}</h5>
                <div class="row">
                  <div class="col-9">
                    <p class="card-type">${data[i].type}</p>
                  </div>
                  <div class="col-3">
                    <p class="card-price">${data[i].price}$</p>
                  </div>
                </div>
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
    $.ajax({
      url: "rest/article",
      type: "GET",
      beforeSend: function(xhr) {
        xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
      },
      success: function(data) {
        console.log(data);
        $(".special-deals").html("");
        var html = "";
        let br=0;
        for (let i = 0; i < data.length && br <7; i++) {
          console.log(data[i]);
          if(data[i].special_deals != "" && data[i].special_deals!=null){
            html +=`<div class="card" col-3>
              <div class="special">
                <img class="card-img-top" src="img/img4.jpg" alt="Card image cap">
              </div>
              <div class="card-body">
                <h5 class="card-title">${data[i].title}</h5>
                <p class="card-text">${data[i].description}</p>
                <div class="row">
                  <div class="col-9">
                    <p class="card-type" style="text-decoration:line-through; font-size:20px;">${data[i].price}$</p>
                  </div>
                  <div class="col-3">
                    <p class="card-price" style="font-size:20px;">${data[i].special_deals}$</p>
                  </div>
                </div>
              </div>
            </div>`
          }
        }
        $(".special-deals").html(html);
        br++;
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        toastr.error(XMLHttpRequest.responseJSON.message);
        loginService.logout();
      }
    });
  }
}
articleIndex.init();
