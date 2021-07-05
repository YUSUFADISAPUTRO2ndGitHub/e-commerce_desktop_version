

// console.log('axios jalan')

setInterval(() => {
    var dataParse = JSON.parse(localStorage.getItem("itemsInCart"))
    // console.log(dataParse)
    // console.log(dataParse.length)
    $('.cart-counter').text(dataParse.length)
}, 1000);
var allData = []


$( document ).ready(function() {
    
    $('.ref-cod').on('change',function(){
        var selectedVal = $('.ref-cod option:selected').val()
        
    })

    var dataParse = JSON.parse(localStorage.getItem("itemsInCart"))
    // console.log(dataParse)
    // $('.cart-counter').text(dataParse.length)
    // var test =$('.cart-counter').val()
    // console.log(test)

    


    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const category = urlParams.get('category');
    const subcategory = urlParams.get('subcategory');
    const item_category = urlParams.get('product_id');
    const group_buy = urlParams.get('groupbuy_id')
    const list_hutang = urlParams.get('list_hutang')
    const detail_list_hutang = urlParams.get('detail_list_hutang')

    // console.log(group_buy, 'group_buy')
    console.log(queryString,' queryString')
    console.log(urlParams,' urlParams')
    console.log(category,' category')
    console.log(item_category,' item Category')
    if(category != undefined){
        if(category.length > 0){
            console.log(category.length, ' category length')
            console.log('masuk ke category line 19')
            renderItemBasedOnCategory(category);
        }
    }else if(subcategory != undefined){
        if(subcategory.length > 0){
            console.log('masuk ke subcategory line 25')
            renderItemBasedOnSubCategory(subcategory);
        }
    }else if(item_category != undefined){
        console.log('masuk ke line 21 axios js')
        // get_product_detail(item_category)
        
        render_get_product_detail(item_category)
    }else if (group_buy != undefined){
        console.log('masuk ke line 44 axios js')
        // alert(group_buy)
        render_group_buy(group_buy)
    }else if (list_hutang !=undefined){
        // render_daftar_hutang()
        newRender_list_hutang()
    }else if (detail_list_hutang != undefined){
        detail_hutang_home(detail_list_hutang)
    }
    else {
        console.log('error masuk ke else 33')
    }
});





const getAllData=()=>{
// console.log(dataRender)

axios.post('http://products.sold.co.id/get-product-details')
.then((res)=>{
    allData = res.data
    // console.log(res.data)
    renderItemPromo()
    renderItemNew()
    renderItemAll()
    renderCategory()
    // renderSubCategory('ADHESIVE')
    // renderItemBasedOnSubCategory('SEALANT')
}).catch((err)=>{
    console.log(err)
})
}
getAllData()

const get_product_detail_from_main_page=(product_id)=>{
    $('.box-delete-success').css('display','block')
    $('.modals-product-detail').css('display','block')
    $('.close-button').css('display','block')
    $('.modals-product-detail').attr('src',`./Iframe/itemDetail.html?product_id=${product_id}`)
    console.log( $('.modals-product-detail').attr('src'))
    console.log(product_id, 'product_id 206')
    render_get_product_detail(product_id)
}

// RENDER DATA HOME
const renderItemPromo=()=>{


    allData.map((val,index)=>{
        var hargaAwal = parseInt(val.Sell_Price)
        var discount = parseInt(val.Sell_Price * 0.1)
        var hargaTotal = hargaAwal + discount
        // console.log(hargaTotal)
        if(val == false){
            console.log(' gak render karna false')
        }else {
            $('.box-render-promo').append(
            ` 
                <div class="card-item hvr-float-shadow">
                    <img src="${val.Picture_1}" alt="" class="img-card" onclick="get_product_detail_from_main_page('${val.Product_Code}')">   
                    <div class="card-item-list">
                        <p class="limited-text-short">${val.Name}</p>
                        <div class="split-item">
                            <div class="item-price">
                                <p>RP. ${hargaTotal}</p>
                                <p>Rp. ${hargaAwal}</p>
                            </div>
                            <div class="buy-icon" onclick="addToCart('${val.Product_Code}')">
                                <img src="./img/cart.png" alt="" class="icon-buy" id="${val.Product_Code}">
                            </div>
                        </div>
                    </div>
                </div>
                `
            )

        }
    })
}



