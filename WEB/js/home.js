



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
    }).catch((err)=>{
        console.log(err)
    })
}
function close_live_chat(){
    $('.modals-live-chat').css('display','none')
    $('.box-icon-lc').css('display','none')
    $('.box-product').css('display','block')
    $('.category-menu').css('display','block')

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
                                    <p class="on_commision"> ${val.Order_Number}</p> 
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
    var order_number = $('.on_commision').text()
    var total_quantity = $('.tq_commision').text()
    var total_price = $('.tp_commision').text()
    var percent = $('.percent_commision').text()
    var untung = $('.untung_commision').text()

    console.log(order_number)
    console.log(total_quantity)
    console.log(total_price)
    console.log(percent)
    console.log(untung)

    var testing_array = []
    var push_to_arr = [
        order_number,
        total_quantity,
        total_price,
        percent,
        untung
    ]
    var push_to_arr2 = {
        "Order_Number": order_number,
        "Total_Quantity": total_quantity,
        "Total_Price" : total_price,
        "Percent" : percent,
        "Keuntungan" : untung
    }
    testing_array.push(push_to_arr)



    
    // var test_array = [["name1", 2, 3], ["name2", 4, 5], ["name3", 6, 7], ["name4", 8, 9], ["name5", 10, 11]];
	// var fname = "IJGResults";

	var csvContent = "data:text/csv;charset=utf-8,";
	// $("#pressme").click(function(){
		testing_array.forEach(function(infoArray, index){
			dataString = infoArray.join(",");
			csvContent += index < infoArray.length ? dataString+ "\n" : dataString;
		});

		var encodedUri = encodeURI(csvContent);
		window.open(encodedUri);
	// });


    // testing
    //  var csv = 'Name,Title\n';
    //  data.forEach(function(row) {
    //          csv += row.join(',');
    //          csv += "\n";
    //  });
  
    //  console.log(csv);
    //  var hiddenElement = document.createElement('a');
    //  hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
    //  hiddenElement.target = '_blank';
    //  hiddenElement.download = 'people.csv';
    //  hiddenElement.click();
 }

//  SCROLL KATEGORI
 var isHome = true
 var setIsScroll = false
 var element = document.getElementsByClassName("main-structure")
    document.addEventListener("scroll", e => {
      let scrolled = document.scrollingElement.scrollTop
      console.log(scrolled)
    //   console.log('309')
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

    // $($('.main-structure')).scroll(function (event) {
    //     var scroll = $('.main-structure').scrollTop();
    //     console.log(scroll)
    //     // Do something
    // });
    
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
