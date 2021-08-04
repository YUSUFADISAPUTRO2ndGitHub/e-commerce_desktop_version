$(document).ready(async function(){
    getCustomersWithCustomerNo(localStorage.getItem("token")).done(function (response) {
        if(response != false){
            if(response.Address_1 != "NULL" && response.Address_1 != null){
                $("#sub-saved-address").append("<option value=\"" + response.Address_1 + "\">" + response.Address_1 + "</option>");
            }
            if(response.Address_2 != "NULL" && response.Address_2 != null){
                $("#sub-saved-address").append("<option value=\"" + response.Address_2 + "\">" + response.Address_2 + "</option>");
            }
            if(response.Address_3 != "NULL" && response.Address_3 != null){
                $("#sub-saved-address").append("<option value=\"" + response.Address_3 + "\">" + response.Address_3 + "</option>");
            }
            if(response.Address_4 != "NULL" && response.Address_4 != null){
                $("#sub-saved-address").append("<option value=\"" + response.Address_4 + "\">" + response.Address_4 + "</option>");
            }
            if(response.Address_5 != "NULL" && response.Address_5 != null){
                $("#sub-saved-address").append("<option value=\"" + response.Address_5 + "\">" + response.Address_5 + "</option>");
            }
        }
        var name = response.First_Name + " " + response.Last_Name;
    });
    // renderListDeliveryFee();
    loadCheckoutFinalConfirmationTable("COD");
    listPaymentMethods();
});


// function renderListDeliveryFee(){
 

//     $('#sub-delivery-option').append(`
//         <option value="TIKI">TIKI</option>
//         <option value="Lion Parel">Lion Parcel</option>
//         <option value="Dayat Parcel">Dayat Parcel</option>
//     `)
  

// }

function get_otp_for_checkout(){
    getCustomersWithCustomerNo(localStorage.getItem("token")).done(function (response) {
        if(response.Email.length > 0){
            get_otp_api(response.Email).done(function (response) {
                Swal.fire("OTP terkirim ke email", `${response.Email}`, "success");
            });
        }else{
            Swal.fire("Please give me your email", `${response.Email}`, "warning");
        }
    });
}

function loadingMessage(timer){
    let timerInterval
    Swal.fire({
    title: 'Loading Your Request',
    html: '',
    timer: timer*1000,
    timerProgressBar: true,
    allowOutsideClick: false,
    didOpen: () => {
        Swal.showLoading()
        timerInterval = setInterval(() => {
        const content = Swal.getContent()
        }, 100)
    },
    willClose: () => {
        clearInterval(timerInterval)
    }
    }).then((result) => {
        /* Read more about handling dismissals below */
        if (result.dismiss === Swal.DismissReason.timer) {
            console.log('I was closed by the timer')
        }
    })
}

function listPaymentMethods(){
    getPaymentMethods().done(function (response) {
        console.log(response, 'line 79')
        var i = 0;
        for(i = 0; i < response.length; i++){
            $("#payment-selection").append("<option>" + response[i].Payment_Method_Name + "</option>");
        }
    });
}

function loadCheckoutFinalConfirmationTable(condition){
    $(".final_checkout").empty();
    $(".final_checkout").append("<tr><th>PRODUCT NAME</th><th>QUANTITY</th><th>TOTAL PRICE</th></tr>");
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const check_store_price = urlParams.get('check_store_price');
    if(JSON.parse(check_store_price)){

         
        var itemsToCheckout = JSON.parse(localStorage.getItem("itemsToCheckout"));
        var i = 0;
        var harga_shipping = 20000
        var total_price_with_shipping=harga_shipping
        var Shipping_option = $('#sub-delivery-option option:selected').val()
        console.log(itemsToCheckout)
        itemsToCheckout.map((val,id)=>{
            console.log(parseInt(val.priceAgreed))
            // parseFloat('100,000.00'.replace(/,/g, ''))
            var price = parseFloat(val.priceAgreed.replace(/,/g, ''))
            total_price_with_shipping +=price
            console.log(total_price_with_shipping, ' ini total price')
        })
        

        var itemsToCheckout = JSON.parse(localStorage.getItem("itemsToCheckout"));
        var i = 0;
        for(i; i < itemsToCheckout.length; i++){
            getProductsWithProductNo("", "", itemsToCheckout[i].productNo).done(function (response) {
                var i = 0;
                var itemsToCheckout = JSON.parse(localStorage.getItem("itemsToCheckout"));
                for(i; i < itemsToCheckout.length; i++){
                    console.log(response);
                    if(itemsToCheckout[i].productNo == response.Product_Code){
                        $(".final_checkout").append("<tr id=\"final_checkout_row_" + i + "\">");
                        $("#final_checkout_row_" + i).append("<td id=\"final_checkout_prod_name_" + response.Name + "\">" + response.Name + "</td>");
                        $("#final_checkout_row_" + i).append("<td id=\"final_checkout_quantity_" + itemsToCheckout[i].productNo + "\">" + itemsToCheckout[i].quantity + "</td>");
                        if(response.In_Store_Price != 'NULL'){
                            $("#final_checkout_row_" + i).append("<td id=\"final_checkout_price_" + response.In_Store_Price * itemsToCheckout[i].quantity + "\">" + (response.In_Store_Price * itemsToCheckout[i].quantity) + "</td>");
                        }else{
                            $("#final_checkout_row_" + i).append("<td id=\"final_checkout_price_" + response.Sell_Price * itemsToCheckout[i].quantity + "\">" + (response.Sell_Price * itemsToCheckout[i].quantity) + "</td>");
                        }
                    }
                }
            });
        }
        var Shipping_option = $('#sub-delivery-option option:selected').val()
        console.log(Shipping_option)
        var Shipping_selection = $("#sub-delivery-option").children("option:selected").val();
        console.log(Shipping_selection)
        $('#final_checkout_delivery_row').append(`
            <td> ${Shipping_option} </td>
            <td> 20.000 </td>
        `)
        $('#final_checkout_total_price_row').append(`
            <td>${total_price_with_shipping} </td>
        `)

    }else if(condition == "COD"){
        render_select_option_kurir()
        var itemsToCheckout = JSON.parse(localStorage.getItem("itemsToCheckout"));
        var i = 0;
        var harga_shipping = 20000
        var total_price_with_shipping=harga_shipping
        var Shipping_option = $('#sub-delivery-option option:selected').val()
        console.log(itemsToCheckout)
        itemsToCheckout.map((val,id)=>{
            console.log(parseInt(val.priceAgreed))
            // parseFloat('100,000.00'.replace(/,/g, ''))
            var price = parseFloat(val.priceAgreed.replace(/,/g, ''))
            total_price_with_shipping +=price
            console.log(total_price_with_shipping, ' ini total price')
        })
        
        
        console.log(Shipping_option)
        for(i; i < itemsToCheckout.length; i++){
            getProductsWithProductNo("", "", itemsToCheckout[i].productNo).done(function (response) {
                console.log(response,' ini response')
                console.log(parseInt(response.Sell_Price))
                total_price_with_shipping += parseInt(response.Sell_Price)
                var i = 0;
                var itemsToCheckout = JSON.parse(localStorage.getItem("itemsToCheckout"));
                for(i; i < itemsToCheckout.length; i++){
                    
                    if(itemsToCheckout[i].productNo == response.Product_Code){
                        $(".final_checkout").append("<tr id=\"final_checkout_row_" + i + "\">");
                        $("#final_checkout_row_" + i).append("<td id=\"final_checkout_prod_name_" + response.Name + "\">" + response.Name + "</td>");
                        $("#final_checkout_row_" + i).append("<td id=\"final_checkout_quantity_" + itemsToCheckout[i].productNo + "\">" + itemsToCheckout[i].quantity + "</td>");
                        $("#final_checkout_row_" + i).append("<td id=\"final_checkout_price_" + response.Sell_Price * itemsToCheckout[i].quantity + "\">" + itemsToCheckout[i].priceAgreed + "</td>");
                   
                    }
                }
                
            });
        }
        $('#final_checkout_delivery_row').append(`
            <td> ${Shipping_option} </td>
            <td>  </td>
        `)
        console.log(total_price_with_shipping,' 149')
        $('#final_checkout_total_price_row').append(`
            <td>${total_price_with_shipping} </td>
        `)

      
       
    }else{
      
        var itemsToCheckout = JSON.parse(localStorage.getItem("itemsToCheckout"));
        var i = 0;
        var harga_shipping = 20000
        var total_price_with_shipping=harga_shipping
        var Shipping_option = $('#sub-delivery-option option:selected').val()
        console.log(itemsToCheckout)
        itemsToCheckout.map((val,id)=>{
            console.log(parseInt(val.priceAgreed))
            // parseFloat('100,000.00'.replace(/,/g, ''))
            var price = parseFloat(val.priceAgreed.replace(/,/g, ''))
            total_price_with_shipping +=price
            console.log(total_price_with_shipping, ' ini total price')
        })
        
        var itemsToCheckout = JSON.parse(localStorage.getItem("itemsToCheckout"));
        var i = 0;
        for(i; i < itemsToCheckout.length; i++){
            getProductsWithProductNo("", "", itemsToCheckout[i].productNo).done(function (response) {
                datas = JSON.parse(data);
                var i = 0;
                var itemsToCheckout = JSON.parse(localStorage.getItem("itemsToCheckout"));
                for(i; i < itemsToCheckout.length; i++){
                    if(itemsToCheckout[i].productNo == datas[0].Product_Code){
                        $(".final_checkout").append("<tr id=\"final_checkout_row_" + i + "\">");
                        $("#final_checkout_row_" + i).append("<td id=\"final_checkout_prod_name_" + datas[0].Name + "\">" + datas[0].Name + "</td>");
                        $("#final_checkout_row_" + i).append("<td id=\"final_checkout_quantity_" + itemsToCheckout[i].productNo + "\">" + itemsToCheckout[i].quantity + "</td>");
                        $("#final_checkout_row_" + i).append("<td id=\"final_checkout_price_" + datas[0].Sell_Price * itemsToCheckout[i].quantity + "\">" + datas[0].period * itemsToCheckout[i].quantity + "</td>");
                    }
                }
            });
        }
        $('#final_checkout_delivery_row').append(`
        <td> ${Shipping_option} </td>
        <td> ${harga_shipping} </td>
        `)
        console.log(total_price_with_shipping,' 149')
        $('#final_checkout_total_price_row').append(`
            <td>${total_price_with_shipping} </td>
        `)

      
    }
}

function periodOptionSelected(x){
    if($(x).children("option:selected").val().toUpperCase() == "TRANSFER"){
        swal.fire("Compare to Virtual Account Transfer, Normal Transfer may take longer time to process", "make sure you make the payment as soon as possible for your order to be processed","warning");
        $("#normal-transfer-selected").css("display", "block");
        // loadCheckoutFinalConfirmationTable("PERIOD");
        // $("#period-selection").css("display", "block");
    }else{
        loadCheckoutFinalConfirmationTable("COD");
        $("#normal-transfer-selected").css("display", "none");
    }
}

function addressOptionSelected(x){
    if($(x).children("option:selected").val() == "DELIVER TO NEW ADDRESS"){
        $("#address-selection-sub-saved-address").css("display", "none");
        $("#new-address-section").css("display", "block");
    }else{
        $("#address-selection-sub-saved-address").css("display", "block");
        $("#new-address-section").css("display", "none");
    }
}

