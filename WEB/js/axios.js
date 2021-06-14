

// console.log('axios jalan')
var allData = []

$( document ).ready(function() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const category = urlParams.get('category');
    const subcategory = urlParams.get('subcategory');
    if(category != undefined){
        if(category.length > 0){
            renderItemBasedOnCategory(category);
        }
    }else if(subcategory != undefined){
        if(subcategory.length > 0){
            renderItemBasedOnSubCategory(subcategory);
        }
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


// SLICK SLIDER 

// $('.box-render-promo').slick({
//     dots: false,
//     infinite: true,
//     speed: 300,
//     slidesToShow: 3,
//     centerMode: true,
//     variableWidth: true,
//     prevArrow: $('.slick-prev'),
//     nextArrow: $('.slick-next'),
//   });
// $('.box-render-promo').slick({
//     slidesToShow: 4,
//     slidesToScroll: 4
//   });
// SLICK SLIDER

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
                <li class="list-group-item category-list get-item testing-2" val="${sub}" onclick="findSubCategory('${sub}')">${sub}</li>
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
    $('.modals-lk').attr('src',`../WEB/Iframe/listkategori.html?category=${sub}`)
    
    renderItemBasedOnCategory(sub)
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
                <div class="card-all-item">
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

const getAllItem=(subcategory)=>{
    console.log(subcategory,' ini line 77')
    
    // $('.modals-item').css('display','block')
    renderItemBasedOnSubCategory(subcategory)
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
            $('.modals-lk').attr('src','../WEB/Iframe/listkategori.html') 
            $('.modals-lk').css('display','block')  
        }).catch((err)=>{
            console.log(err)
        })
}

// const renderItemBasedOnSubCategory=(subcategory)=>{
//     // var myFrame = $(".modals-item").contents().find('.box-list-kategori');
    
    
//     axios.post(`http://products.sold.co.id/get-product-details?subcategory=${subcategory}`)
//     .then((res)=>{
//         console.log(res.data)
//          res.data.map((val,index)=>{
//             console.log(val)
//             console.log('render jalan 189s')
//             $('.box-list-kategori').append(
//                 `
//                 <div class="card-lk" onclick="getAllItem('${val.Product_Code}')">
//                 <div class="box-img-lk">
//                 <img src="${val.Picture_1}" alt="">
//                 </div>
//                 <p>${val.Name}</p>
//                 </div>
//                 `
//                 )
//             })
//         // var test = 'testing yok'
//         //     myFrame.html(test);
//             $('.modals-lk').addClass('melihat') // ini bisa hampir
//             $('.modals-lk').attr('src','../WEB/Iframe/listkategori.html') 
//             $('.modals-lk').css('display','block')  
//         }).catch((err)=>{
//             console.log(err)
//         })
// }
// console.log(allData, 'line 44')