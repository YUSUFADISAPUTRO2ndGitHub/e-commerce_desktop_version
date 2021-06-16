$(document).on('click',"#simpan_reg",function(){

    var password_awal = $('#password_reg').val()
    var referral_code = $('.id-referral').val()
    console.log(referral_code)
    
    axios.post(`http://customers.sold.co.id/password-generator?Password=${password_awal}`)
    .then((res)=>{
        var final_pass = res.data
        console.log(final_pass)
      
        axios.post(`http://customers.sold.co.id/get-customer-code`)
        .then((res)=>{
            localStorage.setItem('token',res.data)
            var data = {
                 customer_data : {
                    Customer_Code : localStorage.getItem("token"),
                    First_Name : $("#nama_depan_reg").val(),
                    Last_Name : $("#nama_belakang_reg").val(),
                    User_Password :final_pass,
                    Birthday : $("#tahun_lahir_reg").val() + "/" + $("#bulan_lahir_reg").val() + "/" + $("#tanggal_lahir_reg").val(),
                    Created_Date : "CURRENT_TIMESTAMP()",
                    Last_Login : "CURRENT_TIMESTAMP()",
                    Email : $('#email_reg').val(),
                    Contact_Number_1 : $("#no_telp_reg").val(),
                    Contact_Number_2 : $("#no_telp_2_reg").val(),
                    Address_1 : $("#alamat_lengkap_1").val(),
                    Address_2 : $("#alamat_lengkap_2").val(),
                    Address_3 : $("#alamat_lengkap_3").val(),
                    Address_4 : $("#alamat_lengkap_4").val(),
                    Address_5 : $("#alamat_lengkap_5").val(),
                    Status : "pending",
                    User_Type : "Customer",
                    account_number: $("#no_rekening_reg").val(),
                    referral_customer_code: $(".id-referral").val(),
                    ktp:$("#no_ktp_reg").val()
                }
            }
            console.log(data,' line 36 data')
        axios.post(`http://customers.sold.co.id/create-new-customer-direct-from-user`,data,{
            headers:{
                "Content-Type":'application/json'
            },
            "data":JSON.stringify({
                "Customer_Code": data.customer_data.Customer_Code,
                "First_Name": data.customer_data.First_Name,
                "Last_Name": data.customer_data.Last_Name,
                "User_Password": data.customer_data.User_Password,
                "Birthday": data.customer_data.Birthday,
                "Created_Date": data.customer_data.Created_Date,
                "Last_Login": data.customer_data.Last_Login,
                "Email": data.customer_data.Email,
                "Contact_Number_1": data.customer_data.Contact_Number_1,
                "Contact_Number_2": data.customer_data.Contact_Number_2,
                "Address_1": data.customer_data.Address_1,
                "Address_2": data.customer_data.Address_2,
                "Address_3": data.customer_data.Address_3,
                "Address_4": data.customer_data.Address_4,
                "Address_5": data.customer_data.Address_5,
                "Status": data.customer_data.Status,
                "User_Type": data.customer_data.User_Type,
                "ktp":data.customer_data.ktp
            })
        }).then((res)=>{
            console.log(res.data)
            // alert('berhasil daftars')
            if(res.data === true){
                
                swal.fire("Register Berhasil", "", "success");
                $('#loginModal').modal('hide')
            }else {
                $('#loginModal').modal('hide')
                // swal.fire("Register Gagal", "", "info");
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Register gagal!',
                    // footer: '<a href="">Why do I have this issue?</a>'
                  })
            }
        }).catch((err)=>{
            console.log(err)
        })

        }).catch((err)=>{
            console.log(err)
        })
    }).catch((err)=>{
        console.log(err)
    })


    
    
})




// LOGIN


$(document).on('click',".btn-login",function(){
    var email = $('#email_login').val()
    var password = $('#password_login').val() 
    console.log(email)
    console.log(password)
    // alert('button login jalan')
        
            axios.post(`http://customers.sold.co.id/customer-login-request?Email=${email}&Password=${password}`,{
                params:{
                    Email:email,
                    Password:password
                }
            }).then((res)=>{
                console.log(res.data ,' berhasil login 201')
                if(res.data){
                    swal.fire("Login Berhasil", "", "success");
                    localStorage.setItem('token',res.data)
                    $('#loginModal').modal('hide')
                }else {
                    swal.fire("Login Gagal", "", "info");
                    console.log('gagal login')
                }
            }).catch((err)=>{
                console.log(err)
            })

        
    

  
    // alert('sign in jalan')

})




// UPDATE DATA BY USER

