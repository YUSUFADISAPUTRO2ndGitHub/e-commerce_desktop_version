
$(function(){

    // $( "#datepicker" ).datepicker({
    //     dateFormat:'yy-mm-dd'
    // });


    // var a = $( "#datepicker" ).datepicker("getDate");
    
    
    // var b = $('.form-check-input').val()
    
})


$(function(){

//   $("#flexSwitchCheckDefault").bootstrapSwitch({
//       onSwitchChange: function(e,state){
//           alert(state)
//       }
//   })



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

  
    $('.input-group').on('click',function(){
        $('.list-group').toggle(1000)
    // $('.list-group').show(1000)
    })

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
        alert('jalan')
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
   
  

//    OPEN MODALS PROFILE

   
   $('.option-4').on('click',function(){

    
    var token = localStorage.getItem('token')
    console.log(token)
 
    
        axios.post(`http://customers.sold.co.id/get-customer-information?Customer_Code=${token}`)
        .then((res)=>{
            // 
            var data_customer = res.data
            
            if(data_customer){
                
                
                if(data_customer.User_Type === 'Customer'){
                    $('.btn-status-barang').css('display','none')
                    $('.sup_delete').css('display','flex')
                    $('.box-kumpulkan-profile').css('top','70px')

                    $('#prof_perusahaan_nama').css('display','none')
                    $('#prof_npwp').css('display','none')
                    $('#prof_nik').css('display','none')
                    
                    $('#prof_thn').css('display','flex')
                    $('#prof_bln').css('display','flex')
                    $('#prof_tgl').css('display','flex')
                    $('#id_ref_code').css('visibility','show')

                    // $('.sup_delete').css('left','20px')
                }else {
                    $('.btn-status-barang').css('display','block')
                    $('.sup_delete').css('display','none')
                    $('.box-kumpulkan-profile').css('top','0px')
                    $('#id_ref_code').css('visibility','hidden')

                    $('#prof_perusahaan_nama').css('display','flex')
                    $('#prof_npwp').css('display','flex')
                    $('#prof_nik').css('display','flex')
                    
                    $('#prof_thn').css('display','none')
                    $('#prof_bln').css('display','none')
                    $('#prof_tgl').css('display','none')
                    
                }
    
                var tahun = data_customer.Birthday.slice(0,4)
                var bulan = data_customer.Birthday.slice(5,7)
                var hari = data_customer.Birthday.slice(8,10)
                var newReferralCode = data_customer.Customer_Code
                
                
                $('#email_user').val(`${data_customer.Email}`)
                $('.nama_user_profile').val(`${data_customer.First_Name}`)
                $('#tahun_lahir_user').val(tahun)
                $('#bulan_lahir_user').val(bulan)
                $('#tanggal_lahir_user').val(hari)
                $('#nama_depan_user').val(`${data_customer.First_Name}`)
                $('#nama_belakang_user').val(`${data_customer.Last_Name}`)
                $('#no_telp1_user').val(`${data_customer.Contact_Number_1}`)
                $('#no_telp2_user').val(`${data_customer.Contact_Number_2}`)
                // $('#alamat_lengkap1_user').val(`${data_customer.Address_1}`)
                // $('#alamat_lengkap2_user').val(`${data_customer.Address_2}`)
                // $('#alamat_lengkap3_user').val(`${data_customer.Address_3}`)
                // $('#alamat_lengkap4_user').val(`${data_customer.Address_4}`)
                // $('#alamat_lengkap5_user').val(`${data_customer.Address_5}`)
                $('#rekening_user').val(`${data_customer.bank_account_number}`)
                $('#referral-profile').val(`${data_customer.extra_column_2}`)
                $('#no_ktp_user').val(`${data_customer.ktp}`)
                $('.ref-profile').val(token)
                $('#npwp_supp_prof').val(data_customer.npwp)
                
                
                $('#nama_perusahaan_profile').val(data_customer.Nama_Perusahaan)
                $('#nik_supp_profile').val(data_customer.extra_column_5)
                $('#ref_code_from').val(data_customer.referral_customer_code)
                var a = $('#refer-profile').val()
                
                $('#profileModal').modal('show')
                $('.box-tambah-alamat').empty()
                
                if(data_customer.Address_1 == 'undefined'){
                    console.log('alamat undefined')
                }else{
                    $('.box-tambah-alamat').append(`
                    <div class="login-name-3">
                        <div class="box-name">
                            <p>Alamat Lengkap</p>
                        </div>
                        <input type="text" class="form-reg-nama" value="${data_customer.Address_1}"  minlength="4" maxlength="15" id="alamat_lengkap1_user">
                    </div> 
                    `)
                    console.log('masuk ke else')
                }
                if(data_customer.Address_2 == 'undefined'){
                    console.log('alamat undefined')
                }else{
                    $('.box-tambah-alamat').append(`
                    <div class="login-name-3">
                        <div class="box-name">
                            <p>Alamat Lengkap</p>
                        </div>
                        <input type="text" class="form-reg-nama" val="${data_customer.Address_2}" placeholder="Alamat Lengkap" minlength="4" maxlength="15" id="alamat_lengkap2_user">
                    </div> 
                    `)
                    console.log('masuk ke else')
                }
                if(data_customer.Address_3 == 'undefined'){
                    console.log('alamat undefined')
                }else{
                    $('.box-tambah-alamat').append(`
                    <div class="login-name-3">
                        <div class="box-name">
                            <p>Alamat Lengkap</p>
                        </div>
                        <input type="text" class="form-reg-nama" val="${data_customer.Address_3}" placeholder="Alamat Lengkap" minlength="4" maxlength="15" id="alamat_lengkap3_user">
                    </div> 
                    `)
                    console.log('masuk ke else')
                }
                if(data_customer.Address_4 == 'undefined'){
                    console.log('alamat undefined')
                }else{
                    $('.box-tambah-alamat').append(`
                    <div class="login-name-3">
                        <div class="box-name">
                            <p>Alamat Lengkap</p>
                        </div>
                        <input type="text" class="form-reg-nama" val="${data_customer.Address_4}" placeholder="Alamat Lengkap" minlength="4" maxlength="15" id="alamat_lengkap4_user">
                    </div> 
                    `)
                    console.log('masuk ke else')
                }
                if(data_customer.Address_5 == 'undefined'){
                    console.log('alamat undefined')
                }else{
                    $('.box-tambah-alamat').append(`
                    <div class="login-name-3">
                        <div class="box-name">
                            <p>Alamat Lengkap</p>
                        </div>
                        <input type="text" class="form-reg-nama" val="${data_customer.Address_5}" placeholder="Alamat Lengkap" minlength="4" maxlength="15" id="alamat_lengkap5_user">
                    </div> 
                    `)
                    console.log('masuk ke else')
                }


            }else {
                
                // $('#loginModal').modal('show') // login lama
                
                $('#newloginModal').modal('show') // login lama
                $('.box_information_login').css('display','flex')
            }
        }).catch((err)=>{
            console.log(err)
        })

        $('.closeByLogin').css('display','none')
        $('.option-0').removeClass("background_grey")
        $('.option-1').removeClass("background_grey")
        $('.option-2').removeClass("background_grey")
        $('.option-3').removeClass("background_grey")
          // SEARCH ITEM BACK TO NORMAL
        $('.box-render-search').css('display','none')
        $('.input-name').css('border-bottom-left-radius','10px')
        $('.input-name').css('border-bottom-right-radius','10px')
        // $('.option-4').removeClass("background_grey")
        
   })

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
    axios.post(`http://customers.sold.co.id/get-customer-information?Customer_Code=${token}`)
    .then((res)=>{
        
        var Customer_Code = res.data.Customer_Code
        var all_data;
        axios.post(`http://products.sold.co.id/get-products-belong-to-the-supplier?Creator=${Customer_Code}`)
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
        axios.post(`http://customers.sold.co.id/get-customer-information?Customer_Code=${token}`)
        .then((res)=>{
            var Customer_Code = res.data.Customer_Code
            var all_data
            axios.post(`http://products.sold.co.id/get-products-belong-to-the-supplier?Creator=${Customer_Code}`)
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

        axios.post(`http://sales.sold.co.id/get-unpaid-sales-order-per-customer?Customer_Code=${token}`)
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
                axios.post(`http://sales.sold.co.id/get-unpaid-sales-order-per-customer?Customer_Code=${token}`)
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


    $('.input-name').on('keyup',function () {
        $('.close-button').css('display','block')
        $('.close-button-2').css('display','block')
        $('.modals-search-result').contents().find('.close-button-2').css('display','block');

        // $('.close').css('display','block')
        console.log($('.close-button-2'))
        
        
        
        
        var value = $(this).val()
        
        if(value.length > 2){
            axios.post(`http://products.sold.co.id/get-product-details?product_name=${value}`)
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
})
// batas

$('.icon-buy').on('click',function(){
    var product_id = $(this).val()
    
})
$('.id-address-gb').on('click',function(){
    var data = $(this).val()
    
})


function replace_value_to(x){
    // alert($(x).html());
    $(".input-name").val($(x).html());
    $('.box-render-search').css('display','none')
    $('.input-name').css('border-bottom-left-radius','10px')
    $('.input-name').css('border-bottom-right-radius','10px')


    var item_search = $('#search_item').val()
    
    var product_name = $('#search_item').attr('id')
    $('.active_search').css('top','575px')
    $('.main-body').css('display','none')
    $('.modals-search-result').css('display','block')
    $('.modals-search-result').attr('src',`./Iframe/searchingPage.html?searching=${item_search}`)
}   





function check_qty(val){
    // alert(val)
    
    var kurir_pilihan=$('.kurir-home-gb option:selected').val()
    var province_pilihan=$('.province-home-gb option:selected').val()
    var kota_pilihan=$('.kota-home-gb option:selected').val()
    var kecamatan_pilihan=$('.kecamatan-home-gb option:selected').val()
    var kelurahan_pilihan=$('.kelurahan-home-gb option:selected').val()
    var pengiriman_pilihan=$('.pengiriman-home-gb option:selected').val()
    var total_qty_from_user = parseInt($('.qty_groupbuy_home').val())
    var new_kurir_pilihan = $('.active_delivery_method').attr('data-value')
    var product_id = $('.qty_groupbuy_home').attr('id')
    
    var split_pengiriman = pengiriman_pilihan.split('-')
    var days_pengiriman = split_pengiriman[0]
    var kode_pengiriman = split_pengiriman[1]
    
    

    var isKurir_pilihan = false
    var isProvince_pilihan = false
    var isKota_pilihan = false
    var isKecamatan_pilihan = false
    var isKelurahan_pilihan = false
    var isQty_pilihan = false
    var isPengiriman_pilihan = false


    if(kecamatan_pilihan == undefined || kecamatan_pilihan == null || kecamatan_pilihan == 'NULL' || kecamatan_pilihan == 'undefined'){
        
         kecamatan_pilihan = ''
         isKecamatan_pilihan = false
     }   else {
        isKecamatan_pilihan = true
     }
     if( kelurahan_pilihan == undefined || kelurahan_pilihan == null || kelurahan_pilihan == 'NULL' || kelurahan_pilihan == 'undefined'){
         
         kelurahan_pilihan = ''
         isKelurahan_pilihan = false
     }else {
        isKelurahan_pilihan = true
     }
 
     if(new_kurir_pilihan == undefined || new_kurir_pilihan == 'undefined' || new_kurir_pilihan == null || new_kurir_pilihan.length == 0){
         isKurir_pilihan = false
     }else {
         isKurir_pilihan = true
     }
     if(total_qty_from_user == undefined || total_qty_from_user == 'undefined' || total_qty_from_user == null || total_qty_from_user.length == 0){
         isQty_pilihan = false
     }else {
         isQty_pilihan = true
     }
 
     if(province_pilihan == undefined || province_pilihan == 'undefined' || province_pilihan == null || province_pilihan.length == 0){
         isProvince_pilihan = false
     }else {
         isProvince_pilihan = true
     }
     if(kota_pilihan == undefined || kota_pilihan == 'undefined' || kota_pilihan == null || kota_pilihan.length == 0){
         isKota_pilihan = false
     }else {
         isKota_pilihan = true
     }
     if(pengiriman_pilihan == undefined || pengiriman_pilihan == 'undefined' || pengiriman_pilihan == null || pengiriman_pilihan.length == 0){
        isPengiriman_pilihan = false
    }else {
        isPengiriman_pilihan = true
    }
 

     if(isKurir_pilihan && isKota_pilihan  && isPengiriman_pilihan&& isProvince_pilihan && isKelurahan_pilihan && isKecamatan_pilihan && isQty_pilihan) {
        
        
        
        
        
        
        // alert('masuk ke if check qty')

        // var total_qty_from_user = val
        // 
        var product_id = $('.qty_groupbuy_home').attr('id')
        
        var total_qty_from_api;
        var harga_satuan;

        get_product_detail_func(product_id).done(function(response){
            var item_product = response
            get_all_couriers().done(function(response){
                var dataAllKurir = response
                var kurir_kode =''
                for(var i=0; i<dataAllKurir.length; i++){
                    if(dataAllKurir[i].Courier == new_kurir_pilihan){
                        kurir_kode = dataAllKurir[i].Courier_Code
                    }
                }
                
                get_all_subdistrict_from_courier(new_kurir_pilihan,kurir_kode,kelurahan_pilihan).done(function(response){
                    
                    var allKecamatan = response
                  
                    var Courier_Price_Code_orig = 'CGK01.00'
                    var packing_type = ''
                    var berat_product = parseInt(item_product.Weight_KG)
                    if(berat_product <= 0 || berat_product == null || berat_product == undefined || Number.isNaN(berat_product)){
                        berat_product = 0.1*1.5;
                    }else{
                        berat_product = berat_product*1*1.5;
                    }
                    var total_berat_product = Math.ceil(berat_product * total_qty_from_user)
                    
                    var length = ''
                    var  width = '' 
                    var  height = ''
                    var paket_value = '' 
                    new_get_shipping_fee(Courier_Price_Code_orig , allKecamatan[0].Courier_Price_Code, packing_type, berat_product, length, width, height, paket_value).done(function(response){
                        var data_shipping_fee = response
                        var asuransi_pilihan = $('.asuransi-home-gb option:selected').val()
                        var packing_pilihan = $('.packing-home-gb option:selected').val()
                        var harga_shipping = parseInt($('.pengiriman-home-gb option:selected').attr('class'))
                        var harga_asuransi = parseInt($('.asuransi-home-gb option:selected').attr('class'))
                        var harga_packing = parseInt($('.packing-home-gb option:selected').attr('class'))
                        
                        
                        
                        
                        var isAsuransi_pilihan = false
                        var isPacking_pilihan = false
                        var isPengiriman_pilihan = false
                        

                        if(asuransi_pilihan == 'Asuransi' || asuransi_pilihan == null || asuransi_pilihan == undefined){
                            isAsuransi_pilihan = false
                        }else {
                            isAsuransi_pilihan = true
                        }
                        if(packing_pilihan == 'Packing' || packing_pilihan == null || packing_pilihan == undefined){
                            isPacking_pilihan = false
                        }else {
                            isPacking_pilihan = true
                        }
                        if(pengiriman_pilihan == 'Pengiriman' || pengiriman_pilihan == null || pengiriman_pilihan == undefined){
                            isPengiriman_pilihan = false
                        }else {
                            isPengiriman_pilihan = true
                        }

                        if(isAsuransi_pilihan && isPacking_pilihan && isPengirimanPilihan){

                            $('.ndps-left').empty()
                            $('.ndps-right').empty()

                            $('#total_biaya_pengiriman_gb').val('100.000')
                            $('.ndps-left').append(`
                            <div class="detail-ndps-left">
                                <p class="limited-text-short"> testing <br>
                                   testing
                                </p>
                            </div>
                            <div class="detail-ndps-left">
                                Shipping Fee
                            </div>
                            <div class="detail-ndps-left">
                                Total Amount
                            </div>
                         `)
                        $('.ndps-right').append(`
                            <div class="detail-ndps-right harga_total_product_qty" id="${harga_total_product}" value="${harga_total_product}">
                                Rp ${harga_total_product}
                            </div>
                            <div class="detail-ndps-right harga_shipping_qty" id="${harga_shipping}" value="${harga_shipping}">
                                Rp ${harga_shipping}
                            </div>
                            <div class="detail-ndps-right harga_total_prod_with_shipping_qty"id="${harga_total_product_with_shipping}" id="harga_total_prod_with_shipping_qty" value="${harga_total_product_with_shipping}">
                                Rp ${harga_total_product_with_shipping}
                            </div>
                        `)
                        }else if (isPengiriman_pilihan && isAsuransi_pilihan) {
                            
                            
                            var harga_total_product = item_product.GroupBuy_SellPrice * total_qty_from_user
                            var harga_total_product_with_shipping = harga_total_product + harga_shipping + harga_asuransi

                             
                            $('.ndps-left').empty()
                            $('.ndps-right').empty()

                            $('#total_biaya_pengiriman_gb').val(harga_shipping)
                            $('.ndps-left').append(`
                            <div class="detail-ndps-left">
                                <p class="limited-text-short"> ${item_product.Name} <br>
                                        ${total_qty_from_user} x Rp ${item_product.GroupBuy_SellPrice}
                                </p>
                            </div>
                            <div class="detail-ndps-left">
                                Shipping Fee
                            </div>
                            <div class="detail-ndps-left">
                                Insurance
                            </div>
                            <div class="detail-ndps-left">
                                Total Amount
                            </div>
                         `)
                        $('.ndps-right').append(`
                            <div class="detail-ndps-right harga_total_product_qty" id="${harga_total_product}" value="${harga_total_product}">
                                Rp ${harga_total_product}
                            </div>
                            <div class="detail-ndps-right harga_shipping_qty" id="${harga_shipping}" value="${harga_shipping}">
                                Rp ${harga_shipping}
                            </div>
                            <div class="detail-ndps-right">
                                Rp ${harga_asuransi}
                            </div>
                            <div class="detail-ndps-right harga_total_prod_with_shipping_qty"id="${harga_total_product_with_shipping}"  value="${harga_total_product_with_shipping}">
                                Rp ${harga_total_product_with_shipping}
                            </div>
                           
                        `)
                        }else if (isPengiriman_pilihan && isPacking_pilihan){
                            
                            
                            var harga_total_product = item_product.GroupBuy_SellPrice * total_qty_from_user
                            var harga_total_product_with_shipping = harga_total_product + harga_shipping + harga_packing

                             
                            $('.ndps-left').empty()
                            $('.ndps-right').empty()

                            $('#total_biaya_pengiriman_gb').val(harga_shipping)
                            $('.ndps-left').append(`
                            <div class="detail-ndps-left">
                                <p class="limited-text-short"> ${item_product.Name} <br>
                                        ${total_qty_from_user} x Rp ${item_product.GroupBuy_SellPrice}
                                </p>
                            </div>
                            <div class="detail-ndps-left">
                                Shipping Fee
                            </div>
                            <div class="detail-ndps-left">
                                Packing
                            </div>
                            <div class="detail-ndps-left">
                                Total Amount
                            </div>
                         `)
                        $('.ndps-right').append(`
                            <div class="detail-ndps-right harga_total_product_qty harga_total_product"  id="${harga_total_product}"value="${harga_total_product}">
                                Rp ${harga_total_product}
                            </div>
                            <div class="detail-ndps-right harga_shipping_qty" id="${harga_shipping}" value="${harga_shipping}">
                                Rp ${harga_shipping}
                            </div>
                            <div class="detail-ndps-right">
                                Rp ${harga_packing}
                            </div>
                            <div class="detail-ndps-right harga_total_prod_with_shipping_qty" id="${harga_total_product_with_shipping}" id="harga_total_prod_with_shipping_qty" value="${harga_total_product_with_shipping}">
                                Rp ${harga_total_product_with_shipping}
                            </div>
                          
                        `)
                        }else if(isPengiriman_pilihan){

                            
                            
                            var harga_total_product = item_product.GroupBuy_SellPrice * total_qty_from_user
                            var harga_total_product_with_shipping = harga_total_product + harga_shipping

                             
                            $('.ndps-left').empty()
                            $('.ndps-right').empty()

                            $('#total_biaya_pengiriman_gb').val(harga_shipping)
                            $('.ndps-left').append(`
                            <div class="detail-ndps-left">
                                <p class="limited-text-short"> ${item_product.Name} <br>
                                        ${total_qty_from_user} x Rp ${item_product.GroupBuy_SellPrice}
                                </p>
                            </div>
                            <div class="detail-ndps-left">
                                Shipping Fee
                            </div>
                            <div class="detail-ndps-left">
                                Total Amount
                            </div>
                         `)
                        $('.ndps-right').append(`
                            <div class="detail-ndps-right harga_total_product_qty" id="${harga_total_product}" value="${harga_total_product}">
                                Rp ${harga_total_product}
                            </div>
                            <div class="detail-ndps-right harga_shipping_qty" id="${harga_shipping}" value="${harga_shipping}">
                                Rp ${harga_shipping}
                            </div>
                            <div class="detail-ndps-right harga_total_prod_with_shipping_qty" id="${harga_total_product_with_shipping}" id="harga_total_prod_with_shipping_qty" value="${harga_total_product_with_shipping}">
                                Rp ${harga_total_product_with_shipping}
                            </div>
                        `)
                        }else {
                            

                        }


                    })
                })

            })

        })


       
    }else{
        // alert('masuk ke else check qty')
        
        
        
        
        
        

        var total_qty_from_user = val
        
        var product_id = $('.qty_groupbuy_home').attr('id')
        
        var total_qty_from_api;
        var harga_satuan;
        axios.post(`http://products.sold.co.id/get-product-details?product_code=${product_id}`)
        .then((res)=>{
            
            total_qty_from_api = parseInt(res.data.GroupBuy_SellQuantity)
            harga_satuan = res.data.GroupBuy_SellPrice
            var total_harga = harga_satuan * total_qty_from_user
            if(total_qty_from_api > total_qty_from_user) {
                // $('#tp_sp').val(total_harga)
                // $('#tp_iframe').val(total_harga)
                $('.ndps-left').empty()
                $('.ndps-right').empty()
                
                get_product_detail_func(product_id).done(function(response){
                    $('.ndps-left').append(`
                    <div class="detail-ndps-left">
                        <p class="limited-text-short"> ${response.Name} <br>
                            ${total_qty_from_user} x Rp ${response.GroupBuy_SellPrice}
                        </p>
                    </div>
                    <div class="detail-ndps-left">
                        Shipping Fee
                    </div>
                    <div class="detail-ndps-left">
                        Total Amount
                    </div>
                    `)
                    $('.ndps-right').append(`
                        <div class="detail-ndps-right">
                        Rp ${total_harga}
                        </div>
                        <div class="detail-ndps-right">
                            
                        </div>
                        <div class="detail-ndps-right"id="tp_iframe">
                            
                        </div>
                    `)
                })
          }else {
              $('.ndps-left').empty()
              $('.ndps-right').empty()
            
          
            Swal.fire({
                html:`
                <div class="o-circle c-container__circle o-circle__sign--failure">
                    <div class="o-circle__sign"></div>  
                </div> 
                Quantity Yang Tersisa Hanya : ${total_qty_from_api}!`,
                timer:2000,
                
            })
                var total_price = harga_satuan * total_qty_from_api
                $('.qty_groupbuy_home').val(total_price)
                // alert(total_qty_from_api)
                // $('#tp_sp').val(total_harga)
                // $('#tp_iframe').val(total_price)
                get_product_detail_func(product_id).done(function(response){
                    $('.ndps-left').append(`
                    <div class="detail-ndps-left">
                        <p class="limited-text-short"> ${response.Name} <br>
                           Rp ${total_qty_from_api} x Rp ${response.GroupBuy_SellPrice}
                        </p>
                       
                        </div>
                        <div class="detail-ndps-left">
                            Shipping Fee
                        </div>
                        <div class="detail-ndps-left">
                            Total Amount
                        </div>
                    `)
                    $('.ndps-right').append(`
                        <div class="detail-ndps-right">
                            ${total_price}
                        </div>
                        <div class="detail-ndps-right">
                            
                        </div>
                        <div class="detail-ndps-right"id="tp_iframe">
                            
                        </div>
                    `)
                })
          }
    
        }).catch((err)=>{
            
        })

     }




}

function groupbuy(product_id){
    
    var token = localStorage.getItem('token')
    
    
    axios.post(`http://products.sold.co.id/get-unpaid-sales-order-specific-for-a-product?Product_Code=${product_id}&Customer_Code=${token}`)
    .then((res)=>{
        
        // location.replace(`../Iframe/groupbuy.html?groupbuy_id=${product_id}`)
        if(res.data){
            
            $('.modals-product-detail').empty()
            $('.modals-product-detail').css('display','none')
            location.replace(`../Iframe/groupbuy.html?groupbuy_id=${product_id}`)
            
        }else {
            // alert('masuk ke else 1890')
            
            Swal.fire({
                // title: 'Anda Memiliki Pembayaran Yang Belum Dibayar',
                html:`
                <div class="o-circle c-container__circle o-circle__sign--failure">
                    <div class="o-circle__sign"></div>  
                </div>  
                Anda Memiliki Hutang, Silahkan Membayar Terlebih Dahulu, <br> Lalu Kembali Memesan Secara Groupbuy / Anda Dapat Memesan Dengan Harga Normal
                `,
                timer:2000,
                // showDenyButton: true,
                // showCancelButton: false,
                // confirmButtonText: `Lihat Daftar Tagihan`,
                // denyButtonText: `Cancel`,
              }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    render_daftar_hutang()
                    
                    // location.replace(`../Iframe/groupbuy.html?list_hutang=${product_id}`)
                  $(".force-close-all-command").css("display", "none");
                  $('#daftarHutangModal').modal('show')
                  $('.modals-product-detail').css('display','none')
                } else if (result.isDenied) {
                    // Swal.fire('Cancel berhasil', '', 'success')
                    Swal.fire({
                        html:`
                        <div class="o-circle c-container__circle o-circle__sign--success">
                            <div class="o-circle__sign"></div>  
                        </div>   
                        Cancel Berhasil
                        `,
                        timer:2000,
                        
                    })
                    $('.modals-product-detail').css('display','none')
                }
                
              })
            //   close_all_open_window()
        }
    }).catch((err)=>{
        
    })

    
}


function payment_groupbuy_home(product_id){
   
    var token = localStorage.getItem('token')
    var total_price = $('#tp_iframe').val()
    var detail_product;
    var data_customer;
    var items = []
    var total_qty_from_user = parseInt($('.qty_groupbuy_home').val())
    // BATAS TESTING

    
    var province_pilihan=$('.province-home-gb option:selected').val()
    var kota_pilihan=$('.kota-home-gb option:selected').val()
    var kecamatan_pilihan=$('.kecamatan-home-gb option:selected').val()
    var kelurahan_pilihan=$('.kelurahan-home-gb option:selected').val()
    var kodepos_pilihan = $('.kodepos-home-gb').val()
    var new_kurir_pilihan = $('.active_delivery_method').attr('data-value')
    var payment_method_pilihan = $('.radio_payment_method').attr('data-value')
    var total_Quantity = parseInt($('.qty_groupbuy_home').val())+1
    var pengiriman_pilihan = $('.pengiriman-home-gb option:selected').val()    
    var asuransi_pilihan = $('.asuransi-home-gb option:selected').val()
    var packing_pilihan = $('.packing-home-gb option:selected').val()
    var harga_shipping = parseInt($('.pengiriman-home-gb option:selected').attr('class'))
    var harga_asuransi = parseInt($('.asuransi-home-gb option:selected').attr('class'))
    var harga_packing = parseInt($('.packing-home-gb option:selected').attr('class'))
    var total_harga_shipping_with_product = $('.harga_total_prod_with_shipping_qty').attr('id')
    var harga_shipping_qty = $('.harga_shipping_qty').attr('id')
    var harga_total_product = $('.harga_total_product_qty').attr('id')
    var biaya_pengiriman = parseInt(harga_shipping_qty)

    var isKurir_pilihan = false
    var isProvince_pilihan = false
    var isKota_pilihan = false
    var isKecamatan_pilihan = false
    var isKelurahan_pilihan = false
    var isQty_pilihan = false
    var isAlamat_pilihan = false
    var isPacking_pilihan = false
    var isPaymentMethod_pilihan = false
    var isPengiriman_pilihan = false
    if(harga_packing == undefined || harga_packing == null || harga_packing == 'NULL' || harga_packing == 'undefined' || isNaN(harga_packing)){
        harga_packing = 0
    }

    

    var alamat_input = $('#alamat_gb').val()
    var alamat_lain_input = $('#alamat_lain').val()
    
    
    if(asuransi_pilihan == 'Asuransi' ){
        asuransi_pilihan = ''
    }
    if(packing_pilihan == 'Packing'){
        packing_pilihan = ''
    }


    var total_harga_shipping_with_insurance_packing = harga_shipping + harga_asuransi + harga_packing
    

    var product_name_shipping = pengiriman_pilihan + asuransi_pilihan + packing_pilihan
    
    if(alamat_lain_input.length>0){
       isAlamat_pilihan = true
        var final_address_new = alamat_lain_input + kecamatan_pilihan + kelurahan_pilihan + kota_pilihan + province_pilihan + kodepos_pilihan
        
    }else if (alamat_input.length > 0) {      
        isAlamat_pilihan = true
        var final_address = alamat_input + ' ' + kecamatan_pilihan + ' ' + kelurahan_pilihan + ' ' + kota_pilihan + ' ' + province_pilihan + ' ' + kodepos_pilihan
        
    }else {
        isAlamat_pilihan = false
    }

    if(new_kurir_pilihan == undefined || new_kurir_pilihan == 'undefined' || new_kurir_pilihan == null || new_kurir_pilihan.length == 0){
        isKurir_pilihan = false
    }else {
        isKurir_pilihan = true
    }

    if(pengiriman_pilihan == undefined || pengiriman_pilihan == 'undefined' || pengiriman_pilihan == null || pengiriman_pilihan.length == 0){
        isPengiriman_pilihan = false
    }else {
        isPengiriman_pilihan = true
    }

    if(payment_method_pilihan == undefined || payment_method_pilihan == 'undefined' || payment_method_pilihan == null || payment_method_pilihan.length == 0){
        isPaymentMethod_pilihan = false
    }else {
        isPaymentMethod_pilihan = true
    }

    if(packing_pilihan == undefined || packing_pilihan == null || packing_pilihan == 'NULL' || packing_pilihan == 'undefined'){
        packing_pilihan = ''
        isPacking_pilihan = false
    }else {
        isPacking_pilihan = true
    }

    if(kecamatan_pilihan == undefined || kecamatan_pilihan == null || kecamatan_pilihan == 'NULL' || kecamatan_pilihan == 'undefined'){
        
         kecamatan_pilihan = ''
         isKecamatan_pilihan = false
     }else {
        isKecamatan_pilihan = true
     }
     if( kelurahan_pilihan == undefined || kelurahan_pilihan == null || kelurahan_pilihan == 'NULL' || kelurahan_pilihan == 'undefined'){
         
         kelurahan_pilihan = ''
         isKelurahan_pilihan = false
     }else {
        isKelurahan_pilihan = true
     }

     var totalQtyIsANumber = isNaN(total_qty_from_user)
     
     if(total_qty_from_user == undefined || total_qty_from_user == 'undefined' || total_qty_from_user == null || total_qty_from_user.length == 0 || total_qty_from_user == NaN || totalQtyIsANumber){
         isQty_pilihan = false
     }else {
         isQty_pilihan = true
     }
     
     
 
     if(province_pilihan == undefined || province_pilihan == 'undefined' || province_pilihan == null || province_pilihan.length == 0){
         isProvince_pilihan = false
     }else {
         isProvince_pilihan = true
     }
     if(kota_pilihan == undefined || kota_pilihan == 'undefined' || kota_pilihan == null || kota_pilihan.length == 0){
         isKota_pilihan = false
     }else {
         isKota_pilihan = true
     }

     if(isPaymentMethod_pilihan && isProvince_pilihan && isKota_pilihan && isKecamatan_pilihan && isKelurahan_pilihan && isQty_pilihan &&
        isPengiriman_pilihan){
            get_all_couriers().done(function(response){
                var dataAllKurir = response
                allKurir = response
                
                
                var kurir_kode =''
                for(var i=0; i<dataAllKurir.length; i++){
                    if(dataAllKurir[i].Courier == new_kurir_pilihan){
                        kurir_kode = dataAllKurir[i].Courier_Code
                    }
                }
                if(total_qty_from_user>0) { 
                    axios.post(`http://sales.sold.co.id/check-group-buy-quantity-so-far-gross?Group_Buy_Purchase_PC=${product_id}`)
                    .then((res)=>{
                        total_item_kebeli = res.data
                        
                        if(res.data.Total_Quantity === null) { // hasil null berarti belum ada customer lain yang beli
                            
                            axios.post(`http://products.sold.co.id/get-product-details?product_code=${product_id}`)
                            .then((res)=>{
                                
                                detail_product = res.data
                                axios.post(`http://customers.sold.co.id/get-customer-information?Customer_Code=${token}`)
                                .then((res)=>{
                                    
                                    
                                    customerDetails  ={
                                        Customer_Code:token,
                                        Total_Price: total_harga_shipping_with_product,
                                        Total_Quantity : total_Quantity,
                                        Unit:"pcs",
                                        Shipping_Address: final_address,
                                        Payment_Method : payment_method_pilihan,
                                        Shipping_Fee: harga_shipping_qty,
                                        Primary_Recipient_Name:res.data.First_Name + " " + res.data.Last_Name,
                                        Shipping_Contact_Number:res.data.Contact_Number_1
                                    }         
                                    items.push( {
                                            Customer_Code: token,
                                            Product_Code: product_id,
                                            Product_Name: detail_product.Name,
                                            Quantity_Requested: $('.qty_groupbuy_home').val(),
                                            Price_Based_On_Total_Quantity: harga_total_product
                    
                                    }) 
                                    items.push( {
                                        Customer_Code: token,
                                        Product_Code: kurir_kode,
                                        Product_Name: product_name_shipping,
                                        Quantity_Requested: '1',
                                        Price_Based_On_Total_Quantity: total_harga_shipping_with_insurance_packing
                
                                    })  
                                    var data = {
                                        "Sales_Order_Data": customerDetails,
                                        "Sales_Order_Detail_data": items
                                    }
                                    
            
                                    axios.post(`http://sales.sold.co.id/create-new-group-buy-sales-order-by-customer?Customer_Code=${token}`,data,{
                                        headers:{
                                            "Content-Type":'application/json'
                                        },
                                        "data":JSON.stringify({
                                            "Sales_Order_data":customerDetails,
                                            "Sales_Order_Detail_data": items
                                        })
                                    }).then((res)=>{
                                        if(res.data.status){
                                            // swal.fire("Penambahan Data Berhasil, Silahkan Check Cart", "", "success");
                                            Swal.fire({
                                                html:`
                                                <div class="o-circle c-container__circle o-circle__sign--success">
                                                    <div class="o-circle__sign"></div>  
                                                </div>   
                                                Penambahan Data Berhasil
                                                `,
                                                timer:2000,
                                                
                                            })
                                            $('.modals-product-detail').css('display','none')
                                            $('.box-delete-success').css('display','block')
                                            // tambahin gambar yg dari mas fauzi
                                            
                                            location.replace(`../Iframe/success.html`)
                                        }else {
                                            Swal.fire({
                                                html:`
                                                <div class="o-circle c-container__circle o-circle__sign--failure">
                                                    <div class="o-circle__sign"></div>  
                                                </div> 
                                                Pembelian Gagal`,
                                                timer:2000,
                                                
                                            })
                                        }
                                        
                                    }).catch((err)=>{
                                        
                                    })
                                    
            
                                }).catch((err)=>{
                                    
                                })
                            }).catch((err)=>{
                                
                            })
                        }else { // hasil else dari if null berarti ada cust yg udh beli. sisa productnya
                            
                            axios.post(`http://products.sold.co.id/get-product-details?product_code=${product_id}`)
                            .then((response)=>{
                                
                                
                                var item_tersedia = response.data.GroupBuy_SellQuantity - total_item_kebeli.Total_Quantity
                                
                                if(total_qty_from_user > item_tersedia){
                    
                                      Swal.fire({
                                        html:`
                                        <div class="o-circle c-container__circle o-circle__sign--failure">
                                            <div class="o-circle__sign"></div>  
                                        </div> 
                                        Hanya Bisa Membeli ${item_tersedia}`,
                                        timer:2000,
                                        
                                    })
            
                                      axios.post(`http://products.sold.co.id/get-product-details?product_code=${product_id}`)
                                      .then((res)=>{
                                          
                                          detail_product = res.data
                                          axios.post(`http://customers.sold.co.id/get-customer-information?Customer_Code=${token}`)
                                          .then((res)=>{
                                              
                                              data_customer = res.data
                                              var harga_pembelian = item_tersedia * parseInt(detail_product.GroupBuy_SellPrice)
                                              
                                              
                                              customerDetails  ={
                                                Customer_Code:token,
                                                Total_Price: total_harga_shipping_with_product,
                                                Total_Quantity : item_tersedia +1,
                                                Unit:"pcs",
                                                Shipping_Address: final_address,
                                                Payment_Method : payment_method_pilihan,
                                                Shipping_Fee: harga_shipping_qty,
                                                Shipping_Contact_Number:res.data.Contact_Number_1,
                                                Primary_Recipient_Name:data_customer.First_Name + " " + data_customer.Last_Name
                                            }         
                                            items.push( {
                                                    Customer_Code: token,
                                                    Product_Code: product_id,
                                                    Product_Name: detail_product.Name,
                                                    Quantity_Requested: item_tersedia,
                                                    Price_Based_On_Total_Quantity: harga_total_product
                            
                                            }) 
                                            items.push( {
                                                Customer_Code: token,
                                                Product_Code: kurir_kode,
                                                Product_Name: product_name_shipping,
                                                Quantity_Requested: '1',
                                                Price_Based_On_Total_Quantity: total_harga_shipping_with_insurance_packing
                        
                                            })  
                                            var data = {
                                                "Sales_Order_Data": customerDetails,
                                                "Sales_Order_Detail_data": items
                                            }     
                                            
                                            
                                                  
                                                  
                                                axios.post(`http://sales.sold.co.id/create-new-group-buy-sales-order-by-customer?Customer_Code=${token}`,data,{
                                                    headers:{
                                                        "Content-Type":'application/json'
                                                    },
                                                    "data":JSON.stringify({
                                                        "Sales_Order_data":customerDetails,
                                                        "Sales_Order_Detail_data": items
                                                    })
                                                }).then((res)=>{
                                                    
                                                    if(res.data){
                                                        Swal.fire({
                                                            html:`
                                                            <div class="o-circle c-container__circle o-circle__sign--success">
                                                                <div class="o-circle__sign"></div>  
                                                            </div>   
                                                            Pembelian Data Berhasil
                                                            `,
                                                            timer:2000,
                                                            
                                                        })
                                                        // tambahin gambar yg dari mas fauzi
                                                        
                                                        location.replace(`../Iframe/success.html`)
                                                    }else {
                                                        // swal.fire("Pembelian Gagal, Silahkan Check Cart", "", "error");
                                                        Swal.fire({
                                                            html:`
                                                            <div class="o-circle c-container__circle o-circle__sign--failure">
                                                                <div class="o-circle__sign"></div>  
                                                            </div> 
                                                            Pembelian Gagal, Silahkan Check Cart`,
                                                            timer:2000,
                                                            
                                                        })
                                                    }
                                                    // $('.modals-product-detail').css('display','none')
                                                }).catch((err)=>{
                                                    
                                                })         
                                          }).catch((err)=>{
                                              
                                          })
                                      }).catch((err)=>{
                                          
                                      })
                                }else {// pembelian jika total qty dari user tidak melebihi item yang tersedia
                                    
                                    axios.post(`http://products.sold.co.id/get-product-details?product_code=${product_id}`)
                                    .then((res)=>{
                                        detail_product = res.data
                                        axios.post(`http://customers.sold.co.id/get-customer-information?Customer_Code=${token}`)
                                        .then((res)=>{
                                            data_customer =res.data
                                            
                                            customerDetails  ={
                                                Customer_Code:token,
                                                Total_Price: total_harga_shipping_with_product,
                                                Total_Quantity : total_Quantity,
                                                Unit:"pcs",
                                                Shipping_Address: final_address,
                                                Payment_Method : payment_method_pilihan,
                                                Shipping_Fee: harga_shipping_qty,
                                                Shipping_Contact_Number:res.data.Contact_Number_1,
                                                Primary_Recipient_Name:data_customer.First_Name + " " + data_customer.Last_Name
                                            }         
                                            items.push( {
                                                    Customer_Code: token,
                                                    Product_Code: product_id,
                                                    Product_Name: product_name_shipping,
                                                    Quantity_Requested: $('.qty_groupbuy_home').val(),
                                                    Price_Based_On_Total_Quantity: harga_total_product
                            
                                            }) 
                                            items.push( { // data kurir
                                                Customer_Code: token,
                                                Product_Code: kurir_kode,
                                                Product_Name: product_name_shipping,
                                                Quantity_Requested: '1',
                                                Price_Based_On_Total_Quantity:total_harga_shipping_with_insurance_packing
                        
                                            })  
                                            var data = {
                                                "Sales_Order_Data": customerDetails,
                                                "Sales_Order_Detail_data": items
                                            }    
                                            
                                            
                                            
            
                                            axios.post(`http://sales.sold.co.id/create-new-group-buy-sales-order-by-customer?Customer_Code=${token}`,data,{
                                                headers:{
                                                    "Content-Type":'application/json'
                                                },
                                                "data":JSON.stringify({
                                                    "Sales_Order_data":customerDetails,
                                                    "Sales_Order_Detail_data": items
                                                })
                                            }).then((res)=>{
                                                if(res.data.status){
                                                    
                                                    // swal.fire("Penambahan Data Berhasil, Silahkan Check Cart", "", "success");
                                                    Swal.fire({
                                                        html:`
                                                        <div class="o-circle c-container__circle o-circle__sign--success">
                                                            <div class="o-circle__sign"></div>  
                                                        </div>   
                                                        Penambahan Data Berhasil
                                                        `,
                                                        timer:2000,
                                                        
                                                    })
                                                    // close_all_open_window()
                                                    $('.modals-product-detail').css('display','none')
                                                    $('.box_iframe_groupbuy').css('display','none')
                                                    
                                                    
                                                    $('.box_iframe_groupbuy').remove()
                                                    // tambahin gambar yg dari mas fauzi
                                                    
                                                    location.replace(`../Iframe/success.html`)
            
                                                    
                                                }else {
                                                    // swal.fire("Penambahan Data gagal, Silahkan Check Pengisian data", "", "success");
                                                    Swal.fire({
                                                        html:`
                                                        <div class="o-circle c-container__circle o-circle__sign--failure">
                                                            <div class="o-circle__sign"></div>  
                                                        </div> 
                                                        Penambahan Data Gagal, Silahkan Check Pengisian Data`,
                                                        timer:2000,
                                                        
                                                    })
                                                    $('.modals-product-detail').css('display','none')
                                                }
                                            }).catch((err)=>{
                                                
                                            })
                                            // refresh()
            
                                        }).catch((err)=>{
                                            
                                        })
                                    }).catch((err)=>{
                                        
                                    })
                                }
                            }).catch((err)=>{
                                
                            })
                        }
                    }).catch((err)=>{
                        
                    })
                }else {
                    
                }
            })
    }else { // ada yang belum di isi
        Swal.fire({
            html:`
            <div class="o-circle c-container__circle o-circle__sign--failure">
                <div class="o-circle__sign"></div>  
            </div> 
            Ada Field yang belum Di isi`,
            timer:2000,
            
        })

    }

    



//     // BATAS TESTING 

    
    
   


    
}



const open_checkout=(product_id)=>{
    // $('.iframe',window.parent.parent.document).css('display','block')
    // console.log($('.iframe',window.parent.parent.document))

    console.log(product_id)
    addToCart(product_id)
    
    var array = []
    localStorage.setItem('itemsToCheckout',array)
    axios.post(`http://products.sold.co.id/get-product-details?product_code=${product_id}`)
    .then((res)=>{
        if(res.data.Stock_Quantity > 1){
            var productToBeAdded = {
                productNo: product_id,
                quantity: 1,
                GroupCode: "NO COUPON",
                priceAgreed: res.data.Sell_Price
            }
            array.push(productToBeAdded)
            
            var productToBeAddedStringify = JSON.stringify(array);
            localStorage.setItem("itemsToCheckout", productToBeAddedStringify);
    
            console.log(productToBeAdded)
    
    
        $('.close-button',window.parent.parent.document).css('display','block')
        
        $('.close',window.parent.parent.document).css('display','none')
        
        $('.groupbuy_sp_iframe',window.parent.document).css('display','none')
        // $(".iframe",window.parent.document).toggle();
        $('.iframe',window.parent.parent.document).toggle()
        
       
        if($('.option-3',window.parent.parent.document).hasClass('background_grey')){
            $('.option-3',window.parent.parent.document).removeClass('background_grey')
        }else {
            $('.option-3',window.parent.parent.document).addClass('background_grey')
        }

        console.log($('.option-3',window.parent.parent.document))
        
        // $('.main-body').css('display','none')
        // $('.modals-search-result').css('display','block')
        
        // $('.iframe').css('display','block')
        // $('.modals-pengiriman',window.parent.document).css("display",'none')
        // $('.modals-check-harga',window.parent.document).css("display",'none')
        $('.option-1',window.parent.parent.document).removeClass('background_grey')
        $('.option-2',window.parent.parent.document).removeClass('background_grey')
        $('.option-0',window.parent.parent.document).removeClass('background_grey')
        $(".iframe",window.parent.parent.document).attr("src", `../WEB/Iframe/checkout.html?checkout_array=${productToBeAddedStringify}`);
        $('.close-button',window.parent.parent.document).css('display','none')

          // SEARCH ITEM BACK TO NORMAL
          $('.box-render-search',window.parent.parent.document).css('display','none')
          $('.input-name',window.parent.parent.document).css('border-bottom-left-radius','10px')
          $('.input-name',window.parent.parent.document).css('border-bottom-right-radius','10px')
          $('.input-name',window.parent.parent.document).val(null)
        }else {
            // swal.fire("Barang Tidak Tersedia","","warning");
            Swal.fire({
                html:`
                <div class="o-circle c-container__circle o-circle__sign--failure">
                    <div class="o-circle__sign"></div>  
                </div> 
                Barang Tidak Tersedia`,
                timer:2000,
                
            })
        }

    }).catch((err)=>{
        console.log(err)
    })



}

const buyNow=(product_id)=>{
    console.log(product_id)
    addToCart(product_id)
    
    var array = []
    localStorage.setItem('itemsToCheckout',array)
    axios.post(`http://products.sold.co.id/get-product-details?product_code=${product_id}`)
    .then((res)=>{
        if(res.data.Stock_Quantity > 1){
            var productToBeAdded = {
                productNo: product_id,
                quantity: 1,
                GroupCode: "NO COUPON",
                priceAgreed: res.data.Sell_Price
            }
            array.push(productToBeAdded)
            
            var productToBeAddedStringify = JSON.stringify(array);
            localStorage.setItem("itemsToCheckout", productToBeAddedStringify);
    
            console.log(productToBeAdded)
            
        // $('.box_iframe_groupbuy',window.parent.document).css('display','none')
    
        $('.close-button',window.parent.document).css('display','block')
        

        $('.close',window.parent.document).css('display','none')
        
        // $('.close').css('display','none')
        
        $('.modals-product-detail',window.parent.document).css('display','none')
        $(".iframe",window.parent.document).toggle();
        
        if($('.option-3',window.parent.parent.document).hasClass('background_grey')){
            $('.option-3',window.parent.parent.document).removeClass('background_grey')
        }else {
            $('.option-3',window.parent.parent.document).addClass('background_grey')
        }
        
        
        // $('.main-body').css('display','none')
        // $('.modals-search-result').css('display','block')
        
        // $('.iframe').css('display','block')
        $('.modals-pengiriman',window.parent.document).css("display",'none')
        $('.modals-check-harga',window.parent.document).css("display",'none')
        $('.option-1',window.parent.document).removeClass('background_grey')
        $('.option-2',window.parent.document).removeClass('background_grey')
        $('.option-0',window.parent.document).removeClass('background_grey')
        $(".iframe",window.parent.document).attr("src", `../WEB/Iframe/checkout.html?checkout_array=${productToBeAddedStringify}`);
        $('.close-button',window.parent.document).css('display','none')

          // SEARCH ITEM BACK TO NORMAL
          $('.box-render-search',window.parent.document).css('display','none')
          $('.input-name',window.parent.document).css('border-bottom-left-radius','10px')
          $('.input-name',window.parent.document).css('border-bottom-right-radius','10px')
          $('.input-name',window.parent.document).val(null)
        }else {
            // swal.fire("Barang Tidak Tersedia","","warning");
            Swal.fire({
                html:`
                <div class="o-circle c-container__circle o-circle__sign--failure">
                    <div class="o-circle__sign"></div>  
                </div> 
                Barang Tidak Tersedia`,
                timer:2000,
                
            })
        }

    }).catch((err)=>{
        console.log(err)
    })
}


function addToCart(product_id){

    axios.post(`http://products.sold.co.id/get-product-details?product_code=${product_id}`)
    .then((res)=>{
        
        var quantity_product = parseInt(res.data.Stock_Quantity)
        

        if(quantity_product == 0 || quantity_product == '0' ||
           quantity_product == undefined || quantity_product==null ||
           isNaN(quantity_product) || quantity_product < 0
        ){
            // Swal.fire("Stock Tidak Tersedia", "Error", "error");
            Swal.fire({
                html:`
                <div class="o-circle c-container__circle o-circle__sign--failure">
                    <div class="o-circle__sign"></div>  
                </div> 
                Stock Tidak Tersedia`,
                timer:2000,
                
            })
        }else {
            var dataParse = JSON.parse(localStorage.getItem("itemsInCart"))
            
            if(dataParse){
                
        
                var filterdatakosong = dataParse.filter((filtering)=>{
                    if(filtering.productNo === product_id){
                        return filtering
                    }
                })
                if(filterdatakosong.length){
                    
                    
                    var objIndex = dataParse.findIndex((obj => obj.productNo == product_id));
                    dataParse[objIndex].quantity = dataParse[objIndex].quantity +1
                    $('.cart-counter').text(dataParse.length)
                    // swal.fire("Berhasil Menambahkan Quantity", "", "success");
                    Swal.fire({
                        html:`
                        <div class="o-circle c-container__circle o-circle__sign--success">
                            <div class="o-circle__sign"></div>  
                        </div>   
                        Berhasil Menambahkan Quantity
                        `,
                        timer:2000,
                        
                    })
                }else {
                    
                    var data = {
                    "productNo":product_id,
                    "quantity":1
                    }
                    dataParse.push(data)
                    $('.cart-counter').text(dataParse.length)
                    // swal.fire("Berhasil Menambahkan ke Cart", "", "success");
                    Swal.fire({
                        html:`
                        <div class="o-circle c-container__circle o-circle__sign--success">
                            <div class="o-circle__sign"></div>  
                        </div>   
                        Berhasil Menambahkan ke Cart
                        `,
                        timer:2000,
                        
                    })
                }
        
                var pushToStorage = JSON.stringify(dataParse)
                localStorage.setItem('itemsInCart',pushToStorage)
        
            }else {
                
                var cart = [
                    {
                    "productNo":product_id,
                    "quantity":1
                    }
                ]
                var pushToStorage2 = JSON.stringify(cart)
                localStorage.setItem('itemsInCart',pushToStorage2)     
            }
        

        }
    }).catch((err)=>{
        
    })
    
   
  
  

    

}


function addressMethod(address,item){
    
    // 
    $('.radio_address_card').removeClass('selected')
    $('.radio_address_card').removeClass('active_address_method')

    var address_id = address
    var id = $('.radio_address_card').attr('id')
    
    

    $(`#${address}`).addClass('selected')
    $(`#${address}`).addClass('active_address_method')
    // if(address_id == id ){
    //     
    //     $(`#${address}`).addClass('selected')
    //     $(`#${address}`).addClass('active_payment_method')
    // }else {
    //     
    // }

    if(item === 'Alamat Terdaftar'){
        
        $('.option-alamat-gb').css('display','flex')
        $('.new-alamat-pengiriman').css('display','none')
    }else if (item === 'Alamat Baru'){
        
        $('.option-alamat-gb').css('display','none')
        $('.new-alamat-pengiriman').css('display','flex')
    }
}

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









// EDIT DISCOUNT
const edit_product_discount=(product_id)=>{
    $("#"+product_id+"-discount").prop('disabled',false) 
    $("#"+product_id+"-discount").css('background-color','#ddd')


    $("#"+product_id+"-box_edit_discount").css('display','none') // icon 
    $("#"+product_id+"-save_discount").css('display','block') // icon
}

const save_edit_discount=(product_id)=>{
    $('#get_otp').modal('show')
    $('#s_product_name').addClass(product_id)
    $('#s_product_name').addClass('product_discount')

    clearOTPform()

}



//  QTY
 const edit_product_qty=(product_id)=>{
    $("#"+product_id+"-qty").prop('disabled',false) 
    $("#"+product_id+"-qty").css('background-color','#ddd')


    $("#"+product_id+"-box_edit_qty").css('display','none') // icon 
    $("#"+product_id+"-save_qty").css('display','block') // icon
 }

//  
 const save_edit_qty=(product_id)=>{
    $('#get_otp').modal('show')
    $('#s_product_name').addClass(product_id)
    $('#s_product_name').addClass('product_quantity')

    clearOTPform()
 }


// HARGA
const edit_product_harga=(product_id)=>{
    $("#"+product_id+"-harga").prop('disabled',false) 
    $("#"+product_id+"-harga").css('background-color','#ddd')


    $("#"+product_id+"-box_edit_harga").css('display','none') // icon 
    $("#"+product_id+"-save_harga").css('display','block') // icon
    
}

const save_edit_harga=(product_id)=>{

    $('#get_otp').modal('show')
    $('#s_product_name').addClass(product_id)
    $('#s_product_name').addClass('product_sell_price')

    clearOTPform()

}


// NAME
const edit_product_name=(product_id)=>{
    // $("input").prop('disabled', true);
    // alert(product_id)
    // $(".prod_name").prop('disabled', false); 6900005030114
    
    $("#"+product_id+"-name").prop('disabled',false) 
    $("#"+product_id+"-name").css('background-color','#ddd')
    $("#"+product_id+"-box_edit_name").css('display','none') // icon 
    $("#"+product_id+"-save_name").css('display','block') // icon

    // $('.icon-edit-prod').prop('disabled',true)
  

}

const clearOTPform=()=>{
    $('#id_otp').val('')
    $('#id_pass').val('')
}


const save_edit_name=(product_id)=>{
    // alert($("#"+product_id+"-name").val())
    
    $('#get_otp').modal('show')
    $('#s_product_name').addClass(product_id)
    $('#s_product_name').addClass('product_name')
 

    clearOTPform()
}

const check_number_wa=()=>{

    Swal.fire({
        title: 'Whatsapp Number  <br> +62812 7777 8888',
        text: "Ingin Menghubungi Customer Service?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
      }).then((result) => {
          
          if(result.dismiss==='cancel'){
        }else {
            
            window.open("https://wa.me/6281277778888","_blank")
          }
      })
}


const change_status_otp=(token)=>{
    $('#get_otp').modal('show')
    $('#s_product_name').addClass(token)
    $('#s_product_name').addClass('status_gb')

    clearOTPform()
}

const save_product_name=()=>{
    // alert('simpan jalan')
    var otp = $('#id_otp').val()
    var pass = $('#id_pass').val()
    var token = localStorage.getItem('token')
    var email;
    var item = document.getElementById('s_product_name').className.split(/\s+/);
    var product_id = item[1]
    var jenis_edit = item[2]
    if(jenis_edit === 'product_name'){
        
        axios.post(`http://customers.sold.co.id/get-customer-information?Customer_Code=${token}`)
        .then((res)=>{
            
            email = res.data.Email
            //encrypt pass
            var new_pass
            axios.post(`http://customers.sold.co.id/password-generator?Password=${pass}`)
            .then((res)=>{
                if(res.data){
                    new_pass = res.data

                    axios.post(`http://customers.sold.co.id/verify-otp?Email=${email}&User_Password=${new_pass}&otp=${otp}`)
                    .then((res)=>{
                        
                        if(res.data){
                            $("#"+product_id+"-name").prop('disabled',true) 
                            $("#"+product_id+"-box_edit_name").css('display','block') // icon 
                            $("#"+product_id+"-save_name").css('display','none') // icon
                            $("#"+product_id+"-name").css('background-color','transparent')
    
                            var nama = $("#"+product_id+"-name").val()
                            var harga = $("#"+product_id+"-harga").val()
                            var qty = $("#"+product_id+"-qty").val()
                            var token = localStorage.getItem('token')
    
                            
                            
                            
                            
    
                            if(nama.length <5){
                                axios.post(`http://products.sold.co.id/get-product-details?product_code=${product_id}`)
                                .then((res)=>{
                                    
                                    $("#"+product_id+"-name").val(res.data.Name)
                                    // swal.fire("Gagal Mengubah Data", "", "error");
                                    Swal.fire({
                                        html:`
                                        <div class="o-circle c-container__circle o-circle__sign--failure">
                                            <div class="o-circle__sign"></div>  
                                        </div> 
                                        Gagal Mengubah Data`,
                                        timer:2000,
                                        
                                    })
                                    re_render_item_product()
                                }).catch((err)=>{
                                    
                                })
                            }else {
                                axios.post(`http://products.sold.co.id/update-product-name-price-quantity?Name=${nama}&Sell_Price=${harga}&Stock_Quantity=${qty}&Product_Code=${product_id}&Customer_Code=${token}&Email=${email}&Password=${pass}`)
                                .then((res)=>{
                                    
                                    if(res.data){
                                        Swal.fire({
                                            html:`
                                            <div class="o-circle c-container__circle o-circle__sign--success">
                                                <div class="o-circle__sign"></div>  
                                            </div>   
                                            Berhasil Mengubah Data
                                            `,
                                            timer:2000,
                                            
                                        })
                                        $('#s_product_name').removeClass(product_id)
                                        $('#s_product_name').removeClass('product_name')
                                         $('#id_otp').val('')
                                         $('#id_pass').val('')
                                         re_render_item_product()
                                    }else {
                                        Swal.fire({
                                            html:`
                                            <div class="o-circle c-container__circle o-circle__sign--failure">
                                                <div class="o-circle__sign"></div>  
                                            </div> 
                                            Gagal Mengubah Data`,
                                            timer:2000,
                                            
                                        })
                                        re_render_item_product()
                                    }
                                }).catch((err)=>{
                                    
                                })
                            }
                            // Swal.fire('Simpan Berhasil', '', 'success')
                            $('#get_otp').modal('hide')
                        }else {
                            // Swal.fire('Simpan Gagal', '', 'error')
                            Swal.fire({
                                html:`
                                <div class="o-circle c-container__circle o-circle__sign--failure">
                                    <div class="o-circle__sign"></div>  
                                </div> 
                                Simpan Gagal`,
                                timer:2000,
                                
                            })
                        }
                    }).catch((err)=>{
                        
                    })
                }else {
                    
                    // Swal.fire('Password Minimal 6 character', '', 'error')
                    Swal.fire({
                        html:`
                        <div class="o-circle c-container__circle o-circle__sign--failure">
                            <div class="o-circle__sign"></div>  
                        </div> 
                        Password Minimal 6`,
                        timer:2000,
                        
                    })
                }
                
        
               
            }).catch((err)=>{
                
            })
        }).catch((err)=>{
            
        })

    }else if (jenis_edit === 'product_sell_price'){
        axios.post(`http://customers.sold.co.id/get-customer-information?Customer_Code=${token}`)
        .then((res)=>{
            email = res.data.Email
            var new_pass
            axios.post(`http://customers.sold.co.id/password-generator?Password=${pass}`)
            .then((res)=>{
                new_pass = res.data
                if(res.data){
                    axios.post(`http://customers.sold.co.id/verify-otp?Email=${email}&User_Password=${new_pass}&otp=${otp}`)
                    .then((res)=>{
                        if(res.data){
                            $("#"+product_id+"-harga").prop('disabled',true) 
                            $("#"+product_id+"-box_edit_harga").css('display','block') // icon 
                            $("#"+product_id+"-save_harga").css('display','none') // icon
                            $("#"+product_id+"-harga").css('background-color','transparent')
                    
                            var nama = $("#"+product_id+"-name").val()
                            var harga = $("#"+product_id+"-harga").val()
                            var qty = $("#"+product_id+"-qty").val()
                            var token = localStorage.getItem('token')
                            
                            
                            
                            
                    
                            if(harga <500){
                                axios.post(`http://products.sold.co.id/get-product-details?product_code=${product_id}`)
                                    .then((res)=>{
                                        
                                        $("#"+product_id+"-harga").val(res.data.Sell_Price)
                                        // swal.fire("Gagal Mengubah Data", "", "error");
                                        Swal.fire({
                                            html:`
                                            <div class="o-circle c-container__circle o-circle__sign--failure">
                                                <div class="o-circle__sign"></div>  
                                            </div> 
                                            Gagal Mengubah Data`,
                                            timer:2000,
                                            
                                        })
                                        re_render_item_product()
                                    }).catch((err)=>{
                                        
                                    })
                            }else {
                                axios.post(`http://products.sold.co.id/update-product-name-price-quantity?Name=${nama}&Sell_Price=${harga}&Stock_Quantity=${qty}&Product_Code=${product_id}&Customer_Code=${token}&Email=${email}&Password=${pass}`)
                                .then((res)=>{
                                    
                                    if(res.data){
                                        // swal.fire("Berhasil Mengubah Data", "", "success");
                                        Swal.fire({
                                            html:`
                                            <div class="o-circle c-container__circle o-circle__sign--success">
                                                <div class="o-circle__sign"></div>  
                                            </div>   
                                            Berhasil Mengubah Data
                                            `,
                                            timer:2000,
                                            
                                        })
                                        $('#s_product_name').removeClass(product_id)
                                        $('#s_product_name').removeClass('product_sell_price')
                                        re_render_item_product()
                                    }else {
                                        re_render_item_product()
                                        // swal.fire("Gagal Mengubah Data", "", "error");
                                        Swal.fire({
                                            html:`
                                            <div class="o-circle c-container__circle o-circle__sign--failure">
                                                <div class="o-circle__sign"></div>  
                                            </div> 
                                            Gagal Mengubah Data`,
                                            timer:2000,
                                            
                                        })
                                    }
                                }).catch((err)=>{
                                    
                                })
                                // Swal.fire('Simpan Berhasil', '', 'success')
                                Swal.fire({
                                    html:`
                                    <div class="o-circle c-container__circle o-circle__sign--success">
                                        <div class="o-circle__sign"></div>  
                                    </div>   
                                    Simpan Berhasil
                                    `,
                                    timer:2000,
                                    
                                })
                                $('#get_otp').modal('hide')
                            }
                        }else {
                            // Swal.fire('Simpan Gagal', '', 'error')
                            Swal.fire({
                                html:`
                                <div class="o-circle c-container__circle o-circle__sign--failure">
                                    <div class="o-circle__sign"></div>  
                                </div> 
                                Simpan Gagal`,
                                timer:2000,
                                
                            })
                        }
                    }).catch((err)=>{
                        
                    })

                }else {
                    
                    // Swal.fire('Password Minimal 6 character', '', 'error')
                    Swal.fire({
                        html:`
                        <div class="o-circle c-container__circle o-circle__sign--failure">
                            <div class="o-circle__sign"></div>  
                        </div> 
                        Password Minimal 6 Character`,
                        timer:2000,
                        
                    })
                }

            }).catch((err)=>{
                
            })
        }).catch((err)=>{

        })
    }else if ( jenis_edit === 'product_quantity'){
        axios.post(`http://customers.sold.co.id/get-customer-information?Customer_Code=${token}`)
        .then((res)=>{
            email = res.data.Email     
            var new_pass
            axios.post(`http://customers.sold.co.id/password-generator?Password=${pass}`)
            .then((res)=>{
                if(res.data){
                    new_pass = res.data            
                    axios.post(`http://customers.sold.co.id/verify-otp?Email=${email}&User_Password=${new_pass}&otp=${otp}`)
                    .then((res)=>{
                        if(res.data){
                            $("#"+product_id+"-qty").prop('disabled',true) 
                            $("#"+product_id+"-box_edit_qty").css('display','block') // icon 
                            $("#"+product_id+"-save_qty").css('display','none') // icon
                            $("#"+product_id+"-qty").css('background-color','transparent')
        
                            var nama = $("#"+product_id+"-name").val()
                            var harga = $("#"+product_id+"-harga").val()
                            var qty = $("#"+product_id+"-qty").val()
                            var token = localStorage.getItem('token')
        
                            
                            
                            
                            
        
                            if(qty < 10){
                                axios.post(`http://products.sold.co.id/get-product-details?product_code=${product_id}`)
                                .then((res)=>{
                                    
                                    $("#"+product_id+"-qty").val(res.data.Stock_Quantity)
                                    // swal.fire("Gagal Mengubah Data", "", "error");
                                    Swal.fire({
                                        html:`
                                        <div class="o-circle c-container__circle o-circle__sign--failure">
                                            <div class="o-circle__sign"></div>  
                                        </div> 
                                        Gagal Mengubah Data`,
                                        timer:2000,
                                        
                                    })
                                    re_render_item_product()
                                }).catch((err)=>{
                                    
                                })
                            }else {
                                
                                axios.post(`http://products.sold.co.id/update-product-name-price-quantity?Name=${nama}&Sell_Price=${harga}&Stock_Quantity=${qty}&Product_Code=${product_id}&Customer_Code=${token}&Email=${email}&Password=${pass}`)
                                .then((res)=>{
                                    
                                    if(res.data){
                                        // swal.fire("Berhasil Mengubah Data", "", "success");
                                        Swal.fire({
                                            html:`
                                            <div class="o-circle c-container__circle o-circle__sign--success">
                                                <div class="o-circle__sign"></div>  
                                            </div>   
                                            Berhasil Mengubah Data
                                            `,
                                            timer:2000,
                                            
                                        })
                                        $('#s_product_name').removeClass(product_id)
                                        $('#s_product_name').removeClass('product_quantity')
                                        re_render_item_product()
                                    }else {
                                        // swal.fire("Gagal Mengubah Data", "", "error");
                                        Swal.fire({
                                            html:`
                                            <div class="o-circle c-container__circle o-circle__sign--failure">
                                                <div class="o-circle__sign"></div>  
                                            </div> 
                                            Gagal Mengubah Data`,
                                            timer:2000,
                                            
                                        })
                                        re_render_item_product()
                                    }
                                }).catch((err)=>{
                                    
                                })
                            }
                            // Swal.fire('Simpan Berhasil', '', 'success')
                            $('#get_otp').modal('hide')
                        }else {
                            // Swal.fire('Simpan Gagal', '', 'error')
                            Swal.fire({
                                html:`
                                <div class="o-circle c-container__circle o-circle__sign--failure">
                                    <div class="o-circle__sign"></div>  
                                </div> 
                                Simpan Gagal`,
                                timer:2000,
                                
                            })
                        }
                    }).catch((err)=>{
                        
                    })
                }else {
                    
                    // Swal.fire('Password Minimal 6 character', '', 'error')
                    Swal.fire({
                        html:`
                        <div class="o-circle c-container__circle o-circle__sign--failure">
                            <div class="o-circle__sign"></div>  
                        </div> 
                        Password Minimal 6 Character`,
                        timer:2000,
                        
                    })
                }
            }).catch((err)=>{
                
            })
        }).catch((err)=>{
            
        })
    }else if (jenis_edit === 'product_discount'){
        axios.post(`http://customers.sold.co.id/get-customer-information?Customer_Code=${token}`)
        .then((res)=>{
            email = res.data.Email

            var new_pass
            axios.post(`http://customers.sold.co.id/password-generator?Password=${pass}`)
            .then((res)=>{
                if(res.data){
                    new_pass = res.data
                    
                    axios.post(`http://customers.sold.co.id/verify-otp?Email=${email}&User_Password=${new_pass}&otp=${otp}`)
                    .then((res)=>{
                        if(res.data){
                   

                        var status = $("#"+product_id+"-status").val()
                        if(status == 'on'){
                            status = true
                        }else {
                            status = false
                        }

                        var Product_Code = $("#"+product_id+"-pCode").val()
                        var Name = $("#"+product_id+"-pName").val()
                        var qty = $("#"+product_id+"-quantity").val()
                        var price = $("#"+product_id+"-discount").val()
                        var token = localStorage.getItem('token')

                        
                        
                        
                        
                        
                        
                        
                        
                        axios.post(`http://products.sold.co.id/update-product-groupbuy-status-price-quantity?GroupBuy_Purchase=${status}&GroupBuy_SellPrice=${price}&GroupBuy_SellQuantity=${qty}&Product_Code=${Product_Code}&Customer_Code=${token}&Email=${email}&Password=${pass}`)
                        .then((res)=>{
                            
                            if(res.data){
                                $('#get_otp').modal('hide')
                                $("#"+product_id+"-discount").prop('disabled',true) 
                                $("#"+product_id+"-box_edit_discount").css('display','block') // icon 
                                $("#"+product_id+"-save_discount").css('display','none') // icon
                                $("#"+product_id+"-discount").css('background-color','transparent')
                                $('#s_product_name').removeClass(product_id)
                                $('#s_product_name').removeClass('product_discount')
                                // swal.fire("Berhasil Mengubah Data", "", "success");
                                Swal.fire({
                                    html:`
                                    <div class="o-circle c-container__circle o-circle__sign--success">
                                        <div class="o-circle__sign"></div>  
                                    </div>   
                                    Berhasil Mengubah Data
                                    `,
                                    timer:2000,
                                    
                                })
                                // Swal.fire('Simpan Berhasil', '', 'success')
                                
                            }else {
                                // swal.fire("Gagal Mengubah Data", "", "error")    
                                Swal.fire({
                                    html:`
                                    <div class="o-circle c-container__circle o-circle__sign--failure">
                                        <div class="o-circle__sign"></div>  
                                    </div> 
                                    Gagal Mengubah Data`,
                                    timer:2000,
                                    
                                })
                                axios.post(`http://products.sold.co.id/get-products-belong-to-the-supplier?Creator=${token}`)
                                .then((res)=>{
                                    
                                    $("#"+product_id+"-discount").val(res.data.GroupBuy_SellPrice)
                                }).catch((err)=>{
                                    
                                })
                            }
                        }).catch((err)=>{
                            
                        })
                        }else {
                            // Swal.fire('Simpan Gagal', '', 'error')
                            Swal.fire({
                                html:`
                                <div class="o-circle c-container__circle o-circle__sign--failure">
                                    <div class="o-circle__sign"></div>  
                                </div> 
                                Simpan Gagal`,
                                timer:2000,
                                
                            })
                        }
                    }).catch((err)=>{
                        
                    })

                }else {
                    
                    // Swal.fire('Password Minimal 6 character', '', 'error')
                    Swal.fire({
                        html:`
                        <div class="o-circle c-container__circle o-circle__sign--failure">
                            <div class="o-circle__sign"></div>  
                        </div> 
                        Password Minimal 6 Character`,
                        timer:2000,
                        
                    })
                }
            }).catch((err)=>{
                
            })
        }).catch((err)=>{
            
        })
    }else if (jenis_edit === 'groupbuy_qty'){
        
        axios.post(`http://customers.sold.co.id/get-customer-information?Customer_Code=${token}`)
        .then((res)=>{
            email = res.data.Email

            var new_pass
            axios.post(`http://customers.sold.co.id/password-generator?Password=${pass}`)
            .then((res)=>{
                if(res.data){
                    new_pass =res.data

                    axios.post(`http://customers.sold.co.id/verify-otp?Email=${email}&User_Password=${new_pass}&otp=${otp}`)
                    .then((res)=>{
                        if(res.data){

 

                        var status = $("#"+product_id+"-status").val()
                        if(status == 'on'){
                            status = true
                        }else {
                            status = false
                        }

                        // discount price minimal 500perak
                        // qty minimal 5
                        var Product_Code = $("#"+product_id+"-pCode").val()
                        var Name = $("#"+product_id+"-pName").val()
                        var qty = $("#"+product_id+"-quantity").val()
                        var price = $("#"+product_id+"-discount").val()
                        var token = localStorage.getItem('token')
                        
                        
                        
                        
                        axios.post(`http://products.sold.co.id/update-product-groupbuy-status-price-quantity?GroupBuy_Purchase=${status}&GroupBuy_SellPrice=${price}&GroupBuy_SellQuantity=${qty}&Product_Code=${Product_Code}&Customer_Code=${token}&Email=${email}&Password=${pass}`)
                        .then((res)=>{
                            
                            if(res.data){
                                // swal.fire("Berhasil Mengubah Data", "", "success");
                                Swal.fire({
                                    html:`
                                    <div class="o-circle c-container__circle o-circle__sign--success">
                                        <div class="o-circle__sign"></div>  
                                    </div>   
                                    Berhasil Mengubah Data
                                    `,
                                    timer:2000,
                                    
                                })
                                $('#s_product_name').removeClass(product_id)
                                $('#s_product_name').removeClass('groupbuy_qty')
                                $('#get_otp').modal('hide')
                                $("#"+product_id+"-quantity").prop('disabled',true) 
                                $("#"+product_id+"-box_edit_quantity").css('display','block') // icon 
                                $("#"+product_id+"-save_quantity").css('display','none') // icon
                                $("#"+product_id+"-quantity").css('background-color','transparent')
                            }else {
                                // swal.fire("Gagal Mengubah Data", "", "error");
                                Swal.fire({
                                    html:`
                                    <div class="o-circle c-container__circle o-circle__sign--failure">
                                        <div class="o-circle__sign"></div>  
                                    </div> 
                                    Gagal Mengubah Data`,
                                    timer:2000,
                                    
                                })
                                $("#"+product_id+"-quantity").prop('disabled',true) 
                                $("#"+product_id+"-box_edit_quantity").css('display','block') // icon 
                                $("#"+product_id+"-save_quantity").css('display','none') // icon
                                $("#"+product_id+"-quantity").css('background-color','transparent')
                                axios.post(`http://products.sold.co.id/get-product-details?product_code=${product_id}`)
                                .then((res)=>{
                                    $("#"+product_id+"-quantity").val(res.data.GroupBuy_SellQuantity)
                                }).catch((err)=>{
                                    
                                })
                            }
                        }).catch((err)=>{
                            
                        })
                        }else {
                            // Swal.fire('Simpan Gagal', '', 'error')
                            Swal.fire({
                                html:`
                                <div class="o-circle c-container__circle o-circle__sign--failure">
                                    <div class="o-circle__sign"></div>  
                                </div> 
                                Simpan Gagal`,
                                timer:2000,
                                
                            })
                        }
                    }).catch((err)=>{
                        
                    })
                }else {
                    
                    // Swal.fire('Password Minimal 6 character', '', 'error')
                    Swal.fire({
                        html:`
                        <div class="o-circle c-container__circle o-circle__sign--failure">
                            <div class="o-circle__sign"></div>  
                        </div> 
                        Password Minimal 6 Character`,
                        timer:2000,
                        
                    })
                }
            }).catch((err)=>{
                
            })

        }).catch((err)=>{
            
        })
    }else if (jenis_edit === 'status_gb'){
        get_status(product_id,pass)
        $('#s_product_name').removeClass(product_id)
        $('#s_product_name').removeClass('status_gb')
    }
    else {
        
    }
    


}



const about_dirjen=()=>{
    Swal.fire({
        title: `   
         <div class="box-dirjen-2">
            <p>DIREKTORAT JENDERAL PERLINDUNGAN KONSUMEN DAN TERTIB NIAGA  <br> KEMENTERIAN PERDAGANGAN REPUBLIK INDONESIA</p>
            <div class="dirjen-alamat">
                <p>Alamat : </p>
                <p>Gedung 1 Lantai 3 <br> Jalan M.I.Riwdwan Rais No.5 <br> Jakpus 10110</p>
            </div>
            <div class="dirjen-alamat">
                <p>Telepon :</p>
                <p> +62-21-3858171, <br>+62-21-3451692</p>
            </div>
            <div class="dirjen-alamat">
                <p>Faksimili :</p>
                <p> +62-21-3858205, <br>+62-21-3842531</p>
            </div>
            <div class="dirjen-alamat">
                <p>Email :</p>
                <a href="mailto:contact.us@kemendag.go.id" target="_blank">contact.us@kemendag.go.id</a>
                <!-- <p>contact.us@kemendag.go.id</p> -->
            </div>
        
        </div>
        `,
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      })
}



$('.card_flip_payment').on('mouseover',function(){
    alert('jalan')
    $('.card_flip_payment').toggleClass('is-flipped')
})



const copy_link_share=()=>{
    // alert('function jalan')
    var copyText = document.getElementById("copyClipboard");
    if(copyText){
        
        copyText.select();
        copyText.setSelectionRange(0, 99999);
        document.execCommand("Copy");
        // Swal.fire('Copy berhasil', '', 'success')
        Swal.fire({
            html:`
            <div class="o-circle c-container__circle o-circle__sign--success">
                <div class="o-circle__sign"></div>  
            </div>   
            Copy Berhasil
            `,
            timer:2000,
            
        })
    }
    
}

const gorillaworkout=(name)=>{
    
    var copyText = document.getElementById("copyClipboardul");
    // var copyText = 'Gorilla Workout'
    
    var text = $('.easteregg').val()
    
    if(copyText){
        
        copyText.select();
        
        // copyText.setSelectionRange(0, 99999);
        document.execCommand("Copy");
        // Swal.fire('Copy berhasil', '', 'success')
    }

}


const nonActiveSkeleton=()=>{
    // alert('jalan')
    $('.box-render-promo-animated').css('display','none')
    $('.box-render-promo').css('display','flex')
    $('.box-render-new').css('display','flex')
    $('.box-render-all').css('display','flex')
}



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
  
var gambar_active = 3
setInterval(()=>{
    if(gambar_active == 1){
//   
    toDataURL('http://sold.co.id/img/promo1.png',  async function(dataUrl) {
    // 
        await $('#scream').attr('src',dataUrl)
        var example = document.getElementById('example');
        var context = example.getContext('2d');
        var img = document.getElementById("scream");
        context.drawImage(img, 0, 0, 500, 500);
        
        // var c = example.getContext('2d');
        var p =  context.getImageData(10, 10, 1, 1).data; 
    //   
        var hex = "#" + ("000000" + rgbToHex(p[0], p[1], p[2])).slice(-6);
        // alert(hex)


        await $('.ads-3').css('background-color',hex)
        await $('.ads-1').css('background-color',hex)
        // $('#status').html(cord + "<br>" + hex);
        gambar_active = 2
        
    })

}
else if (gambar_active == 2){
//   
    toDataURL('http://sold.co.id/img/promo3.png', async function(dataUrl) {
    // 
        await $('#scream').attr('src',dataUrl)
        var example = document.getElementById('example');
        var context = example.getContext('2d');
        var img = document.getElementById("scream");
        context.drawImage(img, 0, 0, 500, 500);
        
        // var c = example.getContext('2d');
        var p =  context.getImageData(10, 10, 1, 1).data; 
    //   
        var hex = "#" + ("000000" + rgbToHex(p[0], p[1], p[2])).slice(-6);
        // alert(hex,'GA2')


        await $('.ads-3').css('background-color',hex)
        await  $('.ads-1').css('background-color',hex)
        // $('#status').html(cord + "<br>" + hex);
        gambar_active = 3
        
    })
}else {
//   
    // 
    toDataURL('http://sold.co.id/img/promo5.png',  async function(dataUrl) {
    // 
        await  $('#scream').attr('src',dataUrl)
        var example = document.getElementById('example');
        var context = example.getContext('2d');
        var img = document.getElementById("scream");
        context.drawImage(img, 0, 0, 500, 500);
        
        // var c = example.getContext('2d');
        var p =  context.getImageData(10, 10, 1, 1).data; 
    //   
        var hex = "#" + ("000000" + rgbToHex(p[0], p[1], p[2])).slice(-6);
        // alert(hex,'GA2')


        await $('.ads-3').css('background-color',hex)
        await  $('.ads-1').css('background-color',hex)
        // $('#status').html(cord + "<br>" + hex);
        gambar_active = 1
        
    })
}
},3000)



function rgbToHex(r, g, b) {
    if (r > 255 || g > 255 || b > 255)
        throw "Invalid color component";
    return ((r << 16) | (g << 8) | b).toString(16);
}
      

var timeout = setTimeout(function(){
    yourFunction()
},2000);
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



const check_input_form_supp=()=>{
    // var customer_code = localStorage.getItem('token')
    var first_name = $("#nama_depan_supp").val()
    var last_name = $("#nama_belakang_supp").val()
    var password= $('#password_supp').val()
    var email = $('#email_supp').val()
    var number_1 = $('#telp_gudang_supp').val()
    var account_number = $('#no_rek_perusahaan_supp').val()
    // var referral_code = $('#inp_ref_code').val()
    
    // var isCustomer_code = false
    var isFirst_Name = false
    var isLast_Name=false
    var isPassword = false
    var isEmail = false
    var isNumber_1 = false
    var isAccount_number = false
    // var isReferral_code = false

    if(first_name != undefined && first_name.length >=3 ){
        isFirst_Name = true
    }else {
        isFirst_Name = false
        // swal.fire("Nama Minimal 3 Huruf", "", "error");
        Swal.fire({
            html:`
            <div class="o-circle c-container__circle o-circle__sign--failure">
                <div class="o-circle__sign"></div>  
            </div> 
            Nama Minimal 3 Huruf`,
            timer:2000,
            
        })
    }
    
    if(last_name != undefined && last_name.length >=3 ){
        isLast_Name = true
    }else {
        isLast_Name = false
        // swal.fire("Nama Minimal 3 Huruf", "", "error");
        Swal.fire({
            html:`
            <div class="o-circle c-container__circle o-circle__sign--failure">
                <div class="o-circle__sign"></div>  
            </div> 
            Nama Minimal 3 Huruf`,
            timer:2000,
            
        })
    }
    
    if(password != undefined && password.length >=4 ){
        isPassword = true
    }else {
        isPassword = false
        // swal.fire("Password Salah", "", "error");
        Swal.fire({
            html:`
            <div class="o-circle c-container__circle o-circle__sign--failure">
                <div class="o-circle__sign"></div>  
            </div> 
            Password Salah`,
            timer:2000,
            
        })
    }
    
    if(email != undefined && email.length !=0 ){
        isEmail = true
    }else {
        isEmail = false
        // swal.fire("Email Salah", "", "error");
        Swal.fire({
            html:`
            <div class="o-circle c-container__circle o-circle__sign--failure">
                <div class="o-circle__sign"></div>  
            </div> 
            Email Salah`,
            timer:2000,
            
        })
    }
    
    
    if(number_1 != undefined && number_1.length  !=0 ){
        isNumber_1 = true
    }else {
        isNumber_1 = false
        // swal.fire("Nomor Telepon Harus Di Isi", "", "error");
        Swal.fire({
            html:`
            <div class="o-circle c-container__circle o-circle__sign--failure">
                <div class="o-circle__sign"></div>  
            </div> 
            Nomor Telepon Harus Di Isi`,
            timer:2000,
            
        })
    }
    
    if(account_number != undefined && account_number.length  !=0 ){
        isAccount_number = true
    }else {
        isAccount_number = false
        // swal.fire("Nomor Rekening Harus Di Isi", "", "error");/
        Swal.fire({
            html:`
            <div class="o-circle c-container__circle o-circle__sign--failure">
                <div class="o-circle__sign"></div>  
            </div> 
            Nomor Rekening Harus Di Isi`,
            timer:2000,
            
        })
    }
    

    
    
    if(isFirst_Name == true 
        && isLast_Name == true && isPassword == true && isEmail == true && isNumber_1 == true
        && isAccount_number == true ){
            // alert('bisa register')
            return true 
        }else {
            // alert('ada data yg kosong')
            return false
        }
    
}




const check_input_form=()=>{
// var customer_code = localStorage.getItem('token')
var first_name = $("#nama_depan_reg").val()
var last_name = $("#nama_belakang_reg").val()
var password= $('#password_reg').val()
var email = $('#email_reg').val()
var number_1 = $('#no_telp_reg').val()
var account_number = $('#no_rekening_reg').val()
var referral_code = $('#inp_ref_code').val()

// var isCustomer_code = false
var isFirst_Name = false
var isLast_Name=false
var isPassword = false
var isEmail = false
var isNumber_1 = false
var isAccount_number = false
var isReferral_code = false



if(first_name != undefined && first_name.length >=3 ){
    isFirst_Name = true
}else {
    isFirst_Name = false
    // swal.fire("Nama Minimal 3 Huruf", "", "error");
    Swal.fire({
        html:`
        <div class="o-circle c-container__circle o-circle__sign--failure">
            <div class="o-circle__sign"></div>  
        </div> 
        Nama Minimal 3 Huruf`,
        timer:2000,
        
    })
}

if(last_name != undefined && last_name.length >=3 ){
    isLast_Name = true
}else {
    isLast_Name = false
    // swal.fire("Nama Minimal 3 Huruf", "", "error");
    Swal.fire({
        html:`
        <div class="o-circle c-container__circle o-circle__sign--failure">
            <div class="o-circle__sign"></div>  
        </div> 
        Nama Minimal 3 Huruf`,
        timer:2000,
        
    })
}

if(password != undefined && password.length >=4 ){
    isPassword = true
}else {
    isPassword = false
    // swal.fire("Password Salah", "", "error");
    Swal.fire({
        html:`
        <div class="o-circle c-container__circle o-circle__sign--failure">
            <div class="o-circle__sign"></div>  
        </div> 
        Password Salah`,
        timer:2000,
        
    })
}

if(email != undefined && email.length !=0 ){
    isEmail = true
}else {
    isEmail = false
    // swal.fire("Email Salah", "", "error");
    Swal.fire({
        html:`
        <div class="o-circle c-container__circle o-circle__sign--failure">
            <div class="o-circle__sign"></div>  
        </div> 
        Password Salah`,
        timer:2000,
        
    })
}


if(number_1 != undefined && number_1.length  !=0 ){
    isNumber_1 = true
}else {
    isNumber_1 = false
    // swal.fire("Nomor Telepon Harus Di Isi", "", "error");
    Swal.fire({
        html:`
        <div class="o-circle c-container__circle o-circle__sign--failure">
            <div class="o-circle__sign"></div>  
        </div> 
        Nomor Telepon Harus Di Isi`,
        timer:2000,
        
    })
}

if(account_number != undefined && account_number.length  !=0 ){
    isAccount_number = true
}else {
    isAccount_number = false
    // swal.fire("Nomor Rekening Harus Di Isi", "", "error");
    Swal.fire({
        html:`
        <div class="o-circle c-container__circle o-circle__sign--failure">
            <div class="o-circle__sign"></div>  
        </div> 
        Nomor Rekening Harus Di Isi`,
        timer:2000,
        
    })
}

if(referral_code != undefined && referral_code.length  !=0 ){
    isReferral_code = true
}else {
    isReferral_code = false
    // swal.fire("Referral Code Harus Di Isi", "", "error");
    Swal.fire({
        html:`
        <div class="o-circle c-container__circle o-circle__sign--failure">
            <div class="o-circle__sign"></div>  
        </div> 
        Referral Code Harus Di Isi`,
        timer:2000,
        
    })
}



if( isFirst_Name == true 
    && isLast_Name == true && isPassword == true && isEmail == true && isNumber_1 == true
    && isAccount_number == true && isReferral_code == true){
        // alert('bisa register')
        return true 
    }else {
        // alert('ada data yg kosong')
        return false
    }

}


function to_detail_product(id){
    
    $('#detailProductModal').modal('show')
    $('.modals_detail_product').empty()
    axios.post(`http://products.sold.co.id/get-product-details?product_code=${id}`)
    .then((res)=>{
        
            $('.modals_detail_product').append(`
                <tr>
                    <td>${res.data.Product_Code} </td>
                    <td>${res.data.Name} </td>
                    <td>${res.data.Sell_Price} </td>
                    <td>${res.data.Stock_Quantity}</td>
                    <td>${res.data.Category} </td>
                    <td>${res.data.Subcategory} </td>
                    <td>${res.data.Specification} </td>
                    <td>
                        <p class="limited-text">${res.data.Description} </p>
                    </td>
                </tr>

            `)
        
    }).catch((err)=>{
        
    })
}




const check_status_item=()=>{
    // alert('function check status jalan')
    $('#productModal').modal('show')
    var token = localStorage.getItem('token')
    var creator;
    axios.post(`http://customers.sold.co.id/get-customer-information?Customer_Code=${token}`)
    .then((res)=>{
        
        
        var Customer_Code = res.data.Customer_Code
        creator = res.data.Creator

        // FIND DATA BY CREATOR
        axios.post(`http://products.sold.co.id/get-products-belong-to-the-supplier?Creator=${Customer_Code}`)
        .then((res)=>{
            
            res.data.map((val,index)=>{
                
                
                $('.input_total_row_gb').val('TOTAL ROW = ' + res.data.length)
                
               
                
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




                // BATAS TABLE ATAS

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
        }).catch((err)=>{
            
        })
    }).catch((err)=>{
        
    })
}

const re_render_item_product=()=>{
    
    
    var token = localStorage.getItem('token')
    $('.tbody_product').empty()
    var creator;
    axios.post(`http://customers.sold.co.id/get-customer-information?Customer_Code=${token}`)
    .then((res)=>{
        
        
        var Customer_Code = res.data.Customer_Code
        creator = res.data.Creator

        // FIND DATA BY CREATOR
        axios.post(`http://products.sold.co.id/get-products-belong-to-the-supplier?Creator=${Customer_Code}`)
        .then((res)=>{
            
            res.data.map((val,index)=>{


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
        }).catch((err)=>{
            
        })
    }).catch((err)=>{
        
    })
    
}

const edit_product_quantity=(product_id)=>{
    $("#"+product_id+"-quantity").prop('disabled',false) 
    $("#"+product_id+"-quantity").css('background-color','#ddd')


    $("#"+product_id+"-box_edit_quantity").css('display','none') // icon 
    $("#"+product_id+"-save_quantity").css('display','block') // icon
}

const get_status=(product_id,pass)=>{
    // alert(item_status)
    var password = pass
    var Product_Code = $("#"+product_id+"-pCode").val()
    var Name = $("#"+product_id+"-pName").val()
    var qty = $("#"+product_id+"-quantity").val()
    var price = $("#"+product_id+"-discount").val()
    var token = localStorage.getItem('token')
    var email;
    var result;

            axios.post(`http://customers.sold.co.id/get-customer-information?Customer_Code=${token}`)
            .then((res)=>{
                email = res.data.Email
                axios.post(`http://products.sold.co.id/update-product-groupbuy-status-price-quantity?GroupBuy_Purchase=${result}&GroupBuy_SellPrice=${price}&GroupBuy_SellQuantity=${qty}&Product_Code=${Product_Code}&Customer_Code=${token}&Email=${email}&Password=${password}`)
                .then((res)=>{
                    
                    
                    if(res.data){
                        // swal.fire("Berhasil Mengubah Data", "", "success");
                        Swal.fire({
                            html:`
                            <div class="o-circle c-container__circle o-circle__sign--success">
                                <div class="o-circle__sign"></div>  
                            </div>   
                            Berhasil Mengubah Data
                            `,
                            timer:2000,
                            
                        })
                        $('#get_otp').modal('hide')
                    }else {
                        // swal.fire("Gagal Mengubah Data", "", "error");
                        Swal.fire({
                            html:`
                            <div class="o-circle c-container__circle o-circle__sign--failure">
                                <div class="o-circle__sign"></div>  
                            </div> 
                            Gagal Mengubah Data`,
                            timer:2000,
                            
                        })
                        $('#get_otp').modal('hide')
                        
                    axios.post(`http://products.sold.co.id/get-product-details?product_code=${product_id}`)
                    .then((res)=>{
                        
                        
                        // $("#"+product_id+"-discount").val(res.data.GroupBuy_SellPrice)
                        if(res.data.GroupBuy_Purchase == 'true'){
                            $('#'+product_id+"-status").prop('checked',true)
                        }else {
                            $('#'+product_id+"-status").prop('checked',false)
                            
                        }
                    }).catch((err)=>{
                        
                    })
                }
    
                }).catch((err)=>{
    
                })
            }).catch((err)=>{
                
            })
            
            if($('#'+product_id+"-status").is(':checked')){
                result = true
            }else {
                result = false
            }
            
 }

const save_edit_quantity=(product_id)=>{

    $('#get_otp').modal('show')
    $('#s_product_name').addClass(product_id)
    $('#s_product_name').addClass('groupbuy_qty')



    clearOTPform()
}
