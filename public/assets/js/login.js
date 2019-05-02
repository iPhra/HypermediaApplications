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
                const token = JSON.stringify(res.token)
                localStorage.setItem("token", token.substring(1,token.length-1));
            },
            error: function(jqXHR, textStatus, errorThrown) {
                alert("Error " + jqXHR.status +
                      ": " + errorThrown
                );
            }
        });
    });
})