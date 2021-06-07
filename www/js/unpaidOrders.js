$(document).ready(function(){
    populateUnpaidOrdersTable();
});

function populateUnpaidOrdersTable(){
    getAllUnpaidOrdersForThisCustomer(localStorage.getItem("token"), "").done(function (response) {
        if(response.length != 0){
            var i = 0;
            for(i ; i < response.length; i++){
                if(response[i].Payment_Status == "waitpay" || response[i].Payment_Status == null){
                    generateUnpaidOrdersRow(i, response[i]);
                }
            }
        }
    });
}

function removeSpace( words ) {
    var fixedwords = words.toString().split(' ');
    var i = 0;
    var result = "";
    for(i ; i < fixedwords.length; i++){
        if(result.length > 1){
            result = result + "%20" + fixedwords[i];
        }else{
            result = result + fixedwords[i];
        }
    }
    return result;
}

function generateUnpaidOrdersRow(i, datas){
    console.log(datas);
    $("#unpaid-orders").append("<tr id=\"" + datas.Order_Number + "\">");
    $("#" + datas.Order_Number ).append("<button onclick=\"checkOrderDetails(\'" + datas.Order_Number + "\')\">" + datas.Order_Number + "</button>");
    $("#" + datas.Order_Number ).append("<td class=\"total-price-per-order\" id=\"" + datas.Order_Number + "-details\">" + commafy( datas.Total_Price) + "</td>");
    if(datas.VA_Number != null && datas.VA_Number != "" ){
        $("#" + datas.Order_Number ).append("<td class=\"va-per-order\" id=\"" + datas.Order_Number + "-total-accountNumber\">" + datas.VA_Number + "</td>");
    }else{
        $("#" + datas.Order_Number ).append("<td class=\"va-per-order\" id=\"" + datas.Order_Number + "-total-accountNumber\">" + datas.Payment_Method + "</td>");
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

function checkOrderDetails(x){
    // alert(x);
    window.location.assign("./unpaidOrderDetails.html?orderNumber=" + x + "&vaNumber=" + $("#" + x + "-total-accountNumber").html());
}