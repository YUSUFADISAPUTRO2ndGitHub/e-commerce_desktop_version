


//  setInterval(() => {
//     var referral_code = $('.ref-cod option:selected').val()
//     $('#inp_ref_code').val(referral_code)
// },1000)






$(document).on('click',"#simpan_reg",function(){

    check_input_form()

    var result_check_input_form = check_input_form()

    if(result_check_input_form){
        var password_awal = $('#password_reg').val()
        var referral_code = $('.ref-cod option:selected').val()
        
        // $('#inp_ref_code').val(referral_code)
        
        
        axios.post(`http://customers.sold.co.id/password-generator?Password=${password_awal}`)
        .then((res)=>{
            var final_pass = res.data
            
            var ref_val = $('#inp_ref_code').val()
            if(ref_val.length >3){
                
                
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
                        referral_customer_code: $('#inp_ref_code').val(),
                        ktp:$("#no_ktp_reg").val()
                    }
                }
                
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
                
                
                if(res.data === true){
                    
                    // swal.fire("Register Berhasil", "", "success");
                    Swal.fire({
                        html:`
                        <div class="o-circle c-container__circle o-circle__sign--success">
                            <div class="o-circle__sign"></div>  
                        </div>   
                        Regiter Berhasil
                        `,
                        timer:2000,
                        
                    })
                    $('#registerModal').modal('hide')
                }else {
                    $('#registerModal').modal('hide')
                    // swal.fire("Register Gagal", "", "info");
                    // Swal.fire({
                    //     icon: 'error',
                    //     title: 'Oops...',
                    //     text: 'Register gagal!',
                    //     // footer: '<a href="">Why do I have this issue?</a>'
                    //   })
                    Swal.fire({
                        html:`
                        <div class="o-circle c-container__circle o-circle__sign--failure">
                            <div class="o-circle__sign"></div>  
                        </div> 
                        Register Gagal`,
                        timer:2000,
                        
                    })
                }
            }).catch((err)=>{
                
            })
    
            }).catch((err)=>{
                
            })
            }else {
                // swal.fire("Referral Code Harus Di isi", "", "error");
                Swal.fire({
                    html:`
                    <div class="o-circle c-container__circle o-circle__sign--failure">
                        <div class="o-circle__sign"></div>  
                    </div> 
                    Referral Code Harus Di Isi`,
                    timer:2000,
                    
                })
            }
          
            
        }).catch((err)=>{
            
        })

    }else {
        alert('ada data yang salah')
    }



    
    
})




// LOGIN


$(document).on('click',".btn-login",function(){
    var email = $('#email_login').val()
    var password = $('#password_login').val() 
    var otp = $('#otp_login').val()
    
    
    
    axios.post(`http://customers.sold.co.id/password-generator?Password=${password}`)
    .then((res)=>{
        
        axios.post(`http://customers.sold.co.id/customer-login-request?Email=${email}&Password=${password}&otp=${otp}`
        ).then((res)=>{
            
            if(res.data){
                // swal.fire("Login Berhasil", "", "success");
                Swal.fire({
                    html:`
                    <div class="o-circle c-container__circle o-circle__sign--success">
                        <div class="o-circle__sign"></div>  
                    </div>   
                    Login Berhasil
                    `,
                    timer:2000,
                    
                })
                localStorage.setItem('token',res.data)
                $('#newloginModal').modal('hide')
            }else {
                // swal.fire("Login Gagal", "", "info");
                Swal.fire({
                    html:`
                    <div class="o-circle c-container__circle o-circle__sign--failure">
                        <div class="o-circle__sign"></div>  
                    </div> 
                    Login Gagal`,
                    timer:2000,
                    
                })
            }
        }).catch((err)=>{
            
        })
    }).catch((err)=>{
        
    })

})

