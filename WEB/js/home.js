function sign_up_request(){
    if ($( ".modal-backdrop" )[0]){
        console.log("here");
        $( ".modal-backdrop" ).remove();
    }
    $("#loginModal").css("display", "none");
}