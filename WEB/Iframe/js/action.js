// function detail_product_requested(x) {
//     $(".result").empty();
//     $("body").css("background-color", "darkgrey");
//     if($('.hide-function').css('display') == 'none'){
//         $('.hide-function').toggle();
//     }
//     $.get("http://147.139.168.202:8080/AjaxSearchDetails.jsp?keyword=" + x.id, function(data, status){
//         var product = [];
//         product = (data).split("@---@");
//         $(".result").append("<div class=\"slideshow-container\"></div>");
//         $(".slideshow-container").append("<div class=\"mySlides " + product[2] + "\"></div>");
//         $("." + product[2]).append("<img class=\"product-image\" src=" + product[1] + ">");

//         $(".slideshow-container").append("<div class=\"mySlides " + product[2] + "123\"></div>");
//         $("." + product[2] + "123").append("<img class=\"product-image\" src=\"../www/img/gun.png\">");

//         $(".slideshow-container").append("<a class=\"prev\" onclick=\"plusSlides(-1)\">PREV <</a>");
//         $(".slideshow-container").append("<a class=\"next\" onclick=\"plusSlides(1)\">> NEXT</a>");
//         $(".result").append("<br>");
        
//         // $(".result").append("<img class=\"product-image\" src=" + product[1] + ">");
//         $(".result").append("<div>PRODUCT NAME : <div class=\"input-login-text\" >" + product[0].replace('[','') + "</div> </div>");
//         $(".result").append("<br>");
//         $(".result").append("<div>COD PRICE : <div class=\"input-login-text\" >" + product[3] + "</div> </div>");
//         $(".result").append("<div>PERIOD PRICE : <div class=\"input-login-text\" >" + product[4] + "</div> </div>");
//         $(".result").append("<div>DETAILS : <div class=\"input-login-text\" >" + product[5].replace(']','') + "</div> </div>");
//         $(".result").append("<br>");
//         $(".result").append("<input class=\"button-for-product-details\" type=\"submit\" value=\"ADD TO CART\" id=\""+ product[2] + "\" onclick=\"add_to_cart(this)\">");
//         showSlides(0);
//     });
// }

function detail_product_requested(x) {
    $("table").empty();
    if($('.hide-function').css('display') == 'none'){
        $('.hide-function').toggle();
    }
    $.get("http://147.139.168.202:8080/AjaxSearchDetails.jsp?keyword=" + x.id, function(data, status){
        var product = [];
        product = (data).split("@---@");
        $("table").append("<div class=\"card\" style=\"width: 100%;\">");
        $(".card").append("<div id=\"carouselExampleControls\" class=\"carousel slide\" data-bs-ride=\"carousel\">");
        $("#carouselExampleControls").append("<div class=\"carousel-inner\">");
        $(".carousel-inner").append("<div class=\"carousel-item active " + product[2] + "\">");
        $("." + product[2]).append("<img src="+ product[1] +" class=\"d-block w-100\">");

        $(".carousel-inner").append("<div class=\"carousel-item " + product[2] + "123\">");
        $("." + product[2] + "123").append("<img src=\"../www/img/gun.png\" class=\"d-block w-100\">");

        $("#carouselExampleControls").append("<a class=\"carousel-control-prev\" href=\"#carouselExampleControls\" role=\"button\" data-bs-slide=\"prev\">");
        $(".carousel-control-prev").append("<span class=\"carousel-control-prev-icon\" aria-hidden=\"true\"></span>");
        $(".carousel-control-prev").append("<span class=\"visually-hidden\">Previous</span>");

        $("#carouselExampleControls").append("<a class=\"carousel-control-next\" href=\"#carouselExampleControls\" role=\"button\" data-bs-slide=\"next\">");
        $(".carousel-control-next").append("<span class=\"carousel-control-next-icon\" aria-hidden=\"true\"></span>");
        $(".carousel-control-next").append("<span class=\"visually-hidden\">Next</span>");

        $(".card").append("<div class=\"card-body\">");
        $(".card-body").append("<h5 class=\"card-title\">" + product[0].replace('[','') + "</h5>");
        $(".card-body").append("<div class=\"card-text\"></div>");

    


        $(".card-text").append("<br>");
        $(".card-text").append("<div>COD PRICE : <div class=\"input-login-text\" >" + product[3] + "</div> </div>");
        $(".card-text").append("<div>PERIOD PRICE : <div class=\"input-login-text\" >" + product[4] + "</div> </div>");
        $(".card-text").append("<div>DETAILS : <div class=\"input-login-text\" >" + product[5].replace(']','') + "</div> </div>");
        $(".card-text").append("<br>");
        $(".card-text").append("<input class=\"btn btn-primary force-center\" type=\"submit\" value=\"ADD TO CART\" id=\""+ product[2] + "\" onclick=\"add_to_cart(this)\">");
        
        // // $(".result").append("<img class=\"product-image\" src=" + product[1] + ">");
        // $("table").append("<div>PRODUCT NAME : <div class=\"input-login-text\" >" + product[0].replace('[','') + "</div> </div>");
        // $("table").append("<br>");
        // $("table").append("<div>COD PRICE : <div class=\"input-login-text\" >" + product[3] + "</div> </div>");
        // $("table").append("<div>PERIOD PRICE : <div class=\"input-login-text\" >" + product[4] + "</div> </div>");
        // $("table").append("<div>DETAILS : <div class=\"input-login-text\" >" + product[5].replace(']','') + "</div> </div>");
        // $("table").append("<br>");
        // $("table").append("<input class=\"button-for-product-details\" type=\"submit\" value=\"ADD TO CART\" id=\""+ product[2] + "\" onclick=\"add_to_cart(this)\">");
        // showSlides(0);
    });
}

