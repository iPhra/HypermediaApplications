//check if the user is logged in, if so display cart and info in the navbar, otherwise display login and registration button
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
    //when the user clicks on logout, remove the jwt token from localstorage
    $(document).on("click", "#logout", function(){
        localStorage.removeItem("token");
        location.reload();
    });

    //when the user clicks on login, retrieve the credentials and send a request to the server
    $("#submit-form").click(function(){

        //create json object from the form data
        const form = $("#content").serializeArray().reduce(function(obj, item) {
            obj[item.name] = item.value;
            return obj;
        }, {});

        $.ajax({
            url: "/v2/account/login",
            data: JSON.stringify(form),
            contentType: "application/json",
            type: "POST",
            dataType: "json",
            success: function(res) {
                const token = JSON.stringify(res.token); //retrieve token from response
                localStorage.setItem("token", token.substring(1,token.length-1)); //save the token in the localstorage
                alert('Login successful');
                location.replace("/");
            },
            error: function(jqXHR, textStatus, errorThrown) {
                if(jqXHR.status===401)
                    alert("Wrong credentials");
                else
                    alert("Error " + jqXHR.status +
                        ": " + errorThrown
                    );
            }
        });
    });
});