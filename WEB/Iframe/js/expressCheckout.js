$(document).ready(async function(){
    getCustomersWithCustomerNo(localStorage.getItem("token")).done(async function (response) {
        console.log(response);
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
    });
});

async function addressOptionSelected(x){
    if($(x).children("option:selected").val() == "DELIVER TO NEW ADDRESS"){
        $("#address-selection-sub-saved-address").css("display", "none");
        $("#new-address-section").css("display", "block");
    }else{
        $("#address-selection-sub-saved-address").css("display", "block");
        $("#new-address-section").css("display", "none");
    }
}

async function requestToFinish(){
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
        return true;
    }else{
        // if(($(".option-province").children("option:selected").val() != "-- select your province here --") && 
        // ($("#option-city").val().length != 0) &&
        // ($("#zipcode").val().length > 0) &&
        // ($("#street").val().length > 0)){
        //     personalDetailsWithNewAddress(address);
        //     return true;
        // }else{
        //     alert("Please fill in the address properly");
        //     swal.fire("Please fill in the address properly", "", "warning");
        //     return false;
        // }
        personalDetailsWithNewAddress(address);
        return true;
    }
}

async function personalDetailsWithCurrentAddress(){
    loadingMessage(10000);
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
    getCustomersWithCustomerNo(localStorage.getItem("token")).done(async function (response) {
        request = {
            customerId: localStorage.getItem("token"),
            paymentMethod: paymentSelection,
            paymentMethodDetailes: periodSelection,
            address: $("#sub-saved-address").children("option:selected").val(),
            fullName: response.First_Name + " " + response.Last_Name,
            contactNumber: response.Contact_Number_1,
            email: response.Email,
            notes: "e-commerce pembelian express purchase (group buy) request",
            orderDate: date
        };
        console.log(request);
        $("#submitRequestFinalButton").toggle();
        $("#backtocartRequestFinalButton").toggle();
        await sendRequestFinal();
        await setTimeout(() => {sendFinalRequestToEnquiryAndEnquiryDetails(request);}, 5000);
        await setTimeout(() => { clearStorage(); }, 5500);
    });
}

async function personalDetailsWithNewAddress(address){
    loadingMessage(10000);
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
    getCustomersWithCustomerNo(localStorage.getItem("token")).done(async function (response) {
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
        await sendRequestFinal(paymentSelection);
        await setTimeout(() => {sendFinalRequestToEnquiryAndEnquiryDetails(request);}, 5000);
        await setTimeout(() => { clearStorage(); }, 5500);
    });
}

async function sendFinalRequestToEnquiryAndEnquiryDetails(request){
    loadingMessage(10000);
    var orderArr = JSON.stringify([request]);
    orderArr = JSON.parse(orderArr);
    var productArr = JSON.parse(localStorage.getItem("finalStep"));
    var i = 0;
    for(i; i < productArr.length; i ++){
        productArr[i].quantity = (productArr[i].quantity).toString();
        productArr[i].totalPrice = (productArr[i].totalPrice).toString();
    }
    console.log("productArr " + JSON.stringify(productArr[0]));
    console.log("orderArr " + JSON.stringify(orderArr[0]));
    await reorderJSON(orderArr[0], productArr).then(async value => {
        return await value;
    });
    console.log(customer_information);
    console.log(item_bought);
    createNewSalesOrderWithGroupBuy(item_bought, customer_information).done(async function (response) {
        if(response.status == true){
            Swal.fire("Tolong melakukan pembayar PALING LAMBAT 3 hari dari sekarang", "", "success");
        }else{
            swal.fire("Order gagal dikirimkan", "","warning");
        }
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
        await getCustomersWithCustomerNo(localStorage.getItem("token")).done(async function (response) {
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

async function saveExpressOrderId(orderid){
    localStorage.setItem("ExpressOrderId", orderid);
}

async function sendRequestFinal(){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const product = urlParams.get('productid');
    getProductsWithProductNo("", "", product).done(async function (response) {
        if(response == false ){
            Swal.fire("TRANSACTION FAILED TO PROCESS", "", "error");
        }
        var object = {};
        var requestArrayForItemsToCheckout = [];
        if(response.Product_Code == $("#product-id").val()){
            var deliveryFee = 0;
            object = {
                name: response.Name,
                productCode: response.Product_Code,
                quantity: $(".quantity-express-buy").val(),
                pricePerItem: response.GroupBuy_SellPrice,
                notes: "e-commerce penjualan express purchase (group buy) request Accurate",
                totalPrice: ($(".quantity-express-buy").val() * response.GroupBuy_SellPrice) + deliveryFee,
                GroupCode: product
            };
            requestArrayForItemsToCheckout.push(object);
        }
        var productToBeAddedStringify = JSON.stringify(requestArrayForItemsToCheckout);
        localStorage.setItem("finalStep", productToBeAddedStringify);
        console.log(localStorage.getItem("finalStep"));
    });
}

async function clearStorage(){
    var requestArrayForItemsToCheckout = [];
    var productToBeAddedStringify = JSON.stringify(requestArrayForItemsToCheckout);
    localStorage.setItem("itemsToCheckout", productToBeAddedStringify);
    var requestArrayForItemsToCheckout = [];
    var productToBeAddedStringify = JSON.stringify(requestArrayForItemsToCheckout);
    localStorage.setItem("finalStep", productToBeAddedStringify);
}

async function test(){
    alert("happy")
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