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
    loadCheckoutFinalConfirmationTable("COD");
    listPaymentMethods();
});

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
    }else if(condition == "COD"){
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
                        $("#final_checkout_row_" + i).append("<td id=\"final_checkout_price_" + response.Sell_Price * itemsToCheckout[i].quantity + "\">" + itemsToCheckout[i].priceAgreed + "</td>");
                    }
                }
            });
        }
    }else{
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
    if(paymentSelection == "PERIOD" ){
        periodSelection = $("#period-selection").children("option:selected").val();
        if(periodSelection == "30 Days"){
            periodSelection = 30;
        }else{
            periodSelection = 60;
        }
    }
    getCustomersWithCustomerNo(localStorage.getItem("token")).done(function (response) {
        request = {
            customerId: localStorage.getItem("token"),
            paymentMethod: paymentSelection,
            paymentMethodDetailes: periodSelection,
            address: $("#sub-saved-address").children("option:selected").val(),
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
            setTimeout(function(){ clearStorage(); }, 3000);
        }else{
            setTimeout(function(){sendFinalRequestToEnquiryAndEnquiryDetailsWithoutGroupBuyAndVA(request);}, 2000);
            setTimeout(function(){ clearStorage(); }, 3000);
        }
    });
}

async function sendRequestFinal(paymentSelection){
    var itemsToCheckout = JSON.parse(localStorage.getItem("itemsToCheckout"));
    console.log("itemsToCheckout " + localStorage.getItem("itemsToCheckout"));
    var i = 0;
    for(i; i < itemsToCheckout.length; i ++){
        getProductsWithProductNo("", "", itemsToCheckout[i].productNo).done(function (response) {
                var object = {};
                var itemsToCheckout = JSON.parse(localStorage.getItem("itemsToCheckout"));
                if(localStorage.getItem("finalStep") === null){
                    var requestArrayForItemsToCheckout = [];
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
                            requestArrayForItemsToCheckout.push(object);
                            break;
                        }
                    }
                    var productToBeAddedStringify = JSON.stringify(requestArrayForItemsToCheckout);
                    localStorage.setItem("finalStep", productToBeAddedStringify);
                }else{
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
        });
    }
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
            setTimeout(() => { clearStorage(); }, 3000);
        }
    });
}

function truncateCart(){
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
}

function redirectToCart(){
    window.location.href = "./cart.html";
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
    createNewSalesOrder(item_bought, customer_information).done(async function (response) {
        if(response.status == true){
            swal.fire("Order sudah dikirimkan", "","success");
        }else{
            console.log(response);
            swal.fire("Order gagal dikirimkan", "","warning");
        }
        truncateCart();
        await setTimeout(() => { clearStorage(); }, 2000);
        await setTimeout(() => {window.location.href = "./home.html";}, 3000);
    });
}

async function sendFinalRequestToEnquiryAndEnquiryDetailsWithoutGroupBuyAndVA(request){
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
    // if(orderArr[0].paymentMethod == "BCA TRANSFER"){
    //     orderArr[0].paymentMethod = "transfer";
    // }
    await reorderJSON(orderArr[0], productArr).then(async value => {
        return await value;
    });
    console.log(customer_information);
    console.log(item_bought);
    createNewSalesOrder(item_bought, customer_information).done(async function (response) {
        if(response.status == true){
            swal.fire("Order sudah dikirimkan", "","success");
        }else{
            swal.fire("Order gagal dikirimkan", "","warning");
        }
        truncateCart();
        await setTimeout(() => { clearStorage(); }, 2000);
        await setTimeout(() => {window.location.href = "./home.html";}, 3000);
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
    createNewSalesOrder(item_bought, customer_information).done(async function (response) {
        if(response.status == true){
            swal.fire("Order sudah dikirimkan", "","success");
        }else{
            swal.fire("Order gagal dikirimkan", "","warning");
        }
        truncateCart();
        await setTimeout(() => { clearStorage(); }, 2000);
    });
}

var customer_information = {};
var item_bought = [];

async function reorderJSON(customerDetails, productArr){
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
        }else{
            swal.fire("Salah satu item kamu tidak mempunyai harga, pesanan untuk barang tersebut tidak bisa diproses (item : " + productArr[i].productCode + ")", "barang-barang lain tetap dapat diproses","warning");
        }
    }
    customer_information = {};
    return new Promise(async resolve => {
        await getCustomersWithCustomerNo(localStorage.getItem("token")).done(function (response) {
            if(response != false){
                resolve(customer_information = {
                    Customer_Code: customerDetails.customerId,
                    Total_Price: total_price,
                    Total_Quantity: total_quantity,
                    Unit: "pcs",
                    Shipping_Address: customerDetails.address,
                    Shipping_Contact_Number: response.Contact_Number_1,
                    Payment_Method: customerDetails.paymentMethod,
                    Shipping_Fee: "0",
                    Primary_Recipient_Name: response.First_Name + " " + response.Last_Name
                });
            }
        });
    });
}

function saveExpressOrderId(orderid){
    localStorage.setItem("ExpressOrderId", orderid);
}