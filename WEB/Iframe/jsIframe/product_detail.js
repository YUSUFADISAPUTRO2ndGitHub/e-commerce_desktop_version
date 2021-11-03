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


const render_product_detail_from_home=(item_category)=>{
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
        didOpen:()=>{
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
                    
                    if(data_for_render[0].GroupBuy_Purchase == "false"){
                        $('.container-product').append( // render untuk bukan groupbuy
                            `
                            <div class="new-product-detail-box">
                                <div class="npd-left">
                                    <div class="product-detail-isi">
                                        <div class="npdl-left">
                                            <div class="new-product-img-box">
                                                <img src="${replace_vtintl_to_sold_co_id(data_for_render.Picture_1)}" alt="">
                                            </div>
                                            <div class="new-product-small-img-box ">
                                                <div class="small-product-img active-small-img" onclick="ganti_gambar_product('${data_for_render.Picture_1}')">
                                                    <img src="${replace_vtintl_to_sold_co_id(data_for_render.Picture_1)}" alt="">
                                                </div>
                                               
                                            </div>
                                        </div>   
                                        <div class="npdl-right">
                                            <div class="npd-left-product-name">
                                                <p>Mainan Kartu Ultranab Orb Gold Utra Rare Card Kartu Langka Ultraman</p>
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
                                                        <p>Berat : <span>30 Gram</span> </p>
                                                        <p>Kategori : <span id="kategori-product-detail-pd">Action Figure</span></p>
                                                        <div class="deskripsi-new-product-detail">
                                                            ${data_for_render[0].Description}
                                                            ${data_for_render[0].Specification}     
                                                        </div>
                                                    </div>
                                                    <div class="tab-pane fade" id="nav-content-info" role="tabpanel" aria-labelledby="nav-spec-tab">
                                                        
                        
                                                    </div>
                                                </div>
                                                
                                            </div>
                                            
                        
                                        </div>
                                    </div>
                                    <div class="box-company-detail">
                                        <div class="bcd-left">
                                            <div class="ins-bcd-left">
                                                <div class="bcd-image">
                                                    <img src="../img/blocks.png" alt="">
                                                </div>
                                                <div class="bcd-name">
                                                    <i class="fas fa-check-circle"></i>
                                                    <p>VANTSING INTERNATIONAL</p>
                                                </div>
                                            </div>
                                            

                                        </div>
                                        <div class="bcd-right">
                                            <div class="ins-detail-left">
                                                <p>Pengiriman</p>
                                                <div class="dikirim-dari">
                                                    <i class="fas fa-map-marker-alt"></i>
                                                    <p>Dikirim dari <span>Jakarta Barat</span></p>
                                                </div>
                                                <div class="dikirim-dari">
                                                    <i class="fas fa-truck"></i>
                                                    <p>Ongkir Reguler 8 rb</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="box-ulasan-detail">
                                        <p>SEMUA ULASAN(3)</p>
                                        <div class="box-item-ulasan">
                                            <div class="biu-left">
                                                <div class="biu-image">
                                                    <img src="../img/blocks.png" alt="">
                                                </div>
                                                <p>Bayu Darmawan</p>
                                            </div>
                                            <div class="biu-right">
                                                <p>Cepet banget!, Pesen Sekarang Jumaat Sampai</p>
                                                <div class="company-comment-box">
                                                    <div class="ccb-image">
                                                        <img src="../img/blocks.png" alt="">
                                                    </div>
                                                    <div class="ccb-isi-comment">
                                                        <div class="ccb-isi-comment-name">
                                                            <p>VANTSING INTERNATIONAL</p>
                                                            <div class="btn-penjual-ccb">
                                                                Penjual
                                                            </div>
                                                        </div>
                                                        <div class="ccb-thankyou">
                                                            Terima kasih telah berbelanja di VANTSING INTERNATIONAL. Bagikan link toko kami https://www.soldays.id kepada teman-teman Anda dan favoritkan Toko kami untuk terus update mengenai stok dan produk terbaru
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="box-item-ulasan">
                                            <div class="biu-left">
                                                <div class="biu-image">
                                                    <img src="../img/blocks.png" alt="">
                                                </div>
                                                <p>Bayu Darmawan</p>
                                            </div>
                                            <div class="biu-right">
                                                <p>Cepet banget!, Pesen Sekarang Jumaat Sampai</p>
                                                <div class="company-comment-box">
                                                    <div class="ccb-image">
                                                        <img src="../img/blocks.png" alt="">
                                                    </div>
                                                    <div class="ccb-isi-comment">
                                                        <div class="ccb-isi-comment-name">
                                                            <p>VANTSING INTERNATIONAL</p>
                                                            <div class="btn-penjual-ccb">
                                                                Penjual
                                                            </div>
                                                        </div>
                                                        <div class="ccb-thankyou">
                                                            Terima kasih telah berbelanja di VANTSING INTERNATIONAL. Bagikan link toko kami https://www.soldays.id kepada teman-teman Anda dan favoritkan Toko kami untuk terus update mengenai stok dan produk terbaru
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="box-item-ulasan">
                                            <div class="biu-left">
                                                <div class="biu-image">
                                                    <img src="../img/blocks.png" alt="">
                                                </div>
                                                <p>Bayu Darmawan</p>
                                            </div>
                                            <div class="biu-right">
                                                <p>Cepet banget!, Pesen Sekarang Jumaat Sampai</p>
                                                <div class="company-comment-box">
                                                    <div class="ccb-image">
                                                        <img src="../img/blocks.png" alt="">
                                                    </div>
                                                    <div class="ccb-isi-comment">
                                                        <div class="ccb-isi-comment-name">
                                                            <p>VANTSING INTERNATIONAL</p>
                                                            <div class="btn-penjual-ccb">
                                                                Penjual
                                                            </div>
                                                        </div>
                                                        <div class="ccb-thankyou">
                                                            Terima kasih telah berbelanja di VANTSING INTERNATIONAL. Bagikan link toko kami https://www.soldays.id kepada teman-teman Anda dan favoritkan Toko kami untuk terus update mengenai stok dan produk terbaru
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="box-input-ulasan">
                                        <p>Masukan Ulasan</p>
                                        <input type="text" maxlength="100" class="input-ulasan-npd">
                                        <div class="btn-upload-ulasan">
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
                                        <input type="number" class="input-qty-product-detail">
                                        <div class="total-qty-right">
                                            <div class="tqr-top">
                                                <p id="total-harga-p">Total Harga dan quantity</p>
                                                <i class="fas fa-chevron-down down-product-detail-2"></i>
                                            </div>
                                        </div>
                                        <div class="btn-tambah-cart" onclick="tambah_product_ke_cart()">
                                            <p>+ Keranjang</p>
                                        </div>
                                        <div class="btn-beli-cart" onclick="beli_product_sekarang()">
                                            <p>Beli</p>
                                        </div>
                                        <div class="btn-beli-cart" onclick="beli_groupbuy_sekarang()">
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
                            `
                        )
                    }else{ //render untuk groupbuy       
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
                                        <p>${data_for_render[0].Category}</p>
                                        <div class="qty-box-pd"> 
                                             Quantity : ${data_for_render[0].Stock_Quantity}
                                        </div>
                                    </div>
                                    <p class="limited-text">${data_for_render[0].Name}</p>
                                    <div class="rating-bottom-2">
                                        <div class="star-box">
                                            <iframe class="star-iframe"  src="../Iframe/rating-stars/index.html?product_code=${product_id}"></iframe> 
                                        </div>
                                    </div>
                                </div>
            
                                <div class="box-price-right-id">
                                    
                                    <div class="box-small-price-2" onclick="addToCart('${data_for_render[0].Product_Code}')">
                                        Tambah
                                    </div>
                                    <div class="box-small-price-2" onclick="buyNow('${data_for_render[0].Product_Code}')">
                                        Beli Sekarang
                                    </div>
                                    <div class="box-small-price-2" onclick="groupbuy('${data_for_render[0].Product_Code}')">
                                        Beli Harga Group
                                    </div>
                                </div>
                                <div class="box-quality-right-id-2">
                                    <div class="bsp-1">
                                        <p> Normal Price : <span> RP.${commafy(data_for_render[0].Sell_Price)} </span> </p>
                                            
                                        
                                        <p> Group Buy  Price : <span>RP.${commafy(data_for_render[0].GroupBuy_SellPrice)} </span> </p>
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
                                        <button class="nav-link" id="nav-spec-tab" data-bs-toggle="tab" data-bs-target="#nav-spec" type="button" role="tab" aria-controls="nav-spec" aria-selected="true">Specification</button>
                                        <button class="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Ulasan</button>
                                        <button class="nav-link" id="nav-faq-tab" data-bs-toggle="tab" data-bs-target="#nav-faq" type="button" role="tab" aria-controls="nav-faq" aria-selected="false">FAQ</button>
                                        </div>
                                    </nav>
                                    <div class="tab-content" id="nav-tabContent">
                                        <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                                            ${data_for_render[0].Description}
                                        </div>
                                        <div class="tab-pane fade" id="nav-spec" role="tabpanel" aria-labelledby="nav-spec-tab">
                                           ${data_for_render[0].Specification}          
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

                    if(data_for_render[0].Picture_1 == undefined || data_for_render[0].Picture_1 == null || data_for_render[0].Picture_1 == 'NULL' || data_for_render[0].Picture_1 == ''){
                        $('.item-left-img-box').append(`
                            <img src="${replace_vtintl_to_sold_co_id(data_for_render.Picture_1)}" alt="" class=" img-notfound" id="img-big-1" val="img-notfound">
                        `)
                    }else{
                        $('.img-option-left').append(`
                            <div class="option-left-1 img-1-id pop">
                                    <img src="${replace_vtintl_to_sold_co_id(data_for_render[0].Picture_1)}" alt="">
                            </div>
                        `)
                        $('.item-left-img-box').append(`
                            <img src="${replace_vtintl_to_sold_co_id(data_for_render[0].Picture_1)}" alt="" class="img-big-active" id="img-big-1">
                        `)
                    }
                    if(data_for_render[0].Picture_2 == undefined || data_for_render[0].Picture_2 == null || data_for_render[0].Picture_2 == 'NULL' || data_for_render[0].Picture_2 == ''){
                        $('.item-left-img-box').append(`
                            <img src="${data_for_render[0].Picture_2}" alt="" class=" img-notfound" id="img-big-2" val="img-notfound">
                        `)
                    }else{
                        $('.img-option-left').append(`
                            <div class="option-left-1 img-2-id pop">
                                    <img src="${replace_vtintl_to_sold_co_id(data_for_render[0].Picture_2)}" alt="">
                            </div>
                        `)
                        $('.item-left-img-box').append(`
                            <img src="${replace_vtintl_to_sold_co_id(data_for_render[0].Picture_2)}" alt="" class="img-big" id="img-big-2">
                        `)
                    }
                    if(data_for_render[0].Picture_3 == undefined || data_for_render[0].Picture_3 == null || data_for_render[0].Picture_3 == 'NULL' || data_for_render[0].Picture_3 == ''){

                        
                        $('.item-left-img-box').append(`
                            <img src="${data_for_render.Picture_3}" alt="" class="img-notfound" id="img-big-3" val="img-notfound">
                        `)
                    }else{
                        $('.img-option-left').append(`
                            <div class="option-left-1 img-2-id pop">
                                    <img src="${replace_vtintl_to_sold_co_id(data_for_render[0].Picture_3)}" alt="">
                            </div>
                        `)
                        $('.item-left-img-box').append(`
                            <img src="${replace_vtintl_to_sold_co_id(data_for_render[0].Picture_3)}" alt="" class="img-big" id="img-big-3">
                        `)
                    }
                    
                    
                    if(data_for_render[0].extra_column_1 == undefined || data_for_render[0].extra_column_1 == null || data_for_render[0].extra_column_1 == 'NULL' || data_for_render[0].extra_column_1 == ''){

                    
                        $('.item-left-img-box').append(`
                            <img src="${data_for_render[0].extra_column_1}" alt="" class=" img-notfound" id="img-big-4" val="img-notfound">
                        `)
                    }else{

                        // $('.img-option-left').append(`
                        //     <img src="${replace_vtintl_to_sold_co_id(data_for_render[0].extra_column_1)}" alt="" class="img-big" id="img-big-4">
                        // `)                   
                        $('.item-left-img-box').append(`
                            <video  height="350px" width="400px" autoplay muted loop class="img-big" id="img-big-4">
                                <source src="${replace_vtintl_to_sold_co_id(data_for_render[0].extra_column_1)}" type="video/mp4">
                                <source src="${replace_vtintl_to_sold_co_id(data_for_render[0].extra_column_1)}" type="video/ogg">
                            </video>
                        `)
                    }
                    axios.post(`https://products.sold.co.id/get_user_comment?Product_Code=${product_id}`)
                    .then((res)=>{
                        
                            var cust_comment = res.data
                            allData_storage.map((val,index)=>{
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
                                    axios.post(`http://customers.sold.co.id/get-profile-image?Customer_Code=${val.Customer_Code}`)
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
        }
    })
    
}
const render_product_detail_from_searching_page=(item_category)=>{
    console.log(item_category,'render product detail from home jalan')
}

const tambah_product_ke_cart=()=>{
    console.log('tambah product ke cart jalan')
}
const beli_product_sekarang=()=>{
    console.log('beli_product_sekarang')
}
const beli_groupbuy_sekarang=()=>{
    console.log('beli_groupbuy_sekarang')
}

const ganti_gambar_product=(id)=>{
    console.log(id,' index ganti gambar jalan')
}