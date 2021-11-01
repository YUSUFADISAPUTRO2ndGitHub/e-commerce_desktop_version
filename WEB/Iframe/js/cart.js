$(document).ready(async function(){
    
    var cartToJson = JSON.parse(localStorage.getItem("itemsInCart"));
    var i = 0;
    if(cartToJson.length != 0){
        loadingMessage(cartToJson.length);
    }else{
        loadingMessage(1);
    }

    for(i; i < cartToJson.length; i ++){
        if(cartToJson[i].quantity > 10){
            $('.alert-cart-over').css('display','flex')
        }
        await loadcart(cartToJson[i].productNo, cartToJson[i].quantity);
    }

    // bikinan mas yusuf => bayu yg  comment, gak ngerti gue kaya ada error. items to checkout jd kosong terus. 12 august 2021
    checkboxCounter = 0;
    var requestArrayForItemsToCheckout = [];
    var productToBeAddedStringify = JSON.stringify(requestArrayForItemsToCheckout);
    localStorage.setItem("itemsToCheckout", productToBeAddedStringify);
    
});

var harga_barang = 0
function loadcart(productNo, quantity){
    $('#cart-list').empty()
    getProductsWithProductNo("", "", productNo).done(function (response) {
        
        var harga_satuan = parseInt(response.Sell_Price)
        harga_barang += harga_satuan * quantity
        if(response == false){
            
            var i = 0;
            var cartToJson = JSON.parse(localStorage.getItem("itemsInCart"));
            for(i; i < cartToJson.length; i ++){
                if(cartToJson[i].productNo == productNo){
                    
                    cartToJson.splice(i, 1);
                    localStorage.setItem("itemsInCart", JSON.stringify(cartToJson));
                }
            }
        }else{

            $('#cart-list').append(`
                <div class="new-card-cart productNameClass${productNo}" id="productName${productNo}">
                    <div class="cart-img" id="${productNo}second">
                        <img src="${replace_vtintl_to_sold_co_id(response.Picture_1)}" alt="">
                    </div>
                    <div class="cart-desc" >
                        <div class="cd-1 product-checklist" id="${productNo}first">  
                            <div class="form-check" id ="${productNo}containerCheck">
                                <input class="form-check-input" id="checklist${productNo}" type="checkbox" value="productNo" onchange="selectedCart(this,'${productNo}')">    
                            </div>
                            <p class="limited-text">${response.Name}</p>
                            <div class="card-delete-cart">
                                <i class="far fa-times-circle" onclick="eraseItem('${productNo}')"></i>
                            </div>
                        </div>
                        <div class="cd-2 product-names" id="${productNo}third">
                            <p>Harga </p>
                            <input type="text" id="${productNo}" value="${commafy(Math.round(((quantity * response.Sell_Price)*1)* 100)/ 100)}" disabled>
                        </div>
                        <div class="cd-3 product-prices" id="${productNo}fourth">
                            <div class="cd-3-left">
                                Kuantitas Permintaan
                                <input type="number" value="${quantity}" id="quantity${productNo}" onclick=zoomIn(this) onchange="quantityUpdatedDirectly(this,'${productNo}')">
                            </div>
                            <div class="cd-3-right">
                                Stock Tersedia
                            <input type="number" value="${response.Stock_Quantity}" disabled>
                            </div>
                        </div>
                    </div>
                </div> 
            `)
            $('#total_selected_price').empty()
            $('#total_in_cart').empty()
            // $('#total_selected_price').append(`
            //     <p>${commafy(harga_barang)} </p>
            // `)
            $('#total_in_cart').append(`
                <p>${commafy(harga_barang)} </p>
            `)
        }
    });
}

function selectAllCart(){
    // checklist830100100002
    // checklist830100100002
    // alert('jalan')
    
    var allProduct = JSON.parse(localStorage.getItem('itemsInCart'))
    var total_harga_barang = 0
    allProduct.map((val,index)=>{
        if($(`#checklist${val.productNo}`).prop('checked') === true){
            $(`#checklist${val.productNo}`).prop(`checked`,false)
            $(`#productName${val.productNo}`).css('border','none')
            $('#total_selected_price').html('')
        }else {
            get_product_detail_func(val.productNo).done(function(response){
                
                $(`#productName${val.productNo}`).css('border','3px solid #00a8ff')
                $(`#checklist${val.productNo}`).prop(`checked`,true)
                total_harga_barang += val.quantity * parseInt(response.Sell_Price)
                $('#total_selected_price').html(commafy(total_harga_barang))
            })
            var item = $(`#checklist${val.productNo}`).is('checked')
        }
    })
}

