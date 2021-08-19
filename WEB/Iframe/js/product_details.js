
$(document).ready(function(){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const product = urlParams.get('productid');
    const productName = urlParams.get('productName');
    
    fillingInInformations(product);
    // navigation within product details
    $(".product-price").click(function(){
        $(".directory-explainator").removeClass("active");
        $("#price").toggleClass("active");
    });
    $(".product-details").click(function(){
        $(".directory-explainator").removeClass("active");
        $("#details").toggleClass("active");
    });
    $(".product-terms").click(function(){
        $(".directory-explainator").removeClass("active");
        $("#terms").toggleClass("active");
    });
    $("#back-button").click(function(){
        window.location.href = "./search_results.html";
    });

    // getProductRating();
    getProducts();
    generateUserSavedAddress();
    listPaymentMethods();
    check_if_user_has_unpaid_sales_order();
});

function check_if_user_has_unpaid_sales_order(){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const product = urlParams.get('productid');
    if(localStorage.getItem("token").length > 0){
        get_upaid_order_from_product_code_and_customer_code(localStorage.getItem("token"), product).done(function (response) {
            if(!response){
                $("#payment-not-received").css("display", "block");
                $(".generate-group-buy-button").css("display", "none");
            }else{
                $("#payment-not-received").css("display", "none");
                $(".generate-group-buy-button").css("display", "block");
            }
        });
    }
}

function listPaymentMethods(){
    getPaymentMethods().done(function (response) {
        var i = 0;
        for(i = 0; i < response.length; i++){
            if(response[i].Payment_Method_Name.toUpperCase() == "BCA VA TRANSFER"){
                $("#payment-selection").append("<option>" + response[i].Payment_Method_Name + "</option>");
            }
        }
    });
}

function checkQuantityBuyLimit(x){
    
    // alert($(x).val());
    var queryString = window.location.search;
    var urlParams = new URLSearchParams(queryString);
    var product = urlParams.get('productid');
    getGroupBuyQuantitySoFarGross(product).done(function (response) {
        if($(x).val() > (parseFloat($("#group-purchase-quantity-target").html()) - response.Total_Quantity)){
            swal.fire("Kuantitas melebihi yang kita dapat berikan", "", "info");
            $(x).val((parseFloat($("#group-purchase-quantity-target").html()) - response.Total_Quantity));
        }else if(1 > $(x).val()){
            swal.fire("Kuantitas tidak sesuai", "", "info");
            $(x).val(1);
        } 
    });
}

function generateUserSavedAddress(){
    // sub-saved-address
    getCustomersWithCustomerNo(localStorage.getItem("token")).done(function (response) {
        if(response != false){
            if(response.Address_1 != "NULL" || response.Address_1 != null){
                $("#sub-saved-address").append("<option value=\"" + response.Address_1 + "\">" + response.Address_1 + "</option>");
            }
            if(response.Address_2 != "NULL" || response.Address_2 != null){
                $("#sub-saved-address").append("<option value=\"" + response.Address_2 + "\">" + response.Address_2 + "</option>");
            }
            if(response.Address_3 != "NULL" || response.Address_3 != null){
                $("#sub-saved-address").append("<option value=\"" + response.Address_3 + "\">" + response.Address_3 + "</option>");
            }
            if(response.Address_4 != "NULL" || response.Address_4 != null){
                $("#sub-saved-address").append("<option value=\"" + response.Address_4 + "\">" + response.Address_4 + "</option>");
            }
            if(response.Address_5 != "NULL" || response.Address_5 != null){
                $("#sub-saved-address").append("<option value=\"" + response.Address_5 + "\">" + response.Address_5 + "</option>");
            }
        }
        var name = response.First_Name + " " + response.Last_Name;
    });
}

function getProducts(){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const product = urlParams.get('productid');
    getProductsWithProductNo("", "", product).done(function (response) {
        getAllProductsWithoutPaginationWithFilter("", "", "", "", response.Name).done(function (response) {
            
            if(response.length == 0){
                
            }
            var product_row = 1;
            for(product_row; product_row <= response.length; product_row = product_row +2){
                generateListOneByOne(product_row, response[product_row-1], response[product_row]);
            }
        });
    });
    // getAllProductsInGroupBuy("", "").done(function (response) {
    //     
    //     if(response.length == 0){
    //         getProducts();
    //         
    //     }
    //     var product_row = 1;
    //     for(product_row; product_row <= response.length; product_row = product_row +2){
    //         generateListOneByOne(product_row, response[product_row-1], response[product_row]);
    //     }
    // });
}

