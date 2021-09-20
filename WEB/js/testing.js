function getBase64Image(img) {
    
    var canvas = document.getElementById("myChart");  // <-- need to define canvas
    var ctx = canvas.getContext("2d");
    var parent = document.getElementById('parent');
    canvas.width = parent.offsetWidth;
    canvas.height = parent.offsetHeight;
    // var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 100, 100);
    var dataURL = canvas.toDataURL("image/png");
    console.log(dataUrl)
    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
  }

//   getBase64Image('http://image.vtintl.id/profile/upload/2021/09/08/bfea71cd-2ec0-407b-9a41-a897db6b1848.png')



  function response(e) {
    var urlCreator = window.URL || window.webkitURL;
    var imageUrl = urlCreator.createObjectURL(this.response);
    document.querySelector("#image").src = imageUrl;
 }

  var xhr = new XMLHttpRequest();
xhr.open("GET", "http://image.vtintl.id/profile/upload/2021/09/08/bfea71cd-2ec0-407b-9a41-a897db6b1848.png");
xhr.responseType = "blob";
xhr.onload = response;
xhr.send();


console.log(xhr)
