
setInterval(() => {
    var dataParse = JSON.parse(localStorage.getItem("itemsInCart"))
    // var dataParse = 8
    if(dataParse != null || dataParse != undefined ){
        if(dataParse > 9 && dataParse <99){
            alert('masuk ke if')
            $('.cart-counter').css('display','block')
            $('.cart-counter').css('top','30%')
            $('.cart-counter').css('right','30%')
            $('.cart-counter').css('font-size','11px')
            $('.cart-counter').text(dataParse.length)
        }else if (dataParse > 99){
            alert('masuk ke else if')
            $('.cart-counter').css('display','block')
            $('.cart-counter').css('top','30%')
            $('.cart-counter').css('right','28%')
            $('.cart-counter').css('font-size','10px')
            $('.cart-counter').val('99+')
            
        }else {
            // alert('masuk ke else')
            $('.cart-counter').css('display','block')
            // console.log(dataParse.length)
            $('.cart-counter').text(dataParse.length)

        }
        // $('.cart-counter').text(dataParse.length)
    }else {
        $('.cart-counter').css('display','none')
    }
}, 1000);   
var allData = []


$( document ).ready(function() {
    // getAllData()
    $('.ref-cod').on('change',function(){
        var selectedVal = $('.ref-cod option:selected').val()
        
    })
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const render_from = urlParams.get('render_from')
    const category = urlParams.get('category');
    const subcategory = urlParams.get('subcategory');
    const item_category = urlParams.get('product_id');
    const group_buy = urlParams.get('groupbuy_id')
    const list_hutang = urlParams.get('list_hutang')
    const detail_list_hutang = urlParams.get('detail_list_hutang')
    


    if(category != undefined){
        if(category.length > 0){
            
            renderItemBasedOnCategory(category);
        }
    }else if(subcategory != undefined){
        if(subcategory.length > 0){
            
            renderItemBasedOnSubCategory(subcategory);
        }
    }
    // bayu comment 4 november 2021
    else if(item_category != undefined){
        
        
        if(render_from == 'home'){
            render_get_product_detail(item_category)
        }else {
            // alert('masuk ke else')
            render_get_product_detail_searching_page(item_category)

        }
    }
    // bayu comment 4 november 2021
    else if (group_buy != undefined){
        // 
        // alert(group_buy)
        render_group_buy(group_buy)
    }
    else if (list_hutang !=undefined){
        // render_daftar_hutang()
        newRender_list_hutang()
    }else if (detail_list_hutang != undefined){
        detail_hutang_home(detail_list_hutang)
    }


    
   


   

});



// const get_all_cat_subCat_for_storage=()=>{

    
//     var allData_category = []
//     axios.post(`https://products.sold.co.id/get-product-details?Get_ALL_Category=true`)
//     .then((res)=>{
//         // 
//         var cat_stringify = JSON.stringify(res.data)
//         localStorage.setItem('all_category',cat_stringify)


        
//         var allData_subcat = []
//         var detail_allCategory = []
//         res.data.forEach((val,index)=>{
//             axios.post(`https://products.sold.co.id/get-product-details?Get_ALL_Sub_Category_Based_On_Category=${val.Category}`)
//             .then((res)=>{
//                 // 
//                 allData_subcat.push([{"Category":val.Category},res.data])
//                 var array_stringify = JSON.stringify(allData_subcat)
//                 localStorage.setItem('all_subCategory',array_stringify)
//                 // var get_array = JSON.parse(localStorage.getItem('all_subCategory'))
//                 // 
//             }).catch((err)=>{
    
//             })
//         })
//         // 
//     }).catch((err)=>{
        
//     })
// }


const getBase64Img=(product)=>{
    var all_array = []
    product.forEach((val,index)=>{
        // 
        convertImgToBase64(val.Picture_1, function(base64Img){
            // 
            all_array.push([`{"base64":${base64Img}}`,`{"Product_Code":${val.Product_Code}}`,val])
       
          });
        //   
    })
    // 
}

async function get_all_blob(val,index){
    // 
    return new Promise(async(resolve,reject)=>{
        // await product.forEach(async(val,index)=>{
            if(val.Picture_1.length >0 && val.Picture_1 != 'NULL' && val.Picture_2.length >0  && val.Picture_2 != 'NULL'&& val.Picture_3.length >0 && val.Picture_3 != 'NULL'){
                await loadXHR(`${val.Picture_1}`).then(async function(blob_1) {
                    await loadXHR(`${val.Picture_2}`).then(async function(blob_2) {
                        await loadXHR(`${val.Picture_3}`).then(async function(blob_3) {
                            // 
                            resolve([{blob_1:blob_1, blob_2:blob_2,blob_3:blob_3,val}])
                          });
                      });
                  });    
        }else if (val.Picture_1.length >0 && val.Picture_1 != 'NULL' && val.Picture_2.length >0 && val.Picture_2 != 'NULL'){
            await loadXHR(`${val.Picture_1}`).then(async function(blob_1) {
                await loadXHR(`${val.Picture_2}`).then(async function(blob_2) {
                    resolve([{blob_1:blob_1, blob_2:blob_2,val}])
                  });
              });  
        }else if (val.Picture_1.length >0 && val.Picture_1 != 'NULL' && val.Picture_3.length>0 && val.Picture_3  != 'NULL'){
            await loadXHR(`${val.Picture_1}`).then(async function(blob_1) {
                await loadXHR(`${val.Picture_3}`).then(async function(blob_3) {
                    resolve([{blob_1:blob_1, blob_3:blob_3,val}])
                  });
              });  
        }else if ( val.Picture_2.length >0 && val.Picture_2 != 'NULL' && val.Picture_3.length >0 && val.Picture_3 != 'NULL'){
            await loadXHR(`${val.Picture_2}`).then(async function(blob_2) {
                await loadXHR(`${val.Picture_3}`).then(async function(blob_3) {
                    resolve([{blob_2:blob_2, blob_3:blob_3,val}])
                  });
              });  
        }
        else {
            if(val.Picture_1.length >0 && val.Picture_1 != 'NULL'){
                // 
                await loadXHR(`${val.Picture_1}`).then(function(blob) {
                    resolve([{blob_1:blob,val}])
                  });
              
            }else if (val.Picture_2.length >0 && val.Picture_2 != 'NULL'){
                await loadXHR(`${val.Picture_2}`).then(function(blob) {
                    // here the image is a blob
                    resolve([{blob_2:blob,val}])
                  });
                
            }else if (val.Picture_3.length >0 && val.Picture_3 != 'NULL'){
                await loadXHR(`${val.Picture_3}`).then(function(blob) {
                    // here the image is a blob
                    resolve([{blob_3:blob,val}])
                  });
            }else {

                
            }
            // 
            
        }
        // 
        // })
    })
}





async function loop_through_items(page, item_no){
    return new Promise(async (resolve, reject) => {
        var options = {
            'method': 'GET',
            'url': `https://public.accurate.id/accurate/api/item/list.do?sp.page=${page}`,
            'headers': {
                'Authorization': `Bearer ${access_token}`,
                'X-Session-ID': `${session}`
            }
        };
        await request(options, async function (error, response) {
            if (error) {
                
                resolve(await loop_through_items(page, item_no));
            }else{
                if(response.body != undefined){
                    let response_body = JSON.parse(response.body);
                    if(response_body.d != undefined){
                        let i = 0;
                        for(i; i < response_body.d.length; i++){
                            let item_information = (await get_item_details(response_body.d[i].id));
                            if(item_no === item_information.no){
                                resolve(item_information);
                                i = response_body.d.length;
                            }
                        }
                        resolve(false);
                    }else{
                        resolve(false);
                    }
                }else{
                    resolve(false);
                }
            }
        });
    });
}



function loadXHR(url) {

    return new Promise(function(resolve, reject) {
        try {
            var xhr = new XMLHttpRequest();
            xhr.open("GET", url);
            xhr.responseType = "blob";
            xhr.onerror = function() {reject("Network error.")};
            xhr.onload = function() {
                if (xhr.status === 200) {resolve(xhr.response)}
                else {reject("Loading error:" + xhr.statusText)}
            };
            xhr.send();
        }
        catch(err) {reject(err.message)}
    });


    // cara jalaninnya

    
}


/*
cara rubah blob to base64s
var convert_base = ''
var reader = new FileReader()
reader.readAsDataURL(blob)
reader.onloadend = function(){
    var base64data = reader.result
    convert_base = base64data
    
}


*/
function convertImgToBase64(url, callback, outputFormat){
	var canvas = document.createElement('CANVAS');
	var ctx = canvas.getContext('2d');
	var img = new Image;
	img.crossOrigin = 'Anonymous';
	img.onload = function(){
		canvas.height = img.height;
		canvas.width = img.width;
	  	ctx.drawImage(img,0,0);
	  	var dataURL = canvas.toDataURL(outputFormat || 'image/png');
	  	callback.call(this, dataURL);
        // Clean up
	  	canvas = null; 
	};
	img.src = url;
}


// const renderOptionSearch=()=>{

//     var token = localStorage.getItem('token')
//         axios.post(`https://products.sold.co.id/get-product-details?Get_ALL_Category=true`)
//         .then((res)=>{
//             // 
//             res.data.map((val,index)=>{
//                 if(index<7){
//                     $('.header-search-option').append(`
//                     <p  class="hvr-grow" onclick="getAllItem_fromAllCat('${val.Category}')">${val.Category}</p>
//                     `)
//                 }
//             })

//         }).catch((err)=>{
            
//         })  
// }

const get_product_detail_from_main_page=(product_id)=>{
    
$('.new-box-category').toggle(500)
$('.box-delete-success').css('display','block')
$('.modals-new-product-detail').css('display','block')
$('.main-body').css('display','none')
$('.modals-new-product-detail').attr('src',`./Iframe/new_product_detail.html?product_id=${product_id}&render_from=home`)
$('.new-box-category').css('display','none')

}

// // RENDER DATA HOME
// const renderItemPromo=()=>{
//     $('.box-render-promo').append(`
//         <div class="promo_card">
//             <img src="../WEB/img/new_ads.png" alt="" class="ads_samping" onclick="get_product_detail_from_main_page('6900005030114')">
//         </div>
//     `)
//     allData.map((val,index)=>{
//         // 
//         var hargaAwal = parseInt(val.Sell_Price)
//         var discount = parseInt(val.Sell_Price * 0.1)
//         var hargaTotal = hargaAwal + discount
//         // 

//         var a = 'ASDASDASDASD'
//         var b = parseInt(a)
//         var c = isNaN(b)

//         if(val == false || val.Sell_Price == 'NULL' || val.Sell_Price == undefined  || val.Sell_Price == null || isNaN(hargaAwal)
//         ){
          
//         }else {
//             if(val.GroupBuy_Purchase == 'true' || val.GroupBuy_Purchase == true || val.GroupBuy_Purchase == 'yes'){

//                 var imgBase = ''
//                     // convertImgToBase64(val.Picture_1, function(base64Img){
//                         // 
//                         // all_array.push([`{"base64":${base64Img}}`,`{"Product_Code":${val.Product_Code}}`,val])
//                         // imgBase = base64Img
//                         $('.box-render-promo').append(
//                             ` 
//                                 <div class="card-item hvr-float-shadow new_card_item">
//                                     <img src="${val.Picture_1}" alt="" class="img-card" onclick="get_product_detail_from_main_page('${val.Product_Code}')">   
//                                     <div class="card-item-list">
//                                         <p class="limited-text-short">${val.Name}</p>
//                                         <div class="split-item">
//                                             <div class="item-price">
//                                                 <p>RP. ${commafy(hargaTotal)}</p>
//                                                 <p>Rp. ${commafy(hargaAwal)}</p>
//                                             </div>
//                                             <div class="buy-icon" onclick="addToCart('${val.Product_Code}')">
//                                                 <img src="./img/cart.png" alt="" class="icon-buy" id="${val.Product_Code}">
//                                                 <img src="./img/badge_groupbuy.png" alt="" class="img-badge-best">
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                                 `
//                             )
//                             // 
//                     // });
//                   }


//             }        
//     })
// }
// const renderItemNew=()=>{
//     allData.map((val,index)=>{
//         var hargaAwal = parseInt(val.Sell_Price)
//         var discount = parseInt(val.Sell_Price * 0.1)
//         var hargaTotal = hargaAwal + discount
//     if(val == false || val.Sell_Price == 'NULL' || val.Sell_Price == 0 || val.Sell_Price < 1 ||
//     val.Sell_Price == undefined  || val.Sell_Price == null || isNaN(hargaAwal)
//     ){
        
//     }else {

//         if(val.GroupBuy_Purchase == 'true'){

//         }else if (val.Categorize_NEW == 'true'){

//                 $('.box-render-new').append(
//                     ` 
//                         <div class="card-item hvr-float-shadow " >
//                             <img src="${val.Picture_1}" alt="" class="img-card" onclick="get_product_detail_from_main_page('${val.Product_Code}')">   
//                             <div class="card-item-list">
//                                 <p class="limited-text-short">${val.Name}</p>
//                                 <div class="split-item">
//                                     <div class="item-price">
//                                         <p>RP. ${commafy(hargaTotal)}</p>
//                                         <p>Rp. ${commafy(hargaAwal)}</p>
//                                     </div>
//                                     <div class="buy-icon" onclick="addToCart('${val.Product_Code}')">
//                                         <img src="./img/cart.png" alt="" class="icon-buy" id="${val.Product_Code}">
//                                         <img src="./img/badge_new.png" alt="" class="img-badge-new">
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                         `
//                     )
//         }else {
//         }

//     }
//     })
// }
// const renderItemAll=()=>{
//     allData.map((val,index)=>{
//         // 
//         var hargaAwal = parseInt(val.Sell_Price)
//         var discount = parseInt(val.Sell_Price * 0.1)
//         var hargaTotal = hargaAwal + discount
//     //  
//     if(val == false || val.Sell_Price == 'NULL' || val.Sell_Price == 0 || val.Sell_Price < 1 ||
//     val.Sell_Price == undefined  || val.Sell_Price == null || isNaN(hargaAwal)
//     ){
        
//     }else {

//         if(val.GroupBuy_Purchase == 'true'){
//                 $('.box-render-all').append(
//                     ` 
//                         <div class="card-item hvr-float-shadow " >
//                             <img src="${val.Picture_1}" alt="" class="img-card" onclick="get_product_detail_from_main_page('${val.Product_Code}')">   
//                             <div class="card-item-list">
//                                 <p class="limited-text-short">${val.Name}</p>
//                                 <div class="split-item">
//                                     <div class="item-price">
//                                         <p>RP. ${commafy(hargaTotal)}</p>
//                                         <p>Rp. ${commafy(hargaAwal)}</p>
//                                     </div>
//                                     <div class="buy-icon" onclick="addToCart('${val.Product_Code}')">
//                                         <img src="./img/cart.png" alt="" class="icon-buy" id="${val.Product_Code}">
//                                         <img src="./img/badge_groupbuy.png" alt="" class="img-badge-best">
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                         `
//                     )
//         }else if (val.Categorize_NEW == 'true'){
//             $('.box-render-all').append(
//                 ` 
//                     <div class="card-item hvr-float-shadow " data-aos="zoom-in">
//                         <img src="${replace_vtintl_to_sold_co_id(val.Picture_1)}" alt="" class="img-card" onclick="get_product_detail_from_main_page('${val.Product_Code}')">   
//                         <div class="card-item-list">
//                             <p class="limited-text-short">${val.Name}</p>
//                             <div class="split-item">
//                                 <div class="item-price">
//                                     <p>RP. ${commafy(hargaTotal)}</p>
//                                     <p>Rp. ${commafy(hargaAwal)}</p>
//                                 </div>
//                                 <div class="buy-icon" onclick="addToCart('${val.Product_Code}')">
//                                     <img src="./img/cart.png" alt="" class="icon-buy" id="${val.Product_Code}">
//                                     <img src="./img/badge_new.png" alt="" class="img-badge-new">
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                     `
//                 )
//         }else {
//             $('.box-render-all').append(
//             ` 
//                 <div class="card-item hvr-float-shadow " data-aos="zoom-in">
//                     <img src="${replace_vtintl_to_sold_co_id(val.Picture_1)}" alt="" class="img-card" onclick="get_product_detail_from_main_page('${val.Product_Code}')">   
//                     <div class="card-item-list">
//                         <p class="limited-text-short">${val.Name}</p>
//                         <div class="split-item">
//                             <div class="item-price">
//                                 <p>RP. ${commafy(hargaTotal)}</p>
//                                 <p>Rp. ${commafy(hargaAwal)}</p>
//                             </div>
//                             <div class="buy-icon" onclick="addToCart('${val.Product_Code}')">
//                                 <img src="./img/cart.png" alt="" class="icon-buy" id="${val.Product_Code}">
//                                 <img src="./img/best_seller.png" alt="" class="img-badge-best">
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                 `
//             )
//         }

//     }
//     })
// }

// // RENDER DATA HOME


// const renderCategory=()=>{
//     // var subCat = 'ADHESIVE'
//     // alert('render category jalan')
//     axios.post('https://products.sold.co.id/get-product-details?Get_ALL_Category=true')
//     .then((res)=>{
        
//         res.data.map((val,index)=>{
//             var sub = val.Category.toUpperCase()    
//             var split = sub.split(' ').join('_')
            
//             $('.lg_home').append(
//                 ` 
//                 <li class="list-group-item category-list get-item close-category " val="${sub}" onclick="findSubCategory('${sub}')" id="id_sub-${split}">${sub}</li>
//                 `
//                 )
//         })
//     }).catch((err)=>{
        
//     })
// }



const getAllItem_fromAllCat=(item)=>{
    $(this).scrollTop('.modals-lk')
    $('.close-button').css('display','block')
    $('.modals-lk').css('display','block')
    $('.modals-lk').attr('src',`./Iframe/listkategori.html?category=${item}`)
    $('.new-box-category').css('display','none')
}

const getAllItem_fromAllSubCat=(item)=>{
    // 

    // $('.new-box-category').toggle(500) // buat close category header
    let timerInterval
    Swal.fire({
    // title: 'Loading Your Request',
    html: `
    <div class="boxcon">
        <div class="box1">
        </div>
        <div id="sold-id-loading">
        SOLDAYS 
        </div>
            
        <div class="box2">
        </div>
    </div>
    `,
    timer: 300000,
    timerProgressBar: true,
    allowOutsideClick: false,
    didOpen: () => {
        Swal.showLoading()
        $(this).scrollTop('.modals-lk')
        $('.close-button').css('display','block')
        $('.modals-lk').css('display','block')
        $('.modals-lk').attr('src',`./Iframe/listkategori.html?subcategory=${item}`)
        // $('.new-box-category').toggle(500)
        $('.new-box-category').css('display','none')

        Swal.fire({
            html:`
            <div class="o-circle c-container__circle o-circle__sign--failure">
                <div class="o-circle__sign"></div>  
            </div> 
            `,
            timer:100,
            
        })
        timerInterval = setInterval(() => {
        const content = Swal.getContent()
        }, 100)
    },
    willClose: () => {
        clearInterval(timerInterval)
    }
    }).then((result) => {
        /* Read more about handling dismissals below */
        if (result.dismiss === Swal.DismissReason.timer) {
           
            
        }
    })
}
const getAllItem=(item)=>{
    // 
    // 
    // 
    // $('.modals-lk').attr('src',`../WEB/Iframe/listkategori.html?subcategory=${item}`)
    location.replace(`./listkategori.html?subcategory=${item}`)
    
}

const findSubCategory=(sub)=>{
    // $('.modals-lk').css('display','block')
    // alert('findsubcategory jalan')

    $('.box_iframe_groupbuy').css('display','none')

    $('.close-button').css('display','block')
    // $('')

    var split = sub.split(' ').join('_')
    
    $('.list-group-item').removeClass('active-cl')
    $(`#id_sub-${split}`).addClass('active-cl')
    
    // 
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
    
    // $("#loginModal").modal("hide");
    $("#newloginModal").modal("hide");
    // $('#newloginModal').modal('hide')
    // $("#daftarHutangModal").modal('show')
        axios.post(`https://customers.sold.co.id/get-available-referral-codes
        `).then((res)=>{
            res.data.map((val,index)=>{
                // 
                // 
                $('.option-referral').append(`
                    <option value="${val.Customer_Code}" class="id-referral">${val.First_Name} ${val.Last_Name} - ${val.Nama_Perusahaan}</option>
                `)
            })
        }).catch((err)=>{
            
        })

        var allKurir = []
        var allProvince = []
        var allKota =[]
        var allDistrict =[]
        var allSub_District = []
        var province =[]
        var kota =[]
        var district =[]
        var sub_district=[]
        get_all_couriers().done(function(response){
            // 

            get_all_province_from_courier('tiki','tiki').done(function(response){
                province = response[0]
                allProvince = response
                get_all_city_from_courier('tiki','tiki',province.Province).done(function(response){
                    
                    kota = response[0]
                    allKota = response
                    get_all_district_from_courier('tiki','tiki',kota.City).done(function(response){
                        district = response[0]
                        allDistrict = response
                        get_all_subdistrict_from_courier('tiki','tiki',district.District).done(function(response){
                            allSub_District = response
                            sub_district = response[0]

                          
                            allProvince.map((val,index)=>{
                                $('.register-provinsi').append(`
                                    <option  value="${val.Province}" class="reg-provinsi">${val.Province}</option> 
                                `)
                            })
                            allKota.map((val,index)=>{
                                $('.register-kota').append(`
                                    <option  value="${val.City}" class="reg-kota">${val.City}</option> 
                                `)
                            })
                            allDistrict.map((val,index)=>{
                                $('.register-kecamatan').append(`
                                <option  value="${val.District}" class="reg-kecamatan">${val.District}</option> 
                                `)
                            })
                            allSub_District.map((val,index)=>{
                                $('.register-kelurahan').append(`
                                <option  value="${val.Sub_District}" class="reg-kelurahan">${val.Sub_District}</option> 
                                `)
                              
                            })
                        })
                    })
                })
            })
        })
}


const re_render_register=()=>{
    var allKurir = []
    var allProvince = []
    var allKota =[]
    var allDistrict =[]
    var allSub_District = []
    var province =[]
    var kota =[]
    var district =[]
    var sub_district=[]
    get_all_couriers().done(function(response){
        // 

        get_all_province_from_courier('tiki','tiki').done(function(response){
            province = response[0]
            allProvince = response
            get_all_city_from_courier('tiki','tiki',province.Province).done(function(response){
                
                kota = response[0]
                allKota = response
                get_all_district_from_courier('tiki','tiki',kota.City).done(function(response){
                    district = response[0]
                    allDistrict = response
                    get_all_subdistrict_from_courier('tiki','tiki',district.District).done(function(response){
                        allSub_District = response
                        sub_district = response[0]
                        $('.register-provinsi').empty()
                        $('.register-kota').empty()
                        $('.register-kecamatan').empty()
                        $('.register-kelurahan').empty()

                        $('.register-provinsi').append(`
                            <option selected  class="reg-provinsi"> Provinsi</option>      
                        `)
                        $('.register-kota').append(`
                            <option selected  class="reg-kota"> Kota</option>      
                        `)
                        $('.register-kecamatan').append(`
                            <option selected  class="reg-kecamatan"> Kecamatan</option>      
                        `)
                        $('.register-kelurahan').append(`
                            <option selected  class="reg-kelurahan"> Kelurahan</option>      
                        `)


                        allProvince.map((val,index)=>{
                            $('.register-provinsi').append(`
                                <option  value="${val.Province}" class="reg-provinsi">${val.Province}</option> 
                            `)
                        })
                        allKota.map((val,index)=>{
                            $('.register-kota').append(`
                                <option  value="${val.City}" class="reg-kota">${val.City}</option> 
                            `)
                        })
                        allDistrict.map((val,index)=>{
                            $('.register-kecamatan').append(`
                            <option  value="${val.District}" class="reg-kecamatan">${val.District}</option> 
                            `)
                        })
                        allSub_District.map((val,index)=>{
                            $('.register-kelurahan').append(`
                            <option  value="${val.Sub_District}" class="reg-kelurahan">${val.Sub_District}</option> 
                            `)
                          
                        })
                    })
                })
            })
        })
    })
}




const get_product_detail=(product_id)=>{
    // $('.box-list-kategori').empty()
    // $('.box-list-kategori').css('display','none')
    // $('.box-list-kategori').css('display','none')
    // $('.modals-product-detail').css('display','block')
    // $('.modals-product-detail').attr('src',`../Iframe/itemDetail.html?product_id=${product_id}&render_from=home`)
    
    //close body
    window.parent.$('.main-body').css('display','none')

    window.parent.$('.close-button').css('display','none')
    window.parent.$('.modals-lk').css('display','none')
    window.parent.$('.modals-new-product-detail').css('display','block')
    window.parent.$('.modals-new-product-detail').attr('src',`../../WEB/Iframe/new_product_detail.html?product_id=${product_id}&render_from=home`)
    
    // $('.modals-lk').remove()
    // 
    // render_get_product_detail(product_id)
    // location.assign(`../Iframe/itemDetail.html`)
}

