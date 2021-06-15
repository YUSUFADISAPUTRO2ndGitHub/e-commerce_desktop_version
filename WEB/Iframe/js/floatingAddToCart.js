function addToCartDirectly(product){
    if(localStorage.getItem("itemsInCart") === null){
        getProductsWithProductNo(response.access_token, response.session_id, product).done(function (response) {
            var productToBeAdded = {
                productNo: response.Product_Code,
                quantity: 1
            };
            var array = [];
            array.push(productToBeAdded);

            // saving to storage
            var productToBeAddedStringify = JSON.stringify(array);
            localStorage.setItem("itemsInCart", productToBeAddedStringify);
            console.log(localStorage.getItem("itemsInCart"));

            // add total item in cart
            localStorage.setItem("totalItemInCart", array.length);
        });
    }else{
        var cartToJson = JSON.parse(localStorage.getItem("itemsInCart"));
        console.log(cartToJson);
        var i = 0;
        var indicator = 0;
        for(i; i < cartToJson.length; i ++){
            if(cartToJson[i].productNo == product){
                cartToJson[i].quantity = parseInt(cartToJson[i].quantity) + 1;
                indicator++;

                // saving to storage
                var productToBeAddedStringify = JSON.stringify(cartToJson);
                localStorage.setItem("itemsInCart", productToBeAddedStringify);
                console.log("bug " + localStorage.getItem("itemsInCart"));
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
            console.log(localStorage.getItem("itemsInCart"));
        }
        // add total item in cart
        localStorage.setItem("totalItemInCart", cartToJson.length);
    }
    Swal.fire("Item Added", "have fun shopping!", "success");
}