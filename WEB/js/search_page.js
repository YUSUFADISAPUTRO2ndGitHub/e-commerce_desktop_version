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
    axios.post(`http://products.sold.co.id/get-product-details?Get_ALL_Category=true`)
    .then((res)=>{
        res.data.map((val,index)=>{
            console.log(val.Category);
            $('.category-list-sp').append(
                `
                <li class="list-group-item" onclick="show_subcategory('${val.Category}')">${val.Category.toUpperCase()}</li>
                `
                )
            })
    }).catch((err)=>{
        console.log(err)
    })


});

const sort_by_higher=()=>{

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const search = urlParams.get('search');
    const subcategory = urlParams.get('category')
    const searching = urlParams.get('searching')
    render_sort_price(searching,'asc')
    console.log(searching,'line 33')
}
const sort_by_lower=()=>{

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const search = urlParams.get('search');
    const subcategory = urlParams.get('category')
    const searching = urlParams.get('searching')
    render_sort_price(searching,'desc')
    console.log(searching,'line 33')
}


const render_sort_price=(product_name,condition)=>{
    console.log(product_name)
    var data = product_name
    if(data){
        $('.sp_name').val(data)
    }else {
        $('.sp_name').val('All')
    }
    

    axios.post(`http://products.sold.co.id/get-product-details?product_name=${product_name}`)
    .then((res)=>{
        // console.log(res.data)
        if(condition == 'asc'){
            res.data.sort((a,b) => (b.Sell_Price > a.Sell_Price) ? 1 : -1)

        }else {
            res.data.sort((a,b) => (a.Sell_Price > b.Sell_Price) ? 1 : -1)
        }
        console.log(res.data)
        $('.new-box-card').empty()
        res.data.map((val,index)=>{
            var hargaAwal = parseInt(val.Sell_Price)
            var discount = parseInt(val.Sell_Price * 0.1)
            var hargaTotal = hargaAwal + discount
            $('.new-box-card').append(`
            <div class="card-item card_sp hvr-float-shadow">
                    <img src="${val.Picture_1}" alt="" class="img-card img_sp" onclick="get_product_detail_from_searching_page('${val.Product_Code}')">   
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
        console.log(err)
    })


    // axios.post(``)

   
}

// batas
function show_subcategory(choosen_parent_category){
    $('.close-button').css('display','block')

    let timerInterval
    Swal.fire({
    title: 'Please Wait',
    // html: 'I will close in <b></b> milliseconds.',
    timer: 2000,
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
        axios.post(`http://products.sold.co.id/get-product-details?Get_ALL_Sub_Category_Based_On_Category=${choosen_parent_category}`)
        .then((res)=>{
            console.log(res);
            // $('.box-list-kategori').css("display", "block")
            $('.box-list-kategori').toggle()
            $('.box-list-kategori').empty()
            res.data.map((val,index)=>{
                $('.box-list-kategori').append(
                  `
                    <div class="card-all-item hvr-float-shadow" id="${val.Subcategory}" onclick="show_jenisproduct('${val.Subcategory}')">
                        <img src="${val.Picture_1}" alt="" class="img-all-card">   
                        <div class="card-all-item-list">
                            <p class="limited-text-short">${val.Subcategory}</p>
                        </div>
                    </div>
                    `
                )
            }) 
            
        }).catch((err)=>{
            console.log(err)
        })
    }
    })
}

function show_jenisproduct(jenis_product){
    

    $('.box-list-kategori').css('display','none')
    $('.box-list-subcategory').css('display','block')
    $('.close-button').css('display','block')

    let timerInterval
    Swal.fire({
    title: 'Please Wait',
    // html: 'I will close in <b></b> milliseconds.',
    timer: 2000,
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
                    <div class="card-item card_sp hvr-float-shadow">
                        <img src="${val.Picture_1}" alt="" class="img-card" onclick="get_product_detail_from_searching_page('${val.Product_Code}')">   
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
                    `
                )
            }) 
            // $('.modals-lk').addClass('melihat') // ini bisa hampir
            
            console.log('finish render item based on sub cat')
            
        }).catch((err)=>{
            console.log(err)
        })
    }
    })


}

const get_product_detail_from_searching_page=(product_id)=>{
    
    $('.item_detail_sp').empty()
    $(this).scrollTop('.item_detail_sp')
    $('.box-list-subcategory').css('display','none')
    $('.item_detail_sp').css('display','flex')
    $('.close-button').css('display','block')


    axios.post(`http://products.sold.co.id/get-product-details?product_code=${product_id}`)
    .then((res)=>{
        console.log(res.data)
        item = res.data
        var hargaAwal = parseInt(item.Sell_Price)
        var discount = parseInt(item.Sell_Price * 0.1)
        var hargaTotal = hargaAwal + discount
        console.log(item.GroupBuy_SellPrice === "NULL", ' ini 116')
        console.log(typeof 'bayu' )
        console.log( item.GroupBuy_SellPrice )
        if(item.GroupBuy_SellPrice === "NULL"){
            $('.item_detail_sp').append(
                `
                <div class="box-item-img">
                    <div class="item-img"> 
                        <div class="box-back-detail">
                            <i class="fas fa-chevron-left icon-prev-detail" ></i>
                        </div>
                        <img src="${item.Picture_1}" alt="" class="img-icon-sp">
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
                <div class="item-detail det-sp">
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
                        <div class="deskripsi-sp">
                            <p>Deskripsi :</p>
                            <p>${item.Description}</p>
                        </div>      
                </div>
                `
            )
        }else{
            $('.item_detail_sp').append(
                `
                <div class="box-item-img">
                    <div class="item-img"> 
                        <div class="box-back-detail">
                            <i class="fas fa-chevron-left icon-prev-detail" ></i>
                        </div>
                        <img src="${item.Picture_1}" alt="" class="img-icon-sp">
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
                <div class="item-detail det-sp">
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
                        <div class="box-detail-option">
                            <ul class="box-add" onclick="addToCart('${item.Product_Code}')">
                                <li>
                                    <p>Add to Cart</p>
                                </li>
                                <li>
                                    <img src="../img/cart.png" alt="" class="img-cart">
                                </li>
                            </ul>
                    
                            <div class="box-discount" onclick="groupbuy_sp_form('${item.Product_Code}')">
                                <div class="add-discount">
                                    <p>Beli dengan diskon GROUP BUY</p>
                                </div>
                            </div>
                    
                        </div>

                        <br>
                        <div class="deskripsi-sp">
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



function groupbuy_sp_form(product_id){
    var token = localStorage.getItem('token')
    axios.post(`http://products.sold.co.id/get-unpaid-sales-order-specific-for-a-product?Product_Code=${product_id}&Customer_Code=${token}`)
    .then((res)=>{
        console.log(res.data)
        if(res.data){

    $('.groupbuy_sp').empty()
    $('.item_detail_sp').css('display','none')
    $('.groupbuy_sp').css('display','flex')
    $('.close-button').css('display','block')

    var option_payment
        axios.post(`http://paymntmthd.sold.co.id/get-all-payment-method`)
        .then((res)=>{          
            option_payment = res.data
             $('.groupbuy_sp').append(`
             <div class="group-left" >
                 <div class="groupbuy-form">
                     <div class="login-name">
                         <div class="box-name" >
                             <p>Kuantitas Permintaan</p>
                         </div>
                         <input type="text" class="name-form qty_groupbuy" placeholder="Kuantitas Permintaan" id="${product_id}">
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
                         <div class="btn-pesan" onclick="payment_groupbuy('${product_id}')">
                            <p>Pesan Sekarang!</p>
                            <img src="../img/home.png" alt="" class="icon-home">
                         </div>
                         <div class="box-total-price">
                                 <p>Total Price</p>
                                 <div class="total-price">
                                    <input type="text" disabled class="name-form total_price_iframe"  id="tp_sp">
                                
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
            
            axios.post(`http://products.sold.co.id/get-product-details?product_code=${product_id}`)
            .then((res)=>{
                // $('.modals-lk').attr('src',`../WEB/Iframe/groupbuy.html?groupbuy_id=${product_id}`)      
                console.log(res.data)

                option_payment.map((val,index)=>{
                    console.log(val.Payment_Method_Desc)
                    console.log(val.Payment_Method_Desc === 'BCA VA TRANSFER')
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
                    $('.option-alamat-gb').append(`
                        <option value="${res.data.Address_1}" id="alamat_gb">${res.data.Address_1}</option> 
                        <option value="${res.data.Address_2}" id="alamat_gb">${res.data.Address_2}</option> 
                        <option value="${res.data.Address_3}" id="alamat_gb">${res.data.Address_3}</option> 
                        <option value="${res.data.Address_4}" id="alamat_gb">${res.data.Address_4}</option> 
                        <option value="${res.data.Address_5}" id="alamat_gb">${res.data.Address_5}</option> 
                    `)
                 
                    
                 
                }).catch((err)=>{
                    console.log(err)
                })
                
            }).catch((err)=>{
                console.log(err)
            })
        
            }).catch((err)=>{
                console.log(err)
            })
            console.log(product_id)           
            
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
        console.log(err)
    })



}
const search_item=()=>{
    console.log('159 jalan search')

    var item_search = $('#search_item').val()
    var product_name = $('#search_item').attr('id')
    console.log(item_search)
    console.log(product_name)
    $('.active_search').css('top','575px')
    $('.main-body').css('display','none')
    $('.modals-search-result').css('display','block')
    $('.modals-search-result').attr('src',`./Iframe/searchingPage.html?searching=${item_search}`)
    
    
}




const render_searching_page=(product_name)=>{
    console.log(product_name)
    var data = product_name
    console.log(data)
    if(data){
        $('.sp_name').val(data)
    }else {
        $('.sp_name').val('All')
    }
    

    axios.post(`http://products.sold.co.id/get-product-details?product_name=${product_name}`)
    .then((res)=>{
        console.log(res.data)

        res.data.map((val,index)=>{
            var hargaAwal = parseInt(val.Sell_Price)
            var discount = parseInt(val.Sell_Price * 0.1)
            var hargaTotal = hargaAwal + discount
            $('.new-box-card').append(`
            <div class="card-item card_sp hvr-float-shadow">
                    <img src="${val.Picture_1}" alt="" class="img-card img_sp" onclick="get_product_detail_from_searching_page('${val.Product_Code}')">   
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
        console.log(err)
    })


    // axios.post(``)

   
}




const render_daftar_hutang=()=>{ // render utang untuk di card
    const token = localStorage.getItem('token')
    
    axios.post(`http://sales.sold.co.id/get-unpaid-sales-order-per-customer?Customer_Code=${token}`)
    .then((res)=>{
        console.log(res.data)
        res.data.map((val,index)=>{
            console.log(val)
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
        console.log(err)
    })

}


const detail_hutang_home=(order_number)=>{ // detail utang di home header
    // alert('function jalan')
    // $('.tableFixHead_ul_hutang').css('display','none')
    $('.tableFixHead_ul_detail_hutang').css('display','block')
    // $('#daftarHutangModal').modal('hide')
    // $('#ID_detail_hutang_modal').modal('show')
    console.log(order_number)
    axios.post(`http://sales.sold.co.id/get-unpaid-sales-order-per-customer?Order_Number=${order_number}`)
    .then((res)=>{
        console.log(res.data)
        $('.ref_code_detail_hutang').val(res.data.Customer_Code)
        $('.customer_name_hutang').val(res.data.Primary_Recipient_Name)

        res.data.map((val,index)=>{
            console.log(val)
            // $('.id_detail_hutang').append(`
            //     <div class="comm-1-list">
            //         <p>${val.sys_id}</p>
            //     </div>
            // `)
            $('.ul_detail_list_hutang').append(`
            <tr>
                <td><p class="limited-text-short">${val.Order_Number}</p></td>
                <td><p>RP.${val.Total_Price}</td>
                <td ><p>${val.Payment_Method}</p></td>
                <td ><p>${val.Shipping_Fee}</p></td>
                <td ><p>${val.Shipping_Address}</p></td>
                <td ><p style="word-break: break-all">${val.VA_Number}</p></td>  

            </tr>
            `)
            
        })

    }).catch((err)=>{
        console.log(err)
    })
}


const item_detail_for_hutang=(order_number)=>{ // detail utang dari card
    
    // alert('function jalan')
    // $('#daftarHutangModal').modal('hide')
    $('#ID_detail_hutang_modal').modal('show')
    axios.post(`http://sales.sold.co.id/get-unpaid-sales-order-per-customer?Order_Number=${order_number}`)
    .then((res)=>{
        $('.ref_code_detail_hutang').val(res.data.Customer_Code)
        $('.customer_name_hutang').val(res.data.Primary_Recipient_Name)

        res.data.map((val,index)=>{
            // $('.id_detail_hutang').append(`
            //     <div class="comm-1-list">
            //         <p>${val.sys_id}</p>
            //     </div>
            // `)
            $('.modals_item_detail_product').append(`
            <tr>
                <td><p class="limited-text">${val.Order_Number}</p></td>
                <td >
                    <p>RP.${val.Total_Price}
                </td>
                <td ><p>${val.Payment_Method}</p></td>
                <td ><p>${val.Shipping_Fee}</p></td>
                <td ><p style="word-break: break-all">${val.VA_Number}</p></td>
                
            </tr>
            `)
            
        })

    }).catch((err)=>{
        console.log(err)
    })

}