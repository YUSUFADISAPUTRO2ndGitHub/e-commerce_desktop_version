$(function(){
    
    // $('#datepicker').datepicker();
    // $('.carousel').carousel()
    
      
        
      
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
                    // $('.sup_delete').css('left','20px')
                }else {
                    $('.btn-status-barang').css('display','block')
                    $('.sup_delete').css('display','none')
                    $('.box-kumpulkan-profile').css('top','0px')
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
                $('#rekening_user').val(`${data_customer.extra_column_1}`)
                $('#referral-profile').val(`${data_customer.extra_column_2}`)
                $('#no_ktp_user').val(`${data_customer.ktp}`)
                $('.ref-profile').val(token)
                var a = $('#refer-profile').val()
                console.log(a)
                $('#profileModal').modal('show')
            }else {
                
                $('#loginModal').modal('show')
            }
        }).catch((err)=>{
            console.log(err)
        })

        $('.closeByLogin').css('display','none')
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
        $('.option-1').removeClass("background_grey")
        $('.option-2').removeClass("background_grey")
        $('.option-3').removeClass("background_grey")
        
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
                }else {
                    $('.input_total_row_gb').val('TOTAL ROW = ' + all_data.length)
                    all_data.map((val,index)=>{
                        if(val.GroupBuy_Purchase === 'true'){
                            if(val.GroupBuy_SellPrice === 'NULL'  && val.GroupBuy_SellQuantity === 'NULL'){
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
    axios.post(`http://products.sold.co.id/get-unpaid-sales-order-specific-for-a-product?Product_Code=${product_id}&Customer_Code=${token}`)
    .then((res)=>{
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
    if(total_qty_from_user>0) {
        axios.post(`http://sales.sold.co.id/check-group-buy-quantity-so-far-gross?Group_Buy_Purchase_PC=${product_id}`)
        .then((res)=>{
            total_item_kebeli = res.data
            console.log(res.data)
            if(res.data === null) {
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
                        }).catch((err)=>{
                            console.log(err)
                        })
                        swal.fire("Penambahan Data Berhasil, Silahkan Check Cart", "", "success");
                        $('.modals-product-detail').css('display','none')

                    }).catch((err)=>{
                        console.log(err)
                    })
                }).catch((err)=>{
                    console.log(err)
                })
            }else {
                
                axios.post(`http://products.sold.co.id/get-product-details?product_code=${product_id}`)
                .then((response)=>{
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
                                        console.log(res.data)
                                        // swal.fire("Penambahan Data Berhasil, Silahkan Check Cart", "", "success");
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
                                        window.location.reload()
                                    }else {
                                        swal.fire("Penambahan Data gagal, Silahkan Check Pengisian data", "", "success");
                                        $('.modals-product-detail').css('display','none')
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
                            }).catch((err)=>{
                                console.log(err)
                            })
                    
                            swal.fire("Penambahan Data Berhasil, Silahkan Check Cart", "", "success");
                            $('.groupbuy_sp').css('display','none')
                
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
                    swal.fire("Penambahan Data Berhasil, Silahkan Check Cart", "", "success");
                    $('.groupbuy_sp').css('display','none')
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
    console.log(item.value)
    if(item.value === 'Alamat Terdaftar'){
        
        $('.option-alamat-gb').css('display','block')
        $('.alamat-pengiriman').css('display','none')
    }else if (item.value === 'Alamat Baru'){
        
        $('.option-alamat-gb').css('display','none')
        $('.alamat-pengiriman').css('display','block')
    }
}


function resultAddress(item){

}
$('.id-address-gb').on('click',function(){
    var data = $(this).val()
    console.log(data)
})



const to_detail_product=(id)=>{
    console.log(id)
    $('#detailProductModal').modal('show')

    axios.post(`http://products.sold.co.id/get-product-details?product_code=${id}`)
    .then((res)=>{
        console.log(res.data)
       
        
            $('.tbody_detail_product').append(`
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
const get_status=(product_id)=>{
    // alert(item_status)
    
    var Product_Code = $("#"+product_id+"-pCode").val()
    var Name = $("#"+product_id+"-pName").val()
    var qty = $("#"+product_id+"-quantity").val()
    var price = $("#"+product_id+"-discount").val()
    var token = localStorage.getItem('token')
    var result;


    // if($(item_status).is(':checked')){
        //     result = true
        // }else {
            //     result = false
            // }
            console.log($('#'+product_id+"-status").val())
            if($('#'+product_id+"-status").is(':checked')){
                result = true
            }else {
                result = false
            }
            
            axios.post(`http://products.sold.co.id/update-product-groupbuy-status-price-quantity?GroupBuy_Purchase=${result}&GroupBuy_SellPrice=${price}&GroupBuy_SellQuantity=${qty}&Product_Code=${Product_Code}&Customer_Code=${token}`)
            .then((res)=>{
                if(res.data){
                    swal.fire("Berhasil Mengubah Data", "", "success");
                }else {
                    swal.fire("Gagal Mengubah Data", "", "error");
                    
                    
            axios.post(`http://products.sold.co.id/get-product-details?product_code=${product_id}`)
            .then((res)=>{
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
 }

const save_edit_quantity=(product_id)=>{
    $("#"+product_id+"-quantity").prop('disabled',true) 
    $("#"+product_id+"-box_edit_quantity").css('display','block') // icon 
    $("#"+product_id+"-save_quantity").css('display','none') // icon
    $("#"+product_id+"-quantity").css('background-color','transparent')

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
    axios.post(`http://products.sold.co.id/update-product-groupbuy-status-price-quantity?GroupBuy_Purchase=${status}&GroupBuy_SellPrice=${price}&GroupBuy_SellQuantity=${qty}&Product_Code=${Product_Code}&Customer_Code=${token}`)
    .then((res)=>{
        console.log(res.data)
        if(res.data){
            swal.fire("Berhasil Mengubah Data", "", "success");
        }else {
            swal.fire("Gagal Mengubah Data", "", "error");
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


}


// EDIT DISCOUNT
const edit_product_discount=(product_id)=>{
    $("#"+product_id+"-discount").prop('disabled',false) 
    $("#"+product_id+"-discount").css('background-color','#ddd')


    $("#"+product_id+"-box_edit_discount").css('display','none') // icon 
    $("#"+product_id+"-save_discount").css('display','block') // icon
}

const save_edit_discount=(product_id)=>{
    $("#"+product_id+"-discount").prop('disabled',true) 
    $("#"+product_id+"-box_edit_discount").css('display','block') // icon 
    $("#"+product_id+"-save_discount").css('display','none') // icon
    $("#"+product_id+"-discount").css('background-color','transparent')

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
    axios.post(`http://products.sold.co.id/update-product-groupbuy-status-price-quantity?GroupBuy_Purchase=${status}&GroupBuy_SellPrice=${price}&GroupBuy_SellQuantity=${qty}&Product_Code=${Product_Code}&Customer_Code=${token}`)
    .then((res)=>{
        console.log(res.data)
        if(res.data){
            swal.fire("Berhasil Mengubah Data", "", "success");
        }else {
            swal.fire("Gagal Mengubah Data", "", "error");
            swal.fire("Gagal Mengubah Data", "", "error");
            axios.post(`http://products.sold.co.id/get-product-details?product_code=${product_id}`)
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
        }).catch((err)=>{
            console.log(err)
        })
    }else {

        axios.post(`http://products.sold.co.id/update-product-name-price-quantity?Name=${nama}&Sell_Price=${harga}&Stock_Quantity=${qty}&Product_Code=${product_id}&Customer_Code=${token}`)
        .then((res)=>{
            console.log(res.data)
            if(res.data){
                swal.fire("Berhasil Mengubah Data", "", "success");
            }else {
                swal.fire("Gagal Mengubah Data", "", "error");
            }
        }).catch((err)=>{
            console.log(err)
        })
    }

 }


// HARGA
const edit_product_harga=(product_id)=>{
    $("#"+product_id+"-harga").prop('disabled',false) 
    $("#"+product_id+"-harga").css('background-color','#ddd')


    $("#"+product_id+"-box_edit_harga").css('display','none') // icon 
    $("#"+product_id+"-save_harga").css('display','block') // icon
    
}

const save_edit_harga=(product_id)=>{
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

    if(harga < 500){
        axios.post(`http://products.sold.co.id/get-product-details?product_code=${product_id}`)
            .then((res)=>{
                console.log(res.data.GroupBuy_SellPrice)
                $("#"+product_id+"-harga").val(res.data.Sell_Price)
                swal.fire("Gagal Mengubah Data", "", "error");
            }).catch((err)=>{
                console.log(err)
            })
    }else {
        axios.post(`http://products.sold.co.id/update-product-name-price-quantity?Name=${nama}&Sell_Price=${harga}&Stock_Quantity=${qty}&Product_Code=${product_id}&Customer_Code=${token}`)
        .then((res)=>{
            if(res.data){
                swal.fire("Berhasil Mengubah Data", "", "success");
            }else {
                
                swal.fire("Gagal Mengubah Data", "", "error");
            }
        }).catch((err)=>{
            console.log(err)
        })

    }

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
  

}


const save_edit_name=(product_id)=>{
    // alert($("#"+product_id+"-name").val())
    
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
        }).catch((err)=>{
            console.log(err)
        })
    }else {
        axios.post(`http://products.sold.co.id/update-product-name-price-quantity?Name=${nama}&Sell_Price=${harga}&Stock_Quantity=${qty}&Product_Code=${product_id}&Customer_Code=${token}`)
        .then((res)=>{
            console.log(res.data)
            if(res.data){
                swal.fire("Berhasil Mengubah Data", "", "success");
            }else {
                swal.fire("Gagal Mengubah Data", "", "error");
            }
        }).catch((err)=>{
            console.log(err)
        })

    }

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
