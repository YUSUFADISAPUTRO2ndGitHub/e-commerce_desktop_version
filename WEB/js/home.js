



// $('.login-btn').on('click',function(){
//          $("#loginModal").modal("hide");
// })





const on_select_ref=()=>{
    var value = $('.ref-cod').val()
    $('#inp_ref_code').val(value)
    // 
}
function forgot_modal_request(){
    $('#loginModal').modal('hide')
}
function cart_requested(x){
    var cartToJson = JSON.parse(localStorage.getItem('itemsInCart'))
    var cartString = localStorage.getItem('itemsInCart')
    var token = localStorage.getItem('token')
    
    if(cartToJson != undefined){ // kalau data cart ada isinya
        if(cartToJson.length != 0){
            
            axios.post(`http://customers.sold.co.id/save-user-shopping-cart?Customer_Code=${token}&cart=${cartString}`)
            .then((res)=>{
                
                if(res.data){
                    
                }else {
                    
                }
            }).catch((err)=>{
                
            })
        }else {  // get cart
            
            axios.post(`http://customers.sold.co.id/get-saved-user-shopping?Customer_Code=${token}`)
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
    }else{
        $(x).addClass("background_grey");
    }
    $(".iframe").toggle();
    // $('.iframe').css('display','block')
    $('.modals-pengiriman').css("display",'none')
    $('.modals-check-harga').css("display",'none')
    $('.option-1').removeClass('background_grey')
    $('.option-2').removeClass('background_grey')
    $('.option-0').removeClass('background_grey')
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
    axios.post(`http://customers.sold.co.id/get-customer-information?Customer_Code=${token}`)
    .then((res)=>{
        
        if(res.data){
            $(".modals-live-chat").attr("src", `http://147.139.168.202:3045/?user_name=${res.data.First_Name}`);
        }else {
            $(".modals-live-chat").attr("src", `http://147.139.168.202:3045`);
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

function cek_daftar_hutang(x){
    // alert('function jalan')
    // 
    var token = localStorage.getItem('token')
    // var data_customer;
    $('.close-button').css('display','block')
    $('.close').css('display','none') 
    if($(x).hasClass("background_grey")){
        $(x).removeClass("background_grey");
        $('.modals-hutang-home').css('display','none')
    }else{
        $(x).addClass("background_grey");
        $('.modals-hutang-home').css('display','block')
    }
    if($(x).hasClass('close-button')){
        // alert('masuk ke line 72')
        $('.close-button').css('display','none')
    }
   
    
        
        
    
    
    // $(".modals-hutang-home").toggle();
    $(".modals-hutang-home").attr("src", `./Iframe/unpaidList.html?list_hutang=${token}`);


    // ngilangin block abu abu pas di klik
    $('.option-2').removeClass('background_grey')
    $('.option-3').removeClass('background_grey')
    $('.option-1').removeClass('background_grey')

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
    axios.post(`http://customers.sold.co.id/get-total-active-customers-of-a-referral-code?Customer_Code=${token}`)
    .then((res)=>{
        
        $('.total_cust_make_purchase').val(res.data[0].total_active_customers)
    }).catch((err)=>{
        
    })

    // TOTAL ACTIVE CUSTOMER
    axios.post(`http://customers.sold.co.id/get-total-customers-of-a-referral-code?Customer_Code=${token}`)
    .then((res)=>{
        
        $('.total_cust_with_referral').val(res.data[0].Total_Customers)
    }).catch((err)=>{
        
    })

    // CUSTOMER INFORMATION  FOR TOTAL COMMISION
    axios.post(`http://customers.sold.co.id/get-customer-information?Customer_Code=${token}`)
    .then((res)=>{
        
        var tanggalAwalBuat = res.data.Created_Date
        
        if(res.data.extra_column_3 === '3%'){
            percent = 0.03
            total_percent = '3%'
        }else if ( res.data.extra_column_3 === '7.5%'){
            percent = 0.075
            total_percent = '7.5%'
        }

         // CUSTOMER TOTAL COMMISION THIS MONTH
        axios.post(`http://customers.sold.co.id/get-sales-order-which-referral-code-customer?referral_customer_code=${token}&&given_date=${thismonth}`)
        .then((res)=>{
            
            
            
            
            // if(res.data.length === 1){
            //     var total_commision = res.data[0].Total_Price * percent
            //     $('.commision_this_month').val(total_commision)

            // }else {

            // }
            var total_commision=0
            res.data.map((val,index)=>{
                var tot_price = parseInt(val.Total_Price)
                
                total_commision +=tot_price * percent
            })
                $('.commision_this_month').val(total_commision)
            
            // Total_Price
        }).catch((err)=>{
            
        })

        axios.post(`http://customers.sold.co.id/get-total-commission-of-all-months-gross?Customer_Code=${token}`)
        .then((res)=>{
            
            
            var total_commision = parseInt(res.data[0].Total_Price) * percent
            $('.total_commision').val(total_commision)
        }).catch((err)=>{
            
        })

          // DATA UNTUK RENDER TABLE

          axios.post(`http://customers.sold.co.id/get-sales-order-which-referral-code-customer?referral_customer_code=${token}&&given_date=${newdate}`)
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
    $('#profileModal').modal('hide')
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
    axios.post(`http://customers.sold.co.id/get-customer-information?Customer_Code=${token}`)
    .then((res)=>{

        
        var tanggalAwalBuat = res.data.Created_Date
        
        if(res.data.extra_column_3 === '3%'){
            percent = 0.03
            total_percent = '3%'
        }else if ( res.data.extra_column_3 === '7.5%'){
            percent = 0.075
            total_percent = '7.5%'
        }

        axios.post(`http://customers.sold.co.id/get-sales-order-which-referral-code-customer?referral_customer_code=${token}&&given_date=${tanggal}`)
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
            Wrong Password`,
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
    $('#login_product').modal('show')
    $('.box-option-login').attr('id','commision')
}

// $('#search_prod').on('click',function(){
//     alert('function jalan')
// })

// SEND OTP

const send_otp=()=>{
    // alert('kirim otw')
    var token = localStorage.getItem('token')
    axios.post(`http://customers.sold.co.id/get-customer-information?Customer_Code=${token}`)
    .then((res)=>{  
        
        axios.post(`http://customers.sold.co.id/get-otp?Email=${res.data.Email}`)
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
    }).catch((err)=>{
        
    })
}


const send_otp_for_logout=()=>{
    // alert('kirim otw')
    var token = localStorage.getItem('token')
    var email = $('#email_forgot').val()
    
    axios.post(`http://customers.sold.co.id/get-customer-information?Customer_Code=${token}`)
    .then((res)=>{  
        
        axios.post(`http://customers.sold.co.id/get-otp?Email=${email}`)
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
    var email = $('#email_login').val()
    console.log(email)
    if(email){
        axios.post(`http://customers.sold.co.id/get-otp?Email=${email}`)
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
        axios.post(`http://customers.sold.co.id/get-otp?Email=${email}`)
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
    if(email){
        axios.post(`http://customers.sold.co.id/get-otp?Email=${email}`)
        .then((res)=>{
            if(res.data){
                $('#newOtpRegister').modal('show')
                console.log($('#newOtpRegister').modal('show'))
                // Swal.fire('OTP Berhasil Dikirim', 'Good-Bye', 'success')
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
const refresh=()=>{
    window.location.reload()
}

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
        axios.post(`http://products.sold.co.id/get-courier-data?Get_All_Couriers=true`)
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

            
            
        //     var id = $('.radio-delivery-card').attr('id')
        //     
        //     
         
        // 
        //     if(id == kurir_id){
        //         
                
        //     }
            
            
            // $(this).addClass('selected');
            // $(this).attr('id','testing_id_kurir')
            // $(this).addClass('active_payment_method');
            
    
            var val = $(this).attr('data-value');
            result = val
            var class_payment = $(this)
            
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
    
    if(find_active == 'img-big-1'){
        $(`#${find_active}`).removeClass('img-big-active')
        $(`#${find_active}`).addClass('img-big')
        $('#img-big-3').removeClass('img-big')
        $('#img-big-3').addClass('img-big-active')
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
    }
}
const next_btn=()=>{
    // alert('jalan')
    var find_active = $('.item-left-img-box .img-big-active').attr('id')
    
    if(find_active == 'img-big-1'){
        $(`#${find_active}`).removeClass('img-big-active')
        $(`#${find_active}`).addClass('img-big')
        $('#img-big-2').removeClass('img-big')
        $('#img-big-2').addClass('img-big-active')
    }else if (find_active == 'img-big-2'){
        $(`#${find_active}`).removeClass('img-big-active')
        $(`#${find_active}`).addClass('img-big')
        $('#img-big-3').removeClass('img-big')
        $('#img-big-3').addClass('img-big-active')
    }else if (find_active == 'img-big-3'){
        $(`#${find_active}`).removeClass('img-big-active')
        $(`#${find_active}`).addClass('img-big')
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
//     console.log(val)
//     alert('jalan    ')
//     var comment = $('#input_comment_cust').val()
//     console.log(comment)
// }


    $('.modals-product-detail').on('load',function(){
        // write your code here
        console.log('1108 jalan')
        
        
    })
    $('.input_comment_cust').on('keyup',function(){
        var data_comment = $(this).val()
        console.log(data_comment)
        if(data_comment.length>0){
            $('.btn-send-comment').removeAttr('disabled')
            $('.btn-send-comment').addClass('active_send_comment')
        }else {
            $('.btn-send-comment').prop('disabled',true)
            $('.btn-send-comment').removeClass('active_send_comment')
        }
    })
    const send_comment_cust=(product_id)=>{
        console.log(product_id,'1124')
        var result_comment = $('.input_comment_cust').val()
        var token = localStorage.getItem('token')
        // {
            // }
            // var product_id = '84818039900005'
            var data = {
                User_Comments:
                {
                    Customer_Code:token,
                    Comment:result_comment,
                    Product_Code:product_id
                }
            }
        if(result_comment.length>0){
            // axios.post(`http://customers.sold.co.id/update-customer-data-by-user-themselves`,data,{
            //     headers:{
            //         "Content-Type":'application/json'
            //     },
            axios.post(` http://products.sold.co.id/send_user_comment`,data,{
                headers:{
                    "Content-Type":'application/json'
                },
                "data":JSON.stringify({
                    "Customer_Code":data.User_Comments.Customer_Code,
                    "Comments":data.User_Comments.Comment,
                    "Product_Code":data.User_Comments.Product_Code
                })
            }).then((res)=>{
                console.log(data)
                console.log(res.data)
                axios.post(`http://products.sold.co.id/get_user_comment?Product_Code=${product_id}`)
                .then((res)=>{
                    var cust_comment = res.data
                    console.log(cust_comment)
                    var comment_parse = JSON.parse(cust_comment.User_Comments)
                    comment_parse.map((val,index)=>{
                        console.log(val)
                        axios.post(`http://customers.sold.co.id/get-customer-information?Customer_Code=${val.Customer_Code}`)
                        .then((res)=>{
                            console.log(res.data)
                            $('#nav-profile').append(`
                            <div class="user-card-id">
                                <div class="user-card-top-id">
                                    <img src="../img/accounts.png" alt="">
                                    <div class="user-card-desc-top-id">
                                        <p>${res.data.First_Name} ${res.data.Last_Name}</p>
                                        <p>*****</p>
                                    </div>
                                </div>
                                <div class="user-card-bot-id">
                                    <p>${val.Comment}</p>
                                </div>
                            </div>
                            `)
                        }).catch((err)=>{
                            console.log(err)
                        })

                    })
                    $('.input_comment_cust').val('')
                }).catch((err)=>{
                    console.log(err)
                })
            }).catch((err)=>{
                console.log(err)
            })
    
        }
    }




// OTP
$(function() {
    'use strict';
  
    var body = $('body');
  
    function goToNextInput(e) {
      var key = e.which,
        t = $(e.target),
        sib = t.next('input');
        console.log(key)
      if (key != 9 && (key < 48 || key > 90) ) {
        e.preventDefault();
        return false;
      }
  
      if (key === 9) {
        return true;
      }
  
      if (!sib || !sib.length) {
        sib = body.find('input').eq(0);
      }
      sib.select().focus();
    }
  
    function onKeyDown(e) {
      var key = e.which;
  
      if (key === 9 || (key >= 48 && key <= 90)) {
        return true;
      }
  
      e.preventDefault();
      return false;
    }
    
    function onFocus(e) {
      $(e.target).select();
    }
  
    body.on('keyup', 'input', goToNextInput);
    body.on('keydown', 'input', onKeyDown);
    body.on('click', 'input', onFocus);
  
  })

  $(function(){
    $(".btn-embossed").on('click',function(){
     
     var data = $('.get_all_otp_register').serialize()
    //  alert('1492 jalan')
     console.log($('.get_all_otp_register').serialize())
     var otp_1 = $('#otp_reg_1').val()
     var otp_2 = $('#otp_reg_2').val()
     var otp_3 = $('#otp_reg_3').val()
     var otp_4 = $('#otp_reg_4').val()
     var otp_5 = $('#otp_reg_5').val()
     var otp_6 = $('#otp_reg_6').val()
     var allOtp = otp_1 + otp_2 + otp_3 + otp_4 + otp_5 + otp_6
     console.log(allOtp)
    });
   });

   