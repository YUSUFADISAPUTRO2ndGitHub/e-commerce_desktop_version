



// $('.login-btn').on('click',function(){
//          $("#loginModal").modal("hide");
// })








const on_select_ref=()=>{
    var value = $('.ref-cod').val()
    $('#inp_ref_code').val(value)
    // 
}
function forgot_modal_request(){
    $('#newloginModal').modal('hide')
}
function cart_requested(x){
    back_to_home()
    $('.dropdown_menu_mobile').removeClass('show')
    $('.dropdown-toggle').removeClass('show')
    var cartToJson = JSON.parse(localStorage.getItem('itemsInCart'))
    var cartString = localStorage.getItem('itemsInCart')
    var token = localStorage.getItem('token')
    console.log(token)
    if(cartToJson != undefined){ // kalau data cart ada isinya
        if(cartToJson.length != 0){
            
            axios.post(`https://customers.sold.co.id/save-user-shopping-cart?Customer_Code=${token}&cart=${cartString}`)
            .then((res)=>{
                
                if(res.data){
                    
                }else {
                    
                }
            }).catch((err)=>{
                
            })
        }else {  // get cart
            
            axios.post(`https://customers.sold.co.id/get-saved-user-shopping?Customer_Code=${token}`)
            .then((res)=>{
                
                if(res.data != undefined){
                    var data_stringify = JSON.stringify(res.data)
                    localStorage.setItem("itemsInCart", data_stringify);
                    
                }
            }).catch((err)=>{
                
            })
        }
    }else {
        
        var emptyArray = [];
        var emptyArrayString = JSON.stringify(emptyArray);
        localStorage.setItem("itemsInCart", emptyArrayString);
    }

    checkboxCounter = 0;
    var requestArrayForItemsToCheckout = [];
    var productToBeAddedStringify = JSON.stringify(requestArrayForItemsToCheckout);
    localStorage.setItem("itemsToCheckout", productToBeAddedStringify);
    



    $('.close-button').css('display','block')
    
    $('.close').css('display','none')
    // 
    if($(x).hasClass("background_grey")){
        $(x).removeClass("background_grey");
        $('.close-button').css('display','none')
    }else{
        $(x).addClass("background_grey");
        $('.new-box-category').css('display','none')
    }
    
    $(".iframe").toggle();
    // $('.iframe').css('display','block')
    $('.modals-pengiriman').css("display",'none')
    $('.modals-check-harga').css("display",'none')
    $('.box_iframe_groupbuy').css('display','none')
    $('.option-1').removeClass('background_grey')
    $('.option-2').removeClass('background_grey')
    $('.option-0').removeClass('background_grey')
    $('.option-5').removeClass('background_grey')
    $(".iframe").attr("src", "./cart.html");

      // SEARCH ITEM BACK TO NORMAL
      $('.box-render-search').css('display','none')
      $('.input-name').css('border-bottom-left-radius','10px')
      $('.input-name').css('border-bottom-right-radius','10px')
      $('.input-name').val(null)
}

function live_chat(){
    $('.close-button').css('display','block')
    // $('.modals-live-chat').toggle()
    $('.modals-live-chat').css('display','block')
    $('.box-product').css('display','none')
    $('.category-menu').css('display','none')
    $('.box-icon-lc').css('display','flex')
    var token = localStorage.getItem('token')
    axios.post(`https://customers.sold.co.id/get-customer-information?Customer_Code=${token}`)
    .then((res)=>{
        if(res.data){
            var data_customer
            var isCustomer_information = Array.isArray(res.data)
            if(isCustomer_information) {
                data_customer = res.data[0]
            }else {
                data_customer = res.data

            }
            if(data_customer){
                $(".modals-live-chat").attr("src", `http://147.139.168.202:3045/?user_name=${data_customer.First_Name}`);
            }else {
                $(".modals-live-chat").attr("src", `http://147.139.168.202:3045`);
            }
       
        }else {
            Swal.fire({
                html:`
                <div class="o-circle c-container__circle o-circle__sign--failure">
                    <div class="o-circle__sign"></div>  
                </div> 
                Silahkan Login`,
                timer:2000,
            })
            setTimeout(()=>{
                window.parent.$('.iframe').css('display','none')
                window.parent.$('.force-close-all-command').css('display','none')
            },1500)      
        }
        // $('.modals-live-chat').attr('src','https://tawk.to/chat/60f103efd6e7610a49ab8521/1famneoj8')
    }).catch((err)=>{
        
    })
}
function close_live_chat(){
    $('.modals-live-chat').css('display','none')
    $('.box-icon-lc').css('display','none')
    $('.box-product').css('display','flex')
    $('.category-menu').css('display','flex')

}

function close_success(){
    $('.modals-product-detail').css('display','none')
    $('.box-delete-success').css('display','none')
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
    $('.option-0').removeClass('background_grey')

      // SEARCH ITEM BACK TO NORMAL
      $('.box-render-search').css('display','none')
      $('.input-name').css('border-bottom-left-radius','10px')
      $('.input-name').css('border-bottom-right-radius','10px')
      $('.input-name').val(null)
    
}


function bulk_order_home(x){
    console.log('bulk order jalan')
    $('.dropdown_menu_mobile').removeClass('show')
    $('.dropdown-toggle').removeClass('show')
    back_to_home()
    var token = localStorage.getItem('token')
    // var data_customer;
    // alert('jaalan')
    $('.close-button').css('display','block')
    $('.close').css('display','none') 
    // if($('.option-5').hasClass('background_grey')){
    //     $('.option-5').removeClass('background_grey')
    //     // $('.modals-bulk-order').css('display','none')
    //     $('.close-button').css('display','none')
    // }else {
    //     $('.option-5').addClass('background_grey')
    //     // $('.modals-bulk-order').css('display','block')
    //     $('.close-button').css('display','none')
    // }
    if($(x).hasClass("background_grey")){
        $(x).removeClass("background_grey");
        $('.modals-bulk-order').css('display','none')
    }else{
        $(x).addClass("background_grey");
        $('.modals-bulk-order').css('display','block')
        $('.new-box-category').css('display','none')
    }

   
    if($(x).hasClass('close-button')){
        // alert('masuk ke line 72')
        $('.close-button').css('display','none')
    }
    
    // $(".modals-bulk-orde").toggle();
    $(".modals-bulk-order").attr("src", `./Iframe/bulk_order.html`);
    // $(".modals-hutang-home").attr("src", `./Iframe/unpaidList.html?list_hutang=${token}`);


    // ngilangin block abu abu pas di klik
    $('.option-2').removeClass('background_grey')
    $('.option-3').removeClass('background_grey')
    $('.option-1').removeClass('background_grey')
    $('.option-0').removeClass('background_grey')

    // SEARCH ITEM BACK TO NORMAL
    $('.box-render-search').css('display','none')
    $('.input-name').css('border-bottom-left-radius','10px')
    $('.input-name').css('border-bottom-right-radius','10px')
    $('.input-name').val(null)

    // untuk close iframe sebelahnya
    $('.modals-pengiriman').css("display",'none')
    $('.modals-check-harga').css("display",'none')
    $(".iframe").css('display','none')
}

function cek_daftar_hutang(x){
    // alert('function jalan')
    back_to_home()
    var token = localStorage.getItem('token')
    // var data_customer;
    $('.close-button').css('display','block')
    $('.close').css('display','none') 
    if($(x).hasClass("background_grey")){
        $(x).removeClass("background_grey");
        $('.modals-hutang-home').css('display','none')
        $('.close-button').css('display','none')
    }else{
        $(x).addClass("background_grey");
        $('.modals-hutang-home').css('display','block')
        $('.new-box-category').css('display','none')
    }
  
    if($(x).hasClass('close-button')){
        // alert('masuk ke line 72')
        $('.close-button').css('display','none')
    }
    
    // $(".modals-hutang-home").toggle();
    $(".modals-hutang-home").attr("src", `./Iframe/unpaidList.html?list_hutang=${token}`);
    $('.dropdown_menu_mobile').removeClass('show')
    $('.dropdown-toggle').removeClass('show')

    // ngilangin block abu abu pas di klik
    $('.option-2').removeClass('background_grey')
    $('.option-3').removeClass('background_grey')
    $('.option-1').removeClass('background_grey')
    $('.option-5').removeClass('background_grey')

    // SEARCH ITEM BACK TO NORMAL
    $('.box-render-search').css('display','none')
    $('.input-name').css('border-bottom-left-radius','10px')
    $('.input-name').css('border-bottom-right-radius','10px')
    $('.input-name').val(null)

    // untuk close iframe sebelahnya
    $('.modals-pengiriman').css("display",'none')
    $('.modals-check-harga').css("display",'none')
    $(".iframe").css('display','none')
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
        // alert('masuk ke line 72')
        $('.close-button').css('display','none')
    }
    $(".modals-check-harga").toggle();
    
    // $('.modals-check-harga').css('display','block')
    $(".modals-check-harga").attr("src", "./Iframe/product_scanner.html");
    $('.modals-pengiriman').css('display','none')
    $('.iframe').css('display','none')
    $('.option-2').removeClass('background_grey')
    $('.option-3').removeClass('background_grey')
    $('.option-0').removeClass('background_grey')

    // SEARCH ITEM BACK TO NORMAL
    $('.box-render-search').css('display','none')
    $('.input-name').css('border-bottom-left-radius','10px')
    $('.input-name').css('border-bottom-right-radius','10px')
    $('.input-name').val(null)
   
}

$('#datepicker').on('click',function(){
    alert('jalan')
    $(this).datepicker();
})

