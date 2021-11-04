$(document).ready(function(){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const render_from = urlParams.get('render_from')
    const item_category = urlParams.get('product_id')


    if(item_category != undefined){
        if(render_from == 'home'){
            // render_get_product_detail(item_category)
            render_product_detail_from_home(item_category)
        }else {
            render_product_detail_from_searching_page(item_category)
        }
    }
})

function replace_vtintl_to_sold_co_id(original_url){
    var original_url = original_url.split("http://image.vtintl.id/").join("https://image.sold.co.id/");
return original_url;
}
function commafy( num ) {
    if(num !=undefined){
        var str = num.toString().split('.');
        if (str[0].length >= 5) {
            str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
        }
        if (str[1] && str[1].length >= 5) {
            str[1] = str[1].replace(/(\d{3})/g, '$1 ');
        }
        return str.join('.');
    }else {
        return '0'
    }
}
const send_comment_cust_product=(product_id)=>{
    var result_comment = $('.input-ulasan-npd').val()
    var token = localStorage.getItem('token')

        var data = {
            User_Comments:
            {
                Customer_Code:token,
                Comment:result_comment,
                Product_Code:product_id
            }
        }

    if(result_comment.length>0){

        axios.post(`http://products.sold.co.id/get-product-details?product_code=${product_id}`)
        .then((res)=>{
            var nama_company = res.data.PIC_company_name
            axios.post(` https://products.sold.co.id/send_user_comment`,data,{
                headers:{
                    "Content-Type":'application/json'
                },
                "data":JSON.stringify({
                    "Customer_Code":data.User_Comments.Customer_Code,
                    "Comments":data.User_Comments.Comment,
                    "Product_Code":data.User_Comments.Product_Code
                })
            }).then((res)=>{
                axios.post(`http://products.sold.co.id/get_user_comment?Product_Code=${product_id}`)
                .then((res)=>{
                    var cust_comment = res.data
                    var comment_parse = JSON.parse(cust_comment.User_Comments)
                    var total_comment = comment_parse.length
                    $('.box-ulasan-detail').empty()
                    $('.box-ulasan-detail').append(`
                        <p>SEMUA ULASAN(${total_comment})</p>
                    `)
                    comment_parse.map((val,index)=>{
                        axios.post(`https://customers.sold.co.id/get-customer-information?Customer_Code=${val.Customer_Code}`)
                        .then((res)=>{
                          
                            $('.box-ulasan-detail').append(`
                                <div class="box-item-ulasan">
                                    <div class="biu-left">
                                        <div class="biu-image">
                                            <img src="../img/accounts.png" alt="">
                                        </div>
                                        <p>${res.data.First_Name} ${res.data.Last_Name}</p>
                                    </div>
                                    <div class="biu-right">
                                        <p>${val.Comment}</p>
                                        <div class="company-comment-box">
                                            <div class="ccb-image">
                                                <img src="../img/vantsing_shipping_method.png" alt="">
                                            </div>
                                            <div class="ccb-isi-comment">
                                                <div class="ccb-isi-comment-name">
                                                    <p>${nama_company}</p>
                                                    <div class="btn-penjual-ccb">
                                                        Penjual
                                                    </div>
                                                </div>
                                                <div class="ccb-thankyou">
                                                    Terima kasih telah berbelanja di ${res.data.PIC_company_name}. Bagikan link toko kami https://www.soldays.id kepada teman-teman Anda dan favoritkan Toko kami untuk terus update mengenai stok dan produk terbaru
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div> 
                            `)
                        }).catch((err)=>{
                            
                        })
    
                    })
                    $('.input-ulasan-npd').val('')
                }).catch((err)=>{
                    
                })
            }).catch((err)=>{
                console.log(err)
            })
        }).catch((err)=>{
            console.log(err)
        })

    }
}
function addToCart(product_id,qty){

    axios.post(`https://products.sold.co.id/get-product-details?product_code=${product_id}`)
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
                    "quantity":qty,
                    "company_address":res.data.PIC_company_address,
                    "weight_kg":res.data.Weight_KG,
                    "product_name":res.data.Name
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
                    "quantity":qty,
                    "company_address":res.data.PIC_company_address,
                    "weight_kg":res.data.Weight_KG,
                    "product_name":res.data.Name
                    }
                ]
                var pushToStorage2 = JSON.stringify(cart)
                
                localStorage.setItem('itemsInCart',pushToStorage2) 
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
        }
    }).catch((err)=>{
        
    })
      
}
const kurang_qty_product=(max_qty,price)=>{
    console.log(max_qty)
    var qty_now = $('.input-qty-product-detail').val()
    
    console.log(qty_now,' ini qty now')
    if(qty_now === 0 || qty_now <0 || qty_now == -1 ){

    }else if (qty_now >0) {
        console.log()
        var qty_minus = qty_now - 1
        $('.box_for_total').html(qty_minus)
        $('.input-qty-product-detail').val(qty_minus)
        var harga = parseInt(price) * parseInt(qty_minus)
        $('.sub-total-box-product').empty()
        $('.sub-total-box-product').append(`
            <p>Subtotal</p>
            <p>${harga}</p>
        `)
    }


}
const tambah_qty_product=(max_qty,price)=>{
    console.log(max_qty)
    var qty_now = parseInt($('.input-qty-product-detail').val())
    
    // alert(harga)
    console.log(qty_now)
    var max_qty_product = parseInt(max_qty)
    
    if(qty_now > max_qty_product){
        console.log(qty_now,'133')
        $('.box_for_total').html(max_qty_product)
        $('.input-qty-product-detail').val(max_qty_product)
    }else if ( qty_now > 0 && qty_now < max_qty_product){

        var qty_plus = qty_now +1
        $('.box_for_total').html(qty_plus)
        $('.input-qty-product-detail').val(qty_plus)
        var harga = qty_plus * parseInt(price)
        $('.sub-total-box-product').empty()
        $('.sub-total-box-product').append(`
            <p>Subtotal</p>
            <p>${harga}</p>
        `)
    }else if (qty_now === 0 ){
        var qty_plus = qty_now +1
        $('.box_for_total').html(qty_plus)
        $('.input-qty-product-detail').val(qty_plus)
        var harga = qty_plus * parseInt(price)
        $('.sub-total-box-product').empty()
        $('.sub-total-box-product').append(`
            <p>Subtotal</p>
            <p>${harga}</p>
        `)
    }
    else {
        console.log('masuk ke else')
    }
}


