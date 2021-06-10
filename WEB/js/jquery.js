$(function(){
   $('.icon-cust').on('click',function(){
       console.log('testing jalan')
    //    $('.box-information').css('display','block')
    $('.box-information').show(1000)
    //    $('.box-customer').toggle('active')
   })

   $('.icon-close').on('click',function(){
    // $('.box-information').css('display','none')
       $('.box-information').hide(1000)
       console.log('jalan box information')
   })
   
   

   $('.owl-carousel').owlCarousel({
    margin: 10,
    nav: true,
    dots:false,
    navText:["<div class='nav-btn prev-slide'></div>","<div class='nav-btn next-slide'></div>"],
    responsive: {
        0: {
            items: 1
        },
        600: {
            items: 3
        },
        1000: {
            items: 3
        }
    }
});
    $('.get-item').on('mouseenter',function(){
        var item = $(this).attr('val')
        console.log('function jalan 36')
        if(item){
            console.log('function jalan 36')
            if($('modals-lk').hasClass("background_grey")){
                $('modals-lk').removeClass("background_grey")
            }else {
                $('modals-lk').addClass('background_grey')
            }
            console.log(item)
      
            $('.modals-lk').toggle(500)
            $('.modals-lk').attr('src','../WEB/Iframe/listkategori.html')   
        }else {

        }
    })
  
    $('.get-item').on('mouseleave',function(){
        $('.modals-lk').css('display','none')
    })


    
    


})