const commision_check=()=>{
    $('#profileModal').modal('hide')
    $('#commisionModal').modal('show')
    var token = localStorage.getItem('token')
    
    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();
    var percent;
    var total_percent;
    newdate = year + "-" + month + "-" + day;
    var thismonth = year + "-" + month + "-" + "1"

    $('.tbody_commision').empty()




  
    // TOTAL  CUSTOMER MAKE PURCHASE
    axios.post(`https://customers.sold.co.id/get-total-active-customers-of-a-referral-code?Customer_Code=${token}`)
    .then((res)=>{
        
        $('.total_cust_make_purchase').val(res.data[0].total_active_customers)
    }).catch((err)=>{
        
    })

    // TOTAL ACTIVE CUSTOMER
    axios.post(`https://customers.sold.co.id/get-total-customers-of-a-referral-code?Customer_Code=${token}`)
    .then((res)=>{
        
        $('.total_cust_with_referral').val(res.data[0].Total_Customers)
    }).catch((err)=>{
        
    })

    // CUSTOMER INFORMATION  FOR TOTAL COMMISION
    axios.post(`https://customers.sold.co.id/get-customer-information?Customer_Code=${token}`)
    .then((res)=>{
        if(res.data){
            var data_customer
            var isCustomer_information = Array.isArray(res.data)
            if(isCustomer_information) {
                data_customer = res.data[0]
            }else {
                data_customer = res.data

            }
            var tanggalAwalBuat = data_customer.Created_Date
            
            if(data_customer.extra_column_3 === '3%'){
                percent = 0.03
                total_percent = '3%'
            }else if ( data_customer.extra_column_3 === '7.5%'){
                percent = 0.075
                total_percent = '7.5%'
            }
    
             // CUSTOMER TOTAL COMMISION THIS MONTH
            axios.post(`https://customers.sold.co.id/get-sales-order-which-referral-code-customer?referral_customer_code=${token}&&given_date=${thismonth}`)
            .then((res)=>{
    
                var total_commision=0
                res.data.map((val,index)=>{
                    var tot_price = parseInt(val.Total_Price)
                    
                    total_commision +=tot_price * percent
                })
                    $('.commision_this_month').val(total_commision)
                
                // Total_Price
            }).catch((err)=>{
                
            })
    
            axios.post(`https://customers.sold.co.id/get-total-commission-of-all-months-gross?Customer_Code=${token}`)
            .then((res)=>{
                var total_commision = parseInt(res.data[0].Total_Price) * percent
                $('.total_commision').val(total_commision)
            }).catch((err)=>{
                
            })
    
              // DATA UNTUK RENDER TABLE
    
              axios.post(`https://customers.sold.co.id/get-sales-order-which-referral-code-customer?referral_customer_code=${token}&&given_date=${newdate}`)
              .then((res)=>{
    
                  $('.date-commision').val(newdate)
                  // var a = $('.date-commision').val()
                  res.data.map((val,index)=>{
                      
                      var untung = percent * val.Total_Price  
                      
                      
                      $('.tbody_commision').append(`
                        <tr>
                            <td>
                                <div class="wrapper">
                                    <div class="marquee">
                                        <p class="on_commision">${val.Order_Number}</p> 
                                    </div>
                                </div>   
                            </td>
                            <td class="tq_commision">${val.Total_Quantity}</td>
                            <td class="tp_commision">${val.Total_Price}</td>
                            <td class="percent_commision">${total_percent}</td>
                            <td class="untung_commision">${untung}</td>
                            
                        </tr>
                      `)
                  })
              }).catch((err)=>{
                  
              })
       
        }else {
            Swal.fire({
                html:`
                <div class="o-circle c-container__circle o-circle__sign--failure">
                    <div class="o-circle__sign"></div>  
                </div> 
                Silahkan Login`,
                timer:2000,
            })
            setTimeout(()=>{
                window.parent.$('.iframe').css('display','none')
                window.parent.$('.force-close-all-command').css('display','none')
            },1500)      
        }



        
    }).catch((err)=>{
        
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
    $('#newProfileModal').modal('hide')
    // Swal.fire('You have logged out of your account', 'Good-Bye', 'success')
    Swal.fire({
        html:`
        <div class="o-circle c-container__circle o-circle__sign--success">
            <div class="o-circle__sign"></div>  
        </div>   
        You have logged out of your account
        `,
        timer:2000,
        
    })
 }
    

 function download_csv() {
    var ary = [];
    $(function () {
        $('.tbody_commision tr').each(function (a, b) {

            var order_number = $('.on_commision',b).text()
            var total_quantity = $('.tq_commision',b).text()
            var total_price = $('.tp_commision',b).text()
            var percent = $('.percent_commision',b).text()
            var untung = $('.untung_commision',b).text()
            // ary.push({ Name: name, Value: value });
            ary.push([
                order_number,
                total_quantity,
                total_price,
                percent,
                untung
            ])
        });
        
        var csvContent = "data:text/csv;charset=utf-8,";
	// $("#pressme").click(function(){
		ary.forEach(function(infoArray, index){
			dataString = infoArray.join(",");
			csvContent += index < infoArray.length ? dataString+ "\n" : dataString;
		});

		var encodedUri = encodeURI(csvContent);
		window.open(encodedUri);
        // alert(JSON.stringify( ary));
    });
    
  
 }

//  SCROLL KATEGORI
//  var isHome = true
//  var setIsScroll = false
//  var element = document.getElementsByClassName("main-structure")
//     document.addEventListener("scroll", e => {
//       let scrolled = document.scrollingElement.scrollTop
//       

// 			if(isHome){
// 				if (scrolled > 50) {
// 					setIsScroll = true
//                     $('.list-group').css('display','none')
//                     $('.modals-lk').css('display','none')
// 				} else {

// 					setIsScroll = false
//                     $('.list-group').css('display','block')
// 				}
// 			}
//     })



    // $($('.main-structure')).scroll(function (event) {
    //     var scroll = $('.main-structure').scrollTop();
    //     
    //     // Do something
    // });
    
// SCROLLING ITEM





 var scrollNextPromo = 0   
 var scrollNextNew = 0   
 var scrollNextAll = 0 
 var scrollNextTop = 0
 var scrollNextBot = 0  
 
const nextItem=(id)=>{
    
    // var jenis = $('.next-promo').attr("id")
    
    if(id === 'promo'){
        scrollNextPromo += 255
         horizontalNavigationPromo(scrollNextPromo, event);
        //  $('.promo_card').css('display','none')
        $('.promo_card').hide(1000)
        
     }else if (id === 'new'){
        scrollNextNew += 350
        horizontalNavigationNew(scrollNextNew, event);
     }else if (id === 'all'){
        scrollNextAll += 350
        horizontalNavigationAll(scrollNextAll, event);
     }else if (id === 'next_top'){
        scrollNextTop += 350
        horizontalNavigationTop(scrollNextTop, event);
     }else if (id === 'next_bot'){
        scrollNextBot += 350
        horizontalNavigationBot(scrollNextBot, event);
     }
 
}

const backItem=(id)=>{
    
    // var jenis = $('.next-promo').attr("id")
    
    if(scrollNextPromo <0){
        scrollNextPromo = 0
    }else if (scrollNextAll <0){
        scrollNextAll = 0
    }else if ( scrollNextNew < 0 ){
        scrollNextNew = 0
    }else if (scrollNextTop < 0 ){
        scrollNextTop = 0
    }else if (scrollNextBot < 0 ){
        scrollNextBot = 0
    }


    if(id === 'promo'){

        scrollNextPromo -= 255
        // $('.promo_card').css('display','block')
        $('.promo_card').show(1000)
        horizontalNavigationPromo(scrollNextPromo, event);
        
    }else if (id === 'new'){
        scrollNextNew -= 350
       horizontalNavigationNew(scrollNextNew, event);
    }else  if(id === 'all'){
        scrollNextAll -= 350
       horizontalNavigationAll(scrollNextAll, event);
    }else if (id == 'back_top' ){
        
        scrollNextTop -= 350
        horizontalNavigationTop(scrollNextTop, event);
    }else if (id == 'back_bot'){
        scrollNextBot -= 350
        horizontalNavigationBot(scrollNextBot, event);
    }

 
}


//  $('.box-back').on('click',function(event){
    
    
    
//     var jenis = $(this).attr("id")
  

//     if(scrollNextPromo <0){
//         scrollNextPromo = 0
//     }else if (scrollNextAll <0){
//         scrollNextAll = 0
//     }else if ( scrollNextNew < 0 ){
//         scrollNextNew = 0
//     }
//     if(jenis === 'promo'){

//         scrollNextPromo -= 255
//         horizontalNavigationPromo(scrollNextPromo, event);
//         
//     }else if (jenis === 'new'){
//         scrollNextNew -= 350
//        horizontalNavigationNew(scrollNextNew, event);
//     }else  if(jenis === 'all'){
//         scrollNextAll -= 350
//        horizontalNavigationAll(scrollNextAll, event);
//     }

// //    horizontalNavigationPromo(scrollNext, event);
// })

 function horizontalNavigationPromo(position, event) {
     
    $('.box-render-promo').animate({scrollLeft: position}, 350);
    event.preventDefault();
}
function horizontalNavigationNew(position, event) {
    
   $('.box-render-new').animate({scrollLeft: position}, 350);
   event.preventDefault();
}
function horizontalNavigationAll(position, event) {
    
   $('.box-render-all').animate({scrollLeft: position}, 350);
   event.preventDefault();
}

function horizontalNavigationTop(position, event) {
    
   $('.top-all-category').animate({scrollLeft: position}, 350);
   event.preventDefault();
}

function horizontalNavigationBot(position, event) {
    
   $('.bot-all-category').animate({scrollLeft: position}, 350);
   event.preventDefault();
}



    






const date_commision=()=>{
   $('.tbody_commision').empty()
    var tanggal = $('.input-date').val()
    var token = localStorage.getItem('token')
    var percent;
    var total_percent;
    axios.post(`https://customers.sold.co.id/get-customer-information?Customer_Code=${token}`)
    .then((res)=>{
        if(res.data){
            var data_customer
            var isCustomer_information = Array.isArray(res.data)
            if(isCustomer_information) {
                data_customer = res.data[0]
            }else {
                data_customer = res.data

            }
            var tanggalAwalBuat = data_customer.Created_Date
            
            if(data_customer.extra_column_3 === '3%'){
                percent = 0.03
                total_percent = '3%'
            }else if ( data_customer.extra_column_3 === '7.5%'){
                percent = 0.075
                total_percent = '7.5%'
            }
    
            axios.post(`https://customers.sold.co.id/get-sales-order-which-referral-code-customer?referral_customer_code=${token}&&given_date=${tanggal}`)
            .then((res)=>{
                
                
                
                
                $('.date-commision').val(tanggal)
                // var a = $('.date-commision').val()
                res.data.map((val,index)=>{
                    
                    var untung = percent * val.Total_Price
                    $('.tbody_commision').append(`
                    <tr>
                        <td> <p  class="limited-text on_commision"> ${val.Order_Number}</p>
                        </td>
                        <td class="tq_commision">${val.Total_Quantity}</td>
                        <td class="tp_commision">${val.Total_Price}</td>
                        <td class="percent_commision">${total_percent}</td>
                        <td class="untung_commision">${untung}</td>
                        
                    </tr>
                `)  
        
                })
            }).catch((err)=>{
                
            })
       
        }else {
            Swal.fire({
                html:`
                <div class="o-circle c-container__circle o-circle__sign--failure">
                    <div class="o-circle__sign"></div>  
                </div> 
                Silahkan Login`,
                timer:2000,
            })
            setTimeout(()=>{
                window.parent.$('.iframe').css('display','none')
                window.parent.$('.force-close-all-command').css('display','none')
            },1500)      
        }
        
         
    }).catch((err)=>{
        
    })



    

}


// REGISTER CROSSCHECK DATA

const register_email_check=()=>{
    var email = $('#email_reg').val()

        
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        var valid_email = re.test(email)
        if(valid_email){
            
        }else {
            // Swal.fire('Wrong Email', 'Sorry', 'error')
            Swal.fire({
                html:`
                <div class="o-circle c-container__circle o-circle__sign--failure">
                    <div class="o-circle__sign"></div>  
                </div> 
                Wrong Email`,
                timer:2000,
                
            })
            $('#email_reg').val('')
        }
        
    
}

const supp_email_check=()=>{
    var email = $('#email_supp').val()

        
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        var valid_email = re.test(email)
        if(valid_email){
            
        }else {
            // Swal.fire('Wrong Email', 'Sorry', 'error')
            Swal.fire({
                html:`
                <div class="o-circle c-container__circle o-circle__sign--failure">
                    <div class="o-circle__sign"></div>  
                </div> 
                Wrong Email`,
                timer:2000,
                
            })
            $('#email_supp').val('')
        }
        
}

const tahun_lahir_check=()=>{
    var d = new Date();
    var year = d.getFullYear();
    
    var tahun = $('#tahun_lahir_reg').val()
    if(tahun > year  || tahun < 1900){
        // Swal.fire('Wrong year', 'Sorry', 'error')
        Swal.fire({
            html:`
            <div class="o-circle c-container__circle o-circle__sign--failure">
                <div class="o-circle__sign"></div>  
            </div> 
            Wrong Year`,
            timer:2000,
            
        })
        $('#tahun_lahir_reg').val('')
    } else {
        
    }
}

const password_check=()=>{
    var password = $('#password_reg').val()
    if(password.length < 5){
        // Swal.fire('Wrong Password', 'Sorry', 'error')
        Swal.fire({
            html:`
            <div class="o-circle c-container__circle o-circle__sign--failure">
                <div class="o-circle__sign"></div>  
            </div> 
            Minimal 5 Character`,
            timer:2000,
            
        })
        $('#password_reg').val('')
    }else {
        
    }
}
const supp_password_check=()=>{
    var password = $('#password_supp').val()
    if(password.length < 5){
        // Swal.fire('Wrong Password', 'Sorry', 'error')
        Swal.fire({
            html:`
            <div class="o-circle c-container__circle o-circle__sign--failure">
                <div class="o-circle__sign"></div>  
            </div> 
            Wrong Password`,
            timer:2000,
            
        })
        $('#password_supp').val('')
    }else {
        
    }
}

const bulan_lahir_check=()=>{
    var bulan =parseInt($('#bulan_lahir_reg').val())
    
    
    if(bulan>10 && bulan <= 12){// buat bulan 11 - 12
        // alert('masuk bulan 11/ 12')
    }else if (bulan >10){
        // Swal.fire('Wrong Month', 'Sorry', 'error')
        Swal.fire({
            html:`
            <div class="o-circle c-container__circle o-circle__sign--failure">
                <div class="o-circle__sign"></div>  
            </div> 
            Wrong Month`,
            timer:2000,
            
        })
        $('#bulan_lahir_reg').val('')

    }else if (bulan>0 && bulan <10){  
        var new_bulan = "0"+bulan
        $('#bulan_lahir_reg').val(new_bulan)
        
    }
}

const nama_depan_check=()=>{
    var nama_depan = $('#nama_depan_reg').val()
    if(nama_depan.length < 3){
        // Swal.fire('Minimum 4 Character', 'Sorry', 'error')
        Swal.fire({
            html:`
            <div class="o-circle c-container__circle o-circle__sign--failure">
                <div class="o-circle__sign"></div>  
            </div> 
            Minimum 4 Character`,
            timer:2000,
            
        })
        $('#nama_depan_reg').val('')
    }else {
        
    }
}

const tanggal_lahir_check=()=>{
    var tanggal_lahir = $('#tanggal_lahir_reg').val()
    if(tanggal_lahir < 0 || tanggal_lahir > 31){
        // Swal.fire('Wrong Date', 'Sorry', 'error')
        Swal.fire({
            html:`
            <div class="o-circle c-container__circle o-circle__sign--failure">
                <div class="o-circle__sign"></div>  
            </div> 
            Wrong Date`,
            timer:2000,
            
        })
        $('#tanggal_lahir_reg').val('')
    }else {
        
    }
}

const nama_belakang_check=()=>{
    var nama_belakang = $('#nama_belakang_reg').val()
    if(nama_belakang.length < 3){
        // Swal.fire('Minimum 4 Character', 'Sorry', 'error')
        Swal.fire({
            html:`
            <div class="o-circle c-container__circle o-circle__sign--failure">
                <div class="o-circle__sign"></div>  
            </div> 
            Minimum 4 Character`,
            timer:2000,
            
        })
        $('#nama_belakang_reg').val('')
    }else {
        
    }
}

const no_telp_check=()=>{
    var no_telp = $('#no_telp_reg').val()
    if(no_telp.length <9){
        // Swal.fire('Minimum 10 Character', 'Sorry', 'error')
        Swal.fire({
            html:`
            <div class="o-circle c-container__circle o-circle__sign--failure">
                <div class="o-circle__sign"></div>  
            </div> 
            Minimum 10 Character`,
            timer:2000,
            
        })
        $('#nama_telp_reg').val('')
    }else {
        
    }
}
const no_telp_check2=()=>{
    var no_telp = $('#no_telp_2_reg').val()
    if(no_telp.length <9){
        // Swal.fire('Minimum 10 Character', 'Sorry', 'error')
        Swal.fire({
            html:`
            <div class="o-circle c-container__circle o-circle__sign--failure">
                <div class="o-circle__sign"></div>  
            </div> 
            Minimum 10 Character`,
            timer:2000,
            
        })
        $('#nama_telp_2_reg').val('')
    }else {
        
    }
}

const ktp_check=()=>{
    var ktp = $('#no_ktp_reg').val()
    if(ktp.length == 16){
        
    }else {
        // Swal.fire('KTP 16 Digit', 'Sorry', 'error')
        Swal.fire({
            html:`
            <div class="o-circle c-container__circle o-circle__sign--failure">
                <div class="o-circle__sign"></div>  
            </div> 
            KTP 16 Digit`,
            timer:2000,
            
        })
        $('#no_ktp_reg').val('')
    }
}

// $('.eye-open').on('click',function(){
//     alert('jalan 659')
//     $('#password_reg').attr('type','text')
// })

const find_product=()=>{
    // alert('functionnnn jalan')
   $('#input_product').modal('show')
      
   
}

const login_for_product=()=>{
    $('#login_product').modal('show')
    // $('.box-option-login').addClass('product')
    $('.box-option-login').attr('id','product')
    
}

const login_for_commision=()=>{
    console.log('login for commision jalan')
    $('#newOtpCommision').modal('show')
    $('#newProfileModal').modal('hide')
    $('#new_otp_commision').empty()
    $('#new_otp_password').empty()
    send_otp()
    // $('.box-option-login').attr('id','commision')
}

// $('#search_prod').on('click',function(){
//     alert('function jalan')
// })

// SEND OTP

const send_otp=()=>{
    // alert('kirim otp 1024')
    var token = localStorage.getItem('token')
    console.log(token)
    if(token === null ){
        var email = $('#checking_email_login').val()
        console.log(email)
        axios.post(`https://customers.sold.co.id/get-otp?Email=${email}`)
            .then((res)=>{
                if(res.data){
                    Swal.fire({
                        html:`
                        <div class="o-circle c-container__circle o-circle__sign--success">
                            <div class="o-circle__sign"></div>  
                        </div>   
                        OTP Berhasil Dikirim
                        `,
                        timer:2000,
                        
                    })
                }else {
                    // Swal.fire('OTP Gagal Terkirim', 'Good-Bye', 'error')
                    Swal.fire({
                        html:`
                        <div class="o-circle c-container__circle o-circle__sign--failure">
                            <div class="o-circle__sign"></div>  
                        </div> 
                        OTP Gagal Terikirim`,
                        timer:2000,
                        
                    })
                }
                
            }).catch((err)=>{
                
            })
    }else {
        axios.post(`https://customers.sold.co.id/get-customer-information?Customer_Code=${token}`)
        .then((res)=>{  
            if(res.data){
                var data_customer
                var isCustomer_information = Array.isArray(res.data)
                if(isCustomer_information) {
                    data_customer = res.data[0]
                }else {
                    data_customer = res.data

                }
                axios.post(`https://customers.sold.co.id/get-otp?Email=${data_customer.Email}`)
                .then((res)=>{
                    if(res.data){
                        Swal.fire({
                            html:`
                            <div class="o-circle c-container__circle o-circle__sign--success">
                                <div class="o-circle__sign"></div>  
                            </div>   
                            OTP Berhasil Dikirim
                            `,
                            timer:2000,
                            
                        })
                    }else {
                        // Swal.fire('OTP Gagal Terkirim', 'Good-Bye', 'error')
                        Swal.fire({
                            html:`
                            <div class="o-circle c-container__circle o-circle__sign--failure">
                                <div class="o-circle__sign"></div>  
                            </div> 
                            OTP Gagal Terikirim`,
                            timer:2000,
                            
                        })
                    }
                    
                }).catch((err)=>{
                    
                })
           
            }else {
                Swal.fire({
                    html:`
                    <div class="o-circle c-container__circle o-circle__sign--failure">
                        <div class="o-circle__sign"></div>  
                    </div> 
                    Silahkan Login`,
                    timer:2000,
                })
                setTimeout(()=>{
                    window.parent.$('.iframe').css('display','none')
                    window.parent.$('.force-close-all-command').css('display','none')
                },1500)      
            }
            
        }).catch((err)=>{
    
        })

    }
}




const send_otp_for_logout=()=>{
    // alert('kirim otw')
    var token = localStorage.getItem('token')
    var email = $('#email_forgot').val()
    
    axios.post(`https://customers.sold.co.id/get-customer-information?Customer_Code=${token}`)
    .then((res)=>{  
        
        axios.post(`https://customers.sold.co.id/get-otp?Email=${email}`)
        .then((res)=>{
            if(res.data){
                // Swal.fire('OTP Berhasil Dikirim', 'Good-Bye', 'success')
                Swal.fire({
                    html:`
                    <div class="o-circle c-container__circle o-circle__sign--success">
                        <div class="o-circle__sign"></div>  
                    </div>   
                    OTP Berhasil Dikirim
                    `,
                    timer:2000,
                    
                })
            }else {
                // Swal.fire('OTP Gagal Terkirim', 'Good-Bye', 'error')
                Swal.fire({
                    html:`
                    <div class="o-circle c-container__circle o-circle__sign--failure">
                        <div class="o-circle__sign"></div>  
                    </div> 
                    OTP Gagal Terkirim`,
                    timer:2000,
                    
                })
            }
            
        }).catch((err)=>{
            
        })
    }).catch((err)=>{
        
    })
}

const send_otp_login=()=>{
    var email = $('#checking_email_login').val()
    if(email){
        axios.post(`https://customers.sold.co.id/get-otp?Email=${email}`)
        .then((res)=>{
            if(res.data){
                // Swal.fire('OTP Berhasil Dikirim', 'Good-Bye', 'success')
                // Swal.fire({
                //     html:`
                //     <div class="o-circle c-container__circle o-circle__sign--success">
                //         <div class="o-circle__sign"></div>  
                //     </div>   
                //     OTP Berhasil Dikirim
                //     `,
                //     timer:2000,
                    
                // })
            }else {
                // Swal.fire('OTP Gagal Terkirim', 'Good-Bye', 'error')
                Swal.fire({
                    html:`
                    <div class="o-circle c-container__circle o-circle__sign--failure">
                        <div class="o-circle__sign"></div>  
                    </div> 
                    OTP Gagal Terkirim`,
                    timer:2000,
                    
                })
            }
        }).catch((err)=>{
            
        })

    }else {
        // Swal.fire('Silahkan Masukan Email', 'Good-Bye', 'error')
        Swal.fire({
            html:`
            <div class="o-circle c-container__circle o-circle__sign--failure">
                <div class="o-circle__sign"></div>  
            </div>   
            Silahkan Masukan Email`,
            timer:2000,
            
        })
    }
}

const send_otp_login_prod=()=>{
    var email = $('#email_login_prod').val()
    
    if(email){
        axios.post(`https://customers.sold.co.id/get-otp?Email=${email}`)
        .then((res)=>{
            if(res.data){
                Swal.fire({
                    html:`
                    <div class="o-circle c-container__circle o-circle__sign--success">
                        <div class="o-circle__sign"></div>  
                    </div>   
                    OTP Berhasil Dikirim
                    `,
                    timer:2000,
                    
                })
            }else {
                Swal.fire({
                    html:`
                    <div class="o-circle c-container__circle o-circle__sign--failure">
                        <div class="o-circle__sign"></div>  
                    </div> 
                    OTP Gagal Terkirim`,
                    timer:2000,
                    
                })
            }
        }).catch((err)=>{
            
        })

    }else {
        Swal.fire({
            html:`
            <div class="o-circle c-container__circle o-circle__sign--failure">
                <div class="o-circle__sign"></div>  
            </div>   
            Silahkan Masukan Email`,
            timer:2000,
            
        })
    }
}

const send_otp_register_for_email=()=>{
    var email = $('#email_reg').val()
    var email_supp = $('#email_supp').val()

    axios.post(`https://customers.sold.co.id/check-if-email-is-registered?Email=${email}`)
    .then((res)=>{   
        
        if(email){

            if(res.data == true){
                Swal.fire({
                    html:`
                    <div class="o-circle c-container__circle o-circle__sign--failure">
                        <div class="o-circle__sign"></div>  
                    </div> 
                    OTP Gagal Terkirim, Email Sudah Terdaftar / Salah`,
                    timer:2000,
                })

            }else if (res.data == false){
                axios.post(`https://customers.sold.co.id/get-otp?Email=${email}`)
                .then((res)=>{
                    if(res.data){
                        $('#newOtpRegister').modal('show')
                        // Swal.fire('OTP Berhasil Dikirim', 'Good-Bye', 'success')
                    }else {
                        Swal.fire({
                            html:`
                            <div class="o-circle c-container__circle o-circle__sign--failure">
                                <div class="o-circle__sign"></div>  
                            </div> 
                            OTP Gagal Terkirim, Email Sudah Terdaftar / Salah`,
                            timer:2000,
                            
                        })
                    }
                }).catch((err)=>{
                    
                })
            }
        }else if (email_supp){
            alert('masuk ke else if supp')
            if(res.data == true){
                Swal.fire({
                    html:`
                    <div class="o-circle c-container__circle o-circle__sign--failure">
                        <div class="o-circle__sign"></div>  
                    </div> 
                    OTP Gagal Terkirim, Email Sudah Terdaftar / Salah`,
                    timer:2000,
                })

            }else if (res.data == false){
                
                axios.post(`https://customers.sold.co.id/get-otp?Email=${email_supp}`)
                .then((res)=>{
                    if(res.data){
                        $('#newOtpRegister').modal('show')
                        
                        // Swal.fire('OTP Berhasil Dikirim', 'Good-Bye', 'success')
                    }else {
                        Swal.fire({
                            html:`
                            <div class="o-circle c-container__circle o-circle__sign--failure">
                                <div class="o-circle__sign"></div>  
                            </div> 
                            OTP Gagal Terkirim, Email Sudah Terdaftar / Salah`,
                            timer:2000,
                            
                        })
                    }
                }).catch((err)=>{
                    
                })
            }
        }
        else {
            Swal.fire({
                html:`
                <div class="o-circle c-container__circle o-circle__sign--failure">
                    <div class="o-circle__sign"></div>  
                </div>   
                Silahkan Masukan Email`,
                timer:2000,
                
            })
        }



    }).catch((err)=>{
        
    })
}
// const save_product_name=()=>{
//     alert('simpan jalan')
//     var otp = $('#id_otp').val()
//     var pass = $('#id_pass').val()
//     
// }

function close_information_login(){
    // alert('function jalan')
    $('.box_information_login').css('display','none')

}


const to_term_condition=()=>{
// alert('item jalan')
    $('#term_condition_modals').modal('show')
}

const  about_us=()=>{
    // alert('function jalan')
     $('#about_us').modal('show')
}



// const refresh=()=>{
//     window.location.reload()
// }

const close_toast=()=>{
    $('.toast_prod_information').css('display','none')
}


const choosing_payment_method=(payment,product_id)=>{
    $('.radio_payment_method').removeClass('selected')
    $('.radio_payment_method').removeClass('active_payment_method')

    var payment_id = payment
    var id  = $('.radio_payment_method').attr('id')
    
    
    if(payment_id == id ){
        
        $(`#${payment}`).addClass('selected')
        $(`#${payment}`).addClass('active_payment_method')
    }else {
        
    }
}

const choosing_shipping=(kurir,product_id)=>{
    // alert('function jalan')
        // $(this).parent().find('.radio-delivery-card').removeClass('selected');
        // $(this).parent().find('.radio-delivery-card').removeClass('active_payment_method');
        // $(this).addClass('selected')
        // $(this).addClass('selected')
        axios.post(`https://products.sold.co.id/get-courier-data?Get_All_Couriers=true`)
        .then((res)=>{
            
            var kurir_id = kurir
            $('.radio-delivery-card').removeClass('selected')
            $('.radio-delivery-card').removeClass('active_delivery_method')
            for(var i = 0; i<res.data.length; i++){
                var kurir_looping = `id-kurir-gb-${res.data[i].Courier}`
                
                
                
                if(kurir_looping = kurir_id){
                    // alert('masuk ke if 987')
                    $(`#${kurir_id}`).addClass('selected')
                    $(`#${kurir_id}`).addClass('active_delivery_method')
                    
                    i=res.data.length
                }
            }
    
            var val = $(this).attr('data-value');
            result = val
            
            
            var new_kurir_pilihan = $('.active_delivery_method').attr('data-value')
            
            kurirMethodHome(new_kurir_pilihan,product_id)
        }).catch((err)=>{
            
        })

}  




const filter_item_ul=(e)=> {
    // alert('jalan')
    
    var item_searching = $('#item_ul_card').val()
    var status_searching = $('#searching_option_id_ul').val()
    
    
}

const back_btn=()=>{
    // alert('jalan')
    var find_active = $('.item-left-img-box .img-big-active').attr('id')
    var find_not_active = $('.item-left-img-box .img-big').attr('id')
    
    
    if(find_active == 'img-big-1'){
        
        $(`#${find_active}`).removeClass('img-big-active')
        $(`#${find_active}`).addClass('img-big')
        var img_4 = $('#img-big-4').attr('class')
        var img_4_split = img_4.split(' ')
        // $(`#${find_not_active}`).removeClass('img-big')
        // $(`#${find_not_active}`).addClass('img-big-active')
        
        $('#img-big-4').removeClass('img-big')
        $('#img-big-4').addClass('img-big-active')
        if(img_4_split[1] == 'img-notfound'){
            $('#img-big-2').removeClass('img-big')
            $('#img-big-2').addClass('img-big-active')
        }else if (img_4_split[0] == 'img-notfound'){
            $('#img-big-2').removeClass('img-big')
            $('#img-big-2').addClass('img-big-active')
        }else {
            
        }
       
    }else if (find_active == 'img-big-2'){
        $(`#${find_active}`).removeClass('img-big-active')
        $(`#${find_active}`).addClass('img-big')
        $('#img-big-1').removeClass('img-big')
        $('#img-big-1').addClass('img-big-active')
       
    }else if (find_active == 'img-big-3'){
        $(`#${find_active}`).removeClass('img-big-active')
        $(`#${find_active}`).addClass('img-big')
        $('#img-big-2').removeClass('img-big')
        $('#img-big-2').addClass('img-big-active')   
    }else if (find_active == 'img-big-4'){
        
        $(`#${find_active}`).removeClass('img-big-active')
        $(`#${find_active}`).addClass('img-big')
        var img_3 = $('#img-big-3').attr('class')
        var img_2 = $('#img-big-2').attr('class')
        if(img_3 == 'img-notfound' && img_2 == 'img-notfound'){
            $('#img-big-1').removeClass('img-big')
            $('#img-big-1').addClass('img-big-active')  
        }else if(img_3 == 'img-notfound' && img_2 =='img-big'){
            $('#img-big-2').removeClass('img-big')
            $('#img-big-2').addClass('img-big-active')  
        }else {
            $('#img-big-3').removeClass('img-big')
            $('#img-big-3').addClass('img-big-active')  
        }
        // $(`#${find_not_active}`).removeClass('img-big')
        // $(`#${find_not_active}`).addClass('img-big-active')
        // $('#img-big-1').removeClass('img-big')
        // $('#img-big-1').addClass('img-big-active')   
    }
}
const next_btn=()=>{
    // alert('jalan')
    var find_active = $('.item-left-img-box .img-big-active').attr('id')
    var find_not_active = $('.item-left-img-box .img-big').attr('id')
    
    
    if(find_active == 'img-big-1'){
        $(`#${find_active}`).removeClass('img-big-active')
        $(`#${find_active}`).addClass('img-big')
        $(`#${find_not_active}`).removeClass('img-big')
        $(`#${find_not_active}`).addClass('img-big-active')
        // $('#img-big-2').removeClass('img-big')
        // $('#img-big-2').addClass('img-big-active')
    }else if (find_active == 'img-big-2'){
        $(`#${find_active}`).removeClass('img-big-active')
        $(`#${find_active}`).addClass('img-big')
       
        // $(`#${find_not_active}`).removeClass('img-big')
        // $(`#${find_not_active}`).addClass('img-big-active')
        var img_3 = $('#img-big-3').attr('class')
        var img_4 = $('#img-big-4').attr('class')

        if(img_3 == 'img-notfound' && img_4 == 'img-notfound'){
            $('#img-big-1').removeClass('img-big')
            $('#img-big-1').addClass('img-big-active')

        }else if (img_3 == 'img-notfound' && img_4 == 'img-big'){
            $('#img-big-4').removeClass('img-big')
            $('#img-big-4').addClass('img-big-active')
        }else {
            $('#img-big-1').removeClass('img-big')
            $('#img-big-1').addClass('img-big-active')
        }
        
    }else if (find_active == 'img-big-3'){
        $(`#${find_active}`).removeClass('img-big-active')
        $(`#${find_active}`).addClass('img-big')
        var img_4 = $('#img-big-4').attr('class')
        var img_4_split = img_4.split(' ')
        
        if(img_4_split[1] == 'img-notfound'){
            $('#img-big-1').removeClass('img-big')
            $('#img-big-1').addClass('img-big-active')
        }else if (img_4_split[0] == 'img-notfound'){
            $('#img-big-1').removeClass('img-big')
            $('#img-big-1').addClass('img-big-active')
        }else {
            $('#img-big-1').removeClass('img-big')
            $('#img-big-1').addClass('img-big-active')
        }


        $('#img-big-4').removeClass('img-big')
        $('#img-big-4').addClass('img-big-active')
    }else if (find_active == 'img-big-4'){
        $(`#${find_active}`).removeClass('img-big-active')
        $(`#${find_active}`).addClass('img-big')
        $('#img-big-1').removeClass('img-big')
        $('#img-big-1').addClass('img-big-active')
    }else {
        $('#img-big-1').removeClass('img-big')
        $('#img-big-1').addClass('img-big-active')
    }
}


const open_tab_answer=(result,index)=>{
    // $(`#${result}`).css('display','block')
    $(`#${result}`).toggle(500)
    $(`#icon-minus-id-${index}`).css('display','block')
    $(`#icon-plus-id-${index}`).css('display','none')
}
const close_tab_answer=(result,index)=>{
    // $(`#${result}`).css('display','none')
    $(`#${result}`).toggle(500)
    $(`#icon-minus-id-${index}`).css('display','none')
    $(`#icon-plus-id-${index}`).css('display','block')
}

// const onInputComment=(val)=>{
//     
//     alert('jalan    ')
//     var comment = $('#input_comment_cust').val()
//     
// }



    $('.input_comment_cust').on('keyup',function(){
        var data_comment = $(this).val()
        if(data_comment.length>0){
            $('.btn-send-comment').removeAttr('disabled')
            $('.btn-send-comment').addClass('active_send_comment')
        }else {
            $('.btn-send-comment').prop('disabled',true)
            $('.btn-send-comment').removeClass('active_send_comment')
        }
    })
    const send_comment_cust=(product_id)=>{
        var result_comment = $('.input_comment_cust').val()
        var token = localStorage.getItem('token')

            var data = {
                User_Comments:
                {
                    Customer_Code:token,
                    Comment:result_comment,
                    Product_Code:product_id
                }
            }
        if(result_comment.length>0){
            // axios.post(`https://customers.sold.co.id/update-customer-data-by-user-themselves`,data,{
            //     headers:{
            //         "Content-Type":'application/json'
            //     },
            axios.post(` https://products.sold.co.id/send_user_comment`,data,{
                headers:{
                    "Content-Type":'application/json'
                },
                "data":JSON.stringify({
                    "Customer_Code":data.User_Comments.Customer_Code,
                    "Comments":data.User_Comments.Comment,
                    "Product_Code":data.User_Comments.Product_Code
                })
            }).then((res)=>{
                axios.post(`http://products.sold.co.id/get_user_comment?Product_Code=${product_id}`)
                .then((res)=>{
                    var cust_comment = res.data
                    var comment_parse = JSON.parse(cust_comment.User_Comments)
                    comment_parse.map((val,index)=>{
                        axios.post(`https://customers.sold.co.id/get-customer-information?Customer_Code=${val.Customer_Code}`)
                        .then((res)=>{
                            if(res.data){
                                var data_customer
                                var isCustomer_information = Array.isArray(res.data)
                                if(isCustomer_information) {
                                    data_customer = res.data[0]
                                }else {
                                    data_customer = res.data
                
                                }
                                $('#nav-profile').append(`
                                    <div class="user-card-id">
                                        <div class="user-card-top-id">
                                            <img src="../img/accounts.png" alt="">
                                            <div class="user-card-desc-top-id">
                                                <p>${data_customer.First_Name} ${data_customer.Last_Name}</p>
                                                <p>*****</p>
                                            </div>
                                        </div>
                                        <div class="user-card-bot-id">
                                            <p>${val.Comment}</p>
                                        </div>
                                    </div>
                                `)
                           
                            }else {
                                Swal.fire({
                                    html:`
                                    <div class="o-circle c-container__circle o-circle__sign--failure">
                                        <div class="o-circle__sign"></div>  
                                    </div> 
                                    Silahkan Login`,
                                    timer:2000,
                                })
                                setTimeout(()=>{
                                    window.parent.$('.iframe').css('display','none')
                                    window.parent.$('.force-close-all-command').css('display','none')
                                },1500)      
                            }
                        }).catch((err)=>{
                            
                        })

                    })
                    $('.input_comment_cust').val('')
                }).catch((err)=>{
                    
                })
            }).catch((err)=>{
                
            })
    
        }
    }




// OTP
// $(function() {
//     'use strict';
  
//     var body = $('body');
  
//     function goToNextInput(e) {
//       var key = e.which,
//         t = $(e.target),
//         sib = t.next('input');
//         
//       if (key != 9 && (key < 48 || key > 90) ) {
//         e.preventDefault();
//         return false;
//       }
  
//       if (key === 9) {
//         return true;
//       }
  
//       if (!sib || !sib.length) {
//         sib = body.find('input').eq(0);
//       }
//       sib.select().focus();
//     }
  
//     function onKeyDown(e) {
//       var key = e.which;
  
//       if (key === 9 || (key >= 48 && key <= 90)) {
//         return true;
//       }
  
//       e.preventDefault();
//       return false;
//     }
    
//     function onFocus(e) {
//       $(e.target).select();
//     }
  
//     body.on('keyup', 'input', goToNextInput);
//     body.on('keydown', 'input', onKeyDown);
//     body.on('click', 'input', onFocus);
  
//   })

    const verify_email_register=()=>{
        var email = $('#email_reg').val()
        var otp_1 = $('#otp_reg_1').val()
        var otp_2 = $('#otp_reg_2').val()
        var otp_3 = $('#otp_reg_3').val()
        var otp_4 = $('#otp_reg_4').val()
        var otp_5 = $('#otp_reg_5').val()
        var otp_6 = $('#otp_reg_6').val()
        var otp_7 = $('#otp_reg_7').val()
        var otp_8 = $('#otp_reg_8').val()
        var allOtp = otp_1 + otp_2 + otp_3 + otp_4 + otp_5 + otp_6 + otp_7 + otp_8
        axios.post(`https://customers.sold.co.id/verify-email-address?otp=${allOtp}`)
        .then((res)=>{
            if(res.data){
                Swal.fire({
                    html:`
                    <div class="o-circle c-container__circle o-circle__sign--success">
                        <div class="o-circle__sign"></div>  
                    </div>   
                    Email Bisa Digunakan
                    `,
                    timer:2000,
                    
                })
                $('#otp_reg_1').val('')
                $('#otp_reg_2').val('')
                $('#otp_reg_3').val('')
                $('#otp_reg_4').val('')
                $('#otp_reg_5').val('')
                $('#otp_reg_6').val('')
                $('#otp_reg_7').val('')
                $('#otp_reg_8').val('')
                $('#newOtpRegister').modal('hide')
                
            }else {
                Swal.fire({
                    html:`
                    <div class="o-circle c-container__circle o-circle__sign--failure">
                        <div class="o-circle__sign"></div>  
                    </div> 
                    OTP Salah`,
                    timer:2000,
                    
                })
            }
        }).catch((err)=>{
            
        })

    }
    const verify_email_login=()=>{
        var email = $('#checking_email_login').val()
        var password = $('#checking_password_login').val()
        var otp = $('#new_otp_tokped').val()
        axios.post(`https://customers.sold.co.id/password-generator?Password=${password}`)
    .then((res)=>{
        
        axios.post(`https://customers.sold.co.id/customer-login-request?Email=${email}&Password=${password}&otp=${otp}`
        ).then((res)=>{
            
            if(res.data){
                // swal.fire("Login Berhasil", "", "success");
                Swal.fire({
                    html:`
                    <div class="o-circle c-container__circle o-circle__sign--success">
                        <div class="o-circle__sign"></div>  
                    </div>   
                    Login Berhasil
                    `,
                    timer:2000,
                    
                })
                localStorage.setItem('token',res.data)
                $('#newloginTokpedModal').modal('hide')
                $('#newOtpLogin').modal('hide')
            }else {
                // swal.fire("Login Gagal", "", "info");
                Swal.fire({
                    html:`
                    <div class="o-circle c-container__circle o-circle__sign--failure">
                        <div class="o-circle__sign"></div>  
                    </div> 
                    Login Gagal`,
                    timer:2000,
                    
                })
            }
        }).catch((err)=>{
            
        })
    }).catch((err)=>{
        
    })
        
    }

    const verify_login_commision=()=>{
        var password = $('#new_otp_password').val()
        var otp  = $('#new_otp_commision').val()
        var token = localStorage.getItem('token')
        axios.post(`https://customers.sold.co.id/password-generator?Password=${password}`)
        .then((res)=>{

            var token = localStorage.getItem('token')
            axios.post(`https://customers.sold.co.id/get-customer-information?Customer_Code=${token}`)
            .then((res)=>{  
                if(res.data){
                    var data_customer
                    var isCustomer_information = Array.isArray(res.data)
                    if(isCustomer_information) {
                        data_customer = res.data[0]
                    }else {
                        data_customer = res.data
    
                    }
                    var email = data_customer.Email
                    axios.post(`https://customers.sold.co.id/customer-login-request?Email=${email}&Password=${password}&otp=${otp}`
                    ).then((res)=>{
                        if(res.data){

                            commision_check()
                        }else {
                            // swal.fire("Login Gagal", "", "info");
                            Swal.fire({
                                html:`
                                <div class="o-circle c-container__circle o-circle__sign--failure">
                                    <div class="o-circle__sign"></div>  
                                </div> 
                            Pengisian data ada yang salah`,
                                timer:2000,
                                
                            })
                            
                            // $('.box-option-login').removeClass('commision')
                        }
                    }).catch((err)=>{
                        
                    })
               
                }else {
                    Swal.fire({
                        html:`
                        <div class="o-circle c-container__circle o-circle__sign--failure">
                            <div class="o-circle__sign"></div>  
                        </div> 
                        Silahkan Login`,
                        timer:2000,
                    })
                    setTimeout(()=>{
                        window.parent.$('.iframe').css('display','none')
                        window.parent.$('.force-close-all-command').css('display','none')
                    },1500)      
                }
            }).catch((err)=>{
                console.log(err)
            })
        }).catch((err)=>{
            console.log(err)
        })
    }

    const resend_otp_register=()=>{

    }
    const resend_otp_login=()=>{
        // alert('function kirim ulang jalan')
        send_otp()
    }
//   $(function(){
//     $(".btn-embossed").on('click',function(){
     
//      var data = $('.get_all_otp_register').serialize()
//     //  alert('1492 jalan')
//      
//     });
//    });

   const provinceCheckoutRegister=()=>{
        var province_pilihan = $('.register-provinsi option:selected').val()
        var new_kurir_pilihan = 'tiki'
        var kurir_kode = 'tiki'

        var allProinve = []
        var allKota =[]
        var allDistrict = []
        var allSub_District =[]

        var province =[]
        var kota =[]
        var district = []
        var sub_district = []

        var isProvince_pilihan = false
        var isKota_pilihan = false
        var isDistrict_pilihan = false
        var isSub_District_pilihan = false


        if(province_pilihan == undefined || province_pilihan == 'undefined' || province_pilihan == null || province_pilihan.length == 0 || province_pilihan == 'Provinsi'){
            isProvince_pilihan = false
        }else {
            isProvince_pilihan = true
        }

        if(isProvince_pilihan){
            get_all_province_from_courier(new_kurir_pilihan,kurir_kode).done(function(response){
                province = response[0]
                allProvince = response
                get_all_city_from_courier(new_kurir_pilihan,kurir_kode,province_pilihan).done(function(response){
                    kota= response[0]
                    allKota = response
                    get_all_district_from_courier(new_kurir_pilihan,kurir_kode,kota.City).done(function(response){
                        district = response[0]
                        allDistrict = response
                        get_all_subdistrict_from_courier(new_kurir_pilihan,kurir_kode,district.District).done(function(response){
                            allSub_District = response
                            // $('.register-provinsi').empty()
                            $('.register-kota').empty()
                            $('.register-kecamatan').empty()
                            $('.register-kelurahan').empty()

                            $('.register-kota').append(`
                                <option selected  class="reg-kota"> Kota</option>      
                            `)
                            $('.register-kecamatan').append(`
                                <option selected  class="reg-kecamatan"> Kecamatan</option>      
                            `)
                            $('.register-kelurahan').append(`
                                <option selected  class="reg-kelurahan"> Kelurahan</option>      
                            `)

                            allKota.map((val,index)=>{
                                $('.register-kota').append(`
                                    <option  value="${val.City}" class="reg-kota">${val.City}</option> 
                                `)
                            })
                            allDistrict.map((val,index)=>{
                                $('.register-kecamatan').append(`
                                <option  value="${val.District}" class="reg-kecamatan">${val.District}</option> 
                                `)
                            })
                            allSub_District.map((val,index)=>{
                                $('.register-kelurahan').append(`
                                <option  value="${val.Sub_District}" class="reg-kelurahan">${val.Sub_District}</option> 
                                `)
                            })
                        })
                    })
                })
            })
        }else {
            // render ulang
            re_render_register()
        }
   }

   const  kotaCheckoutRegister=()=>{
    var province_pilihan = $('.register-provinsi option:selected').val()
    var kota_pilihan = $('.register-kota option:selected').val()
    var new_kurir_pilihan = 'tiki'
    var kurir_kode = 'tiki'

    var allProinve = []
    var allKota =[]
    var allDistrict = []
    var allSub_District =[]

    var province =[]
    var kota =[]
    var district = []
    var sub_district = []

    var isProvince_pilihan = false
    var isKota_pilihan = false
    var isDistrict_pilihan = false
    var isSub_District_pilihan = false


    if(province_pilihan == undefined || province_pilihan == 'undefined' || province_pilihan == null || province_pilihan.length == 0 || province_pilihan == 'Provinsi'){
        isProvince_pilihan = false
    }else {
        isProvince_pilihan = true
    }
     if(kota_pilihan == undefined || kota_pilihan == 'undefined' || kota_pilihan == null || kota_pilihan.length == 0 || kota_pilihan == 'Kota'){
        isKota_pilihan = false
    }else {
        isKota_pilihan = true
    }

    if(isProvince_pilihan && isKota_pilihan){
        get_all_province_from_courier(new_kurir_pilihan,kurir_kode).done(function(response){
            province = response[0]
            allProvince = response
            get_all_city_from_courier(new_kurir_pilihan,kurir_kode,province_pilihan).done(function(response){
                kota= response[0]
                allKota = response
                get_all_district_from_courier(new_kurir_pilihan,kurir_kode,kota_pilihan).done(function(response){
                    district = response[0]
                    allDistrict = response
                    get_all_subdistrict_from_courier(new_kurir_pilihan,kurir_kode,district.District).done(function(response){
                        allSub_District = response
                        // $('.register-provinsi').empty()
                        // $('.register-kota').empty()
                        $('.register-kecamatan').empty()
                        $('.register-kelurahan').empty()

                        // $('.register-kota').append(`
                        //     <option selected  class="reg-kota"> Kota</option>      
                        // `)
                        $('.register-kecamatan').append(`
                            <option selected  class="reg-kecamatan"> Kecamatan</option>      
                        `)
                        $('.register-kelurahan').append(`
                            <option selected  class="reg-kelurahan"> Kelurahan</option>      
                        `)

                        // allKota.map((val,index)=>{
                        //     $('.register-kota').append(`
                        //         <option  value="${val.City}" class="reg-kota">${val.City}</option> 
                        //     `)
                        // })
                        allDistrict.map((val,index)=>{
                            $('.register-kecamatan').append(`
                            <option  value="${val.District}" class="reg-kecamatan">${val.District}</option> 
                            `)
                        })
                        allSub_District.map((val,index)=>{
                            $('.register-kelurahan').append(`
                            <option  value="${val.Sub_District}" class="reg-kelurahan">${val.Sub_District}</option> 
                            `)
                        })
                    })
                })
            })
        })
    }else {
        // render ulang
        // alert('masuk ke else')
        re_render_registers()
    }
   }

   const kecamatanCheckoutRegister=()=>{
    var province_pilihan = $('.register-provinsi option:selected').val()
    var kota_pilihan = $('.register-kota option:selected').val()
    var district_pilihan = $('.register-kecamatan option:selected').val()

    var new_kurir_pilihan = 'tiki'
    var kurir_kode = 'tiki'

    var allProinve = []
    var allKota =[]
    var allDistrict = []
    var allSub_District =[]

    var province =[]
    var kota =[]
    var district = []
    var sub_district = []

    var isProvince_pilihan = false
    var isKota_pilihan = false
    var isDistrict_pilihan = false
    var isSub_District_pilihan = false


    if(province_pilihan == undefined || province_pilihan == 'undefined' || province_pilihan == null || province_pilihan.length == 0 || province_pilihan == 'Provinsi'){
        isProvince_pilihan = false
    }else {
        isProvince_pilihan = true
    }
     if(kota_pilihan == undefined || kota_pilihan == 'undefined' || kota_pilihan == null || kota_pilihan.length == 0 || kota_pilihan == 'Kota'){
        isKota_pilihan = false
    }else {
        isKota_pilihan = true
    }
    if(district_pilihan == undefined || district_pilihan == 'undefined' || district_pilihan == null || district_pilihan.length == 0 || district_pilihan == 'Kecamatan'){
        isDistrict_pilihan = false
    }else {
        isDistrict_pilihan = true
    }

    if(isProvince_pilihan && isKota_pilihan && isDistrict_pilihan){
        get_all_province_from_courier(new_kurir_pilihan,kurir_kode).done(function(response){
            province = response[0]
            allProvince = response
            get_all_city_from_courier(new_kurir_pilihan,kurir_kode,province_pilihan).done(function(response){
                kota= response[0]
                allKota = response
                get_all_district_from_courier(new_kurir_pilihan,kurir_kode,kota_pilihan).done(function(response){
                    district = response[0]
                    allDistrict = response
                    get_all_subdistrict_from_courier(new_kurir_pilihan,kurir_kode,district_pilihan).done(function(response){
                        allSub_District = response
                        // $('.register-provinsi').empty()
                        // $('.register-kota').empty()
                        // $('.register-kecamatan').empty()
                        $('.register-kelurahan').empty()

                        // $('.register-kota').append(`
                        //     <option selected  class="reg-kota"> Kota</option>      
                        // `)
                        // $('.register-kecamatan').append(`
                        //     <option selected  class="reg-kecamatan"> Kecamatan</option>      
                        // `)
                        $('.register-kelurahan').append(`
                            <option selected  class="reg-kelurahan"> Kelurahan</option>      
                        `)

                        // allKota.map((val,index)=>{
                        //     $('.register-kota').append(`
                        //         <option  value="${val.City}" class="reg-kota">${val.City}</option> 
                        //     `)
                        // })
                        // allDistrict.map((val,index)=>{
                        //     $('.register-kecamatan').append(`
                        //     <option  value="${val.District}" class="reg-kecamatan">${val.District}</option> 
                        //     `)
                        // })
                        allSub_District.map((val,index)=>{
                            $('.register-kelurahan').append(`
                            <option  value="${val.Sub_District}" class="reg-kelurahan">${val.Sub_District}</option> 
                            `)
                        })
                    })
                })
            })
        })
    }else {
        // render ulang
        // alert('masuk ke else')
        re_render_register()
    }
   }

   const kelurahanCheckoutRegister=()=>{

   }

   const add_to_cart_bulk_order=()=>{
    var id_1 = $('#prod-bo-number-1').val()
    var id_2 = $('#prod-bo-number-2').val()
    var id_3 = $('#prod-bo-number-3').val()
    var id_4 = $('#prod-bo-number-4').val()
    var id_5 = $('#prod-bo-number-5').val()
    var data_keisi = []
    var array_bo = [id_1,id_2,id_3,id_4,id_5]

    array_bo.forEach((val,index)=>{
        if(val !== ''){
            var id = index+1
            var qty_item = $(`#prod-bo-qty-${id}`).val()
            data_keisi.push({"product_name":val,"qty_product":qty_item})
        }
    })
    

    var all_data_storage = JSON.parse(localStorage.getItem('all_data_product'))
    var dataParse = JSON.parse(localStorage.getItem('itemsInCart'))
    var all_filter_from_storage = []
    
    
        if(all_data_storage  !== undefined || all_data_storage  !== null || all_data_storage.length  >0){
           data_keisi.forEach((item,id)=>{
               all_data_storage.filter((value,index)=>{
                    if(item.product_name.toUpperCase().includes(value.Name.toUpperCase())){
                        
                        if(dataParse){ // kalo data storage ada masuk if
                            var filterdatakosong = dataParse.filter((filtering)=>{
                                if(filtering.productNo === value.Product_Code){
                                    return filtering
                                }
                            })
                            if(filterdatakosong.length){
                                var objIndex = dataParse.findIndex((obj => obj.productNo == value.Product_Code));
                                dataParse[objIndex].quantity = dataParse[objIndex].quantity +1
                                $('.cart-counter').text(dataParse.length)
                                // swal.fire("Berhasil Menambahkan Quantity", "", "success");
                                Swal.fire({
                                    html:`
                                    <div class="o-circle c-container__circle o-circle__sign--success">
                                        <div class="o-circle__sign"></div>  
                                    </div>   
                                    Berhasil Menambahkan Quantity
                                    `,
                                    timer:2000,
                                    
                                })
                            }else {
                                var data = {
                                "productNo":value.Product_Code,
                                "quantity":1
                                }
                                dataParse.push(data)
                                $('.cart-counter').text(dataParse.length)
                                // swal.fire("Berhasil Menambahkan ke Cart", "", "success");
                                Swal.fire({
                                    html:`
                                    <div class="o-circle c-container__circle o-circle__sign--success">
                                        <div class="o-circle__sign"></div>  
                                    </div>   
                                    Berhasil Menambahkan ke Cart
                                    `,
                                    timer:2000,
                                    
                                })
                            }   
                        var pushToStorage = JSON.stringify(dataParse)
                        localStorage.setItem('itemsInCart',pushToStorage) 
                    }else { // storage kosong jadi nambahin 1 item
                        var cart = [
                            {
                                "productNo":value.Product_Code,
                                "quantity":1
                            }
                        ]
                        Swal.fire({
                            html:`
                            <div class="o-circle c-container__circle o-circle__sign--success">
                                <div class="o-circle__sign"></div>  
                            </div>   
                            Berhasil Menambahkan Cart
                            `,
                            timer:2000,
                            
                        })
                        var pushToStorage2 = JSON.stringify(cart)
                        localStorage.setItem('itemsInCart',pushToStorage2)
                    }
                    }
               })
           })
        }else {
            
        }
  

   }




const replace_bo_to =(value,id)=>{

    if(id == 'prod-bo-number-1'){ // check input mana yang dipakai
        var id_2 = $('#prod-bo-number-2').val()
        var id_3 = $('#prod-bo-number-3').val()
        var id_4 = $('#prod-bo-number-4').val()
        var id_5 = $('#prod-bo-number-5').val()
        if(value == id_2 ){
            var qty_2 = parseInt($('#prod-bo-qty-2').val())
            var qty_total = qty_2 + 1
            $(`#${id}`).val('')
            $(`#prod-bo-qty-2`).val(qty_total)
        }else if ( value == id_3){
            var qty_3 = parseInt($('#prod-bo-qty-3').val())
            var qty_total = qty_3 + 1
            $(`#${id}`).val('')
            $(`#prod-bo-qty-3`).val(qty_total)
        }else if ( value == id_4){
            var qty_4 = parseInt($('#prod-bo-qty-4').val())
            var qty_total = qty_4 + 1
            $(`#${id}`).val('')
            $(`#prod-bo-qty-4`).val(qty_total)
        }else if ( value == id_5){
            var qty_5 = parseInt($('#prod-bo-qty-5').val())
            var qty_total = qty_5 + 1
            $(`#${id}`).val('')
            $(`#prod-bo-qty-5`).val(qty_total)
        }else {
            $(`#${id}`).val(value)
        }
    }else if (id == 'prod-bo-number-2'){
        var id_1 = $('#prod-bo-number-1').val()
        var id_3 = $('#prod-bo-number-3').val()
        var id_4 = $('#prod-bo-number-4').val()
        var id_5 = $('#prod-bo-number-5').val()
        var qty_2 = parseInt($('#prod-bo-qty-2').val())
        var qty_total = qty_2 +1

        if(value == id_1 ){
            var qty_1 = parseInt($('#prod-bo-qty-1').val())
            var qty_total = qty_1 + 1
            $(`#${id}`).val('')
            $(`#prod-bo-qty-1`).val(qty_total)
        }else if ( value == id_3){
            var qty_3 = parseInt($('#prod-bo-qty-3').val())
            var qty_total = qty_3 + 1
            $(`#${id}`).val('')
            $(`#prod-bo-qty-3`).val(qty_total)
        }else if ( value == id_4){
            var qty_4 = parseInt($('#prod-bo-qty-4').val())
            var qty_total = qty_4 + 1
            $(`#${id}`).val('')
            $(`#prod-bo-qty-4`).val(qty_total)
        }else if ( value == id_5){
            var qty_5 = parseInt($('#prod-bo-qty-5').val())
            var qty_total = qty_5 + 1
            $(`#${id}`).val('')
            $(`#prod-bo-qty-5`).val(qty_total)
        }else {
            $(`#${id}`).val(value)
        }

    }else if (id == 'prod-bo-number-3'){
        var id_1 = $('#prod-bo-number-1').val()
        var id_2 = $('#prod-bo-number-2').val()
        var id_4 = $('#prod-bo-number-4').val()
        var id_5 = $('#prod-bo-number-5').val()
        var qty_2 = parseInt($('#prod-bo-qty-2').val())
        var qty_total = qty_2 +1

        if(value == id_1 ){
            var qty_1 = parseInt($('#prod-bo-qty-1').val())
            var qty_total = qty_1 + 1
            $(`#${id}`).val('')
            $(`#prod-bo-qty-1`).val(qty_total)
        }else if ( value == id_2){
            var qty_2 = parseInt($('#prod-bo-qty-2').val())
            var qty_total = qty_2 + 1
            $(`#${id}`).val('')
            $(`#prod-bo-qty-2`).val(qty_total)
        }else if ( value == id_4){
            var qty_4 = parseInt($('#prod-bo-qty-4').val())
            var qty_total = qty_4 + 1
            $(`#${id}`).val('')
            $(`#prod-bo-qty-4`).val(qty_total)
        }else if ( value == id_5){
            var qty_5 = parseInt($('#prod-bo-qty-5').val())
            var qty_total = qty_5 + 1
            $(`#${id}`).val('')
            $(`#prod-bo-qty-5`).val(qty_total)
        }else {
            $(`#${id}`).val(value)
        }
    }else if (id == 'prod-bo-number-4'){
        var id_1 = $('#prod-bo-number-1').val()
        var id_2 = $('#prod-bo-number-2').val()
        var id_3 = $('#prod-bo-number-3').val()
        var id_5 = $('#prod-bo-number-5').val()
        var qty_2 = parseInt($('#prod-bo-qty-2').val())
        var qty_total = qty_2 +1

        if(value == id_1 ){
            var qty_1 = parseInt($('#prod-bo-qty-1').val())
            var qty_total = qty_1 + 1
            $(`#${id}`).val('')
            $(`#prod-bo-qty-1`).val(qty_total)
        }else if ( value == id_2){
            var qty_2 = parseInt($('#prod-bo-qty-2').val())
            var qty_total = qty_2 + 1
            $(`#${id}`).val('')
            $(`#prod-bo-qty-2`).val(qty_total)
        }else if ( value == id_3){
            var qty_3 = parseInt($('#prod-bo-qty-3').val())
            var qty_total = qty_3 + 1
            $(`#${id}`).val('')
            $(`#prod-bo-qty-3`).val(qty_total)
        }else if ( value == id_5){
            var qty_5 = parseInt($('#prod-bo-qty-5').val())
            var qty_total = qty_5 + 1
            $(`#${id}`).val('')
            $(`#prod-bo-qty-5`).val(qty_total)
        }else {
            $(`#${id}`).val(value)
        }
    }else {
        var id_1 = $('#prod-bo-number-1').val()
        var id_2 = $('#prod-bo-number-2').val()
        var id_3 = $('#prod-bo-number-3').val()
        var id_4 = $('#prod-bo-number-4').val()
        var qty_2 = parseInt($('#prod-bo-qty-2').val())
        var qty_total = qty_2 +1

        if(value == id_1 ){
            var qty_1 = parseInt($('#prod-bo-qty-1').val())
            var qty_total = qty_1 + 1
            $(`#${id}`).val('')
            $(`#prod-bo-qty-1`).val(qty_total)
        }else if ( value == id_2){
            var qty_2 = parseInt($('#prod-bo-qty-2').val())
            var qty_total = qty_2 + 1
            $(`#${id}`).val('')
            $(`#prod-bo-qty-2`).val(qty_total)
        }else if ( value == id_4){
            var qty_4 = parseInt($('#prod-bo-qty-4').val())
            var qty_total = qty_4 + 1
            $(`#${id}`).val('')
            $(`#prod-bo-qty-4`).val(qty_total)
        }else if ( value == id_3){
            var qty_3 = parseInt($('#prod-bo-qty-3').val())
            var qty_total = qty_3 + 1
            $(`#${id}`).val('')
            $(`#prod-bo-qty-3`).val(qty_total)
        }else {
            $(`#${id}`).val(value)
        }
    }


    // 
    // 
    // $(`#${id}`).val(value)
    $('#searching-bo').modal('hide')
}


   $(function(){

    // SEARCHING PRODUCT ITEM BULK ORDER
   $('.inp-prod-bo').on('keyup',function () {
    //    
       var id_dipakai = $(this).attr('id')
       var split_id = id_dipakai.split('-')
    //    
    var all_data_storage = JSON.parse(localStorage.getItem('all_data_product'))
    var value_searching = $(this).val()
    if(value_searching.length > 2){
        if(all_data_storage  !== undefined || all_data_storage  !== null || all_data_storage.length  >0){
            var all_data_push=[]
            var data_filter = all_data_storage.filter((value,index)=>{
                if(value.Name.toUpperCase().includes(value_searching.toUpperCase()) || value.Product_Code.includes(value_searching)){
                    // 
                    all_data_push.push(value)
                    return value
                }
            })
            
            $('.searching-bo-body').empty()
            if(data_filter == undefined || data_filter == null || data_filter.length == 0 ){
                $('.searching-bo-body').append(`
                    Product Code / Product Name Tidak Ada
                `)
            }else {
                data_filter.map((val,index)=>{
                    $('.searching-bo-body').append(`
                        <div class="box-item-bo"  onclick="replace_bo_to('${val.Name}','${id_dipakai}')"> 
                            
                            <img src="${val.Picture_1}" alt="">
                            <p class="p-bo-item">${val.Name} </p>
                        </div>
                    `)
                })

            }
            $('#searching-bo').modal('show')
        }else {
            $('#searching-bo').modal('hide')
        }
    }else {
        $('#searching-bo').modal('hide')
        $(`#prod-bo-qty-${split_id[3]}`).val(1)
    }
   })

//    CHECK QTY PRODUCT ITEM BULK ORDER

   $('.inp-qty-bo').on('keyup',function(){
    var id_dipakai = $(this).attr('id')
    var qty_from_input = $(this).val()
    
    var split_id = id_dipakai.split('-')
    var qty_product_dipakai = parseInt($(`#prod-bo-qty-${split_id[3]}`).val())
    var product_dipakai = $(`#prod-bo-number-${split_id[3]}`).val()
    // 
    // 
    var all_data_storage = JSON.parse(localStorage.getItem('all_data_product'))
        if(product_dipakai  !== '' || product_dipakai !== undefined){
            if(qty_from_input  !== '' || qty_from_input !== undefined || qty_from_input !== NaN ){
                
                if(all_data_storage  !== undefined || all_data_storage  !== null || all_data_storage.length  >0){
                    var filter_product = all_data_storage.filter((val,index)=>{
                        if(val.Name.toUpperCase().includes(product_dipakai.toUpperCase())){
                            var qty_from_storage = parseInt(val.Stock_Quantity)
                            if(qty_product_dipakai <= qty_from_storage){
                                if(qty_from_input >0){
                                    $(`#prod-bo-qty-${split_id[3]}`).val(qty_product_dipakai)
                                }else {
                                    $(`#prod-bo-qty-${split_id[3]}`).val(1)
                                }
                            }else if (qty_from_input == ''){
                                // setInterval(()=>{
                                //     $(`#prod-bo-qty-${split_id[3]}`).val(1)
                                // },5000)
                            }else {
                                Swal.fire({
                                    html:`
                                    <div class="o-circle c-container__circle o-circle__sign--failure">
                                        <div class="o-circle__sign"></div>  
                                    </div> 
                                    Stock Tidak Tersedia`,
                                    timer:2500,
                                    
                                })
                                var maks_qty = qty_from_input -1
                                $(`#prod-bo-qty-${split_id[3]}`).val(maks_qty)
                            }
                        }
                    })
                }else {
                    // else untuk filter by API
                }
            }else {
                $(`#prod-bo-qty-${split_id[3]}`).val(1)
            }
        }else {
            
            $(`#prod-bo-qty-${split_id[3]}`).val(1)
        }
   })


   })


   const tambah_alamat_profile=(maks_alamat)=>{

   }
   const edit_alamat=(index)=>{

   }

   const change_alamat_customer=(customer_name,nomor_hp,alamat,index,status)=>{
       console.log(index)
    //    $('#changeAddressCustomer').modal('show')
        // $('#newProfileModal').modal('hide')
        if(status === 'new'){
            console.log(status)
            $('#changeAddressCustomer').modal('show')
            $('#new_alamat_customer').val(alamat)
            $('#new_nama_customer').val(customer_name)
            $('#new_hp_customer').val(nomor_hp)
            $('.bnab-header').text('Alamat Baru')
            $('.btn-save-ganti-alamat').attr('id',index)
            // console.log($('.ncb-ubah'),'testing')
            console.log(customer_name)
            console.log(alamat)
            console.log(nomor_hp)
            console.log(index)
        }else {
            $('#changeAddressCustomer').modal('show')
            $('#new_alamat_customer').val(alamat)
            $('#new_nama_customer').val(customer_name)
            $('#new_hp_customer').val(nomor_hp)
            $('.bnab-header').text('Ubah Alamat')
            $('.btn-save-ganti-alamat').attr('id',index)
            console.log($('#changeAddressCustomer'),'testing')
            console.log(customer_name)
            console.log(alamat)
            console.log(nomor_hp)
            console.log(index)

        }
   }
   const cancel_ganti_alamat=()=>{
       $('#changeAddressCustomer').modal('hide')
   }

   const tambah_alamat_customer=()=>{
       var token = localStorage.getItem('token')
       axios.post(`https://customers.sold.co.id/get-customer-information?Customer_Code=${token}`)
       .then((res)=>{
        if(res.data){
            var data_customer
            var isCustomer_information = Array.isArray(res.data)
            if(isCustomer_information) {
                data_customer = res.data[0]
            }else {
                data_customer = res.data

            }
            var nama_customer = data_customer.First_Name + ' ' + data_customer.Last_Name
             var limit_alamat  = parseInt(localStorage.getItem('limit_alamat'))
             console.log(limit_alamat)
             if(limit_alamat>0 && limit_alamat <5){
                 var next_limit = limit_alamat+1
                 console.log(next_limit)
                 change_alamat_customer(nama_customer,data_customer.Contact_Number_1,'',next_limit,'new')
             }else {
                 Swal.fire({
                     html:`
                     <div class="o-circle c-container__circle o-circle__sign--failure">
                         <div class="o-circle__sign"></div>  
                     </div> 
                     Alamat Maksimal 5`,
                     timer:2000,
                     
                 })
             }
       
        }else {
            Swal.fire({
                html:`
                <div class="o-circle c-container__circle o-circle__sign--failure">
                    <div class="o-circle__sign"></div>  
                </div> 
                Silahkan Login`,
                timer:2000,
            })
            setTimeout(()=>{
                window.parent.$('.iframe').css('display','none')
                window.parent.$('.force-close-all-command').css('display','none')
            },1500)      
        }
           
       }).catch((err)=>{
           console.log(err)
       })
   }
   
const checking_email_login=()=>{
    // alert('checking email jalan')
    var email = $('#checking_email_login').val()
    if(email){
        $('.tokped-border-login').fadeOut()
        $('.tokped-border-login').css('display','none')
    
        $('.tokped-border-login-2').fadeToggle()
        $('.tokped-border-login-2').css('display','flex')

        $('.email-final-tokped').val(email)
    }
    // $('#newOtpRegister').modal('show')
}

const checking_email_register=()=>{
    var email = $('#checking_email_register').val()
    if(email){
        $('.tokped-border-register').fadeOut()
        $('.tokped-border-register').css('display','none')
    
        $('.tokped-border-register-2').fadeToggle()
        $('.tokped-border-register-2').css('display','flex')

        $('#checking_email_register_2').val(email)
    }
}

const checking_password_login=()=>{
    send_otp_login()
    var email = $('#checking_email_login').val()
    var password = $('#checking_password_login').val()
    console.log(email)
    console.log(password)
    $('#newOtpLogin').modal('show')
}
const ubah_alamat_back_to_login=()=>{
    $('.tokped-border-login-2').fadeOut()
    $('.tokped-border-login-2').css('display','none')

    $('.tokped-border-login').fadeToggle()
    $('.tokped-border-login').css('display','flex')
}
const ubah_alamat_back_to_register=()=>{
    $('.tokped-border-register-2').fadeOut()
    $('.tokped-border-register-2').css('display','none')

    $('.tokped-border-register').fadeToggle()
    $('.tokped-border-register').css('display','flex')
}
const onclick_to_register=()=>{
    $('.tokped-border-login').fadeOut()
    $('.tokped-border-login').css('display','none')

    $('.tokped-border-login-2').fadeOut()
    $('.tokped-border-login-2').css('display','none')

    $('.tokped-border-register').fadeToggle()
    $('.tokped-border-register').css('display','flex')
}
const onclick_to_login=()=>{
    $('.tokped-border-register').fadeOut()
    $('.tokped-border-register').css('display','none')

    $('.tokped-border-register-2').fadeOut()
    $('.tokped-border-register-2').css('display','none')

    $('.tokped-border-login').fadeToggle()
    $('.tokped-border-login').css('display','flex')
}
const encrypt_password=()=>{
    // alert('encrypt pass jalan')
    $('.lihat_pass').css('visibility','hidden')
    $('.encrypt_pass').css('visibility','visible')
    $('#checking_password_register').attr('type','password')
}
const encrypt_password_login=()=>{
    // alert('encrypt pass jalan')
    $('.lihat_pass').css('visibility','hidden')
    $('.encrypt_pass').css('visibility','visible')
    $('#checking_password_login').attr('type','password')
}
const lihat_password=()=>{
    // alert('lihat pass jalan')
    $('.lihat_pass').css('visibility','visible')
    $('.encrypt_pass').css('visibility','hidden')
    $('.lihat_pass').css('left','10px')
    $('#checking_password_register').attr('type','text')
}
const lihat_password_login=()=>{
    // alert('lihat pass jalan')
    $('.lihat_pass').css('visibility','visible')
    $('.encrypt_pass').css('visibility','hidden')
    $('.lihat_pass').css('left','10px')
    $('#checking_password_login').attr('type','text')
}


const final_register_customer=()=>{
    var nama_customer = $('#checking_nama_register').val()
    var email_customer = $('#checking_email_register_2').val()
    var password = $('#checking_password_register').val()
    var no_hp_customer = $('#checking_nohp_register').val()
    var default_address = 'Jl. Dr. Susilo Raya No.C2 RT.1/RW.5 Grogol Kec. Grogol petamburan Kota Jakarta Barat DKI Jakarta'
    var tanggal_lahir = '02/08/1996'
    console.log(nama_customer,email_customer,no_hp_customer)

    axios.post(`https://customers.sold.co.id/password-generator?Password=${password}`)
    .then((res)=>{
        var final_pass = res.data
                 
            axios.post(`https://customers.sold.co.id/get-customer-code`)
        .then((res)=>{
            localStorage.setItem('token',res.data)
            var data = {
                customer_data : {
                   Customer_Code : localStorage.getItem("token"),
                   First_Name : nama_customer,
                   Last_Name : '',
                   User_Password :final_pass,
                   Birthday : tanggal_lahir,
                   Created_Date : "CURRENT_TIMESTAMP()",
                   Last_Login : "CURRENT_TIMESTAMP()",
                   Email : email_customer,
                   Contact_Number_1 : no_hp_customer,
                   Contact_Number_2 : '',
                   Address_1 : default_address,
                   Address_2 : '',
                   Address_3 : '',
                   Address_4 : '',
                   Address_5 : '',
                   Status : "pending",
                   User_Type : "Customer",
                   account_number: '',
                   referral_customer_code: '',
                   ktp:''
               }
           }
            
           console.log(data)
        axios.post(`https://customers.sold.co.id/create-new-customer-direct-from-user`,data,{
            headers:{
                "Content-Type":'application/json'
            },
            "data":JSON.stringify({
                "Customer_Code": data.customer_data.Customer_Code,
                "First_Name": data.customer_data.First_Name,
                "Last_Name": data.customer_data.Last_Name,
                "User_Password": data.customer_data.User_Password,
                "Birthday": data.customer_data.Birthday,
                "Created_Date": data.customer_data.Created_Date,
                "Last_Login": data.customer_data.Last_Login,
                "Email": data.customer_data.Email,
                "Contact_Number_1": data.customer_data.Contact_Number_1,
                "Contact_Number_2": data.customer_data.Contact_Number_2,
                "Address_1": data.customer_data.Address_1,
                "Address_2": data.customer_data.Address_2,
                "Address_3": data.customer_data.Address_3,
                "Address_4": data.customer_data.Address_4,
                "Address_5": data.customer_data.Address_5,
                "Status": data.customer_data.Status,
                "User_Type": data.customer_data.User_Type,
                "ktp":data.customer_data.ktp
            })
        }).then((res)=>{
            console.log(res.data)
            console.log(data)
            
            if(res.data === true){
                
                // swal.fire("Register Berhasil", "", "success");
                Swal.fire({
                    html:`
                    <div class="o-circle c-container__circle o-circle__sign--success">
                        <div class="o-circle__sign"></div>  
                    </div>   
                    Register Berhasil
                    `,
                    timer:2000,
                    
                })
                $('#newloginTokpedModal').modal('hide')
            }else {
                $('#newloginTokpedModal').modal('hide')

                Swal.fire({
                    html:`
                    <div class="o-circle c-container__circle o-circle__sign--failure">
                        <div class="o-circle__sign"></div>  
                    </div> 
                    Register Gagal,Kemungkinan Email Sudah digunakan`,
                    timer:2000,
                    
                })
            }
        }).catch((err)=>{
            
        })

        }).catch((err)=>{
            console.log(err)
        })
    }).catch((err)=>{
        console.log(err)
    })
}


//    $('.inp-prod-bo').on('keyup',function(){
//        
//    })


const onclick_kot_prov_tokped=(province,city)=>{
    console.log(province,city)
    $('#new_kota_prov_customer').val(`${province},${city}`)
    $('.render-kota-kec-alamat').css('display','none')
    $('#new_kel_kec_customer').removeAttr('disabled')
}

const onclick_kel_kec_tokped=(district,sub_district)=>{
    console.log(district,sub_district)
    $('#new_kel_kec_customer').val(`${district},${sub_district}`)
    $('.render-kota-kec-alamat').css('display','none')
    // $('.render-kota-kec-alamat').css('visibility','hidden')
    
}

const open_marketplace=()=>{
    $(this).scrollTop('.modals-marketplace')
    $('.close-button').css('display','block')
    $('.modals-marketplace').css('display','block')
    $('.modals-marketplace').attr('src',`../../WEB/marketplace/link_collection.html`)
    // $('.new-box-category').toggle(500)
    $('.new-box-category').css('display','none')
}


const open_cart_from_profile=()=>{
    $('#newProfileModal').modal('hide')
    if($('.option-3').hasClass('background_grey')){
        $('.option-3').removeClass('background_grey')
        $('.close-button').css('display','none')
    }else {
        $('.option-3').addClass('background_grey')
        $('.close-button').css('display','none')
    }
    cart_requested()
}
const open_bulkorder_from_profile=()=>{
    $('#newProfileModal').modal('hide')
    if($('.option-5').hasClass('background_grey')){
        $('.option-5').removeClass('background_grey')
        // $('.modals-bulk-order').css('display','none')
        $('.close-button').css('display','none')
    }else {
        $('.option-5').addClass('background_grey')
        // $('.modals-bulk-order').css('display','block')
        $('.close-button').css('display','none')
    }
    bulk_order_home(this)
}
const open_orderlist_from_profile=()=>{
    $('#newProfileModal').modal('hide')
    if($('.option-0').hasClass('background_grey')){
        $('.option-0').removeClass('background_grey')
        
        $('.close-button').css('display','none')
    }else {
        $('.option-0').addClass('background_grey')
        
        $('.close-button').css('display','none')
    }
    cek_daftar_hutang(this)
}
// loading blurred js


const open_modal_bantuan=()=>{
    // alert('jalan')
    $('#modal_bantuan').modal('show')
}

const open_dropdown_menu=()=>{

    $('.dropdown_menu_mobile .item_drop_mobile').removeClass('background_grey')
}