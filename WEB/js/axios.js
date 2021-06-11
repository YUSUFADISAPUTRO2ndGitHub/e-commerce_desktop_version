// const axios = require('axios');

console.log('axios jalan')

const getAllData=()=>{

    axios.post('http://products.sold.co.id/get-product-details')
    .then((res)=>{
        console.log(res)
        res.data.map((val,index)=>{
            //  console.log(parseInt(val.Sell_Price + val.Sell_Price *0.1))
             var hargaAwal = parseInt(val.Sell_Price)
             var discount = parseInt(val.Sell_Price * 0.1)
             console.log(typeof discount)
             console.log(typeof hargaAwal)
             var hargaTotal = hargaAwal + discount
             console.log(hargaTotal)
            $('.box-render-item').append(
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
    }).catch((err)=>{
        console.log(err)
    })
}

getAllData()