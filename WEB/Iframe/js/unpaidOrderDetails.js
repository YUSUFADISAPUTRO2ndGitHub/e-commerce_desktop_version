$(document).ready(function(){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const orderNumber = urlParams.get('orderNumber');
    const vaNumber = urlParams.get('vaNumber');
    populateUnpaidOrdersTable(orderNumber);
    if(/^-?[\d.]+(?:e-?\d+)?$/.test(vaNumber)){
        $("#va-number-based-on-order-number").val(vaNumber);
    }else{
        $(".card").css("display", "none");
    }
});

function populateUnpaidOrdersTable(orderNumber){
    getAllUnpaidOrdersForThisCustomer("", orderNumber).done(function (response) {
        if(response.length > 0){
            var i = 0;
            for(i ; i < response.length; i++){
                console.log(response[i]);
                generateUnpaidOrdersRow(i, response[i]);
            }
        }
    });
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

function generateUnpaidOrdersRow(i, datas){
    console.log(datas.Product_Name);
    $("#unpaid-orders").append("<tr id=\"" + i + "\">");
    $("#" + i ).append("<th>" + datas.Product_Name + "</th>");
    $("#" + i ).append("<td id=\"" + i + "-details\">" + datas.Quantity_Requested + "</td>");
    $("#" + i ).append("<td id=\"" + i + "-total-accountNumber\">" + commafy(datas.Price_Based_On_Total_Quantity*1) + "</td>");
}

function copyBCAVANumber(){
    var copyText = document.getElementById("va-number-based-on-order-number");
    copyText.select();
    copyText.setSelectionRange(0, 99999)
    document.execCommand("copy");
    alert("Copied " + copyText.value);
}