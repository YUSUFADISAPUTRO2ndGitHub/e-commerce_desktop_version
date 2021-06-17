$(document).ready(function(){
    populateDeliveryTable();
});

var counter = 0;
function populateDeliveryTable(){
    console.log(localStorage.getItem("token"));
    getAllOrdersForThisCustomer(localStorage.getItem("token"), "").done(function (response) {
        console.log(response);
        if(response.length == 0){
            $(".loading-area").css("display", "none");
        }else{
            console.log(response);
            loadingMessage(response.length);
            var i = 0;
            $(".loading-area").css("display", "none");
            for(i ; i < response.length; i++){
                generateRowsDelivery(i, response[i]);
            }   
        }
    });
}

function generateRowsDelivery(i, datas){
    $("#table-delivery-order").append("<tr id=\"" + i + "\" class=\"body-table\">");
    $("#" + i).append("<td><div class=\"date-body-table\" onclick=\"orderDetailRequest(\'" + datas.Order_Number + "\')\">" + datas.Update_date + "</div></td>");
    $("#" + i).append("<td><div class=\"orderNum-body-table\" onclick=\"orderDetailRequest(\'" + datas.Order_Number + "\')\">" + datas.Order_Number + "</div></td>");
    $("#" + i).append("<td><div class=\"paymentterm-body-table\" onclick=\"orderDetailRequest(\'" + datas.Order_Number + "\')\">" + datas.Payment_Method + "</div></td>");
    if(datas.Status.toUpperCase() != 'cancelled'.toUpperCase()){
        $("#" + i).append("<td><div class=\"cancel-body-table\" onclick=\"cancelOrderRequest(\'" + datas.Order_Number + "\')\">Cancel</div></td>");
    }else{
        $("#" + i).append("<td><div class=\"cancel-body-table\">You've cancelled this order</div></td>");
    }
}

function orderDetailRequest(orderNumber){
    $(".loading-area").css("display", "table");
    getAllOrdersForThisCustomer("", orderNumber).done(function (response) {
            if(response.length == 0){
                $(".loading-area").css("display", "none");
            }else{
                console.log(response);
                loadingMessage(response.length);
                var i = 0;
                for(i ; i < response.length; i++){
                    if(response[i].Order_Number == orderNumber){
                        window.location.href = "./delivery.html?status=" + JSON.stringify(response[i]) + "&orderNumber=" + response[i].Order_Number;
                    }else{
                        $(".loading-area").css("display", "none");
                        Swal.fire("Data is not available at the moment", "Please try again later", "warning");
                    }
                }
            }
    });
}

function loadingMessage(timer){
    let timerInterval
    Swal.fire({
    title: 'Loading Your Request',
    html: '',
    timer: timer*1000,
    timerProgressBar: true,
    allowOutsideClick: false,
    didOpen: () => {
        Swal.showLoading()
        timerInterval = setInterval(() => {
        const content = Swal.getContent()
        }, 100)
    },
    willClose: () => {
        clearInterval(timerInterval)
    }
    }).then((result) => {
        /* Read more about handling dismissals below */
        if (result.dismiss === Swal.DismissReason.timer) {
            console.log('I was closed by the timer')
        }
    })
}

function cancelOrderRequest(orderNumber){
    cancelSalesOrder(orderNumber).done(function (response) {
        if(response){
            Swal.fire("Cancelled", "", "success");
        }else{
            Swal.fire("Failed", "", "warning");
        }
    });
}