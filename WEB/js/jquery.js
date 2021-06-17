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
            console.log(value)
            if(value.length > 2){
                axios.post(`http://products.sold.co.id/get-product-details?product_name=${value}`)
                .then((res)=>{
                    console.log(res.data)
                    $('.box-render-search').css('display','block')
                    $('.box-search-menu').css('display','block')
                    $('.input-name').css('border-bottom-left-radius','0px')
                    $('.input-name').css('border-bottom-right-radius','0px')
                    $('.render-li-search').empty()
                    res.data.map((val,index)=>{
                        $('.render-li-search').append(`
                            <li onclick="replace_value_to(this)" id="${val.Name}">${val.Name}</li>
                        `)

                    })
                 
                    $('.closeByLogin').css('display','none')
                    $('.option-1').removeClass("background_grey")
                    $('.option-2').removeClass("background_grey")
                    $('.option-3').removeClass("background_grey")
                    $('.box-information').hide(1000)
                }).catch((err)=>{
                    console.log(err)
                })

            }else {
                 $('.box-render-search').css('display','none')
                $('.input-name').css('border-bottom-left-radius','25px')
                $('.input-name').css('border-bottom-right-radius','25px')
            }

        }, 500)); 



   
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
    var product_name = $('#search_item').attr('id')
    console.log(item_search)
    console.log(product_name)
    $('.main-body').css('display','none')
    $('.modals-search-result').css('display','block')
    $('.modals-search-result').attr('src',`./Iframe/searchingPage.html?searching=${item_search}`)
}


function check_qty(val){
    alert(val)
    // $('.qty_groupbuy_home').val('testing')
    var total_qty_from_user = val
    console.log(total_qty_from_user)
    var product_id = $('.qty_groupbuy_home').attr('id')
    console.log(product_id)
    var total_qty_from_api;
    var harga_satuan;
    axios.post(`http://products.sold.co.id/get-product-details?product_code=${product_id}`)
    .then((res)=>{
        console.log(res.data)
        total_qty_from_api = parseInt(res.data.GroupBuy_SellQuantity)
        harga_satuan = res.data.GroupBuy_SellPrice
        var total_harga = harga_satuan * total_qty_from_user
        if(total_qty_from_api > total_qty_from_user) {
            // $('#tp_sp').val(total_harga)
            $('#tp_iframe').val(total_harga)
            console.log('masuk ke if 190')
      }else {
        console.log('masuk ke else 192')
          Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: `Quantity Yang Tersisa Hanya : ${total_qty_from_api}!`,
              // footer: '<a href="">Why do I have this issue?</a>'
            })
            var total_price = harga_satuan * total_qty_from_api
            $('.qty_groupbuy_home').val(total_price)
            alert(total_qty_from_api)
            // $('#tp_sp').val(total_harga)
            $('#tp_iframe').val(total_price)
      }

    }).catch((err)=>{
        console.log(err)
    })


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


