

// console.log('axios jalan')
var allData = []


$( document ).ready(function() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const category = urlParams.get('category');
    const subcategory = urlParams.get('subcategory');
    const item_category = urlParams.get('product_id');
    // console.log(item_category, 'line category')
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
    }else {
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

// RENDER DATA HOME
const renderItemPromo=()=>{


    allData.map((val,index)=>{
        var hargaAwal = parseInt(val.Sell_Price)
        var discount = parseInt(val.Sell_Price * 0.1)
        var hargaTotal = hargaAwal + discount
        // console.log(hargaTotal)
        $('.box-render-promo').append(
        ` 
            <div class="card-item">
                <img src="${val.Picture_1}" alt="" class="img-card">   
                <div class="card-item-list">
                    <p>${val.Name}</p>
                    <div class="split-item">
                        <div class="item-price">
                            <p>RP. ${hargaTotal}</p>
                            <p>Rp. ${hargaAwal}</p>
                        </div>
                        <div class="buy-icon">
                            <img src="./img/cart.png" alt="" class="icon-buy">
                        </div>
                    </div>
                </div>
            </div>
            `
        )
    })
}



const renderItemNew=()=>{
    // console.log(allData)

    allData.map((val,index)=>{
        var hargaAwal = parseInt(val.Sell_Price)
        var discount = parseInt(val.Sell_Price * 0.1)
        var hargaTotal = hargaAwal + discount
    //  console.log(hargaTotal)
        $('.box-render-new').append(
        ` 
            <div class="card-item">
                <img src="${val.Picture_1}" alt="" class="img-card">   
                <div class="card-item-list">
                    <p>${val.Name}</p>
                    <div class="split-item">
                        <div class="item-price">
                            <p>RP. ${hargaTotal}</p>
                            <p>Rp. ${hargaAwal}</p>
                        </div>
                        <div class="buy-icon">
                            <img src="./img/cart.png" alt="" class="icon-buy">
                        </div>
                    </div>
                </div>
            </div>
            `
        )
    })
}
const renderItemAll=()=>{
    // console.log(allData)

    allData.map((val,index)=>{
        var hargaAwal = parseInt(val.Sell_Price)
        var discount = parseInt(val.Sell_Price * 0.1)
        var hargaTotal = hargaAwal + discount
    //  console.log(hargaTotal)
        $('.box-render-all').append(
        ` 
            <div class="card-item">
                <img src="${val.Picture_1}" alt="" class="img-card">   
                <div class="card-item-list">
                    <p>${val.Name}</p>
                    <div class="split-item">
                        <div class="item-price">
                            <p>RP. ${hargaTotal}</p>
                            <p>Rp. ${hargaAwal}</p>
                        </div>
                        <div class="buy-icon">
                            <img src="./img/cart.png" alt="" class="icon-buy">
                        </div>
                    </div>
                </div>
            </div>
            `
        )
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
    // alert(category)
    console.log(sub)
    $('.closeByLogin').css('display','none')
    $('.option-1').removeClass("background_grey")
    $('.option-2').removeClass("background_grey")
    $('.option-3').removeClass("background_grey")
    $('.box-render-search').css('display','none')

    $('.modals-lk').css('display','block')
    $('.modals-lk').attr('src',`../WEB/Iframe/listkategori.html?category=${sub}`)
    
    // SEARCH ITEM BACK TO NORMAL
    $('.box-render-search').css('display','none')
    $('.input-name').css('border-bottom-left-radius','25px')
    $('.input-name').css('border-bottom-right-radius','25px')
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
}

const get_product_detail=(product_id)=>{
    $('.box-list-kategori').empty()
    $('.box-list-kategori').addClass('product-detail-resize')
    $('.modals-product-detail').css('display','block')
    $('.modals-product-detail').attr('src',`../Iframe/itemDetail.html?product_id=${product_id}`)
    console.log( $('.modals-product-detail').attr('src'))
    // $('.modals-lk').remove()
    console.log(product_id, 'product_id 206')
    render_get_product_detail(product_id)
    // location.assign(`../Iframe/itemDetail.html`)
}

const renderItemBasedOnSubCategory=(subCategory)=>{
    console.log('masuk ke line 174 render item based on sub cat')
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
                <div class="card-all-item" id="${val.Product_code}" onclick="get_product_detail('${val.Product_Code}')">
                    <img src="${val.Picture_1}" alt="" class="img-all-card">   
                    <div class="card-all-item-list">
                        <p>${val.Name}</p>
                        <div class="split-all-item">
                            <div class="item-all-price">
                                <p>RP. ${hargaTotal}</p>
                                <p>Rp. ${hargaAwal}</p>
                            </div>
                            <div class="buy-icon">
                                <img src="../img/cart.png" alt="" class="icon-buy">
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

const renderItemBasedOnCategory=(Category)=>{
    // var myFrame = $(".modals-item").contents().find('.box-list-kategori');
    
    
    axios.post(`http://products.sold.co.id/get-product-details?Get_ALL_Sub_Category_Based_On_Category=${Category}`)
    .then((res)=>{
        console.log(res.data)
         res.data.map((val,index)=>{
            console.log(val)
            console.log('render jalan 189s')
            $('.box-list-kategori').append(
                `
                <div class="card-lk" onclick="getAllItem('${val.Subcategory}')">
                    <div class="box-img-lk">
                        <img src="${val.Picture_1}" alt="">
                    </div>
                    <p>${val.Subcategory}</p>
                </div>
                `
                )
            })
        // var test = 'testing yok'
        //     myFrame.html(test);
            $('.modals-lk').addClass('melihat') // ini bisa hampir
            // $('.modals-lk').attr('src',`../WEB/Iframe/listkategori.html?subcategory=${subcategory}`) 
            $('.modals-lk').css('display','block')  
        }).catch((err)=>{
            console.log(err)
        })
}


//  SHOW PRODUCT CODE

 const render_get_product_detail=(product_id)=>{
    console.log(product_id, ' ini product id')
    // $('.modals-lk').css('display','none')
    // location.replace(`../Iframe/itemDetail.html`)
    // location.replace(`../Iframe/itemDetail.html`)
    axios.post(`http://products.sold.co.id/get-product-details?product_code=${product_id}`)
    .then((res)=>{
    
        item = res.data
        var hargaAwal = parseInt(item.Sell_Price)
        var discount = parseInt(item.Sell_Price * 0.1)
        var hargaTotal = hargaAwal + discount
        console.log(res.data,' 301 axios')
        $('.box-item-detail').append(
            `
            <div class="item-img">
                <div class="box-back">
                    <i class="fas fa-chevron-left icon-prev" ></i>
                </div>
                <img src="${item.Picture_1}" alt="" class="img-icon">
                <div class="box-next">
                    <i class="fas fa-chevron-right icon-prev" ></i>
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
                    <div class="item-1">
                        <p>Harga GROUP BUY DISKON: <span style="color:#37CED5"> Rp.${item.GroupBuy_SellPrice}</span> </p>
                    </div>
                    <div class="box-add">
                        <div class="add-1">
                            <p>Add to Cart</p>
                        </div>
                        <div class="add-2">
                            <img src="../img/cart.png" alt="" class="img-cart">
                        </div>
                    </div>
                    <div class="box-discount">
                        <div class="add-discount">
                            <p>Beli dengan diskon GROUP BUY</p>
                        </div>
                    </div>
                </div>
            </div>
            `
        )
    }).catch((err)=>{
        console.log(err)
    })
 }



 var idAddress=1
 function addAddress(){
    // alert('jalan')
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
