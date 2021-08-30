$( document ).ready(function() {

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const search = urlParams.get('search');
    const subcategory = urlParams.get('category')
    const searching = urlParams.get('searching')
    if(searching != undefined){
        render_searching_page(searching)
    }
    

    // category-list
    axios.post(`http://products.sold.co.id/get-product-details?Get_ALL_Category=true`)
    .then((res)=>{
        res.data.map((val,index)=>{
            // 
            $('.category-list-sp').append(
                `
                <li class="list-group-item" onclick="show_subcategory('${val.Category}')">${val.Category.toUpperCase()}</li>
                `
                )
            })
    }).catch((err)=>{
        
    })


});

const sort_by_higher=()=>{

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const search = urlParams.get('search');
    const subcategory = urlParams.get('category')
    const searching = urlParams.get('searching')
    render_sort_price(searching,'asc')
    // 
}
const sort_by_lower=()=>{

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const search = urlParams.get('search');
    const subcategory = urlParams.get('category')
    const searching = urlParams.get('searching')
    render_sort_price(searching,'desc')
    // 
}


const render_sort_price=(product_name,condition)=>{
    // 
    var data = product_name
    if(data){
        $('.sp_name').val(data)
    }else {
        $('.sp_name').val('All')
    }
    

    axios.post(`http://products.sold.co.id/get-product-details?product_name=${product_name}`)
    .then((res)=>{
        // 
        if(condition == 'asc'){
            res.data.sort((a,b) => (b.Sell_Price > a.Sell_Price) ? 1 : -1)

        }else {
            res.data.sort((a,b) => (a.Sell_Price > b.Sell_Price) ? 1 : -1)
        }
        // 
        $('.new-box-card').empty()
        res.data.map((val,index)=>{
            var hargaAwal = parseInt(val.Sell_Price)
            var discount = parseInt(val.Sell_Price * 0.1)
            var hargaTotal = hargaAwal + discount
            $('.new-box-card').append(`
            <div class="card-item card_sp hvr-float-shadow">
                    <img src="${val.Picture_1}" alt="" class="img-card img_sp" onclick="get_product_detail_from_searching_page('${val.Product_Code}')">   
                <div class="card-item-list">
                    <p class="limited-text-short">${val.Name}</p>
                    <div class="split-item">
                        <div class="item-price">
                            <p>RP. ${hargaTotal}</p>
                            <p>Rp. ${hargaAwal}</p>
                        </div>
                        <div class="buy-icon" onclick="addToCart('${val.Product_Code}')">
                            <img src="../img/cart.png" alt="" class="icon-buy" id="${val.Product_Code}">
                        </div>
                    </div>
                </div>
            </div>
            `)
        })
    }).catch((err)=>{
        
    })


    // axios.post(``)

   
}

// batas
function show_subcategory(choosen_parent_category){
    $('.close-button').css('display','block')

    let timerInterval
    Swal.fire({
    title: 'Please Wait',
    // html: 'I will close in <b></b> milliseconds.',
    timer: 2000,
    timerProgressBar: true,
    didOpen: () => {
        Swal.showLoading()
        timerInterval = setInterval(() => {
        const content = Swal.getHtmlContainer()
        if (content) {
            const b = content.querySelector('b')
            if (b) {
            b.textContent = Swal.getTimerLeft()
            }
        }
        }, 100)
    },
    willClose: () => {
        clearInterval(timerInterval)
    }
    }).then((result) => {
    /* Read more about handling dismissals below */
    if (result.dismiss === Swal.DismissReason.timer) {
        
        axios.post(`http://products.sold.co.id/get-product-details?Get_ALL_Sub_Category_Based_On_Category=${choosen_parent_category}`)
        .then((res)=>{
            // 
            // $('.box-list-kategori').css("display", "block")
            $('.box-list-kategori').toggle()
            $('.box-list-kategori').empty()
            res.data.map((val,index)=>{
                // if(val == false || val.Sell_Price == 'NULL' || val.Sell_Price == 0 || val.Sell_Price < 1 ||
                // val.Sell_Price == undefined  || val.Sell_Price == null || isNaN(hargaAwal)
                // ){
                //     
                // }else {
                    $('.box-list-kategori').append(
                      `
                        <div class="card-all-item hvr-float-shadow" id="${val.Subcategory}" onclick="show_jenisproduct('${val.Subcategory}')">
                            <img src="${val.Picture_1}" alt="" class="img-all-card">   
                            <div class="card-all-item-list">
                                <p class="limited-text-short">${val.Subcategory}</p>
                            </div>
                        </div>
                        `
                    )

                // }
            }) 
            
        }).catch((err)=>{
            
        })
    }
    })
}