function payment_groupbuy_home(product_id){
    alert('button jalan')
    var token = localStorage.getItem('token')
    var total_price = $('#tp_iframe').val()
    var detail_product;
    var data_customer;
    var items = []
    var total_qty_from_user = parseInt($('.qty_groupbuy_home').val())
    if(total_qty_from_user>0) {
        axios.post(`http://sales.sold.co.id/check-group-buy-quantity-so-far-gross?Group_Buy_Purchase_PC=${product_id}`)
        .then((res)=>{
            total_item_kebeli = res.data
            console.log(res.data)
            if(res.data === null) {
                axios.post(`http://products.sold.co.id/get-product-details?product_code=${product_id}`)
                .then((res)=>{
                    console.log(res.data)
                    detail_product = res.data
                    axios.post(`http://customers.sold.co.id/get-customer-information?Customer_Code=${token}`)
                    .then((res)=>{
                        console.log(res.data)
                        customerDetails  ={
                            Customer_Code:token,
                            Total_Price: total_price,
                            Total_Quantity : $('.qty_groupbuy_home').val(),
                            Unit:"pcs",
                            Shipping_Address: $('#alamat_gb').val(),
                            Payment_Method : $('#payment_gb').val(),
                            Shipping_Fee: $('#pengiriman-fee').val(),
                            alamatLain : $('#alamat_lain').val(),
                            Primary_Recipient_Name:data_customer.First_Name + " " + data_customer.Last_Name
                        }         
                        items.push( {
                                Customer_Code: token,
                                Product_Code: product_id,
                                Product_Name: detail_product.Name,
                                Quantity_Requested: $('.qty_groupbuy').val(),
                                Price_Based_On_Total_Quantity: total_price
        
                        }) 
                        var data = {
                            "Sales_Order_Data": customerDetails,
                            "Sales_Order_Detail_data": items
                        }

                        axios.post(`http://sales.sold.co.id/create-new-group-buy-sales-order-by-customer?Customer_Code=${token}`,data,{
                            headers:{
                                "Content-Type":'application/json'
                            },
                            "data":JSON.stringify({
                                "Sales_Order_data":customerDetails,
                                "Sales_Order_Detail_data": items
                            })
                        }).then((res)=>{
                            console.log(res.data)
                        }).catch((err)=>{
                            console.log(err)
                        })
                            

                    }).catch((err)=>{
                        console.log(err)
                    })
                }).catch((err)=>{
                    console.log(err)
                })
            }else {
                alert('masuk ke else  296')
                axios.post(`http://products.sold.co.id/get-product-details?product_code=${product_id}`)
                .then((response)=>{
                    console.log(response.data)
                    console.log(total_item_kebeli)
                    var item_tersedia = response.data.GroupBuy_SellQuantity - total_item_kebeli.Total_Quantity
                    console.log(item_tersedia)
                    if(total_qty_from_user > item_tersedia){
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: `Hanya Bisa Membeli ${item_tersedia}`,
                            // footer: '<a href="">Why do I have this issue?</a>'
                          })

                          axios.post(`http://products.sold.co.id/get-product-details?product_code=${product_id}`)
                          .then((res)=>{
                              console.log(res.data)
                              detail_product = res.data
                              axios.post(`http://customers.sold.co.id/get-customer-information?Customer_Code=${token}`)
                              .then((res)=>{
                                  console.log(res.data)
                                  data_customer = res.data
                                  var harga_pembelian = item_tersedia * parseInt(detail_product.GroupBuy_SellPrice)
                                  console.log(harga_pembelian)

                                  customerDetails  ={
                                    Customer_Code:token,
                                    Total_Price: harga_pembelian,
                                    Total_Quantity : item_tersedia,
                                    Unit:"pcs",
                                    Shipping_Address: $('#alamat_gb').val(),
                                    Payment_Method : $('#payment_gb').val(),
                                    Shipping_Fee: $('#pengiriman-fee').val(),
                                    alamatLain : $('#alamat_lain').val(),
                                    Primary_Recipient_Name:data_customer.First_Name + " " + data_customer.Last_Name
                                }         
                                items.push( {
                                        Customer_Code: token,
                                        Product_Code: product_id,
                                        Product_Name: detail_product.Name,
                                        Quantity_Requested: item_tersedia,
                                        Price_Based_On_Total_Quantity: harga_pembelian
                
                                }) 
                                var data = {
                                    "Sales_Order_Data": customerDetails,
                                    "Sales_Order_Detail_data": items
                                }     
                                
                                console.log(data)
                                      console.log(customerDetails,' ini customer detail')
                                      console.log(items, ' ini items')
                                axios.post(`http://sales.sold.co.id/create-new-group-buy-sales-order-by-customer?Customer_Code=${token}`,data,{
                                    headers:{
                                        "Content-Type":'application/json'
                                    },
                                    "data":JSON.stringify({
                                        "Sales_Order_data":customerDetails,
                                        "Sales_Order_Detail_data": items
                                    })
                                }).then((res)=>{
                                    console.log(res.data)
                                }).catch((err)=>{
                                    console.log(err)
                                })         
                              }).catch((err)=>{
                                  console.log(err)
                              })
                          }).catch((err)=>{
                              console.log(err)
                          })
                    }else {// pembelian jika total qty dari user tidak melebihi item yang tersedia
                        alert('masuk ke line 363')
                        axios.post(`http://products.sold.co.id/get-product-details?product_code=${product_id}`)
                        .then((res)=>{
                            detail_product = res.data
                            axios.post(`http://customers.sold.co.id/get-customer-information?Customer_Code=${token}`)
                            .then((res)=>{
                                data_customer =res.data
                                console.log(data_customer)
                                customerDetails  ={
                                    Customer_Code:token,
                                    Total_Price: total_price,
                                    Total_Quantity : $('.qty_groupbuy_home').val(),
                                    Unit:"pcs",
                                    Shipping_Address: $('#alamat_gb').val(),
                                    Payment_Method : $('#payment_gb').val(),
                                    Shipping_Fee: $('#pengiriman-fee').val(),
                                    alamatLain : $('#alamat_lain').val(),
                                    Primary_Recipient_Name:data_customer.First_Name + " " + data_customer.Last_Name
                                }         
                                items.push( {
                                        Customer_Code: token,
                                        Product_Code: product_id,
                                        Product_Name: detail_product.Name,
                                        Quantity_Requested: $('.qty_groupbuy_home').val(),
                                        Price_Based_On_Total_Quantity: total_price
                
                                }) 
                                var data = {
                                    "Sales_Order_Data": customerDetails,
                                    "Sales_Order_Detail_data": items
                                }    
                                console.log(data)
                                console.log(customerDetails,' ini customer detail')
                                console.log(items, ' ini items')

                                axios.post(`http://sales.sold.co.id/create-new-group-buy-sales-order-by-customer?Customer_Code=${token}`,data,{
                                    headers:{
                                        "Content-Type":'application/json'
                                    },
                                    "data":JSON.stringify({
                                        "Sales_Order_data":customerDetails,
                                        "Sales_Order_Detail_data": items
                                    })
                                }).then((res)=>{
                                    console.log(res.data)
                                }).catch((err)=>{
                                    console.log(err)
                                })
                        

                            }).catch((err)=>{
                                console.log(err)
                            })
                        }).catch((err)=>{
                            console.log(err)
                        })
                    }
                }).catch((err)=>{
                    console.log(err)
                })
            }
        }).catch((err)=>{
            console.log(err)
        })
    }else {
        alert('masuk ke else  302')
    }
}

