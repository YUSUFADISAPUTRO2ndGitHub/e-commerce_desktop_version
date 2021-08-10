

// console.log('axios jalan')

setInterval(() => {
    var dataParse = JSON.parse(localStorage.getItem("itemsInCart"))
    // console.log(dataParse)
    // console.log(dataParse.length)
    if(dataParse != null || dataParse != undefined ){
        $('.cart-counter').css('display','block')
        $('.cart-counter').text(dataParse.length)
    }else {
        // $('.cart-counter').text('0')
        $('.cart-counter').css('display','none')
    }
}, 1000);   
var allData = []


$( document ).ready(function() {
    
    $('.ref-cod').on('change',function(){
        var selectedVal = $('.ref-cod option:selected').val()
        
    })

    // var dataParse = JSON.parse(localStorage.getItem("itemsInCart"))
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
        console.log('error')
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
    render_item_all_category()
    renderOptionSearch()
    // renderSubCategory('ADHESIVE')
    // renderItemBasedOnSubCategory('SEALANT')
}).catch((err)=>{
    console.log(err)
})
}
getAllData()

const renderOptionSearch=()=>{

    var token = localStorage.getItem('token')
        axios.post(`http://products.sold.co.id/get-product-details?Get_ALL_Category=true`)
        .then((res)=>{
            console.log(res.data)
            res.data.map((val,index)=>{
                // if(){
                    if(index<5){
                        $('.header-search-option').append(`
                        <p onclick="getAllItem_fromAllCat('${val.Category}')">${val.Category}</p>
                        `)
                    }
    
                // }
            })

        }).catch((err)=>{
            console.log(err)
        })
    
    
    
}

const get_product_detail_from_main_page=(product_id)=>{

  
    render_get_product_detail(product_id)  
$('.box-delete-success').css('display','block')
$('.modals-product-detail').css('display','block')
$('.close-button').css('display','block')
$('.box_iframe_groupbuy').css('display','block')
$('.modals-product-detail').attr('src',`./Iframe/itemDetail.html?product_id=${product_id}`)
// console.log( $('.modals-product-detail').attr('src'))
// console.log(product_id, 'product_id 206')
}

