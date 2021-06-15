$(document).on('click',"#simpan_reg",function(){

    var password_awal = $('#password_reg').val()
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
                    referral_customer_code: $("#signup_referral").val(),
                    ktp:$('#no_ktp_user').val()
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
            localStorage.setItem('token',res.data)
            $('#registerModal').modal('hide')
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


$(document).on('click',".box-option-login",function(){
    var email = $('#email_login').val()
    var password = $('#password_login').val() 
    console.log(email)
    console.log(password)
        
            axios.post(`http://customers.sold.co.id/customer-login-request?Email=${email}&Password=${password}`,{
                params:{
                    Email:email,
                    Password:password
                }
            }).then((res)=>{
                console.log(res.data ,' berhasil login 201')
                if(res.data){
                    // alert('berhasil login')
                    localStorage.setItem('token',res.data)
                    $('#loginModal').modal('hide')
                }else {
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
       console.log(data.customer_data)
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
        if(res.data != false){
            $('#profileModal').modal('hide')
            localStorage.setItem('token',res.data)
            alert('berhasil ngedit')

        }else {
            alert('save gagal')
        }
        
        console.log(res.data)
    }).catch((err)=>{
        console.log(err)
    })

})



// UPDATE DATA BY USER






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



$(document).on('click',"#simpan_supplier",function(){
alert('simpan supplier jalan')
var data = {
    customer_data : {
       Customer_Code : localStorage.getItem("token"),
       First_Name : $("#nama_depan_supp").val(),
       Last_Name : $("#nama_belakang_supp").val(),
       User_Password :$('#password_supp').val(),
       Birthday : $("#tahun_lahir_supp").val() + "/" + $("#bulan_lahir_supp").val() + "/" + $("#tanggal_lahir_supp").val(),
       Created_Date : "CURRENT_TIMESTAMP()",
       Last_Login : "CURRENT_TIMESTAMP()",
       Email : $('#email_supp').val(),
       Contact_Number_1 : $("#no_telp_supp").val(),
       Contact_Number_2 : $("#no_telp_2_supp").val(),
       Npwp:$('#npwp_supp').val(),
       Ktp:$('#no_ktp_supp').val(),
       Address_1 : $("#alamat_gudang_supp").val(),
       Status : "pending",
       User_Type : "Customer",
    //    account_number: $("#no_rekening_supp").val(),
       
   }
}
console.log(data)
})