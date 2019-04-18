
$(document).ready(function(){
    $(window).scroll(function(){
         var newPos = $(document).scrollTop();
         $('.floating-price').css( {top:newPos});
    })
});