//retrieve the current user-info from the server and display them as placeholders
async function appendPlaceholder() {
    const token = localStorage.getItem("token");

    $.ajax({
        url: '/v2/account/info',
        type: 'GET',
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', token);
        },
        success: async function (account) {
            $('#name').attr("placeholder",account.name);
            $('#surname').attr("placeholder",account.surname);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert("Error " + jqXHR.status +
                ": " + errorThrown
            );
        }
    });
}



//check if the user is logged in, if so allow access to page, otherwise redirect to login
$(async function() {
    if(localStorage.getItem("token")) {
        $("#account-area").append('<a href="/pages/cart.html"> <i class="fa fa-shopping-cart" aria-hidden="true"></i></a>\n' +
            '      <a href="/pages/user-info.html"> <i class="fa fa-user" aria-hidden="true">\n' +
            '      </i></a>' +
            '       <a id="logout" href="#"> <span class="navbar-text text-white">' +
            '            \Logout' +
            '            \      </span> </a>');

        await appendPlaceholder();
    }
    else {
        alert("You must be logged in to access your account!");
        location.href = "/pages/login.html";
    }
});

$(function() {
    //when the user clicks on logout, remove the jwt token from localstorage and redirect to homepage
    $(document).on("click", "#logout", function(){
        localStorage.removeItem("token");
        alert("Logout successful");
        location.replace("/");
    });

    //when a user submits the form to update the info, send the request to the server
    $("#submit-form").click(function(){
        const token = localStorage.getItem("token");

        //create json object from the form data
        const form = $("#content").serializeArray().reduce(function(obj, item) {
            obj[item.name] = item.value;
            return obj;
        }, {});

        //if name or surname are not updated, leave the current ones
        if(!form.name) form.name = $("#name").attr("placeholder");
        if(!form.surname) form.surname = $("#surname").attr("placeholder");

        $.ajax({
            url: "/v2/account/info",
            data: JSON.stringify(form),
            contentType: "application/json",
            type: "POST",
            dataType: "text",
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', token);
            },
            success: function() {
                alert('Data updated');
                location.reload();
            },
            error: function(jqXHR, textStatus, errorThrown) {
                alert("Error " + jqXHR.status +
                    ": " + errorThrown
                );
            }
        });
    });
});