const renderItemNew=()=>{
    
    

    allData.map((val,index)=>{
        var hargaAwal = parseInt(val.Sell_Price)
        var discount = parseInt(val.Sell_Price * 0.1)
        var hargaTotal = hargaAwal + discount
    //  console.log(hargaTotal)

    if(val == false){
        console.log('gak ke render karna false')
    }else {

        $('.box-render-new').append(
        ` 
          <div class="card-item card_sp hvr-float-shadow">
                <img src="${val.Picture_1}" alt="" class="img-card" onclick="get_product_detail_from_main_page('${val.Product_Code}')">   
                <div class="card-item-list">
                    <p class="limited-text-short">${val.Name}</p>
                    <div class="split-item">
                        <div class="item-price">
                            <p>RP. ${hargaTotal}</p>
                            <p>Rp. ${hargaAwal}</p>
                        </div>
                        <div class="buy-icon" onclick="addToCart('${val.Product_Code}')">
                            <img src="./img/cart.png" alt="" class="icon-buy" id="${val.Product_Code}">
                        </div>
                    </div>
                </div>
            </div>
            `
        )
    }
    })
}
const renderItemAll=()=>{
    

    allData.map((val,index)=>{
        console.log(allData)
        var hargaAwal = parseInt(val.Sell_Price)
        var discount = parseInt(val.Sell_Price * 0.1)
        var hargaTotal = hargaAwal + discount
    //  console.log(hargaTotal)
    if(val == false){
        console.log('gak ke render karna false')
    }else {

        $('.box-render-all').append(
        ` 
            <div class="card-item hvr-float-shadow">
                <img src="${val.Picture_1}" alt="" class="img-card" onclick="get_product_detail_from_main_page('${val.Product_Code}')">   
                <div class="card-item-list">
                    <p class="limited-text-short">${val.Name}</p>
                    <div class="split-item">
                        <div class="item-price">
                            <p>RP. ${hargaTotal}</p>
                            <p>Rp. ${hargaAwal}</p>
                        </div>
                        <div class="buy-icon" onclick="addToCart('${val.Product_Code}')">
                            <img src="./img/cart.png" alt="" class="icon-buy">
                        </div>
                    </div>
                </div>
            </div>
            `
        )
    }
    })
}

// RENDER DATA HOME


const renderCategory=()=>{
    // var subCat = 'ADHESIVE'
    axios.post('http://products.sold.co.id/get-product-details?Get_ALL_Category=true')
    .then((res)=>{
        // console.log(res.data)
        res.data.map((val,index)=>{
            var sub = val.Category.toUpperCase()
            $('.list-group').append(
                ` 
                <li class="list-group-item category-list get-item close-category " val="${sub}" onclick="findSubCategory('${sub}')">${sub}</li>
                `
                )
        })
    }).catch((err)=>{
        console.log(err)
    })
}



$('.testing-2').on('click',function(){
    console.log('get item jalan 161')
})

const findSubCategory=(sub)=>{
    // $('.modals-lk').css('display','block')
    // alert('findsubcategory jalan')
    $('.close-button').css('display','block')
    console.log(sub)
    $('.closeByLogin').css('display','none')
    $('.option-0').removeClass("background_grey")
    $('.option-1').removeClass("background_grey")
    $('.option-2').removeClass("background_grey")
    $('.option-3').removeClass("background_grey")
    $('.box-render-search').css('display','none')

    $('.modals-lk').css('display','block')
    $('.modals-lk').attr('src',`../WEB/Iframe/listkategori.html?category=${sub}`)
    
    // SEARCH ITEM BACK TO NORMAL
    $('.box-render-search').css('display','none')
    $('.input-name').css('border-bottom-left-radius','10px')
    $('.input-name').css('border-bottom-right-radius','10px')
    $('.input-name').val(null)
    
    
    // renderItemBasedOnCategory(sub)
}

