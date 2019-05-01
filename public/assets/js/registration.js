$(function() {
    $("#submit-form").click(function(){
        const form = $("form").serializeArray().reduce(function(obj, item) {
            obj[item.name] = item.value;
            return obj;
        }, {});
        
        $.ajax({
            url: "/v2/account/register", 
            data: JSON.stringify(form),
            contentType: "application/json",
            type: "POST",
            dataType: "json",
            success: function(data) {
                alert('Registration successful');
            },
            error: function(jqXHR, textStatus, errorThrown) {
                alert("Error " + jqXHR.status +
                      ": " + errorThrown
                );
            }
        });
    });
})

$('#password, #confirm_password').on('keyup', function () {
  if ($('#password').val() == $('#confirm_password').val()) {
    $('#message').html('Matching').css('color', 'green');
  } else 
    $('#message').html('Not Matching').css('color', 'red');
});