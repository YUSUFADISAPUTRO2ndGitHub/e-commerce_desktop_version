
var allProducts = [];
var copyOfAllCustomersDetailFromAccurateBasedOnPagination = [];
var allPaymentTerms = [];

var copyOfAllCustomersDetailFromAccurate = [];
var getCustomerDetails = {};

function getToken(){
    var settings = {
        "url": "http://147.139.168.202:8888/get-lastest-token-and-session",
        "method": "POST",
        "timeout": 10000,
    };
      
    return $.ajax(settings);
}

function getProfile(Customer_Code){
    var settings = {
        "url": `http://customers.sold.co.id/get-customer-information?Customer_Code=${Customer_Code}`,
        "method": "POST",
        "timeout": 0,
    };
    return $.ajax(settings);
}

function getUnpaidOrderPerProduct(Product_Code, Customer_Code){
    var settings = {
        "url": `http://sales.sold.co.id/get-unpaid-group-buy-sales-order-per-customer?Group_Buy_Purchase_PC=${Product_Code}&Customer_Code=${Customer_Code}`,
        "method": "POST",
        "timeout": 0,
    };
    return $.ajax(settings);
}

function getCustomersWithCustomerNo(customerNo){
    var settings = {
        "url": `http://customers.sold.co.id/get-customer-information?Customer_Code=${customerNo}`,
        "method": "POST",
        "timeout": 0,
    };
    
    return $.ajax(settings);
}

function getAvailableReferralCodes(){
    var settings = {
        "url": `http://customers.sold.co.id/get-available-referral-codes`,
        "method": "POST",
        "timeout": 0,
    };
    
    return $.ajax(settings);
}

function loginRequestAPI(Email, Password){
    var settings = {
        "url": `http://customers.sold.co.id/customer-login-request?Email=${Email}&Password=${Password}`,
        "method": "POST",
        "timeout": 0,
    };
    
    return $.ajax(settings);
}

function createCustomerNo(){
    var settings = {
        "url": `http://customers.sold.co.id/get-customer-code`,
        "method": "POST",
        "timeout": 0,
    };
    
    return $.ajax(settings);
}

function createNewCustomer(access_token, session_id, data){
    var settings = {
        "url": "http://customers.sold.co.id/create-new-customer-direct-from-user",
        "method": "POST",
        "timeout": 0,
        "headers": {
          "Content-Type": "application/json"
        },
        "data": JSON.stringify(data),
    };
    return $.ajax(settings);
}

function createNewCustomerSupplier(access_token, session_id, data){
    var settings = {
        "url": "http://customers.sold.co.id/create-new-customer-supplier-direct-from-user",
        "method": "POST",
        "timeout": 0,
        "headers": {
          "Content-Type": "application/json"
        },
        "data": JSON.stringify(data),
    };
    return $.ajax(settings);
}

function updateCustomer(data){
    var settings = {
        "url": "http://customers.sold.co.id/update-customer-data-by-user-themselves",
        "method": "POST",
        "timeout": 10000,
        "headers": {
          "Content-Type": "application/json"
        },
        "data": JSON.stringify(data),
    };
    return $.ajax(settings);
}

// products

function get_upaid_order_from_product_code_and_customer_code(access_token, Product_Code){
    var settings = {
        "url": "http://products.sold.co.id/get-unpaid-sales-order-specific-for-a-product?Product_Code=" + Product_Code + "&Customer_Code=" + access_token,
        "method": "POST",
        "timeout": 0,
    };
    return $.ajax(settings);
}

function getAllProductsWithoutPagination(access_token, session_id){
    var settings = {
        "url": `http://products.sold.co.id/get-product-details?`,
        "method": "POST",
        "timeout": 0,
    };
    
    return $.ajax(settings);
}

function getAllProductsBasedOnSubCategory(subcategory){
    var settings = {
        "url": `http://products.sold.co.id/get-product-details?subcategory=${subcategory}`,
        "method": "POST",
        "timeout": 0,
    };
    
    return $.ajax(settings);
}
function getAllProductsWithoutPaginationWithFilter(access_token, session_id, sortBy, sortDirection, itemName){
    var settings = {
        "url": `http://products.sold.co.id/get-product-details?product_name=${itemName}`,
        "method": "POST",
        "timeout": 0,
    };
    
    return $.ajax(settings);
}

function getAllProductsInGroupBuy(access_token, session_id){
    var settings = {
        "url": `http://products.sold.co.id/get-product-details?GroupBuy_Purchase=true`,
        "method": "POST",
        "timeout": 0,
    };
    
    return $.ajax(settings);
}

function getAllProductsInNew(access_token, session_id){
    var settings = {
        "url": `http://products.sold.co.id/get-product-details?Categorize_NEW=true`,
        "method": "POST",
        "timeout": 0,
    };
    
    return $.ajax(settings);
}

function getProductsWithProductNo(access_token, session_id, productNo){
    var settings = {
        "url": `http://products.sold.co.id/get-product-details?product_code=${productNo}`,
        "method": "POST",
        "timeout": 0,
    };
    
    return $.ajax(settings);
}