const onSelectDeliveryFee=()=>{
    var province_pilihan=$('.cart-provinsi option:selected').val()
    var new_kurir_pilihan = $('#sub-delivery-option option:selected').val()
    var allKota =[]
    var allDistrict = []
    var allSub_District =[]
    var allPengiriman = []
    var allKurir = []
    var allProvince = []
    
    var province =[]
    var kota =[]
    var district = []
    var sub_district = []
    
    var isKurir_pilihan = false
    var isProvince_pilihan = false
    var isKota_pilihan = false
    var isDistrict_pilihan = false
    var isSub_District_pilihan = false




    if(new_kurir_pilihan == undefined || new_kurir_pilihan == 'undefined' || new_kurir_pilihan == null || new_kurir_pilihan.length == 0 || new_kurir_pilihan == 'Kurir'){
        isKurir_pilihan = false
    }else {
        isKurir_pilihan = true
    }
    if(province_pilihan == undefined || province_pilihan == 'undefined' || province_pilihan == null || province_pilihan.length == 0 || province_pilihan == 'Provinsi'){
        isProvince_pilihan = false
    }else {
        isProvince_pilihan = true
    }

    if(isKurir_pilihan){
        console.log('masuk ke if else ')
        $('.danger-alert').css('display','none')
        var cart_local = localStorage.getItem('itemsToCheckout')
        console.log(cart_local)
        var parse_cart = JSON.parse(cart_local)
        console.log(parse_cart)
        // console.log(response)    
        var array_cart =[]
        for(var i =0; i<parse_cart.length; i++){
            console.log(parse_cart[i].productNo)
            getProductsWithProductNo("", "", parse_cart[i].productNo).done(function (response) {
            // get_product_detail_func(parse_cart[i].productNo).done(function(response){
            // console.log(response)    
            // console.log(array_cart)
            array_cart.push(response)
            })
        }

        get_all_couriers().done(function(response){
            var dataAllKurir = response
            allKurir = response
            var kurir_kode =''
            for(var i=0; i<dataAllKurir.length; i++){
                if(dataAllKurir[i].Courier == new_kurir_pilihan){
                    kurir_kode = dataAllKurir[i].Courier_Code
                }
            }
            get_all_province_from_courier(new_kurir_pilihan,kurir_kode).done(function(response){
                province =response[0]
                allProvince = response
                console.log(province,' ini all province 997')
                console.log(allProvince)
                get_all_city_from_courier(new_kurir_pilihan,kurir_kode,province.Province).done(function(response){
                    kota = response[0]
                    allKota = response
                    console.log(kota, ' ini kota')
                    get_all_district_from_courier(new_kurir_pilihan,kurir_kode,kota.City).done(function(response){
                        district = response[0]
                        allDistrict = response
                        console.log(allDistrict)
                        get_all_subdistrict_from_courier(new_kurir_pilihan,kurir_kode,district.District).done(function(response){
                            allSub_District = response
                            console.log(allSub_District)
                            var total_berat_product=0
                            var Courier_Price_Code_orig = 'CGK01.00'
                            var packing_type = ''
                            var length = ''
                            var  width = '' 
                            var  height = ''
                            var paket_value = '' 
                            for(var i =0; i<array_cart.length; i++){
                                var berat_parse = array_cart[i].Weight_KG *1
                                if(berat_parse <= 0 || berat_parse == null || berat_parse == undefined || Number.isNaN(berat_parse)){
                                    berat_parse = 0.1*1.5;
                                }else{
                                    berat_parse = berat_parse*1*1.5;
                                }
                                console.log(berat_parse)
                                total_berat_product += berat_parse
                                console.log(total_berat_product,'ini total berat product')
                            }
                            new_get_shipping_cost_informations(Courier_Price_Code_orig , allSub_District[0].Courier_Price_Code, packing_type, total_berat_product, length, width, height, paket_value).done(function(response){
                                allPengiriman = response
                                console.log(response, ' ini shipping cost')
                                $('.cart-provinsi').empty() 
                                $('.cart-kota').empty() 
                                $('.cart-kecamatan').empty()
                                $('.cart-kelurahan').empty()
                                $('.cart-kodepos').empty()
                                $('.cart-pengiriman').empty()
                                $('.cart-asuransi').empty()
                                $('.cart-packing').empty()

                                $('.cart-provinsi').append(`
                                    <option selected  class="co-provinsi"> Provinsi</option>      
                                `)

                                $('.cart-kota').append(`
                                    <option selected  class="co-kota"> Kota</option>      
                                `)
                                $('.cart-kecamatan').append(`
                                    <option selected  class="co-kecamatan"> Kecamatan</option>      
                                `)
                                $('.cart-kelurahan').append(`
                                    <option selected  class="co-kelurahan"> Kelurahan</option>      
                                `)
                                $('.cart-kodepos').append(`
                                    <option selected  class="co-kodepos"> Kodepos</option>      
                                `)
                                $('.cart-pengiriman').append(`
                                    <option selected  class="co-pengiriman"> Pengiriman</option>      
                                `)
                                $('.cart-asuransi').append(`
                                    <option selected  class="co-asuransi"> Asuransi</option>      
                                `)
                                $('.cart-packing').append(`
                                    <option selected  class="co-packing"> Packing</option>      
                                `)

                                allProvince.map((val,index)=>{
                                    $('.cart-provinsi').append(`
                                        <option  value="${val.Province}" class="co-kota">${val.Province}</option> 
                                    `)
                                })
                                allKota.map((val,index)=>{
                                    $('.cart-kota').append(`
                                        <option  value="${val.City}" class="co-kota">${val.City}</option> 
                                    `)
                                })
                                allDistrict.map((val,index)=>{
                                    $('.cart-kecamatan').append(`
                                    <option  value="${val.District}" class="co-kecamatan">${val.District}</option> 
                                    `)
                                })
                                allSub_District.map((val,index)=>{
                                    $('.cart-kelurahan').append(`
                                    <option  value="${val.Sub_District}" class="co-kelurahan">${val.Sub_District}</option> 
                                    `)
                                    $('.cart-kodepos').append(`
                                    <option  value="${val.Zipcode}" class="co-kodepos">${val.Zipcode}</option> 
                                    `)
                                })
                                allPengiriman.service.map((val,index)=>{
                                    $('cart-pengiriman').append(`
                                        <option  value="${val.EST_DAY}days ${val.SERVICE} ${val.TARIFF} ${val.DESCRIPTION} " class="${val.TARIFF}">${val.EST_DAY}days ${val.SERVICE} ${val.TARIFF} ${val.DESCRIPTION}</option> 
                                    `)
                                })
                                allPengiriman.insurance.map((val,index)=>{
                                    // console.log(val, ' ini all pengiriman')
                                    // console.log(val.est_day)
                                    // console.log(val.EST_DAY)
                                    $('.cart-asuransi').append(`
                                        <option  value="type ${val.INSURANCE_TYPE} ${val.INSURANCE_NAME} ${val.INSURANCE_COST}" class="${val.INSURANCE_COST}">${val.INSURANCE_NAME} - RP ${val.INSURANCE_COST} </option> 
                                    `)
                                })
                                allPengiriman.packing.map((val,index)=>{
                                    // console.log(val, ' ini all pengiriman')
                                    // console.log(val.est_day)
                                    // console.log(val.EST_DAY)
                                    $('.cart-packing').append(`
                                        <option  value="${val.PACKING_TYPE}" class="${val.PACKING_FEE}">${val.PACKING_TYPE} - RP ${val.PACKING_FEE} </option> 
                                    `)
                                })
                            })
                        })
                    })
                })
            })
        })

    }else {
        $('.danger-alert').css('display','flex')
        console.log(isKurir_pilihan, ' ini kurir pilihan')
        console.log(isProvince_pilihan, ' ini province pilihan')
        console.log('masuk ke else ')
    }






    // BATAS AKHIR 
    $('#final_checkout_delivery_row').empty()
    $('#final_checkout_total_price_row').empty()
    var itemsToCheckout = JSON.parse(localStorage.getItem("itemsToCheckout"));
    var harga_shipping_awal = 20000
    var total_price_with_shipping = harga_shipping_awal

    itemsToCheckout.map((val,id)=>{
        console.log(parseInt(val.priceAgreed))
        // parseFloat('100,000.00'.replace(/,/g, ''))
        var price = parseFloat(val.priceAgreed.replace(/,/g, ''))
        total_price_with_shipping +=price
        console.log(total_price_with_shipping, ' ini total price')
    })
        var item = $('#sub-delivery-option option:selected').val()
        console.log(item)
        $('#final_checkout_delivery_row').append(`
            <td> ${item} </td>
            <td> ${harga_shipping_awal} </td>
        `)

        $('#final_checkout_total_price_row').append(`
            <td> ${total_price_with_shipping} </td>
            
        `)

    console.log(total_price_with_shipping,' 149')
}

async function requestToFinish(){
    loadingMessage(10000);
    var addressSelection = $("#address-selection").children("option:selected").val();
    var address = "";
    // var province = $(".option-province").children("option:selected").val();
    // var city = $("#option-city").val();
    // var zipcode = $("#zipcode").val();
    var street = $("#street").val();
    // address = province + ";" + city + ";" + zipcode + ";" + street;
    address = street;
    if(addressSelection == "TO SAVED ADDRESS"){
        personalDetailsWithCurrentAddress();
    }else{
        console.log("address " + address);
        // if(($(".option-province").children("option:selected").val() != "-- select your province here --") && 
        // ($("#option-city").val().length != 0) &&
        // ($("#zipcode").val().length > 0) &&
        // ($("#street").val().length > 0)){
        //     personalDetailsWithNewAddress(address);
        // }else{
        //     swal.fire("Please fill in the address properly", "", "warning");
        // }
        personalDetailsWithNewAddress(address);
    }
}

async function requestToFinishInStore(){
    loadingMessage(10000);
    personalDetailsWithStoreAddress();
}

function personalDetailsWithStoreAddress(){
    loadingMessage(10000);
    var request = {};
    var currDate = new Date();
    var month = currDate.getMonth() + 1;
    var day = currDate.getDate();
    var year = currDate.getFullYear();
    var date = year + "-" + month + "-" + day;
    var paymentSelection = $("#payment-selection").children("option:selected").val();
    getCustomersWithCustomerNo(localStorage.getItem("token")).done(function (response) {
        console.log("selected to checkout in store");
        request = {
            customerId: localStorage.getItem("token"),
            paymentMethod: paymentSelection,
            paymentMethodDetailes: 0,
            province: "Jawa Barat",
            city: "Bekasi",
            zipcode: "17148",
            street: "Jl Raya Pekayon no 35 B",
            fullName: response.First_Name + " " + response.Last_Name,
            contactNumber: response.Contact_Number_1,
            email: response.Email,
            notes: "Pembelian Langsung di TOKO (SHINE)",
            orderDate: date
        };
        console.log(request);
        $("#submitRequestFinalButton").toggle();
        $("#backtocartRequestFinalButton").toggle();
        sendRequestFinal(paymentSelection);

        var paymentMethodChosen = $("#payment-selection").children("option:selected").val();
        if(paymentMethodChosen == "BCA VA TRANSFER" ){
            setTimeout(function(){sendFinalRequestToEnquiryAndEnquiryDetailsWithoutGroupBuy(request);}, 2000);
            setTimeout(function(){ clearStorage(); }, 3000);
        }else{
            setTimeout(function(){sendFinalToAccurate(request);}, 2000);
            setTimeout(function(){ clearStorage(); }, 3000);
        }
    });
}

function personalDetailsWithCurrentAddress(){
    var request = {};
    var currDate = new Date();
    var month = currDate.getMonth() + 1;
    var day = currDate.getDate();
    var year = currDate.getFullYear();
    var date = year + "-" + month + "-" + day;
    var paymentSelection = $("#payment-selection").children("option:selected").val();
    var periodSelection = 0;
    var kurir_pilihan = $('#sub-delivery-option option:selected').val()
    var province_pilihan = $('.cart-provinsi option:selected').val()
    var kota_pilihan = $('.cart-kota option:selected').val()
    var district_pilihan = $('.cart-kecamatan option:selected').val()
    var sub_district_pilihan = $('.cart-kelurahan option:selected').val()
    var pengiriman_pilihan = $('.cart-pengiriman option:selected').val()
    var kodepos_pilihan = $('.cart-kodepos option:selected').val()
    var asuransi_pilihan = $('.cart-asuransi option:selected').val()
    var packing_pilihan = $('.cart-packing option:selected').val()
    var alamat_terdaftar = $("#sub-saved-address").children("option:selected").val()
    var alamat_final = alamat_terdaftar + ' '  + sub_district_pilihan + ' ' + district_pilihan +  ' ' + kota_pilihan + ' ' + province_pilihan + ' ' + kodepos_pilihan 
    console.log(kurir_pilihan,' kurir pilihan')
    console.log(province_pilihan,' kurir province_pilihan')
    console.log(kota_pilihan,' kurir kota_pilihan')
    console.log(district_pilihan,' kurir district_pilihan')
    console.log(sub_district_pilihan,' kurir sub_district_pilihan')
    console.log(pengiriman_pilihan,' kurir pengiriman_pilihan')
    console.log(kodepos_pilihan,' kurir kodepos_pilihan')
    console.log(asuransi_pilihan,' kurir asuransi_pilihan')
    console.log(packing_pilihan,' kurir packing_pilihan')
    console.log(alamat_final,' ini alamat final')


    // if(paymentSelection == "PERIOD" ){
    //     periodSelection = $("#period-selection").children("option:selected").val();
    //     if(periodSelection == "30 Days"){
    //         periodSelection = 30;
    //     }else{
    //         periodSelection = 60;
    //     }
    // }
    getCustomersWithCustomerNo(localStorage.getItem("token")).done(function (response) {
        request = {
            customerId: localStorage.getItem("token"),
            paymentMethod: paymentSelection,
            paymentMethodDetailes: periodSelection,
            address: alamat_final,
            fullName: response.First_Name + " " + response.Last_Name,
            contactNumber: response.Contact_Number_1,
            email: response.Email,
            notes: "e-commerce pembelian request",
            orderDate: date
        };
        console.log(request);
        $("#submitRequestFinalButton").toggle();
        $("#backtocartRequestFinalButton").toggle();
        sendRequestFinal(paymentSelection);

        var paymentMethodChosen = $("#payment-selection").children("option:selected").val();
        if(paymentMethodChosen == "BCA VA TRANSFER" ){
            setTimeout(function(){sendFinalRequestToEnquiryAndEnquiryDetailsWithoutGroupBuy(request);}, 2000);
            // setTimeout(function(){ clearStorage(); }, 3000);
        }else{
            
            setTimeout(function(){sendFinalRequestToEnquiryAndEnquiryDetailsWithoutGroupBuyAndVA(request);}, 2000);
            // setTimeout(function(){ clearStorage(); }, 4000);
        }
    });
}

