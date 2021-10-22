


$(function(){




    setTimeout(()=>{
        $('.insta-box').css('transform','translateX(100%)')
        $('.fa-arrow-circle-left').css('visibility','visible')
        $('.fa-arrow-circle-right').css('visibility','hidden')
    },10000)

    $('#unhide-insta').on('click',function(){
        $('.insta-box').css('transform','translateX(1%)')
        $('#hide-insta').css('display','block')
        $('#unhide-insta').css('display','none')
        $('.fa-arrow-circle-left').css('transition','0.5s')
        $('.fa-arrow-circle-right').css('transition','0.5s')
        $('.fa-arrow-circle-left').css('visibility','hidden')
        $('.fa-arrow-circle-right').css('visibility','visible')
        $('.fa-arrow-circle-right').css('transform','translateX(-310px)')
        $('.fa-arrow-circle-left').css('transform','translateX(-310px)')
    })
    $('#hide-insta').on('click',function(){
        $('.insta-box').css('transform','translateX(100%)')
        $('#unhide-insta').css('display','block')
        $('#hide-insta').css('display','none')
        $('.fa-arrow-circle-left').css('transition','0.5s')
        $('.fa-arrow-circle-right').css('transition','0.5s')
        $('.fa-arrow-circle-left').css('visibility','visible')
        $('.fa-arrow-circle-left').css('transform','translateX(0px)')
        $('.fa-arrow-circle-right').css('transform','translateX(0px)')
        $('.fa-arrow-circle-right').css('visibility','none')
    })


    setInterval(() => {
        var productModal = $('#productModal').css('display') == 'none' 
        if(productModal == true){
            
            $('.toast_prod_information').css('display','none')
        }else {
            
        }
    },1000)

    $('#cek_harga_req').on('mouseenter',function(){

        $('#cek_harga_req').popover();
    })

    $('[data-toggle="tooltip"]').tooltip()

  
    // $('.input-group').on('click',function(){
    //     $('.new-box-category').toggle(1000)
    // // $('.list-group').show(1000)
    // })

    $('#icon-plus')
        
       

    $('.radio-group .radio_payment_method').on('click',function(){
        // alert('function jalan')
        $(this).parent().find('.radio_payment_method').removeClass('selected');
        $(this).parent().find('.radio_payment_method').removeClass('active_payment_method');
        $('.radio_payment_method').removeClass('selected')
        $('.radio_payment_method').removeClass('active_payment_method')
        $(this).addClass('selected');
        $(this).addClass('active_payment_method');

        var val = $(this).attr('data-value');
        var class_payment = $(this)
        
 
    })
    
    $('.radio-group-address .radio_address_card').on('click',function(){
        $(this).parent().find('.radio_address_card').removeClass('selected');
        $(this).parent().find('.radio_address_card').removeClass('active_payment_method');
        $('.radio_address_card').removeClass('selected')
        $('.radio_address_card').removeClass('active_payment_method')
        $(this).addClass('selected');
        $(this).addClass('active_payment_method');

        var val = $(this).attr('data-value');
        result = val
        var class_payment = $(this)
        
        var testing_val = $('.active_payment_method').attr('data-value')
        

    })
  

    $('.radio-group-delivery .radio-delivery-card').on('click',function(){
        // alert('function jalan')
        // alert('jalan')
        $(this).parent().find('.radio-delivery-card').removeClass('selected');
        $(this).parent().find('.radio-delivery-card').removeClass('active_payment_method');
        $('.radio-delivery-card').removeClass('selected')
        $('.radio-delivery-card').removeClass('active_payment_method')
        $(this).addClass('selected');
        $(this).addClass('active_payment_method');
    
        var val = $(this).attr('data-value');
        result = val
        var class_payment = $(this)
        
        var new_kurir_pilihan = $('.active_delivery_method').attr('data-value')
        
        kurirMethodHome(new_kurir_pilihan)
    })

    
      
   $('.cust-1').on('click',function(){
       
    //    $('.box-information').css('display','block')
    $('.box-information').show(1000)
    // SEARCH ITEM BACK TO NORMAL
    $('.box-render-search').css('display','none')
    $('.input-name').css('border-bottom-left-radius','10px')
    $('.input-name').css('border-bottom-right-radius','10px')
    $('.input-name').val(null)
    //    $('.box-customer').toggle('active')
   })

   $('.icon-close').on('click',function(){
    // $('.box-information').css('display','none')
       $('.box-information').hide(1000)
       
   })
   
  

   $('.profil-pic-div').on('mouseenter',function(){
        $('.upload-profile').css('display','flex')
   })
   $('.profil-pic-div').on('mouseleave',function(){
    $('.upload-profile').css('display','none')
    })

    

//    OPEN MODALS PROFILE

   
//    $('.option-4').on('click',function(){

    
//     var token = localStorage.getItem('token')
    
 
    
//         axios.post(`https://customers.sold.co.id/get-customer-information?Customer_Code=${token}`)
//         .then((res)=>{
//             // 
//             var data_customer = res.data
            
//             if(data_customer){
                
                
//                 if(data_customer.User_Type === 'Customer'){
//                     $('.btn-status-barang').css('display','none')
//                     $('.sup_delete').css('display','flex')
//                     $('.box-kumpulkan-profile').css('top','70px')

//                     $('#prof_perusahaan_nama').css('display','none')
//                     $('#prof_npwp').css('display','none')
//                     $('#prof_nik').css('display','none')
                    
//                     $('#prof_thn').css('display','flex')
//                     $('#prof_bln').css('display','flex')
//                     $('#prof_tgl').css('display','flex')
//                     $('#id_ref_code').css('visibility','show')

//                     // $('.sup_delete').css('left','20px')
//                 }else {
//                     $('.btn-status-barang').css('display','block')
//                     $('.sup_delete').css('display','none')
//                     $('.box-kumpulkan-profile').css('top','0px')
//                     $('#id_ref_code').css('visibility','hidden')

//                     $('#prof_perusahaan_nama').css('display','flex')
//                     $('#prof_npwp').css('display','flex')
//                     $('#prof_nik').css('display','flex')
                    
//                     $('#prof_thn').css('display','none')
//                     $('#prof_bln').css('display','none')
//                     $('#prof_tgl').css('display','none')
                    
//                 }

                
    
//                 var tahun = data_customer.Birthday.slice(0,4)
//                 var bulan = data_customer.Birthday.slice(5,7)
//                 var hari = data_customer.Birthday.slice(8,10)
//                 var newReferralCode = data_customer.Customer_Code
                
                
//                 $('#email_user').val(`${data_customer.Email}`)
//                 $('.nama_user_profile').val(`${data_customer.First_Name}`)
//                 $('#tahun_lahir_user').val(tahun)
//                 $('#bulan_lahir_user').val(bulan)
//                 $('#tanggal_lahir_user').val(hari)
//                 $('#nama_depan_user').val(`${data_customer.First_Name}`)
//                 $('#nama_belakang_user').val(`${data_customer.Last_Name}`)
//                 $('#no_telp1_user').val(`${data_customer.Contact_Number_1}`)
//                 $('#no_telp2_user').val(`${data_customer.Contact_Number_2}`)
//                 // $('#alamat_lengkap1_user').val(`${data_customer.Address_1}`)
//                 // $('#alamat_lengkap2_user').val(`${data_customer.Address_2}`)
//                 // $('#alamat_lengkap3_user').val(`${data_customer.Address_3}`)
//                 // $('#alamat_lengkap4_user').val(`${data_customer.Address_4}`)
//                 // $('#alamat_lengkap5_user').val(`${data_customer.Address_5}`)
//                 $('#rekening_user').val(`${data_customer.bank_account_number}`)
//                 $('#referral-profile').val(`${data_customer.extra_column_2}`)
//                 $('#no_ktp_user').val(`${data_customer.ktp}`)
//                 $('.ref-profile').val(token)
//                 $('#npwp_supp_prof').val(data_customer.npwp)
                
                
//                 $('#nama_perusahaan_profile').val(data_customer.Nama_Perusahaan)
//                 $('#nik_supp_profile').val(data_customer.extra_column_5)
//                 $('#ref_code_from').val(data_customer.referral_customer_code)
//                 var a = $('#refer-profile').val()
                
//                 $('#profileModal').modal('show')
//                 $('.box-tambah-alamat').empty()
                
//                 if(data_customer.Address_1 == 'undefined'){
//                     // 
//                 }else{
//                     $('.box-tambah-alamat').append(`
//                     <div class="login-name-3">
//                         <div class="box-name">
//                             <p>Alamat Lengkap</p>
//                         </div>
//                         <input type="text" class="form-reg-nama" value="${data_customer.Address_1}"  minlength="4" maxlength="15" id="alamat_lengkap1_user">
//                     </div> 
//                     `)
//                     // 
//                 }
//                 if(data_customer.Address_2 == 'undefined'){
//                     // 
//                 }else{
//                     $('.box-tambah-alamat').append(`
//                     <div class="login-name-3">
//                         <div class="box-name">
//                             <p>Alamat Lengkap</p>
//                         </div>
//                         <input type="text" class="form-reg-nama" val="${data_customer.Address_2}" placeholder="Alamat Lengkap" minlength="4" maxlength="15" id="alamat_lengkap2_user">
//                     </div> 
//                     `)
//                     // 
//                 }
//                 if(data_customer.Address_3 == 'undefined'){
//                     // 
//                 }else{
//                     $('.box-tambah-alamat').append(`
//                     <div class="login-name-3">
//                         <div class="box-name">
//                             <p>Alamat Lengkap</p>
//                         </div>
//                         <input type="text" class="form-reg-nama" val="${data_customer.Address_3}" placeholder="Alamat Lengkap" minlength="4" maxlength="15" id="alamat_lengkap3_user">
//                     </div> 
//                     `)
//                     // 
//                 }
//                 if(data_customer.Address_4 == 'undefined'){
//                     // 
//                 }else{
//                     $('.box-tambah-alamat').append(`
//                     <div class="login-name-3">
//                         <div class="box-name">
//                             <p>Alamat Lengkap</p>
//                         </div>
//                         <input type="text" class="form-reg-nama" val="${data_customer.Address_4}" placeholder="Alamat Lengkap" minlength="4" maxlength="15" id="alamat_lengkap4_user">
//                     </div> 
//                     `)
//                     // 
//                 }
//                 if(data_customer.Address_5 == 'undefined'){
//                     // 
//                 }else{
//                     $('.box-tambah-alamat').append(`
//                     <div class="login-name-3">
//                         <div class="box-name">
//                             <p>Alamat Lengkap</p>
//                         </div>
//                         <input type="text" class="form-reg-nama" val="${data_customer.Address_5}" placeholder="Alamat Lengkap" minlength="4" maxlength="15" id="alamat_lengkap5_user">
//                     </div> 
//                     `)
//                     // 
//                 }


//             }else {
                
//                 // $('#loginModal').modal('show') // login lama
                
//                 $('#newloginModal').modal('show') // login lama
//                 $('.box_information_login').css('display','flex')
//             }
//         }).catch((err)=>{
//             // 
//         })

//         $('.closeByLogin').css('display','none')
//         $('.option-0').removeClass("background_grey")
//         $('.option-1').removeClass("background_grey")
//         $('.option-2').removeClass("background_grey")
//         $('.option-3').removeClass("background_grey")
//           // SEARCH ITEM BACK TO NORMAL
//         $('.box-render-search').css('display','none')
//         $('.input-name').css('border-bottom-left-radius','10px')
//         $('.input-name').css('border-bottom-right-radius','10px')
//         // $('.option-4').removeClass("background_grey")
        
//    })

   $('.category-name').on('click',function(){
        $('.closeByLogin').css('display','none')
        $('.option-0').removeClass("background_grey")
        $('.option-1').removeClass("background_grey")
        $('.option-2').removeClass("background_grey")
        $('.option-3').removeClass("background_grey")
        
   })


   $('.prod_code_tab').on('keyup',function(){
    var item = $(this).val()
    
    var token= localStorage.getItem('token')
    axios.post(`https://customers.sold.co.id/get-customer-information?Customer_Code=${token}`)
    .then((res)=>{
        
        var Customer_Code = res.data.Customer_Code
        var all_data;
        axios.post(`https://products.sold.co.id/get-products-belong-to-the-supplier?Creator=${Customer_Code}`)
        .then((res)=>{
            all_data = res.data

            var data_array = res.data
            var data_cari  = data_array.filter((val)=>{
                return val.Product_Code.includes(item)
            })
            $('.tbody_product').empty()
            if(item){
                data_cari.map((val,index)=>{
                    $('.tbody_product').append(`
                        <tr>
                            <td >
                                <p onclick="to_detail_product('${val.Product_Code}')" class="p_code"> ${val.Product_Code}</p>
                            </td>
                            <td>
                                <div class="box-prod-name hvr-grow">
                                    <input type="text" disabled class="prod_name" value="${val.Name}" id="${val.Product_Code}-name">
                                    <div class="box-name-edit" id="${val.Product_Code}-box_edit_name">
                                        <i class="fas fa-edit icon-edit-prod"  id="${val.Product_Code}-edit" onclick="edit_product_name('${val.Product_Code}')"></i>
                                        <p class="save-prod"> EDIT</p>
                                    </div>    
                                    <div class="box-name-save" style="display:none" id="${val.Product_Code}-save_name">
                                        <i class="fas fa-check-square icon-save-prod" onclick="save_edit_name('${val.Product_Code}')"></i>
                                        <p class="save-prod"> SAVE</p >
                                    </div>      
                                </div>
                            </td>
                            <td>
                                <div class="box-prod-name hvr-grow">
                                    <input type="text" disabled class="prod_sell" value="${val.Sell_Price}" id="${val.Product_Code}-harga">
                                    <div class="box-name-edit" id="${val.Product_Code}-box_edit_harga">
                                        <i class="fas fa-edit icon-edit-prod"  id="${val.Product_Code}-edit" onclick="edit_product_harga('${val.Product_Code}')"></i>
                                        <p class="save-prod"> EDIT</p>
                                    </div>   
                                    <div class="box-name-save" style="display:none" id="${val.Product_Code}-save_harga">
                                        <i class="fas fa-check-square icon-save-prod" onclick="save_edit_harga('${val.Product_Code}')"></i>
                                        <p class="save-prod"> SAVE</p >
                                    </div>   
                                
                                </div>
                            </td>
                            <td>
                                <div class="box-prod-name hvr-grow">
                                    <input type="text" disabled class="prod_qty" value="${val.Stock_Quantity}"id="${val.Product_Code}-qty">
                                    <div class="box-name-edit" id="${val.Product_Code}-box_edit_qty">
                                        <i class="fas fa-edit icon-edit-prod"  id="${val.Product_Code}-edit" onclick="edit_product_qty('${val.Product_Code}')"></i>
                                        <p class="save-prod"> EDIT</p>
                                    </div>   
                                    <div class="box-name-save" style="display:none" id="${val.Product_Code}-save_qty">
                                        <i class="fas fa-check-square icon-save-prod" onclick="save_edit_qty('${val.Product_Code}')"></i>
                                        <p class="save-prod"> SAVE</p >
                                    </div>   
                                    
                                </div>
                            </td>
                            <td>${val.Last_Updated}</td>
                        </tr>
                    `)
                })
            }else {
                all_data.map((val,index)=>{
                    $('.tbody_product').append(`
                    <tr>
                        <td >
                            <p onclick="to_detail_product('${val.Product_Code}')" class="p_code"> ${val.Product_Code}</p>
                        </td>
                        <td>
                            <div class="box-prod-name hvr-grow">
                                <input type="text" disabled class="prod_name" value="${val.Name}" id="${val.Product_Code}-name">
                                <div class="box-name-edit" id="${val.Product_Code}-box_edit_name">
                                    <i class="fas fa-edit icon-edit-prod"  id="${val.Product_Code}-edit" onclick="edit_product_name('${val.Product_Code}')"></i>
                                    <p class="save-prod"> EDIT</p>
                                </div>    
                                <div class="box-name-save" style="display:none" id="${val.Product_Code}-save_name">
                                    <i class="fas fa-check-square icon-save-prod" onclick="save_edit_name('${val.Product_Code}')"></i>
                                    <p class="save-prod"> SAVE</p >
                                </div>      
                            </div>
                        </td>
                        <td>
                            <div class="box-prod-name hvr-grow">
                                <input type="text" disabled class="prod_sell" value="${val.Sell_Price}" id="${val.Product_Code}-harga">
                                <div class="box-name-edit" id="${val.Product_Code}-box_edit_harga">
                                    <i class="fas fa-edit icon-edit-prod"  id="${val.Product_Code}-edit" onclick="edit_product_harga('${val.Product_Code}')"></i>
                                    <p class="save-prod"> EDIT</p>
                                </div>   
                                <div class="box-name-save" style="display:none" id="${val.Product_Code}-save_harga">
                                    <i class="fas fa-check-square icon-save-prod" onclick="save_edit_harga('${val.Product_Code}')"></i>
                                    <p class="save-prod"> SAVE</p >
                                </div>   
                               
                            </div>
                        </td>
                        <td>
                            <div class="box-prod-name hvr-grow">
                                <input type="text" disabled class="prod_qty" value="${val.Stock_Quantity}"id="${val.Product_Code}-qty">
                                <div class="box-name-edit" id="${val.Product_Code}-box_edit_qty">
                                    <i class="fas fa-edit icon-edit-prod"  id="${val.Product_Code}-edit" onclick="edit_product_qty('${val.Product_Code}')"></i>
                                    <p class="save-prod"> EDIT</p>
                                </div>   
                                <div class="box-name-save" style="display:none" id="${val.Product_Code}-save_qty">
                                    <i class="fas fa-check-square icon-save-prod" onclick="save_edit_qty('${val.Product_Code}')"></i>
                                    <p class="save-prod"> SAVE</p >
                                </div>   
                                
                            </div>
                        </td>
                        <td>${val.Last_Updated}</td>
                    </tr>
                    `)
                })
            }

            }).catch((err)=>{
                
            })

        }).catch((err)=>{
            
        })

    })
  
   $('.input-product').on('keyup',function(){
        var item_search = $(this).val()
        
        var token = localStorage.getItem('token')
        axios.post(`https://customers.sold.co.id/get-customer-information?Customer_Code=${token}`)
        .then((res)=>{
            var Customer_Code = res.data.Customer_Code
            var all_data
            axios.post(`https://products.sold.co.id/get-products-belong-to-the-supplier?Creator=${Customer_Code}`)
            .then((res)=>{
                all_data = res.data
                
                var data_array = res.data
                var data_cari = data_array.filter((val)=>{
                    return val.Product_Code.includes(item_search)
                })
                $('.tbody_detail_product').empty()
                $('.input_total_row_gb').val('TOTAL ROW = ' + data_cari.length)
                if(data_cari){
                    data_cari.map((val,index)=>{
                        if(val.GroupBuy_Purchase === 'true'){
                            if(val.GroupBuy_SellPrice === 'NULL'  && val.GroupBuy_SellQuantity === 'NULL'){
                                $('.tbody_detail_product').append(`
                                     <tr class="tr_detail_prod">
                                         <td>
                                             <div class="box-switch">
                                                 <input type="checkbox" class="detail_prod_input" checked data-toggle="toggle" id="${val.Product_Code}-status" onclick="change_status_otp('${val.Product_Code}')">
                                             </div> 
                                         </td>
                                         <td>
                                             <div class="br-option">
                                                 <div class="br-option-input">
                                                     <input type="text" class="form_product detail_prod_input" disabled value="${val.Product_Code}" id="${val.Product_Code}-pCode">     
                                                 </div>
                                             </div>
                                         </td>
                                         <td>
                                             <div class="br-option">
                                                 <div class="br-option-input">
                                                     <input type="text" class="form_product detail_prod_input" disabled value="${val.Name}" id="${val.Product_Code}-pName">
                                                     
                                                 </div>             
                                             </div>
                                         </td>
                                         <td>
                                             <div class="br-option">
                                                 <div class="br-option-input">
                                                     <input type="text" class="form_product-2 detail_prod_input" id="${val.Product_Code}-discount" disabled value="0">
                                                     <div class="box-name-edit" id="${val.Product_Code}-box_edit_discount">
                                                         <i class="fas fa-edit icon-edit edit-discount" id="${val.Product_Code}-edit" onclick="edit_product_discount('${val.Product_Code}')"></i>
                                                         
                                                     </div>
                                                     <div class="box-name-save detail_prod_input" style="display:none" id="${val.Product_Code}-save_discount">
                                                         <i class="fas fa-check-square icon-save-discount" onclick="save_edit_discount('${val.Product_Code}')"></i>
                                                         
                                                     </div>   
                                                 </div>
                                             </div>
                                         </td>
                                         <td>
                                             <div class="br-option">
                                                 <div class="br-option-input">
                                                     <input type="text" class="form_product-2 detail_prod_input" id="${val.Product_Code}-quantity" disabled value="0">
                                                     <div class="box-name-edit" id="${val.Product_Code}-box_edit_quantity">
                                                         <i class="fas fa-edit icon-edit"  id="${val.Product_Code}-edit" onclick="edit_product_quantity('${val.Product_Code}')"></i>
                                                         
                                                     </div>  
                                                     <div class="box-name-save" style="display:none" id="${val.Product_Code}-save_quantity">
                                                         <i class="fas fa-check-square icon-save-discount" onclick="save_edit_quantity('${val.Product_Code}')"></i>
                                                         
                                                     </div>            
                                                 </div>
                                             </div>
                                         </td>
                                     </tr>     
                                     `) 
                            }else if (val.GroupBuy_SellQuantity === 'NULL'){
                                $('.tbody_detail_product').append(`
                                     <tr class="tr_detail_prod">
                                         <td>
                                             <div class="box-switch">
                                                 <input type="checkbox" class="detail_prod_input" checked data-toggle="toggle" id="${val.Product_Code}-status" onclick="change_status_otp('${val.Product_Code}')">
                                             </div> 
                                         </td>
                                         <td>
                                             <div class="br-option">
                                                 <div class="br-option-input">
                                                     <input type="text" class="form_product detail_prod_input" disabled value="${val.Product_Code}" id="${val.Product_Code}-pCode">     
                                                 </div>
                                             </div>
                                         </td>
                                         <td>
                                             <div class="br-option">
                                                 <div class="br-option-input">
                                                     <input type="text" class="form_product detail_prod_input" disabled value="${val.Name}" id="${val.Product_Code}-pName">
                                                     
                                                 </div>             
                                             </div>
                                         </td>
                                         <td>
                                             <div class="br-option">
                                                 <div class="br-option-input">
                                                     <input type="text" class="form_product-2 detail_prod_input" id="${val.Product_Code}-discount" disabled value="0">
                                                     <div class="box-name-edit" id="${val.Product_Code}-box_edit_discount">
                                                         <i class="fas fa-edit icon-edit edit-discount" id="${val.Product_Code}-edit" onclick="edit_product_discount('${val.Product_Code}')"></i>
                                                         
                                                     </div>
                                                     <div class="box-name-save detail_prod_input" style="display:none" id="${val.Product_Code}-save_discount">
                                                         <i class="fas fa-check-square icon-save-discount" onclick="save_edit_discount('${val.Product_Code}')"></i>
                                                         
                                                     </div>   
                                                 </div>
                                             </div>
                                         </td>
                                         <td>
                                             <div class="br-option">
                                                 <div class="br-option-input">
                                                     <input type="text" class="form_product-2 detail_prod_input" id="${val.Product_Code}-quantity" disabled value="0">
                                                     <div class="box-name-edit" id="${val.Product_Code}-box_edit_quantity">
                                                         <i class="fas fa-edit icon-edit"  id="${val.Product_Code}-edit" onclick="edit_product_quantity('${val.Product_Code}')"></i>
                                                         
                                                     </div>  
                                                     <div class="box-name-save" style="display:none" id="${val.Product_Code}-save_quantity">
                                                         <i class="fas fa-check-square icon-save-discount" onclick="save_edit_quantity('${val.Product_Code}')"></i>
                                                         
                                                     </div>            
                                                 </div>
                                             </div>
                                         </td>
                                     </tr>     
                                     `) 
                            }else {
                                $('.tbody_detail_product').append(`
                                     <tr class="tr_detail_prod">
                                         <td>
                                             <div class="box-switch">
                                                 <input type="checkbox" class="detail_prod_input" checked data-toggle="toggle" id="${val.Product_Code}-status" onclick="change_status_otp('${val.Product_Code}')">
                                             </div> 
                                         </td>
                                         <td>
                                             <div class="br-option">
                                                 <div class="br-option-input">
                                                     <input type="text" class="form_product detail_prod_input" disabled value="${val.Product_Code}" id="${val.Product_Code}-pCode">     
                                                 </div>
                                             </div>
                                         </td>
                                         <td>
                                             <div class="br-option">
                                                 <div class="br-option-input">
                                                     <input type="text" class="form_product detail_prod_input" disabled value="${val.Name}" id="${val.Product_Code}-pName">
                                                     
                                                 </div>             
                                             </div>
                                         </td>
                                         <td>
                                             <div class="br-option">
                                                 <div class="br-option-input">
                                                     <input type="text" class="form_product-2 detail_prod_input" id="${val.Product_Code}-discount" disabled value="0">
                                                     <div class="box-name-edit" id="${val.Product_Code}-box_edit_discount">
                                                         <i class="fas fa-edit icon-edit edit-discount" id="${val.Product_Code}-edit" onclick="edit_product_discount('${val.Product_Code}')"></i>
                                                         
                                                     </div>
                                                     <div class="box-name-save detail_prod_input" style="display:none" id="${val.Product_Code}-save_discount">
                                                         <i class="fas fa-check-square icon-save-discount" onclick="save_edit_discount('${val.Product_Code}')"></i>
                                                         
                                                     </div>   
                                                 </div>
                                             </div>
                                         </td>
                                         <td>
                                             <div class="br-option">
                                                 <div class="br-option-input">
                                                     <input type="text" class="form_product-2 detail_prod_input" id="${val.Product_Code}-quantity" disabled value="${val.GroupBuy_SellQuantity}">
                                                     <div class="box-name-edit" id="${val.Product_Code}-box_edit_quantity">
                                                         <i class="fas fa-edit icon-edit"  id="${val.Product_Code}-edit" onclick="edit_product_quantity('${val.Product_Code}')"></i>
                                                         
                                                     </div>  
                                                     <div class="box-name-save" style="display:none" id="${val.Product_Code}-save_quantity">
                                                         <i class="fas fa-check-square icon-save-discount" onclick="save_edit_quantity('${val.Product_Code}')"></i>
                                                         
                                                     </div>            
                                                 </div>
                                             </div>
                                         </td>
                                     </tr>     
                                     `) 
                            }
                        }else {
                            if(val.GroupBuy_SellPrice === 'NULL' && val.GroupBuy_SellQuantity === 'NULL'  ){
                                $('.tbody_detail_product').append(`
                                     <tr class="tr_detail_prod">
                                         <td>
                                             <div class="box-switch">
                                                 <input type="checkbox" class="detail_prod_input"  data-toggle="toggle" id="${val.Product_Code}-status" onclick="change_status_otp('${val.Product_Code}')">
                                             </div> 
                                         </td>
                                         <td>
                                             <div class="br-option">
                                                 <div class="br-option-input">
                                                     <input type="text" class="form_product detail_prod_input" disabled value="${val.Product_Code}" id="${val.Product_Code}-pCode">     
                                                 </div>
                                             </div>
                                         </td>
                                         <td>
                                             <div class="br-option">
                                                 <div class="br-option-input">
                                                     <input type="text" class="form_product detail_prod_input" disabled value="${val.Name}" id="${val.Product_Code}-pName">
                                                     
                                                 </div>             
                                             </div>
                                         </td>
                                         <td>
                                             <div class="br-option">
                                                 <div class="br-option-input">
                                                     <input type="text" class="form_product-2 detail_prod_input" id="${val.Product_Code}-discount" disabled value="0">
                                                     <div class="box-name-edit" id="${val.Product_Code}-box_edit_discount">
                                                         <i class="fas fa-edit icon-edit edit-discount" id="${val.Product_Code}-edit" onclick="edit_product_discount('${val.Product_Code}')"></i>
                                                         
                                                     </div>
                                                     <div class="box-name-save detail_prod_input" style="display:none" id="${val.Product_Code}-save_discount">
                                                         <i class="fas fa-check-square icon-save-discount" onclick="save_edit_discount('${val.Product_Code}')"></i>
                                                         
                                                     </div>   
                                                 </div>
                                             </div>
                                         </td>
                                         <td>
                                             <div class="br-option">
                                                 <div class="br-option-input">
                                                     <input type="text" class="form_product-2 detail_prod_input" id="${val.Product_Code}-quantity" disabled value="0">
                                                     <div class="box-name-edit" id="${val.Product_Code}-box_edit_quantity">
                                                         <i class="fas fa-edit icon-edit"  id="${val.Product_Code}-edit" onclick="edit_product_quantity('${val.Product_Code}')"></i>
                                                         
                                                     </div>  
                                                     <div class="box-name-save" style="display:none" id="${val.Product_Code}-save_quantity">
                                                         <i class="fas fa-check-square icon-save-discount" onclick="save_edit_quantity('${val.Product_Code}')"></i>
                                                         
                                                     </div>            
                                                 </div>
                                             </div>
                                         </td>
                                     </tr>     
                                     `) 
                            }else if (val.GroupBuy_SellQuantity === 'NULL'){
                                $('.tbody_detail_product').append(`
                                     <tr class="tr_detail_prod">
                                         <td>
                                             <div class="box-switch">
                                                 <input type="checkbox" class="detail_prod_input"  data-toggle="toggle" id="${val.Product_Code}-status" onclick="change_status_otp('${val.Product_Code}')">
                                             </div> 
                                         </td>
                                         <td>
                                             <div class="br-option">
                                                 <div class="br-option-input">
                                                     <input type="text" class="form_product detail_prod_input" disabled value="${val.Product_Code}" id="${val.Product_Code}-pCode">     
                                                 </div>
                                             </div>
                                         </td>
                                         <td>
                                             <div class="br-option">
                                                 <div class="br-option-input">
                                                     <input type="text" class="form_product detail_prod_input" disabled value="${val.Name}" id="${val.Product_Code}-pName">
                                                     
                                                 </div>             
                                             </div>
                                         </td>
                                         <td>
                                             <div class="br-option">
                                                 <div class="br-option-input">
                                                     <input type="text" class="form_product-2 detail_prod_input" id="${val.Product_Code}-discount" disabled value="0">
                                                     <div class="box-name-edit" id="${val.Product_Code}-box_edit_discount">
                                                         <i class="fas fa-edit icon-edit edit-discount" id="${val.Product_Code}-edit" onclick="edit_product_discount('${val.Product_Code}')"></i>
                                                         
                                                     </div>
                                                     <div class="box-name-save detail_prod_input" style="display:none" id="${val.Product_Code}-save_discount">
                                                         <i class="fas fa-check-square icon-save-discount" onclick="save_edit_discount('${val.Product_Code}')"></i>
                                                         
                                                     </div>   
                                                 </div>
                                             </div>
                                         </td>
                                         <td>
                                             <div class="br-option">
                                                 <div class="br-option-input">
                                                     <input type="text" class="form_product-2 detail_prod_input" id="${val.Product_Code}-quantity" disabled value="${val.GroupBuy_SellQuantity}">
                                                     <div class="box-name-edit" id="${val.Product_Code}-box_edit_quantity">
                                                         <i class="fas fa-edit icon-edit"  id="${val.Product_Code}-edit" onclick="edit_product_quantity('${val.Product_Code}')"></i>
                                                         
                                                     </div>  
                                                     <div class="box-name-save" style="display:none" id="${val.Product_Code}-save_quantity">
                                                         <i class="fas fa-check-square icon-save-discount" onclick="save_edit_quantity('${val.Product_Code}')"></i>
                                                         
                                                     </div>            
                                                 </div>
                                             </div>
                                         </td>
                                     </tr>     
                                     `) 
                            }else {
                                $('.tbody_detail_product').append(`
                                <tr class="tr_detail_prod">
                                    <td>
                                        <div class="box-switch">
                                            <input type="checkbox" class="detail_prod_input"  data-toggle="toggle" id="${val.Product_Code}-status" onclick="change_status_otp('${val.Product_Code}')">
                                        </div> 
                                    </td>
                                    <td>
                                        <div class="br-option">
                                            <div class="br-option-input">
                                                <input type="text" class="form_product detail_prod_input" disabled value="${val.Product_Code}" id="${val.Product_Code}-pCode">     
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="br-option">
                                            <div class="br-option-input">
                                                <input type="text" class="form_product detail_prod_input" disabled value="${val.Name}" id="${val.Product_Code}-pName">
                                                
                                            </div>             
                                        </div>
                                    </td>
                                    <td>
                                        <div class="br-option">
                                            <div class="br-option-input">
                                                <input type="text" class="form_product-2 detail_prod_input" id="${val.Product_Code}-discount" disabled value="${val.GroupBuy_SellPrice}">
                                                <div class="box-name-edit" id="${val.Product_Code}-box_edit_discount">
                                                    <i class="fas fa-edit icon-edit edit-discount" id="${val.Product_Code}-edit" onclick="edit_product_discount('${val.Product_Code}')"></i>
                                                    
                                                </div>
                                                <div class="box-name-save detail_prod_input" style="display:none" id="${val.Product_Code}-save_discount">
                                                    <i class="fas fa-check-square icon-save-discount" onclick="save_edit_discount('${val.Product_Code}')"></i>
                                                    
                                                </div>   
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="br-option">
                                            <div class="br-option-input">
                                                <input type="text" class="form_product-2 detail_prod_input" id="${val.Product_Code}-quantity" disabled value="0">
                                                <div class="box-name-edit" id="${val.Product_Code}-box_edit_quantity">
                                                    <i class="fas fa-edit icon-edit"  id="${val.Product_Code}-edit" onclick="edit_product_quantity('${val.Product_Code}')"></i>
                                                    
                                                </div>  
                                                <div class="box-name-save" style="display:none" id="${val.Product_Code}-save_quantity">
                                                    <i class="fas fa-check-square icon-save-discount" onclick="save_edit_quantity('${val.Product_Code}')"></i>
                                                    
                                                </div>            
                                            </div>
                                        </div>
                                    </td>
                                </tr>     
                                `) 
                               
                            }
                        }
                    })
                }else {
                    $('.input_total_row_gb').val('TOTAL ROW = ' + all_data.length)
                    all_data.map((val,index)=>{
                        if(val.GroupBuy_Purchase === 'true'){
                            if(val.GroupBuy_SellPrice === 'NULL'  && val.GroupBuy_SellQuantity === 'NULL'){
                                $('.tbody_detail_product').append(`
                                     <tr class="tr_detail_prod">
                                         <td>
                                             <div class="box-switch">
                                                 <input type="checkbox" class="detail_prod_input" checked data-toggle="toggle" id="${val.Product_Code}-status" onclick="change_status_otp('${val.Product_Code}')">
                                             </div> 
                                         </td>
                                         <td>
                                             <div class="br-option">
                                                 <div class="br-option-input">
                                                     <input type="text" class="form_product detail_prod_input" disabled value="${val.Product_Code}" id="${val.Product_Code}-pCode">     
                                                 </div>
                                             </div>
                                         </td>
                                         <td>
                                             <div class="br-option">
                                                 <div class="br-option-input">
                                                     <input type="text" class="form_product detail_prod_input" disabled value="${val.Name}" id="${val.Product_Code}-pName">
                                                     
                                                 </div>             
                                             </div>
                                         </td>
                                         <td>
                                             <div class="br-option">
                                                 <div class="br-option-input">
                                                     <input type="text" class="form_product-2 detail_prod_input" id="${val.Product_Code}-discount" disabled value="0">
                                                     <div class="box-name-edit" id="${val.Product_Code}-box_edit_discount">
                                                         <i class="fas fa-edit icon-edit edit-discount" id="${val.Product_Code}-edit" onclick="edit_product_discount('${val.Product_Code}')"></i>
                                                         
                                                     </div>
                                                     <div class="box-name-save detail_prod_input" style="display:none" id="${val.Product_Code}-save_discount">
                                                         <i class="fas fa-check-square icon-save-discount" onclick="save_edit_discount('${val.Product_Code}')"></i>
                                                         
                                                     </div>   
                                                 </div>
                                             </div>
                                         </td>
                                         <td>
                                             <div class="br-option">
                                                 <div class="br-option-input">
                                                     <input type="text" class="form_product-2 detail_prod_input" id="${val.Product_Code}-quantity" disabled value="0">
                                                     <div class="box-name-edit" id="${val.Product_Code}-box_edit_quantity">
                                                         <i class="fas fa-edit icon-edit"  id="${val.Product_Code}-edit" onclick="edit_product_quantity('${val.Product_Code}')"></i>
                                                         
                                                     </div>  
                                                     <div class="box-name-save" style="display:none" id="${val.Product_Code}-save_quantity">
                                                         <i class="fas fa-check-square icon-save-discount" onclick="save_edit_quantity('${val.Product_Code}')"></i>
                                                         
                                                     </div>            
                                                 </div>
                                             </div>
                                         </td>
                                     </tr>     
                                     `) 
                            }else if (val.GroupBuy_SellQuantity === 'NULL'){
                                $('.tbody_detail_product').append(`
                                     <tr class="tr_detail_prod">
                                         <td>
                                             <div class="box-switch">
                                                 <input type="checkbox" class="detail_prod_input" checked data-toggle="toggle" id="${val.Product_Code}-status" onchange="get_status(this,'${val.Product_Code}')">
                                             </div> 
                                         </td>
                                         <td>
                                             <div class="br-option">
                                                 <div class="br-option-input">
                                                     <input type="text" class="form_product detail_prod_input" disabled value="${val.Product_Code}" id="${val.Product_Code}-pCode">     
                                                 </div>
                                             </div>
                                         </td>
                                         <td>
                                             <div class="br-option">
                                                 <div class="br-option-input">
                                                     <input type="text" class="form_product detail_prod_input" disabled value="${val.Name}" id="${val.Product_Code}-pName">
                                                     
                                                 </div>             
                                             </div>
                                         </td>
                                         <td>
                                             <div class="br-option">
                                                 <div class="br-option-input">
                                                     <input type="text" class="form_product-2 detail_prod_input" id="${val.Product_Code}-discount" disabled value="0">
                                                     <div class="box-name-edit" id="${val.Product_Code}-box_edit_discount">
                                                         <i class="fas fa-edit icon-edit edit-discount" id="${val.Product_Code}-edit" onclick="edit_product_discount('${val.Product_Code}')"></i>
                                                         
                                                     </div>
                                                     <div class="box-name-save detail_prod_input" style="display:none" id="${val.Product_Code}-save_discount">
                                                         <i class="fas fa-check-square icon-save-discount" onclick="save_edit_discount('${val.Product_Code}')"></i>
                                                         
                                                     </div>   
                                                 </div>
                                             </div>
                                         </td>
                                         <td>
                                             <div class="br-option">
                                                 <div class="br-option-input">
                                                     <input type="text" class="form_product-2 detail_prod_input" id="${val.Product_Code}-quantity" disabled value="0">
                                                     <div class="box-name-edit" id="${val.Product_Code}-box_edit_quantity">
                                                         <i class="fas fa-edit icon-edit"  id="${val.Product_Code}-edit" onclick="edit_product_quantity('${val.Product_Code}')"></i>
                                                         
                                                     </div>  
                                                     <div class="box-name-save" style="display:none" id="${val.Product_Code}-save_quantity">
                                                         <i class="fas fa-check-square icon-save-discount" onclick="save_edit_quantity('${val.Product_Code}')"></i>
                                                         
                                                     </div>            
                                                 </div>
                                             </div>
                                         </td>
                                     </tr>     
                                     `) 
                            }else {
                                $('.tbody_detail_product').append(`
                                     <tr class="tr_detail_prod">
                                         <td>
                                             <div class="box-switch">
                                                 <input type="checkbox" class="detail_prod_input" checked data-toggle="toggle" id="${val.Product_Code}-status" onchange="get_status('${val.Product_Code}')">
                                             </div> 
                                         </td>
                                         <td>
                                             <div class="br-option">
                                                 <div class="br-option-input">
                                                     <input type="text" class="form_product detail_prod_input" disabled value="${val.Product_Code}" id="${val.Product_Code}-pCode">     
                                                 </div>
                                             </div>
                                         </td>
                                         <td>
                                             <div class="br-option">
                                                 <div class="br-option-input">
                                                     <input type="text" class="form_product detail_prod_input" disabled value="${val.Name}" id="${val.Product_Code}-pName">
                                                     
                                                 </div>             
                                             </div>
                                         </td>
                                         <td>
                                             <div class="br-option">
                                                 <div class="br-option-input">
                                                     <input type="text" class="form_product-2 detail_prod_input" id="${val.Product_Code}-discount" disabled value="0">
                                                     <div class="box-name-edit" id="${val.Product_Code}-box_edit_discount">
                                                         <i class="fas fa-edit icon-edit edit-discount" id="${val.Product_Code}-edit" onclick="edit_product_discount('${val.Product_Code}')"></i>
                                                         
                                                     </div>
                                                     <div class="box-name-save detail_prod_input" style="display:none" id="${val.Product_Code}-save_discount">
                                                         <i class="fas fa-check-square icon-save-discount" onclick="save_edit_discount('${val.Product_Code}')"></i>
                                                         
                                                     </div>   
                                                 </div>
                                             </div>
                                         </td>
                                         <td>
                                             <div class="br-option">
                                                 <div class="br-option-input">
                                                     <input type="text" class="form_product-2 detail_prod_input" id="${val.Product_Code}-quantity" disabled value="${val.GroupBuy_SellQuantity}">
                                                     <div class="box-name-edit" id="${val.Product_Code}-box_edit_quantity">
                                                         <i class="fas fa-edit icon-edit"  id="${val.Product_Code}-edit" onclick="edit_product_quantity('${val.Product_Code}')"></i>
                                                         
                                                     </div>  
                                                     <div class="box-name-save" style="display:none" id="${val.Product_Code}-save_quantity">
                                                         <i class="fas fa-check-square icon-save-discount" onclick="save_edit_quantity('${val.Product_Code}')"></i>
                                                         
                                                     </div>            
                                                 </div>
                                             </div>
                                         </td>
                                     </tr>     
                                     `) 
                            }
                        }else {
                            if(val.GroupBuy_SellPrice === 'NULL' && val.GroupBuy_SellQuantity === 'NULL'  ){
                                $('.tbody_detail_product').append(`
                                     <tr class="tr_detail_prod">
                                         <td>
                                             <div class="box-switch">
                                                 <input type="checkbox" class="detail_prod_input"  data-toggle="toggle" id="${val.Product_Code}-status" onchange="get_status('${val.Product_Code}')">
                                             </div> 
                                         </td>
                                         <td>
                                             <div class="br-option">
                                                 <div class="br-option-input">
                                                     <input type="text" class="form_product detail_prod_input" disabled value="${val.Product_Code}" id="${val.Product_Code}-pCode">     
                                                 </div>
                                             </div>
                                         </td>
                                         <td>
                                             <div class="br-option">
                                                 <div class="br-option-input">
                                                     <input type="text" class="form_product detail_prod_input" disabled value="${val.Name}" id="${val.Product_Code}-pName">
                                                     
                                                 </div>             
                                             </div>
                                         </td>
                                         <td>
                                             <div class="br-option">
                                                 <div class="br-option-input">
                                                     <input type="text" class="form_product-2 detail_prod_input" id="${val.Product_Code}-discount" disabled value="0">
                                                     <div class="box-name-edit" id="${val.Product_Code}-box_edit_discount">
                                                         <i class="fas fa-edit icon-edit edit-discount" id="${val.Product_Code}-edit" onclick="edit_product_discount('${val.Product_Code}')"></i>
                                                         
                                                     </div>
                                                     <div class="box-name-save detail_prod_input" style="display:none" id="${val.Product_Code}-save_discount">
                                                         <i class="fas fa-check-square icon-save-discount" onclick="save_edit_discount('${val.Product_Code}')"></i>
                                                         
                                                     </div>   
                                                 </div>
                                             </div>
                                         </td>
                                         <td>
                                             <div class="br-option">
                                                 <div class="br-option-input">
                                                     <input type="text" class="form_product-2 detail_prod_input" id="${val.Product_Code}-quantity" disabled value="0">
                                                     <div class="box-name-edit" id="${val.Product_Code}-box_edit_quantity">
                                                         <i class="fas fa-edit icon-edit"  id="${val.Product_Code}-edit" onclick="edit_product_quantity('${val.Product_Code}')"></i>
                                                         
                                                     </div>  
                                                     <div class="box-name-save" style="display:none" id="${val.Product_Code}-save_quantity">
                                                         <i class="fas fa-check-square icon-save-discount" onclick="save_edit_quantity('${val.Product_Code}')"></i>
                                                         
                                                     </div>            
                                                 </div>
                                             </div>
                                         </td>
                                     </tr>     
                                     `) 
                            }else if (val.GroupBuy_SellQuantity === 'NULL'){
                                $('.tbody_detail_product').append(`
                                     <tr class="tr_detail_prod">
                                         <td>
                                             <div class="box-switch">
                                                 <input type="checkbox" class="detail_prod_input"  data-toggle="toggle" id="${val.Product_Code}-status" onchange="get_status('${val.Product_Code}')">
                                             </div> 
                                         </td>
                                         <td>
                                             <div class="br-option">
                                                 <div class="br-option-input">
                                                     <input type="text" class="form_product detail_prod_input" disabled value="${val.Product_Code}" id="${val.Product_Code}-pCode">     
                                                 </div>
                                             </div>
                                         </td>
                                         <td>
                                             <div class="br-option">
                                                 <div class="br-option-input">
                                                     <input type="text" class="form_product detail_prod_input" disabled value="${val.Name}" id="${val.Product_Code}-pName">
                                                     
                                                 </div>             
                                             </div>
                                         </td>
                                         <td>
                                             <div class="br-option">
                                                 <div class="br-option-input">
                                                     <input type="text" class="form_product-2 detail_prod_input" id="${val.Product_Code}-discount" disabled value="0">
                                                     <div class="box-name-edit" id="${val.Product_Code}-box_edit_discount">
                                                         <i class="fas fa-edit icon-edit edit-discount" id="${val.Product_Code}-edit" onclick="edit_product_discount('${val.Product_Code}')"></i>
                                                         
                                                     </div>
                                                     <div class="box-name-save detail_prod_input" style="display:none" id="${val.Product_Code}-save_discount">
                                                         <i class="fas fa-check-square icon-save-discount" onclick="save_edit_discount('${val.Product_Code}')"></i>
                                                         
                                                     </div>   
                                                 </div>
                                             </div>
                                         </td>
                                         <td>
                                             <div class="br-option">
                                                 <div class="br-option-input">
                                                     <input type="text" class="form_product-2 detail_prod_input" id="${val.Product_Code}-quantity" disabled value="${val.GroupBuy_SellQuantity}">
                                                     <div class="box-name-edit" id="${val.Product_Code}-box_edit_quantity">
                                                         <i class="fas fa-edit icon-edit"  id="${val.Product_Code}-edit" onclick="edit_product_quantity('${val.Product_Code}')"></i>
                                                         
                                                     </div>  
                                                     <div class="box-name-save" style="display:none" id="${val.Product_Code}-save_quantity">
                                                         <i class="fas fa-check-square icon-save-discount" onclick="save_edit_quantity('${val.Product_Code}')"></i>
                                                         
                                                     </div>            
                                                 </div>
                                             </div>
                                         </td>
                                     </tr>     
                                     `) 
                            }else {
                                $('.tbody_detail_product').append(`
                                <tr class="tr_detail_prod">
                                    <td>
                                        <div class="box-switch">
                                            <input type="checkbox" class="detail_prod_input"  data-toggle="toggle" id="${val.Product_Code}-status" onchange="get_status('${val.Product_Code}')">
                                        </div> 
                                    </td>
                                    <td>
                                        <div class="br-option">
                                            <div class="br-option-input">
                                                <input type="text" class="form_product detail_prod_input" disabled value="${val.Product_Code}" id="${val.Product_Code}-pCode">     
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="br-option">
                                            <div class="br-option-input">
                                                <input type="text" class="form_product detail_prod_input" disabled value="${val.Name}" id="${val.Product_Code}-pName">
                                                
                                            </div>             
                                        </div>
                                    </td>
                                    <td>
                                        <div class="br-option">
                                            <div class="br-option-input">
                                                <input type="text" class="form_product-2 detail_prod_input" id="${val.Product_Code}-discount" disabled value="${val.GroupBuy_SellPrice}">
                                                <div class="box-name-edit" id="${val.Product_Code}-box_edit_discount">
                                                    <i class="fas fa-edit icon-edit edit-discount" id="${val.Product_Code}-edit" onclick="edit_product_discount('${val.Product_Code}')"></i>
                                                    
                                                </div>
                                                <div class="box-name-save detail_prod_input" style="display:none" id="${val.Product_Code}-save_discount">
                                                    <i class="fas fa-check-square icon-save-discount" onclick="save_edit_discount('${val.Product_Code}')"></i>
                                                    
                                                </div>   
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="br-option">
                                            <div class="br-option-input">
                                                <input type="text" class="form_product-2 detail_prod_input" id="${val.Product_Code}-quantity" disabled value="0">
                                                <div class="box-name-edit" id="${val.Product_Code}-box_edit_quantity">
                                                    <i class="fas fa-edit icon-edit"  id="${val.Product_Code}-edit" onclick="edit_product_quantity('${val.Product_Code}')"></i>
                                                    
                                                </div>  
                                                <div class="box-name-save" style="display:none" id="${val.Product_Code}-save_quantity">
                                                    <i class="fas fa-check-square icon-save-discount" onclick="save_edit_quantity('${val.Product_Code}')"></i>
                                                    
                                                </div>            
                                            </div>
                                        </div>
                                    </td>
                                </tr>     
                                `) 
                               
                            }
                        }
                    })
                }

                
            }).catch((err)=>{
                
            })
        }).catch((err)=>{

        })
   })


   $('#item_ul_card').on('keyup',function(){
        var data_searching = $(this).val()
        var status_searching = $('#searching_option_id_ul').val()
       
       

        if(status_searching == 'Payment Status'){
          
            render_searching_order(data_searching,status_searching)
        }else if ( status_searching == 'Order Number'){
           
            render_searching_order(data_searching,status_searching)
        }else if ( status_searching == 'Payment Method'){
         
            render_searching_order(data_searching,status_searching)
        }else if ( status_searching == 'Address'){
           
            render_searching_order(data_searching,status_searching)
        }else {
            
        }


   })

   const render_searching_order=(data,status)=>{
        const token = localStorage.getItem('token')

        axios.post(`https://sales.sold.co.id/get-unpaid-sales-order-per-customer?Customer_Code=${token}`)
        .then((res)=>{
            var all_data = res.data
            
            if(data.length >1){
              var filtering =   all_data.filter((val)=>{
                    
                    if(status == 'Order Number'){
                        if(val.Order_Number.includes(data)){
                            return val
                        }
                    }else if ( status == 'Payment Method'){
                        if(val.Payment_Method.includes(data)){
                            return val
                        }
                    }else if ( status == 'Payment Status'){
                        
                        
                        if(val.Status.includes(data)){
                            return val
                        }
                    }else if ( status == 'Address'){
                        if(val.Shipping_Address.includes(data)){
                            return val
                        }
                    }else if ( status == 'Date'){
                        if(val.Start_Date.includes(data)){
                            return val
                        }
                    }
                })
                
                $('.new-box-card-item-ul').empty()
                filtering.map((val,index)=>{
                    var tanggal = val.Start_Date.split('T')
                    $('.new-box-card-item-ul').append(`
                        <div class="new-card-item-bd">
                            <div class="top-card-item-bd">
                                <i class="fab fa-shopify"></i>
                                <div class="date-card-item-bd">
                                    ${tanggal[0]}
                                </div>
                                <div class="status-card-item-bd">
                                    ${val.Status}
                                </div>
                                <div class="status-card-item-bd">
                                    ${val.Payment_Method}
                                </div>
                                <div class="order-card-item-bd">
                                    ${token}
                                </div>     
                            </div>
                            <div class="card-detail-item-bd">
                                <img src="../img/vantsing_shipping_method.png" alt="">
                                <div class="order-card-item-2-bd"> 
                                    <p>${val.Order_Number}</p>
                                    <p>${val.Total_Quantity} barang</p>
                                </div>
                                <div class="price-card-item-bd">
                                    Total Belanja: <br>
                                    RP ${commafy(val.Total_Price)}
                                </div>
                            </div>
                            <div class="check-detail-card-item-bd">
                                <div class="address-detail-card-item-bd">
                                ${val.Shipping_Address}
                                </div>
                                <div class="btn-card-detail-item-bd hvr-grow" onclick="open_detail_hutang_home('${val.Order_Number}')">
                                    Lihat Detail Transaksi
                                </div>
                            </div>
                        </div>               
                    `)
                })
            }else if ( data.length == 0 || data.length <0){
                // balikin ke data awal 
                axios.post(`https://sales.sold.co.id/get-unpaid-sales-order-per-customer?Customer_Code=${token}`)
                .then((res)=>{
                    var filtering = res.data
                    
                    $('.new-box-card-item-ul').empty()
                    filtering.map((val,index)=>{
                        var tanggal = val.Start_Date.split('T')
                        $('.new-box-card-item-ul').append(`
                            <div class="new-card-item-bd">
                                <div class="top-card-item-bd">
                                    <i class="fab fa-shopify"></i>
                                    <div class="date-card-item-bd">
                                        ${tanggal[0]}
                                    </div>
                                    <div class="status-card-item-bd">
                                        ${val.Status}
                                    </div>
                                    <div class="status-card-item-bd">
                                        ${val.Payment_Method}
                                    </div>
                                    <div class="order-card-item-bd">
                                        ${token}
                                    </div>     
                                </div>
                                <div class="card-detail-item-bd">
                                    <img src="../img/vantsing_shipping_method.png" alt="">
                                    <div class="order-card-item-2-bd"> 
                                        <p>${val.Order_Number}</p>
                                        <p>${val.Total_Quantity} barang</p>
                                    </div>
                                    <div class="price-card-item-bd">
                                        Total Belanja: <br>
                                        RP ${commafy(val.Total_Price)}
                                    </div>
                                </div>
                                <div class="check-detail-card-item-bd">
                                    <div class="address-detail-card-item-bd">
                                    ${val.Shipping_Address}
                                    </div>
                                    <div class="btn-card-detail-item-bd hvr-grow" onclick="open_detail_hutang_home('${val.Order_Number}')">
                                        Lihat Detail Transaksi
                                    </div>
                                </div>
                            </div>               
                        `)
                    })
                }).catch((err)=>{
                    
                })
            }
        }).catch((err)=>{
            
        })
        
   }

   $('#datepicker-ul').on('change',function(){
        var data = $(this).val()
        var status = 'Date'
        
        render_searching_order(data,status)
   })

   
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

    // input name searching home
    $('.input-name').on('keyup',function () {
        $('.close-button').css('display','block')
        $('.close-button-2').css('display','block')
        $('.modals-search-result').contents().find('.close-button-2').css('display','block');
        var value = $(this).val()
        // $('.close').css('display','block')
        // 
        var allProduct= JSON.parse(localStorage.getItem('all_data_product'))


        if(allProduct != undefined  && allProduct != null && allProduct.length > 0 ){
            if(value.length > 2){
                    $('.box-render-search').css('display','block')
                    $('.box-search-menu').css('display','block')
                    $('.input-name').css('border-bottom-left-radius','0px')
                    $('.input-name').css('border-bottom-right-radius','0px')
                    $('.render-li-search').empty()
                    var all_product_filter = []
                

                var filter_product = allProduct.filter((val)=>{
                    var valueCap = value.toUpperCase()
                    
                    if(val.Name.toUpperCase().includes(valueCap)){
                        // 
                        all_product_filter.push(val)
                        return val
                    }
                })
                // console.log(all_product_filter)

                if(all_product_filter.length === 0){
                    $('.render-li-search').append(`
                        <li  id="${value}">${value} Tidak Ditemukan</li>
                    `)
                }
                all_product_filter.map((val,index)=>{
                    // console.log(val)
                    if(val.length === 0){
                        // console.log('masuk ke if 1392')
                        $('.render-li-search').append(`
                            <li  id="${val.Name}">${value} Tidak Ditemukan</li>
                        `)

                    }else {
                        // console.log('masuk ke if 1398')
                        $('.render-li-search').append(`
                            <li onclick="replace_value_to(this)" id="${val.Name}">${val.Name}</li>
                        `)
                    }
                })
           
                
                $('.closeByLogin').css('display','none')
                $('.option-0').removeClass("background_grey")
                $('.option-1').removeClass("background_grey")
                $('.option-2').removeClass("background_grey")
                $('.option-3').removeClass("background_grey")
                $('.box-information').hide(1000)
             
            }else {
                close_all_open_window()
                    $('.box-render-search').css('display','none')
                $('.input-name').css('border-bottom-left-radius','10px')
                $('.input-name').css('border-bottom-right-radius','10px')
            }
             

        }else {
            if(value.length > 2){
                axios.post(`https://products.sold.co.id/get-product-details?product_name=${value}`)
                .then((res)=>{
                    
                    $('.box-render-search').css('display','block')
                    $('.box-search-menu').css('display','block')
                    $('.input-name').css('border-bottom-left-radius','0px')
                    $('.input-name').css('border-bottom-right-radius','0px')
                    $('.render-li-search').empty()
                    if(res.data[0] === false){
                        res.data.map((val,index)=>{
                            
                            
                            $('.render-li-search').append(`
                                <li  id="${val.Name}">${value} Tidak Ditemukan</li>
                            `)
    
                        })
                    }else {
                        res.data.map((val,index)=>{
                            
                            
                            $('.render-li-search').append(`
                                <li onclick="replace_value_to(this)" id="${val.Name}">${val.Name}</li>
                            `)
    
                        })
    
                    }
                    
                    $('.closeByLogin').css('display','none')
                    $('.option-0').removeClass("background_grey")
                    $('.option-1').removeClass("background_grey")
                    $('.option-2').removeClass("background_grey")
                    $('.option-3').removeClass("background_grey")
                    $('.box-information').hide(1000)
                }).catch((err)=>{
                    
                })
    
            }else {
                close_all_open_window()
                    $('.box-render-search').css('display','none')
                $('.input-name').css('border-bottom-left-radius','10px')
                $('.input-name').css('border-bottom-right-radius','10px')
    
            }
        }
        
        

        
        
        

    }); 



    $('.disini_info_supplier').on('click',function(){
        // alert('supp jalan')
        $('.close-button').css('display','block')
        $('#newloginModal').modal('hide')
        $('.modals-information-login').css('display','flex')
        $(".modals-information-login").attr('src',`./Iframe/supplier-information.html`)
    })
    $('.disini_info_customer').on('click',function(){
        // alert('cust jalan')
        $('.close-button').css('display','block')
        $('#newloginModal').modal('hide')
        $('.modals-information-login').css('display','flex')
        $(".modals-information-login").attr('src',`./Iframe/cust-information.html`)
        })   

// batas

$('.icon-buy').on('click',function(){
    var product_id = $(this).val()
    
})
$('.id-address-gb').on('click',function(){
    var data = $(this).val()
    
})



















setInterval(() => {
    resultAddress()
},5000)


function resultAddress(item){

    var pilihan_alamat=$('.option-address-gb option:selected').val()
    // 
    if(pilihan_alamat === 'Alamat Terdaftar'){
        var payment_choosing = $('.option-payment-gb option:selected').val()
        // 
        var alamat = $('.option-alamat-gb option:selected').val()
        // 
        var check_alamat = alamat.toUpperCase().includes('JAKARTA'.toUpperCase())
        // if(alamat.toUpperCase().includes('JAKARTA'.toUpperCase())){
        //     $('#total_biaya_pengiriman_gb').val('10.000')
        // }else if (alamat.toUpperCase().includes('TANGERANG'.toUpperCase()) || alamat.toUpperCase().includes('banten'.toUpperCase())){
        //     $('#total_biaya_pengiriman_gb').val('15.000')
        // }
        // else if (alamat.toUpperCase().includes('depok'.toUpperCase())){
        //     $('#total_biaya_pengiriman_gb').val('20.000')
        // }
        // else if (alamat.toUpperCase().includes('bogor'.toUpperCase())){
        //     $('#total_biaya_pengiriman_gb').val('25.000')
        // }
        // else {
        //     $('#total_biaya_pengiriman_gb').val('50.000')
        // }
    }else if (pilihan_alamat === 'Alamat Baru'){
        var alamat_baru = $('#alamat_lain').val()
        // if(alamat_baru.toUpperCase().includes('JAKARTA'.toUpperCase())){
        //     $('#total_biaya_pengiriman_gb').val('10.000')
        // }else if (alamat_baru.toUpperCase().includes('TANGERANG'.toUpperCase()) || alamat_baru.toUpperCase().includes('banten'.toUpperCase())){
        //     $('#total_biaya_pengiriman_gb').val('15.000')
        // }
        // else if (alamat_baru.toUpperCase().includes('depok'.toUpperCase())){
        //     $('#total_biaya_pengiriman_gb').val('20.000')
        // }
        // else if (alamat_baru.toUpperCase().includes('bogor'.toUpperCase())){
        //     $('#total_biaya_pengiriman_gb').val('25.000')
        // }
        // else {
        //     $('#total_biaya_pengiriman_gb').val('50.000')
        // }

        // 
    }


}

$('.card_flip_payment').on('mouseover',function(){
    // alert('jalan')
    $('.card_flip_payment').toggleClass('is-flipped')
})





function toDataURL(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function() {
      var reader = new FileReader();
      reader.onloadend = function() {
        callback(reader.result);
      }
      reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
}

// BUAT GANTI GAMBAR HOME
  
var gambar_active = 3
// setInterval(()=>{
//     if(gambar_active == 1){
// //   
//     toDataURL('http://sold.co.id/img/promo1.png',  async function(dataUrl) {
//     // 
//         await $('#scream').attr('src',dataUrl)
//         var example = document.getElementById('example');
//         var context = example.getContext('2d');
//         var img = document.getElementById("scream");
//         context.drawImage(img, 0, 0, 500, 500);
        
//         // var c = example.getContext('2d');
//         var p =  context.getImageData(10, 10, 1, 1).data; 
//     //   
//         var hex = "#" + ("000000" + rgbToHex(p[0], p[1], p[2])).slice(-6);
//         // alert(hex)


//         await $('.ads-3').css('background-color',hex)
//         await $('.ads-1').css('background-color',hex)
//         // $('#status').html(cord + "<br>" + hex);
//         gambar_active = 2
        
//     })

// }
// else if (gambar_active == 2){
// //   
//     toDataURL('http://sold.co.id/img/promo3.png', async function(dataUrl) {
//     // 
//         await $('#scream').attr('src',dataUrl)
//         var example = document.getElementById('example');
//         var context = example.getContext('2d');
//         var img = document.getElementById("scream");
//         context.drawImage(img, 0, 0, 500, 500);
        
//         // var c = example.getContext('2d');
//         var p =  context.getImageData(10, 10, 1, 1).data; 
//     //   
//         var hex = "#" + ("000000" + rgbToHex(p[0], p[1], p[2])).slice(-6);
//         // alert(hex,'GA2')


//         await $('.ads-3').css('background-color',hex)
//         await  $('.ads-1').css('background-color',hex)
//         // $('#status').html(cord + "<br>" + hex);
//         gambar_active = 3
        
//     })
// }else {
// //   
//     // 
//     toDataURL('http://sold.co.id/img/promo5.png',  async function(dataUrl) {
//     // 
//         await  $('#scream').attr('src',dataUrl)
//         var example = document.getElementById('example');
//         var context = example.getContext('2d');
//         var img = document.getElementById("scream");
//         context.drawImage(img, 0, 0, 500, 500);
        
//         // var c = example.getContext('2d');
//         var p =  context.getImageData(10, 10, 1, 1).data; 
//     //   
//         var hex = "#" + ("000000" + rgbToHex(p[0], p[1], p[2])).slice(-6);
//         // alert(hex,'GA2')


//         await $('.ads-3').css('background-color',hex)
//         await $('.ads-1').css('background-color',hex)
//         // $('#status').html(cord + "<br>" + hex);
//         gambar_active = 1
        
//     })
// }
// },3000)


// BUAT GANTI GAMBAR HOME

function rgbToHex(r, g, b) {
    if (r > 255 || g > 255 || b > 255)
        throw "Invalid color component";
    return ((r << 16) | (g << 8) | b).toString(16);
}
      

var timeout = setTimeout(function(){
    yourFunction()
},500);
const yourFunction=()=>{
    $('.ads-1').removeClass('animated-background')
    $('.ads-2').removeClass('animated-background')
    $('.ads-3').removeClass('animated-background')
    $('#slider').css('display','block')
    // $('.box-render-promo-animated').css('display','none')
    // $('.box-render-promo').css('display','flex')
    // $('.box-render-new').css('display','flex')
    // $('.box-render-all').css('display','flex')
}

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

$('#checking_email_login').on('keyup',function(e){
   var checking_email = validateEmail(e.target.value)
//    console.log(checking_email)
   if(checking_email === true){
       $('#btn-login-tokped-id').addClass('correct-email')
       $('#btn-login-tokped-id').attr('onclick','checking_email_login()')
   }else {
    $('#btn-login-tokped-id').removeClass('correct-email')
    $('#btn-login-tokped-id').removeAttr('onclick')
   }
})

$('#checking_password_login').on('keyup',function(e){
    var password = e.target.value

    if( password.length > 5){
        $('#btn-final-login-tokped').addClass('correct-email')
        $('#btn-final-login-tokped').attr('onclick','checking_password_login()')
    }else if (password.length === 0){
        $('#btn-final-login-tokped').removeClass('correct-email')
        $('#btn-final-login-tokped').removeAttr('onclick')
    }
})

$('#checking_email_register').on('keyup',function(e){
    var checking_email = validateEmail(e.target.value)
    // console.log(checking_email)
    if(checking_email === true){
        $('#btn-register-tokped-id').addClass('correct-email')
        $('#btn-register-tokped-id').attr('onclick','checking_email_register()')
    }else {
        $('#btn-register-tokped-id').removeClass('correct-email')
        $('#btn-register-tokped-id').removeAttr('onclick')
    }
})

$('#checking_nohp_register').on('keyup',function(e){
    var nama_customer = $('#checking_nama_register').val()
    var nomor_hp = e.target.value
    var password = $('#checking_password_register').val()
    if(nama_customer.length > 2 && nomor_hp.length > 9  && password.length > 5){
        $('#btn-final-register-tokped').addClass('correct-email')
        $('#btn-final-register-tokped').attr('onclick','final_register_customer()')
    }else {
        $('#btn-final-register-tokped').removeClass('correct-email')
        $('#btn-final-register-tokped').removeAttr('onclick')
    }
})
$('#checking_nama_register').on('keyup',function(e){
    var nama_customer = e.target.value
    var nomor_hp = $('#checking_nohp_register').val()
    var password = $('#checking_password_register').val()
    if(nama_customer.length > 2 && nomor_hp.length > 9 && password.length > 5){
        $('#btn-final-register-tokped').addClass('correct-email')
        $('#btn-final-register-tokped').attr('onclick','final_register_customer()')
    }else {
        $('#btn-final-register-tokped').removeClass('correct-email')
        $('#btn-final-register-tokped').removeAttr('onclick')
    }
})
$('#checking_password_register').on('keyup',function(e){
    var nama_customer = $('#checking_nama_register').val()
    var nomor_hp = $('#checking_nohp_register').val()
    var password = e.target.value
    if(nama_customer.length > 2 && nomor_hp.length > 9  && password.length > 5){
        $('#btn-final-register-tokped').addClass('correct-email')
        $('#btn-final-register-tokped').attr('onclick','final_register_customer()')
    }else {
        $('#btn-final-register-tokped').removeClass('correct-email')
        $('#btn-final-register-tokped').removeAttr('onclick')
    }
})


   $('#new_kota_prov_customer').on('keyup',function(e){
       $('#new_kel_kec_customer').attr('disabled',true)
       
       var item = e.target.value.toUpperCase()
       // console.log(item.length, item)
       var province_storage = JSON.parse(localStorage.getItem('all_province_tiki'))
       var city_storage = JSON.parse(localStorage.getItem('all_city_tiki'))
       var district_storage = JSON.parse(localStorage.getItem('all_district_tiki'))
            // var province_storage= undefined
            // var city_storage = undefined
            // var district_storage = undefined
       if(item.length > 3 ){ // search item
           // if(item.product_name.toUpperCase().includes(value.Name.toUpperCase())){
               var array_filter_province =[]
               var array_filter_city = []
           if(province_storage !== undefined && city_storage !== undefined && district_storage !== undefined){
               var filter_province = province_storage.filter((val,index)=>{
                   // console.log(val.Province.toUpperCase().includes(item), val)
                   if(val.Province.toUpperCase().includes(item)){
                       array_filter_province.push(val.Province)
                       return val
                   }
               })
               const final_province = array_filter_province.reduce((acc,item)=>{ // untuk ngapus data yg sama
                   if(!acc.includes(item)){
                       acc.push(item);
                   }
                   return acc;
               },[])     
               if(final_province.length > 0){ // final province lebih dari 1
                // misal ada lebih dari 1 province, berarti nanti setiap province nge looping
                // nyari setiap kota yg ada di province itu
                   final_province.forEach((val,index)=>{
                       city_storage.forEach((value,id)=>{
                           if(val === value.Province){
                            $('.render-kota-kec-alamat').css('display','block')
                            $('.render-kota-kec-alamat').empty()
                            value.City.map((res,index)=>{
                                $('.render-kota-kec-alamat').append(`
                                    <div class="card-kot-kec-alamat" onclick="onclick_kot_prov_tokped('${val}','${res.City}')">
                                        <i class="fas fa-map-marker-alt"></i>
                                        <p>${val}, ${res.City} </p>
                                    </div>
                                `)
                            })       
                           }
                       })
                   })
               }else { // final_province kosong
                   // final province kosong, berarti data yg di cari itu adalah kota
                   // jadi search by kota. kalo gaada di kota berarti gaada.
                   // 
                    city_storage.forEach((value,id)=>{
                        filter_city = value.City.filter((val,index)=>{ 
                        if(val.City.toUpperCase().includes(item)){
                            array_filter_province.push(value.Province)
                            array_filter_city.push(val.City)        
                        }
                    })
                    const final_province_2 = array_filter_province.reduce((acc,item)=>{ // untuk ngapus data yg sama
                        if(!acc.includes(item)){
                            acc.push(item);
                        }
                        return acc;
                    },[])
                    const final_city = array_filter_city.reduce((acc,item)=>{ // untuk ngapus data yg sama
                        if(!acc.includes(item)){
                            acc.push(item);
                        }
                        return acc;
                    },[])
                    if(final_province_2.length >1){
                        $('.render-kota-kec-alamat').css('display','block')
                        $('.render-kota-kec-alamat').empty()
                        final_province_2.forEach((value,index)=>{
                            city_storage.forEach((val,id)=>{
                                if(value.toUpperCase() === val.Province.toUpperCase()){
                                    val.City.forEach((item,index_value)=>{
                                        $('.render-kota-kec-alamat').append(`
                                            <div class="card-kot-kec-alamat" onclick="onclick_kot_prov_tokped('${value}','${item.City}')">
                                                <i class="fas fa-map-marker-alt"></i>
                                                <p>${value}, ${item.City} </p>
                                            </div>
                                        `)
                                    })
                                }
                            })
                        })
                    }else if(final_province_2.length === 1 && final_city.length >1){
                        $('.render-kota-kec-alamat').css('display','block')
                        $('.render-kota-kec-alamat').empty()
                        final_city.map((val,index)=>{
                            $('.render-kota-kec-alamat').append(`
                                <div class="card-kot-kec-alamat" onclick="onclick_kot_prov_tokped('${final_province_2}','${val}')">
                                    <i class="fas fa-map-marker-alt"></i>
                                    <p>${final_province_2}, ${val} </p>
                                </div>
                            `)
                        })
                    }else if (final_province_2.length === 1 && final_city.length === 1){
                        $('.render-kota-kec-alamat').css('display','block')
                        $('.render-kota-kec-alamat').empty()
                        $('.render-kota-kec-alamat').append(`
                            <div class="card-kot-kec-alamat" onclick="onclick_kot_prov_tokped('${final_province_2}','${final_city}')">
                                <i class="fas fa-map-marker-alt"></i>
                                <p>${final_province_2}, ${final_city} </p>
                            </div>
                        `)
                    } 
                })

               }
           }else { // render data dari full API
                var nama_kurir = 'tiki'
                var kurir_kode = 'tiki'
                var array_province = []
                var all_province_from_api = []
                get_all_province_from_courier(nama_kurir,kurir_kode).done(function(response){
                    // console.log(response)
                    all_province_from_api =response
                    response.forEach((prov,id)=>{
                        if(prov.Province.toUpperCase().includes(item)){
                            array_province.push(prov.Province)
                            // console.log(prov)
                        }
                    })
                    console.log(array_province)
                    if(array_province.length === 1){ // province hanya ada 1
                        console.log('masuk ke if')
                        
                        get_all_city_from_courier(nama_kurir, kurir_kode, array_province[0]).done(function(response){
                            console.log(response)
                            $('.render-kota-kec-alamat').css('display','block')
                            $('.render-kota-kec-alamat').empty()
                            response.map((val,id)=>{
                                $('.render-kota-kec-alamat').append(`
                                    <div class="card-kot-kec-alamat" onclick="onclick_kot_prov_tokped('${array_province[0]}','${val.City}')">
                                        <i class="fas fa-map-marker-alt"></i>
                                        <p>${array_province[0]}, ${val.City} </p>
                                    </div>
                                `)       
                            })
                        })
                    }else if(array_province.length > 1) { // province lebih dari 1
                        console.log('masuk ke else if 1934')
                        $('.render-kota-kec-alamat').css('display','block')
                        $('.render-kota-kec-alamat').empty()
                        array_province.forEach((val,id)=>{
                            
                            get_all_city_from_courier(nama_kurir, kurir_kode,val).done(function(response){
                                response.map((value,id)=>{
                                    $('.render-kota-kec-alamat').append(`
                                        <div class="card-kot-kec-alamat" onclick="onclick_kot_prov_tokped('${val}','${value.City}')">
                                            <i class="fas fa-map-marker-alt"></i>
                                            <p>${val}, ${value.City} </p>
                                        </div>
                                    `)       
                                })
                            })
                        })
                    }else {
                        // province array kosong
                        console.log(',masuk ke else')
                        $('.render-kota-kec-alamat').css('display','block')
                        $('.render-kota-kec-alamat').empty()
                        all_province_from_api.forEach((prov,id)=>{
                            // console.log(prov)
                            get_all_city_from_courier(nama_kurir, kurir_kode,prov.Province).done(function(response){
                                // if(response.City.toUpperCase().includes(e.target.value)){
                                //     console.log(response,'1957')
                                // }
                                
                                response.forEach((resp,index)=>{
                                    if(resp.City.toUpperCase().includes(item)){
                                        console.log(resp,item)
                                        $('.render-kota-kec-alamat').append(`
                                            <div class="card-kot-kec-alamat" onclick="onclick_kot_prov_tokped('${prov.Province}','${resp.City}')">
                                                <i class="fas fa-map-marker-alt"></i>
                                                <p>${prov.Province}, ${resp.City} </p>
                                            </div>
                                        `)   
                                    }
                                })
                                
                                // response.map((value,id)=>{
                                //     $('.render-kota-kec-alamat').append(`
                                //         <div class="card-kot-kec-alamat" onclick="onclick_kot_prov_tokped('${val}','${value.City}')">
                                //             <i class="fas fa-map-marker-alt"></i>
                                //             <p>${val}, ${value.City} </p>
                                //         </div>
                                //     `)       
                                // })
                            })
                        })
                    }
                })            
           
           }
   
   
       }else if(item.length === 0 || item.length <0){
           $('.render-kota-kec-alamat').css('display','none')
       }else {
   
       }
   
})

    $('#new_kel_kec_customer').on('keyup',function(e){
        var item = e.target.value.toUpperCase()
        var province_city = $('#new_kota_prov_customer').val()
        var district_storage = JSON.parse(localStorage.getItem('all_district_tiki'))

        var split_province = province_city.split(',')
        var province_pilihan = split_province[0]
        var city_pilihan = split_province[1]
        var kurir_kode = 'tiki'
        var nama_kurir = 'tiki'
        console.log(province_pilihan)
        console.log(city_pilihan)
        console.log(item)

        if(item.length > 3 ){ // search item kelurahan kecamatan
            
            if(district_storage !== undefined){ // render data dari local storage
                var filter_district = district_storage.filter((val,index)=>{
                    if(val.City === city_pilihan ){
                        // console.log(val)
                        val.District.forEach((respo,index)=>{
                            if(respo.District.toUpperCase().includes(item)){
                                // console.log(respo.District)
                                get_all_subdistrict_from_courier(nama_kurir,kurir_kode,respo.District).done(function(response){
                                    $('.render-kota-kec-alamat').css('display','block')
                                    $('.render-kota-kec-alamat').empty()
                                    response.map((respon,index_resp)=>{
                                        $('.render-kota-kec-alamat').append(`
                                            <div class="card-kot-kec-alamat" onclick="onclick_kel_kec_tokped('${respo.District}','${respon.Sub_District}')">
                                                <i class="fas fa-map-marker-alt"></i>
                                                <p>${respo.District}, ${respon.Sub_District} </p>
                                            </div>
                                        `)
                                    })
                                })
                            }else {
                                $('.render-kota-kec-alamat').css('display','block')
                                val.District.forEach((respo,index)=>{
                                    get_all_subdistrict_from_courier(nama_kurir,kurir_kode,respo.District).done(function(response){
                                        var all_sub_district = []
                                        response.forEach((respon,id)=>{
                                            if(respon.Sub_District.toUpperCase().includes(item)){
                                                // console.log(respon)
                                                // all_sub_district.push(respon.Sub_District)
                                                
                                                // $('.render-kota-kec-alamat').css('visibility','visible')
                                                $('.render-kota-kec-alamat').empty()
                                                $('.render-kota-kec-alamat').append(`
                                                    <div class="card-kot-kec-alamat" onclick="onclick_kel_kec_tokped('${respo.District}','${respon.Sub_District}')">
                                                        <i class="fas fa-map-marker-alt"></i>
                                                        <p>${respo.District}, ${respon.Sub_District} </p>
                                                    </div>
                                                `)  
                                            }
                                        })
                                        // const final_sub_district = all_sub_district.reduce((acc,item)=>{ // untuk ngapus data yg sama
                                        //     if(!acc.includes(item)){
                                        //         acc.push(item);
                                        //     }
                                        //     return acc;
                                        // },[])    
                                        // console.log(final_sub_district) 
                                        // final_sub_district.map((respon,id)=>{
                                        //     $('.render-kota-kec-alamat').css('display','block')
                                        //     $('.render-kota-kec-alamat').empty()
                                        //     $('.render-kota-kec-alamat').append(`
                                        //         <div class="card-kot-kec-alamat" onclick="onclick_kel_kec_tokped('${respo.District}','${respon.Sub_District}')">
                                        //             <i class="fas fa-map-marker-alt"></i>
                                        //             <p>${respo.District}, ${respon.Sub_District} </p>
                                        //         </div>
                                        //     `)   
                                        // })


                                    })
                                })
                            }
                        })
                    }else { // ini kalo gak ketemu di kecamatan, berarti ada di kelurahan
                        console.log('harusnya gak masuk sini. berarti semuanya beda')
                    }
                })
            }else { // render data dari full API

            }
        }else if (item.length === 0 || item.length < 0 ){
            $('.render-kota-kec-alamat').css('display','none')
        }else {

        }


    })
})


