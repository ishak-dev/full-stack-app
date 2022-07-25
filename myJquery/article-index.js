



var articleIndex = {
  init: function() {
    articleIndex.listLastAdded();
    articleIndex.listSpecialDeals();
    articleIndex.getUserData();

  },
  listLastAdded: function() {
    $.ajax({
      url: "rest/articleUser",
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
      url: "rest/articleUser",
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
      url: `rest/articleUser/${idUrl}`,
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
            <button class="btn" onclick="articleIndex.addToCart(${data.id})" style="background-color:#ff3100;color:white;">Add to cart</button>
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
  getAllItems: function(search){
    $.ajax({
      url: `rest/articleUser${search ? `?search=${search}`:""}`,
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
  },
  getUserData: function(){
    $.ajax({
      url: `rest/logindata`,
      type: "GET",
      beforeSend: function(xhr) {
        xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
      },
      success: function(data) {
        console.log(data);
        var html = `<section class="section about-section gray-bg profile-section" id="about">
                    <div class="container">
                        <div class="row align-items-center flex-row-reverse">
                            <div class="col-lg-6">
                                <div class="about-text go-to">
                                    <h3 class="dark-color">About Me</h3>
                                    <h6 class="theme-color lead">${data.name} ${data.surname}</h6>
                                    <p>I <mark>design and develop</mark> services for customers of all sizes, specializing in creating stylish, modern websites, web services and online stores. My passion is to design digital user experiences through the bold interface and meaningful interactions.</p>
                                    <div class="row about-list">
                                        <div class="col-md-6">
                                            <div class="media">
                                                <label>Birthday</label>
                                                <p>${data.birthdate}</p>
                                            </div>
                                            <div class="media">
                                                <label>Post</label>
                                                <p>${data.post_code}</p>
                                            </div>
                                            <div class="media">
                                                <label>Residence</label>
                                                <p>${data.town}</p>
                                            </div>
                                            <div class="media">
                                                <label>Address</label>
                                                <p>${data.address}</p>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="media">
                                                <label>E-mail</label>
                                                <p>${data.email}</p>
                                            </div>
                                            <div class="media">
                                                <label>Phone</label>
                                                <p>${data.phone}</p>
                                            </div>
  
                                            <div class="media">
                                                <label>Admin</label>
                                                <p>${data.admin}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-6">
                                <div class="about-avatar">
                                    <img src="https://bootdey.com/img/Content/avatar/avatar7.png" title="" alt="">
                                </div>
                            </div>
                        </div>
                        <div class="counter">
                            <div class="row">
                                <div class="col-6 col-lg-3">
                                    <div class="count-data text-center">
                                        <h6 class="count h2" data-to="500" data-speed="500">${data.name}</h6>
                                        <p class="m-0px font-w-600">Name</p>
                                    </div>
                                </div>
                                <div class="col-6 col-lg-3">
                                    <div class="count-data text-center">
                                        <h6 class="count h2" data-to="150" data-speed="150">${data.phone}</h6>
                                        <p class="m-0px font-w-600">My number</p>
                                    </div>
                                </div>
                                <div class="col-6 col-lg-3">
                                    <div class="count-data text-center">
                                        <h6 class="count h2" data-to="850" data-speed="850">${data.town}</h6>
                                        <p class="m-0px font-w-600">Town</p>
                                    </div>
                                </div>
                                <div class="col-6 col-lg-3">
                                    <div class="count-data text-center">
                                        <h6 class="count h2" data-to="190" data-speed="190">${data.username}</h6>
                                        <p class="m-0px font-w-600">Username</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>`;

                $("#container-profile").html(html);

      },
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        toastr.error(XMLHttpRequest.responseJSON.message);
        loginService.logout();
      }
    });
  },
  addToCart: function(id){
    var cart = {};
    cart.order_date = "7/7/2020";
    cart.id_article = id;
    cart.id_user = "";
    $.ajax({
      url: `rest/cart`,
      type: 'POST',
      beforeSend: function(xhr) {
        xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
      },
      data: JSON.stringify(cart),
      contentType: "application/json",
      dataType: "json",

      success: function(result) {
        toastr.success("You added to cart");
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        toastr.error(XMLHttpRequest.responseJSON.message);
      }
    })
  },
  getFromCart: function(){
    $.ajax({
      url: `rest/cart`,
      type: "GET",
      beforeSend: function(xhr) {
        xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
      },
      success: function(data) {
        console.log(data);
        var html="";
        html+=`<div class="d-flex justify-content-between align-items-center mb-5">
          <h1 class="fw-bold mb-0 text-black">Shopping Cart</h1>
          <h6 class="mb-0 text-muted">${data.length} items</h6>
        </div>


        `
        for(let i=0;i<data.length;i++){
          html+=`<hr class="my-4">

                  <div class="row mb-4 d-flex justify-content-between align-items-center">
                    <div class="col-md-2 col-lg-2 col-xl-2">
                      <img
                        src="${data[i].img_link}"
                        class="img-fluid rounded-3" alt="Cotton T-shirt">
                    </div>
                    <div class="col-md-3 col-lg-3 col-xl-3">
                      <h6 class="text-muted">${data[i].type}</h6>
                      <h6 class="text-black mb-0">${data[i].title}</h6>
                    </div>
                    <div class="col-md-3 col-lg-3 col-xl-2 d-flex">
                      <button class="btn btn-link px-2"
                        onclick="this.parentNode.querySelector('input[type=number]').stepDown()">
                        <i class="fas fa-minus"></i>
                      </button>

                      <input id="form1" min="0" name="quantity" value="1" type="number"
                        class="form-control form-control-sm" />

                      <button class="btn btn-link px-2"
                        onclick="this.parentNode.querySelector('input[type=number]').stepUp()">
                        <i class="fas fa-plus"></i>
                      </button>
                    </div>
                    <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                      <h6 class="mb-0">${data[i].price} $</h6>
                    </div>
                    <div class="col-md-1 col-lg-1 col-xl-1 text-end">
                      <a href="#!" class="text-muted"><i class="fas fa-times"></i></a>
                    </div>
                  </div>`;
        }
        html+=`<hr class="my-4">

        <div class="pt-5">
          <h6 class="mb-0"><a href="#!" class="text-body"><i
                class="fas fa-long-arrow-alt-left me-2"></i>Back to shop</a></h6>
        </div>`;
        $("#shoping-cart-items").html(html);

      },
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        toastr.error(XMLHttpRequest.responseJSON.message);
        loginService.logout();
      }
    }).then(articleIndex.getTotalPrice());
  },
  getTotalPrice:function(){
    $.ajax({
      url: `rest/cartprice`,
      type: "GET",
      beforeSend: function(xhr) {
        xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
      },
      success: function(data) {
        console.log(data);
        var html=`<h5 class="text-uppercase">items </h5>
        <h5>${data[0].price} $</h5>`;
        $("#total-price").html(html);

      },
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        toastr.error(XMLHttpRequest.responseJSON.message);
        loginService.logout();
      }
    });
  },
  confirmOrder: function(){
    var order_request = {};
    order_request.items = "";
    order_request.id_user = "";
    order_request.price = "";
    order_request.status = "";
    $.ajax({
      url: `rest/order_request`,
      type: 'POST',
      beforeSend: function(xhr) {
        xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
      },
      data: JSON.stringify(order_request),
      contentType: "application/json",
      dataType: "json",

      success: function(result) {
        console.log(result);
        toastr.success("Your order submitted");
        $.ajax({
          url:`rest/order`,
          type: 'DELETE',
          beforeSend: function(xhr) {
            xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
          },
          success: function(result){
            console.log(result);
            articleIndex.getFromCart();
          }
        });

      },
      error: function(XMLHttpRequest, textStatus, errorThrown) {

        toastr.error(XMLHttpRequest.responseJSON.message);
        toastr.error("Unable to confirm")
      }
    })
  }
}
//articleIndex.init();

$("#search-btn").click(function(){
  var data = $("#search-input").val();
  articleIndex.getAllItems(data);
  console.log(data);
})

$(document).ready(function(){
$(document).on("click",".home-search",function(){
  console.log("kliknuto");
  var data = $(this).html();
  console.log(data);
  articleIndex.getAllItems(data);
})
})



function getHref(id){
//  $("#article").attr("id", 'article?'+id);
}