const hitung_biaya_product=(product_id,price,total_qty)=>{
    console.log(product_id,price,total_qty)
    var qty_from_customer = parseInt($('.input-qty-product-detail').val())
    console.log(qty_from_customer)
    var harga = parseInt(price) * parseInt(qty_from_customer)
    // console.log(parseInt(price),parseInt(total_qty))
    
    if(qty_from_customer <1){
        $('.input-qty-product-detail').val(1)
        qty_from_customer = 1
        $('.box_for_total').html(qty_from_customer)
    }
    
    if(qty_from_customer =='' || qty_from_customer == 0){
        $('.npd-right-box-qty').css('height','350px')
        $('.total-qty-right').css('height','50px')
        $('.tqr-bottom').css('display','none')
        $('#total-harga-p').css('color','#d6dbe2')
        $('.down-product-detail-2').css('color','#d6dbe2')
        $('.down-product-detail-2').css('transform','rotate(180deg)')
        $('#tambah-cart-product').prop('disabled',true)
        $('#tambah-cart-product').addClass('disabled-btn')
        $('#beli-now-product').prop('disabled',true)
        $('#beli-now-product').addClass('disabled-btn')
        $('#beli-groupbuy-product').prop('disabled',true)
        $('#beli-groupbuy-product').addClass('disabled-btn')
    }else {
        $('.npd-right-box-qty').css('height','500px')
        $('.total-qty-right').css('height','200px')
        $('.tqr-bottom').css('display','block')
        $('#total-harga-p').css('color','black')
        $('.down-product-detail-2').css('color','black')
        $('.down-product-detail-2').css('transform','rotate(180deg)')
        $('.box_for_total').html(qty_from_customer)
       

        $('#tambah-cart-product').removeAttr('disabled')
        $('#tambah-cart-product').removeClass('disabled-btn')
        $('#beli-now-product').removeAttr('disabled')
        $('#beli-now-product').removeClass('disabled-btn')
        $('#beli-groupbuy-product').removeAttr('disabled')
        $('#beli-groupbuy-product').removeClass('disabled-btn')
        $('.sub-total-box-product').empty()
        $('.sub-total-box-product').append(`
            <p>Subtotal</p>
            <p>${harga}</p>
        `)
        console.log($('.total-qty-right'))
    }
}
const render_product_detail_from_home=async(item_category)=>{
    var product_id = item_category
    Swal.fire({
        title: 'Please Wait',
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
        timer: 30000000,
        timerProgressBar: true,
        didOpen:async()=>{
            axios.post(`https://products.sold.co.id/get-product-details?product_code=${item_category}`)
            .then(async(res)=>{
                var detail_product_item = res.data
                var product_id_pilihan = product_id
                let allDataProduct = []
                var all_filter_product = []
                var allData_storage = JSON.parse(localStorage.getItem('all_data_product'))
                if(allData_storage !=undefined && allData_storage.length != 0 ){
                    var data_for_render = allData_storage.filter((val,index)=>{
                        if(val.Product_Code == product_id){
                            return val
                        }
                    })
                    // 
                    var split_product = data_for_render[0].Name.split(' ')
                    var all_filter_product = []
                    
                    split_product.forEach((val,index)=>{
                        allData_storage.filter((item,index)=>{
                            if(item.Name.includes(val)){
                                
                                all_filter_product.push(item)
                            }
                        })
                    })
                    var img_1 = ''
                    var img_2 = ''
                    var img_3 = ''
    
                        var hargaAwal = parseInt(data_for_render[0].Sell_Price)
                        var discount = parseInt(data_for_render[0].Sell_Price * 0.1)
                        var hargaTotal = hargaAwal + discount
                        $('.container-product').empty()
                        console.log(data_for_render[0])
                        var province_company_from_product = await find_province_from_product_company(detail_product_item.PIC_company_address)
                        console.log(province_company_from_product)
                        if(data_for_render[0].GroupBuy_Purchase == "false"){
                            console.log('masuk ke if ')
                            $('.container-product').append( // render untuk bukan groupbuy
                                `
                                <div class="new-product-detail-box">
                                    <div class="npd-left">
                                        <div class="product-detail-isi">
                                            <div class="npdl-left">
                                                <div class="new-product-img-box">
                                                    <img src="${replace_vtintl_to_sold_co_id(data_for_render[0].Picture_1)}" alt="">
                                                </div>
                                                <div class="new-product-small-img-box">
                                                    <div class="small-product-img active-small-img" onclick="ganti_gambar_product('${data_for_render.Picture_1}')">
                                                        <img src="${replace_vtintl_to_sold_co_id(data_for_render[0].Picture_1)}" alt="">
                                                    </div>
                                                </div>
                                            </div>   
                                            <div class="npdl-right">
                                                <div class="npd-left-product-name">
                                                    <p>${data_for_render[0].Name}</p>
                                                </div>
                                                <div class="npd-left-product-price">
                                                    <p>RP.${commafy(data_for_render[0].Sell_Price)}</p>
                                                </div>
                                                <div class="npdl-right-detail-product">
                                                    <nav>
                                                        <div class="nav nav-tabs" id="nav-tab" role="tablist">
                                                            <button class="nav-link active" id="nav-detail-tab" data-bs-toggle="tab" data-bs-target="#nav-content-detail" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Detail</button>
                                                            <button class="nav-link" id="nav-info-tab" data-bs-toggle="tab" data-bs-target="#nav-content-info" type="button" role="tab" aria-controls="nav-spec" aria-selected="true">Info Penting</button>
                                                        </div>
                                                    </nav>
                                                    <div class="tab-content new-tab-content" id="nav-tabContent">
                                                        <div class="tab-pane fade show active" id="nav-content-detail" role="tabpanel" aria-labelledby="nav-home-tab">
                                                            <p>Kondisi : <span>Baru</span> </p>
                                                            <p>Berat : <span>${data_for_render[0].Weight_KG} KG</span> </p>
                                                            <p>Kategori : <span id="kategori-product-detail-pd">${data_for_render[0].Category}</span></p>
                                                            <div class="deskripsi-new-product-detail">
                                                                ${data_for_render[0].Description}
                                                                ${data_for_render[0].Specification}     
                                                            </div>
                                                        </div>
                                                        <div class="tab-pane fade" id="nav-content-info" role="tabpanel" aria-labelledby="nav-spec-tab">
                                                            <div class="info-penting-box-pengembalian">
                                                                <p>Kebijakan Pengembalian Produk</p>
                                                                <p>Silahkan Hubungi Customer Service Soldays</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>  
                                            </div>
                                        </div>
                                        <div class="box-company-detail">
                                            <div class="bcd-left">
                                                <div class="ins-bcd-left">
                                                    <div class="bcd-image">
                                                        <img src="../img/vantsing_shipping_method.png" alt="">
                                                    </div>
                                                    <div class="bcd-name">
                                                        <i class="fas fa-check-circle"></i>
                                                        <p>${detail_product_item.PIC_company_name}</p>
                                                    </div>
                                                </div>   
                                            </div>
                                            <div class="bcd-right">
                                                <div class="ins-detail-left">
                                                    <p>Pengiriman</p>
                                                    <div class="dikirim-dari">
                                                        <i class="fas fa-map-marker-alt"></i>
                                                        <p>Dikirim dari <span>${province_company_from_product}</span></p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="box-ulasan-detail">
                                            
                                        </div>
                                        <div class="box-input-ulasan">
                                            <p>Masukan Ulasan</p>
                                            <input type="text" maxlength="100" class="input-ulasan-npd">
                                            <div class="btn-upload-ulasan" onclick="send_comment_cust_product('${product_id}')">
                                                Masukan
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div class="npd-right">
                                        <div class="npd-right-box-qty">
                                            <div class="qty-top-right">
                                                <div class="box-qty-right-pd">
                                                    <p>Masukan Quantity</p>
                                                    <p>Quantity:1 Pcs</p>
                                                </div>
                                                <i class="fas fa-chevron-down down-product-detail"></i>
                                            </div>
                                            <input type="number" class="input-qty-product-detail" onchange="hitung_biaya_product('${product_id}','${data_for_render[0].Sell_Price}','${data_for_render[0].Stock_Quantity}')">
                                            <div class="total-qty-right">
                                                <div class="tqr-top">
                                                    <p id="total-harga-p">Total Harga dan quantity</p>
                                                    <i class="fas fa-chevron-down down-product-detail-2" ></i>
                                                </div>
                                                <div class="tqr-bottom">
                                                    <div class="new-box-qty-top">
                                                        <div class="total-qty-cust">
                                                            <i class="fas fa-minus" onclick="kurang_qty_product('${data_for_render[0].Stock_Quantity}','${parseInt(data_for_render[0].Sell_Price)}')"></i>
                                                            <div class="box_for_total">
                                                                1
                                                            </div>
                                                            <i class="fas fa-plus" onclick="tambah_qty_product('${data_for_render[0].Stock_Quantity}','${parseInt(data_for_render[0].Sell_Price)}')"></i>
                                                        </div>
                                                        <p>Stok <span>${data_for_render[0].Stock_Quantity}</span> </p>
                                                    </div>
                                                    <div class="sub-total-box-product">
                                                        <p>Subtotal</p>
                                                        <p>Rp10.000</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="btn-tambah-cart disabled-btn" id="tambah-cart-product" onclick="tambah_product_ke_cart('${product_id}')">
                                                <p>+ Keranjang</p>
                                            </div>
                                            <div class="btn-beli-cart disabled-btn" id="beli-now-product" onclick="beli_product_sekarang('${product_id}')">
                                                <p>Beli</p>
                                            </div>
                                            <div class="npd-contact">
                                                <div class="box-icon-product-contact">
                                                    <i class="fas fa-comment-alt"></i>
                                                    Chat
                                                </div>
                                                <div class="box-icon-product-contact">
                                                    <i class="fas fa-heart"></i>
                                                    Wishlist
                                                </div>
                                                <div class="box-icon-product-contact-2">
                                                    <i class="fas fa-share-alt"></i>
                                                    Share
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                `
                            )
                        }else{ //render untuk groupbuy  
                            console.log('masuk ke else')     
                            $('.container-product').append(`
                                <div class="new-product-detail-box">
                                    <div class="npd-left">
                                        <div class="product-detail-isi">
                                            <div class="npdl-left">
                                                <div class="new-product-img-box">
                                                    <img src="${replace_vtintl_to_sold_co_id(data_for_render[0].Picture_1)}" alt="">
                                                </div>
                                                <div class="new-product-small-img-box">
                                                    <div class="small-product-img active-small-img" onclick="ganti_gambar_product('${data_for_render.Picture_1}')">
                                                        <img src="${replace_vtintl_to_sold_co_id(data_for_render[0].Picture_1)}" alt="">
                                                    </div>
                                                </div>
                                            </div>   
                                            <div class="npdl-right">
                                                <div class="npd-left-product-name">
                                                    <p>${data_for_render[0].Name}</p>
                                                </div>
                                                <div class="npd-left-product-price">
                                                    <p>RP.${commafy(data_for_render[0].Sell_Price)}</p>
                                                </div>
                                                <div class="npdl-right-detail-product">
                                                    <nav>
                                                        <div class="nav nav-tabs" id="nav-tab" role="tablist">
                                                            <button class="nav-link active" id="nav-detail-tab" data-bs-toggle="tab" data-bs-target="#nav-content-detail" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Detail</button>
                                                            <button class="nav-link" id="nav-info-tab" data-bs-toggle="tab" data-bs-target="#nav-content-info" type="button" role="tab" aria-controls="nav-spec" aria-selected="true">Info Penting</button>
                                                        </div>
                                                    </nav>
                                                    <div class="tab-content new-tab-content" id="nav-tabContent">
                                                        <div class="tab-pane fade show active" id="nav-content-detail" role="tabpanel" aria-labelledby="nav-home-tab">
                                                            <p>Kondisi : <span>Baru</span> </p>
                                                            <p>Berat : <span>${data_for_render[0].Weight_KG} KG</span> </p>
                                                            <p>Kategori : <span id="kategori-product-detail-pd">${data_for_render[0].Category}</span></p>
                                                            <div class="deskripsi-new-product-detail">
                                                                ${data_for_render[0].Description}
                                                                ${data_for_render[0].Specification}     
                                                            </div>
                                                        </div>
                                                        <div class="tab-pane fade" id="nav-content-info" role="tabpanel" aria-labelledby="nav-spec-tab">
                                                            <div class="info-penting-box-pengembalian">
                                                                <p>Kebijakan Pengembalian Produk</p>
                                                                <p>Silahkan Hubungi Customer Service Soldays</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>  
                                            </div>
                                        </div>
                                        <div class="box-company-detail">
                                            <div class="bcd-left">
                                                <div class="ins-bcd-left">
                                                    <div class="bcd-image">
                                                        <img src="../img/vantsing_shipping_method.png" alt="">
                                                    </div>
                                                    <div class="bcd-name">
                                                        <i class="fas fa-check-circle"></i>
                                                        <p>${detail_product_item.PIC_company_name}</p>
                                                    </div>
                                                </div>   
                                            </div>
                                            <div class="bcd-right">
                                                <div class="ins-detail-left">
                                                    <p>Pengiriman</p>
                                                    <div class="dikirim-dari">
                                                        <i class="fas fa-map-marker-alt"></i>
                                                        <p>Dikirim dari <span>${province_company_from_product}</span></p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="box-ulasan-detail">
                                            
                                        </div>
                                        <div class="box-input-ulasan">
                                            <p>Masukan Ulasan</p>
                                            <input type="text" maxlength="100" class="input-ulasan-npd">
                                            <div class="btn-upload-ulasan" onclick="send_comment_cust_product('${product_id}')">
                                                Masukan
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div class="npd-right">
                                        <div class="npd-right-box-qty">
                                            <div class="qty-top-right">
                                                <div class="box-qty-right-pd">
                                                    <p>Masukan Quantity</p>
                                                    <p>Quantity:1 Pcs</p>
                                                </div>
                                                <i class="fas fa-chevron-down down-product-detail"></i>
                                            </div>
                                            <input type="number" class="input-qty-product-detail" onchange="hitung_biaya_product('${product_id}','${data_for_render[0].Sell_Price}','${data_for_render[0].Stock_Quantity}')">
                                            <div class="total-qty-right">
                                                <div class="tqr-top">
                                                    <p id="total-harga-p">Total Harga dan quantity</p>
                                                    <i class="fas fa-chevron-down down-product-detail-2" ></i>
                                                </div>
                                                <div class="tqr-bottom">
                                                    <div class="new-box-qty-top">
                                                        <div class="total-qty-cust">
                                                            <i class="fas fa-minus" onclick="kurang_qty_product('${data_for_render[0].Stock_Quantity}','${parseInt(data_for_render[0].Sell_Price)}')"></i>
                                                            <div class="box_for_total">
                                                                1
                                                            </div>
                                                            <i class="fas fa-plus" onclick="tambah_qty_product('${data_for_render[0].Stock_Quantity}','${parseInt(data_for_render[0].Sell_Price)}')"></i>
                                                        </div>
                                                        <p>Stok <span>${data_for_render[0].Stock_Quantity}</span> </p>
                                                    </div>
                                                    <div class="sub-total-box-product">
                                                        <p>Subtotal</p>
                                                        <p>Rp10.000</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="btn-tambah-cart disabled-btn" id="tambah-cart-product" onclick="tambah_product_ke_cart('${product_id}')">
                                                <p>+ Keranjang</p>
                                            </div>
                                            <div class="btn-beli-cart disabled-btn" id="beli-now-product" onclick="beli_product_sekarang('${product_id}')">
                                                <p>Beli</p>
                                            </div>
                                            <div class="btn-beli-cart disabled-btn" id="beli-groupbuy-product" onclick="beli_groupbuy_sekarang()">
                                                <p>Beli Groupbuy</p>
                                            </div>
                                            <div class="npd-contact">
                                                <div class="box-icon-product-contact">
                                                    <i class="fas fa-comment-alt"></i>
                                                    Chat
                                                </div>
                                                <div class="box-icon-product-contact">
                                                    <i class="fas fa-heart"></i>
                                                    Wishlist
                                                </div>
                                                <div class="box-icon-product-contact-2">
                                                    <i class="fas fa-share-alt"></i>
                                                    Share
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            `)
                        }
                        
                        if(data_for_render[0].Picture_2 == undefined || data_for_render[0].Picture_2 == null || data_for_render[0].Picture_2 == 'NULL' || data_for_render[0].Picture_2 == ''){
                        
                        }else{
                            $('.new-product-small-img-box').append(`
                                <div class="small-product-img" onclick="ganti_gambar_product('${data_for_render[0].Picture_2}')">
                                    <img src="${replace_vtintl_to_sold_co_id(data_for_render[0].Picture_2)}" alt="">
                                </div>
                            `)
                        }
                        if(data_for_render[0].Picture_3 == undefined || data_for_render[0].Picture_3 == null || data_for_render[0].Picture_3 == 'NULL' || data_for_render[0].Picture_3 == ''){
    
                        
                        }else{
                            $('.new-product-small-img-box').append(`
                                <div class="small-product-img" onclick="ganti_gambar_product('${data_for_render[0].Picture_3}')">
                                    <img src="${replace_vtintl_to_sold_co_id(data_for_render[0].Picture_3)}" alt="">
                                </div>
                            `)
                        }
                        
                        
                        if(data_for_render[0].extra_column_1 == undefined || data_for_render[0].extra_column_1 == null || data_for_render[0].extra_column_1 == 'NULL' || data_for_render[0].extra_column_1 == ''){
    
                        }else{
                            $('.new-product-small-img-box').append(`
                                <video  height="350px" width="400px" autoplay muted loop class="img-big" id="img-big-4" onclick="ganti_gambar_product('${data_for_render[0].Picture_1}')">
                                    <source src="${replace_vtintl_to_sold_co_id(data_for_render[0].extra_column_1)}" type="video/mp4">
                                    <source src="${replace_vtintl_to_sold_co_id(data_for_render[0].extra_column_1)}" type="video/ogg">
                                </video>
                            `)
                        }
                        axios.post(`https://products.sold.co.id/get_user_comment?Product_Code=${product_id}`)
                        .then((res)=>{
                            console.log('717 jalan')
                            
                                var cust_comment = res.data
                                var comment_parse = JSON.parse(cust_comment.User_Comments)
                                console.log(comment_parse,'ini comment')
                                
                                if(comment_parse == 'null' || comment_parse == null){
                                    console.log('masuk ke if')
                                    $('.box-ulasan-detail').css('display','none')
                                    //comment kosong. 
                                }else if (comment_parse.length > 0 ) {
                                    console.log('masuk ke else if  731')
                                    var total_comment = comment_parse.length
                                    console.log(total_comment)
                                    $('.box-ulasan-detail').css('display','flex')
                                    $('.box-ulasan-detail').append(`
                                        <p>SEMUA ULASAN(${total_comment}) </p>
                                    `)
                                    comment_parse.map((val,index)=>{
                                        axios.post(`http://customers.sold.co.id/get-profile-image?Customer_Code=${val.Customer_Code}`)
                                        .then((res)=>{
                                            console.log(val,' ini val')
                                            console.log(val.Comment)
                                            var comment_customer = val.Comment
                                            if(res.data){
                                                var link_gambar = res.data
                                                axios.post(`https://customers.sold.co.id/get-customer-information?Customer_Code=${val.Customer_Code}`)
                                                .then((res)=>{
                                                    // res.data.map((val,index)=>{
                                                        console.log(comment_customer)
                                                        $('.box-ulasan-detail').append(`
                                                            <div class="box-item-ulasan">
                                                                <div class="biu-left">
                                                                    <div class="biu-image">
                                                                        <img src="${link_gambar}" alt="">
                                                                    </div>
                                                                    <p>${res.data.First_Name} ${res.data.Last_Name}</p>
                                                                </div>
                                                                <div class="biu-right">
                                                                    <p>${comment_customer}</p>
                                                                    <div class="company-comment-box">
                                                                        <div class="ccb-image">
                                                                            <img src="../img/vantsing_shipping_method.png" alt="">
                                                                        </div>
                                                                        <div class="ccb-isi-comment">
                                                                            <div class="ccb-isi-comment-name">
                                                                                <p>${detail_product_item.PIC_company_name}</p>
                                                                                <div class="btn-penjual-ccb">
                                                                                    Penjual
                                                                                </div>
                                                                            </div>
                                                                            <div class="ccb-thankyou">
                                                                                Terima kasih telah berbelanja di ${detail_product_item.PIC_company_name}. Bagikan link toko kami https://www.soldays.id kepada teman-teman Anda dan favoritkan Toko kami untuk terus update mengenai stok dan produk terbaru
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        `)
                                                    // })
                                                }).catch((err)=>{
                                                    
                                                })
                                            } else {
                                                console.log('masuk ke else')
                                            }
                                        }).catch((err)=>{
                                            
                                        })
                                    })
                        
                                }
                                
                                
                            console.log('if else kelar')
                            Swal.fire({
                                title: 'Uploading Data',
                                timer:100,
                            })
                            console.log('793 harusnya close ')
                        }).catch((err)=>{
                            
                        })
                    
                }else {
    
                    axios.post(`https://products.sold.co.id/get-product-details`)
                    .then((res)=>{
                        allDataProduct = res.data
                        
                        const querystring = $(location).attr('href');
                        axios.post(`https://products.sold.co.id/get-product-details?product_code=${product_id}`)
                        .then((res)=>{
                            
                            item = res.data
                            var split_product = res.data.Name.split(' ')
                            var all_filter_product = []
                            for(var i =0; i<split_product.length; i++){
                                var filter_product = allDataProduct.filter((val)=>{
                                    if(val.Name.includes(split_product[i])){
                                        // 
                                        all_filter_product.push(val)
                                        return val
                                    }
                                })
                            }
                            // BATAS
                            var hargaAwal = parseInt(item.Sell_Price)
                            var discount = parseInt(item.Sell_Price * 0.1)
                            var hargaTotal = hargaAwal + discount
                            $('.box-item-detail').empty();
                        
                            if(item.GroupBuy_Purchase == "false"){
                                $('.box-item-detail').append(
                                    `
                                    <div class="new-item-left">
                                        <div class="item-left-img-box">
                                            
                                        </div>
                                        <div class="img-option-left">
                                           
                                        </div>
                                        <div class="box-button-next-back">
                                            <div  class="box-btn-left" onclick="back_btn()">
                                                <i class="fas fa-chevron-left"></i>
                                            </div>
                                            <div class="box-btn-right" onclick="next_btn()">
                                                <i class="fas fa-chevron-right"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="new-item-right">    
                                        <div class="box-back-right-id">
                                            <div class="btn-back-right-id" onclick="close_product_detail()">
                                                <i class="fas fa-arrow-left"></i>
                                                Kembali
                                            </div>
                                        </div>  
                                        <div class="box-description-right-id">
                                            <div class="bd-right-id"> 
                                                <p>${item.Category}</p>
                                                <div class="qty-box-pd"> 
                                                     Quantity : ${item.Stock_Quantity}
                                                </div>
                                            </div>
                                            
                                            <p class="limited-text">${item.Name}</p>
                                            <div class="rating-bottom-2">
                                                <div class="star-box">
                                                    <iframe class="star-iframe"  src="../Iframe/rating-stars/index.html?product_code=${product_id}"></iframe> 
                                                </div>
                                            </div>
                                        </div>
                    
                                        <div class="box-price-right-id">
                                            
                                            <div class="box-small-price-2" onclick="addToCart('${item.Product_Code}')">
                                                Tambah
                                            </div>
                                            <div class="box-small-price-2" onclick="buyNow('${item.Product_Code}')">
                                                Beli Sekarang
                                            </div>
                                           
                                        </div>
                                        <div class="box-quality-right-id-2">
                                            <div class="bsp-2">
                                                <p> Normal Price : <span> RP.${commafy(item.Sell_Price)} </span> </p>
                    
                                            </div>
                                           
                                        </div>
                    
                                        <div class="box-quality-right-id">
                                            Product Sejenis
                                            <div class="card-quality-right-id">
                                                
                                            </div>
                                        </div>
                                        <div class="box-option-right-id">
                                            <nav>
                                                <div class="nav nav-tabs" id="nav-tab" role="tablist">
                                                <button class="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Deskripsi</button>
                                                <button class="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Ulasan</button>
                                                <button class="nav-link" id="nav-faq-tab" data-bs-toggle="tab" data-bs-target="#nav-faq" type="button" role="tab" aria-controls="nav-faq" aria-selected="false">FAQ</button>
                                                </div>
                                            </nav>
                                            <div class="tab-content" id="nav-tabContent">
                                                <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                                                ${item.Description}
                                                </div>
                                                <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                                                    <div class="user-card-top-id">
                                                        <img src="../img/liked.png" alt="">
                                                        <div class="user-card-desc-top-id">
                                                            Tambah Comment 
                                                            <div class="card-for-comment">
                                                                <input type="text" class="input_comment_cust">
                                                                <div class="btn-send-comment " disabled onclick="send_comment_cust()">
                                                                    SEND
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>           
                                                </div>
                                                
                                                <div class="tab-pane fade" id="nav-faq" role="tabpanel" aria-labelledby="nav-faq-tab">
                                                    <div class="card-faq-id">
                                                        <div class="card-question-id">
                                                            Apakah Bisa Pre Order ?
                                                            <div class="card-for-minus-plus-id">
                                                                <div class="btn-minus-id" id="icon-minus-id-1">
                                                                    <i class="far fa-minus-square "  onclick="close_tab_answer('answer-1-id',1)"></i>
                    
                                                                </div>
                                                                <div class=" btn-plus-id" id="icon-plus-id-1"> 
                                                                    <i class="far fa-plus-square"  onclick="open_tab_answer('answer-1-id',1)"></i>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="card-answer-id" id="answer-1-id">
                                                            TIDAK BISA
                                                        </div>
                                                    </div>
                                                    <div class="card-faq-id">
                                                        <div class="card-question-id">
                                                            Apakah Bisa Pre Order ?
                                                            <div class="card-for-minus-plus-id">
                                                                <div class="card-for-minus-plus-id">
                                                                    <div class="btn-minus-id" id="icon-minus-id-2">
                                                                        <i class="far fa-minus-square "  onclick="close_tab_answer('answer-2-id',2)"></i>
                                    
                                                                    </div>
                                                                    <div class=" btn-plus-id" id="icon-plus-id-2"> 
                                                                        <i class="far fa-plus-square"  onclick="open_tab_answer('answer-2-id',2)"></i>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="card-answer-id" id="answer-2-id">
                                                            TIDAK BISA
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>`
                                )
                            }else{        
                                $('.box-item-detail').append(
                                    `
                                    <div class="new-item-left">
                                        <div class="item-left-img-box">
                                          
                                        </div>
                                        <div class="img-option-left">
                                            
                                        </div>
                                        <div class="box-button-next-back">
                                            <div  class="box-btn-left" onclick="back_btn()">
                                                <i class="fas fa-chevron-left"></i>
                                            </div>
                                            <div class="box-btn-right" onclick="next_btn()">
                                                <i class="fas fa-chevron-right"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="new-item-right">    
                                        <div class="box-back-right-id">
                                            <div class="btn-back-right-id" onclick="close_product_detail()">
                                                <i class="fas fa-arrow-left"></i>
                                                Kembali
                                            </div>
                                        </div>  
                                        <div class="box-description-right-id">
                                            <div class="bd-right-id"> 
                                                <p>${item.Category}</p>
                                                <div class="qty-box-pd"> 
                                                     Quantity : ${item.Stock_Quantity}
                                                </div>
                                            </div>
                                            <p class="limited-text">${item.Name}</p>
                                            <div class="rating-bottom-2">
                                                <div class="star-box">
                                                    <iframe class="star-iframe"  src="../Iframe/rating-stars/index.html?product_code=${product_id}"></iframe> 
                                                </div>
                                            </div>
                                        </div>
                    
                                        <div class="box-price-right-id">
                                            
                                            <div class="box-small-price-2" onclick="addToCart('${item.Product_Code}')">
                                                Tambah
                                            </div>
                                            <div class="box-small-price-2" onclick="buyNow('${item.Product_Code}')">
                                                Beli Sekarang
                                            </div>
                                            <div class="box-small-price-2" onclick="groupbuy('${item.Product_Code}')">
                                                Beli Harga Group
                                            </div>
                                        </div>
                                        <div class="box-quality-right-id-2">
                                            <div class="bsp-1">
                                                <p> Normal Price : <span> RP.${commafy(item.Sell_Price)} </span> </p>
                                                    
                                                
                                                <p> Group Buy  Price : <span>RP.${commafy(item.GroupBuy_SellPrice)} </span> </p>
                                            </div>
                                            
                                        </div>
                                     
                                        <div class="box-quality-right-id">
                                            Product Sejenis
                                            <div class="card-quality-right-id">
                                                                                          
                                            </div>
                                        </div>
                                        <div class="box-option-right-id">
                                            <nav>
                                                <div class="nav nav-tabs" id="nav-tab" role="tablist">
                                                <button class="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Deskripsi</button>
                                                <button class="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Ulasan</button>
                                                
                                                <button class="nav-link" id="nav-faq-tab" data-bs-toggle="tab" data-bs-target="#nav-faq" type="button" role="tab" aria-controls="nav-faq" aria-selected="false">FAQ</button>
                                                </div>
                                            </nav>
                                            <div class="tab-content" id="nav-tabContent">
                                                <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                                                    ${item.Description}
                                                </div>
                                                <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                                                    <div class="user-card-top-id">
                                                        <img src="../img/liked.png" alt="">
                                                        <div class="user-card-desc-top-id">
                                                            Tambah Comment 
                                                            <div class="card-for-comment">
                                                                <input type="text" class="input_comment_cust">
                                                                <div class="btn-send-comment " disabled onclick="send_comment_cust()">
                                                                    SEND
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                <div class="tab-pane fade" id="nav-faq" role="tabpanel" aria-labelledby="nav-faq-tab">
                                                    <div class="card-faq-id">
                                                        <div class="card-question-id">
                                                            Apakah Bisa Pre Order ?
                                                            <div class="card-for-minus-plus-id">
                                                                <div class="btn-minus-id" id="icon-minus-id-1">
                                                                    <i class="far fa-minus-square "  onclick="close_tab_answer('answer-1-id',1)"></i>
                    
                                                                </div>
                                                                <div class=" btn-plus-id" id="icon-plus-id-1"> 
                                                                    <i class="far fa-plus-square"  onclick="open_tab_answer('answer-1-id',1)"></i>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="card-answer-id" id="answer-1-id">
                                                            TIDAK BISA
                                                        </div>
                                                    </div>
                                                    <div class="card-faq-id">
                                                        <div class="card-question-id">
                                                            Apakah Bisa Pre Order ?
                                                            <div class="card-for-minus-plus-id">
                                                                <div class="card-for-minus-plus-id">
                                                                    <div class="btn-minus-id" id="icon-minus-id-2">
                                                                        <i class="far fa-minus-square "  onclick="close_tab_answer('answer-2-id',2)"></i>
                                    
                                                                    </div>
                                                                    <div class=" btn-plus-id" id="icon-plus-id-2"> 
                                                                        <i class="far fa-plus-square"  onclick="open_tab_answer('answer-2-id',2)"></i>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="card-answer-id" id="answer-2-id">
                                                            TIDAK BISA
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    `
                                )
                            }
                    
                            $('.img-option-left').empty()
                            $('.item-left-img-box').empty()
                            if(item.Picture_1 == undefined || item.Picture_1 == null || item.Picture_1 == 'NULL' || item.Picture_1 == ''){
                                // $('.item-left-img-box').append(`
                                //     <img src="${replace_vtintl_to_sold_co_id(item.Picture_1)}" alt="" class="img-big img-notfound" id="img-big-1" val="img-notfound">
                                // `)
                            }else{
                                $('.img-option-left').append(`
                                    <div class="option-left-1 img-1-id pop">
                                            <img src="${replace_vtintl_to_sold_co_id(item.Picture_1)}" alt="">
                                    </div>
                                `)
                                $('.item-left-img-box').append(`
                                    <img src="${replace_vtintl_to_sold_co_id(item.Picture_1)}" alt="" class="img-big-active" id="img-big-1">
                                `)
                            }
                            if(item.Picture_2 == undefined || item.Picture_2 == null || item.Picture_2 == 'NULL' || item.Picture_2 == ''){
                                // $('.item-left-img-box').append(`
                                //     <img src="${replace_vtintl_to_sold_co_id(item.Picture_2)}" alt="" class="img-big img-notfound" id="img-big-2" val="img-notfound">
                                // `)
                            }else{
                                $('.img-option-left').append(`
                                    <div class="option-left-1 img-2-id pop">
                                            <img src="${replace_vtintl_to_sold_co_id(item.Picture_2)}" alt="">
                                    </div>
                                `)
                                $('.item-left-img-box').append(`
                                    <img src="${replace_vtintl_to_sold_co_id(item.Picture_2)}" alt="" class="img-big" id="img-big-2">
                                `)
                            }
                            if(item.Picture_3 == undefined || item.Picture_3 == null || item.Picture_3 == 'NULL' || item.Picture_3 == ''){
                    
                                
                                // $('.item-left-img-box').append(`
                                //     <img src="${replace_vtintl_to_sold_co_id(item.Picture_3)}" alt="" class="img-big img-notfound" id="img-big-3" val="img-notfound">
                                // `)
                            }else{
                                $('.img-option-left').append(`
                                    <div class="option-left-1 img-2-id pop">
                                            <img src="${replace_vtintl_to_sold_co_id(item.Picture_3)}" alt="">
                                    </div>
                                `)
                                $('.item-left-img-box').append(`
                                    <img src="${replace_vtintl_to_sold_co_id(item.Picture_3)}" alt="" class="img-big" id="img-big-3">
                                `)
                            }
    
                            
                            if(item.extra_column_1 == undefined || item.extra_column_1 == null || item.extra_column_1 == 'NULL' || item.extra_column_1 == ''){
    
                            
                                $('.item-left-img-box').append(`
                                    <img src="${item.extra_column_1}" alt="" class=" img-notfound" id="img-big-4" val="img-notfound">
                                `)
                            }else{
    
                                // $('.img-option-left').append(`
                                //     <img src="${replace_vtintl_to_sold_co_id(item.extra_column_1)}" alt="" class="img-big" id="img-big-4">
                                // `)                   
                                $('.item-left-img-box').append(`
                                    <video  height="350px" width="400px" autoplay muted loop class="img-big" id="img-big-4">
                                        <source src="${replace_vtintl_to_sold_co_id(item.extra_column_1)}" type="video/mp4">
                                        <source src="${replace_vtintl_to_sold_co_id(item.extra_column_1)}" type="video/ogg">
                                    </video>
                                `)
                            }
                            
                        
                            axios.post(`https://products.sold.co.id/get_user_comment?Product_Code=${product_id}`)
                            .then((res)=>{
                                var cust_comment = res.data
                                allDataProduct.map((val,index)=>{
                                    if(val.Product_Code == product_id_pilihan){
                                        $('.card-quality-right-id').append(`
                                        <div class="card-sejenis-id active_product">
                                            <div class="card-sejenis-img-id">
                                                <img src="${val.Picture_1}" alt="">
                                            </div>
                                            <div class="card-sejenis-desc-id">
                                                <p class="limited-text-commision">${val.Name}</p>
                                                <p>RP.${commafy(val.Sell_Price)}</p>
                                                
                                            </div>
                                        </div>
                                        `)
                        
                                    }else {
                                        $('.card-quality-right-id').append(`
                                        <div class="card-sejenis-id" onclick="change_product_to('${val.Product_Code}')">
                                            <div class="card-sejenis-img-id">
                                                <img src="${val.Picture_1}" alt="">
                                            </div>
                                            <div class="card-sejenis-desc-id">
                                                <p class="limited-text-commision">${val.Name}</p>
                                                <p>RP.${commafy(val.Sell_Price)}</p>
                                                
                                            </div>
                                        </div>
                                        `)
                                    }
                        
                                  
                        
                                })
    
                                var comment_parse = JSON.parse(cust_comment.User_Comments)
                                $('#nav-profile').empty()
                                if(comment_parse == 'null' || comment_parse == null){
                                    $('#nav-profile').append(`
                                    <div class="user-card-top-id">
                                        <img src="../img/accounts.png" alt="">
                                        <div class="user-card-desc-top-id">
                                            Tambah Comment 
                                            <div class="card-for-comment">
                                                <input type="text" class="input_comment_cust" >
                                                <div class="btn-send-comment active_send_comment" onclick="send_comment_cust('${product_id}')">
                                                    SEND
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                `)
                                }else if (comment_parse.length > 0 ) {
                                    comment_parse.map((val,index)=>{
                                        axios.post(`https://customers.sold.co.id/get-profile-image?Customer_Code=${val.Customer_Code}`)
                                        .then((res)=>{
                                            if(res.data){
                                                var link_gambar = res.data
                                                axios.post(`https://customers.sold.co.id/get-customer-information?Customer_Code=${val.Customer_Code}`)
                                                .then((res)=>{                                                    
                                                    // res.data.map((val,index)=>{
                                                        $('#nav-profile').append(`
                                                        <div class="user-card-id">
                                                            <div class="user-card-top-id">
                                                                <img src="${link_gambar}" alt="">
                                                                <div class="user-card-desc-top-id">
                                                                    <p>${res.data.First_Name} ${res.data.Last_Name}</p>
                                                                    
                                                                </div>
                                                            </div>
                                                            <div class="user-card-bot-id">
                                                                <p>${val.Comment}</p>
                                                            </div>
                                                        </div>
                                                        `)
                                                    // })
                                                }).catch((err)=>{
                                                    
                                                })
                                            } else {
                                                $('#nav-profile').append(`
                                                        <div class="user-card-id">
                                                            <div class="user-card-top-id">
                                                                <img src="../img/accounts.png" alt="">
                                                                <div class="user-card-desc-top-id">
                                                                    <p>${res.data.First_Name} ${res.data.Last_Name}</p>
                                                                    <p>*****</p>
                                                                </div>
                                                            </div>
                                                            <div class="user-card-bot-id">
                                                                <p>${val.Comment}</p>
                                                            </div>
                                                        </div>
                                                        `)
                                            }
                                        }).catch((err)=>{
                                            
                                        })
                                    })
                        
                                }
                                
                                Swal.fire({
                                    title: 'Uploading Data',
                                    timer:100,
                                })
                               
                            }).catch((err)=>{
                                
                            })
                            //BATAS 
                        }).catch((err)=>{
                            
                        })
                    }).catch((err)=>{
                        
                    })
                }
            }).catch((err)=>{
                console.log(err)
            })
        }
    })
    
}
const render_product_detail_from_searching_page=(item_category)=>{
    console.log(item_category,'render product detail from home jalan')
}

const tambah_product_ke_cart=(product_id)=>{
    console.log('tambah product ke cart jalan')
    var final_qty = $('.input-qty-product-detail').val()
    addToCart(product_id,final_qty)
}
const beli_product_sekarang=(product_id)=>{
    console.log('beli_product_sekarang')
}
const beli_groupbuy_sekarang=(product_id)=>{
    console.log('beli_groupbuy_sekarang')
}

const ganti_gambar_product=(id)=>{
    console.log(id,' index ganti gambar jalan')
}