// alert('jalan')

const send_career=()=>{
    var first_name = $('#career_first_name').val()
    var last_name = $('#career_last_name').val()
    var email = $('#career_email').val()
    var primary_number = $('#career_primary_number').val()
    var secondary_number = $('#career_secondary_number').val()
    var skills = $('#career_skills').val()
    var self_summary = $('#career_self_summary').val()
    var title = $('.select_form_career option:selected').val()


    var new_array_career = {
        "email":email,
        "first_name":first_name,
        "last_name":last_name,
        "primary_number":primary_number,
        "seconday_number":secondary_number,
        "skills":skills,
        "self_summary":self_summary,
        "title":title
    }
    var parse_array = JSON.stringify(new_array_career)
    axios.get(`https://paymntmthd.sold.co.id/send/email?data_customer=${parse_array}`)
    .then((res)=>{
        
        console.log($('#career_first_name'))
        $('#career_first_name').val('')
        $('#career_last_name').val('')
        $('#career_email').val('')
        $('#career_primary_number').val('')
        $('#career_secondary_number').val('')
        $('#career_skills').val('')
        $('#career_self_summary').val('')
        if(res.data.sts === true){
            Swal.fire({
                html:`
                <div class="o-circle c-container__circle o-circle__sign--success">
                    <div class="o-circle__sign"></div>  
                </div>   
                Email Telah diterima
                `,
                timer:2000, 
            })
           
        }else {
            Swal.fire({
                html:`
                <div class="o-circle c-container__circle o-circle__sign--failure">
                    <div class="o-circle__sign"></div>  
                </div> 
                gagal, ada kesalahan`,
                timer:2000,
                
            })
        }
        console.log(res.data.msg)
        
    }).catch((err)=>{
        console.log(err)
    })

    
}

const send_mitra=()=>{
    var first_name = $('#mitra_first_name').val()
    var last_name = $('#mitra_last_name').val()
    var email = $('#mitra_email').val()
    var primary_number = $('#mitra_primary_number').val()
    var secondary_number = $('#mitra_secondary_number').val()
    var quotation = $('#mitra_quotation').val()
    var new_array_mitra = {
        "email":email,
        "first_name":first_name,
        "last_name":last_name,
        "primary_number":primary_number,
        "secondary_number":secondary_number,
        "quotation":quotation
    }
    var parseArray=JSON.stringify(new_array_mitra)
    
    console.log(parseArray)
    $('#mitra_first_name').val('')
    $('#mitra_last_name').val('')
    $('#mitra_email').val('')
    $('#mitra_primary_number').val('')
    $('#mitra_secondary_number').val('')
    $('#mitra_quotation').val()
    axios.get(`https://paymntmthd.sold.co.id/send/email/mitra?data_customer=${parseArray}`)
    .then((res)=>{
        if(res.data.msg !== false){
            Swal.fire({
                html:`
                <div class="o-circle c-container__circle o-circle__sign--success">
                    <div class="o-circle__sign"></div>  
                </div>   
                Email Telah diterima
                `,
                timer:2000, 
            })
           
        }else {
            Swal.fire({
                html:`
                <div class="o-circle c-container__circle o-circle__sign--failure">
                    <div class="o-circle__sign"></div>  
                </div> 
                gagal, ada kesalahan`,
                timer:2000,
                
            })
        }
    }).catch((err)=>{
        console.log(err)
    })
    console.log(array_career)
}