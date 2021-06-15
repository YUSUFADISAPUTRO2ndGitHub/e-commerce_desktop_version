// const qrcode = window.qrcode;

const video = document.createElement("video");
const canvasElement = document.getElementById("qr-canvas");
const canvas = canvasElement.getContext("2d");

const qrResult = document.getElementById("qr-result");
const outputData = document.getElementById("outputData");
const btnScanQR = document.getElementById("btn-scan-qr");

let scanning = false;

qrcode.callback = res => {
    if (res) {
        var audio = new Audio('../www/img/cashier_sound.mp3');
        audio.play();
        var result = res.split("/");
        var product_code = "";
        var i = 0;
        for(i= 0; i < result.length; i++){
            if(result[i].toUpperCase().includes(("kode Barang").toUpperCase())){
                var temp = result[i].split(":");
                product_code = temp[1].replace(/\D/g, "");
            }
        }
        if(product_code.length != 0 && (!isNaN(product_code))){
            getProductsWithProductNo("", "", product_code).done(function (response) {
                console.log(response);
                if(response != false){
                    $(".productPreview").css("display", "block");
                    $(".productPreview").attr("src", "./product_details.html?productid="+product_code+"&productName="+product_code);
                }else{
                    $(".productPreview").css("display", "none");
                }
            });
        }else{
            $(".productPreview").css("display", "none");
        }
        outputData.innerText = product_code;
        scanning = false;

        video.srcObject.getTracks().forEach(track => {
        track.stop();
        $(".helper-warning").toggle();
        });

        qrResult.hidden = false;
        canvasElement.hidden = true;
        btnScanQR.hidden = false;
    }
};

btnScanQR.onclick = () => {
    $(".helper-warning").toggle();
    swal.fire("Tolong pastikan Anda telah memberikan izin access untuk Kamera", "Setting terdapat di pengelolaan aplikasi ", "warning");
    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices
            .getUserMedia({ video: { facingMode: "environment" } })
            .then(function(stream) {
                scanning = true;
                qrResult.hidden = true;
                btnScanQR.hidden = true;
                canvasElement.hidden = false;
                video.setAttribute("playsinline", true); // required to tell iOS safari we don't want fullscreen
                video.srcObject = stream;
                video.play();
                tick();
                scan();
            });
    }
};

function tick() {
    canvasElement.height = video.videoHeight;
    canvasElement.width = video.videoWidth;
    canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);

    scanning && requestAnimationFrame(tick);
}

function scan() {
    try {
        qrcode.decode();
    } catch (e) {
        setTimeout(scan, 300);
    }
}

function checkItemCode(x){
    if($(x).val().length != 0 && (!isNaN($(x).val()))){
        getProductsWithProductNo("", "", $(x).val()).done(function (response) {
            if(response != false){
                $(".productPreview").css("display", "block");
                $(".productPreview").attr("src", "./product_details.html?productid="+$(x).val()+"&productName="+$(x).val());
            }else{
                $(".productPreview").css("display", "none");
            }
        });
    }else{
        $(".productPreview").css("display", "none");
    }
}

function addToCart(){
    var product = $("#outputData").html();
    if(product == null || product == undefined || product == ""){
        product = $("#product_code_manual").val();
    }
    if(localStorage.getItem("itemsInCart") === null){
            getProductsWithProductNo(response.access_token, response.session_id, product).done(function (response) {
                var productToBeAdded = {
                    productNo: response.Product_Code,
                    quantity: 1
                };
                var array = [];
                array.push(productToBeAdded);
    
                // saving to storage
                var productToBeAddedStringify = JSON.stringify(array);
                localStorage.setItem("itemsInCart", productToBeAddedStringify);
                console.log(localStorage.getItem("itemsInCart"));
    
                // add total item in cart
                localStorage.setItem("totalItemInCart", array.length);
            });
    }else{
        var cartToJson = JSON.parse(localStorage.getItem("itemsInCart"));
        console.log(cartToJson);
        var i = 0;
        var indicator = 0;
            getProductsWithProductNo(response.access_token, response.session_id, product).done(function (response) {
                for(i; i < cartToJson.length; i ++){
                    if(cartToJson[i].productNo == response.Product_Code){
                        cartToJson[i].quantity = parseInt(cartToJson[i].quantity) + 1;
                        indicator++;

                        // saving to storage
                        var productToBeAddedStringify = JSON.stringify(cartToJson);
                        localStorage.setItem("itemsInCart", productToBeAddedStringify);
                        console.log("bug " + localStorage.getItem("itemsInCart"));
                        break;
                    }
                }
                if(indicator == 0){
                    var productToBeAdded = {
                        productNo: response.Product_Code,
                        quantity: 1
                    };
                    cartToJson.push(productToBeAdded);

                    // saving to storage
                    var productToBeAddedStringify = JSON.stringify(cartToJson);
                    localStorage.setItem("itemsInCart", productToBeAddedStringify);
                    console.log(localStorage.getItem("itemsInCart"));
                }
                // add total item in cart
                localStorage.setItem("totalItemInCart", cartToJson.length);
            });
    }
    Swal.fire("Item Added", "have fun shopping!", "success");
}

function clearPopup(){
    $(".productPreview").css("display", "none");
}