async function sendRequestFinal(paymentSelection){
    var token = localStorage.getItem('token')
    var itemsToCheckout = JSON.parse(localStorage.getItem("itemsToCheckout"));
    var new_kurir_pilihan = $('#sub-delivery-option option:selected').val() 
    var asuransi_pilihan = $('.cart-asuransi option:selected').val()
    var packing_pilihan = $('.cart-packing option:selected').val()
    var pengiriman_pilihan = $('.cart-pengiriman option:selected').val()
    var harga_shipping = parseInt($('.cart-pengiriman option:selected').attr('class'))
    var harga_asuransi =$('.cart-asuransi option:selected').attr('class') *1
    var harga_packing = $('.cart-packing option:selected').attr('class') *1

   

    if(harga_packing == NaN || isNaN(harga_packing) ){
        harga_packing = 0
    }
    if(harga_asuransi == NaN || isNaN(harga_asuransi)){
        harga_asuransi = 0
    }
    if(packing_pilihan == 'packing' || packing_pilihan == null || packing_pilihan == undefined ){
        packing_pilihan = ' NORMAL'
        
    }
    if(asuransi_pilihan  == 'Asuransi' || asuransi_pilihan == null || asuransi_pilihan == undefined  ) {
        asuransi_pilihan = 'type 0 Tidak Berasuransi '
        
    }
    
    console.log(harga_shipping,' ini harga shipping')
    console.log(harga_asuransi,' ini harga asuransi')
    console.log(harga_packing,' ini harga packing')
    console.log(asuransi_pilihan, ' ini asuransi pilihan')
    
    console.log(asuransi_pilihan  == 'Asuransi', asuransi_pilihan == null,  asuransi_pilihan == undefined,  asuransi_pilihan.length == 0,  isNaN(asuransi_pilihan))
    
    var total_harga_shipping_with_insurance_packing =  harga_shipping + harga_asuransi + harga_packing
    var final_total_harga_shipping_insurance = total_harga_shipping_with_insurance_packing.toString()
    var product_name_shipping = pengiriman_pilihan + asuransi_pilihan + packing_pilihan
    console.log(product_name_shipping,' product name shipping')
    console.log(total_harga_shipping_with_insurance_packing,' total harga shipping with insurance packing')
    console.log(final_total_harga_shipping_insurance, ' to string')
    // console.log("itemsToCheckout " + localStorage.getItem("itemsToCheckout"));
    get_all_couriers().done(function(response){
        var finalStep = JSON.parse(localStorage.getItem("finalStep"));
        var dataAllKurir = response
        var kurir_kode = ''
        for(var i=0; i<dataAllKurir.length; i++){
            if(dataAllKurir[i].Courier == new_kurir_pilihan){
                kurir_kode = dataAllKurir[i].Courier_Code
            }
        }

        if(localStorage.getItem("finalStep") === null){
            // console.log('masuk ke if finalstep null 485')
            // alert('masuk ke if 490')
            var requestArrayForItemsToCheckout = [];
            object = {
                name: product_name_shipping,
                productCode: kurir_kode,
                quantity:1,
                pricePerItem: total_harga_shipping_with_insurance_packing,
                notes: "e-commerce product buy request",
                totalPrice: total_harga_shipping_with_insurance_packing,
                GroupCode: 'NO COUPON'
            };
            requestArrayForItemsToCheckout.push(object)
            console.log(finalStep,' ini dalem iff')
            var productToBeAddedStringify = JSON.stringify(requestArrayForItemsToCheckout);
            localStorage.setItem("finalStep", productToBeAddedStringify);
        }else {
            // console.log('masuk ke else finalstep null 501')
            // alert('masuk ke else 506')
            object = {
                name: product_name_shipping,
                productCode: kurir_kode,
                quantity:1,
                pricePerItem: total_harga_shipping_with_insurance_packing,
                notes: "e-commerce product buy request",
                totalPrice: total_harga_shipping_with_insurance_packing,
                GroupCode: 'NO COUPON'
            };

           
            finalStep.push(object);
            console.log(finalStep)
            var setToString = JSON.stringify(finalStep)
            localStorage.setItem("finalStep", setToString);
        }
        console.log(finalStep)
        var i = 0;
        for(i; i < itemsToCheckout.length; i ++){
            getProductsWithProductNo("", "", itemsToCheckout[i].productNo).done(function (response) {
                var object = {};
                var itemsToCheckout = JSON.parse(localStorage.getItem("itemsToCheckout"));
                // var finalStep = JSON.parse(localStorage.getItem("finalStep"));       
                if(localStorage.getItem("finalStep") === null){
                    // alert('masuk ke if null 524')

                    var requestArrayForItemsToCheckout = [];
                    var i =0;
                    
                    // finalStep.push(object);
                    console.log(object)
                    for(i; i < itemsToCheckout.length; i ++){
                        if(response.Product_Code == itemsToCheckout[i].productNo){
                            var priceSingular = parseInt(removeComma(itemsToCheckout[i].priceAgreed)) / parseInt(itemsToCheckout[i].quantity);
                            object = {
                                name: response.Name,
                                productCode: response.Product_Code,
                                quantity: itemsToCheckout[i].quantity,
                                pricePerItem: priceSingular,
                                notes: "e-commerce product buy request",
                                totalPrice: itemsToCheckout[i].priceAgreed,
                                GroupCode: itemsToCheckout[i].GroupCode
                            };
                            requestArrayForItemsToCheckout.push(object);
                            break;
                        }
                    }
                    var productToBeAddedStringify = JSON.stringify(requestArrayForItemsToCheckout);
                    localStorage.setItem("finalStep", productToBeAddedStringify);
                }else{
                    // alert('masuk ke else 550 null')
                    var finalStep = JSON.parse(localStorage.getItem("finalStep"));
                    console.log(object)
                    var i =0;
                    for(i; i < itemsToCheckout.length; i ++){
                        if(response.Product_Code == itemsToCheckout[i].productNo){
                            var priceSingular = parseInt(removeComma(itemsToCheckout[i].priceAgreed)) / parseInt(itemsToCheckout[i].quantity);
                            object = {
                                name: response.Name,
                                productCode: response.Product_Code,
                                quantity: itemsToCheckout[i].quantity,
                                pricePerItem: priceSingular,
                                notes: "e-commerce product buy request",
                                totalPrice: itemsToCheckout[i].priceAgreed,
                                GroupCode: itemsToCheckout[i].GroupCode
                            };
                            finalStep.push(object);
                            console.log(finalStep)
                            break;
                        }
                    }
                    var productToBeAddedStringify = JSON.stringify(finalStep);
                    localStorage.setItem("finalStep", productToBeAddedStringify);
                }
            }) 
        }
    });
}

function removeComma( num ) {
    console.log(num, 'ini num 563')
    var fixedNum = num.toString().split(',');
    var i = 0;
    var result = "";
    for(i ; i < fixedNum.length; i++){
        result = result + fixedNum[i];
    }
    return result;
}

function clearStorage(){
    var requestArrayForItemsToCheckout = [];
    var productToBeAddedStringify = JSON.stringify(requestArrayForItemsToCheckout);
    localStorage.setItem("itemsToCheckout", productToBeAddedStringify);
    var requestArrayForItemsToCheckout = [];
    var productToBeAddedStringify = JSON.stringify(requestArrayForItemsToCheckout);
    localStorage.setItem("finalStep", productToBeAddedStringify);
}

function personalDetailsWithNewAddress(address){
    var request = {};
    var currDate = new Date();
    var month = currDate.getMonth() + 1;
    var day = currDate.getDate();
    var year = currDate.getFullYear();
    var date = year + "-" + month + "-" + day;
    var paymentSelection = $("#payment-selection").children("option:selected").val();
    var periodSelection = "";
    if(paymentSelection == "PERIOD" ){
        periodSelection = $("#period-selection").children("option:selected").val();
        if(periodSelection == "30 Days"){
            periodSelection = 30;
        }else{
            periodSelection = 60;
        }
    }
    // var arrayAddress = address.split(";");
    getCustomersWithCustomerNo(localStorage.getItem("token")).done(function (response) {
        request = {
            customerId: localStorage.getItem("token"),
            paymentMethod: paymentSelection,
            paymentMethodDetailes: periodSelection,
            address: address,
            fullName: response.First_Name + " " + response.Last_Name,
            contactNumber: response.Contact_Number_1,
            email: response.Email,
            notes: "e-commerce penjualan request",
            orderDate: date   
        };
        $("#submitRequestFinalButton").toggle();
        $("#backtocartRequestFinalButton").toggle();
        sendRequestFinal(paymentSelection);
        var paymentMethodChosen = $("#payment-selection").children("option:selected").val();
        if(paymentMethodChosen == "BCA VA TRANSFER" ){
            setTimeout(() => {sendFinalRequestToEnquiryAndEnquiryDetailsWithoutGroupBuy(request);}, 2000);
            setTimeout(() => { clearStorage(); }, 3000);
        }else{
            setTimeout(() => {sendFinalRequestToEnquiryAndEnquiryDetailsWithoutGroupBuyAndVA(request);}, 2000);
            // setTimeout(() => { clearStorage(); }, 3000);
        }
    });
}

function truncateCart(){
    // testing dari bayu


    // var itemsInCart = JSON.parse(localStorage.getItem("itemsInCart"));
    // var itemsToCheckout = JSON.parse(localStorage.getItem("itemsToCheckout"));

    // if(itemsInCart.length>0 && itemsToCheckout.length>0){ // kalo dua duanya ada akan ngapus itemscart jd 0
    //     var i = 0;
    //     for(i; i < itemsInCart.length; i++){
    //         var x = 0;
    //         for(x; x < itemsToCheckout.length; x++){
    //             if(itemsToCheckout[x].productNo == itemsInCart[i].productNo){
    //                 itemsInCart.splice(i, 1);
    //                 var productToBeAddedStringify = JSON.stringify(itemsInCart);
    //                 localStorage.setItem("itemsInCart", productToBeAddedStringify);
    //                 // break;
    //             }
    //         }
    //     }
    // }else { // salah satunya kosong berarti cart ke apus semua
    //     var requestArrayForItemsInCart = []
    //     var productToBeAddedStringify = JSON.stringify(requestArrayForItemsInCart);
    //     localStorage.setItem('itemsInCart',productToBeAddedStringify)
    // }

    // batas testing dari bayu

    //  mas yusuf
    
    var itemsInCart = JSON.parse(localStorage.getItem("itemsInCart"));
    var itemsToCheckout = JSON.parse(localStorage.getItem("itemsToCheckout"));
    var i = 0;
    for(i; i < itemsInCart.length; i++){
        var x = 0;
        for(x; x < itemsToCheckout.length; x++){
            if(itemsToCheckout[x].productNo == itemsInCart[i].productNo){
                itemsInCart.splice(i, 1);
                var productToBeAddedStringify = JSON.stringify(itemsInCart);
                localStorage.setItem("itemsInCart", productToBeAddedStringify);
                // break;
            }
        }
    }
    // mas yusuf
    
}

function redirectToCart(){
    window.location.href = "../cart.html";
}

async function sendFinalRequestToEnquiryAndEnquiryDetailsWithoutGroupBuy(request){
    var orderArr = JSON.stringify([request]);
    orderArr = JSON.parse(orderArr);
    var productArr = JSON.parse(localStorage.getItem("finalStep"));
    var i = 0;
    var totalQuantity = 0;
    for(i; i < productArr.length; i ++){
        productArr[i].quantity = (productArr[i].quantity).toString();
        totalQuantity = totalQuantity + (productArr[i].quantity * 1);
        productArr[i].totalPrice = (removeComma(productArr[i].totalPrice)).toString();
    }
    saveExpressOrderId(getCurrentTimeComplete());
    await reorderJSON(orderArr[0], productArr).then(async value => {
        return await value;
    });
    console.log(customer_information);
    console.log(item_bought);
    getCustomersWithCustomerNo(customer_information.Customer_Code).done(function (response) {
        if(response != false){
            createNewSalesOrder(item_bought, customer_information, response.Email, $("#checkout-otp-number").val(), $("#checkout-password").val()).done(async function (response) {
                if(response.status == true){
                    swal.fire("Order sudah dikirimkan", "","success");
                }else{
                    console.log(response);
                    swal.fire("Order gagal dikirimkan", "","warning");
                }
                truncateCart();
                await setTimeout(() => { clearStorage(); }, 2000);
                await setTimeout(() => {window.location.href = "../cart.html";}, 3000);
            });
        }
    });
}

async function sendFinalRequestToEnquiryAndEnquiryDetailsWithoutGroupBuyAndVA(request){
    var orderArr = JSON.stringify([request]);
    orderArr = JSON.parse(orderArr);
    var productArr = JSON.parse(localStorage.getItem("finalStep"));
    // console.log(productArr, ' ini product arr 694')
    var i = 0;
    var totalQuantity = 0;
    for(i; i < productArr.length; i ++){
        
        productArr[i].quantity = (productArr[i].quantity).toString();
        totalQuantity = totalQuantity + (productArr[i].quantity * 1);
        productArr[i].totalPrice = (removeComma(productArr[i].totalPrice)).toString();
    }
    saveExpressOrderId(getCurrentTimeComplete());
    // if(orderArr[0].paymentMethod == "BCA TRANSFER"){
    //     orderArr[0].paymentMethod = "transfer";
    // }
    await reorderJSON(orderArr[0], productArr).then(async value => {
        return await value;
    });
    console.log(customer_information);
    console.log(item_bought);
    getCustomersWithCustomerNo(customer_information.Customer_Code).done(function (response) {
        if(response != false){
            createNewSalesOrder(item_bought, customer_information, response.Email, $("#checkout-otp-number").val(), $("#checkout-password").val()).done(async function (response) {
                if(response.status == true){
                    swal.fire("Order sudah dikirimkan", "","success");
                }else{
                    console.log(response);
                    swal.fire("Order gagal dikirimkan", "","warning");
                }
                truncateCart(); // bayu comment, gue test console.log gak jalan, di pindah ke dalem true  : bayu
                
                await setTimeout(() => { clearStorage(); }, 2000);
                await setTimeout(() => {window.location.href = "../cart.html";}, 3000);
            });
        }
    });
}

async function sendFinalToAccurate(request){
    loadingMessage(10000);
    console.log("sendFinalToAccurate ======================================");
    var orderArr = JSON.stringify([request]);
    orderArr = JSON.parse(orderArr);
    var productArr = JSON.parse(localStorage.getItem("finalStep"));
    var i = 0;
    var totalQuantity = 0;
    for(i; i < productArr.length; i ++){
        productArr[i].quantity = (productArr[i].quantity).toString();
        totalQuantity = totalQuantity + (productArr[i].quantity * 1);
        productArr[i].totalPrice = (removeComma(productArr[i].totalPrice)).toString();
    }
    console.log("productArr " + JSON.stringify(productArr));
    console.log("orderArr " + JSON.stringify(orderArr));
    await reorderJSON(orderArr[0], productArr).then(async value => {
        return await value;
    });
    console.log(customer_information);
    console.log(item_bought);
    getCustomersWithCustomerNo(customer_information.Customer_Code).done(function (response) {
        if(response != false){
            createNewSalesOrder(item_bought, customer_information, response.Email, $("#checkout-otp-number").val(), $("#checkout-password").val()).done(async function (response) {
                if(response.status == true){
                    swal.fire("Order sudah dikirimkan", "","success");
                }else{
                    console.log(response);
                    swal.fire("Order gagal dikirimkan", "","warning");
                }
                truncateCart();
                await setTimeout(() => { clearStorage(); }, 2000);
                await setTimeout(() => {window.location.href = "../cart.html";}, 3000);
            });
        }
    });
}

