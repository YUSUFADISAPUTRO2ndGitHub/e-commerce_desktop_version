$(document).ready(async function(){
    
    var cartToJson = JSON.parse(localStorage.getItem("itemsInCart"));
    var i = 0;
    if(cartToJson.length != 0){
        loadingMessage(cartToJson.length);
    }else{
        loadingMessage(1);
    }
    for(i; i < cartToJson.length; i ++){
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
            // $("#cart-list").append("<tr class=\"table-primary\" id=\"productName" + productNo + "\">"); // change id (productName) to actual product id or name
            // // checklist
            // $("#productName" + productNo).append("<td class=\"product-checklist\" scope=\"row\" id=\"" + productNo + "first" + "\">");
            // $("#" + productNo + "first").append("<div class=\"form-check\" id=\"" + productNo + "containerCheck" + "\">");
            // $("#" + productNo + "containerCheck").append("<input class=\"form-check-input\" id=\"checklist" + productNo + "\" type=\"checkbox\" value=\"productNo\" onchange=\"selectedCart(this,\'" + productNo + "\')\">");
            // // product image
            // $("#productName" + productNo).append("<td class=\"product-names\" id=\"" + productNo + "second" + "\">");
            // $("#" + productNo + "second").append("<img src=\"" + response.Picture_1 + "\" style=\"width: 50px; height: 50px; margin-right: 10px;\">" + response.Name + "<br>");
            // $("#" + productNo + "second").append("<button type=\"button\" id=\"erase" + productNo + "\" class=\"btn btn-info\" onclick=\"eraseItem(\'" + productNo + "\')\">erase</button>");
            // // quantity
            // $("#productName" + productNo).append("<td class=\"product-quantity\" id=\"" + productNo + "third" + "\">");
            // $("#" + productNo + "third").append("<i onclick=\"reduceQuantity(\'" + productNo + "\')\" class=\"glyphicon glyphicon-chevron-left\" id=\"productNo" + productNo + "decrease" +"\"></i>");
            // $("#" + productNo + "third").append("<input id=\"quantity" + productNo + "\" class=\"fake\" value=\"" + quantity + "\" onclick=zoomIn(this) onchange=\"quantityUpdatedDirectly(this, \'" + productNo + "\')\"></input>");
            // $("#" + productNo + "third").append("<i onclick=\"addQuantity(\'" + productNo + "\')\" class=\"glyphicon glyphicon-chevron-right\" id=\"productNo" + productNo + "increase" +"\"></i>");
            // // price
            // $("#productName" + productNo).append("<td class=\"product-price\" id=\"" + productNo + "fourth" + "\">");
            // $("#" + productNo + "fourth").append("<input class=\"fake-1\" id=\"" + productNo + "\" value=\"" + commafy(Math.round(((quantity * response.Sell_Price)*1)* 100)/ 100) + "\" disabled></input>");
            $('#cart-list').append(`
                <div class="new-card-cart productNameClass${productNo}" id="productName${productNo}">
                    <div class="cart-img" id="${productNo}second">
                        <img src="${response.Picture_1}" alt="">
                    </div>
                    <div class="cart-desc" >
                        <div class="cd-1 product-checklist" id="${productNo}first">  
                            <div class="form-check" id ="${productNo}containerCheck">
                                <input class="form-check-input" id="checklist${productNo}" type="checkbox" value="productNo" onchange="selectedCart(this,'${productNo}')">    
                            </div>
                            <p>${response.Name}</p>
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
    
    
    $('#checklist830100100004').prop('checked', true);
    $('#checklist830100100003').prop('checked', true);

    $('.ins_total_price_cart').empty()
    $('.ins_total_price_cart').append(`
        <p> Total Price Selected Cart : RP </p>
        <p id="total_selected_price">bayu</p>
    `)

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
    timer: interval*700,
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
            swal.fire("Silahkan Login","","warning");
            // window.location.href = "./sign-in.html";
        }else {
            swal.fire("Pilih barang di keranjang","","warning");
        }
    }
}

function checkingoutAll(){
    async function looping_product(){
        var isSuccess = true
        var arr = localStorage.getItem('itemsInCart')
        var arr_product = JSON.parse(arr)
        // 
         for (var i=0; i<arr_product.length; i++){
           isSuccess=  await check_qty(arr_product,i)     
           
           //    
           $(`#productName${arr_product[i].productNo}`).css('border','none')
           if(isSuccess == 'false' || isSuccess == false){
               
               
               
               $(`#productName${arr_product[i].productNo}`).css('border','3px solid red')
               i=arr_product.length
           } 
        }
        // 
        await success(isSuccess)
        
    }
    async function check_qty(arr_product,i){
       return new Promise(async(resolve,reject)=>{
            var quantity_product = parseInt(arr_product[i].quantity)
            await axios.post(`http://products.sold.co.id/get-product-details?product_code=${arr_product[i].productNo}`)
            .then(async(res)=>{
                var isSuccess = true
                // 
                var qty_sisa = res.data.Stock_Quantity
                // 
                // 
                // 
                // 
                // 
                if(quantity_product > qty_sisa || qty_sisa == 'undefined' || qty_sisa == 'null' || qty_sisa == null || isNaN(qty_sisa
                    || res.data.Sell_Price == null || res.data.Sell_Price == 'null' || res.data.Sell_Price ==undefined
                    )){
                    isSuccess = false

                    // 
                }
                if(res.data.Sell_Price == 'null'){
                    isSuccess = false
                    // 
                }
                // 
                resolve(isSuccess)
                // 
            }).catch((err)=>{
                
            })
        })
    }
    
    
    async function success(isSuccess){
        // 
        if(isSuccess){
                var token = localStorage.getItem("token");
                // 
                if((token != "" || token == null)){
                    var cartToJson = JSON.parse(localStorage.getItem("itemsInCart"));
                    // 
                    if(cartToJson.length != 0){
                        var array = [];
                        var productToBeAddedStringify = JSON.stringify(array);
                        localStorage.setItem("itemsToCheckout", productToBeAddedStringify);
                        var i = 0;
                        for(i; i < cartToJson.length; i ++){
                            // 
                            
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

                        
                        swal.fire("Final Step","","success");
                        window.location.href = `/WEB/Iframe/checkout.html?checkout_array=${productToBeAddedStringify}`;
                    }else{
                        swal.fire("Something is missing","You do not have anything in Cart","warning");
                    }
                }else{
                    if(token == ""){
                        swal.fire("Silahkan Login","","warning");
                        // $('#loginModal',window.parent.document).modal('show')
                        // window.location.href = "./sign-in.html";
                    }else {
                        swal.fire("Pilih barang di keranjang","","warning");
                    }
                }
            
        }else {
            
            Swal.fire("Quantity Kurang / Harga Salah", "Error", "error");
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
                swal.fire("Final Step","","success");
                window.location.href = "./checkout-in-store.html?check_store_price=true";
            }else{
                swal.fire("Something is missing","You do not have anything in Cart","warning");
            }
        }else{
            swal.fire("Something is missing","You have not logged-in","warning");
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