const getAllItem=(item)=>{
    console.log(item)
    // console.log($('.modals-lk'))
    console.log($('.modals-lk').attr('src'))
    // $('.modals-lk').attr('src',`../WEB/Iframe/listkategori.html?subcategory=${item}`)
    location.replace(`../Iframe/listkategori.html?subcategory=${item}`)
    
}

function sign_up_request(){
    
    $("#loginModal").modal("hide");
    // $("#daftarHutangModal").modal('show')
        axios.post(`http://customers.sold.co.id/get-available-referral-codes
        `).then((res)=>{
            res.data.map((val,index)=>{
                console.log(val)
                console.log(val.Customer_Code)
                $('.option-referral').append(`
                    <option value="${val.Customer_Code}" class="id-referral">${val.First_Name} ${val.Last_Name} - ${val.Nama_Perusahaan}</option>
                `)
            })
        }).catch((err)=>{
            console.log(err)
        })
}





const get_product_detail=(product_id)=>{
    $('.box-list-kategori').empty()
    $('.box-list-kategori').css('display','none')
    $('.box-list-kategori').css('display','none')
    $('.modals-product-detail').css('display','block')
    $('.modals-product-detail').attr('src',`../Iframe/itemDetail.html?product_id=${product_id}`)
    console.log( $('.modals-product-detail').attr('src'))
    // $('.modals-lk').remove()
    console.log(product_id, 'product_id 206')
    // render_get_product_detail(product_id)
    // location.assign(`../Iframe/itemDetail.html`)
}

const renderItemBasedOnSubCategory=(subCategory)=>{
    console.log('masuk ke line 174 render item based on sub cat')


    let timerInterval
    Swal.fire({
    title: 'Please Wait!',
    // html: 'I will close in <b></b> milliseconds.',
    timer: 1000,
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
        console.log('I was closed by the timer')
        axios.post(`http://products.sold.co.id/get-product-details?subcategory=${subCategory}`)
        .then((res)=>{
            $('.modals-lk').attr('src',`../WEB/Iframe/kategoriItem.html?subcategory=${subCategory}`)  
            console.log(res.data)
            res.data.map((val,index)=>{
                console.log('masuk ke line 47')
                console.log(val)
                var hargaAwal = parseInt(val.Sell_Price)
                var discount = parseInt(val.Sell_Price * 0.1)
                var hargaTotal = hargaAwal + discount
                $('.box-list-kategori').append(
                `
                    <div class="card-all-item hvr-float-shadow" id="${val.Product_code}" onclick="get_product_detail('${val.Product_Code}')">
                        <img src="${val.Picture_1}" alt="" class="img-all-card">   
                        <div class="card-all-item-list">
                            <p class="limited-text-short">${val.Name}</p>
                            <div class="split-all-item">
                                <div class="item-all-price">
                                    <p>RP. ${hargaTotal}</p>
                                    <p>Rp. ${hargaAwal}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    `
                )
            }) 
            $('.modals-lk').addClass('melihat') // ini bisa hampir
            $('.modals-lk').css('display','block')
            console.log('finish render item based on sub cat')
            
        }).catch((err)=>{
            console.log(err)
        })
    }
    })
   
}

const renderItemBasedOnCategory=(Category)=>{
    // var myFrame = $(".modals-item").contents().find('.box-list-kategori');
    // alert('render item based on category jalan 360')
    let timerInterval
        Swal.fire({
        title: 'Uploading Data',
        // html: 'I will close in <b></b> milliseconds.',
        timer: 1500,
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
            console.log('I was closed by the timer')
            axios.post(`http://products.sold.co.id/get-product-details?Get_ALL_Sub_Category_Based_On_Category=${Category}`)
            .then((res)=>{
                console.log(res.data)
                 res.data.map((val,index)=>{
                    console.log(val)
                    console.log('render jalan 189s')
                    $('.box-list-kategori').append(
                        `
                        <div class="card-lk hvr-float-shadow" onclick="getAllItem('${val.Subcategory}')">
                            <div class="box-img-lk">
                                <img src="${val.Picture_1}" alt="">
                            </div>
                            <p>${val.Subcategory}</p>
                        </div>
                        `
                        )
                    })
                //     myFrame.html(test);
                    $('.modals-lk').addClass('melihat') // ini bisa hampir
                    // $('.modals-lk').attr('src',`../WEB/Iframe/listkategori.html?subcategory=${subcategory}`) 
                    $('.modals-lk').css('display','block')  
                    // alert('render item based on category jalan 407')
                }).catch((err)=>{
                    console.log(err)
                })
        }
        })
    
   
}


