function subMenuIconClicked(x) {
    x.classList.toggle("change");
    console.log(document.getElementById("myDropdown").classList);
    if (document.getElementById("myDropdown").classList.contains('show')) {
        document.getElementById("myDropdown").classList.remove('show');
    }else{
        document.getElementById("myDropdown").classList.toggle("show");
    }
}

function homeIconClicked(x) {
    if (document.getElementById("icon-login").classList.contains("change-login-icon")) {
        document.getElementById("icon-login").classList.remove("change-login-icon");
    }
    if (document.getElementById("icon-cart").classList.contains("change-cart-icon")) {
        document.getElementById("icon-cart").classList.remove("change-cart-icon");
    }
    if (document.getElementById("icon-home").classList.contains("change-home-icon")) {
        document.getElementById("icon-home").classList.remove("change-home-icon");
    }
    if (document.getElementById("icon-order-status").classList.contains("change-pintu-icon")) {
        document.getElementById("icon-order-status").classList.remove("change-pintu-icon");
    }
    x.classList.toggle("change-home-icon");

    if(document.getElementById("mainMenuIframe").style.display == "block" 
    && document.getElementById("loginIframe").style.display == "none" 
    && document.getElementById("cartIframe").style.display == "none"
    && document.getElementById("categoryIframe").style.display == "none"
    && document.getElementById("orderStatusIframe").style.display == "none"
    && document.getElementById("searchIframe").style.display == "none"
    && document.getElementById("contactUsIframe").style.display == "none"
    && document.getElementById("brandIframe").style.display == "none"
    ){
        document.getElementById("mainMenuIframe").style.display = "block";
        document.getElementById("loginIframe").style.display = "none";
        document.getElementById("cartIframe").style.display = "none";
        document.getElementById("categoryIframe").style.display = "none";
        document.getElementById("orderStatusIframe").style.display = "none";
        document.getElementById("searchIframe").style.display = "none";
        document.getElementById("contactUsIframe").style.display = "none";
        document.getElementById("brandIframe").style.display = "none";
    }else{
        document.getElementById("mainMenuIframe").style.display = "block";
        document.getElementById("loginIframe").style.display = "none";
        document.getElementById("cartIframe").style.display = "none";
        document.getElementById("categoryIframe").style.display = "none";
        document.getElementById("orderStatusIframe").style.display = "none";
        document.getElementById("searchIframe").style.display = "none";
        document.getElementById("contactUsIframe").style.display = "none";
        document.getElementById("brandIframe").style.display = "none";
    }
}

function loginIconClicked(x) {
    if (document.getElementById("icon-login").classList.contains("change-login-icon")) {
        document.getElementById("icon-login").classList.remove("change-login-icon");
    }
    if (document.getElementById("icon-cart").classList.contains("change-cart-icon")) {
        document.getElementById("icon-cart").classList.remove("change-cart-icon");
    }
    if (document.getElementById("icon-home").classList.contains("change-home-icon")) {
        document.getElementById("icon-home").classList.remove("change-home-icon");
    }
    if (document.getElementById("icon-order-status").classList.contains("change-pintu-icon")) {
        document.getElementById("icon-order-status").classList.remove("change-pintu-icon");
    }
    x.classList.toggle("change-login-icon");

    if(document.getElementById("mainMenuIframe").style.display == "none" 
    && document.getElementById("loginIframe").style.display == "block" 
    && document.getElementById("cartIframe").style.display == "none"
    && document.getElementById("categoryIframe").style.display == "none"
    && document.getElementById("orderStatusIframe").style.display == "none"
    && document.getElementById("searchIframe").style.display == "none"
    && document.getElementById("contactUsIframe").style.display == "none"
    && document.getElementById("brandIframe").style.display == "none"
    ){
        document.getElementById("mainMenuIframe").style.display = "block";
        document.getElementById("loginIframe").style.display = "none";
        document.getElementById("cartIframe").style.display = "none";
        document.getElementById("categoryIframe").style.display = "none";
        document.getElementById("orderStatusIframe").style.display = "none";
        document.getElementById("searchIframe").style.display = "none";
        document.getElementById("contactUsIframe").style.display = "none";
        document.getElementById("brandIframe").style.display = "none";
    }else{
        document.getElementById("mainMenuIframe").style.display = "none";
        document.getElementById("loginIframe").style.display = "block";
        document.getElementById("cartIframe").style.display = "none";
        document.getElementById("categoryIframe").style.display = "none";
        document.getElementById("orderStatusIframe").style.display = "none";
        document.getElementById("searchIframe").style.display = "none";
        document.getElementById("contactUsIframe").style.display = "none";
        document.getElementById("brandIframe").style.display = "none";
    }
}

