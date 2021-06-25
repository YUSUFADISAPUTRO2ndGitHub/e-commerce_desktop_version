



// $('.login-btn').on('click',function(){
//          $("#loginModal").modal("hide");
// })
console.log('home js aktif')

function forgot_modal_request(){
    $('#loginModal').modal('hide')
}
function cart_requested(x){
    $('.close-button').css('display','block')
    
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
      $('.input-name').css('border-bottom-left-radius','10px')
      $('.input-name').css('border-bottom-right-radius','10px')
      $('.input-name').val(null)
}

function pengiriman_requested(x){
    $('.close-button').css('display','block')
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
      $('.input-name').css('border-bottom-left-radius','10px')
      $('.input-name').css('border-bottom-right-radius','10px')
      $('.input-name').val(null)
    
}


function cek_harga_requested(x){
    $('.close-button').css('display','block')
    $('.close').css('display','none')
    if($(x).hasClass("background_grey")){
        $(x).removeClass("background_grey");
        
    }else{
        $(x).addClass("background_grey");
    }
    if($(x).hasClass('close-button')){
        alert('masuk ke line 72')
        $('.close-button').css('display','none')
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
    $('.input-name').css('border-bottom-left-radius','10px')
    $('.input-name').css('border-bottom-right-radius','10px')
    $('.input-name').val(null)
   
}

$('#datepicker').on('click',function(){
    $(this).datepicker();
})

const commision_check=()=>{
    $('#profileModal').modal('hide')
    var token = localStorage.getItem('token')
    
    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();
    var percent;
    newdate = year + "-" + month + "-" + day;
    var thismonth = year + "-" + month + "-" + "1"

    $('.tbody_commision').empty()




  
    // TOTAL  CUSTOMER MAKE PURCHASE
    axios.post(`http://customers.sold.co.id/get-total-active-customers-of-a-referral-code?Customer_Code=${token}`)
    .then((res)=>{
        console.log(res.data)
        $('.total_cust_make_purchase').val(res.data[0].total_active_customers)
    }).catch((err)=>{
        console.log(err)
    })

    // TOTAL ACTIVE CUSTOMER
    axios.post(`http://customers.sold.co.id/get-total-customers-of-a-referral-code?Customer_Code=${token}`)
    .then((res)=>{
        console.log(res.data)
        $('.total_cust_with_referral').val(res.data[0].Total_Customers)
    }).catch((err)=>{
        console.log(err)
    })

    // CUSTOMER INFORMATION  FOR TOTAL COMMISION
    axios.post(`http://customers.sold.co.id/get-customer-information?Customer_Code=${token}`)
    .then((res)=>{
        console.log(res.data)
        var tanggalAwalBuat = res.data.Created_Date
        console.log(res.data.extra_column_3)
        if(res.data.extra_column_3 === '3%'){
            percent = 0.03
        }else if ( res.data.extra_column_3 === '7.5%'){
            percent = 0.075
        }

         // CUSTOMER TOTAL COMMISION THIS MONTH
        axios.post(`http://customers.sold.co.id/get-sales-order-which-referral-code-customer?referral_customer_code=${token}&&given_date=${thismonth}`)
        .then((res)=>{
            console.log(res.data)
            console.log(res.data[0].Total_Price)
            console.log(percent)
            console.log(thismonth)
            var total_commision = res.data[0].Total_Price * percent
            console.log(total_commision)
            // Total_Price
            $('.commision_this_month').val(total_commision)
        }).catch((err)=>{
            console.log(err)
        })

        axios.post(`http://customers.sold.co.id/get-total-commission-of-all-months-gross?Customer_Code=${token}`)
        .then((res)=>{
            console.log(res.data)
            console.log(res.data[0].Total_Price)
            var total_commision = parseInt(res.data[0].Total_Price) * percent
            $('.total_commision').val(total_commision)
        }).catch((err)=>{
            console.log(err)
        })

          // DATA UNTUK RENDER TABLE

          axios.post(`http://customers.sold.co.id/get-sales-order-which-referral-code-customer?referral_customer_code=${token}&&given_date=${newdate}`)
          .then((res)=>{
              console.log(res.data,' 107')
              console.log(token,' token')
              console.log(newdate , ' newdate')
              
              $('.date-commision').val(newdate)
              // var a = $('.date-commision').val()
              res.data.map((val,index)=>{
                  console.log(val)
                  var untung = percent * val.Total_Price  
                  console.log(untung)
                  console.log(percent)
                  $('.tbody_commision').append(`
                    <tr>
                        <td>
                            <div class="wrapper">
                                <div class="marquee">
                                    <p > ${val.Order_Number}</p> 
                                </div>
                            </div>   
                        </td>
                        <td>${val.Total_Quantity}</td>
                        <td>${val.Total_Price}</td>
                        <td>3%</td>
                        <td>${untung}</td>
                        
                    </tr>
                  `)
              })
          }).catch((err)=>{
              console.log(err)
          })



        
    }).catch((err)=>{
        console.log(err)
    })

    // TOTAL COMMISION

    
   
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
 var element = document.getElementsByClassName("main-structure")
    document.addEventListener("scroll", e => {
      let scrolled = document.scrollingElement.scrollTop
    //   console.log(scrolled)
			// console.log(isHome)
			if(isHome){
				if (scrolled > 1000) {
                    element[0].classList.remove("scroll")
					setIsScroll = true
                    $('.list-group').css('display','none')
                    $('.modals-lk').css('display','none')
                    // console.log('masuk line 94')
				} else {
                    // console.log('masuk line 98')
					element[0].classList.add("scroll")
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



    




const date_commision=()=>{
   $('.tbody_commision').empty()
    var tanggal = $('.input-date').val()
    var token = localStorage.getItem('token')
    var percent;
    axios.post(`http://customers.sold.co.id/get-customer-information?Customer_Code=${token}`)
    .then((res)=>{

        console.log(res.data)
        var tanggalAwalBuat = res.data.Created_Date
        console.log(res.data.extra_column_3)
        if(res.data.extra_column_3 === '3%'){
            percent = 0.03
        }else if ( res.data.extra_column_3 === '7.5%'){
            percent = 0.075
        }

        axios.post(`http://customers.sold.co.id/get-sales-order-which-referral-code-customer?referral_customer_code=${token}&&given_date=${tanggal}`)
    .then((res)=>{
        console.log(res.data,' 107')
        console.log(token,' token')
        console.log(newdate , ' newdate')
        
        $('.date-commision').val(tanggal)
        // var a = $('.date-commision').val()
        res.data.map((val,index)=>{
            console.log(val)
            var untung = percent * val.Total_Price
            $('.tbody_commision').append(`
            <tr>
                <td> <p  class="limited-text"> ${val.Order_Number}</p>
                </td>
                <td>${val.Total_Quantity}</td>
                <td>${val.Total_Price}</td>
                <td>3%</td>
                <td>${untung}</td>
                
            </tr>
          `)  
            // $('.comm-order-num').append(`
            // <div class="comm-1-list">
            //     <p class="limited-text">${val.Order_Number}</p>
            // </div>
            // `)

            // $('.comm-qty').append(`
            // <div class="comm-1-list">
            //     <p>${val.Total_Quantity}</p>
            // </div>
            // `)
            // $('.comm-total-price').append(`
            // <div class="comm-1-list">
            //     <p>${val.Total_Price}</p>
            // </div>
            // `)
            // $('.comm-percent').append(`
            // <div class="comm-1-list">
            //     <p>3%</p>
            // </div>
            // `)
            // $('.comm-total-untung').append(`
            // <div class="comm-1-list">
            //     <p>${untung}</p>
            // </div>
            // `) 
        })
    }).catch((err)=>{
        console.log(err)
    })
         
    }).catch((err)=>{
        console.log(err)
    })



    

}