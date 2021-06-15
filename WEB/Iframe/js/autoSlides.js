var slideIndex = 1;
$(document).ready(function(){
    setInterval(function(){ 
        console.log(slideIndex);
        if(slideIndex == 0){
            $(".slides").css("display", "none");
            $("#image1").css("display", "block");
        }else if(slideIndex == 1){
            $(".slides").css("display", "none");
            $("#image2").css("display", "block");
        }else if(slideIndex == 2){
            $(".slides").css("display", "none");
            $("#image3").css("display", "block");
        }
        slideIndex++;
        if(slideIndex > 2){
            slideIndex = 0;
        }
    }, 3000);
});