function generateListOneByOne(product_row, data1, data2){
    $(".other-product-area").append("<ul class=\"list-group list-group-horizontal\" id=\"list-group-" + product_row + "\"></ul>");
    $("#list-group-" + product_row).append("<li onclick=\"redirectProductDetails(this, '" + data1.Product_Code + "', '" + data1.Name + "')\" class=\"list-group-item\" id=\"list-group-item-" + product_row + "\">");
    $("#list-group-item-" + product_row).append("<div class=\"product-card\" id=\"product-card-" + product_row + "\">");
    $("#product-card-" + product_row).append("<img class=\"product-card-images\" src=\"" + data1.Picture_1 + "\">");
    $("#product-card-" + product_row).append("<div class=\"product-card-name\">" + data1.Name + "</div>");
    
    if(data2 != undefined){
        $("#list-group-" + product_row).append("<li onclick=\"redirectProductDetails(this, '" + data2.Product_Code + "', '" + data2.Name + "')\" class=\"list-group-item\" id=\"list-group-item-" + (product_row + 1) + "\">");
        $("#list-group-item-" + (product_row + 1)).append("<div class=\"product-card\" id=\"product-card-" + (product_row + 1) + "\">");
        $("#product-card-" + (product_row + 1)).append("<img class=\"product-card-images\" src=\"" + data2.Picture_1 + "\">");
        $("#product-card-" + (product_row + 1)).append("<div class=\"product-card-name\">" + data2.Name + "</div>");
    }
}

function fillingInInformations(productNo){
    
    getProductsWithProductNo("", "", productNo).done(function (response) {
        
        if(!response){
            alert("Unfortunately this product is not available");
        }else{
            $("#main-price").html("Rp. " + commafy(response.Sell_Price * 1) );
            $("#main-name").html(response.Name);
            $("#main-cod").html("Rp. " + commafy(response.Sell_Price * 1) );
            $("#main-period").html("Rp. " + commafy(response.GroupBuy_SellPrice));
            $("#main-period-2").html("Rp. Hidden | Tersembunyi");
            $("#main-details").html(response.Description);
            $("#product-id").val(response.Product_Code);
            productCode = response.Product_Code;
            groupPrice = response.GroupBuy_SellPrice;

            $("#main-product-images").empty();
            // $.get("http://147.139.168.202:8080/products.jsp?productNo=" + response.Product_Code, function(data, status){
            //     var datas;
            //     datas = JSON.parse(data);
            //     
            //     $("#1").append("<img src=\"" + datas[0].default_pic + "\" class=\"d-block w-100\">");
            // });
            getProductsWithProductNo("", "", productNo).done(function (response) {
                
                $("#main-product-images").append("<div id=\"" + 1 + "\" class=\"carousel-item active\">");
                $("#1").append("<img src=\"" + response.Picture_1 + "\" class=\"d-block w-100\">");
                $("#main-product-images").append("<div id=\"" + 2 + "\" class=\"carousel-item\">");
                $("#2").append("<img src=\"" + response.Picture_2 + "\" class=\"d-block w-100\">");
                $("#main-product-images").append("<div id=\"" + 3 + "\" class=\"carousel-item\">");
                $("#3").append("<img src=\"" + response.Picture_3 + "\" class=\"d-block w-100\">");
            });

            // alert(response.type);
            
            if(response.GroupBuy_Purchase != "true"){
                $("#discount-code").css("display", "none");
                $(".choose-group-code").css("display", "none");
                $(".group-price").css("display", "none");
                $("#main-period").css("display", "none");
                $(".main-group-buy").css("display", "none");
            }else{
                $(".join-status-of-group-buy").css("display", "block");
                if(!(response.GroupBuy_SellQuantity > 0) || response.GroupBuy_SellQuantity == null){
                    $(".target-quantity").css("display", "none");
                }else{
                    // alert(response.targetGroupBuy);
                    $("#group-purchase-quantity-target").html(response.GroupBuy_SellQuantity);
                }
                getUnpaidOrderPerProduct(productCode, localStorage.getItem("token")).done(function (response) {
                    
                    $("#discount-code").css("display", "none");
                    if(response.Payment_Status == "waitpay"){
                        $("#payment-not-received").css("display", "block");
                        $("#va-number").html("12943" + response.orderNumber);
                    }else{
                        $("#discount-code").css("display", "block");
                    }
                });
                
                //checkTotalQuantityGroupBuySoFarGrossFigure
                getGroupBuyQuantitySoFarGross(productCode).done(function (response) {
                    
                    if(response.Total_Quantity != null){
                        
                        $("#group-purchase-quantity-ordered").val(response.Total_Quantity)
                        $("#group-purchase-quantity-sofar").html(response.Total_Quantity);
                        
                        $(".progress-bar").css("width", ((response.Total_Quantity * 100) / $("#group-purchase-quantity-target").html()) + "%");
                        
                        
                        if(response.Total_Quantity >= $("#group-purchase-quantity-target").html()){
                            //alert(datas.quantitySoFar >= $("#group-purchase-quantity-target").html());
                            $("#discount-code").css("display", "none");
                            $(".choose-group-code").css("display", "none");
                            $(".group-price").css("display", "none");
                            $("#main-period").css("display", "none");
                            $(".main-group-buy").css("display", "none");
                            
                            if(parseInt($("#group-purchase-quantity-target").html()) == response.Total_Quantity){
                                
                                closeGroupBuyStatusOnProduct(product_code).done(function (response) { 
                                    if(response){
                                        $("#discount-code").css("display", "none");
                                        $(".choose-group-code").css("display", "none");
                                        $(".group-price").css("display", "none");
                                        $("#main-period").css("display", "none");
                                        $(".main-group-buy").css("display", "none");
                                        // $.get("http://147.139.168.202:8080/deleteAllTransactionsWithConditionAndSetItemForNonSale.jsp?productCode=" + productCode, function(data, status){
                                        //     
                                        //     window.location.href = "./home.html";
                                        // });
                                    }
                                });
                            }
                        }
                    }
                });
            }
        }
    });
}
let productCode = "";
let groupPrice = "";