// RENDER DATA HOME
const renderItemPromo=()=>{
// alert('jalan render promo')
    // $('.box-render-promo-animated').css('display','none')
    // $('.box-render-promo').css('display','flex')
// alert('render itempromo jalan')
    $('.box-render-promo').append(`
        <div class="promo_card">
            <img src="../WEB/img/new_ads.png" alt="" class="ads_samping" onclick="get_product_detail_from_main_page('6900005030114')">
        </div>
    `)
    allData.map((val,index)=>{
        // console.log(allData)
        var hargaAwal = parseInt(val.Sell_Price)
        var discount = parseInt(val.Sell_Price * 0.1)
        var hargaTotal = hargaAwal + discount
        // console.log(hargaTotal)

        var a = 'ASDASDASDASD'
        var b = parseInt(a)
        var c = isNaN(b)
        // console.log(c, 'ini C isnan')
        // console.log(allData)
        // console.log(val)
        // console.log(val == false, ' val == false', val.Sell_Price == 'NULL', ' val.Sell_Price == NULL', val.Sell_Price == 0 , 'val.Sell_Price == 0', val.Sell_Price < 1, 'val.Sell_Price < 1', val.Sell_Price == undefined, 'val.Sell_Price == undefined',val.Sell_Price == null,'val.Sell_Price == null', val.Sell_Price < 1,'val.Sell_Price < 1')
        // if(val == false || val.Sell_Price == 'NULL' || val.Sell_Price == undefined  || val.Sell_Price == null || isNaN(hargaAwal)
        // ){
          
        // }else {
            // console.log('berhasil render')
          
            if(val.GroupBuy_Purchase == 'true' || val.GroupBuy_Purchase == true || val.GroupBuy_Purchase == 'yes'){
                console.log(val)
                console.log(val.GroupBuy_Purchase)
                // console.log('render 169 jalan')
                $('.box-render-promo').append(
                    ` 
                        <div class="card-item hvr-float-shadow new_card_item" data-aos="zoom-in">
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
                                        <img src="./img/badge_groupbuy.png" alt="" class="img-badge-best">
                                    </div>
                                </div>
                            </div>
                        </div>
                        `
                    )
                }
            // }else if (val.Categorize_NEW == 'true'){
            //     $('.box-render-promo').append(
            //         ` 
            //             <div class="card-item hvr-float-shadow new_card_item" data-aos="zoom-in">
            //                 <img src="${val.Picture_1}" alt="" class="img-card" onclick="get_product_detail_from_main_page('${val.Product_Code}')">   
            //                 <div class="card-item-list">
            //                     <p class="limited-text-short">${val.Name}</p>
            //                     <div class="split-item">
            //                         <div class="item-price">
            //                             <p>RP. ${hargaTotal}</p>
            //                             <p>Rp. ${hargaAwal}</p>
            //                         </div>
            //                         <div class="buy-icon" onclick="addToCart('${val.Product_Code}')">
            //                             <img src="./img/cart.png" alt="" class="icon-buy" id="${val.Product_Code}">
            //                             <img src="./img/badge_new.png" alt="" class="img-badge-best">
            //                         </div>
            //                     </div>
            //                 </div>
            //             </div>
            //             `
            //         )
            // }else {
            //     $('.box-render-promo').append(
            //     ` 
            //         <div class="card-item hvr-float-shadow new_card_item" data-aos="zoom-in">
            //             <img src="${val.Picture_1}" alt="" class="img-card" onclick="get_product_detail_from_main_page('${val.Product_Code}')">   
            //             <div class="card-item-list">
            //                 <p class="limited-text-short">${val.Name}</p>
            //                 <div class="split-item">
            //                     <div class="item-price">
            //                         <p>RP. ${hargaTotal}</p>
            //                         <p>Rp. ${hargaAwal}</p>
            //                     </div>
            //                     <div class="buy-icon" onclick="addToCart('${val.Product_Code}')">
            //                         <img src="./img/cart.png" alt="" class="icon-buy" id="${val.Product_Code}">
            //                         <img src="./img/best_seller.png" alt="" class="img-badge-best">
            //                     </div>
            //                 </div>
            //             </div>
            //         </div>
            //         `
            //     )
            // }

        // }
    })
}
const renderItemNew=()=>{
    
    // $('.box-render-promo-animated').css('display','none')
    // $('.box-render-new').css('display','flex')

    allData.map((val,index)=>{
        var hargaAwal = parseInt(val.Sell_Price)
        var discount = parseInt(val.Sell_Price * 0.1)
        var hargaTotal = hargaAwal + discount
    //  console.log(hargaTotal)

    if(val == false || val.Sell_Price == 'NULL' || val.Sell_Price == 0 || val.Sell_Price < 1 ||
    val.Sell_Price == undefined  || val.Sell_Price == null || isNaN(hargaAwal)
    ){
        console.log('gak ke render karna false')
    }else {

        if(val.GroupBuy_Purchase == 'true'){
            
            // $('.box-render-new').append(
            //     ` 
            //         <div class="card-item hvr-float-shadow " data-aos="zoom-in">
            //             <img src="${val.Picture_1}" alt="" class="img-card" onclick="get_product_detail_from_main_page('${val.Product_Code}')">   
            //             <div class="card-item-list">
            //                 <p class="limited-text-short">${val.Name}</p>
            //                 <div class="split-item">
            //                     <div class="item-price">
            //                         <p>RP. ${hargaTotal}</p>
            //                         <p>Rp. ${hargaAwal}</p>
            //                     </div>
            //                     <div class="buy-icon" onclick="addToCart('${val.Product_Code}')">
            //                         <img src="./img/cart.png" alt="" class="icon-buy" id="${val.Product_Code}">
            //                         <img src="./img/badge_groupbuy.png" alt="" class="img-badge-best">
            //                     </div>
            //                 </div>
            //             </div>
            //         </div>
            //         `
            //     )
        }else if (val.Categorize_NEW == 'true'){
            $('.box-render-new').append(
                ` 
                    <div class="card-item hvr-float-shadow " data-aos="zoom-in">
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
                                    <img src="./img/badge_new.png" alt="" class="img-badge-best">
                                </div>
                            </div>
                        </div>
                    </div>
                    `
                )
        }else {
            // $('.box-render-new').append(
            // ` 
            //     <div class="card-item hvr-float-shadow " data-aos="zoom-in">
            //         <img src="${val.Picture_1}" alt="" class="img-card" onclick="get_product_detail_from_main_page('${val.Product_Code}')">   
            //         <div class="card-item-list">
            //             <p class="limited-text-short">${val.Name}</p>
            //             <div class="split-item">
            //                 <div class="item-price">
            //                     <p>RP. ${hargaTotal}</p>
            //                     <p>Rp. ${hargaAwal}</p>
            //                 </div>
            //                 <div class="buy-icon" onclick="addToCart('${val.Product_Code}')">
            //                     <img src="./img/cart.png" alt="" class="icon-buy" id="${val.Product_Code}">
            //                     <img src="./img/best_seller.png" alt="" class="img-badge-best">
            //                 </div>
            //             </div>
            //         </div>
            //     </div>
            //     `
            // )
        }

    }
    })
}
const renderItemAll=()=>{
    
    // $('.box-render-promo-animated').css('display','none')
    // $('.box-render-all').css('display','flex')

    allData.map((val,index)=>{
        // console.log(allData)
        var hargaAwal = parseInt(val.Sell_Price)
        var discount = parseInt(val.Sell_Price * 0.1)
        var hargaTotal = hargaAwal + discount
    //  console.log(hargaTotal)
    if(val == false || val.Sell_Price == 'NULL' || val.Sell_Price == 0 || val.Sell_Price < 1 ||
    val.Sell_Price == undefined  || val.Sell_Price == null || isNaN(hargaAwal)
    ){
        console.log('gak ke render karna false')
    }else {

        if(val.GroupBuy_Purchase == 'true'){
            $('.box-render-all').append(
                ` 
                    <div class="card-item hvr-float-shadow " data-aos="zoom-in">
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
                                    <img src="./img/badge_groupbuy.png" alt="" class="img-badge-best">
                                </div>
                            </div>
                        </div>
                    </div>
                    `
                )
        }else if (val.Categorize_NEW == 'true'){
            $('.box-render-all').append(
                ` 
                    <div class="card-item hvr-float-shadow " data-aos="zoom-in">
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
                                    <img src="./img/badge_new.png" alt="" class="img-badge-best">
                                </div>
                            </div>
                        </div>
                    </div>
                    `
                )
        }else {
            $('.box-render-all').append(
            ` 
                <div class="card-item hvr-float-shadow " data-aos="zoom-in">
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
                                <img src="./img/best_seller.png" alt="" class="img-badge-best">
                            </div>
                        </div>
                    </div>
                </div>
                `
            )
        }

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
            $('.lg_home').append(
                ` 
                <li class="list-group-item category-list get-item close-category " val="${sub}" onclick="findSubCategory('${sub}')" id="id_sub-${sub}">${sub}</li>
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


const getAllItem_fromAllCat=(item)=>{
    console.log(item)
    $(this).scrollTop('.modals-lk')
    $('.close-button').css('display','block')
    $('.modals-lk').css('display','block')
    $('.modals-lk').attr('src',`./Iframe/listkategori.html?subcategory=${item}`)
}
const getAllItem=(item)=>{
    console.log(item)
    // console.log($('.modals-lk'))
    console.log($('.modals-lk').attr('src'))
    // $('.modals-lk').attr('src',`../WEB/Iframe/listkategori.html?subcategory=${item}`)
    location.replace(`./listkategori.html?subcategory=${item}`)
    
}

const findSubCategory=(sub)=>{
    // $('.modals-lk').css('display','block')
    // alert('findsubcategory jalan')
    $('.close-button').css('display','block')
    // $('')
    $('.list-group-item').removeClass('active-cl')
    $(`#id_sub-${sub}`).addClass('active-cl')

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

    var allKurir=[]
    var allProvince=[]
    var allKota =[]
    var allKelurahan=[]
    var allKecamatan=[]
    var allPengiriman=[]
    var allDistrict = []
    var allSub_District = []
    



    var kurir=[]
    var province = []
    var kota = []
    var kelurahan = []
    var kecamatan = []
    var sub_district = []
   


    axios.post(`http://products.sold.co.id/get-product-details?product_code=${product_id}`)
    .then((res)=>{
        var item_product = res.data
        var option_payment
        axios.post(`http://paymntmthd.sold.co.id/get-all-payment-method`)
        .then((res)=>{          
            option_payment = res.data
           

             $('.box-groupbuy').append(`
                <div class="group-left" >
                <div class="groupbuy-form">
                    <div class="new-box-card-kurir-sp-top"> 
                        <div class="new-box-name-2">
                            <p>CART DETAIL</p>
                        </div>               
                        <div class="new-login-name">
                            <div class="new-qty_permintaan_box">
                                <div class="qty_jumlah">
                                    Quantity
                                </div>
                                <input type="text" class="new-kodepos-form qty_groupbuy_home" placeholder="Kuantitas Permintaan" id="${product_id}" onchange="check_qty(this.value)">
                            </div>    
                        </div>  
                        <div class="box_transfer">
                            <div class="box-name">
                                <p>Payment Method</p>
                            </div>
                            <div class="box_for_transfer_card">  
                                <form method="post" class="radio-group form-radio-payment">
                                </form>
                            </div>       
                        </div>
                        <div class="new-qty_permintaan_box">
                            <div class="qty_jumlah">
                                Address Selection
                            </div>
                            <div class="box_address_selection">
                                <div class="box_for_address_card">
                                    <form method="post" class="radio-group-address form-radio-payment">
                                        <div class="form-check form-check-inline">
                                            <!-- <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option3" > -->
                                            <div class="address-card-1 radio_address_card" data-value="Alamat Terdaftar" id="id-address-gb-terdaftar" onclick="addressMethod('id-address-gb-terdaftar','Alamat Terdaftar')" >
                                                <img src="../img/alamat_terdaftar.png" alt="" class="bca_img">
                                            </div>
                                        </div>
                                        <div class="form-check form-check-inline">
                                            <!-- <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option3" > -->
                                            <div class="address-card-1 radio_address_card" data-value="Alamat Lain" id="id-address-gb-baru" onclick="addressMethod('id-address-gb-baru','Alamat Baru')">
                                                <img src="../img/alamat_lain.png" alt="" class="bca_img">
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <div class="new-login-name new-alamat-pengiriman" style="display:none">
                                    <div class="box-name" >
                                        <p>Input New Address</p>
                                    </div>
                                    <input type="text" class="new-kodepos-form sp_alamat_pengiriman_hover" placeholder="alamat Pengiriman" id="alamat_lain">
                                </div>
                                <select class="form-select option-alamat-gb sp_alamat_hover" aria-label="Default select example" onchange="resultAddress(this)" style="display:none">
                                </select>
                            </div>
                            
                        </div>    
                        <div class="login-name alamat-pengiriman" style="display:none">
                            <div class="box-name" >
                                <p>PENGIRIMAN KE ALAMAT</p>
                            </div>
                            <input type="text" class="kodepos-form sp_alamat_pengiriman_hover" placeholder="alamat Pengiriman" id="alamat_lain">
                        </div>
                    </div>
        
                    <div class="new-box-card-kurir-sp"> 
                        <div class="new-card-kurir-sp">
                            <div class="new-name-box-kurir">
                                <div class="box-name" >
                                    <p>Delivery Method</p>
                                </div>        
                                <div class="new-box-kurir">
                                    <form method="post" class="radio-group-delivery form-radio-payment">
                                      
                                    </form>
                                </div>
                            </div>
                            <div class="input-group mb-3 input-card-sp">
                                <div class="input-group-prepend">
                                    <label class="input-group-text" for="inputGroupSelect01">Provinsi</label>
                                </div>
                                <select class="custom-select home_provinsi_hover province-home-gb" id="inputGroupSelect01"  onchange="provinceMethodHome('${product_id}')" >  
                                    <option  selected  class="id-kurir-gb"> Provinsi</option>  
                                </select>
                            </div>
                            <div class="input-group mb-3 input-card-sp">
                                <div class="input-group-prepend">
                                    <label class="input-group-text" for="inputGroupSelect01">Kota</label>
                                </div>
                                <select class="custom-select home_kota_hover kota-home-gb" id="inputGroupSelect01"  onchange="kotaMethodHome('${product_id}')" >  
                                    <option selected  class="id-kurir-gb"> Kota</option>      
                                </select>
                            </div>
                            <div class="input-group mb-3 input-card-sp">
                                <div class="input-group-prepend">
                                    <label class="input-group-text" for="inputGroupSelect01">Kecamatan</label>
                                </div>
                                <select class="custom-select kelurahan_kelurahan_hover kelurahan-home-gb" id="inputGroupSelect01" onchange="kelurahanMethodHome('${product_id}')" >  
                                    <option selected  class="id-kurir-gb">Kelurahan</option>      
                                </select>
                            </div>   
                             
                            
                        </div>
                        <div class="new-card-kurir-sp-bot">              
                            <div class="input-group mb-3 input-card-sp">
                                <div class="input-group-prepend">
                                    <label class="input-group-text" for="inputGroupSelect01">Kelurahan</label>
                                </div>
                                <select class="custom-select home_kecamatan_hover kecamatan-home-gb" id="inputGroupSelect01"  onchange="kecamatanMethodHome('${product_id}')" >  
                                    <option selected  class="id-kurir-gb">Kecamatan</option>      
                                </select>
                            </div>

                            <div class="input-group mb-3 input-card-sp">
                                <div class="input-group-prepend">
                                    <label class="input-group-text" for="inputGroupSelect01">Kode Pos</label>
                                </div>
                                <select class="custom-select kelurahan_kelurahan_hover kodepos-home-gb" id="option-kodepos-gb" onchange="kodeposMethodHome('${product_id}')">  
                                    <option selected  class="id-kodepos-gb">Kode Pos</option>      
                                </select>
                                
                            </div>
                                
                            <div class="input-group mb-3 input-card-sp">
                                <div class="input-group-prepend">
                                    <label class="input-group-text" for="inputGroupSelect01">Pengiriman</label>
                                </div>
                                <select class="custom-select kelurahan_kelurahan_hover pengiriman-home-gb" id="inputGroupSelect01" onchange="pengirimanMethodHome('${product_id}')" >  
                                    <option selected  class="id-pengiriman-gb">Waktu Pengiriman</option>      
                                </select>
                            </div>  

                            <div class="input-group mb-3 input-card-sp">
                                <div class="input-group-prepend">
                                    <label class="input-group-text" for="inputGroupSelect01">Asuransi</label>
                                </div>
                                <select class="custom-select kelurahan_kelurahan_hover asuransi-home-gb" id="inputGroupSelect01" onchange="asuransiMethodHome('${product_id}')" >  
                                    <option selected  class="id-asuransi-gb">Asuransi</option>      
                                </select>
                            </div>  

                            <div class="input-group mb-3 input-card-sp">
                                <div class="input-group-prepend">
                                    <label class="input-group-text" for="inputGroupSelect01">Packing</label>
                                </div>
                                <select class="custom-select kelurahan_kelurahan_hover packing-home-gb" id="inputGroupSelect01" onchange="packingMethodHome('${product_id}')" >  
                                    <option selected  class="id-packing-gb">Packing</option>      
                                </select>
                            </div>  
                            <div class="alert alert-danger" role="alert">
                                Isi ulang semua field!
                            </div>  
                        </div>
                    </div>  
                    <div class="new-box-card-kurir-bot">
                        <div class="new-login-name new-box-pengiriman" >
                            <div class="box-name" >
                                <p>BIAYA PENGIRIMAN</p>
                            </div>
                            <input type="text" class="new-price-form"  id="total_biaya_pengiriman_gb" disabled>
                        </div>
                    </div>
                </div>  
            </div>
            <div class="group-right">
                <div class="gr-2">
                    <div class="box-img-gr">
                         <img src="${item_product.Picture_1}" alt="" class="img-gr">
                    </div>
                </div>
                <div class="new-gr-1">
                    <div class="new-box-card-kurir-right">
                        <div class="new-box-total-price">
                            <p>ORDER SUMMARY</p>
                            <div class="new-total-price">
                                <div class="box-tp">
                                    Total Product
                                </div>
                                <div class="new-detail-product-summary">
                                    <div class="ndps-left">
                                        
                                    </div>
                                    <div class="ndps-right">
                                            
                                    </div>
                                </div>
                                <div class="new-btn-pesan" onclick="payment_groupbuy_home('${product_id}')">
                                    <p>Confirm Order!</p>
                                    <!-- <img src="./img/accounts.png" alt="" class="icon-home"> -->
                                </div>       
                                <!-- <input type="text" disabled class="new-price-form total_price_iframe"  id="tp_iframe">     -->
                            </div>
                        </div>
                    </div>
                </div>    
            </div>
            `)


            //  RENDER KURIR DLL
                get_all_couriers().done(function(response){
                    console.log(response)
                    kurir = response[0]
                    console.log(kurir)
                    // if(kurir.Courier != 'tiki'){
                    //     kurir.Courier = 'tiki'
                    // }
                    allKurir = response
                    get_all_province_from_courier(kurir.Courier,kurir.Courier_Code).done(function(response){
                        province = response[0]
                        allProvince = response
                        console.log(province)
                        get_all_city_from_courier(kurir.Courier,kurir.Courier_Code,province.Province).done(function(response){
                            kota = response[0]
                            allKota = response
                            console.log(kota,' ini kota')
                            get_all_district_from_courier(kurir.Courier,kurir.Courier_Code,kota.City).done(function(response){
                                console.log(response)
                                kelurahan = response[0]
                                district = response[0]
                                allKelurahan = response
                                allDistrict = response
                                console.log(kelurahan,'ini kelurahaan')
                                get_all_subdistrict_from_courier(kurir.Courier,kurir.Courier_Code,district.District).done(function(response){
                                    kecamatan = response
                                    allKecamatan = response
                                    allSub_District = response
                                    // console.log(kecamatan,' ini kecamatan')
                                    // console.log(kecamatan[0].Sub_District)

                                    var Courier_Price_Code_orig = 'CGK01.00'
                                    var packing_type = ''
                                    var berat_product = parseInt(item_product.Weight_KG)
                                    // console.log(item_product,'ini item product')
                                    // console.log(berat_product,' ini berat product')
                                    if(berat_product == 0){
                                        berat_product = 0.1
                                    }
                                    var length = ''
                                    var  width = '' 
                                    var  height = ''
                                    var paket_value = '' 
                                    console.log(allSub_District[0].Courier_Price_Code,' price code dest')
                                    console.log( new_get_shipping_cost_informations(Courier_Price_Code_orig , allKecamatan[0].Courier_Price_Code, packing_type, berat_product, length, width, height, paket_value))
                                    // get_shipping_cost_informations(kurir.Courier,kurir.Courier_Code,province.Province,kota.City,kelurahan.District,kecamatan[0].Sub_District).done(function(response){
                                        new_get_shipping_cost_informations(Courier_Price_Code_orig , allKecamatan[0].Courier_Price_Code, packing_type, berat_product, length, width, height, paket_value).done(function(response){

                                        
                                        allPengiriman = response
                                        console.log(response,' ini shipping cost')
                                        if(allPengiriman){

                                            if(allPengiriman.service != undefined) {
                                                allPengiriman.service.map((val,index)=>{
                                                    console.log(val, 'ini all pengiriman')
                                                    console.log(val.est_day)
                                                    console.log(val.EST_DAY)
                                                    $('.pengiriman-home-gb').append(`
                                                        <option  value="${val.EST_DAY}days ${val.SERVICE} ${val.TARIFF} ${val.DESCRIPTION} " class="${val.TARIFF}">${val.EST_DAY}days ${val.SERVICE} ${val.TARIFF} ${val.DESCRIPTION} </option> 
                                                    `)
                                                })
                                            }
                                            if(allPengiriman.insurance !=undefined){
                                                allPengiriman.insurance.map((val,index)=>{
                                                    // console.log(val, ' ini all pengiriman')
                                                    // console.log(val.est_day)
                                                    // console.log(val.EST_DAY)
                                                    $('.asuransi-home-gb').append(`
                                                        <option  value="type ${val.INSURANCE_TYPE} ${val.INSURANCE_NAME} ${val.INSURANCE_COST}" class="${val.INSURANCE_COST}">${val.INSURANCE_NAME} - RP ${val.INSURANCE_COST} </option> 
                                                    `)
                                                })
                                            }
                                            if(allPengiriman.packing != undefined) {
                                                allPengiriman.packing.map((val,index)=>{
                                                    // console.log(val, ' ini all pengiriman')
                                                    // console.log(val.est_day)
                                                    // console.log(val.EST_DAY)
                                                    $('.packing-home-gb').append(`
                                                        <option  value="${val.PACKING_TYPE}" class="${val.PACKING_FEE}">${val.PACKING_TYPE} - RP ${val.PACKING_FEE} </option> 
                                                    `)
                                                })
                                            }
    
                                        }
                                        
                                        

                                        allKurir.map((val,index)=>{
                                            // console.log(val,'ini val kurir')
                                            // $('.kurir-home-gb').append(`
                                            //     <option  value="${val.Courier}" class="id-kurir-gb">${val.Courier}</option> 
                                            // `)
                                            if(val.Courier == 'tiki'){
                                                $('.radio-group-delivery').append(`
                                                <div class="address-card-1 radio-delivery-card" id="id-kurir-gb-${val.Courier}" data-value="${val.Courier}" onclick="choosing_shipping('id-kurir-gb-${val.Courier}', ${product_id})">
                                                    <img src="../img/tiki_shipping_method.png" alt="" class="bca_img">
                                                </div>
                                                 `)
                                            }else {
                                                $('.radio-group-delivery').append(`
                                                <div class="address-card-1 radio-delivery-card" id="id-kurir-gb-${val.Courier}" data-value="${val.Courier}" onclick="choosing_shipping('id-kurir-gb-${val.Courier}', ${product_id})">
                                                    <img src="../img/vantsing_shipping_method.png" alt="" class="bca_img">
                                                </div>
                                                 `)
                                            }
                                        })
                                        allProvince.map((val,index)=>{
                                            // console.log(val,'ini val province')
                                            $('.province-home-gb').append(`
                                                <option  value="${val.Province}" class="id-province-gb">${val.Province}</option> 
                                            `)
                                        })
                                        allKota.map((val,index)=>{
                                            // console.log(val,'ini val kota')
                                            $('.kota-home-gb').append(`
                                                <option  value="${val.City}" class="id-kota-gb">${val.City}</option> 
                                            `)    
                                        })  
                                        allKecamatan.map((val,index)=>{

                                            if(val.Sub_District == ''){
                                                $('.kecamatan-home-gb').append(`
                                                    <option  value="${val.Sub_District}" class="id-kecamatan-gb">-</option> 
                                                `)
                                            }else {
                                                $('.kecamatan-home-gb').append(`
                                                    <option  value="${val.Sub_District}" class="id-kecamatan-gb">${val.Sub_District}</option> 
                                                `)
                                                $('.kodepos-home-gb').append(`
                                                    <option  value="${val.Zipcode}" class="id-kodepos-gb">${val.Zipcode}</option> 
                                                `)
                                            }
    
                                        })
    
                                        allKelurahan.map((val,index)=>{

                                            if(val.District == ''){
                                                $('.kelurahan-home-gb').append(`
                                                    <option  value="${val.District}" class="id-kelurahan-gb">-</option> 
                                                `)
                                            }else {
                                                $('.kelurahan-home-gb').append(`
                                                    <option  value="${val.District}" class="id-kelurahan-gb">${val.District}</option> 
                                                `)
                                               
                                            }
                                        })
    
                   

                                    })
                                })
                            })
                        })
                    })
                })


            // BATAS RENDER KURIR DLL
            // alert(res.data)
            axios.post(`http://products.sold.co.id/get-product-details?product_code=${product_id}`)
            .then((res)=>{
                // $('.modals-lk').attr('src',`../WEB/Iframe/groupbuy.html?groupbuy_id=${product_id}`)      
                console.log(res.data)

                option_payment.map((val,index)=>{
                    console.log(val,' ini val 1040')
                    if(val.Payment_Method_Name === 'transfer'){
                        // $('.option-payment-gb').append(`
                        //     <option id="payment_gb" value="${val.Payment_Method_Name}">${val.Payment_Method_Name}</option> 
                        // `)
                        $('.radio-group').append(
                            `
                            <div class="form-check form-check-inline "  >
                                <div class="transfer-card-1 radio_payment_method" data-value="${val.Payment_Method_Name}" id="id-payment-gb-${val.Payment_Method_Name}" onclick="choosing_payment_method('id-payment-gb-${val.Payment_Method_Name}', ${product_id})">
                                    <img src="../img/bca_transfer_manual.png" alt="" class="bca_img">
                                </div>
                            </div>
                            `
                        )
                    }
                })
                var token = localStorage.getItem('token')
                console.log(token,' ini token 427')
                axios.post(`http://customers.sold.co.id/get-customer-information?Customer_Code=${token}`)
                .then((res)=>{
                    console.log(res.data)
                    if(res.data){
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
                    }else {
                        swal.fire("Login Terlebih Dahulu", "", "error");
                        var delayInMilliseconds = 1000; //1 second

                        setTimeout(function() {
                        //your code to be executed after 1 second
                        $('.box_iframe_groupbuy',window.parent.document).css('display','none')
                        $('#loginModal',window.parent.document).modal('show')
                        console.log($('#loginModal').modal('show'))
                        }, delayInMilliseconds);
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

    }).catch((err)=>{
        console.log(err)
    })

    
}

//  SHOW PRODUCT CODE

const kurirMethodHome=(kurir,product_id)=>{
    console.log(kurir)
    $('.alert-danger').css('display','none')
    console.log('kurirmethodhome jalan')
    var kurir_pilihan=$('.kurir-home-gb option:selected').val()
    var new_kurir_pilihan = $('.active_delivery_method').attr('data-value')
    var province_pilihan=$('.province-home-gb option:selected').val()
    var kota_pilihan=$('.kota-home-gb option:selected').val()
    var kecamatan_pilihan=$('.kecamatan-home-gb option:selected').val()
    var kelurahan_pilihan=$('.kelurahan-home-gb option:selected').val()
    var kodepos_pilihan = $('.kodepos-home-gb').val()
    var pengiriman_pilihan = $('.pengiriman-home-gb option:selected').val()
    var total_qty_from_user = parseInt($('.qty_groupbuy_home').val())

    var allKurir=[]
    var allProvince=[]
    var allKota =[]
    var allKelurahan=[]
    var allKecamatan=[]
    var allPengiriman=[]
    var allDistrict = []
    var allSub_District = []

    var kurir=[]
    var province = []
    var kota = []
    var kelurahan = []
    var kecamatan = []
    var sub_district = []
    $('.kurir-home-gb').empty()
    $('.province-home-gb').empty()
    $('.kota-home-gb').empty()
    $('.kecamatan-home-gb').empty()
    $('.kelurahan-home-gb').empty()
    // $('.pengiriman-home-gb').empty()

    get_product_detail_func(product_id).done(function(response){
        var item_product = response
        get_all_couriers().done(function(response){
            var dataAllKurir = response
            allKurir = response
            console.log(dataAllKurir,' data all kurir')
            
            var kurir_kode =''
            for(var i=0; i<dataAllKurir.length; i++){
                if(dataAllKurir[i].Courier == new_kurir_pilihan){
                    kurir_kode = dataAllKurir[i].Courier_Code
                }
            }
            console.log(new_kurir_pilihan,' new kurir pilihan')
            console.log(kurir_kode,' kurir_kode')
            get_all_province_from_courier(new_kurir_pilihan,kurir_kode).done(function(response){
                province = response[0]
                allProvince = response
                console.log(province)
                console.log(response)
                get_all_city_from_courier(new_kurir_pilihan,kurir_kode,province.Province).done(function(response){
                    kota = response[0]
                    allKota = response
                    console.log(kota,' ini kota')
                    get_all_district_from_courier(new_kurir_pilihan,kurir_kode,kota.City).done(function(response){
                        kelurahan = response[0]
                        district = response[0]
                        allKelurahan = response
                        allDistrict = response
                        console.log(kelurahan,'ini kelurahaan')
                        get_all_subdistrict_from_courier(new_kurir_pilihan,kurir_kode,district.District).done(function(response){
                            kecamatan = response
                            allKecamatan = response
                            allSub_District = response
                            console.log(kecamatan,' ini kecamatan')
                            console.log(kecamatan[0].Sub_District)
    
                            var Courier_Price_Code_orig = 'CGK01.00'
                            var packing_type = ''
                            var berat_product = parseInt(item_product.Weight_KG)
                            console.log(item_product,'ini item product')
                            console.log(berat_product,' ini berat product')
                            if(berat_product <= 0 || berat_product == null || berat_product == undefined || Number.isNaN(berat_product)){
                                berat_product = 0.1*1.5;
                            }else{
                                berat_product = berat_product*1*1.5;
                            }
                            var length = ''
                            var  width = '' 
                            var  height = ''
                            var paket_value = '' 
                            console.log(allSub_District[0].Courier_Price_Code,' price code dest')
                            console.log( new_get_shipping_cost_informations(Courier_Price_Code_orig , allKecamatan[0].Courier_Price_Code, packing_type, berat_product, length, width, height, paket_value))
                            // get_shipping_cost_informations(kurir.Courier,kurir.Courier_Code,province.Province,kota.City,kelurahan.District,kecamatan[0].Sub_District).done(function(response){
                                var Courier_Price_Code_orig = 'CGK01.00'
                            var packing_type = ''
                            var berat_product = parseInt(item_product.Weight_KG)
                            if(berat_product <= 0 || berat_product == null || berat_product == undefined || Number.isNaN(berat_product)){
                                berat_product = 0.1*1.5;
                            }else{
                                berat_product = berat_product*1*1.5;
                            }
                            var length = ''
                            var  width = '' 
                            var  height = ''
                            var paket_value = '' 
                            new_get_shipping_cost_informations(Courier_Price_Code_orig , allKecamatan[0].Courier_Price_Code, packing_type, berat_product, length, width, height, paket_value).done(function(response){
    
                                
                                allPengiriman = response
                                console.log(response,' ini shipping cost')
                                // $('.radio-group-delivery').empty()
                                $('.kurir-home-gb').empty()
                                // $('.province-home-gb').empty()
                                $('.kota-home-gb').empty() 
                                $('.kelurahan-home-gb').empty()
                                $('.kecamatan-home-gb').empty()
                                $('.pengiriman-home-gb').empty()
                                $('.asuransi-home-gb').empty()
                                $('.packing-home-gb').empty()
                                $('.kodepos-home-gb').empty()

                                $('.province-home-gb').append(`
                                    <option  selected value="id-province-gb" >Provinsi</option> 
                                `)
                                $('.kota-home-gb').append(`
                                    <option  selected class="id-kota-gb"> Kota</option>      
                                `)
                                $('.kelurahan-home-gb').append(`
                                    <option selected  class="id-kelurahan-gb">Kelurahan</option>      
                                `)
                                $('.kecamatan-home-gb').append(`
                                    <option selected  class="id-kecamatan-gb">Kecamatan</option>      
                                `)
                                $('.pengiriman-home-gb').append(`
                                    <option selected  class="id-pengiriman-gb">Waktu Pengiriman</option>      
                                `)
                                $('.asuransi-home-gb').append(`
                                    <option selected  class="id-asuransi-gb">Asuransi</option>      
                                `)
                                $('.packing-home-gb').append(`
                                    <option selected  class="id-packing-gb">Packing</option>      
                                `)
                                $('.kodepos-home-gb').append(`
                                    <option selected  class="id-kodepos-gb">Kode Pos</option>      
                                `)
                                
    
                                // allKurir.map((val,index)=>{
                                //     // console.log(val,'ini val kurir')
                                //     // $('.kurir-home-gb').append(`
                                //     //     <option  value="${val.Courier}" class="id-kurir-gb">${val.Courier}</option> 
                                //     // `)
                                //     $('.radio-group-delivery').append(`
                                //     <div class="address-card-1  id="id-kurir-gb" radio-delivery-card" data-value="${val.Courier}">
                                //         <img src="../img/tiki_shipping_method.png" alt="" class="bca_img">
                                //     </div>
                                // `)
                                // })
                                allProvince.map((val,index)=>{
                                    // console.log(val,'ini val province')
                                    $('.province-home-gb').append(`
                                        <option   value="${val.Province}" class="id-province-gb">${val.Province}</option> 
                                    `)
                                })
                                allKota.map((val,index)=>{
                                    // console.log(val,'ini val kota')
                                    $('.kota-home-gb').append(`
                                        <option   value="${val.City}" class="id-kota-gb">${val.City}</option> 
                                    `)    
                                })  
                                allKecamatan.map((val,index)=>{
    
                                    if(val.Sub_District == ''){
                                        $('.kecamatan-home-gb').append(`
                                            <option  value="${val.Sub_District}" class="id-kecamatan-gb">-</option> 
                                        `)
                                    }else {
                                        $('.kecamatan-home-gb').append(`
                                            <option  value="${val.Sub_District}" class="id-kecamatan-gb">${val.Sub_District}</option> 
                                        `)
                                        $('.kodepos-home-gb').append(`
                                            <option  value="${val.Zipcode}" class="id-kodepos-gb">${val.Zipcode}</option> 
                                        `)
                                    }
    
                                })
    
                                allKelurahan.map((val,index)=>{
    
                                    if(val.District == ''){
                                        $('.kelurahan-home-gb').append(`
                                            <option  value="${val.District}" class="id-kelurahan-gb">-</option> 
                                        `)
                                    }else {
                                        $('.kelurahan-home-gb').append(`
                                            <option  value="${val.District}" class="id-kelurahan-gb">${val.District}</option> 
                                        `)
                                       
                                    }
                                })
    
                                if(allPengiriman){

                                    if(allPengiriman.service != undefined) {
                                        allPengiriman.service.map((val,index)=>{
                                            console.log(val, 'ini all pengiriman')
                                            console.log(val.est_day)
                                            console.log(val.EST_DAY)
                                            $('.pengiriman-home-gb').append(`
                                                <option  value="${val.EST_DAY}days ${val.SERVICE} ${val.TARIFF} ${val.DESCRIPTION} " class="${val.TARIFF}">${val.EST_DAY}days ${val.SERVICE} ${val.TARIFF} ${val.DESCRIPTION} </option> 
                                            `)
                                        })
                                    }
                                    if(allPengiriman.insurance !=undefined){
                                        allPengiriman.insurance.map((val,index)=>{
                                            // console.log(val, ' ini all pengiriman')
                                            // console.log(val.est_day)
                                            // console.log(val.EST_DAY)
                                            $('.asuransi-home-gb').append(`
                                                <option  value="type ${val.INSURANCE_TYPE} ${val.INSURANCE_NAME} ${val.INSURANCE_COST}" class="${val.INSURANCE_COST}">${val.INSURANCE_NAME} - RP ${val.INSURANCE_COST} </option> 
                                            `)
                                        })
                                    }
                                    if(allPengiriman.packing != undefined) {
                                        allPengiriman.packing.map((val,index)=>{
                                            // console.log(val, ' ini all pengiriman')
                                            // console.log(val.est_day)
                                            // console.log(val.EST_DAY)
                                            $('.packing-home-gb').append(`
                                                <option  value="${val.PACKING_TYPE}" class="${val.PACKING_FEE}">${val.PACKING_TYPE} - RP ${val.PACKING_FEE} </option> 
                                            `)
                                        })
                                    }

                                }
    
    
                            })
                        })
                    })
                })
            })
        })
    })
}
const provinceMethodHome=(product_id)=>{
    console.log('kurirmethodhome jalan')
    var kurir_pilihan=$('.kurir-home-gb option:selected').val()
    var province_pilihan=$('.province-home-gb option:selected').val()
    var new_kurir_pilihan = $('.active_delivery_method').attr('data-value')
    var kota_pilihan=$('.kota-home-gb option:selected').val()
    var kecamatan_pilihan=$('.kecamatan-home-gb option:selected').val()
    var kelurahan_pilihan=$('.kelurahan-home-gb option:selected').val()
    var kodepos_pilihan = $('.kodepos-home-gb').val()
    var pengiriman_pilihan = $('.pengiriman-home-gb option:selected').val()
    var total_qty_from_user = parseInt($('.qty_groupbuy_home').val())
    
   
    var allKurir=[]
    var allProvince=[]
    var allKota =[]
    var allKelurahan=[]
    var allKecamatan=[]
    var allPengiriman=[]
    var allDistrict = []
    var allSub_District = []

    var kurir=[]
    var province = []
    var kota = []
    var kelurahan = []
    var kecamatan = []
    var sub_district = []

    var isKurir_pilihan = false
    var isProvince_pilihan = false
    var isKota_pilihan = false
    var isKecamatan_pilihan = false
    var isKelurahan_pilihan = false
    var isQty_pilihan = false

    if(new_kurir_pilihan == undefined || new_kurir_pilihan == 'undefined' || new_kurir_pilihan == null || new_kurir_pilihan.length == 0 || new_kurir_pilihan == 'Kurir'){
        isKurir_pilihan = false
    }else {
        isKurir_pilihan = true
    }
    if(province_pilihan == undefined || province_pilihan == 'undefined' || province_pilihan == null || province_pilihan.length == 0 || province_pilihan == 'Province'){
        isProvince_pilihan = false
    }else {
        isProvince_pilihan = true
    }
    if(total_qty_from_user == undefined || total_qty_from_user == 'undefined' || total_qty_from_user == null || total_qty_from_user.length == 0){
        isQty_pilihan = false
    }else {
        isQty_pilihan = true
    }
    if(isKurir_pilihan && isProvince_pilihan && isQty_pilihan) {
        $('.alert-danger').css('display','none')
        // $('.province-home-gb').empty()
        // $('.kota-home-gb').empty()
        // $('.kecamatan-home-gb').empty()
        // $('.kelurahan-home-gb').empty()
        // $('.pengiriman-home-gb').empty()

        get_product_detail_func(product_id).done(function(response){
        var item_product = response
        get_all_couriers().done(function(response){
            var dataAllKurir = response
            allKurir = response
            console.log(dataAllKurir,' data all kurir')
            
            var kurir_kode =''
            for(var i=0; i<dataAllKurir.length; i++){
                if(dataAllKurir[i].Courier == new_kurir_pilihan){
                    kurir_kode = dataAllKurir[i].Courier_Code
                }
            }
            get_all_province_from_courier(new_kurir_pilihan,kurir_kode).done(function(response){
                province = response[0]
                allProvince = response
                console.log(province)
                get_all_city_from_courier(new_kurir_pilihan,kurir_kode,province_pilihan).done(function(response){
                    kota = response[0]
                    allKota = response
                    console.log(kota,' ini kota')
                    get_all_district_from_courier(new_kurir_pilihan,kurir_kode,kota.City).done(function(response){
                        kelurahan = response[0]
                        district = response[0]
                        allKelurahan = response
                        allDistrict = response
                        console.log(kelurahan,'ini kelurahaan')
                        get_all_subdistrict_from_courier(new_kurir_pilihan,kurir_kode,district.District).done(function(response){
                            kecamatan = response
                            allKecamatan = response
                            allSub_District = response
                            console.log(kecamatan,' ini kecamatan')
                            var Courier_Price_Code_orig = 'CGK01.00'
                            var packing_type = ''
                            var berat_product = parseInt(item_product.Weight_KG)
                            if(berat_product <= 0 || berat_product == null || berat_product == undefined || Number.isNaN(berat_product)){
                                berat_product = 0.1*1.5;
                            }else{
                                berat_product = berat_product*1*1.5;
                            }
                            var length = ''
                            var  width = '' 
                            var  height = ''
                            var paket_value = '' 
                            new_get_shipping_cost_informations(Courier_Price_Code_orig , allKecamatan[0].Courier_Price_Code, packing_type, berat_product, length, width, height, paket_value).done(function(response){
    
                                
                                allPengiriman = response
                                console.log(response,' ini shipping cost')
                                // $('.radio-group-delivery').empty()
                                // $('.kurir-home-gb').empty()
                                // $('.province-home-gb').empty()
                                $('.kota-home-gb').empty() 
                                $('.kelurahan-home-gb').empty()
                                $('.kecamatan-home-gb').empty()
                                $('.pengiriman-home-gb').empty()
                                $('.asuransi-home-gb').empty()
                                $('.packing-home-gb').empty()
                                $('.kodepos-home-gb').empty()

                                // $('.province-home-gb').append(`
                                //     <option   value="id-province-gb" >Province</option> 
                                // `)
                                $('.kota-home-gb').append(`
                                    <option  selected class="id-kota-gb"> Kota</option>      
                                `)
                                $('.kelurahan-home-gb').append(`
                                    <option selected  class="id-kelurahan-gb">Kelurahan</option>      
                                `)
                                $('.kecamatan-home-gb').append(`
                                    <option selected  class="id-kecamatan-gb">Kecamatan</option>      
                                `)
                                $('.pengiriman-home-gb').append(`
                                    <option selected  class="id-pengiriman-gb">Waktu Pengiriman</option>      
                                `)
                                $('.asuransi-home-gb').append(`
                                <option selected  class="id-asuransi-gb">Asuransi</option>      
                                `)
                                $('.packing-home-gb').append(`
                                    <option selected  class="id-packing-gb">Packing</option>      
                                `)
                                $('.kodepos-home-gb').append(`
                                    <option selected  class="id-kodepos-gb">Kode Pos</option>      
                                `)
                                

                                
    
                                // allKurir.map((val,index)=>{
                                //     // console.log(val,'ini val kurir')
                                //     // $('.kurir-home-gb').append(`
                                //     //     <option  value="${val.Courier}" class="id-kurir-gb">${val.Courier}</option> 
                                //     // `)
                                //     $('.radio-group-delivery').append(`
                                //     <div class="address-card-1  id="id-kurir-gb" radio-delivery-card" data-value="${val.Courier}">
                                //         <img src="../img/tiki_shipping_method.png" alt="" class="bca_img">
                                //     </div>
                                // `)
                                // })
                                // allProvince.map((val,index)=>{
                                //     // console.log(val,'ini val province')
                                //     $('.province-home-gb').append(`
                                //         <option   value="${val.Province}" class="id-province-gb">${val.Province}</option> 
                                //     `)
                                // })
                                allKota.map((val,index)=>{
                                    // console.log(val,'ini val kota')
                                    $('.kota-home-gb').append(`
                                        <option  value="${val.City}" class="id-kota-gb">${val.City}</option> 
                                    `)    
                                })  
                                allKecamatan.map((val,index)=>{
    
                                    if(val.Sub_District == ''){
                                        $('.kecamatan-home-gb').append(`
                                            <option  value="${val.Sub_District}" class="id-kecamatan-gb">-</option> 
                                        `)
                                    }else {
                                        $('.kecamatan-home-gb').append(`
                                            <option  value="${val.Sub_District}" class="id-kecamatan-gb">${val.Sub_District}</option> 
                                        `)
                                        $('.kodepos-home-gb').append(`
                                            <option  value="${val.Zipcode}" class="id-kodepos-gb">${val.Zipcode}</option> 
                                        `)
                                    }
    
                                })
    
                                allKelurahan.map((val,index)=>{
    
                                    if(val.District == ''){
                                        $('.kelurahan-home-gb').append(`
                                            <option  value="${val.District}" class="id-kelurahan-gb">-</option> 
                                        `)
                                    }else {
                                        $('.kelurahan-home-gb').append(`
                                            <option  value="${val.District}" class="id-kelurahan-gb">${val.District}</option> 
                                        `)
                                       
                                    }
                                })
    
                                if(allPengiriman){

                                    if(allPengiriman.service != undefined) {
                                        allPengiriman.service.map((val,index)=>{
                                            console.log(val, 'ini all pengiriman')
                                            console.log(val.est_day)
                                            console.log(val.EST_DAY)
                                            $('.pengiriman-home-gb').append(`
                                                <option  value="${val.EST_DAY}days ${val.SERVICE} ${val.TARIFF} ${val.DESCRIPTION} " class="${val.TARIFF}">${val.EST_DAY}days ${val.SERVICE} ${val.TARIFF} ${val.DESCRIPTION} </option> 
                                            `)
                                        })
                                    }
                                    if(allPengiriman.insurance !=undefined){
                                        allPengiriman.insurance.map((val,index)=>{
                                            // console.log(val, ' ini all pengiriman')
                                            // console.log(val.est_day)
                                            // console.log(val.EST_DAY)
                                            $('.asuransi-home-gb').append(`
                                                <option  value="type ${val.INSURANCE_TYPE} ${val.INSURANCE_NAME} ${val.INSURANCE_COST}" class="${val.INSURANCE_COST}">${val.INSURANCE_NAME} - RP ${val.INSURANCE_COST} </option> 
                                            `)
                                        })
                                    }
                                    if(allPengiriman.packing != undefined) {
                                        allPengiriman.packing.map((val,index)=>{
                                            // console.log(val, ' ini all pengiriman')
                                            // console.log(val.est_day)
                                            // console.log(val.EST_DAY)
                                            $('.packing-home-gb').append(`
                                                <option  value="${val.PACKING_TYPE}" class="${val.PACKING_FEE}">${val.PACKING_TYPE} - RP ${val.PACKING_FEE} </option> 
                                            `)
                                        })
                                    }

                                }
    
    
                            })
                        })
                    })
                })
            })
        })
        }) 
    
    }else {
        swal.fire("Ada field yang belum di isi", "", "error");
        $('.alert-danger').css('display','flex')
        render_all_kurir_before_choosing(product_id)

        console.log(isKurir_pilihan, ' kurir pilihan')
        console.log(isKota_pilihan,' kota pilihan ')
        console.log(isProvince_pilihan, ' province pilihan')
        console.log(isKelurahan_pilihan, ' kelurahan pilihan')
        console.log(isKecamatan_pilihan, ' kecamatan pilihan')
        console.log(isQty_pilihan, ' qty pilihan')
    }
    
}
const kotaMethodHome=(product_id)=>{
    console.log('kurirmethodhome jalan')
    var kurir_pilihan=$('.kurir-home-gb option:selected').val()
    var province_pilihan=$('.province-home-gb option:selected').val()
    var kota_pilihan=$('.kota-home-gb option:selected').val()
    var kecamatan_pilihan=$('.kecamatan-home-gb option:selected').val()
    var kelurahan_pilihan=$('.kelurahan-home-gb option:selected').val()
    var kodepos_pilihan = $('.kodepos-home-gb').val()
    var pengiriman_pilihan = $('.pengiriman-home-gb option:selected').val()
    var total_qty_from_user = parseInt($('.qty_groupbuy_home').val())
    var new_kurir_pilihan = $('.active_delivery_method').attr('data-value')

  
    var allKurir=[]
    var allProvince=[]
    var allKota =[]
    var allKelurahan=[]
    var allKecamatan=[]
    var allPengiriman=[]
    var allDistrict = []
    var allSub_District = []

    var kurir=[]
    var province = []
    var kota = []
    var kelurahan = []
    var kecamatan = []
    var sub_district = []

    var isKurir_pilihan = false
    var isProvince_pilihan = false
    var isKota_pilihan = false
    var isKecamatan_pilihan = false
    var isKelurahan_pilihan = false
    var isQty_pilihan = false

    
    if(total_qty_from_user == undefined || total_qty_from_user == 'undefined' || total_qty_from_user == null || total_qty_from_user.length == 0){
        isQty_pilihan = false
    }else {
        isQty_pilihan = true
    }
    if(new_kurir_pilihan == undefined || new_kurir_pilihan == 'undefined' || new_kurir_pilihan == null || new_kurir_pilihan.length == 0 || new_kurir_pilihan == 'Kurir'){
        isnew_kurir_pilihan = false
    }else {
        isKurir_pilihan = true
    }
    if(province_pilihan == undefined || province_pilihan == 'undefined' || province_pilihan == null || province_pilihan.length == 0 || province_pilihan == 'Provinsi'){
        isProvince_pilihan = false
    }else {
        isProvince_pilihan = true
    }
    if(kota_pilihan == undefined || kota_pilihan == 'undefined' || kota_pilihan == null || kota_pilihan.length == 0 || kota_pilihan == 'Kota'){
        isKota_pilihan = false
    }else {
        isKota_pilihan = true
    }

    if(isKurir_pilihan && isKota_pilihan && isProvince_pilihan && isQty_pilihan) {
        console.log('masuk ke if 1279')
        $('.alert-danger').css('display','none')
        // $('.kota-home-gb').empty()
        // $('.kecamatan-home-gb').empty()
        // $('.kelurahan-home-gb').empty()
        // $('.pengiriman-home-gb').empty()

        get_product_detail_func(product_id).done(function(response){
            var item_product = response
            get_all_couriers().done(function(response){
                var dataAllKurir = response
                allKurir = response
                console.log(dataAllKurir,' data all kurir')
                
                var kurir_kode =''
                for(var i=0; i<dataAllKurir.length; i++){
                    if(dataAllKurir[i].Courier == new_kurir_pilihan){
                        kurir_kode = dataAllKurir[i].Courier_Code
                    }
                }
                get_all_province_from_courier(new_kurir_pilihan,kurir_kode).done(function(response){
                    province = response[0]
                    allProvince = response
                    console.log(province)
                    get_all_city_from_courier(new_kurir_pilihan,kurir_kode,province_pilihan).done(function(response){
                        kota = response[0]
                        allKota = response
                        console.log(kota,' ini kota')
                        get_all_district_from_courier(new_kurir_pilihan,kurir_kode,kota_pilihan).done(function(response){
                            kelurahan = response[0]
                            district = response[0]
                            allKelurahan = response
                            console.log(kelurahan,'ini kelurahaan')
                            get_all_subdistrict_from_courier(new_kurir_pilihan,kurir_kode,district.District).done(function(response){
                                kecamatan = response
                                allKecamatan = response
                                var Courier_Price_Code_orig = 'CGK01.00'
                                var packing_type = ''
                                var berat_product = parseInt(item_product.Weight_KG)
                                if(berat_product <= 0 || berat_product == null || berat_product == undefined || Number.isNaN(berat_product)){
                                    berat_product = 0.1*1.5;
                                }else{
                                    berat_product = berat_product*1*1.5;
                                }
                                var length = ''
                                var  width = '' 
                                var  height = ''
                                var paket_value = '' 
                                console.log(kecamatan,' ini kecamatan')
                                new_get_shipping_cost_informations(Courier_Price_Code_orig , allKecamatan[0].Courier_Price_Code, packing_type, berat_product, length, width, height, paket_value).done(function(response){
    
                                
                                    allPengiriman = response
                                    console.log(response,' ini shipping cost')
                                    // $('.radio-group-delivery').empty()
                                    $('.kurir-home-gb').empty()
                                    // $('.province-home-gb').empty()
                                    // $('.kota-home-gb').empty() 
                                    $('.kelurahan-home-gb').empty()
                                    $('.kecamatan-home-gb').empty()
                                    $('.pengiriman-home-gb').empty()
                                    $('.asuransi-home-gb').empty()
                                    $('.packing-home-gb').empty()
                                    $('.kodepos-home-gb').empty()
    
                                    // $('.province-home-gb').append(`
                                    //     <option   value="id-province-gb" >Province</option> 
                                    // `)
                                    // $('.kota-home-gb').append(`
                                    //     <option   class="id-kota-gb"> Kota</option>      
                                    // `)
                                    $('.kelurahan-home-gb').append(`
                                        <option selected  class="id-kelurahan-gb">Kelurahan</option>      
                                    `)
                                    $('.kecamatan-home-gb').append(`
                                        <option selected  class="id-kecamatan-gb">Kecamatan</option>      
                                    `)
                                    $('.pengiriman-home-gb').append(`
                                        <option selected  class="id-pengiriman-gb">Waktu Pengiriman</option>      
                                    `)
                                    $('.asuransi-home-gb').append(`
                                    <option selected  class="id-asuransi-gb">Asuransi</option>      
                                    `)
                                    $('.packing-home-gb').append(`
                                        <option selected  class="id-packing-gb">Packing</option>      
                                    `)
                                    $('.kodepos-home-gb').append(`
                                        <option selected  class="id-kodepos-gb">Kode Pos</option>      
                                    `)
    
                                    
        
                                    // allKurir.map((val,index)=>{
                                    //     // console.log(val,'ini val kurir')
                                    //     // $('.kurir-home-gb').append(`
                                    //     //     <option  value="${val.Courier}" class="id-kurir-gb">${val.Courier}</option> 
                                    //     // `)
                                    //     $('.radio-group-delivery').append(`
                                    //     <div class="address-card-1  id="id-kurir-gb" radio-delivery-card" data-value="${val.Courier}">
                                    //         <img src="../img/tiki_shipping_method.png" alt="" class="bca_img">
                                    //     </div>
                                    // `)
                                    // })
                                    // allProvince.map((val,index)=>{
                                    //     // console.log(val,'ini val province')
                                    //     $('.province-home-gb').append(`
                                    //         <option  selected value="${val.Province}" class="id-province-gb">${val.Province}</option> 
                                    //     `)
                                    // })
                                    // allKota.map((val,index)=>{
                                    //     // console.log(val,'ini val kota')
                                    //     $('.kota-home-gb').append(`
                                    //         <option  selected value="${val.City}" class="id-kota-gb">${val.City}</option> 
                                    //     `)    
                                    // })  
                                    allKecamatan.map((val,index)=>{
        
                                        if(val.Sub_District == ''){
                                            $('.kecamatan-home-gb').append(`
                                                <option  value="${val.Sub_District}" class="id-kecamatan-gb">-</option> 
                                            `)
                                        }else {
                                            $('.kecamatan-home-gb').append(`
                                                <option  value="${val.Sub_District}" class="id-kecamatan-gb">${val.Sub_District}</option> 
                                            `)
                                            $('.kodepos-home-gb').append(`
                                                <option  value="${val.Zipcode}" class="id-kodepos-gb">${val.Zipcode}</option> 
                                            `)
                                        }
        
                                    })
        
                                    allKelurahan.map((val,index)=>{
        
                                        if(val.District == ''){
                                            $('.kelurahan-home-gb').append(`
                                                <option  value="${val.District}" class="id-kelurahan-gb">-</option> 
                                            `)
                                        }else {
                                            $('.kelurahan-home-gb').append(`
                                                <option  value="${val.District}" class="id-kelurahan-gb">${val.District}</option> 
                                            `)
                                           
                                        }
                                    })
        
                                    if(allPengiriman){

                                        if(allPengiriman.service != undefined) {
                                            allPengiriman.service.map((val,index)=>{
                                                console.log(val, 'ini all pengiriman')
                                                console.log(val.est_day)
                                                console.log(val.EST_DAY)
                                                $('.pengiriman-home-gb').append(`
                                                    <option  value="${val.EST_DAY}days ${val.SERVICE} ${val.TARIFF} ${val.DESCRIPTION} " class="${val.TARIFF}">${val.EST_DAY}days ${val.SERVICE} ${val.TARIFF} ${val.DESCRIPTION} </option> 
                                                `)
                                            })
                                        }
                                        if(allPengiriman.insurance !=undefined){
                                            allPengiriman.insurance.map((val,index)=>{
                                                // console.log(val, ' ini all pengiriman')
                                                // console.log(val.est_day)
                                                // console.log(val.EST_DAY)
                                                $('.asuransi-home-gb').append(`
                                                    <option  value="type ${val.INSURANCE_TYPE} ${val.INSURANCE_NAME} ${val.INSURANCE_COST}" class="${val.INSURANCE_COST}">${val.INSURANCE_NAME} - RP ${val.INSURANCE_COST} </option> 
                                                `)
                                            })
                                        }
                                        if(allPengiriman.packing != undefined) {
                                            allPengiriman.packing.map((val,index)=>{
                                                // console.log(val, ' ini all pengiriman')
                                                // console.log(val.est_day)
                                                // console.log(val.EST_DAY)
                                                $('.packing-home-gb').append(`
                                                    <option  value="${val.PACKING_TYPE}" class="${val.PACKING_FEE}">${val.PACKING_TYPE} - RP ${val.PACKING_FEE} </option> 
                                                `)
                                            })
                                        }

                                    }
        
        
                                })
                            })
                        })
                    })
                })
            })
        })
    }else {
        console.log('masuk ke else 1370')
        swal.fire("Ada field yang belum di isi", "", "error");
        $('.alert-danger').css('display','flex')
        render_all_kurir_before_choosing(render_all_kurir_before_choosing)

        console.log(isKurir_pilihan, ' kurir pilihan')
        console.log(isKota_pilihan,' kota pilihan ')
        console.log(isProvince_pilihan, ' province pilihan')
        console.log(isKelurahan_pilihan, ' kelurahan pilihan')
        console.log(isKecamatan_pilihan, ' kecamatan pilihan')
        console.log(isQty_pilihan, ' qty pilihan')
    }
    
}
const kelurahanMethodHome=(product_id)=>{
    console.log('kurirmethodhome jalan')
    var kurir_pilihan=$('.kurir-home-gb option:selected').val()
    var province_pilihan=$('.province-home-gb option:selected').val()
    var kota_pilihan=$('.kota-home-gb option:selected').val()
    var kecamatan_pilihan=$('.kecamatan-home-gb option:selected').val()
    var kelurahan_pilihan=$('.kelurahan-home-gb option:selected').val()
    var kodepos_pilihan = $('.kodepos-home-gb').val()
    var pengiriman_pilihan = $('.pengiriman-home-gb option:selected').val()
    var total_qty_from_user = parseInt($('.qty_groupbuy_home').val())
    var new_kurir_pilihan = $('.active_delivery_method').attr('data-value')
    
    console.log(kurir_pilihan,' ini kurir pilihan kelurahan method')
    console.log(province_pilihan,' ini province pilihan kelurahan method')
    console.log(kota_pilihan,' ini kota pilihan kelurahan method')
    console.log(kelurahan_pilihan,' kelurahan kurir pilihan kelurahan method')
    

    var allKurir=[]
    var allProvince=[]
    var allKota =[]
    var allKelurahan=[]
    var allKecamatan=[]
    var allPengiriman=[]

    var kurir=[]
    var province = []
    var kota = []
    var kelurahan = []
    var kecamatan = []
    
    var isKurir_pilihan = false
    var isProvince_pilihan = false
    var isKota_pilihan = false
    var isKecamatan_pilihan = false
    var isKelurahan_pilihan = false
    var isQty_pilihan = false

    if( kelurahan_pilihan == undefined || kelurahan_pilihan == null || kelurahan_pilihan == 'NULL' || kelurahan_pilihan == 'undefined'){
        console.log('masuk ke if kelurahan pilihan')
        isKelurahan_pilihan = false
        kelurahan_pilihan = ''
    }else {
        isKelurahan_pilihan = true

    }
    // if(kecamatan_pilihan == undefined || kecamatan_pilihan == null || kecamatan_pilihan == 'NULL' || kecamatan_pilihan == 'undefined'){
    //     console.log('masuk ke if kecamatan pilihan')
    //      kecamatan_pilihan = ''
    //      isKecamatan_pilihan = true
    //  }  

    if(new_kurir_pilihan == undefined || new_kurir_pilihan == 'undefined' || new_kurir_pilihan == null || new_kurir_pilihan.length == 0 || new_kurir_pilihan == 'Kurir'){
        isKurir_pilihan = false
    }else {
        isKurir_pilihan = true
    }
    if(total_qty_from_user == undefined || total_qty_from_user == 'undefined' || total_qty_from_user == null || total_qty_from_user.length == 0){
        isQty_pilihan = false
    }else {
        isQty_pilihan = true
    }

    if(province_pilihan == undefined || province_pilihan == 'undefined' || province_pilihan == null || province_pilihan.length == 0 || province_pilihan == 'Province'){
        isProvince_pilihan = false
    }else {
        isProvince_pilihan = true
    }
    if(kota_pilihan == undefined || kota_pilihan == 'undefined' || kota_pilihan == null || kota_pilihan.length == 0 || kota_pilihan == 'Kota'){
        isKota_pilihan = false
    }else {
        isKota_pilihan = true
    }

    if(isKurir_pilihan && isKota_pilihan && isProvince_pilihan && isKelurahan_pilihan  && isQty_pilihan) {
        console.log(isKurir_pilihan, ' kurir pilihan')
        console.log(isKota_pilihan,' kota pilihan ')
        console.log(isProvince_pilihan, ' province pilihan')
        console.log(isKelurahan_pilihan, ' kelurahan pilihan')
        console.log(isKecamatan_pilihan, ' kecamatan pilihan')
        console.log(isQty_pilihan, ' qty pilihan')
        $('.alert-danger').css('display','none')
   

        get_product_detail_func(product_id).done(function(response){
            var item_product = response
            get_all_couriers().done(function(response){
                var dataAllKurir = response
                allKurir = response
                console.log(dataAllKurir,' data all kurir')
                
                var kurir_kode =''
                for(var i=0; i<dataAllKurir.length; i++){
                    if(dataAllKurir[i].Courier == new_kurir_pilihan){
                        kurir_kode = dataAllKurir[i].Courier_Code
                    }
                }
                get_all_province_from_courier(new_kurir_pilihan,kurir_kode).done(function(response){
                    province = response[0]
                    allProvince = response
                    console.log(province)
                    get_all_city_from_courier(new_kurir_pilihan,kurir_kode,province_pilihan).done(function(response){
                        kota = response[0]
                        allKota = response
                        console.log(kota,' ini kota')
                        get_all_district_from_courier(new_kurir_pilihan,kurir_kode,kota_pilihan).done(function(response){
                            kelurahan = response[0]
                            allKelurahan = response
                            console.log(kelurahan,'ini kelurahaan')
                            get_all_subdistrict_from_courier(new_kurir_pilihan,kurir_kode,kelurahan_pilihan).done(function(response){
                                kecamatan = response
                                allKecamatan = response
                                console.log(kecamatan,' ini kecamatan')
                                var Courier_Price_Code_orig = 'CGK01.00'
                                var packing_type = ''
                                var berat_product = parseInt(item_product.Weight_KG)
                                if(berat_product <= 0 || berat_product == null || berat_product == undefined || Number.isNaN(berat_product)){
                                    berat_product = 0.1*1.5;
                                }else{
                                    berat_product = berat_product*1*1.5;
                                }
                                var length = ''
                                var  width = '' 
                                var  height = ''
                                var paket_value = '' 
                                console.log(kecamatan,' ini kecamatan')
                                new_get_shipping_cost_informations(Courier_Price_Code_orig , allKecamatan[0].Courier_Price_Code, packing_type, berat_product, length, width, height, paket_value).done(function(response){
    
                                
                                    allPengiriman = response
                                    console.log(response,' ini shipping cost')
                                    // $('.radio-group-delivery').empty()
                                    // $('.kurir-home-gb').empty()
                                    // $('.province-home-gb').empty()
                                    // $('.kota-home-gb').empty() 
                                    // $('.kelurahan-home-gb').empty()
                                    $('.kecamatan-home-gb').empty()
                                    $('.pengiriman-home-gb').empty()
                                    $('.asuransi-home-gb').empty()
                                    $('.packing-home-gb').empty()
                                    $('.kodepos-home-gb').empty()
    
                                    // $('.province-home-gb').append(`
                                    //     <option   value="id-province-gb" >Province</option> 
                                    // `)
                                    // $('.kota-home-gb').append(`
                                    //     <option   class="id-kota-gb"> Kota</option>      
                                    // `)
                                    // $('.kelurahan-home-gb').append(`
                                    //     <option   class="id-kelurahan-gb">Kelurahan</option>      
                                    // `)
                                    $('.kecamatan-home-gb').append(`
                                        <option selected  class="id-kecamatan-gb">Kecamatan</option>      
                                    `)
                                    $('.pengiriman-home-gb').append(`
                                        <option selected  class="id-pengiriman-gb">Waktu Pengiriman</option>      
                                    `)
                                    $('.asuransi-home-gb').append(`
                                        <option selected  class="id-asuransi-gb">Asuransi</option>      
                                    `)
                                    $('.packing-home-gb').append(`
                                        <option selected  class="id-packing-gb">Packing</option>      
                                    `)
                                    $('.kodepos-home-gb').append(`
                                        <option selected  class="id-kodepos-gb">Kode Pos</option>      
                                    `)
    
                                    
        
                                    // allKurir.map((val,index)=>{
                                    //     // console.log(val,'ini val kurir')
                                    //     // $('.kurir-home-gb').append(`
                                    //     //     <option  value="${val.Courier}" class="id-kurir-gb">${val.Courier}</option> 
                                    //     // `)
                                    //     $('.radio-group-delivery').append(`
                                    //     <div class="address-card-1  id="id-kurir-gb" radio-delivery-card" data-value="${val.Courier}">
                                    //         <img src="../img/tiki_shipping_method.png" alt="" class="bca_img">
                                    //     </div>
                                    // `)
                                    // })
                                    // allProvince.map((val,index)=>{
                                    //     // console.log(val,'ini val province')
                                    //     $('.province-home-gb').append(`
                                    //         <option  selected value="${val.Province}" class="id-province-gb">${val.Province}</option> 
                                    //     `)
                                    // })
                                    // allKota.map((val,index)=>{
                                    //     // console.log(val,'ini val kota')
                                    //     $('.kota-home-gb').append(`
                                    //         <option  selected value="${val.City}" class="id-kota-gb">${val.City}</option> 
                                    //     `)    
                                    // })  
                                    allKecamatan.map((val,index)=>{
        
                                        if(val.Sub_District == ''){
                                            $('.kecamatan-home-gb').append(`
                                                <option  value="${val.Sub_District}" class="id-kecamatan-gb">-</option> 
                                            `)
                                        }else {
                                            $('.kecamatan-home-gb').append(`
                                                <option  value="${val.Sub_District}" class="id-kecamatan-gb">${val.Sub_District}</option> 
                                            `)
                                            $('.kodepos-home-gb').append(`
                                                <option  value="${val.Zipcode}" class="id-kodepos-gb">${val.Zipcode}</option> 
                                            `)
                                        }
        
                                    })
        
                                    // allKelurahan.map((val,index)=>{
        
                                    //     if(val.District == ''){
                                    //         $('.kelurahan-home-gb').append(`
                                    //             <option selected value="${val.District}" class="id-kelurahan-gb">-</option> 
                                    //         `)
                                    //     }else {
                                    //         $('.kelurahan-home-gb').append(`
                                    //             <option selected  value="${val.District}" class="id-kelurahan-gb">${val.District}</option> 
                                    //         `)
                                           
                                    //     }
                                    // })
        
                                    if(allPengiriman){

                                        if(allPengiriman.service != undefined) {
                                            allPengiriman.service.map((val,index)=>{
                                                console.log(val, 'ini all pengiriman')
                                                console.log(val.est_day)
                                                console.log(val.EST_DAY)
                                                $('.pengiriman-home-gb').append(`
                                                    <option  value="${val.EST_DAY}days ${val.SERVICE} ${val.TARIFF} ${val.DESCRIPTION} " class="${val.TARIFF}">${val.EST_DAY}days ${val.SERVICE} ${val.TARIFF} ${val.DESCRIPTION} </option> 
                                                `)
                                            })
                                        }
                                        if(allPengiriman.insurance !=undefined){
                                            allPengiriman.insurance.map((val,index)=>{
                                                // console.log(val, ' ini all pengiriman')
                                                // console.log(val.est_day)
                                                // console.log(val.EST_DAY)
                                                $('.asuransi-home-gb').append(`
                                                    <option  value="type ${val.INSURANCE_TYPE} ${val.INSURANCE_NAME} ${val.INSURANCE_COST}" class="${val.INSURANCE_COST}">${val.INSURANCE_NAME} - RP ${val.INSURANCE_COST} </option> 
                                                `)
                                            })
                                        }
                                        if(allPengiriman.packing != undefined) {
                                            allPengiriman.packing.map((val,index)=>{
                                                // console.log(val, ' ini all pengiriman')
                                                // console.log(val.est_day)
                                                // console.log(val.EST_DAY)
                                                $('.packing-home-gb').append(`
                                                    <option  value="${val.PACKING_TYPE}" class="${val.PACKING_FEE}">${val.PACKING_TYPE} - RP ${val.PACKING_FEE} </option> 
                                                `)
                                            })
                                        }

                                    }
        
        
                                })
                            })
                        })
                    })
                })
            })
        })
    }else {
        swal.fire("Ada field yang belum di isi", "", "error");
        $('.alert-danger').css('display','flex')
    
        render_all_kurir_before_choosing(render_all_kurir_before_choosing)

        console.log(isKurir_pilihan, ' kurir pilihan')
        console.log(isKota_pilihan,' kota pilihan ')
        console.log(isProvince_pilihan, ' province pilihan')
        console.log(isKelurahan_pilihan, ' kelurahan pilihan')
        console.log(isKecamatan_pilihan, ' kecamatan pilihan')
        console.log(isQty_pilihan, ' qty pilihan')
    }


}
const kecamatanMethodHome=(product_id)=>{
    console.log('kecamatanMethodHome jalan')

    var kurir_pilihan=$('.kurir-home-gb option:selected').val()
    var province_pilihan=$('.province-home-gb option:selected').val()
    var kota_pilihan=$('.kota-home-gb option:selected').val()
    var kecamatan_pilihan=$('.kecamatan-home-gb option:selected').val()
    var kelurahan_pilihan=$('.kelurahan-home-gb option:selected').val()
    var kodepos_pilihan = $('.kodepos-home-gb').val()
    var pengiriman_pilihan = $('.pengiriman-home-gb option:selected').val()
    var total_qty_from_user = parseInt($('.qty_groupbuy_home').val())
    var all_biaya_pengiriman = []
    var new_kurir_pilihan = $('.active_delivery_method').attr('data-value')

    var split_pengiriman = pengiriman_pilihan.split('-')
    var days_pengiriman = split_pengiriman[0]
    var kode_pengiriman = split_pengiriman[1]

    var isKurir_pilihan = false
    var isProvince_pilihan = false
    var isKota_pilihan = false
    var isKecamatan_pilihan = false
    var isKelurahan_pilihan = false
    var isQty_pilihan = false
    
    console.log(kecamatan_pilihan == undefined, ' testing undefined kecamatan pilihan 969',  kecamatan_pilihan == 'undefined')
    if(kecamatan_pilihan == undefined || kecamatan_pilihan == null || kecamatan_pilihan == 'NULL' || kecamatan_pilihan == 'undefined'){
       console.log('masuk ke if kecamatan pilihan')
        kecamatan_pilihan = ''
        isKecamatan_pilihan = false
    }   else{
        isKecamatan_pilihan = true
    }
    if( kelurahan_pilihan == undefined || kelurahan_pilihan == null || kelurahan_pilihan == 'NULL' || kelurahan_pilihan == 'undefined'){
        console.log('masuk ke if kelurahan pilihan')
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


    if(isKurir_pilihan && isKota_pilihan && isProvince_pilihan && isKelurahan_pilihan && isKecamatan_pilihan && isQty_pilihan) {
        $('.alert-danger').css('display','none')
        get_all_couriers().done(function(response){
            var dataAllKurir = response
            var kurir_kode =''
            for(var i=0; i<dataAllKurir.length; i++){
                if(dataAllKurir[i].Courier == new_kurir_pilihan){
                    kurir_kode = dataAllKurir[i].Courier_Code
                }
            }
            get_shipping_fee(new_kurir_pilihan, kurir_kode, province_pilihan, kota_pilihan,kelurahan_pilihan,kecamatan_pilihan, days_pengiriman, kode_pengiriman).done(function(response){
                all_biaya_pengiriman= response
                console.log(response)
                get_product_detail_func(product_id).done(function(response){  
                    check_qty()
                    // var berat_product = parseFloat(response.Weight_KG)
                    // var total_berat_product = Math.ceil(berat_product * total_qty_from_user)
                    // var total_fee =  total_berat_product * parseInt(all_biaya_pengiriman[0].Courier_Price_Per_Kg)
                    // $('#tp_iframe').empty()
                    // $('#tp_iframe').val(response.GroupBuy_SellPrice * total_qty_from_user)    
                    // $('#total_biaya_pengiriman_gb').empty() 
                    // $('#total_biaya_pengiriman_gb').val(total_fee)
                })
            })
        })
    }else {
        swal.fire("Ada field yang belum di isi", "", "error");
        $('.alert-danger').css('display','flex')

        render_all_kurir_before_choosing(product_id)
        console.log(isKurir_pilihan, ' kurir pilihan')
        console.log(isKota_pilihan,' kota pilihan ')
        console.log(isProvince_pilihan, ' province pilihan')
        console.log(isKelurahan_pilihan, ' kelurahan pilihan')
        console.log(isKecamatan_pilihan, ' kecamatan pilihan')
        console.log(isQty_pilihan, ' qty pilihan')
    }
  
}
const pengirimanMethodHome=(product_id)=>{
    
    
    var province_pilihan=$('.province-home-gb option:selected').val()
    var kota_pilihan=$('.kota-home-gb option:selected').val()
    var kecamatan_pilihan=$('.kecamatan-home-gb option:selected').val()
    var kelurahan_pilihan=$('.kelurahan-home-gb option:selected').val()
    var kodepos_pilihan = $('.kodepos-home-gb').val()
    var pengiriman_pilihan = $('.pengiriman-home-gb option:selected').val()
    var total_qty_from_user = parseInt($('.qty_groupbuy_home').val())
    var all_biaya_pengiriman = []
    var new_kurir_pilihan = $('.active_delivery_method').attr('data-value')

    var split_pengiriman = pengiriman_pilihan.split('-')
    var days_pengiriman = split_pengiriman[0]
    var kode_pengiriman = split_pengiriman[1]

    var isKurir_pilihan = false
    var isProvince_pilihan = false
    var isKota_pilihan = false
    var isKecamatan_pilihan = false
    var isKelurahan_pilihan = false
    var isQty_pilihan = false
    
    console.log(kecamatan_pilihan == undefined, ' testing undefined kecamatan pilihan 969',  kecamatan_pilihan == 'undefined')
    if(kecamatan_pilihan == undefined || kecamatan_pilihan == null || kecamatan_pilihan == 'NULL' || kecamatan_pilihan == 'undefined'){
       console.log('masuk ke if kecamatan pilihan')
        kecamatan_pilihan = ''
        isKecamatan_pilihan = false
    }   else {
        isKecamatan_pilihan = true
    }
    if( kelurahan_pilihan == undefined || kelurahan_pilihan == null || kelurahan_pilihan == 'NULL' || kelurahan_pilihan == 'undefined'){
        console.log('masuk ke if kelurahan pilihan')
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

    var totalQtyIsANumber = isNaN(total_qty_from_user)
    console.log(totalQtyIsANumber)
    if(total_qty_from_user == undefined || total_qty_from_user == 'undefined' || total_qty_from_user == null || total_qty_from_user.length == 0 || total_qty_from_user == NaN || totalQtyIsANumber){
        isQty_pilihan = false
    }else {
        isQty_pilihan = true
    }
    console.log(total_qty_from_user)
    console.log(isQty_pilihan)

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


    if(isKurir_pilihan && isKota_pilihan && isProvince_pilihan && isKelurahan_pilihan && isKecamatan_pilihan && isQty_pilihan) {
        $('.alert-danger').css('display','none')
        check_qty()
        // get_all_couriers().done(function(response){
        //     var dataAllKurir = response
        //     var kurir_kode =''
        //     for(var i=0; i<dataAllKurir.length; i++){
        //         if(dataAllKurir[i].Courier == new_kurir_pilihan){
        //             kurir_kode = dataAllKurir[i].Courier_Code
        //         }
        //     }
           

            
            // get_shipping_fee(new_kurir_pilihan, kurir_kode, province_pilihan, kota_pilihan,kelurahan_pilihan,kecamatan_pilihan, days_pengiriman, kode_pengiriman).done(function(response){
            //     all_biaya_pengiriman= response
            //     console.log(response)
            //     get_product_detail_func(product_id).done(function(response){
            //         check_qty()
            //         // var berat_product = parseFloat(response.Weight_KG)
            //         // var total_berat_product = Math.ceil(berat_product * total_qty_from_user)
            //         // var total_fee =  total_berat_product * parseInt(all_biaya_pengiriman[0].Courier_Price_Per_Kg)
                    
            //         // $('#tp_iframe').empty()
            //         // $('#tp_iframe').val(response.GroupBuy_SellPrice * total_qty_from_user)
            //         // $('#total_biaya_pengiriman_gb').empty()
            //         // $('#total_biaya_pengiriman_gb').val(total_fee)
            //     })
            // })
        // })
    }else {
        // if()
        swal.fire("Ada field yang belum di isi", "", "error");
        $('.alert-danger').css('display','flex')
        render_all_kurir_before_choosing(product_id)

        console.log(isKurir_pilihan, ' kurir pilihan')
        console.log(isKota_pilihan,' kota pilihan ')
        console.log(isProvince_pilihan, ' province pilihan')
        console.log(isKelurahan_pilihan, ' kelurahan pilihan')
        console.log(isKecamatan_pilihan, ' kecamatan pilihan')
        console.log(isQty_pilihan, ' qty pilihan')
    }
  
}


const kodeposMethodHome=(product_id)=>{
    
}

const asuransiMethodHome=(product_id)=>{
    var province_pilihan=$('.province-home-gb option:selected').val()
    var kota_pilihan=$('.kota-home-gb option:selected').val()
    var kecamatan_pilihan=$('.kecamatan-home-gb option:selected').val()
    var kelurahan_pilihan=$('.kelurahan-home-gb option:selected').val()
    var kodepos_pilihan = $('.kodepos-home-gb').val()
    var pengiriman_pilihan = $('.pengiriman-home-gb option:selected').val()
    var total_qty_from_user = parseInt($('.qty_groupbuy_home').val())
    var all_biaya_pengiriman = []
    var new_kurir_pilihan = $('.active_delivery_method').attr('data-value')

    var split_pengiriman = pengiriman_pilihan.split('-')
    var days_pengiriman = split_pengiriman[0]
    var kode_pengiriman = split_pengiriman[1]

    var isKurir_pilihan = false
    var isProvince_pilihan = false
    var isKota_pilihan = false
    var isKecamatan_pilihan = false
    var isKelurahan_pilihan = false
    var isQty_pilihan = false
    
    console.log(kecamatan_pilihan == undefined, ' testing undefined kecamatan pilihan 969',  kecamatan_pilihan == 'undefined')
    if(kecamatan_pilihan == undefined || kecamatan_pilihan == null || kecamatan_pilihan == 'NULL' || kecamatan_pilihan == 'undefined'){
       console.log('masuk ke if kecamatan pilihan')
        kecamatan_pilihan = ''
        isKecamatan_pilihan = false
    }   else {
        isKecamatan_pilihan = true
    }
    if( kelurahan_pilihan == undefined || kelurahan_pilihan == null || kelurahan_pilihan == 'NULL' || kelurahan_pilihan == 'undefined'){
        console.log('masuk ke if kelurahan pilihan')
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

    var totalQtyIsANumber = isNaN(total_qty_from_user)
    console.log(totalQtyIsANumber)
    if(total_qty_from_user == undefined || total_qty_from_user == 'undefined' || total_qty_from_user == null || total_qty_from_user.length == 0 || total_qty_from_user == NaN || totalQtyIsANumber){
        isQty_pilihan = false
    }else {
        isQty_pilihan = true
    }
    console.log(total_qty_from_user)
    console.log(isQty_pilihan)

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


    if(isKurir_pilihan && isKota_pilihan && isProvince_pilihan && isKelurahan_pilihan && isKecamatan_pilihan && isQty_pilihan) {
        $('.alert-danger').css('display','none')
        check_qty()

    }else {
        
        swal.fire("Ada field yang belum di isi", "", "error");
        $('.alert-danger').css('display','flex')
        render_all_kurir_before_choosing(product_id)

        console.log(isKurir_pilihan, ' kurir pilihan')
        console.log(isKota_pilihan,' kota pilihan ')
        console.log(isProvince_pilihan, ' province pilihan')
        console.log(isKelurahan_pilihan, ' kelurahan pilihan')
        console.log(isKecamatan_pilihan, ' kecamatan pilihan')
        console.log(isQty_pilihan, ' qty pilihan')
    }
}

const packingMethodHome=(product_id)=>{
    var province_pilihan=$('.province-home-gb option:selected').val()
    var kota_pilihan=$('.kota-home-gb option:selected').val()
    var kecamatan_pilihan=$('.kecamatan-home-gb option:selected').val()
    var kelurahan_pilihan=$('.kelurahan-home-gb option:selected').val()
    var kodepos_pilihan = $('.kodepos-home-gb').val()
    var pengiriman_pilihan = $('.pengiriman-home-gb option:selected').val()
    var total_qty_from_user = parseInt($('.qty_groupbuy_home').val())
    var all_biaya_pengiriman = []
    var new_kurir_pilihan = $('.active_delivery_method').attr('data-value')

    var split_pengiriman = pengiriman_pilihan.split('-')
    var days_pengiriman = split_pengiriman[0]
    var kode_pengiriman = split_pengiriman[1]

    var isKurir_pilihan = false
    var isProvince_pilihan = false
    var isKota_pilihan = false
    var isKecamatan_pilihan = false
    var isKelurahan_pilihan = false
    var isQty_pilihan = false
    
    console.log(kecamatan_pilihan == undefined, ' testing undefined kecamatan pilihan 969',  kecamatan_pilihan == 'undefined')
    if(kecamatan_pilihan == undefined || kecamatan_pilihan == null || kecamatan_pilihan == 'NULL' || kecamatan_pilihan == 'undefined'){
       console.log('masuk ke if kecamatan pilihan')
        kecamatan_pilihan = ''
        isKecamatan_pilihan = false
    }   else {
        isKecamatan_pilihan = true
    }
    if( kelurahan_pilihan == undefined || kelurahan_pilihan == null || kelurahan_pilihan == 'NULL' || kelurahan_pilihan == 'undefined'){
        console.log('masuk ke if kelurahan pilihan')
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

    var totalQtyIsANumber = isNaN(total_qty_from_user)
    console.log(totalQtyIsANumber)
    if(total_qty_from_user == undefined || total_qty_from_user == 'undefined' || total_qty_from_user == null || total_qty_from_user.length == 0 || total_qty_from_user == NaN || totalQtyIsANumber){
        isQty_pilihan = false
    }else {
        isQty_pilihan = true
    }
    console.log(total_qty_from_user)
    console.log(isQty_pilihan)

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


    if(isKurir_pilihan && isKota_pilihan && isProvince_pilihan && isKelurahan_pilihan && isKecamatan_pilihan && isQty_pilihan) {
        $('.alert-danger').css('display','none')
        check_qty()

    }else {
        
        swal.fire("Ada field yang belum di isi", "", "error");
        $('.alert-danger').css('display','flex')
        render_all_kurir_before_choosing(product_id)

        console.log(isKurir_pilihan, ' kurir pilihan')
        console.log(isKota_pilihan,' kota pilihan ')
        console.log(isProvince_pilihan, ' province pilihan')
        console.log(isKelurahan_pilihan, ' kelurahan pilihan')
        console.log(isKecamatan_pilihan, ' kecamatan pilihan')
        console.log(isQty_pilihan, ' qty pilihan')
    }
}
 const render_get_product_detail=(product_id)=>{
   
        
    const querystring = $(location).attr('href');
    axios.post(`http://products.sold.co.id/get-product-details?product_code=${product_id}`)
    .then((res)=>{

        let timerInterval
        Swal.fire({
        title: 'Please Wait',
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
            
                item = res.data
                var hargaAwal = parseInt(item.Sell_Price)
                var discount = parseInt(item.Sell_Price * 0.1)
                var hargaTotal = hargaAwal + discount
                console.log(res.data,' 619 axios')
                $('.box-item-detail').empty();
                console.log(item.GroupBuy_SellPrice, ' 2530')
                if(item.GroupBuy_Purchase == "false"){
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
                                    <div class="item-4"> 
                                        <p>Harga Termasuk PPN: <span id="span_harga"> Rp.${hargaTotal} </span> </p>  
                                        <div class="box-qty-detail"> Kuantitas  : ${item.Stock_Quantity} </div>   
                                    </div>
                                    <p>Harga dengan pembayaran tempo : *hubungi customer service kami*</p>
                                </div>
                                <div class="box_share_product">
                                    <p>Share This Product</p>
                                    <div class="box_ins_share"> 
                                        <input type="text" value="${querystring}" readonly class="share_link_input" id="copyClipboard" onclick="copy_link_share()">
                                        <i class="far fa-copy btn_link_share" onclick="copy_link_share()" id="copy"></i>
                                        
                                    </div>
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
                                    <div class="item-4"> 
                                        <p>Harga Termasuk PPN: <span id="span_harga"> Rp.${hargaTotal} </span> </p>  
                                        <div class="box-qty-detail"> Kuantitas  : ${item.Stock_Quantity} </div>   
                                    </div>
                                    <p>Harga dengan pembayaran tempo : *hubungi customer service kami*</p>
                                </div>
                                <div class="box_share_product">
                                    <p>Share This Product</p>
                                    <div class="box_ins_share"> 
                                        <input type="text" value="${querystring}" readonly class="share_link_input" id="copyClipboard" onclick="copy_link_share()">
                                        <i class="far fa-copy btn_link_share" onclick="copy_link_share()" id="copy"></i>
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
            
            
                }   
         })
    
        
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

const render_item_all_category=()=>{
    // http://products.sold.co.id/get-product-details?Get_ALL_Sub_Category_Based_On_Category=${Category}

    var data_atas = [
        'ADHESIVE',
        'APD',
        'HARDWARE',
       
    ]
    var data_bawah = [
        'APD',
        'HARDWARE',
        'ADHESIVE'
    ]
    
    for(var i=0; i<data_atas.length; i++){
        // console.log(data_atas[i])
        
        axios.post(`http://products.sold.co.id/get-product-details?Get_ALL_Sub_Category_Based_On_Category=${data_atas[i]}`)
        .then((res)=>{
            // console.log(res.data)
            res.data.map((val,index)=>{
                $('.top-all-category').append(`
                    <div class="card card-small-category " onclick="getAllItem_fromAllCat('${val.Subcategory}')">
                        <img src="${val.Picture_1}" class="card-img-top">
                        <h3 class="card-title">${val.Subcategory}</h3>
                    </div>
                `)
            })
        }).catch((err)=>{
            console.log(err)
        })
        
    }

        
    for(var i=0; i<data_bawah.length; i++){
        // console.log(data_atas[i])
        
        axios.post(`http://products.sold.co.id/get-product-details?Get_ALL_Sub_Category_Based_On_Category=${data_bawah[i]}`)
        .then((res)=>{
            // console.log(res.data)
            res.data.map((val,index)=>{
                // console.log(val)
                $('.bot-all-category').append(`
                    <div class="card card-small-category" onclick="getAllItem_fromAllCat('${val.Subcategory}')">
                        <img src="${val.Picture_1}" class="card-img-top">
                        <h3 class="card-title">${val.Subcategory}</h3>
                    </div>
                `)
            })
        }).catch((err)=>{
            console.log(err)
        })
        
    }
}



function get_product_detail_func(product_id){
    var settings = {
        "url": `http://products.sold.co.id/get-product-details?product_code=${product_id}`,
        "method": "POST",
        "timeout": 0,
    };
    console.log(settings.url)
    return $.ajax(settings);
}

function get_all_couriers(){
    var settings = {
        "url": `http://products.sold.co.id/get-courier-data?Get_All_Couriers=true`,
        "method": "POST",
        "timeout": 0,
    };
    
    return $.ajax(settings);
}
function get_all_province_from_courier(Courier, Courier_Code){
    var settings = {
        "url": `http://products.sold.co.id/get-courier-data?Courier=${Courier}&Courier_Code=${Courier_Code}&Get_All_Province=true`,
        "method": "POST",
        "timeout": 0,
    };
    
    return $.ajax(settings);
}
function get_all_city_from_courier(Courier, Courier_Code, Province){
    var settings = {
        "url": `http://products.sold.co.id/get-courier-data?Courier=${Courier}&Courier_Code=${Courier_Code}&Province=${Province}`,
        "method": "POST",
        "timeout": 0,
    };
    
    return $.ajax(settings);
}
function get_all_district_from_courier(Courier, Courier_Code, City){
    var settings = {
        "url": `http://products.sold.co.id/get-courier-data?Courier=${Courier}&Courier_Code=${Courier_Code}&City=${City}`,
        "method": "POST",
        "timeout": 0,
    };
    
    return $.ajax(settings);
}
function get_all_subdistrict_from_courier(Courier, Courier_Code, District){
    var settings = {
        "url": `http://products.sold.co.id/get-courier-data?Courier=${Courier}&Courier_Code=${Courier_Code}&District=${District}`,
        "method": "POST",
        "timeout": 0,
    };
    
    return $.ajax(settings);
}
function get_shipping_cost_informations(Courier, Courier_Code, Province, City, District, Sub_District){
    var settings = {
        "url": `http://products.sold.co.id/get-shipping-option-data?Get_Shipping_Fee=true&Courier=${Courier}&Courier_Code=${Courier_Code}&Province=${Province}&City=${City}&District=${District}&Sub_District=${Sub_District}`,
        "method": "POST",
        "timeout": 0,
    };

    console.log(settings.url);
    
    return $.ajax(settings);
}
function get_shipping_fee(Courier, Courier_Code, Province, City, District, Sub_District, delivery_time_in_days, Courier_Price_Code){
    var settings = {
        "url": `http://products.sold.co.id/get-courier-data?Get_Shipping_Fee=true&Courier=${Courier}&Courier_Code=${Courier_Code}&Province=${Province}&City=${City}&District=${District}&Sub_District=${Sub_District}&delivery_time_in_days=${delivery_time_in_days}&Courier_Price_Code=${Courier_Price_Code}`,
        "method": "POST",
        "timeout": 0,
    };

    console.log(settings.url);
    
    return $.ajax(settings);
}


function new_get_shipping_cost_informations(Courier_Price_Code_orig , Courier_Price_Code_dest, packing_type, weight, length, width, height, paket_value){
    var settings = {
        "url": `http://products.sold.co.id/get-shipping-option-data?Get_Shipping_Fee=true&Courier_Price_Code_orig=${Courier_Price_Code_orig}&Courier_Price_Code_dest=${Courier_Price_Code_dest}&weight=${weight}&length=${length}&width=${width}&height=${height}&paket_value=${paket_value}&packing_type=${packing_type}`,
        "method": "POST",
        "timeout": 0,
    };

    console.log(settings.url);
    
    return $.ajax(settings);
}
function new_get_shipping_fee(Courier_Price_Code_orig , Courier_Price_Code_dest, packing_type, weight, length, width, height, paket_value){
    var settings = {
        "url": `http://products.sold.co.id/get-courier-data?Get_Shipping_Fee=true&Courier_Price_Code_orig=${Courier_Price_Code_orig}&Courier_Price_Code_dest=${Courier_Price_Code_dest}&weight=${weight}&length=${length}&width=${width}&height=${height}&paket_value=${paket_value}&packing_type=${packing_type}`,
        "method": "POST",
        "timeout": 0,
    };

    console.log(settings.url);
    
    return $.ajax(settings);
}



const render_all_kurir_before_choosing=(product_id)=>{

    var allKurir=[]
    var allProvince=[]
    var allKota =[]
    var allKelurahan=[]
    var allKecamatan=[]
    var allPengiriman=[]



    var kurir=[]
    var province = []
    var kota = []
    var kelurahan = []
    var kecamatan = []
    var item_product = ''
    get_all_couriers().done(function(response){
        console.log(response)
        kurir = response[0]
        allKurir = response
        get_all_province_from_courier(kurir.Courier,kurir.Courier_Code).done(function(response){
            province = response[0]
            allProvince = response
            console.log(province)
            get_all_city_from_courier(kurir.Courier,kurir.Courier_Code,province.Province).done(function(response){
                kota = response[0]
                allKota = response
                console.log(kota,' ini kota')
                get_all_district_from_courier(kurir.Courier,kurir.Courier_Code,kota.City).done(function(response){
                    console.log(response)
                    kelurahan = response[0]
                    district = response[0]
                    allKelurahan = response
                    allDistrict = response
                    console.log(kelurahan,'ini kelurahaan')
                    get_all_subdistrict_from_courier(kurir.Courier,kurir.Courier_Code,district.District).done(function(response){
                        kecamatan = response
                        allKecamatan = response
                        allSub_District = response
                        // console.log(kecamatan,' ini kecamatan')
                        // console.log(kecamatan[0].Sub_District)

                        var Courier_Price_Code_orig = 'CGK01.00'
                        var packing_type = ''
                        var berat_product = parseInt(item_product.Weight_KG)
                        // console.log(item_product,'ini item product')
                        // console.log(berat_product,' ini berat product')
                        if(berat_product == 0){
                            berat_product = 0.1
                        }
                        var length = ''
                        var  width = '' 
                        var  height = ''
                        var paket_value = '' 
                        console.log(allSub_District[0].Courier_Price_Code,' price code dest')
                        console.log( new_get_shipping_cost_informations(Courier_Price_Code_orig , allKecamatan[0].Courier_Price_Code, packing_type, berat_product, length, width, height, paket_value))
                        // get_shipping_cost_informations(kurir.Courier,kurir.Courier_Code,province.Province,kota.City,kelurahan.District,kecamatan[0].Sub_District).done(function(response){
                            new_get_shipping_cost_informations(Courier_Price_Code_orig , allKecamatan[0].Courier_Price_Code, packing_type, berat_product, length, width, height, paket_value).done(function(response){

                            
                            allPengiriman = response
                            console.log(response,' ini shipping cost')
                            $('.radio-group-delivery').empty()
                            $('.province-home-gb').empty()
                            $('.kota-home-gb').empty() 
                            $('.kelurahan-home-gb').empty()
                            $('.kecamatan-home-gb').empty()
                            $('.pengiriman-home-gb').empty()
                            $('.asuransi-home-gb').empty()
                            $('.packing-home-gb').empty()
                            $('.kodepos-home-gb').empty()

                            $('.province-home-gb').append(`
                                <option  selected value="id-province-gb" >Provinsi</option> 
                            `)
                            $('.kota-home-gb').append(`
                                <option  selected class="id-kota-gb"> Kota</option>      
                            `)
                            $('.kelurahan-home-gb').append(`
                                <option selected  class="id-kelurahan-gb">Kelurahan</option>      
                            `)
                            $('.kecamatan-home-gb').append(`
                                <option selected  class="id-kecamatan-gb">Kecamatan</option>      
                            `)
                            $('.pengiriman-home-gb').append(`
                                <option selected  class="id-pengiriman-gb">Waktu Pengiriman</option>      
                            `)
                            $('.asuransi-home-gb').append(`
                                <option selected  class="id-asuransi-gb">Asuransi</option>      
                            `)
                            $('.packing-home-gb').append(`
                                <option selected  class="id-packing-gb">Packing</option>      
                            `)
                            $('.kodepos-home-gb').append(`
                                <option selected  class="id-kodepos-gb">Kode Pos</option>      
                            `)
                            
                            

                            allKurir.map((val,index)=>{
                                console.log(val,'ini val kurir')
                                // $('.kurir-home-gb').append(`
                                //     <option  value="${val.Courier}" class="id-kurir-gb">${val.Courier}</option> 
                                // `)
                                $('.radio-group-delivery').append(`
                                <div class="address-card-1 radio-delivery-card" id="id-kurir-gb-${val.Courier}" data-value="${val.Courier}" onclick="choosing_shipping('id-kurir-gb-${val.Courier}', ${product_id})">
                                    <img src="../img/tiki_shipping_method.png" alt="" class="bca_img">
                                </div>
                            `)
                            })
                            allProvince.map((val,index)=>{
                                // console.log(val,'ini val province')
                                $('.province-home-gb').append(`
                                    <option  value="${val.Province}" class="id-province-gb">${val.Province}</option> 
                                `)
                            })
                            allKota.map((val,index)=>{
                                // console.log(val,'ini val kota')
                                $('.kota-home-gb').append(`
                                    <option  value="${val.City}" class="id-kota-gb">${val.City}</option> 
                                `)    
                            })  
                            allKecamatan.map((val,index)=>{

                                if(val.Sub_District == ''){
                                    $('.kecamatan-home-gb').append(`
                                        <option  value="${val.Sub_District}" class="id-kecamatan-gb">-</option> 
                                    `)
                                }else {
                                    $('.kecamatan-home-gb').append(`
                                        <option  value="${val.Sub_District}" class="id-kecamatan-gb">${val.Sub_District}</option> 
                                    `)
                                    $('.kodepos-home-gb').append(`
                                        <option  value="${val.Zipcode}" class="id-kodepos-gb">${val.Zipcode}</option> 
                                    `)
                                }

                            })

                            allKelurahan.map((val,index)=>{

                                if(val.District == ''){
                                    $('.kelurahan-home-gb').append(`
                                        <option  value="${val.District}" class="id-kelurahan-gb">-</option> 
                                    `)
                                }else {
                                    $('.kelurahan-home-gb').append(`
                                        <option  value="${val.District}" class="id-kelurahan-gb">${val.District}</option> 
                                    `)
                                   
                                }
                            })

                            if(allPengiriman){

                                if(allPengiriman.service != undefined) {
                                    allPengiriman.service.map((val,index)=>{
                                        console.log(val, 'ini all pengiriman')
                                        console.log(val.est_day)
                                        console.log(val.EST_DAY)
                                        $('.pengiriman-home-gb').append(`
                                            <option  value="${val.EST_DAY}days ${val.SERVICE} ${val.TARIFF} ${val.DESCRIPTION} " class="${val.TARIFF}">${val.EST_DAY}days ${val.SERVICE} ${val.TARIFF} ${val.DESCRIPTION} </option> 
                                        `)
                                    })
                                }
                                if(allPengiriman.insurance !=undefined){
                                    allPengiriman.insurance.map((val,index)=>{
                                        // console.log(val, ' ini all pengiriman')
                                        // console.log(val.est_day)
                                        // console.log(val.EST_DAY)
                                        $('.asuransi-home-gb').append(`
                                            <option  value="type ${val.INSURANCE_TYPE} ${val.INSURANCE_NAME} ${val.INSURANCE_COST}" class="${val.INSURANCE_COST}">${val.INSURANCE_NAME} - RP ${val.INSURANCE_COST} </option> 
                                        `)
                                    })
                                }
                                if(allPengiriman.packing != undefined) {
                                    allPengiriman.packing.map((val,index)=>{
                                        // console.log(val, ' ini all pengiriman')
                                        // console.log(val.est_day)
                                        // console.log(val.EST_DAY)
                                        $('.packing-home-gb').append(`
                                            <option  value="${val.PACKING_TYPE}" class="${val.PACKING_FEE}">${val.PACKING_TYPE} - RP ${val.PACKING_FEE} </option> 
                                        `)
                                    })
                                }

                            }


                        })
                    })
                })
            })
        })
    })
    
}



const check_user_for_login=()=>{
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
                
                $('#loginModal').modal('show') // login lama
                // $('#newloginModal').modal('show') // login lama
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
   }