var customer_information = {};
var item_bought = [];

async function reorderJSON(customerDetails, productArr){
    var harga_shipping = parseInt($('.cart-pengiriman option:selected').attr('class'))
    var harga_asuransi = parseInt($('.cart-asuransi option:selected').attr('class'))
    var harga_packing = parseInt($('.cart-packing option:selected').attr('class'))

    if(harga_packing == NaN || isNaN(harga_packing) ){
        harga_packing = 0
    }
    if(harga_asuransi == NaN || isNaN(harga_asuransi)){
        harga_asuransi = 0
    }
    console.log(harga_shipping,'harga shipping')
    console.log(harga_asuransi,'harga asuransi')
    console.log(harga_packing,'harga packing')

    var total_harga_shipping_with_insurance_packing =  harga_shipping + harga_asuransi + harga_packing
    console.log(total_harga_shipping_with_insurance_packing)
    var total_price = 0;
    var total_quantity = 0;
    var i = 0;
    item_bought = [];
    for (i = 0; i < productArr.length; i++){
        console.log(productArr[i])
        if(productArr[i].totalPrice.toUpperCase() != "NaN".toUpperCase() && productArr[i].quantity.toUpperCase() != "NaN".toUpperCase()){
            item_bought.push(
                {
                    Customer_Code: customerDetails.customerId,
                    Product_Code: productArr[i].productCode,
                    Product_Name: productArr[i].name,
                    Quantity_Requested: productArr[i].quantity,
                    Price_Based_On_Total_Quantity: productArr[i].totalPrice
                }
            );
            total_price = total_price + parseFloat(productArr[i].totalPrice);
            total_quantity = total_quantity + parseFloat(productArr[i].quantity);
        }else{
            swal.fire("Salah satu item kamu tidak mempunyai harga, pesanan untuk barang tersebut tidak bisa diproses (item : " + productArr[i].productCode + ")", "barang-barang lain tetap dapat diproses","warning");
        }
    }
    customer_information = {};
    return new Promise(async resolve => {
        await getCustomersWithCustomerNo(localStorage.getItem("token")).done(function (response) {
            if(response != false){
                var final_total_price = total_price + total_harga_shipping_with_insurance_packing
                console.log(total_price, typeof total_price, 'total price')
                console.log(total_harga_shipping_with_insurance_packing, typeof total_harga_shipping_with_insurance_packing, 'total price')
                console.log(final_total_price,' final total price')
                resolve(customer_information = {
                    Customer_Code: customerDetails.customerId,
                    Total_Price: total_price,
                    Total_Quantity: total_quantity,
                    Unit: "pcs",
                    Shipping_Address: customerDetails.address,
                    Shipping_Contact_Number: response.Contact_Number_1,
                    Payment_Method: customerDetails.paymentMethod,
                    Shipping_Fee: total_harga_shipping_with_insurance_packing,
                    Primary_Recipient_Name: response.First_Name + " " + response.Last_Name
                });
                console.log(customer_information, ' customer information')
            }
        });
    });
}

function saveExpressOrderId(orderid){
    localStorage.setItem("ExpressOrderId", orderid);
}





const render_select_option_kurir=()=>{
    var allKurir = []
    var allProvince = []
    var allkota =[]
    var allDistrict =[]
    var allSub_District = []
    var allPengiriman =[]

    var kurir=[]
    var province =[]
    var kota =[]
    var district =[]
    var sub_district=[]
    var item_product =''

    
    get_all_couriers().done(function(response){
        var alamat_customer = 'jalan Tumaritis nomor 131 - 11550 - kelapa dua - kebon jeruk - jakarta barat - dki jakarta'
        var split_alamat = alamat_customer.split('-')
        var jalan_customer = split_alamat[0]
        var kodepos_customer = split_alamat[1]
        var sub_district_customer = split_alamat[2]
        var district_customer = split_alamat[3]
        var kota_customer = split_alamat[4]
        var province_customer = split_alamat[5]
        var item_product = ''
        var cart_local = localStorage.getItem('itemsToCheckout')
        // console.log(cart_local)
        var parse_cart = JSON.parse(cart_local)
        // console.log(parse_cart)
        kurir = response[0]
        allKurir = response
        // console.log(response)
        var array_cart =[]
        for(var i =0; i<parse_cart.length; i++){
            console.log(parse_cart[i].productNo)
            getProductsWithProductNo("", "", parse_cart[i].productNo).done(function (response) {
            // get_product_detail_func(parse_cart[i].productNo).done(function(response){
            console.log(response)    
            console.log(array_cart)
            array_cart.push(response)
            })
        }
        // console.log(array_cart)
        get_all_province_from_courier(kurir.Courier, kurir.Courier_Code).done(function(response){
            province = response[0]
            allProvince = response
            get_all_city_from_courier(kurir.Courier, kurir.Courier_Code,province.Province).done(function(response){
                allKota = response
                kota = response[0]
                get_all_district_from_courier(kurir.Courier, kurir.Courier_Code, kota.City).done(function(response){
                    allDistrict = response
                    district = response[0]
                    // console.log(district)
                    // console.log(kota)
                    get_all_subdistrict_from_courier(kurir.Courier, kurir.Courier_Code, district.District,).done(function(response){
                        allSub_District = response
                        sub_district = response[0]
                        // console.log(response)
                        var total_berat_product=0
                        var Courier_Price_Code_orig = 'CGK01.00'
                        var packing_type = ''
                        var length = ''
                        var  width = '' 
                        var  height = ''
                        var paket_value = '' 
                        for(var i =0; i<array_cart.length; i++){
                            var berat_parse = array_cart[i].Weight_KG *1
                            if(berat_parse <= 0 || berat_parse == null || berat_parse == undefined || Number.isNaN(berat_parse)){
                                berat_parse = 0.1*1.5;
                            }else{
                                berat_parse = berat_parse*1*1.5;
                            }
                            // console.log(berat_parse)
                            total_berat_product += berat_parse
                            // console.log(total_berat_product,'ini total berat product')
                        }
                        var total_berat_ceil =Math.ceil(total_berat_product)
                        // console.log(total_berat_ceil)
                        new_get_shipping_cost_informations(Courier_Price_Code_orig , allSub_District[0].Courier_Price_Code, packing_type, total_berat_ceil, length, width, height, paket_value).done(function(response){
                            allPengiriman = response
                           
                            allKurir.map((val,index)=>{
                                $('#sub-delivery-option').append(`
                                    <option value="${val.Courier}">${val.Courier}</option>        
                                `)
                            })  
                            allProvince.map((val,index)=>{
                                $('.cart-provinsi').append(`
                                    <option  value="${val.Province}" class="co-provinsi">${val.Province}</option> 
                                `)
                            })
                            allKota.map((val,index)=>{
                                $('.cart-kota').append(`
                                    <option  value="${val.City}" class="co-kota">${val.City}</option> 
                                `)
                            })
                            allDistrict.map((val,index)=>{
                                $('.cart-kecamatan').append(`
                                <option  value="${val.District}" class="co-kecamatan">${val.District}</option> 
                                `)
                            })
                            allSub_District.map((val,index)=>{
                                $('.cart-kelurahan').append(`
                                <option  value="${val.Sub_District}" class="co-kelurahan">${val.Sub_District}</option> 
                                `)
                                $('.cart-kodepos').append(`
                                <option  value="${val.Zipcode}" class="co-kodepos">${val.Zipcode}</option> 
                                `)
                            })
                            allPengiriman.service.map((val,index)=>{
                                $('cart-pengiriman').append(`
                                    <option  value="${val.EST_DAY}days ${val.SERVICE} ${val.TARIFF} ${val.DESCRIPTION} " class="${val.TARIFF}">${val.EST_DAY}days ${val.SERVICE} ${val.TARIFF} ${val.DESCRIPTION}</option> 
                                `)
                            })
                            allPengiriman.insurance.map((val,index)=>{
                                // console.log(val, ' ini all pengiriman')
                                // console.log(val.est_day)
                                // console.log(val.EST_DAY)
                                $('.cart-asuransi').append(`
                                    <option  value="type ${val.INSURANCE_TYPE} ${val.INSURANCE_NAME} ${val.INSURANCE_COST}" class="${val.INSURANCE_COST}">${val.INSURANCE_NAME} - RP ${val.INSURANCE_COST} </option> 
                                `)
                            })
                            allPengiriman.packing.map((val,index)=>{
                                // console.log(val, ' ini all pengiriman')
                                // console.log(val.est_day)
                                // console.log(val.EST_DAY)
                                $('.cart-packing').append(`
                                    <option  value="${val.PACKING_TYPE}" class="${val.PACKING_FEE}">${val.PACKING_TYPE} - RP ${val.PACKING_FEE} </option> 
                                `)
                            })

                        })
                    })  
                })  
            })
        })
    })
}


const re_render_select_option=()=>{
    var allKurir = []
    var allProvince = []
    var allKota =[]
    var allDistrict =[]
    var allSub_District = []
    var allPengiriman =[]

    var kurir=[]
    var province =[]
    var kota =[]
    var district =[]
    var sub_district=[]
    var item_product =''

    
    get_all_couriers().done(function(response){
        var alamat_customer = 'jalan Tumaritis nomor 131 - 11550 - kelapa dua - kebon jeruk - jakarta barat - dki jakarta'
        var split_alamat = alamat_customer.split('-')
        var jalan_customer = split_alamat[0]
        var kodepos_customer = split_alamat[1]
        var sub_district_customer = split_alamat[2]
        var district_customer = split_alamat[3]
        var kota_customer = split_alamat[4]
        var province_customer = split_alamat[5]
        var item_product = ''
        var cart_local = localStorage.getItem('itemsToCheckout')
        // console.log(cart_local)
        var parse_cart = JSON.parse(cart_local)
        // console.log(parse_cart)
        kurir = response[0]
        allKurir = response
        // console.log(response)
        var array_cart =[]
        for(var i =0; i<parse_cart.length; i++){
            console.log(parse_cart[i].productNo)
            getProductsWithProductNo("", "", parse_cart[i].productNo).done(function (response) {
            // get_product_detail_func(parse_cart[i].productNo).done(function(response){
            console.log(response)    
            console.log(array_cart)
            array_cart.push(response)
            })
        }
        // console.log(array_cart)
        get_all_province_from_courier(kurir.Courier, kurir.Courier_Code).done(function(response){
            province = response[0]
            allProvince = response
            get_all_city_from_courier(kurir.Courier, kurir.Courier_Code,province.Province).done(function(response){
                allKota = response
                kota = response[0]
                get_all_district_from_courier(kurir.Courier, kurir.Courier_Code, kota.City).done(function(response){
                    allDistrict = response
                    district = response[0]
                    // console.log(district)
                    // console.log(kota)
                    get_all_subdistrict_from_courier(kurir.Courier, kurir.Courier_Code, district.District,).done(function(response){
                        allSub_District = response
                        sub_district = response[0]
                        // console.log(response)
                        var total_berat_product=0
                        var Courier_Price_Code_orig = 'CGK01.00'
                        var packing_type = ''
                        var length = ''
                        var  width = '' 
                        var  height = ''
                        var paket_value = '' 
                        for(var i =0; i<array_cart.length; i++){
                            var berat_parse = array_cart[i].Weight_KG *1
                            if(berat_parse <= 0 || berat_parse == null || berat_parse == undefined || Number.isNaN(berat_parse)){
                                berat_parse = 0.1*1.5;
                            }else{
                                berat_parse = berat_parse*1*1.5;
                            }
                            // console.log(berat_parse)
                            total_berat_product += berat_parse
                            // console.log(total_berat_product,'ini total berat product')
                        }
                        var total_berat_ceil =Math.ceil(total_berat_product)
                        // console.log(total_berat_ceil)
                        new_get_shipping_cost_informations(Courier_Price_Code_orig , allSub_District[0].Courier_Price_Code, packing_type, total_berat_ceil, length, width, height, paket_value).done(function(response){
                            allPengiriman = response
                            $('#sub-delivery-option').empty()
                            $('.cart-provinsi').empty() 
                            $('.cart-kota').empty() 
                            $('.cart-kecamatan').empty()
                            $('.cart-kelurahan').empty()
                            $('.cart-kodepos').empty()
                            $('.cart-pengiriman').empty()
                            $('.cart-asuransi').empty()
                            $('.cart-packing').empty()


                            $('#sub-delivery-option').append(`
                                <option selected  class="co-kurir"> Kurir</option>      
                            `)
                            $('.cart-provinsi').append(`
                                <option selected  class="co-provinsi"> Provinsi</option>      
                            `)

                            $('.cart-kota').append(`
                                <option selected  class="co-kota"> Kota</option>      
                            `)
                            $('.cart-kecamatan').append(`
                                <option selected  class="co-kecamatan"> Kecamatan</option>      
                            `)
                            $('.cart-kelurahan').append(`
                                <option selected  class="co-kelurahan"> Kelurahan</option>      
                            `)
                            $('.cart-kodepos').append(`
                                <option selected  class="co-kodepos"> Kodepos</option>      
                            `)
                            $('.cart-pengiriman').append(`
                                <option selected  class="co-pengiriman"> Pengiriman</option>      
                            `)
                            $('.cart-asuransi').append(`
                                <option selected  class="co-asuransi"> Asuransi</option>      
                            `)
                            $('.cart-packing').append(`
                                <option selected  class="co-packing"> Packing</option>      
                            `)
                            
                            allKurir.map((val,index)=>{
                                $('#sub-delivery-option').append(`
                                    <option value="${val.Courier}">${val.Courier}</option>        
                                `)
                            })  
                            allProvince.map((val,index)=>{
                                $('.cart-provinsi').append(`
                                    <option  value="${val.Province}" class="co-provinsi">${val.Province}</option> 
                                `)
                            })
                            allKota.map((val,index)=>{
                                $('.cart-kota').append(`
                                    <option  value="${val.City}" class="co-kota">${val.City}</option> 
                                `)
                            })
                            allDistrict.map((val,index)=>{
                                $('.cart-kecamatan').append(`
                                <option  value="${val.District}" class="co-kecamatan">${val.District}</option> 
                                `)
                            })
                            allSub_District.map((val,index)=>{
                                $('.cart-kelurahan').append(`
                                <option  value="${val.Sub_District}" class="co-kelurahan">${val.Sub_District}</option> 
                                `)
                                $('.cart-kodepos').append(`
                                <option  value="${val.Zipcode}" class="co-kodepos">${val.Zipcode}</option> 
                                `)
                            })
                            allPengiriman.service.map((val,index)=>{
                                $('cart-pengiriman').append(`
                                    <option  value="${val.EST_DAY}days ${val.SERVICE} ${val.TARIFF} ${val.DESCRIPTION} " class="${val.TARIFF}">${val.EST_DAY}days ${val.SERVICE} ${val.TARIFF} ${val.DESCRIPTION}</option> 
                                `)
                            })
                            allPengiriman.insurance.map((val,index)=>{
                                // console.log(val, ' ini all pengiriman')
                                // console.log(val.est_day)
                                // console.log(val.EST_DAY)
                                $('.cart-asuransi').append(`
                                    <option  value="type ${val.INSURANCE_TYPE} ${val.INSURANCE_NAME} ${val.INSURANCE_COST}" class="${val.INSURANCE_COST}">${val.INSURANCE_NAME} - RP ${val.INSURANCE_COST} </option> 
                                `)
                            })
                            allPengiriman.packing.map((val,index)=>{
                                // console.log(val, ' ini all pengiriman')
                                // console.log(val.est_day)
                                // console.log(val.EST_DAY)
                                $('.cart-packing').append(`
                                    <option  value="${val.PACKING_TYPE}" class="${val.PACKING_FEE}">${val.PACKING_TYPE} - RP ${val.PACKING_FEE} </option> 
                                `)
                            })

                        })
                    })  
                })  
            })
        })
    })
}