$(document).on('click',".btn-login-product",function(){
    var email = $('#email_login_prod').val()
    var password = $('#password_login_prod').val() 
    var otp = $('#otp_login_prod').val()
    
    
    // var item = document.getElementById('box-option-login')
    var item = $('.box-option-login').attr('id')
    
    
    
    if(item === 'product'){
        axios.post(`http://customers.sold.co.id/password-generator?Password=${password}`)
        .then((res)=>{
            
            axios.post(`http://customers.sold.co.id/customer-login-request?Email=${email}&Password=${password}&otp=${otp}`
            ).then((res)=>{
                
                
                
                
                
                if(res.data){
                    // swal.fire("Login Berhasil", "", "success");
                    Swal.fire({
                        html:`
                        <div class="o-circle c-container__circle o-circle__sign--success">
                            <div class="o-circle__sign"></div>  
                        </div>   
                        Login Berhasil
                        `,
                        timer:2000,
                        
                    })
                    localStorage.setItem('token',res.data)
                    $('#newloginModal').modal('hide')
                    $('#login_product').modal('hide')
                    $('.box-option-login').removeClass('product')
                    $('.toast_prod_information').css('display','block')
                    check_status_item()
                }else {
                    // swal.fire("Login Gagal", "", "info");
                    Swal.fire({
                        html:`
                        <div class="o-circle c-container__circle o-circle__sign--failure">
                            <div class="o-circle__sign"></div>  
                        </div> 
                        Login Gagal`,
                        timer:2000,
                        
                    })
                    
                    $('.box-option-login').removeClass('product')
                }
            }).catch((err)=>{
                
            })
        }).catch((err)=>{
            
        })

    }else if (item === 'commision'){
        axios.post(`http://customers.sold.co.id/password-generator?Password=${password}`)
        .then((res)=>{
            
            axios.post(`http://customers.sold.co.id/customer-login-request?Email=${email}&Password=${password}&otp=${otp}`
            ).then((res)=>{
                
                
                if(res.data){
                    // swal.fire("Login Berhasil", "", "success");
                    Swal.fire({
                        html:`
                        <div class="o-circle c-container__circle o-circle__sign--success">
                            <div class="o-circle__sign"></div>  
                        </div>   
                        Login Berhasil
                        `,
                        timer:2000,
                        
                    })
                    localStorage.setItem('token',res.data)
                    $('#newloginModal').modal('hide')
                    $('#login_product').modal('hide')
                    $('.box-option-login').removeClass('commision')
                    commision_check()
                }else {
                    // swal.fire("Login Gagal", "", "info");
                    Swal.fire({
                        html:`
                        <div class="o-circle c-container__circle o-circle__sign--failure">
                            <div class="o-circle__sign"></div>  
                        </div> 
                       Login Gagal`,
                        timer:2000,
                        
                    })
                    
                    $('.box-option-login').removeClass('commision')
                }
            }).catch((err)=>{
                
            })
        }).catch((err)=>{
            
        })
    }
    

})







// UPDATE DATA BY USER