function add_to_cart(x) {
    var items_in_cart = [];
    $.get("http://147.139.168.202:8080/AjaxSearchDetails.jsp?keyword=" + x.id, function(data, status){
        var product = [];
        product = (data).split("@---@");
        var item = '{"product_name":"' + product[2] + '","product_price_COD":"' + product[3] + '","product_quantity":"1" }';
        if (typeof(Storage) !== "undefined") {
            if(localStorage.getItem("items") === null){
                // alert("if" );
                Swal.fire("Item Added to Cart", "have fun shopping! debug mode = if", "success");
                localStorage.setItem("items", item);
            }else{
                // alert("else" );
                Swal.fire("Item Added to Cart", "have fun shopping! debug mode = else", "success");
                // alert("localStorage.getItem(\"items\") : " + localStorage.getItem("items"));
                var items_in_cart = localStorage.getItem("items").split("@---@");
                // alert("items_in_cart : " + items_in_cart);
                var i = 0, counterDuplicateItem = 0;
                var newItem = JSON.parse(item);
                // alert("newItem : " + newItem);
                var newCart = "";
                for(i ; i < items_in_cart.length; i++){
                    if(items_in_cart[i] != ""){
                        var oneItemInCart = JSON.parse(items_in_cart[i]);
                        if(newItem.product_name == oneItemInCart.product_name) {
                            oneItemInCart.product_quantity = parseInt(oneItemInCart.product_quantity) + 1;
                            oneItemInCart.product_price_COD = parseInt(oneItemInCart.product_price_COD) + parseInt(product[3]);
                            counterDuplicateItem++;
                        }
                        var updatedItem = JSON.stringify(oneItemInCart);
                        newCart = newCart + "@---@" + updatedItem;
                    }
                }
                // alert("newCart : " + newCart);
                if(counterDuplicateItem == 0){
                    localStorage.setItem("items", localStorage.getItem("items") + "@---@" + item);
                }else{
                    localStorage.setItem("items", newCart);
                }
            }
        } else {
            alert("not happy");
        }
    });
}
function update_cart() {
    var items_in_cart = localStorage.getItem("items").split("@---@");
    var i = 0;
    $("table").empty();
    for(i ; i < items_in_cart.length; i++){
        // alert("Your items_in_cart[i] : " + items_in_cart[i]);
        if (items_in_cart[i] != ""){
            var obj = JSON.parse(items_in_cart[i]);
            $("table").append("<tr>");
            $("table").append("<td>" + obj.product_name + "</td>");
            $("table").append("<td class=\"quantity\"><div class=\"arrow-up\" id=\"" + obj.product_name + "\" onclick=\"add_quantity_in_cart_by_1(this)\"></div><div class=\"quantity-box\">" + obj.product_quantity + "</div><div class=\"arrow-down\" id=\"" + obj.product_name + "\" onclick=\"reduce_quantity_in_cart_by_1(this)\"></div></td>");
            $("table").append("<td class=\"table-price\">" + obj.product_price_COD + "</td>");
            $("table").append("</tr>");
        }
    }
}
function add_quantity_in_cart_by_1(x) {
    $.get("http://147.139.168.202:8080/AjaxSearchDetails.jsp?keyword=" + x.id, function(data, status){
        var product = [];
        product = (data).split("@---@");

        var items_in_cart = localStorage.getItem("items").split("@---@");
        var i = 0, counterDuplicateItem = 0;
        var newCart = "";
        for(i ; i < items_in_cart.length; i++){
            if(items_in_cart[i] != ""){
                var oneItemInCart = JSON.parse(items_in_cart[i]);
                if(x.id == oneItemInCart.product_name) {
                    oneItemInCart.product_quantity = parseInt(oneItemInCart.product_quantity) + 1;
                    oneItemInCart.product_price_COD = parseInt(oneItemInCart.product_price_COD) + parseInt(product[3]);
                    counterDuplicateItem++;
                }
                var updatedItem = JSON.stringify(oneItemInCart);
                newCart = newCart + "@---@" + updatedItem;
            }
        }
        // alert("newCart : " + newCart);
        if(counterDuplicateItem == 0){
            localStorage.setItem("items", localStorage.getItem("items") + "@---@" + item);
        }else{
            localStorage.setItem("items", newCart);
        }
    });
}
function reduce_quantity_in_cart_by_1(x) {
    $.get("http://147.139.168.202:8080/AjaxSearchDetails.jsp?keyword=" + x.id, function(data, status){
        var product = [];
        product = (data).split("@---@");
        
        var items_in_cart = localStorage.getItem("items").split("@---@");
        var i = 0, counterDuplicateItem = 0;
        var newCart = "";
        for(i ; i < items_in_cart.length; i++){
            if(items_in_cart[i] != ""){
                var oneItemInCart = JSON.parse(items_in_cart[i]);
                if(x.id == oneItemInCart.product_name) {
                    oneItemInCart.product_quantity = parseInt(oneItemInCart.product_quantity) - 1;
                    oneItemInCart.product_price_COD = parseInt(oneItemInCart.product_price_COD) - parseInt(product[3]);
                    counterDuplicateItem++;
                }
                if(oneItemInCart.product_quantity <= 0){
                    newCart = newCart;  
                    Swal.fire("Item Removed", "have fun shopping!", "success");
                    // Swal.fire("item removed");
                }else{
                    var updatedItem = JSON.stringify(oneItemInCart);
                    newCart = newCart + "@---@" + updatedItem;
                }
            }
        }
        // alert("newCart : " + newCart);
        if(counterDuplicateItem == 0){
            localStorage.setItem("items", localStorage.getItem("items") + "@---@" + item);
        }else{
            localStorage.setItem("items", newCart);
        }
    });

}