function getProductRating(){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const productid = urlParams.get('productid');
    $.get("http://147.139.168.202:8080/viewRatingScore.jsp?productNo=" + productid, function(data, status){
        
        datas = JSON.parse(data);
        // 
        var currentRating = 1*datas.currentRating;
        var numberOfUserRating = 1*datas.numberOfUserRating;
        var actualRating = (currentRating/numberOfUserRating);
        // alert(actualRating <= 20 || actualRating > 20 || actualRating < 40);
        // alert(actualRating);
        if(numberOfUserRating == 0){
        }else {
            if(actualRating <= 20 || (actualRating > 20 && actualRating < 40)){
                // alert(actualRating);
                $("#20").css("display", "block");
                $("#40").css("display", "none");
                $("#60").css("display", "none");
                $("#80").css("display", "none");
                $("#100").css("display", "none");
            }else if(actualRating >= 40 && actualRating < 60){
                $("#20").css("display", "block");
                $("#40").css("display", "block");
                $("#60").css("display", "none");
                $("#80").css("display", "none");
                $("#100").css("display", "none");
            }else if(actualRating >= 60 && actualRating < 80){
                $("#20").css("display", "block");
                $("#40").css("display", "block");
                $("#60").css("display", "block");
                $("#80").css("display", "none");
                $("#100").css("display", "none");
            }else if(actualRating >= 80 && actualRating < 100){
                $("#20").css("display", "block");
                $("#40").css("display", "block");
                $("#60").css("display", "block");
                $("#80").css("display", "block");
                $("#100").css("display", "none");
            }else if(actualRating >= 100){
                $("#20").css("display", "block");
                $("#40").css("display", "block");
                $("#60").css("display", "block");
                $("#80").css("display", "block");
                $("#100").css("display", "block");
            }
        }
    });
}

function submitRatingReview(x){
    // $(x).css("display", "none");
    // $(".rating-bar").css("display", "none");
    // alert("here");
    $("#love").attr("src", "./img/Additional_icons/liked.png");
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const productid = urlParams.get('productid');
    $.get("http://147.139.168.202:8080/ratingScore.jsp?productNo=" + productid + "&ratingScore=100" /*+ $("#rating-slide-bar").val()*/, function(data, status){
        datas = JSON.parse(data);
        if(datas.goodsId != ""){
            swal.fire("Terima Kasih", "atas LIKE/LOVE Anda", "info");
        }
    });
}

