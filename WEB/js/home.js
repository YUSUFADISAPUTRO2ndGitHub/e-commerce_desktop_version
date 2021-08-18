



// $('.login-btn').on('click',function(){
//          $("#loginModal").modal("hide");
// })





const on_select_ref=()=>{
    var value = $('.ref-cod').val()
    $('#inp_ref_code').val(value)
    // console.log(value)
}
function forgot_modal_request(){
    $('#loginModal').modal('hide')
}
function cart_requested(x){
    var cartToJson = JSON.parse(localStorage.getItem('itemsInCart'))
    var cartString = localStorage.getItem('itemsInCart')
    var token = localStorage.getItem('token')
    console.log('cart requester jalan')
    if(cartToJson != undefined){ // kalau data cart ada isinya
        if(cartToJson.length != 0){
            console.log('cart requester jalan, masuk ke if')
            axios.post(`http://customers.sold.co.id/save-user-shopping-cart?Customer_Code=${token}&cart=${cartString}`)
            .then((res)=>{
                console.log(res.data)
                if(res.data){
                    console.log('data ada, aman')
                }else {
                    console.log('customer code / cart bermasalah')
                }
            }).catch((err)=>{
                console.log(err)
            })
        }else {  // get cart
            console.log('cart requester jalan',' masuk ke if else')
            axios.post(`http://customers.sold.co.id/get-saved-user-shopping?Customer_Code=${token}`)
            .then((res)=>{
                console.log(res.data)
                if(res.data != undefined){
                    var data_stringify = JSON.stringify(res.data)
                    localStorage.setItem("itemsInCart", data_stringify);
                    console.log(localStorage.getItem('itemsInCart'))
                }
            }).catch((err)=>{
                console.log(err)
            })
        }
    }else {
        console.log('masuk lien 42')
        var emptyArray = [];
        var emptyArrayString = JSON.stringify(emptyArray);
        localStorage.setItem("itemsInCart", emptyArrayString);
    }

    checkboxCounter = 0;
    var requestArrayForItemsToCheckout = [];
    var productToBeAddedStringify = JSON.stringify(requestArrayForItemsToCheckout);
    localStorage.setItem("itemsToCheckout", productToBeAddedStringify);
    console.log("localStorage.getItem(\"itemsToCheckout\") " + localStorage.getItem("itemsToCheckout"));



    $('.close-button').css('display','block')
    
    $('.close').css('display','none')
    // console.log(x)
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
        console.log(res.data)
        if(res.data){
            $(".modals-live-chat").attr("src", `http://147.139.168.202:3045/?user_name=${res.data.First_Name}`);
        }else {
            $(".modals-live-chat").attr("src", `http://147.139.168.202:3045`);
        }
        // $('.modals-live-chat').attr('src','https://tawk.to/chat/60f103efd6e7610a49ab8521/1famneoj8')
    }).catch((err)=>{
        console.log(err)
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
    // console.log(x)
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
   
    
        
        
    
    console.log($('.modals-hutang-home').css('display'))
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
            total_percent = '3%'
        }else if ( res.data.extra_column_3 === '7.5%'){
            percent = 0.075
            total_percent = '7.5%'
        }

         // CUSTOMER TOTAL COMMISION THIS MONTH
        axios.post(`http://customers.sold.co.id/get-sales-order-which-referral-code-customer?referral_customer_code=${token}&&given_date=${thismonth}`)
        .then((res)=>{
            console.log(res.data)
            console.log(res.data[0].Total_Price)
            console.log(percent)
            console.log(thismonth)
            // if(res.data.length === 1){
            //     var total_commision = res.data[0].Total_Price * percent
            //     $('.commision_this_month').val(total_commision)

            // }else {

            // }
            var total_commision=0
            res.data.map((val,index)=>{
                var tot_price = parseInt(val.Total_Price)
                console.log(parseInt(val.Total_Price) * percent)
                total_commision +=tot_price * percent
            })
                $('.commision_this_month').val(total_commision)
            console.log(total_commision)
            // Total_Price
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
        console.log(ary)
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
//       console.log(scrolled)

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
    //     console.log(scroll)
    //     // Do something
    // });
    
// SCROLLING ITEM





 var scrollNextPromo = 0   
 var scrollNextNew = 0   
 var scrollNextAll = 0 
 var scrollNextTop = 0
 var scrollNextBot = 0  
 
const nextItem=(id)=>{
    console.log(id)
    // var jenis = $('.next-promo').attr("id")
    
    if(id === 'promo'){
        scrollNextPromo += 255
         horizontalNavigationPromo(scrollNextPromo, event);
        //  $('.promo_card').css('display','none')
        $('.promo_card').hide(1000)
        console.log(id)
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
    console.log(id)
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
        console.log(id, ' ini id back')
    }else if (id === 'new'){
        scrollNextNew -= 350
       horizontalNavigationNew(scrollNextNew, event);
    }else  if(id === 'all'){
        scrollNextAll -= 350
       horizontalNavigationAll(scrollNextAll, event);
    }else if (id == 'back_top' ){
        console.log(scrollNextTop)
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
//         console.log(jenis, ' ini jenis back')
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

function horizontalNavigationTop(position, event) {
    console.log('jalan')
   $('.top-all-category').animate({scrollLeft: position}, 350);
   event.preventDefault();
}

function horizontalNavigationBot(position, event) {
    console.log('jalan')
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

        console.log(res.data)
        var tanggalAwalBuat = res.data.Created_Date
        console.log(res.data.extra_column_3)
        if(res.data.extra_column_3 === '3%'){
            percent = 0.03
            total_percent = '3%'
        }else if ( res.data.extra_column_3 === '7.5%'){
            percent = 0.075
            total_percent = '7.5%'
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
        console.log(err)
    })
         
    }).catch((err)=>{
        console.log(err)
    })



    

}


// REGISTER CROSSCHECK DATA

const register_email_check=()=>{
    var email = $('#email_reg').val()

        console.log(email)   
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        var valid_email = re.test(email)
        if(valid_email){
            console.log('email bner')
        }else {
            Swal.fire('Wrong Email', 'Sorry', 'error')
            $('#email_reg').val('')
        }
        console.log(valid_email)
    
}

const supp_email_check=()=>{
    var email = $('#email_supp').val()

        console.log(email)   
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        var valid_email = re.test(email)
        if(valid_email){
            console.log('email bner')
        }else {
            Swal.fire('Wrong Email', 'Sorry', 'error')
            $('#email_supp').val('')
        }
        console.log(valid_email)
}

const tahun_lahir_check=()=>{
    var d = new Date();
    var year = d.getFullYear();
    console.log(year)
    var tahun = $('#tahun_lahir_reg').val()
    if(tahun > year  || tahun < 1900){
        Swal.fire('Wrong year', 'Sorry', 'error')
        $('#tahun_lahir_reg').val('')
    } else {
        console.log(' year aman')
    }
}

const password_check=()=>{
    var password = $('#password_reg').val()
    if(password.length < 5){
        Swal.fire('Wrong Password', 'Sorry', 'error')
        $('#password_reg').val('')
    }else {
        console.log('password aman')
    }
}
const supp_password_check=()=>{
    var password = $('#password_supp').val()
    if(password.length < 5){
        Swal.fire('Wrong Password', 'Sorry', 'error')
        $('#password_supp').val('')
    }else {
        console.log('password aman')
    }
}

const bulan_lahir_check=()=>{
    var bulan =parseInt($('#bulan_lahir_reg').val())
    console.log(bulan)
    console.log(typeof bulan)
    if(bulan>10 && bulan <= 12){// buat bulan 11 - 12
        // alert('masuk bulan 11/ 12')
    }else if (bulan >10){
        Swal.fire('Wrong Month', 'Sorry', 'error')
        $('#bulan_lahir_reg').val('')

    }else if (bulan>0 && bulan <10){  
        var new_bulan = "0"+bulan
        $('#bulan_lahir_reg').val(new_bulan)
        console.log(new_bulan)        
    }
}

const nama_depan_check=()=>{
    var nama_depan = $('#nama_depan_reg').val()
    if(nama_depan.length < 3){
        Swal.fire('Minimum 4 Character', 'Sorry', 'error')
        $('#nama_depan_reg').val('')
    }else {
        console.log('nama depan aman')
    }
}

const tanggal_lahir_check=()=>{
    var tanggal_lahir = $('#tanggal_lahir_reg').val()
    if(tanggal_lahir < 0 || tanggal_lahir > 31){
        Swal.fire('Wrong Date', 'Sorry', 'error')
        $('#tanggal_lahir_reg').val('')
    }else {
        console.log('tahun aman')
    }
}

const nama_belakang_check=()=>{
    var nama_belakang = $('#nama_belakang_reg').val()
    if(nama_belakang.length < 3){
        Swal.fire('Minimum 4 Character', 'Sorry', 'error')
        $('#nama_belakang_reg').val('')
    }else {
        console.log('nama depan aman')
    }
}

const no_telp_check=()=>{
    var no_telp = $('#no_telp_reg').val()
    if(no_telp.length <9){
        Swal.fire('Minimum 10 Character', 'Sorry', 'error')
        $('#nama_telp_reg').val('')
    }else {
        console.log('notelp aman')
    }
}
const no_telp_check2=()=>{
    var no_telp = $('#no_telp_2_reg').val()
    if(no_telp.length <9){
        Swal.fire('Minimum 10 Character', 'Sorry', 'error')
        $('#nama_telp_2_reg').val('')
    }else {
        console.log('notelp aman')
    }
}

const ktp_check=()=>{
    var ktp = $('#no_ktp_reg').val()
    if(ktp.length == 16){
        console.log('aman')
    }else {
        Swal.fire('KTP 16 Digit', 'Sorry', 'error')
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
        console.log(res.data)
        axios.post(`http://customers.sold.co.id/get-otp?Email=${res.data.Email}`)
        .then((res)=>{
            if(res.data){
                Swal.fire('OTP Berhasil Dikirim', 'Good-Bye', 'success')
            }else {
                Swal.fire('OTP Gagal Terkirim', 'Good-Bye', 'error')
            }
            console.log(res.data, 'berhasil kirim kayanya')
        }).catch((err)=>{
            console.log(err)
        })
    }).catch((err)=>{
        console.log(err)
    })
}


const send_otp_for_logout=()=>{
    // alert('kirim otw')
    var token = localStorage.getItem('token')
    var email = $('#email_forgot').val()
    console.log(email)
    axios.post(`http://customers.sold.co.id/get-customer-information?Customer_Code=${token}`)
    .then((res)=>{  
        console.log(res.data)
        axios.post(`http://customers.sold.co.id/get-otp?Email=${email}`)
        .then((res)=>{
            if(res.data){
                Swal.fire('OTP Berhasil Dikirim', 'Good-Bye', 'success')
            }else {
                Swal.fire('OTP Gagal Terkirim', 'Good-Bye', 'error')
            }
            console.log(res.data, 'berhasil kirim kayanya')
        }).catch((err)=>{
            console.log(err)
        })
    }).catch((err)=>{
        console.log(err)
    })
}

const send_otp_login=()=>{
    var email = $('#email_login').val()
    console.log(email)
    if(email){
        axios.post(`http://customers.sold.co.id/get-otp?Email=${email}`)
        .then((res)=>{
            if(res.data){
                Swal.fire('OTP Berhasil Dikirim', 'Good-Bye', 'success')
            }else {
                Swal.fire('OTP Gagal Terkirim', 'Good-Bye', 'error')
            }
        }).catch((err)=>{
            console.log(err)
        })

    }else {
        Swal.fire('Silahkan Masukan Email', 'Good-Bye', 'error')
    }
}

const send_otp_login_prod=()=>{
    var email = $('#email_login_prod').val()
    console.log(email)
    if(email){
        axios.post(`http://customers.sold.co.id/get-otp?Email=${email}`)
        .then((res)=>{
            if(res.data){
                Swal.fire('OTP Berhasil Dikirim', 'Good-Bye', 'success')
            }else {
                Swal.fire('OTP Gagal Terkirim', 'Good-Bye', 'error')
            }
        }).catch((err)=>{
            console.log(err)
        })

    }else {
        Swal.fire('Silahkan Masukan Email', 'Good-Bye', 'error')
    }
}
// const save_product_name=()=>{
//     alert('simpan jalan')
//     var otp = $('#id_otp').val()
//     var pass = $('#id_pass').val()
//     console.log(otp,pass)
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
    console.log(id,' ini id choosing payment')
    console.log(payment_id ,' ini payment id')
    if(payment_id == id ){
        console.log('masuk ke if')
        $(`#${payment}`).addClass('selected')
        $(`#${payment}`).addClass('active_payment_method')
    }else {
        console.log('masuk ke else')
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
            console.log(res.data)
            var kurir_id = kurir
            $('.radio-delivery-card').removeClass('selected')
            $('.radio-delivery-card').removeClass('active_delivery_method')
            for(var i = 0; i<res.data.length; i++){
                var kurir_looping = `id-kurir-gb-${res.data[i].Courier}`
                console.log(kurir_looping, ' kurir looping')
                console.log(kurir_looping == kurir_id, ' persamaan', kurir_looping , kurir_id)
                
                if(kurir_looping = kurir_id){
                    // alert('masuk ke if 987')
                    $(`#${kurir_id}`).addClass('selected')
                    $(`#${kurir_id}`).addClass('active_delivery_method')
                    console.log($(`#${kurir_id}`))
                    i=res.data.length
                }
            }

            
            
        //     var id = $('.radio-delivery-card').attr('id')
        //     console.log(id,' ini id 983')
        //     console.log(kurir_id,' ini id 983')
         
        // console.log(id == kurir_id, ' 941 sama gak neh alig')
        //     if(id == kurir_id){
        //         console.log('masuk ke if 943')
                
        //     }
            
            
            // $(this).addClass('selected');
            // $(this).attr('id','testing_id_kurir')
            // $(this).addClass('active_payment_method');
            console.log(this)
    
            var val = $(this).attr('data-value');
            result = val
            var class_payment = $(this)
            console.log(class_payment)
            var new_kurir_pilihan = $('.active_delivery_method').attr('data-value')
            console.log(new_kurir_pilihan)
            kurirMethodHome(new_kurir_pilihan,product_id)
        }).catch((err)=>{
            console.log(err)
        })

}  




const filter_item_ul=(e)=> {
    alert('jalan')
    console.log(event.target.value)
    var item_searching = $('#item_ul_card').val()
    var status_searching = $('#searching_option_id_ul').val()
    console.log(item_searching)
    console.log(status_searching)
}

