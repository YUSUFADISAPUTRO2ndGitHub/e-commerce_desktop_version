function sign_up_request(){
    $("#loginModal").modal("hide");
}
function cart_requested(x){
    if($(x).hasClass("background_grey")){
        $(x).removeClass("background_grey");
    }else{
        $(x).addClass("background_grey");
    }
    $(".iframe").toggle();
    $(".iframe").attr("src", "./cart.html");
}

function pengiriman_requested(x){
    if($(x).hasClass("background_grey")){
        $(x).removeClass("background_grey");
    }else{
        $(x).addClass("background_grey");
    }
    $(".modals-pengiriman").toggle();
    $(".modals-pengiriman").attr("src", "./Iframe/delivery.html");
}
const commision_check=()=>{
    $('#profileModal').modal('hide')
}

const addAddress=()=>{
    console.log('jalan')
    $("#iframeAddress").removeClass('testingjquery')
    $("iframeAddress").addClass('testingjquery2')
    
    console.log(a)
}

