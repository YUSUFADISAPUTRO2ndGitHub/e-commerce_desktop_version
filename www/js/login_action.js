$(document).ready(function(){
    if(localStorage.getItem("token") != ""){
        getCustomersWithCustomerNo(localStorage.getItem("token")).done(function (response) {
            var bday = response.Birthday.split("/");
            $("#profile-owner-firstname").val(response.First_Name);
            $("#profile-owner-lastname").val(response.Last_Name);
            $("#profile-email").val(response.Email);
            $("#profile-telp").val(response.Contact_Number_1);
            $("#profile-address-local").val(response.Address_1);
            $("#profile-ktp").val("");
            $("#profile-db-year").val(bday[0]);
            $("#profile-db-month").val(bday[1]);
            $("#profile-db-day").val(bday[2]);
            additionalAddresses(response);
        });
    }
});

function additionalAddresses(response){
    if(response.Address_2 != "undefined"){
        $("#profile-info-details").append(
            `<div class="form-group">
                <label>Alamat lengkap ke 2</label>
                <input type="text" id="profile-address-local-2" class="form-control" placeholder="Alamat Lengkap">
            </div>`
        );
        $("#profile-address-local-2").val(response.Address_2);
    }
    if(response.Address_3 != "undefined"){
        $("#profile-info-details").append(
            `<div class="form-group">
                <label>Alamat lengkap ke 3</label>
                <input type="text" id="profile-address-local-3" class="form-control" placeholder="Alamat Lengkap">
            </div>`
        );
        $("#profile-address-local-3").val(response.Address_3);
    }
    if(response.Address_4 != "undefined"){
        $("#profile-info-details").append(
            `<div class="form-group">
                <label>Alamat lengkap ke 4</label>
                <input type="text" id="profile-address-local-4" class="form-control" placeholder="Alamat Lengkap">
            </div>`
        );
        $("#profile-address-local-4").val(response.Address_4);
    }
    if(response.Address_5 != "undefined"){
        $("#profile-info-details").append(
            `<div class="form-group">
                <label>Alamat lengkap ke 5</label>
                <input type="text" id="profile-address-local-5" class="form-control" placeholder="Alamat Lengkap">
            </div>`
        );
        $("#profile-address-local-5").val(response.Address_5);
    }
}

// function getProvincesOtherLocal(){
//     $.get("http://147.139.168.202:8080/IndonesiaAddress.jsp?type=province", function(data, status){
//         datas = JSON.parse(data);
//         
//         var i =0;
//         $("#option-province-local-other").append("<option>-- select your province here --</option>");
//         for(i; i < datas.length; i ++){
//             $("#option-province-local-other").append("<option>" + datas[i].province + "</option>");
//         }

//         $.get("http://147.139.168.202:8080/profile.jsp?token=" + localStorage.getItem("token"), function(data, status){
//             datas = JSON.parse(data);
//             var mainAddress = (datas.other_address).split(";");
//             $("#option-province-local-other").val(mainAddress[0]);
//             getCityOtherLocal(mainAddress[0]);
//         });
//     });
// }

function editProfile(){
    getCustomersWithCustomerNo(localStorage.getItem("token")).done(function (response) {
        var data = {
            customer_data: {
                Customer_Code: localStorage.getItem("token"),
                First_Name: $("#profile-owner-firstname").val(),
                Last_Name: $("#profile-owner-lastname").val(),
                User_Password: $("#signup-password").val(),
                Birthday:$("#profile-db-year").val() + "/" + $("#profile-db-month").val() + "/" + $("#profile-db-day").val(),
                Created_Date: "CURRENT_TIMESTAMP()",
                Last_Login: "CURRENT_TIMESTAMP()",
                Email: $("#profile-email").val(),
                Contact_Number_1: $("#profile-telp").val(),
                Contact_Number_2: response.Contact_Number_2,
                Address_1: $("#profile-address-local").val(),
                Address_2: $("#profile-address-local-2").val(),
                Address_3: $("#profile-address-local-3").val(),
                Address_4: $("#profile-address-local-4").val(),
                Address_5: $("#profile-address-local-5").val(),
                Status: "Approved",
                User_Type: "Customer"
            }
        }
        updateCustomer(data).done(function (response) {
            // if(datas.Customer_Code != undefined || datas.Customer_Code != null){
            //     localStorage.setItem("token", datas.Customer_Code);
            //     Swal.fire("UPDATE ACCOUNT SUCCESSFUL", "", "success");
            //     setTimeout(function(){ window.location.href = "./profile-account.html"; }, 3000);
            // }else{
            //     Swal.fire("UPDATE ACCOUNT FAILED", "Please try again later", "error");
            // }
        });
    });
}

function logoutRequest(){
    localStorage.setItem("token", "");
    
}

function removeAddtionalAddresses(){
    $(".sign-up-form").empty();
    $(".clear-button-area").css("display", "none");
}

var numberOfAddresses = -1;
function appendNewAddressField(){
    numberOfAddresses++;
    if(numberOfAddresses <= 4){
        $(".clear-button-area").css("display", "block");
        $(".sign-up-form").append("<div id=\"" + numberOfAddresses + "\"></div>");
        $("#" + numberOfAddresses).append("<div class=\"form-group province-form-area-" + numberOfAddresses + "\">");
        $(".province-form-area-" + numberOfAddresses).append("<label>Alamat lengkap</label>");
        $(".province-form-area-" + numberOfAddresses).append("<input type=\"text\" class=\"form-control\" id=\"signup-address-" + numberOfAddresses + "\">");
    }else{
        numberOfAddresses--;
    }
}

