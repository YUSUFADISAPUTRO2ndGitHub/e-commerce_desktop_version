var allData = []

const getAllData2=()=>{
    // 
    
    axios.post('https://products.sold.co.id/get-product-details')
    .then((res)=>{
        allData = res.data
        // 
        // renderItemPromo()
        // renderItemPromoCard()
       
        // renderSubCategory('ADHESIVE')
        // renderItemBasedOnSubCategory('SEALANT')
    }).catch((err)=>{
        
    })
    }
    getAllData2()

