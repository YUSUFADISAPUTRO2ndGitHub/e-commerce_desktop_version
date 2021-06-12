$(function(){
    $('.carousel').carousel()

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
        
    });

    $('.input-name').on('keyup',function(){
        var value = $(this).val()
        console.log(value)
        
        function sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
          }
          sleep(2000).then(()=>{
              if(value.length>0){
                  $('.box-render-search').css('display','block')
                  $('.input-name').css('border-bottom-left-radius','0px')
                  $('.input-name').css('border-bottom-right-radius','0px')
                  console.log(allData)
                  const searchString = value.toLowerCase()
                      const filterSearch = allData.filter((item)=>{
                          return (
                              item.Name.toLowerCase().includes(searchString) 
                          );
                      });
                      filterSearch.map((val,index)=>{
                          $('.box-render-search').append(
                              `
                              <li>${val.Name}</li>
                          `)
                      })
                      
                      console.log(filterSearch)
                  
              }else {
                  $('.box-render-search').css('display','none')
                  $('.input-name').css('border-bottom-left-radius','25px')
                  $('.input-name').css('border-bottom-right-radius','25px')
              }

          })
    })
   
})