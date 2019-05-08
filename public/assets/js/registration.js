$(function() {
    $("#submit-form").click(function(){
        const form = $("#registration-form").serializeArray().reduce(function(obj, item) {
            obj[item.name] = item.value;
            return obj;
        }, {});
        
        $.ajax({
            url: "/v2/account/register", 
            data: JSON.stringify(form),
            contentType: "application/json",
            type: "POST",
            dataType: "json",
            success: function() {
                alert('Registration successful, you can now log in');
                location.replace("/pages/login.html");
            },
            error: function(jqXHR, textStatus, errorThrown) {
                alert("Error " + jqXHR.status +
                      ": " + errorThrown
                );
            }
        });
    });
});

$('#password, #confirm_password').on('keyup', function () {
  if ($('#password').val() === $('#confirm_password').val()) {
    $('#message').html('Matching').css('color', 'green');
  } else 
    $('#message').html('Not Matching').css('color', 'red');
});

$(function() {
    if(localStorage.getItem("token")) {
        $("#account-area").append('<a href="/pages/cart.html"> <i class="fa fa-shopping-cart" aria-hidden="true"></i></a>\n' +
            '      <a href="/pages/user-info.html"> <i class="fa fa-user" aria-hidden="true">\n' +
            '      </i></a>' +
            '       <a id="logout" href="#"> <span class="navbar-text text-white">' +
            '            \Logout' +
            '            \      </span> </a>')
    }
    else {
        $("#account-area").append('<a href="/pages/login.html"> <span class="navbar-text text-white">\n' +
            '      Login\n' +
            '      </span> </a>\n' +
            '      <span class="text-white">|</span>\n' +
            '      <a href="/pages/registration.html"> <span class="navbar-text text-white">\n' +
            '      Register\n' +
            '      </span> </a>')
    }
});

$(function() {
    $(document).on("click", "#logout", function(){
        localStorage.removeItem("token");
        location.reload();
    });
});