var number_of_chat = 0;

$(document).ready(function(){
    // customer chat
    getGroupBuyCurrentStatusDetails().done(function (response) {
        console.log(response);
        var i = 0;
        for(i = 0; i < response.length-1; i ++){
            $(".chat-options").append("<option>" + response[i].frequently_ask_question + "</option>");
        }
        $(".chat-options").append("<option selected>" + response[i++].frequently_ask_question + "</option>");
    });

    $("#send").click(function(){
        locally_append_customer_chat();
        getGroupBuyCurrentStatusDetails().done(function (response) {
            console.log(response);
            var i = 0;
            for(i = 0; i < response.length; i ++){
                if(response[i].frequently_ask_question == $(".chat-options").val()){
                    locally_append_customer_service_chat(response[i].answer);
                }
            }
        });
    });
});

function locally_append_customer_chat(){
    $(".list-group").append("<li class=\"list-group-item\" id=\"li-" + number_of_chat + "\">");
    $("#li-" + number_of_chat).append("<div class=\"card-body\" id=\"div-" + number_of_chat + "\">");
    $("#div-" + number_of_chat).append("<p class=\"card-text\" id=\"p-" + number_of_chat + "\">");
    $("#p-" + number_of_chat).append("<span class=\"customer\">" + $(".chat-options").val() + "</span>");
    $("#p-" + number_of_chat).append("<img src=\"../www/img/CATEGORY_ICONS/customer-service.png\" class=\"card-img-top\">");
    return number_of_chat++;
}

function locally_append_customer_service_chat(answer){
    $(".list-group").append("<li class=\"list-group-item align-left\" id=\"li-" + number_of_chat + "\">");
    $("#li-" + number_of_chat).append("<div class=\"card-body\" id=\"div-" + number_of_chat + "\">");
    $("#div-" + number_of_chat).append("<p class=\"card-text\" id=\"p-" + number_of_chat + "\">");
    $("#p-" + number_of_chat).append("<img src=\"../www/img/CATEGORY_ICONS/customer-service.png\" class=\"card-img-top\">");
    $("#p-" + number_of_chat).append("<span class=\"customer-service\">" + answer + "</span>");
    return number_of_chat++;
}