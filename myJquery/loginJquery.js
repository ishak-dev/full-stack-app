var loginService = {
  init: function() {
    $("#login-form").validate({
      submitHandler: function(form) {
        var data = Object.fromEntries((new FormData(form)).entries());
        console.log(data);
        $.ajax({
          url: `rest/login`,
          type: 'POST',
          data: JSON.stringify(data),
          contentType: "application/json",
          dataType: "json",
          success: function(result) {

            console.log(result);
          },
        })

      }
    })
  },
  add: function(users) {
    $.ajax({
      url: `rest/loign`,
      type: 'POST',
      data: JSON.stringify(users),
      contentType: "application/json",
      dataType: "json",
      success: function(result) {

        console.log(result);
      },
    })
  },
}

loginService.init();