function cartIconClicked(x) {
    if (document.getElementById("icon-login").classList.contains("change-login-icon")) {
        document.getElementById("icon-login").classList.remove("change-login-icon");
    }
    if (document.getElementById("icon-cart").classList.contains("change-cart-icon")) {
        document.getElementById("icon-cart").classList.remove("change-cart-icon");
    }
    if (document.getElementById("icon-home").classList.contains("change-home-icon")) {
        document.getElementById("icon-home").classList.remove("change-home-icon");
    }
    if (document.getElementById("icon-order-status").classList.contains("change-pintu-icon")) {
        document.getElementById("icon-order-status").classList.remove("change-pintu-icon");
    }
    x.classList.toggle("change-cart-icon");
    // console.log(document.getElementById("icon-login").classList.contains("change-login-icon"));

    if(document.getElementById("mainMenuIframe").style.display == "none" 
    && document.getElementById("loginIframe").style.display == "none" 
    && document.getElementById("cartIframe").style.display == "block"
    && document.getElementById("categoryIframe").style.display == "none"
    && document.getElementById("orderStatusIframe").style.display == "none"
    && document.getElementById("searchIframe").style.display == "none"
    && document.getElementById("contactUsIframe").style.display == "none"
    && document.getElementById("brandIframe").style.display == "none"
    ){
        document.getElementById("mainMenuIframe").style.display = "block";
        document.getElementById("loginIframe").style.display = "none";
        document.getElementById("cartIframe").style.display = "none";
        document.getElementById("categoryIframe").style.display = "none";
        document.getElementById("orderStatusIframe").style.display = "none";
        document.getElementById("searchIframe").style.display = "none";
        document.getElementById("contactUsIframe").style.display = "none";
        document.getElementById("brandIframe").style.display = "none";
    }else{
        document.getElementById("mainMenuIframe").style.display = "none";
        document.getElementById("loginIframe").style.display = "none";
        document.getElementById("cartIframe").style.display = "block";
        document.getElementById("categoryIframe").style.display = "none";
        document.getElementById("orderStatusIframe").style.display = "none";
        document.getElementById("searchIframe").style.display = "none";
        document.getElementById("contactUsIframe").style.display = "none";
        document.getElementById("brandIframe").style.display = "none";
    }
}

function categoryClicked(x) {
    // console.log(document.getElementById("icon-login").classList.contains("change-login-icon"));
    if (document.getElementById("icon-login").classList.contains("change-login-icon")) {
        document.getElementById("icon-login").classList.remove("change-login-icon");
    }
    if (document.getElementById("icon-cart").classList.contains("change-cart-icon")) {
        document.getElementById("icon-cart").classList.remove("change-cart-icon");
    }
    if (document.getElementById("icon-home").classList.contains("change-home-icon")) {
        document.getElementById("icon-home").classList.remove("change-home-icon");
    }
    if (document.getElementById("icon-order-status").classList.contains("change-pintu-icon")) {
        document.getElementById("icon-order-status").classList.remove("change-pintu-icon");
    }

    if(document.getElementById("mainMenuIframe").style.display == "none" 
    && document.getElementById("loginIframe").style.display == "none" 
    && document.getElementById("cartIframe").style.display == "none"
    && document.getElementById("categoryIframe").style.display == "block"
    && document.getElementById("orderStatusIframe").style.display == "none"
    && document.getElementById("searchIframe").style.display == "none"
    && document.getElementById("contactUsIframe").style.display == "none"
    && document.getElementById("brandIframe").style.display == "none"
    ){
        document.getElementById("mainMenuIframe").style.display = "block";
        document.getElementById("loginIframe").style.display = "none";
        document.getElementById("cartIframe").style.display = "none";
        document.getElementById("categoryIframe").style.display = "none";
        document.getElementById("orderStatusIframe").style.display = "none";
        document.getElementById("searchIframe").style.display = "none";
        document.getElementById("contactUsIframe").style.display = "none";
        document.getElementById("brandIframe").style.display = "none";
    }else{
        document.getElementById("mainMenuIframe").style.display = "none";
        document.getElementById("loginIframe").style.display = "none";
        document.getElementById("cartIframe").style.display = "none";
        document.getElementById("categoryIframe").style.display = "block";
        document.getElementById("orderStatusIframe").style.display = "none";
        document.getElementById("searchIframe").style.display = "none";
        document.getElementById("contactUsIframe").style.display = "none";
        document.getElementById("brandIframe").style.display = "none";
    }
}