function show_jenisproduct(jenis_product){
    

    $('.box-list-kategori').css('display','none')
    $('.box-list-subcategory').css('display','block')
    $('.close-button').css('display','block')
    $('.render-item-sub').empty()

    let timerInterval
    Swal.fire({
    title: 'Please Wait',
    // html: 'I will close in <b></b> milliseconds.',
    timer: 2000,
    timerProgressBar: true,
    didOpen: () => {
        Swal.showLoading()
        timerInterval = setInterval(() => {
        const content = Swal.getHtmlContainer()
        if (content) {
            const b = content.querySelector('b')
            if (b) {
            b.textContent = Swal.getTimerLeft()
            }
        }
        }, 100)
    },
    willClose: () => {
        clearInterval(timerInterval)
    }
    }).then((result) => {
    /* Read more about handling dismissals below */
    if (result.dismiss === Swal.DismissReason.timer) {
        
        axios.post(`http://products.sold.co.id/get-product-details?subcategory=${jenis_product}`)
        .then((res)=>{
            // 
            res.data.map((val,index)=>{
                // 
                // 
                var hargaAwal = parseInt(val.Sell_Price)
                var discount = parseInt(val.Sell_Price * 0.1)
                var hargaTotal = hargaAwal + discount
                // if(val == false || val.Sell_Price == 'NULL' || val.Sell_Price == 0 || val.Sell_Price < 1 ||
                // val.Sell_Price == undefined  || val.Sell_Price == null || isNaN(hargaAwal)
                // ){
                    
                // }else {
                    
                    $('.render-item-sub').append(
                      `
                        <div class="card-item card_sp hvr-float-shadow">
                            <img src="${val.Picture_1}" alt="" class="img-card" onclick="get_product_detail_from_searching_page('${val.Product_Code}')">   
                            <div class="card-item-list">
                                <p class="limited-text-short">${val.Name}</p>
                                <div class="split-item">
                                    <div class="item-price">
                                        <p>RP. ${hargaTotal}</p>
                                        <p>Rp. ${hargaAwal}</p>
                                    </div>
                                    <div class="buy-icon" onclick="addToCart('${val.Product_Code}')">
                                        <img src="../img/cart.png" alt="" class="icon-buy" id="${val.Product_Code}">
                                    </div>
                                </div>
                            </div>
                        </div>
                        `
                    )

                // }
            }) 
            // $('.modals-lk').addClass('melihat') // ini bisa hampir
            
            
            
        }).catch((err)=>{
            
        })
    }
    })


}

const get_product_detail_from_searching_page=(product_id)=>{
    
    // $('.item_detail_sp').empty()
    $(this).scrollTop('.item_detail_sp')
    $('.box-list-subcategory').css('display','none')
    // $('.item_detail_sp').css('display','flex')
    $('.close-button').css('display','block')
    $('.groupbuy_sp_iframe').css('display','block')
    $('.groupbuy_sp_iframe').attr('src',`./itemDetail.html?product_id=${product_id}`)


    // $('.iframe',window.parent.document).css('display','block')
    // $('.iframe',window.parent.document).css('display','block')
    // axios.post(`http://products.sold.co.id/get-product-details?product_code=${product_id}`)
    // .then((res)=>{
    //     
    //     item = res.data
    //     var hargaAwal = parseInt(item.Sell_Price)
    //     var discount = parseInt(item.Sell_Price * 0.1)
    //     var hargaTotal = hargaAwal + discount
    //     
    //     
    //     
    //     const querystring = $(location).attr('href');
    //     if(item.GroupBuy_Purchase == 'false' || item.GroupBuy_Purchase == false){
    //         $('.item_detail_sp').append(
    //             `
    //             <div class="box-item-img gb-${item.GroupBuy_Purchase}">
    //                 <div class="item-img"> 
    //                     <div class="box-back-detail">
    //                         <i class="fas fa-chevron-left icon-prev-detail" ></i>
    //                     </div>
    //                     <img src="${item.Picture_1}" alt="" class="img-icon-sp">
    //                     <div class="box-next-detail">
    //                         <i class="fas fa-chevron-right icon-prev-detail" ></i>
    //                     </div>
    //                 </div>
                    
    //                 <div class="rating-bottom-sp">
    //                     <div class="star-box">
    //                         <iframe class="star-iframe"  src="../Iframe/rating-stars/index.html?product_code=${product_id}"></iframe> 
    //                     </div>
    //                 </div>
    //             </div>
    //             <div class="item-detail det-sp">
    //                 <div class="detail-1">
    //                     <div class="item-1">
    //                         <p>${item.Name}</p>
    //                     </div>
    //                     <div class="item-2">
    //                         <div class="item-4-sp"> 
    //                             <p>Harga Termasuk PPN: <span id="span_harga"> Rp.${hargaTotal} </span> </p>  
    //                             <div class="box-qty-detail"> Kuantitas  : ${item.Stock_Quantity} </div>   
    //                         </div>
    //                         <p>Harga dengan pembayaran tempo : *hubungi customer service kami*</p>
    //                     </div>
    //                     <div class="box_share_product">
    //                         <p>Share This Product</p>
    //                         <div class="box_ins_share"> 
    //                             <input type="text" value="${querystring}" readonly class="share_link_input" id="copyClipboard" onclick="copy_link_share()">
    //                             <i class="far fa-copy btn_link_share" onclick="copy_link_share()" id="copy"></i>
    //                         </div>
    //                     </div>
    //                         <ul class="box-add" onclick="addToCart('${item.Product_Code}')">
    //                             <li>
    //                                 <p>Add to Cart</p>
    //                             </li>
    //                             <li>
    //                                 <img src="../img/cart.png" alt="" class="img-cart">
    //                             </li>
    //                         </ul>
    //                     <br>
    //                     <br>
    //                     <div class="deskripsi-sp">
    //                         <p>Deskripsi :</p>
    //                         <p>${item.Description}</p>
    //                     </div>      
    //             </div>
    //             `
    //         )
    //     }else{
    //         $('.item_detail_sp').append(
    //             `
    //             <div class="box-item-img gb-${item.GroupBuy_Purchase}">
    //                 <div class="item-img"> 
    //                     <div class="box-back-detail">
    //                         <i class="fas fa-chevron-left icon-prev-detail" ></i>
    //                     </div>
    //                     <img src="${item.Picture_1}" alt="" class="img-icon-sp">
    //                     <div class="box-next-detail">
    //                         <i class="fas fa-chevron-right icon-prev-detail" ></i>
    //                     </div>
    //                 </div>
                    
    //                 <div class="rating-bottom-sp">
    //                     <div class="star-box">
    //                         <iframe class="star-iframe"  src="../Iframe/rating-stars/index.html?product_code=${product_id}"></iframe> 
    //                     </div>

    //                 </div>
    //             </div>
    //             <div class="item-detail det-sp">
    //                 <div class="detail-1">
    //                     <div class="item-1">
    //                         <p>${item.Name}</p>
    //                     </div>
    //                     <div class="item-2">
    //                         <div class="item-4-sp"> 
    //                             <p>Harga Termasuk PPN: <span id="span_harga"> Rp.${hargaTotal} </span> </p>  
    //                             <div class="box-qty-detail"> Kuantitas  : ${item.Stock_Quantity} </div>   
    //                         </div>
    //                         <p>Harga dengan pembayaran tempo : *hubungi customer service kami*</p>
    //                     </div>
    //                     <div class="item-1">
    //                         <p>Harga GROUP BUY DISKON: <span style="color:#37CED5"> Rp.${item.GroupBuy_SellPrice}</span> </p>
    //                     </div>
    //                     <div class="box_share_product">
    //                         <p>Share This Product</p>
    //                         <div class="box_ins_share"> 
    //                             <input type="text" value="${querystring}" readonly class="share_link_input" id="copyClipboard" onclick="copy_link_share()">
    //                             <i class="far fa-copy btn_link_share" onclick="copy_link_share()" id="copy"></i>
    //                         </div>
    //                     </div>
    //                     <div class="box-detail-option">
    //                         <ul class="box-add" onclick="addToCart('${item.Product_Code}')">
    //                             <li>
    //                                 <p>Add to Cart</p>
    //                             </li>
    //                             <li>
    //                                 <img src="../img/cart.png" alt="" class="img-cart">
    //                             </li>
    //                         </ul>
                    
    //                         <div class="box-discount" onclick="groupbuy_sp_form('${item.Product_Code}')">
    //                             <div class="add-discount">
    //                                 <p>Beli dengan diskon GROUP BUY</p>
    //                             </div>
    //                         </div>
                    
    //                     </div>

    //                     <br>
    //                     <div class="deskripsi-sp">
    //                         <p>Deskripsi :</p>
    //                         <p>${item.Description}</p>
    //                     </div>
    //                 </div>
    //             </div>
    //             `
    //         )
    //     }
        
    // }).catch((err)=>{
    //     
    // })
}



