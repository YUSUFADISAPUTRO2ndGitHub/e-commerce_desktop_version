console.log('ini jalan duluan preload')

$(document).ready(function(){
    $(window).scrollTop(0);
});

setInterval(()=>{
    var highlight_product = $('.box-render-new-category .card-new-category').hasClass('shinny')
    var box_promo_product = $('.box-render-promo .promo_card').hasClass('shinny')
    var box_render_new = $('.box-render-new .card-item .cr-promo-img').hasClass('shinny')
    var box_render_all = $('.box-render-all .card-item .cr-promo-img').hasClass('shinny')
    if(highlight_product === true) {
        console.log('masuk ke line 12')
        getAllData()
    }else if (box_promo_product === true){
        console.log('masuk ke else if ')
    }else if (box_render_new === true){
        getAllData()
    }else if (box_render_all === true){
        getAllData()
    }else {
        // console.log('masuk ke else checking shinny')
        console.log('done render')
    }
},5000)
// API 
function get_all_province_from_courier(Courier, Courier_Code){
    var settings = {
        "url": `https://products.sold.co.id/get-courier-data?Courier=${Courier}&Courier_Code=${Courier_Code}&Get_All_Province=true`,
        "method": "POST",
        "timeout": 0,
    };
    
    return $.ajax(settings);
}
function get_all_city_from_courier(Courier, Courier_Code, Province){
    var settings = {
        "url": `https://products.sold.co.id/get-courier-data?Courier=${Courier}&Courier_Code=${Courier_Code}&Province=${Province}`,
        "method": "POST",
        "timeout": 0,
    };
    
    return $.ajax(settings);
}
function get_all_district_from_courier(Courier, Courier_Code, City){
    var settings = {
        "url": `https://products.sold.co.id/get-courier-data?Courier=${Courier}&Courier_Code=${Courier_Code}&City=${City}`,
        "method": "POST",
        "timeout": 0,
    };
    
    return $.ajax(settings);
}

