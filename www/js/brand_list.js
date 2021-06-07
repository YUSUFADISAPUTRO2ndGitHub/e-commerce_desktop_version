$(document).ready(function(){
    $.get("http://147.139.168.202:8080/brandList.jsp", function(data, status){
        datas = JSON.parse(data);
        console.log(datas);
        var product_row = 0;
        for(product_row; product_row < datas.length; product_row++){
            $("#brand-list").append("<li class=\"list-group-item\">" + datas[product_row].name + "</li>");
        }
    });
});