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
    axios.post(`https://products.sold.co.id/get-product-details?Get_ALL_Category=true`)
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
    

    axios.post(`https://products.sold.co.id/get-product-details?product_name=${product_name}`)
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
                    <img src="${replace_vtintl_to_sold_co_id(val.Picture_1)}" alt="" class="img-card img_sp" onclick="get_product_detail_from_searching_page('${val.Product_Code}')">   
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
    // title: 'Please Wait',
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
    didOpen: () => {
        Swal.showLoading()

        axios.post(`https://products.sold.co.id/get-product-details?Get_ALL_Sub_Category_Based_On_Category=${choosen_parent_category}`)
        .then((res)=>{
            console.log(res.data)
            // $('.box-list-kategori').css("display", "block")
            $('.box-list-kategori').toggle()
            $('.box-list-kategori').empty()
            res.data.map((val,index)=>{
                
                    $('.box-list-kategori').append(
                      `
                        <div class="card-all-item hvr-float-shadow" id="${val.Subcategory}" onclick="show_jenisproduct('${val.Subcategory}')">
                            <img src="${replace_vtintl_to_sold_co_id(val.Picture_1)}" alt="" class="img-all-card">   
                            <div class="card-all-item-list">
                                <p class="limited-text-short">${val.Subcategory}</p>
                            </div>
                        </div>
                        `
                    )
            }) 
            Swal.fire({
                title: 'Uploading Data',
                timer:100,
            }) 
            
        }).catch((err)=>{
            
        })
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

function show_jenisproduct(jenis_product){
    

    $('.box-list-kategori').css('display','none')
    $('.box-list-subcategory').css('display','block')
    $('.close-button').css('display','block')
    $('.render-item-sub').empty()

    let timerInterval
    Swal.fire({
    // title: 'Please Wait',
    // html: 'I will close in <b></b> milliseconds.',
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
    timer: 2000,
    timerProgressBar: true,
    didOpen: () => {
        Swal.showLoading()
        axios.post(`https://products.sold.co.id/get-product-details?subcategory=${jenis_product}`)
        .then((res)=>{
            res.data.map((val,index)=>{
                var hargaAwal = parseInt(val.Sell_Price)
                var discount = parseInt(val.Sell_Price * 0.1)
                var hargaTotal = hargaAwal + discount
                $('.render-item-sub').append(
                    `
                    <div class="card-item card_sp hvr-float-shadow">
                        <img src="${replace_vtintl_to_sold_co_id(val.Picture_1)}" alt="" class="img-card" onclick="get_product_detail_from_searching_page('${val.Product_Code}')">   
                        <div class="card-item-list">
                            <p class="limited-text-short">${val.Name}</p>
                            <div class="split-item">
                                <div class="item-price">
                                    <p>RP. ${commafy(hargaTotal)}</p>
                                    <p>Rp. ${commafy(hargaAwal)}</p>
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
            Swal.fire({
                title: 'Uploading Data',
                timer:100,
            }) 
            // $('.modals-lk').addClass('melihat') // ini bisa hampir
        }).catch((err)=>{
            
        })
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

const get_product_detail_from_searching_page=(product_id)=>{
    
    // $('.item_detail_sp').empty()
    $(this).scrollTop('.item_detail_sp')
    $('.box-list-subcategory').css('display','none')
    // $('.item_detail_sp').css('display','flex')
    $('.close-button').css('display','block')
    $('.groupbuy_sp_iframe').css('display','block')
    $('.groupbuy_sp_iframe').attr('src',`./itemDetail.html?product_id=${product_id}`)

}



function groupbuy_sp_form(product_id){
    var token = localStorage.getItem('token')
    axios.post(`https://products.sold.co.id/get-unpaid-sales-order-specific-for-a-product?Product_Code=${product_id}&Customer_Code=${token}`)
    .then((res)=>{
        // 
        if(res.data){

    $('.groupbuy_sp').empty()
    $('.item_detail_sp').css('display','none')
    $('.groupbuy_sp').css('display','flex')
    $('.close-button').css('display','block')

    $('.groupbuy_sp_iframe').attr('src','./I')
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

    Swal.fire({
        title: 'Uploading Data',
        timer:300000000,
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
    `,didOpen:async()=>{
        $('.close-button-2').css('display','block')
        var data = product_name
        
        if(data){
            $('.sp_name').val(data)
        }else {
            $('.sp_name').val('All')
        }

        var all_product_storage = JSON.parse(localStorage.getItem('all_data_product'))

        if(all_product_storage.length >0 || all_product_storage !=null || all_product_storage != undefined){
            console.log('masuk ke if')
            var arr_filter_product = []
            var arr_split_filter_product = []
            var arr_for_render_split_filter = []
            var split_product = product_name.split(' ')
            console.log(split_product,'split product 356')
            let uniqueProduct = [];
            all_product_storage.forEach((val,index)=>{ // semua product dari local storage
                split_product.forEach((res,id)=>{ // data split dari product yang dicari
                    if(val.Name.toUpperCase().includes(res.toUpperCase())){ // kalo product ada yg termasuk dari yg di split
                        arr_for_render_split_filter.push(val)

                        
                        arr_for_render_split_filter.forEach((product_code) => {
                            if (!uniqueProduct.includes(product_code)) {
                                uniqueProduct.push(product_code);
                            }
                        });
                        
                        console.log(arr_for_render_split_filter)
                    }
                })
            })
            uniqueProduct.map((val,index)=>{
                var hargaAwal = parseInt(val.Sell_Price)
                var discount = parseInt(val.Sell_Price * 0.1)
                var hargaTotal = hargaAwal + discount
                $('.new-box-card').append(`
                <div class="card-item card_sp hvr-float-shadow" data-aos="zoom-in">
                        <img src="${replace_vtintl_to_sold_co_id(val.Picture_1)}" alt="" class="img-card img_sp" onclick="get_product_detail_from_searching_page('${val.Product_Code}')">   
                    <div class="card-item-list">
                        <p class="limited-text-short">${val.Name}</p>
                        <div class="split-item">
                            <div class="item-price">
                                <p>RP. ${commafy(hargaTotal)}</p>
                                <p>Rp. ${commafy(hargaAwal)}</p>
                            </div>
                            <div class="buy-icon" onclick="addToCart('${val.Product_Code}')">
                                <img src="../img/cart.png" alt="" class="icon-buy" id="${val.Product_Code}">
                            </div>
                        </div>
                    </div>
                </div>
                `)   
            })
            console.log(uniqueProduct)

            var split_item = all_product_storage.filter((val)=>{

            })
           
            var filter_product = all_product_storage.filter((val)=>{
                // console.log(val.Name.toUpperCase(), product_name.toUpperCase())
                // console.log(val.Name.toUpperCase().includes(product_name.toUpperCase()))
                // if(val.Name.toUpperCase().includes(product_name.toUpperCase())){
                //     arr_filter_product.push(val)
                //     console.log(val)
                //     var hargaAwal = parseInt(val.Sell_Price)
                //     var discount = parseInt(val.Sell_Price * 0.1)
                //     var hargaTotal = hargaAwal + discount
                //     $('.new-box-card').append(`
                //     <div class="card-item card_sp hvr-float-shadow" data-aos="zoom-in">
                //             <img src="${replace_vtintl_to_sold_co_id(val.Picture_1)}" alt="" class="img-card img_sp" onclick="get_product_detail_from_searching_page('${val.Product_Code}')">   
                //         <div class="card-item-list">
                //             <p class="limited-text-short">${val.Name}</p>
                //             <div class="split-item">
                //                 <div class="item-price">
                //                     <p>RP. ${commafy(hargaTotal)}</p>
                //                     <p>Rp. ${commafy(hargaAwal)}</p>
                //                 </div>
                //                 <div class="buy-icon" onclick="addToCart('${val.Product_Code}')">
                //                     <img src="../img/cart.png" alt="" class="icon-buy" id="${val.Product_Code}">
                //                 </div>
                //             </div>
                //         </div>
                //     </div>
                //     `)      
                // }
            })
            console.log(filter_product)
        }else {
            axios.post(`https://products.sold.co.id/get-product-details?product_name=${product_name}`)
            .then((res)=>{
            console.log(res.data)
                var data_searching = res.data
        
        
                if(res.data.length <3){
                    axios.post(`https://products.sold.co.id/get-product-details?`)
                    .then((res)=>{
                        console.log('masuk ke if 360')
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
                                        <img src="${replace_vtintl_to_sold_co_id(val.Picture_1)}" alt="" class="img-card img_sp" onclick="get_product_detail_from_searching_page('${val.Product_Code}')">   
                                    <div class="card-item-list">
                                        <p class="limited-text-short">${val.Name}</p>
                                        <div class="split-item">
                                            <div class="item-price">
                                                <p>RP. ${commafy(hargaTotal)}</p>
                                                <p>Rp. ${commafy(hargaAwal)}</p>
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
                                        <img src="${replace_vtintl_to_sold_co_id(val.Picture_1)}" alt="" class="img-card img_sp" onclick="get_product_detail_from_searching_page('${val.Product_Code}')">   
                                    <div class="card-item-list">
                                        <p class="limited-text-short">${val.Name}</p>
                                        <div class="split-item">
                                            <div class="item-price">
                                                <p>RP. ${commafy(hargaTotal)}</p>
                                                <p>Rp. ${commafy(hargaAwal)}</p>
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
                    Swal.fire({
                        title: 'Uploading Data',
                        timer:100,
                    })
                }else {
                    console.log('masuk ke else 428')
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
                                    <img src="${replace_vtintl_to_sold_co_id(val.Picture_1)}" alt="" class="img-card img_sp" onclick="get_product_detail_from_searching_page('${val.Product_Code}')">   
                                <div class="card-item-list">
                                    <p class="limited-text-short">${val.Name}</p>
                                    <div class="split-item">
                                        <div class="item-price">
                                            <p>RP. ${commafy(hargaTotal)}</p>
                                            <p>Rp. ${commafy(hargaAwal)}</p>
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
                    Swal.fire({
                        title: 'Uploading Data',
                        timer:100,
                    })
                }
        
                
            }).catch((err)=>{
                
            })

        }
        
    
       
        Swal.fire({
            title: 'Uploading Data',
            timer:100,
        })
    }
    })


    // axios.post(``)

   
}




const render_daftar_hutang=()=>{ // render utang untuk di card
    const token = localStorage.getItem('token')
    
    axios.post(`https://sales.sold.co.id/get-unpaid-sales-order-per-customer?Customer_Code=${token}`)
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
    
    axios.post(`https://sales.sold.co.id/get-sales-order-data-and-detail?Order_Number=${order_number}`)
    .then((res)=>{
        
        var arrListHutang = res.data
        

        axios.post(`https://sales.sold.co.id/check-delivery-order-information?Order_Number=${order_number}`)
        .then((res)=>{
            var delivery_data = res.data
            var delivery_parse = JSON.parse(delivery_data.Shipping_Number)
            var arrDataProduct = []
        var kurir_name = ''
        var shipping_price = 0
        var product_price =0
        var customer_address = ''
        var total = arrListHutang.length
        // render card item
        arrListHutang.map((val,index)=>{
            customer_address =  val.Shipping_Address

            if(val.Product_Code == 'tiki'){
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
                            ${delivery_parse.paket_awb}
                        </div>     
                    </div>
                </div>
                `)

            }else {
                product_price += val.Price_Based_On_Total_Quantity *1
                axios.post(`http://products.sold.co.id/get-product-details?product_code=${val.Product_Code}`)
                .then((res)=>{
                    
                $('.box-card-item-ul').append(`
                    <div class="card-item-ul">
                        <div class="card-desc">
                            <div class="img-card-ul">
                                <img src="${replace_vtintl_to_sold_co_id(res.data.Picture_1)}" alt="" class="img-item-ul">
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
                                ${delivery_parse.paket_awb}
                            </div>     
                        </div>
                    </div>
                `)
                }).catch((err)=>{
                    
                })
            }



        })
        var total_product_with_shipping = shipping_price + product_price
       
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
                <p>Order Number <br>
                ${arrListHutang[0].Order_Number}</p>
                <p>Delivery Order Number<br>
                ${res.data.Delivery_Order_Number}</p>
            `)
        }).catch((err)=>{
            console.log(err)
        })
        
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


function replace_vtintl_to_sold_co_id(original_url){
    var original_url = original_url.split("http://image.vtintl.id/").join("https://image.sold.co.id/");
return original_url;
}