const loadImageBigScreen=()=>{
    // console.log(' load image big screen jalan')
    // $('.shinny img').css('opacity','1')
    $('.mySlides').removeClass('shinny')
    $('.mySlides-tr').removeClass('shinny')
    $('.mySlides-br').removeClass('shinny')

    // PRODUCT HIGHLIGHT SKELETON DELETE
    $('.cd-image-category').removeClass('shinny')
    $('.card-new-category #highlight-product-skeleton').css('display','none')
    $('.card-new-category #highlight-product').css('display','block')
    // $('#highlight-product').css('display','block')
    // $('#highlight-product-skeleton').css('display','none')

    // product item delete skeleton

    // $('.new_card_item .img-card').removeClass('shinny')

    // iklan panjang skeleton .lg-ads-name
    $('.small-ads .lg-ads-name').removeClass('shinny')


    // iklan promo kiri .promo_card
    $('.box-render-promo .promo_card').removeClass('shinny')


    // .box-render-promo delete skeleton
    $('.new_card_item .cr-promo-img').removeClass('shinny')
    $('.new_card_item .card-item-list .limited-text-short-skeleton').css('display','none')
    $('.new_card_item .card-item-list .limited-text-short').css('display','block')
    $('.split-item .item-price-skeleton').css('display','none')
    $('.split-item .item-price').css('display','block')
    $('.split-item .buy-icon-skeleton').css('display','none')
    $('.split-item .buy-icon').css('display','flex')

    // box new delete skeleton

    $('.card-item .cr-promo-img').removeClass('shinny')
    

}
function get_all_couriers(){
    var settings = {
        "url": `https://products.sold.co.id/get-courier-data?Get_All_Couriers=true`,
        "method": "POST",
        "timeout": 0,
    };

    return $.ajax(settings);
}
// RENDER DATA HOME
const renderItemPromo=()=>{
    $('.box-render-promo').empty()
    $('.box-render-promo').append(`
        <div class="promo_card shinny">
            <img src="../WEB/img/new_ads.png" alt="" class="ads_samping" onclick="get_product_detail_from_main_page('6900005030114')" onload="loadImageBigScreen()">
        </div>
    `)
    allData.map((val,index)=>{
        var hargaAwal = parseInt(val.Sell_Price)
        var discount = parseInt(val.Sell_Price * 0.1)
        var hargaTotal = hargaAwal + discount
        if(val == false || val.Sell_Price == 'NULL' || val.Sell_Price == undefined  || val.Sell_Price == null || isNaN(hargaAwal)
        ){
        }else {
            if(val.GroupBuy_Purchase == 'true' || val.GroupBuy_Purchase == true || val.GroupBuy_Purchase == 'yes'){
                var imgBase = ''
                    $('.box-render-promo').append(
                        ` 
                            <div class="card-item  hvr-float-shadow new_card_item">
                                <div class="cr-promo-img shinny"> 
                                    <img src="${val.Picture_1}" alt="" class="img-card " onclick="get_product_detail_from_main_page('${val.Product_Code}')" onload="loadImageBigScreen()">   
                                </div>
                                <div class="card-item-list">
                                    <p class="limited-text-short-skeleton shinny"></p>
                                    <p class="limited-text-short">${val.Name}</p>
                                    <div class="split-item">
                                        <div class="item-price-skeleton ">
                                            <p class="shinny"></p>
                                            <p class="shinny"></p>
                                        </div>
                                        <div class="item-price">
                                            <p>RP. ${commafy(hargaTotal)}</p>
                                            <p>Rp. ${commafy(hargaAwal)}</p>
                                        </div>
                                        <div class="buy-icon-skeleton shinny" onclick="addToCart('${val.Product_Code}')">
                                            <img src="./img/cart.png" alt="" class="icon-buy" id="${val.Product_Code}">
                                            <img src="./img/badge_groupbuy.png" alt="" class="img-badge-best">
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


            }        
    })
}
const renderItemNew=()=>{
    $('.box-render-new').empty()
    allData.map((val,index)=>{
        var hargaAwal = parseInt(val.Sell_Price)
        var discount = parseInt(val.Sell_Price * 0.1)
        var hargaTotal = hargaAwal + discount
    if(val == false || val.Sell_Price == 'NULL' || val.Sell_Price == 0 || val.Sell_Price < 1 ||
    val.Sell_Price == undefined  || val.Sell_Price == null || isNaN(hargaAwal)
    ){
        
    }else {

        if(val.GroupBuy_Purchase == 'true'){
            // misal mau dibikin promo yg groupbuy
        }else if (val.Categorize_NEW == 'true'){

                $('.box-render-new').append(
                    ` 
                        <div class="card-item hvr-float-shadow " >
                            <div class="cr-promo-img shinny"> 
                                <img src="${val.Picture_1}" alt="" class="img-card" onclick="get_product_detail_from_main_page('${val.Product_Code}')">   
                            </div>    
                            <div class="card-item-list">
                                <p class="limited-text-short-skeleton shinny"></p>
                                <p class="limited-text-short">${val.Name}</p>
                                <div class="split-item">
                                    <div class="item-price-skeleton ">
                                        <p class="shinny"></p>
                                        <p class="shinny"></p>
                                    </div>
                                    <div class="item-price">
                                        <p>RP. ${commafy(hargaTotal)}</p>
                                        <p>Rp. ${commafy(hargaAwal)}</p>
                                    </div>
                                    <div class="buy-icon-skeleton shinny" onclick="addToCart('${val.Product_Code}')">
                                        <img src="./img/cart.png" alt="" class="icon-buy" id="${val.Product_Code}">
                                        <img src="./img/badge_groupbuy.png" alt="" class="img-badge-best">
                                    </div>
                                    <div class="buy-icon" onclick="addToCart('${val.Product_Code}')">
                                        <img src="./img/cart.png" alt="" class="icon-buy" id="${val.Product_Code}">
                                        <img src="./img/badge_new.png" alt="" class="img-badge-new">
                                    </div>
                                </div>
                            </div>
                        </div>
                        `
                    )
        }else {
        }

    }
    })
}
const renderItemAll=()=>{
    $('.box-render-all').empty()
    allData.map((val,index)=>{
        // 
        var hargaAwal = parseInt(val.Sell_Price)
        var discount = parseInt(val.Sell_Price * 0.1)
        var hargaTotal = hargaAwal + discount
    //  
    if(val == false || val.Sell_Price == 'NULL' || val.Sell_Price == 0 || val.Sell_Price < 1 ||
    val.Sell_Price == undefined  || val.Sell_Price == null || isNaN(hargaAwal)
    ){
        
    }else {

        if(val.GroupBuy_Purchase == 'true'){
                $('.box-render-all').append(
                    ` 
                        <div class="card-item hvr-float-shadow " >
                            <div class="cr-promo-img shinny"> 
                                <img src="${val.Picture_1}" alt="" class="img-card" onclick="get_product_detail_from_main_page('${val.Product_Code}')">   
                            </div>    
                            <div class="card-item-list">
                                <p class="limited-text-short-skeleton shinny"></p>
                                <p class="limited-text-short">${val.Name}</p>
                                <div class="split-item">
                                    <div class="item-price-skeleton ">
                                        <p class="shinny"></p>
                                        <p class="shinny"></p>
                                    </div>
                                    <div class="item-price">
                                        <p>RP. ${commafy(hargaTotal)}</p>
                                        <p>Rp. ${commafy(hargaAwal)}</p>
                                    </div>
                                    <div class="buy-icon-skeleton shinny" onclick="addToCart('${val.Product_Code}')">
                                        <img src="./img/cart.png" alt="" class="icon-buy" id="${val.Product_Code}">
                                        <img src="./img/badge_groupbuy.png" alt="" class="img-badge-best">
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
                        <div class="cr-promo-img shinny"> 
                            <img src="${replace_vtintl_to_sold_co_id(val.Picture_1)}" alt="" class="img-card" onclick="get_product_detail_from_main_page('${val.Product_Code}')">   
                        </div>    
                        <div class="card-item-list">
                            <p class="limited-text-short-skeleton shinny"></p>
                            <p class="limited-text-short">${val.Name}</p>
                            <div class="split-item">
                                <div class="item-price-skeleton ">
                                    <p class="shinny"></p>
                                    <p class="shinny"></p>
                                </div>
                                <div class="item-price">
                                    <p>RP. ${commafy(hargaTotal)}</p>
                                    <p>Rp. ${commafy(hargaAwal)}</p>
                                </div>
                                <div class="buy-icon-skeleton shinny" onclick="addToCart('${val.Product_Code}')">
                                    <img src="./img/cart.png" alt="" class="icon-buy" id="${val.Product_Code}">
                                    <img src="./img/badge_groupbuy.png" alt="" class="img-badge-best">
                                </div>
                                <div class="buy-icon" onclick="addToCart('${val.Product_Code}')">
                                    <img src="./img/cart.png" alt="" class="icon-buy" id="${val.Product_Code}">
                                    <img src="./img/badge_new.png" alt="" class="img-badge-new">
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
                    <div class="cr-promo-img shinny"> 
                        <img src="${replace_vtintl_to_sold_co_id(val.Picture_1)}" alt="" class="img-card" onclick="get_product_detail_from_main_page('${val.Product_Code}')">   
                    </div>    
                    <div class="card-item-list">
                        <p class="limited-text-short">${val.Name}</p>
                        <div class="split-item">
                            <div class="item-price">
                                <p>RP. ${commafy(hargaTotal)}</p>
                                <p>Rp. ${commafy(hargaAwal)}</p>
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
    // alert('render category jalan')
    axios.post('https://products.sold.co.id/get-product-details?Get_ALL_Category=true')
    .then((res)=>{
        
        res.data.map((val,index)=>{
            var sub = val.Category.toUpperCase()    
            var split = sub.split(' ').join('_')
            
            $('.lg_home').append(
                ` 
                <li class="list-group-item category-list get-item close-category " val="${sub}" onclick="findSubCategory('${sub}')" id="id_sub-${split}">${sub}</li>
                `
                )
        })
    }).catch((err)=>{
        
    })
}
const new_find_subDistrict_from_address=async(district)=>{
    return new Promise(async(resolve,reject)=>{
        var subDistrict_from_storage = JSON.parse(localStorage.getItem('all_subdistrict_tiki'))
        var kelurahan_pilihan = ''
        var token = localStorage.getItem('token')
        var kurir_pilihan = ''
        var kurir_kode = ''
        var alamat_pilihan = ''

        await get_all_couriers().done( async function(response){
            kurir_pilihan = response[0].Courier
            kurir_kode = response[0].Courier_Code
            await axios.post(`https://customers.sold.co.id/get-customer-information?Customer_Code=${token}`)
            .then(async(res)=>{
                alamat_pilihan = res.data.Address_1
                if(subDistrict_from_storage != undefined && subDistrict_from_storage.length != 0 ){
                    
                }else {
                    await get_all_subdistrict_from_courier(kurir_pilihan,kurir_kode,district).done( function(response){
                        response.forEach((val,index)=>{
                            if(alamat_pilihan.toUpperCase().includes(val.Sub_District.toUpperCase())){
                                kelurahan_pilihan = val.Sub_District
                                // 
                                localStorage.setItem('sub_district_customer',kelurahan_pilihan)
                                // 
                                resolve(kelurahan_pilihan)
                            }
                        })
                        
                    })
                }
            }).catch((err)=>{
                
            })
        })
    })
}

const new_find_district_from_address=async(city)=>{
    
    return new Promise(async(resolve,reject)=>{
        var district_from_storage = JSON.parse(localStorage.getItem('all_district_tiki'))
        var kecamatan_pilihan = ''
        var token = localStorage.getItem('token')
        var kurir_pilihan = ''
        var kurir_kode = ''
        var alamat_pilihan = ''
    
        await get_all_couriers().done( async function(response){
            kurir_pilihan = response[0].Courier
            kurir_kode = response[0].Courier_Code
    
            await axios.post(`https://customers.sold.co.id/get-customer-information?Customer_Code=${token}`)
            .then(async(res)=>{
                alamat_pilihan = res.data.Address_1
    
                await get_all_district_from_courier(kurir_pilihan,kurir_kode,city).done(function(response){
                    // 
    

                    response.forEach((val,index)=>{
    
    
                        if(alamat_pilihan.toUpperCase().includes(val.District.toUpperCase())){
                            kecamatan_pilihan = val.District
    
                            localStorage.setItem('district_customer',kecamatan_pilihan)
                            // 
                            resolve(kecamatan_pilihan)
                        }else {
                            
                        }
                    })
                })
            }).catch((err)=>{
                
            })
        })
        
   
    })
}

const new_find_city_from_address= async (province)=>{
    return new Promise(async(resolve,reject)=>{
        var city_from_storage = JSON.parse(localStorage.getItem('all_city_tiki'))
        var kota_pilihan = ''
        var token = localStorage.getItem('token')
        var kurir_pilihan = ''
        var kurir_kode = ''
        var alamat_pilihan = ''
        await get_all_couriers().done( async function(response){
            kurir_pilihan = response[0].Courier
            kurir_kode = response[0].Courier_Code
            await axios.post(`https://customers.sold.co.id/get-customer-information?Customer_Code=${token}`)
            .then( async (res)=>{
                alamat_pilihan  = res.data.Address_1
                if(city_from_storage != undefined && city_from_storage.length != 0){
                    city_from_storage.forEach((val,index)=>{
                        if(val.Province == province){
                            val.City.forEach((city,id)=>{
                                if(alamat_pilihan.toUpperCase().includes(city.City.toUpperCase())){
                                    kota_pilihan = city.City
                                    localStorage.setItem('city_customer',kota_pilihan)
                                    resolve(kota_pilihan)
                                }
                            })
                        }
                    })
                }else {
                    await get_all_city_from_courier(kurir_pilihan,kurir_kode,province).done(function(response){
                            response.forEach((val,index)=>{
                                if(alamat_pilihan.toUpperCase().includes(val.City.toUpperCase())){
                                    kota_pilihan = val.City
                                    localStorage.setItem('city_customer',kota_pilihan)
                                    resolve(kota_pilihan)
                                }
                            })
                    })
                }
            }).catch((err)=>{
                
            })
        })
    })
}


const new_find_province_from_address= async ()=>{
    return new Promise(async (resolve, reject) => {
        var province_from_storage = JSON.parse(localStorage.getItem('all_province_tiki'))
        var province_pilihan =''
        var token = localStorage.getItem('token')
        var kurir_pilihan = ''
        var kurir_kode = ''
        var alamat_pilihan = ''
        await get_all_couriers().done(async function(response){
            kurir_pilihan = response[0].Courier
            kurir_kode = response[0].Courier_Code
            await axios.post(`https://customers.sold.co.id/get-customer-information?Customer_Code=${token}`)
            .then(async (res)=>{
                
                alamat_pilihan = res.data.Address_1
                if(province_from_storage != undefined &&  province_from_storage.length != 0){
                    province_from_storage.forEach((val,index)=>{
                        if(alamat_pilihan.toUpperCase().includes(val.Province.toUpperCase())){
                            province_pilihan = val.Province
                
                            localStorage.setItem('province_customer',province_pilihan)
                            resolve(province_pilihan) 
                        }
                    })
                }else {
                    await get_all_province_from_courier(kurir_pilihan,kurir_kode).done(async function(response){
                        response.forEach((val,index)=>{
                            if(alamat_pilihan.toUpperCase().includes(val.Province.toUpperCase())){
                                province_pilihan = val.Province
                                
                                localStorage.setItem('province_customer',province_pilihan)
                                resolve(province_pilihan) 
                            }
                        })
                    })
                }
            }).catch((err)=>{
                
            })
        })
    })

}

const render_item_all_category=()=>{
    $('.box-render-new-category').empty()
    // http://products.sold.co.id/get-product-details?Get_ALL_Sub_Category_Based_On_Category=${Category}

    var data_atas = [
        'ADHESIVE',
        'APD',
        'HARDWARE',
        'SANITARY',
        'INTERIOR',
        'LAPISAN LEM',
        'ALAT PROYEK'
       
    ]
    var data_bawah = [
        'APD',
        'HARDWARE',
        'ADHESIVE'
    ]
    // 

    var all_subcategory_storage = JSON.parse(localStorage.getItem('all_subCategory'))
    var index_for_render = 0 // kalo udah 12 stop looping
    if(all_subcategory_storage != null || all_subcategory_storage.length > 0 ){
        all_subcategory_storage.map((val,index)=>{
            val[1].map((item,id)=>{
                if(index_for_render <=11){
                    index_for_render +=1
                    // 
                    $('.box-render-new-category').append(`
                        <div class="card-new-category" onclick="getAllItem_fromAllSubCat('${item.Subcategory}')">
                            <div class="cd-image-category shinny">
                                <img src="${replace_vtintl_to_sold_co_id(item.Picture_1)}" class="cd-img-category" onload="loadImageBigScreen()">
                            </div>
                            <p  id="highlight-product-skeleton" class="shinny" onload="loadImageBigScreen()"></p>
                            <p  id="highlight-product" onload="loadImageBigScreen()">${item.Subcategory}</p>
                        </div>
                    `)
                }
            })
        })
    }else {
        for(var i=0; i<data_atas.length; i++){    
            axios.post(`https://products.sold.co.id/get-product-details?Get_ALL_Sub_Category_Based_On_Category=${data_atas[i]}`)
            .then((res)=>{
             $('.box-render-new-category').empty()
                res.data.map((val,index)=>{
                    if(index<13){
                        $('.box-render-new-category').append(`
                        <div class="card-new-category" onclick="getAllItem_fromAllSubCat('${val.Subcategory}')">
                            <div class="cd-image-category shinny">
                                <img src="${replace_vtintl_to_sold_co_id(val.Picture_1)}" class="cd-img-category" onload="loadImageBigScreen()">
                            </div>
                            <p  id="highlight-product-skeleton" class="shinny" onload="loadImageBigScreen()"></p>
                            <p  id="highlight-product" onload="loadImageBigScreen()">${val.Subcategory}</p>
                        </div>
                        `)
                    }
                })
            }).catch((err)=>{
                
            })
            
        }

    }
    

        
    // for(var i=0; i<data_bawah.length; i++){
    //     // 
        
    //     axios.post(`https://products.sold.co.id/get-product-details?Get_ALL_Sub_Category_Based_On_Category=${data_bawah[i]}`)
    //     .then((res)=>{
    //         // 
    //         res.data.map((val,index)=>{
    //             // 
    //             $('.bot-all-category').append(`
    //                 <div class="card card-small-category" onclick="getAllItem_fromAllSubCat('${val.Subcategory}')">
    //                     <img src="${replace_vtintl_to_sold_co_id(val.Picture_1)}" class="card-img-top">
    //                     <h3 class="card-title">${val.Subcategory}</h3>
    //                 </div>
    //             `)
    //         })
    //     }).catch((err)=>{
            
    //     })
        
    // }
}

const get_all_cat_subCat_for_storage=()=>{

    
    var allData_category = []
    axios.post(`https://products.sold.co.id/get-product-details?Get_ALL_Category=true`)
    .then((res)=>{ 
        var cat_stringify = JSON.stringify(res.data)
        localStorage.setItem('all_category',cat_stringify)   
        var allData_subcat = []
        var detail_allCategory = []
        res.data.forEach((val,index)=>{
            axios.post(`https://products.sold.co.id/get-product-details?Get_ALL_Sub_Category_Based_On_Category=${val.Category}`)
            .then((res)=>{
                // 
                allData_subcat.push([{"Category":val.Category},res.data])
                var array_stringify = JSON.stringify(allData_subcat)
                localStorage.setItem('all_subCategory',array_stringify)
                // var get_array = JSON.parse(localStorage.getItem('all_subCategory'))
                // 
            }).catch((err)=>{
    
            })
        })
        // 
    }).catch((err)=>{
        
    })
}
const renderOptionSearch=()=>{
    $('.header-search-option').empty()
    var token = localStorage.getItem('token')
        axios.post(`https://products.sold.co.id/get-product-details?Get_ALL_Category=true`)
        .then((res)=>{
            // 
            res.data.map((val,index)=>{
                if(index<7){
                    $('.header-search-option').append(`
                    <p  class="hvr-grow" onclick="getAllItem_fromAllCat('${val.Category}')">${val.Category}</p>
                    `)
                }
            })

        }).catch((err)=>{
            
        })  
}
const getAllData=async()=>{
    // console.log('get all data jalan')
    var all_data = JSON.parse(localStorage.getItem('all_data_product'))
    var token = localStorage.getItem('token')
    allData = all_data
   
   axios.post('https://products.sold.co.id/get-product-details')
   .then((res)=>{
       if(all_data == undefined || all_data ==null || all_data.length == 0 || allData.length !== res.data.length){
           // alert('masuk ke if')
               allData = res.data
               renderItemPromo()
               renderItemNew()
               renderItemAll()
               renderCategory()
               render_item_all_category()
               renderOptionSearch()

               var stringify = JSON.stringify(allData)
               localStorage.setItem('all_data_product',stringify)
           
       }else {
           renderItemPromo()
           renderItemNew()
           renderItemAll()
           renderCategory()
           render_item_all_category()
           renderOptionSearch()
       }
      
    }).catch((err)=>{
          console.log(err)      
    })
    get_all_cat_subCat_for_storage()
    // NYARI PROVINCE DLL DARI ALAMAT CUSTOMER
    if(token !== null && token !== undefined && token.length>0) {
        
        var province =  await new_find_province_from_address()
        var city =  await new_find_city_from_address(province)
        var district =  await new_find_district_from_address(city)
        var subdistrict =  await new_find_subDistrict_from_address(district)
        localStorage.setItem('bayu','testingbayu')
        localStorage.setItem('province_customer',province)
        localStorage.setItem('city_customer',city)
        localStorage.setItem('district_customer',district)
        localStorage.setItem('sub_district_customer',subdistrict) 
    }


}


// CHECKING STORAGE PROVINCE DLL

async function save_locally_province_tiki(){
        
   
    await get_all_province_from_courier("tiki", "tiki").done(async function(response){
        localStorage.setItem("all_province_tiki", JSON.stringify(response));
        var total_province = response.length
        var i = 0;
        var all_city_tiki = [];
        for(i = 0; i < response.length; i++){
            all_city_tiki.push({
                Province: response[i].Province,
                City: await save_locally_city_tiki(response[i].Province)
            });
        }
        var test = JSON.parse(localStorage.getItem('all_province_tiki'))
        
        await localStorage.setItem("all_city_tiki", JSON.stringify(all_city_tiki));
        var all_district_tiki = [];
        
        for(i = 0; i < all_city_tiki.length; i++){
            for(z = 0; z < all_city_tiki[i].City.length; z++){
                if((all_city_tiki[i].City[z] != undefined)){
                    all_district_tiki.push({
                        City: all_city_tiki[i].City[z].City,
                        District: await save_locally_district_tiki(all_city_tiki[i].City[z].City)
                    });   
                }
            }
            
        }
        await localStorage.setItem("all_district_tiki", JSON.stringify(all_district_tiki));
        // var all_subdistrict_tiki = [];
        // for(i = 0; i < all_district_tiki.length; i++){
        //     for(z = 0; z < all_district_tiki[i].District.length; z++){
        //         if((all_district_tiki[i].District[z] != undefined)){
        //             // 
        //             all_subdistrict_tiki.push({
        //                 District: all_district_tiki[i].District[z].District,
        //                 SubDistrict: await save_locally_subdistrict_tiki(all_district_tiki[i].District[z].District)
        //             });  
        //         }
        //     }

           
            
        // }
        
        // await localStorage.setItem("all_subdistrict_tiki", JSON.stringify(all_subdistrict_tiki));
        
        var total_city = all_city_tiki.length
        var total_district = all_district_tiki.length
        var all_total = [total_province,total_city,total_district]
        
        await localStorage.setItem('total_province_city_district',JSON.stringify(all_total))
        await console.log(total_province)
        await console.log(total_city)
        await console.log(total_district)

        
    })
}
async function save_locally_city_tiki(Province){
    return new Promise(async (resolve, reject) => {
        await get_all_city_from_courier("tiki", "tiki", Province).done(async function(response){
            resolve(response);
        })
    })
}
async function save_locally_district_tiki(City){
    return new Promise(async (resolve, reject) => {
        await get_all_district_from_courier("tiki", "tiki", City).done(async function(response){
            resolve(response);
        })
    })
}
// async function save_locally_subdistrict_tiki(District){
//     return new Promise(async (resolve, reject) => {
//         await get_all_subdistrict_from_courier("tiki", "tiki", District).done(async function(response){
//             resolve(response);
//         })
//     })
// }


   
var all_total_province = JSON.parse(localStorage.getItem('total_province_city_district'))
var province_storage = JSON.parse(localStorage.getItem('all_province_tiki'))
var city_storage = JSON.parse(localStorage.getItem('all_city_tiki'))
var district_storage = JSON.parse(localStorage.getItem('all_district_tiki'))

if(province_storage === null){
    province_storage = 0
}
if(city_storage === null){
    city_storage = 0
}
if(district_storage === null){
    district_storage = 0
}
var total_province = province_storage.length
var total_city = city_storage.length
var total_district = district_storage.length
console.log(total_province, total_city,total_district)

console.log(total_province != null , total_city != null, total_district != null)
if(total_province != null && total_city != null && total_district != null){
    if(all_total_province[0] === total_province && all_total_province[1] === total_city && 
        all_total_province[2] === total_district){
            console.log('semua data ssama')
    }else {
        console.log('masuk ke else')
        console.log(all_total_province)
        console.log(province_storage)
        console.log(city_storage)
        console.log(district_storage)
        save_locally_province_tiki()
    }
}else {
    console.log('masuk ke else. save locally province jalan, searching all province dll')
    save_locally_province_tiki()
}



setInterval(() => {
// save_locally_province_tiki()
if(total_province != null && total_city != null && total_district != null){
    if(all_total_province[0] === total_province && all_total_province[1] === total_city && 
        all_total_province[2] === total_district){
            console.log('semua data ssama')
    }else {
        console.log('masuk ke else')
        save_locally_province_tiki()
    }
}else {
    console.log('masuk ke else. save locally province jalan, searching all province dll')
    save_locally_province_tiki()
}

}, 3600000);  
getAllData()