function groupbuy_sp_form(product_id){
    var token = localStorage.getItem('token')
    axios.post(`http://products.sold.co.id/get-unpaid-sales-order-specific-for-a-product?Product_Code=${product_id}&Customer_Code=${token}`)
    .then((res)=>{
        // 
        if(res.data){

    $('.groupbuy_sp').empty()
    $('.item_detail_sp').css('display','none')
    $('.groupbuy_sp').css('display','flex')
    $('.close-button').css('display','block')

    $('.groupbuy_sp_iframe').attr('src','./I')

    // axios.post(`http://products.sold.co.id/get-product-details?product_code=${product_id}`)
    // .then((res)=>{
    //     var item_product = res.data
    //     var option_payment
    //         axios.post(`http://paymntmthd.sold.co.id/get-all-payment-method`)
    //         .then((res)=>{       
    //             
    //             option_payment = res.data
    //              $('.groupbuy_sp').append(`
    //                 <div class="group-left" >
    //                     <div class="groupbuy-form">
    //                         <div class="box-card-kurir-sp-top"> 
    //                             <div class="login-name">
    //                                 <div class="box-name-2">
    //                                     <p>Kuantitas Permintaan</p>
    //                                 </div>
    //                                 <input type="text" class="kodepos-form-top qty_groupbuy sp_quantity_hover" placeholder="Kuantitas Permintaan" id="${product_id}">
    //                             </div>
    //                             <select class="form-select option-payment-gb" aria-label="Default select example">
    //                             </select>
    //                             <select class="form-select option-address-gb sp_address_hover" aria-label="Default select example" onchange="addressMethod(this)" >
    //                                 <option selected>Select Address Method</option>    
    //                                 <option value="Alamat Terdaftar" class="id-address-gb">Alamat Terdaftar</option>    
    //                                 <option value="Alamat Baru" class="id-address-gb">Alamat Baru</option>           
    //                             </select>

    //                             <select class="form-select option-alamat-gb sp_alamat_hover" aria-label="Default select example" onchange="resultAddress(this)" style="display:none">
    //                             </select>
                
    //                             <div class="login-name alamat-pengiriman" style="display:none">
    //                                 <div class="box-name" >
    //                                     <p>PENGIRIMAN KE ALAMAT</p>
    //                                 </div>
    //                                 <input type="text" class="kodepos-form sp_alamat_pengiriman_hover" placeholder="alamat Pengiriman" id="alamat_lain">
    //                             </div>
    //                         </div>
    //                         <div class="box-card-kurir-sp"> 
    //                             <div class="card-kurir-sp">
    //                                 <div class="input-group mb-3 input-card-sp">
    //                                     <div class="input-group-prepend">
    //                                         <label class="input-group-text " for="inputGroupSelect01">Kurir</label>
    //                                     </div>
    //                                     <select class="custom-select sp_kurir_hover" id="inputGroupSelect01" onchange="kurirMethod(this)">  
    //                                         <option selected  class="id-kurir-gb"> Kurir</option>  
    //                                         <option  value="TIKI" class="id-kurir-gb">TIKI</option> 
    //                                         <option  value="JNE" class="id-kurir-gb">JNE</option> 
    //                                         <option  value="GOJEK" class="id-kurir-gb">GOJEK</option> 
    //                                     </select>
    //                                 </div>
    //                                 <div class="input-group mb-3 input-card-sp">
    //                                     <div class="input-group-prepend">
    //                                         <label class="input-group-text" for="inputGroupSelect01">Provinsi</label>
    //                                     </div>
    //                                     <select class="custom-select sp_provinsi_hover" id="inputGroupSelect01" onchange="provinceMethod(this)" >  
    //                                         <option  selected  class="id-kurir-gb"> Provinsi</option>  
    //                                         <option  value="DKI" class="id-province-gb">DKI</option> 
    //                                         <option  value="JAWA BARAT" class="id-province-gb">JAWA BARAT</option> 
    //                                         <option  value="JAWA TENGAH" class="id-province-gb">JAWA TENGAH</option>  
    //                                     </select>
    //                                 </div>
    //                                 <div class="input-group mb-3 input-card-sp">
    //                                     <div class="input-group-prepend">
    //                                         <label class="input-group-text" for="inputGroupSelect01">Kota</label>
    //                                     </div>
    //                                     <select class="custom-select sp_kota_hover" id="inputGroupSelect01" onchange="kotaMethod(this)" >  
    //                                         <option selected  class="id-kurir-gb"> Kota</option>      
    //                                         <option  value="JAKARTA" class="id-kota-gb">JAKARTA</option> 
    //                                         <option  value="BANDUNG" class="id-kota-gb">BANDUNG</option> 
    //                                         <option  value="YOGYAKARTA" class="id-kota-gb">YOGYAKARTA</option>  
    //                                     </select>
    //                                 </div>
    //                                 <div class="input-group mb-3 input-card-sp">
    //                                     <div class="input-group-prepend">
    //                                         <label class="input-group-text" for="inputGroupSelect01">Kecamatan</label>
    //                                     </div>
    //                                     <select class="custom-select sp_kecamatan_hover" id="inputGroupSelect01" onchange="kecamatanMethod(this)" >  
    //                                         <option selected  class="id-kurir-gb">Kecamatan</option>      
    //                                         <option  value="KELAPA DUA" class="id-kecamatan-gb">KELAPA DUA</option> 
    //                                         <option  value="kelapa tiga" class="id-kecamatan-gb">kelapa tiga</option> 
    //                                         <option  value="kelapa doang" class="id-kecamatan-gb">kelapa doang</option>  
    //                                     </select>
    //                                 </div>
    //                             </div>
    //                             <div class="card-kurir-sp">              
                                   
    //                                 <div class="input-group mb-3 input-card-sp">
    //                                     <div class="input-group-prepend">
    //                                         <label class="input-group-text" for="inputGroupSelect01">Kelurahan</label>
    //                                     </div>
    //                                     <select class="custom-select sp_kelurahan_hover" id="inputGroupSelect01" onchange="kelurahanMethod(this)" >  
    //                                         <option selected  class="id-kurir-gb">Kelurahan</option>      
    //                                         <option  value="KEBON JERUK" class="id-kelurahan-gb">KEBON JERUK</option> 
    //                                         <option  value="kelapa tiga" class="id-kelurahan-gb">kelapa tiga</option> 
    //                                         <option  value="kelapa doang" class="id-kelurahan-gb">kelapa doang</option>  
    //                                     </select>
    //                                 </div>            
    //                                 <input type="number" class="kodepos-form sp_kodepos_hover" placeholder="KODE POS" id="option-kodepos-gb" onchange="kodeposMethod(this)" > 
    //                                 <div class="input-group mb-3 input-card-sp">
    //                                     <div class="input-group-prepend">
    //                                         <label class="input-group-text" for="inputGroupSelect01">Pengiriman</label>
    //                                     </div>
    //                                     <select class="custom-select kelurahan_kelurahan_hover kelurahan-home-gb" id="inputGroupSelect01" onchange="kelurahanMethod(this)" >  
    //                                         <option selected  class="id-pengiriman-gb">Waktu Pengiriman</option>      
    //                                     </select>
    //                                 </div>   
    //                                 <div class="login-name box-pengiriman" >
    //                                     <div class="box-name-2" >
    //                                         <p>BIAYA PENGIRIMAN</p>
    //                                     </div>
    //                                     <input type="number" class="name-form"  id="total_biaya_pengiriman_gb">
    //                                 </div>
    //                             </div>
    //                         </div>     
    //                     </div>
    //                 </div>
    //                 <div class="group-right">
    //                     <div class="gr-2">
    //                         <div class="box-img-gr">
    //                             <img src="${item_product.Picture_1}" alt="" class="img-gr">
    //                         </div>            
    //                     </div>
    //                     <div class="gr-1">
    //                         <div class="box-total-price">
    //                             <p>Total Price</p>
    //                             <div class="total-price">
    //                                 <input type="text" disabled class="name-form total_price_iframe"  id="tp_sp">
    //                             </div>
    //                         </div>
    //                         <div class="btn-pesan" onclick="payment_groupbuy('${product_id}')">
    //                             <p>Pesan Sekarang!</p>
    //                             <img src="../img/home.png" alt="" class="icon-home">
    //                         </div>
    //                     </div>   
    //                 </div>
    //              `)
                
    //             axios.post(`http://products.sold.co.id/get-product-details?product_code=${product_id}`)
    //             .then((res)=>{
    //                 // $('.modals-lk').attr('src',`../WEB/Iframe/groupbuy.html?groupbuy_id=${product_id}`)      
    //                 
    
    //                 option_payment.map((val,index)=>{
    //                     
    //                     
    //                     if(val.Payment_Method_Name === 'transfer'){
    //                         $('.option-payment-gb').append(`
    //                             <option id="payment_gb" value="${val.Payment_Method_Name}">${val.Payment_Method_Name}</option> 
    //                         `)
    //                     }
    //                 })
    //                 var token = localStorage.getItem('token')
    //                 
    //                 axios.post(`http://customers.sold.co.id/get-customer-information?Customer_Code=${token}`)
    //                 .then((res)=>{
    //                     $('.option-alamat-gb').append(`
    //                         <option value="${res.data.Address_1}" id="alamat_gb">${res.data.Address_1}</option> 
    //                         <option value="${res.data.Address_2}" id="alamat_gb">${res.data.Address_2}</option> 
    //                         <option value="${res.data.Address_3}" id="alamat_gb">${res.data.Address_3}</option> 
    //                         <option value="${res.data.Address_4}" id="alamat_gb">${res.data.Address_4}</option> 
    //                         <option value="${res.data.Address_5}" id="alamat_gb">${res.data.Address_5}</option> 
    //                     `)
                     
                        
                     
    //                 }).catch((err)=>{
    //                     
    //                 })
                    
    //             }).catch((err)=>{
    //                 
    //             })
            
    //             }).catch((err)=>{
    //                 
    //             })
    //             
        
    // }).catch((err)=>{
    //     
    // })
    
    
    
            
    }else {
            Swal.fire({
                title: 'Anda Memiliki Pembayaran Yang Belum Dibayar',
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: `Lihat Daftar Tagihan`,
                denyButtonText: `Cancel`,
            }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    $(".force-close-all-command").css("display", "none");
                    $('#daftarHutangModal').modal('show')
                    
                    render_daftar_hutang()
                } else if (result.isDenied) {
                    Swal.fire('Cancel berhasil', '', 'success')
                    $(".force-close-all-command").css("display", "none");
                }
                
            })
        }
    }).catch((err)=>{
        
    })
    
}
const search_item=()=>{
    

    var item_search = $('#search_item').val()
    var product_name = $('#search_item').attr('id')
    
    $('.active_search').css('top','575px')
    $('.main-body').css('display','none')
    $('.modals-search-result').css('display','block')
    $('.modals-search-result').attr('src',`./Iframe/searchingPage.html?searching=${item_search}`)
    
    
}




