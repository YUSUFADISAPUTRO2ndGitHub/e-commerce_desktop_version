



// $('.login-btn').on('click',function(){
//          $("#loginModal").modal("hide");
// })
console.log('home js aktif')

function forgot_modal_request(){
    $('#loginModal').modal('hide')
}
function cart_requested(x){
    
    $('.close').css('display','none')
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

      // SEARCH ITEM BACK TO NORMAL
      $('.box-render-search').css('display','none')
      $('.input-name').css('border-bottom-left-radius','25px')
      $('.input-name').css('border-bottom-right-radius','25px')
      $('.input-name').val(null)
}

function pengiriman_requested(x){
    $('.close').css('display','none')
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

      // SEARCH ITEM BACK TO NORMAL
      $('.box-render-search').css('display','none')
      $('.input-name').css('border-bottom-left-radius','25px')
      $('.input-name').css('border-bottom-right-radius','25px')
      $('.input-name').val(null)
    
}


function cek_harga_requested(x){
    $('.close').css('display','none')
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

    // SEARCH ITEM BACK TO NORMAL
    $('.box-render-search').css('display','none')
    $('.input-name').css('border-bottom-left-radius','25px')
    $('.input-name').css('border-bottom-right-radius','25px')
    $('.input-name').val(null)
   
}

const commision_check=()=>{
    $('#profileModal').modal('hide')
}




var data = [
    ['Foo', 'programmer'],
    ['Bar', 'bus driver'],
    ['Moo', 'Reindeer Hunter']
 ];
  

 const logoutProfile=()=>{
    localStorage.removeItem("token");
    $('#profileModal').modal('hide')
    Swal.fire('You have logged out of your account', 'Good-Bye', 'success')

 }
    

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
 var element = document.getElementsByClassName("new_body")
    document.addEventListener("scroll", e => {
      let scrolled = document.scrollingElement.scrollTop
      console.log(scrolled)
			// console.log(isHome)
			if(isHome){
				if (scrolled > 50) {
                    // element[0].classList.remove("scroll")
					setIsScroll = true
                    $('.list-group').css('display','none')
                    $('.modals-lk').css('display','none')
                    // console.log('masuk line 94')
				} else {
                    // console.log('masuk line 98')
					// element[0].classList.add("scroll")
					setIsScroll = false
                    $('.list-group').css('display','block')
				}
			}
    })
    
// SCROLLING ITEM

 var scrollNextPromo = 0   
 var scrollNextNew = 0   
 var scrollNextAll = 0   
 
const nextItem=(id)=>{
    console.log(id)
    // var jenis = $('.next-promo').attr("id")
    
    if(id === 'promo'){
        scrollNextPromo += 350
         horizontalNavigationPromo(scrollNextPromo, event);
         console.log(id)
     }else if (id === 'new'){
        scrollNextNew += 350
        horizontalNavigationNew(scrollNextNew, event);
     }else {
        scrollNextAll += 350
        horizontalNavigationAll(scrollNextAll, event);
     }
 
}

const backItem=(id)=>{
    console.log(id)
    // var jenis = $('.next-promo').attr("id")
    
    if(scrollNextPromo <0){
        scrollNextPromo = 0
    }else if (scrollNextAll <0){
        scrollNextAll = 0
    }else if ( scrollNextNew < 0 ){
        scrollNextNew = 0
    }
    if(id === 'promo'){

        scrollNextPromo -= 350
        horizontalNavigationPromo(scrollNextPromo, event);
        console.log(id, ' ini id back')
    }else if (id === 'new'){
        scrollNextNew -= 350
       horizontalNavigationNew(scrollNextNew, event);
    }else  if(id === 'all'){
        scrollNextAll -= 350
       horizontalNavigationAll(scrollNextAll, event);
    }

 
}


 $('.box-back').on('click',function(event){
    
    
    
    var jenis = $(this).attr("id")
  

    if(scrollNextPromo <0){
        scrollNextPromo = 0
    }else if (scrollNextAll <0){
        scrollNextAll = 0
    }else if ( scrollNextNew < 0 ){
        scrollNextNew = 0
    }
    if(jenis === 'promo'){

        scrollNextPromo -= 350
        horizontalNavigationPromo(scrollNextPromo, event);
        console.log(jenis, ' ini jenis back')
    }else if (jenis === 'new'){
        scrollNextNew -= 350
       horizontalNavigationNew(scrollNextNew, event);
    }else  if(jenis === 'all'){
        scrollNextAll -= 350
       horizontalNavigationAll(scrollNextAll, event);
    }

//    horizontalNavigationPromo(scrollNext, event);
})

 function horizontalNavigationPromo(position, event) {
     console.log('jalan')
    $('.box-render-promo').animate({scrollLeft: position}, 350);
    event.preventDefault();
}
function horizontalNavigationNew(position, event) {
    console.log('jalan')
   $('.box-render-new').animate({scrollLeft: position}, 350);
   event.preventDefault();
}
function horizontalNavigationAll(position, event) {
    console.log('jalan')
   $('.box-render-all').animate({scrollLeft: position}, 350);
   event.preventDefault();
}



    

$('.id-referral').on('click',function(){
   var option =  $(this).val()
   console.log(option)
})


const to_detail_product=(id)=>{
    console.log(id)
    $('#detailProductModal').modal('show')
}