$(document).on('click',".save-user",function(){
  
    var token = localStorage.getItem('token')
    
    axios.post(`http://customers.sold.co.id/get-customer-information?Customer_Code=${token}`)
    .then((res)=>{
        

        // var dataPassword = $('#password_user').val()

        var data = {
            customer_data : {
               Customer_Code : localStorage.getItem("token"),
               First_Name : $("#nama_depan_user").val(),
               Last_Name : $("#nama_belakang_user").val(),
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
               User_Type : res.data.User_Type,
               account_number: $("#rekening_user").val(),
               referral_customer_code: $("#referral-profile").val(),
               ktp:$('#no_ktp_user').val()
           }
       }
       
       axios.post(`http://customers.sold.co.id/update-customer-data-by-user-themselves`,data,{
        headers:{
            "Content-Type":'application/json'
        },
        "data":JSON.stringify({
            "Customer_Code": data.customer_data.Customer_Code,
            "First_Name": data.customer_data.First_Name,
            "Last_Name": data.customer_data.Last_Name,
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
            // swal.fire("Simpan Data Berhasil", "", "success");
            Swal.fire({
                html:`
                <div class="o-circle c-container__circle o-circle__sign--success">
                    <div class="o-circle__sign"></div>  
                </div>   
                Simpan Data Berhasil
                `,
                timer:2000,
                
            })
            $('#profileModal').modal('hide')
            // localStorage.setItem('token',res.data)
            

        }else {
            // swal.fire("Simpan Data Gagal", "", "info");
            Swal.fire({
                html:`
                <div class="o-circle c-container__circle o-circle__sign--failure">
                    <div class="o-circle__sign"></div>  
                </div> 
                Simpan Data Gagal`,
                timer:2000,
                
            })
            $('#profileModal').modal('hide')
        }
        
        
    }).catch((err)=>{
        
    })

    }).catch((err)=>{

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
            
            return true;
        }else{
            
            return false;
        }
    }
}
function loadingMessage(){
    let timerInterval
    Swal.fire({
    // title: 'Loading Your Request',
    html: `
        <div class="boxcon">
            <div class="box1">
            </div>
            <div id="sold-id-loading">
            SOLD 
            </div>
                
            <div class="box2">
            </div>
        </div>
    `,
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


// REGISTER DATA SUPPLIER
$(document).on('click',"#simpan_supplier",function(){



    check_input_form_supp()

    var result_check_input_form_supp = check_input_form_supp()

    if(result_check_input_form_supp){
        
        axios.post(`http://customers.sold.co.id/get-customer-code`)
        .then((res)=>{
            localStorage.setItem('token',res.data)    
            var password = $('#password_supp').val()
            
            axios.post(`http://customers.sold.co.id/password-generator?Password=${password}`)
            .then((res)=>{
                
                var newPassword = res.data
                
                
                var data = {
                    customer_data : {
                        Customer_Code : localStorage.getItem("token"),
                        First_Name : $("#nama_depan_supp").val(),
                        Last_Name : $("#nama_belakang_supp").val(),
                        User_Password : newPassword,
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
                        User_Type : "Supplier",
                        account_number: $("#no_rek_perusahaan_supp").val(),
                        npwp: $("#npwp_supp").val(),
                        ktp: (typeof $("#no_ktp_supp").val() === 'undefined') ? "NULL" : $("#no_ktp_supp").val(),
                        nik: $("#nik_supp").val(),
                        Nama_Perusahaan: $("#nama_perusahaan_supp").val(),
                    }
                };
                axios.post(`http://customers.sold.co.id/create-new-customer-supplier-direct-from-user`,data,{
                    headers:{
                        "Content-Type":'application/json'
                    },
                    "data":JSON.stringify({
                        "Customer_Code": data.customer_data.Customer_Code,
                        "First_Name": data.customer_data.First_Name,
                        "Last_Name": data.customer_data.Last_Name,
                        "User_Password": data.customer_data.User_Password,
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
                        
                        // swal.fire("Register Supplier Berhasil", "", "success");
                        Swal.fire({
                            html:`
                            <div class="o-circle c-container__circle o-circle__sign--success">
                                <div class="o-circle__sign"></div>  
                            </div>   
                            Register Supplier Berhasil
                            `,
                            timer:2000,
                            
                        })
                        $('#supplierModal').modal('hide')
                        $('#newloginModal').modal('hide')
                    }else{
                        // swal.fire("Register Supplier Gagal", "", "alert");
                        Swal.fire({
                            html:`
                            <div class="o-circle c-container__circle o-circle__sign--failure">
                                <div class="o-circle__sign"></div>  
                            </div> 
                            Register Supplier Gagal`,
                            timer:2000,
                            
                        })
                    }
                    
                }).catch((err)=>{
                    
                })
            }).catch((err)=>{
                
            })
        
        }).catch((err)=>{
        
        })

    }else {
        
    }
    


})




//  FORGOT PASSWORD

$(document).on('click',"#btn-save-forgot",function(){

var data = {
    customer_data : {
        requestedNewPassword :$('#password_forgot').val(),
        Email : $('#email_forgot').val(),
        PrimaryContactNumber : $("#no_telp_forgot").val(),
        Ktp:$('#ktp_forgot').val(),
        otp:$('#otp_forgot').val()
      
    //    account_number: $("#no_rekening_supp").val(),
       
   }
}

    var password = $('#password_forgot').val()
   var Email =$('#email_forgot').val()
   var PrimaryContactNumber = $("#no_telp_forgot").val()
   var Ktp=$('#ktp_forgot').val()
   var otp = $('#otp_forgot').val()
   
   
  
        
        axios.post(`http://customers.sold.co.id/customer-forgot-password-request?Email=${Email}&ktp=${Ktp}&PrimaryContactNumber=${PrimaryContactNumber}&requestedNewPassword=${password}&otp=${otp}`)
        .then((res)=>{
            if(res.data){
                $('#forgotModal').modal('hide')
                // swal.fire("Ganti Password Berhasil", "", "success");
                Swal.fire({
                    html:`
                    <div class="o-circle c-container__circle o-circle__sign--success">
                        <div class="o-circle__sign"></div>  
                    </div>   
                    Ganti Password Berhasil
                    `,
                    timer:2000,
                    
                })
            }else {
                // Swal.fire({
                //     icon: 'error',
                //     title: 'Oops...',
                //     text: 'Ganti Password gagal!',
                //     // footer: '<a href="">Why do I have this issue?</a>'
                //   })
                Swal.fire({
                    html:`
                    <div class="o-circle c-container__circle o-circle__sign--failure">
                        <div class="o-circle__sign"></div>  
                    </div> 
                    Ganti Password Gagal!`,
                    timer:2000,
                    
                })
            }
            
            // 
        }).catch((err)=>{
            
        })
    
    


})

$(document).on('change','#option-address-gb',function(){
    // $('.option-address-gb').on('change',function(){
        var value = $('#option-address-gb :selected').val();
        
    // })
    var test = $('#option-address-gb').val()
    

})



$(document).on('change','.qty_groupbuy',function(){
    
    var total_qty_from_user = parseInt($(this).val())
    var product_id = $(this).attr('id')
    var total_qty_from_api;
    var harga_satuan;
    axios.post(`http://products.sold.co.id/get-product-details?product_code=${product_id}`)
    .then((res)=>{
        total_qty_from_api = parseInt(res.data.GroupBuy_SellQuantity)
        harga_satuan = res.data.GroupBuy_SellPrice
        var total_harga = harga_satuan * total_qty_from_user
        if(total_qty_from_api > total_qty_from_user) {
              $('#tp_sp').val(total_harga)
              $('#tp_iframe').val(total_harga)
              
        }else {
            // Swal.fire({
            //     icon: 'error',
            //     title: 'Oops...',
            //     text: `Quantity Yang Tersisa Hanya : ${total_qty_from_api}!`,
            //     // footer: '<a href="">Why do I have this issue?</a>'
            //   })
            Swal.fire({
                html:`
                <div class="o-circle c-container__circle o-circle__sign--failure">
                    <div class="o-circle__sign"></div>  
                </div> 
                Quantity Yang Tersisa Hanya : ${total_qty_from_api}!`,
                timer:2000,
                
            })
              var total_price = harga_satuan * total_qty_from_api
              alert(total_qty_from_api)
              $('#tp_sp').val(total_price)
            //   $('#tp_iframe').val(total_harga)
              $('.qty_groupbuy').val(total_qty_from_api)
        }


    }).catch((err)=>{
        
    })



    
})



