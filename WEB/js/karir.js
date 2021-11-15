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

    var array_career =
    {
        first_name,last_name,email,primary_number,secondary_number
        ,skills,
        self_summary,
        title
    }
    console.log(array_career)

    
}

const send_mitra=()=>{
    var first_name = $('#mitra_first_name').val()
    var last_name = $('#mitra_last_name').val()
    var email = $('#mitra_email').val()
    var primary_number = $('#mitra_primary_number').val()
    var secondary_number = $('#mitra_secondary_number').val()
    var quotation = $('#mitra_quotation').val()
    var array_career =
    {
        first_name,last_name,email,primary_number,secondary_number,
        quotation
        
        
    }
    console.log(array_career)
}