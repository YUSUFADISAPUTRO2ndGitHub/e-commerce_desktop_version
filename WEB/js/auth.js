$(document).on('click',".box-kumpulkan",function(){

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
                    Address_1 : $("#alamat_lengkap_reg").val(),
                    Address_2 : $("#alamat_lengkap_reg-0").val(),
                    Address_3 : $("#alamat_lengkap_reg-1").val(),
                    Address_4 : $("#alamat_lengkap_reg-2").val(),
                    Address_5 : $("#alamat_lengkap_reg-3").val(),
                    Status : "pending",
                    User_Type : "Customer",
                    account_number: $("#no_rekening_reg").val(),
                    referral_customer_code: $("#signup_referral").val()
                }
            }
            console.log(data)
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
                "User_Type": data.customer_data.User_Type
            })
        }).then((res)=>{
            console.log(res.data)
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

 



 
    

    function register_forms(){
        console.log('item jalan function')
        // console.log(customer_data)
        // console.log(tahun_final,' ini tahun final')

        // if(checkIfSignUpInputNull()){
            // loadingMessage()
            axios.post(`http://customers.sold.co.id/get-customer-code`)
            .then((res)=>{
                localStorage.setItem('token',res.data)
                var password = 'test123'
                axios.post(`http://customers.sold.co.id/password-generator?Password=${password}`)
                .then((res)=>{
                    console.log(res.data,' ini password enctpy')
                    // final_pass = res.data
                    
                }).catch((err)=>{
                    console.log(err)
                })
                var password ='testing'
                console.log(password)
                if(password != false){
                    var data = {
                         customer_data : {
                            Customer_Code : localStorage.getItem("token"),
                            First_Name : $("#nama_depan_reg").val(),
                            Last_Name : $("#nama_belakang_reg").val(),
                            User_Password : $('#password_reg'),
                            Birthday : 1991 + "/" + 02 + "/" + 30,
                            Created_Date : "test123",
                            Last_Login : "test123",
                            Email : 'darmawanbayu1@gmail.com',
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
                            referral_customer_code: '31231231'
                    
                        }
                    }
                    console.log(data,' ini data buat dijadiin stringify')
                    
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
                            "User_Type": data.customer_data.User_Type
                        })
                    }).then((res)=>{
                        if(res.data){
                            console.log(res.data,'260 berhasil register')
                        }else {
                            console.log(res.data,'262 gagal register')
                        }
                    }).catch((err)=>{
                        console.log(err)
                    })

                }else {
                    console.log('error register')
                }
            }).catch((err)=>{
                console.log(err)
            })
        // }

    } 
    
    // console.log(customer_data)
    
    console.log('function jalan 27')
    console.log(email_reg)

   

    // $('.box-kumpulkan').on('click',function(){
    //     console.log('function jalan')
    //     // console.log(customer_data)
        
    // })
// })


// LOGIN




function sign_in_request(){
    var email = $('#email_login')
    var password = $('#password')

    axios.post(`http://customers.sold.co.id/customer-login-request`,{
        params:{
            Email:email,
            Password:password
        }
    }).then((res)=>{
        console.log(res.data)
    }).catch((err)=>{
        console.log(err)
    })
    
}



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
