$( document ).ready(function() {
    // category-list
    axios.post(`http://products.sold.co.id/get-product-details?Get_ALL_Category=true`)
    .then((res)=>{
        res.data.map((val,index)=>{
            console.log(val.Category);
            $('.category-list').append(
                `
                <li class="list-group-item" onclick="show_subcategory('${val.Category}')">${val.Category.toUpperCase()}</li>
                `
                )
            })
    }).catch((err)=>{
        console.log(err)
    })
});

function show_subcategory(choosen_parent_category){
    axios.post(`http://products.sold.co.id/get-product-details?Get_ALL_Sub_Category_Based_On_Category=${choosen_parent_category}`)
    .then((res)=>{
        console.log(res);
        // $('.box-list-kategori').css("display", "block")
        $('.box-list-kategori').toggle()
        $('.box-list-kategori').empty()
        res.data.map((val,index)=>{
            $('.box-list-kategori').append(
              `
                <div class="card-all-item" id="${val.Subcategory}" onclick="get_product_detail('${val.Subcategory}')">
                    <img src="${val.Picture_1}" alt="" class="img-all-card">   
                    <div class="card-all-item-list">
                        <p>${val.Subcategory}</p>
                    </div>
                </div>
                `
            )
        }) 
        
    }).catch((err)=>{
        console.log(err)
    })
}