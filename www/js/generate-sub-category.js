$(document).ready(function(){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const Subcategory = urlParams.get('Subcategory');
    getAllProductsBasedOnSubCategory(Subcategory).done(function (response) {
        if(response.length != 0){
            $(".loading-area").css("display", "none");
            loadingMessage(response.length);
            var product_row = 0;
            for(product_row; product_row < response.length; product_row++){
                generatehomeOneByOneSubCategorySelection(product_row, response[product_row], response.length);
            }
            if(response.length == 1){
                $(".card").css("max-width", "50%");
            }
        }else{
            loadingMessage(1);
        }
    });
});

function loadingMessage(timerMultiplier){
    let timerInterval
    Swal.fire({
    title: 'Loading',
    html: '',
    timer: timerMultiplier* 10,
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

function generatehomeOneByOneSubCategorySelection(product_row, data, dataLength){
    if(product_row % 2 != 0){
        var product_row = product_row - 1;
        console.log("product_row inside -1 " + product_row);
        // right
        $("#product-highlights" + product_row).append("<th id=\"right"+ product_row +"\">");
        $("#right" + product_row).append("<div class=\"notification product-card\" id=\"product-card-right"+ product_row +"\">");
        $("#product-card-right" + product_row).append("<div class=\"card\" id=\"card-right"+ product_row +"\" style=\"width: 100%;\">");
        $("#card-right" + product_row).append("<img onclick=\"redirectProductDetails(this, \'" + data.Product_Code + "\', \'" + data.Name + "\')\" class=\"card-img-top\" src=\"" + data.Picture_1 + "\">");
        $("#card-right" + product_row).append("<div class=\"card-body small-padding\" id=\"card-body-right"+ product_row +"\">");
        $("#card-body-right" + product_row).append("<div class=\"card-title\">" + data.Name );
    }else{
        console.log("product_row inside 2 " + product_row);
        // left
        $("#small-category-list").append("<tr id=\"product-highlights"+ product_row +"\">");
        $("#product-highlights" + product_row).append("<th id=\"left"+ product_row +"\">");
        $("#left" + product_row).append("<div class=\"notification product-card\" id=\"product-card-left"+ product_row +"\">");
        $("#product-card-left" + product_row).append("<div class=\"card\" id=\"card-left"+ product_row +"\" style=\"width: 100%;\">");
        $("#card-left" + product_row).append("<img onclick=\"redirectProductDetails(this, \'" + data.Product_Code + "\', \'" + data.Name + "\')\" class=\"card-img-top\" src=\"" + data.Picture_1 + "\">");
        $("#card-left" + product_row).append("<div class=\"card-body small-padding\" id=\"card-body-left"+ product_row +"\">");
        $("#card-body-left" + product_row).append("<div class=\"card-title\">" + data.Name );
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