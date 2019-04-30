$(function() {
    $("#submit-form").click(function(){
        const form = $("form").serializeArray().reduce(function(obj, item) {
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
                alert('Login successful');
                localStorage.setItem("token", JSON.stringify(res.token));
            },
            error: function(jqXHR, textStatus, errorThrown) {
                alert("Error " + jqXHR.status +
                      ": " + errorThrown
                );
            }
        });
    });
})