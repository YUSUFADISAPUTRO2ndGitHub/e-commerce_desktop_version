$(function(){
    

    // $('.carousel').carousel()

   $('.cust-1').on('click',function(){
       console.log('testing jalan')
    //    $('.box-information').css('display','block')
    $('.box-information').show(1000)
    // SEARCH ITEM BACK TO NORMAL
    $('.box-render-search').css('display','none')
    $('.input-name').css('border-bottom-left-radius','25px')
    $('.input-name').css('border-bottom-right-radius','25px')
    $('.input-name').val(null)
    //    $('.box-customer').toggle('active')
   })

   $('.icon-close').on('click',function(){
    // $('.box-information').css('display','none')
       $('.box-information').hide(1000)
       console.log('jalan box information')
   })
   

//    OPEN MODALS PROFILE
   $('.option-4').on('click',function(){
    
    // alert('function option-4 login modals')
    var token = localStorage.getItem('token')
    console.log(token)

        axios.post(`http://customers.sold.co.id/get-customer-information?Customer_Code=${token}`)
        .then((res)=>{
            // console.log(res.data,'line 33 option -4')
            var data_customer = res.data
            // console.log(data_customer)
            if(data_customer){
                console.log(data_customer)
                console.log(data_customer.Customer_Code)
                var tahun = data_customer.Birthday.slice(0,4)
                var bulan = data_customer.Birthday.slice(5,7)
                var hari = data_customer.Birthday.slice(8,10)
                $('#email_user').val(`${data_customer.Email}`)
                $('#tahun_lahir_user').val(tahun)
                $('#bulan_lahir_user').val(bulan)
                $('#tanggal_lahir_user').val(hari)
                $('#nama_depan_user').val(`${data_customer.First_Name}`)
                $('#nama_belakang_user').val(`${data_customer.Last_Name}`)
                $('#no_telp1_user').val(`${data_customer.Contact_Number_1}`)
                $('#no_telp2_user').val(`${data_customer.Contact_Number_2}`)
                $('#alamat_lengkap1_user').val(`${data_customer.Address_1}`)
                $('#alamat_lengkap2_user').val(`${data_customer.Address_2}`)
                $('#alamat_lengkap3_user').val(`${data_customer.Address_3}`)
                $('#alamat_lengkap4_user').val(`${data_customer.Address_4}`)
                $('#alamat_lengkap5_user').val(`${data_customer.Address_5}`)
                $('#rekening_user').val(`${data_customer.extra_column_1}`)
                $('#referral-profile').val(`${data_customer.extra_column_2}`)
                $('#no_ktp_user').val(`${data_customer.ktp}`)
                $('#profileModal').modal('show')
            }else {
                // alert('57 login modal show')
                $('#loginModal').modal('show')
            }
        }).catch((err)=>{
            console.log(err)
        })

        $('.closeByLogin').css('display','none')
        $('.option-1').removeClass("background_grey")
        $('.option-2').removeClass("background_grey")
        $('.option-3').removeClass("background_grey")
          // SEARCH ITEM BACK TO NORMAL
        $('.box-render-search').css('display','none')
        $('.input-name').css('border-bottom-left-radius','25px')
        $('.input-name').css('border-bottom-right-radius','25px')
        // $('.option-4').removeClass("background_grey")
        console.log('functioin selesai 74')
   })

   $('.category-name').on('click',function(){
        $('.closeByLogin').css('display','none')
        $('.option-1').removeClass("background_grey")
        $('.option-2').removeClass("background_grey")
        $('.option-3').removeClass("background_grey")
        
   })

    // $('#datepicker').datepicker({
    //     uiLibrary: 'bootstrap4',
    //     format:'dd-mm-yyy',
    //     onSelect: function() { 
            
    //         var dateObject = $(this).datepicker('getDate'); 
    //         console.log(dateObject)
    //     }
        
    // });


    // var searchItem = []
        $('.input-name').on('keyup', _.debounce(function () {
            console.log('hi');
            var value = $(this).val()
            if(value.length>2){
                console.log('masuk ke if')
                $('.box-render-search').css('display','block')
                $('.box-search-menu').css('display','block')
                $('.input-name').css('border-bottom-left-radius','0px')
                $('.input-name').css('border-bottom-right-radius','0px')
                $('.render-li-search').empty()
            //   console.log(allData)
                const searchString = value.toLowerCase()
                console.log(searchString)
                    const filterSearch = allData.filter((item)=>{
                        return (
                            item.Name.toLowerCase().includes(searchString) 
                        );
                    });
                    filterSearch.map((val,index)=>{
                        $('.render-li-search').append(
                            `
                                <li onclick="replace_value_to(this)">${val.Name}</li>
                            `
                        )
                    })
                    
                    console.log(filterSearch)
                    $('.closeByLogin').css('display','none')
                    $('.option-1').removeClass("background_grey")
                    $('.option-2').removeClass("background_grey")
                    $('.option-3').removeClass("background_grey")
                    $('.box-information').hide(1000)
                
            }else {
                // searchItem = null
            console.log('masuk ke if')
                $('.box-render-search').css('display','none')
                $('.input-name').css('border-bottom-left-radius','25px')
                $('.input-name').css('border-bottom-right-radius','25px')
            }

        }, 500));
      
    // });

    
   
})

function replace_value_to(x){
    // alert($(x).html());
    $(".input-name").val($(x).html());
}   

$('.icon-buy').on('click',function(){
    var product_id = $(this).val()
    console.log(product_id)
})

var data_cart = [
    {
        "productNo":"6900005030114",
        "quantity":1
    }
]
function addToCart(product_id){
    console.log(product_id)
    
        var dataParse = JSON.parse(localStorage.getItem("cart"))
        console.log(dataParse,' ini data parse')

    var dataStringify = JSON.stringify(data_cart)
    localStorage.setItem('cart',dataStringify)

    // console.log(dataFilter[0].quantity++)
    
    // var dataNew = (dataFilter[0].quantity +1)
    // console.log(dataNew)

    var filterData = dataStringify.filter((filtering)=>{

    })
    
    


    for(var i =0; i<data_cart.length; i++){
        if(data_cart[i].productNo === product_id){
            console.log(data_cart[i].quantity)
            data_cart[i].quantity = data_cart[i].quantity + 1
            break;
        }else {
            var dataPush = {
                "productNo":product_id,
                "quantity":1
            }
            data_cart.push(dataPush)
            console.log('masuk ke else')
            console.log(product_id,' 186')
            break;
        }
    }
    
    console.log(data_cart,' new data')

}