const renderItemBasedOnSubCategory=(subCategory)=>{
    


    let timerInterval
    Swal.fire({
    title: 'Please Wait!',
    html: ` 
    <div class="boxcon">
       <div class="box1">
       </div>
       <div id="sold-id-loading">
       SOLDAYS 
       </div>
           
       <div class="box2">
       </div>
   </div>
   `,
    timer: 30000000,
    timerProgressBar: true,
    didOpen: () => {
        Swal.showLoading()


        var allDataProduct = []
        var allData_storage = JSON.parse(localStorage.getItem('all_data_product'))
        
        if(allData_storage != undefined && allData_storage.length !=0){
            allData_storage.forEach((val,index)=>{ 
                if(val.Subcategory == subCategory){
                    console.log(val.Product_Code)
                    allDataProduct.push(val)
                    var hargaAwal = parseInt(val.Sell_Price)
                    var discount = parseInt(val.Sell_Price * 0.1)
                    var hargaTotal = hargaAwal + discount
                    $('.box-list-kategori').append(
                        `
                        <div class="card-all-item hvr-float-shadow" id="${val.Product_Code}" onclick="get_product_detail('${val.Product_Code}')">
                            <img src="${replace_vtintl_to_sold_co_id(val.Picture_1)}" alt="" class="img-all-card">   
                            <div class="card-all-item-list">
                                <p class="limited-text-short">${val.Name}</p>
                                <div class="split-all-item">
                                    <div class="item-all-price">
                                        <p>RP. ${commafy(hargaTotal)}</p>
                                        <p>Rp. ${commafy(hargaAwal)}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        `
                    );
                }
            })

            $('.modals-lk').addClass('melihat') // ini bisa hampir
            $('.modals-lk').css('display','block')
            Swal.fire({
                title: 'Uploading Data',
                timer:100,
            }) 
        }else {
            axios.post(`https://products.sold.co.id/get-product-details?subcategory=${subCategory}`)
            .then((res)=>{
                // $('.modals-lk').attr('src',`../WEB/Iframe/kategoriItem.html?subcategory=${subCategory}`)  

                res.data.map((val,index)=>{
                    var hargaAwal = parseInt(val.Sell_Price)
                    var discount = parseInt(val.Sell_Price * 0.1)
                    var hargaTotal = hargaAwal + discount
                    console.log(val.Product_Code)
                    $('.box-list-kategori').append(
                    `
                        <div class="card-all-item hvr-float-shadow" id="${val.Product_Code}" onclick="get_product_detail('${val.Product_Code}')">
                            <img src="${replace_vtintl_to_sold_co_id(val.Picture_1)}" alt="" class="img-all-card">   
                            <div class="card-all-item-list">
                                <p class="limited-text-short">${val.Name}</p>
                                <div class="split-all-item">
                                    <div class="item-all-price">
                                        <p>RP. ${commafy(hargaTotal)}</p>
                                        <p>Rp. ${commafy(hargaAwal)}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        `
                    )
                }) 
                $('.modals-lk').addClass('melihat') // ini bisa hampir
                $('.modals-lk').css('display','block')
                Swal.fire({
                    title: 'Uploading Data',
                    timer:100,
                }) 
            }).catch((err)=>{
                
            })

        }

     
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
    })
   
}

const renderItemBasedOnCategory=(Category)=>{
    // var myFrame = $(".modals-item").contents().find('.box-list-kategori');
    // alert('render item based on category jalan 360')
    let timerInterval
        Swal.fire({
        title: 'Uploading Data',
        timer:300000000,
        html: ` 
        <div class="boxcon">
            <div class="box1">
            </div>
            <div id="sold-id-loading">
            SOLDAYS 
            </div>
                
            <div class="box2">
            </div>
        </div>
    `,
        // timer: 1500,
        timerProgressBar: true,
        didOpen: () => {
            Swal.showLoading()

            var allDataProduct = []
            var allData_storage = JSON.parse(localStorage.getItem('all_subCategory'))
            // var allData_storage = []
            if(allData_storage != undefined && allData_storage.length !=0) {
                // 
                allData_storage.forEach((val,index)=>{
                    // 
                    // 
                    if(val[0].Category.toUpperCase() == Category.toUpperCase() ){
                        // 
                        allDataProduct.push(val)
                    }
                })
                allDataProduct[0][1].map((val,index)=>{
                   $('.box-list-kategori').append(
                       `
                       <div class="card-lk hvr-float-shadow" onclick="getAllItem('${val.Subcategory}')">
                           <div class="box-img-lk">
                               <img src="${replace_vtintl_to_sold_co_id(val.Picture_1)}" alt="">
                           </div>
                           <p>${val.Subcategory}</p>
                       </div>
                       `
                       )
                   })
                   $('.modals-lk').addClass('melihat') // ini bisa hampir
                   // $('.modals-lk').attr('src',`../WEB/Iframe/listkategori.html?subcategory=${subcategory}`) 
                   $('.modals-lk').css('display','block')  
                   // alert('render item based on category jalan 407')
                   Swal.fire({
                       title: 'Uploading Data',
                       timer:100,
                   })
            }else {
                // 
                axios.post(`https://products.sold.co.id/get-product-details?Get_ALL_Sub_Category_Based_On_Category=${Category}`)
                .then((res)=>{
                    allDataProduct.push(res.data)
                    res.data.map((val,index)=>{
                       $('.box-list-kategori').append(
                           `
                           <div class="card-lk hvr-float-shadow" onclick="getAllItem('${val.Subcategory}')">
                               <div class="box-img-lk">
                                   <img src="${replace_vtintl_to_sold_co_id(val.Picture_1)}" alt="">
                               </div>
                               <p>${val.Subcategory}</p>
                           </div>
                           `
                           )
                       })
                       $('.modals-lk').addClass('melihat') // ini bisa hampir
                       // $('.modals-lk').attr('src',`../WEB/Iframe/listkategori.html?subcategory=${subcategory}`) 
                       $('.modals-lk').css('display','block')  
                       // alert('render item based on category jalan 407')
                       Swal.fire({
                           title: 'Uploading Data',
                           timer:100,
                       })
                }).catch((err)=>{
                    
                })
            }
          
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
        })
    
   
}


function close_all_open_window(){
    $('.new-box-category .list-group .get-item').removeClass('active-cl')
    $(".force-close-all-command").css("display", "none");
    $('.option-0').removeClass("background_grey");
    $('.option-1').removeClass("background_grey");
    $('.option-2').removeClass("background_grey");
    $('.option-3').removeClass("background_grey");
    $('.option-4').removeClass("background_grey");
    $('.option-5').removeClass("background_grey");
    $('.box-delete-success').css('display','none')

    $(".force-close-all-command",window.parent.parent.document).css("display", "none");
    $('.option-0',window.parent.parent.document).removeClass("background_grey");
    $('.option-1',window.parent.parent.document).removeClass("background_grey");
    $('.option-2',window.parent.parent.document).removeClass("background_grey");
    $('.option-3',window.parent.parent.document).removeClass("background_grey");
    $('.option-4',window.parent.parent.document).removeClass("background_grey");
    $('.option-5',window.parent.parent.document).removeClass("background_grey");
    $('.box-delete-success',window.parent.parent.document).css('display','none')
    

    
}

function back_to_home(){
    $(".force-close-all-command-2").css("display", "none");
    $('.main-body').css('display','block')
    $('.active_search').css('top','0px')
    $('#newloginTokpedModal').modal('hide')
    window.parent.$('.box-product').css('display','flex')
    window.parent.$('.main-body').css('display','block')
    window.parent.$('.force-close-all-command-2').css('display','none')
}
// const find_province_from_address= async ()=>{
//     return new Promise(async (resolve, reject) => {
//         var province_from_storage = JSON.parse(localStorage.getItem('all_province_tiki'))
//         var province_pilihan =''
//         var token = localStorage.getItem('token')
//         var kurir_pilihan = ''
//         var kurir_kode = ''
//         var alamat_pilihan = ''
//         await get_all_couriers().done(async function(response){
//             kurir_pilihan = response[0].Courier
//             kurir_kode = response[0].Courier_Code
//             await axios.post(`https://customers.sold.co.id/get-customer-information?Customer_Code=${token}`)
//             .then(async (res)=>{
//                 alamat_pilihan = res.data.Address_1
//                 if(province_from_storage != undefined &&  province_from_storage.length != 0){
//                     province_from_storage.forEach((val,index)=>{
//                         if(alamat_pilihan.toUpperCase().includes(val.Province.toUpperCase())){
//                             province_pilihan = val.Province
//                             resolve(province_pilihan) 
//                         }
//                     })
//                 }else {
//                     await get_all_province_from_courier(kurir_pilihan,kurir_kode).done(async function(response){
//                         response.forEach((val,index)=>{
//                             if(alamat_pilihan.toUpperCase().includes(val.Province.toUpperCase())){
//                                 province_pilihan = val.Province
//                                 resolve(province_pilihan) 
//                             }
//                         })
//                     })
//                 }
//             }).catch((err)=>{
//                 
//             })
//         })
//     })

// }

const render_group_buy=(product_id)=>{
    Swal.fire({
        // title: 'Uploading Data',
        timer:300000000,
        html: ` 
        <div class="boxcon">
            <div class="box1">
            </div>
            <div id="sold-id-loading">
            SOLDAYS 
            </div>
                
            <div class="box2">
            </div>
        </div>
    `,didOpen:async()=>{

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
        
        var province_customer = localStorage.getItem('province_customer')
        var city_customer = localStorage.getItem('city_customer')
        var district_customer = localStorage.getItem('district_customer')
        var sub_district_customer = localStorage.getItem('sub_district_customer')
    
        axios.post(`https://products.sold.co.id/get-product-details?product_code=${product_id}`)
        .then((res)=>{
            var item_product = res.data
            var option_payment
            axios.post(`https://paymntmthd.sold.co.id/get-all-payment-method`)
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
                                    <input type="text" class="new-kodepos-form qty_groupbuy_home" value="1" placeholder="Kuantitas Permintaan" id="${product_id}" onchange="check_qty(this.value)">
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
                                                <div class="address-card-1 radio_address_card  selected active_address_method" data-value="Alamat Lain" id="id-address-gb-baru" onclick="addressMethod('id-address-gb-baru','Alamat Baru')">
                                                    <img src="../img/alamat_lain.png" alt="" class="bca_img">
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                    <div class="new-login-name new-alamat-pengiriman">
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
                                <div class="input-group mb-3 input-card-sp province-box-gb">
                                    <div class="input-group-prepend">
                                        <label class="input-group-text" for="inputGroupSelect01">Provinsi</label>
                                    </div>
                                    <select class="custom-select home_provinsi_hover province-home-gb" id="inputGroupSelect01"  onchange="provinceMethodHome('${product_id}')" >  
                                        <option  selected  class="id-kurir-gb"> Provinsi</option>  
                                    </select>
                                </div>
                                <div class="input-group mb-3 input-card-sp kota-box-gb">
                                    <div class="input-group-prepend">
                                        <label class="input-group-text" for="inputGroupSelect01">Kota</label>
                                    </div>
                                    <select class="custom-select home_kota_hover kota-home-gb" id="inputGroupSelect01"  onchange="kotaMethodHome('${product_id}')" >  
                                        <option selected  class="id-kota-gb"> Kota</option>      
                                    </select>
                                </div>
                                <div class="input-group mb-3 input-card-sp kecamatan-box-gb">
                                    <div class="input-group-prepend">
                                        <label class="input-group-text" for="inputGroupSelect01">Kecamatan</label>
                                    </div>
                                    <select class="custom-select kelurahan_kelurahan_hover kecamatan-home-gb" id="inputGroupSelect01" onchange="kecamatanMethodHome('${product_id}')" >  
                                        <option selected  class="id-kecamatan-gb">Kecamatan</option>      
                                    </select>
                                </div>   
                                 
                                
                            </div>
                            <div class="new-card-kurir-sp-bot">              
                                <div class="input-group mb-3 input-card-sp kelurahan-box-gb">
                                    <div class="input-group-prepend">
                                        <label class="input-group-text" for="inputGroupSelect01">Kelurahan</label>
                                    </div>
                                    <select class="custom-select home_kecamatan_hover kelurahan-home-gb" id="inputGroupSelect01"  onchange="kelurahanMethodHome('${product_id}')" >  
                                        <option selected  class="id-kelurahan-gb">Kelurahan</option>      
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
                                    
                                <div class="input-group mb-3 input-card-sp new-gb-pengiriman">
                                    <div class="input-group-prepend">
                                        <label class="input-group-text" for="inputGroupSelect01">Pengiriman</label>
                                    </div>
                                    <select class="custom-select kelurahan_kelurahan_hover pengiriman-home-gb" id="inputGroupSelect01" onchange="pengirimanMethodHome('${product_id}')" >  
                                        <option selected  class="id-pengiriman-gb">Waktu Pengiriman</option>      
                                    </select>
                                </div>  
    
                                <div class="input-group mb-3 input-card-sp new-gb-asuransi">
                                    <div class="input-group-prepend">
                                        <label class="input-group-text" for="inputGroupSelect01">Asuransi</label>
                                    </div>
                                    <select class="custom-select kelurahan_kelurahan_hover asuransi-home-gb" id="inputGroupSelect01" onchange="asuransiMethodHome('${product_id}')" >  
                                        <option selected  class="id-asuransi-gb">Asuransi</option>      
                                    </select>
                                </div>  
    
                                <div class="input-group mb-3 input-card-sp new-gb-packing">
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
                             <img src="${replace_vtintl_to_sold_co_id(item_product.Picture_1)}" alt="" class="img-gr">
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
                // var province_pilihan =  await find_province_from_address()
                // var kota_pilihan = await find_city_from_address(province_pilihan)
                // var kecamatan_pilihan = await find_district_from_address(kota_pilihan)
                // var kelurahan_pilihan = await find_subDistrict_from_address(kecamatan_pilihan)
                // 
                // 
                // 
                // 
    
                //  RENDER KURIR DLL
                    get_all_couriers().done(function(response){
                        
                        kurir = response[0]
    
                        allKurir = response
                        if(province_customer != undefined && city_customer != undefined 
                            && district_customer != undefined && sub_district_customer != undefined){
                                get_all_province_from_courier(kurir.Courier,kurir.Courier_Code).done(function(response){
                                    province = response[0]
                                    allProvince = response
                                    
                                    get_all_city_from_courier(kurir.Courier,kurir.Courier_Code,province_customer).done(function(response){
                                        kota = response[0]
                                        allKota = response
                                        
                                        get_all_district_from_courier(kurir.Courier,kurir.Courier_Code,city_customer).done(function(response){
                                            
                                            kecamatan = response[0]
                                            district = response[0]
                                            allKecamatan = response
                                            allDistrict = response
                                            
                                            get_all_subdistrict_from_courier(kurir.Courier,kurir.Courier_Code,district_customer).done(function(response){
                                                kelurahan = response
                                                allKelurahan = response
                                                allSub_District = response
                                                
                                                var Courier_Price_Code_orig = 'CGK01.00'
                                                var packing_type = ''
                                                var berat_product = parseInt(item_product.Weight_KG)
                                                
                                                
                                                if(berat_product == 0){
                                                    berat_product = 0.1
                                                }
                                                var length = ''
                                                var  width = '' 
                                                var  height = ''
                                                var paket_value = '' 
                                                
                                                
                                                // get_shipping_cost_informations(kurir.Courier,kurir.Courier_Code,province.Province,kota.City,kelurahan.District,kecamatan[0].Sub_District).done(function(response){
                                                    new_get_shipping_cost_informations(Courier_Price_Code_orig , allKelurahan[0].Courier_Price_Code, packing_type, berat_product, length, width, height, paket_value).done(function(response){
                                                        allPengiriman = response
                                                    
                                                    if(allPengiriman){
                                                        if(allPengiriman.service != undefined) {
                                                            allPengiriman.service.map((val,index)=>{
                                                                var tarif = val.TARIFF * 1.2
                                                                $('.pengiriman-home-gb').append(`
                                                                    <option  value="${val.EST_DAY}days ${val.SERVICE} ${tarif} ${val.DESCRIPTION} " class="${tarif}">${val.EST_DAY}days ${val.SERVICE} ${tarif} ${val.DESCRIPTION} </option> 
                                                                `)
                                                            })
                                                        }
                                                        if(allPengiriman.insurance !=undefined){
                                                            allPengiriman.insurance.map((val,index)=>{
                                                                $('.asuransi-home-gb').append(`
                                                                    <option  value="type ${val.INSURANCE_TYPE} ${val.INSURANCE_NAME} ${val.INSURANCE_COST}" class="${val.INSURANCE_COST}">${val.INSURANCE_NAME} - RP ${val.INSURANCE_COST} </option> 
                                                                `)
                                                            })
                                                        }
                                                        if(allPengiriman.packing != undefined) {
                                                            allPengiriman.packing.map((val,index)=>{
                                                                $('.packing-home-gb').append(`
                                                                    <option  value="${val.PACKING_TYPE}" class="${val.PACKING_FEE}">${val.PACKING_TYPE} - RP ${val.PACKING_FEE} </option> 
                                                                `)
                                                            })
                                                        }
                
                                                    }
                                                    
                                                    
            
                                                    allKurir.map((val,index)=>{
                                                        if(val.Courier == 'tiki'){
                                                            $('.radio-group-delivery').append(`
                                                            <div class="address-card-1 radio-delivery-card selected active_delivery_method" id="id-kurir-gb-${val.Courier}" data-value="${val.Courier}" onclick="choosing_shipping('id-kurir-gb-${val.Courier}', ${product_id})">
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
                                                        $('.province-home-gb').append(`
                                                            <option  value="${val.Province}" class="id-province-gb">${val.Province}</option> 
                                                        `)
                                                    })
                                                    allKota.map((val,index)=>{
                                                        $('.kota-home-gb').append(`
                                                            <option  value="${val.City}" class="id-kota-gb">${val.City}</option> 
                                                        `)    
                                                    })  
                                                    allKelurahan.map((val,index)=>{
            
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
                
                                                    allKecamatan.map((val,index)=>{
            
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
                                                    Swal.fire({
                                                        title: 'Uploading Data',
                                                        timer:100,
                                                    })
                                                })
                                            })
                                        })
                                    })
                                })
                                
                            }else {
                                get_all_province_from_courier(kurir.Courier,kurir.Courier_Code).done(function(response){
                                    province = response[0]
                                    allProvince = response
                                    
                                    get_all_city_from_courier(kurir.Courier,kurir.Courier_Code,province.Province).done(function(response){
                                        kota = response[0]
                                        allKota = response
                                        
                                        get_all_district_from_courier(kurir.Courier,kurir.Courier_Code,kota.City).done(function(response){
                                            
                                            kecamatan = response[0]
                                            district = response[0]
                                            allKecamatan = response
                                            allDistrict = response
                                            
                                            get_all_subdistrict_from_courier(kurir.Courier,kurir.Courier_Code,kecamatan.District).done(function(response){
                                                kelurahan = response
                                                allKelurahan = response
                                                allSub_District = response
                                                
                                                var Courier_Price_Code_orig = 'CGK01.00'
                                                var packing_type = ''
                                                var berat_product = parseInt(item_product.Weight_KG)
                                                
                                                
                                                if(berat_product == 0){
                                                    berat_product = 0.1
                                                }
                                                var length = ''
                                                var  width = '' 
                                                var  height = ''
                                                var paket_value = '' 
                                                
                                                
                                                // get_shipping_cost_informations(kurir.Courier,kurir.Courier_Code,province.Province,kota.City,kelurahan.District,kecamatan[0].Sub_District).done(function(response){
                                                    new_get_shipping_cost_informations(Courier_Price_Code_orig , allKelurahan[0].Courier_Price_Code, packing_type, berat_product, length, width, height, paket_value).done(function(response){
                                                        allPengiriman = response
                                                    
                                                    if(allPengiriman){
                                                        if(allPengiriman.service != undefined) {
                                                            allPengiriman.service.map((val,index)=>{
                                                                var tarif = val.TARIFF * 1.2
                                                                $('.pengiriman-home-gb').append(`
                                                                    <option  value="${val.EST_DAY}days ${val.SERVICE} ${tarif} ${val.DESCRIPTION} " class="${tarif}">${val.EST_DAY}days ${val.SERVICE} ${tarif} ${val.DESCRIPTION} </option> 
                                                                `)
                                                            })
                                                        }
                                                        if(allPengiriman.insurance !=undefined){
                                                            allPengiriman.insurance.map((val,index)=>{
                                                                $('.asuransi-home-gb').append(`
                                                                    <option  value="type ${val.INSURANCE_TYPE} ${val.INSURANCE_NAME} ${val.INSURANCE_COST}" class="${val.INSURANCE_COST}">${val.INSURANCE_NAME} - RP ${val.INSURANCE_COST} </option> 
                                                                `)
                                                            })
                                                        }
                                                        if(allPengiriman.packing != undefined) {
                                                            allPengiriman.packing.map((val,index)=>{
                                                                $('.packing-home-gb').append(`
                                                                    <option  value="${val.PACKING_TYPE}" class="${val.PACKING_FEE}">${val.PACKING_TYPE} - RP ${val.PACKING_FEE} </option> 
                                                                `)
                                                            })
                                                        }
                
                                                    }
                                                    
                                                    
            
                                                    allKurir.map((val,index)=>{
                                                        if(val.Courier == 'tiki'){
                                                            $('.radio-group-delivery').append(`
                                                            <div class="address-card-1 radio-delivery-card selected active_delivery_method" id="id-kurir-gb-${val.Courier}" data-value="${val.Courier}" onclick="choosing_shipping('id-kurir-gb-${val.Courier}', ${product_id})">
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
                                                        $('.province-home-gb').append(`
                                                            <option  value="${val.Province}" class="id-province-gb">${val.Province}</option> 
                                                        `)
                                                    })
                                                    allKota.map((val,index)=>{
                                                        $('.kota-home-gb').append(`
                                                            <option  value="${val.City}" class="id-kota-gb">${val.City}</option> 
                                                        `)    
                                                    })  
                                                    allKelurahan.map((val,index)=>{
            
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
                
                                                    allKecamatan.map((val,index)=>{
            
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
                                                    Swal.fire({
                                                        title: 'Uploading Data',
                                                        timer:100,
                                                    })
                                                })
                                            })
                                        })
                                    })
                                })
                            }
    
    
                    })
                // BATAS RENDER KURIR DLL
                // alert(res.data)
                axios.post(`https://products.sold.co.id/get-product-details?product_code=${product_id}`)
                .then((res)=>{
                    option_payment.map((val,index)=>{
                        
                        if(val.Payment_Method_Name === 'transfer'){
                            // $('.option-payment-gb').append(`
                            //     <option id="payment_gb" value="${val.Payment_Method_Name}">${val.Payment_Method_Name}</option> 
                            // `)
                            $('.radio-group').append(
                                `
                                <div class="form-check form-check-inline "  >
                                    <div class="transfer-card-1 radio_payment_method selected active_payment_method" data-value="${val.Payment_Method_Name}" id="id-payment-gb-${val.Payment_Method_Name}" onclick="choosing_payment_method('id-payment-gb-${val.Payment_Method_Name}', ${product_id})">
                                        <img src="../img/bca_transfer_manual.png" alt="" class="bca_img">
                                    </div>
                                </div>
                                `
                            )
                        }
                    })
                    var token = localStorage.getItem('token')
                    
                    axios.post(`https://customers.sold.co.id/get-customer-information?Customer_Code=${token}`)
                    .then((res)=>{
                        
                        if(res.data){
                            if(res.data.Address_1 !== 'NULL' && res.data.Address_1 != "undefined"){
                                $('.option-alamat-gb').append(`
                                <option value="${res.data.Address_1}" id="alamat_gb">${res.data.Address_1}</option> 
                                `)
                            }else if ( res.data.Address_2 !== 'NULL'&& res.data.Address_2 != "undefined"){
                                $('.option-alamat-gb').append(`
                                <option value="${res.data.Address_2}" id="alamat_gb">${res.data.Address_2}</option> 
                                `)  
                            }else if (res.data.Address_3 !== 'NULL' && res.data.Address_3 != "undefined"){
                                $('.option-alamat-gb').append(`
                                <option value="${res.data.Address_3 }" id="alamat_gb">${res.data.Address_3}</option> 
                                `) 
                            }else if (res.data.Address_4 !== 'NULL' && res.data.Address_4 != "undefined"){
                                $('.option-alamat-gb').append(`
                                <option value="${res.data.Address_4}" id="alamat_gb">${res.data.Address_4}</option> 
                                `) 
                            }else if (res.data.Address_5 !== 'NULL' && res.data.Address_5 != "undefined"){
                                $('.option-alamat-gb').append(`
                                <option value="${res.data.Address_5}" id="alamat_gb">${res.data.Address_5}</option> 
                                `) 
                            }else {
                                
                            }
                        }else {
                            // swal.fire("Login Terlebih Dahulu", "", "error");
                            Swal.fire({
                                html:`
                                <div class="o-circle c-container__circle o-circle__sign--failure">
                                    <div class="o-circle__sign"></div>  
                                </div> 
                                Login Terlebih Dahulu`,
                                timer:2000,
                                
                            })
                            var delayInMilliseconds = 1000; //1 second
    
                            setTimeout(function() {
                            //your code to be executed after 1 second
                            $('.box_iframe_groupbuy',window.parent.document).css('display','none')
                            $('#loginModal',window.parent.document).modal('show')
                            
                            }, delayInMilliseconds);
                        }
                     
                    }).catch((err)=>{
                        
                    })
                    
                }).catch((err)=>{
                    
                })
            
                }).catch((err)=>{
                    
                })
    
        }).catch((err)=>{
            
        })
    }
    })

}

//  SHOW PRODUCT CODE

const kurirMethodHome=(kurir,product_id)=>{
    
    $('.alert-danger').css('display','none')
    var province_storage = JSON.parse(localStorage.getItem('all_province_tiki'))
    var city_storage = JSON.parse(localStorage.getItem('all_city_tiki'))
    var district_storage = JSON.parse(localStorage.getItem('all_district_tiki'))
    var subdistrict_storage = JSON.parse(localStorage.getItem('all_subdistrict_tiki'))

    
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

    if(province_storage != undefined && province_storage != null && province_storage.length >0
         && city_storage != undefined && city_storage.length >0 && city_storage != null
        ){
            $('.kelurahan-home-gb').empty()
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
            var province_pilihan = ''
        province_storage.map((val,index)=>{
            if(index == 0 ){
                province_pilihan = val.Province
            }
            $('.province-home-gb').append(`
                <option   value="${val.Province}" class="id-province-gb">${val.Province}</option> 
            `)
        })
        
        city_storage.forEach((val,index)=>{
            if(val.Province ==  province_pilihan){
                allKota.push(val.City)
                kota_pilihan = val.City[0].City
            }
        })
        allKota[0].map((val,index)=>{
            $('.kota-home-gb').append(`
                <option   value="${val.City}" class="id-kota-gb">${val.City}</option> 
            `)  
        })
        get_all_district_from_courier(new_kurir_pilihan,kurir_kode,kota_pilihan).done(function(response){
            kelurahan = response[0]
            district = response[0]
            allKecamatan = response
            allDistrict = response
            
            get_all_subdistrict_from_courier(new_kurir_pilihan,kurir_kode,district.District).done(function(response){
                kelurahan = response
                allKelurahan = response
                allSub_District = response
                
                

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
                                var tarif = val.TARIFF * 1.2
                                
                                
                                $('.pengiriman-home-gb').append(`
                                    <option  value="${val.EST_DAY}days ${val.SERVICE} ${tarif} ${val.DESCRIPTION} " class="${tarif}">${val.EST_DAY}days ${val.SERVICE} ${tarif} ${val.DESCRIPTION} </option> 
                                `)
                            })
                        }
                        if(allPengiriman.insurance !=undefined){
                            allPengiriman.insurance.map((val,index)=>{
                                // 
                                // 
                                // 
                                $('.asuransi-home-gb').append(`
                                    <option  value="type ${val.INSURANCE_TYPE} ${val.INSURANCE_NAME} ${val.INSURANCE_COST}" class="${val.INSURANCE_COST}">${val.INSURANCE_NAME} - RP ${val.INSURANCE_COST} </option> 
                                `)
                            })
                        }
                        if(allPengiriman.packing != undefined) {
                            allPengiriman.packing.map((val,index)=>{
                                // 
                                // 
                                // 
                                $('.packing-home-gb').append(`
                                    <option  value="${val.PACKING_TYPE}" class="${val.PACKING_FEE}">${val.PACKING_TYPE} - RP ${val.PACKING_FEE} </option> 
                                `)
                            })
                        }

                    }
                })
            })
        })

    }else {
        get_product_detail_func(product_id).done(function(response){
            var item_product = response
            get_all_couriers().done(function(response){
                var dataAllKurir = response
                allKurir = response
                var kurir_kode =''
                for(var i=0; i<dataAllKurir.length; i++){
                    if(dataAllKurir[i].Courier == new_kurir_pilihan){
                        kurir_kode = dataAllKurir[i].Courier_Code
                    }
                }
                
                
                get_all_province_from_courier(new_kurir_pilihan,kurir_kode).done(function(response){
                    province = response[0]
                    allProvince = response
                    
                    
                    get_all_city_from_courier(new_kurir_pilihan,kurir_kode,province.Province).done(function(response){
                        kota = response[0]
                        allKota = response
                        
                        get_all_district_from_courier(new_kurir_pilihan,kurir_kode,kota.City).done(function(response){
                            kelurahan = response[0]
                            district = response[0]
                            allKelurahan = response
                            allDistrict = response
                            
                            get_all_subdistrict_from_courier(new_kurir_pilihan,kurir_kode,district.District).done(function(response){
                                kecamatan = response
                                allKecamatan = response
                                allSub_District = response
                                
                                
        
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
                                    //     // 
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
                                        // 
                                        $('.province-home-gb').append(`
                                            <option   value="${val.Province}" class="id-province-gb">${val.Province}</option> 
                                        `)
                                    })
                                    allKota.map((val,index)=>{
                                        // 
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
                                                var tarif = val.TARIFF * 1.2
                                                
                                                
                                                $('.pengiriman-home-gb').append(`
                                                    <option  value="${val.EST_DAY}days ${val.SERVICE} ${tarif} ${val.DESCRIPTION} " class="${tarif}">${val.EST_DAY}days ${val.SERVICE} ${tarif} ${val.DESCRIPTION} </option> 
                                                `)
                                            })
                                        }
                                        if(allPengiriman.insurance !=undefined){
                                            allPengiriman.insurance.map((val,index)=>{
                                                // 
                                                // 
                                                // 
                                                $('.asuransi-home-gb').append(`
                                                    <option  value="type ${val.INSURANCE_TYPE} ${val.INSURANCE_NAME} ${val.INSURANCE_COST}" class="${val.INSURANCE_COST}">${val.INSURANCE_NAME} - RP ${val.INSURANCE_COST} </option> 
                                                `)
                                            })
                                        }
                                        if(allPengiriman.packing != undefined) {
                                            allPengiriman.packing.map((val,index)=>{
                                                // 
                                                // 
                                                // 
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
    

}
const provinceMethodHome=(product_id)=>{
    
    var province_storage = JSON.parse(localStorage.getItem('all_province_tiki'))
    var city_storage = JSON.parse(localStorage.getItem('all_city_tiki'))
    var district_storage = JSON.parse(localStorage.getItem('all_district_tiki'))
    var subdistrict_storage = JSON.parse(localStorage.getItem('all_subdistrict_tiki'))

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
    var allKelurahanallKelurahan=[]
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


    get_all_couriers().done(function(response){
        var dataAllKurir = response
        allKurir = response
        
        
        var kurir_kode =''
        for(var i=0; i<dataAllKurir.length; i++){
            if(dataAllKurir[i].Courier == new_kurir_pilihan){
                kurir_kode = dataAllKurir[i].Courier_Code
            }
        }

        if(city_storage !=undefined && city_storage.length >0 && district_storage != undefined && district_storage.length >0 && subdistrict_storage != undefined && subdistrict_storage.length >0){
            
        }else if(city_storage != undefined && city_storage.length>0 && district_storage != undefined && district_storage.length >0){
           
            var kota_pilihan = ''
            var district_pilihan =''
            city_storage.forEach((val)=>{
                if(val.Province == province_pilihan ){
                    allKota.push(val.City)
                    kota_pilihan = val.City[0].City
                }
            })
            district_storage.forEach((val)=>{
                if(val.City == kota_pilihan){
                    allDistrict.push(val.District)
                    district_pilihan = val.District[0].District
                }
            })
             $('.kecamatan-home-gb').empty()
             $('.kota-home-gb').empty() 
         
            $('.kecamatan-home-gb').append(`
                <option  selected class="id-kecamatan-gb"> Kecamatan</option>      
            `)
            $('.kota-home-gb').append(`
                <option  selected class="id-kota-gb"> Kota</option>      
            `)

            allKota[0].map((val,index)=>{
                $('.kota-home-gb').append(`
                    <option  value="${val.City}" class="id-kota-gb">${val.City}</option> 
                `)
            })
            allDistrict[0].map((val,index)=>{
                if(val.Sub_District == ''){
                    $('.kecamatan-home-gb').append(`
                        <option  value="${val.District}" class="id-kecamatan-gb">-</option> 
                    `)
                }else {
                    $('.kecamatan-home-gb').append(`
                        <option  value="${val.District}" class="id-kecamatan-gb">${val.District}</option> 
                    `)
                    
                }

            })
            get_product_detail_func(product_id).done(function(response){
                var item_product = response                
                get_all_subdistrict_from_courier(new_kurir_pilihan,kurir_kode,district_pilihan).done(function(response){
                    kelurahan = response
                    allKelurahan = response
                    allSub_District = response
                    
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
    
                    
                    new_get_shipping_cost_informations(Courier_Price_Code_orig , allKelurahan[0].Courier_Price_Code, packing_type, berat_product, length, width, height, paket_value).done(function(response){
                        allPengiriman = response
                        
                        // $('.radio-group-delivery').empty()
                        // $('.kurir-home-gb').empty()
                        // $('.province-home-gb').empty()
                        // $('.kota-home-gb').empty() 
                        // $('.kecamatan-home-gb').empty()
                        $('.kelurahan-home-gb').empty()
                        $('.pengiriman-home-gb').empty()
                        $('.asuransi-home-gb').empty()
                        $('.packing-home-gb').empty()
                        $('.kodepos-home-gb').empty()
    
                        // $('.province-home-gb').append(`
                        //     <option   value="id-province-gb" >Province</option> 
                        // `)
                      
                        $('.kelurahan-home-gb').append(`
                            <option selected  class="id-kelurahan-gb">Kelurahan</option>      
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
      
                        allKelurahan.map((val,index)=>{
    
                            if(val.Sub_District == ''){
                                $('.kelurahan-home-gb').append(`
                                    <option  value="${val.Sub_District}" class="id-kelurahan-gb">-</option> 
                                `)
                            }else {
                                $('.kelurahan-home-gb').append(`
                                    <option  value="${val.Sub_District}" class="id-kelurahan-gb">${val.Sub_District}</option> 
                                `)
                                $('.kodepos-home-gb').append(`
                                    <option  value="${val.Zipcode}" class="id-kodepos-gb">${val.Zipcode}</option> 
                                `)
                               
                            }
                        })
    
                        if(allPengiriman){
    
                            if(allPengiriman.service != undefined) {
                                allPengiriman.service.map((val,index)=>{
                                    var tarif = val.TARIFF * 1.2
                                    
                                    
                                    $('.pengiriman-home-gb').append(`
                                        <option  value="${val.EST_DAY}days ${val.SERVICE} ${tarif} ${val.DESCRIPTION} " class="${tarif}">${val.EST_DAY}days ${val.SERVICE} ${tarif} ${val.DESCRIPTION} </option> 
                                    `)
                                })
                            }
                            if(allPengiriman.insurance !=undefined){
                                allPengiriman.insurance.map((val,index)=>{
                                    // 
                                    // 
                                    // 
                                    $('.asuransi-home-gb').append(`
                                        <option  value="type ${val.INSURANCE_TYPE} ${val.INSURANCE_NAME} ${val.INSURANCE_COST}" class="${val.INSURANCE_COST}">${val.INSURANCE_NAME} - RP ${val.INSURANCE_COST} </option> 
                                    `)
                                })
                            }
                            if(allPengiriman.packing != undefined) {
                                allPengiriman.packing.map((val,index)=>{
                                    // 
                                    // 
                                    // 
                                    $('.packing-home-gb').append(`
                                        <option  value="${val.PACKING_TYPE}" class="${val.PACKING_FEE}">${val.PACKING_TYPE} - RP ${val.PACKING_FEE} </option> 
                                    `)
                                })
                            }
    
                        }
                    })
                })
            })    

        }else if (city_storage != undefined && city_storage .length >0 && city_storage != null){
            
            var kota_pilihan = ''
            var district_pilihan =''
            city_storage.forEach((val)=>{
                if(val.Province == province_pilihan ){
                    allKota.push(val.City)
                    kota_pilihan = val.City[0].City
                }
            })
          
             
             $('.kota-home-gb').empty() 
         
            $('.kota-home-gb').append(`
                <option  selected class="id-kota-gb"> Kota</option>      
            `)

            allKota[0].map((val,index)=>{
                $('.kota-home-gb').append(`
                    <option  value="${val.City}" class="id-kota-gb">${val.City}</option> 
                `)
            })
            // 
            // allDistrict[0].map((val,index)=>{
            //     if(val.Sub_District == ''){
            //         $('.kecamatan-home-gb').append(`
            //             <option  value="${val.District}" class="id-kecamatan-gb">-</option> 
            //         `)
            //     }else {
            //         $('.kecamatan-home-gb').append(`
            //             <option  value="${val.District}" class="id-kecamatan-gb">${val.District}</option> 
            //         `)
                    
            //     }

            // })
            get_product_detail_func(product_id).done(function(response){
                var item_product = response
                // 
                get_all_district_from_courier(new_kurir_pilihan,kurir_kode,kota_pilihan).done(function(response){
                    allKecamatan = response
                    district_pilihan = response[0].District
                    get_all_subdistrict_from_courier(new_kurir_pilihan,kurir_kode,district_pilihan).done(function(response){
                        kelurahan = response
                        allKelurahan = response
                        allSub_District = response
                    
                        
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
        
                        
                        new_get_shipping_cost_informations(Courier_Price_Code_orig , allKelurahan[0].Courier_Price_Code, packing_type, berat_product, length, width, height, paket_value).done(function(response){
        
                            
                            allPengiriman = response
                            
                            // $('.radio-group-delivery').empty()
                            // $('.kurir-home-gb').empty()
                            // $('.province-home-gb').empty()
                            // $('.kota-home-gb').empty() 
                            $('.kecamatan-home-gb').empty()
                            $('.kelurahan-home-gb').empty()
                            $('.pengiriman-home-gb').empty()
                            $('.asuransi-home-gb').empty()
                            $('.packing-home-gb').empty()
                            $('.kodepos-home-gb').empty()
        
                            $('.kecamatan-home-gb').append(`
                                <option   value="id-kecamatan-gb" >Kecamatan</option> 
                            `)
                          
                            $('.kelurahan-home-gb').append(`
                                <option selected  class="id-kelurahan-gb">Kelurahan</option>      
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
          
                         
                            allKecamatan.map((val,index)=>{
                                if(val.District == ''){
                                    $('.kecamatan-home-gb').append(`
                                        <option  value="${val.District}" class="id-kecamatan-gb">-</option> 
                                    `)
                                }else {
                                    $('.kecamatan-home-gb').append(`
                                        <option  value="${val.District}" class="id-kecamatan-gb">${val.District}</option> 
                                    `)
                                  
                                }

                            })
                            allKelurahan.map((val,index)=>{
        
                                if(val.Sub_District == ''){
                                    $('.kelurahan-home-gb').append(`
                                        <option  value="${val.Sub_District}" class="id-kelurahan-gb">-</option> 
                                    `)
                                }else {
                                    $('.kelurahan-home-gb').append(`
                                        <option  value="${val.Sub_District}" class="id-kelurahan-gb">${val.Sub_District}</option> 
                                    `)
                                    $('.kodepos-home-gb').append(`
                                        <option  value="${val.Zipcode}" class="id-kodepos-gb">${val.Zipcode}</option> 
                                    `)
                                   
                                }
                            })
        
                            if(allPengiriman){
        
                                if(allPengiriman.service != undefined) {
                                    allPengiriman.service.map((val,index)=>{
                                        var tarif = val.TARIFF * 1.2
                                        
                                        
                                        $('.pengiriman-home-gb').append(`
                                            <option  value="${val.EST_DAY}days ${val.SERVICE} ${tarif} ${val.DESCRIPTION} " class="${tarif}">${val.EST_DAY}days ${val.SERVICE} ${tarif} ${val.DESCRIPTION} </option> 
                                        `)
                                    })
                                }
                                if(allPengiriman.insurance !=undefined){
                                    allPengiriman.insurance.map((val,index)=>{
                                        // 
                                        // 
                                        // 
                                        $('.asuransi-home-gb').append(`
                                            <option  value="type ${val.INSURANCE_TYPE} ${val.INSURANCE_NAME} ${val.INSURANCE_COST}" class="${val.INSURANCE_COST}">${val.INSURANCE_NAME} - RP ${val.INSURANCE_COST} </option> 
                                        `)
                                    })
                                }
                                if(allPengiriman.packing != undefined) {
                                    allPengiriman.packing.map((val,index)=>{
                                        // 
                                        // 
                                        // 
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
        }else {
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
                
                    get_all_province_from_courier(new_kurir_pilihan,kurir_kode).done(function(response){
                        province = response[0]
                        allProvince = response
                        
                        get_all_city_from_courier(new_kurir_pilihan,kurir_kode,province_pilihan).done(function(response){
                            kota = response[0]
                            allKota = response
                            
                            get_all_district_from_courier(new_kurir_pilihan,kurir_kode,kota.City).done(function(response){
                                kelurahan = response[0]
                                district = response[0]
                                allKelurahan = response
                                allDistrict = response
                                
                                get_all_subdistrict_from_courier(new_kurir_pilihan,kurir_kode,district.District).done(function(response){
                                    kecamatan = response
                                    allKecamatan = response
                                    allSub_District = response
                                    
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
                      
                                        allKota.map((val,index)=>{
                                            // 
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
                                                    var tarif = val.TARIFF * 1.2
                                                    
                                                    
                                                    $('.pengiriman-home-gb').append(`
                                                        <option  value="${val.EST_DAY}days ${val.SERVICE} ${tarif} ${val.DESCRIPTION} " class="${tarif}">${val.EST_DAY}days ${val.SERVICE} ${tarif} ${val.DESCRIPTION} </option> 
                                                    `)
                                                })
                                            }
                                            if(allPengiriman.insurance !=undefined){
                                                allPengiriman.insurance.map((val,index)=>{
                                                    // 
                                                    // 
                                                    // 
                                                    $('.asuransi-home-gb').append(`
                                                        <option  value="type ${val.INSURANCE_TYPE} ${val.INSURANCE_NAME} ${val.INSURANCE_COST}" class="${val.INSURANCE_COST}">${val.INSURANCE_NAME} - RP ${val.INSURANCE_COST} </option> 
                                                    `)
                                                })
                                            }
                                            if(allPengiriman.packing != undefined) {
                                                allPengiriman.packing.map((val,index)=>{
                                                    // 
                                                    // 
                                                    // 
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
            
            }else {
                // swal.fire("Ada field yang belum di isi", "", "error");
                Swal.fire({
                    html:`
                    <div class="o-circle c-container__circle o-circle__sign--failure">
                        <div class="o-circle__sign"></div>  
                    </div> 
                    Ada Field yang belum di isi`,
                    timer:2000,
                    
                })
                $('.alert-danger').css('display','flex')
                render_all_kurir_before_choosing(product_id)  
            }
        }
    })
}
const kotaMethodHome=(product_id)=>{

    var province_storage = JSON.parse(localStorage.getItem('all_province_tiki'))
    var city_storage = JSON.parse(localStorage.getItem('all_city_tiki'))
    var district_storage = JSON.parse(localStorage.getItem('all_district_tiki'))
    var subdistrict_storage = JSON.parse(localStorage.getItem('all_subdistrict_tiki'))
    
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

    get_all_couriers().done(function(response){
        var dataAllKurir = response
        allKurir = response
        
        
        var kurir_kode =''
        for(var i=0; i<dataAllKurir.length; i++){
            if(dataAllKurir[i].Courier == new_kurir_pilihan){
                kurir_kode = dataAllKurir[i].Courier_Code
            }
        }

        if(district_storage != null && district_storage.length > 0 &&  subdistrict_storage != null && subdistrict_storage.length > 0) {
            // alert(' masuk ke if semua storage ke isi')
        } else if ( district_storage != null) {
            // alert('masuk ke else if  district ke isi')
            var kecamatan_pilihan = ''
            
            district_storage.forEach((val,index)=>{
                if(val.City == kota_pilihan){
                    allDistrict.push(val.District)
                    kecamatan_pilihan = val.District[0].District
                }
            })
            $('.kecamatan-home-gb').empty()
            $('.kecamatan-home-gb').append(`
                    <option  selected class="id-kecamatan-gb"> Kecamatan</option>      
                `)
            allDistrict[0].map((val,index)=>{
                $('.kecamatan-home-gb').append(`
                    <option  value="${val.District}" class="id-kecamatan-gb">${val.District}</option> 
                `)
            })
            get_product_detail_func(product_id).done(function(response){
                var item_product = response
                get_all_subdistrict_from_courier(new_kurir_pilihan,kurir_kode,kecamatan_pilihan).done(function(response){
                    kelurahan = response
                    allKelurahan = response
                    allSub_District = response
                    
                    
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
    
                    
                    new_get_shipping_cost_informations(Courier_Price_Code_orig , allKelurahan[0].Courier_Price_Code, packing_type, berat_product, length, width, height, paket_value).done(function(response){
    
                        
                        allPengiriman = response
                        
                        // $('.radio-group-delivery').empty()
                        // $('.kurir-home-gb').empty()
                        // $('.province-home-gb').empty()
                        // $('.kota-home-gb').empty() 
                        // $('.kecamatan-home-gb').empty()
                        $('.kelurahan-home-gb').empty()
                        $('.pengiriman-home-gb').empty()
                        $('.asuransi-home-gb').empty()
                        $('.packing-home-gb').empty()
                        $('.kodepos-home-gb').empty()
    
                        // $('.province-home-gb').append(`
                        //     <option   value="id-province-gb" >Province</option> 
                        // `)
                      
                        $('.kelurahan-home-gb').append(`
                            <option selected  class="id-kelurahan-gb">Kelurahan</option>      
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
      
                     
                        
                        allKelurahan.map((val,index)=>{
    
                            if(val.Sub_District == ''){
                                $('.kelurahan-home-gb').append(`
                                    <option  value="${val.Sub_District}" class="id-kelurahan-gb">-</option> 
                                `)
                            }else {
                                $('.kelurahan-home-gb').append(`
                                    <option  value="${val.Sub_District}" class="id-kelurahan-gb">${val.Sub_District}</option> 
                                `)
                                $('.kodepos-home-gb').append(`
                                    <option  value="${val.Zipcode}" class="id-kodepos-gb">${val.Zipcode}</option> 
                                `)
                               
                            }
                        })
                        
                        if(allPengiriman){
                            if(allPengiriman.service != undefined) {
                                allPengiriman.service.map((val,index)=>{
                                    var tarif = val.TARIFF * 1.2
                                    $('.pengiriman-home-gb').append(`
                                        <option  value="${val.EST_DAY}days ${val.SERVICE} ${tarif} ${val.DESCRIPTION} " class="${tarif}">${val.EST_DAY}days ${val.SERVICE} ${tarif} ${val.DESCRIPTION} </option> 
                                    `)
                                })
                            }
                            if(allPengiriman.insurance !=undefined){
                                allPengiriman.insurance.map((val,index)=>{
                                    
                                    $('.asuransi-home-gb').append(`
                                        <option  value="type ${val.INSURANCE_TYPE} ${val.INSURANCE_NAME} ${val.INSURANCE_COST}" class="${val.INSURANCE_COST}">${val.INSURANCE_NAME} - RP ${val.INSURANCE_COST} </option> 
                                    `)
                                })
                            }
                            if(allPengiriman.packing != undefined) {
                                allPengiriman.packing.map((val,index)=>{
                                    
                                    $('.packing-home-gb').append(`
                                        <option  value="${val.PACKING_TYPE}" class="${val.PACKING_FEE}">${val.PACKING_TYPE} - RP ${val.PACKING_FEE} </option> 
                                    `)
                                })
                            }
    
                        }
                    })
                })
            }) 
        }else {
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
                
                $('.alert-danger').css('display','none')
                // $('.kota-home-gb').empty()
                // $('.kecamatan-home-gb').empty()
                // $('.kelurahan-home-gb').empty()
                // $('.pengiriman-home-gb').empty()
        
                get_product_detail_func(product_id).done(function(response){
                    var item_product = response
                  
                        get_all_province_from_courier(new_kurir_pilihan,kurir_kode).done(function(response){
                            province = response[0]
                            allProvince = response
                            
                            get_all_city_from_courier(new_kurir_pilihan,kurir_kode,province_pilihan).done(function(response){
                                kota = response[0]
                                allKota = response
                                
                                get_all_district_from_courier(new_kurir_pilihan,kurir_kode,kota_pilihan).done(function(response){
                                    kelurahan = response[0]
                                    district = response[0]
                                    allKelurahan = response
                                    
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
                                        
                                        new_get_shipping_cost_informations(Courier_Price_Code_orig , allKecamatan[0].Courier_Price_Code, packing_type, berat_product, length, width, height, paket_value).done(function(response){
            
                                        
                                            allPengiriman = response
                                            
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
                                            //     // 
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
                                            //     // 
                                            //     $('.province-home-gb').append(`
                                            //         <option  selected value="${val.Province}" class="id-province-gb">${val.Province}</option> 
                                            //     `)
                                            // })
                                            // allKota.map((val,index)=>{
                                            //     // 
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
                                                        var tarif = val.TARIFF * 1.2
                                                        
                                                        
                                                        $('.pengiriman-home-gb').append(`
                                                            <option  value="${val.EST_DAY}days ${val.SERVICE} ${tarif} ${val.DESCRIPTION} " class="${tarif}">${val.EST_DAY}days ${val.SERVICE} ${tarif} ${val.DESCRIPTION} </option> 
                                                        `)
                                                    })
                                                }
                                                if(allPengiriman.insurance !=undefined){
                                                    allPengiriman.insurance.map((val,index)=>{
                                                        // 
                                                        // 
                                                        // 
                                                        $('.asuransi-home-gb').append(`
                                                            <option  value="type ${val.INSURANCE_TYPE} ${val.INSURANCE_NAME} ${val.INSURANCE_COST}" class="${val.INSURANCE_COST}">${val.INSURANCE_NAME} - RP ${val.INSURANCE_COST} </option> 
                                                        `)
                                                    })
                                                }
                                                if(allPengiriman.packing != undefined) {
                                                    allPengiriman.packing.map((val,index)=>{
                                                        // 
                                                        // 
                                                        // 
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
            }else {
                
                // swal.fire("Ada field yang belum di isi", "", "error");
                Swal.fire({
                    html:`
                    <div class="o-circle c-container__circle o-circle__sign--failure">
                        <div class="o-circle__sign"></div>  
                    </div> 
                    Ada Field yang belum di isi`,
                    timer:2000,
                    
                })
                $('.alert-danger').css('display','flex')
                render_all_kurir_before_choosing(render_all_kurir_before_choosing)
            }
    
        }
    })


    
    
}
const kelurahanMethodHome=(product_id)=>{
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
    console.log(split_pengiriman)
    var days_pengiriman = split_pengiriman[0]
    var kode_pengiriman = split_pengiriman[1]

    var isKurir_pilihan = false
    var isProvince_pilihan = false
    var isKota_pilihan = false
    var isKecamatan_pilihan = false
    var isKelurahan_pilihan = false
    var isQty_pilihan = false
    
    
    if(kecamatan_pilihan == undefined || kecamatan_pilihan == null || kecamatan_pilihan == 'NULL' || kecamatan_pilihan == 'undefined'){
       
        kecamatan_pilihan = ''
        isKecamatan_pilihan = false
    }   else{
        isKecamatan_pilihan = true
    }
    if( kelurahan_pilihan == undefined || kelurahan_pilihan == null || kelurahan_pilihan == 'NULL' || kelurahan_pilihan == 'undefined'){
        
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
        console.log('masuk ke 3518')
        $('.alert-danger').css('display','none')
        get_all_couriers().done(function(response){
            var dataAllKurir = response
            var kurir_kode =''
            for(var i=0; i<dataAllKurir.length; i++){
                if(dataAllKurir[i].Courier == new_kurir_pilihan){
                    kurir_kode = dataAllKurir[i].Courier_Code
                }
            }
            console.log(new_kurir_pilihan, kurir_kode, province_pilihan, kota_pilihan,kelurahan_pilihan,kecamatan_pilihan, days_pengiriman, kode_pengiriman)
            // get_shipping_fee(new_kurir_pilihan, kurir_kode, province_pilihan, kota_pilihan,kelurahan_pilihan,kecamatan_pilihan, days_pengiriman, kode_pengiriman).done(function(response){
                // all_biaya_pengiriman= response
                
                // get_product_detail_func(product_id).done(function(response){  
                    // console.log(response)
                    check_qty()
                    // var berat_product = parseFloat(response.Weight_KG)
                    // var total_berat_product = Math.ceil(berat_product * total_qty_from_user)
                    // var total_fee =  total_berat_product * parseInt(all_biaya_pengiriman[0].Courier_Price_Per_Kg)
                    // $('#tp_iframe').empty()
                    // $('#tp_iframe').val(response.GroupBuy_SellPrice * total_qty_from_user)    
                    // $('#total_biaya_pengiriman_gb').empty() 
                    // $('#total_biaya_pengiriman_gb').val(total_fee)
                // })
            // })
        })
    }else {
        // swal.fire("Ada field yang belum di isi", "", "error");
        Swal.fire({
            html:`
            <div class="o-circle c-container__circle o-circle__sign--failure">
                <div class="o-circle__sign"></div>  
            </div> 
            Ada Field yang belum di isi`,
            timer:2000,
            
        })
        $('.alert-danger').css('display','flex')

        render_all_kurir_before_choosing(product_id)
 
    }
 
}
const kecamatanMethodHome=(product_id)=>{

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
        
        isKelurahan_pilihan = false
        kelurahan_pilihan = ''
    }else {
        isKelurahan_pilihan = true

    }
    // if(kecamatan_pilihan == undefined || kecamatan_pilihan == null || kecamatan_pilihan == 'NULL' || kecamatan_pilihan == 'undefined'){
    //     
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

        $('.alert-danger').css('display','none')
        get_product_detail_func(product_id).done(function(response){
            var item_product = response
            get_all_couriers().done(function(response){
                var dataAllKurir = response
                allKurir = response
                
                
                var kurir_kode =''
                for(var i=0; i<dataAllKurir.length; i++){
                    if(dataAllKurir[i].Courier == new_kurir_pilihan){
                        kurir_kode = dataAllKurir[i].Courier_Code
                    }
                }
                get_all_province_from_courier(new_kurir_pilihan,kurir_kode).done(function(response){
                    province = response[0]
                    allProvince = response
                    
                    get_all_city_from_courier(new_kurir_pilihan,kurir_kode,province_pilihan).done(function(response){
                        kota = response[0]
                        allKota = response
                        
                        get_all_district_from_courier(new_kurir_pilihan,kurir_kode,kota_pilihan).done(function(response){
                            kecamatan = response[0]
                            allKecamatan = response
                            get_all_subdistrict_from_courier(new_kurir_pilihan,kurir_kode,kecamatan_pilihan).done(function(response){
                                kelurahan = response
                                allKelurahan = response
                                
                                var Courier_Price_Code_orig = 'CGK01.00'
                                var packing_type = ''
                                var berat_product = parseInt(item_product.Weight_KG)
                                if(berat_product <= 0 || berat_product == null || berat_product == undefined || Number.isNaN(berat_product)){
                                    berat_product = 0.1*1.5;
                                }else{
                                    berat_product = berat_product*1*1.5;
                                }
                                var total_berat_product = berat_product.toFixed(2)
                                var length = '1'
                                var  width = '1' 
                                var  height = '1'
                                var paket_value = '' 
                                new_get_shipping_cost_informations(Courier_Price_Code_orig , allKelurahan[0].Courier_Price_Code, packing_type, total_berat_product, length, width, height, paket_value).done(function(response){

                                    allPengiriman = response
                                    
                                    // $('.radio-group-delivery').empty()
                                    // $('.kurir-home-gb').empty()
                                    // $('.province-home-gb').empty()
                                    // $('.kota-home-gb').empty() 
                                    $('.kelurahan-home-gb').empty()
                                    // $('.kecamatan-home-gb').empty()
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
                                    // $('.kecamatan-home-gb').append(`
                                    //     <option selected  class="id-kecamatan-gb">Kecamatan</option>      
                                    // `)
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
                                    //     // 
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
                                    //     // 
                                    //     $('.province-home-gb').append(`
                                    //         <option  selected value="${val.Province}" class="id-province-gb">${val.Province}</option> 
                                    //     `)
                                    // })
                                    // allKota.map((val,index)=>{
                                    //     // 
                                    //     $('.kota-home-gb').append(`
                                    //         <option  selected value="${val.City}" class="id-kota-gb">${val.City}</option> 
                                    //     `)    
                                    // })  
                                    // allKecamatan.map((val,index)=>{
        
                                    //     if(val.Sub_District == ''){
                                    //         $('.kecamatan-home-gb').append(`
                                    //             <option  value="${val.Sub_District}" class="id-kecamatan-gb">-</option> 
                                    //         `)
                                    //     }else {
                                    //         $('.kecamatan-home-gb').append(`
                                    //             <option  value="${val.Sub_District}" class="id-kecamatan-gb">${val.Sub_District}</option> 
                                    //         `)
                                    //         $('.kodepos-home-gb').append(`
                                    //             <option  value="${val.Zipcode}" class="id-kodepos-gb">${val.Zipcode}</option> 
                                    //         `)
                                    //     }
        
                                    // })
                                    allKelurahan.map((val,index)=>{
        
                                        if(val.Sub_District == ''){
                                            $('.kelurahan-home-gb').append(`
                                                <option value="${val.Sub_District}" class="id-kelurahan-gb">-</option> 
                                            `)
                                        }else {
                                            $('.kelurahan-home-gb').append(`
                                                <option  value="${val.Sub_District}" class="id-kelurahan-gb">${val.Sub_District}</option> 
                                            `)
                                            $('.kodepos-home-gb').append(`
                                                 <option  value="${val.Zipcode}" class="id-kodepos-gb">${val.Zipcode}</option> 
                                             `)
                                           
                                        }
                                    })
                                    if(allPengiriman){

                                        if(allPengiriman.service != undefined) {
                                            allPengiriman.service.map((val,index)=>{
                                                var tarif = val.TARIFF * 1.2
                                                $('.pengiriman-home-gb').append(`
                                                    <option  value="${val.EST_DAY}days ${val.SERVICE} ${tarif} ${val.DESCRIPTION} " class="${tarif}">${val.EST_DAY}days ${val.SERVICE} ${tarif} ${val.DESCRIPTION} </option> 
                                                `)
                                            })
                                        }
                                        if(allPengiriman.insurance !=undefined){
                                            allPengiriman.insurance.map((val,index)=>{
                                                // 
                                                // 
                                                // 
                                                $('.asuransi-home-gb').append(`
                                                    <option  value="type ${val.INSURANCE_TYPE} ${val.INSURANCE_NAME} ${val.INSURANCE_COST}" class="${val.INSURANCE_COST}">${val.INSURANCE_NAME} - RP ${val.INSURANCE_COST} </option> 
                                                `)
                                            })
                                        }
                                        if(allPengiriman.packing != undefined) {
                                            allPengiriman.packing.map((val,index)=>{
                                                // 
                                                // 
                                                // 
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
        // swal.fire("Ada field yang belum di isi", "", "error");
        Swal.fire({
            html:`
            <div class="o-circle c-container__circle o-circle__sign--failure">
                <div class="o-circle__sign"></div>  
            </div> 
            Ada Field yang belum di isi`,
            timer:2000,
            
        })
        $('.alert-danger').css('display','flex')
    
        render_all_kurir_before_choosing(render_all_kurir_before_choosing)
    }
  
}
const pengirimanMethodHome=(product_id)=>{
    

        var alamat_pilihan = $('.active_address_method').attr('data-value')
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
        
        
        if(kecamatan_pilihan == undefined || kecamatan_pilihan == null || kecamatan_pilihan == 'NULL' || kecamatan_pilihan == 'undefined'){
           
            kecamatan_pilihan = ''
            isKecamatan_pilihan = false
        }   else {
            isKecamatan_pilihan = true
        }
        if( kelurahan_pilihan == undefined || kelurahan_pilihan == null || kelurahan_pilihan == 'NULL' || kelurahan_pilihan == 'undefined'){
            
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
        
        if(total_qty_from_user == undefined || total_qty_from_user == 'undefined' || total_qty_from_user == null || total_qty_from_user.length == 0 || total_qty_from_user == NaN || totalQtyIsANumber){
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
    

    if(alamat_pilihan == 'Alamat Terdaftar'){
        if(isKurir_pilihan && isKota_pilihan && isProvince_pilihan && isKelurahan_pilihan && isKecamatan_pilihan && isQty_pilihan) {
            $('.alert-danger').css('display','none')
            check_qty()
        }else {
            Swal.fire({
                html:`
                <div class="o-circle c-container__circle o-circle__sign--failure">
                    <div class="o-circle__sign"></div>  
                </div> 
                Ada Field yang belum di isi`,
                timer:2000,
                
            })
            $('.alert-danger').css('display','flex')
            render_all_kurir_before_choosing(product_id)  
        }
    }else {   
    
        if(isKurir_pilihan && isKota_pilihan && isProvince_pilihan && isKelurahan_pilihan && isKecamatan_pilihan && isQty_pilihan) {
            $('.alert-danger').css('display','none')
            check_qty()
        }else {
           
            Swal.fire({
                html:`
                <div class="o-circle c-container__circle o-circle__sign--failure">
                    <div class="o-circle__sign"></div>  
                </div> 
                Ada Field yang belum di isi`,
                timer:2000,
                
            })
            $('.alert-danger').css('display','flex')
            render_all_kurir_before_choosing(product_id)  
        }
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
    
    
    if(kecamatan_pilihan == undefined || kecamatan_pilihan == null || kecamatan_pilihan == 'NULL' || kecamatan_pilihan == 'undefined'){
       
        kecamatan_pilihan = ''
        isKecamatan_pilihan = false
    }   else {
        isKecamatan_pilihan = true
    }
    if( kelurahan_pilihan == undefined || kelurahan_pilihan == null || kelurahan_pilihan == 'NULL' || kelurahan_pilihan == 'undefined'){
        
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
    
    if(total_qty_from_user == undefined || total_qty_from_user == 'undefined' || total_qty_from_user == null || total_qty_from_user.length == 0 || total_qty_from_user == NaN || totalQtyIsANumber){
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
        check_qty()

    }else {
        
        // swal.fire("Ada field yang belum di isi", "", "error");
        Swal.fire({
            html:`
            <div class="o-circle c-container__circle o-circle__sign--failure">
                <div class="o-circle__sign"></div>  
            </div> 
            Ada Field yang belum di isi`,
            timer:2000,
            
        })
        $('.alert-danger').css('display','flex')
        render_all_kurir_before_choosing(product_id)

        
        
        
        
        
        
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
    
    
    if(kecamatan_pilihan == undefined || kecamatan_pilihan == null || kecamatan_pilihan == 'NULL' || kecamatan_pilihan == 'undefined'){
       
        kecamatan_pilihan = ''
        isKecamatan_pilihan = false
    }   else {
        isKecamatan_pilihan = true
    }
    if( kelurahan_pilihan == undefined || kelurahan_pilihan == null || kelurahan_pilihan == 'NULL' || kelurahan_pilihan == 'undefined'){
        
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
    
    if(total_qty_from_user == undefined || total_qty_from_user == 'undefined' || total_qty_from_user == null || total_qty_from_user.length == 0 || total_qty_from_user == NaN || totalQtyIsANumber){
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
        check_qty()

    }else {
        
        // swal.fire("Ada field yang belum di isi", "", "error");
        Swal.fire({
            html:`
            <div class="o-circle c-container__circle o-circle__sign--failure">
                <div class="o-circle__sign"></div>  
            </div> 
            Ada Field yang belum di isi`,
            timer:2000,
            
        })
        $('.alert-danger').css('display','flex')
        render_all_kurir_before_choosing(product_id)

        
        
        
        
        
        
    }
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
 const render_get_product_detail=(product_id)=>{
    // 
    $(this).scrollTop('.modals-product-detail')
    // var height = $('.box-render-new').position()
    // 
            Swal.fire({
            title: 'Please Wait',
            html: ` 
             <div class="boxcon">
                <div class="box1">
                </div>
                <div id="sold-id-loading">
                SOLDAYS 
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
                        $('.box-item-detail').empty()
                        
                        if(data_for_render[0].GroupBuy_Purchase == "false"){
                            $('.box-item-detail').append( // render untuk bukan groupbuy
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
                                       
                                    </div>
                                    <div class="box-quality-right-id-2">
                                        <div class="bsp-2">
                                            <p> Normal Price : <span> RP.${commafy(data_for_render[0].Sell_Price)} </span> </p>
                
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

 const render_get_product_detail_searching_page=(product_id)=>{
    $(this).scrollTop('.box_iframe_groupbuy')
    let timerInterval
    Swal.fire({
    title: 'Please Wait',
    html: ` 
     <div class="boxcon">
        <div class="box1">
        </div>
        <div id="sold-id-loading">
        SOLDAYS 
        </div>
            
        <div class="box2">
        </div>
    </div>
    `,
    timer: 3000000,
    timerProgressBar: true,
    didOpen:()=>{
        var product_id_pilihan = product_id
        let allDataProduct = []
        var all_filter_product = []
        var allData_storage = JSON.parse(localStorage.getItem('all_data_product'))

        if(allData_storage != undefined && allData_storage.length != 0){
            
            var item = allData_storage.filter((val,index)=>{
                if(val.Product_Code == product_id){
                    return val
                }
            })
            

            var split_product = item[0].Name.split(' ')
            var all_filter_product = []
            
            split_product_product = []

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
            $('.box-item-detail').empty('')
            if(item[0].GroupBuy_Purchase == "false"){
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
                                <p>${item[0].Category}</p>
                                <div class="qty-box-pd"> 
                                    Quantity : ${item[0].Stock_Quantity}
                                </div>
                            </div>
                            <p class="limited-text">${item[0].Name}</p>
                            <div class="rating-bottom-2">
                                <div class="star-box">
                                    <iframe class="star-iframe"  src="../Iframe/rating-stars/index.html?product_code=${product_id}"></iframe> 
                                </div>
                            </div>
                        </div>

                        <div class="box-price-right-id">
                           
                            <div class="box-small-price-2" onclick="addToCart('${item[0].Product_Code}')">
                                Tambah
                            </div>
                            <div class="box-small-price-2" onclick="open_checkout('${item[0].Product_Code}')">
                                Beli Sekarang
                            </div>
                           
                        </div>
                        <div class="box-quality-right-id-2">
                            <div class="bsp-2">
                                <p> Normal Price : <span> RP.${commafy(item[0].Sell_Price)} </span> </p>
                                
                
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
                                ${item[0].Description}
                                </div>
                                <div class="tab-pane fade" id="nav-spec" role="tabpanel" aria-labelledby="nav-spec-tab">
                                   ${item[0].Specification}          
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
                                <p>${item[0].Category}</p>
                                <div class="qty-box-pd"> 
                                    Quantity : ${item[0].Stock_Quantity}
                                </div>
                            </div>
                            <p class="limited-text">${item[0].Name}</p>
                            <div class="rating-bottom-2">
                                <div class="star-box">
                                    <iframe class="star-iframe"  src="../Iframe/rating-stars/index.html?product_code=${product_id}"></iframe> 
                                </div>
                            </div>
                        </div>

                        <div class="box-price-right-id">
                           
                            <div class="box-small-price-2" onclick="addToCart('${item[0].Product_Code}')">
                                Tambah
                            </div>
                            <div class="box-small-price-2" onclick="open_checkout('${item[0].Product_Code}')">
                                Beli Sekarang
                            </div>
                            <div class="box-small-price-2" onclick="groupbuy('${item[0].Product_Code}')">
                                Beli Harga Group
                            </div>
                        </div>
                        <div class="box-quality-right-id-2">
                            <div class="bsp-1">
                                <p> Normal Price : <span> RP.${commafy(item[0].Sell_Price)} </span> </p>
                                
                                
                                <p> Group Buy  Price : <span>RP.${commafy(item[0].GroupBuy_SellPrice)} </span> </p>
                                
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
                                    ${item[0].Description}
                                </div>
                                <div class="tab-pane fade" id="nav-spec" role="tabpanel" aria-labelledby="nav-spec-tab">
                                   ${item[0].Specification}          
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

            all_filter_product.map((val,index)=>{
                // 
                // 
                if(val.Product_Code == product_id_pilihan){
                    $('.card-quality-right-id').append(`
                    <div class="card-sejenis-id active_product">
                        <div class="card-sejenis-img-id">
                            <img src="${val.Picture_1}" alt="">
                        </div>
                        <div class="card-sejenis-desc-id">
                            <p class="limited-text-commision">${val.Name}</p>
                            <p>RP. ${commafy(val.Sell_Price)}</p>
                            
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
                            <p>RP. ${commafy(val.Sell_Price)}</p>
                            
                        </div>
                    </div>
                    `)

                }

            })

            $('.img-option-left').empty()
            $('.item-left-img-box')
            if(item[0].Picture_1 == undefined || item[0].Picture_1 == null || item[0].Picture_1 == 'NULL' || item[0].Picture_1 == ''){
                $('.item-left-img-box').append(`
                    <img src="${replace_vtintl_to_sold_co_id(item[0].Picture_1)}" alt="" class="img-notfound" id="img-big-1" val="img-notfound">
                `)
            }else{
                $('.img-option-left').append(`
                    <div class="option-left-1 img-1-id pop">
                            <img src="${replace_vtintl_to_sold_co_id(item[0].Picture_1)}" alt="">
                    </div>
                `)
                $('.item-left-img-box').append(`
                    <img src="${replace_vtintl_to_sold_co_id(item[0].Picture_1)}" alt="" class="img-big-active" id="img-big-1">
                `)
            }
            if(item[0].Picture_2 == undefined || item[0].Picture_2 == null || item[0].Picture_2 == 'NULL' || item[0].Picture_2 == ''){
                $('.item-left-img-box').append(`
                    <img src="${item.Picture_2}" alt="" class="img-notfound" id="img-big-2" val="img-notfound">
                `)
            }else{
                $('.img-option-left').append(`
                    <div class="option-left-1 img-2-id pop">
                            <img src="${replace_vtintl_to_sold_co_id(item[0].Picture_2)}" alt="">
                    </div>
                `)
                $('.item-left-img-box').append(`
                    <img src="${replace_vtintl_to_sold_co_id(item[0].Picture_2)}" alt="" class="img-big" id="img-big-2">
                `)
            }
            if(item[0].Picture_3 == undefined || item[0].Picture_3 == null || item[0].Picture_3 == 'NULL' || item[0].Picture_3 == ''){

                
                $('.item-left-img-box').append(`
                    <img src="${item[0].Picture_3}" alt="" class="img-notfound" id="img-big-3" val="img-notfound">
                `)
            }else{
                $('.img-option-left').append(`
                    <div class="option-left-1 img-2-id pop">
                            <img src="${replace_vtintl_to_sold_co_id(item[0].Picture_3)}" alt="">
                    </div>
                `)
                $('.item-left-img-box').append(`
                    <img src="${replace_vtintl_to_sold_co_id(item[0].Picture_3)}" alt="" class="img-big" id="img-big-3">
                `)
            }


            if(item[0].extra_column_1 == undefined || item[0].extra_column_1 == null || item[0].extra_column_1 == 'NULL' || item[0].extra_column_1 == ''){

            
                $('.item-left-img-box').append(`
                    <img src="${item[0].extra_column_1}" alt="" class="img-notfound" id="img-big-4" val="img-notfound">
                `)
            }else{

                // $('.img-option-left').append(`
                //     <img src="${replace_vtintl_to_sold_co_id(item.extra_column_1)}" alt="" class="img-big" id="img-big-4">
                // `)                   
                $('.item-left-img-box').append(`
                    <video  height="350px" width="400px" autoplay muted loop class="img-big" id="img-big-4">
                        <source src="${replace_vtintl_to_sold_co_id(item[0].extra_column_1)}" type="video/mp4">
                        <source src="${replace_vtintl_to_sold_co_id(item[0].extra_column_1)}" type="video/ogg">
                    </video>
                `)
            }

        
            axios.post(`https://products.sold.co.id/get_user_comment?Product_Code=${product_id}`)
            .then((res)=>{
                var cust_comment = res.data
                // 
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
            }).catch((err)=>{
                
            })
            
            Swal.fire({
                title: 'Uploading Data',
                timer:100,
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
                                all_filter_product.push(val)
                                return val
                            }
                        })
                    }
        
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
                                            <div class="box-small-price-2" onclick="open_checkout('${item.Product_Code}')">
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
                                                <button class="nav-link" id="nav-spec-tab" data-bs-toggle="tab" data-bs-target="#nav-spec" type="button" role="tab" aria-controls="nav-spec" aria-selected="true">Specification</button>
                                                <button class="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Ulasan</button>
                                                <button class="nav-link" id="nav-faq-tab" data-bs-toggle="tab" data-bs-target="#nav-faq" type="button" role="tab" aria-controls="nav-faq" aria-selected="false">FAQ</button>
                                                </div>
                                            </nav>
                                            <div class="tab-content" id="nav-tabContent">
                                                <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                                                ${item.Description}
                                                </div>
                                                <div class="tab-pane fade" id="nav-spec" role="tabpanel" aria-labelledby="nav-spec-tab">
                                                   ${item.Specification}          
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
                                            <div class="box-small-price-2" onclick="open_checkout('${item.Product_Code}')">
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
                                                <button class="nav-link" id="nav-spec-tab" data-bs-toggle="tab" data-bs-target="#nav-spec" type="button" role="tab" aria-controls="nav-spec" aria-selected="true">Specification</button>
                                                <button class="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Ulasan</button>
                                                <button class="nav-link" id="nav-faq-tab" data-bs-toggle="tab" data-bs-target="#nav-faq" type="button" role="tab" aria-controls="nav-faq" aria-selected="false">FAQ</button>
                                                </div>
                                            </nav>
                                            <div class="tab-content" id="nav-tabContent">
                                                <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                                                    ${item.Description}
                                                </div>
                                                <div class="tab-pane fade" id="nav-spec" role="tabpanel" aria-labelledby="nav-spec-tab">
                                                   ${item.Specification}          
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
                            all_filter_product.map((val,index)=>{
                                // 
                                // 
                                if(val.Product_Code == product_id_pilihan){
                                    $('.card-quality-right-id').append(`
                                    <div class="card-sejenis-id active_product">
                                        <div class="card-sejenis-img-id">
                                            <img src="${val.Picture_1}" alt="">
                                        </div>
                                        <div class="card-sejenis-desc-id">
                                            <p class="limited-text-commision">${val.Name}</p>
                                            <p>RP. ${commafy(val.Sell_Price)}</p>
                                            
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
                                            <p>RP. ${commafy(val.Sell_Price)}</p>
                                            
                                        </div>
                                    </div>
                                    `)
            
                                }
        
                            })
                            
                            $('.img-option-left').empty()
                            $('.item-left-img-box')
                            if(item.Picture_1 == undefined || item.Picture_1 == null || item.Picture_1 == 'NULL' || item.Picture_1 == ''){
                                $('.item-left-img-box').append(`
                                    <img src="${replace_vtintl_to_sold_co_id(item.Picture_1)}" alt="" class="img-big img-notfound" id="img-big-1" val="img-notfound">
                                `)
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
                                $('.item-left-img-box').append(`
                                    <img src="${item.Picture_2}" alt="" class="img-big img-notfound" id="img-big-2" val="img-notfound">
                                `)
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
    
                                
                                $('.item-left-img-box').append(`
                                    <img src="${item.Picture_3}" alt="" class="img-big img-notfound" id="img-big-3" val="img-notfound">
                                `)
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
                                // 
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
                            }).catch((err)=>{
                                
                            })
                            
                            Swal.fire({
                                title: 'Uploading Data',
                                timer:100,
                            })
                        
                     
                }).catch((err)=>{
                    
                })
            }).catch((err)=>{
                
            })

        }
        
    

    }
    })

    
    // 
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

const change_product_to=(product_id)=>{
    // render_get_product_detail_searching_page(product_id)
    // location.replace(`./listkategori.html?subcategory=${item}`)
    location.replace(`./itemDetail.html?product_id=${product_id}&render_from=home`)

}




// const open_detail_hutang_home=(order_number)=>{
//     // var token = localStorage.getItem('token')
//     location.replace(`./detailUnpaidList.html?detail_list_hutang=${order_number}`)
// }



const open_detail_hutang_home=(order_number)=>{
    // var token = localStorage.getItem('token')
    location.replace(`./detailUnpaidList.html?detail_list_hutang=${order_number}`)
}
const newRender_list_hutang=(customer_code)=>{
    const token = localStorage.getItem('token')
    $('.ul_list_hutang').empty()
    axios.post(`https://sales.sold.co.id/get-sales-order-data-per-customer?Customer_Code=${token}`)
    
    .then((res)=>{
        res.data.map((val,index)=>{
            
            var tanggal = val.Start_Date.split('T')

            $('.new-box-card-item-ul').append(`
            <div class="new-card-item-bd">
                <div class="top-card-item-bd">
                    <i class="fab fa-shopify"></i>
                    <div class="date-card-item-bd">
                        ${tanggal[0]}
                    </div>
                    <div class="status-card-item-bd">
                        ${val.Status}
                    </div>
                    <div class="status-card-item-bd" id="payment_method_p_bd">
                        ${val.Payment_Method}
                    </div>
                    <div class="order-card-item-bd">
                        ${token}
                    </div>     
                </div>
                <div class="card-detail-item-bd">
                    <img src="../img/vantsing_shipping_method.png" alt="">
                    <div class="order-card-item-2-bd"> 
                        <p>${val.Order_Number}</p>
                        <p>${val.Total_Quantity} barang</p>
                    </div>
                    <div class="price-card-item-bd">
                        Total Belanja: <br>
                        RP ${commafy(val.Total_Price)}
                    </div>
                </div>
                <div class="check-detail-card-item-bd">
                    <div class="address-detail-card-item-bd">
                        ${val.Shipping_Address}
                    </div>
                    <div class="address-detail-btn-payment"> 
                        <div class="box-btn-payment" onclick="unpaid_payment('${val.midtrans_redirect_url}')">
                            BAYAR
                        </div>
                    </div>
                    <div class="btn-card-detail-item-bd hvr-grow" onclick="open_detail_hutang_home('${val.Order_Number}')">
                        Lihat Detail Transaksi
                    </div>
                </div>
            </div>
            
            `)
        })
        

function commafy( num ) {
    var str = num.toString().split('.');
    if (str[0].length >= 5) {
        str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
    }
    if (str[1] && str[1].length >= 5) {
        str[1] = str[1].replace(/(\d{3})/g, '$1 ');
    }
    return str.join('.');
}
       
    }).catch((err)=>{
        
    })
}

const unpaid_payment=(link)=>{
    // alert(order_number)
    close_all_open_window()
    window.open(`${link}`,'_blank')
}


// const render_item_all_category=()=>{
//     // http://products.sold.co.id/get-product-details?Get_ALL_Sub_Category_Based_On_Category=${Category}

//     var data_atas = [
//         'ADHESIVE',
//         'APD',
//         'HARDWARE',
//         'SANITARY',
//         'INTERIOR',
//         'LAPISAN LEM',
//         'ALAT PROYEK'
       
//     ]
//     var data_bawah = [
//         'APD',
//         'HARDWARE',
//         'ADHESIVE'
//     ]
//     // 

//     var all_subcategory_storage = JSON.parse(localStorage.getItem('all_subCategory'))
//     var index_for_render = 0 // kalo udah 12 stop looping
//     if(all_subcategory_storage != null || all_subcategory_storage.length > 0 ){
//         all_subcategory_storage.map((val,index)=>{
//             val[1].map((item,id)=>{
//                 if(index_for_render <=11){
//                     index_for_render +=1
//                     // 
//                     $('.box-render-new-category').append(`
//                         <div class="card-new-category" onclick="getAllItem_fromAllSubCat('${item.Subcategory}')">
//                             <div class="cd-image-category">
//                                 <img src="${replace_vtintl_to_sold_co_id(item.Picture_1)}" class="cd-img-category">
//                             </div>
//                             <p>${item.Subcategory}</p>
//                         </div>
//                     `)
//                 }
//             })
//         })
//     }else {
//         for(var i=0; i<data_atas.length; i++){
            
//             axios.post(`https://products.sold.co.id/get-product-details?Get_ALL_Sub_Category_Based_On_Category=${data_atas[i]}`)
//             .then((res)=>{
//                 // 
//                 // 
//              $('.box-render-new-category').empty()
//                 res.data.map((val,index)=>{
//                     if(index<13){
//                         $('.box-render-new-category').append(`
//                         <div class="card-new-category" onclick="getAllItem_fromAllSubCat('${val.Subcategory}')">
//                             <div class="cd-image-category">
//                                 <img src="${replace_vtintl_to_sold_co_id(val.Picture_1)}" class="cd-img-category">
//                             </div>
//                             <p>${val.Subcategory}</p>
//                         </div>
//                         `)
//                     }
//                     // $('.top-all-category').append(`
//                     //     <div class="card card-small-category " onclick="getAllItem_fromAllSubCat('${val.Subcategory}')">
//                     //         <img src="${replace_vtintl_to_sold_co_id(val.Picture_1)}" class="card-img-top">
//                     //         <h3 class="card-title">${val.Subcategory}</h3>
//                     //     </div>
//                     // `)
//                 })
//             }).catch((err)=>{
                
//             })
            
//         }

//     }
    

        
//     // for(var i=0; i<data_bawah.length; i++){
//     //     // 
        
//     //     axios.post(`https://products.sold.co.id/get-product-details?Get_ALL_Sub_Category_Based_On_Category=${data_bawah[i]}`)
//     //     .then((res)=>{
//     //         // 
//     //         res.data.map((val,index)=>{
//     //             // 
//     //             $('.bot-all-category').append(`
//     //                 <div class="card card-small-category" onclick="getAllItem_fromAllSubCat('${val.Subcategory}')">
//     //                     <img src="${replace_vtintl_to_sold_co_id(val.Picture_1)}" class="card-img-top">
//     //                     <h3 class="card-title">${val.Subcategory}</h3>
//     //                 </div>
//     //             `)
//     //         })
//     //     }).catch((err)=>{
            
//     //     })
        
//     // }
// }



function get_product_detail_func(product_id){
    var settings = {
        "url": `https://products.sold.co.id/get-product-details?product_code=${product_id}`,
        "method": "POST",
        "timeout": 0,
    };
    
    return $.ajax(settings);
}

// function get_all_couriers(){
//     var settings = {
//         "url": `http://products.sold.co.id/get-courier-data?Get_All_Couriers=true`,
//         "method": "POST",
//         "timeout": 0,
//     };

//     // 
    
//     return $.ajax(settings);
// }
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
function get_all_subdistrict_from_courier(Courier, Courier_Code, District){
    var settings = {
        "url": `https://products.sold.co.id/get-courier-data?Courier=${Courier}&Courier_Code=${Courier_Code}&District=${District}`,
        "method": "POST",
        "timeout": 0,
    };
    
    return $.ajax(settings);
}
function get_shipping_cost_informations(Courier, Courier_Code, Province, City, District, Sub_District){
    var settings = {
        "url": `https://products.sold.co.id/get-shipping-option-data?Get_Shipping_Fee=true&Courier=${Courier}&Courier_Code=${Courier_Code}&Province=${Province}&City=${City}&District=${District}&Sub_District=${Sub_District}`,
        "method": "POST",
        "timeout": 0,
    };

    
    
    return $.ajax(settings);
}
function get_shipping_fee(Courier, Courier_Code, Province, City, District, Sub_District, delivery_time_in_days, Courier_Price_Code){
    var settings = {
        "url": `https://products.sold.co.id/get-courier-data?Get_Shipping_Fee=true&Courier=${Courier}&Courier_Code=${Courier_Code}&Province=${Province}&City=${City}&District=${District}&Sub_District=${Sub_District}&delivery_time_in_days=${delivery_time_in_days}&Courier_Price_Code=${Courier_Price_Code}`,
        "method": "POST",
        "timeout": 0,
    };

    
    
    return $.ajax(settings);
}


function new_get_shipping_cost_informations(Courier_Price_Code_orig , Courier_Price_Code_dest, packing_type, weight, length, width, height, paket_value){
    var settings = {
        "url": `https://products.sold.co.id/get-shipping-option-data?Get_Shipping_Fee=true&Courier_Price_Code_orig=${Courier_Price_Code_orig}&Courier_Price_Code_dest=${Courier_Price_Code_dest}&weight=${weight}&length=${length}&width=${width}&height=${height}&paket_value=${paket_value}&packing_type=${packing_type}`,
        "method": "POST",
        "timeout": 0,
    };

    
    
    
    return $.ajax(settings);
}
function new_get_shipping_fee(Courier_Price_Code_orig , Courier_Price_Code_dest, packing_type, weight, length, width, height, paket_value){
    var settings = {
        "url": `https://products.sold.co.id/get-courier-data?Get_Shipping_Fee=true&Courier_Price_Code_orig=${Courier_Price_Code_orig}&Courier_Price_Code_dest=${Courier_Price_Code_dest}&weight=${weight}&length=${length}&width=${width}&height=${height}&paket_value=${paket_value}&packing_type=${packing_type}`,
        "method": "POST",
        "timeout": 0,
    };

    
    
    return $.ajax(settings);
}



const render_all_kurir_before_choosing=(product_id)=>{

    var alamat_pilihan = $('.active_address_method').attr('data-value')


    if(alamat_pilihan == 'Alamat Terdaftar'){
        // $('.alert-danger').css('display','none')
        
        var alamat_terdafar = $(`.option-alamat-gb option:selected`).val()
        var testing_alamat = 'Jalanin Dulu aja  DKI Jakarta  Kota Jakarta Barat  Kebon Jeruk  Kelapa Dua'
        var split_alamat = testing_alamat.split('  ')
        var nama_jalan = split_alamat[0]
        var nama_province = split_alamat[1]
        var nama_kota = split_alamat[2]
        var nama_kecamatan = split_alamat[3]
        var nama_kelurahan = split_alamat[4]
        var nama_kurir = 'tiki'
        var kurir_kode = 'tiki'
        var allKelurahan = []

        get_all_province_from_courier(nama_kurir,kurir_kode).done(function(response){
            get_all_city_from_courier(nama_kurir,kurir_kode,nama_province).done(function(response){
                get_all_district_from_courier(nama_kurir,kurir_kode,nama_kota).done(function(response){
                    get_all_subdistrict_from_courier(nama_kurir,kurir_kode,nama_kecamatan).done(function(response){
                        allKelurahan = response
                        var Courier_Price_Code_orig = 'CGK01.00'
                        var packing_type = ''
                        const queryString = window.location.search;
                        const urlParams = new URLSearchParams(queryString);
                        var product_id = urlParams.get('groupbuy_id')
                        get_product_detail_func(product_id).done(function(response){
                            var item_product = response
                            var item_dimension = response.Dimension_CM_CUBIC
                            var split_item_dimension = item_dimension.split('*')
                            var item_length = split_item_dimension[0]
                            var item_width = split_item_dimension[1]
                            var item_height = split_item_dimension[2]
                            var paket_value = ''
                            var allPengiriman = []
                            if(item_length != undefined && item_length != null && item_length != "undefined"){
                                
                            }else {
                                item_length = 1
                            }
                            if(item_width != undefined && item_width != null && item_width != "undefined"){
                                
                            }else {
                                item_width = 1
                            }
                            if(item_height != undefined && item_height != null && item_height != "undefined"){
                                
                            }else {
                                item_height = 1
                            }
                            var berat_product = parseInt(response.Weight_KG)
                            if(berat_product <= 0 || berat_product == null || berat_product == undefined || Number.isNaN(berat_product)){
                                berat_product = 0.1*1.5;
                            }else{
                                berat_product = berat_product*1*1.5;
                            }
                            new_get_shipping_cost_informations(Courier_Price_Code_orig , allKelurahan[0].Courier_Price_Code, packing_type, berat_product, item_length, item_width, item_height, paket_value).done(function(response){
                                allPengiriman = response
                                $('.kelurahan-home-gb').empty()
                                $('.pengiriman-home-gb').empty()
                                $('.asuransi-home-gb').empty()
                                $('.packing-home-gb').empty()
                                $('.kodepos-home-gb').empty()
                                $('.kodepos-home-gb').append(`
                                    <option selected  class="id-kodepos-gb">Kode Pos</option>      
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
                                allKelurahan.map((val,index)=>{
                                    if(val.Sub_District == ''){
                                        $('.kelurahan-home-gb').append(`
                                            <option  value="${val.Sub_District}" class="id-kelurahan-gb">-</option> 
                                        `)
                                    }else {
                                        $('.kelurahan-home-gb').append(`
                                            <option  value="${val.Sub_District}" class="id-kelurahan-gb">${val.Sub_District}</option> 
                                        `)
                                        $('.kodepos-home-gb').append(`
                                            <option  value="${val.Zipcode}" class="id-kodepos-gb">${val.Zipcode}</option> 
                                        `)
                                    }
            
                                })
            

                                if(allPengiriman){

                                    if(allPengiriman.service != undefined) {
                                        allPengiriman.service.map((val,index)=>{
                                            var tarif = val.TARIFF * 1.2
                                            $('.pengiriman-home-gb').append(`
                                                <option  value="${val.EST_DAY}days ${val.SERVICE} ${tarif} ${val.DESCRIPTION} " class="${tarif}">${val.EST_DAY}days ${val.SERVICE} ${tarif} ${val.DESCRIPTION} </option> 
                                            `)
                                        })
                                    }
                                    if(allPengiriman.insurance !=undefined){
                                        allPengiriman.insurance.map((val,index)=>{
                                            $('.asuransi-home-gb').append(`
                                                <option  value="type ${val.INSURANCE_TYPE} ${val.INSURANCE_NAME} ${val.INSURANCE_COST}" class="${val.INSURANCE_COST}">${val.INSURANCE_NAME} - RP ${val.INSURANCE_COST} </option> 
                                            `)
                                        })
                                    }
                                    if(allPengiriman.packing != undefined) {
                                        allPengiriman.packing.map((val,index)=>{
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
        
    }else {
        $('#id-kurir-gb-tiki').addClass('selected')
        $('#id-kurir-gb-tiki').addClass('active_kurir_method')
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
        
        kurir = response[0]
        allKurir = response
        get_all_province_from_courier(kurir.Courier,kurir.Courier_Code).done(function(response){
            province = response[0]
            allProvince = response
            
            get_all_city_from_courier(kurir.Courier,kurir.Courier_Code,province.Province).done(function(response){
                kota = response[0]
                allKota = response
                
                get_all_district_from_courier(kurir.Courier,kurir.Courier_Code,kota.City).done(function(response){
                    
                    kelurahan = response[0]
                    district = response[0]
                    allKelurahan = response
                    allDistrict = response
                    
                    get_all_subdistrict_from_courier(kurir.Courier,kurir.Courier_Code,district.District).done(function(response){
                        kecamatan = response
                        allKecamatan = response
                        allSub_District = response
                        // 
                        // 

                        var Courier_Price_Code_orig = 'CGK01.00'
                        var packing_type = ''
                        var berat_product = parseInt(item_product.Weight_KG)
                        // 
                        // 
                        if(berat_product == 0){
                            berat_product = 0.1
                        }
                        var length = ''
                        var  width = '' 
                        var  height = ''
                        var paket_value = '' 
                        
                        
                        // get_shipping_cost_informations(kurir.Courier,kurir.Courier_Code,province.Province,kota.City,kelurahan.District,kecamatan[0].Sub_District).done(function(response){
                            new_get_shipping_cost_informations(Courier_Price_Code_orig , allKecamatan[0].Courier_Price_Code, packing_type, berat_product, length, width, height, paket_value).done(function(response){

                            
                            allPengiriman = response
                            
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
                                // 
                                $('.province-home-gb').append(`
                                    <option  value="${val.Province}" class="id-province-gb">${val.Province}</option> 
                                `)
                            })
                            allKota.map((val,index)=>{
                                // 
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
                                        var tarif = val.TARIFF * 1.2
                                        
                                        
                                        $('.pengiriman-home-gb').append(`
                                            <option  value="${val.EST_DAY}days ${val.SERVICE} ${tarif} ${val.DESCRIPTION} " class="${tarif}">${val.EST_DAY}days ${val.SERVICE} ${tarif} ${val.DESCRIPTION} </option> 
                                        `)
                                    })
                                }
                                if(allPengiriman.insurance !=undefined){
                                    allPengiriman.insurance.map((val,index)=>{
                                        // 
                                        // 
                                        // 
                                        $('.asuransi-home-gb').append(`
                                            <option  value="type ${val.INSURANCE_TYPE} ${val.INSURANCE_NAME} ${val.INSURANCE_COST}" class="${val.INSURANCE_COST}">${val.INSURANCE_NAME} - RP ${val.INSURANCE_COST} </option> 
                                        `)
                                    })
                                }
                                if(allPengiriman.packing != undefined) {
                                    allPengiriman.packing.map((val,index)=>{
                                        // 
                                        // 
                                        // 
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

    
    
}



const check_user_for_login=()=>{
    back_to_home()
    $(".force-close-all-command").css("display", "none");
    //clear form
    $('#checking_email_login').empty()
    $('#checking_password_login').empty()

    $('#checking_email_register').empty()
    $('#checking_nama_register').empty()
    $('#checking_nohp_register').empty()
    $('#checking_password_register').empty()
    //clear form
    var token = localStorage.getItem('token')
        axios.post(`https://customers.sold.co.id/get-customer-information?Customer_Code=${token}`)
        .then((res)=>{ 
            var data_customer = res.data
            
            if(data_customer){
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

                axios.post(`https://customers.sold.co.id/get-profile-image?Customer_Code=${token}`)
                .then((res)=>{
                    
                    if(res.data){
                        $(`#img-profile-id`).attr(`src`, `${res.data}`);
                        $(`#img-profile-big`).attr(`src`, `${res.data}`);
                    }else {
                        $(`#img-profile-id`).attr(`src`, `./img/accounts.png`);
                        $(`#img-profile-big`).attr(`src`, `./img/accounts.png`);
                    }
                }).catch((err)=>{
                    
                })
    
                var tahun = data_customer.Birthday.slice(0,4)
                var bulan = data_customer.Birthday.slice(5,7)
                var hari = data_customer.Birthday.slice(8,10)
                var new_tanggal_lahir = data_customer.Birthday
                var newReferralCode = data_customer.Customer_Code
                var tanggal_lahir = hari + ' ' + bulan + ' ' + tahun
                var nama_customer = data_customer.First_Name + ' ' + data_customer.Last_Name
                console.log(nama_customer)
                $('#ncp-email').html(`${data_customer.Email}`)
                $('#ncp-name').val(`${data_customer.First_Name}`)
                $('#ncp-name-belakang').val(`${data_customer.Last_Name}`)
                $('#ncp-lahir').html(new_tanggal_lahir)
                $('#name-new-profile').val(nama_customer)
                $('#ncp-hp-1').val(`${data_customer.Contact_Number_1}`)
                $('#ncp-hp-2').val(`${data_customer.Contact_Number_2}`)
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
                
                
                $('#nama_perusahaan_profile').val(data_customer.Nama_Perusahaan)
                $('#nik_supp_profile').val(data_customer.extra_column_5)
                $('#ref_code_from').val(`${data_customer.referral_customer_code}`)
                var a = $('#refer-profile').val()
                $('.new-content-isi-alamat').empty()


                if(data_customer.Address_1 == ''){
                    // 
                }else{
                    // $('#alamat-new-profile').html(`${data_customer.Address_1}`)
                    localStorage.setItem('limit_alamat',1)
                    $('.new-content-isi-alamat').append(`
                        <div class="new-box-alamat" id="alamat-active">
                            <p>Alamat Pertama</p>
                            <p>${nama_customer}</p>
                            <p>${data_customer.Contact_Number_1}</p>
                            <p>${data_customer.Address_1}</p>
                            <div class="btn-ubah-alamat" id="bua-1" onclick="change_alamat_customer('${nama_customer}','${data_customer.Contact_Number_1}','${data_customer.Address_1}',1)">
                                Ubah Alamat                      
                            </div>
                        </div>
                    `)
                    // $('.new-profile-box').append(`
                    //     <div class="login-name-3">
                    //         <div class="box-name">
                    //             <p>Alamat Lengkap</p>
                    //         </div>
                    //         <input type="text" class="form-reg-nama" value="${data_customer.Address_1}"  minlength="4" maxlength="15" id="alamat_lengkap1_user">
                    //     </div> 
                    
                    // `)
                    // 
                }
                if(data_customer.Address_2 == ''){
                    // 
                }else{
                    localStorage.setItem('limit_alamat',2)
                    $('.new-content-isi-alamat').append(`
                        <div class="new-box-alamat">
                            <p>Alamat Kedua</p>
                            <p>${nama_customer}</p>
                            <p>${data_customer.Contact_Number_1}</p>
                            <p>${data_customer.Address_2}</p>
                            <div class="btn-ubah-alamat" id="bua-1" onclick="change_alamat_customer('${nama_customer}','${data_customer.Contact_Number_1}','${data_customer.Address_2}',2)">
                                Ubah Alamat                      
                            </div>
                        </div>
                    `)
                    // 
                }
                if(data_customer.Address_3 == ''){
                    // 
                }else{
                    localStorage.setItem('limit_alamat',3)
                    $('.new-content-isi-alamat').append(`
                        <div class="new-box-alamat">
                            <p>Alamat Ketiga</p>
                            <p>${nama_customer}</p>
                            <p>${data_customer.Contact_Number_1}</p>
                            <p>${data_customer.Address_3}</p>
                            <div class="btn-ubah-alamat" id="bua-1" onclick="change_alamat_customer('${nama_customer}','${data_customer.Contact_Number_1}','${data_customer.Address_3}',3)">
                                Ubah Alamat                      
                            </div>
                        </div>
                    `)
                }
                if(data_customer.Address_4 == ''){
                    // 
                }else{
                    localStorage.setItem('limit_alamat',4)
                    $('.new-content-isi-alamat').append(`
                        <div class="new-box-alamat">
                            <p>Alamat Keempat</p>
                            <p>${nama_customer}</p>
                            <p>${data_customer.Contact_Number_1}</p>
                            <p>${data_customer.Address_4}</p>
                            <div class="btn-ubah-alamat" id="bua-1" onclick="change_alamat_customer('${nama_customer}','${data_customer.Contact_Number_1}','${data_customer.Address_4}',4)">
                                Ubah Alamat                      
                            </div>
                        </div>
                    `)
                }
                if(data_customer.Address_5 == ''){
                    // 
                }else{
                    localStorage.setItem('limit_alamat',5)
                    $('.new-content-isi-alamat').append(`
                        <div class="new-box-alamat">
                            <p>Alamat Kelima</p>
                            <p>${nama_customer}</p>
                            <p>${data_customer.Contact_Number_1}</p>
                            <p>${data_customer.Address_5}</p>
                            <div class="btn-ubah-alamat" id="bua-1" onclick="change_alamat_customer('${nama_customer}','${data_customer.Contact_Number_1}','${data_customer.Address_5}',5)">
                                Ubah Alamat                      
                            </div>
                        </div>
                    `)
                }
                
                $('#newProfileModal').modal('show')
            }else {
                
                // $('#loginModal').modal('show') // login lama
                $('#newloginTokpedModal').modal('show') // login lama
                $('.box_information_login').css('display','flex')
                $('#checking_email_login').empty()
                $('#checking_password_login').empty()
                $('#checking_email_register').empty()
                $('#checking_email_register_2').empty()
                $('#checking_password_register').empty()
                $('#checking_nama_register').empty()
                $('#checking_nohp_register').empty()
                // $('#newProfileModal').modal('show')
            }
            // NGAPUS BACKGROUND ABU ABU ORDER LIST DLL
            $('.option-5').removeClass('background_grey')
            $('.option-4').removeClass('background_grey')
            $('.option-3').removeClass('background_grey')
            $('.option-2').removeClass('background_grey')
            $('.option-1').removeClass('background_grey')
            $('.option-0').removeClass('background_grey')

            // NGAPUS CATEGORY PRODUCT
            $('.new-box-category').css('display','none')
        }).catch((err)=>{
            
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
        
   }




   function replace_vtintl_to_sold_co_id(original_url){
        var original_url = original_url.split("http://image.vtintl.id/").join("https://image.sold.co.id/");
    return original_url;
}

function getAllOrdersForThisCustomer(Customer_Code, Order_Number){
    if(Order_Number == ""){
        var settings = {
            "url": `https://sales.sold.co.id/get-sales-order-data-per-customer?Customer_Code=${Customer_Code}`,
            "method": "POST",
            "timeout": 0,
        };
    }else{
        var settings = {
            "url": `https://sales.sold.co.id/get-sales-order-data-per-customer?Order_Number=${Order_Number}`,
            "method": "POST",
            "timeout": 0,
        };
    }
    
    return $.ajax(settings);
}


const open_checkout=async(product_id)=>{
    // $('.iframe',window.parent.parent.document).css('display','block')
    // 

    // 
    // addToCart(product_id)
    
    axios.post(`https://products.sold.co.id/get-product-details?product_code=${product_id}`)
    .then(async(res)=>{
        var product = res.data
        var province_company = ''
        var city_company = ''
        var district_company = ''
        var courier_price_code_company = ''
        var token = localStorage.getItem('token')
        if(token === null){
            if(token === null){
                // swal.fire("Silahkan Login","","warning");
                Swal.fire({
                    html:`
                    <div class="o-circle c-container__circle o-circle__sign--failure">
                        <div class="o-circle__sign"></div>  
                    </div> 
                    Silahkan Login`,
                    timer:2000,
                    
                })
                // $('#loginModal',window.parent.document).modal('show')
                // window.location.href = "./sign-in.html";
            }else {
                // swal.fire("Pilih barang di keranjang","","warning");
                Swal.fire({
                    html:`
                    <div class="o-circle c-container__circle o-circle__sign--failure">
                        <div class="o-circle__sign"></div>  
                    </div> 
                    Ada Kesalahan pada barang`,
                    timer:2000,
                    
                })
            }
        }else {
            console.log(product)
            province_company = await find_province_from_product_company(product.PIC_company_address)
            city_company = await find_city_from_product_company(province_company,product.PIC_company_address)
            district_company = await find_district_from_product_company(city_company,product.PIC_company_address)
            courier_price_code_company = await find_courier_price_code_from_product_company(district_company,product.PIC_company_address)
            var array = []
            
            localStorage.setItem('itemsToCheckout',array)
            axios.post(`https://products.sold.co.id/get-product-details?product_code=${product_id}`)
            .then((res)=>{
                console.log(res.data,'7065 setelah await')
                console.log(province_company,' province company')
                console.log(city_company,' province company')
                console.log(district_company,' province company')
                console.log(courier_price_code_company,' province company')
                console.log(res.data.Sell_Price, ' sell price')
                console.log(product.PIC_company_address)
                console.log(product.Weight_KG)
                if(res.data.Stock_Quantity > 1){
                    console.log('masuk ke if 7067')
                    var productToBeAdded = {
                        productNo: product.Product_Code,
                        quantity: 1,
                        GroupCode: "NO COUPON",
                        priceAgreed: res.data.Sell_Price,
                        courier_price_code:courier_price_code_company,
                        company_address:product.PIC_company_address,
                        province_company:province_company,
                        city_company:city_company,
                        district_company:district_company.District,
                        weight_kg:product.Weight_KG,
                        berat_product:product.Weight_KG,
                        product_name:product.Name
                    }

                    array.push(productToBeAdded)
                    console.log(productToBeAdded)
                    var productToBeAddedStringify = JSON.stringify(array);
                    localStorage.setItem("itemsToCheckout", productToBeAddedStringify);            
                // $('.box_iframe_groupbuy',window.parent.document).css('display','none')
                $('.close-button',window.parent.parent.document).css('display','block')
        
                $('.close',window.parent.parent.document).css('display','none')
                
                $('.groupbuy_sp_iframe',window.parent.document).css('display','none')
                // $(".iframe",window.parent.document).toggle();
                // $('.iframe',window.parent.parent.document).toggle()
                $('.iframe',window.parent.parent.document).css('display','block')
                
               
                if($('.option-3',window.parent.parent.document).hasClass('background_grey')){
                    $('.option-3',window.parent.parent.document).removeClass('background_grey')
                }else {
                    $('.option-3',window.parent.parent.document).addClass('background_grey')
                }
        
                
                // $('.main-body').css('display','none')
                // $('.modals-search-result').css('display','block')
                
                // $('.iframe').css('display','block')
                // $('.modals-pengiriman',window.parent.document).css("display",'none')
                // $('.modals-check-harga',window.parent.document).css("display",'none')
                $('.option-1',window.parent.parent.document).removeClass('background_grey')
                $('.option-2',window.parent.parent.document).removeClass('background_grey')
                $('.option-0',window.parent.parent.document).removeClass('background_grey')
                $(".iframe",window.parent.parent.document).attr("src", `../WEB/Iframe/checkout.html?checkout_array=${productToBeAddedStringify}`);
                $('.close-button',window.parent.parent.document).css('display','none')
        
                  // SEARCH ITEM BACK TO NORMAL
                  $('.box-render-search',window.parent.parent.document).css('display','none')
                  $('.input-name',window.parent.parent.document).css('border-bottom-left-radius','10px')
                  $('.input-name',window.parent.parent.document).css('border-bottom-right-radius','10px')
                  $('.input-name',window.parent.parent.document).val(null)
                
                }else {
                    // swal.fire("Barang Tidak Tersedia","","warning");
                    Swal.fire({
                        html:`
                        <div class="o-circle c-container__circle o-circle__sign--failure">
                            <div class="o-circle__sign"></div>  
                        </div> 
                        Barang Tidak Tersedia`,
                        timer:2000,
                        
                    })
                }
        
            }).catch((err)=>{
                
            })
    
        }

    }).catch((err)=>{
        console.log(err)
    })




    // var array = []
    // localStorage.setItem('itemsToCheckout',array)
    // axios.post(`https://products.sold.co.id/get-product-details?product_code=${product_id}`)
    // .then((res)=>{
    //     if(res.data.Stock_Quantity > 1){
    //         var productToBeAdded = {
    //             productNo: product_id,
    //             quantity: 1,
    //             GroupCode: "NO COUPON",
    //             priceAgreed: res.data.Sell_Price
    //         }
    //         array.push(productToBeAdded)
            
    //         var productToBeAddedStringify = JSON.stringify(array);
    //         localStorage.setItem("itemsToCheckout", productToBeAddedStringify);
    
    //         // 
    
    
    //     $('.close-button',window.parent.parent.document).css('display','block')
        
    //     $('.close',window.parent.parent.document).css('display','none')
        
    //     $('.groupbuy_sp_iframe',window.parent.document).css('display','none')
    //     // $(".iframe",window.parent.document).toggle();
    //     // $('.iframe',window.parent.parent.document).toggle()
    //     $('.iframe',window.parent.parent.document).css('display','block')
        
       
    //     if($('.option-3',window.parent.parent.document).hasClass('background_grey')){
    //         $('.option-3',window.parent.parent.document).removeClass('background_grey')
    //     }else {
    //         $('.option-3',window.parent.parent.document).addClass('background_grey')
    //     }

        
    //     // $('.main-body').css('display','none')
    //     // $('.modals-search-result').css('display','block')
        
    //     // $('.iframe').css('display','block')
    //     // $('.modals-pengiriman',window.parent.document).css("display",'none')
    //     // $('.modals-check-harga',window.parent.document).css("display",'none')
    //     $('.option-1',window.parent.parent.document).removeClass('background_grey')
    //     $('.option-2',window.parent.parent.document).removeClass('background_grey')
    //     $('.option-0',window.parent.parent.document).removeClass('background_grey')
    //     $(".iframe",window.parent.parent.document).attr("src", `../WEB/Iframe/checkout.html?checkout_array=${productToBeAddedStringify}`);
    //     $('.close-button',window.parent.parent.document).css('display','none')

    //       // SEARCH ITEM BACK TO NORMAL
    //       $('.box-render-search',window.parent.parent.document).css('display','none')
    //       $('.input-name',window.parent.parent.document).css('border-bottom-left-radius','10px')
    //       $('.input-name',window.parent.parent.document).css('border-bottom-right-radius','10px')
    //       $('.input-name',window.parent.parent.document).val(null)
    //     }else {
    //         // swal.fire("Barang Tidak Tersedia","","warning");
    //         Swal.fire({
    //             html:`
    //             <div class="o-circle c-container__circle o-circle__sign--failure">
    //                 <div class="o-circle__sign"></div>  
    //             </div> 
    //             Barang Tidak Tersedia`,
    //             timer:2000,
                
    //         })
    //     }

    // }).catch((err)=>{
        
    // })



}




function groupbuy(product_id){
    
    var token = localStorage.getItem('token')
    
    
    axios.post(`https://products.sold.co.id/get-unpaid-sales-order-specific-for-a-product?Product_Code=${product_id}&Customer_Code=${token}`)
    .then((res)=>{
        
        // location.replace(`../Iframe/groupbuy.html?groupbuy_id=${product_id}`)
        if(res.data){
            
            $('.modals-product-detail').empty()
            $('.modals-product-detail').css('display','none')
            location.replace(`../Iframe/groupbuy.html?groupbuy_id=${product_id}`)
            
        }else {
            // alert('masuk ke else 1890')
            
            Swal.fire({
                // title: 'Anda Memiliki Pembayaran Yang Belum Dibayar',
                html:`
                <div class="o-circle c-container__circle o-circle__sign--failure">
                    <div class="o-circle__sign"></div>  
                </div>  
                Anda Memiliki Hutang, Silahkan Membayar Terlebih Dahulu, <br> Lalu Kembali Memesan Secara Groupbuy / Anda Dapat Memesan Dengan Harga Normal
                `,
                timer:2000,
                // showDenyButton: true,
                // showCancelButton: false,
                // confirmButtonText: `Lihat Daftar Tagihan`,
                // denyButtonText: `Cancel`,
              }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    render_daftar_hutang()
                    
                    // location.replace(`../Iframe/groupbuy.html?list_hutang=${product_id}`)
                  $(".force-close-all-command").css("display", "none");
                  $('#daftarHutangModal').modal('show')
                  $('.modals-product-detail').css('display','none')
                } else if (result.isDenied) {
                    // Swal.fire('Cancel berhasil', '', 'success')
                    Swal.fire({
                        html:`
                        <div class="o-circle c-container__circle o-circle__sign--success">
                            <div class="o-circle__sign"></div>  
                        </div>   
                        Cancel Berhasil
                        `,
                        timer:2000,
                        
                    })
                    $('.modals-product-detail').css('display','none')
                }
                
              })
            //   close_all_open_window()
        }
    }).catch((err)=>{
        
    })

    
}


function payment_groupbuy_home(product_id){
   
    var token = localStorage.getItem('token')
    var total_price = $('#tp_iframe').val()
    var detail_product;
    var data_customer;
    var items = []
    var total_qty_from_user = parseInt($('.qty_groupbuy_home').val())
    // BATAS TESTING

    
    var province_pilihan=$('.province-home-gb option:selected').val()
    var kota_pilihan=$('.kota-home-gb option:selected').val()
    var kecamatan_pilihan=$('.kecamatan-home-gb option:selected').val()
    var kelurahan_pilihan=$('.kelurahan-home-gb option:selected').val()
    var kodepos_pilihan = $('.kodepos-home-gb').val()
    var new_kurir_pilihan = $('.active_delivery_method').attr('data-value')
    var payment_method_pilihan = $('.radio_payment_method').attr('data-value')
    var total_Quantity = parseInt($('.qty_groupbuy_home').val())+1
    var pengiriman_pilihan = $('.pengiriman-home-gb option:selected').val()    
    var asuransi_pilihan = $('.asuransi-home-gb option:selected').val()
    var packing_pilihan = $('.packing-home-gb option:selected').val()
    var harga_shipping = parseInt($('.pengiriman-home-gb option:selected').attr('class'))
    var harga_asuransi = parseInt($('.asuransi-home-gb option:selected').attr('class'))
    var harga_packing = parseInt($('.packing-home-gb option:selected').attr('class'))
    var total_harga_shipping_with_product = $('.harga_total_prod_with_shipping_qty').attr('id')
    var harga_shipping_qty = $('.harga_shipping_qty').attr('id')
    var harga_total_product = $('.harga_total_product_qty').attr('id')
    var biaya_pengiriman = parseInt(harga_shipping_qty)

    var isKurir_pilihan = false
    var isProvince_pilihan = false
    var isKota_pilihan = false
    var isKecamatan_pilihan = false
    var isKelurahan_pilihan = false
    var isQty_pilihan = false
    var isAlamat_pilihan = false
    var isPacking_pilihan = false
    var isPaymentMethod_pilihan = false
    var isPengiriman_pilihan = false
    if(harga_packing == undefined || harga_packing == null || harga_packing == 'NULL' || harga_packing == 'undefined' || isNaN(harga_packing)){
        harga_packing = 0
    }

    

    var alamat_input = $('#alamat_gb').val()
    var alamat_lain_input = $('#alamat_lain').val()
    
    
    if(asuransi_pilihan == 'Asuransi' ){
        asuransi_pilihan = ''
    }
    if(packing_pilihan == 'Packing'){
        packing_pilihan = ''
    }


    var total_harga_shipping_with_insurance_packing = harga_shipping + harga_asuransi + harga_packing
    

    var product_name_shipping = pengiriman_pilihan + asuransi_pilihan + packing_pilihan
    
    if(alamat_lain_input.length>0){
       isAlamat_pilihan = true
        var final_address = alamat_lain_input + kecamatan_pilihan + kelurahan_pilihan + kota_pilihan + province_pilihan + kodepos_pilihan
        
    }else if (alamat_input.length > 0) {      
        isAlamat_pilihan = true
        var final_address = alamat_input + ' ' + kecamatan_pilihan + ' ' + kelurahan_pilihan + ' ' + kota_pilihan + ' ' + province_pilihan + ' ' + kodepos_pilihan
        
    }else {
        isAlamat_pilihan = false
    }

    if(new_kurir_pilihan == undefined || new_kurir_pilihan == 'undefined' || new_kurir_pilihan == null || new_kurir_pilihan.length == 0){
        isKurir_pilihan = false
    }else {
        isKurir_pilihan = true
    }

    if(pengiriman_pilihan == undefined || pengiriman_pilihan == 'undefined' || pengiriman_pilihan == null || pengiriman_pilihan.length == 0){
        isPengiriman_pilihan = false
    }else {
        isPengiriman_pilihan = true
    }

    if(payment_method_pilihan == undefined || payment_method_pilihan == 'undefined' || payment_method_pilihan == null || payment_method_pilihan.length == 0){
        isPaymentMethod_pilihan = false
    }else {
        isPaymentMethod_pilihan = true
    }

    if(packing_pilihan == undefined || packing_pilihan == null || packing_pilihan == 'NULL' || packing_pilihan == 'undefined'){
        packing_pilihan = ''
        isPacking_pilihan = false
    }else {
        isPacking_pilihan = true
    }

    if(kecamatan_pilihan == undefined || kecamatan_pilihan == null || kecamatan_pilihan == 'NULL' || kecamatan_pilihan == 'undefined'){
        
         kecamatan_pilihan = ''
         isKecamatan_pilihan = false
     }else {
        isKecamatan_pilihan = true
     }
     if( kelurahan_pilihan == undefined || kelurahan_pilihan == null || kelurahan_pilihan == 'NULL' || kelurahan_pilihan == 'undefined'){
         
         kelurahan_pilihan = ''
         isKelurahan_pilihan = false
     }else {
        isKelurahan_pilihan = true
     }

     var totalQtyIsANumber = isNaN(total_qty_from_user)
     
     if(total_qty_from_user == undefined || total_qty_from_user == 'undefined' || total_qty_from_user == null || total_qty_from_user.length == 0 || total_qty_from_user == NaN || totalQtyIsANumber){
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

     if(isPaymentMethod_pilihan && isProvince_pilihan && isKota_pilihan && isKecamatan_pilihan && isKelurahan_pilihan && isQty_pilihan &&
        isPengiriman_pilihan){
            get_all_couriers().done(function(response){
                var dataAllKurir = response
                allKurir = response
                
                
                var kurir_kode =''
                for(var i=0; i<dataAllKurir.length; i++){
                    if(dataAllKurir[i].Courier == new_kurir_pilihan){
                        kurir_kode = dataAllKurir[i].Courier_Code
                    }
                }
                if(total_qty_from_user>0) { 
                    axios.post(`https://sales.sold.co.id/check-group-buy-quantity-so-far-gross?Group_Buy_Purchase_PC=${product_id}`)
                    .then((res)=>{
                        total_item_kebeli = res.data
                        
                        if(res.data.Total_Quantity === null) { // hasil null berarti belum ada customer lain yang beli
                            
                            axios.post(`https://products.sold.co.id/get-product-details?product_code=${product_id}`)
                            .then((res)=>{
                                
                                detail_product = res.data
                                axios.post(`https://customers.sold.co.id/get-customer-information?Customer_Code=${token}`)
                                .then((res)=>{
                                    
                                    
                                    customerDetails  ={
                                        Customer_Code:token,
                                        Total_Price: total_harga_shipping_with_product,
                                        Total_Quantity : total_Quantity,
                                        Unit:"pcs",
                                        Shipping_Address: final_address,
                                        Payment_Method : payment_method_pilihan,
                                        Shipping_Fee: harga_shipping_qty,
                                        Primary_Recipient_Name:res.data.First_Name + " " + res.data.Last_Name,
                                        Shipping_Contact_Number:res.data.Contact_Number_1
                                    }         
                                    items.push( {
                                            Customer_Code: token,
                                            Product_Code: product_id,
                                            Product_Name: detail_product.Name,
                                            Quantity_Requested: $('.qty_groupbuy_home').val(),
                                            Price_Based_On_Total_Quantity: harga_total_product
                    
                                    }) 
                                    items.push( {
                                        Customer_Code: token,
                                        Product_Code: kurir_kode,
                                        Product_Name: product_name_shipping,
                                        Quantity_Requested: '1',
                                        Price_Based_On_Total_Quantity: total_harga_shipping_with_insurance_packing
                
                                    })  
                                    var data = {
                                        "Sales_Order_Data": customerDetails,
                                        "Sales_Order_Detail_data": items
                                    }
                                    
            
                                    axios.post(`https://sales.sold.co.id/create-new-group-buy-sales-order-by-customer?Customer_Code=${token}`,data,{
                                        headers:{
                                            "Content-Type":'application/json'
                                        },
                                        "data":JSON.stringify({
                                            "Sales_Order_data":customerDetails,
                                            "Sales_Order_Detail_data": items
                                        })
                                    }).then((res)=>{
                                        if(res.data.status){
                                            // swal.fire("Penambahan Data Berhasil, Silahkan Check Cart", "", "success");
                                            Swal.fire({
                                                html:`
                                                <div class="o-circle c-container__circle o-circle__sign--success">
                                                    <div class="o-circle__sign"></div>  
                                                </div>   
                                                Penambahan Data Berhasil
                                                `,
                                                timer:2000,
                                                
                                            })
                                            $('.modals-product-detail').css('display','none')
                                            $('.box-delete-success').css('display','block')
                                            // tambahin gambar yg dari mas fauzi
                                            
                                            location.replace(`../Iframe/success.html`)
                                        }else {
                                            Swal.fire({
                                                html:`
                                                <div class="o-circle c-container__circle o-circle__sign--failure">
                                                    <div class="o-circle__sign"></div>  
                                                </div> 
                                                Pembelian Gagal`,
                                                timer:2000,
                                                
                                            })
                                        }
                                        
                                    }).catch((err)=>{
                                        
                                    })
                                    
            
                                }).catch((err)=>{
                                    
                                })
                            }).catch((err)=>{
                                
                            })
                        }else { // hasil else dari if null berarti ada cust yg udh beli. sisa productnya
                            
                            axios.post(`https://products.sold.co.id/get-product-details?product_code=${product_id}`)
                            .then((response)=>{
                                
                                
                                var item_tersedia = response.data.GroupBuy_SellQuantity - total_item_kebeli.Total_Quantity
                                
                                if(total_qty_from_user > item_tersedia){
                    
                                      Swal.fire({
                                        html:`
                                        <div class="o-circle c-container__circle o-circle__sign--failure">
                                            <div class="o-circle__sign"></div>  
                                        </div> 
                                        Hanya Bisa Membeli ${item_tersedia}`,
                                        timer:2000,
                                        
                                    })
            
                                      axios.post(`https://products.sold.co.id/get-product-details?product_code=${product_id}`)
                                      .then((res)=>{
                                          
                                          detail_product = res.data
                                          axios.post(`https://customers.sold.co.id/get-customer-information?Customer_Code=${token}`)
                                          .then((res)=>{
                                              
                                              data_customer = res.data
                                              var harga_pembelian = item_tersedia * parseInt(detail_product.GroupBuy_SellPrice)
                                              
                                              
                                              customerDetails  ={
                                                Customer_Code:token,
                                                Total_Price: total_harga_shipping_with_product,
                                                Total_Quantity : item_tersedia +1,
                                                Unit:"pcs",
                                                Shipping_Address: final_address,
                                                Payment_Method : payment_method_pilihan,
                                                Shipping_Fee: harga_shipping_qty,
                                                Shipping_Contact_Number:res.data.Contact_Number_1,
                                                Primary_Recipient_Name:data_customer.First_Name + " " + data_customer.Last_Name
                                            }         
                                            items.push( {
                                                    Customer_Code: token,
                                                    Product_Code: product_id,
                                                    Product_Name: detail_product.Name,
                                                    Quantity_Requested: item_tersedia,
                                                    Price_Based_On_Total_Quantity: harga_total_product
                            
                                            }) 
                                            items.push( {
                                                Customer_Code: token,
                                                Product_Code: kurir_kode,
                                                Product_Name: product_name_shipping,
                                                Quantity_Requested: '1',
                                                Price_Based_On_Total_Quantity: total_harga_shipping_with_insurance_packing
                        
                                            })  
                                            var data = {
                                                "Sales_Order_Data": customerDetails,
                                                "Sales_Order_Detail_data": items
                                            }     
                                            
                                            
                                                  
                                                  
                                                axios.post(`https://sales.sold.co.id/create-new-group-buy-sales-order-by-customer?Customer_Code=${token}`,data,{
                                                    headers:{
                                                        "Content-Type":'application/json'
                                                    },
                                                    "data":JSON.stringify({
                                                        "Sales_Order_data":customerDetails,
                                                        "Sales_Order_Detail_data": items
                                                    })
                                                }).then((res)=>{
                                                    
                                                    if(res.data){
                                                        Swal.fire({
                                                            html:`
                                                            <div class="o-circle c-container__circle o-circle__sign--success">
                                                                <div class="o-circle__sign"></div>  
                                                            </div>   
                                                            Pembelian Data Berhasil
                                                            `,
                                                            timer:2000,
                                                            
                                                        })
                                                        // tambahin gambar yg dari mas fauzi
                                                        
                                                        location.replace(`../Iframe/success.html`)
                                                    }else {
                                                        // swal.fire("Pembelian Gagal, Silahkan Check Cart", "", "error");
                                                        Swal.fire({
                                                            html:`
                                                            <div class="o-circle c-container__circle o-circle__sign--failure">
                                                                <div class="o-circle__sign"></div>  
                                                            </div> 
                                                            Pembelian Gagal, Silahkan Check Cart`,
                                                            timer:2000,
                                                            
                                                        })
                                                    }
                                                    // $('.modals-product-detail').css('display','none')
                                                }).catch((err)=>{
                                                    
                                                })         
                                          }).catch((err)=>{
                                              
                                          })
                                      }).catch((err)=>{
                                          
                                      })
                                }else {// pembelian jika total qty dari user tidak melebihi item yang tersedia
                                    
                                    axios.post(`https://products.sold.co.id/get-product-details?product_code=${product_id}`)
                                    .then((res)=>{
                                        detail_product = res.data
                                        axios.post(`https://customers.sold.co.id/get-customer-information?Customer_Code=${token}`)
                                        .then((res)=>{
                                            data_customer =res.data
                                            
                                            customerDetails  ={
                                                Customer_Code:token,
                                                Total_Price: total_harga_shipping_with_product,
                                                Total_Quantity : total_Quantity,
                                                Unit:"pcs",
                                                Shipping_Address: final_address,
                                                Payment_Method : payment_method_pilihan,
                                                Shipping_Fee: harga_shipping_qty,
                                                Shipping_Contact_Number:res.data.Contact_Number_1,
                                                Primary_Recipient_Name:data_customer.First_Name + " " + data_customer.Last_Name
                                            }         
                                            items.push( {
                                                    Customer_Code: token,
                                                    Product_Code: product_id,
                                                    Product_Name: product_name_shipping,
                                                    Quantity_Requested: $('.qty_groupbuy_home').val(),
                                                    Price_Based_On_Total_Quantity: harga_total_product
                            
                                            }) 
                                            items.push( { // data kurir
                                                Customer_Code: token,
                                                Product_Code: kurir_kode,
                                                Product_Name: product_name_shipping,
                                                Quantity_Requested: '1',
                                                Price_Based_On_Total_Quantity:total_harga_shipping_with_insurance_packing
                        
                                            })  
                                            var data = {
                                                "Sales_Order_Data": customerDetails,
                                                "Sales_Order_Detail_data": items
                                            }    
                                            
                                            
                                            
            
                                            axios.post(`https://sales.sold.co.id/create-new-group-buy-sales-order-by-customer?Customer_Code=${token}`,data,{
                                                headers:{
                                                    "Content-Type":'application/json'
                                                },
                                                "data":JSON.stringify({
                                                    "Sales_Order_data":customerDetails,
                                                    "Sales_Order_Detail_data": items
                                                })
                                            }).then((res)=>{
                                                if(res.data.status){
                                                    
                                                    // swal.fire("Penambahan Data Berhasil, Silahkan Check Cart", "", "success");
                                                    Swal.fire({
                                                        html:`
                                                        <div class="o-circle c-container__circle o-circle__sign--success">
                                                            <div class="o-circle__sign"></div>  
                                                        </div>   
                                                        Penambahan Data Berhasil
                                                        `,
                                                        timer:2000,
                                                        
                                                    })
                                                    // close_all_open_window()
                                                    $('.modals-product-detail').css('display','none')
                                                    $('.box_iframe_groupbuy').css('display','none')
                                                    
                                                    
                                                    $('.box_iframe_groupbuy').remove()
                                                    // tambahin gambar yg dari mas fauzi
                                                    
                                                    location.replace(`../Iframe/success.html`)
            
                                                    
                                                }else {
                                                    // swal.fire("Penambahan Data gagal, Silahkan Check Pengisian data", "", "success");
                                                    Swal.fire({
                                                        html:`
                                                        <div class="o-circle c-container__circle o-circle__sign--failure">
                                                            <div class="o-circle__sign"></div>  
                                                        </div> 
                                                        Penambahan Data Gagal, Silahkan Check Pengisian Data`,
                                                        timer:2000,
                                                        
                                                    })
                                                    $('.modals-product-detail').css('display','none')
                                                }
                                            }).catch((err)=>{
                                                
                                            })
                                            // refresh()
            
                                        }).catch((err)=>{
                                            
                                        })
                                    }).catch((err)=>{
                                        
                                    })
                                }
                            }).catch((err)=>{
                                
                            })
                        }
                    }).catch((err)=>{
                        
                    })
                }else {
                    
                }
            })
    }else { // ada yang belum di isi
        Swal.fire({
            html:`
            <div class="o-circle c-container__circle o-circle__sign--failure">
                <div class="o-circle__sign"></div>  
            </div> 
            Ada Field yang belum Di isi`,
            timer:2000,
            
        })

    }
    
}




async function addressMethod(address,item){
    
    // 
    $('.radio_address_card').removeClass('selected')
    $('.radio_address_card').removeClass('active_address_method')

    var address_id = address
    var id = $('.radio_address_card').attr('id')
    
    

    $(`#${address}`).addClass('selected')
    $(`#${address}`).addClass('active_address_method')

    if(item === 'Alamat Terdaftar'){
        Swal.fire({
            title: 'Uploading Data',
            timer:300000000,
            html: ` 
            <div class="boxcon">
                <div class="box1">
                </div>
                <div id="sold-id-loading">
                SOLDAYS 
                </div>
                    
                <div class="box2">
                </div>
            </div>
        `,didOpen:async()=>{

            $('.new-alamat-pengiriman').css('display','none')
            $('.option-alamat-gb').css('display','flex')
            $('.new-alamat-pengiriman').css('display','none')
            // $('.province-box-gb').css('display','none')
            // $('.kota-box-gb').css('display','none')
            // $('.kecamatan-box-gb').css('display','none')
            $('.kelurahan-box-gb').css('display','none')
            $('.new-card-kurir-sp').css('display','none')
            $('.new-box-card-kurir-sp').css('height','240px')
            $('.new-box-card-kurir-sp').css('min-height','240px')
    
            var nama_province =  await find_province_from_address()
            var nama_kota = await find_city_from_address(nama_province)
            var nama_kecamatan = await find_district_from_address(nama_kota)
            var nama_kelurahan = await find_subDistrict_from_address(nama_kecamatan)

            var nama_kurir = 'tiki'
            var kurir_kode = 'tiki'
            var allKelurahan = []
    
            get_all_province_from_courier(nama_kurir,kurir_kode).done(function(response){
                get_all_city_from_courier(nama_kurir,kurir_kode,nama_province).done(function(response){
                    get_all_district_from_courier(nama_kurir,kurir_kode,nama_kota).done(function(response){
                        get_all_subdistrict_from_courier(nama_kurir,kurir_kode,nama_kecamatan).done(function(response){
                            allKelurahan = response
                            // 
                            var Courier_Price_Code_orig = 'CGK01.00'
                            var packing_type = ''
                            const queryString = window.location.search;
                            const urlParams = new URLSearchParams(queryString);
                            var product_id = urlParams.get('groupbuy_id')
                            get_product_detail_func(product_id).done(async function(response){
                                var alamat_company = response.PIC_company_address
                                var province_company = await find_province_from_product_company(alamat_company)
                                var city_company = await find_city_from_product_company(province_company,alamat_company)
                                var district_company = await find_district_from_product_company(city_company,alamat_company)
                                var courier_price_code_company = await find_courier_price_code_from_product_company(district_company,alamat_company)
                                var item_product = response
                                var item_dimension = response.Dimension_CM_CUBIC
                                var split_item_dimension = item_dimension.split('*')
                                var item_length = split_item_dimension[0]
                                var item_width = split_item_dimension[1]
                                var item_height = split_item_dimension[2]
                                var paket_value = ''
                                var allPengiriman = []
                                var total_qty_from_user = parseInt($('.qty_groupbuy_home').val())
                                if(item_length != undefined && item_length != null && item_length != "undefined"){
                                    
                                }else {
                                    item_length = 1
                                }
                                if(item_width != undefined && item_width != null && item_width != "undefined"){
                                    
                                }else {
                                    item_width = 1
                                }
                                if(item_height != undefined && item_height != null && item_height != "undefined"){
                                    
                                }else {
                                    item_height = 1
                                }
                                var berat_product = parseInt(response.Weight_KG)
                                if(berat_product <= 0 || berat_product == null || berat_product == undefined || Number.isNaN(berat_product)){
                                    berat_product = 0.1*1.5;
                                }else{
                                    berat_product = berat_product*1*1.5;
                                }
                                new_get_shipping_cost_informations(Courier_Price_Code_orig , allKelurahan[0].Courier_Price_Code, packing_type, berat_product, item_length, item_width, item_height, paket_value).done(function(response){
                                    allPengiriman = response
                                    // 
                                    // 
                                    $('.kelurahan-home-gb').empty()
                                    $('.pengiriman-home-gb').empty()
                                    $('.asuransi-home-gb').empty()
                                    $('.packing-home-gb').empty()
                                    $('.kodepos-home-gb').empty()
                                    $('.kodepos-home-gb').append(`
                                        <option selected  class="id-kodepos-gb">Kode Pos</option>      
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
                                    allKelurahan.map((val,index)=>{
                                        if(val.Sub_District == ''){
                                            $('.kelurahan-home-gb').append(`
                                                <option  value="${val.Sub_District}" class="id-kelurahan-gb">-</option> 
                                            `)
                                        }else {
                                            $('.kelurahan-home-gb').append(`
                                                <option  value="${val.Sub_District}" class="id-kelurahan-gb">${val.Sub_District}</option> 
                                            `)
                                            $('.kodepos-home-gb').append(`
                                                <option  value="${val.Zipcode}" class="id-kodepos-gb">${val.Zipcode}</option> 
                                            `)
                                        }
                
                                    })
                
    
                                    if(allPengiriman){
    
                                        if(allPengiriman.service != undefined) {
                                            allPengiriman.service.map((val,index)=>{
                                                var tarif = val.TARIFF * 1.2
                                                if(allPengiriman.service.length > 0 && allPengiriman.service.length <2){
                                                    
                                                        $('.pengiriman-home-gb').append(`
                                                            <option selected value="${val.EST_DAY}days ${val.SERVICE} ${tarif} ${val.DESCRIPTION} " class="${tarif}">${val.EST_DAY}days ${val.SERVICE} ${tarif} ${val.DESCRIPTION} </option> 
                                                        `)
                                                }else {
                                                    if(index === 0 ){
                                                        
                                                        $('.pengiriman-home-gb').append(`
                                                            <option selected value="${val.EST_DAY}days ${val.SERVICE} ${tarif} ${val.DESCRIPTION} " class="${tarif}">${val.EST_DAY}days ${val.SERVICE} ${tarif} ${val.DESCRIPTION} </option> 
                                                        `)
                                                    }else {
                                                        $('.pengiriman-home-gb').append(`
                                                            <option  value="${val.EST_DAY}days ${val.SERVICE} ${tarif} ${val.DESCRIPTION} " class="${tarif}">${val.EST_DAY}days ${val.SERVICE} ${tarif} ${val.DESCRIPTION} </option> 
                                                        `)
                                                    }
                                                }
                                            })
                                        }
                                        if(allPengiriman.insurance !=undefined){
                                            if(allPengiriman.insurance.length === 0 ){
                                                $('.new-gb-asuransi').css('display','none')
                                            }
                                            allPengiriman.insurance.map((val,index)=>{
                                                if(allPengiriman.insurance.length > 0 ){
                                                    if(index === 0){
                                                        $('.asuransi-home-gb').append(`
                                                            <option  selected value="type 0 tidak berasuransi" class="tidak berasuransi">Tidak Menggunakan Asuransi</option> 
                                                        `)
                                                        $('.asuransi-home-gb').append(`
                                                            <option  value="type ${val.INSURANCE_TYPE} ${val.INSURANCE_NAME} ${val.INSURANCE_COST}" class="${val.INSURANCE_COST}">${val.INSURANCE_NAME} - RP ${val.INSURANCE_COST} </option> 
                                                        `)
                                                    }else {
                                                        $('.asuransi-home-gb').append(`
                                                            <option  value="type ${val.INSURANCE_TYPE} ${val.INSURANCE_NAME} ${val.INSURANCE_COST}" class="${val.INSURANCE_COST}">${val.INSURANCE_NAME} - RP ${val.INSURANCE_COST} </option> 
                                                        `)
                                                    }
                                                }else {
                                                    $('.new-gb-asuransi').css('display','none')
                                                }
                                            })
                                        }
                                        if(allPengiriman.packing != undefined) {
                                            console.log(allPengiriman.packing,' allpengiriman packing')
                                            if(allPengiriman.packing.length === 0 ){
                                                $('.new-gb-packing').css('display','none')
                                            }
                                            allPengiriman.packing.map((val,index)=>{
                                                if(allPengiriman.packing.length >0){
                                                    if(allPengiriman.packing.length > 0 && allPengiriman.packing.length < 2){
                                                        $('.packing-home-gb').append(`
                                                            <option selected value="${val.PACKING_TYPE}" class="${val.PACKING_FEE}">${val.PACKING_TYPE} - RP ${val.PACKING_FEE} </option> 
                                                        `)
                                                    }else if( allPengiriman.packing.length >2 ){
                                                        if(index === 0 ){
                                                            $('.packing-home-gb').append(`
                                                                <option selected value="${val.PACKING_TYPE}" class="${val.PACKING_FEE}">${val.PACKING_TYPE} - RP ${val.PACKING_FEE} </option> 
                                                            `)  
                                                        }else {
                                                            $('.packing-home-gb').append(`
                                                                <option  value="${val.PACKING_TYPE}" class="${val.PACKING_FEE}">${val.PACKING_TYPE} - RP ${val.PACKING_FEE} </option> 
                                                            `)
                                                        }
                                                    }
                                                }else {
                                                    alert('masuk ke else 10553')
                                                    $('.new-gb-packing').css('display','none')
                                                }
                                            })
                                        }   
                
                                    }


                                    var harga_total_product = item_product.GroupBuy_SellPrice * total_qty_from_user
                                    var harga_total_product_with_shipping = parseInt(harga_total_product) + parseInt(harga_shipping)
                                    $('.ndps-left').empty()
                                    $('.ndps-right').empty()
        
                                    $('#total_biaya_pengiriman_gb').val(harga_shipping)
                                    $('.ndps-left').append(`
                                        <div class="detail-ndps-left">
                                            <p class="limited-text-short"> ${item_product.Name} <br>
                                                    ${total_qty_from_user} x Rp ${item_product.GroupBuy_SellPrice}
                                            </p>
                                        </div>
                                        <div class="detail-ndps-left">
                                            Shipping Fee
                                        </div>
                                        <div class="detail-ndps-left">
                                            Total Amount
                                        </div>
                                    `)
                                    $('.ndps-right').append(`
                                        <div class="detail-ndps-right harga_total_product_qty" id="${harga_total_product}" value="${harga_total_product}">
                                            Rp ${harga_total_product}
                                        </div>
                                        <div class="detail-ndps-right harga_shipping_qty" id="${harga_shipping}" value="${harga_shipping}">
                                            Rp ${harga_shipping}
                                        </div>
                                        <div class="detail-ndps-right harga_total_prod_with_shipping_qty" id="${harga_total_product_with_shipping}" id="harga_total_prod_with_shipping_qty" value="${harga_total_product_with_shipping}">
                                            Rp ${harga_total_product_with_shipping}
                                        </div>
                                    `)
                                    Swal.fire({
                                        title: 'Uploading Data',
                                        timer:100,
                                    })
                                })
                            })
                        })
                    })
                })
            })
        }
        })
        

    }else if (item === 'Alamat Baru'){
        Swal.fire({
            title: 'Uploading Data',
            timer:300000000,
            html: ` 
            <div class="boxcon">
                <div class="box1">
                </div>
                <div id="sold-id-loading">
                SOLDAYS 
                </div>
                    
                <div class="box2">
                </div>
            </div>
        `,didOpen:()=>{
            $('.option-alamat-gb').css('display','none')
            $('.new-card-kurir-sp').css('display','flex')
            $('.new-box-card-kurir-sp').css('height','600px')
            $('.new-box-card-kurir-sp').css('min-height','600px')
            $('.new-alamat-pengiriman').css('display','flex')
            $('#id-kurir-gb-tiki').addClass('selected')
            $('#id-kurir-gb-tiki').addClass('active_kurir_method')
            // $('.new-box-card-kurir-sp-top').css('display','flex')
            // $('.province-box-gb').css('display','flex')
            // $('.kota-box-gb').css('display','flex')
            // $('.kecamatan-box-gb').css('display','flex')
            $('.kelurahan-box-gb').css('display','flex')
            Swal.fire({
                title: 'Uploading Data',
                timer:100,
            })
        }
        })
    }
}

// EDIT DISCOUNT
const edit_product_discount=(product_id)=>{
    $("#"+product_id+"-discount").prop('disabled',false) 
    $("#"+product_id+"-discount").css('background-color','#ddd')


    $("#"+product_id+"-box_edit_discount").css('display','none') // icon 
    $("#"+product_id+"-save_discount").css('display','block') // icon
}

const save_edit_discount=(product_id)=>{
    $('#get_otp').modal('show')
    $('#s_product_name').addClass(product_id)
    $('#s_product_name').addClass('product_discount')

    clearOTPform()

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
    $('#get_otp').modal('show')
    $('#s_product_name').addClass(product_id)
    $('#s_product_name').addClass('product_quantity')

    clearOTPform()
 }

 // HARGA
const edit_product_harga=(product_id)=>{
    $("#"+product_id+"-harga").prop('disabled',false) 
    $("#"+product_id+"-harga").css('background-color','#ddd')


    $("#"+product_id+"-box_edit_harga").css('display','none') // icon 
    $("#"+product_id+"-save_harga").css('display','block') // icon
    
}

const save_edit_harga=(product_id)=>{

    $('#get_otp').modal('show')
    $('#s_product_name').addClass(product_id)
    $('#s_product_name').addClass('product_sell_price')

    clearOTPform()

}


// NAME
const edit_product_name=(product_id)=>{
    // $("input").prop('disabled', true);
    // alert(product_id)
    // $(".prod_name").prop('disabled', false); 6900005030114
    
    $("#"+product_id+"-name").prop('disabled',false) 
    $("#"+product_id+"-name").css('background-color','#ddd')
    $("#"+product_id+"-box_edit_name").css('display','none') // icon 
    $("#"+product_id+"-save_name").css('display','block') // icon

    // $('.icon-edit-prod').prop('disabled',true)
  

}

const clearOTPform=()=>{
    $('#id_otp').val('')
    $('#id_pass').val('')
}


const save_edit_name=(product_id)=>{
    // alert($("#"+product_id+"-name").val())
    
    $('#get_otp').modal('show')
    $('#s_product_name').addClass(product_id)
    $('#s_product_name').addClass('product_name')
 

    clearOTPform()
}


const check_number_wa=()=>{

    Swal.fire({
        title: 'Whatsapp Number  <br> +62812 7777 8888',
        text: "Ingin Menghubungi Customer Service?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
      }).then((result) => {
          
          if(result.dismiss==='cancel'){
        }else {
            
            window.open("https://wa.me/6281277778888","_blank")
          }
      })
}


const change_status_otp=(token)=>{
    $('#get_otp').modal('show')
    $('#s_product_name').addClass(token)
    $('#s_product_name').addClass('status_gb')

    clearOTPform()
}

const save_product_name=()=>{
    // alert('simpan jalan')
    var otp = $('#id_otp').val()
    var pass = $('#id_pass').val()
    var token = localStorage.getItem('token')
    var email;
    var item = document.getElementById('s_product_name').className.split(/\s+/);
    var product_id = item[1]
    var jenis_edit = item[2]
    if(jenis_edit === 'product_name'){
        
        axios.post(`https://customers.sold.co.id/get-customer-information?Customer_Code=${token}`)
        .then((res)=>{
            
            email = res.data.Email
            //encrypt pass
            var new_pass
            axios.post(`https://customers.sold.co.id/password-generator?Password=${pass}`)
            .then((res)=>{
                if(res.data){
                    new_pass = res.data

                    axios.post(`https://customers.sold.co.id/verify-otp?Email=${email}&User_Password=${new_pass}&otp=${otp}`)
                    .then((res)=>{
                        
                        if(res.data){
                            $("#"+product_id+"-name").prop('disabled',true) 
                            $("#"+product_id+"-box_edit_name").css('display','block') // icon 
                            $("#"+product_id+"-save_name").css('display','none') // icon
                            $("#"+product_id+"-name").css('background-color','transparent')
    
                            var nama = $("#"+product_id+"-name").val()
                            var harga = $("#"+product_id+"-harga").val()
                            var qty = $("#"+product_id+"-qty").val()
                            var token = localStorage.getItem('token')
    
                            
                            
                            
                            
    
                            if(nama.length <5){
                                axios.post(`https://products.sold.co.id/get-product-details?product_code=${product_id}`)
                                .then((res)=>{
                                    
                                    $("#"+product_id+"-name").val(res.data.Name)
                                    // swal.fire("Gagal Mengubah Data", "", "error");
                                    Swal.fire({
                                        html:`
                                        <div class="o-circle c-container__circle o-circle__sign--failure">
                                            <div class="o-circle__sign"></div>  
                                        </div> 
                                        Gagal Mengubah Data`,
                                        timer:2000,
                                        
                                    })
                                    re_render_item_product()
                                }).catch((err)=>{
                                    
                                })
                            }else {
                                axios.post(`http://products.sold.co.id/update-product-name-price-quantity?Name=${nama}&Sell_Price=${harga}&Stock_Quantity=${qty}&Product_Code=${product_id}&Customer_Code=${token}&Email=${email}&Password=${pass}`)
                                .then((res)=>{
                                    
                                    if(res.data){
                                        Swal.fire({
                                            html:`
                                            <div class="o-circle c-container__circle o-circle__sign--success">
                                                <div class="o-circle__sign"></div>  
                                            </div>   
                                            Berhasil Mengubah Data
                                            `,
                                            timer:2000,
                                            
                                        })
                                        $('#s_product_name').removeClass(product_id)
                                        $('#s_product_name').removeClass('product_name')
                                         $('#id_otp').val('')
                                         $('#id_pass').val('')
                                         re_render_item_product()
                                    }else {
                                        Swal.fire({
                                            html:`
                                            <div class="o-circle c-container__circle o-circle__sign--failure">
                                                <div class="o-circle__sign"></div>  
                                            </div> 
                                            Gagal Mengubah Data`,
                                            timer:2000,
                                            
                                        })
                                        re_render_item_product()
                                    }
                                }).catch((err)=>{
                                    
                                })
                            }
                            // Swal.fire('Simpan Berhasil', '', 'success')
                            $('#get_otp').modal('hide')
                        }else {
                            // Swal.fire('Simpan Gagal', '', 'error')
                            Swal.fire({
                                html:`
                                <div class="o-circle c-container__circle o-circle__sign--failure">
                                    <div class="o-circle__sign"></div>  
                                </div> 
                                Simpan Gagal`,
                                timer:2000,
                                
                            })
                        }
                    }).catch((err)=>{
                        
                    })
                }else {
                    
                    // Swal.fire('Password Minimal 6 character', '', 'error')
                    Swal.fire({
                        html:`
                        <div class="o-circle c-container__circle o-circle__sign--failure">
                            <div class="o-circle__sign"></div>  
                        </div> 
                        Password Minimal 6`,
                        timer:2000,
                        
                    })
                }
                
        
               
            }).catch((err)=>{
                
            })
        }).catch((err)=>{
            
        })

    }else if (jenis_edit === 'product_sell_price'){
        axios.post(`https://customers.sold.co.id/get-customer-information?Customer_Code=${token}`)
        .then((res)=>{
            email = res.data.Email
            var new_pass
            axios.post(`https://customers.sold.co.id/password-generator?Password=${pass}`)
            .then((res)=>{
                new_pass = res.data
                if(res.data){
                    axios.post(`https://customers.sold.co.id/verify-otp?Email=${email}&User_Password=${new_pass}&otp=${otp}`)
                    .then((res)=>{
                        if(res.data){
                            $("#"+product_id+"-harga").prop('disabled',true) 
                            $("#"+product_id+"-box_edit_harga").css('display','block') // icon 
                            $("#"+product_id+"-save_harga").css('display','none') // icon
                            $("#"+product_id+"-harga").css('background-color','transparent')
                    
                            var nama = $("#"+product_id+"-name").val()
                            var harga = $("#"+product_id+"-harga").val()
                            var qty = $("#"+product_id+"-qty").val()
                            var token = localStorage.getItem('token')
                            
                            
                            
                            
                    
                            if(harga <500){
                                axios.post(`https://products.sold.co.id/get-product-details?product_code=${product_id}`)
                                    .then((res)=>{
                                        
                                        $("#"+product_id+"-harga").val(res.data.Sell_Price)
                                        // swal.fire("Gagal Mengubah Data", "", "error");
                                        Swal.fire({
                                            html:`
                                            <div class="o-circle c-container__circle o-circle__sign--failure">
                                                <div class="o-circle__sign"></div>  
                                            </div> 
                                            Gagal Mengubah Data`,
                                            timer:2000,
                                            
                                        })
                                        re_render_item_product()
                                    }).catch((err)=>{
                                        
                                    })
                            }else {
                                axios.post(`https://products.sold.co.id/update-product-name-price-quantity?Name=${nama}&Sell_Price=${harga}&Stock_Quantity=${qty}&Product_Code=${product_id}&Customer_Code=${token}&Email=${email}&Password=${pass}`)
                                .then((res)=>{
                                    
                                    if(res.data){
                                        // swal.fire("Berhasil Mengubah Data", "", "success");
                                        Swal.fire({
                                            html:`
                                            <div class="o-circle c-container__circle o-circle__sign--success">
                                                <div class="o-circle__sign"></div>  
                                            </div>   
                                            Berhasil Mengubah Data
                                            `,
                                            timer:2000,
                                            
                                        })
                                        $('#s_product_name').removeClass(product_id)
                                        $('#s_product_name').removeClass('product_sell_price')
                                        re_render_item_product()
                                    }else {
                                        re_render_item_product()
                                        // swal.fire("Gagal Mengubah Data", "", "error");
                                        Swal.fire({
                                            html:`
                                            <div class="o-circle c-container__circle o-circle__sign--failure">
                                                <div class="o-circle__sign"></div>  
                                            </div> 
                                            Gagal Mengubah Data`,
                                            timer:2000,
                                            
                                        })
                                    }
                                }).catch((err)=>{
                                    
                                })
                                // Swal.fire('Simpan Berhasil', '', 'success')
                                Swal.fire({
                                    html:`
                                    <div class="o-circle c-container__circle o-circle__sign--success">
                                        <div class="o-circle__sign"></div>  
                                    </div>   
                                    Simpan Berhasil
                                    `,
                                    timer:2000,
                                    
                                })
                                $('#get_otp').modal('hide')
                            }
                        }else {
                            // Swal.fire('Simpan Gagal', '', 'error')
                            Swal.fire({
                                html:`
                                <div class="o-circle c-container__circle o-circle__sign--failure">
                                    <div class="o-circle__sign"></div>  
                                </div> 
                                Simpan Gagal`,
                                timer:2000,
                                
                            })
                        }
                    }).catch((err)=>{
                        
                    })

                }else {
                    
                    // Swal.fire('Password Minimal 6 character', '', 'error')
                    Swal.fire({
                        html:`
                        <div class="o-circle c-container__circle o-circle__sign--failure">
                            <div class="o-circle__sign"></div>  
                        </div> 
                        Password Minimal 6 Character`,
                        timer:2000,
                        
                    })
                }

            }).catch((err)=>{
                
            })
        }).catch((err)=>{

        })
    }else if ( jenis_edit === 'product_quantity'){
        axios.post(`https://customers.sold.co.id/get-customer-information?Customer_Code=${token}`)
        .then((res)=>{
            email = res.data.Email     
            var new_pass
            axios.post(`https://customers.sold.co.id/password-generator?Password=${pass}`)
            .then((res)=>{
                if(res.data){
                    new_pass = res.data            
                    axios.post(`https://customers.sold.co.id/verify-otp?Email=${email}&User_Password=${new_pass}&otp=${otp}`)
                    .then((res)=>{
                        if(res.data){
                            $("#"+product_id+"-qty").prop('disabled',true) 
                            $("#"+product_id+"-box_edit_qty").css('display','block') // icon 
                            $("#"+product_id+"-save_qty").css('display','none') // icon
                            $("#"+product_id+"-qty").css('background-color','transparent')
        
                            var nama = $("#"+product_id+"-name").val()
                            var harga = $("#"+product_id+"-harga").val()
                            var qty = $("#"+product_id+"-qty").val()
                            var token = localStorage.getItem('token')
        
                            
                            
                            
                            
        
                            if(qty < 10){
                                axios.post(`https://products.sold.co.id/get-product-details?product_code=${product_id}`)
                                .then((res)=>{
                                    
                                    $("#"+product_id+"-qty").val(res.data.Stock_Quantity)
                                    // swal.fire("Gagal Mengubah Data", "", "error");
                                    Swal.fire({
                                        html:`
                                        <div class="o-circle c-container__circle o-circle__sign--failure">
                                            <div class="o-circle__sign"></div>  
                                        </div> 
                                        Gagal Mengubah Data`,
                                        timer:2000,
                                        
                                    })
                                    re_render_item_product()
                                }).catch((err)=>{
                                    
                                })
                            }else {
                                
                                axios.post(`https://products.sold.co.id/update-product-name-price-quantity?Name=${nama}&Sell_Price=${harga}&Stock_Quantity=${qty}&Product_Code=${product_id}&Customer_Code=${token}&Email=${email}&Password=${pass}`)
                                .then((res)=>{
                                    
                                    if(res.data){
                                        // swal.fire("Berhasil Mengubah Data", "", "success");
                                        Swal.fire({
                                            html:`
                                            <div class="o-circle c-container__circle o-circle__sign--success">
                                                <div class="o-circle__sign"></div>  
                                            </div>   
                                            Berhasil Mengubah Data
                                            `,
                                            timer:2000,
                                            
                                        })
                                        $('#s_product_name').removeClass(product_id)
                                        $('#s_product_name').removeClass('product_quantity')
                                        re_render_item_product()
                                    }else {
                                        // swal.fire("Gagal Mengubah Data", "", "error");
                                        Swal.fire({
                                            html:`
                                            <div class="o-circle c-container__circle o-circle__sign--failure">
                                                <div class="o-circle__sign"></div>  
                                            </div> 
                                            Gagal Mengubah Data`,
                                            timer:2000,
                                            
                                        })
                                        re_render_item_product()
                                    }
                                }).catch((err)=>{
                                    
                                })
                            }
                            // Swal.fire('Simpan Berhasil', '', 'success')
                            $('#get_otp').modal('hide')
                        }else {
                            // Swal.fire('Simpan Gagal', '', 'error')
                            Swal.fire({
                                html:`
                                <div class="o-circle c-container__circle o-circle__sign--failure">
                                    <div class="o-circle__sign"></div>  
                                </div> 
                                Simpan Gagal`,
                                timer:2000,
                                
                            })
                        }
                    }).catch((err)=>{
                        
                    })
                }else {
                    
                    // Swal.fire('Password Minimal 6 character', '', 'error')
                    Swal.fire({
                        html:`
                        <div class="o-circle c-container__circle o-circle__sign--failure">
                            <div class="o-circle__sign"></div>  
                        </div> 
                        Password Minimal 6 Character`,
                        timer:2000,
                        
                    })
                }
            }).catch((err)=>{
                
            })
        }).catch((err)=>{
            
        })
    }else if (jenis_edit === 'product_discount'){
        axios.post(`https://customers.sold.co.id/get-customer-information?Customer_Code=${token}`)
        .then((res)=>{
            email = res.data.Email

            var new_pass
            axios.post(`https://customers.sold.co.id/password-generator?Password=${pass}`)
            .then((res)=>{
                if(res.data){
                    new_pass = res.data
                    
                    axios.post(`https://customers.sold.co.id/verify-otp?Email=${email}&User_Password=${new_pass}&otp=${otp}`)
                    .then((res)=>{
                        if(res.data){
                   

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

                        
                        
                        
                        
                        
                        
                        
                        
                        axios.post(`https://products.sold.co.id/update-product-groupbuy-status-price-quantity?GroupBuy_Purchase=${status}&GroupBuy_SellPrice=${price}&GroupBuy_SellQuantity=${qty}&Product_Code=${Product_Code}&Customer_Code=${token}&Email=${email}&Password=${pass}`)
                        .then((res)=>{
                            
                            if(res.data){
                                $('#get_otp').modal('hide')
                                $("#"+product_id+"-discount").prop('disabled',true) 
                                $("#"+product_id+"-box_edit_discount").css('display','block') // icon 
                                $("#"+product_id+"-save_discount").css('display','none') // icon
                                $("#"+product_id+"-discount").css('background-color','transparent')
                                $('#s_product_name').removeClass(product_id)
                                $('#s_product_name').removeClass('product_discount')
                                // swal.fire("Berhasil Mengubah Data", "", "success");
                                Swal.fire({
                                    html:`
                                    <div class="o-circle c-container__circle o-circle__sign--success">
                                        <div class="o-circle__sign"></div>  
                                    </div>   
                                    Berhasil Mengubah Data
                                    `,
                                    timer:2000,
                                    
                                })
                                // Swal.fire('Simpan Berhasil', '', 'success')
                                
                            }else {
                                // swal.fire("Gagal Mengubah Data", "", "error")    
                                Swal.fire({
                                    html:`
                                    <div class="o-circle c-container__circle o-circle__sign--failure">
                                        <div class="o-circle__sign"></div>  
                                    </div> 
                                    Gagal Mengubah Data`,
                                    timer:2000,
                                    
                                })
                                axios.post(`https://products.sold.co.id/get-products-belong-to-the-supplier?Creator=${token}`)
                                .then((res)=>{
                                    
                                    $("#"+product_id+"-discount").val(res.data.GroupBuy_SellPrice)
                                }).catch((err)=>{
                                    
                                })
                            }
                        }).catch((err)=>{
                            
                        })
                        }else {
                            // Swal.fire('Simpan Gagal', '', 'error')
                            Swal.fire({
                                html:`
                                <div class="o-circle c-container__circle o-circle__sign--failure">
                                    <div class="o-circle__sign"></div>  
                                </div> 
                                Simpan Gagal`,
                                timer:2000,
                                
                            })
                        }
                    }).catch((err)=>{
                        
                    })

                }else {
                    
                    // Swal.fire('Password Minimal 6 character', '', 'error')
                    Swal.fire({
                        html:`
                        <div class="o-circle c-container__circle o-circle__sign--failure">
                            <div class="o-circle__sign"></div>  
                        </div> 
                        Password Minimal 6 Character`,
                        timer:2000,
                        
                    })
                }
            }).catch((err)=>{
                
            })
        }).catch((err)=>{
            
        })
    }else if (jenis_edit === 'groupbuy_qty'){
        
        axios.post(`https://customers.sold.co.id/get-customer-information?Customer_Code=${token}`)
        .then((res)=>{
            email = res.data.Email

            var new_pass
            axios.post(`https://customers.sold.co.id/password-generator?Password=${pass}`)
            .then((res)=>{
                if(res.data){
                    new_pass =res.data

                    axios.post(`https://customers.sold.co.id/verify-otp?Email=${email}&User_Password=${new_pass}&otp=${otp}`)
                    .then((res)=>{
                        if(res.data){

 

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
                        
                        
                        
                        
                        axios.post(`https://products.sold.co.id/update-product-groupbuy-status-price-quantity?GroupBuy_Purchase=${status}&GroupBuy_SellPrice=${price}&GroupBuy_SellQuantity=${qty}&Product_Code=${Product_Code}&Customer_Code=${token}&Email=${email}&Password=${pass}`)
                        .then((res)=>{
                            
                            if(res.data){
                                // swal.fire("Berhasil Mengubah Data", "", "success");
                                Swal.fire({
                                    html:`
                                    <div class="o-circle c-container__circle o-circle__sign--success">
                                        <div class="o-circle__sign"></div>  
                                    </div>   
                                    Berhasil Mengubah Data
                                    `,
                                    timer:2000,
                                    
                                })
                                $('#s_product_name').removeClass(product_id)
                                $('#s_product_name').removeClass('groupbuy_qty')
                                $('#get_otp').modal('hide')
                                $("#"+product_id+"-quantity").prop('disabled',true) 
                                $("#"+product_id+"-box_edit_quantity").css('display','block') // icon 
                                $("#"+product_id+"-save_quantity").css('display','none') // icon
                                $("#"+product_id+"-quantity").css('background-color','transparent')
                            }else {
                                // swal.fire("Gagal Mengubah Data", "", "error");
                                Swal.fire({
                                    html:`
                                    <div class="o-circle c-container__circle o-circle__sign--failure">
                                        <div class="o-circle__sign"></div>  
                                    </div> 
                                    Gagal Mengubah Data`,
                                    timer:2000,
                                    
                                })
                                $("#"+product_id+"-quantity").prop('disabled',true) 
                                $("#"+product_id+"-box_edit_quantity").css('display','block') // icon 
                                $("#"+product_id+"-save_quantity").css('display','none') // icon
                                $("#"+product_id+"-quantity").css('background-color','transparent')
                                axios.post(`https://products.sold.co.id/get-product-details?product_code=${product_id}`)
                                .then((res)=>{
                                    $("#"+product_id+"-quantity").val(res.data.GroupBuy_SellQuantity)
                                }).catch((err)=>{
                                    
                                })
                            }
                        }).catch((err)=>{
                            
                        })
                        }else {
                            // Swal.fire('Simpan Gagal', '', 'error')
                            Swal.fire({
                                html:`
                                <div class="o-circle c-container__circle o-circle__sign--failure">
                                    <div class="o-circle__sign"></div>  
                                </div> 
                                Simpan Gagal`,
                                timer:2000,
                                
                            })
                        }
                    }).catch((err)=>{
                        
                    })
                }else {
                    
                    // Swal.fire('Password Minimal 6 character', '', 'error')
                    Swal.fire({
                        html:`
                        <div class="o-circle c-container__circle o-circle__sign--failure">
                            <div class="o-circle__sign"></div>  
                        </div> 
                        Password Minimal 6 Character`,
                        timer:2000,
                        
                    })
                }
            }).catch((err)=>{
                
            })

        }).catch((err)=>{
            
        })
    }else if (jenis_edit === 'status_gb'){
        get_status(product_id,pass)
        $('#s_product_name').removeClass(product_id)
        $('#s_product_name').removeClass('status_gb')
    }
    else {
        
    }
    


}



const about_dirjen=()=>{
    Swal.fire({
        title: `   
         <div class="box-dirjen-2">
            <p>DIREKTORAT JENDERAL PERLINDUNGAN KONSUMEN DAN TERTIB NIAGA  <br> KEMENTERIAN PERDAGANGAN REPUBLIK INDONESIA</p>
            <div class="dirjen-alamat">
                <p>Alamat : </p>
                <p>Gedung 1 Lantai 3 <br> Jalan M.I.Riwdwan Rais No.5 <br> Jakpus 10110</p>
            </div>
            <div class="dirjen-alamat">
                <p>Telepon :</p>
                <p> +62-21-3858171, <br>+62-21-3451692</p>
            </div>
            <div class="dirjen-alamat">
                <p>Faksimili :</p>
                <p> +62-21-3858205, <br>+62-21-3842531</p>
            </div>
            <div class="dirjen-alamat">
                <p>Email :</p>
                <a href="mailto:contact.us@kemendag.go.id" target="_blank">contact.us@kemendag.go.id</a>
                <!-- <p>contact.us@kemendag.go.id</p> -->
            </div>
        
        </div>
        `,
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      })
}


const copy_link_share=()=>{
    // alert('function jalan')
    var copyText = document.getElementById("copyClipboard");
    if(copyText){
        
        copyText.select();
        copyText.setSelectionRange(0, 99999);
        document.execCommand("Copy");
        // Swal.fire('Copy berhasil', '', 'success')
        Swal.fire({
            html:`
            <div class="o-circle c-container__circle o-circle__sign--success">
                <div class="o-circle__sign"></div>  
            </div>   
            Copy Berhasil
            `,
            timer:2000,
            
        })
    }
    
}

const gorillaworkout=(name)=>{
    
    var copyText = document.getElementById("copyClipboardul");
    // var copyText = 'Gorilla Workout'
    
    var text = $('.easteregg').val()
    
    if(copyText){
        
        copyText.select();
        
        // copyText.setSelectionRange(0, 99999);
        document.execCommand("Copy");
        // Swal.fire('Copy berhasil', '', 'success')
    }

}


const nonActiveSkeleton=()=>{
    // alert('jalan')
    $('.box-render-promo-animated').css('display','none')
    $('.box-render-promo').css('display','flex')
    $('.box-render-new').css('display','flex')
    $('.box-render-all').css('display','flex')
}



const check_input_form_supp=()=>{
    // var customer_code = localStorage.getItem('token')
    var first_name = $("#nama_depan_supp").val()
    var last_name = $("#nama_belakang_supp").val()
    var password= $('#password_supp').val()
    var email = $('#email_supp').val()
    var number_1 = $('#telp_gudang_supp').val()
    var account_number = $('#no_rek_perusahaan_supp').val()
    // var referral_code = $('#inp_ref_code').val()
    
    // var isCustomer_code = false
    var isFirst_Name = false
    var isLast_Name=false
    var isPassword = false
    var isEmail = false
    var isNumber_1 = false
    var isAccount_number = false
    // var isReferral_code = false

    if(first_name != undefined && first_name.length >=3 ){
        isFirst_Name = true
    }else {
        isFirst_Name = false
        // swal.fire("Nama Minimal 3 Huruf", "", "error");
        Swal.fire({
            html:`
            <div class="o-circle c-container__circle o-circle__sign--failure">
                <div class="o-circle__sign"></div>  
            </div> 
            Nama Minimal 3 Huruf`,
            timer:2000,
            
        })
    }
    
    if(last_name != undefined && last_name.length >=3 ){
        isLast_Name = true
    }else {
        isLast_Name = false
        // swal.fire("Nama Minimal 3 Huruf", "", "error");
        Swal.fire({
            html:`
            <div class="o-circle c-container__circle o-circle__sign--failure">
                <div class="o-circle__sign"></div>  
            </div> 
            Nama Minimal 3 Huruf`,
            timer:2000,
            
        })
    }
    
    if(password != undefined && password.length >=4 ){
        isPassword = true
    }else {
        isPassword = false
        // swal.fire("Password Salah", "", "error");
        Swal.fire({
            html:`
            <div class="o-circle c-container__circle o-circle__sign--failure">
                <div class="o-circle__sign"></div>  
            </div> 
            Password Salah`,
            timer:2000,
            
        })
    }
    
    if(email != undefined && email.length !=0 ){
        isEmail = true
    }else {
        isEmail = false
        // swal.fire("Email Salah", "", "error");
        Swal.fire({
            html:`
            <div class="o-circle c-container__circle o-circle__sign--failure">
                <div class="o-circle__sign"></div>  
            </div> 
            Email Salah`,
            timer:2000,
            
        })
    }
    
    
    if(number_1 != undefined && number_1.length  !=0 ){
        isNumber_1 = true
    }else {
        isNumber_1 = false
        // swal.fire("Nomor Telepon Harus Di Isi", "", "error");
        Swal.fire({
            html:`
            <div class="o-circle c-container__circle o-circle__sign--failure">
                <div class="o-circle__sign"></div>  
            </div> 
            Nomor Telepon Harus Di Isi`,
            timer:2000,
            
        })
    }
    
    if(account_number != undefined && account_number.length  !=0 ){
        isAccount_number = true
    }else {
        isAccount_number = false
        // swal.fire("Nomor Rekening Harus Di Isi", "", "error");/
        Swal.fire({
            html:`
            <div class="o-circle c-container__circle o-circle__sign--failure">
                <div class="o-circle__sign"></div>  
            </div> 
            Nomor Rekening Harus Di Isi`,
            timer:2000,
            
        })
    }
    

    
    
    if(isFirst_Name == true 
        && isLast_Name == true && isPassword == true && isEmail == true && isNumber_1 == true
        && isAccount_number == true ){
            // alert('bisa register')
            return true 
        }else {
            // alert('ada data yg kosong')
            return false
        }
    
}




const check_input_form=()=>{
// var customer_code = localStorage.getItem('token')
var first_name = $("#nama_depan_reg").val()
var last_name = $("#nama_belakang_reg").val()
var password= $('#password_reg').val()
var email = $('#email_reg').val()
var number_1 = $('#no_telp_reg').val()
var account_number = $('#no_rekening_reg').val()
var referral_code = $('#inp_ref_code').val()

// var isCustomer_code = false
var isFirst_Name = false
var isLast_Name=false
var isPassword = false
var isEmail = false
var isNumber_1 = false
var isAccount_number = false
var isReferral_code = false



if(first_name != undefined && first_name.length >=3 ){
    isFirst_Name = true
}else {
    isFirst_Name = false
    // swal.fire("Nama Minimal 3 Huruf", "", "error");
    Swal.fire({
        html:`
        <div class="o-circle c-container__circle o-circle__sign--failure">
            <div class="o-circle__sign"></div>  
        </div> 
        Nama Minimal 3 Huruf`,
        timer:2000,
        
    })
}

if(last_name != undefined && last_name.length >=3 ){
    isLast_Name = true
}else {
    isLast_Name = false
    // swal.fire("Nama Minimal 3 Huruf", "", "error");
    Swal.fire({
        html:`
        <div class="o-circle c-container__circle o-circle__sign--failure">
            <div class="o-circle__sign"></div>  
        </div> 
        Nama Minimal 3 Huruf`,
        timer:2000,
        
    })
}

if(password != undefined && password.length >=4 ){
    isPassword = true
}else {
    isPassword = false
    // swal.fire("Password Salah", "", "error");
    Swal.fire({
        html:`
        <div class="o-circle c-container__circle o-circle__sign--failure">
            <div class="o-circle__sign"></div>  
        </div> 
        Password Salah`,
        timer:2000,
        
    })
}

if(email != undefined && email.length !=0 ){
    isEmail = true
}else {
    isEmail = false
    // swal.fire("Email Salah", "", "error");
    Swal.fire({
        html:`
        <div class="o-circle c-container__circle o-circle__sign--failure">
            <div class="o-circle__sign"></div>  
        </div> 
        Password Salah`,
        timer:2000,
        
    })
}


if(number_1 != undefined && number_1.length  !=0 ){
    isNumber_1 = true
}else {
    isNumber_1 = false
    // swal.fire("Nomor Telepon Harus Di Isi", "", "error");
    Swal.fire({
        html:`
        <div class="o-circle c-container__circle o-circle__sign--failure">
            <div class="o-circle__sign"></div>  
        </div> 
        Nomor Telepon Harus Di Isi`,
        timer:2000,
        
    })
}

if(account_number != undefined && account_number.length  !=0 ){
    isAccount_number = true
}else {
    isAccount_number = false
    // swal.fire("Nomor Rekening Harus Di Isi", "", "error");
    Swal.fire({
        html:`
        <div class="o-circle c-container__circle o-circle__sign--failure">
            <div class="o-circle__sign"></div>  
        </div> 
        Nomor Rekening Harus Di Isi`,
        timer:2000,
        
    })
}

if(referral_code != undefined && referral_code.length  !=0 ){
    isReferral_code = true
}else {
    isReferral_code = false
    // swal.fire("Referral Code Harus Di Isi", "", "error");
    Swal.fire({
        html:`
        <div class="o-circle c-container__circle o-circle__sign--failure">
            <div class="o-circle__sign"></div>  
        </div> 
        Referral Code Harus Di Isi`,
        timer:2000,
        
    })
}



if( isFirst_Name == true 
    && isLast_Name == true && isPassword == true && isEmail == true && isNumber_1 == true
    && isAccount_number == true && isReferral_code == true){
        // alert('bisa register')
        return true 
    }else {
        // alert('ada data yg kosong')
        return false
    }

}


function to_detail_product(id){
    
    $('#detailProductModal').modal('show')
    $('.modals_detail_product').empty()
    axios.post(`https://products.sold.co.id/get-product-details?product_code=${id}`)
    .then((res)=>{
        
            $('.modals_detail_product').append(`
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
        
    })
}




const check_status_item=()=>{
    // alert('function check status jalan')
    $('#productModal').modal('show')
    var token = localStorage.getItem('token')
    var creator;
    axios.post(`https://customers.sold.co.id/get-customer-information?Customer_Code=${token}`)
    .then((res)=>{
        
        
        var Customer_Code = res.data.Customer_Code
        creator = res.data.Creator

        // FIND DATA BY CREATOR
        axios.post(`https://products.sold.co.id/get-products-belong-to-the-supplier?Creator=${Customer_Code}`)
        .then((res)=>{
            
            res.data.map((val,index)=>{
                
                
                $('.input_total_row_gb').val('TOTAL ROW = ' + res.data.length)
                
               
                
                if(val.GroupBuy_Purchase === 'true'){
                    if(val.GroupBuy_SellPrice === 'NULL'  && val.GroupBuy_SellQuantity === 'NULL'){
                        $('.tbody_detail_product').append(`
                             <tr class="tr_detail_prod">
                                 <td>
                                     <div class="box-switch">
                                         <input type="checkbox" class="detail_prod_input" checked data-toggle="toggle" id="${val.Product_Code}-status" onclick="change_status_otp('${val.Product_Code}')">
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
                                         <input type="checkbox" class="detail_prod_input" checked data-toggle="toggle" id="${val.Product_Code}-status" onclick="change_status_otp('${val.Product_Code}')">
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
                                         <input type="checkbox" class="detail_prod_input" checked data-toggle="toggle" id="${val.Product_Code}-status" onclick="change_status_otp('${val.Product_Code}')">
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
                                         <input type="checkbox" class="detail_prod_input"  data-toggle="toggle" id="${val.Product_Code}-status" onclick="change_status_otp('${val.Product_Code}')">
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
                                         <input type="checkbox" class="detail_prod_input"  data-toggle="toggle" id="${val.Product_Code}-status" onclick="change_status_otp('${val.Product_Code}')">
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
                                    <input type="checkbox" class="detail_prod_input"  data-toggle="toggle" id="${val.Product_Code}-status" onclick="change_status_otp('${val.Product_Code}')">
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
            
        })
    }).catch((err)=>{
        
    })
}

const re_render_item_product=()=>{
    
    
    var token = localStorage.getItem('token')
    $('.tbody_product').empty()
    var creator;
    axios.post(`https://customers.sold.co.id/get-customer-information?Customer_Code=${token}`)
    .then((res)=>{
        
        
        var Customer_Code = res.data.Customer_Code
        creator = res.data.Creator

        // FIND DATA BY CREATOR
        axios.post(`https://products.sold.co.id/get-products-belong-to-the-supplier?Creator=${Customer_Code}`)
        .then((res)=>{
            
            res.data.map((val,index)=>{


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
            
        })
    }).catch((err)=>{
        
    })
    
}

const edit_product_quantity=(product_id)=>{
    $("#"+product_id+"-quantity").prop('disabled',false) 
    $("#"+product_id+"-quantity").css('background-color','#ddd')


    $("#"+product_id+"-box_edit_quantity").css('display','none') // icon 
    $("#"+product_id+"-save_quantity").css('display','block') // icon
}

const get_status=(product_id,pass)=>{
    // alert(item_status)
    var password = pass
    var Product_Code = $("#"+product_id+"-pCode").val()
    var Name = $("#"+product_id+"-pName").val()
    var qty = $("#"+product_id+"-quantity").val()
    var price = $("#"+product_id+"-discount").val()
    var token = localStorage.getItem('token')
    var email;
    var result;

            axios.post(`https://customers.sold.co.id/get-customer-information?Customer_Code=${token}`)
            .then((res)=>{
                email = res.data.Email
                axios.post(`https://products.sold.co.id/update-product-groupbuy-status-price-quantity?GroupBuy_Purchase=${result}&GroupBuy_SellPrice=${price}&GroupBuy_SellQuantity=${qty}&Product_Code=${Product_Code}&Customer_Code=${token}&Email=${email}&Password=${password}`)
                .then((res)=>{
                    
                    
                    if(res.data){
                        // swal.fire("Berhasil Mengubah Data", "", "success");
                        Swal.fire({
                            html:`
                            <div class="o-circle c-container__circle o-circle__sign--success">
                                <div class="o-circle__sign"></div>  
                            </div>   
                            Berhasil Mengubah Data
                            `,
                            timer:2000,
                            
                        })
                        $('#get_otp').modal('hide')
                    }else {
                        // swal.fire("Gagal Mengubah Data", "", "error");
                        Swal.fire({
                            html:`
                            <div class="o-circle c-container__circle o-circle__sign--failure">
                                <div class="o-circle__sign"></div>  
                            </div> 
                            Gagal Mengubah Data`,
                            timer:2000,
                            
                        })
                        $('#get_otp').modal('hide')
                        
                    axios.post(`https://products.sold.co.id/get-product-details?product_code=${product_id}`)
                    .then((res)=>{
                        
                        
                        // $("#"+product_id+"-discount").val(res.data.GroupBuy_SellPrice)
                        if(res.data.GroupBuy_Purchase == 'true'){
                            $('#'+product_id+"-status").prop('checked',true)
                        }else {
                            $('#'+product_id+"-status").prop('checked',false)
                            
                        }
                    }).catch((err)=>{
                        
                    })
                }
    
                }).catch((err)=>{
    
                })
            }).catch((err)=>{
                
            })
            
            if($('#'+product_id+"-status").is(':checked')){
                result = true
            }else {
                result = false
            }
            
 }

const save_edit_quantity=(product_id)=>{

    $('#get_otp').modal('show')
    $('#s_product_name').addClass(product_id)
    $('#s_product_name').addClass('groupbuy_qty')



    clearOTPform()
}


async function check_qty(val){



    var alamat_pilihan = $('.active_address_method').attr('data-value')
    var kurir_pilihan=$('.kurir-home-gb option:selected').val()
    var province_pilihan=$('.province-home-gb option:selected').val()
    var kota_pilihan=$('.kota-home-gb option:selected').val()
    var kecamatan_pilihan=$('.kecamatan-home-gb option:selected').val()
    var kelurahan_pilihan=$('.kelurahan-home-gb option:selected').val()
    var pengiriman_pilihan=$('.pengiriman-home-gb option:selected').val()
    var total_qty_from_user = parseInt($('.qty_groupbuy_home').val())
    var new_kurir_pilihan = $('.active_delivery_method').attr('data-value')
    var product_id = $('.qty_groupbuy_home').attr('id')
    var alamat_company = ''
    var split_pengiriman = pengiriman_pilihan.split('-')
    var days_pengiriman = split_pengiriman[0]
    var kode_pengiriman = split_pengiriman[1]
    var isKurir_pilihan = false
    var isProvince_pilihan = false
    var isKota_pilihan = false
    var isKecamatan_pilihan = false
    var isKelurahan_pilihan = false
    var isQty_pilihan = false
    var isPengiriman_pilihan = false

    var province_company = ''
    var city_company = ''
    var district_company = ''
    var courier_price_code_company = ''

    if(alamat_pilihan == 'Alamat Terdaftar'){
        $('.alert-danger').css('display','none')
        var alamat_terdafar = $(`.option-alamat-gb option:selected`).val()
        var testing_alamat = 'Jalanin Dulu aja  DKI Jakarta  Kota Jakarta Barat  Kebon Jeruk  Kelapa Dua'
        var split_alamat = testing_alamat.split('  ')
        var nama_jalan = split_alamat[0]
            province_pilihan = split_alamat[1]
            kota_pilihan = split_alamat[2]
            kecamatan_pilihan = split_alamat[3]
            kelurahan_pilihan = split_alamat[4]
            kurir_pilihan = 'tiki'
            kurir_kode = 'tiki'
        var allKelurahan = []
        isKurir_pilihan = true
        isProvince_pilihan = true
        isKota_pilihan = true
        isKecamatan_pilihan = true
        isKelurahan_pilihan = true
        if(total_qty_from_user == undefined || total_qty_from_user == 'undefined' || total_qty_from_user == null || total_qty_from_user.length == 0){
            isQty_pilihan = false
        }else {
            isQty_pilihan = true
        }
        if(pengiriman_pilihan == undefined || pengiriman_pilihan == 'undefined' || pengiriman_pilihan == null || pengiriman_pilihan.length == 0){
            isPengiriman_pilihan = false
        }else {
            isPengiriman_pilihan = true
        }
        if(isKurir_pilihan && isKota_pilihan  && isPengiriman_pilihan&& isProvince_pilihan && isKelurahan_pilihan && isKecamatan_pilihan && isQty_pilihan) {
            var product_id = $('.qty_groupbuy_home').attr('id')
            
            var total_qty_from_api;
            var harga_satuan;
    
            get_product_detail_func(product_id).done(function(response){
                var item_product = response
                console.log(item_product)
                get_all_couriers().done(function(response){
                    var dataAllKurir = response
                    var kurir_kode =''
                    for(var i=0; i<dataAllKurir.length; i++){
                        if(dataAllKurir[i].Courier == new_kurir_pilihan){
                            kurir_kode = dataAllKurir[i].Courier_Code
                        }
                    }
                    
                    get_all_subdistrict_from_courier(new_kurir_pilihan,kurir_kode,kelurahan_pilihan).done(function(response){
                        
                        var allKelurahan = response
                      
                        var Courier_Price_Code_orig = 'CGK01.00'
                        var packing_type = ''
                        var berat_product = parseInt(item_product.Weight_KG)
                        var item_dimension = item_product.Dimension_CM_CUBIC
                        var split_item_dimension = item_dimension.split('*')
                        var item_length = split_item_dimension[0]
                        var item_width = split_item_dimension[1]
                        var item_height = split_item_dimension[2]
                        var paket_value = ''
                        var allPengiriman = []
                        if(item_length != undefined && item_length != null && item_length != "undefined"){
                            
                        }else {
                            item_length = 1
                        }
                        if(item_width != undefined && item_width != null && item_width != "undefined"){
                            
                        }else {
                            item_width = 1
                        }
                        if(item_height != undefined && item_height != null && item_height != "undefined"){
                            
                        }else {
                            item_height = 1
                        }
                        if(berat_product <= 0 || berat_product == null || berat_product == undefined || Number.isNaN(berat_product)){
                            berat_product = 0.1*1.5;
                        }else{
                            berat_product = berat_product*1*1.5;
                        }
                        var total_berat_product = Math.ceil(berat_product * total_qty_from_user)
                        var paket_value = '' 
                        new_get_shipping_fee(Courier_Price_Code_orig , allKelurahan[0].Courier_Price_Code, packing_type, berat_product, item_length, item_width, item_height, paket_value).done(function(response){
                            var data_shipping_fee = response
                            var asuransi_pilihan = $('.asuransi-home-gb option:selected').val()
                            var packing_pilihan = $('.packing-home-gb option:selected').val()
                            var harga_shipping = parseInt($('.pengiriman-home-gb option:selected').attr('class'))
                            var harga_asuransi = parseInt($('.asuransi-home-gb option:selected').attr('class'))
                            var harga_packing = parseInt($('.packing-home-gb option:selected').attr('class'))
                            
                            
                            
                            
                            var isAsuransi_pilihan = false
                            var isPacking_pilihan = false
                            var isPengiriman_pilihan = false
                            
    
                            if(asuransi_pilihan == 'Asuransi' || asuransi_pilihan == null || asuransi_pilihan == undefined){
                                isAsuransi_pilihan = false
                            }else {
                                isAsuransi_pilihan = true
                            }
                            if(packing_pilihan == 'Packing' || packing_pilihan == null || packing_pilihan == undefined){
                                isPacking_pilihan = false
                            }else {
                                isPacking_pilihan = true
                            }
                            if(pengiriman_pilihan == 'Pengiriman' || pengiriman_pilihan == null || pengiriman_pilihan == undefined){
                                isPengiriman_pilihan = false
                            }else {
                                isPengiriman_pilihan = true
                            }
    
                            if(isAsuransi_pilihan && isPacking_pilihan && isPengirimanPilihan){
                                $('.ndps-left').empty()
                                $('.ndps-right').empty()
    
                                $('#total_biaya_pengiriman_gb').val('100.000')
                                $('.ndps-left').append(`
                                <div class="detail-ndps-left">
                                    <p class="limited-text-short"> testing <br>
                                       testing
                                    </p>
                                </div>
                                <div class="detail-ndps-left">
                                    Shipping Fee
                                </div>
                                <div class="detail-ndps-left">
                                    Total Amount
                                </div>
                             `)
                            $('.ndps-right').append(`
                                <div class="detail-ndps-right harga_total_product_qty" id="${harga_total_product}" value="${harga_total_product}">
                                    Rp ${harga_total_product}
                                </div>
                                <div class="detail-ndps-right harga_shipping_qty" id="${harga_shipping}" value="${harga_shipping}">
                                    Rp ${harga_shipping}
                                </div>
                                <div class="detail-ndps-right harga_total_prod_with_shipping_qty"id="${harga_total_product_with_shipping}" id="harga_total_prod_with_shipping_qty" value="${harga_total_product_with_shipping}">
                                    Rp ${harga_total_product_with_shipping}
                                </div>
                            `)
                            }else if (isPengiriman_pilihan && isAsuransi_pilihan) {
                                var harga_total_product = item_product.GroupBuy_SellPrice * total_qty_from_user
                                var harga_total_product_with_shipping = harga_total_product + harga_shipping + harga_asuransi
    
                                 
                                $('.ndps-left').empty()
                                $('.ndps-right').empty()
    
                                $('#total_biaya_pengiriman_gb').val(harga_shipping)
                                $('.ndps-left').append(`
                                <div class="detail-ndps-left">
                                    <p class="limited-text-short"> ${item_product.Name} <br>
                                            ${total_qty_from_user} x Rp ${item_product.GroupBuy_SellPrice}
                                    </p>
                                </div>
                                <div class="detail-ndps-left">
                                    Shipping Fee
                                </div>
                                <div class="detail-ndps-left">
                                    Insurance
                                </div>
                                <div class="detail-ndps-left">
                                    Total Amount
                                </div>
                             `)
                            $('.ndps-right').append(`
                                <div class="detail-ndps-right harga_total_product_qty" id="${harga_total_product}" value="${harga_total_product}">
                                    Rp ${harga_total_product}
                                </div>
                                <div class="detail-ndps-right harga_shipping_qty" id="${harga_shipping}" value="${harga_shipping}">
                                    Rp ${harga_shipping}
                                </div>
                                <div class="detail-ndps-right">
                                    Rp ${harga_asuransi}
                                </div>
                                <div class="detail-ndps-right harga_total_prod_with_shipping_qty"id="${harga_total_product_with_shipping}"  value="${harga_total_product_with_shipping}">
                                    Rp ${harga_total_product_with_shipping}
                                </div>
                               
                            `)
                            }else if (isPengiriman_pilihan && isPacking_pilihan){

                                var harga_total_product = item_product.GroupBuy_SellPrice * total_qty_from_user
                                var harga_total_product_with_shipping = harga_total_product + harga_shipping + harga_packing
    
                                 
                                $('.ndps-left').empty()
                                $('.ndps-right').empty()
    
                                $('#total_biaya_pengiriman_gb').val(harga_shipping)
                                $('.ndps-left').append(`
                                <div class="detail-ndps-left">
                                    <p class="limited-text-short"> ${item_product.Name} <br>
                                            ${total_qty_from_user} x Rp ${item_product.GroupBuy_SellPrice}
                                    </p>
                                </div>
                                <div class="detail-ndps-left">
                                    Shipping Fee
                                </div>
                                <div class="detail-ndps-left">
                                    Packing
                                </div>
                                <div class="detail-ndps-left">
                                    Total Amount
                                </div>
                             `)
                            $('.ndps-right').append(`
                                <div class="detail-ndps-right harga_total_product_qty harga_total_product"  id="${harga_total_product}"value="${harga_total_product}">
                                    Rp ${harga_total_product}
                                </div>
                                <div class="detail-ndps-right harga_shipping_qty" id="${harga_shipping}" value="${harga_shipping}">
                                    Rp ${harga_shipping}
                                </div>
                                <div class="detail-ndps-right">
                                    Rp ${harga_packing}
                                </div>
                                <div class="detail-ndps-right harga_total_prod_with_shipping_qty" id="${harga_total_product_with_shipping}" id="harga_total_prod_with_shipping_qty" value="${harga_total_product_with_shipping}">
                                    Rp ${harga_total_product_with_shipping}
                                </div>
                              
                            `)
                            }else if(isPengiriman_pilihan){

                                var harga_total_product = item_product.GroupBuy_SellPrice * total_qty_from_user
                                var harga_total_product_with_shipping = harga_total_product + harga_shipping
    
                                 
                                $('.ndps-left').empty()
                                $('.ndps-right').empty()
    
                                $('#total_biaya_pengiriman_gb').val(harga_shipping)
                                $('.ndps-left').append(`
                                <div class="detail-ndps-left">
                                    <p class="limited-text-short"> ${item_product.Name} <br>
                                            ${total_qty_from_user} x Rp ${item_product.GroupBuy_SellPrice}
                                    </p>
                                </div>
                                <div class="detail-ndps-left">
                                    Shipping Fee
                                </div>
                                <div class="detail-ndps-left">
                                    Total Amount
                                </div>
                             `)
                            $('.ndps-right').append(`
                                <div class="detail-ndps-right harga_total_product_qty" id="${harga_total_product}" value="${harga_total_product}">
                                    Rp ${harga_total_product}
                                </div>
                                <div class="detail-ndps-right harga_shipping_qty" id="${harga_shipping}" value="${harga_shipping}">
                                    Rp ${harga_shipping}
                                </div>
                                <div class="detail-ndps-right harga_total_prod_with_shipping_qty" id="${harga_total_product_with_shipping}" id="harga_total_prod_with_shipping_qty" value="${harga_total_product_with_shipping}">
                                    Rp ${harga_total_product_with_shipping}
                                </div>
                            `)
                            }else {
                                
    
                            }
    
    
                        })
                    })
    
                })
    
            })
        }else{
            var total_qty_from_user = val
            
            var product_id = $('.qty_groupbuy_home').attr('id')
            
            var total_qty_from_api;
            var harga_satuan;
            axios.post(`https://products.sold.co.id/get-product-details?product_code=${product_id}`)
            .then((res)=>{
                
                total_qty_from_api = parseInt(res.data.GroupBuy_SellQuantity)
                harga_satuan = res.data.GroupBuy_SellPrice
                var total_harga = harga_satuan * total_qty_from_user
                if(total_qty_from_api > total_qty_from_user) {
                    // $('#tp_sp').val(total_harga)
                    // $('#tp_iframe').val(total_harga)
                    $('.ndps-left').empty()
                    $('.ndps-right').empty()
                    
                    get_product_detail_func(product_id).done(function(response){
                        $('.ndps-left').append(`
                        <div class="detail-ndps-left">
                            <p class="limited-text-short"> ${response.Name} <br>
                                ${total_qty_from_user} x Rp ${response.GroupBuy_SellPrice}
                            </p>
                        </div>
                        <div class="detail-ndps-left">
                            Shipping Fee
                        </div>
                        <div class="detail-ndps-left">
                            Total Amount
                        </div>
                        `)
                        $('.ndps-right').append(`
                            <div class="detail-ndps-right">
                            Rp ${total_harga}
                            </div>
                            <div class="detail-ndps-right">
                                
                            </div>
                            <div class="detail-ndps-right"id="tp_iframe">
                                
                            </div>
                        `)
                    })
              }else {
                  $('.ndps-left').empty()
                  $('.ndps-right').empty()
                
              
                Swal.fire({
                    html:`
                    <div class="o-circle c-container__circle o-circle__sign--failure">
                        <div class="o-circle__sign"></div>  
                    </div> 
                    Quantity Yang Tersisa Hanya : ${total_qty_from_api}!`,
                    timer:2000,
                    
                })
                    var total_price = harga_satuan * total_qty_from_api
                    $('.qty_groupbuy_home').val(total_price)
                    // alert(total_qty_from_api)
                    // $('#tp_sp').val(total_harga)
                    // $('#tp_iframe').val(total_price)
                    get_product_detail_func(product_id).done(function(response){
                        $('.ndps-left').append(`
                        <div class="detail-ndps-left">
                            <p class="limited-text-short"> ${response.Name} <br>
                               Rp ${total_qty_from_api} x Rp ${response.GroupBuy_SellPrice}
                            </p>
                           
                            </div>
                            <div class="detail-ndps-left">
                                Shipping Fee
                            </div>
                            <div class="detail-ndps-left">
                                Total Amount
                            </div>
                        `)
                        $('.ndps-right').append(`
                            <div class="detail-ndps-right">
                                ${total_price}
                            </div>
                            <div class="detail-ndps-right">
                                
                            </div>
                            <div class="detail-ndps-right"id="tp_iframe">
                                
                            </div>
                        `)
                    })
              }
        
            }).catch((err)=>{
                
            })
    
         }
        
    }else {
            if(kecamatan_pilihan == undefined || kecamatan_pilihan == null || kecamatan_pilihan == 'NULL' || kecamatan_pilihan == 'undefined'){
                
                 kecamatan_pilihan = ''
                 isKecamatan_pilihan = false
             }   else {
                isKecamatan_pilihan = true
             }
             if( kelurahan_pilihan == undefined || kelurahan_pilihan == null || kelurahan_pilihan == 'NULL' || kelurahan_pilihan == 'undefined'){
                 
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
             if(pengiriman_pilihan == undefined || pengiriman_pilihan == 'undefined' || pengiriman_pilihan == null || pengiriman_pilihan.length == 0){
                isPengiriman_pilihan = false
            }else {
                isPengiriman_pilihan = true
            }
         
            
             if(isKurir_pilihan && isKota_pilihan && isProvince_pilihan && isKelurahan_pilihan && isKecamatan_pilihan && isQty_pilihan) {
                var product_id = $('.qty_groupbuy_home').attr('id')
                
                var total_qty_from_api;
                var harga_satuan;
        
                get_product_detail_func(product_id).done(async function(response){
                    var item_product = response
                    alamat_company = response.PIC_company_address
                    province_company = await find_province_from_product_company(alamat_company)
                    city_company = await find_city_from_product_company(province_company,alamat_company)
                    district_company = await find_district_from_product_company(city_company,alamat_company)
                    courier_price_code_company = await find_courier_price_code_from_product_company(district_company,alamat_company)
                    console.log(province_company)
                    console.log(city_company)
                    console.log(district_company)
                    console.log(courier_price_code_company)
                    get_all_couriers().done(function(response){
                        var dataAllKurir = response
                        var kurir_kode =''
                        for(var i=0; i<dataAllKurir.length; i++){
                            if(dataAllKurir[i].Courier == new_kurir_pilihan){
                                kurir_kode = dataAllKurir[i].Courier_Code
                            }
                        }
                        
                        get_all_subdistrict_from_courier(new_kurir_pilihan,kurir_kode,kecamatan_pilihan).done(function(response){
                            
                            var allKelurahan = response
                          
                            var Courier_Price_Code_orig = 'CGK01.00'
                            var packing_type = ''
                            var berat_product = parseInt(item_product.Weight_KG)
                            var item_dimension = item_product.Dimension_CM_CUBIC
                            var split_item_dimension = item_dimension.split('*') 
                            var item_length = split_item_dimension[0]
                            var item_width = split_item_dimension[1]
                            var item_height = split_item_dimension[2]
                            var paket_value = ''
                            var allPengiriman = []
                            if(item_length != undefined && item_length != null && item_length != "undefined"){
                                
                            }else {
                                item_length = 1
                            }
                            if(item_width != undefined && item_width != null && item_width != "undefined"){
                                
                            }else {
                                item_width = 1
                            }
                            if(item_height != undefined && item_height != null && item_height != "undefined"){
                                
                            }else {
                                item_height = 1
                            }
                            if(berat_product <= 0 || berat_product == null || berat_product == undefined || Number.isNaN(berat_product)){
                                berat_product = 0.1*1.5;
                            }else{
                                berat_product = berat_product*1*1.5;
                            }
                            var total_berat_product = Math.ceil(berat_product * total_qty_from_user)
                            var paket_value = total_berat_product
                            new_get_shipping_fee(courier_price_code_company , allKelurahan[0].Courier_Price_Code, packing_type, berat_product, item_length, item_width, item_height, paket_value).done(function(response){
                                var allPengiriman =response
                                var data_shipping_fee = response
                                var asuransi_pilihan = $('.asuransi-home-gb option:selected').val()
                                var packing_pilihan = $('.packing-home-gb option:selected').val()
                                var harga_shipping = parseInt($('.pengiriman-home-gb option:selected').attr('class'))
                                var harga_asuransi = parseInt($('.asuransi-home-gb option:selected').attr('class'))
                                var harga_packing = parseInt($('.packing-home-gb option:selected').attr('class'))
                                
                                
                                
                                
                                var isAsuransi_pilihan = false
                                var isPacking_pilihan = false
                                var isPengiriman_pilihan = false
                                
        
                                if(asuransi_pilihan == 'Asuransi' || asuransi_pilihan == null || asuransi_pilihan == undefined){
                                    isAsuransi_pilihan = false
                                }else {
                                    isAsuransi_pilihan = true
                                }
                                if(packing_pilihan == 'Packing' || packing_pilihan == null || packing_pilihan == undefined){
                                    isPacking_pilihan = false
                                }else {
                                    isPacking_pilihan = true
                                }
                                if(pengiriman_pilihan == 'Pengiriman' || pengiriman_pilihan == null || pengiriman_pilihan == undefined){
                                    isPengiriman_pilihan = false
                                }else {
                                    isPengiriman_pilihan = true
                                }
                                console.log(isAsuransi_pilihan, isPacking_pilihan, isPengiriman_pilihan)
                                if(isAsuransi_pilihan && isPacking_pilihan && isPengirimanPilihan){
                                    if(allPengiriman){
                                        $('.pengiriman-home-gb').empty()
                                        $('.asuransi-home-gb').empty()
                                        $('.packing-home-gb').empty()
                                        if(allPengiriman.service != undefined) {
                                            allPengiriman.service.map((val,index)=>{
                                                var tarif = val.TARIFF * 1.2
                                                if(allPengiriman.service.length > 0 && allPengiriman.service.length <2){
                                                    
                                                        $('.pengiriman-home-gb').append(`
                                                            <option selected value="${val.EST_DAY}days ${val.SERVICE} ${tarif} ${val.DESCRIPTION} " class="${tarif}">${val.EST_DAY}days ${val.SERVICE} ${tarif} ${val.DESCRIPTION} </option> 
                                                        `)
                                                }else {
                                                    if(index === 0 ){
                                                        
                                                        $('.pengiriman-home-gb').append(`
                                                            <option selected value="${val.EST_DAY}days ${val.SERVICE} ${tarif} ${val.DESCRIPTION} " class="${tarif}">${val.EST_DAY}days ${val.SERVICE} ${tarif} ${val.DESCRIPTION} </option> 
                                                        `)
                                                    }else {
                                                        $('.pengiriman-home-gb').append(`
                                                            <option  value="${val.EST_DAY}days ${val.SERVICE} ${tarif} ${val.DESCRIPTION} " class="${tarif}">${val.EST_DAY}days ${val.SERVICE} ${tarif} ${val.DESCRIPTION} </option> 
                                                        `)
                                                    }
                                                }
                                            })
                                        }
                                        if(allPengiriman.insurance !=undefined){
                                            if(allPengiriman.insurance.length === 0 ){
                                                $('.new-gb-asuransi').css('display','none')
                                            }
                                            allPengiriman.insurance.map((val,index)=>{
                                                if(allPengiriman.insurance.length > 0 ){
                                                    if(index === 0){
                                                        $('.asuransi-home-gb').append(`
                                                            <option  selected value="type 0 tidak berasuransi" class="tidak berasuransi">Tidak Menggunakan Asuransi</option> 
                                                        `)
                                                        $('.asuransi-home-gb').append(`
                                                            <option  value="type ${val.INSURANCE_TYPE} ${val.INSURANCE_NAME} ${val.INSURANCE_COST}" class="${val.INSURANCE_COST}">${val.INSURANCE_NAME} - RP ${val.INSURANCE_COST} </option> 
                                                        `)
                                                    }else {
                                                        $('.asuransi-home-gb').append(`
                                                            <option  value="type ${val.INSURANCE_TYPE} ${val.INSURANCE_NAME} ${val.INSURANCE_COST}" class="${val.INSURANCE_COST}">${val.INSURANCE_NAME} - RP ${val.INSURANCE_COST} </option> 
                                                        `)
                                                    }
                                                }else {
                                                    $('.new-gb-asuransi').css('display','none')
                                                }
                                            })
                                        }
                                        if(allPengiriman.packing != undefined) {
                                            console.log(allPengiriman.packing,' allpengiriman packing')
                                            if(allPengiriman.packing.length === 0 ){
                                                $('.new-gb-packing').css('display','none')
                                            }
                                            allPengiriman.packing.map((val,index)=>{
                                                if(allPengiriman.packing.length >0){
                                                    if(allPengiriman.packing.length > 0 && allPengiriman.packing.length < 2){
                                                        $('.packing-home-gb').append(`
                                                            <option selected value="${val.PACKING_TYPE}" class="${val.PACKING_FEE}">${val.PACKING_TYPE} - RP ${val.PACKING_FEE} </option> 
                                                        `)
                                                    }else if( allPengiriman.packing.length >2 ){
                                                        if(index === 0 ){
                                                            $('.packing-home-gb').append(`
                                                                <option selected value="${val.PACKING_TYPE}" class="${val.PACKING_FEE}">${val.PACKING_TYPE} - RP ${val.PACKING_FEE} </option> 
                                                            `)  
                                                        }else {
                                                            $('.packing-home-gb').append(`
                                                                <option  value="${val.PACKING_TYPE}" class="${val.PACKING_FEE}">${val.PACKING_TYPE} - RP ${val.PACKING_FEE} </option> 
                                                            `)
                                                        }
                                                    }
                                                }else {
                                                    alert('masuk ke else 10553')
                                                    $('.new-gb-packing').css('display','none')
                                                }
                                            })
                                        }

                                    }
                                    $('.ndps-left').empty()
                                    $('.ndps-right').empty()
        
                                    $('#total_biaya_pengiriman_gb').val('100.000')
                                    $('.ndps-left').append(`
                                    <div class="detail-ndps-left">
                                        <p class="limited-text-short"> testing <br>
                                           testing
                                        </p>
                                    </div>
                                    <div class="detail-ndps-left">
                                        Shipping Fee
                                    </div>
                                    <div class="detail-ndps-left">
                                        Total Amount
                                    </div>
                                 `)
                                $('.ndps-right').append(`
                                    <div class="detail-ndps-right harga_total_product_qty" id="${harga_total_product}" value="${harga_total_product}">
                                        Rp ${harga_total_product}
                                    </div>
                                    <div class="detail-ndps-right harga_shipping_qty" id="${harga_shipping}" value="${harga_shipping}">
                                        Rp ${harga_shipping}
                                    </div>
                                    <div class="detail-ndps-right harga_total_prod_with_shipping_qty"id="${harga_total_product_with_shipping}" id="harga_total_prod_with_shipping_qty" value="${harga_total_product_with_shipping}">
                                        Rp ${harga_total_product_with_shipping}
                                    </div>
                                `)
                                }else if (isPengiriman_pilihan && isAsuransi_pilihan) {
                                    if(allPengiriman){
                                        $('.pengiriman-home-gb').empty()
                                        $('.asuransi-home-gb').empty()
                                        $('.packing-home-gb').empty()
                                        if(allPengiriman.service != undefined) {
                                            allPengiriman.service.map((val,index)=>{
                                                var tarif = val.TARIFF * 1.2
                                                if(allPengiriman.service.length > 0 && allPengiriman.service.length <2){
                                                        $('.pengiriman-home-gb').append(`
                                                            <option selected value="${val.EST_DAY}days ${val.SERVICE} ${tarif} ${val.DESCRIPTION} " class="${tarif}">${val.EST_DAY}days ${val.SERVICE} ${tarif} ${val.DESCRIPTION} </option> 
                                                        `)
                                                }else {
                                                    if(index === 0 ){   
                                                        $('.pengiriman-home-gb').append(`
                                                            <option selected value="${val.EST_DAY}days ${val.SERVICE} ${tarif} ${val.DESCRIPTION} " class="${tarif}">${val.EST_DAY}days ${val.SERVICE} ${tarif} ${val.DESCRIPTION} </option> 
                                                        `)
                                                    }else {
                                                        $('.pengiriman-home-gb').append(`
                                                            <option  value="${val.EST_DAY}days ${val.SERVICE} ${tarif} ${val.DESCRIPTION} " class="${tarif}">${val.EST_DAY}days ${val.SERVICE} ${tarif} ${val.DESCRIPTION} </option> 
                                                        `)
                                                    }
                                                }
                                            })
                                        }
                                        if(allPengiriman.insurance !=undefined){
                                            if(allPengiriman.insurance.length === 0 ){
                                                $('.new-gb-asuransi').css('display','none')
                                            }
                                            allPengiriman.insurance.map((val,index)=>{
                                                if(allPengiriman.insurance.length > 0 ){
                                                    if(index === 0){
                                                        $('.asuransi-home-gb').append(`
                                                            <option  selected value="type 0 tidak berasuransi" class="tidak berasuransi">Tidak Menggunakan Asuransi</option> 
                                                        `)
                                                        $('.asuransi-home-gb').append(`
                                                            <option  value="type ${val.INSURANCE_TYPE} ${val.INSURANCE_NAME} ${val.INSURANCE_COST}" class="${val.INSURANCE_COST}">${val.INSURANCE_NAME} - RP ${val.INSURANCE_COST} </option> 
                                                        `)
                                                    }else {
                                                        $('.asuransi-home-gb').append(`
                                                            <option  value="type ${val.INSURANCE_TYPE} ${val.INSURANCE_NAME} ${val.INSURANCE_COST}" class="${val.INSURANCE_COST}">${val.INSURANCE_NAME} - RP ${val.INSURANCE_COST} </option> 
                                                        `)
                                                    }
                                                }else {
                                                    $('.new-gb-asuransi').css('display','none')
                                                }
                                            })
                                        }
                                        if(allPengiriman.packing != undefined) {
                                            console.log(allPengiriman.packing,' allpengiriman packing')
                                            if(allPengiriman.packing.length === 0 ){
                                                $('.new-gb-packing').css('display','none')
                                            }
                                            allPengiriman.packing.map((val,index)=>{
                                                if(allPengiriman.packing.length >0){
                                                    if(allPengiriman.packing.length > 0 && allPengiriman.packing.length < 2){
                                                        $('.packing-home-gb').append(`
                                                            <option selected value="${val.PACKING_TYPE}" class="${val.PACKING_FEE}">${val.PACKING_TYPE} - RP ${val.PACKING_FEE} </option> 
                                                        `)
                                                    }else if( allPengiriman.packing.length >2 ){
                                                        if(index === 0 ){
                                                            $('.packing-home-gb').append(`
                                                                <option selected value="${val.PACKING_TYPE}" class="${val.PACKING_FEE}">${val.PACKING_TYPE} - RP ${val.PACKING_FEE} </option> 
                                                            `)  
                                                        }else {
                                                            $('.packing-home-gb').append(`
                                                                <option  value="${val.PACKING_TYPE}" class="${val.PACKING_FEE}">${val.PACKING_TYPE} - RP ${val.PACKING_FEE} </option> 
                                                            `)
                                                        }
                                                    }
                                                }else {
                                                    alert('masuk ke else 10553')
                                                    $('.new-gb-packing').css('display','none')
                                                }
                                            })
                                        }

                                    }
                                    
                                    var harga_total_product = item_product.GroupBuy_SellPrice * total_qty_from_user
                                    var harga_total_product_with_shipping = harga_total_product + harga_shipping + harga_asuransi
        
                                     
                                    $('.ndps-left').empty()
                                    $('.ndps-right').empty()
        
                                    $('#total_biaya_pengiriman_gb').val(harga_shipping)
                                    $('.ndps-left').append(`
                                    <div class="detail-ndps-left">
                                        <p class="limited-text-short"> ${item_product.Name} <br>
                                                ${total_qty_from_user} x Rp ${item_product.GroupBuy_SellPrice}
                                        </p>
                                    </div>
                                    <div class="detail-ndps-left">
                                        Shipping Fee
                                    </div>
                                    <div class="detail-ndps-left">
                                        Insurance
                                    </div>
                                    <div class="detail-ndps-left">
                                        Total Amount
                                    </div>
                                 `)
                                $('.ndps-right').append(`
                                    <div class="detail-ndps-right harga_total_product_qty" id="${harga_total_product}" value="${harga_total_product}">
                                        Rp ${harga_total_product}
                                    </div>
                                    <div class="detail-ndps-right harga_shipping_qty" id="${harga_shipping}" value="${harga_shipping}">
                                        Rp ${harga_shipping}
                                    </div>
                                    <div class="detail-ndps-right">
                                        Rp ${harga_asuransi}
                                    </div>
                                    <div class="detail-ndps-right harga_total_prod_with_shipping_qty"id="${harga_total_product_with_shipping}"  value="${harga_total_product_with_shipping}">
                                        Rp ${harga_total_product_with_shipping}
                                    </div>
                                   
                                `)
                                }else if (isPengiriman_pilihan && isPacking_pilihan){
                                    if(allPengiriman){
                                        $('.pengiriman-home-gb').empty()
                                        $('.asuransi-home-gb').empty()
                                        $('.packing-home-gb').empty()
                                        if(allPengiriman.service != undefined) {
                                            allPengiriman.service.map((val,index)=>{
                                                var tarif = val.TARIFF * 1.2
                                                if(allPengiriman.service.length > 0 && allPengiriman.service.length <2){
                                                    harga_shipping = val.TARIFF
                                                        $('.pengiriman-home-gb').append(`
                                                            <option selected value="${val.EST_DAY}days ${val.SERVICE} ${tarif} ${val.DESCRIPTION} " class="${tarif}">${val.EST_DAY}days ${val.SERVICE} ${tarif} ${val.DESCRIPTION} </option> 
                                                        `)
                                                }else {
                                                    if(index === 0 ){
                                                        harga_shipping = tarif
                                                        $('.pengiriman-home-gb').append(`
                                                            <option selected value="${val.EST_DAY}days ${val.SERVICE} ${tarif} ${val.DESCRIPTION} " class="${tarif}">${val.EST_DAY}days ${val.SERVICE} ${tarif} ${val.DESCRIPTION} </option> 
                                                        `)
                                                    }else {
                                                        $('.pengiriman-home-gb').append(`
                                                            <option  value="${val.EST_DAY}days ${val.SERVICE} ${tarif} ${val.DESCRIPTION} " class="${tarif}">${val.EST_DAY}days ${val.SERVICE} ${tarif} ${val.DESCRIPTION} </option> 
                                                        `)
                                                    }
                                                }
                                            })
                                        }
                                        if(allPengiriman.insurance !=undefined){
                                            if(allPengiriman.insurance.length === 0 ){
                                                $('.new-gb-asuransi').css('display','none')
                                            }
                                            allPengiriman.insurance.map((val,index)=>{
                                                if(allPengiriman.insurance.length > 0 ){
                                                    if(index === 0){
                                                        $('.asuransi-home-gb').append(`
                                                            <option  selected value="type 0 tidak berasuransi" class="tidak berasuransi">Tidak Menggunakan Asuransi</option> 
                                                        `)
                                                        $('.asuransi-home-gb').append(`
                                                            <option  value="type ${val.INSURANCE_TYPE} ${val.INSURANCE_NAME} ${val.INSURANCE_COST}" class="${val.INSURANCE_COST}">${val.INSURANCE_NAME} - RP ${val.INSURANCE_COST} </option> 
                                                        `)
                                                    }else {
                                                        $('.asuransi-home-gb').append(`
                                                            <option  value="type ${val.INSURANCE_TYPE} ${val.INSURANCE_NAME} ${val.INSURANCE_COST}" class="${val.INSURANCE_COST}">${val.INSURANCE_NAME} - RP ${val.INSURANCE_COST} </option> 
                                                        `)
                                                    }
                                                }else {
                                                    $('.new-gb-asuransi').css('display','none')
                                                }
                                            })
                                        }
                                        if(allPengiriman.packing != undefined) {
                                            console.log(allPengiriman.packing,' allpengiriman packing')
                                            if(allPengiriman.packing.length === 0 ){
                                                $('.new-gb-packing').css('display','none')
                                            }
                                            allPengiriman.packing.map((val,index)=>{
                                                if(allPengiriman.packing.length >0){
                                                    if(allPengiriman.packing.length > 0 && allPengiriman.packing.length < 2){
                                                        $('.packing-home-gb').append(`
                                                            <option selected value="${val.PACKING_TYPE}" class="${val.PACKING_FEE}">${val.PACKING_TYPE} - RP ${val.PACKING_FEE} </option> 
                                                        `)
                                                    }else if( allPengiriman.packing.length >2 ){
                                                        if(index === 0 ){
                                                            $('.packing-home-gb').append(`
                                                                <option selected value="${val.PACKING_TYPE}" class="${val.PACKING_FEE}">${val.PACKING_TYPE} - RP ${val.PACKING_FEE} </option> 
                                                            `)  
                                                        }else {
                                                            $('.packing-home-gb').append(`
                                                                <option  value="${val.PACKING_TYPE}" class="${val.PACKING_FEE}">${val.PACKING_TYPE} - RP ${val.PACKING_FEE} </option> 
                                                            `)
                                                        }
                                                    }
                                                }else {
                                                    alert('masuk ke else 10553')
                                                    $('.new-gb-packing').css('display','none')
                                                }
                                            })
                                        }

                                    }
                                    
                                    var harga_total_product = item_product.GroupBuy_SellPrice * total_qty_from_user
                                    var harga_total_product_with_shipping = harga_total_product + harga_shipping + harga_packing
        
                                     
                                    $('.ndps-left').empty()
                                    $('.ndps-right').empty()
        
                                    $('#total_biaya_pengiriman_gb').val(harga_shipping)
                                    $('.ndps-left').append(`
                                    <div class="detail-ndps-left">
                                        <p class="limited-text-short"> ${item_product.Name} <br>
                                                ${total_qty_from_user} x Rp ${item_product.GroupBuy_SellPrice}
                                        </p>
                                    </div>
                                    <div class="detail-ndps-left">
                                        Shipping Fee
                                    </div>
                                    <div class="detail-ndps-left">
                                        Packing
                                    </div>
                                    <div class="detail-ndps-left">
                                        Total Amount
                                    </div>
                                 `)
                                $('.ndps-right').append(`
                                    <div class="detail-ndps-right harga_total_product_qty harga_total_product"  id="${harga_total_product}"value="${harga_total_product}">
                                        Rp ${harga_total_product}
                                    </div>
                                    <div class="detail-ndps-right harga_shipping_qty" id="${harga_shipping}" value="${harga_shipping}">
                                        Rp ${harga_shipping}
                                    </div>
                                    <div class="detail-ndps-right">
                                        Rp ${harga_packing}
                                    </div>
                                    <div class="detail-ndps-right harga_total_prod_with_shipping_qty" id="${harga_total_product_with_shipping}" id="harga_total_prod_with_shipping_qty" value="${harga_total_product_with_shipping}">
                                        Rp ${harga_total_product_with_shipping}
                                    </div>
                                  
                                `)
                                }else if(isPengiriman_pilihan){
                                    if(allPengiriman){
                                        $('.pengiriman-home-gb').empty()
                                        $('.asuransi-home-gb').empty()
                                        $('.packing-home-gb').empty()
                                        if(allPengiriman.service != undefined) {
                                            allPengiriman.service.map((val,index)=>{
                                                var tarif = val.TARIFF * 1.2
                                                if(allPengiriman.service.length > 0 && allPengiriman.service.length <2){
                                                    harga_shipping = val.TARIFF
                                                        $('.pengiriman-home-gb').append(`
                                                            <option selected value="${val.EST_DAY}days ${val.SERVICE} ${tarif} ${val.DESCRIPTION} " class="${tarif}">${val.EST_DAY}days ${val.SERVICE} ${tarif} ${val.DESCRIPTION} </option> 
                                                        `)
                                                }else {
                                                    if(index === 0 ){
                                                        harga_shipping = tarif
                                                        $('.pengiriman-home-gb').append(`
                                                            <option selected value="${val.EST_DAY}days ${val.SERVICE} ${tarif} ${val.DESCRIPTION} " class="${tarif}">${val.EST_DAY}days ${val.SERVICE} ${tarif} ${val.DESCRIPTION} </option> 
                                                        `)
                                                    }else {
                                                        $('.pengiriman-home-gb').append(`
                                                            <option  value="${val.EST_DAY}days ${val.SERVICE} ${tarif} ${val.DESCRIPTION} " class="${tarif}">${val.EST_DAY}days ${val.SERVICE} ${tarif} ${val.DESCRIPTION} </option> 
                                                        `)
                                                    }
                                                }
                                            })
                                        }
                                        if(allPengiriman.insurance !=undefined){
                                            if(allPengiriman.insurance.length === 0 ){
                                                $('.new-gb-asuransi').css('display','none')
                                            }
                                            allPengiriman.insurance.map((val,index)=>{
                                                if(allPengiriman.insurance.length > 0 ){
                                                    if(index === 0){
                                                        $('.asuransi-home-gb').append(`
                                                            <option  selected value="type 0 tidak berasuransi" class="tidak berasuransi">Tidak Menggunakan Asuransi</option> 
                                                        `)
                                                        $('.asuransi-home-gb').append(`
                                                            <option  value="type ${val.INSURANCE_TYPE} ${val.INSURANCE_NAME} ${val.INSURANCE_COST}" class="${val.INSURANCE_COST}">${val.INSURANCE_NAME} - RP ${val.INSURANCE_COST} </option> 
                                                        `)
                                                    }else {
                                                        $('.asuransi-home-gb').append(`
                                                            <option  value="type ${val.INSURANCE_TYPE} ${val.INSURANCE_NAME} ${val.INSURANCE_COST}" class="${val.INSURANCE_COST}">${val.INSURANCE_NAME} - RP ${val.INSURANCE_COST} </option> 
                                                        `)
                                                    }
                                                }else {
                                                    $('.new-gb-asuransi').css('display','none')
                                                }
                                            })
                                        }
                                        if(allPengiriman.packing != undefined) {
                                            console.log(allPengiriman.packing,' allpengiriman packing')
                                            if(allPengiriman.packing.length === 0 ){
                                                $('.new-gb-packing').css('display','none')
                                            }
                                            allPengiriman.packing.map((val,index)=>{
                                                if(allPengiriman.packing.length >0){
                                                    if(allPengiriman.packing.length > 0 && allPengiriman.packing.length < 2){
                                                        $('.packing-home-gb').append(`
                                                            <option selected value="${val.PACKING_TYPE}" class="${val.PACKING_FEE}">${val.PACKING_TYPE} - RP ${val.PACKING_FEE} </option> 
                                                        `)
                                                    }else if( allPengiriman.packing.length >2 ){
                                                        if(index === 0 ){
                                                            $('.packing-home-gb').append(`
                                                                <option selected value="${val.PACKING_TYPE}" class="${val.PACKING_FEE}">${val.PACKING_TYPE} - RP ${val.PACKING_FEE} </option> 
                                                            `)  
                                                        }else {
                                                            $('.packing-home-gb').append(`
                                                                <option  value="${val.PACKING_TYPE}" class="${val.PACKING_FEE}">${val.PACKING_TYPE} - RP ${val.PACKING_FEE} </option> 
                                                            `)
                                                        }
                                                    }
                                                }else {
                                                    alert('masuk ke else 10553')
                                                    $('.new-gb-packing').css('display','none')
                                                }
                                            })
                                        }

                                    }
                                    
                                    
                                    var harga_total_product = item_product.GroupBuy_SellPrice * total_qty_from_user
                                    var harga_total_product_with_shipping = parseInt(harga_total_product) + parseInt(harga_shipping)
        
                                     
                                    $('.ndps-left').empty()
                                    $('.ndps-right').empty()
        
                                    $('#total_biaya_pengiriman_gb').val(harga_shipping)
                                    $('.ndps-left').append(`
                                        <div class="detail-ndps-left">
                                            <p class="limited-text-short"> ${item_product.Name} <br>
                                                    ${total_qty_from_user} x Rp ${item_product.GroupBuy_SellPrice}
                                            </p>
                                        </div>
                                        <div class="detail-ndps-left">
                                            Shipping Fee
                                        </div>
                                        <div class="detail-ndps-left">
                                            Total Amount
                                        </div>
                                    `)
                                    $('.ndps-right').append(`
                                        <div class="detail-ndps-right harga_total_product_qty" id="${harga_total_product}" value="${harga_total_product}">
                                            Rp ${harga_total_product}
                                        </div>
                                        <div class="detail-ndps-right harga_shipping_qty" id="${harga_shipping}" value="${harga_shipping}">
                                            Rp ${harga_shipping}
                                        </div>
                                        <div class="detail-ndps-right harga_total_prod_with_shipping_qty" id="${harga_total_product_with_shipping}" id="harga_total_prod_with_shipping_qty" value="${harga_total_product_with_shipping}">
                                            Rp ${harga_total_product_with_shipping}
                                        </div>
                                    `)

                                  

                                }else {
                                    console.log('10491 else')                            
        
                                }
        
        
                            })
                        })
        
                    })
        
                })
            }else{
                var total_qty_from_user = val
                
                var product_id = $('.qty_groupbuy_home').attr('id')
                
                var total_qty_from_api;
                var harga_satuan;
                axios.post(`https://products.sold.co.id/get-product-details?product_code=${product_id}`)
                .then((res)=>{
                    
                    total_qty_from_api = parseInt(res.data.GroupBuy_SellQuantity)
                    harga_satuan = res.data.GroupBuy_SellPrice
                    var total_harga = harga_satuan * total_qty_from_user
                    if(total_qty_from_api > total_qty_from_user) {
                        // $('#tp_sp').val(total_harga)
                        // $('#tp_iframe').val(total_harga)
                        $('.ndps-left').empty()
                        $('.ndps-right').empty()
                        
                        get_product_detail_func(product_id).done(function(response){
                            $('.ndps-left').append(`
                            <div class="detail-ndps-left">
                                <p class="limited-text-short"> ${response.Name} <br>
                                    ${total_qty_from_user} x Rp ${response.GroupBuy_SellPrice}
                                </p>
                            </div>
                            <div class="detail-ndps-left">
                                Shipping Fee
                            </div>
                            <div class="detail-ndps-left">
                                Total Amount
                            </div>
                            `)
                            $('.ndps-right').append(`
                                <div class="detail-ndps-right">
                                Rp ${total_harga}
                                </div>
                                <div class="detail-ndps-right">
                                    
                                </div>
                                <div class="detail-ndps-right"id="tp_iframe">
                                    
                                </div>
                            `)
                        })
                  }else {
                      $('.ndps-left').empty()
                      $('.ndps-right').empty()
                    
                  
                    Swal.fire({
                        html:`
                        <div class="o-circle c-container__circle o-circle__sign--failure">
                            <div class="o-circle__sign"></div>  
                        </div> 
                        Quantity Yang Tersisa Hanya : ${total_qty_from_api}!`,
                        timer:2000,
                        
                    })
                        var total_price = harga_satuan * total_qty_from_api
                        $('.qty_groupbuy_home').val(total_price)
                        // alert(total_qty_from_api)
                        // $('#tp_sp').val(total_harga)
                        // $('#tp_iframe').val(total_price)
                        get_product_detail_func(product_id).done(function(response){
                            $('.ndps-left').append(`
                            <div class="detail-ndps-left">
                                <p class="limited-text-short"> ${response.Name} <br>
                                   Rp ${total_qty_from_api} x Rp ${response.GroupBuy_SellPrice}
                                </p>
                               
                                </div>
                                <div class="detail-ndps-left">
                                    Shipping Fee
                                </div>
                                <div class="detail-ndps-left">
                                    Total Amount
                                </div>
                            `)
                            $('.ndps-right').append(`
                                <div class="detail-ndps-right">
                                    ${total_price}
                                </div>
                                <div class="detail-ndps-right">
                                    
                                </div>
                                <div class="detail-ndps-right"id="tp_iframe">
                                    
                                </div>
                            `)
                        })
                  }
            
                }).catch((err)=>{
                    
                })
        
             }

    }
    

    
    




}


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




function calculateSize(img, maxWidth, maxHeight) {
    let width = img.width;
    let height = img.height;
  
    // calculate the width and height, constraining the proportions
    if (width > height) {
      if (width > maxWidth) {
        height = Math.round((height * maxWidth) / width);
        width = maxWidth;
      }
    } else {
      if (height > maxHeight) {
        width = Math.round((width * maxHeight) / height);
        height = maxHeight;
      }
    }
    return [width, height];
  }
  

  const close_product_detail=()=>{
      close_all_open_window()
    //   $('body').scrollTo('.box-render-new',window.parent);
    //   $(".main-body",window.parent).animate({ scrollTop: $('.main-body',window.parent) }, 1270);
    $('html, body').animate({ scrollTop: ('.box-card',window.parent) }, 1000);
    
    

    // $("body").click(function() {
        $('html, body').animate({ scrollTop: $(".main-body, .box-render-all").offset().top }, 1000);
    
  }
        
  

  const open_category_home=()=>{
    //   alert('jalan')
    back_to_home()
    $('.new-box-category').toggle(500)
    
    $('.list-group-item').removeClass('active-cl')
    close_all_open_window()
    // 
  }