function payment_groupbuy(product_id){
    var token = localStorage.getItem('token')
    var total_price = $('#tp_sp').val()
    console.log(total_price)

    var detail_product; 
    var data_customer;
    var items =[]
    var total_qty_from_user = parseInt($('.qty_groupbuy').val())
    var total_item_kebeli;
    if(total_qty_from_user>0){
        axios.post(`http://sales.sold.co.id/check-group-buy-quantity-so-far-gross?Group_Buy_Purchase_PC=${product_id}`)
        .then((res)=>{
            total_item_kebeli = res.data
            console.log(res.data)
            if(res.data === null){
                axios.post(`http://products.sold.co.id/get-product-details?product_code=${product_id}`)
                .then((res)=>{
                    console.log(res.data)
                    detail_product = res.data
                    axios.post(`http://customers.sold.co.id/get-customer-information?Customer_Code=${token}`)
                    .then((res)=>{
                        data_customer = res.data
                        console.log(data_customer)
                        
                            customerDetails  ={
                                Customer_Code:token,
                                Total_Price: total_price,
                                Total_Quantity : $('.qty_groupbuy').val(),
                                Unit:"pcs",
                                Shipping_Address: $('#alamat_gb').val(),
                                Payment_Method : $('#payment_gb').val(),
                                Shipping_Fee: $('#pengiriman-fee').val(),
                                alamatLain : $('#alamat_lain').val(),
                                Primary_Recipient_Name:data_customer.First_Name + " " + data_customer.Last_Name
                            }         
                            items.push( {
                                    Customer_Code: token,
                                    Product_Code: product_id,
                                    Product_Name: detail_product.Name,
                                    Quantity_Requested: $('.qty_groupbuy').val(),
                                    Price_Based_On_Total_Quantity: total_price
            
                            }) 
                            var data = {
                                "Sales_Order_Data": customerDetails,
                                "Sales_Order_Detail_data": items
                            }
                
                          
                            console.log(data)
                            console.log(customerDetails,' ini customer detail')
                            console.log(items, ' ini items')
            
                            axios.post(`http://sales.sold.co.id/create-new-group-buy-sales-order-by-customer?Customer_Code=${token}`,data,{
                                headers:{
                                    "Content-Type":'application/json'
                                },
                                "data":JSON.stringify({
                                    "Sales_Order_data":customerDetails,
                                    "Sales_Order_Detail_data": items
                                })
                            }).then((res)=>{
                                console.log(res.data)
                            }).catch((err)=>{
                                console.log(err)
                            })
                    
                            swal.fire("Penambahan Data Berhasil, Silahkan Check Cart", "", "success");
                            $('.groupbuy_sp').css('display','none')
                
                    }).catch((err)=>{
                        console.log(err)
                    })
                }).catch((err)=>{
                    console.log(err)
                })

            }else {
                // hasil dari res.data.Total_Quantity di kurang sama qty yang di beli dari customer
                // = res.data.Total_Quantity-
                // yang bisa di beli => data_product_GroupBuy_SellQuantity - res.data.total_quantity
                console.log(res.data)
                
                axios.post(`http://products.sold.co.id/get-product-details?product_code=${product_id}`)
                .then((response)=>{ // res.data == detail product
                    
                    console.log(response.data)
                    console.log(total_item_kebeli)
                    var item_tersedia = response.data.GroupBuy_SellQuantity - total_item_kebeli.Total_Quantity
                    console.log(item_tersedia)
                    if(total_qty_from_user > item_tersedia){
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: `Hanya Bisa Membeli ${item_tersedia}`,
                            // footer: '<a href="">Why do I have this issue?</a>'
                          })
                          axios.post(`http://products.sold.co.id/get-product-details?product_code=${product_id}`)
                          .then((res)=>{
                              console.log(res.data)
                              detail_product = res.data
                              axios.post(`http://customers.sold.co.id/get-customer-information?Customer_Code=${token}`)
                              .then((res)=>{
                                  console.log(res.data)
                                  data_customer = res.data
                                  var harga_pembelian = item_tersedia * parseInt(detail_product.GroupBuy_SellPrice)
                                  console.log(harga_pembelian)



                                      customerDetails  ={
                                          Customer_Code:token,
                                          Total_Price: harga_pembelian,
                                          Total_Quantity : item_tersedia,
                                          Unit:"pcs",
                                          Shipping_Address: $('#alamat_gb').val(),
                                          Payment_Method : $('#payment_gb').val(),
                                          Shipping_Fee: $('#pengiriman-fee').val(),
                                          alamatLain : $('#alamat_lain').val(),
                                          Primary_Recipient_Name:data_customer.First_Name + " " + data_customer.Last_Name
                                      }         
                                      items.push( {
                                              Customer_Code: token,
                                              Product_Code: product_id,
                                              Product_Name: detail_product.Name,
                                              Quantity_Requested: item_tersedia,
                                              Price_Based_On_Total_Quantity: harga_pembelian
                      
                                      }) 
                                      var data = {
                                          "Sales_Order_Data": customerDetails,
                                          "Sales_Order_Detail_data": items
                                      }
                          
                                    
                                      console.log(data)
                                      console.log(customerDetails,' ini customer detail')
                                      console.log(items, ' ini items')
                      
                                      axios.post(`http://sales.sold.co.id/create-new-group-buy-sales-order-by-customer?Customer_Code=${token}`,data,{
                                          headers:{
                                              "Content-Type":'application/json'
                                          },
                                          "data":JSON.stringify({
                                              "Sales_Order_data":customerDetails,
                                              "Sales_Order_Detail_data": items
                                          })
                                      }).then((res)=>{
                                          console.log(res.data)
                                      }).catch((err)=>{
                                          console.log(err)
                                      })
                          
                              }).catch((err)=>{
                                  console.log(err)
                              })
                          }).catch((err)=>{
                              console.log(err)
                          })
                    }else { // pembelian jika total qty dari user tidak melebihi item yang tersedia
                        axios.post(`http://products.sold.co.id/get-product-details?product_code=${product_id}`)
                        .then((res)=>{
                            console.log(res.data)
                            detail_product = res.data
                            axios.post(`http://customers.sold.co.id/get-customer-information?Customer_Code=${token}`)
                            .then((res)=>{
                                data_customer = res.data
                                console.log(data_customer) 
                                    customerDetails  ={
                                        Customer_Code:token,
                                        Total_Price: total_price,
                                        Total_Quantity : $('.qty_groupbuy').val(),
                                        Unit:"pcs",
                                        Shipping_Address: $('#alamat_gb').val(),
                                        Payment_Method : $('#payment_gb').val(),
                                        Shipping_Fee: $('#pengiriman-fee').val(),
                                        alamatLain : $('#alamat_lain').val(),
                                        Primary_Recipient_Name:data_customer.First_Name + " " + data_customer.Last_Name
                                    }         
                                    items.push( {
                                            Customer_Code: token,
                                            Product_Code: product_id,
                                            Product_Name: detail_product.Name,
                                            Quantity_Requested: $('.qty_groupbuy').val(),
                                            Price_Based_On_Total_Quantity: total_price
                    
                                    }) 
                                    var data = {
                                        "Sales_Order_Data": customerDetails,
                                        "Sales_Order_Detail_data": items
                                    }     
                                    console.log(data)
                                    console.log(customerDetails,' ini customer detail')
                                    console.log(items, ' ini items')
                    
                                    axios.post(`http://sales.sold.co.id/create-new-group-buy-sales-order-by-customer?Customer_Code=${token}`,data,{
                                        headers:{
                                            "Content-Type":'application/json'
                                        },
                                        "data":JSON.stringify({
                                            "Sales_Order_data":customerDetails,
                                            "Sales_Order_Detail_data": items
                                        })
                                    }).then((res)=>{
                                        console.log(res.data)
                                    }).catch((err)=>{
                                        console.log(err)
                                    })
                            
                                    
                            }).catch((err)=>{
                                console.log(err)
                            })
                        }).catch((err)=>{
                            console.log(err)
                        })
                    }
                    swal.fire("Penambahan Data Berhasil, Silahkan Check Cart", "", "success");
                    $('.groupbuy_sp').css('display','none')
                }).catch((err)=>{

                })
                // console.log(item_tersedia)


            }
        }).catch((err)=>{
            console.log(err)
        })

    }



    // BATAS
    
    console.log(detail_product.Name)
    
   


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