$(document).on('click',".save-user",function(){
  
        var data = {
            customer_data : {
               Customer_Code : localStorage.getItem("token"),
               First_Name : $("#nama_depan_user").val(),
               Last_Name : $("#nama_belakang_user").val(),
               User_Password :$('#password_user').val(),
               Birthday : $("#tahun_lahir_user").val() + "/" + $("#bulan_lahir_user").val() + "/" + $("#tanggal_lahir_user").val(),
               Created_Date : "CURRENT_TIMESTAMP()",
               Last_Login : "CURRENT_TIMESTAMP()",
               Email : $('#email_user').val(),
               Contact_Number_1 : $("#no_telp1_user").val(),
               Contact_Number_2 : $("#no_telp2_user").val(),
               Address_1 : $("#alamat_lengkap1_user").val(),
               Address_2 : $("#alamat_lengkap2_user").val(),
               Address_3 : $("#alamat_lengkap3_user").val(),
               Address_4 : $("#alamat_lengkap4_user").val(),
               Address_5 : $("#alamat_lengkap5_user").val(),
               Status : "pending",
               User_Type : "Customer",
               account_number: $("#rekening_user").val(),
               referral_customer_code: $("#referral-profile").val(),
               ktp:$('#no_ktp_user').val()
           }
       }
       console.log(data)
       axios.post(`http://customers.sold.co.id/update-customer-data-by-user-themselves`,data,{
        headers:{
            "Content-Type":'application/json'
        },
        "data":JSON.stringify({
            "Customer_Code": data.customer_data.Customer_Code,
            "First_Name": data.customer_data.First_Name,
            "Last_Name": data.customer_data.Last_Name,
            "User_Password": data.customer_data.User_Password,
            "Birthday": data.customer_data.Birthday,
            "Created_Date": data.customer_data.Created_Date,
            "Last_Login": data.customer_data.Last_Login,
            "Email": data.customer_data.Email,
            "Contact_Number_1": data.customer_data.Contact_Number_1,
            "Contact_Number_2": data.customer_data.Contact_Number_2,
            "Address_1": data.customer_data.Address_1,
            "Address_2": data.customer_data.Address_2,
            "Address_3": data.customer_data.Address_3,
            "Address_4": data.customer_data.Address_4,
            "Address_5": data.customer_data.Address_5,
            "Status": data.customer_data.Status,
            "User_Type": data.customer_data.User_Type,
            "ktp":data.customer_data.ktp,
            "account_number":data.customer_data.account_number
        })
    }).then((res)=>{
        if(res.data != false){
            swal.fire("Simpan Data Berhasil", "", "success");
            $('#profileModal').modal('hide')
            // localStorage.setItem('token',res.data)
            

        }else {
            swal.fire("Simpan Data Gagal", "", "info");
            $('#profileModal').modal('hide')
        }
        
        console.log(res.data)
    }).catch((err)=>{
        console.log(err)
    })

})



//  end UPDATE DATA BY USER