function getPaymentMethods(){
    var settings = {
        "url": `http://paymntmthd.sold.co.id/get-all-payment-method`,
        "method": "POST",
        "timeout": 0,
    };
    
    return $.ajax(settings);
}

function getAllUnpaidOrdersForThisCustomer(Customer_Code, Order_Number){
    if(Order_Number == ""){
        var settings = {
            "url": `http://sales.sold.co.id/get-unpaid-sales-order-per-customer?Customer_Code=${Customer_Code}`,
            "method": "POST",
            "timeout": 0,
        };
    }else{
        var settings = {
            "url": `http://sales.sold.co.id/get-unpaid-sales-order-per-customer?Order_Number=${Order_Number}`,
            "method": "POST",
            "timeout": 0,
        };
    }
    return $.ajax(settings);
}
function getAllOrdersForThisCustomer(Customer_Code, Order_Number){
    if(Order_Number == ""){
        var settings = {
            "url": `http://sales.sold.co.id/get-sales-order-data-per-customer?Customer_Code=${Customer_Code}`,
            "method": "POST",
            "timeout": 0,
        };
    }else{
        var settings = {
            "url": `http://sales.sold.co.id/get-sales-order-data-per-customer?Order_Number=${Order_Number}`,
            "method": "POST",
            "timeout": 0,
        };
    }
    
    return $.ajax(settings);
}
function createNewSalesOrder(items, customerDetails){
    var settings = {
        "url": "http://sales.sold.co.id/create-new-sales-order-by-customer?Customer_Code=" + customerDetails.Customer_Code,
        "method": "POST",
        "timeout": 0,
        "headers": {
          "Content-Type": "application/json"
        },
        "data": JSON.stringify({
          "Sales_Order_Data": customerDetails,
          "Sales_Order_Detail_data": items
        }),
    };
    console.log(settings);
    return $.ajax(settings);
}

function createNewSalesOrderWithGroupBuy(items, customerDetails){
    var settings = {
        "url": "http://sales.sold.co.id/create-new-group-buy-sales-order-by-customer?Customer_Code=" + customerDetails.Customer_Code,
        "method": "POST",
        "timeout": 0,
        "headers": {
          "Content-Type": "application/json"
        },
        "data": JSON.stringify({
          "Sales_Order_Data": customerDetails,
          "Sales_Order_Detail_data": items
        }),
    };
    console.log(settings);
    return $.ajax(settings);
}

function createNewTempSalesOrder(items, customerDetails){
    var settings = {
        "url": "http://sales.sold.co.id/save-temp-order-details-from-customer?customerNo=" + customerDetails.customerNo + "&address=" + customerDetails.address + "&paymentTermName=" + customerDetails.paymentTermName + "&transDate=" + customerDetails.transDate + "",
        "method": "POST",
        "timeout": 10000,
        "headers": {
          "Content-Type": "application/json"
        },
        "data": JSON.stringify(items),
      };
    console.log(customerDetails.paymentTermName);
    console.log(items);
    
    return $.ajax(settings);
}

function cancelSalesOrder(Order_Number){
    var settings = {
        "url": "http://sales.sold.co.id/update-sales-order-payment-status-to-cancelled?Order_Number=" + Order_Number,
        "method": "POST",
        "timeout": 10000,
        "headers": {
          "Content-Type": "application/json"
        }
      };
    
    return $.ajax(settings);
}

function getGroupBuyQuantitySoFarGross(product_code){
    var settings = {
        "url": "http://sales.sold.co.id/check-group-buy-quantity-so-far-gross?Group_Buy_Purchase_PC=" + product_code,
        "method": "POST",
        "timeout": 0,
    };
    
    return $.ajax(settings);
}

function closeGroupBuyStatusOnProduct(product_code){
    var settings = {
        "url": "http://sales.sold.co.id/check-group-buy-quantity-so-far-gross?Product_Code=" + product_code,
        "method": "POST",
        "timeout": 0,
    };
    
    return $.ajax(settings);
}

function getAllCategories(access_token, session_id){
    var settings = {
        "url": `http://products.sold.co.id/get-product-details?Get_ALL_Category=true`,
        "method": "POST",
        "timeout": 0,
    };
    
    return $.ajax(settings);
}

function getAllSubCategories(Get_ALL_Sub_Category_Based_On_Category){
    var settings = {
        "url": `http://products.sold.co.id/get-product-details?Get_ALL_Sub_Category_Based_On_Category=${Get_ALL_Sub_Category_Based_On_Category}`,
        "method": "POST",
        "timeout": 0,
    };
    
    return $.ajax(settings);
}

function getforgotpasswordrequest(Email, Birthday, PrimaryContactNumber, requestedNewPassword){
    var settings = {
        "url": "http://customers.sold.co.id/customer-forgot-password-request?Email=" + Email + "&Birthday=" + Birthday + "&PrimaryContactNumber=" + PrimaryContactNumber + "&requestedNewPassword=" + requestedNewPassword,
        "method": "POST",
        "timeout": 10000,
    };
    
    return $.ajax(settings);
}
function encryptPassword(Password){
    var settings = {
        "url": "http://customers.sold.co.id/password-generator?Password=" + Password,
        "method": "POST",
        "timeout": 10000,
    };
    
    return $.ajax(settings);
}