function signupRequest(){
    if(checkIfSignUpInputNull()){
        loadingMessage();
        createCustomerNo().done(function (response) {
            
            localStorage.setItem("token", response);
            var shippingAddressList = [];
            if(numberOfAddresses > -1){
                var i = 0;
                for(i; i <= numberOfAddresses; i ++){
                    shippingAddressList.push(
                        $("#signup-address-" + i).val()
                    );
                }
            }
            encryptPassword($("#signup-password").val()).done(function (response) {
                if(response != false){
                    var data = {
                        customer_data : {
                            Customer_Code : localStorage.getItem("token"),
                            First_Name : $("#signup-owner-first-name").val(),
                            Last_Name : $("#signup-owner-last-name").val(),
                            User_Password : response,
                            Birthday : $("#profile-db-year").val() + "/" + $("#profile-db-month").val() + "/" + $("#profile-db-day").val(),
                            Created_Date : "CURRENT_TIMESTAMP()",
                            Last_Login : "CURRENT_TIMESTAMP()",
                            Email : $("#signup-email").val(),
                            Contact_Number_1 : $("#signup-telp").val(),
                            Contact_Number_2 : $("#signup-telp-2").val(),
                            Address_1 : $("#signup-address").val(),
                            Address_2 : $("#signup-address-0").val(),
                            Address_3 : $("#signup-address-1").val(),
                            Address_4 : $("#signup-address-2").val(),
                            Address_5 : $("#signup-address-3").val(),
                            Status : "pending",
                            User_Type : "Customer"
                        }
                    };
                    createNewCustomer("", "", data).done(function (response) {
                        
                        if(response){
                            Swal.fire("SIGN-UP SUCCESS", "", "success");
                            window.location.href = "./profile-account.html";
                        }else{
                            Swal.fire("SIGN-UP HALF SUCCESS", "Terdapat kesalahan di data yang Anda input, tetapi Anda sudah dapat menggunakan account Anda. Customer Service kami mungkin menghubungi Anda ketika Anda membuat pesanan", "success");
                            window.location.href = "./profile-account.html";
                        }
                    });
                }else{
                    Swal.fire("SIGN-UP FAIL", "", "error");
                }
            });
        });
    }else{
        swal.fire("","Tolong diisi data-data yang masih belum terisi atau isi dengan benar","warning");
    }
}

function checkIfSignUpInputNull(){
    if($("#signup-email").val().length == 0 
    || $("#signup-password").val().length == 0 
    || $("#signup-telp").val().length == 0 
    || $("#signup-owner-first-name").val().length == 0 
    || $("#signup-owner-last-name").val().length == 0 
    || $("#profile-db-year").val().length == 0 
    || $("#profile-db-month").val().length == 0 
    || $("#profile-db-day").val().length == 0 
    || $("#signup-address").val().length == 0){
        // email or password is empty
        return false;
    }else{
        // email or password is not empty
        if($("#signup-email").val().includes("@") 
        && ($("#signup-email").val().includes(".com")
            || $("#signup-email").val().includes(".co.id")
            || $("#signup-email").val().includes(".id")
            || $("#signup-email").val().includes(".ca")
            )
        && ($("#signup-email").val().includes("gmail") 
            || $("#signup-email").val().includes("yahoo")
            || $("#signup-email").val().includes("aol")
            || $("#signup-email").val().includes("outlook")
            || $("#signup-email").val().includes("hotmail")
            || $("#signup-email").val().includes("yopmail"))
        && ($("#signup-telp").val().length > 0 && $("#signup-telp").val().length <= 15)){
            
            return true;
        }else{
            
            return false;
        }
    }
}

function loginRequest(){
    if(checkIfInputNull()){
        
        
        loginRequestAPI($("#login-email").val(), $("#login-password").val()).done(function (response) {
            if(response != false){
                
                localStorage.setItem("token", response);
                window.location.href = "./profile-account.html";
            }else{
                Swal.fire("LOGIN FAILED", "Please make sure your email and password are correct", "error");
            }
        });
    }else{
        Swal.fire("LOGIN FAILED", "Please make sure you type in yoour email and password correctly", "error");
    }
}

function checkIfInputNull(){
    if($("#login-email").val().length == 0 || $("#login-password").val().length == 0){
        // email or password is empty
        return false;
    }else{
        // email or password is not empty
        return true;
    }
}

function loadingMessage(){
    let timerInterval
    Swal.fire({
    title: 'Loading Your Request',
    html: '',
    timer: 3000,
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
            
        }
    })
}

function forgotpasswordrequest(){
    if($("#forgot-email").val().length != 0 
    && $("#forgot-telp").val().length != 0 
    && $("#forgot-db-year").val().length != 0 
    && $("#forgot-db-month").val().length != 0
    && $("#forgot-db-day").val().length != 0
    && $("#forgot-new-password").val().length != 0 ){
        var Birthday = $("#forgot-db-year").val() + "/" + $("#forgot-db-month").val() + "/" + $("#forgot-db-day").val();
        getforgotpasswordrequest($("#forgot-email").val(), Birthday, $("#forgot-telp").val(), $("#forgot-new-password").val()).done(function (response) {
            
            if(response != false){
                
                if(response){
                    swal.fire("You are verfied", "Password Anda telah di ganti sesuai dengan yang Anda berikan", "success");
                    setTimeout(() => {
                        window.location.href = "./sign-in.html";
                    }, 3000);
                }else{
                    swal.fire("You are not verfied", "Password Anda belum di ganti sesuai dengan yang Anda berikan", "warning");
                }
            }else{
                swal.fire("You are not verfied", "Password Anda belum di ganti sesuai dengan yang Anda berikan", "warning");
            }
        });
    }else{
        swal.fire("Please fill all in", "", "warning");
    }
}