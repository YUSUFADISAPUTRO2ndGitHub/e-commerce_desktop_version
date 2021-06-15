$(document).ready(function(){
    // getProvinces();
});

// function provinceSelected(x){
//     // alert($(x).children("option:selected").val());
//     $(".city-selection").css("display", "block");
//     getCity($(x).children("option:selected").val());
//     var temp = $(x).children("option:selected").val();
//     if(temp != "DKI Jakarta" && temp != "Banten"){
//         swal.fire("", "Untuk pengiriman di luar Banten dan DKI Jakarta, maka ongkos kirim akan di berlakukan. Biaya pengiriman akan di bayarkan pembeli secara COD saja", "warning");
//     }
// }

// function citySelected(x){
//     // alert($(x).children("option:selected").val());
//     $(".district-selection").css("display", "block");
//     getDistrict($(x).children("option:selected").val())
// }
// // http://147.139.168.202:8080/IndonesiaAddress.jsp?type=province
// function getProvinces(){
//     $.get("http://147.139.168.202:8080/IndonesiaAddress.jsp?type=province", function(data, status){
//         datas = JSON.parse(data);
//         // alert(datas.jsonArray[0].pcode);
//         var i =0;
//         $(".option-province").append("<option>-- select your province here --</option>");
//         for(i; i < datas.length; i ++){
//             $(".option-province").append("<option>" + datas[i].province + "</option>");
//         }
//     });
// }

// function getCity(province){
//     $.get("http://147.139.168.202:8080/IndonesiaAddress.jsp?type=city&control=" + province, function(data, status){
//         datas = JSON.parse(data);
//         console.log(data);
//         var i =0;
//         $("#option-city").append("<option>-- select your city here --</option>");
//         for(i; i < datas.length; i ++){
//             $("#option-city").append("<option>" + datas[i].city + "</option>");
//         }
//     });
// }

// function getDistrict(city){
//     $.get("http://147.139.168.202:8080/IndonesiaAddress.jsp?type=district&control=" + city, function(data, status){
//         datas = JSON.parse(data);
//         console.log(data);
//         var i =0;
//         $("#option-district").append("<option>-- select your district here --</option>");
//         for(i; i < datas.length; i ++){
//             $("#option-district").append("<option>" + datas[i].district + "</option>");
//         }
//     });
// }