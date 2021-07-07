$(window).on('load resize',function(){
    if($(window).width() < 1000){
        Swal.fire("You are redirected to mobile version", "", "warning");
        setTimeout(() => {
            window.location = "http://mobile.sold.co.id";
        }, 2000);
    }
});