



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
        var spa= "";

        for (let i = data.length-1; i > data.length-4; i--) {
          console.log(data[i]);
          if(data[i] == undefined) console.log("no article");
          else if (i == data.length-1) {
            html += `<a href="#article" class="card-link" onclick="articleIndex.listItemById(${data[i].id})"><div class="card list-card" style="width: 28rem;">
            <div class="img-container">
            <img src="${data[i].img_link}" class="card-img-top" alt="...">
            </div>
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
            </div></a>`

          } else {

            html += `<a href="#article" class="card-link" onclick="articleIndex.listItemById(${data[i].id})"><div class="card list-card" style="width: 18rem;">
              <div class="img-container">
              <img src="${data[i].img_link}" class="card-img-top" alt="...">
              </div>
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
            </div></a>`

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
        $(".special-deals").html("");
        var html = "";
        let br=0;
        for (let i = 0; i < data.length && br <6; i++) {
          console.log(data[i]);
          if(data[i].special_deals != "" && data[i].special_deals!=null){
            html +=`<a href="#article" class="card-link" onclick="articleIndex.listItemById(${data[i].id})"><div class="card list-card" >
              <div class="special">
              <div class="img-container">
              <img src="${data[i].img_link}" class="card-img-top" alt="...">
              </div>
              </div>
              <div class="card-body">
                <h5 class="card-title">${data[i].title}</h5>
                <p class="card-text get-dots">${data[i].description}</p>
                <div class="row">
                  <div class="col-9">
                    <p class="card-type" style="text-decoration:line-through; font-size:20px;">${data[i].price}$</p>
                  </div>
                  <div class="col-3">
                    <p class="card-price" style="font-size:20px;">${data[i].special_deals}$</p>
                  </div>
                </div>
              </div>
            </div></a>`
            br++;
          }

        }
        $(".special-deals").html(html);

      },
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        toastr.error(XMLHttpRequest.responseJSON.message);
        loginService.logout();
      }
    });
  },
  listItemById: function(id){
    if(id != undefined){
     var refresh = window.location.protocol + "//" + window.location.host + window.location.pathname;
     window.history.pushState({ path: refresh }, '', `?id=${id}`);


    }
    let searchParams = new URLSearchParams(window.location.search);
    let idUrl = searchParams.get('id');

    var html="";

    $.ajax({
      url: `rest/article/${idUrl}`,
      type: "GET",
      beforeSend: function(xhr) {
        xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
      },
      success: function(data) {
        html=`<!-- Left Column / Motor Image -->
        <div class="left-column">
          <img data-image="red" class="active" src="${data.img_link}" alt="">
        </div>


        <!-- Right Column -->
        <div class="right-column">

          <!-- Product Description -->
          <div class="product-description">
            <span>${data.type}</span>
            <h1>${data.title}</h1>
            <p>${data.description}</p>
          </div>

          <!-- Product Configuration -->
          <div class="product-configuration">

            <!-- Product Color -->
            <div class="product-color">
              <span>Delivery Time</span>

              <div class="color-choose">
                <div>
                  <input data-image="blue" type="radio" id="blue" name="color" value="blue" checked>
                  <label for="blue">${data.delivery_time}</label>
                </div>

              </div>

            </div>

            <!-- Cable Configuration -->
            <div class="cable-config">
              <span>Cable configuration</span>

              <div class="cable-choose">
                <button>Straight</button>
                <button>Coiled</button>
                <button>Long-coiled</button>
              </div>

              <a href="#">How to configurate your headphones</a>
            </div>
          </div>

          <!-- Product Pricing -->
          <div class="product-price">
            <span>${data.special_deals == "" ? data.price : data.special_deals}$</span>
            <a href="#" class="cart-btn">Add to cart</a>
          </div>
        </div>`
        $(".container-article").html(html);

      },
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        toastr.error(XMLHttpRequest.responseJSON.message);
        loginService.logout();
      }
    });
  },
  getAllItems: function(){
    $.ajax({
      url: "rest/article",
      type: "GET",
      beforeSend: function(xhr) {
        xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
      },
      success: function(data) {
        console.log("data");
        var html="";
        for(let i=0;i<data.length;i++){
          html+=`<a href="#article" class="card-link" onclick="articleIndex.listItemById(${data[i].id})"><div class="card  card-border">
          <div class="img-container">
               <img class="card-img-top" src="${data[i].img_link}" alt="Card image cap"></div>
               <div class="card-body">
                 <h5 class="card-title">${data[i].title}</h5>
                 <p class="card-text get-dots-4">${data[i].description}</p>
               </div>
               <div class="card-footer">
                 <b class="text-muted">${data[i].special_deals == "" ? data[i].price : data[i].special_deals}$</b>
               </div>
             </div></a>`;
        }
        $("#list-all-articles").html(html);

      },
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        toastr.error(XMLHttpRequest.responseJSON.message);
        loginService.logout();
      }
    });
  }
}
//articleIndex.init();


function getHref(id){
//  $("#article").attr("id", 'article?'+id);
}
