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

    $('#datepicker').datepicker({
        uiLibrary: 'bootstrap4',
        format:'dd-mm-yyy',
        onSelect: function() { 
            
            var dateObject = $(this).datepicker('getDate'); 
            console.log(dateObject)
        }
        
    }
    
    );
   
})