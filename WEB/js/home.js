


function sign_up_request(){
    $("#loginModal").modal("hide");
    
}
function cart_requested(x){
    console.log(x)
    if($(x).hasClass("background_grey")){
        $(x).removeClass("background_grey");
    }else{
        $(x).addClass("background_grey");
    }
    $(".iframe").toggle();
    // $('.iframe').css('display','block')
    $('.modals-pengiriman').css("display",'none')
    $('.modals-check-harga').css("display",'none')
    $('.option-1').removeClass('background_grey')
    $('.option-2').removeClass('background_grey')
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
    $(".modals-check-harga").css('display','none')
    $(".iframe").css('display','none')
    $('.option-1').removeClass('background_grey')
    $('.option-3').removeClass('background_grey')
}


function cek_harga_requested(x){
    if($(x).hasClass("background_grey")){
        $(x).removeClass("background_grey");
    }else{
        $(x).addClass("background_grey");
    }
    $(".modals-check-harga").toggle();
    // $('.modals-check-harga').css('display','block')
    $(".modals-check-harga").attr("src", "./Iframe/product_scanner.html");
    $('.modals-pengiriman').css('display','none')
    $('.iframe').css('display','none')
    $('.option-2').removeClass('background_grey')
    $('.option-3').removeClass('background_grey')
   
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


var data = [
    ['Foo', 'programmer'],
    ['Bar', 'bus driver'],
    ['Moo', 'Reindeer Hunter']
 ];
  
  
 function download_csv() {
     var csv = 'Name,Title\n';
     data.forEach(function(row) {
             csv += row.join(',');
             csv += "\n";
     });
  
     console.log(csv);
     var hiddenElement = document.createElement('a');
     hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
     hiddenElement.target = '_blank';
     hiddenElement.download = 'people.csv';
     hiddenElement.click();
 }

//  SCROLL KATEGORI
 var isHome = true
 var setIsScroll = false
 var element = document.getElementsByClassName("main-structure")
    document.addEventListener("scroll", e => {
      let scrolled = document.scrollingElement.scrollTop
      console.log(scrolled)
			// console.log(isHome)
			if(isHome){
				if (scrolled > 60) {
                    element[0].classList.remove("scroll")
					setIsScroll = true
                    $('.list-group').css('display','none')
                    $('.modals-lk').css('display','none')
                    console.log('masuk line 94')
				} else {
                    console.log('masuk line 98')
					element[0].classList.add("scroll")
					setIsScroll = false
                    $('.list-group').css('display','block')
				}
			}
    })

    //  SCROLL KATEGORI

    