const provinceCheckout=(product_id)=>{
    var province_pilihan=$('.cart-provinsi option:selected').val()
    var new_kurir_pilihan = $('#sub-delivery-option option:selected').val()
    var allKota =[]
    var allDistrict = []
    var allSub_District =[]
    var allPengiriman = []
    var allKurir = []
    
    var province =[]
    var kota =[]
    var district = []
    var sub_district = []
    
    var isKurir_pilihan = false
    var isProvince_pilihan = false
    var isKota_pilihan = false
    var isDistrict_pilihan = false
    var isSub_District_pilihan = false




    if(new_kurir_pilihan == undefined || new_kurir_pilihan == 'undefined' || new_kurir_pilihan == null || new_kurir_pilihan.length == 0 || new_kurir_pilihan == 'Kurir'){
        isKurir_pilihan = false
    }else {
        isKurir_pilihan = true
    }
    if(province_pilihan == undefined || province_pilihan == 'undefined' || province_pilihan == null || province_pilihan.length == 0 || province_pilihan == 'Provinsi'){
        isProvince_pilihan = false
    }else {
        isProvince_pilihan = true
    }

    if(isKurir_pilihan && isProvince_pilihan){
        $('.danger-error').css('display','none')
        console.log('masuk ke if else ')
        var cart_local = localStorage.getItem('itemsToCheckout')
        console.log(cart_local)
        var parse_cart = JSON.parse(cart_local)
        console.log(parse_cart)
        // console.log(response)    
        var array_cart =[]
        for(var i =0; i<parse_cart.length; i++){
            console.log(parse_cart[i].productNo)
            getProductsWithProductNo("", "", parse_cart[i].productNo).done(function (response) {
            // get_product_detail_func(parse_cart[i].productNo).done(function(response){
            // console.log(response)    
            // console.log(array_cart)
            array_cart.push(response)
            })
        }

        get_all_couriers().done(function(response){
            var dataAllKurir = response
            allKurir = response
            var kurir_kode =''
            for(var i=0; i<dataAllKurir.length; i++){
                if(dataAllKurir[i].Courier == new_kurir_pilihan){
                    kurir_kode = dataAllKurir[i].Courier_Code
                }
            }
            get_all_province_from_courier(new_kurir_pilihan,kurir_kode).done(function(response){
                province =response[0]
                allProvince = response
                // console.log(province,' ini all province 997')
                get_all_city_from_courier(new_kurir_pilihan,kurir_kode,province_pilihan).done(function(response){
                    kota = response[0]
                    allKota = response
                    // console.log(kota, ' ini kota')
                    get_all_district_from_courier(new_kurir_pilihan,kurir_kode,kota.City).done(function(response){
                        district = response[0]
                        allDistrict = response
                        // console.log(allDistrict)
                        get_all_subdistrict_from_courier(new_kurir_pilihan,kurir_kode,district.District).done(function(response){
                            allSub_District = response
                            // console.log(allSub_District)
                            var total_berat_product=0
                            var Courier_Price_Code_orig = 'CGK01.00'
                            var packing_type = ''
                            var length = ''
                            var  width = '' 
                            var  height = ''
                            var paket_value = '' 
                            for(var i =0; i<array_cart.length; i++){
                                var berat_parse = array_cart[i].Weight_KG *1
                                if(berat_parse <= 0 || berat_parse == null || berat_parse == undefined || Number.isNaN(berat_parse)){
                                    berat_parse = 0.1*1.5;
                                }else{
                                    berat_parse = berat_parse*1*1.5;
                                }
                                console.log(berat_parse)
                                total_berat_product += berat_parse
                                console.log(total_berat_product,'ini total berat product')
                            }
                            new_get_shipping_cost_informations(Courier_Price_Code_orig , allSub_District[0].Courier_Price_Code, packing_type, total_berat_product, length, width, height, paket_value).done(function(response){
                                allPengiriman = response
                                console.log(response, ' ini shipping cost')
                                $('.cart-kota').empty() 
                                $('.cart-kecamatan').empty()
                                $('.cart-kelurahan').empty()
                                $('.cart-kodepos').empty()
                                $('.cart-pengiriman').empty()
                                $('.cart-asuransi').empty()
                                $('.cart-packing').empty()

                                $('.cart-kota').append(`
                                    <option selected  class="co-kota"> Kota</option>      
                                `)
                                $('.cart-kecamatan').append(`
                                    <option selected  class="co-kecamatan"> Kecamatan</option>      
                                `)
                                $('.cart-kelurahan').append(`
                                    <option selected  class="co-kelurahan"> Kelurahan</option>      
                                `)
                                $('.cart-kodepos').append(`
                                    <option selected  class="co-kodepos"> Kodepos</option>      
                                `)
                                $('.cart-pengiriman').append(`
                                    <option selected  class="co-pengiriman"> Pengiriman</option>      
                                `)
                                $('.cart-asuransi').append(`
                                    <option selected  class="co-asuransi"> Asuransi</option>      
                                `)
                                $('.cart-packing').append(`
                                    <option selected  class="co-packing"> Packing</option>      
                                `)
                                allKota.map((val,index)=>{
                                    $('.cart-kota').append(`
                                        <option  value="${val.City}" class="co-kota">${val.City}</option> 
                                    `)
                                })
                                allDistrict.map((val,index)=>{
                                    $('.cart-kecamatan').append(`
                                    <option  value="${val.District}" class="co-kecamatan">${val.District}</option> 
                                    `)
                                })
                                allSub_District.map((val,index)=>{
                                    $('.cart-kelurahan').append(`
                                    <option  value="${val.Sub_District}" class="co-kelurahan">${val.Sub_District}</option> 
                                    `)
                                    $('.cart-kodepos').append(`
                                    <option  value="${val.Zipcode}" class="co-kodepos">${val.Zipcode}</option> 
                                    `)
                                })
                                allPengiriman.service.map((val,index)=>{
                                    $('cart-pengiriman').append(`
                                        <option  value="${val.EST_DAY}days ${val.SERVICE} ${val.TARIFF} ${val.DESCRIPTION} " class="${val.TARIFF}">${val.EST_DAY}days ${val.SERVICE} ${val.TARIFF} ${val.DESCRIPTION}</option> 
                                    `)
                                })
                                allPengiriman.insurance.map((val,index)=>{
                                    // console.log(val, ' ini all pengiriman')
                                    // console.log(val.est_day)
                                    // console.log(val.EST_DAY)
                                    $('.cart-asuransi').append(`
                                        <option  value="type ${val.INSURANCE_TYPE} ${val.INSURANCE_NAME} ${val.INSURANCE_COST}" class="${val.INSURANCE_COST}">${val.INSURANCE_NAME} - RP ${val.INSURANCE_COST} </option> 
                                    `)
                                })
                                allPengiriman.packing.map((val,index)=>{
                                    // console.log(val, ' ini all pengiriman')
                                    // console.log(val.est_day)
                                    // console.log(val.EST_DAY)
                                    $('.cart-packing').append(`
                                        <option  value="${val.PACKING_TYPE}" class="${val.PACKING_FEE}">${val.PACKING_TYPE} - RP ${val.PACKING_FEE} </option> 
                                    `)
                                })
                            })
                        })
                    })
                })
            })
        })

    }else {
        $('.danger-error').css('display','flex')
        re_render_select_option()
        console.log(isKurir_pilihan, ' ini kurir pilihan')
        console.log(isProvince_pilihan, ' ini province pilihan')
        console.log('masuk ke else ')
    }

}
const kotaCheckout=()=>{
    var province_pilihan=$('.cart-provinsi option:selected').val()
    var new_kurir_pilihan = $('#sub-delivery-option option:selected').val()
    var kota_pilihan = $('.cart-kota option:selected').val()
    var allKota =[]
    var allDistrict = []
    var allSub_District =[]
    var allPengiriman = []
    var allKurir = []
    
    var province =[]
    var kota =[]
    var district = []
    var sub_district = []
    
    var isKurir_pilihan = false
    var isProvince_pilihan = false
    var isKota_pilihan = false
    var isDistrict_pilihan = false
    var isSub_District_pilihan = false




    if(new_kurir_pilihan == undefined || new_kurir_pilihan == 'undefined' || new_kurir_pilihan == null || new_kurir_pilihan.length == 0 || new_kurir_pilihan == 'Kurir'){
        isKurir_pilihan = false
    }else {
        isKurir_pilihan = true
    }
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

    if(isKurir_pilihan && isProvince_pilihan && isKota_pilihan){
        // console.log('masuk ke if else ')
        $('.danger-error').css('display','none')
        var cart_local = localStorage.getItem('itemsToCheckout')
        // console.log(cart_local)
        var parse_cart = JSON.parse(cart_local)
        // console.log(parse_cart)
        // console.log(response)    
        var array_cart =[]
        for(var i =0; i<parse_cart.length; i++){
            // console.log(parse_cart[i].productNo)
            getProductsWithProductNo("", "", parse_cart[i].productNo).done(function (response) {
            // get_product_detail_func(parse_cart[i].productNo).done(function(response){
            // console.log(response)    
            // console.log(array_cart)
            array_cart.push(response)
            })
        }

        get_all_couriers().done(function(response){
            var dataAllKurir = response
            allKurir = response
            var kurir_kode =''
            for(var i=0; i<dataAllKurir.length; i++){
                if(dataAllKurir[i].Courier == new_kurir_pilihan){
                    kurir_kode = dataAllKurir[i].Courier_Code
                }
            }
            get_all_province_from_courier(new_kurir_pilihan,kurir_kode).done(function(response){
                province =response[0]
                allProvince = response
                // console.log(province,' ini all province 997')
                get_all_city_from_courier(new_kurir_pilihan,kurir_kode,province_pilihan).done(function(response){
                    kota = response[0]
                    allKota = response
                    // console.log(kota, ' ini kota')
                    get_all_district_from_courier(new_kurir_pilihan,kurir_kode,kota_pilihan).done(function(response){
                        district = response[0]
                        allDistrict = response
                        // console.log(allDistrict)
                        get_all_subdistrict_from_courier(new_kurir_pilihan,kurir_kode,district.District).done(function(response){
                            allSub_District = response
                            // console.log(allSub_District)
                            var total_berat_product=0
                            var Courier_Price_Code_orig = 'CGK01.00'
                            var packing_type = ''
                            var length = ''
                            var  width = '' 
                            var  height = ''
                            var paket_value = '' 
                            for(var i =0; i<array_cart.length; i++){
                                var berat_parse = array_cart[i].Weight_KG *1
                                if(berat_parse <= 0 || berat_parse == null || berat_parse == undefined || Number.isNaN(berat_parse)){
                                    berat_parse = 0.1*1.5;
                                }else{
                                    berat_parse = berat_parse*1*1.5;
                                }
                                console.log(berat_parse)
                                total_berat_product += berat_parse
                                console.log(total_berat_product,'ini total berat product')
                            }
                            new_get_shipping_cost_informations(Courier_Price_Code_orig , allSub_District[0].Courier_Price_Code, packing_type, total_berat_product, length, width, height, paket_value).done(function(response){
                                allPengiriman = response
                                console.log(response, ' ini shipping cost')
                                // $('.cart-kota').empty() 
                                $('.cart-kecamatan').empty()
                                $('.cart-kelurahan').empty()
                                $('.cart-kodepos').empty()
                                $('.cart-pengiriman').empty()
                                $('.cart-asuransi').empty()
                                $('.cart-packing').empty()
                                
                                // $('.cart-kota').append(`
                                //     <option selected  class="co-kota"> Kota</option>      
                                // `)
                                $('.cart-kecamatan').append(`
                                    <option selected  class="co-kecamatan"> Kecamatan</option>      
                                `)
                                $('.cart-kelurahan').append(`
                                    <option selected  class="co-kelurahan"> Kelurahan</option>      
                                `)
                                $('.cart-kodepos').append(`
                                    <option selected  class="co-kodepos"> Kodepos</option>      
                                `)
                                $('.cart-pengiriman').append(`
                                    <option selected  class="co-pengiriman"> Pengiriman</option>      
                                `)
                                $('.cart-asuransi').append(`
                                    <option selected  class="co-asuransi"> Asuransi</option>      
                                `)
                                $('.cart-packing').append(`
                                    <option selected  class="co-packing"> Packing</option>      
                                `)
                                // allKota.map((val,index)=>{
                                //     $('.cart-kota').append(`
                                //         <option  value="${val.City}" class="co-kota">${val.City}</option> 
                                //     `)
                                // })
                                allDistrict.map((val,index)=>{
                                    $('.cart-kecamatan').append(`
                                    <option  value="${val.District}" class="co-kecamatan">${val.District}</option> 
                                    `)
                                })
                                allSub_District.map((val,index)=>{
                                    $('.cart-kelurahan').append(`
                                    <option  value="${val.Sub_District}" class="co-kelurahan">${val.Sub_District}</option> 
                                    `)
                                    $('.cart-kodepos').append(`
                                    <option  value="${val.Zipcode}" class="co-kodepos">${val.Zipcode}</option> 
                                    `)
                                })
                                allPengiriman.service.map((val,index)=>{
                                    $('cart-pengiriman').append(`
                                        <option  value="${val.EST_DAY}days ${val.SERVICE} ${val.TARIFF} ${val.DESCRIPTION} " class="${val.TARIFF}">${val.EST_DAY}days ${val.SERVICE} ${val.TARIFF} ${val.DESCRIPTION}</option> 
                                    `)
                                })
                                allPengiriman.insurance.map((val,index)=>{
                                    // console.log(val, ' ini all pengiriman')
                                    // console.log(val.est_day)
                                    // console.log(val.EST_DAY)
                                    $('.cart-asuransi').append(`
                                        <option  value="type ${val.INSURANCE_TYPE} ${val.INSURANCE_NAME} ${val.INSURANCE_COST}" class="${val.INSURANCE_COST}">${val.INSURANCE_NAME} - RP ${val.INSURANCE_COST} </option> 
                                    `)
                                })
                                allPengiriman.packing.map((val,index)=>{
                                    // console.log(val, ' ini all pengiriman')
                                    // console.log(val.est_day)
                                    // console.log(val.EST_DAY)
                                    $('.cart-packing').append(`
                                        <option  value="${val.PACKING_TYPE}" class="${val.PACKING_FEE}">${val.PACKING_TYPE} - RP ${val.PACKING_FEE} </option> 
                                    `)
                                })
                            })
                        })
                    })
                })
            })
        })

    }else {
        $('.danger-error').css('display','flex')
        re_render_select_option()
        console.log(isKurir_pilihan, ' ini kurir pilihan')
        console.log(isProvince_pilihan, ' ini province pilihan')
        console.log(isKota_pilihan, ' ini province pilihan')
        console.log('masuk ke else ')
    }
}
const kecamatanCheckout=()=>{
    var province_pilihan=$('.cart-provinsi option:selected').val()
    var new_kurir_pilihan = $('#sub-delivery-option option:selected').val()
    var kota_pilihan = $('.cart-kota option:selected').val()
    var district_pilihan = $('.cart-kecamatan option:selected').val()

    var allKota =[]
    var allDistrict = []
    var allSub_District =[]
    var allPengiriman = []
    var allKurir = []
    
    var province =[]
    var kota =[]
    var district = []
    var sub_district = []
    
    var isKurir_pilihan = false
    var isProvince_pilihan = false
    var isKota_pilihan = false
    var isDistrict_pilihan = false
    var isSub_District_pilihan = false




    if(new_kurir_pilihan == undefined || new_kurir_pilihan == 'undefined' || new_kurir_pilihan == null || new_kurir_pilihan.length == 0 || new_kurir_pilihan == 'Kurir'){
        isKurir_pilihan = false
    }else {
        isKurir_pilihan = true
    }
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

    if(isKurir_pilihan && isProvince_pilihan && isKota_pilihan && isDistrict_pilihan){
        console.log('masuk ke if else ')
        $('.danger-error').css('display','none')
        var cart_local = localStorage.getItem('itemsToCheckout')
        console.log(cart_local)
        var parse_cart = JSON.parse(cart_local)
        console.log(parse_cart)
        // console.log(response)    
        var array_cart =[]
        for(var i =0; i<parse_cart.length; i++){
            console.log(parse_cart[i].productNo)
            getProductsWithProductNo("", "", parse_cart[i].productNo).done(function (response) {
            // get_product_detail_func(parse_cart[i].productNo).done(function(response){
            console.log(response)    
            console.log(array_cart)
            array_cart.push(response)
            })
        }

        get_all_couriers().done(function(response){
            var dataAllKurir = response
            allKurir = response
            var kurir_kode =''
            for(var i=0; i<dataAllKurir.length; i++){
                if(dataAllKurir[i].Courier == new_kurir_pilihan){
                    kurir_kode = dataAllKurir[i].Courier_Code
                }
            }
            get_all_province_from_courier(new_kurir_pilihan,kurir_kode).done(function(response){
                province =response[0]
                allProvince = response
                console.log(province,' ini all province 997')
                get_all_city_from_courier(new_kurir_pilihan,kurir_kode,province_pilihan).done(function(response){
                    kota = response[0]
                    allKota = response
                    console.log(kota, ' ini kota')
                    get_all_district_from_courier(new_kurir_pilihan,kurir_kode,kota_pilihan).done(function(response){
                        district = response[0]
                        allDistrict = response
                        console.log(allDistrict)
                        get_all_subdistrict_from_courier(new_kurir_pilihan,kurir_kode,district_pilihan).done(function(response){
                            allSub_District = response
                            console.log(allSub_District)
                            var total_berat_product=0
                            var Courier_Price_Code_orig = 'CGK01.00'
                            var packing_type = ''
                            var length = ''
                            var  width = '' 
                            var  height = ''
                            var paket_value = '' 
                            for(var i =0; i<array_cart.length; i++){
                                var berat_parse = array_cart[i].Weight_KG *1
                                if(berat_parse <= 0 || berat_parse == null || berat_parse == undefined || Number.isNaN(berat_parse)){
                                    berat_parse = 0.1*1.5;
                                }else{
                                    berat_parse = berat_parse*1*1.5;
                                }
                                console.log(berat_parse)
                                total_berat_product += berat_parse
                                console.log(total_berat_product,'ini total berat product')
                            }
                            new_get_shipping_cost_informations(Courier_Price_Code_orig , allSub_District[0].Courier_Price_Code, packing_type, total_berat_product, length, width, height, paket_value).done(function(response){
                                allPengiriman = response
                                console.log(response, ' ini shipping cost')
                                // $('.cart-kota').empty() 
                                // $('.cart-kecamatan').empty()
                                $('.cart-kelurahan').empty()
                                $('.cart-kodepos').empty()
                                $('.cart-pengiriman').empty()
                                $('.cart-asuransi').empty()
                                $('.cart-packing').empty()
                                
                                // $('.cart-kota').append(`
                                //     <option selected  class="co-kota"> Kota</option>      
                                // `)
                                // $('.cart-kecamatan').append(`
                                //     <option selected  class="co-kecamatan"> kecamatan</option>      
                                // `)
                                $('.cart-kelurahan').append(`
                                    <option selected  class="co-kelurahan"> Kelurahan</option>      
                                `)
                                $('.cart-kodepos').append(`
                                    <option selected  class="co-kodepos"> Kodepos</option>      
                                `)
                                $('.cart-pengiriman').append(`
                                    <option selected  class="co-pengiriman"> Pengiriman</option>      
                                `)
                                $('.cart-asuransi').append(`
                                    <option selected  value ="0" class="co-asuransi"> Asuransi</option>      
                                `)
                                $('.cart-packing').append(`
                                    <option selected  value ="0" class="co-packing"> Packing</option>      
                                `)
                                // allKota.map((val,index)=>{
                                //     $('.cart-kota').append(`
                                //         <option  value="${val.City}" class="co-kota">${val.City}</option> 
                                //     `)
                                // })
                                allDistrict.map((val,index)=>{
                                    $('.cart-kecamatan').append(`
                                    <option  value="${val.District}" class="co-kecamatan">${val.District}</option> 
                                    `)
                                })
                                allSub_District.map((val,index)=>{
                                    $('.cart-kelurahan').append(`
                                    <option  value="${val.Sub_District}" class="co-kelurahan">${val.Sub_District}</option> 
                                    `)
                                    $('.cart-kodepos').append(`
                                    <option  value="${val.Zipcode}" class="co-kodepos">${val.Zipcode}</option> 
                                    `)
                                })
                                allPengiriman.service.map((val,index)=>{
                                    $('cart-pengiriman').append(`
                                        <option  value="${val.EST_DAY}days ${val.SERVICE} ${val.TARIFF} ${val.DESCRIPTION} " class="${val.TARIFF}">${val.EST_DAY}days ${val.SERVICE} ${val.TARIFF} ${val.DESCRIPTION}</option> 
                                    `)
                                })
                                allPengiriman.insurance.map((val,index)=>{
                                    // console.log(val, ' ini all pengiriman')
                                    // console.log(val.est_day)
                                    // console.log(val.EST_DAY)
                                    $('.cart-asuransi').append(`
                                        <option  value="type ${val.INSURANCE_TYPE} ${val.INSURANCE_NAME} ${val.INSURANCE_COST}" class="${val.INSURANCE_COST}">${val.INSURANCE_NAME} - RP ${val.INSURANCE_COST} </option> 
                                    `)
                                })
                                allPengiriman.packing.map((val,index)=>{
                                    // console.log(val, ' ini all pengiriman')
                                    // console.log(val.est_day)
                                    // console.log(val.EST_DAY)
                                    $('.cart-packing').append(`
                                        <option  value="${val.PACKING_TYPE}" class="${val.PACKING_FEE}">${val.PACKING_TYPE} - RP ${val.PACKING_FEE} </option> 
                                    `)
                                })
                            })
                        })
                    })
                })
            })
        })

    }else {
        $('.danger-error').css('display','flex')
        re_render_select_option()
        console.log(isKurir_pilihan, ' ini kurir pilihan')
        console.log(isProvince_pilihan, ' ini province pilihan')
        console.log(isKota_pilihan, ' ini province pilihan')
        console.log('masuk ke else ')
    }
}
const kelurahanCheckout=()=>{
    var province_pilihan=$('.cart-provinsi option:selected').val()
    var new_kurir_pilihan = $('#sub-delivery-option option:selected').val()
    var kota_pilihan = $('.cart-kota option:selected').val()
    var district_pilihan = $('.cart-kecamatan option:selected').val()
    var sub_district_pilihan = $('.cart-kelurahan option:selected').val()

    console.log(province_pilihan, 'province pilihan')
    console.log(new_kurir_pilihan, 'new kurir pilihan pilihan')
    console.log(kota_pilihan, 'kota pilihan')
    console.log(district_pilihan, 'district pilihan')
    console.log(sub_district_pilihan, ' sub district')

    var allKota =[]
    var allDistrict = []
    var allSub_District =[]
    var allPengiriman = []
    var allKurir = []
    
    var province =[]
    var kota =[]
    var district = []
    var sub_district = []
    
    var isKurir_pilihan = false
    var isProvince_pilihan = false
    var isKota_pilihan = false
    var isDistrict_pilihan = false
    var isSub_District_pilihan = false




    if(new_kurir_pilihan == undefined || new_kurir_pilihan == 'undefined' || new_kurir_pilihan == null || new_kurir_pilihan.length == 0 || new_kurir_pilihan == 'kurir'){
        isKurir_pilihan = false
    }else {
        isKurir_pilihan = true
    }
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
    if(sub_district_pilihan == undefined || sub_district_pilihan == 'undefined' || sub_district_pilihan == null || sub_district_pilihan.length == 0 || sub_district_pilihan == 'kelurahan'){
        isSub_District_pilihan = false
    }else {
        isSub_District_pilihan = true
    }

    if(isKurir_pilihan && isProvince_pilihan && isKota_pilihan && isDistrict_pilihan && isSub_District_pilihan){
        console.log('masuk ke if else ')
        console.log(isKurir_pilihan,'kurir pilihan')
        
        console.log(isProvince_pilihan,'province pilihan')
        console.log(isKota_pilihan,'kota pilihan')
        console.log(isDistrict_pilihan,'kurir pilihan')
        console.log(isSub_District_pilihan,' sub district ')
        $('.danger-error').css('display','none')
        var cart_local = localStorage.getItem('itemsToCheckout')
        console.log(cart_local)
        var parse_cart = JSON.parse(cart_local)
        console.log(parse_cart)
        // console.log(response)    
        var array_cart =[]
        for(var i =0; i<parse_cart.length; i++){
            console.log(parse_cart[i].productNo)
            getProductsWithProductNo("", "", parse_cart[i].productNo).done(function (response) {
            // get_product_detail_func(parse_cart[i].productNo).done(function(response){
            console.log(response)    
            console.log(array_cart)
            array_cart.push(response)
            })
        }

        get_all_couriers().done(function(response){
            var dataAllKurir = response
            allKurir = response
            var kurir_kode =''
            for(var i=0; i<dataAllKurir.length; i++){
                if(dataAllKurir[i].Courier == new_kurir_pilihan){
                    kurir_kode = dataAllKurir[i].Courier_Code
                }
            }
            get_all_province_from_courier(new_kurir_pilihan,kurir_kode).done(function(response){
                province =response[0]
                allProvince = response
                console.log(province,' ini all province 997')
                get_all_city_from_courier(new_kurir_pilihan,kurir_kode,province_pilihan).done(function(response){
                    kota = response[0]
                    allKota = response
                    console.log(kota, ' ini kota')
                    get_all_district_from_courier(new_kurir_pilihan,kurir_kode,kota_pilihan).done(function(response){
                        district = response[0]
                        allDistrict = response
                        console.log(allDistrict)
                        get_all_subdistrict_from_courier(new_kurir_pilihan,kurir_kode,district_pilihan).done(function(response){
                            allSub_District = response
                            console.log(allSub_District)
                            var total_berat_product=0
                            var Courier_Price_Code_orig = 'CGK01.00'
                            var packing_type = ''
                            var length = ''
                            var  width = '' 
                            var  height = ''
                            var paket_value = '' 
                            for(var i =0; i<array_cart.length; i++){
                                var berat_parse = array_cart[i].Weight_KG *1
                                if(berat_parse <= 0 || berat_parse == null || berat_parse == undefined || Number.isNaN(berat_parse)){
                                    berat_parse = 0.1*1.5;
                                }else{
                                    berat_parse = berat_parse*1*1.5;
                                }
                                console.log(berat_parse)
                                total_berat_product += berat_parse
                                console.log(total_berat_product,'ini total berat product')
                            }
                            new_get_shipping_cost_informations(Courier_Price_Code_orig , allSub_District[0].Courier_Price_Code, packing_type, total_berat_product, length, width, height, paket_value).done(function(response){
                                allPengiriman = response
                                console.log(response, ' ini shipping cost')
                                // $('.cart-kota').empty() 
                                // $('.cart-kecamatan').empty()
                                // $('.cart-kelurahan').empty()
                                $('.cart-kodepos').empty()
                                $('.cart-pengiriman').empty()
                                $('.cart-asuransi').empty()
                                $('.cart-packing').empty()
                                
                                // $('.cart-kota').append(`
                                //     <option selected  class="co-kota"> Kota</option>      
                                // `)
                                // $('.cart-kecamatan').append(`
                                //     <option selected  class="co-kecamatan"> kecamatan</option>      
                                // `)
                                // $('.cart-kelurahan').append(`
                                //     <option selected  class="co-kelurahan"> kelurahan</option>      
                                // `)
                                $('.cart-kodepos').append(`
                                    <option selected  class="co-kodepos"> Kodepos</option>      
                                `)
                                $('.cart-pengiriman').append(`
                                    <option selected  class="co-pengiriman"> Pengiriman</option>      
                                `)
                                $('.cart-asuransi').append(`
                                    <option selected  value ="0" class="co-asuransi"> Asuransi</option>      
                                `)
                                $('.cart-packing').append(`
                                    <option selected  value ="0" class="co-packing"> Packing</option>      
                                `)
                                // allKota.map((val,index)=>{
                                //     $('.cart-kota').append(`
                                //         <option  value="${val.City}" class="co-kota">${val.City}</option> 
                                //     `)
                                // })
                                allDistrict.map((val,index)=>{
                                    $('.cart-kecamatan').append(`
                                    <option  value="${val.District}" class="co-kecamatan">${val.District}</option> 
                                    `)
                                })
                                allSub_District.map((val,index)=>{
                                    $('.cart-kelurahan').append(`
                                    <option  value="${val.Sub_District}" class="co-kelurahan">${val.Sub_District}</option> 
                                    `)
                                    $('.cart-kodepos').append(`
                                    <option  value="${val.Zipcode}" class="co-kodepos">${val.Zipcode}</option> 
                                    `)
                                })
                                allPengiriman.service.map((val,index)=>{
                                    
                                    $('.cart-pengiriman').append(`
                                        <option  value="${val.EST_DAY}days ${val.SERVICE} ${val.TARIFF} ${val.DESCRIPTION} " class="${val.TARIFF}">${val.EST_DAY}days ${val.SERVICE} ${val.TARIFF} ${val.DESCRIPTION}</option> 
                                    `)
                                })
                                allPengiriman.insurance.map((val,index)=>{
                                    // console.log(val, ' ini all pengiriman')
                                    // console.log(val.est_day)
                                    // console.log(val.EST_DAY)
                                    $('.cart-asuransi').append(`
                                        <option  value="type ${val.INSURANCE_TYPE} ${val.INSURANCE_NAME} ${val.INSURANCE_COST}" class="${val.INSURANCE_COST}">${val.INSURANCE_NAME} - RP ${val.INSURANCE_COST} </option> 
                                    `)
                                })
                                allPengiriman.packing.map((val,index)=>{
                                    // console.log(val, ' ini all pengiriman')
                                    // console.log(val.est_day)
                                    // console.log(val.EST_DAY)
                                    $('.cart-packing').append(`
                                        <option  value="${val.PACKING_TYPE}" class="${val.PACKING_FEE}">${val.PACKING_TYPE} - RP ${val.PACKING_FEE} </option> 
                                    `)
                                })
                            })
                        })
                    })
                })
            })
        })

    }else {
        $('.danger-error').css('display','flex')
        re_render_select_option()
        console.log(isKurir_pilihan, ' ini kurir pilihan')
        console.log(isProvince_pilihan, ' ini province pilihan')
        console.log(isKota_pilihan, ' ini province pilihan')
        console.log('masuk ke else ')
    }
}
const kodeposCheckout=()=>{
    
}
const pengirimanCheckout=()=>{
    var province_pilihan=$('.cart-provinsi option:selected').val()
    var new_kurir_pilihan = $('#sub-delivery-option option:selected').val()
    var kota_pilihan = $('.cart-kota option:selected').val()
    var district_pilihan = $('.cart-kecamatan option:selected').val()
    var sub_district_pilihan = $('.cart-kelurahan option:selected').val()
    var pengiriman_pilihan = $('.cart-pengiriman option:selected').val()

    var harga_shipping = parseInt($('.cart-pengiriman option:selected').attr('class'))
    var array_cart = localStorage.getItem('itemsToCheckout')
    var json_array_cart = JSON.parse(array_cart)
 
    
    var harga_barang = 0
    for(var i=0; i<json_array_cart.length; i++){
        var harga_per_item = parseInt(removeComma(json_array_cart[i].priceAgreed))
        console.log(harga_per_item,' harga per item')
        console.log(json_array_cart[i])
        harga_barang += json_array_cart[i].quantity * harga_per_item
    }
    var harga_barang_with_shipping =  harga_barang + harga_shipping

    var allKota =[]
    var allDistrict = []
    var allSub_District =[]
    var allPengiriman = []
    var allKurir = []
    
    var province =[]
    var kota =[]
    var district = []
    var sub_district = []
    
    
    var isKurir_pilihan = false
    var isProvince_pilihan = false
    var isKota_pilihan = false
    var isDistrict_pilihan = false
    var isSub_District_pilihan = false
    var isPengiriman_pilihan




    if(new_kurir_pilihan == undefined || new_kurir_pilihan == 'undefined' || new_kurir_pilihan == null || new_kurir_pilihan.length == 0 || new_kurir_pilihan == 'Kurir'){
        isKurir_pilihan = false
    }else {
        isKurir_pilihan = true
    }
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
    if(sub_district_pilihan == undefined || sub_district_pilihan == 'undefined' || sub_district_pilihan == null || sub_district_pilihan.length == 0 || sub_district_pilihan == 'Kelurahan'){
        isSub_District_pilihan = false
    }else {
        isSub_District_pilihan = true
    }
    if(pengiriman_pilihan == undefined || pengiriman_pilihan == 'undefined' || pengiriman_pilihan == null || pengiriman_pilihan.length == 0 || pengiriman_pilihan == 'pengiriman'){
        isPengiriman_pilihan = false
    }else {
        isPengiriman_pilihan = true
    }

    if(isKurir_pilihan && isProvince_pilihan && isKota_pilihan && isDistrict_pilihan && isSub_District_pilihan && isPengiriman_pilihan){
        console.log('masuk ke if else ')
        $('.danger-error').css('display','none')
        var cart_local = localStorage.getItem('itemsToCheckout')
        console.log(cart_local)
        var parse_cart = JSON.parse(cart_local)
        console.log(parse_cart)
        // console.log(response)    
        var array_cart =[]
        for(var i =0; i<parse_cart.length; i++){
            console.log(parse_cart[i].productNo)
            getProductsWithProductNo("", "", parse_cart[i].productNo).done(function (response) {
            // get_product_detail_func(parse_cart[i].productNo).done(function(response){
            console.log(response)    
            console.log(array_cart)
            array_cart.push(response)
            })
        }

        get_all_couriers().done(function(response){
            var dataAllKurir = response
            allKurir = response
            var kurir_kode =''
            for(var i=0; i<dataAllKurir.length; i++){
                if(dataAllKurir[i].Courier == new_kurir_pilihan){
                    kurir_kode = dataAllKurir[i].Courier_Code
                }
            }
            get_all_province_from_courier(new_kurir_pilihan,kurir_kode).done(function(response){
                province =response[0]
                allProvince = response
                console.log(province,' ini all province 997')
                get_all_city_from_courier(new_kurir_pilihan,kurir_kode,province_pilihan).done(function(response){
                    kota = response[0]
                    allKota = response
                    console.log(kota, ' ini kota')
                    get_all_district_from_courier(new_kurir_pilihan,kurir_kode,kota_pilihan).done(function(response){
                        district = response[0]
                        allDistrict = response
                        console.log(allDistrict)
                        get_all_subdistrict_from_courier(new_kurir_pilihan,kurir_kode,district_pilihan).done(function(response){
                            allSub_District = response
                            console.log(allSub_District)
                            var total_berat_product=0
                            var Courier_Price_Code_orig = 'CGK01.00'
                            var packing_type = ''
                            var length = ''
                            var  width = '' 
                            var  height = ''
                            var paket_value = '' 
                            for(var i =0; i<array_cart.length; i++){
                                var berat_parse = array_cart[i].Weight_KG *1
                                if(berat_parse <= 0 || berat_parse == null || berat_parse == undefined || Number.isNaN(berat_parse)){
                                    berat_parse = 0.1*1.5;
                                }else{
                                    berat_parse = berat_parse*1*1.5;
                                }
                                console.log(berat_parse)
                                total_berat_product += berat_parse
                                console.log(total_berat_product,'ini total berat product')
                            }
                            new_get_shipping_cost_informations(Courier_Price_Code_orig , allSub_District[0].Courier_Price_Code, packing_type, total_berat_product, length, width, height, paket_value).done(function(response){
                                allPengiriman = response
                                console.log(response, ' ini shipping cost')
                             
                                $('.cart-asuransi').empty()
                                $('.cart-packing').empty()
                                
                             
                                $('.cart-asuransi').append(`
                                    <option selected  value="0" class="co-asuransi"> asuransi</option>      
                                `)
                                $('.cart-packing').append(`
                                    <option selected value="0" class="co-packing"> packing</option>      
                                `)
                      
                                allPengiriman.insurance.map((val,index)=>{
                                    // console.log(val, ' ini all pengiriman')
                                    // console.log(val.est_day)
                                    // console.log(val.EST_DAY)
                                    $('.cart-asuransi').append(`
                                        <option  value="type ${val.INSURANCE_TYPE} ${val.INSURANCE_NAME} ${val.INSURANCE_COST}" class="${val.INSURANCE_COST}">${val.INSURANCE_NAME} - RP ${val.INSURANCE_COST} </option> 
                                    `)
                                })
                                allPengiriman.packing.map((val,index)=>{
                                    // console.log(val, ' ini all pengiriman')
                                    // console.log(val.est_day)
                                    // console.log(val.EST_DAY)
                                    $('.cart-packing').append(`
                                        <option  value="${val.PACKING_TYPE}" class="${val.PACKING_FEE}">${val.PACKING_TYPE} - RP ${val.PACKING_FEE} </option> 
                                    `)
                                })

                                $('#final_checkout_delivery_row').empty()
                                $('#final_checkout_total_price_row').empty()

                                $('#final_checkout_delivery_row').append(`
                                    <td> ${new_kurir_pilihan} </td>
                                    <td> ${harga_shipping} </td>
                                `)
                                
                                $('#final_checkout_total_price_row').append(`
                                    <td>${harga_barang_with_shipping} </td>
                                `)
                            })
                        })
                    })
                })
            })
        })

    }else {
        $('.danger-error').css('display','flex')
        re_render_select_option()
        console.log(isKurir_pilihan, ' ini kurir pilihan')
        console.log(isProvince_pilihan, ' ini province pilihan')
        console.log(isKota_pilihan, ' ini province pilihan')
        console.log('masuk ke else ')
    }
}
const asuransiCheckout=()=>{
    var province_pilihan=$('.cart-provinsi option:selected').val()
    var new_kurir_pilihan = $('#sub-delivery-option option:selected').val()
    var kota_pilihan = $('.cart-kota option:selected').val()
    var district_pilihan = $('.cart-kecamatan option:selected').val()
    var sub_district_pilihan = $('.cart-kelurahan option:selected').val()
    var pengiriman_pilihan = $('.cart-pengiriman option:selected').val()
    var asuransi_pilihan = $('.cart-asuransi option:selected').val()

    var harga_shipping = parseInt($('.cart-pengiriman option:selected').attr('class'))
    var harga_asuransi = parseInt($('.cart-asuransi option:selected').attr('class'))
    var array_cart = localStorage.getItem('itemsToCheckout')
    var json_array_cart = JSON.parse(array_cart)
    console.log(harga_asuransi,'2392')
    
    if(asuransi_pilihan == '0'){
        harga_asuransi = 0
    }
    
    var harga_barang = 0
    for(var i=0; i<json_array_cart.length; i++){
        var harga_per_item = parseInt(removeComma(json_array_cart[i].priceAgreed))
        console.log(harga_per_item,' harga per item')
        console.log(json_array_cart[i])
        harga_barang += json_array_cart[i].quantity * harga_per_item
    }
    var harga_barang_with_shipping =  harga_barang + harga_shipping + harga_asuransi

    var allKota =[]
    var allDistrict = []
    var allSub_District =[]
    var allPengiriman = []
    var allKurir = []
    
    var province =[]
    var kota =[]
    var district = []
    var sub_district = []
    
    var isKurir_pilihan = false
    var isProvince_pilihan = false
    var isKota_pilihan = false
    var isDistrict_pilihan = false
    var isSub_District_pilihan = false
    var isPengiriman_pilihan = false
    var isAsuransi_pilihan= false




    if(new_kurir_pilihan == undefined || new_kurir_pilihan == 'undefined' || new_kurir_pilihan == null || new_kurir_pilihan.length == 0 || new_kurir_pilihan == 'Kurir'){
        isKurir_pilihan = false
    }else {
        isKurir_pilihan = true
    }
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
    if(sub_district_pilihan == undefined || sub_district_pilihan == 'undefined' || sub_district_pilihan == null || sub_district_pilihan.length == 0 || sub_district_pilihan == 'Kelurahan'){
        isSub_District_pilihan = false
    }else {
        isSub_District_pilihan = true
    }
    if(pengiriman_pilihan == undefined || pengiriman_pilihan == 'undefined' || pengiriman_pilihan == null || pengiriman_pilihan.length == 0 || pengiriman_pilihan == 'pengiriman'){
        isPengiriman_pilihan = false
    }else {
        isPengiriman_pilihan = true
    }
    if(asuransi_pilihan == undefined || asuransi_pilihan == 'undefined' || asuransi_pilihan == null || asuransi_pilihan.length == 0 || asuransi_pilihan == 'Asuransi'){
        isAsuransi_pilihan = false
    }else {
        isAsuransi_pilihan = true
    }

    if(isKurir_pilihan && isProvince_pilihan && isKota_pilihan && isDistrict_pilihan && isSub_District_pilihan && isPengiriman_pilihan && isAsuransi_pilihan){
        console.log('masuk ke if else ')
        $('.danger-error').css('display','none')
        var cart_local = localStorage.getItem('itemsToCheckout')
        console.log(cart_local)
        var parse_cart = JSON.parse(cart_local)
        console.log(parse_cart)
        // console.log(response)    
        var array_cart =[]
        for(var i =0; i<parse_cart.length; i++){
            console.log(parse_cart[i].productNo)
            getProductsWithProductNo("", "", parse_cart[i].productNo).done(function (response) {
            // get_product_detail_func(parse_cart[i].productNo).done(function(response){
            console.log(response)    
            console.log(array_cart)
            array_cart.push(response)
            })
        }

        get_all_couriers().done(function(response){
            var dataAllKurir = response
            allKurir = response
            var kurir_kode =''
            for(var i=0; i<dataAllKurir.length; i++){
                if(dataAllKurir[i].Courier == new_kurir_pilihan){
                    kurir_kode = dataAllKurir[i].Courier_Code
                }
            }
            get_all_province_from_courier(new_kurir_pilihan,kurir_kode).done(function(response){
                province =response[0]
                allProvince = response
                console.log(province,' ini all province 997')
                get_all_city_from_courier(new_kurir_pilihan,kurir_kode,province_pilihan).done(function(response){
                    kota = response[0]
                    allKota = response
                    console.log(kota, ' ini kota')
                    get_all_district_from_courier(new_kurir_pilihan,kurir_kode,kota_pilihan).done(function(response){
                        district = response[0]
                        allDistrict = response
                        console.log(allDistrict)
                        get_all_subdistrict_from_courier(new_kurir_pilihan,kurir_kode,district_pilihan).done(function(response){
                            allSub_District = response
                            console.log(allSub_District)
                            var total_berat_product=0
                            var Courier_Price_Code_orig = 'CGK01.00'
                            var packing_type = ''
                            var length = ''
                            var  width = '' 
                            var  height = ''
                            var paket_value = '' 
                            for(var i =0; i<array_cart.length; i++){
                                var berat_parse = array_cart[i].Weight_KG *1
                                if(berat_parse <= 0 || berat_parse == null || berat_parse == undefined || Number.isNaN(berat_parse)){
                                    berat_parse = 0.1*1.5;
                                }else{
                                    berat_parse = berat_parse*1*1.5;
                                }
                                console.log(berat_parse)
                                total_berat_product += berat_parse
                                console.log(total_berat_product,'ini total berat product')
                            }
                            new_get_shipping_cost_informations(Courier_Price_Code_orig , allSub_District[0].Courier_Price_Code, packing_type, total_berat_product, length, width, height, paket_value).done(function(response){
                                allPengiriman = response
                                console.log(response, ' ini shipping cost')
                             
                                // $('.cart-asuransi').empty()
                                $('.cart-packing').empty()
                                
                             
                             
                                $('.cart-packing').append(`
                                    <option selected value="0"  class="co-packing"> Packing</option>      
                                `)
                      
                                
                                allPengiriman.packing.map((val,index)=>{
                                    // console.log(val, ' ini all pengiriman')
                                    // console.log(val.est_day)
                                    // console.log(val.EST_DAY)
                                    $('.cart-packing').append(`
                                        <option  value="${val.PACKING_TYPE}" class="${val.PACKING_FEE}">${val.PACKING_TYPE} - RP ${val.PACKING_FEE} </option> 
                                    `)
                                })

                                $('#final_checkout_delivery_row').empty()
                                $('#final_checkout_total_price_row').empty()

                                
                                
                                $('#final_checkout_delivery_row').append(`
                                    <td> ${new_kurir_pilihan} </td>
                                    <td> ${harga_shipping} </td>
                                `)
                                $('#final_checkout_total_price_row').append(`
                                    <td>${harga_barang_with_shipping} </td>
                                `)

                                if(asuransi_pilihan == 'asuransi' || asuransi_pilihan == 'ASURANSI' || asuransi_pilihan == undefined || asuransi_pilihan == null || asuransi_pilihan == '0'){
                                    $('#final_checkout_insurance_row').empty()
                                    console.log(asuransi_pilihan,'2561')
                                    $('.final_checkout_insurance_fee').css('display','none')
                                }else {
                                        console.log(asuransi_pilihan,'2561')
                                    $('.final_checkout_insurance_fee').css('display','block')
                                    $('#final_checkout_insurance_row').empty()
                                    $('#final_checkout_insurance_row').append(`
                                        <td> ${asuransi_pilihan} </td>
                                        <td> ${harga_asuransi} </td>
                                    `)

                                }
                                
                              

                            })
                        })
                    })
                })
            })
        })

    }else {
        $('.danger-error').css('display','flex')
        re_render_select_option()
        console.log(isKurir_pilihan, ' ini kurir pilihan')
        console.log(isProvince_pilihan, ' ini province pilihan')
        console.log(isKota_pilihan, ' ini province pilihan')
        console.log('masuk ke else ')
    }
}
const packingCheckout=()=>{
    var province_pilihan=$('.cart-provinsi option:selected').val()
    var new_kurir_pilihan = $('#sub-delivery-option option:selected').val()
    var kota_pilihan = $('.cart-kota option:selected').val()
    var district_pilihan = $('.cart-kecamatan option:selected').val()
    var sub_district_pilihan = $('.cart-kelurahan option:selected').val()
    var pengiriman_pilihan = $('.cart-pengiriman option:selected').val()
    var asuransi_pilihan = $('.cart-asuransi option:selected').val()
    var packing_pilihan = $('.cart-packing option:selected').val()
    var harga_packing = parseInt($('.cart-packing option:selected').attr('class'))

    var harga_shipping = parseInt($('.cart-pengiriman option:selected').attr('class'))
    var array_cart = localStorage.getItem('itemsToCheckout')
    var json_array_cart = JSON.parse(array_cart)
    
    if(packing_pilihan == '0'){
        harga_packing = 0
    }

    if(asuransi_pilihan == '0'){
        harga_asuransi = 0
    }
    
    var harga_barang = 0
    for(var i=0; i<json_array_cart.length; i++){
        var harga_per_item = parseInt(removeComma(json_array_cart[i].priceAgreed))
        console.log(harga_per_item,' harga per item')
        console.log(json_array_cart[i])
        harga_barang += json_array_cart[i].quantity * harga_per_item
    }
    var harga_barang_with_shipping =  harga_barang + harga_shipping + harga_packing
    
    var allKota =[]
    var allDistrict = []
    var allSub_District =[]
    var allPengiriman = []
    var allKurir = []
    
    var province =[]
    var kota =[]
    var district = []
    var sub_district = []
    
    var isKurir_pilihan = false
    var isProvince_pilihan = false
    var isKota_pilihan = false
    var isDistrict_pilihan = false
    var isSub_District_pilihan = false
    var isPengiriman_pilihan = false
    var isAsuransi_pilihan= false
    var isPacking_pilihan= false




    if(new_kurir_pilihan == undefined || new_kurir_pilihan == 'undefined' || new_kurir_pilihan == null || new_kurir_pilihan.length == 0 || new_kurir_pilihan == 'Kurir'){
        isKurir_pilihan = false
    }else {
        isKurir_pilihan = true
    }
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
    if(sub_district_pilihan == undefined || sub_district_pilihan == 'undefined' || sub_district_pilihan == null || sub_district_pilihan.length == 0 || sub_district_pilihan == 'Kelurahan'){
        isSub_District_pilihan = false
    }else {
        isSub_District_pilihan = true
    }
    if(pengiriman_pilihan == undefined || pengiriman_pilihan == 'undefined' || pengiriman_pilihan == null || pengiriman_pilihan.length == 0 || pengiriman_pilihan == 'Pengiriman'){
        isPengiriman_pilihan = false
    }else {
        isPengiriman_pilihan = true
    }
    if(asuransi_pilihan == undefined || asuransi_pilihan == 'undefined' || asuransi_pilihan == null || asuransi_pilihan.length == 0 || asuransi_pilihan == 'Asuransi'){
        isAsuransi_pilihan = false
    }else {
        isAsuransi_pilihan = true
    }
    if(packing_pilihan == undefined || packing_pilihan == 'undefined' || packing_pilihan == null || packing_pilihan.length == 0 || packing_pilihan == 'Packing'){
        isPacking_pilihan = false
    }else {
        isPacking_pilihan = true
    }

    if(isKurir_pilihan && isProvince_pilihan && isKota_pilihan && isDistrict_pilihan && isSub_District_pilihan && isPengiriman_pilihan && isAsuransi_pilihan &&  isPacking_pilihan){
        console.log('masuk ke if else ')
        $('.danger-error').css('display','none')
        var cart_local = localStorage.getItem('itemsToCheckout')
        console.log(cart_local)
        var parse_cart = JSON.parse(cart_local)
        console.log(parse_cart)
        // console.log(response)    
        var array_cart =[]
        for(var i =0; i<parse_cart.length; i++){
            console.log(parse_cart[i].productNo)
            getProductsWithProductNo("", "", parse_cart[i].productNo).done(function (response) {
            // get_product_detail_func(parse_cart[i].productNo).done(function(response){
            console.log(response)    
            console.log(array_cart)
            array_cart.push(response)
            })
        }

        get_all_couriers().done(function(response){
            var dataAllKurir = response
            allKurir = response
            var kurir_kode =''
            for(var i=0; i<dataAllKurir.length; i++){
                if(dataAllKurir[i].Courier == new_kurir_pilihan){
                    kurir_kode = dataAllKurir[i].Courier_Code
                }
            }
            get_all_province_from_courier(new_kurir_pilihan,kurir_kode).done(function(response){
                province =response[0]
                allProvince = response
                console.log(province,' ini all province 997')
                get_all_city_from_courier(new_kurir_pilihan,kurir_kode,province_pilihan).done(function(response){
                    kota = response[0]
                    allKota = response
                    console.log(kota, ' ini kota')
                    get_all_district_from_courier(new_kurir_pilihan,kurir_kode,kota_pilihan).done(function(response){
                        district = response[0]
                        allDistrict = response
                        console.log(allDistrict)
                        get_all_subdistrict_from_courier(new_kurir_pilihan,kurir_kode,district_pilihan).done(function(response){
                            allSub_District = response
                            console.log(allSub_District)
                            var total_berat_product=0
                            var Courier_Price_Code_orig = 'CGK01.00'
                            var packing_type = ''
                            var length = ''
                            var  width = '' 
                            var  height = ''
                            var paket_value = '' 
                            for(var i =0; i<array_cart.length; i++){
                                var berat_parse = array_cart[i].Weight_KG *1
                                if(berat_parse <= 0 || berat_parse == null || berat_parse == undefined || Number.isNaN(berat_parse)){
                                    berat_parse = 0.1*1.5;
                                }else{
                                    berat_parse = berat_parse*1*1.5;
                                }
                                console.log(berat_parse)
                                total_berat_product += berat_parse
                                console.log(total_berat_product,'ini total berat product')
                            }
                            new_get_shipping_cost_informations(Courier_Price_Code_orig , allSub_District[0].Courier_Price_Code, packing_type, total_berat_product, length, width, height, paket_value).done(function(response){
                                allPengiriman = response
                                console.log(response, ' ini shipping cost')
                                
                                $('#final_checkout_delivery_row').empty()
                                $('#final_checkout_total_price_row').empty()

                                

                                $('#final_checkout_delivery_row').append(`
                                    <td> ${new_kurir_pilihan} </td>
                                    <td> ${harga_shipping} </td>
                                `)
  
                                $('#final_checkout_total_price_row').append(`
                                    <td>${harga_barang_with_shipping} </td>
                                `)



                                if(packing_pilihan == 'packing' || packing_pilihan == 'Packing' || packing_pilihan == undefined || packing_pilihan == null || packing_pilihan == '0'){
                                    $('#final_checkout_packing_row').empty()
                                    console.log(packing_pilihan,'2561')
                                    $('.final_checkout_packing_fee').css('display','none')
                                }else {
                                        console.log(packing_pilihan,'2561')
                                    $('.final_checkout_packing_fee').css('display','block')
                                    $('#final_checkout_packing_row').empty()
                                    $('#final_checkout_packing_row').append(`
                                        <td> ${packing_pilihan} </td>
                                        <td> ${harga_packing} </td>
                                    `)

                                }
                                
                            })
                        })
                    })
                })
            })
        })

    }else {
        $('.danger-error').css('display','flex')
        re_render_select_option()
        console.log(isKurir_pilihan, ' ini kurir pilihan')
        console.log(isProvince_pilihan, ' ini province pilihan')
        console.log(isKota_pilihan, ' ini province pilihan')
        console.log('masuk ke else ')
    }
}