function ORDER_STATUS(x) {
    if (document.getElementById("icon-login").classList.contains("change-login-icon")) {
        document.getElementById("icon-login").classList.remove("change-login-icon");
    }
    if (document.getElementById("icon-cart").classList.contains("change-cart-icon")) {
        document.getElementById("icon-cart").classList.remove("change-cart-icon");
    }
    if (document.getElementById("icon-home").classList.contains("change-home-icon")) {
        document.getElementById("icon-home").classList.remove("change-home-icon");
    }
    if (document.getElementById("icon-order-status").classList.contains("change-pintu-icon")) {
        document.getElementById("icon-order-status").classList.remove("change-pintu-icon");
    }
    x.classList.toggle("change-pintu-icon");
    
    if(document.getElementById("mainMenuIframe").style.display == "none" 
    && document.getElementById("loginIframe").style.display == "none" 
    && document.getElementById("cartIframe").style.display == "none"
    && document.getElementById("categoryIframe").style.display == "none"
    && document.getElementById("orderStatusIframe").style.display == "block"
    && document.getElementById("searchIframe").style.display == "none"
    && document.getElementById("contactUsIframe").style.display == "none"
    && document.getElementById("brandIframe").style.display == "none"
    ){
        document.getElementById("mainMenuIframe").style.display = "block";
        document.getElementById("loginIframe").style.display = "none";
        document.getElementById("cartIframe").style.display = "none";
        document.getElementById("categoryIframe").style.display = "none";
        document.getElementById("orderStatusIframe").style.display = "none";
        document.getElementById("searchIframe").style.display = "none";
        document.getElementById("contactUsIframe").style.display = "none";
        document.getElementById("brandIframe").style.display = "none";
    }else{
        document.getElementById("mainMenuIframe").style.display = "none";
        document.getElementById("loginIframe").style.display = "none";
        document.getElementById("cartIframe").style.display = "none";
        document.getElementById("categoryIframe").style.display = "none";
        document.getElementById("orderStatusIframe").style.display = "block";
        document.getElementById("searchIframe").style.display = "none";
        document.getElementById("contactUsIframe").style.display = "none";
        document.getElementById("brandIframe").style.display = "none";
    }
}

function search_item(x) {
    if (document.getElementById("icon-login").classList.contains("change-login-icon")) {
        document.getElementById("icon-login").classList.remove("change-login-icon");
    }
    if (document.getElementById("icon-cart").classList.contains("change-cart-icon")) {
        document.getElementById("icon-cart").classList.remove("change-cart-icon");
    }
    if (document.getElementById("icon-home").classList.contains("change-home-icon")) {
        document.getElementById("icon-home").classList.remove("change-home-icon");
    }
    if (document.getElementById("icon-order-status").classList.contains("change-pintu-icon")) {
        document.getElementById("icon-order-status").classList.remove("change-pintu-icon");
    }
    
    if(document.getElementById("mainMenuIframe").style.display == "none" 
    && document.getElementById("loginIframe").style.display == "none" 
    && document.getElementById("cartIframe").style.display == "none"
    && document.getElementById("categoryIframe").style.display == "none"
    && document.getElementById("orderStatusIframe").style.display == "none"
    && document.getElementById("searchIframe").style.display == "block"
    && document.getElementById("contactUsIframe").style.display == "none"
    && document.getElementById("brandIframe").style.display == "none"
    ){
        document.getElementById("mainMenuIframe").style.display = "block";
        document.getElementById("loginIframe").style.display = "none";
        document.getElementById("cartIframe").style.display = "none";
        document.getElementById("categoryIframe").style.display = "none";
        document.getElementById("orderStatusIframe").style.display = "none";
        document.getElementById("searchIframe").style.display = "none";
        document.getElementById("contactUsIframe").style.display = "none";
        document.getElementById("brandIframe").style.display = "none";
    }else{
        document.getElementById("mainMenuIframe").style.display = "none";
        document.getElementById("loginIframe").style.display = "none";
        document.getElementById("cartIframe").style.display = "none";
        document.getElementById("categoryIframe").style.display = "none";
        document.getElementById("orderStatusIframe").style.display = "none";
        document.getElementById("searchIframe").style.display = "block";
        document.getElementById("contactUsIframe").style.display = "none";
        document.getElementById("brandIframe").style.display = "none";
    }
}

