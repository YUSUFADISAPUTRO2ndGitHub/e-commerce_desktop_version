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
    $(".modals-pengiriman").attr("src", "./Iframe/delivery_order_list.html");
}
const commision_check=()=>{
    $('#profileModal').modal('hide')
}

function cek_harga_requested(x){
    if($(x).hasClass("background_grey")){
        $(x).removeClass("background_grey");
    }else{
        $(x).addClass("background_grey");
    }
    $(".modals-check-harga").toggle();
    $(".modals-check-harga").attr("src", "./Iframe/product_scanner.html");
}

const addAddress=()=>{
    console.log('jalan')
    $("#iframeAddress").removeClass('testingjquery')
    $("iframeAddress").addClass('testingjquery2')
    
    console.log(a)
}