const render_searching_page=(product_name)=>{
    
    var data = product_name
    
    if(data){
        $('.sp_name').val(data)
    }else {
        $('.sp_name').val('All')
    }
    

    axios.post(`http://products.sold.co.id/get-product-details?product_name=${product_name}`)
    .then((res)=>{
    
        var data_searching = res.data


        if(res.data.length <3){
            axios.post(`http://products.sold.co.id/get-product-details?`)
            .then((res)=>{
                var data_all = res.data
                data_searching.map((val,index)=>{
                    var hargaAwal = parseInt(val.Sell_Price)
                    var discount = parseInt(val.Sell_Price * 0.1)
                    var hargaTotal = hargaAwal + discount
                    // if(val == false || val.Sell_Price == 'NULL' || val.Sell_Price == undefined  || val.Sell_Price == null || isNaN(hargaAwal)
                    // ){
                    //    
                    // }else {
                        // 
                        $('.new-box-card').append(`
                        <div class="card-item card_sp hvr-float-shadow" data-aos="zoom-in">
                                <img src="${val.Picture_1}" alt="" class="img-card img_sp" onclick="get_product_detail_from_searching_page('${val.Product_Code}')">   
                            <div class="card-item-list">
                                <p class="limited-text-short">${val.Name}</p>
                                <div class="split-item">
                                    <div class="item-price">
                                        <p>RP. ${hargaTotal}</p>
                                        <p>Rp. ${hargaAwal}</p>
                                    </div>
                                    <div class="buy-icon" onclick="addToCart('${val.Product_Code}')">
                                        <img src="../img/cart.png" alt="" class="icon-buy" id="${val.Product_Code}">
                                    </div>
                                </div>
                            </div>
                        </div>
                        `)
        
                    // }
                })
                data_all.map((val,index)=>{
                    var hargaAwal = parseInt(val.Sell_Price)
                    var discount = parseInt(val.Sell_Price * 0.1)
                    var hargaTotal = hargaAwal + discount
                    // if(val == false || val.Sell_Price == 'NULL' || val.Sell_Price == undefined  || val.Sell_Price == null || isNaN(hargaAwal)
                    // ){
                    //     
                    //     
                    // }else {
                        // 
                        $('.new-box-card').append(`
                        <div class="card-item card_sp hvr-float-shadow" data-aos="zoom-in">
                                <img src="${val.Picture_1}" alt="" class="img-card img_sp" onclick="get_product_detail_from_searching_page('${val.Product_Code}')">   
                            <div class="card-item-list">
                                <p class="limited-text-short">${val.Name}</p>
                                <div class="split-item">
                                    <div class="item-price">
                                        <p>RP. ${hargaTotal}</p>
                                        <p>Rp. ${hargaAwal}</p>
                                    </div>
                                    <div class="buy-icon" onclick="addToCart('${val.Product_Code}')">
                                        <img src="../img/cart.png" alt="" class="icon-buy" id="${val.Product_Code}">
                                    </div>
                                </div>
                            </div>
                        </div>
                        `)
        
                    // }
                })
            })
        }else {
            data_searching.map((val,index)=>{
                var hargaAwal = parseInt(val.Sell_Price)
                var discount = parseInt(val.Sell_Price * 0.1)
                var hargaTotal = hargaAwal + discount
                // if(val == false || val.Sell_Price == 'NULL' || val.Sell_Price == undefined  || val.Sell_Price == null || isNaN(hargaAwal)
                // ){
                //     
                //     
                // }else {
                    // 
                    $('.new-box-card').append(`
                    <div class="card-item card_sp hvr-float-shadow" data-aos="zoom-in">
                            <img src="${val.Picture_1}" alt="" class="img-card img_sp" onclick="get_product_detail_from_searching_page('${val.Product_Code}')">   
                        <div class="card-item-list">
                            <p class="limited-text-short">${val.Name}</p>
                            <div class="split-item">
                                <div class="item-price">
                                    <p>RP. ${hargaTotal}</p>
                                    <p>Rp. ${hargaAwal}</p>
                                </div>
                                <div class="buy-icon" onclick="addToCart('${val.Product_Code}')">
                                    <img src="../img/cart.png" alt="" class="icon-buy" id="${val.Product_Code}">
                                </div>
                            </div>
                        </div>
                    </div>
                    `)
    
                // }
            })
        }

        
    }).catch((err)=>{
        
    })


    // axios.post(``)

   
}




