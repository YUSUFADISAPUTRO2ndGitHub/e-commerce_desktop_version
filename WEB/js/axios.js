// const axios = require('axios');

console.log('axios jalan')
var allData = []





const getAllData=()=>{
// console.log(dataRender)

axios.post('http://products.sold.co.id/get-product-details')
.then((res)=>{
    allData = res.data
    // console.log(res.data)
    renderItemPromo()
    renderItemNew()
    renderItemAll()
    filterCategory()
    renderCategory()
}).catch((err)=>{
    console.log(err)
})
}

// RENDER DATA HOME
const renderItemPromo=()=>{
    console.log(allData)

    allData.map((val,index)=>{
        var hargaAwal = parseInt(val.Sell_Price)
        var discount = parseInt(val.Sell_Price * 0.1)
        var hargaTotal = hargaAwal + discount
    //  console.log(hargaTotal)
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
    console.log(allData)

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
    console.log(allData)

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

const filterCategory=()=>{
    var dataAll = allData
    var category=[]
    // dataAll.map((val,index)=>{
    //     var data = val
    //    data.filter((filtering)=>{
    //          category.push(filtering.Category)
    //      })
        
    // })
    let allItem = dataAll.filter(function(category){
        return category.Category
    })
    console.log(allItem)

    console.log(dataAll, ' ini data All')
    console.log(category)
}


const renderCategory=()=>{
    var subCat = 'ADHESIVE'

    axios.post('http://products.sold.co.id/get-product-details?Get_ALL_Category=true')
    .then((res)=>{
        console.log(res.data)
        res.data.map((val,index)=>{
            $('.list-group').append(
                ` 
                <li class="list-group-item category-list get-item" val="${val.Category.toUpperCase()}">${val.Category.toUpperCase()}</li>
                `
                )
        })
    }).catch((err)=>{
        console.log(err)
    })


}


getAllData()
console.log(allData, 'line 44')