function contact_us(x) {
    if (document.getElementById("icon-login").classList.contains("change-login-icon")) {
        document.getElementById("icon-login").classList.remove("change-login-icon");
    }
    if (document.getElementById("icon-cart").classList.contains("change-cart-icon")) {
        document.getElementById("icon-cart").classList.remove("change-cart-icon");
    }
    if (document.getElementById("icon-home").classList.contains("change-home-icon")) {
        document.getElementById("icon-home").classList.remove("change-home-icon");
    }
    if (document.getElementById("icon-order-status").classList.contains("change-pintu-icon")) {
        document.getElementById("icon-order-status").classList.remove("change-pintu-icon");
    }
    
    if(document.getElementById("mainMenuIframe").style.display == "none" 
    && document.getElementById("loginIframe").style.display == "none" 
    && document.getElementById("cartIframe").style.display == "none"
    && document.getElementById("categoryIframe").style.display == "none"
    && document.getElementById("orderStatusIframe").style.display == "none"
    && document.getElementById("searchIframe").style.display == "none"
    && document.getElementById("contactUsIframe").style.display == "block"
    && document.getElementById("brandIframe").style.display == "none"
    ){
        document.getElementById("mainMenuIframe").style.display = "block";
        document.getElementById("loginIframe").style.display = "none";
        document.getElementById("cartIframe").style.display = "none";
        document.getElementById("categoryIframe").style.display = "none";
        document.getElementById("orderStatusIframe").style.display = "none";
        document.getElementById("searchIframe").style.display = "none";
        document.getElementById("contactUsIframe").style.display = "none";
        document.getElementById("brandIframe").style.display = "none";
    }else{
        document.getElementById("mainMenuIframe").style.display = "none";
        document.getElementById("loginIframe").style.display = "none";
        document.getElementById("cartIframe").style.display = "none";
        document.getElementById("categoryIframe").style.display = "none";
        document.getElementById("orderStatusIframe").style.display = "none";
        document.getElementById("searchIframe").style.display = "none";
        document.getElementById("contactUsIframe").style.display = "block";
        document.getElementById("brandIframe").style.display = "none";
    }
}

function brandClicked(x) {
    if (document.getElementById("icon-login").classList.contains("change-login-icon")) {
        document.getElementById("icon-login").classList.remove("change-login-icon");
    }
    if (document.getElementById("icon-cart").classList.contains("change-cart-icon")) {
        document.getElementById("icon-cart").classList.remove("change-cart-icon");
    }
    if (document.getElementById("icon-home").classList.contains("change-home-icon")) {
        document.getElementById("icon-home").classList.remove("change-home-icon");
    }
    if (document.getElementById("icon-order-status").classList.contains("change-pintu-icon")) {
        document.getElementById("icon-order-status").classList.remove("change-pintu-icon");
    }
    
    if(document.getElementById("mainMenuIframe").style.display == "none" 
    && document.getElementById("loginIframe").style.display == "none" 
    && document.getElementById("cartIframe").style.display == "none"
    && document.getElementById("categoryIframe").style.display == "none"
    && document.getElementById("orderStatusIframe").style.display == "none"
    && document.getElementById("searchIframe").style.display == "none"
    && document.getElementById("contactUsIframe").style.display == "none"
    && document.getElementById("brandIframe").style.display == "block"
    ){
        document.getElementById("mainMenuIframe").style.display = "block";
        document.getElementById("loginIframe").style.display = "none";
        document.getElementById("cartIframe").style.display = "none";
        document.getElementById("categoryIframe").style.display = "none";
        document.getElementById("orderStatusIframe").style.display = "none";
        document.getElementById("searchIframe").style.display = "none";
        document.getElementById("contactUsIframe").style.display = "none";
        document.getElementById("brandIframe").style.display = "none";
    }else{
        document.getElementById("mainMenuIframe").style.display = "none";
        document.getElementById("loginIframe").style.display = "none";
        document.getElementById("cartIframe").style.display = "none";
        document.getElementById("categoryIframe").style.display = "none";
        document.getElementById("orderStatusIframe").style.display = "none";
        document.getElementById("searchIframe").style.display = "none";
        document.getElementById("contactUsIframe").style.display = "none";
        document.getElementById("brandIframe").style.display = "block";
    }
}