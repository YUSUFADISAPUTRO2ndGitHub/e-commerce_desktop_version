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

