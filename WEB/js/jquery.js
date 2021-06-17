$(function(){
    

    // $('.carousel').carousel()

   $('.cust-1').on('click',function(){
       console.log('testing jalan')
    //    $('.box-information').css('display','block')
    $('.box-information').show(1000)
    // SEARCH ITEM BACK TO NORMAL
    $('.box-render-search').css('display','none')
    $('.input-name').css('border-bottom-left-radius','25px')
    $('.input-name').css('border-bottom-right-radius','25px')
    $('.input-name').val(null)
    //    $('.box-customer').toggle('active')
   })

   $('.icon-close').on('click',function(){
    // $('.box-information').css('display','none')
       $('.box-information').hide(1000)
       console.log('jalan box information')
   })
   

//    OPEN MODALS PROFILE
   $('.option-4').on('click',function(){
    
    // alert('function option-4 login modals')
    var token = localStorage.getItem('token')
    console.log(token)
 
    
        axios.post(`http://customers.sold.co.id/get-customer-information?Customer_Code=${token}`)
        .then((res)=>{
            // console.log(res.data,'line 33 option -4')
            var data_customer = res.data
            console.log(data_customer)
            if(data_customer){
                console.log(data_customer)
                console.log(data_customer.Customer_Code)
                if(data_customer.User_Type === 'Customer'){
                    $('.btn-status-barang').css('display','none')
                }
    
                var tahun = data_customer.Birthday.slice(0,4)
                var bulan = data_customer.Birthday.slice(5,7)
                var hari = data_customer.Birthday.slice(8,10)
                var newReferralCode = data_customer.Customer_Code
                console.log(newReferralCode)
                console.log(token)
                $('#email_user').val(`${data_customer.Email}`)
                $('#nama_user_profile').val(`${data_customer.First_Name}`)
                $('#tahun_lahir_user').val(tahun)
                $('#bulan_lahir_user').val(bulan)
                $('#tanggal_lahir_user').val(hari)
                $('#nama_depan_user').val(`${data_customer.First_Name}`)
                $('#nama_belakang_user').val(`${data_customer.Last_Name}`)
                $('#no_telp1_user').val(`${data_customer.Contact_Number_1}`)
                $('#no_telp2_user').val(`${data_customer.Contact_Number_2}`)
                $('#alamat_lengkap1_user').val(`${data_customer.Address_1}`)
                $('#alamat_lengkap2_user').val(`${data_customer.Address_2}`)
                $('#alamat_lengkap3_user').val(`${data_customer.Address_3}`)
                $('#alamat_lengkap4_user').val(`${data_customer.Address_4}`)
                $('#alamat_lengkap5_user').val(`${data_customer.Address_5}`)
                $('#rekening_user').val(`${data_customer.extra_column_1}`)
                $('#referral-profile').val(`${data_customer.extra_column_2}`)
                $('#no_ktp_user').val(`${data_customer.ktp}`)
                $('.ref-profile').val(token)
                var a = $('#refer-profile').val()
                console.log(a)
                $('#profileModal').modal('show')
            }else {
                // alert('57 login modal show')
                $('#loginModal').modal('show')
            }
        }).catch((err)=>{
            console.log(err)
        })

        $('.closeByLogin').css('display','none')
        $('.option-1').removeClass("background_grey")
        $('.option-2').removeClass("background_grey")
        $('.option-3').removeClass("background_grey")
          // SEARCH ITEM BACK TO NORMAL
        $('.box-render-search').css('display','none')
        $('.input-name').css('border-bottom-left-radius','25px')
        $('.input-name').css('border-bottom-right-radius','25px')
        // $('.option-4').removeClass("background_grey")
        console.log('functioin selesai 74')
   })

   $('.category-name').on('click',function(){
        $('.closeByLogin').css('display','none')
        $('.option-1').removeClass("background_grey")
        $('.option-2').removeClass("background_grey")
        $('.option-3').removeClass("background_grey")
        
   })


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
              console.log(allData,' all data 103')
                const searchString = value.toLowerCase()
                console.log(searchString)
                    const filterSearch = allData.filter((item)=>{
                        return (
                            item.Name.toLowerCase().includes(searchString) 
                        );
                    });
                    filterSearch.map((val,index)=>{
                        $('.render-li-search').append(
                            `
                                <li onclick="replace_value_to(this)">${val.Name}</li>
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

function replace_value_to(x){
    // alert($(x).html());
    $(".input-name").val($(x).html());
    $('.box-render-search').css('display','none')
    $('.input-name').css('border-bottom-left-radius','25px')
    $('.input-name').css('border-bottom-right-radius','25px')

}   

$('.icon-buy').on('click',function(){
    var product_id = $(this).val()
    console.log(product_id)
})

const search_item=()=>{
    console.log('159 jalan search')

    var item = $('.input-name').val()
    var item_search = $('#search_item').val()
    // console.log(item_search)
    $('.main-body').css('display','none')
    $('.modals-search-result').css('display','block')
    $('.modals-search-result').attr('src',`./Iframe/searchingPage.html?searching=${item_search}`)
}




function groupbuy(product_id){
    // alert('jalan groupbuy')
    var data;
    
    console.log(data)
    
    $('.modals-product-detail').empty()
    $('.modals-product-detail').css('display','none')
 
    
    location.replace(`../Iframe/groupbuy.html?groupbuy_id=${product_id}`)

    console.log(product_id)
}

function payment_groupbuy(product_id){
    var total_price = $('#tp_sp').val()
    console.log(total_price)

    var detail_product; 

    axios.post(`http://products.sold.co.id/get-product-details?product_code=${product_id}`)
    .then((res)=>{
        console.log(res.data)
        detail_product = res.data
    }).catch((err)=>{
        console.log(err)
    })

  
    var token = localStorage.getItem('token')
    var data_customer;
    axios.post(`http://customers.sold.co.id/get-customer-information?Customer_Code=${token}`)
    .then((res)=>{
        data_customer = res.data
        console.log(data_customer)
        
            customerDetails  ={
                Customer_Code:token,
                Total_Price: total_price,
                Total_Quantity : $('#qty_groupbuy').val(),
                Unit:"pcs",
                Shipping_Address: $('#alamat_gb').val(),
                Payment_Method : $('#payment_gb').val(),
                Shipping_Fee: $('#pengiriman-fee').val(),
                alamatLain : $('#alamat_lain').val(),
                Primary_Recipient_Name:data_customer.First_Name + " " + data_customer.Last_Name
            }

    
            items = {
                    Customer_Code: token,
                    Product_Code: product_id,
                    Product_Name: productArr[i].name,
                    Quantity_Requested: productArr[i].quantity,
                    Price_Based_On_Total_Quantity: productArr[i].totalPrice

            }
        
    


    }).catch((err)=>{
        console.log(err)
    })


    console.log(data)
}


function addToCart(product_id){
    console.log(product_id)
    var dataParse = JSON.parse(localStorage.getItem("itemsInCart"))
    console.log(dataParse,' ini data parse')

    if(dataParse){
        console.log(dataParse)

        var filterdatakosong = dataParse.filter((filtering)=>{
            if(filtering.productNo === product_id){
                return filtering
            }
        })
        if(filterdatakosong.length){
            console.log('masuk ke if 201')
            
            var objIndex = dataParse.findIndex((obj => obj.productNo == product_id));
            dataParse[objIndex].quantity = dataParse[objIndex].quantity +1
            $('.cart-counter').text(dataParse.length)
            swal.fire("Berhasil Menambahkan Quantity", "", "success");
        }else {
            console.log('masuk ke else  205')
            var data = {
            "productNo":product_id,
            "quantity":1
            }
            dataParse.push(data)
            $('.cart-counter').text(dataParse.length)
            swal.fire("Berhasil Menambahkan ke Cart", "", "success");
        }

        var pushToStorage = JSON.stringify(dataParse)
        localStorage.setItem('itemsInCart',pushToStorage)

    }else {
        console.log('local storage kosong')
        var cart = [
            {
            "productNo":product_id,
            "quantity":1
            }
        ]
        var pushToStorage2 = JSON.stringify(cart)
        localStorage.setItem('itemsInCart',pushToStorage2)     
    }
  
  

    

}


function addressMethod(item){
    console.log(item.value)
    if(item.value === 'Alamat Terdaftar'){
        // alert('masuk ke alamt terdaftar')
        $('.option-alamat-gb').css('display','block')
        $('.alamat-pengiriman').css('display','none')
    }else if (item.value === 'Alamat Baru'){
        // alert('masuk ke alamt terdaftar')
        $('.option-alamat-gb').css('display','none')
        $('.alamat-pengiriman').css('display','block')
    }
}


function resultAddress(item){

}
$('.id-address-gb').on('click',function(){
    var data = $(this).val()
    console.log(data)
})

