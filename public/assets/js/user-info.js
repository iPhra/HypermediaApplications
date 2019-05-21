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
    $(document).on("click", "#logout", function(){
        localStorage.removeItem("token");
        location.reload();
    });

    $("#submit-form").click(function(){
        const token = localStorage.getItem("token");

        const form = $("#content").serializeArray().reduce(function(obj, item) {
            obj[item.name] = item.value;
            return obj;
        }, {});

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