$(document).ready(function(){
    getProvincesLocal();
    // getCityLocal();
    // getDistrictLocal();
    getZipCodeLocal();
    getStreetLocal();
});

function provinceSelectedLocal(x){
    // alert($(x).children("option:selected").val());
    // $(".city-selection-local").css("display", "block");
    getCityLocal($(x).children("option:selected").val());
}

function citySelectedLocal(x){
    // alert($(x).children("option:selected").val());
    // $(".district-selection-local").css("display", "block");
    getDistrictLocal($(x).children("option:selected").val())
}

// function getProvincesLocal(){
//     $.get("http://147.139.168.202:8080/IndonesiaAddress.jsp?type=province", function(data, status){
//         datas = JSON.parse(data);
//         var i =0;
//         $("#option-province-local").append("<option>-- select your province here --</option>");
//         for(i; i < datas.length; i ++){
//             $("#option-province-local").append("<option>" + datas[i].province + "</option>");
//         }

//         $.get("http://147.139.168.202:8080/profile.jsp?token=" + localStorage.getItem("token"), function(data, status){
//             datas = JSON.parse(data);
//             var mainAddress = (datas.address).split(";");
//             $("#option-province-local").val(mainAddress[0]);
//             getCityLocal(mainAddress[0]);
//         });
//     });
// }

function getCityLocal(province){
    $("#option-city-local").empty();
    // $.get("http://147.139.168.202:8080/IndonesiaAddress.jsp?type=city&control=" + province, function(data, status){
    //     datas = JSON.parse(data);
    //     var i =0;
    //     $("#option-city-local").append("<option>-- select your city here --</option>");
    //     for(i; i < datas.length; i ++){
    //         $("#option-city-local").append("<option>" + datas[i].city + "</option>");
    //     }
        
    //     $.get("http://147.139.168.202:8080/profile.jsp?token=" + localStorage.getItem("token"), function(data, status){
    //         datas = JSON.parse(data);
    //         var mainAddress = (datas.address).split(";");
    //         $("#option-city-local").val(mainAddress[1]);
    //         getDistrictLocal(mainAddress[1]);
    //     });
    // });
    $.get("http://147.139.168.202:8080/profile.jsp?token=" + localStorage.getItem("token"), function(data, status){
        datas = JSON.parse(data);
        var mainAddress = (datas.address).split(";");
        $("#option-city-local").val(mainAddress[1]);
        getDistrictLocal(mainAddress[1]);
    });
}

function getDistrictLocal(city){
    // $("#option-district-local").empty();
    // $.get("http://147.139.168.202:8080/IndonesiaAddress.jsp?type=district&control=" + city, function(data, status){
    //     datas = JSON.parse(data);
    //     var i =0;
    //     $("#option-district-local").append("<option>-- select your district here --</option>");
    //     for(i; i < datas.length; i ++){
    //         $("#option-district-local").append("<option>" + datas[i].district + "</option>");
    //     }

    //     $.get("http://147.139.168.202:8080/profile.jsp?token=" + localStorage.getItem("token"), function(data, status){
    //         datas = JSON.parse(data);
    //         var mainAddress = (datas.address).split(";");
    //         $("#option-district-local").val(mainAddress[2]);
    //     });
    // });
}

function getZipCodeLocal(){

        $.get("http://147.139.168.202:8080/profile.jsp?token=" + localStorage.getItem("token"), function(data, status){
            datas = JSON.parse(data);
            var mainAddress = (datas.address).split(";");
            $("#profile-code-local").val(mainAddress[2]);
        });
}

function getStreetLocal(){

        $.get("http://147.139.168.202:8080/profile.jsp?token=" + localStorage.getItem("token"), function(data, status){
            datas = JSON.parse(data);
            var mainAddress = (datas.address).split(";");
            // console.log("getStreetLocal " + mainAddress);
            $("#profile-street-local").val(mainAddress[3]);
        });
}