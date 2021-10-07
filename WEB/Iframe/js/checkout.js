$(document).ready(async function(){
    getCustomersWithCustomerNo(localStorage.getItem("token")).done(function (response) {
        if(response != false){
            if(response.Address_1 != "NULL" && response.Address_1 != null && response.Address_1 != "undefined"){
                $("#sub-saved-address").append("<option value=\"" + response.Address_1 + "\">" + response.Address_1 + "</option>");
            }
            if(response.Address_2 != "NULL" && response.Address_2 != null && response.Address_2 != "undefined"){
                $("#sub-saved-address").append("<option value=\"" + response.Address_2 + "\">" + response.Address_2 + "</option>");
            }
            if(response.Address_3 != "NULL" && response.Address_3 != null && response.Address_3 != "undefined"){
                $("#sub-saved-address").append("<option value=\"" + response.Address_3 + "\">" + response.Address_3 + "</option>");
            }
            if(response.Address_4 != "NULL" && response.Address_4 != null && response.Address_4 != "undefined"){
                $("#sub-saved-address").append("<option value=\"" + response.Address_4 + "\">" + response.Address_4 + "</option>");
            }
            if(response.Address_5 != "NULL" && response.Address_5 != null && response.Address_5 != "undefined"){
                $("#sub-saved-address").append("<option value=\"" + response.Address_5 + "\">" + response.Address_5 + "</option>");
            }
        }
        var name = response.First_Name + " " + response.Last_Name;
    });
    // renderListDeliveryFee();
    loadCheckoutFinalConfirmationTable("COD");
    listPaymentMethods();


    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const checkout = urlParams.get('checkout_array');
    
    var checkout_stringify = JSON.parse(checkout)
    
    if(checkout != undefined){
        
        renderCartCheckout(checkout_stringify)
    }
    
    // var cartToJson = JSON.parse(localStorage.getItem("itemsInCart"));
    // if(cartToJson.length != 0 ){
    //     var array = []
    //     var i =0;
    //     for( i; i<cartToJson.length; i++){
    //         var productToBeAdded = {
    //             productNo: cartToJson[i].productNo,
    //             quantity: parseInt($("#quantity" + cartToJson[i].productNo).val()),
    //             GroupCode: "NO COUPON",
    //             priceAgreed: $("#" + cartToJson[i].productNo).val()
    //         };
    //         array.push(productToBeAdded);
    //         
    //         // saving to storage
    //         // var productToBeAddedStringify = JSON.stringify(array);
    //     }
        
    // }
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
                // Swal.fire("OTP terkirim ke email", `${response.Email}`, "success");
                Swal.fire({
                    html:`
                    <div class="o-circle c-container__circle o-circle__sign--success">
                        <div class="o-circle__sign"></div>  
                    </div>   
                    OTP Terkirim ke Email
                    `,
                    timer:2000,
                    
                })
            });
        }else{
            // Swal.fire("Please give me your email", `${response.Email}`, "warning");
            Swal.fire({
                html:`
                <div class="o-circle c-container__circle o-circle__sign--failure">
                    <div class="o-circle__sign"></div>  
                </div> 
                Please Give Me Your Email`,
                timer:2000,
                
            })
        }
    });
}

function loadingMessage(timer){
    let timerInterval
    Swal.fire({
    // title: 'Loading Your Request',
    html: `
    <div class="boxcon">
        <div class="box1">
        </div>
        <div id="sold-id-loading">
        SOLD 
        </div>
            
        <div class="box2">
        </div>
    </div>
    `,
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
            
        }
    })
}

function listPaymentMethods(){
    getPaymentMethods().done(function (response) {
        // 
        var i = 0;
        for(i = 0; i < response.length; i++){
            $("#payment-selection").append("<option>" + response[i].Payment_Method_Name + "</option>");
        }
    });
}

