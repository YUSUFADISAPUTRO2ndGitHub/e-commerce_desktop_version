$(function(){
    
    // $('#datepicker').datepicker();
    // $('.carousel').carousel()

    setInterval(() => {
        var productModal = $('#productModal').css('display') == 'none' 
        if(productModal == true){
            // console.log('masuk ke if')
            $('.toast_prod_information').css('display','none')
        }else {
            // console.log('masuk ke else')
        }
    },1000)
    
    
      $('.input-group').on('click',function(){
          $('.list-group').toggle(1000)
        // $('.list-group').show(1000)
      })
        
    
    
      
   $('.cust-1').on('click',function(){
       console.log('testing jalan')
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
       console.log('jalan box information')
   })
   

//    OPEN MODALS PROFILE
   $('.option-4').on('click',function(){
    
    
    var token = localStorage.getItem('token')
    console.log(token)
 
    
        axios.post(`http://customers.sold.co.id/get-customer-information?Customer_Code=${token}`)
        .then((res)=>{
            // console.log(res.data,'line 33 option -4')
            var data_customer = res.data
            console.log(data_customer)
            if(data_customer){
                console.log(data_customer)
                console.log(data_customer.Customer_Code)
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
                console.log(newReferralCode)
                console.log(token)
                $('#email_user').val(`${data_customer.Email}`)
                $('.nama_user_profile').val(`${data_customer.First_Name}`)
                $('#tahun_lahir_user').val(tahun)
                $('#bulan_lahir_user').val(bulan)
                $('#tanggal_lahir_user').val(hari)
                $('#nama_depan_user').val(`${data_customer.First_Name}`)
                $('#nama_belakang_user').val(`${data_customer.Last_Name}`)
                $('#no_telp1_user').val(`${data_customer.Contact_Number_1}`)
                $('#no_telp2_user').val(`${data_customer.Contact_Number_2}`)
                $('#alamat_lengkap1_user').val(`${data_customer.Address_1}`)
                $('#alamat_lengkap2_user').val(`${data_customer.Address_2}`)
                $('#alamat_lengkap3_user').val(`${data_customer.Address_3}`)
                $('#alamat_lengkap4_user').val(`${data_customer.Address_4}`)
                $('#alamat_lengkap5_user').val(`${data_customer.Address_5}`)
                $('#rekening_user').val(`${data_customer.bank_account_number}`)
                $('#referral-profile').val(`${data_customer.extra_column_2}`)
                $('#no_ktp_user').val(`${data_customer.ktp}`)
                $('.ref-profile').val(token)
                $('#npwp_supp_prof').val(data_customer.npwp)
                console.log(data_customer.extra_column_2)
                console.log($('#ref_code_from').val(data_customer.extra_column_2))
                $('#nama_perusahaan_profile').val(data_customer.Nama_Perusahaan)
                $('#nik_supp_profile').val(data_customer.extra_column_5)
                $('#ref_code_from').val(data_customer.extra_column_2)
                var a = $('#refer-profile').val()
                console.log(a)
                $('#profileModal').modal('show')
            }else {
                
                $('#loginModal').modal('show')
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
        console.log('functioin selesai 74')
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
    console.log(item)
    var token= localStorage.getItem('token')
    axios.post(`http://customers.sold.co.id/get-customer-information?Customer_Code=${token}`)
    .then((res)=>{
        console.log(res.data)
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
            console.log(err)
        })

    }).catch((err)=>{
        console.log(err)
    })

})
  
   $('.input-product').on('keyup',function(){
        var item_search = $(this).val()
        console.log(item_search)
        var token = localStorage.getItem('token')
        axios.post(`http://customers.sold.co.id/get-customer-information?Customer_Code=${token}`)
        .then((res)=>{
            var Customer_Code = res.data.Customer_Code
            var all_data
            axios.post(`http://products.sold.co.id/get-products-belong-to-the-supplier?Creator=${Customer_Code}`)
            .then((res)=>{
                all_data = res.data
                console.log(res.data)
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

                console.log(data_cari)
            }).catch((err)=>{
                console.log(err)
            })
        }).catch((err)=>{

        })
   })


        $('.input-name').on('keyup',function () {
            $('.close-button').css('display','block')
            
            console.log('hi');
            var value = $(this).val()
            console.log(value)
            if(value.length > 2){
                axios.post(`http://products.sold.co.id/get-product-details?product_name=${value}`)
                .then((res)=>{
                    console.log(res.data)
                    $('.box-render-search').css('display','block')
                    $('.box-search-menu').css('display','block')
                    $('.input-name').css('border-bottom-left-radius','0px')
                    $('.input-name').css('border-bottom-right-radius','0px')
                    $('.render-li-search').empty()
                    if(res.data[0] === false){
                        res.data.map((val,index)=>{
                            console.log(val)
                            console.log(val === undefined)
                            $('.render-li-search').append(`
                                <li  id="${val.Name}">${value} Tidak Ditemukan</li>
                            `)
    
                        })
                    }else {
                        res.data.map((val,index)=>{
                            console.log(val)
                            console.log(val === undefined)
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
                    console.log(err)
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
            $('#loginModal').modal('hide')
            $('.modals-information-login').css('display','flex')
            $(".modals-information-login").attr('src',`./Iframe/supplier-information.html`)
        })
        $('.disini_info_customer').on('click',function(){
            // alert('cust jalan')
            $('.close-button').css('display','block')
            $('#loginModal').modal('hide')
            $('.modals-information-login').css('display','flex')
            $(".modals-information-login").attr('src',`./Iframe/cust-information.html`)
        })

  
        

            // $(".box-name-product2").mouseover( function() {
            //     alert('jalan')
            //     $(".box-img-bp").stop().transition({ opacity: '1'}, 500);
                
            //  }); 

            
            // $(".box-name-product2").mouseout( function(){
            //     alert('jalan')
            // $(".box-img-bp").stop().transition({ opacity: '0'}, 500);
        
            // });
            
       
            
   
})



function replace_value_to(x){
    // alert($(x).html());
    $(".input-name").val($(x).html());
    $('.box-render-search').css('display','none')
    $('.input-name').css('border-bottom-left-radius','10px')
    $('.input-name').css('border-bottom-right-radius','10px')


    var item_search = $('#search_item').val()
    console.log(item_search)
    var product_name = $('#search_item').attr('id')
    $('.active_search').css('top','575px')
    $('.main-body').css('display','none')
    $('.modals-search-result').css('display','block')
    $('.modals-search-result').attr('src',`./Iframe/searchingPage.html?searching=${item_search}`)
}   

$('.icon-buy').on('click',function(){
    var product_id = $(this).val()
    console.log(product_id)
})



function check_qty(val){
    // alert(val)
   
    var total_qty_from_user = val
    console.log(total_qty_from_user)
    var product_id = $('.qty_groupbuy_home').attr('id')
    console.log(product_id)
    var total_qty_from_api;
    var harga_satuan;
    axios.post(`http://products.sold.co.id/get-product-details?product_code=${product_id}`)
    .then((res)=>{
        console.log(res.data)
        total_qty_from_api = parseInt(res.data.GroupBuy_SellQuantity)
        harga_satuan = res.data.GroupBuy_SellPrice
        var total_harga = harga_satuan * total_qty_from_user
        if(total_qty_from_api > total_qty_from_user) {
            // $('#tp_sp').val(total_harga)
            $('#tp_iframe').val(total_harga)
            console.log('masuk ke if 190')
      }else {
        console.log('masuk ke else 192')
          Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: `Quantity Yang Tersisa Hanya : ${total_qty_from_api}!`,
              // footer: '<a href="">Why do I have this issue?</a>'
            })
            var total_price = harga_satuan * total_qty_from_api
            $('.qty_groupbuy_home').val(total_price)
            // alert(total_qty_from_api)
            // $('#tp_sp').val(total_harga)
            $('#tp_iframe').val(total_price)
      }

    }).catch((err)=>{
        console.log(err)
    })


}

function groupbuy(product_id){
    
    var token = localStorage.getItem('token')
    console.log(product_id)
    console.log(token)
    axios.post(`http://products.sold.co.id/get-unpaid-sales-order-specific-for-a-product?Product_Code=${product_id}&Customer_Code=${token}`)
    .then((res)=>{
        console.log(res.data)
        // location.replace(`../Iframe/groupbuy.html?groupbuy_id=${product_id}`)
        if(res.data){
            
            $('.modals-product-detail').empty()
            $('.modals-product-detail').css('display','none')
            location.replace(`../Iframe/groupbuy.html?groupbuy_id=${product_id}`)
            
        }else {
            close_all_open_window()
            Swal.fire({
                title: 'Anda Memiliki Pembayaran Yang Belum Dibayar',
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: `Lihat Daftar Tagihan`,
                denyButtonText: `Cancel`,
              }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    render_daftar_hutang()
                    
                    // location.replace(`../Iframe/groupbuy.html?list_hutang=${product_id}`)
                  $(".force-close-all-command").css("display", "none");
                  $('#daftarHutangModal').modal('show')
                  $('.modals-product-detail').css('display','none')
                } else if (result.isDenied) {
                    Swal.fire('Cancel berhasil', '', 'success')
                    $('.modals-product-detail').css('display','none')
                }
                
              })
        }
    }).catch((err)=>{
        console.log(err)
    })

    console.log(product_id)
}


function payment_groupbuy_home(product_id){
   
    var token = localStorage.getItem('token')
    var total_price = $('#tp_iframe').val()
    var detail_product;
    var data_customer;
    var items = []
    var total_qty_from_user = parseInt($('.qty_groupbuy_home').val())
    // BATAS TESTING







    // BATAS TESTING 
    if(total_qty_from_user>0) { 
        axios.post(`http://sales.sold.co.id/check-group-buy-quantity-so-far-gross?Group_Buy_Purchase_PC=${product_id}`)
        .then((res)=>{
            total_item_kebeli = res.data
            console.log(res.data)
            if(res.data.Total_Quantity === null) { // hasil null berarti belum ada customer lain yang beli
                console.log('masuk ke if null 1154')
                axios.post(`http://products.sold.co.id/get-product-details?product_code=${product_id}`)
                .then((res)=>{
                    console.log(res.data)
                    detail_product = res.data
                    axios.post(`http://customers.sold.co.id/get-customer-information?Customer_Code=${token}`)
                    .then((res)=>{
                        console.log(res.data)
                        customerDetails  ={
                            Customer_Code:token,
                            Total_Price: total_price,
                            Total_Quantity : $('.qty_groupbuy_home').val(),
                            Unit:"pcs",
                            Shipping_Address: $('#alamat_gb').val(),
                            Payment_Method : $('#payment_gb').val(),
                            Shipping_Fee: $('#pengiriman-fee').val(),
                            alamatLain : $('#alamat_lain').val(),
                            Primary_Recipient_Name:res.data.First_Name + " " + res.data.Last_Name
                        }         
                        items.push( {
                                Customer_Code: token,
                                Product_Code: product_id,
                                Product_Name: detail_product.Name,
                                Quantity_Requested: $('.qty_groupbuy_home').val(),
                                Price_Based_On_Total_Quantity: total_price
        
                        }) 
                        var data = {
                            "Sales_Order_Data": customerDetails,
                            "Sales_Order_Detail_data": items
                        }
                        console.log(data)

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
                                swal.fire("Penambahan Data Berhasil, Silahkan Check Cart", "", "success");
                                $('.modals-product-detail').css('display','none')
                                $('.box-delete-success').css('display','block')
                                // tambahin gambar yg dari mas fauzi
                                console.log('berhasil pembelian line 1198')
                                location.replace(`../Iframe/success.html`)
                            }else {
                                swal.fire("Pembelian Gagal", "", "error");
                            }
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
            }else { // hasil else dari if null berarti ada cust yg udh beli. sisa productnya
                console.log('masuk ke else null 1209')
                axios.post(`http://products.sold.co.id/get-product-details?product_code=${product_id}`)
                .then((response)=>{
                    console.log(response.data)
                    console.log(total_item_kebeli)
                    var item_tersedia = response.data.GroupBuy_SellQuantity - total_item_kebeli.Total_Quantity
                    console.log(item_tersedia)
                    if(total_qty_from_user > item_tersedia){
                        console.log('masuk ke if item tersedia 1217')
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: `Hanya Bisa Membeli ${item_tersedia}`,
                            // footer: '<a href="">Why do I have this issue?</a>'
                          })

                          axios.post(`http://products.sold.co.id/get-product-details?product_code=${product_id}`)
                          .then((res)=>{
                              console.log(res.data)
                              detail_product = res.data
                              axios.post(`http://customers.sold.co.id/get-customer-information?Customer_Code=${token}`)
                              .then((res)=>{
                                  console.log(res.data)
                                  data_customer = res.data
                                  var harga_pembelian = item_tersedia * parseInt(detail_product.GroupBuy_SellPrice)
                                  console.log(harga_pembelian)

                                  customerDetails  ={
                                    Customer_Code:token,
                                    Total_Price: harga_pembelian,
                                    Total_Quantity : item_tersedia,
                                    Unit:"pcs",
                                    Shipping_Address: $('#alamat_gb').val(),
                                    Payment_Method : $('#payment_gb').val(),
                                    Shipping_Fee: $('#pengiriman-fee').val(),
                                    alamatLain : $('#alamat_lain').val(),
                                    Primary_Recipient_Name:data_customer.First_Name + " " + data_customer.Last_Name
                                }         
                                items.push( {
                                        Customer_Code: token,
                                        Product_Code: product_id,
                                        Product_Name: detail_product.Name,
                                        Quantity_Requested: item_tersedia,
                                        Price_Based_On_Total_Quantity: harga_pembelian
                
                                }) 
                                var data = {
                                    "Sales_Order_Data": customerDetails,
                                    "Sales_Order_Detail_data": items
                                }     
                                
                                console.log(data)
                                      console.log(customerDetails,' ini customer detail')
                                      console.log(items, ' ini items')
                                    axios.post(`http://sales.sold.co.id/create-new-group-buy-sales-order-by-customer?Customer_Code=${token}`,data,{
                                        headers:{
                                            "Content-Type":'application/json'
                                        },
                                        "data":JSON.stringify({
                                            "Sales_Order_data":customerDetails,
                                            "Sales_Order_Detail_data": items
                                        })
                                    }).then((res)=>{
                                        console.log(res.data)
                                        if(res.data){
                                            swal.fire("Penambahan Data Berhasil, Silahkan Check Cart", "", "success");
                                            // tambahin gambar yg dari mas fauzi
                                            console.log('berhasil pembelian line 1286')
                                            location.replace(`../Iframe/success.html`)
                                        }else {
                                            swal.fire("Pembelian Gagal, Silahkan Check Cart", "", "error");
                                        }
                                        // $('.modals-product-detail').css('display','none')
                                    }).catch((err)=>{
                                        console.log(err)
                                    })         
                              }).catch((err)=>{
                                  console.log(err)
                              })
                          }).catch((err)=>{
                              console.log(err)
                          })
                    }else {// pembelian jika total qty dari user tidak melebihi item yang tersedia
                        console.log('masuk ke else 1285')
                        axios.post(`http://products.sold.co.id/get-product-details?product_code=${product_id}`)
                        .then((res)=>{
                            detail_product = res.data
                            axios.post(`http://customers.sold.co.id/get-customer-information?Customer_Code=${token}`)
                            .then((res)=>{
                                data_customer =res.data
                                console.log(data_customer)
                                customerDetails  ={
                                    Customer_Code:token,
                                    Total_Price: total_price,
                                    Total_Quantity : $('.qty_groupbuy_home').val(),
                                    Unit:"pcs",
                                    Shipping_Address: $('#alamat_gb').val(),
                                    Payment_Method : $('#payment_gb').val(),
                                    Shipping_Fee: $('#pengiriman-fee').val(),
                                    alamatLain : $('#alamat_lain').val(),
                                    Primary_Recipient_Name:data_customer.First_Name + " " + data_customer.Last_Name
                                }         
                                items.push( {
                                        Customer_Code: token,
                                        Product_Code: product_id,
                                        Product_Name: detail_product.Name,
                                        Quantity_Requested: $('.qty_groupbuy_home').val(),
                                        Price_Based_On_Total_Quantity: total_price
                
                                }) 
                                var data = {
                                    "Sales_Order_Data": customerDetails,
                                    "Sales_Order_Detail_data": items
                                }    
                                console.log(data)
                                console.log(customerDetails,' ini customer detail')
                                console.log(items, ' ini items')

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
                                        console.log(res.data)
                                        swal.fire("Penambahan Data Berhasil, Silahkan Check Cart", "", "success");
                                        // close_all_open_window()
                                        $('.modals-product-detail').css('display','none')
                                        $('.box_iframe_groupbuy').css('display','none')
                                        
                                        
                                        $('.box_iframe_groupbuy').remove()
                                        // tambahin gambar yg dari mas fauzi
                                        console.log('berhasil pembelian line 1356')
                                        location.replace(`../Iframe/success.html`)

                                        
                                    }else {
                                        swal.fire("Penambahan Data gagal, Silahkan Check Pengisian data", "", "success");
                                        $('.modals-product-detail').css('display','none')
                                    }
                                }).catch((err)=>{
                                    console.log(err)
                                })
                                // refresh()

                            }).catch((err)=>{
                                console.log(err)
                            })
                        }).catch((err)=>{
                            console.log(err)
                        })
                    }
                }).catch((err)=>{
                    console.log(err)
                })
            }
        }).catch((err)=>{
            console.log(err)
        })
    }else {
        console.log('masuk ke else 434')
    }
}

function payment_groupbuy(product_id){
    var token = localStorage.getItem('token')
    var total_price = $('#tp_sp').val()
    console.log(total_price)

    var detail_product; 
    var data_customer;
    var items =[]
    var total_qty_from_user = parseInt($('.qty_groupbuy').val())
    var total_item_kebeli;
    if(total_qty_from_user>0){
        axios.post(`http://sales.sold.co.id/check-group-buy-quantity-so-far-gross?Group_Buy_Purchase_PC=${product_id}`)
        .then((res)=>{
            total_item_kebeli = res.data
            console.log(res.data)
            if(res.data === null){
                axios.post(`http://products.sold.co.id/get-product-details?product_code=${product_id}`)
                .then((res)=>{
                    console.log(res.data)
                    detail_product = res.data
                    axios.post(`http://customers.sold.co.id/get-customer-information?Customer_Code=${token}`)
                    .then((res)=>{
                        data_customer = res.data
                        console.log(data_customer)
                        
                            customerDetails  ={
                                Customer_Code:token,
                                Total_Price: total_price,
                                Total_Quantity : $('.qty_groupbuy').val(),
                                Unit:"pcs",
                                Shipping_Address: $('#alamat_gb').val(),
                                Payment_Method : $('#payment_gb').val(),
                                Shipping_Fee: $('#pengiriman-fee').val(),
                                alamatLain : $('#alamat_lain').val(),
                                Primary_Recipient_Name:data_customer.First_Name + " " + data_customer.Last_Name
                            }         
                            items.push( {
                                    Customer_Code: token,
                                    Product_Code: product_id,
                                    Product_Name: detail_product.Name,
                                    Quantity_Requested: $('.qty_groupbuy').val(),
                                    Price_Based_On_Total_Quantity: total_price
            
                            }) 
                            var data = {
                                "Sales_Order_Data": customerDetails,
                                "Sales_Order_Detail_data": items
                            }
                
                          
                            console.log(data)
                            console.log(customerDetails,' ini customer detail')
                            console.log(items, ' ini items')
            
                            axios.post(`http://sales.sold.co.id/create-new-group-buy-sales-order-by-customer?Customer_Code=${token}`,data,{
                                headers:{
                                    "Content-Type":'application/json'
                                },
                                "data":JSON.stringify({
                                    "Sales_Order_data":customerDetails,
                                    "Sales_Order_Detail_data": items
                                })
                            }).then((res)=>{
                                console.log(res.data)
                                if(res.data){
                                    // swal.fire("Penambahan Data Berhasil, Silahkan Check Cart", "", "success");
                                    $('.groupbuy_sp').css('display','none')
                                    $('.success_payment_sp').css('display','flex')
                                    $('.success_payment_sp').append(`
                                        <img src="../img/pembelian_berhasil.png" alt="" class="img-promo2"> 
                                    `)
                                    // $('.modals-product-detail').attr('src','../Iframe/success.html')
                                }else {
                                    swal.fire("Penambahan Gagal,", "", "error");
                                    $('.groupbuy_sp').css('display','none')
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

            }else {
                // hasil dari res.data.Total_Quantity di kurang sama qty yang di beli dari customer
                // = res.data.Total_Quantity-
                // yang bisa di beli => data_product_GroupBuy_SellQuantity - res.data.total_quantity
                console.log(res.data)
                
                axios.post(`http://products.sold.co.id/get-product-details?product_code=${product_id}`)
                .then((response)=>{ // res.data == detail product
                    
                    console.log(response.data)
                    console.log(total_item_kebeli)
                    var item_tersedia = response.data.GroupBuy_SellQuantity - total_item_kebeli.Total_Quantity
                    console.log(item_tersedia)
                    if(total_qty_from_user > item_tersedia){
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: `Hanya Bisa Membeli ${item_tersedia}`,
                            // footer: '<a href="">Why do I have this issue?</a>'
                          })
                          axios.post(`http://products.sold.co.id/get-product-details?product_code=${product_id}`)
                          .then((res)=>{
                              console.log(res.data)
                              detail_product = res.data
                              axios.post(`http://customers.sold.co.id/get-customer-information?Customer_Code=${token}`)
                              .then((res)=>{
                                  console.log(res.data)
                                  data_customer = res.data
                                  var harga_pembelian = item_tersedia * parseInt(detail_product.GroupBuy_SellPrice)
                                  console.log(harga_pembelian)

                                      customerDetails  ={
                                          Customer_Code:token,
                                          Total_Price: harga_pembelian,
                                          Total_Quantity : item_tersedia,
                                          Unit:"pcs",
                                          Shipping_Address: $('#alamat_gb').val(),
                                          Payment_Method : $('#payment_gb').val(),
                                          Shipping_Fee: $('#pengiriman-fee').val(),
                                          alamatLain : $('#alamat_lain').val(),
                                          Primary_Recipient_Name:data_customer.First_Name + " " + data_customer.Last_Name
                                      }         
                                      items.push( {
                                              Customer_Code: token,
                                              Product_Code: product_id,
                                              Product_Name: detail_product.Name,
                                              Quantity_Requested: item_tersedia,
                                              Price_Based_On_Total_Quantity: harga_pembelian
                      
                                      }) 
                                      var data = {
                                          "Sales_Order_Data": customerDetails,
                                          "Sales_Order_Detail_data": items
                                      }
                          
                                    
                                      console.log(data)
                                      console.log(customerDetails,' ini customer detail')
                                      console.log(items, ' ini items')
                      
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
                                            $('.success_payment_sp').css('display','flex')
                                            $('.success_payment_sp').append(`
                                                <img src="../img/pembelian_berhasil.png" alt="" class="img-promo2"> 
                                            `)
                                            $('.groupbuy_sp').css('display','none')
                                          }else {
                                            swal.fire("Penambahan Gagal,", "", "error");
                                            $('.groupbuy_sp').css('display','none')
                                          }
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
                    }else { // pembelian jika total qty dari user tidak melebihi item yang tersedia
                        axios.post(`http://products.sold.co.id/get-product-details?product_code=${product_id}`)
                        .then((res)=>{
                            console.log(res.data)
                            detail_product = res.data
                            axios.post(`http://customers.sold.co.id/get-customer-information?Customer_Code=${token}`)
                            .then((res)=>{
                                data_customer = res.data
                                console.log(data_customer) 
                                    customerDetails  ={
                                        Customer_Code:token,
                                        Total_Price: total_price,
                                        Total_Quantity : $('.qty_groupbuy').val(),
                                        Unit:"pcs",
                                        Shipping_Address: $('#alamat_gb').val(),
                                        Payment_Method : $('#payment_gb').val(),
                                        Shipping_Fee: $('#pengiriman-fee').val(),
                                        alamatLain : $('#alamat_lain').val(),
                                        Primary_Recipient_Name:data_customer.First_Name + " " + data_customer.Last_Name
                                    }         
                                    items.push( {
                                            Customer_Code: token,
                                            Product_Code: product_id,
                                            Product_Name: detail_product.Name,
                                            Quantity_Requested: $('.qty_groupbuy').val(),
                                            Price_Based_On_Total_Quantity: total_price
                    
                                    }) 
                                    var data = {
                                        "Sales_Order_Data": customerDetails,
                                        "Sales_Order_Detail_data": items
                                    }     
                                    console.log(data)
                                    console.log(customerDetails,' ini customer detail')
                                    console.log(items, ' ini items')
                    
                                    axios.post(`http://sales.sold.co.id/create-new-group-buy-sales-order-by-customer?Customer_Code=${token}`,data,{
                                        headers:{
                                            "Content-Type":'application/json'
                                        },
                                        "data":JSON.stringify({
                                            "Sales_Order_data":customerDetails,
                                            "Sales_Order_Detail_data": items
                                        })
                                    }).then((res)=>{
                                        console.log(res.data)
                                        if(res.data){
                                            // $('.modals-product-detail').attr('src','../Iframe/success.html')
                                            $('.groupbuy_sp').css('display','none')
                                            $('.success_payment_sp').css('display','flex')
                                            $('.success_payment_sp').append(`
                                                <img src="../img/pembelian_berhasil.png" alt="" class="img-promo2"> 
                                            `)
                                          }else {
                                            swal.fire("Penambahan Gagal,", "", "error");
                                            $('.groupbuy_sp').css('display','none')
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
                    }
                    // swal.fire("Penambahan Data Berhasil, Silahkan Check Cart", "", "success");
                    // $('.groupbuy_sp').css('display','none')
                }).catch((err)=>{

                })
                // console.log(item_tersedia)


            }
        }).catch((err)=>{
            console.log(err)
        })

    }



    // BATAS
    
    console.log(detail_product.Name)
    
   


    console.log(data)
}


function addToCart(product_id){
   
    var dataParse = JSON.parse(localStorage.getItem("itemsInCart"))
    console.log(dataParse,' ini data parse')

    if(dataParse){
        console.log(dataParse)

        var filterdatakosong = dataParse.filter((filtering)=>{
            if(filtering.productNo === product_id){
                return filtering
            }
        })
        if(filterdatakosong.length){
            console.log('masuk ke if 201')
            
            var objIndex = dataParse.findIndex((obj => obj.productNo == product_id));
            dataParse[objIndex].quantity = dataParse[objIndex].quantity +1
            $('.cart-counter').text(dataParse.length)
            swal.fire("Berhasil Menambahkan Quantity", "", "success");
        }else {
            console.log('masuk ke else  205')
            var data = {
            "productNo":product_id,
            "quantity":1
            }
            dataParse.push(data)
            $('.cart-counter').text(dataParse.length)
            swal.fire("Berhasil Menambahkan ke Cart", "", "success");
        }

        var pushToStorage = JSON.stringify(dataParse)
        localStorage.setItem('itemsInCart',pushToStorage)

    }else {
        console.log('local storage kosong')
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


function addressMethod(item){
    console.log(item)
    console.log(item.value)
    if(item.value === 'Alamat Terdaftar'){
        
        $('.option-alamat-gb').css('display','block')
        $('.alamat-pengiriman').css('display','none')
    }else if (item.value === 'Alamat Baru'){
        
        $('.option-alamat-gb').css('display','none')
        $('.alamat-pengiriman').css('display','block')
    }
}

setInterval(() => {
    resultAddress()
},5000)


function resultAddress(item){

    var pilihan_alamat=$('.option-address-gb option:selected').val()
    // console.log(pilihan_alamat,' ini  pilihan jenis alamat')
    if(pilihan_alamat === 'Alamat Terdaftar'){
        var payment_choosing = $('.option-payment-gb option:selected').val()
        // console.log(payment_choosing,' payment choosing 1750')
        var alamat = $('.option-alamat-gb option:selected').val()
        // console.log(alamat,' ini alamat yg dipake')
        var check_alamat = alamat.toUpperCase().includes('JAKARTA'.toUpperCase())
        if(alamat.toUpperCase().includes('JAKARTA'.toUpperCase())){
            $('#total_biaya_pengiriman_gb').val('10.000')
        }else if (alamat.toUpperCase().includes('TANGERANG'.toUpperCase()) || alamat.toUpperCase().includes('banten'.toUpperCase())){
            $('#total_biaya_pengiriman_gb').val('15.000')
        }
        else if (alamat.toUpperCase().includes('depok'.toUpperCase())){
            $('#total_biaya_pengiriman_gb').val('20.000')
        }
        else if (alamat.toUpperCase().includes('bogor'.toUpperCase())){
            $('#total_biaya_pengiriman_gb').val('25.000')
        }
        else {
            $('#total_biaya_pengiriman_gb').val('50.000')
        }
    }else if (pilihan_alamat === 'Alamat Baru'){
        var alamat_baru = $('#alamat_lain').val()
        if(alamat_baru.toUpperCase().includes('JAKARTA'.toUpperCase())){
            $('#total_biaya_pengiriman_gb').val('10.000')
        }else if (alamat_baru.toUpperCase().includes('TANGERANG'.toUpperCase()) || alamat_baru.toUpperCase().includes('banten'.toUpperCase())){
            $('#total_biaya_pengiriman_gb').val('15.000')
        }
        else if (alamat_baru.toUpperCase().includes('depok'.toUpperCase())){
            $('#total_biaya_pengiriman_gb').val('20.000')
        }
        else if (alamat_baru.toUpperCase().includes('bogor'.toUpperCase())){
            $('#total_biaya_pengiriman_gb').val('25.000')
        }
        else {
            $('#total_biaya_pengiriman_gb').val('50.000')
        }

        // console.log(alamat_baru, 'ini alamat baru')
    }


}
$('.id-address-gb').on('click',function(){
    var data = $(this).val()
    console.log(data)
})



const to_detail_product=(id)=>{
    console.log(id)
    $('#detailProductModal').modal('show')
    $('.modals_detail_product').empty()
    axios.post(`http://products.sold.co.id/get-product-details?product_code=${id}`)
    .then((res)=>{
        console.log(res.data)
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
        console.log(err)
    })
}



const check_status_item=()=>{
    // alert('function check status jalan')
    $('#productModal').modal('show')
    var token = localStorage.getItem('token')
    var creator;
    axios.post(`http://customers.sold.co.id/get-customer-information?Customer_Code=${token}`)
    .then((res)=>{
        console.log(res.data)
        console.log(res.data.Creator)
        var Customer_Code = res.data.Customer_Code
        creator = res.data.Creator

        // FIND DATA BY CREATOR
        axios.post(`http://products.sold.co.id/get-products-belong-to-the-supplier?Creator=${Customer_Code}`)
        .then((res)=>{
            console.log(res.data)
            res.data.map((val,index)=>{
                console.log(val.GroupBuy_Purchase)
                console.log(val.GroupBuy_Purchase === 'true')
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
            console.log(err)
        })
    }).catch((err)=>{
        console.log(err)
    })
}

const re_render_item_product=()=>{
    console.log('berhasil re render product item')
    
    var token = localStorage.getItem('token')
    $('.tbody_product').empty()
    var creator;
    axios.post(`http://customers.sold.co.id/get-customer-information?Customer_Code=${token}`)
    .then((res)=>{
        console.log(res.data)
        console.log(res.data.Creator)
        var Customer_Code = res.data.Customer_Code
        creator = res.data.Creator

        // FIND DATA BY CREATOR
        axios.post(`http://products.sold.co.id/get-products-belong-to-the-supplier?Creator=${Customer_Code}`)
        .then((res)=>{
            console.log(res.data)
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
            console.log(err)
        })
    }).catch((err)=>{
        console.log(err)
    })
    
}





// CALENDAR COMMISION

$(function() {
    $( "#datepicker" ).datepicker({
        dateFormat:'yy-mm-dd'
    });
    var a = $( "#datepicker" ).datepicker("getDate");
    console.log(a,' ini a')
    
    var b = $('.form-check-input').val()
    console.log(b)

  $("#flexSwitchCheckDefault").bootstrapSwitch({
      onSwitchChange: function(e,state){
          alert(state)
      }
  })

 });



//     // alert(item_status)
//     var result;
//     if($(item_status).is(':checked')){
//         result = true
//     }else {
//         result = false
//     }
//     alert(result)
//  }

// TABLE ATAS PRODUCT


// EDIT product quantity groupby

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
                    console.log(`http://products.sold.co.id/update-product-groupbuy-status-price-quantity?GroupBuy_Purchase=${result}&GroupBuy_SellPrice=${price}&GroupBuy_SellQuantity=${qty}&Product_Code=${Product_Code}&Customer_Code=${token}`)
                    console.log(res.data)
                    if(res.data){
                        swal.fire("Berhasil Mengubah Data", "", "success");
                        $('#get_otp').modal('hide')
                    }else {
                        swal.fire("Gagal Mengubah Data", "", "error");
                        $('#get_otp').modal('hide')
                        
                    axios.post(`http://products.sold.co.id/get-product-details?product_code=${product_id}`)
                    .then((res)=>{
                        console.log(res.data)
                        console.log(res.data.GroupBuy_SellPrice)
                        // $("#"+product_id+"-discount").val(res.data.GroupBuy_SellPrice)
                        if(res.data.GroupBuy_Purchase == 'true'){
                            $('#'+product_id+"-status").prop('checked',true)
                        }else {
                            $('#'+product_id+"-status").prop('checked',false)
                            
                        }
                    }).catch((err)=>{
                        console.log(err)
                    })
                }
    
                }).catch((err)=>{
    
                })
            }).catch((err)=>{
                console.log(err)
            })
            console.log($('#'+product_id+"-status").val())
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



    clearTokenForm()
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

    clearTokenForm()

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

    clearTokenForm()
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

    clearTokenForm()

}


// NAME
const edit_product_name=(product_id)=>{
    // $("input").prop('disabled', true);
    // alert(product_id)
    // $(".prod_name").prop('disabled', false); 6900005030114
    console.log(product_id)
    $("#"+product_id+"-name").prop('disabled',false) 
    $("#"+product_id+"-name").css('background-color','#ddd')
    $("#"+product_id+"-box_edit_name").css('display','none') // icon 
    $("#"+product_id+"-save_name").css('display','block') // icon

    // $('.icon-edit-prod').prop('disabled',true)
  

}

const clearTokenForm=()=>{
    $('#id_otp').val('')
    $('#id_pass').val('')
}


const save_edit_name=(product_id)=>{
    // alert($("#"+product_id+"-name").val())
    console.log('function jalan')
    $('#get_otp').modal('show')
    $('#s_product_name').addClass(product_id)
    $('#s_product_name').addClass('product_name')
 

    clearTokenForm()
}

const check_number_wa=()=>{
console.log('functuin jalan')
    Swal.fire({
        title: 'Whatsapp Number  <br> +62812 7777 8888',
        text: "Ingin Menghubungi Customer Service?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
      }).then((result) => {
          console.log(result)
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

    clearTokenForm()
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
        console.log(otp,pass)
        axios.post(`http://customers.sold.co.id/get-customer-information?Customer_Code=${token}`)
        .then((res)=>{
            console.log(res.data)
            email = res.data.Email
            //encrypt pass
            var new_pass
            axios.post(`http://customers.sold.co.id/password-generator?Password=${pass}`)
            .then((res)=>{
                if(res.data){
                    new_pass = res.data

                    axios.post(`http://customers.sold.co.id/verify-otp?Email=${email}&User_Password=${new_pass}&otp=${otp}`)
                    .then((res)=>{
                        console.log(res.data)
                        if(res.data){
                            $("#"+product_id+"-name").prop('disabled',true) 
                            $("#"+product_id+"-box_edit_name").css('display','block') // icon 
                            $("#"+product_id+"-save_name").css('display','none') // icon
                            $("#"+product_id+"-name").css('background-color','transparent')
    
                            var nama = $("#"+product_id+"-name").val()
                            var harga = $("#"+product_id+"-harga").val()
                            var qty = $("#"+product_id+"-qty").val()
                            var token = localStorage.getItem('token')
    
                            console.log(nama)
                            console.log(harga)
                            console.log(qty)
                            console.log(token)
    
                            if(nama.length <5){
                                axios.post(`http://products.sold.co.id/get-product-details?product_code=${product_id}`)
                                .then((res)=>{
                                    console.log(res.data.GroupBuy_SellPrice)
                                    $("#"+product_id+"-name").val(res.data.Name)
                                    swal.fire("Gagal Mengubah Data", "", "error");
                                    re_render_item_product()
                                }).catch((err)=>{
                                    console.log(err)
                                })
                            }else {
                                axios.post(`http://products.sold.co.id/update-product-name-price-quantity?Name=${nama}&Sell_Price=${harga}&Stock_Quantity=${qty}&Product_Code=${product_id}&Customer_Code=${token}&Email=${email}&Password=${pass}`)
                                .then((res)=>{
                                    console.log(res.data)
                                    if(res.data){
                                        swal.fire("Berhasil Mengubah Data", "", "success");
                                        $('#s_product_name').removeClass(product_id)
                                        $('#s_product_name').removeClass('product_name')
                                         $('#id_otp').val('')
                                         $('#id_pass').val('')
                                         re_render_item_product()
                                    }else {
                                        swal.fire("Gagal Mengubah Data", "", "error");
                                        re_render_item_product()
                                    }
                                }).catch((err)=>{
                                    console.log(err)
                                })
                            }
                            // Swal.fire('Simpan Berhasil', '', 'success')
                            $('#get_otp').modal('hide')
                        }else {
                            Swal.fire('Simpan Gagal', '', 'error')
                        }
                    }).catch((err)=>{
                        console.log(err)
                    })
                }else {
                    console.log('masuk ke else')
                    Swal.fire('Password Minimal 6 character', '', 'error')
                }
                console.log(res.data)
        
               
            }).catch((err)=>{
                console.log(err)
            })
        }).catch((err)=>{
            console.log(err)
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
                            console.log(nama, ' ini nama')
                            console.log(harga, ' ini harga')
                            console.log(qty, ' ini qty')
                            console.log(token, ' ini token')
                    
                            if(harga <500){
                                axios.post(`http://products.sold.co.id/get-product-details?product_code=${product_id}`)
                                    .then((res)=>{
                                        console.log(res.data.GroupBuy_SellPrice)
                                        $("#"+product_id+"-harga").val(res.data.Sell_Price)
                                        swal.fire("Gagal Mengubah Data", "", "error");
                                        re_render_item_product()
                                    }).catch((err)=>{
                                        console.log(err)
                                    })
                            }else {
                                axios.post(`http://products.sold.co.id/update-product-name-price-quantity?Name=${nama}&Sell_Price=${harga}&Stock_Quantity=${qty}&Product_Code=${product_id}&Customer_Code=${token}&Email=${email}&Password=${pass}`)
                                .then((res)=>{
                                    console.log(res.data,'2969')
                                    if(res.data){
                                        swal.fire("Berhasil Mengubah Data", "", "success");
                                        $('#s_product_name').removeClass(product_id)
                                        $('#s_product_name').removeClass('product_sell_price')
                                        re_render_item_product()
                                    }else {
                                        re_render_item_product()
                                        swal.fire("Gagal Mengubah Data", "", "error");
                                    }
                                }).catch((err)=>{
                                    console.log(err)
                                })
                                Swal.fire('Simpan Berhasil', '', 'success')
                                $('#get_otp').modal('hide')
                            }
                        }else {
                            Swal.fire('Simpan Gagal', '', 'error')
                        }
                    }).catch((err)=>{
                        console.log(err)
                    })

                }else {
                    console.log('masuk ke else')
                    Swal.fire('Password Minimal 6 character', '', 'error')
                }

            }).catch((err)=>{
                console.log(err)
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
        
                            console.log(nama)
                            console.log(harga)
                            console.log(qty)
                            console.log(token)
        
                            if(qty < 10){
                                axios.post(`http://products.sold.co.id/get-product-details?product_code=${product_id}`)
                                .then((res)=>{
                                    console.log(res.data.GroupBuy_SellPrice)
                                    $("#"+product_id+"-qty").val(res.data.Stock_Quantity)
                                    swal.fire("Gagal Mengubah Data", "", "error");
                                    re_render_item_product()
                                }).catch((err)=>{
                                    console.log(err)
                                })
                            }else {
                                
                                axios.post(`http://products.sold.co.id/update-product-name-price-quantity?Name=${nama}&Sell_Price=${harga}&Stock_Quantity=${qty}&Product_Code=${product_id}&Customer_Code=${token}&Email=${email}&Password=${pass}`)
                                .then((res)=>{
                                    console.log(res.data)
                                    if(res.data){
                                        swal.fire("Berhasil Mengubah Data", "", "success");
                                        $('#s_product_name').removeClass(product_id)
                                        $('#s_product_name').removeClass('product_quantity')
                                        re_render_item_product()
                                    }else {
                                        swal.fire("Gagal Mengubah Data", "", "error");
                                        re_render_item_product()
                                    }
                                }).catch((err)=>{
                                    console.log(err)
                                })
                            }
                            // Swal.fire('Simpan Berhasil', '', 'success')
                            $('#get_otp').modal('hide')
                        }else {
                            Swal.fire('Simpan Gagal', '', 'error')
                        }
                    }).catch((err)=>{
                        console.log(err)
                    })
                }else {
                    console.log('masuk ke else')
                    Swal.fire('Password Minimal 6 character', '', 'error')
                }
            }).catch((err)=>{
                console.log(err)
            })
        }).catch((err)=>{
            console.log(err)
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

                        console.log(status, ' ini status')
                        console.log(price, ' ini price')
                        console.log(qty, ' ini qty')
                        console.log(Product_Code, ' ini product Code')
                        console.log(token,' cc')
                        console.log(email,'email groupbuy')
                        console.log(pass,'pass groupbuy')
                        console.log(`http://products.sold.co.id/update-product-groupbuy-status-price-quantity?GroupBuy_Purchase=${status}&GroupBuy_SellPrice=${price}&GroupBuy_SellQuantity=${qty}&Product_Code=${Product_Code}&Customer_Code=${token}&Email=${email}&Password=${pass}`)
                        axios.post(`http://products.sold.co.id/update-product-groupbuy-status-price-quantity?GroupBuy_Purchase=${status}&GroupBuy_SellPrice=${price}&GroupBuy_SellQuantity=${qty}&Product_Code=${Product_Code}&Customer_Code=${token}&Email=${email}&Password=${pass}`)
                        .then((res)=>{
                            console.log(res.data,'berhasil update product discount')
                            if(res.data){
                                $('#get_otp').modal('hide')
                                $("#"+product_id+"-discount").prop('disabled',true) 
                                $("#"+product_id+"-box_edit_discount").css('display','block') // icon 
                                $("#"+product_id+"-save_discount").css('display','none') // icon
                                $("#"+product_id+"-discount").css('background-color','transparent')
                                $('#s_product_name').removeClass(product_id)
                                $('#s_product_name').removeClass('product_discount')
                                swal.fire("Berhasil Mengubah Data", "", "success");
                                // Swal.fire('Simpan Berhasil', '', 'success')
                                
                            }else {
                                swal.fire("Gagal Mengubah Data", "", "error")    
                                axios.post(`http://products.sold.co.id/get-products-belong-to-the-supplier?Creator=${token}`)
                                .then((res)=>{
                                    console.log(res.data.GroupBuy_SellPrice)
                                    $("#"+product_id+"-discount").val(res.data.GroupBuy_SellPrice)
                                }).catch((err)=>{
                                    console.log(err)
                                })
                            }
                        }).catch((err)=>{
                            console.log(err)
                        })
                        }else {
                            Swal.fire('Simpan Gagal', '', 'error')
                        }
                    }).catch((err)=>{
                        console.log(err)
                    })

                }else {
                    console.log('masuk ke else')
                    Swal.fire('Password Minimal 6 character', '', 'error')
                }
            }).catch((err)=>{
                console.log(err)
            })
        }).catch((err)=>{
            console.log(err)
        })
    }else if (jenis_edit === 'groupbuy_qty'){
        console.log('function groupbuy qty jalan')
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
                        console.log(status, ' ini status')
                        console.log(price, ' ini price')
                        console.log(qty, ' ini qty')
                        console.log(Product_Code, ' ini product Code')
                        axios.post(`http://products.sold.co.id/update-product-groupbuy-status-price-quantity?GroupBuy_Purchase=${status}&GroupBuy_SellPrice=${price}&GroupBuy_SellQuantity=${qty}&Product_Code=${Product_Code}&Customer_Code=${token}&Email=${email}&Password=${pass}`)
                        .then((res)=>{
                            console.log(res.data, ' berhasil update discount price')
                            if(res.data){
                                swal.fire("Berhasil Mengubah Data", "", "success");
                                $('#s_product_name').removeClass(product_id)
                                $('#s_product_name').removeClass('groupbuy_qty')
                                $('#get_otp').modal('hide')
                                $("#"+product_id+"-quantity").prop('disabled',true) 
                                $("#"+product_id+"-box_edit_quantity").css('display','block') // icon 
                                $("#"+product_id+"-save_quantity").css('display','none') // icon
                                $("#"+product_id+"-quantity").css('background-color','transparent')
                            }else {
                                swal.fire("Gagal Mengubah Data", "", "error");
                                $("#"+product_id+"-quantity").prop('disabled',true) 
                                $("#"+product_id+"-box_edit_quantity").css('display','block') // icon 
                                $("#"+product_id+"-save_quantity").css('display','none') // icon
                                $("#"+product_id+"-quantity").css('background-color','transparent')
                                axios.post(`http://products.sold.co.id/get-product-details?product_code=${product_id}`)
                                .then((res)=>{
                                    $("#"+product_id+"-quantity").val(res.data.GroupBuy_SellQuantity)
                                }).catch((err)=>{
                                    console.log(err)
                                })
                            }
                        }).catch((err)=>{
                            console.log(err)
                        })
                        }else {
                            Swal.fire('Simpan Gagal', '', 'error')
                        }
                    }).catch((err)=>{
                        console.log(err)
                    })
                }else {
                    console.log('masuk ke else')
                    Swal.fire('Password Minimal 6 character', '', 'error')
                }
            }).catch((err)=>{
                console.log(err)
            })

        }).catch((err)=>{
            console.log(err)
        })
    }else if (jenis_edit === 'status_gb'){
        get_status(product_id,pass)
        $('#s_product_name').removeClass(product_id)
        $('#s_product_name').removeClass('status_gb')
    }
    else {
        console.log('masuk ke else 2570 jquery')
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



// CARD FLIP DETAIL PAYMENT

// var card = document.querySelector('.card_flip_payment');
// card.addEventListener( 'click', function() {
//   card.classList.toggle('is-flipped');
// });

$('.card_flip_payment').on('mouseover',function(){
    alert('jalan')
    $('.card_flip_payment').toggleClass('is-flipped')
})



const copy_link_share=()=>{
    // alert('function jalan')
    var copyText = document.getElementById("copyClipboard");
    if(copyText){
        console.log(copyText)
        copyText.select();
        copyText.setSelectionRange(0, 99999);
        document.execCommand("Copy");
        Swal.fire('Copy berhasil', '', 'success')
    }
    
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
          console.log(gambar_active, ' ini gambar active')
           toDataURL('http://sold.co.id/img/promo1.png',  async function(dataUrl) {
          // console.log('RESULT:', dataUrl)
              await $('#scream').attr('src',dataUrl)
              var example = document.getElementById('example');
              var context = example.getContext('2d');
              var img = document.getElementById("scream");
              context.drawImage(img, 0, 0, 500, 500);
              
              // var c = example.getContext('2d');
              var p =  context.getImageData(10, 10, 1, 1).data; 
              console.log(p)
              var hex = "#" + ("000000" + rgbToHex(p[0], p[1], p[2])).slice(-6);
              // alert(hex)
  
  
               await $('.ads-3').css('background-color',hex)
               await $('.ads-1').css('background-color',hex)
              // $('#status').html(cord + "<br>" + hex);
              gambar_active = 2
          })
   
      }
      else if (gambar_active == 2){
          console.log(gambar_active, ' ini gambar active')
           toDataURL('http://sold.co.id/img/promo3.png', async function(dataUrl) {
          // console.log('RESULT:', dataUrl)
              await $('#scream').attr('src',dataUrl)
              var example = document.getElementById('example');
              var context = example.getContext('2d');
              var img = document.getElementById("scream");
              context.drawImage(img, 0, 0, 500, 500);
              
              // var c = example.getContext('2d');
              var p =  context.getImageData(10, 10, 1, 1).data; 
              console.log(p)
              var hex = "#" + ("000000" + rgbToHex(p[0], p[1], p[2])).slice(-6);
              // alert(hex,'GA2')
  
  
              await $('.ads-3').css('background-color',hex)
              await  $('.ads-1').css('background-color',hex)
              // $('#status').html(cord + "<br>" + hex);
              gambar_active = 3
          })
      }else {
          console.log(gambar_active, ' ini gambar active')
          // console.log(gambar_active, ' ini gambar active')
           toDataURL('http://sold.co.id/img/promo5.png',  async function(dataUrl) {
          // console.log('RESULT:', dataUrl)
              await  $('#scream').attr('src',dataUrl)
              var example = document.getElementById('example');
              var context = example.getContext('2d');
              var img = document.getElementById("scream");
              context.drawImage(img, 0, 0, 500, 500);
              
              // var c = example.getContext('2d');
              var p =  context.getImageData(10, 10, 1, 1).data; 
              console.log(p)
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
      