function reassureCustomerOfTheirRequest(){
    if($("#option-city").val().toUpperCase() != "DKI JAKARTA"
        || $("#option-city").val().toUpperCase() != "JAKARTA"
        || $("#option-city").val().toUpperCase() != "JAKARTA UTARA"
        || $("#option-city").val().toUpperCase() != "JAKARTA BARAT"
        || $("#option-city").val().toUpperCase() != "JAKARTA TIMUR"
        || $("#option-city").val().toUpperCase() != "JAKARTA SELATAN"
        || $("#option-city").val().toUpperCase() != "BOGOR"
        || $("#option-city").val().toUpperCase() != "DEPOK"
        || $("#option-city").val().toUpperCase() != "TANGERANG"
        || $("#option-city").val().toUpperCase() != "BEKASI"
        || $("#option-city").val().toUpperCase() != "GADING SERPONG"
        || $("#option-city").val().toUpperCase() != "BSD"
    ){
        Swal.mixin({
            input: 'select',
            inputOptions: {
                yes: 'Yes | Pasti',
                no: 'No | Tidak Yakin'
            },
            confirmButtonText: 'Next &rarr;',
            showCancelButton: true,
            progressSteps: ['1', '2', '3']
          }).queue([
            {
                title: 'Confirm Your Shipping Address',
                text: 'Pastikan Anda memahami bahwa nama kota yang Anda sebutkan, akan dikenakan biaya pengiriman'
            },
            {
                title: 'Confirm Your Shipping Address',
                text: 'Pastikan alamat Anda sudah benar'
            },
            {
                title: 'Confirm Your Shipping Address',
                text: 'Pastikan informasi yang diberikan Anda sudah benar'
            }
          ]).then((result) => {
            if (result.value) {
                const answers = result.value;
                var i = 0;
                for(i; i < answers.length; i++){
                    if(answers[i] == "no"){
                        const answers = JSON.stringify(result.value)
                        Swal.fire({
                            title: 'Please answer all YES to make purchase order | Tolong jawab semua PASTI untuk melakukan pembelian',
                            html: `
                            Your answers:
                            <pre><code>${answers}</code></pre>
                            `,
                            confirmButtonText: 'Rethink | Berfikir Ulang'
                        })
                        return false;
                    }else{
                        return true;
                    }
                }
            }
        })
    }
}

