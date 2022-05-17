




var loginService = {
  init: function() {
    var token = localStorage.getItem("token");
    if(token){
      window.location.replace("index.html");
    }
    $("#login-form").validate({
      submitHandler: function(form) {
        var data = Object.fromEntries((new FormData(form)).entries());
        console.log(data);
        loginService.login(data);

      }
    })
  },
  login:function(data){
    $.ajax({
      url: `rest/login`,
      type: 'POST',
      data: JSON.stringify(data),
      contentType: "application/json",
      dataType: "json",
      success: function(result) {
        console.log(result);
        localStorage.setItem("token",result.token);
        window.location.replace("index.html");
      },
    })
  },
  logout: function(){
    localStorage.clear();
    window.location.replace("login.html");
  },

}
