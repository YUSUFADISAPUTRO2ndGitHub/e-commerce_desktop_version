$(function(){
    

    // $('.carousel').carousel()

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
   
   $('.option-4').on('click',function(){
        $('.closeByLogin').css('display','none')
        $('.option-1').removeClass("background_grey")
        $('.option-2').removeClass("background_grey")
        $('.option-3').removeClass("background_grey")
        // $('.option-4').removeClass("background_grey")
   })

   $('.category-name').on('click',function(){
    $('.closeByLogin').css('display','none')
    $('.option-1').removeClass("background_grey")
    $('.option-2').removeClass("background_grey")
    $('.option-3').removeClass("background_grey")

   })

    // $('#datepicker').datepicker({
    //     uiLibrary: 'bootstrap4',
    //     format:'dd-mm-yyy',
    //     onSelect: function() { 
            
    //         var dateObject = $(this).datepicker('getDate'); 
    //         console.log(dateObject)
    //     }
        
    // });


    // var searchItem = []
        $('.input-name').on('keyup', _.debounce(function () {
            console.log('hi');
            var value = $(this).val()
            if(value.length>2){
                console.log('masuk ke if')
                $('.box-render-search').css('display','block')
                $('.box-search-menu').css('display','block')
                $('.input-name').css('border-bottom-left-radius','0px')
                $('.input-name').css('border-bottom-right-radius','0px')
                $('.render-li-search').empty()
            //   console.log(allData)
                const searchString = value.toLowerCase()
                console.log(searchString)
                    const filterSearch = allData.filter((item)=>{
                        return (
                            item.Name.toLowerCase().includes(searchString) 
                        );
                    });
                    // filterSearch.map((val,index)=>{
                    //     $('.render-li-search').append(
                    //         `
                    //         <li>${val.Name}</li>
                    //     `)
                    // })
                    // searchItem = filterSearch
                    filterSearch.map((val,index)=>{
                        $('.render-li-search').append(
                            `
                                <li>${val.Name}</li>
                            `
                        )
                    })
                    
                    console.log(filterSearch)
                    $('.closeByLogin').css('display','none')
                    $('.option-1').removeClass("background_grey")
                    $('.option-2').removeClass("background_grey")
                    $('.option-3').removeClass("background_grey")
                    $('.box-information').hide(1000)
                
            }else {
                // searchItem = null
            console.log('masuk ke if')
                $('.box-render-search').css('display','none')
                $('.input-name').css('border-bottom-left-radius','25px')
                $('.input-name').css('border-bottom-right-radius','25px')
            }

        }, 500));
      
    // });

    
   
})