function close_all_open_window(){
    $(".force-close-all-command").css("display", "none");
    $('.option-0').removeClass("background_grey");
    $('.option-1').removeClass("background_grey");
    $('.option-2').removeClass("background_grey");
    $('.option-3').removeClass("background_grey");
    $('.option-4').removeClass("background_grey");
    $('.box-delete-success').css('display','none')
    
}

function back_to_home(){
    $(".force-close-all-command-2").css("display", "none");
    $('.main-body').css('display','block')
    $('.active_search').css('top','0px')
}


const render_group_buy=(product_id)=>{


        var option_payment
        axios.post(`http://paymntmthd.sold.co.id/get-all-payment-method`)
        .then((res)=>{          
            option_payment = res.data
             $('.box-groupbuy').append(`
             <div class="group-left" >
                <div class="groupbuy-form">
                    <div class="login-name">
                        <div class="box-name" >
                            <p>Kuantitas Permintaan</p>
                        </div>
                        <input type="text" class="name-form qty_groupbuy_home" placeholder="Kuantitas Permintaan" id="${product_id}" onchange="check_qty(this.value)">
                    </div>
                    <select class="form-select option-payment-gb" aria-label="Default select example">
                        
                    </select>
                    <select class="form-select option-address-gb" aria-label="Default select example" onchange="addressMethod(this)" >
                        <option selected>Select Address Method</option>    
                        <option value="Alamat Terdaftar" class="id-address-gb">Alamat Terdaftar</option>    
                        <option value="Alamat Baru" class="id-address-gb">Alamat Baru</option>           
                    </select>

                    <select class="form-select option-alamat-gb" aria-label="Default select example" onchange="resultAddress(this)" style="display:none">
                        
                    </select>
    
                    <div class="login-name alamat-pengiriman" style="display:none">
                        <div class="box-name" >
                            <p>PENGIRIMAN KE ALAMAT</p>
                        </div>
                        <input type="text" class="name-form" placeholder="alamat Pengiriman" id="alamat_lain">
                    </div>
    
                    <div class="login-name box-pengiriman" >
                        <div class="box-name" >
                            <p>BIAYA PENGIRIMAN</p>
                        </div>
                        <input type="number" class="name-form"  id="total_biaya_pengiriman_gb">
                    </div>
                </div>  
            </div>
                <div class="group-right">
                    <div class="gr-1">
                        <div class="btn-pesan" onclick="payment_groupbuy_home('${product_id}')">
                            <p>Pesan Sekarang!</p>
                            <img src="../img/home.png" alt="" class="icon-home">
                        </div>
                        <div class="box-total-price">
                                <p>Total Price</p>
                                <div class="total-price">
                                    <input type="text" disabled class="name-form total_price_iframe"  id="tp_iframe">
                                
                                </div>
                            </div>
                    </div>
                <div class="gr-2">
                    <div class="box-img-gr">
                        <img src="${res.data.Picture_1}" alt="" class="img-gr">
                    </div>
                </div>
            </div>
             `)
            // alert(res.data)
            axios.post(`http://products.sold.co.id/get-product-details?product_code=${product_id}`)
            .then((res)=>{
                // $('.modals-lk').attr('src',`../WEB/Iframe/groupbuy.html?groupbuy_id=${product_id}`)      
                console.log(res.data)

                option_payment.map((val,index)=>{

                    if(val.Payment_Method_Name === 'transfer'){
                        $('.option-payment-gb').append(`
                            <option id="payment_gb" value="${val.Payment_Method_Name}">${val.Payment_Method_Name}</option> 
                        `)
                    }
                })
                var token = localStorage.getItem('token')
                console.log(token,' ini token 427')
                axios.post(`http://customers.sold.co.id/get-customer-information?Customer_Code=${token}`)
                .then((res)=>{
                    
                    if(res.data.Address_1 !== 'NULL'){
                        $('.option-alamat-gb').append(`
                        <option value="${res.data.Address_1}" id="alamat_gb">${res.data.Address_1}</option> 
                        `)
                    }else if ( res.data.Address_2 !== 'NULL'){
                        $('.option-alamat-gb').append(`
                        <option value="${res.data.Address_2}" id="alamat_gb">${res.data.Address_2}</option> 
                        `)  
                    }else if (res.data.Address_3 !== 'NULL'){
                        $('.option-alamat-gb').append(`
                        <option value="${res.data.Address_3}" id="alamat_gb">${res.data.Address_3}</option> 
                        `) 
                    }else if (res.data.Address_4 !== 'NULL'){
                        $('.option-alamat-gb').append(`
                        <option value="${res.data.Address_4}" id="alamat_gb">${res.data.Address_4}</option> 
                        `) 
                    }else if (res.data.Address_5 !== 'NULL'){
                        $('.option-alamat-gb').append(`
                        <option value="${res.data.Address_5}" id="alamat_gb">${res.data.Address_5}</option> 
                        `) 
                    }else {
                        console.log('masuk ke else')
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

//  SHOW PRODUCT CODE

 const render_get_product_detail=(product_id)=>{
    console.log(product_id, ' ini product id')
    // $('.modals-lk').css('display','none')

    

    axios.post(`http://products.sold.co.id/get-product-details?product_code=${product_id}`)
    .then((res)=>{
    
        item = res.data
        var hargaAwal = parseInt(item.Sell_Price)
        var discount = parseInt(item.Sell_Price * 0.1)
        var hargaTotal = hargaAwal + discount
        console.log(res.data,' 473 axios')
        $('.box-item-detail').empty();
        if(item.GroupBuy_SellPrice == "NULL"){
            $('.box-item-detail').append(
                `
                <div class="box-item-img">
                    <div class="item-img"> 
                        <div class="box-back-detail">
                            <i class="fas fa-chevron-left icon-prev-detail" ></i>
                        </div>
                        <img src="${item.Picture_1}" alt="" class="img-icon">
                        <div class="box-next-detail">
                            <i class="fas fa-chevron-right icon-prev-detail" ></i>
                        </div>
                    </div>
                    
                    <div class="rating-bottom">
                        <div class="star-box">
                         <iframe class="star-iframe"  src="../Iframe/rating-stars/index.html?product_code=${product_id}"></iframe> 
                        </div>          
                    </div>
                </div>
                <div class="item-detail">
                    <div class="detail-1">
                        <div class="item-1">
                            <p>${item.Name}</p>
                        </div>
                        <div class="item-2">
                            <p>Harga Termasuk PPN: Rp.${hargaTotal}</p>
                            <p>Harga dengan pembayaran tempo : *hubungi customer service kami*</p>
                        </div>
                            <ul class="box-add" onclick="addToCart('${item.Product_Code}')">
                                <li>
                                    <p>Add to Cart</p>
                                </li>
                                <li>
                                    <img src="../img/cart.png" alt="" class="img-cart">
                                </li>
                            </ul>
                        <br>
                        <br>
                        <div class="deskripsi">
                            <p>Deskripsi :</p>
                            <p>${item.Description}</p>
                        </div>      
                </div>
                `
            )
        }else{

            console.log(`${item.GroupBuy_SellPrice}`, '531')
            $('.box-item-detail').append(
                `
                <div class="box-item-img">
                    <div class="item-img"> 
                        <div class="box-back-detail">
                            <i class="fas fa-chevron-left icon-prev-detail" ></i>
                        </div>
                        <img src="${item.Picture_1}" alt="" class="img-icon">
                        <div class="box-next-detail">
                            <i class="fas fa-chevron-right icon-prev-detail" ></i>
                        </div>
                    </div>
                    
                    <div class="rating-bottom">
                        <div class="star-box">
                            <iframe class="star-iframe"  src="../Iframe/rating-stars/index.html?product_code=${product_id}"></iframe> 
                        </div>
                    </div>
                </div>
                <div class="item-detail">
                    <div class="detail-1">
                        <div class="item-1">
                            <p>${item.Name}</p>
                        </div>
                        <div class="item-2">
                            <p>Harga Termasuk PPN: <span id="span_harga"> Rp.${hargaTotal} </span> </p>
                            <p>Harga dengan pembayaran tempo : *hubungi customer service kami*</p>
                        </div>
                        <div class="box_share_product">
                            <p>Share This Product</p>
                            <div class="box_ins_share"> 
                                <input type="text" value="ini link nya" disabled class="share_link_input">
                                <input type="text" value="ini link nya" disabled class="share_link_input">
                            </div>
                        </div>
                        <div class="item-4">
                            <p>Harga GROUP BUY DISKON: <span style="color:#37CED5"> Rp.${item.GroupBuy_SellPrice}</span> </p>
                        </div>
                        <div class="box-detail-option">
                            <ul class="box-add" onclick="addToCart('${item.Product_Code}')">
                                <li>
                                    <p>Add to Cart</p>
                                </li>
                                <li>
                                    <img src="../img/cart.png" alt="" class="img-cart">
                                </li>
                            </ul>
                    
                            <div class="box-discount" onclick="groupbuy('${item.Product_Code}')">
                                <div class="add-discount">
                                    <p>Beli dengan diskon GROUP BUY</p>
                                </div>
                            </div>
                    
                        </div>

                        <br>
                        <div class="deskripsi_gb">
                            <p>Deskripsi :</p>
                            <p>${item.Description}</p>
                        </div>
                    </div>
                </div>
                `
            )
        }
        
    }).catch((err)=>{
        console.log(err)
    })
 }



 var idAddress=1
 function addAddress(){
    
    idAddress++
    if(idAddress <=5){
        $('.box-tambah-alamat').append(
            `
            <div class="login-name">
                <div class="box-name">
                    <p>Alamat Lengkap ${idAddress}</p>
                </div>
                <input type="text" class="form-reg-nama" placeholder="Alamat Lengkap ${idAddress}" minlength="4" maxlength="8" id="alamat_lengkap_${idAddress}">
            </div>
            `
        )
    }else {
        idAddress--
    }
}


var idAddressSupp=1
function addAddressSupp(){
   
   idAddressSupp++
   if(idAddressSupp <=5){
       $('.box-tambah-alamat-supplier').append(
           `
           <div class="login-name">
               <div class="box-name">
                   <p>Alamat Lengkap ${idAddressSupp}</p>
               </div>
               <input type="text" class="form-reg-nama" placeholder="Alamat Lengkap ${idAddressSupp}" minlength="4" maxlength="8" id="alamat_lengkap_${idAddressSupp}_supp">
           </div>
           `
       )
   }else {
    idAddressSupp--
   }
}

const newRender_list_hutang=(customer_code)=>{
    const token = localStorage.getItem('token')
    $('.ul_list_hutang').empty()
    axios.post(`http://sales.sold.co.id/get-unpaid-sales-order-per-customer?Customer_Code=${token}`)
    .then((res)=>{
        console.log(res.data)
        res.data.map((val,index)=>{
            console.log(val)
            $('.ul_list_hutang').append(`
                <tr>
                    <td>
                        <p class="limited-text-short" onclick="open_detail_hutang_home('${val.Order_Number}')">${val.Order_Number} </p> 
                    </td>
                    <td >${val.Total_Price}</td>
                    <td >${val.Payment_Method}</td>
                    <td>${val.Shipping_Address}</td>
                    <td >${val.Status}</td>           
                </tr>
            `)
      
        })
        
       
    }).catch((err)=>{
        console.log(err)
    })
}


const open_detail_hutang_home=(order_number)=>{
    // var token = localStorage.getItem('token')
    location.replace(`./detailUnpaidList.html?detail_list_hutang=${order_number}`)
}