function zoomIn(x){
    $(".fake").css("width", "100%");
    $(".glyphicon-chevron-right").css("display", "table");
    $(".glyphicon-chevron-right").css("margin", "auto");
    $(".glyphicon-chevron-right").html("Tambah");
    $(".glyphicon-chevron-left").css("display", "table");
    $(".glyphicon-chevron-left").css("margin", "auto");
    $(".glyphicon-chevron-left").html("Kurang");
}

function eraseItem(id){
    
    var checkBox = document.getElementById("checklist" + id);
    if (checkBox.checked == true){
        checkBox.checked = false;
        totalPrice = totalPrice - parseInt(removeComma($("#" + id).val()));
        checkboxCounter--;
        $("#total_selected_price").html(commafy(totalPrice));
    }
    var i = 0;
    var cartToJson = JSON.parse(localStorage.getItem("itemsInCart"));
    
    for(i; i < cartToJson.length; i ++){
        if(cartToJson[i].productNo == id){
            cartToJson.splice(i, 1);
            
            // saving to storage
            var productToBeAddedStringify = JSON.stringify(cartToJson);
            localStorage.setItem("itemsInCart", productToBeAddedStringify);
            
            
            break;
        }
        
    }
    removeItemsToCheckout(id);
    $("#productName" + id).empty();
    $('.productNameClass' + id).remove()
    window.location.href="./cart.html"
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

function quantityUpdatedDirectly(x, id){
    var checkBox = document.getElementById("checklist" + id);
    if (checkBox.checked == true){
        checkBox.checked = false;
        totalPrice = totalPrice - parseInt(removeComma($("#" + id).val()));
        checkboxCounter--;
        $("#total_selected_price").html(commafy(totalPrice));
    }

    if($(x).val()> 10){
        $('.alert-cart-over').css('display','flex')
    }else {
        $('.alert-cart-over').css('display','none')
    }
    if($(x).val() > 0){
        loadingMessage(2);
        getProductsWithProductNo("", "", id).done(function (response) {
            var i = 0;
            var cartToJson = JSON.parse(localStorage.getItem("itemsInCart"));
            if(cartToJson.length != 0){
                loadingMessage(cartToJson.length);
            }
            for(i; i < cartToJson.length; i ++){
                if(cartToJson[i].productNo == id){
                    cartToJson[i].quantity = $(x).val();

                    // saving to storage
                    var productToBeAddedStringify = JSON.stringify(cartToJson);
                    localStorage.setItem("itemsInCart", productToBeAddedStringify);
                    $("#quantity" + id).val(cartToJson[i].quantity);

                    $("#" + id).val( commafy( parseInt($("#quantity" + id).val()) * (response.Sell_Price*1) ) );
                    
                    break;
                }
            }
        });
    }else{
        var i = 0;
        var cartToJson = JSON.parse(localStorage.getItem("itemsInCart"));
        for(i; i < cartToJson.length; i ++){
            if(cartToJson[i].productNo == id){
                cartToJson.splice(i, 1);

                // saving to storage
                var productToBeAddedStringify = JSON.stringify(cartToJson);
                localStorage.setItem("itemsInCart", productToBeAddedStringify);
                
                break;
            }
        }
        $("#productName" + id).empty();
        $('.productNameClass' + id).remove()
    }
}

var checkboxCounter = 0;
var totalPrice = 0;
function selectedCart(checkBox,number){
    if (checkBox.checked == true){

        addItemsToCheckout(number);
        $(`#productName${number}`).css('border','3px solid #00a8ff')

        totalPrice = totalPrice + parseInt( removeComma($("#" + number).val()) );
        checkboxCounter++;
    } else {

        removeItemsToCheckout(number);
        $(`#productName${number}`).css('border','none')
        totalPrice = totalPrice - parseInt( removeComma($("#" + number).val()) );
        checkboxCounter--;
    }
    $("#total_selected_price").html(commafy(totalPrice));
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

function removeItemsToCheckout(number){
    var i = 0;
    var cartToJson = JSON.parse(localStorage.getItem("itemsToCheckout"));
    for(i; i < cartToJson.length; i ++){
        if(cartToJson[i].productNo == number){
            cartToJson.splice(i, 1);

            // saving to storage
            var productToBeAddedStringify = JSON.stringify(cartToJson);
            localStorage.setItem("itemsToCheckout", productToBeAddedStringify);
            
            break;
        }
    }
}

function addItemsToCheckout(number){
    if(localStorage.getItem("itemsToCheckout") === null){
        getProductsWithProductNo("", "", number).done(function (response) {
            var productToBeAdded = {
                productNo: response.Product_Code,
                quantity: parseInt($("#quantity" + number).val()),
                GroupCode: "NO COUPON",
                priceAgreed: $("#" + number).val()
            };

            var array = [];
            array.push(productToBeAdded);

            // saving to storage
            var productToBeAddedStringify = JSON.stringify(array);
            localStorage.setItem("itemsToCheckout", productToBeAddedStringify);
            
        });
    }else {
        var cartToJson = JSON.parse(localStorage.getItem("itemsToCheckout"));
        
        var i = 0;
        var indicator = 0;
        for(i; i < cartToJson.length; i ++){
            if(cartToJson[i].productNo == number){
                cartToJson[i].quantity = parseInt($("#quantity" + number).val());
                var itemsInCart = JSON.parse(localStorage.getItem("itemsInCart"));
                if(itemsInCart[i].groupCode != null || itemsInCart[i].groupCode != undefined){
                    cartToJson[i].GroupCode = itemsInCart[i].groupCode;
                }else{
                    cartToJson[i].GroupCode = "NO COUPON";
                }
                cartToJson[i].priceAgreed = $("#" + number).val();
                indicator++;

                // saving to storage
                var productToBeAddedStringify = JSON.stringify(cartToJson);
                localStorage.setItem("itemsToCheckout", productToBeAddedStringify);
                
                break;
            }
        }
        if(indicator == 0){
            getProductsWithProductNo("", "", number).done(function (response) {
                var productToBeAdded = {
                    productNo: response.Product_Code,
                    quantity: parseInt($("#quantity" + number).val()),
                    GroupCode: "NO COUPON",
                    priceAgreed: $("#" + number).val()
                };

                cartToJson.push(productToBeAdded);

                // saving to storage
                var productToBeAddedStringify = JSON.stringify(cartToJson);
                localStorage.setItem("itemsToCheckout", productToBeAddedStringify);
                
            });
        }
    }
}

function addQuantity(id){
    var checkBox = document.getElementById("checklist" + id);
    if (checkBox.checked == true){
        checkBox.checked = false;
        removeItemsToCheckout(id);
        totalPrice = totalPrice - parseInt(removeComma($("#" + id).val())) ;
        checkboxCounter--;
        $("#total_selected_price").html(commafy(totalPrice));
    }
    loadingMessage(2);
    getProductsWithProductNo("", "", id).done(function (response) {
        var i = 0;
        var cartToJson = JSON.parse(localStorage.getItem("itemsInCart"));
        if(cartToJson.length != 0){
            loadingMessage(cartToJson.length);
        }
        for(i; i < cartToJson.length; i ++){
            if(cartToJson[i].productNo == id){
                cartToJson[i].quantity = parseInt(cartToJson[i].quantity) + 1;

                // saving to storage
                var productToBeAddedStringify = JSON.stringify(cartToJson);
                localStorage.setItem("itemsInCart", productToBeAddedStringify);
                $("#quantity" + id).val(cartToJson[i].quantity);

                $("#" + id).val( commafy( parseInt($("#quantity" + id).val()) * (response.Sell_Price*1) ) );
                
                break;
            }
        }
    });
}

function reduceQuantity(id){
    var checkBox = document.getElementById("checklist" + id);
    if (checkBox.checked == true){
        checkBox.checked = false;
        removeItemsToCheckout(id);
        totalPrice = totalPrice - parseInt(removeComma($("#" + id).val()));
        checkboxCounter--;
        $("#total_selected_price").html(commafy(totalPrice));
    }

    if(parseInt($("#quantity" + id).val()) - 1 == 0){
        var i = 0;
        var cartToJson = JSON.parse(localStorage.getItem("itemsInCart"));
        for(i; i < cartToJson.length; i ++){
            if(cartToJson[i].productNo == id){
                cartToJson.splice(i, 1);

                // saving to storage
                var productToBeAddedStringify = JSON.stringify(cartToJson);
                localStorage.setItem("itemsInCart", productToBeAddedStringify);
                
                break;
            }
        }

        $("#productName" + id).empty();
    }else{
        loadingMessage(2);
        getProductsWithProductNo("", "", id).done(function (response) {
            var i = 0;
            var cartToJson = JSON.parse(localStorage.getItem("itemsInCart"));
            if(cartToJson.length != 0){
                loadingMessage(cartToJson.length);
            }
            for(i; i < cartToJson.length; i ++){
                if(cartToJson[i].productNo == id){
                    cartToJson[i].quantity = parseInt(cartToJson[i].quantity) - 1;

                    // saving to storage
                    var productToBeAddedStringify = JSON.stringify(cartToJson);
                    localStorage.setItem("itemsInCart", productToBeAddedStringify);
                    $("#quantity" + id).val(cartToJson[i].quantity);
                    $("#" + id).val( commafy( parseInt($("#quantity" + id).val()) * (response.Sell_Price*1) ) );
                    
                    break;
                }
            }
        });
    }
}

function loadingMessage(interval){
    let timerInterval
    Swal.fire({
    title: 'Loading Your Request',
    html: '',
    timer: interval*500,
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

function checkingout(){
    var token = localStorage.getItem("token");
    
    
    
    
    if(token == undefined){
        localStorage.setItem("token","")
        token = localStorage.getItem('token')
    }
    if(checkboxCounter > 0 && (token != "")){
        swal.fire("Final Step","","success");
        window.location.href = "./Iframe/checkout.html";
    }else{
        if(token == ""){
            // swal.fire("Silahkan Login","","warning");
            Swal.fire({
                html:`
                <div class="o-circle c-container__circle o-circle__sign--failure">
                    <div class="o-circle__sign"></div>  
                </div> 
                Silahkan Login`,
                timer:2000,
                
            })
            // window.location.href = "./sign-in.html";
        }else {
            // swal.fire("Pilih barang di keranjang","","warning");
            Swal.fire({
                html:`
                <div class="o-circle c-container__circle o-circle__sign--failure">
                    <div class="o-circle__sign"></div>  
                </div> 
                Pilih Barang di Keranjang`,
                timer:2000,
                
            })
        }
    }
}

function checkingoutAll(){
    async function looping_product(){
        var isSuccess = true
        var arr = localStorage.getItem('itemsInCart')
        var arr_product = JSON.parse(arr)
         for (var i=0; i<arr_product.length; i++){
           isSuccess=  await check_qty(arr_product,i)               
           $(`#productName${arr_product[i].productNo}`).css('border','none')
           if(isSuccess == 'false' || isSuccess == false){
               $(`#productName${arr_product[i].productNo}`).css('border','3px solid red')
               i=arr_product.length
           } 
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
                if(quantity_product > qty_sisa || qty_sisa == 'undefined' || qty_sisa == 'null' || qty_sisa == null || isNaN(qty_sisa
                    || res.data.Sell_Price == null || res.data.Sell_Price == 'null' || res.data.Sell_Price ==undefined
                    )){
                    isSuccess = false
                }
                if(res.data.Sell_Price == 'null'){
                    isSuccess = false
                }
                resolve(isSuccess) 
            }).catch((err)=>{
                
            })
        })
    }
    
    
    async function success(isSuccess){
        if(isSuccess){
                var token = localStorage.getItem("token");
                console.log(token === null)
                if(token === null){
                    if(token === null){
                        // swal.fire("Silahkan Login","","warning");
                        Swal.fire({
                            html:`
                            <div class="o-circle c-container__circle o-circle__sign--failure">
                                <div class="o-circle__sign"></div>  
                            </div> 
                            Silahkan Login`,
                            timer:2000,
                            
                        })
                        // $('#loginModal',window.parent.document).modal('show')
                        // window.location.href = "./sign-in.html";
                    }else {
                        // swal.fire("Pilih barang di keranjang","","warning");
                        Swal.fire({
                            html:`
                            <div class="o-circle c-container__circle o-circle__sign--failure">
                                <div class="o-circle__sign"></div>  
                            </div> 
                            Pilih Barang di Keranjang`,
                            timer:2000,
                            
                        })
                    }
                }else{
                    var cartToJson = JSON.parse(localStorage.getItem("itemsInCart"));
                    if(cartToJson.length != 0){
                        // 
                        var checking_product_company = []
                        var result_address_company = []
                        var province_company = ''
                        var city_company = ''
                        var district_company = ''
                        var courier_price_code_company = ''

                        // update baru
                        var array = [];
                        var productToBeAddedStringify = JSON.stringify(array);
                        localStorage.setItem("itemsToCheckout", productToBeAddedStringify);
                        var i = 0;
                        var product_number = ''
                        for(i; i < cartToJson.length; i ++){
                                product_number = cartToJson[i].productNo               
                                province_company = await find_province_from_product_company(cartToJson[i].company_address)
                                city_company = await find_city_from_product_company(province_company,cartToJson[i].company_address)
                                district_company = await find_district_from_product_company(city_company,cartToJson[i].company_address)
                                courier_price_code_company = await find_courier_price_code_from_product_company(district_company,cartToJson[i].company_address)
                                var berat_product = parseFloat(cartToJson[i].weight_kg) * parseInt($("#quantity" + product_number).val())
                                var productToBeAdded = {
                                    productNo: product_number,
                                    quantity: parseInt($("#quantity" + product_number).val()),
                                    GroupCode: "NO COUPON",
                                    priceAgreed: $("#" + product_number).val(),
                                    courier_price_code:courier_price_code_company,
                                    company_address:cartToJson[i].company_address,
                                    province_company:province_company,
                                    city_company:city_company,
                                    district_company:district_company.District,
                                    weight_kg:cartToJson[i].weight_kg,
                                    berat_product:berat_product,
                                    product_name:cartToJson[i].product_name
                                };
                                // 
                                array.push(productToBeAdded);  
                                // saving to storage
                                var productToBeAddedStringify = JSON.stringify(array)                            
                                localStorage.setItem("itemsToCheckout", productToBeAddedStringify);
                                // 

                                if(i === cartToJson.length -1 ){
                                     window.location.href = `/WEB/Iframe/checkout.html?checkout_array=${productToBeAddedStringify}`;
                                }
                            
                        }

                        
                        // swal.fire("Final Step","","success");
                        // window.location.href = `/WEB/Iframe/checkout.html?checkout_array=${productToBeAddedStringify}`;
                    }else{
                        swal.fire("Something is missing","You do not have anything in Cart","warning");
                    }


                    
                }
            
        }else {
            
            // Swal.fire("Quantity Kurang / Harga Salah", "Error", "error");
            Swal.fire({
                html:`
                <div class="o-circle c-container__circle o-circle__sign--failure">
                    <div class="o-circle__sign"></div>  
                </div> 
                Quantity Kurang / Harga Salah`,
                timer:2000,
                
            })
        }
    }
    looping_product()
  
}




function checkingoutAllInStore(){
    in_store_loading_checkout();
    setTimeout(() => {
        var token = localStorage.getItem("token");
        
        if((token != "" || token == null)){
            var cartToJson = JSON.parse(localStorage.getItem("itemsInCart"));
            if(cartToJson.length != 0){
                var array = [];
                var productToBeAddedStringify = JSON.stringify(array);
                localStorage.setItem("itemsToCheckout", productToBeAddedStringify);
                var i = 0;
                for(i; i < cartToJson.length; i ++){
                    var productToBeAdded = {
                        productNo: cartToJson[i].productNo,
                        quantity: parseInt($("#quantity" + cartToJson[i].productNo).val()),
                        GroupCode: "NO COUPON",
                        priceAgreed: $("#" + cartToJson[i].productNo).val()
                    };
                    array.push(productToBeAdded);
                
                    // saving to storage
                    var productToBeAddedStringify = JSON.stringify(array);
                    localStorage.setItem("itemsToCheckout", productToBeAddedStringify);
                    
                }
                // swal.fire("Final Step","","success");
                window.location.href = "./checkout-in-store.html?check_store_price=true";
            }else{
                // swal.fire("Something is missing","You do not have anything in Cart","warning");
                Swal.fire({
                    html:`
                    <div class="o-circle c-container__circle o-circle__sign--failure">
                        <div class="o-circle__sign"></div>  
                    </div> 
                    Something is Missing, You do not have anything in Cart`,
                    timer:2000,
                    
                })
            }
        }else{
            // swal.fire("Something is missing","You have not logged-in","warning");
            Swal.fire({
                html:`
                <div class="o-circle c-container__circle o-circle__sign--failure">
                    <div class="o-circle__sign"></div>  
                </div> 
                You have not logged-in`,
                timer:2000,
                
            })
            if(token == ""){
                window.location.href = "./sign-in.html";
            }
        }
    }, 5100);
}

function in_store_loading_checkout(){
    let timerInterval
    Swal.fire({
    title: 'Perubahan harga sesuai harga Toko',
    html: 'Harga akan berubah sesuai dengan harga Toko',
    timer: 5000,
    timerProgressBar: true,
    didOpen: () => {
        Swal.showLoading()
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
    }).then((result) => {
        /* Read more about handling dismissals below */
        if (result.dismiss === Swal.DismissReason.timer) {
        }
    })
}
function replace_vtintl_to_sold_co_id(original_url){
    var original_url = original_url.split("http://image.vtintl.id/").join("https://image.sold.co.id/");
return original_url;
}


function get_product_detail_func(product_id){
    var settings = {
        "url": `http://products.sold.co.id/get-product-details?product_code=${product_id}`,
        "method": "POST",
        "timeout": 0,
    };
    
    return $.ajax(settings);
}