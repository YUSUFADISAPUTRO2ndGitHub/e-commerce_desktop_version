$(document).ready(function(){
    getAllUnpaidOrdersForThisCustomer(localStorage.getItem("token"), "").done(function (response) {
        if(response.length != 0){
            Swal.fire({
                icon: 'warning',
                title: 'Kamu Memiliki pesanan yang belum dibayar',
                // text: 'Segera bayar pesanan Anda',
                footer: '<a href=\'./unpaidOrders.html\'>Click disini untuk memeriksa pesanan Anda yang belum dibayar</a>'
            })
        }
    });
});

function removeSpace( words ) {
    var fixedwords = words.toString().split(' ');
    var i = 0;
    var result = "";
    for(i ; i < fixedwords.length; i++){
        if(result.length > 1){
            result = result + "%20" + fixedwords[i];
        }else{
            result = result + fixedwords[i];
        }
    }
    return result;
}