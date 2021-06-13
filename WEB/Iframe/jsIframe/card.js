var allData = []

const getAllData2=()=>{
    // console.log(dataRender)
    
    axios.post('http://products.sold.co.id/get-product-details')
    .then((res)=>{
        allData = res.data
        // console.log(res.data)
        // renderItemPromo()
        // renderItemPromoCard()
       
        // renderSubCategory('ADHESIVE')
        // renderItemBasedOnSubCategory('SEALANT')
    }).catch((err)=>{
        console.log(err)
    })
    }
    getAllData2()


// const renderItemPromoCard=()=>{


//     allData.map((val,index)=>{
//         var hargaAwal = parseInt(val.Sell_Price)
//         var discount = parseInt(val.Sell_Price * 0.1)
//         var hargaTotal = hargaAwal + discount
//     //  console.log(hargaTotal)
//         $('.box-render-promo-2').append(
//         ` 
//             <div class="card-item">
//                 <img src="${val.Picture_1}" alt="" class="img-card">   
//                 <div class="card-item-list">
//                     <p>${val.Name}</p>
//                     <div class="split-item">
//                         <div class="item-price">
//                             <p>RP. ${hargaTotal}</p>
//                             <p>Rp. ${hargaAwal}</p>
//                         </div>
//                         <div class="buy-icon">
//                             <img src="./img/cart.png" alt="" class="icon-buy">
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             `
//         )
//     })
// }