async function confirmedPurchaseGroupBuy(){
    if(true){
        var addressSelection = $("#address-selection").children("option:selected").val();
        if ((addressSelection == "TO SAVED ADDRESS") || ((addressSelection != "TO SAVED ADDRESS") && 
        // ($(".option-province").children("option:selected").val() != "-- select your province here --") && 
        // ($("#option-city").val().length != 0) &&
        // ($("#zipcode").val().length > 0) &&
        ($("#street").val().length > 0))){
            let timerInterval
            Swal.fire({
            title: 'LOADING',
            html: 'Pembelian dalam process',
            timer: 5500,
            timerProgressBar: true,
            didOpen: () => {
                Swal.showLoading()
                timerInterval = setInterval(() => {
                const content = Swal.getContent()
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
            }).then((result) => {});

            const queryString = window.location.search;
            const urlParams = new URLSearchParams(queryString);
            const product = urlParams.get('productid');
            getProductsWithProductNo("", "", product).done(function (response) {
                getGroupBuyQuantitySoFarGross(response.Product_Code).done(function (response) {
                    var quantitySoFAR = 0;
                    if(response.Total_Quantity != null){
                        quantitySoFAR = response.Total_Quantity;
                    }
                    if($(".quantity-express-buy").val() > 0 && $(".quantity-express-buy").val() <= parseInt($("#group-purchase-quantity-target").html()) - parseInt(quantitySoFAR)){
                        // swal.fire("Mohon Maaf", "Ada ora", "warning");
                        requestToFinish();
                        var modal = document.getElementById("modal-group-purchase");
                        modal.style.display = "none";
                        // $.get(`http://147.139.168.202:8080/groupCodeInsert.jsp?customerId=${localStorage.getItem("token")}&groupCode=${$("#product-id").val()}&quantity=${$(".quantity-express-buy").val()}`, async function(data, status){
                        //     datas = JSON.parse(data);
                        //     
                        //     var modal = document.getElementById("modal-group-purchase");
                        //     modal.style.display = "none";
                        // });
                        // setTimeout(() => {location.reload();}, 10000);
                    }else{
                        if($(".quantity-express-buy").val() > parseInt($("#group-purchase-quantity-target").html()) - parseInt(quantitySoFAR)){
                            if(parseInt($("#group-purchase-quantity-target").html()) - parseInt(quantitySoFAR) < 0){
                                $(".quantity-express-buy").val(1);
                            }else{
                                $(".quantity-express-buy").val(parseInt($("#group-purchase-quantity-target").html()) - parseInt(quantitySoFAR));
                            }
                        }else{
                            $(".quantity-express-buy").val(1);
                        }
                        if($(".quantity-express-buy").val() > parseInt($("#group-purchase-quantity-target").html()) - parseInt(quantitySoFAR)){
                            swal.fire("Mohon Maaf", "Ada orang di depan kamu yang lebih dahulu mengirimkan purchase order kepada kami", "warning");
                        }else if($(".quantity-express-buy").val() == parseInt($("#group-purchase-quantity-target").html()) - parseInt(quantitySoFAR)){
                            swal.fire("Mohon Maaf", "Ada orang di depan kamu yang lebih dahulu mengirimkan purchase order kepada kami", "warning");
                        }else{
                            swal.fire("Kuantitas yang Anda masukan melebihi kuantitas tersedia atau kuantitas yang Anda masukan adalah di bawah 0", "Kuantitas yang tersedia adalah " + parseInt($("#group-purchase-quantity-target").html()) - parseInt(quantitySoFAR), "warning");
                        }
                    }
                });
            });
        }else{
            swal.fire("Tolong isikan alamat pengiriman Anda secara lengkap dan benar", "", "warning");
        }
    }
}

function copylink() {
    var copyText = document.getElementById("group-code");
    copyText.select();
    copyText.setSelectionRange(0, 99999)
    document.execCommand("copy");
}

function shareAttribute(groupCode){
    $(".share-target").attr("href", "https://api.whatsapp.com/send?text=Download ya APP-nya, buat online shopping sekarang > bit.ly/3tga9eI, plus beli >> " + $("#main-name").html() + " << barengan aku dengan menggunakan Code: " + groupCode + " supaya dapat diskon murah!");
}

function checkRatingValue(x){
    if(($(x).val()) < 20){
        $(x).val(20);
    }else if(($(x).val()) < 20){
        $(x).val(20);
    }else if(($(x).val()) > 20 && ($(x).val()) < 40){
        $(x).val(40);
    }else if(($(x).val()) > 40 && ($(x).val()) < 60){
        $(x).val(60);
    }else if(($(x).val()) > 60 && ($(x).val()) < 80){
        $(x).val(80);
    }else if(($(x).val()) > 80 && ($(x).val()) < 100){
        $(x).val(100);
    }
    $("#scoring").html($(x).val() + "%");
}

function addToCartDirectly(product){
    if(localStorage.getItem("itemsInCart") === null){
        getProductsWithProductNo("", "", product).done(function (response) {
            var productToBeAdded = {
                productNo: response.Product_Code,
                quantity: 1
            };
            var array = [];
            array.push(productToBeAdded);

            // saving to storage
            var productToBeAddedStringify = JSON.stringify(array);
            localStorage.setItem("itemsInCart", productToBeAddedStringify);
            

            // add total item in cart
            localStorage.setItem("totalItemInCart", array.length);
        });
    }else{
        var cartToJson = JSON.parse(localStorage.getItem("itemsInCart"));
        
        var i = 0;
        var indicator = 0;
        for(i; i < cartToJson.length; i ++){
            if(cartToJson[i].productNo == product){
                cartToJson[i].quantity = parseInt(cartToJson[i].quantity) + 1;
                indicator++;

                // saving to storage
                var productToBeAddedStringify = JSON.stringify(cartToJson);
                localStorage.setItem("itemsInCart", productToBeAddedStringify);
                
                break;
            }
        }
        if(indicator == 0){
            var productToBeAdded = {
                productNo: product,
                quantity: 1
            };
            cartToJson.push(productToBeAdded);

            // saving to storage
            var productToBeAddedStringify = JSON.stringify(cartToJson);
            localStorage.setItem("itemsInCart", productToBeAddedStringify);
            
        }
        // add total item in cart
        localStorage.setItem("totalItemInCart", cartToJson.length);
    }
    Swal.fire("Item Added", "have fun shopping!", "success");
}

function highlightSectionPrice(){
    $(".product-price").css("border-top", "3px solid limegreen");
    $(".product-price").css("border-bottom", "3px solid limegreen");
    $(".product-details").css("border-top", "0");
    $(".product-details").css("border-bottom", "0");
    $(".product-terms").css("border-top", "0");
    $(".product-terms").css("border-bottom", "0");
    $(".directory-explainator").removeClass("active");
    $("#price").toggleClass("active");

}

function highlightSectionDetails(){
    $(".product-price").css("border-top", "0");
    $(".product-price").css("border-bottom", "0");
    $(".product-details").css("border-top", "3px solid limegreen");
    $(".product-details").css("border-bottom", "3px solid limegreen");
    $(".product-terms").css("border-top", "0");
    $(".product-terms").css("border-bottom", "0");
    $(".directory-explainator").removeClass("active");
    $("#details").toggleClass("active");
}

function highlightSectionTerms(){
    $(".product-price").css("border-top", "0");
    $(".product-price").css("border-bottom", "0");
    $(".product-details").css("border-top", "0");
    $(".product-details").css("border-bottom", "0");
    $(".product-terms").css("border-top", "3px solid limegreen");
    $(".product-terms").css("border-bottom", "3px solid limegreen");
    $(".directory-explainator").removeClass("active");
    $("#terms").toggleClass("active");
}

async function generateGroupBuy(x){
    var token = localStorage.getItem("token");
    
    $(".generate-group-buy-button").css("transform", "rotateY(360deg)");
    if(token == ""){
        Swal.fire({
            icon: 'warning',
            title: 'Oops...',
            text: 'Join sekarang, untuk bisa melakukan Group Buy dan dapatkan discount besar',
            footer: '<a href=\'./sign-in.html\'>SIGN-UP/SIGN-IN</a>'
         })
    }else{
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const product = urlParams.get('productid');
        get_upaid_order_from_product_code_and_customer_code(localStorage.getItem("token"), product).done(function (response) {
            if(!response){
                Swal.fire({
                    icon: 'warning',
                    title: 'Oops...',
                    text: 'Anda memiliki order belum terbayar untuk product ini, silahkan melakukan pembayaran segera',
                    footer: ''
                 })
            }else{
                // Get the modal
                var modal = document.getElementById("modal-group-purchase");
                modal.style.display = "block";
            }
        });
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

function addToCartDirectlyFromProductDetails(){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const product = urlParams.get('productid');
    if(localStorage.getItem("itemsInCart") === null){
        var productToBeAdded = {
            productNo: product,
            quantity: 1
        };
        var array = [];
        array.push(productToBeAdded);

        // saving to storage
        var productToBeAddedStringify = JSON.stringify(array);
        localStorage.setItem("itemsInCart", productToBeAddedStringify);
        

        // add total item in cart
        localStorage.setItem("totalItemInCart", array.length);
    }else{
        var cartToJson = JSON.parse(localStorage.getItem("itemsInCart"));
        
        var i = 0;
        var indicator = 0;
        for(i; i < cartToJson.length; i ++){
            if(cartToJson[i].productNo == product){
                cartToJson[i].quantity = parseInt(cartToJson[i].quantity) + 1;
                indicator++;
            
                // saving to storage
                var productToBeAddedStringify = JSON.stringify(cartToJson);
                localStorage.setItem("itemsInCart", productToBeAddedStringify);
                
                break;
            }
        }
        if(indicator == 0){
            var productToBeAdded = {
                productNo: product,
                quantity: 1
            };
            cartToJson.push(productToBeAdded);
    
            // saving to storage
            var productToBeAddedStringify = JSON.stringify(cartToJson);
            localStorage.setItem("itemsInCart", productToBeAddedStringify);
            
        }
        // add total item in cart
        localStorage.setItem("totalItemInCart", cartToJson.length);
    }
    Swal.fire("Item Added", "have fun shopping!", "success");
}
