$(document).ready(function(){
    getAllCategories("", "").done(function (response) {
        var bigcatlist = 0;
        for(bigcatlist; bigcatlist < response.length; bigcatlist = bigcatlist + 1){
            console.log(response[bigcatlist]);
            generateBigCategoryList(bigcatlist, response[bigcatlist]);
        }
    });
    $( "#small-category-list" ).click(function() {
        $('.pop-up-selection').attr("src", "");
        $('.pop-up-selection').css('display', 'none');
    });
});

function generateBigCategoryList(bigcatlist, data){
    $("#big-category-list").append("<tr onclick=\"generateSmallCatList(this)\" class=\"big-category-list\" id=\"big-category-list-tr" + data.Category + "\">");
    $("#big-category-list-tr"+ data.Category).append("<td id=\"big-category-list-td" + bigcatlist + "\">" + data.Category);
}

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

function generateSmallCatList(x){
    $('.pop-up-selection').attr("src", "");
    $('.pop-up-selection').css('display', 'none');
    loadingMessage(10000);
    clearData(x);
    changeCssforActive(x);
    var categoryId = x.id.replace("big-category-list-tr", "");
    $(".loading-area").css("display", "table");
    getAllSubCategories(categoryId).done(function (response) {
        console.log(response);
        if(response.length == 0){
            generateSmallCatList(x);
            $(".loading-area").css("display", "table");
        }else{
            $(".loading-area").css("display", "none");
        }
        loadingMessage(response.length);
        var product_row = 0;
        for(product_row; product_row < response.length; product_row++){
            generatehomeOneByOne(product_row, response[product_row], response.length);
        }
        if(response.length == 1){
            $(".card").css("max-width", "50%");
        }
    });
}

function generatehomeOneByOne(product_row, data, dataLength){
    if(product_row % 2 != 0){
        var product_row = product_row - 1;
        console.log("product_row inside -1 " + product_row);
        // right
        $("#product-highlights" + product_row).append("<th id=\"right"+ product_row +"\">");
        $("#right" + product_row).append("<div class=\"notification product-card\" id=\"product-card-right"+ product_row +"\">");
        $("#product-card-right" + product_row).append("<div class=\"card\" id=\"card-right"+ product_row +"\" style=\"width: 100%;\">");
        $("#card-right" + product_row).append("<img onclick=\"unhideProductSelection(this, \'" + data.Subcategory + "\')\" class=\"card-img-top\" src=\"" + data.Picture_1 + "\">");
        $("#card-right" + product_row).append("<div class=\"card-body small-padding\" id=\"card-body-right"+ product_row +"\">");
        $("#card-body-right" + product_row).append("<div class=\"card-title\">" + data.Subcategory );
    }else{
        console.log("product_row inside 2 " + product_row);
        // left
        $("#small-category-list").append("<tr id=\"product-highlights"+ product_row +"\">");
        $("#product-highlights" + product_row).append("<th id=\"left"+ product_row +"\">");
        $("#left" + product_row).append("<div class=\"notification product-card\" id=\"product-card-left"+ product_row +"\">");
        $("#product-card-left" + product_row).append("<div class=\"card\" id=\"card-left"+ product_row +"\" style=\"width: 100%;\">");
        $("#card-left" + product_row).append("<img onclick=\"unhideProductSelection(this, \'" + data.Subcategory + "\')\" class=\"card-img-top\" src=\"" + data.Picture_1 + "\">");
        $("#card-left" + product_row).append("<div class=\"card-body small-padding\" id=\"card-body-left"+ product_row +"\">");
        $("#card-body-left" + product_row).append("<div class=\"card-title\">" + data.Subcategory );
    }
}

function unhideProductSelection(x, Subcategory){
    getAllProductsBasedOnSubCategory(Subcategory).done(function (response) {
        $('.pop-up-selection').attr("src", "./sub-category.html?Subcategory=" + Subcategory);
        $('.pop-up-selection').css('display', 'block');
    });
}

function generatehomeOneByOneSubCategorySelection(product_row, data, dataLength){
    if(product_row % 2 != 0){
        var product_row = product_row - 1;
        console.log("product_row inside -1 " + product_row);
        // right
        $("#product-highlights" + product_row).append("<th id=\"right"+ product_row +"\">");
        $("#right" + product_row).append("<div class=\"notification product-card\" id=\"product-card-right"+ product_row +"\">");
        $("#product-card-right" + product_row).append("<div class=\"card\" id=\"card-right"+ product_row +"\" style=\"width: 100%;\">");
        $("#card-right" + product_row).append("<img onclick=\"redirectProductDetails(this, \'" + data.Subcategory + "\', \'" + data.Subcategory + "\')\" class=\"card-img-top\" src=\"" + data.Picture_1 + "\">");
        $("#card-right" + product_row).append("<div class=\"card-body small-padding\" id=\"card-body-right"+ product_row +"\">");
        $("#card-body-right" + product_row).append("<div class=\"card-title\">" + data.Subcategory );
    }else{
        console.log("product_row inside 2 " + product_row);
        // left
        $("#small-category-list").append("<tr id=\"product-highlights"+ product_row +"\">");
        $("#product-highlights" + product_row).append("<th id=\"left"+ product_row +"\">");
        $("#left" + product_row).append("<div class=\"notification product-card\" id=\"product-card-left"+ product_row +"\">");
        $("#product-card-left" + product_row).append("<div class=\"card\" id=\"card-left"+ product_row +"\" style=\"width: 100%;\">");
        $("#card-left" + product_row).append("<img onclick=\"redirectProductDetails(this, \'" + data.Subcategory + "\', \'" + data.Subcategory + "\')\" class=\"card-img-top\" src=\"" + data.Picture_1 + "\">");
        $("#card-left" + product_row).append("<div class=\"card-body small-padding\" id=\"card-body-left"+ product_row +"\">");
        $("#card-body-left" + product_row).append("<div class=\"card-title\">" + data.Subcategory );
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

function clearData(category){
    $("#small-category-list").empty();
}

function changeCssforActive(category){
    $(".big-category-list").removeClass("active-local");
    $(category).addClass("active-local");
}