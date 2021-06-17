$( document ).ready(function() {

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const search = urlParams.get('search');
    const subcategory = urlParams.get('category')
    // if(subcategory != undefined){
    //     alert('masuk ke if sub category')
    //     subcategory_searching_page(subcategory)
    // }
    // alert(search,' line 11');

    // category-list
    axios.post(`http://products.sold.co.id/get-product-details?Get_ALL_Category=true`)
    .then((res)=>{
        res.data.map((val,index)=>{
            console.log(val.Category);
            $('.category-list').append(
                `
                <li class="list-group-item" onclick="show_subcategory('${val.Category}')">${val.Category.toUpperCase()}</li>
                `
                )
            })
    }).catch((err)=>{
        console.log(err)
    })


});

function show_subcategory(choosen_parent_category){
    axios.post(`http://products.sold.co.id/get-product-details?Get_ALL_Sub_Category_Based_On_Category=${choosen_parent_category}`)
    .then((res)=>{
        console.log(res);
        // $('.box-list-kategori').css("display", "block")
        $('.box-list-kategori').toggle()
        $('.box-list-kategori').empty()
        res.data.map((val,index)=>{
            $('.box-list-kategori').append(
              `
                <div class="card-all-item" id="${val.Subcategory}" onclick="show_jenisproduct('${val.Subcategory}')">
                    <img src="${val.Picture_1}" alt="" class="img-all-card">   
                    <div class="card-all-item-list">
                        <p>${val.Subcategory}</p>
                    </div>
                </div>
                `
            )
        }) 
        
    }).catch((err)=>{
        console.log(err)
    })
}

function show_jenisproduct(jenis_product){
    // alert(jenis_product,' 57 jenis product jalan')

    $('.box-list-kategori').css('display','none')
    $('.box-list-subcategory').css('display','block')

    axios.post(`http://products.sold.co.id/get-product-details?subcategory=${jenis_product}`)
    .then((res)=>{
        console.log(res.data)
        res.data.map((val,index)=>{
            console.log('masuk ke line 47')
            console.log(val)
            var hargaAwal = parseInt(val.Sell_Price)
            var discount = parseInt(val.Sell_Price * 0.1)
            var hargaTotal = hargaAwal + discount
            $('.render-item-sub').append(
              `
                <div class="card-item card_sp">
                    <img src="${val.Picture_1}" alt="" class="img-card" onclick="get_product_detail_from_main_page('${val.Product_Code}')">   
                    <div class="card-item-list">
                        <p>${val.Name}</p>
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
        }) 
        // $('.modals-lk').addClass('melihat') // ini bisa hampir
        
        console.log('finish render item based on sub cat')
        
    }).catch((err)=>{
        console.log(err)
    })


    // $('.box-list-kategori').toggle()
    // $('.box-list-kategori').empty()
    
    // $('.modals-lk').attr('src',`../WEB/Iframe/kategoriItem.html?subcategory=${subCategory}`)  
    // $('.modals-product-detail').css('display','block')
    // $('.modals-product-detail').attr('src',`../Iframe/itemDetail.html?product_id=${product_id}`)
    // location.replace(`../Iframe/searchingPage.html?category=${jenis_product}`)
    // $('.modals-search-result').css('display','block')
    // $('.modals-search-result').attr('src',`./Iframe/kategoriItem.html?subcategory=${jenis_product}`)
    // location.replace(`../Iframe/kategoriItem.html?subcategory=${jenis_product}`)
}
