const find_province_from_product_company=async(address)=>{
    console.log(address)
    return new Promise(async(resolve,reject)=>{
        // var itemsToCheckout = JSON.parse(localStorage.getItem('itemsToCheckout'))
        var all_province_from_storage = JSON.parse(localStorage.getItem('all_province_tiki'))
        var result_province = []
        var split_company = address.split(' ')
        var all_filter_province = []
        var all_result_arr =[]
        var sec_filter_province = []
        
        var filter_province =  all_province_from_storage.filter((item,id)=>{
            all_province_from_storage.forEach((value,index,arr)=>{ // allProduct from storage
                split_company.forEach((resp,ind,array)=>{  // alamat split by spasi
                    if(value.Province.toUpperCase().includes(resp.toUpperCase())){
                        var province_company = value.Province
                        all_filter_province.push(province_company)
                        const resultArr = all_filter_province.reduce((acc,item)=>{ // untuk ngapus data yg sama
                            if(!acc.includes(item)){
                                acc.push(item);
                            }
                            return acc;
                        },[])
                        all_result_arr = resultArr // hasil dari ngapus data yg sama
                    }
                })
            })
            if(all_result_arr.length == 1 ){
                resolve(all_result_arr[0])
            }else {
                // 
                for(var i=0; i<split_company.length; i++){
                    var minus_satu = split_company[i]
                    var plus_satu = split_company[i+1]
                    if(minus_satu === undefined || minus_satu === null){
                        minus_satu = ''
                    }else if (plus_satu === undefined || plus_satu === undefined){
                        plus_satu = ''
                    }
                    var new_alamat = minus_satu + plus_satu
                    all_result_arr.forEach((val,index)=>{
                        var province = val.split(' ').join('')
                        if(province.toUpperCase().includes(new_alamat.toUpperCase())){
                            sec_filter_province.push(val)
                            for(var i=1; i<split_company.length; i++){

                                var min_satu = split_company[i]
                                var plus_1 = split_company[i+1]
                                if(min_satu === undefined || min_satu === null){
                                    min_satu = ''
                                }else if (plus_1 === undefined || plus_1 === undefined){
                                    plus_1 = ''
                                }
                                var new_alamat2 = min_satu+plus_1
                                sec_filter_province.forEach((value,index)=>{
                                    var province = value.split(' ').join('')
                                    if(province.toUpperCase().includes(new_alamat2.toUpperCase())){
                                        // 
                                        resolve(value)      
                                    }
                                })
                            }        
                        }
                    })
                }
            }
        })
    })
}

const find_city_from_product_company=async(province,address)=>{
    console.log(province,address)
    return new Promise(async(resolve,reject)=>{
        // var itemsToCheckout = JSON.parse(localStorage.getItem('itemsToCheckout'))
        var all_city_from_storage = JSON.parse(localStorage.getItem('all_city_tiki'))
        var delete_coma = address.replace(/,/g, "");
        var split_company = delete_coma.split(' ')
        // 
        
        var arr_city = []
        var final_result_city=[]
        all_city_from_storage.forEach((value,index)=>{
            if(value.Province.toUpperCase().includes(province.toUpperCase())){
                value.City.forEach((val,id)=>{
                    split_company.forEach((res,index_sc)=>{
                        if(val.City.toUpperCase().includes(res.toUpperCase())){
                            arr_city.push(val.City)
                            resolve(val.City)
                        }
                    })
                })
            }
        })
        if(arr_city.length == 1){
            resolv(arr_city[0])
        }else {
            for(var i=1; i<split_company.length; i++){
                var normal_i = split_company[i]
                var plus_satu = split_company[i+1]
                var new_alamat = normal_i + ' ' + plus_satu
                if(normal_i === undefined || normal_i === null){
                    normal_i = ''
                }else if (plus_satu === undefined || plus_satu === null){
                    plus_satu = ''
                }
                arr_city.forEach((val,index)=>{
                    if(val.toUpperCase().includes(new_alamat.toUpperCase())){
                        // 
                        resolve(val)
                    }
                })
            }
            // 
        }
    })
}

const find_district_from_product_company=async(city,address)=>{
    return new Promise(async(resolve,reject)=>{
        var all_district_from_storage = JSON.parse(localStorage.getItem('all_district_tiki'))
        var split_company = address.split(' ')
        all_district_from_storage.forEach((value,index)=>{
            if(value.City.toUpperCase().includes(city.toUpperCase())){
                resolve(value.District[0])
            }
        })
    })
}

const find_courier_price_code_from_product_company=async(district,address)=>{
    return new Promise((resolve,reject)=>{
        // 
        get_all_subdistrict_from_courier('tiki','tiki',district.District).done(function(response){
            resolve(response[0].Courier_Price_Code)
        })
    })
}




// alert('find province jalan')