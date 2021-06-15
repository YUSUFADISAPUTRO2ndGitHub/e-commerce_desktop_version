$(document).ready(function(){
    if(localStorage.getItem("token") != ""){
        getCustomersWithCustomerNo(localStorage.getItem("token")).done(function (response) {
            var bday = response.Birthday.split("/");
            $("#profile-owner-firstname").val(response.First_Name);
            $("#profile-owner-lastname").val(response.Last_Name);
            $("#profile-email").val(response.Email);
            $("#profile-telp").val(response.Contact_Number_1);
            $("#profile-address-local").val(response.Address_1);
            $("#profile-ktp").val(response.ktp);
            $("#profile-db-year").val(bday[0]);
            $("#profile-db-month").val(bday[1]);
            $("#profile-db-day").val(bday[2]);
            additionalAddresses(response);
        });
    }else{
        console.log("sign-up");
        getAvailableReferralCodes().done(function (response) {
            console.log(response);
            var i = 0;
            for(i; i < response.length; i ++){
                $(".referral-code-list").append(`
                    <a onclick="replace_to_a_customer_code('${response[i].Customer_Code}')" class="dropdown-item">${response[i].First_Name} ${response[i].Last_Name} - ${response[i].Nama_Perusahaan}</a>
                `)
            }
        });
    }
});

function replace_to_a_customer_code(Customer_Code){
    console.log(Customer_Code);
    $("#signup-referral").val(Customer_Code);
}

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
//         console.log("datas profile "+ data);
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
        console.log(data);
        updateCustomer(data).done(function (response) {
            console.log(response);
            if(response){
                window.location.href = "./profile-account.html";
            }
        });
    });
}

function logoutRequest(){
    localStorage.setItem("token", "");
    console.log(localStorage.getItem("token"));
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
            console.log(response);
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
                            Address_1 : (typeof $("#signup-address").val() === 'undefined') ? "NULL" : $("#signup-address").val(),
                            Address_2 : (typeof $("#signup-address-0").val() === 'undefined') ? "NULL" : $("#signup-address-0").val(),
                            Address_3 : (typeof $("#signup-address-1").val() === 'undefined') ? "NULL" : $("#signup-address-1").val(),
                            Address_4 : (typeof $("#signup-address-2").val() === 'undefined') ? "NULL" : $("#signup-address-2").val(),
                            Address_5 : (typeof $("#signup-address-3").val() === 'undefined') ? "NULL" : $("#signup-address-3").val(),
                            Status : "pending",
                            User_Type : "Customer",
                            account_number: $("#signup-account-number").val(),
                            referral_customer_code: $("#signup-referral").val(),
                            ktp: (typeof $("#signup-id-number").val() === 'undefined') ? "NULL" : $("#signup-id-number").val()
                        }
                    };
                    console.log(data);
                    createNewCustomer("", "", data).done(function (response) {
                        console.log(response);
                        if(response){
                            Swal.fire("SIGN-UP SUCCESS", "", "success");
                            window.location.href = "./profile-account.html";
                        }else{
                            Swal.fire("SIGN-UP FAILED", "", "warning");
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

function signupRequestSupplier(){
    if(checkIfSignUpSupplierInputNull()){
        loadingMessage();
        createCustomerNo().done(function (response) {
            console.log(response);
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
                            Created_Date : "CURRENT_TIMESTAMP()",
                            Last_Login : "CURRENT_TIMESTAMP()",
                            Email : $("#signup-email").val(),
                            Contact_Number_1 : $("#signup-telp").val(),
                            Contact_Number_2 : $("#signup-telp-2").val(),
                            Address_1 : (typeof $("#signup-address").val() === 'undefined') ? "NULL" : $("#signup-address").val(),
                            Address_2 : (typeof $("#signup-address-0").val() === 'undefined') ? "NULL" : $("#signup-address-0").val(),
                            Address_3 : (typeof $("#signup-address-1").val() === 'undefined') ? "NULL" : $("#signup-address-1").val(),
                            Address_4 : (typeof $("#signup-address-2").val() === 'undefined') ? "NULL" : $("#signup-address-2").val(),
                            Address_5 : (typeof $("#signup-address-3").val() === 'undefined') ? "NULL" : $("#signup-address-3").val(),
                            Status : "pending",
                            User_Type : "Customer",
                            account_number: $("#signup-account-number").val(),
                            npwp: $("#signup-account-npwp").val(),
                            ktp: (typeof $("#signup-id-number").val() === 'undefined') ? "NULL" : $("#signup-id-number").val(),
                            nik: $("#signup-company-no-pic").val(),
                            Nama_Perusahaan: $("#signup-company-name").val(),
                        }
                    };
                    console.log(data);
                    createNewCustomerSupplier("", "", data).done(function (response) {
                        console.log(response);
                        if(response){
                            Swal.fire("SIGN-UP SUCCESS", "", "success");
                            window.location.href = "./profile-account.html";
                        }else{
                            Swal.fire("SIGN-UP FAILED", "", "warning");
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

function checkIfSignUpSupplierInputNull(){
    if($("#signup-email").val().length == 0 
    || $("#signup-password").val().length == 0 
    || $("#signup-telp").val().length == 0 
    || $("#signup-owner-first-name").val().length == 0 
    || $("#signup-owner-last-name").val().length == 0
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
        && ($("#signup-telp").val().length > 0 && $("#signup-telp").val().length <= 15)
        ){
            console.log("sign up debug 2");
            return true;
        }else{
            console.log("sign up debug 3");
            return false;
        }
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
        && ($("#signup-telp").val().length > 0 && $("#signup-telp").val().length <= 15)
        && ($("#signup-referral").val().length > 0)
        ){
            console.log("sign up debug 2");
            return true;
        }else{
            console.log("sign up debug 3");
            return false;
        }
    }
}

function loginRequest(){
    if(checkIfInputNull()){
        console.log($("#login-email").val());
        console.log($("#login-password").val());
        loginRequestAPI($("#login-email").val(), $("#login-password").val()).done(function (response) {
            if(response != false){
                console.log(response);
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
            console.log('I was closed by the timer')
        }
    })
}

function forgotpasswordrequest(){
    if($("#forgot-email").val().length != 0 
    && $("#forgot-telp").val().length != 0 
    && $("#forgot-ktp").val().length != 0 
    // && $("#forgot-db-month").val().length != 0
    // && $("#forgot-db-day").val().length != 0
    && $("#forgot-new-password").val().length != 0 ){
        // var Birthday = $("#forgot-db-year").val() + "/" + $("#forgot-db-month").val() + "/" + $("#forgot-db-day").val();
        getforgotpasswordrequest($("#forgot-email").val(), $("#forgot-ktp").val(), $("#forgot-telp").val(), $("#forgot-new-password").val()).done(function (response) {
            console.log(response);
            if(response != false){
                console.log(response);
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