function checkIfSignUpInputNull(){
    if($("#email_reg").val().length == 0 
    || $("#password_reg").val().length == 0 
    || $("#no_telp_reg").val().length == 0 
    || $("#nama_depan_reg").val().length == 0 
    || $("#nama_belakang_reg").val().length == 0 
    || $("#tahun_lahir_reg").val().length == 0 
    || $("#bulan_lahir_reg").val().length == 0 
    || $("#tanggal_lahir_reg").val().length == 0 
    || $("#alamat_lengkap_reg").val().length == 0){
        // email or password is empty
        return false;
    }else{
        // email or password is not empty
        if($("#email_reg").val().includes("@") 
        && ($("#email_reg").val().includes(".com")
            || $("#email_reg").val().includes(".co.id")
            || $("#email_reg").val().includes(".id")
            || $("#email_reg").val().includes(".ca")
            )
        && ($("#email_reg").val().includes("gmail") 
            || $("#email_reg").val().includes("yahoo")
            || $("#email_reg").val().includes("aol")
            || $("#email_reg").val().includes("outlook")
            || $("#email_reg").val().includes("hotmail")
            || $("#email_reg").val().includes("yopmail"))
        && ($("#no_telp_reg").val().length > 0 && $("#no_telp_2_reg").val().length <= 15)){
            console.log("sign up debug 2");
            return true;
        }else{
            console.log("sign up debug 3");
            return false;
        }
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


// REGISTER DATA SUPPLIER
$(document).on('click',"#simpan_supplier",function(){
alert('simpan supplier jalan')

axios.post(`http://customers.sold.co.id/get-customer-code`)
.then((res)=>{
    localStorage.setItem('token',res.data)
    var data = {
        customer_data : {
            Customer_Code : localStorage.getItem("token"),
            First_Name : $("#nama_depan_supp").val(),
            Last_Name : $("#nama_belakang_supp").val(),
            User_Password : $('#password_supp').val(),
            Created_Date : "CURRENT_TIMESTAMP()",
            Last_Login : "CURRENT_TIMESTAMP()",
            Email : $("#email_supp").val(),
            Contact_Number_1 : $("#telp_gudang_supp").val(),
            Contact_Number_2 : $("#telp_gudang2_supp").val(),
            Address_1 : (typeof $("#alamat_lengkap_1_supp").val() === 'undefined') ? "NULL" : $("#alamat_lengkap_1_supp").val(),
            Address_2 : (typeof $("#alamat_lengkap_2_supp").val() === 'undefined') ? "NULL" : $("#alamat_lengkap_2_supp").val(),
            Address_3 : (typeof $("#alamat_lengkap_3_supp").val() === 'undefined') ? "NULL" : $("#alamat_lengkap_3_supp").val(),
            Address_4 : (typeof $("#alamat_lengkap_4_supp").val() === 'undefined') ? "NULL" : $("#alamat_lengkap_4_supp").val(),
            Address_5 : (typeof $("#alamat_lengkap_5_supp").val() === 'undefined') ? "NULL" : $("#alamat_lengkap_5_supp").val(),
            Status : "pending",
            User_Type : "Customer",
            account_number: $("#no_rek_perusahaan_supp").val(),
            npwp: $("#npwp_supp").val(),
            ktp: (typeof $("#no_ktp_supp").val() === 'undefined') ? "NULL" : $("#no_ktp_supp").val(),
            nik: $("#nik_supp").val(),
            Nama_Perusahaan: $("#nama_perusahaan_supp").val(),
        }
    };
    
    var password = $('password_supp').val()
    axios.post(`http://customers.sold.co.id/password-generator?Password=${password}`)
    .then((res)=>{
        var newPassword = res.data
        axios.post(`http://customers.sold.co.id/create-new-customer-supplier-direct-from-user`,data,{
            headers:{
                "Content-Type":'application/json'
            },
            "data":JSON.stringify({
                "Customer_Code": data.customer_data.Customer_Code,
                "First_Name": data.customer_data.First_Name,
                "Last_Name": data.customer_data.Last_Name,
                "User_Password": newPassword,
                "Created_Date": data.customer_data.Created_Date,
                "Last_Login": data.customer_data.Last_Login,
                "Email": data.customer_data.Email,
                "Contact_Number_1": data.customer_data.Contact_Number_1,
                "Contact_Number_2": data.customer_data.Contact_Number_2,
                "Address_1" : data.customer_data.Address_1,
                "Address_2" : data.customer_data.Address_2,
                "Address_3" : data.customer_data.Address_3,
                "Address_4" : data.customer_data.Address_4,
                "Address_5" : data.customer_data.Address_5,
                "Status": data.customer_data.Status,
                "User_Type": data.customer_data.User_Type,
                "account_number": data.customer_data.account_number,
                "Npwp":data.customer_data.Npwp,
                "ktp":data.customer_data.ktp,
                "nik":data.customer_data.nik,
                "Company":data.customer_data.Company
            })
        })
        .then((res)=>{
            if(res.data){
                
                swal.fire("Register Supplier Berhasil", "", "success");
                $('#supplierModal').modal('hide')
            }else{
                swal.fire("Register Supplier Gagal", "", "alert");
            }
            
        }).catch((err)=>{
            console.log(err)
        })
    }).catch((err)=>{
        console.log(err)
    })

}).catch((err)=>{

})


})




//  FORGOT PASSWORD

$(document).on('click',"#btn-save-forgot",function(){
// alert('button forgot password jalan')
var data = {
    customer_data : {
        requestedNewPassword :$('#password_forgot').val(),
        Email : $('#email_forgot').val(),
        PrimaryContactNumber : $("#no_telp_forgot").val(),
        Ktp:$('#ktp_forgot').val(),
      
    //    account_number: $("#no_rekening_supp").val(),
       
   }
}

    var password = $('#password_forgot').val()
   var Email =$('#email_forgot').val()
   var PrimaryContactNumber = $("#no_telp_forgot").val()
   var Ktp=$('#ktp_forgot').val()
   
   
  
        
        axios.post(`http://customers.sold.co.id/customer-forgot-password-request?Email=${Email}&ktp=${Ktp}&PrimaryContactNumber=${PrimaryContactNumber}&requestedNewPassword=${password}`)
        .then((res)=>{
            if(res.data){
                $('#forgotModal').modal('hide')
                swal.fire("Ganti Password Berhasil", "", "success");
            }else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Ganti Password gagal!',
                    // footer: '<a href="">Why do I have this issue?</a>'
                  })
            }
            console.log(res.data)
            // console.log(newPassword)
        }).catch((err)=>{
            console.log(err)
        })
    
    console.log(data)


})