function loadCheckoutFinalConfirmationTable(condition){
    var dataItemsToCheckout = JSON.parse(localStorage.getItem("itemsToCheckout"));

    dataItemsToCheckout.forEach((val,index)=>{
        if(val.quantity > 10){
            
        }else {
            
        }
    })

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
         
        itemsToCheckout.map((val,id)=>{
            // parseFloat('100,000.00'.replace(/,/g, ''))
            var price = parseFloat(val.priceAgreed.replace(/,/g, ''))
            total_price_with_shipping +=price
            // 
        })
        

        var itemsToCheckout = JSON.parse(localStorage.getItem("itemsToCheckout"));
        var i = 0;
        for(i; i < itemsToCheckout.length; i++){
            getProductsWithProductNo("", "", itemsToCheckout[i].productNo).done(function (response) {
                var i = 0;
                var itemsToCheckout = JSON.parse(localStorage.getItem("itemsToCheckout"));
                for(i; i < itemsToCheckout.length; i++){
                    // 
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
        // 
        var Shipping_selection = $("#sub-delivery-option").children("option:selected").val();
        // 
        $("#final_checkout_delivery_row").empty()
        $("#final_checkout_total_price_row").empty()
        $('#final_checkout_delivery_row').append(`
            <td> ${Shipping_option} </td>
            <td></td>
        `)
        $('#final_checkout_total_price_row').append(`
            <td>${total_price_with_shipping} </td>
        `)

    }else if(condition == "COD"){
        // render_select_option_kurir()
        var itemsToCheckout = JSON.parse(localStorage.getItem("itemsToCheckout"));
        var i = 0;
        var harga_shipping = 20000
        var total_price_with_shipping=harga_shipping
        var Shipping_option = $('#sub-delivery-option option:selected').val()
        itemsToCheckout.map((val,id)=>{
            // 
            // parseFloat('100,000.00'.replace(/,/g, ''))
            var price = parseFloat(val.priceAgreed.replace(/,/g, ''))
            total_price_with_shipping +=price
            // 
        })
        
        
        // 
        for(i; i < itemsToCheckout.length; i++){
            getProductsWithProductNo("", "", itemsToCheckout[i].productNo).done(function (response) {
                // 
                // 
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
        $("#final_checkout_delivery_row").empty()
        $("#final_checkout_total_price_row").empty()
        $('#final_checkout_delivery_row').append(`
            <td> ${Shipping_option} </td>
            <td>  </td>
        `)
        // 
        $('#final_checkout_total_price_row').append(`
            <td>${total_price_with_shipping} </td>
        `)

      
       
    }else{
      
        var itemsToCheckout = JSON.parse(localStorage.getItem("itemsToCheckout"));
        var i = 0;
        var harga_shipping = 20000
        var total_price_with_shipping=harga_shipping
        var Shipping_option = $('#sub-delivery-option option:selected').val()
        // 
        itemsToCheckout.map((val,id)=>{
            // 
            // parseFloat('100,000.00'.replace(/,/g, ''))
            var price = parseFloat(val.priceAgreed.replace(/,/g, ''))
            total_price_with_shipping +=price
            // 
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
        // 
        $('#final_checkout_total_price_row').append(`
            <td>${total_price_with_shipping} </td>
        `)

      
    }
}

function periodOptionSelected(x){
    // 
    if($(x).children("option:selected").val().toUpperCase() == "TRANSFER"){
        // alert('masuk ke if')
        // swal.fire("Compare to Virtual Account Transfer, Normal Transfer may take longer time to process", "make sure you make the payment as soon as possible for your order to be processed","warning");
        Swal.fire({
            html:`
            <div class="o-circle c-container__circle o-circle__sign--failure">
                <div class="o-circle__sign"></div>  
            </div> 
            Compare to Virtual Account Transfer, Normal Transfer may take longer time to process", <br> "make sure you make the payment as soon as possible for your order to be processed`,
            timer:2000,
            
        })
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
        $('#sub-cart-option').css('display','block')
        $('#sub-kota-option').css('display','block')
        $('#sub-kecamatan-option').css('display','block')
        $('#sub-kelurahan-option').css('display','block')
        $('#sub-kodepos-option').css('display','block')
        $('#sub-delivery-option').css('display','block')
        // re_render_select_option()
        
    }else{
        $("#address-selection-sub-saved-address").css("display", "block");
        $("#new-address-section").css("display", "none");
        $("#new-address-section").css("display", "none");
        $('#sub-cart-option').css('display','none')
        $('#sub-kota-option').css('display','none')
        $('#sub-kecamatan-option').css('display','none')
        $('#sub-kelurahan-option').css('display','none')
        re_render_select_option()
        // $('#sub-kodepos-option').css('display','none')
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

        loadingMessage(1)
        
        $('.danger-alert').css('display','none')
        var cart_local = localStorage.getItem('itemsToCheckout')
        
        var parse_cart = JSON.parse(cart_local)
        
        // 
        var array_cart =[]
        for(var i =0; i<parse_cart.length; i++){
            
            getProductsWithProductNo("", "", parse_cart[i].productNo).done(function (response) {
            // get_product_detail_func(parse_cart[i].productNo).done(function(response){
            // 
            // 
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
                
                
                get_all_city_from_courier(new_kurir_pilihan,kurir_kode,province.Province).done(function(response){
                    kota = response[0]
                    allKota = response
                    
                    get_all_district_from_courier(new_kurir_pilihan,kurir_kode,kota.City).done(function(response){
                        district = response[0]
                        allDistrict = response
                        
                        get_all_subdistrict_from_courier(new_kurir_pilihan,kurir_kode,district.District).done(function(response){
                            allSub_District = response
                            
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
                                
                                total_berat_product += berat_parse
                                
                            }
                            new_get_shipping_cost_informations(Courier_Price_Code_orig , allSub_District[0].Courier_Price_Code, packing_type, total_berat_product, length, width, height, paket_value).done(function(response){
                                allPengiriman = response
                                


                                
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


                                if(allPengiriman){
                                    if(allPengiriman.service != undefined){
                                        allPengiriman.service.map((val,index)=>{
                                            $('.cart-pengiriman').append(`
                                                <option  value="${val.EST_DAY}days ${val.SERVICE} ${val.TARIFF} ${val.DESCRIPTION} " class="${val.TARIFF}">${val.EST_DAY}days ${val.SERVICE} ${val.TARIFF} ${val.DESCRIPTION}</option> 
                                            `)
                                        })
                                    }
                                    if(allPengiriman.insurance != undefined){
                                        allPengiriman.insurance.map((val,index)=>{
                                            // 
                                            // 
                                            // 
                                            $('.cart-asuransi').append(`
                                                <option  value="type ${val.INSURANCE_TYPE} ${val.INSURANCE_NAME} ${val.INSURANCE_COST}" class="${val.INSURANCE_COST}">${val.INSURANCE_NAME} - RP ${val.INSURANCE_COST} </option> 
                                            `)
                                        })
                                    }
                                    if(allPengiriman.packing != undefined) {
                                        allPengiriman.packing.map((val,index)=>{
                                            // 
                                            // 
                                            // 
                                            $('.cart-packing').append(`
                                                <option  value="${val.PACKING_TYPE}" class="${val.PACKING_FEE}">${val.PACKING_TYPE} - RP ${val.PACKING_FEE} </option> 
                                            `)
                                        })
                                    }
                                }
                            })
                        })
                    })
                })
            })
        })

    }else {
        $('.danger-alert').css('display','flex')
        
        
        
    }






    // BATAS AKHIR 
    $('#final_checkout_delivery_row').empty()
    $('#final_checkout_total_price_row').empty()
    var itemsToCheckout = JSON.parse(localStorage.getItem("itemsToCheckout"));
    var harga_shipping_awal = 20000
    var total_price_with_shipping = harga_shipping_awal

    itemsToCheckout.map((val,id)=>{
        
        // parseFloat('100,000.00'.replace(/,/g, ''))
        var price = parseFloat(val.priceAgreed.replace(/,/g, ''))
        total_price_with_shipping +=price
        
    })
        var item = $('#sub-delivery-option option:selected').val()
        
        $('#final_checkout_delivery_row').append(`
            <td> ${item} </td>
            <td> ${harga_shipping_awal} </td>
        `)

        $('#final_checkout_total_price_row').append(`
            <td> ${total_price_with_shipping} </td>
            
        `)

    
}


function checking_payment(){
    var province_pilihan=$('.cart-provinsi option:selected').val()
    var new_kurir_pilihan = $('#sub-delivery-option option:selected').val()
    var kota_pilihan = $('.cart-kota option:selected').val()
    var district_pilihan = $('.cart-kecamatan option:selected').val()
    var sub_district_pilihan = $('.cart-kelurahan option:selected').val()
    var pengiriman_pilihan = $('.cart-pengiriman option:selected').val()
    var payment_pilihan = $('#payment-selection option:selected').val()

    var isKurir_pilihan = false
    var isProvince_pilihan = false
    var isKota_pilihan = false
    var isKecamatan_pilihan = false
    var isKelurahan_pilihan = false
    var isPengiriman_pilihan = false
    var isPaymentMethod_pilihan = false

 



    

    if(new_kurir_pilihan == 'kurir' || new_kurir_pilihan == undefined || new_kurir_pilihan == 'undefined' || new_kurir_pilihan == null || new_kurir_pilihan.length == 0){
        isKurir_pilihan = false
    }else {
        isKurir_pilihan = true
    }

    if(pengiriman_pilihan =='Waktu Pengiriman' || pengiriman_pilihan == undefined || pengiriman_pilihan == 'undefined' || pengiriman_pilihan == null || pengiriman_pilihan.length == 0){
        isPengiriman_pilihan = false
    }else {
        isPengiriman_pilihan = true
    }

    if(payment_pilihan == 'Metode Pembayaran' ||payment_pilihan == 'Metode Pembayaran' && payment_pilihan == undefined || payment_pilihan == 'undefined' || payment_pilihan == null || payment_pilihan.length == 0){
        isPaymentMethod_pilihan = false
    }else {
        isPaymentMethod_pilihan = true
    }

    // if(packing_pilihan == undefined || packing_pilihan == null || packing_pilihan == 'NULL' || packing_pilihan == 'undefined'){
    //     packing_pilihan = ''
    //     isPacking_pilihan = false
    // }else {
    //     isPacking_pilihan = true
    // }

    if(district_pilihan == 'Kecamatan' || district_pilihan == 'kecamatan'  || district_pilihan == undefined || district_pilihan == null || district_pilihan == 'NULL' || district_pilihan == 'undefined'){
        // 
         district_pilihan = ''
         isKecamatan_pilihan = false
     }else {
        isKecamatan_pilihan = true
     }
     if(sub_district_pilihan == 'Kelurahan' && sub_district_pilihan == 'kelurahan' && sub_district_pilihan == undefined || sub_district_pilihan == null || sub_district_pilihan == 'NULL' || sub_district_pilihan == 'undefined'){
        //  
         sub_district_pilihan = ''
         isKelurahan_pilihan = false
     }else {
        isKelurahan_pilihan = true
     }

     if(province_pilihan == 'Provinsi'  || province_pilihan =='provinsi' || province_pilihan == undefined || province_pilihan == 'undefined' || province_pilihan == null || province_pilihan.length == 0){
        isProvince_pilihan = false
    }else {
        isProvince_pilihan = true
    }
    if(kota_pilihan == 'Kota' || kota_pilihan == 'kota'  || kota_pilihan == undefined || kota_pilihan == 'undefined' || kota_pilihan == null || kota_pilihan.length == 0){
        isKota_pilihan = false
    }else {
        isKota_pilihan = true
    }
    async function looping_product(){
        var isSuccess = true
        var arr = localStorage.getItem('itemsToCheckout')
        var arr_product = JSON.parse(arr)
        // 
         for (var i=0; i<arr_product.length; i++){ // looping dullu check qty abis itu kalo sukses
           isSuccess=  await check_qty(arr_product,i)
        }
        await success(isSuccess)
        
    }
    async function check_qty(arr_product,i){
       return new Promise(async(resolve,reject)=>{
            var quantity_product = parseInt(arr_product[i].quantity)
            await axios.post(`https://products.sold.co.id/get-product-details?product_code=${arr_product[i].productNo}`)
            .then(async(res)=>{
                var isSuccess = true
                var qty_sisa = res.data.Stock_Quantity
                if(quantity_product > qty_sisa || qty_sisa == 'undefined' || qty_sisa == 'null' || qty_sisa == null || isNaN(qty_sisa)){
                    isSuccess = false
                }
                resolve(isSuccess)
            }).catch((err)=>{
                
            })
        })
    }
    
    
    async function success(isSuccess){
        
        
        var alamat = $('#address-selection option:selected').val()
        var province = localStorage.getItem('province_customer')
        var city = localStorage.getItem('city_customer')
        var district = localStorage.getItem('district_customer')
        var sub_district = localStorage.getItem('sub_district_customer')

        if(alamat == 'TO SAVED ADDRESS'){
            requestToFinish()
        }else {
            if(isSuccess){
                // 
                if(isKurir_pilihan && isProvince_pilihan && isKota_pilihan 
                    && isKecamatan_pilihan && isKelurahan_pilihan && isPengiriman_pilihan
                    && isPaymentMethod_pilihan){
            
                        // $('#exampleModalLong').modal('show')
                        requestToFinish()
                    } else {
                        // swal.fire("Penambahan Data gagal, Silahkan Check Pengisian data", "", "error");
                        Swal.fire({
                            html:`
                            <div class="o-circle c-container__circle o-circle__sign--failure">
                                <div class="o-circle__sign"></div>  
                            </div> 
                            Pembelian  Gagal`,
                            timer:2000,
                            
                        })
                    }
            }else {
                
                // Swal.fire("Quantity Kurang", "Error", "error");
                Swal.fire({
                    html:`
                    <div class="o-circle c-container__circle o-circle__sign--failure">
                        <div class="o-circle__sign"></div>  
                    </div> 
                    Quantity Kurang`,
                    timer:2000,
                    
                })
            }

        }

        return isSuccess
    }
    
   

    
    looping_product()
    

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
                // 
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
        // 
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
        // 
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


    // if(paymentSelection == "PERIOD" ){
    //     periodSelection = $("#period-selection").children("option:selected").val();
    //     if(periodSelection == "30 Days"){
    //         periodSelection = 30;
    //     }else{
    //         periodSelection = 60;
    //     }
    // }

    // paymentMethod  diganti jd gorillaworkout soalnya kalo diisi transfer error di backend
    getCustomersWithCustomerNo(localStorage.getItem("token")).done(function (response) {
        request = {
            customerId: localStorage.getItem("token"),
            paymentMethod: 'BNI VA TRANSFER',
            paymentMethodDetailes: periodSelection,
            address: alamat_final,
            fullName: response.First_Name + " " + response.Last_Name,
            contactNumber: response.Contact_Number_1,
            email: response.Email,
            notes: "e-commerce pembelian request",
            orderDate: date
        };
        
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


    
    var total_harga_shipping_with_insurance_packing =  harga_shipping + harga_asuransi + harga_packing
    var final_total_harga_shipping_insurance = total_harga_shipping_with_insurance_packing.toString()
    var product_name_shipping = pengiriman_pilihan + asuransi_pilihan + packing_pilihan

    // 
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
            // 
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
            
            var productToBeAddedStringify = JSON.stringify(requestArrayForItemsToCheckout);
            localStorage.setItem("finalStep", productToBeAddedStringify);
        }else {
            // 
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
            
            var setToString = JSON.stringify(finalStep)
            localStorage.setItem("finalStep", setToString);
        }
        
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

const find_subDistrict_from_address=async(district)=>{
    return new Promise(async(resolve,reject)=>{
        var subDistrict_from_storage = JSON.parse(localStorage.getItem('all_subdistrict_tiki'))
        var kelurahan_pilihan = ''
        var token = localStorage.getItem('token')
        var kurir_pilihan = ''
        var kurir_kode = ''
        var alamat_pilihan = ''

        await get_all_couriers().done( async function(response){
            kurir_pilihan = response[0].Courier
            kurir_kode = response[0].Courier_Code
            await axios.post(`http://customers.sold.co.id/get-customer-information?Customer_Code=${token}`)
            .then(async(res)=>{
                alamat_pilihan = res.data.Address_1
                if(subDistrict_from_storage != undefined && subDistrict_from_storage.length != 0 ){

                }else {
                    await get_all_subdistrict_from_courier(kurir_pilihan,kurir_kode,district).done( function(response){
                        response.forEach((val,index)=>{
                            if(alamat_pilihan.toUpperCase().includes(val.Sub_District.toUpperCase())){
                                kelurahan_pilihan = val.Sub_District
                                resolve(kelurahan_pilihan)
                            }
                        })
                        // 
                    })
                }
            }).catch((err)=>{
                
            })
        })
    })
}

const find_district_from_address=async(city)=>{
    return new Promise(async(resolve,reject)=>{
        var district_from_storage = JSON.parse(localStorage.getItem('all_district_tiki'))
        var kecamatan_pilihan = ''
        var token = localStorage.getItem('token')
        var kurir_pilihan = ''
        var kurir_kode = ''
        var alamat_pilihan = ''
        await get_all_couriers().done( async function(response){
            kurir_pilihan = response[0].Courier
            kurir_kode = response[0].Courier_Code
            await axios.post(`http://customers.sold.co.id/get-customer-information?Customer_Code=${token}`)
            .then(async(res)=>{
                alamat_pilihan = res.data.Address_1
                await get_all_district_from_courier(kurir_pilihan,kurir_kode,city).done(function(response){
                    response.forEach((val,index)=>{
                        if(alamat_pilihan.toUpperCase().includes(val.District.toUpperCase())){
                            kecamatan_pilihan = val.District
                            resolve(kecamatan_pilihan)
                        }
                    })
                })
            }).catch((err)=>{
                
            })
        })
        
   
    })
}

const find_city_from_address= async (province)=>{
    return new Promise(async(resolve,reject)=>{
        var city_from_storage = JSON.parse(localStorage.getItem('all_city_tiki'))
        var kota_pilihan = ''
        var token = localStorage.getItem('token')
        var kurir_pilihan = ''
        var kurir_kode = ''
        var alamat_pilihan = ''
        await get_all_couriers().done( async function(response){
            kurir_pilihan = response[0].Courier
            kurir_kode = response[0].Courier_Code
            await axios.post(`http://customers.sold.co.id/get-customer-information?Customer_Code=${token}`)
            .then( async (res)=>{
                alamat_pilihan  = res.data.Address_1
                if(city_from_storage != undefined && city_from_storage.length != 0){
                    city_from_storage.forEach((val,index)=>{
                        if(val.Province == province){
                            val.City.forEach((city,id)=>{
                                if(alamat_pilihan.toUpperCase().includes(city.City.toUpperCase())){
                                    kota_pilihan = city.City
                                    resolve(kota_pilihan)
                                }
                            })
                        }
                    })
                }else {
                    await get_all_city_from_courier(kurir_pilihan,kurir_kode,province).done(function(response){
                            response.forEach((val,index)=>{
                                if(alamat_pilihan.toUpperCase().includes(val.City.toUpperCase())){
                                    kota_pilihan = val.City
                                    resolve(kota_pilihan)
                                }
                            })
                    })
                }
            }).catch((err)=>{
                
            })
        })
    })
}


const find_province_from_address= async ()=>{
    return new Promise(async (resolve, reject) => {
        var province_from_storage = JSON.parse(localStorage.getItem('all_province_tiki'))
        var province_pilihan =''
        var token = localStorage.getItem('token')
        var kurir_pilihan = ''
        var kurir_kode = ''
        var alamat_pilihan = ''
        await get_all_couriers().done(async function(response){
            kurir_pilihan = response[0].Courier
            kurir_kode = response[0].Courier_Code
            await axios.post(`http://customers.sold.co.id/get-customer-information?Customer_Code=${token}`)
            .then(async (res)=>{
                alamat_pilihan = res.data.Address_1
                if(province_from_storage != undefined &&  province_from_storage.length != 0){
                    province_from_storage.forEach((val,index)=>{
                        if(alamat_pilihan.toUpperCase().includes(val.Province.toUpperCase())){
                            province_pilihan = val.Province
                            resolve(province_pilihan) 
                        }
                    })
                }else {
                    await get_all_province_from_courier(kurir_pilihan,kurir_kode).done(async function(response){
                        response.forEach((val,index)=>{
                            if(alamat_pilihan.toUpperCase().includes(val.Province.toUpperCase())){
                                province_pilihan = val.Province
                                resolve(province_pilihan) 
                            }
                        })
                    })
                }
            }).catch((err)=>{
                
            })
        })
    })

}





const find_address_from_product_company=()=>{
    var itemsToCheckout = JSON.parse(localStorage.getItem('itemsToCheckout'))
    var all_province_from_storage = JSON.parse(localStorage.getItem('all_province_tiki'))
    var all_city_from_storage = JSON.parse(localStorage.getItem('all_city_tiki'))
    var all_district_from_storage = JSON.parse(localStorage.getItem('all_district_tiki'))
    var province_company = ''
    itemsToCheckout.forEach((val,index)=>{
        getProductsWithProductNo("", "", val.productNo).done(function (response) {
            // console.log(response)
            var company_address = response.PIC_company_address  
            // console.log(company_address)  
            if(all_province_from_storage !== null || all_province_from_storage !== undefined
                && all_city_from_storage !== null || all_city_from_storage
                && all_district_from_storage !== null || all_district_from_storage  !== unddefined
            ){ // kalo local storage ke isi berarti pake data dari local Storage
                var filter_province = all_province_from_storage.filter((item,id)=>{
                    // console.log(item)
                    var split_company = company_address.split(' ')
                    var split_company_bycoma = company_address.split(',')
                    all_province_from_storage.forEach((value,index)=>{
                        split_company.forEach((resp,ind)=>{ 
                            if(value.Province.toUpperCase().includes(resp.toUpperCase())){
                                console.log(value.Province)
                                province_company = value.Province
                                // all_city_from_storage.forEach((val,id)=>{
                                //     // console.log(val.Province)
                                //     if(val.Province.toUpperCase().includes(province_company.toUpperCase())){
                                //         // console.log(val)
                                //     }
                                // })

                                return value.Province
                            }
                        })
                    })

                    
                    all_city_from_storage.forEach((value,index)=>{
                        
                        value.City.forEach((val,id)=>{
                            split_company.forEach((resp,ind)=>{
                                // console.log(val.City.toUpperCase())
                                // console.log(resp.toUpperCase())
                                if(val.City.toUpperCase().includes(resp.toUpperCase())){
                                    console.log(val.City)
                                }
                                
                            })

                        })
                    })
                    
                    
                })
            }else { // local storage ada yg blm ke isi. berarti pake full API

            }
            
        })
    })
}

// const find_province_from_product_company=async(address)=>{
//     return new Promise(async(resolve,reject)=>{
//         var itemsToCheckout = JSON.parse(localStorage.getItem('itemsToCheckout'))
//         var all_province_from_storage = JSON.parse(localStorage.getItem('all_province_tiki'))
//         var result_province = []
//         var split_company = address.split(' ')
//         var all_filter_province = []
//         var all_result_arr =[]
//         var sec_filter_province = []
//         console.log(address)
//         var filter_province =  all_province_from_storage.filter((item,id)=>{
//             all_province_from_storage.forEach((value,index,arr)=>{ // allProduct from storage
//                 split_company.forEach((resp,ind,array)=>{  // alamat split by spasi
//                     if(value.Province.toUpperCase().includes(resp.toUpperCase())){
//                         var province_company = value.Province
//                         all_filter_province.push(province_company)
//                         const resultArr = all_filter_province.reduce((acc,item)=>{ // untuk ngapus data yg sama
//                             if(!acc.includes(item)){
//                                 acc.push(item);
//                             }
//                             return acc;
//                         },[])
//                         all_result_arr = resultArr // hasil dari ngapus data yg sama
//                     }
//                 })
//             })
//             if(all_result_arr.length == 1 ){
//                 // console.log(all_result_arr[0])
//                 resolve(all_result_arr[0])
//             }else {
//                 for(var i=1; i<split_company.length; i++){
//                     var minus_satu = split_company[i-1]
//                     var plus_dua = split_company[i+2]
//                     if(minus_satu === undefined || minus_satu === null){
//                         minus_satu = ''
//                     }else if (plus_dua === undefined || plus_dua === undefined){
//                         plus_dua = ''
//                     }
//                     var new_alamat = minus_satu +' ' + plus_dua
//                     all_result_arr.forEach((val,index)=>{
//                         if(val.toUpperCase().includes(new_alamat.toUpperCase())){
//                             sec_filter_province.push(val)
//                             for(var i=1; i<split_company.length; i++){
//                                 var min_satu = split_company[i-1]
//                                 var plus_tiga = split_company[i+3]
                                
//                                 var new_alamat2 = minus_satu + ' ' + plus_tiga
//                                 // console.log(new_alamat2,' new alamat 2')
//                                 if(min_satu === undefined || min_satu === null){
//                                     min_satu = ''
//                                 }else if (plus_tiga === undefined || plus_tiga === undefined){
//                                     plus_tiga = ''
//                                 }
//                                 sec_filter_province.forEach((value,index)=>{
//                                     if(value.toUpperCase().includes(new_alamat2.toUpperCase())){
//                                         // console.log(value,' final answer', index)
//                                         resolve(value)
                                        
//                                     }
//                                 })

//                             }
                        
//                         }
//                     })
//                 }

//             }
//         })
//     })
// }

// const find_city_from_product_company=async(province,address)=>{
//     return new Promise(async(resolve,reject)=>{
//         var itemsToCheckout = JSON.parse(localStorage.getItem('itemsToCheckout'))
//         var all_city_from_storage = JSON.parse(localStorage.getItem('all_city_tiki'))
//         var delete_coma = address.replace(/,/g, "");
//         var split_company = delete_coma.split(' ')
//         console.log(split_company)
        
//         var arr_city = []
//         var final_result_city=[]
//         all_city_from_storage.forEach((value,index)=>{
//             if(value.Province.toUpperCase().includes(province.toUpperCase())){
//                 value.City.forEach((val,id)=>{
//                     split_company.forEach((res,index_sc)=>{
//                         if(val.City.toUpperCase().includes(res.toUpperCase())){
//                             arr_city.push(val.City)
//                             resolve(val.City)
//                         }
//                     })
//                 })
//             }
//         })
//         if(arr_city.length == 1){
//             resolv(arr_city[0])
//         }else {
//             for(var i=1; i<split_company.length; i++){
//                 var normal_i = split_company[i]
//                 var plus_satu = split_company[i+1]
//                 var new_alamat = normal_i + ' ' + plus_satu
//                 if(normal_i === undefined || normal_i === null){
//                     normal_i = ''
//                 }else if (plus_satu === undefined || plus_satu === null){
//                     plus_satu = ''
//                 }
//                 arr_city.forEach((val,index)=>{
//                     if(val.toUpperCase().includes(new_alamat.toUpperCase())){
//                         // console.log(val,'final answer',index)
//                         resolve(val)
//                     }
//                 })
//             }
//             // console.log('masuk ke else. arr city lebih dari 1')
//         }
//     })
// }

// const find_district_from_product_company=async(city,address)=>{
//     return new Promise(async(resolve,reject)=>{
//         var all_district_from_storage = JSON.parse(localStorage.getItem('all_district_tiki'))
//         var split_company = address.split(' ')
//         all_district_from_storage.forEach((value,index)=>{
//             if(value.City.toUpperCase().includes(city.toUpperCase())){
//                 resolve(value.District[0])
//             }
//         })
//     })
// }

// const find_courier_price_code_from_product_company=async(district,address)=>{
//     return new Promise((resolve,reject)=>{
//         // console.log(district)
//         get_all_subdistrict_from_courier('tiki','tiki',district.District).done(function(response){
//             resolve(response[0].Courier_Price_Code)
//         })
//     })
// }

// masih gabisa

const checking_product_company=async()=>{
    return new Promise(async(resolve,reject)=>{
        var itemsToCheckout = JSON.parse(localStorage.getItem('itemsToCheckout'))
        var checking_product_company = []
        itemsToCheckout.forEach(async(val,index)=>{
        await getProductsWithProductNo("", "", val.productNo).done(async function (response) {
                checking_product_company.push(response.PIC_company_address)
                const resultArr = checking_product_company.reduce((acc,item)=>{
                    if(!acc.includes(item)){
                        acc.push(item);
                    }
                    return acc;
                },[])
                resolve(resultArr)
            })
        })
    })
}
// masih gabisa

 async function renderCartCheckout(product){
    // find_address_from_product_company()
    // var province_company = await find_province_from_product_company()
    // console.log(province_company)

  
   

    
    var province_pilihan = localStorage.getItem('province_customer')
    var kota_pilihan = localStorage.getItem('city_customer')
    var kecamatan_pilihan = localStorage.getItem('district_customer')
    var kelurahan_pilihan = localStorage.getItem('sub_district_customer')

    var timeInterval
    Swal.fire({
        title: 'Uploading Data',
        timer:300000000,
        html: ` 
        <div class="boxcon">
            <div class="box1">
            </div>
            <div id="sold-id-loading">
            SOLD 
            </div>
                
            <div class="box2">
            </div>
        </div>
    `,
    didOpen: async() => {
        Swal.showLoading()
        console.log(product)
        $('.danger-error').css('display','none')
            var token = localStorage.getItem('token')

            // var checking_product_company =  await checking_product_company()
            // console.log(checking_product_company


            if(province_pilihan != undefined && kota_pilihan != undefined &&
                kecamatan_pilihan != undefined && kelurahan_pilihan !=undefined){ // ngecheck udh keisi apa blm
                    
            }else {
                    province_pilihan =  await find_province_from_address()
                    kota_pilihan = await find_city_from_address(province_pilihan)
                    kecamatan_pilihan = await find_district_from_address(kota_pilihan)
                    kelurahan_pilihan = await find_subDistrict_from_address(kecamatan_pilihan)
            }
            var allKota = []
            var allProduct = []
            var berat_product = 0
            var allProvince = []
            var allKota =[]
            var allKecamatan = []
            var allKelurahan = []
            var allPengiriman = []
            var allKurir = []
            // console.log('checkout jalan')
            $('.card-checkout-cc').empty()
            $('.new-card-product-cc').empty()

                product.sort(function (a, b) {
                    let left = a.company_address.toUpperCase();
                    let right = b.company_address.toUpperCase();
                
                    return (left === right) ? 0 : left > right ? 1 : -1;
                  });

                var checking_array_render = []
                var product_pertama = [product[0]]
                checking_array_render.push(product_pertama)
                checking_array_render.forEach((val,index)=>{
                        for(var i=0; i<product.length; i++){
                            var next_index = product[i+1]
                            if(next_index === undefined || next_index === null){
                                checking_array_render.push([product[product.length-1]])
                                i = product.length
                            }else {
                                if(val[index].company_address === product[i].company_address){
                                    if(val[index].productNo !== product[i].productNo){
                                        checking_array_render[index].push(product[i])
                                    }else {
                                        console.log('ada data yang sama jadi gak di push ke array')
                                    }
                            }else {
                                checking_array_render.push([product[i]])
                            } 
                        }
                    }
                })

               

                checking_array_render.forEach((value,index)=>{ 
                    value.map((val,id,arr)=>{
                        var qty_product_index = val.quantity
                        var Courier_Price_Code_orig = val.courier_price_code
                        var product_number_index = val.productNo
                        var price_agreed_index = val.priceAgreed
                        getProductsWithProductNo("","",val.productNo).done(function(response){
                            var product_index = response
                            var berat_barang = parseFloat(response.Weight_KG)
                            var total_berat_barang = berat_barang  * val.quantity
                            var fixed_total_berat_barang = total_berat_barang.toFixed(2)
                            // if(product.length>4 ){
                            //     $('.card-checkout-cc').css('height','300px')
                            // }

                            if(id === 0){
                                $('.card-checkout-cc').append(`
                                    <div class="box-new-card-checkout-cc-2"> 
                                        <div class="new-card-checkout-cc">
                                            <div class="new-card-product-cc">
                                                <div class="card-item-checkout-cc">
                                                    <div class="img-item-checkout-cc">
                                                        <img src="${replace_vtintl_to_sold_co_id(product_index.Picture_1)}" alt="">
                                                    </div>
                                                    <div class="desc-item-checkout-cc">
                                                        <p>${product_index.Name}</p>
                                                        <div class="desc-item-2-checkout-cc">
                                                            <p>Quantity : ${qty_product_index}</p>
                                                            <p>Berat  : ${fixed_total_berat_barang}</p>
                                                            <p id="id_harga_barang-${product_number_index}">Harga : ${price_agreed_index}</p>
                                                        </div>
                                                        <div class="for_input_coupon"> 
                                                            <input type="text" class="input_coupon_checkout_${val.productNo} input_checkout" placeholder="Masukan Coupon" onchange="onInputCoupon('${val.productNo}')">
                                                            <div class="card-coupon-used" id="delete-${product_number_index}" >
                                    
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="new-card-option-cc">
                                                <select class="form-control sp_kelurahan_hover cart-pengiriman new-cart-pengiriman-${index}" id="sub-pengiriman-option" onchange="pengirimanCheckout(this)" >  
                                                    <option selected  class="co-pengiriman">Waktu Pengiriman</option>      
                                                </select>
                            
                                                <select class="form-control sp_kelurahan_hover cart-asuransi new-asuransi-pengiriman-${index}" id="sub-asuransi-option" onchange="asuransiCheckout(this)" >  
                                                    <option selected  class="co-asuransi">Insurance</option>           
                                                </select>
                                                <select class="form-control sp_kelurahan_hover cart-packing new-packing-pengiriman-${index}" id="sub-packing-option" onchange="packingCheckout(this)" >  
                                                    <option selected  class="co-packing">Packing</option>      
                                                </select>
                                            </div>
                                        </div>      
                                    </div>
                                `)
                           
                                
                            }else {
                                console.log(value,'render ke' ,id)
                                $('.new-card-product-cc').append(`
                                    <div class="card-item-checkout-cc">
                                        <div class="img-item-checkout-cc">
                                            <img src="${replace_vtintl_to_sold_co_id(product_index.Picture_1)}" alt="">
                                        </div>
                                        <div class="desc-item-checkout-cc">
                                            <p>${product_index.Name}</p>
                                            <div class="desc-item-2-checkout-cc">
                                                <p>Quantity : ${qty_product_index}</p>
                                                <p>Berat  : ${fixed_total_berat_barang}</p>
                                                <p id="id_harga_barang-${product_number_index}">Harga : ${price_agreed_index}</p>
                                            </div>
                                            <div class="for_input_coupon"> 
                                                <input type="text" class="input_coupon_checkout_${val.productNo} input_checkout" placeholder="Masukan Coupon" onchange="onInputCoupon('${val.productNo}')">
                                                <div class="card-coupon-used" id="delete-${product_number_index}" >
                        
                                                <div>
                                            </div>
                                        </div>
                                    </div>
                                `)  
                            }
                        })        
                    })
                })
                console.log('selesai looping checking array render')

                // RENDER UNTUK SELECTED   
                var province_storage = JSON.parse(localStorage.getItem('all_province_tiki'))
                var city_storage = JSON.parse(localStorage.getItem('all_city_tiki'))
                var district_storage = JSON.parse(localStorage.getItem('all_district_tiki'))
                var berat_product = 0;
                var province_customer = localStorage.getItem('province_customer')
                var city_customer = localStorage.getItem('city_customer')
                var district_customer = localStorage.getItem('district_customer')
                var kecamatan_pilihan = ''
                var allProvince = []
                var allKota = []
                var allKecamatan = []
                var allKelurahan = []
                var berat_product = 0
                get_all_couriers().done(function(response){
                    allKurir = response
                    checking_array_render.forEach((item,index_car)=>{
                                
                        if(province_storage != undefined && city_storage !=undefined && district_storage != undefined){
                            city_storage.forEach((val,index)=>{
                                if(val.Province == province_customer){
                                    allKota.push(val.City)
                                }
                            })
                            district_storage.forEach((val,index)=>{
                                if(val.City == city_customer){
                                    allKecamatan.push(val.City)
                                }
                            })
        
                            get_all_subdistrict_from_courier('tiki','tiki',district_customer).done(function(response){
                                allKelurahan = response
                                // console.log(response)
                                console.log(item)
                                var Courier_Price_Code_orig = ''
                                item.forEach((resp,id)=>{ // ngitung berat
                                        Courier_Price_Code_orig = resp.courier_price_code
                                        berat_product += parseFloat(resp.weight_kg) * parseFloat(resp.quantity)
                                        console.log(berat_product)
                                })
                                console.log(berat_product,'final berat product')
                                if(berat_product <= 0 || berat_product == null || berat_product == undefined || Number.isNaN(berat_product)){
                                    berat_product = 0.1*1.5;
                                }else{
                                    berat_product = berat_product*1*1.5;
                                }
                                console.log(berat_product,'final berat product')
                                var length = ''
                                var  width = '' 
                                var  height = ''
                                var paket_value = '' 
                                var packing_type = ''
                                new_get_shipping_cost_informations(Courier_Price_Code_orig,allKelurahan[0].Courier_Price_Code,packing_type,berat_product,length,width,height,paket_value).done(function(response){
                                    console.log(response)
                                    allPengiriman = response
                                    $('.cart-pengiriman').empty()
                                    $('.cart-provinsi').empty()
                                    $('.cart-kota').empty()
                                    $('.cart-kecamatan').empty()
                                    $('.cart-kelurahan').empty()
                                    $('.cart-asuransi').empty()
                                    $('.cart-packing').empty()
                                    $('.cart-kodepos').empty()
                                    $('#sub-delivery-option').empty()
                                    $('.cart-provinsi').append(`
                                        <option selected  class="co-provinsi">Provinsi</option>      
                                    `)
                                    $('.cart-kota').append(`
                                        <option selected  class="co-kota">Kota</option>      
                                    `)
                                    $('.cart-kecamatan').append(`
                                        <option selected  class="co-kecamatan">Kecamatan</option>      
                                    `)
                                    $('.cart-kelurahan').append(`
                                        <option selected  class="co-kelurahan">Kelurahan</option>      
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
                                    $('.cart-kodepos').append(`
                                        <option selected  class="co-kodepos"> Kode Pos</option>      
                                    `)
    
                                    allKurir.map((val,index)=>{
                                        $('#sub-delivery-option').append(`
                                            <option  value="${val.Courier_Code}" class="co-kurir">${val.Courier}</option> 
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
                                    allKecamatan.map((val,index)=>{
                                        $('.cart-kecamatan').append(`
                                            <option  value="${val.District}" class="co-kecamatan">${val.District}</option> 
                                        `)
                                    })
                                    allKelurahan.map((val,index)=>{
                                        $('.cart-kelurahan').append(`
                                            <option  value="${val.Sub_District}" class="co-kelurahan">${val.Sub_District}</option> 
                                        `)
                                        $('.cart-kodepos').append(`
                                            <option  value="${val.Zipcode}" class="co-kodepos">${val.Zipcode}</option> 
                                        `)
                                    })
                                    if(allPengiriman){
                                        console.log(allPengiriman)
                                        if(allPengiriman.service != undefined){
                                            allPengiriman.service.map((val,indexPengiriman)=>{
                                                console.log(index_car, ' ini index')
                                                console.log($(`.new-card-pengiriman-${index_car}`))
                                                $(`.new-cart-pengiriman-0`).append(`
                                                    <option  value="${val.EST_DAY}days ${val.SERVICE} ${val.TARIFF} ${val.DESCRIPTION} " class="${val.TARIFF}">${val.EST_DAY}days ${val.SERVICE} ${val.TARIFF} ${val.DESCRIPTION}</option> 
                                                `)
                                            })
                                        }
                                        if(allPengiriman.insurance != undefined){
                                            allPengiriman.insurance.map((val,indexPengiriman)=>{
                                                $(`.new-asuransi-pengiriman-${index_car}`).append(`
                                                    <option  value="type ${val.INSURANCE_TYPE} ${val.INSURANCE_NAME} ${val.INSURANCE_COST}" class="${val.INSURANCE_COST}">${val.INSURANCE_NAME} - RP ${val.INSURANCE_COST} </option> 
                                                `)
                                            })
                                        }
                                        if(allPengiriman.packing != undefined) {
                                            allPengiriman.packing.map((val,indexPengiriman)=>{
                                                $(`.new-asuransi-pengiriman-${index_car}`).append(`
                                                    <option  value="${val.PACKING_TYPE}" class="${val.PACKING_FEE}">${val.PACKING_TYPE} - RP ${val.PACKING_FEE} </option> 
                                                `)
                                            })
                                        }
                                        $('#sub-cart-option').css('display','none')
                                        $('#sub-kota-option').css('display','none')
                                        $('#sub-kecamatan-option').css('display','none')
                                        $('#sub-kelurahan-option').css('display','none')
    
                                        Swal.fire({
                                            title: 'Uploading Data',
                                            timer:100,
                                        })
                                    }
    
                                })
                                
                            })
        
                        }else{
                            // GET DATA FROM API
                            axios.post(`http://customers.sold.co.id/get-customer-information?Customer_Code=${token}`)
                           .then((res)=>{
                               // 
                               var alamat_pilihan = res.data.Address_1
                               get_all_couriers().done(function(response){
                                   allKurir = response
                                   get_all_province_from_courier('tiki','tiki').done(function(response){
                                       allProvince = response
                                       get_all_city_from_courier('tiki','tiki',province_pilihan).done(function(response){
                                           allKota = response
                                           get_all_district_from_courier('tiki','tiki',kota_pilihan).done(function(response){
                                               allKecamatan = response
                                               get_all_subdistrict_from_courier('tiki','tiki',kecamatan_pilihan).done(function(response){
                                                   allKelurahan =response
                                                   product.map((val,index)=>{
                                                       axios.post(`https://products.sold.co.id/get-product-details?product_code=${val.productNo}`)
                                                       .then((res)=>{
                                                           allProduct.push(res.data)
                                                           berat_product += (res.data.Weight_KG * 0.1)
                                                       }).catch((err)=>{
                                                           
                                                       })
                                                   })
                                   
                                                   var Courier_Price_Code_orig = 'CGK01.00'
                                                   var packing_type = ''
                                                   // var berat_product = parseInt(item_product.Weight_KG)
                                                   
                                                   if(berat_product <= 0 || berat_product == null || berat_product == undefined || Number.isNaN(berat_product)){
                                                       berat_product = 0.1*1.5;
                                                   }else{
                                                       berat_product = berat_product*1*1.5;
                                                   }
                                                   var length = ''
                                                   var  width = '' 
                                                   var  height = ''
                                                   var paket_value = '' 
                                                   new_get_shipping_cost_informations(Courier_Price_Code_orig , allKelurahan[0].Courier_Price_Code, packing_type, berat_product, length, width, height, paket_value).done(function(response){
                                                       allPengiriman = response
                                                       $('.cart-pengiriman').empty()
                                                       $('.cart-provinsi').empty()
                                                       $('.cart-kota').empty()
                                                       $('.cart-kecamatan').empty()
                                                       $('.cart-kelurahan').empty()
                                                       $('.cart-asuransi').empty()
                                                       $('.cart-packing').empty()
                                                       $('.cart-kodepos').empty()
                                                       $('#sub-delivery-option').empty()
               
                                                       $('.cart-provinsi').append(`
                                                           <option selected  class="co-provinsi">Provinsi</option>      
                                                       `)
                                                       $('.cart-kota').append(`
                                                           <option selected  class="co-kota">Kota</option>      
                                                       `)
                                                       $('.cart-kecamatan').append(`
                                                           <option selected  class="co-kecamatan">Kecamatan</option>      
                                                       `)
                                                       $('.cart-kelurahan').append(`
                                                           <option selected  class="co-kelurahan">Kelurahan</option>      
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
                                                       $('.cart-kodepos').append(`
                                                           <option selected  class="co-kodepos"> Kode Pos</option>      
                                                       `)
                                                       allKurir.map((val,index)=>{
                                                           $('#sub-delivery-option').append(`
                                                               <option  value="${val.Courier_Code}" class="co-kurir">${val.Courier}</option> 
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
                                                       allKecamatan.map((val,index)=>{
                                                           $('.cart-kecamatan').append(`
                                                               <option  value="${val.District}" class="co-kecamatan">${val.District}</option> 
                                                           `)
                                                       })
                                                       allKelurahan.map((val,index)=>{
                                                           $('.cart-kelurahan').append(`
                                                               <option  value="${val.Sub_District}" class="co-kelurahan">${val.Sub_District}</option> 
                                                           `)
                                                           $('.cart-kodepos').append(`
                                                               <option  value="${val.Zipcode}" class="co-kodepos">${val.Zipcode}</option> 
                                                           `)
                                                       })
                                                      
                           
                                   
                                                       if(allPengiriman){
                                                           if(allPengiriman.service != undefined){
                                                               allPengiriman.service.map((val,index)=>{
                                                                   $('.cart-pengiriman').append(`
                                                                       <option  value="${val.EST_DAY}days ${val.SERVICE} ${val.TARIFF} ${val.DESCRIPTION} " class="${val.TARIFF}">${val.EST_DAY}days ${val.SERVICE} ${val.TARIFF} ${val.DESCRIPTION}</option> 
                                                                   `)
                                                               })
                                                           }
                                                           if(allPengiriman.insurance != undefined){
                                                               allPengiriman.insurance.map((val,index)=>{
                                                                   $('.cart-asuransi').append(`
                                                                       <option  value="type ${val.INSURANCE_TYPE} ${val.INSURANCE_NAME} ${val.INSURANCE_COST}" class="${val.INSURANCE_COST}">${val.INSURANCE_NAME} - RP ${val.INSURANCE_COST} </option> 
                                                                   `)
                                                               })
                                                           }
                                                           if(allPengiriman.packing != undefined) {
                                                               allPengiriman.packing.map((val,index)=>{
                                                                   $('.cart-packing').append(`
                                                                       <option  value="${val.PACKING_TYPE}" class="${val.PACKING_FEE}">${val.PACKING_TYPE} - RP ${val.PACKING_FEE} </option> 
                                                                   `)
                                                               })
                                                           }
                                                           $('#sub-cart-option').css('display','none')
                                                           $('#sub-kota-option').css('display','none')
                                                           $('#sub-kecamatan-option').css('display','none')
                                                           $('#sub-kelurahan-option').css('display','none')
               
                                                           Swal.fire({
                                                               title: 'Uploading Data',
                                                               timer:100,
                                                           })
                                                       }
                                                   })
                                               })
                                           })
                                       })
                                   })
                               })
                           }).catch((err)=>{
                               
                           })
                        }
                    })
                })

                // RENDER UNTUK SELECTED
  
            // BATAS PENCARIAN PRODUCT COMPANY

        timerInterval = setInterval(() => {
        const content = Swal.getHtmlContainer()
        if (content) {
            const b = content.querySelector('b')
            if (b) {
            b.textContent = Swal.getTimerLeft()
            }
        }
        }, 100)
    },
    willClose: () => {
        clearInterval(timerInterval)
    }
    })

    

}

const delete_coupon=(product_id)=>{
    $(`#delete-${product_id}`).empty()
    $(`.input_coupon_checkout_${product_id}`).css('visibility','visible')
    var itemsToCheckout = JSON.parse(localStorage.getItem('itemsToCheckout'))
    axios.post(`https://products.sold.co.id/get-product-details?product_code=${product_id}`)
    .then((res)=>{
        var data_product = res.data
        for(var i =0; i<itemsToCheckout.length; i++){
            if(product_id == itemsToCheckout[i].productNo){
                var harga_awal = parseInt(data_product.Sell_Price)
                var hitung = harga_awal * parseInt(itemsToCheckout[i].quantity)
                itemsToCheckout[i].priceAgreed = commafy(harga_awal * parseInt(itemsToCheckout[i].quantity))
            }
        }
            $(`#id_harga_barang-${product_id}`).empty()
            $(`#id_harga_barang-${product_id}`).append(`
                harga: ${commafy(hitung)}
            `)
            $(`.input_coupon_checkout_${product_id}`).val('')
            $(`.input_coupon_checkout_${product_id}`).attr('placeholder','Masukan Coupon')
        var newItemsToCheckout = JSON.stringify(itemsToCheckout)
        localStorage.setItem("itemsToCheckout",newItemsToCheckout)
    }).catch((err)=>{
        
    })

}

const onInputCoupon=(product_id)=>{
    // alert(product_id)
    
    var product_change = product_id
    var kupon = $(`.input_coupon_checkout_${product_id}`).val()
    var diskon = 0
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const checkout = urlParams.get('checkout_array');
    
    var checkout_stringify = JSON.parse(checkout)
    if(kupon == '10PERCENT'){
        diskon = 0.1
        var itemsToCheckout = JSON.parse(localStorage.getItem('itemsToCheckout'))
        for(var i =0; i<itemsToCheckout.length; i++){
            if(itemsToCheckout[i].productNo == product_change){
                // var harga_barang = parseInt(removeComma(itemsToCheckout[i].priceAgreed))
                var harga_barang = removeComma(itemsToCheckout[i].priceAgreed)
                var new_harga_barang = parseInt(harga_barang)
                var discount_barang = new_harga_barang * diskon
                
                var total_harga_barang = new_harga_barang - discount_barang
                itemsToCheckout[i].priceAgreed = commafy(total_harga_barang)
                $(`#delete-${product_id}`).append(`
                    <p>Coupon : ${kupon}</p>
                    <i class="fas fa-times delete-icon-kupon" onclick="delete_coupon('${product_id}')"></i>
                `)
                $(`#id_harga_barang-${product_id}`).empty()
                $(`#id_harga_barang-${product_id}`).append(`
                   harga: ${commafy(total_harga_barang)}
                `)
                $(`.input_coupon_checkout_${product_id}`).css('visibility','hidden')
            }
            $(`.input_coupon_checkout_${product_id}`).css('border','1px solid #217384')
        }
        var newItemsToCheckout = JSON.stringify(itemsToCheckout)
        localStorage.setItem("itemsToCheckout",newItemsToCheckout)
        


        // 
        
        
        // $('.card-checkout-cc').empty()
        // var itemsToCheckout_render = JSON.parse(localStorage.getItem('itemsToCheckout'))
        // renderCartCheckout(itemsToCheckout_render)
    }else {
        // swal.fire("Kode Coupon Salah", "","alert");
        var itemsToCheckout = JSON.parse(localStorage.getItem('itemsToCheckout'))
        
        for(var i =0 ; i<itemsToCheckout.length; i++){
            if(itemsToCheckout[i].productNo == product_change){
                var harga_barang = removeComma(itemsToCheckout[i].priceAgreed)
                // itemsToCheckout[i].priceAgreed = commafy(total_harga_barang)
                $(`#id_harga_barang-${product_id}`).empty()
                $(`#id_harga_barang-${product_id}`).append(`
                    harga: ${commafy(harga_barang)}
                `)
                // $(`.input_coupon_checkout_${product_id}`).css('border','1px solid red')
                $(`.input_coupon_checkout_${product_id}`).addClass('bounce')
                setTimeout(function() {
                    //remove the class so animation can occur as many times as user triggers event, delay must be longer than the animation duration and any delay.
                    // inputField.classList.remove("bounce");
                    $(`.input_coupon_checkout_${product_id}`).removeClass('bounce')
                    $(`.input_coupon_checkout_${product_id}`).val('')
                  }, 1000); 
            
            } 
        }
        // 
        // var newItemsToCheckout = JSON.stringify(itemsToCheckout)
        // localStorage.setItem("itemsToCheckout",newItemsToCheckout)

        // $('.card-checkout-cc').empty()
        // renderCartCheckout(checkout_stringify)
        // 
    }

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
    
    
    getCustomersWithCustomerNo(customer_information.Customer_Code).done(function (response) {
        console.log(customer_information)
        console.log(item_bought)
        if(response != false){
            createNewSalesOrder(item_bought, customer_information, response.Email, $("#checkout-otp-number").val(), $("#checkout-password").val()).done(async function (response) {
                if(response.status == true){
                    // swal.fire("Order sudah dikirimkan", "","success");
                    Swal.fire({
                        html:`
                        <div class="o-circle c-container__circle o-circle__sign--success">
                            <div class="o-circle__sign"></div>  
                        </div>   
                        Order Sudah Dikirimkan
                        `,
                        timer:2000,
                        
                    })
                }else{
                    
                    // swal.fire("Order gagal dikirimkan", "","warning");
                    Swal.fire({
                        html:`
                        <div class="o-circle c-container__circle o-circle__sign--failure">
                            <div class="o-circle__sign"></div>  
                        </div> 
                        Order Gagal Dikirimkan`,
                        timer:2000,
                        
                    })
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
    // 
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
    
    
    getCustomersWithCustomerNo(customer_information.Customer_Code).done(function (response) {
        if(response != false){
            createNewSalesOrder(item_bought, customer_information, response.Email, $("#checkout-otp-number").val(), $("#checkout-password").val()).done(async function (response) {
                if(response.status == true){
                    // swal.fire("Order sudah dikirimkan", "","success");
                    Swal.fire({
                        html:`
                        <div class="o-circle c-container__circle o-circle__sign--success">
                            <div class="o-circle__sign"></div>  
                        </div>   
                        Order Sudah Dikirimkan
                        `,
                        timer:2000,
                    })
                        
                }else{
                    
                    // swal.fire("Order gagal dikirimkan", "","warning");
                    Swal.fire({
                        html:`
                        <div class="o-circle c-container__circle o-circle__sign--failure">
                            <div class="o-circle__sign"></div>  
                        </div> 
                        Order Gagal Dikirimkan`,
                        timer:2000,
                        
                    })
                }
                truncateCart(); // bayu comment, gue test 
                
                await setTimeout(() => { clearStorage(); }, 2000);
                await setTimeout(() => {window.location.href = "../cart.html";}, 3000);
            });
        }
    });
}

async function sendFinalToAccurate(request){
    loadingMessage(10000);
    
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
    
    
    await reorderJSON(orderArr[0], productArr).then(async value => {
        return await value;
    });
    
    
    getCustomersWithCustomerNo(customer_information.Customer_Code).done(function (response) {
        if(response != false){
            createNewSalesOrder(item_bought, customer_information, response.Email, $("#checkout-otp-number").val(), $("#checkout-password").val()).done(async function (response) {
                if(response.status == true){
                    // swal.fire("Order sudah dikirimkan", "","success");
                    Swal.fire({
                        html:`
                        <div class="o-circle c-container__circle o-circle__sign--success">
                            <div class="o-circle__sign"></div>  
                        </div>   
                        Order Sudah Dikirimkan
                        `,
                        timer:2000,
                        
                    })
                }else{
                    
                    // swal.fire("Order gagal dikirimkan", "","warning");
                    Swal.fire({
                        html:`
                        <div class="o-circle c-container__circle o-circle__sign--failure">
                            <div class="o-circle__sign"></div>  
                        </div> 
                        Order Gagal Dikirimkan`,
                        timer:2000,
                        
                    })
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
    
    
    

    var total_harga_shipping_with_insurance_packing =  harga_shipping + harga_asuransi + harga_packing
    
    var total_price = 0;
    var total_quantity = 0;
    var i = 0;
    item_bought = [];
    for (i = 0; i < productArr.length; i++){
        
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
            console.log(item_bought)
        }else{
            // swal.fire("Salah satu item kamu tidak mempunyai harga, pesanan untuk barang tersebut tidak bisa diproses (item : " + productArr[i].productCode + ")", "barang-barang lain tetap dapat diproses","warning");
            Swal.fire({
                html:`
                <div class="o-circle c-container__circle o-circle__sign--failure">
                    <div class="o-circle__sign"></div>  
                </div> 
                Salah satu item kamu tidak mempunyai harga, pesanan untuk barang tersebut tidak bisa diproses (item : " + ${productArr[i].productCode}`,
                timer:2000,
                
            })
        }
    }
    
    customer_information = {};
    
    
    return new Promise(async resolve => {
        await getCustomersWithCustomerNo(localStorage.getItem("token")).done(function (response) {
            if(response != false){
                var final_total_price = total_price + total_harga_shipping_with_insurance_packing
                
                
                
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
                console.log(customer_information)
                console.log(item_bought)
                
            }
        });
    });
   
}

function saveExpressOrderId(orderid){
    localStorage.setItem("ExpressOrderId", orderid);
}





const render_select_option_kurir=async()=>{
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const checkout = urlParams.get('checkout_array');
    var checkout_stringify = JSON.parse(checkout)
    var product = checkout_stringify
    var token = localStorage.getItem('token')
    var alamat = $('#address-selection option:selected').val()
    var alamat_pilihan = $('#sub-saved-address option:selected').val()
   
    if(alamat == 'TO SAVED ADDRESS'){
        // var split_alamat = alamat_pilihan.split(' ')
        // 
        var province = localStorage.getItem('province_customer')
        var city = localStorage.getItem('city_customer')
        var district = localStorage.getItem('district_customer')
        var sub_district = localStorage.getItem('sub_district_customer')
        var allKelurahan = []
        var allPengiriman = []
        if(province != undefined && city != undefined 
            && district != undefined && sub_district != undefined){
                
        }else {
            province = await find_province_from_address()
            city = await find_city_from_address(province)
            district = await find_district_from_address(city)
            sub_district = await find_subDistrict_from_address(district)
        }
            var kurir_pilihan = ''
            var kurir_kode = ''
            get_all_couriers().done(function(response){
                kurir_pilihan = response[0].Courier
                kurir_kode = response[0].Courier_Code
                var item_product = ''
                var cart_local = localStorage.getItem('itemsToCheckout')
                var parse_cart = JSON.parse(cart_local)
                var array_cart =[]
                for(var i =0; i<parse_cart.length; i++){
                    getProductsWithProductNo("", "", parse_cart[i].productNo).done(function (response) {
                    array_cart.push(response)
                    })
                }
                axios.post(`http://customers.sold.co.id/get-customer-information?Customer_Code=${token}`)
            .then((res)=>{
                // 
                var alamat_pilihan = res.data.Address_1
                get_all_couriers().done(function(response){
                    allKurir = response
                    get_all_city_from_courier(kurir_pilihan,kurir_kode,province).done(function(response){
                        allKota = response
                        get_all_district_from_courier(kurir_pilihan,kurir_kode,city).done(function(response){
                            get_all_subdistrict_from_courier(kurir_pilihan,kurir_kode,district).done(function(response){
                                allKelurahan =response
                                var berat_product = 0
                                var allProduct = []
                                product.map((val,index)=>{
                                    // 
                                    axios.post(`https://products.sold.co.id/get-product-details?product_code=${val.productNo}`)
                                    .then((res)=>{
                                        // 
                                        allProduct.push(res.data)
                                        berat_product += (res.data.Weight_KG * 0.1)
                                    }).catch((err)=>{
                                        
                                    })
                                })
                
                                var Courier_Price_Code_orig = 'CGK01.00'
                                var packing_type = ''
                                // var berat_product = parseInt(item_product.Weight_KG)
                                
                                if(berat_product <= 0 || berat_product == null || berat_product == undefined || Number.isNaN(berat_product)){
                                    berat_product = 0.1*1.5;
                                }else{
                                    berat_product = berat_product*1*1.5;
                                }
                                var length = ''
                                var  width = '' 
                                var  height = ''
                                var paket_value = '' 
                                new_get_shipping_cost_informations(Courier_Price_Code_orig , allKelurahan[0].Courier_Price_Code, packing_type, berat_product, length, width, height, paket_value).done(function(response){
                                    allPengiriman = response
                                    $('.cart-pengiriman').empty()
                                    $('.cart-asuransi').empty()
                                    $('.cart-packing').empty()
                                    $('.cart-kodepos').empty()
                                    $('#sub-delivery-option').empty()
                                    $('.cart-pengiriman').append(`
                                            <option selected  class="co-pengiriman"> Pengiriman</option>      
                                        `)
                                    $('.cart-asuransi').append(`
                                            <option selected  class="co-asuransi"> Asuransi</option>      
                                        `)
                                    $('.cart-packing').append(`
                                            <option selected  class="co-packing"> Packing</option>      
                                        `)
                                    $('.cart-kodepos').append(`
                                        <option selected  class="co-kodepos"> Kode Pos</option>      
                                        `)
                
                                    allKelurahan.map((val,index)=>{
                                        $('.cart-kodepos').append(`
                                            <option  value="${val.Zipcode}" class="co-kodepos">${val.Zipcode}</option> 
                                        `)
                                    })
                                    allKurir.map((val,index)=>{
                                        $('#sub-delivery-option').append(`
                                            <option  value="${val.Courier_Code}" class="co-kurir">${val.Courier}</option> 
                                        `)
                                    })
        
                
                                    if(allPengiriman){
                                        if(allPengiriman.service != undefined){
                                            allPengiriman.service.map((val,index)=>{
                                                $('.cart-pengiriman').append(`
                                                    <option  value="${val.EST_DAY}days ${val.SERVICE} ${val.TARIFF} ${val.DESCRIPTION} " class="${val.TARIFF}">${val.EST_DAY}days ${val.SERVICE} ${val.TARIFF} ${val.DESCRIPTION}</option> 
                                                `)
                                            })
                                        }
                                        if(allPengiriman.insurance != undefined){
                                            allPengiriman.insurance.map((val,index)=>{
                                                // 
                                                // 
                                                // 
                                                $('.cart-asuransi').append(`
                                                    <option  value="type ${val.INSURANCE_TYPE} ${val.INSURANCE_NAME} ${val.INSURANCE_COST}" class="${val.INSURANCE_COST}">${val.INSURANCE_NAME} - RP ${val.INSURANCE_COST} </option> 
                                                `)
                                            })
                                        }
                                        if(allPengiriman.packing != undefined) {
                                            allPengiriman.packing.map((val,index)=>{
                                                // 
                                                // 
                                                // 
                                                $('.cart-packing').append(`
                                                    <option  value="${val.PACKING_TYPE}" class="${val.PACKING_FEE}">${val.PACKING_TYPE} - RP ${val.PACKING_FEE} </option> 
                                                `)
                                            })
                                        }
                                        Swal.fire({
                                            title: 'Uploading Data',
                                            timer:100,
                                        //     html: ` 
                                        //     <div class="boxcon">
                                        //         <div class="box1">
                                        //         </div>
                                        //         <div id="sold-id-loading">
                                        //         SOLD 
                                        //         </div>
                                                    
                                        //         <div class="box2">
                                        //         </div>
                                        //     </div>
                                        // `,
                                        })
                                    }
                                })
                            })
                        })
                    })
                })
            }).catch((err)=>{
                
            })

            $('.card-checkout-cc').empty()
            product.map((val,index)=>{
                
                getProductsWithProductNo("","",val.productNo).done(function(response){
                    var berat_barang = parseFloat(response.Weight_KG)
                    var total_berat_barang = berat_barang  * val.quantity
                    var fixed_total_berat_barang = total_berat_barang.toFixed(2)
                    if(product.length>4 ){
                        $('.card-checkout-cc').css('height','300px')
                    }
                    
                    $('.card-checkout-cc').append(`
                        <div class="card-item-checkout-cc">
                            <div class="img-item-checkout-cc">
                                <img src="${replace_vtintl_to_sold_co_id(response.Picture_1)}" alt="">
                            </div>
                            <div class="desc-item-checkout-cc">
                                <p>${response.Name}</p>
                                <div class="desc-item-2-checkout-cc">
                                    <p>Quantity : ${val.quantity}</p>
                                    <p>Berat  : ${fixed_total_berat_barang}</p>
                                    <p id="id_harga_barang-${val.productNo}">Harga : ${val.priceAgreed}</p>
                                </div>
                                <div class="for_input_coupon"> 
                                    <input type="text" class="input_coupon_checkout_${val.productNo} input_checkout" placeholder="Masukan Coupon" onchange="onInputCoupon('${val.productNo}')">
                                    <div class="card-coupon-used" id="delete-${val.productNo}" >
            
                                    <div>
                                </div>
                            </div>
                        </div>
                    `)   
                })
            })
            })

    }else {
            var alamat = $('#address-selection option:selected').val()
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
                // var alamat_customer = 'jalan Tumaritis nomor 131 - 11550 - kelapa dua - kebon jeruk - jakarta barat - dki jakarta'
                // var split_alamat = alamat_pilihan.split(',')
                // var jalan_customer = split_alamat[0]
                // var kodepos_customer = split_alamat[1]
                // var sub_district_customer = split_alamat[2]
                // var district_customer = split_alamat[3]
                // var kota_customer = split_alamat[4]
                // var province_customer = split_alamat[5]
                var item_product = ''
                var cart_local = localStorage.getItem('itemsToCheckout')
                // 
                var parse_cart = JSON.parse(cart_local)
                // 
                kurir = response[0]
                allKurir = response
                // 
                var array_cart =[]
                for(var i =0; i<parse_cart.length; i++){
                    // 
                    getProductsWithProductNo("", "", parse_cart[i].productNo).done(function (response) {
                    // get_product_detail_func(parse_cart[i].productNo).done(function(response){
                    // 
                    // 
                    array_cart.push(response)
                    })
                }
                // 
                get_all_province_from_courier(kurir.Courier, kurir.Courier_Code).done(function(response){
                    province = response[0]
                    allProvince = response
                    get_all_city_from_courier(kurir.Courier, kurir.Courier_Code,province.Province).done(function(response){
                        allKota = response
                        kota = response[0]
                        get_all_district_from_courier(kurir.Courier, kurir.Courier_Code, kota.City).done(function(response){
                            allDistrict = response
                            district = response[0]
                            // 
                            // 
                            get_all_subdistrict_from_courier(kurir.Courier, kurir.Courier_Code, district.District).done(function(response){
                                allSub_District = response
                                sub_district = response[0]
                                // 
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
                                    total_berat_product += berat_parse
                                }
                                var total_berat_ceil =Math.ceil(total_berat_product)                                
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
        
                                    if(allPengiriman){
                                        if(allPengiriman.service != undefined){
                                            allPengiriman.service.map((val,index)=>{
                                                $('.cart-pengiriman').append(`
                                                    <option  value="${val.EST_DAY}days ${val.SERVICE} ${val.TARIFF} ${val.DESCRIPTION} " class="${val.TARIFF}">${val.EST_DAY}days ${val.SERVICE} ${val.TARIFF} ${val.DESCRIPTION}</option> 
                                                `)
                                            })
                                        }
                                        if(allPengiriman.insurance != undefined){
                                            allPengiriman.insurance.map((val,index)=>{
                                                $('.cart-asuransi').append(`
                                                    <option  value="type ${val.INSURANCE_TYPE} ${val.INSURANCE_NAME} ${val.INSURANCE_COST}" class="${val.INSURANCE_COST}">${val.INSURANCE_NAME} - RP ${val.INSURANCE_COST} </option> 
                                                `)
                                            })
                                        }
                                        if(allPengiriman.packing != undefined) {
                                            allPengiriman.packing.map((val,index)=>{
                                                $('.cart-packing').append(`
                                                    <option  value="${val.PACKING_TYPE}" class="${val.PACKING_FEE}">${val.PACKING_TYPE} - RP ${val.PACKING_FEE} </option> 
                                                `)
                                            })
                                        }
                                    }
                                })
                            })  
                        })  
                    })
                })
            })
    }
}


const re_render_select_option=async()=>{
        var alamat = $('#address-selection option:selected').val()
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const checkout = urlParams.get('checkout_array');
        var checkout_stringify = JSON.parse(checkout)
        var product = checkout_stringify
    
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

    if(alamat == 'TO SAVED ADDRESS'){ 
        var province = localStorage.getItem('province_customer')
        var city = localStorage.getItem('city_customer')
        var district = localStorage.getItem('district_customer')
        var sub_district = localStorage.getItem('sub_district_customer')
        var allKelurahan = []
        var allPengiriman = []
        var token = localStorage.getItem('token')
        if(province != undefined && city != undefined 
            && district != undefined && sub_district != undefined){
                
        }else {
            province = await find_province_from_address()
            city = await find_city_from_address(province)
            district = await find_district_from_address(city)
            sub_district = await find_subDistrict_from_address(district)
        }
            var kurir_pilihan = ''
            var kurir_kode = ''
            get_all_couriers().done(function(response){
                kurir_pilihan = response[0].Courier
                kurir_kode = response[0].Courier_Code
                var item_product = ''
                var cart_local = localStorage.getItem('itemsToCheckout')
                var parse_cart = JSON.parse(cart_local)
                var array_cart =[]
                for(var i =0; i<parse_cart.length; i++){
                    getProductsWithProductNo("", "", parse_cart[i].productNo).done(function (response) {
                    array_cart.push(response)
                    })
                }
                axios.post(`http://customers.sold.co.id/get-customer-information?Customer_Code=${token}`)
            .then((res)=>{
                // 
                var alamat_pilihan = res.data.Address_1
                get_all_couriers().done(function(response){
                    allKurir = response
                    get_all_city_from_courier(kurir_pilihan,kurir_kode,province).done(function(response){
                        allKota = response
                        get_all_district_from_courier(kurir_pilihan,kurir_kode,city).done(function(response){
                            get_all_subdistrict_from_courier(kurir_pilihan,kurir_kode,district).done(function(response){
                                allKelurahan =response
                                var berat_product = 0
                                var allProduct = []
                                product.map((val,index)=>{
                                    // 
                                    axios.post(`https://products.sold.co.id/get-product-details?product_code=${val.productNo}`)
                                    .then((res)=>{
                                        // 
                                        allProduct.push(res.data)
                                        berat_product += (res.data.Weight_KG * 0.1)
                                    }).catch((err)=>{
                                        
                                    })
                                })
                
                                var Courier_Price_Code_orig = 'CGK01.00'
                                var packing_type = ''
                                if(berat_product <= 0 || berat_product == null || berat_product == undefined || Number.isNaN(berat_product)){
                                    berat_product = 0.1*1.5;
                                }else{
                                    berat_product = berat_product*1*1.5;
                                }
                                var length = ''
                                var  width = '' 
                                var  height = ''
                                var paket_value = '' 
                                new_get_shipping_cost_informations(Courier_Price_Code_orig , allKelurahan[0].Courier_Price_Code, packing_type, berat_product, length, width, height, paket_value).done(function(response){
                                    allPengiriman = response
                                    $('.cart-pengiriman').empty()
                                    $('.cart-asuransi').empty()
                                    $('.cart-packing').empty()
                                    $('.cart-kodepos').empty()
                                    $('#sub-delivery-option').empty()
                                    $('.cart-pengiriman').append(`
                                            <option selected  class="co-pengiriman"> Pengiriman</option>      
                                        `)
                                    $('.cart-asuransi').append(`
                                            <option selected  class="co-asuransi"> Asuransi</option>      
                                        `)
                                    $('.cart-packing').append(`
                                            <option selected  class="co-packing"> Packing</option>      
                                        `)
                                    $('.cart-kodepos').append(`
                                        <option selected  class="co-kodepos"> Kode Pos</option>      
                                        `)
                
                                    allKelurahan.map((val,index)=>{
                                        $('.cart-kodepos').append(`
                                            <option  value="${val.Zipcode}" class="co-kodepos">${val.Zipcode}</option> 
                                        `)
                                    })
                                    allKurir.map((val,index)=>{
                                        $('#sub-delivery-option').append(`
                                            <option  value="${val.Courier_Code}" class="co-kurir">${val.Courier}</option> 
                                        `)
                                    })
        
                
                                    if(allPengiriman){
                                        if(allPengiriman.service != undefined){
                                            allPengiriman.service.map((val,index)=>{
                                                $('.cart-pengiriman').append(`
                                                    <option  value="${val.EST_DAY}days ${val.SERVICE} ${val.TARIFF} ${val.DESCRIPTION} " class="${val.TARIFF}">${val.EST_DAY}days ${val.SERVICE} ${val.TARIFF} ${val.DESCRIPTION}</option> 
                                                `)
                                            })
                                        }
                                        if(allPengiriman.insurance != undefined){
                                            allPengiriman.insurance.map((val,index)=>{
                                                // 
                                                // 
                                                // 
                                                $('.cart-asuransi').append(`
                                                    <option  value="type ${val.INSURANCE_TYPE} ${val.INSURANCE_NAME} ${val.INSURANCE_COST}" class="${val.INSURANCE_COST}">${val.INSURANCE_NAME} - RP ${val.INSURANCE_COST} </option> 
                                                `)
                                            })
                                        }
                                        if(allPengiriman.packing != undefined) {
                                            allPengiriman.packing.map((val,index)=>{
                                                $('.cart-packing').append(`
                                                    <option  value="${val.PACKING_TYPE}" class="${val.PACKING_FEE}">${val.PACKING_TYPE} - RP ${val.PACKING_FEE} </option> 
                                                `)
                                            })
                                        }
                                        Swal.fire({
                                            title: 'Uploading Data',
                                            timer:100,
                                        })
                                    }
                                })
                            })
                        })
                    })
                })
            }).catch((err)=>{
                
            })
            $('.card-checkout-cc').empty()
            product.map((val,index)=>{
                
                getProductsWithProductNo("","",val.productNo).done(function(response){
                    var berat_barang = parseFloat(response.Weight_KG)
                    // 
                    var total_berat_barang = berat_barang  * val.quantity
                    var fixed_total_berat_barang = total_berat_barang.toFixed(2)
                    if(product.length>4 ){
                        $('.card-checkout-cc').css('height','300px')
                    }
                    
                    $('.card-checkout-cc').append(`
                        <div class="card-item-checkout-cc">
                            <div class="img-item-checkout-cc">
                                <img src="${replace_vtintl_to_sold_co_id(response.Picture_1)}" alt="">
                            </div>
                            <div class="desc-item-checkout-cc">
                                <p>${response.Name}</p>
                                <div class="desc-item-2-checkout-cc">
                                    <p>Quantity : ${val.quantity}</p>
                                    <p>Berat  : ${fixed_total_berat_barang}</p>
                                    <p id="id_harga_barang-${val.productNo}">Harga : ${val.priceAgreed}</p>
                                </div>
                                <div class="for_input_coupon"> 
                                    <input type="text" class="input_coupon_checkout_${val.productNo} input_checkout" placeholder="Masukan Coupon" onchange="onInputCoupon('${val.productNo}')">
                                    <div class="card-coupon-used" id="delete-${val.productNo}" >
            
                                    <div>
                                </div>
                            </div>
                        </div>
                    `)   
                })
            })
            })
    }else {
        get_all_couriers().done(function(response){
            var item_product = ''
            var cart_local = localStorage.getItem('itemsToCheckout')
            var parse_cart = JSON.parse(cart_local)
            kurir = response[0]
            allKurir = response
            var array_cart =[]
            for(var i =0; i<parse_cart.length; i++){
                getProductsWithProductNo("", "", parse_cart[i].productNo).done(function (response) {
                array_cart.push(response)
                })
            }
            get_all_province_from_courier(kurir.Courier, kurir.Courier_Code).done(function(response){
                province = response[0]
                allProvince = response
                get_all_city_from_courier(kurir.Courier, kurir.Courier_Code,province.Province).done(function(response){
                    allKota = response
                    kota = response[0]
                    get_all_district_from_courier(kurir.Courier, kurir.Courier_Code, kota.City).done(function(response){
                        allDistrict = response
                        district = response[0]
                        get_all_subdistrict_from_courier(kurir.Courier, kurir.Courier_Code, district.District,).done(function(response){
                            allSub_District = response
                            sub_district = response[0]
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
                                // 
                                total_berat_product += berat_parse
                                // 
                            }
                            var total_berat_ceil =Math.ceil(total_berat_product)
                            // 
                            new_get_shipping_cost_informations(Courier_Price_Code_orig , allSub_District[0].Courier_Price_Code, packing_type, total_berat_ceil, length, width, height, paket_value).done(function(response){
                                allPengiriman = response
                                    /* Read more about handling dismissals below */
                                    
                                        
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
                                        if(allPengiriman){
                                            if(allPengiriman.service != undefined){
                                                allPengiriman.service.map((val,index)=>{
                                                    $('.cart-pengiriman').append(`
                                                        <option  value="${val.EST_DAY}days ${val.SERVICE} ${val.TARIFF} ${val.DESCRIPTION} " class="${val.TARIFF}">${val.EST_DAY}days ${val.SERVICE} ${val.TARIFF} ${val.DESCRIPTION}</option> 
                                                    `)
                                                })
                                            }
                                            if(allPengiriman.insurance != undefined){
                                                allPengiriman.insurance.map((val,index)=>{
                                                    // 
                                                    // 
                                                    // 
                                                    $('.cart-asuransi').append(`
                                                        <option  value="type ${val.INSURANCE_TYPE} ${val.INSURANCE_NAME} ${val.INSURANCE_COST}" class="${val.INSURANCE_COST}">${val.INSURANCE_NAME} - RP ${val.INSURANCE_COST} </option> 
                                                    `)
                                                })
                                            }
                                            if(allPengiriman.packing != undefined) {
                                                allPengiriman.packing.map((val,index)=>{
                                                    // 
                                                    // 
                                                    // 
                                                    $('.cart-packing').append(`
                                                        <option  value="${val.PACKING_TYPE}" class="${val.PACKING_FEE}">${val.PACKING_TYPE} - RP ${val.PACKING_FEE} </option> 
                                                    `)
                                                })
                                            }
                                        }
                                    
                                
                            })
                        })  
                    })  
                })
            })
        })
    }




    
}


const provinceCheckout=(product_id)=>{
    var province_storage = JSON.parse(localStorage.getItem('all_province_tiki'))
    var city_storage = JSON.parse(localStorage.getItem('all_city_tiki'))
    var district_storage = JSON.parse(localStorage.getItem('all_district_tiki'))
    var subdistrict_storage = JSON.parse(localStorage.getItem('all_subdistrict_tiki'))
    var province_pilihan=$('.cart-provinsi option:selected').val()
    var new_kurir_pilihan = $('#sub-delivery-option option:selected').val()
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
    get_all_couriers().done(function(response){
        var dataAllKurir = response
        allKurir = response
        for(var i=0; i<dataAllKurir.length; i++){
            if(dataAllKurir[i].Courier == new_kurir_pilihan){
                kurir_kode = dataAllKurir[i].Courier_Code
            }
        }
        
        
        if(city_storage != undefined && district_storage != undefined && subdistrict_storage != undefined){ // city, district, sub ada isinya
            
        }else if (city_storage != undefined && city_storage.length >0 && district_storage != undefined && district_storage.length >0){ // city district ada isinya

          var kota_pilihan = ''
          var district_pilihan = ''
          city_storage.forEach((val)=>{
                if(val.Province == province_pilihan ){
                    allKota.push(val.City)
                    kota_pilihan = val.City[0].City
                }
          })
          district_storage.forEach((val)=>{
                if(val.City == kota_pilihan ){
                    allDistrict.push(val.District)
                    district_pilihan = val.District     
                }
          })
          $('.cart-kecamatan').empty()
          $('.cart-kota').empty() 
          
          $('.cart-kota').append(`
              <option selected  class="co-kota"> Kota</option>      
          `)
          $('.cart-kecamatan').append(`
              <option selected  class="co-kecamatan"> Kecamatan</option>      
          `)
          allKota[0].map((val,index)=>{
              $('.cart-kota').append(`
                  <option  value="${val.City}" class="co-kota">${val.City}</option> 
              `)
          })
          allDistrict[0].map((val,index)=>{
            $('.cart-kecamatan').append(`
                <option  value="${val.District}" class="reg-kecamatan">${val.District}</option> 
            `)
          })
     


          var cart_local = localStorage.getItem('itemsToCheckout')
                      
          var parse_cart = JSON.parse(cart_local)
          var array_cart =[]
          for(var i =0; i<parse_cart.length; i++){
              getProductsWithProductNo("", "", parse_cart[i].productNo).done(function (response) {
                  array_cart.push(response)
              })
          }
          get_all_district_from_courier(new_kurir_pilihan,kurir_kode,kota_pilihan).done(function(response){
            allDistrict = response
            district = response[0]
            get_all_subdistrict_from_courier(new_kurir_pilihan,kurir_kode,district.District).done(function(response){
                allSub_District = response
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
                    
                    total_berat_product += berat_parse

                }
                    new_get_shipping_cost_informations(Courier_Price_Code_orig , allSub_District[0].Courier_Price_Code, packing_type, total_berat_product, length, width, height, paket_value).done(function(response){
                        allPengiriman = response
                        // $('.cart-kecamatan').empty()
                        $('.cart-kelurahan').empty()
                        $('.cart-kodepos').empty()
                        $('.cart-pengiriman').empty()
                        $('.cart-asuransi').empty()
                        $('.cart-packing').empty()
                       
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
                        if(allPengiriman){
                            if(allPengiriman.service != undefined){
                                allPengiriman.service.map((val,index)=>{
                                    $('.cart-pengiriman').append(`
                                        <option  value="${val.EST_DAY}days ${val.SERVICE} ${val.TARIFF} ${val.DESCRIPTION} " class="${val.TARIFF}">${val.EST_DAY}days ${val.SERVICE} ${val.TARIFF} ${val.DESCRIPTION}</option> 
                                    `)
                                })
                            }
                            if(allPengiriman.insurance != undefined){
                                allPengiriman.insurance.map((val,index)=>{
                                    // 
                                    // 
                                    // 
                                    $('.cart-asuransi').append(`
                                        <option  value="type ${val.INSURANCE_TYPE} ${val.INSURANCE_NAME} ${val.INSURANCE_COST}" class="${val.INSURANCE_COST}">${val.INSURANCE_NAME} - RP ${val.INSURANCE_COST} </option> 
                                    `)
                                })
                            }
                            if(allPengiriman.packing != undefined) {
                                allPengiriman.packing.map((val,index)=>{
                                    // 
                                    // 
                                    // 
                                    $('.cart-packing').append(`
                                        <option  value="${val.PACKING_TYPE}" class="${val.PACKING_FEE}">${val.PACKING_TYPE} - RP ${val.PACKING_FEE} </option> 
                                    `)
                                })
                            }
                        }
                    })
              
            })
        })  
        }else if ( city_storage !=undefined){
            var kota_pilihan = ''
            city_storage.forEach((val)=>{
                if(val.Province == province_pilihan ){
                    allKota.push(val.City)
                    kota_pilihan = val.City[0]
                }
            })
            $('.cart-kota').empty() 
            $('.cart-kota').append(`
                <option selected  class="co-kota"> Kota</option>      
            `)
            allKota[0].map((val,index)=>{
                $('.cart-kota').append(`
                    <option  value="${val.City}" class="co-kota">${val.City}</option> 
                `)
            })
            var cart_local = localStorage.getItem('itemsToCheckout')
            var parse_cart = JSON.parse(cart_local)
            var array_cart =[]
            for(var i =0; i<parse_cart.length; i++){
                getProductsWithProductNo("", "", parse_cart[i].productNo).done(function (response) {
                    array_cart.push(response)
                })
            }
            get_all_district_from_courier(new_kurir_pilihan,kurir_kode,kota_pilihan.City).done(function(response){
                allDistrict = response
                district = response[0]
                get_all_subdistrict_from_courier(new_kurir_pilihan,kurir_kode,district.District).done(function(response){
                    allSub_District = response
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
                        total_berat_product += berat_parse
                    }
                        new_get_shipping_cost_informations(Courier_Price_Code_orig , allSub_District[0].Courier_Price_Code, packing_type, total_berat_product, length, width, height, paket_value).done(function(response){
                            allPengiriman = response
                            $('.cart-kecamatan').empty()
                            $('.cart-kelurahan').empty()
                            $('.cart-kodepos').empty()
                            $('.cart-pengiriman').empty()
                            $('.cart-asuransi').empty()
                            $('.cart-packing').empty()
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
                            if(allPengiriman){
                                if(allPengiriman.service != undefined){
                                    allPengiriman.service.map((val,index)=>{
                                        $('.cart-pengiriman').append(`
                                            <option  value="${val.EST_DAY}days ${val.SERVICE} ${val.TARIFF} ${val.DESCRIPTION} " class="${val.TARIFF}">${val.EST_DAY}days ${val.SERVICE} ${val.TARIFF} ${val.DESCRIPTION}</option> 
                                        `)
                                    })
                                }
                                if(allPengiriman.insurance != undefined){
                                    allPengiriman.insurance.map((val,index)=>{
                                        // 
                                        // 
                                        // 
                                        $('.cart-asuransi').append(`
                                            <option  value="type ${val.INSURANCE_TYPE} ${val.INSURANCE_NAME} ${val.INSURANCE_COST}" class="${val.INSURANCE_COST}">${val.INSURANCE_NAME} - RP ${val.INSURANCE_COST} </option> 
                                        `)
                                    })
                                }
                                if(allPengiriman.packing != undefined) {
                                    allPengiriman.packing.map((val,index)=>{
                                        // 
                                        // 
                                        // 
                                        $('.cart-packing').append(`
                                            <option  value="${val.PACKING_TYPE}" class="${val.PACKING_FEE}">${val.PACKING_TYPE} - RP ${val.PACKING_FEE} </option> 
                                        `)
                                    })
                                }
                            }
                        })
                  
                })
            })
           
    
            
        } else {
    
            loadingMessage(2)
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
                
                var cart_local = localStorage.getItem('itemsToCheckout')
                
                var parse_cart = JSON.parse(cart_local)
                
                // 
                var array_cart =[]
                for(var i =0; i<parse_cart.length; i++){
                    
                    getProductsWithProductNo("", "", parse_cart[i].productNo).done(function (response) {
                    // get_product_detail_func(parse_cart[i].productNo).done(function(response){
                    // 
                    // 
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
                        // 
                        get_all_city_from_courier(new_kurir_pilihan,kurir_kode,province_pilihan).done(function(response){
                            kota = response[0]
                            allKota = response
                            // 
                            get_all_district_from_courier(new_kurir_pilihan,kurir_kode,kota.City).done(function(response){
                                district = response[0]
                                allDistrict = response
                                // 
                                get_all_subdistrict_from_courier(new_kurir_pilihan,kurir_kode,district.District).done(function(response){
                                    allSub_District = response
                                    // 
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
                                        
                                        total_berat_product += berat_parse
                                        
                                    }
                                    new_get_shipping_cost_informations(Courier_Price_Code_orig , allSub_District[0].Courier_Price_Code, packing_type, total_berat_product, length, width, height, paket_value).done(function(response){
                                        allPengiriman = response
                                        
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
                                        if(allPengiriman){
                                            if(allPengiriman.service != undefined){
                                                allPengiriman.service.map((val,index)=>{
                                                    $('.cart-pengiriman').append(`
                                                        <option  value="${val.EST_DAY}days ${val.SERVICE} ${val.TARIFF} ${val.DESCRIPTION} " class="${val.TARIFF}">${val.EST_DAY}days ${val.SERVICE} ${val.TARIFF} ${val.DESCRIPTION}</option> 
                                                    `)
                                                })
                                            }
                                            if(allPengiriman.insurance != undefined){
                                                allPengiriman.insurance.map((val,index)=>{
                                                    // 
                                                    // 
                                                    // 
                                                    $('.cart-asuransi').append(`
                                                        <option  value="type ${val.INSURANCE_TYPE} ${val.INSURANCE_NAME} ${val.INSURANCE_COST}" class="${val.INSURANCE_COST}">${val.INSURANCE_NAME} - RP ${val.INSURANCE_COST} </option> 
                                                    `)
                                                })
                                            }
                                            if(allPengiriman.packing != undefined) {
                                                allPengiriman.packing.map((val,index)=>{
                                                    // 
                                                    // 
                                                    // 
                                                    $('.cart-packing').append(`
                                                        <option  value="${val.PACKING_TYPE}" class="${val.PACKING_FEE}">${val.PACKING_TYPE} - RP ${val.PACKING_FEE} </option> 
                                                    `)
                                                })
                                            }
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
                
                
                
            }
        }
    })

    

}
const kotaCheckout=()=>{
    

    // var city_storage = JSON.parse(localStorage.getItem('all_city_tiki'))
    var district_storage = JSON.parse(localStorage.getItem('all_district_tiki'))
    var subdistrict_storage = JSON.parse(localStorage.getItem('all_subdistrict_tiki'))


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

    get_all_couriers().done(function(response){
        var dataAllKurir = response
        allKurir = response
        var kurir_kode =''
        for(var i=0; i<dataAllKurir.length; i++){
            if(dataAllKurir[i].Courier == new_kurir_pilihan){
                kurir_kode = dataAllKurir[i].Courier_Code
            }
        }

    })


    if(district_storage != undefined && district_storage.length > 0  && subdistrict_storage != undefined && subdistrict_storage.length >0){
        alert('masuk ke  if kotacheckout')
    }else if ( district_storage !=undefined && district_storage.length >0){
        var district_pilihan = ''
        district_storage.forEach((val,index)=>{
            if(val.City == kota_pilihan){
                allDistrict.push(val.District)
                district_pilihan = val.District[0]
            }
        })
     
        var cart_local = localStorage.getItem('itemsToCheckout')
                        
        var parse_cart = JSON.parse(cart_local)
        // 
        var array_cart =[]
        for(var i =0; i<parse_cart.length; i++){
            getProductsWithProductNo("", "", parse_cart[i].productNo).done(function (response) {
                array_cart.push(response)
            })
        }
        get_all_district_from_courier(new_kurir_pilihan,kurir_kode,kota_pilihan).done(function(response){
            allDistrict = response
            district = response[0]
            get_all_subdistrict_from_courier(new_kurir_pilihan,kurir_kode,district.District).done(function(response){
                allSub_District = response
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
                    
                    total_berat_product += berat_parse

                }
                    new_get_shipping_cost_informations(Courier_Price_Code_orig , allSub_District[0].Courier_Price_Code, packing_type, total_berat_product, length, width, height, paket_value).done(function(response){
                        allPengiriman = response
                        $('.cart-kecamatan').empty()
                        $('.cart-kelurahan').empty()
                        $('.cart-kodepos').empty()
                        $('.cart-pengiriman').empty()
                        $('.cart-asuransi').empty()
                        $('.cart-packing').empty()
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
                        if(allPengiriman){
                            if(allPengiriman.service != undefined){
                                allPengiriman.service.map((val,index)=>{
                                    $('.cart-pengiriman').append(`
                                        <option  value="${val.EST_DAY}days ${val.SERVICE} ${val.TARIFF} ${val.DESCRIPTION} " class="${val.TARIFF}">${val.EST_DAY}days ${val.SERVICE} ${val.TARIFF} ${val.DESCRIPTION}</option> 
                                    `)
                                })
                            }
                            if(allPengiriman.insurance != undefined){
                                allPengiriman.insurance.map((val,index)=>{
                                    // 
                                    // 
                                    // 
                                    $('.cart-asuransi').append(`
                                        <option  value="type ${val.INSURANCE_TYPE} ${val.INSURANCE_NAME} ${val.INSURANCE_COST}" class="${val.INSURANCE_COST}">${val.INSURANCE_NAME} - RP ${val.INSURANCE_COST} </option> 
                                    `)
                                })
                            }
                            if(allPengiriman.packing != undefined) {
                                allPengiriman.packing.map((val,index)=>{
                                    // 
                                    // 
                                    // 
                                    $('.cart-packing').append(`
                                        <option  value="${val.PACKING_TYPE}" class="${val.PACKING_FEE}">${val.PACKING_TYPE} - RP ${val.PACKING_FEE} </option> 
                                    `)
                                })
                            }
                        }
                    })
              
            })
        })
    }else {
        loadingMessage(2)
        // alert('masuk ke else  kotacheckout')
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
            $('.danger-error').css('display','none')
            var cart_local = localStorage.getItem('itemsToCheckout')
            var parse_cart = JSON.parse(cart_local)
            var array_cart =[]
            for(var i =0; i<parse_cart.length; i++){
                getProductsWithProductNo("", "", parse_cart[i].productNo).done(function (response) {
                array_cart.push(response)
                })
            }
    
         
                get_all_province_from_courier(new_kurir_pilihan,kurir_kode).done(function(response){
                    province =response[0]
                    allProvince = response
                    get_all_city_from_courier(new_kurir_pilihan,kurir_kode,province_pilihan).done(function(response){
                        kota = response[0]
                        allKota = response
                        get_all_district_from_courier(new_kurir_pilihan,kurir_kode,kota_pilihan).done(function(response){
                            district = response[0]
                            allDistrict = response
                            get_all_subdistrict_from_courier(new_kurir_pilihan,kurir_kode,district.District).done(function(response){
                                allSub_District = response
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
                                    
                                    total_berat_product += berat_parse
                                    
                                }
                                new_get_shipping_cost_informations(Courier_Price_Code_orig , allSub_District[0].Courier_Price_Code, packing_type, total_berat_product, length, width, height, paket_value).done(function(response){
                                    allPengiriman = response
                                    
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
                                    if(allPengiriman){
                                        if(allPengiriman.service != undefined){
                                            allPengiriman.service.map((val,index)=>{
                                                $('.cart-pengiriman').append(`
                                                    <option  value="${val.EST_DAY}days ${val.SERVICE} ${val.TARIFF} ${val.DESCRIPTION} " class="${val.TARIFF}">${val.EST_DAY}days ${val.SERVICE} ${val.TARIFF} ${val.DESCRIPTION}</option> 
                                                `)
                                            })
                                        }
                                        if(allPengiriman.insurance != undefined){
                                            allPengiriman.insurance.map((val,index)=>{
                                                $('.cart-asuransi').append(`
                                                    <option  value="type ${val.INSURANCE_TYPE} ${val.INSURANCE_NAME} ${val.INSURANCE_COST}" class="${val.INSURANCE_COST}">${val.INSURANCE_NAME} - RP ${val.INSURANCE_COST} </option> 
                                                `)
                                            })
                                        }
                                        if(allPengiriman.packing != undefined) {
                                            allPengiriman.packing.map((val,index)=>{
                                                $('.cart-packing').append(`
                                                    <option  value="${val.PACKING_TYPE}" class="${val.PACKING_FEE}">${val.PACKING_TYPE} - RP ${val.PACKING_FEE} </option> 
                                                `)
                                            })
                                        }
                                    }
                                })
                            })
                        })
                    })
                })
            
    
        }else {
            $('.danger-error').css('display','flex')
            re_render_select_option()
            
            
            
            
        }

    }

}
const kecamatanCheckout=()=>{
    // loadingMessage(2)

    var province_storage = JSON.parse(localStorage.getItem('all_province_tiki'))
    var city_storage = JSON.parse(localStorage.getItem('all_city_tiki'))
    var district_storage = JSON.parse(localStorage.getItem('all_district_tiki'))
    var subdistrict_storage = JSON.parse(localStorage.getItem('all_subdistrict_tiki'))
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

    get_all_couriers().done(function(response){
        var dataAllKurir = response
        allKurir = response
        var kurir_kode =''
        for(var i=0; i<dataAllKurir.length; i++){
            if(dataAllKurir[i].Courier == new_kurir_pilihan){
                kurir_kode = dataAllKurir[i].Courier_Code
            }
        }

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
            
            $('.danger-error').css('display','none')
            var cart_local = localStorage.getItem('itemsToCheckout')
            
            var parse_cart = JSON.parse(cart_local)
            
            // 
            var array_cart =[]
            for(var i =0; i<parse_cart.length; i++){
                
                getProductsWithProductNo("", "", parse_cart[i].productNo).done(function (response) {
                // get_product_detail_func(parse_cart[i].productNo).done(function(response){
                
                
                array_cart.push(response)
                })
            }
    
           
                get_all_province_from_courier(new_kurir_pilihan,kurir_kode).done(function(response){
                    province =response[0]
                    allProvince = response
                    
                    get_all_city_from_courier(new_kurir_pilihan,kurir_kode,province_pilihan).done(function(response){
                        kota = response[0]
                        allKota = response
                        
                        get_all_district_from_courier(new_kurir_pilihan,kurir_kode,kota_pilihan).done(function(response){
                            district = response[0]
                            allDistrict = response
                            
                            get_all_subdistrict_from_courier(new_kurir_pilihan,kurir_kode,district_pilihan).done(function(response){
                                allSub_District = response
                                
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
                                    
                                    total_berat_product += berat_parse
                                    
                                }
                                new_get_shipping_cost_informations(Courier_Price_Code_orig , allSub_District[0].Courier_Price_Code, packing_type, total_berat_product, length, width, height, paket_value).done(function(response){
                                    allPengiriman = response
                                    
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
                                    if(allPengiriman){
                                        if(allPengiriman.service != undefined){
                                            allPengiriman.service.map((val,index)=>{
                                                $('.cart-pengiriman').append(`
                                                    <option  value="${val.EST_DAY}days ${val.SERVICE} ${val.TARIFF} ${val.DESCRIPTION} " class="${val.TARIFF}">${val.EST_DAY}days ${val.SERVICE} ${val.TARIFF} ${val.DESCRIPTION}</option> 
                                                `)
                                            })
                                        }
                                        if(allPengiriman.insurance != undefined){
                                            allPengiriman.insurance.map((val,index)=>{
                                                // 
                                                // 
                                                // 
                                                $('.cart-asuransi').append(`
                                                    <option  value="type ${val.INSURANCE_TYPE} ${val.INSURANCE_NAME} ${val.INSURANCE_COST}" class="${val.INSURANCE_COST}">${val.INSURANCE_NAME} - RP ${val.INSURANCE_COST} </option> 
                                                `)
                                            })
                                        }
                                        if(allPengiriman.packing != undefined) {
                                            allPengiriman.packing.map((val,index)=>{
                                                // 
                                                // 
                                                // 
                                                $('.cart-packing').append(`
                                                    <option  value="${val.PACKING_TYPE}" class="${val.PACKING_FEE}">${val.PACKING_TYPE} - RP ${val.PACKING_FEE} </option> 
                                                `)
                                            })
                                        }
                                    }
                                })
                            })
                        })
                    })
                })
        }else {
            $('.danger-error').css('display','flex')
            re_render_select_option()  
        }

    })


}
const kelurahanCheckout=()=>{
    loadingMessage(2)
    var province_pilihan=$('.cart-provinsi option:selected').val()
    var new_kurir_pilihan = $('#sub-delivery-option option:selected').val()
    var kota_pilihan = $('.cart-kota option:selected').val()
    var district_pilihan = $('.cart-kecamatan option:selected').val()
    var sub_district_pilihan = $('.cart-kelurahan option:selected').val()

    
    
    
    
    

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
        
        
        
        
        
        
        
        $('.danger-error').css('display','none')
        var cart_local = localStorage.getItem('itemsToCheckout')
        
        var parse_cart = JSON.parse(cart_local)
        
        // 
        var array_cart =[]
        for(var i =0; i<parse_cart.length; i++){
            
            getProductsWithProductNo("", "", parse_cart[i].productNo).done(function (response) {
            // get_product_detail_func(parse_cart[i].productNo).done(function(response){
            
            
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
                
                get_all_city_from_courier(new_kurir_pilihan,kurir_kode,province_pilihan).done(function(response){
                    kota = response[0]
                    allKota = response
                    
                    get_all_district_from_courier(new_kurir_pilihan,kurir_kode,kota_pilihan).done(function(response){
                        district = response[0]
                        allDistrict = response
                        
                        get_all_subdistrict_from_courier(new_kurir_pilihan,kurir_kode,district_pilihan).done(function(response){
                            allSub_District = response
                            
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
                                
                                total_berat_product += berat_parse
                                
                            }
                            new_get_shipping_cost_informations(Courier_Price_Code_orig , allSub_District[0].Courier_Price_Code, packing_type, total_berat_product, length, width, height, paket_value).done(function(response){
                                allPengiriman = response
                                
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
                                if(allPengiriman){
                                    
                                    if(allPengiriman.service != undefined){
                                        allPengiriman.service.map((val,index)=>{
                                            
                                            $('.cart-pengiriman').append(`
                                                <option  value="${val.EST_DAY}days ${val.SERVICE} ${val.TARIFF} ${val.DESCRIPTION} " class="${val.TARIFF}">${val.EST_DAY}days ${val.SERVICE} ${val.TARIFF} ${val.DESCRIPTION}</option> 
                                            `)
                                        })
                                    }
                                    if(allPengiriman.insurance != undefined){
                                        allPengiriman.insurance.map((val,index)=>{
                                            // 
                                            // 
                                            // 
                                            $('.cart-asuransi').append(`
                                                <option  value="type ${val.INSURANCE_TYPE} ${val.INSURANCE_NAME} ${val.INSURANCE_COST}" class="${val.INSURANCE_COST}">${val.INSURANCE_NAME} - RP ${val.INSURANCE_COST} </option> 
                                            `)
                                        })
                                    }
                                    if(allPengiriman.packing != undefined) {
                                        allPengiriman.packing.map((val,index)=>{
                                            // 
                                            // 
                                            // 
                                            $('.cart-packing').append(`
                                                <option  value="${val.PACKING_TYPE}" class="${val.PACKING_FEE}">${val.PACKING_TYPE} - RP ${val.PACKING_FEE} </option> 
                                            `)
                                        })
                                    }
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
        
        
        
        
    }
}
const kodeposCheckout=()=>{
    
}
const pengirimanCheckout=async()=>{

    var alamat = $('#address-selection option:selected').val()
    var alamat_pilihan = $('#sub-saved-address option:selected').val()
    if(alamat == 'TO SAVED ADDRESS'){
        var token = localStorage.getItem('token')
        var province_pilihan =  await find_province_from_address()
        var kota_pilihan = await find_city_from_address(province_pilihan)
        var district_pilihan = await find_district_from_address(kota_pilihan)
        var sub_district_pilihan = await find_subDistrict_from_address(district_pilihan)
        var harga_shipping = parseInt($('.cart-pengiriman option:selected').attr('class'))
        var array_cart = localStorage.getItem('itemsToCheckout')
        var json_array_cart = JSON.parse(array_cart)
        var harga_barang = 0
        var allKelurahan = []
        var allPengiriman = []
        for(var i=0; i<json_array_cart.length; i++){
            var harga_per_item = parseInt(removeComma(json_array_cart[i].priceAgreed))
            harga_barang += json_array_cart[i].quantity * harga_per_item
        }
        var harga_barang_with_shipping =  harga_barang + harga_shipping
        var new_kurir_pilihan = ''
        var kurir_kode = ''
        get_all_couriers().done(function(response){
            new_kurir_pilihan = response[0].Courier
            kurir_kode = response[0].Courier_Code
            $('.danger-error').css('display','none')
            var cart_local = localStorage.getItem('itemsToCheckout')
            var parse_cart = JSON.parse(cart_local)
            var array_cart =[]
            for(var i =0; i<parse_cart.length; i++){   
                getProductsWithProductNo("", "", parse_cart[i].productNo).done(function (response) {
                    array_cart.push(response)
                })
            }
            get_all_subdistrict_from_courier(new_kurir_pilihan,kurir_kode,district_pilihan).done(function(response){
                allKelurahan = response
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
                    total_berat_product += berat_parse
                }

                new_get_shipping_cost_informations(Courier_Price_Code_orig , allKelurahan[0].Courier_Price_Code, packing_type, total_berat_product, length, width, height, paket_value).done(function(response){
                    allPengiriman = response
                    $('.cart-asuransi').empty()
                    $('.cart-packing').empty()
                    
                 
                    $('.cart-asuransi').append(`
                        <option selected  value="0" class="co-asuransi"> asuransi</option>      
                    `)
                    $('.cart-packing').append(`
                        <option selected value="0" class="co-packing"> packing</option>      
                    `)
                    
                    if(allPengiriman.insurance != undefined){

                        allPengiriman.insurance.map((val,index)=>{

                            $('.cart-asuransi').append(`
                                <option  value="type ${val.INSURANCE_TYPE} ${val.INSURANCE_NAME} ${val.INSURANCE_COST}" class="${val.INSURANCE_COST}">${val.INSURANCE_NAME} - RP ${val.INSURANCE_COST} </option> 
                            `)
                        })
                    }
                    if(allPengiriman.packing != undefined){

                        allPengiriman.packing.map((val,index)=>{
                            $('.cart-packing').append(`
                                <option  value="${val.PACKING_TYPE}" class="${val.PACKING_FEE}">${val.PACKING_TYPE} - RP ${val.PACKING_FEE} </option> 
                            `)
                        })
                    }

                    $('.new-total-price-cc').css('display','flex')
                    $('.new-total-price-cc').empty()
                    $('.new-total-price-cc').append(`
                     <div class="total_price_cc">
                         <p>TOTAL PRICE:</p>
                         <p>RP ${harga_barang_with_shipping} </p>
                     </div>
                    `)
                    $('.new-card-kurir-cc').empty()
                    if(new_kurir_pilihan == 'pengiriman' || new_kurir_pilihan == 'Pengiriman'){
                        $('.new-card-kurir-cc kurir-cc').remove()
                        $('.new-card-kurir-cc').css('display','none')
                    }else {
                        $('.new-card-kurir-cc').css('display','flex')
                        if(kurir_kode == 'tiki'){
                            $('.new-card-kurir-cc').append(`
                                <div class="card-item-checkout-cc kurir-cc">
                                    <div class="img-item-checkout-cc">
                                        <img src="../img/tiki_shipping_method.png" alt="">
                                    </div>
                                    <div class="desc-item-checkout-cc">
                                        <p>${new_kurir_pilihan}</p>
                                        <div class="desc-item-2-checkout-cc">
                                            
                                            <p>Harga : ${harga_shipping}</p>
                                        </div>
                
                                    </div>
                                </div>       
                            `)
                        }else {
                            $('.new-card-kurir-cc').append(`
                                <div class="card-item-checkout-cc kurir-cc">
                                    <div class="img-item-checkout-cc">
                                        <img src="../img/vantsing_shipping_method.png" alt="">
                                    </div>
                                    <div class="desc-item-checkout-cc">
                                        <p>${new_kurir_pilihan}</p>
                                        <div class="desc-item-2-checkout-cc">
                                            <p>Harga : ${harga_shipping}</p>
                                        </div>
                                    </div>
                                </div>       
                            `)
                        }
                    }   
                })
            })
        })

    }else {
        loadingMessage(2)
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
            
            $('.danger-error').css('display','none')
            var cart_local = localStorage.getItem('itemsToCheckout')
            var parse_cart = JSON.parse(cart_local)
            var array_cart =[]
            for(var i =0; i<parse_cart.length; i++){   
                getProductsWithProductNo("", "", parse_cart[i].productNo).done(function (response) {
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
                    
                    get_all_city_from_courier(new_kurir_pilihan,kurir_kode,province_pilihan).done(function(response){
                        kota = response[0]
                        allKota = response
                        
                        get_all_district_from_courier(new_kurir_pilihan,kurir_kode,kota_pilihan).done(function(response){
                            district = response[0]
                            allDistrict = response
                            
                            get_all_subdistrict_from_courier(new_kurir_pilihan,kurir_kode,district_pilihan).done(function(response){
                                allSub_District = response
                                
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
                                    
                                    total_berat_product += berat_parse
                                    
                                }
                                new_get_shipping_cost_informations(Courier_Price_Code_orig , allSub_District[0].Courier_Price_Code, packing_type, total_berat_product, length, width, height, paket_value).done(function(response){
                                    allPengiriman = response
                                    
                                 
                                    $('.cart-asuransi').empty()
                                    $('.cart-packing').empty()
                                    
                                 
                                    $('.cart-asuransi').append(`
                                        <option selected  value="0" class="co-asuransi"> asuransi</option>      
                                    `)
                                    $('.cart-packing').append(`
                                        <option selected value="0" class="co-packing"> packing</option>      
                                    `)
                                    
                                    if(allPengiriman.insurance != undefined){
    
                                        allPengiriman.insurance.map((val,index)=>{
                                            // 
                                            // 
                                            // 
                                            $('.cart-asuransi').append(`
                                                <option  value="type ${val.INSURANCE_TYPE} ${val.INSURANCE_NAME} ${val.INSURANCE_COST}" class="${val.INSURANCE_COST}">${val.INSURANCE_NAME} - RP ${val.INSURANCE_COST} </option> 
                                            `)
                                        })
                                    }
                                    if(allPengiriman.packing != undefined){
    
                                        allPengiriman.packing.map((val,index)=>{
                                            // 
                                            // 
                                            // 
                                            $('.cart-packing').append(`
                                                <option  value="${val.PACKING_TYPE}" class="${val.PACKING_FEE}">${val.PACKING_TYPE} - RP ${val.PACKING_FEE} </option> 
                                            `)
                                        })
                                    }

                                    $('.new-total-price-cc').css('display','flex')
                                    $('.new-total-price-cc').empty()
                                    $('.new-total-price-cc').append(`
                                     <div class="total_price_cc">
                                         <p>TOTAL PRICE:</p>
                                         <p>RP ${harga_barang_with_shipping} </p>
                                     </div>
                                    `)
                                    $('.new-card-kurir-cc').empty()
                                    if(new_kurir_pilihan == 'pengiriman' || new_kurir_pilihan == 'Pengiriman'){
                                        $('.new-card-kurir-cc kurir-cc').remove()
                                        $('.new-card-kurir-cc').css('display','none')
                                    }else {
                                        $('.new-card-kurir-cc').css('display','flex')
                                        if(kurir_kode == 'tiki'){
                                            $('.new-card-kurir-cc').append(`
                                                <div class="card-item-checkout-cc kurir-cc">
                                                    <div class="img-item-checkout-cc">
                                                        <img src="../img/tiki_shipping_method.png" alt="">
                                                    </div>
                                                    <div class="desc-item-checkout-cc">
                                                        <p>${new_kurir_pilihan}</p>
                                                        <div class="desc-item-2-checkout-cc">
                                                            
                                                            <p>Harga : ${harga_shipping}</p>
                                                        </div>
                                
                                                    </div>
                                                </div>       
                                            `)
                                        }else {
                                            $('.new-card-kurir-cc').append(`
                                                <div class="card-item-checkout-cc kurir-cc">
                                                    <div class="img-item-checkout-cc">
                                                        <img src="../img/vantsing_shipping_method.png" alt="">
                                                    </div>
                                                    <div class="desc-item-checkout-cc">
                                                        <p>${new_kurir_pilihan}</p>
                                                        <div class="desc-item-2-checkout-cc">
                                                            <p>Harga : ${harga_shipping}</p>
                                                        </div>
                                                    </div>
                                                </div>       
                                            `)
                                        }
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
        }

    }
}
const asuransiCheckout=async()=>{
    loadingMessage(2)
    var alamat = $('#address-selection option:selected').val()
    var alamat_pilihan = $('#sub-saved-address option:selected').val()
    if(alamat == 'TO SAVED ADDRESS'){
        var province_pilihan =  await find_province_from_address()
        var kota_pilihan = await find_city_from_address(province_pilihan)
        var district_pilihan = await find_district_from_address(kota_pilihan)
        var sub_district_pilihan = await find_subDistrict_from_address(district_pilihan)
        var new_kurir_pilihan = $('#sub-delivery-option option:selected').val()
        var asuransi_pilihan = $('.cart-asuransi option:selected').val()
        var harga_shipping = parseInt($('.cart-pengiriman option:selected').attr('class'))
        var harga_asuransi = parseInt($('.cart-asuransi option:selected').attr('class'))
        var array_cart = localStorage.getItem('itemsToCheckout')
        var json_array_cart = JSON.parse(array_cart)
        var kurir_kode =''
        var allKelurahan = []
        var allPengiriman =[]
        
        if(asuransi_pilihan == '0'){
            harga_asuransi = 0
        }
        
        var harga_barang = 0
        for(var i=0; i<json_array_cart.length; i++){
            var harga_per_item = parseInt(removeComma(json_array_cart[i].priceAgreed))
            
            
            harga_barang += json_array_cart[i].quantity * harga_per_item
        }
        var harga_barang_with_shipping =  harga_barang + harga_shipping + harga_asuransi
        $('.danger-error').css('display','none')
        var cart_local = localStorage.getItem('itemsToCheckout')
            
        var parse_cart = JSON.parse(cart_local)
        
        var array_cart =[]
        for(var i =0; i<parse_cart.length; i++){
            
            getProductsWithProductNo("", "", parse_cart[i].productNo).done(function (response) {
            // get_product_detail_func(parse_cart[i].productNo).done(function(response){
            
            
            array_cart.push(response)
            })
        }
        get_all_couriers().done(function(response){
            var dataAllKurir = response
                allKurir = response
                for(var i=0; i<dataAllKurir.length; i++){
                    if(dataAllKurir[i].Courier == new_kurir_pilihan){
                        kurir_kode = dataAllKurir[i].Courier_Code
                    }
                }
                get_all_subdistrict_from_courier(new_kurir_pilihan,kurir_kode,district_pilihan).done(function(response){
                    allKelurahan = response
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
                        
                        total_berat_product += berat_parse
                    }
                    new_get_shipping_cost_informations(Courier_Price_Code_orig , allKelurahan[0].Courier_Price_Code, packing_type, total_berat_product, length, width, height, paket_value).done(function(response){
                        allPengiriman = response
                        
                     
                        // $('.cart-asuransi').empty()

                        $('.new-total-price-cc').empty()
                        $('.new-total-price-cc').append(`
                         <div class="total_price_cc">
                             <p>TOTAL PRICE:</p>
                             <p>RP ${harga_barang_with_shipping} </p>
                         </div>
                        `)

                        $('.cart-packing').empty()
                        $('.cart-packing').append(`
                            <option selected value="0"  class="co-packing"> Packing</option>      
                        `)
              
                        
                        allPengiriman.packing.map((val,index)=>{
                            $('.cart-packing').append(`
                                <option  value="${val.PACKING_TYPE}" class="${val.PACKING_FEE}">${val.PACKING_TYPE} - RP ${val.PACKING_FEE} </option> 
                            `)
                        })

                        $('.new-card-kurir-cc').empty()
                        if(kurir_kode == 'tiki'){
                            $('.new-card-kurir-cc').append(`
                                <div class="card-item-checkout-cc">
                                    <div class="img-item-checkout-cc">
                                        <img src="../img/tiki_shipping_method.png" alt="">
                                    </div>
                                    <div class="desc-item-checkout-cc">
                                        <p>${new_kurir_pilihan}</p>
                                        <div class="desc-item-2-checkout-cc">
                                            
                                            <p>Harga : ${commafy(harga_shipping)}</p>
                                        </div>
                
                                    </div>
                                </div>       
                            `)
                        }else {
                            $('.new-card-kurir-cc').append(`
                                <div class="card-item-checkout-cc">
                                    <div class="img-item-checkout-cc">
                                        <img src="../img/vantsing_shipping_method.png" alt="">
                                    </div>
                                    <div class="desc-item-checkout-cc">
                                        <p>${new_kurir_pilihan}</p>
                                        <div class="desc-item-2-checkout-cc">
                                            <p>Harga : ${commafy(harga_shipping)}</p>
                                        </div>
                                    </div>
                                </div>       
                            `)
                        }

                        if(asuransi_pilihan == 'asuransi' || asuransi_pilihan == 'ASURANSI' || asuransi_pilihan == undefined || asuransi_pilihan == null || asuransi_pilihan == '0'){
                            $('.new-card-kurir-cc insurance-cc').remove()
                            
                        }else {
                            $('.new-card-kurir-cc').append(`
                                <div class="card-item-checkout-cc insurance-cc">
                                    <div class="img-item-checkout-cc">
                                        <img src="../img/bca.png" alt="">
                                    </div>
                                    <div class="desc-item-checkout-cc">
                                        <p>${asuransi_pilihan}</p>
                                        <div class="desc-item-2-checkout-cc">
                                            <p>Harga : ${commafy(harga_asuransi)}</p>
                                        </div>
                                    </div>
                                </div>  
                            `)
                        }
                    })


                })
        })
    }else {

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
        
        
        if(asuransi_pilihan == '0'){
            harga_asuransi = 0
        }
        
        var harga_barang = 0
        for(var i=0; i<json_array_cart.length; i++){
            var harga_per_item = parseInt(removeComma(json_array_cart[i].priceAgreed))
            
            
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
            
            $('.danger-error').css('display','none')
            var cart_local = localStorage.getItem('itemsToCheckout')
            
            var parse_cart = JSON.parse(cart_local)
            
            var array_cart =[]
            for(var i =0; i<parse_cart.length; i++){
                
                getProductsWithProductNo("", "", parse_cart[i].productNo).done(function (response) {
                // get_product_detail_func(parse_cart[i].productNo).done(function(response){
                
                
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
                    
                    get_all_city_from_courier(new_kurir_pilihan,kurir_kode,province_pilihan).done(function(response){
                        kota = response[0]
                        allKota = response
                        
                        get_all_district_from_courier(new_kurir_pilihan,kurir_kode,kota_pilihan).done(function(response){
                            district = response[0]
                            allDistrict = response
                            
                            get_all_subdistrict_from_courier(new_kurir_pilihan,kurir_kode,district_pilihan).done(function(response){
                                allSub_District = response
                                
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
                                    
                                    total_berat_product += berat_parse
                                    
                                }
                                new_get_shipping_cost_informations(Courier_Price_Code_orig , allSub_District[0].Courier_Price_Code, packing_type, total_berat_product, length, width, height, paket_value).done(function(response){
                                    allPengiriman = response
                                    
                                 
                                    // $('.cart-asuransi').empty()
    
                                    $('.new-total-price-cc').empty()
                                    $('.new-total-price-cc').append(`
                                     <div class="total_price_cc">
                                         <p>TOTAL PRICE:</p>
                                         <p>RP ${commafy(harga_barang_with_shipping)} </p>
                                     </div>
                                    `)
    
                                    $('.cart-packing').empty()
                                    $('.cart-packing').append(`
                                        <option selected value="0"  class="co-packing"> Packing</option>      
                                    `)
                          
                                    
                                    allPengiriman.packing.map((val,index)=>{
                                        // 
                                        // 
                                        // 
                                        $('.cart-packing').append(`
                                            <option  value="${val.PACKING_TYPE}" class="${val.PACKING_FEE}">${val.PACKING_TYPE} - RP ${val.PACKING_FEE} </option> 
                                        `)
                                    })
    
                                    $('.new-card-kurir-cc').empty()
                                    if(kurir_kode == 'tiki'){
                                        $('.new-card-kurir-cc').append(`
                                            <div class="card-item-checkout-cc">
                                                <div class="img-item-checkout-cc">
                                                    <img src="../img/tiki_shipping_method.png" alt="">
                                                </div>
                                                <div class="desc-item-checkout-cc">
                                                    <p>${new_kurir_pilihan}</p>
                                                    <div class="desc-item-2-checkout-cc">
                                                        
                                                        <p>Harga : ${commafy(harga_shipping)}</p>
                                                    </div>
                            
                                                </div>
                                            </div>       
                                        `)
                                    }else {
                                        $('.new-card-kurir-cc').append(`
                                            <div class="card-item-checkout-cc">
                                                <div class="img-item-checkout-cc">
                                                    <img src="../img/vantsing_shipping_method.png" alt="">
                                                </div>
                                                <div class="desc-item-checkout-cc">
                                                    <p>${new_kurir_pilihan}</p>
                                                    <div class="desc-item-2-checkout-cc">
                                                        <p>Harga : ${commafy(harga_shipping)}</p>
                                                    </div>
                                                </div>
                                            </div>       
                                        `)
                                    }
    
                                    if(asuransi_pilihan == 'asuransi' || asuransi_pilihan == 'ASURANSI' || asuransi_pilihan == undefined || asuransi_pilihan == null || asuransi_pilihan == '0'){
                                        $('.new-card-kurir-cc insurance-cc').remove()
                                        
                                    }else {
                                        //     
                                        // $('.final_checkout_insurance_fee').css('display','block')
                                        // $('#final_checkout_insurance_row').empty()
                                        // $('#final_checkout_insurance_row').append(`
                                        //     <td> ${asuransi_pilihan} </td>
                                        //     <td> ${harga_asuransi} </td>
                                        // `)
    
                                        $('.new-card-kurir-cc').append(`
                                            <div class="card-item-checkout-cc insurance-cc">
                                                <div class="img-item-checkout-cc">
                                                    <img src="../img/bca.png" alt="">
                                                </div>
                                                <div class="desc-item-checkout-cc">
                                                    <p>${asuransi_pilihan}</p>
                                                    <div class="desc-item-2-checkout-cc">
                                                        <p>Harga : ${commafy(harga_asuransi)}</p>
                                                    </div>
                                                </div>
                                            </div>  
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
            
            
            
            
        }
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

    var harga_asuransi = parseInt($('.cart-asuransi option:selected').attr('class'))
    var harga_shipping = parseInt($('.cart-pengiriman option:selected').attr('class'))
    var array_cart = localStorage.getItem('itemsToCheckout')
    var json_array_cart = JSON.parse(array_cart)
    
    if(packing_pilihan == '0'){
        harga_packing = 0
    }

    var harga_barang = 0
    for(var i=0; i<json_array_cart.length; i++){
        var harga_per_item = parseInt(removeComma(json_array_cart[i].priceAgreed))
        
        
        harga_barang += json_array_cart[i].quantity * harga_per_item
    }
    var harga_barang_with_shipping =  harga_barang + harga_shipping + harga_packing + harga_asuransi
    

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



    if(harga_asuransi == '0'){
        harga_asuransi = 0
        isAsuransi_pilihan = true
    }
    


    var harga_barang_without_insurance = harga_barang + harga_shipping + harga_packing


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

    if(isKurir_pilihan && isProvince_pilihan && isKota_pilihan && isDistrict_pilihan && isSub_District_pilihan && isPengiriman_pilihan  &&  isPacking_pilihan){
        
        $('.danger-error').css('display','none')
        var cart_local = localStorage.getItem('itemsToCheckout')
        
        var parse_cart = JSON.parse(cart_local)
        
        // 
        var array_cart =[]
        for(var i =0; i<parse_cart.length; i++){
            
            getProductsWithProductNo("", "", parse_cart[i].productNo).done(function (response) {
            // get_product_detail_func(parse_cart[i].productNo).done(function(response){
            
            
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
                
                get_all_city_from_courier(new_kurir_pilihan,kurir_kode,province_pilihan).done(function(response){
                    kota = response[0]
                    allKota = response
                    
                    get_all_district_from_courier(new_kurir_pilihan,kurir_kode,kota_pilihan).done(function(response){
                        district = response[0]
                        allDistrict = response
                        
                        get_all_subdistrict_from_courier(new_kurir_pilihan,kurir_kode,district_pilihan).done(function(response){
                            allSub_District = response
                            
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
                                
                                total_berat_product += berat_parse
                                
                            }
                            new_get_shipping_cost_informations(Courier_Price_Code_orig , allSub_District[0].Courier_Price_Code, packing_type, total_berat_product, length, width, height, paket_value).done(function(response){
                                allPengiriman = response
                                
                                
                                // $('#final_checkout_delivery_row').empty()
                                // $('#final_checkout_total_price_row').empty()

                                

                                // $('#final_checkout_delivery_row').append(`
                                //     <td> ${new_kurir_pilihan} </td>
                                //     <td> ${harga_shipping} </td>
                                // `)
  
                                // $('#final_checkout_total_price_row').append(`
                                //     <td>${harga_barang_with_shipping} </td>
                                // `)



                                $('.new-total-price-cc').empty()
                                if(isAsuransi_pilihan){
                                    $('.new-total-price-cc').append(`
                                     <div class="total_price_cc">
                                         <p>TOTAL PRICE:</p>
                                         <p>RP ${harga_barang_with_shipping} </p>
                                     </div>
                                    `)
                                }else {
                                    $('.new-total-price-cc').append(`
                                     <div class="total_price_cc">
                                         <p>TOTAL PRICE:</p>
                                         <p>RP ${harga_barang_with_shipping} </p>
                                     </div>
                                    `)
                                }


                                if(packing_pilihan == 'packing' || packing_pilihan == 'Packing' || packing_pilihan == undefined || packing_pilihan == null || packing_pilihan == '0'){
                                    $('.card-item-checkout-cc packing-cc').remove()
                                    
                                    // $('.final_checkout_packing_fee').css('display','none')
                                }else {
                 
                                    $('.card-item-checkout-cc').append(`
                                        <div class="card-item-checkout-cc packing-cc">
                                            <div class="img-item-checkout-cc">
                                                <img src="../img/tiki_shipping_method.png" alt="">
                                            </div>
                                            <div class="desc-item-checkout-cc">
                                                <p>${packing_pilihan}</p>
                                                <div class="desc-item-2-checkout-cc">
                                                    
                                                    <p>Harga : ${harga_packing}</p>
                                                </div>
                        
                                            </div>
                                        </div>
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
        
        
        
        
    }
}

function commafy( num ) {
    var str = num.toString().split('.');
    if (str[0].length >= 5) {
        str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
    }
    if (str[1] && str[1].length >= 5) {
        str[1] = str[1].replace(/(\d{3})/g, '$1 ');
    }
    return str.join('.');
}