const render_daftar_hutang=()=>{ // render utang untuk di card
    const token = localStorage.getItem('token')
    
    axios.post(`http://sales.sold.co.id/get-unpaid-sales-order-per-customer?Customer_Code=${token}`)
    .then((res)=>{
        
        res.data.map((val,index)=>{
        
            $('.ID_list_hutang').append(`
                <tr>
                    <td>${val.Total_Quantity}</td>
                    <td>
                        <p class="limited-text-short" onclick="item_detail_for_hutang('${val.Order_Number}')">${val.Order_Number} </p> 
                    </td>
                    <td >${val.Payment_Method}</td>
                    <td >${val.Total_Price}</td>
                    <td >${val.Status}</td>
                </tr>
            `)
      
        })
        
       
    }).catch((err)=>{
        
    })

}


const detail_hutang_home=(order_number)=>{ // detail utang di home header
    // alert('function jalan')
    // $('.tableFixHead_ul_hutang').css('display','none')
    $('.card-body-ul').css('display','flex')
    $('.box-card-item-ul').empty()
    $('.card-address-profile').empty()
    $('.cb-right').empty()
    // $('#daftarHutangModal').modal('hide')
    // $('#ID_detail_hutang_modal').modal('show')
    
    axios.post(`http://sales.sold.co.id/get-sales-order-data-and-detail?Order_Number=${order_number}`)
    .then((res)=>{
        // 
        var arrListHutang = res.data
        var arrDataProduct = []
        var kurir_name = ''
        var shipping_price = 0
        var product_price =0
        var customer_address = ''
        // 
        var total = arrListHutang.length
        // 

        // render card item
        arrListHutang.map((val,index)=>{
            customer_address =  val.Shipping_Address

            if(index == 0 ){ // untuk buat kurir
                shipping_price += val.Price_Based_On_Total_Quantity *1
                // product_price += val.Price_Based_On_Total_Quantity *1
                kurir_name = val.Product_Code
                //render kurir
                if(kurir_name == 'tiki'){
                    
                    $('.box-card-item-ul').append(`
                    <div class="card-item-ul">
                        <div class="card-desc">
                            <div class="img-card-ul">
                                <img src="../img/tiki_shipping_method.png" alt="" class="img-item-ul">
                            </div>
                            ${val.Product_Name}
                        </div>
                        <div class="header-right">
                            <div class="hr-qty">
                                ${val.Product_Code}
                            </div>
                            <div class="hr-qty">
                                ${val.Payment_Method}
                            </div>
                            <div class="hr-qty">
                                ${val.Quantity_Requested} Pcs
                            </div>
                            <div class="hr-qty">
                                ${val.Price_Based_On_Total_Quantity}
                            </div>
                            <div class="hr-qty">
                                ${kurir_name}
                            </div>     
                        </div>
                    </div>
                    `)
                }else { // kalau kurir selain tiki yang keluar pasti vantsing
                    $('.box-card-item-ul').append(`
                    <div class="card-item-ul">
                        <div class="card-desc">
                            <div class="img-card-ul">
                                <img src="../img/vantsing_shipping_method.png" alt="" class="img-item-ul">
                            </div>
                            ${val.Product_Name}
                        </div>
                        <div class="header-right">
                            <div class="hr-qty">
                                ${val.Product_Code}
                            </div>
                            <div class="hr-qty">
                                ${val.Payment_Method}
                            </div>
                            <div class="hr-qty">
                                ${val.Quantity_Requested} Pcs
                            </div>
                            <div class="hr-qty">
                                ${val.Price_Based_On_Total_Quantity}
                            </div>
                            <div class="hr-qty">
                                ${kurir_name}
                            </div>     
                        </div>
                    </div>
                `)
                }           
            }else {
                product_price += val.Price_Based_On_Total_Quantity *1
                axios.post(`http://products.sold.co.id/get-product-details?product_code=${val.Product_Code}`)
                .then((res)=>{
                    // 
                $('.box-card-item-ul').append(`
                    <div class="card-item-ul">
                        <div class="card-desc">
                            <div class="img-card-ul">
                                <img src="${res.data    .Picture_1}" alt="" class="img-item-ul">
                            </div>
                            ${val.Product_Name}
                        </div>
                        <div class="header-right">
                            <div class="hr-qty">
                                ${val.Product_Code}
                            </div>
                            <div class="hr-qty">
                                ${val.Payment_Method}
                            </div>
                            <div class="hr-qty">
                                ${val.Quantity_Requested} Pcs
                            </div>
                            <div class="hr-qty">
                                ${val.Price_Based_On_Total_Quantity}
                            </div>
                            <div class="hr-qty">
                                ${kurir_name}
                            </div>     
                        </div>
                    </div>
                `)
                }).catch((err)=>{
                    
                })
            }
        })
        var total_product_with_shipping = shipping_price + product_price
        // 
        // 
        // 
        $('.card-address-profile').append(`
            <div class="img-profile-ul">
                <img src="../img/accounts.png" alt="error" class="img-prof">
            </div>
            <div class="img-description-ul">
                <div class="desc-1-ul" >
                ${arrListHutang[0].Primary_Recipient_Name}
                
                </div>
                <div class="desc-2-ul">
                ${arrListHutang[0].Shipping_Address}
                </div>
                <div class="desc-3-ul">
                ${arrListHutang[0].Shipping_Contact_Number}
                </div>
            </div>
            <div class="img-status-ul">
                <div class="confirmed"  value="Gorilla Workout"  >
                    <p> ${arrListHutang[0].Creator} </p>
                
                    <input type="text" value="Gorilla Workout" readonly class="easteregg" id="copyClipboardul" onclick="gorillaworkout('GorillaWorkout')" >
                </div>
            </div>
        `)

        $('.cb-right').append(`
        <div class="card-address-detail">
            <div class="address-detail">
            Order Summary
            <div class="confirmed">
                Confirmed
            </div>
            </div>
            <div class="card-summary">
            <div class="cs-left">
                <div class="cs-left-item">
                All Product Price
                </div>
                <div class="cs-left-item">
                Shipping Price
                </div>
                <div class="cs-left-item">
                Shipping Method
                </div>
            
            </div>
            <div class="cs-right">
                <div class="cs-right-item">
                ${product_price}
                </div>
                <div class="cs-right-item">
                ${shipping_price}
                </div>
                <div class="cs-right-item">
                ${kurir_name}
                </div>
            </div>
            </div>
        </div>
        <div class="card-address-total">
            <div class="address-detail">
                <div class="total-summary-left">
                    Total
                </div>
                <div class="total-summary-right">
                    ${total_product_with_shipping}
                </div>   
            </div>
        </div>
        
        <div class="card-address-ul">
            <div class="address-detail">
            Order Details
            </div>
            <div class="address-detail-2">
            Shipping Address
            </div>
            <div class="address-detail-3">
                ${customer_address}
            </div>  
        </div>   
        `)
       
        if(arrListHutang[0].Payment_Method == 'transfer'){
            $('accounts-ul').empty()
            $('.accounts-ul').append(`
                <img src="../img/card2.png" alt="" class="acc-ul">
            `)
        }
        // 
        if(arrListHutang[0].Status == 'pending'){
            $('.progress-card-ul').empty() // order received
            $('.progress-card-ul').append(`
            <div class="box-card-progress">
                <div class="prog-1">
                    <div class="progress new-progress">
                        <div class="progress-bar progress-bar-striped progress-bar-animated bg-success" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: 100%"></div>
                    </div>
                    <div class="img-prog-1">
                    
                    <img src="../img/checklist.png" alt="">
                    </div>
        
                    <div class="progress new-progress">
                        <div class="progress-bar  bg-pending" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: 100%"></div>
                    </div>
                </div>
                <div class="prog-1">
                    <div class="progress new-progress">
                        <div class="progress-bar  bg-pending" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: 100%"></div>
                    </div>
                    <div class="img-prog-2">
                    
                    <img src="../img/fast-delivery.png" alt="">
                    </div>
        
                    <div class="progress new-progress">
                        <div class="progress-bar  bg-pending" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: 100%"></div>
                    </div>
                </div>
                <div class="prog-1">
                    <div class="progress new-progress">
                        <div class="progress-bar  bg-pending" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: 100%"></div>
                    </div>
                    <div class="img-prog-3">
                    
                    <img src="../img/truck.png" alt="">
                    </div>
        
                    <div class="progress new-progress">
                        <div class="progress-bar  bg-pending" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: 100%"></div>
                    </div>
                </div>
            </div>
            <div class="box-card-progress-2">
                <div class="prog-1">
                    <div class="line-prog-1-left-2">
                    </div>
                    <div class="img-prog-1">
                        Order Received
                    </div>
                    <div class="line-prog-1-left-2">
                    </div>
                </div>
                <div class="prog-1">
                    <div class="line-prog-1-left-2">
                    </div>
                    <div class="img-prog-2">
                        Order Approved
                    </div>
                    <div class="line-prog-1-left-2">
                    </div>
                </div>
                <div class="prog-1">
                    <div class="line-prog-1-left-2">
                    </div>
                    <div class="img-prog-3"> 
                        Order Delivered
                    </div>
                    <div class="line-prog-1-left-2">
                    </div>
                </div>
            </div>
            `)
        }else if (arrListHutang[0].Status == 'approving'){
            $('.progress-card-ul').empty() // order approved
            $('.progress-card-ul').append(`
            <div class="box-card-progress">
                <div class="prog-1">
                    <div class="progress new-progress">
                        <div class="progress-bar progress-bar-striped progress-bar-animated bg-success" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: 100%"></div>
                    </div>
                    <div class="img-prog-1">
                    
                    <img src="../img/checklist.png" alt="">
                    </div>
        
                    <div class="progress new-progress">
                        <div class="progress-bar progress-bar-striped progress-bar-animated bg-success" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: 100%"></div>
                    </div>
                </div>
                <div class="prog-1">
                    <div class="progress new-progress">
                        <div class="progress-bar progress-bar-striped progress-bar-animated bg-success" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: 100%"></div>
                    </div>
                    <div class="img-prog-2">
                    
                    <img src="../img/checklist.png" alt="">
                    </div>
        
                    <div class="progress new-progress">
                        <div class="progress-bar progress-bar-striped progress-bar-animated bg-success" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: 100%"></div>
                    </div>
                </div>
                <div class="prog-1">
                    <div class="progress new-progress">
                        <div class="progress-bar progress-bar-striped progress-bar-animated bg-success" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: 100%"></div>
                    </div>
                    <div class="img-prog-3">
                    
                    <img src="../img/checklist.png" alt="">
                    </div>
        
                    <div class="progress new-progress">
                        <div class="progress-bar progress-bar-striped progress-bar-animated bg-success" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: 100%"></div>
                    </div>
                </div>
            </div>
            <div class="box-card-progress-2">
                <div class="prog-1">
                    <div class="line-prog-1-left-2">
                    </div>
                    <div class="img-prog-1">
                        Order Received
                    </div>
                    <div class="line-prog-1-left-2">
                    </div>
                </div>
                <div class="prog-1">
                    <div class="line-prog-1-left-2">
                    </div>
                    <div class="img-prog-2">
                        Order Approved
                    </div>
                    <div class="line-prog-1-left-2">
                    </div>
                </div>
                <div class="prog-1">
                    <div class="line-prog-1-left-2">
                    </div>
                    <div class="img-prog-3"> 
                        Order Delivered
                    </div>
                    <div class="line-prog-1-left-2">
                    </div>
                </div>
            </div>
            `)
            $('.line-prog-1-right').css('background-color','#57ed6a ')
            $('.line-prog-2-left').css('background-color','#57ed6a  ')
        }else if (arrListHutang[0].Status == 'cancelled'){
            $('.progress-card-ul').empty() // order approved
            $('.progress-card-ul').append(`
            <div class="box-card-progress">
                <div class="prog-1">
                    <div class="progress new-progress">
                        <div class="progress-bar  bg-pending" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: 100%"></div>
                    </div>
                    <div class="img-prog-1">
                    
                    <img src="../img/not_liked.png" alt="">
                    </div>
        
                    <div class="progress new-progress">
                        <div class="progress-bar  bg-pending" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: 100%"></div>
                    </div>
                </div>
                <div class="prog-1">
                    <div class="progress new-progress">
                        <div class="progress-bar  bg-pending" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: 100%"></div>
                    </div>
                    <div class="img-prog-2">
                    
                    <img src="../img/not_liked.png" alt="">
                    </div>
        
                    <div class="progress new-progress">
                        <div class="progress-bar  bg-pending" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: 100%"></div>
                    </div>
                </div>
                <div class="prog-1">
                    <div class="progress new-progress">
                        <div class="progress-bar  bg-pending" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: 100%"></div>
                    </div>
                    <div class="img-prog-3">
                    
                    <img src="../img/not_liked.png" alt="">
                    </div>
        
                    <div class="progress new-progress">
                        <div class="progress-bar  bg-pending" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: 100%"></div>
                    </div>
                </div>
            </div>
            <div class="box-card-progress-2">
                <div class="prog-1">
                    <div class="line-prog-1-left-2">
                    </div>
                    <div class="img-prog-1">
                        Order Received
                    </div>
                    <div class="line-prog-1-left-2">
                    </div>
                </div>
                <div class="prog-1">
                    <div class="line-prog-1-left-2">
                    </div>
                    <div class="img-prog-2">
                        Order Approved
                    </div>
                    <div class="line-prog-1-left-2">
                    </div>
                </div>
                <div class="prog-1">
                    <div class="line-prog-1-left-2">
                    </div>
                    <div class="img-prog-3"> 
                        Order Delivered
                    </div>
                    <div class="line-prog-1-left-2">
                    </div>
                </div>
            </div>
            `)
    
        }

        $('.unpaid-title').empty()
        $('.unpaid-title').append(`
            <p>Order # <br>
            ${arrListHutang[0].Order_Number}</p>
        `)

    }).catch((err)=>{
        
    })

    

}


const item_detail_for_hutang=(order_number)=>{ // detail utang dari card
    
    // alert('function jalan')
    // $('#daftarHutangModal').modal('hide')
    $('#ID_detail_hutang_modal').modal('show')
    axios.post(`http://sales.sold.co.id/get-sales-order-data-and-detail?Order_Number=${order_number}`)
    .then((res)=>{
        $('.ref_code_detail_hutang').val(res.data.Customer_Code)
        $('.customer_name_hutang').val(res.data.Primary_Recipient_Name)

        res.data.map((val,index)=>{
            var hargaSatuan = parseInt(val.Price_Based_On_Total_Quantity)/parseInt(val.Quantity_Requested)
            $('.modals_item_detail_product').append(`
            <tr>
                <td><p class="limited-text-short">${val.Product_Name}</p></td>
                <td><p class="limited-text-short">${val.Order_Number}</p></td>
                <td><p>RP.${val.Total_Price}</td>
                <td><p>RP.${hargaSatuan}</td>
                <td ><p>${val.Payment_Method}</p></td>
                <td ><p>${val.Shipping_Fee}</p></td>
                <td ><p>${val.Shipping_Address}</p></td>
                <td ><p style="word-break: break-all">${val.VA_Number}</p></td>  
            </tr>
            `)
            
        })

    }).catch((err)=>{
        
    })

}