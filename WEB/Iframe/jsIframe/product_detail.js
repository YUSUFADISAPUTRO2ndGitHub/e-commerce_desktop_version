$(document).ready(function () {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const render_from = urlParams.get("render_from");
  const item_category = urlParams.get("product_id");

  if (item_category != undefined) {
    if (render_from == "home") {
      // render_get_product_detail(item_category)
      render_product_detail_from_home(item_category);
    } else {
      render_product_detail_from_searching_page(item_category);
    }
  }

  console.log($('#gambar_zoom',' ini gambar zoom'))
  console.log($('.new-product-img-box'))
  $(".new-product-img-box")
  // tile mouse actions
  .on("mouseover", function() {
      console.log('mouse over active')
    $(this)
      .children("#gambar_zoom")
      .css({ transform: "scale(" + $(this).attr("data-scale") + ")" });
  })
  .on("mouseout", function() {
    $(this)
      .children("#gambar_zoom")
      .css({ transform: "scale(1)" });
  })
  .on("mousemove", function(e) {
    $(this)
      .children("#gambar_zoom")
      .css({
        "transform-origin":
          ((e.pageX - $(this).offset().left) / $(this).width()) * 100 +
          "% " +
          ((e.pageY - $(this).offset().top) / $(this).height()) * 100 +
          "%"
      });
  });
});



function replace_vtintl_to_sold_co_id(original_url) {
  var original_url = original_url
    .split("http://image.vtintl.id/")
    .join("https://image.sold.co.id/");
  return original_url;
}

function commafy(num) {
  if (num != undefined) {
    var str = num.toString().split(".");
    if (str[0].length >= 5) {
      str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, "$1,");
    }
    if (str[1] && str[1].length >= 5) {
      str[1] = str[1].replace(/(\d{3})/g, "$1 ");
    }
    return str.join(".");
  } else {
    return "0";
  }
}
function get_product_detail_func(product_id){
  var settings = {
      "url": `https://products.sold.co.id/get-product-details?product_code=${product_id}`,
      "method": "POST",
      "timeout": 0,
  };
  
  return $.ajax(settings);
}
const send_comment_cust_product = (product_id) => {
  var result_comment = $(".input-ulasan-npd").val();
  var token = localStorage.getItem("token");

  var data = {
    User_Comments: {
      Customer_Code: token,
      Comment: result_comment,
      Product_Code: product_id,
    },
  };

  if (result_comment.length > 0) {
    axios
      .post(
        `http://products.sold.co.id/get-product-details?product_code=${product_id}`
      )
      .then((res) => {
        var nama_company = res.data.PIC_company_name;
        axios
          .post(` https://products.sold.co.id/send_user_comment`, data, {
            headers: {
              "Content-Type": "application/json",
            },
            data: JSON.stringify({
              Customer_Code: data.User_Comments.Customer_Code,
              Comments: data.User_Comments.Comment,
              Product_Code: data.User_Comments.Product_Code,
            }),
          })
          .then((res) => {axios.post(`http://products.sold.co.id/get_user_comment?Product_Code=${product_id}`)
              .then((res) => {
                var cust_comment = res.data;
                var comment_parse = JSON.parse(cust_comment.User_Comments);
                var total_comment = comment_parse.length;
                $(".box-ulasan-detail").empty();
                $(".box-ulasan-detail").append(`
                    <p>SEMUA ULASAN(${total_comment})</p>
                `);

                comment_parse.map((val, index) => {
                  axios.post(`https://customers.sold.co.id/get-profile-image?Customer_Code=${val.Customer_Code}`)
                    .then((item) => {
                      var link_gambar = item.data;
                      if (item.data !== "undefined") {
                        axios.post(`https://customers.sold.co.id/get-customer-information?Customer_Code=${val.Customer_Code}`)
                          .then((res) => {
                            console.log(item);
                            if(res.data){
                              var data_for_render
                              var isCustomer_information = Array.isArray(res.data)
                              if(isCustomer_information) {
                                data_for_render = res.data[0]
                              }else {
                                data_for_render = res.data
              
                              }
                              $(".box-ulasan-detail").append(`
                                  <div class="box-item-ulasan">
                                      <div class="biu-left">
                                          <div class="biu-image">
                                              <img src="${link_gambar}" alt="">
                                          </div>
                                          <p>${data_for_render.First_Name} ${data_for_render.Last_Name}</p>
                                      </div>
                                      <div class="biu-right">
                                          <p>${val.Comment}</p>
                                          <div class="company-comment-box">
                                              <div class="ccb-image">
                                                  <img src="../img/vantsing_shipping_method.png" alt="">
                                              </div>
                                              <div class="ccb-isi-comment">
                                                  <div class="ccb-isi-comment-name">
                                                      <p>${nama_company}</p>
                                                      <div class="btn-penjual-ccb">
                                                          Penjual
                                                      </div>
                                                  </div>
                                                  <div class="ccb-thankyou">
                                                      Terima kasih telah berbelanja di ${data_for_render.PIC_company_name}. Bagikan link toko kami https://www.soldays.id kepada teman-teman Anda dan favoritkan Toko kami untuk terus update mengenai stok dan produk terbaru
                                                  </div>
                                              </div>
                                          </div>
                                      </div>
                                  </div> 
                              `);
                            }else {
                                Swal.fire({
                                    html:`
                                    <div class="o-circle c-container__circle o-circle__sign--failure">
                                        <div class="o-circle__sign"></div>  
                                    </div> 
                                    Silahkan Login`,
                                    timer:2000,
                                })
                                setTimeout(()=>{
                                  window.parent.location.reload()
                                    // window.parent.$('.iframe').css('display','none')
                                    // window.parent.$('.force-close-all-command').css('display','none')
                                },1500)
                                
                            }


                          })
                          .catch((err) => {});
                      } else {
                        axios.post(`https://customers.sold.co.id/get-customer-information?Customer_Code=${val.Customer_Code}`)
                          .then((res) => {
                            if(res.data){
                              var data_for_render
                              var isCustomer_information = Array.isArray(res.data)
                              if(isCustomer_information) {
                                data_for_render = res.data[0]
                              }else {
                                data_for_render = res.data
              
                              }
                              $(".box-ulasan-detail").append(`
                                  <div class="box-item-ulasan">
                                      <div class="biu-left">
                                          <div class="biu-image">
                                              <img src="../img/accounts.png" alt="">
                                          </div>
                                          <p>Anonymous</p>
                                      </div>
                                      <div class="biu-right">
                                          <p>${val.Comment}</p>
                                          <div class="company-comment-box">
                                              <div class="ccb-image">
                                                  <img src="../img/vantsing_shipping_method.png" alt="">
                                              </div>
                                              <div class="ccb-isi-comment">
                                                  <div class="ccb-isi-comment-name">
                                                      <p>${nama_company}</p>
                                                      <div class="btn-penjual-ccb">
                                                          Penjual
                                                      </div>
                                                  </div>
                                                  <div class="ccb-thankyou">
                                                      Terima kasih telah berbelanja di ${data_for_render.PIC_company_name}. Bagikan link toko kami https://www.soldays.id kepada teman-teman Anda dan favoritkan Toko kami untuk terus update mengenai stok dan produk terbaru
                                                  </div>
                                              </div>
                                          </div>
                                      </div>
                                  </div> 
                              `);
                           
                          }else {
                              Swal.fire({
                                  html:`
                                  <div class="o-circle c-container__circle o-circle__sign--failure">
                                      <div class="o-circle__sign"></div>  
                                  </div> 
                                  Silahkan Login`,
                                  timer:2000,
                              })
                              setTimeout(()=>{
                                window.parent.location.reload()
                                  // window.parent.$('.iframe').css('display','none')
                                  // window.parent.$('.force-close-all-command').css('display','none')
                              },1500)
                              
                          }

                          })
                          .catch((err) => {});
                      }
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                });
                $(".input-ulasan-npd").val("");
              })
              .catch((err) => {});
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

const open_input_modals_mobile=(product_id)=>{
    // tambah_product_ke_cart('${product_id}')
    // $('.npd-right-mobile').css('height','200px')
    $('.npd-right-mobile').animate({
        height:'160px'
    },500)
    $('.mobile-left-footer-4').animate({
        width:'90%'
    },500)
    $('.mobile-left-footer-2').css('display','none')
    $('.mobile-left-footer-3').css('display','none')
    $('.mobile-left-footer-4').css('display','flex')
    $('.mobile-close-box').css('display','flex')
    setTimeout(()=>{
        $('.input-box-mobile').css('display','flex')
    })
}
const close_input_modals_mobile =()=>{
    $('.npd-right-mobile').animate({
        height:'100px'
    },500)
    $('.mobile-left-footer-4').animate({
        width:'40%'
    },500)
    $('.mobile-left-footer-2').css('display','flex')
    $('.mobile-left-footer-3').css('display','flex')
    $('.mobile-left-footer-4').css('display','none')
    $('.mobile-close-box').css('display','none')
    setTimeout(()=>{
        $('.input-box-mobile').css('display','none')
    })
}
const minus_btn_mobile_product=()=>{
    var hasil = parseInt($('.input_result_mp').val())
    console.log(hasil)
    if(hasil === 1 || hasil <1  ){
        $('#minus_btn_mobile_product').prop('disabled',true)
        $('.icon_minus_mobile_product').css('color','#dedede')
    }else {
        $('#minus_btn_mobile_product').removeAttr('disabled')
        $('.icon_minus_mobile_product').css('color','black')
        var hitung = hasil - 1
        $('.input_result_mp').val(hitung)
    }
}
const plus_btn_mobile_product=(max_qty)=>{
    var hasil = parseInt($('.input_result_mp').val())
    console.log(hasil,max_qty)
    if(hasil > 0  && hasil < max_qty ){
        $('#plus_btn_mobile_product').removeAttr('disabled')
        $('.icon_plus_mobile_product').css('color','black')
        $('.icon_minus_mobile_product').css('color','black')
        var hitung = hasil +1
        $('.input_result_mp').val(hitung)
    }else {
        $('#plus_btn_mobile_product').prop('disabled',true)
        $('.icon_plus_mobile_product').css('color','#dedede')
    }
}

function addToCart(product_id, qty) {
  axios.post(`https://products.sold.co.id/get-product-details?product_code=${product_id}`)
    .then((res) => {
      var quantity_product = parseInt(res.data.Stock_Quantity);

      if (
        quantity_product == 0 ||
        quantity_product == "0" ||
        quantity_product == undefined ||
        quantity_product == null ||
        isNaN(quantity_product) ||
        quantity_product < 0
      ) {
        // Swal.fire("Stock Tidak Tersedia", "Error", "error");
        Swal.fire({
          html: `
                <div class="o-circle c-container__circle o-circle__sign--failure">
                    <div class="o-circle__sign"></div>  
                </div> 
                Stock Tidak Tersedia`,
          timer: 2000,
        });
      } else {
        var dataParse = JSON.parse(localStorage.getItem("itemsInCart"));

        if (dataParse) {
          var filterdatakosong = dataParse.filter((filtering) => {
            if (filtering.productNo === product_id) {
              return filtering;
            }
          });
          if (filterdatakosong.length) {
            var objIndex = dataParse.findIndex(
              (obj) => obj.productNo == product_id
            );
            dataParse[objIndex].quantity = dataParse[objIndex].quantity + 1;
            $(".cart-counter").text(dataParse.length);
            // swal.fire("Berhasil Menambahkan Quantity", "", "success");
            Swal.fire({
              html: `
                        <div class="o-circle c-container__circle o-circle__sign--success">
                            <div class="o-circle__sign"></div>  
                        </div>   
                        Berhasil Menambahkan Quantity
                        `,
              timer: 2000,
            });
            close_input_modals_mobile()
          } else {
            var data = {
              productNo: product_id,
              quantity: qty,
              company_address: res.data.PIC_company_address,
              weight_kg: res.data.Weight_KG,
              product_name: res.data.Name,
            };
            dataParse.push(data);
            $(".cart-counter").text(dataParse.length);
            // swal.fire("Berhasil Menambahkan ke Cart", "", "success");
            Swal.fire({
              html: `
                        <div class="o-circle c-container__circle o-circle__sign--success">
                            <div class="o-circle__sign"></div>  
                        </div>   
                        Berhasil Menambahkan ke Cart
                        `,
              timer: 2000,
            });
            close_input_modals_mobile()
          }

          var pushToStorage = JSON.stringify(dataParse);

          localStorage.setItem("itemsInCart", pushToStorage);
        } else {
          var cart = [
            {
              productNo: product_id,
              quantity: qty,
              company_address: res.data.PIC_company_address,
              weight_kg: res.data.Weight_KG,
              product_name: res.data.Name,
            },
          ];
          var pushToStorage2 = JSON.stringify(cart);

          localStorage.setItem("itemsInCart", pushToStorage2);
          Swal.fire({
            html: `
                    <div class="o-circle c-container__circle o-circle__sign--success">
                        <div class="o-circle__sign"></div>  
                    </div>   
                    Berhasil Menambahkan ke Cart
                    `,
            timer: 2000,
          });
          close_input_modals_mobile()
        }
      }
    })
    .catch((err) => {});
}
const kurang_qty_product = (max_qty, price) => {
  console.log(max_qty);
  var qty_now = $(".input-qty-product-detail").val();

  console.log(qty_now, " ini qty now");
  if (qty_now === 0 || qty_now < 0 || qty_now == -1) {
  } else if (qty_now > 0) {
    console.log();
    var qty_minus = qty_now - 1;
    $(".box_for_total").html(qty_minus);
    $(".input-qty-product-detail").val(qty_minus);
    var harga = parseInt(price) * parseInt(qty_minus);
    $(".sub-total-box-product").empty();
    $(".sub-total-box-product").append(`
            <p>Subtotal</p>
            <p>${commafy(harga)}</p>
        `);
  }
};
const tambah_qty_product = (max_qty, price) => {
  console.log(max_qty);
  var qty_now = parseInt($(".input-qty-product-detail").val());

  // alert(harga)
  console.log(qty_now);
  var max_qty_product = parseInt(max_qty);

  if (qty_now > max_qty_product) {
    console.log(qty_now, "133");
    $(".box_for_total").html(max_qty_product);
    $(".input-qty-product-detail").val(max_qty_product);
  } else if (qty_now > 0 && qty_now < max_qty_product) {
    var qty_plus = qty_now + 1;
    $(".box_for_total").html(qty_plus);
    $(".input-qty-product-detail").val(qty_plus);
    var harga = qty_plus * parseInt(price);
    $(".sub-total-box-product").empty();
    $(".sub-total-box-product").append(`
            <p>Subtotal</p>
            <p>${commafy(harga)}</p>
        `);
  } else if (qty_now === 0) {
    var qty_plus = qty_now + 1;
    $(".box_for_total").html(qty_plus);
    $(".input-qty-product-detail").val(qty_plus);
    var harga = qty_plus * parseInt(price);
    $(".sub-total-box-product").empty();
    $(".sub-total-box-product").append(`
            <p>Subtotal</p>
            <p>${commafy(harga)}</p>
        `);
  } else {
    console.log("masuk ke else");
  }
};

const hitung_biaya_product = (product_id, price, total_qty) => {
  console.log(product_id, price, total_qty);
  var qty_from_customer = parseInt($(".input-qty-product-detail").val());
  console.log(qty_from_customer);
  var harga = parseInt(price) * parseInt(qty_from_customer);
  // console.log(parseInt(price),parseInt(total_qty))
  var isNan = isNaN(qty_from_customer);
  console.log(isNan);

  if (qty_from_customer < 1) {
    $(".input-qty-product-detail").val(1);
    qty_from_customer = 1;
    $(".box_for_total").html(qty_from_customer);
  }

  if (qty_from_customer == "" || qty_from_customer == 0 || isNan === true) {
    $(".npd-right-box-qty").css("height", "350px");
    $(".total-qty-right").css("height", "50px");
    $(".tqr-bottom").css("display", "none");
    $("#total-harga-p").css("color", "#d6dbe2");
    $(".down-product-detail-2").css("color", "#d6dbe2");
    $(".down-product-detail-2").css("transform", "rotate(180deg)");
    $("#tambah-cart-product").prop("disabled", true);
    $("#tambah-cart-product").addClass("disabled-btn");
    $("#beli-now-product").prop("disabled", true);
    $("#beli-now-product").addClass("disabled-btn");
    $("#beli-groupbuy-product").prop("disabled", true);
    $("#beli-groupbuy-product").addClass("disabled-btn");
  } else {
    // isi lebih dari 1
    $(".npd-right-box-qty").css("height", "500px");
    $(".total-qty-right").css("height", "200px");
    $(".tqr-bottom").css("display", "block");
    $("#total-harga-p").css("color", "black");
    $(".down-product-detail-2").css("color", "black");
    $(".down-product-detail-2").css("transform", "rotate(180deg)");
    $(".box_for_total").html(qty_from_customer);

    $("#tambah-cart-product").removeAttr("disabled");
    $("#tambah-cart-product").removeClass("disabled-btn");
    $("#beli-now-product").removeAttr("disabled");
    $("#beli-now-product").removeClass("disabled-btn");
    $("#beli-groupbuy-product").removeAttr("disabled");
    $("#beli-groupbuy-product").removeClass("disabled-btn");
    $(".sub-total-box-product").empty();
    $(".sub-total-box-product").append(`
            <p>Subtotal</p>
            <p>${commafy(harga)}</p>
        `);
    console.log($(".total-qty-right"));
  }
};
function close_all_open_window_product(){
   window.parent.location.reload()  
}
function close_all_open_window_product_detail(){
    $('.new-box-category .list-group .get-item').removeClass('active-cl')
    $(".force-close-all-command").css("display", "none");
    $('.option-0').removeClass("background_grey");
    $('.option-1').removeClass("background_grey");
    $('.option-2').removeClass("background_grey");
    $('.option-3').removeClass("background_grey");
    $('.option-4').removeClass("background_grey");
    $('.option-5').removeClass("background_grey");
    $('.box-delete-success').css('display','none')

    $(".force-close-all-command",window.parent.parent.document).css("display", "none");
    $('.option-0',window.parent.parent.document).removeClass("background_grey");
    $('.option-1',window.parent.parent.document).removeClass("background_grey");
    $('.option-2',window.parent.parent.document).removeClass("background_grey");
    $('.option-3',window.parent.parent.document).removeClass("background_grey");
    $('.option-4',window.parent.parent.document).removeClass("background_grey");
    $('.option-5',window.parent.parent.document).removeClass("background_grey");
    $('.box-delete-success',window.parent.parent.document).css('display','none')    
}
function back_to_home(){
    $('.box-product').css('display','flex')
    $(".force-close-all-command-2").css("display", "none");
    $('.main-body').css('display','block')
    $('.box_mail_chimp').css('display','block')
    $('.active_search').css('top','0px')
    $('#newloginTokpedModal').modal('hide')
    window.parent.$('.box-product').css('display','flex')
    window.parent.$('.main-body').css('display','block')
    window.parent.$('.box_mail_chimp').css('display','block')
    window.parent.$('.force-close-all-command-2').css('display','none')

}
const open_category_home_from_product_detail=()=>{
    back_to_home()
    window.parent.$('.new-box-category').toggle(500)
    
    $('.list-group-item').removeClass('active-cl')
    close_all_open_window_product_detail()
    $('.dropdown .dropdown-toggle').removeClass('show')
    $('.dropdown .dropdown_menu_mobile').removeClass('show')
    
    console.log($('.dropdown .dropdown-toggle'))
  }
const render_product_detail_from_home = async (item_category) => {
    
  var product_id = item_category;
//   console.log(product_id)
  Swal.fire({
    title: "Please Wait",
    html: ` 
         <div class="boxcon">
            <div class="box1">
            </div>
            <div id="sold-id-loading">
            SOLDAYS 
            </div>
                
            <div class="box2">
            </div>
        </div>
        `,
    timer: 30000000,
    timerProgressBar: true,
    didOpen: async () => {
      axios.post(`https://products.sold.co.id/get-product-details?product_code=${item_category}`)
      .then(async (res) => {
          
          
          var detail_product_item = res.data;
          
          var product_id_pilihan = product_id;
          let allDataProduct = [];
          var all_filter_product = [];
          var allData_storage = JSON.parse(
            localStorage.getItem("all_data_product")
          );
          var all_province_from_storage = JSON.parse(localStorage.getItem('all_province_tiki'))
          console.log(all_province_from_storage,'614', all_province_from_storage != null)
          // alldata_storage != undefined, gue rubah jadi == biar masuk ke else
          if (allData_storage != undefined && allData_storage.length != 0 && all_province_from_storage != null) {
            var data_for_render = allData_storage.filter((val, index) => {
              if (val.Product_Code == product_id) {
                return val;
              }
            });

            var data_similar = allData_storage.filter((val,index)=>{
                if(val.Subcategory == res.data.Subcategory){
                    return val
                }
            })
            // console.log(data_similar, ' ini data similar')
            var split_product = data_for_render[0].Name.split(" ");
            var all_filter_product = [];

            split_product.forEach((val, index) => {
              allData_storage.filter((item, index) => {
                if (item.Name.includes(val)) {
                  all_filter_product.push(item);
                }
              });
            });
            var img_1 = "";
            var img_2 = "";
            var img_3 = "";

            var hargaAwal = parseInt(data_for_render[0].Sell_Price);
            var discount = parseInt(data_for_render[0].Sell_Price * 0.1);
            var hargaTotal = hargaAwal + discount;
            $(".container-product").empty();
            console.log(detail_product_item.PIC_company_address)
            var province_company_from_product = await find_province_from_product_company(detail_product_item.PIC_company_address);
            console.log(province_company_from_product);
            if (data_for_render[0].GroupBuy_Purchase == "false") {
              console.log("masuk ke if ");
              $(".container-product").append(
                // render untuk bukan groupbuy
                `
                    <div class="breadcrumb_product_detail"> 
                        <nav aria-label="breadcrumb" class="bread-detail">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item" onclick="close_all_open_window_product()"><a >Home</a></li>
                                <li class="breadcrumb-item" onclick="open_category_home_from_product_detail()"><a>Category</a></li>
                                <li class="breadcrumb-item active limited-text-short-breadcrumb" aria-current="page">${data_for_render[0].Name}</li>
                            </ol>
                        </nav>
                    </div>
                    <div class="new-product-detail-box"> 
                        <div class="npd-left">
                            <div class="product-detail-isi">
                                <div class="npdl-left">
                                    <div class="new-product-img-box" data-scale="1.6">
                                        <img id="gambar_zoom" src="${replace_vtintl_to_sold_co_id(data_for_render[0].Picture_1)}" alt="">
                                    </div>
                                    <div class="new-product-video-box">
                                    </div>
                                    <div class="new-product-small-img-box">
                                        <div class="small-product-img active-small-img" id="gambar_id_1" onclick="ganti_gambar_product('${data_for_render[0].Picture_1}', 'gambar','gambar_id_1')">
                                            <img src="${replace_vtintl_to_sold_co_id(data_for_render[0].Picture_1)}" alt="">
                                        </div>
                                    </div>
                                </div>   
                                <div class="npdl-right">
                                    <div class="npd-left-product-name">
                                        <p>${data_for_render[0].Name}</p>
                                    </div>
                                    <div class="npd-left-product-price">
                                        <p>RP.${commafy(data_for_render[0].Sell_Price)}</p>
                                    </div>
                                    <div class="npdl-right-detail-product">
                                        <nav>
                                            <div class="nav nav-tabs" id="nav-tab" role="tablist">
                                                <button class="nav-link active" id="nav-detail-tab" data-bs-toggle="tab" data-bs-target="#nav-content-detail" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Detail</button>
                                                <button class="nav-link" id="nav-info-tab" data-bs-toggle="tab" data-bs-target="#nav-content-info" type="button" role="tab" aria-controls="nav-spec" aria-selected="true">Info Penting</button>
                                            </div>
                                        </nav>
                                        <div class="tab-content new-tab-content" id="nav-tabContent">
                                            <div class="tab-pane fade show active" id="nav-content-detail" role="tabpanel" aria-labelledby="nav-home-tab">
                                                <p>Kondisi : <span>Baru</span> </p>
                                                <p>Berat : <span>${data_for_render[0].Weight_KG} KG</span> </p>
                                                <p>Kategori : <span id="kategori-product-detail-pd">${data_for_render[0].Category}</span></p>
                                                <div class="deskripsi-new-product-detail">
                                                    ${data_for_render[0].Description}
                                                    ${data_for_render[0].Specification}     
                                                </div>
                                            </div>
                                            <div class="tab-pane fade" id="nav-content-info" role="tabpanel" aria-labelledby="nav-spec-tab">
                                                <div class="info-penting-box-pengembalian">
                                                    <p>Kebijakan Pengembalian Produk</p>
                                                    <p>Silahkan Hubungi Customer Service Soldays</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>  
                                </div>
                            </div>
                            <div class="box-company-detail">
                                <div class="bcd-left">
                                    <div class="ins-bcd-left">
                                        <div class="bcd-image">
                                            <img src="../img/vantsing_shipping_method.png" alt="">
                                        </div>
                                        <div class="bcd-name">
                                            <i class="fas fa-check-circle"></i>
                                            <p>${
                                                detail_product_item.PIC_company_name
                                            }</p>
                                        </div>
                                    </div>   
                                </div>
                                <div class="bcd-right">
                                    <div class="ins-detail-left">
                                        <p>Pengiriman</p>
                                        <div class="dikirim-dari">
                                            <i class="fas fa-map-marker-alt"></i>
                                            <p>Dikirim dari <span>${province_company_from_product}</span></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="box-ulasan-detail">
                                
                            </div>
                            <div class="box-input-ulasan">
                                <p>Masukan Ulasan</p>
                                <input type="text" maxlength="100" class="input-ulasan-npd">
                                <div class="btn-upload-ulasan" onclick="send_comment_cust_product('3000000')">
                                    Masukan
                                </div>
                            </div>
                            <div class="box-similar-product"> 
                                
                            </div>
                        </div>

                        <div class="npd-right-mobile">
                            <div class="mobile-close-box">
                                <i class="fas fa-times btn_close_mobile_product" onclick="close_input_modals_mobile()"></i>
                            </div>
                            <div class="input-box-mobile"> 
                                <p>Jumlah </p>
                                <div class="box-for-input-mobile">
                                    <div class="box-minus-input-mobile" id="minus_btn_mobile_product" onclick="minus_btn_mobile_product()">
                                        <i class="fas fa-minus icon_minus_mobile_product"></i>
                                    </div>
                                    <div class="box-result-input-mobile" id="result_btn_mobile_product">
                                        <input type="number" value="1" class="input_result_mobile_product input_result_mp"/>
                                    </div>
                                    <div class="box-minus-input-mobile" id="plus_btn_mobile_product" onclick="plus_btn_mobile_product('${data_for_render[0].Stock_Quantity}')">
                                        <i class="fas fa-plus icon_plus_mobile_product" ></i>
                                    </div>
                                </div>
                            </div>
                            <div class="ins-npd-right-mobile">
                                
                                <div class="mobile-left-footer-1"> 
                                    <a href="https://wa.me/+6281393736797/?text=Saya ingin konsultasi" target="_blank" style="text-decoration:none"> 
                                        <img src="/WEB/marketplace/wa.png" alt="">
                                    </a>
                                </div>
                                <div class="mobile-left-footer-2" onclick="beli_product_sekarang('${product_id}')"> 
                                    <p>Beli</p>
                                </div>
                                <div class="mobile-left-footer-3" onclick="open_input_modals_mobile('${product_id}')"> 
                                    <p> + Keranjang </p>
                                </div>
                                <div class="mobile-left-footer-4" onclick="tambah_product_ke_cart('${product_id}')"> 
                                    <p> + Keranjang </p>
                                </div>

                            </div>
                        </div>
                        
                        <div class="npd-right">
                            <div class="npd-right-box-qty">
                                <div class="qty-top-right">
                                    <div class="box-qty-right-pd">
                                        <p>Masukan Quantity</p>
                                        <p>Quantity:1 Pcs</p>
                                    </div>
                                    <i class="fas fa-chevron-down down-product-detail"></i>
                                </div>
                                <input type="number" class="input-qty-product-detail input_result_mp" onchange="hitung_biaya_product('${product_id}','${data_for_render[0].Sell_Price}','${data_for_render[0].Stock_Quantity}')">
                                <div class="total-qty-right">
                                    <div class="tqr-top">
                                        <p id="total-harga-p">Total Harga dan quantity</p>
                                        <i class="fas fa-chevron-down down-product-detail-2" ></i>
                                    </div>
                                    <div class="tqr-bottom">
                                        <div class="new-box-qty-top">
                                            <div class="total-qty-cust">
                                                <i class="fas fa-minus" onclick="kurang_qty_product('${
                                                    data_for_render[0]
                                                    .Stock_Quantity
                                                }','${parseInt(data_for_render[0].Sell_Price)}')"></i>
                                                <div class="box_for_total">
                                                    1
                                                </div>
                                                <i class="fas fa-plus" onclick="tambah_qty_product('${
                                                    data_for_render[0]
                                                    .Stock_Quantity
                                                }','${parseInt(data_for_render[0].Sell_Price)}')"></i>
                                            </div>
                                            <p>Stok <span>${
                                                data_for_render[0]
                                                .Stock_Quantity
                                            }</span> </p>
                                        </div>
                                        <div class="sub-total-box-product">
                                            <p>Subtotal</p>
                                            <p>Rp10.000</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="btn-tambah-cart disabled-btn" id="tambah-cart-product" onclick="tambah_product_ke_cart('${product_id}')">
                                    <p>+ Keranjang</p>
                                </div>
                                <div class="btn-beli-cart disabled-btn" id="beli-now-product" onclick="beli_product_sekarang('${product_id}')">
                                    <p>Beli</p>
                                </div>
                                <div class="npd-contact">
                                    <div class="box-icon-product-contact">
                                        <i class="fas fa-comment-alt"></i>
                                        Chat
                                    </div>
                                    <div class="box-icon-product-contact">
                                        <i class="fas fa-heart"></i>
                                        Wishlist
                                    </div>
                                    <div class="box-icon-product-contact-2">
                                        <i class="fas fa-share-alt"></i>
                                        Share
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                 `
              );
            } else {
              //render untuk groupbuy
              console.log("masuk ke else");
              $(".container-product").append(`
                <div class="new-product-detail-box">
                    <nav aria-label="breadcrumb" class="bread-detail">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item" onclick="close_all_open_window_product()"><a >Home</a></li>
                            <li class="breadcrumb-item" onclick="open_category_home_from_product_detail()"><a >Category</a></li>
                            <li class="breadcrumb-item active limited-text-short-breadcrumb" aria-current="page">${data_for_render[0].Name}</li>
                        </ol>
                    </nav>
                    <div class="npd-left">
                        <div class="product-detail-isi">
                            <div class="npdl-left">
                                <div class="new-product-img-box" data-scale="1.6">
                                    <img  id="gambar_zoom" src="${replace_vtintl_to_sold_co_id(
                                        data_for_render[0]
                                        .Picture_1
                                    )}" alt="">
                                </div>
                                <div class="new-product-video-box">
                                </div>
                                <div class="new-product-small-img-box">
                                    <div class="small-product-img active-small-img" id="gambar_id_1" onclick="ganti_gambar_product('${
                                        data_for_render[0]
                                        .Picture_1
                                    }', 'gambar','gambar_id_1')">
                                        <img src="${replace_vtintl_to_sold_co_id(
                                            data_for_render[0]
                                            .Picture_1
                                        )}" alt="">
                                    </div>
                                </div>
                            </div>   
                            <div class="npdl-right">
                                <div class="npd-left-product-name">
                                    <p>${
                                        data_for_render[0].Name
                                    }</p>
                                </div>
                                <div class="npd-left-product-price">
                                    <p>RP.${commafy(
                                        data_for_render[0]
                                        .Sell_Price
                                    )}</p>
                                </div>
                                <div class="npdl-right-detail-product">
                                    <nav>
                                        <div class="nav nav-tabs" id="nav-tab" role="tablist">
                                            <button class="nav-link active" id="nav-detail-tab" data-bs-toggle="tab" data-bs-target="#nav-content-detail" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Detail</button>
                                            <button class="nav-link" id="nav-info-tab" data-bs-toggle="tab" data-bs-target="#nav-content-info" type="button" role="tab" aria-controls="nav-spec" aria-selected="true">Info Penting</button>
                                        </div>
                                    </nav>
                                    <div class="tab-content new-tab-content" id="nav-tabContent">
                                        <div class="tab-pane fade show active" id="nav-content-detail" role="tabpanel" aria-labelledby="nav-home-tab">
                                            <p>Kondisi : <span>Baru</span> </p>
                                            <p>Berat : <span>${
                                                data_for_render[0]
                                                .Weight_KG
                                            } KG</span> </p>
                                            <p>Kategori : <span id="kategori-product-detail-pd">${
                                                data_for_render[0]
                                                .Category
                                            }</span></p>
                                            <div class="deskripsi-new-product-detail">
                                                ${
                                                    data_for_render[0]
                                                    .Description
                                                }
                                                ${
                                                    data_for_render[0]
                                                    .Specification
                                                }     
                                            </div>
                                        </div>
                                        <div class="tab-pane fade" id="nav-content-info" role="tabpanel" aria-labelledby="nav-spec-tab">
                                            <div class="info-penting-box-pengembalian">
                                                <p>Kebijakan Pengembalian Produk</p>
                                                <p>Silahkan Hubungi Customer Service Soldays</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>  
                            </div>
                        </div>
                        <div class="box-company-detail">
                            <div class="bcd-left">
                                <div class="ins-bcd-left">
                                    <div class="bcd-image">
                                        <img src="../img/vantsing_shipping_method.png" alt="">
                                    </div>
                                    <div class="bcd-name">
                                        <i class="fas fa-check-circle"></i>
                                        <p>${
                                            detail_product_item.PIC_company_name
                                        }</p>
                                    </div>
                                </div>   
                            </div>
                            <div class="bcd-right">
                                <div class="ins-detail-left">
                                    <p>Pengiriman</p>
                                    <div class="dikirim-dari">
                                        <i class="fas fa-map-marker-alt"></i>
                                        <p>Dikirim dari <span>${province_company_from_product}</span></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="box-ulasan-detail">
                            
                        </div>
                        <div class="box-input-ulasan">
                            <p>Masukan Ulasan</p>
                            <input type="text" maxlength="100" class="input-ulasan-npd">
                            <div class="btn-upload-ulasan" onclick="send_comment_cust_product('${product_id}')">
                                Masukan
                            </div>
                        </div>
                        <div class="box-similar-product"> 
                        
                        </div>
                    </div>
                    <div class="npd-right-mobile">
                        <div class="mobile-close-box">
                            <i class="fas fa-times btn_close_mobile_product" onclick="close_input_modals_mobile()"></i>
                        </div>
                        <div class="input-box-mobile"> 
                            <p>Jumlah </p>
                            <div class="box-for-input-mobile">
                                <div class="box-minus-input-mobile" id="minus_btn_mobile_product" onclick="minus_btn_mobile_product()">
                                    <i class="fas fa-minus icon_minus_mobile_product"></i>
                                </div>
                                <div class="box-result-input-mobile" id="result_btn_mobile_product">
                                    <input type="number" value="1" class="input_result_mobile_product input_result_mp"/>
                                </div>
                                <div class="box-minus-input-mobile" id="plus_btn_mobile_product" onclick="plus_btn_mobile_product('${data_for_render[0].Stock_Quantity}')">
                                    <i class="fas fa-plus icon_plus_mobile_product" ></i>
                                </div>
                            </div>
                        </div>
                        <div class="ins-npd-right-mobile">
                            
                            <div class="mobile-left-footer-1"> 
                                <a href="https://wa.me/+6281393736797/?text=Saya ingin konsultasi" target="_blank" style="text-decoration:none"> 
                                    <img src="/WEB/marketplace/wa.png" alt="">
                                </a>
                            </div>
                            <div class="mobile-left-footer-2" onclick="beli_product_sekarang('${product_id}')"> 
                                <p>Beli</p>
                            </div>
                            <div class="mobile-left-footer-3" onclick="open_input_modals_mobile('${product_id}')"> 
                                <p> + Keranjang </p>
                            </div>
                            <div class="mobile-left-footer-4" onclick="tambah_product_ke_cart('${product_id}')"> 
                                <p> + Keranjang </p>
                            </div>

                        </div>
                    </div>
                    
                    <div class="npd-right">
                        <div class="npd-right-box-qty">
                            <div class="qty-top-right">
                                <div class="box-qty-right-pd">
                                    <p>Masukan Quantity</p>
                                    <p>Quantity:1 Pcs</p>
                                </div>
                                <i class="fas fa-chevron-down down-product-detail"></i>
                            </div>
                            <input type="number" class="input-qty-product-detail" onchange="hitung_biaya_product('${product_id}','${data_for_render[0].Sell_Price}','${data_for_render[0].Stock_Quantity}')">
                            <div class="total-qty-right">
                                <div class="tqr-top">
                                    <p id="total-harga-p">Total Harga dan quantity</p>
                                    <i class="fas fa-chevron-down down-product-detail-2" ></i>
                                </div>
                                <div class="tqr-bottom">
                                    <div class="new-box-qty-top">
                                        <div class="total-qty-cust">
                                            <i class="fas fa-minus" onclick="kurang_qty_product('${data_for_render[0].Stock_Quantity
                                            }','${parseInt(data_for_render[0].Sell_Price)}')"></i>
                                            <div class="box_for_total">
                                                1
                                            </div>
                                            <i class="fas fa-plus" onclick="tambah_qty_product('${data_for_render[0].Stock_Quantity
                                            }','${parseInt(data_for_render[0].Sell_Price)}')"></i>
                                        </div>
                                        <p>Stok <span>${data_for_render[0].Stock_Quantity
                                        }</span> </p>
                                    </div>
                                    <div class="sub-total-box-product">
                                        <p>Subtotal</p>
                                        <p>Rp10.000</p>
                                    </div>
                                </div>
                            </div>
                            <div class="btn-tambah-cart disabled-btn" id="tambah-cart-product" onclick="tambah_product_ke_cart('${product_id}')">
                                <p>+ Keranjang</p>
                            </div>
                            <div class="btn-beli-cart disabled-btn" id="beli-now-product" onclick="beli_product_sekarang('${product_id}')">
                                <p>Beli</p>
                            </div>
                            <div class="btn-beli-cart disabled-btn" id="beli-groupbuy-product" onclick="beli_groupbuy_sekarang()">
                                <p>Beli Groupbuy</p>
                            </div>
                            <div class="npd-contact">
                                <div class="box-icon-product-contact">
                                    <i class="fas fa-comment-alt"></i>
                                    Chat
                                </div>
                                <div class="box-icon-product-contact">
                                    <i class="fas fa-heart"></i>
                                    Wishlist
                                </div>
                                <div class="box-icon-product-contact-2">
                                    <i class="fas fa-share-alt"></i>
                                    Share
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `);
            }
            console.log('render selesai')

            // render product similar
            data_similar.map((val,index)=>{
                var hargaAwal = parseInt(val.Sell_Price)
                var discount = parseInt(val.Sell_Price * 0.1)
                var hargaTotal = hargaAwal + discount
                $('.box-similar-product').append(`
                    <div class="card-item-similar  hvr-float-shadow " onclick="render_product_detail_from_home('${val.Product_Code}')">
                        <div class="cr-promo-img "> 
                            <img src="${val.Picture_1}" alt="" class="img-card " onclick="get_product_detail_from_main_page('${val.Product_Code}')" onload="loadImageBigScreen()">   
                        </div>
                        <div class="card-item-list">
                            
                            <p class="limited-text-short">${val.Name}</p>
                            <div class="split-item">
                                
                                <div class="item-price-similar">
                                    <p>RP. ${commafy(hargaTotal)}</p>
                                    <p>Rp. ${commafy(hargaAwal)}</p>
                                </div>
                              
                                <div class="buy-icon-similar" >
                                    <img src="/WEB/img/badge_groupbuy.png" alt="" class="img-badge-best">
                                </div>
                            </div>
                        </div>
                    </div>
                `)
            })

            // 

            if (data_for_render[0].Picture_2 == undefined ||data_for_render[0].Picture_2 == null ||data_for_render[0].Picture_2 == "NULL" ||data_for_render[0].Picture_2 == ""
            ) {
            } else {
              $(".new-product-small-img-box").append(`
                <div class="small-product-img" id="gambar_id_2" onclick="ganti_gambar_product('${
                    data_for_render[0].Picture_2
                }', 'gambar','gambar_id_2')">
                    <img src="${replace_vtintl_to_sold_co_id(
                        data_for_render[0].Picture_2
                    )}" alt="">
                </div>
            `);
            }
            if (
              data_for_render[0].Picture_3 == undefined ||data_for_render[0].Picture_3 == null ||data_for_render[0].Picture_3 == "NULL" ||data_for_render[0].Picture_3 == ""
            ) {
            } else {
              $(".new-product-small-img-box").append(`
                    <div class="small-product-img"  id="gambar_id_3"onclick="ganti_gambar_product('${data_for_render[0].Picture_3}', 'gambar','gambar_id_3')">
                        <img src="${replace_vtintl_to_sold_co_id(data_for_render[0].Picture_3)}" alt="">
                    </div>
                `);
            }

            if (data_for_render[0].extra_column_1 == "NULL" ||data_for_render[0].extra_column_1 == "" || data_for_render[0].extra_column_1 == null) {
            } else {
                console.log(data_for_render)
              $(".new-product-small-img-box").append(`
                    <div class="small-product-img" id="video-product" onclick="ganti_gambar_product('${data_for_render[0].extra_column_1}','video','video_product')"> 
                        <video  autoplay muted loop class="img-big" id="img-big-4" >
                            <source src="${replace_vtintl_to_sold_co_id(data_for_render[0].extra_column_1)}" type="video/mp4">
                            <source src="${replace_vtintl_to_sold_co_id(data_for_render[0].extra_column_1)}" type="video/ogg">
                        </video>
                    </div>
                `);
            }
            axios.post(`https://products.sold.co.id/get_user_comment?Product_Code=${product_id}`)
            .then((res) => {
                console.log("717 jalan");

                var cust_comment = res.data;
                var comment_parse = JSON.parse(cust_comment.User_Comments);
                // console.log(comment_parse, "ini comment");

                if (comment_parse == "null" || comment_parse == null) {
                //   console.log("masuk ke if");
                  $(".box-ulasan-detail").css("display", "none");
                  //comment kosong.
                } else if (comment_parse.length > 0) {
                    var total_comment = comment_parse.length;
                  $(".box-ulasan-detail").css("display", "flex");
                  $(".box-ulasan-detail").append(`
                        <p>SEMUA ULASAN(${total_comment}) </p>
                    `);
                  if (total_comment == 1) {
                    $(".box-ulasan-detail").css("height", "300px");
                  } else if (total_comment == 2) {
                    $(".box-ulasan-detail").css("height", "500px");
                  }
                
                  comment_parse.map((val, index) => {
                    
                    axios.post(`https://customers.sold.co.id/get-profile-image?Customer_Code=${val.Customer_Code}`)
                      .then((res) => {
                        console.log(val, " ini val");
                        
                        var comment_customer = val.Comment;
                        if (res.data !== "undefined") {
                        
                          var link_gambar = res.data;
                          axios.post(`https://customers.sold.co.id/get-customer-information?Customer_Code=${val.Customer_Code}`)
                            .then((res) => {
                              
                                var data_render;
                                var isCustomer_information = Array.isArray(res.data)
                                if(isCustomer_information) {
                                    data_render = res.data[0]
                                }else {
                                    data_render = res.data
                
                                }
                                $(".box-ulasan-detail").append(`
                                      <div class="box-item-ulasan">
                                          <div class="biu-left">
                                              <div class="biu-image">
                                                  <img src="${link_gambar}" alt="">
                                              </div>
                                              <p>${data_render.First_Name} ${data_render.Last_Name}</p>
                                          </div>
                                          <div class="biu-right">
                                              <p>${comment_customer}</p>
                                              <div class="company-comment-box">
                                                  <div class="ccb-image">
                                                      <img src="../img/vantsing_shipping_method.png" alt="">
                                                  </div>
                                                  <div class="ccb-isi-comment">
                                                      <div class="ccb-isi-comment-name">
                                                          <p>${detail_product_item.PIC_company_name}</p>
                                                          <div class="btn-penjual-ccb">
                                                              Penjual
                                                          </div>
                                                      </div>
                                                      <div class="ccb-thankyou">
                                                          Terima kasih telah berbelanja di ${detail_product_item.PIC_company_name}. Bagikan link toko kami https://www.soldays.id kepada teman-teman Anda dan favoritkan Toko kami untuk terus update mengenai stok dan produk terbaru
                                                      </div>
                                                  </div>
                                              </div>
                                          </div>
                                      </div>
                                  `);


                              
                            })
                            .catch((err) => {});
                        } else {
                          axios.post(`https://customers.sold.co.id/get-customer-information?Customer_Code=${val.Customer_Code}`)
                            .then((res) => {
                              
                                var data_render;
                                var isCustomer_information = Array.isArray(res.data)
                                if(isCustomer_information) {
                                    data_render = res.data[0]
                                }else {
                                    data_render = res.data
                                    
                                }
                                  $(".box-ulasan-detail").append(`
                                        <div class="box-item-ulasan">
                                            <div class="biu-left">
                                                <div class="biu-image">
                                                    <img src="../img/accounts.png" alt="">
                                                </div>
                                                <p>Anonymous</p>
                                            </div>
                                            <div class="biu-right">
                                                <p>${comment_customer}</p>
                                                <div class="company-comment-box">
                                                    <div class="ccb-image">
                                                        <img src="../img/vantsing_shipping_method.png" alt="">
                                                    </div>
                                                    <div class="ccb-isi-comment">
                                                        <div class="ccb-isi-comment-name">
                                                            <p>${detail_product_item.PIC_company_name}</p>
                                                            <div class="btn-penjual-ccb">
                                                                Penjual
                                                            </div>
                                                        </div>
                                                        <div class="ccb-thankyou">
                                                            Terima kasih telah berbelanja di ${detail_product_item.PIC_company_name}. Bagikan link toko kami https://www.soldays.id kepada teman-teman Anda dan favoritkan Toko kami untuk terus update mengenai stok dan produk terbaru
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    `);
                       
                              // })
                            })
                            .catch((err) => {});
                        }
                      })
                      .catch((err) => {
                        console.log(err);
                      });
                  });
                }
                Swal.fire({
                  title: "Uploading Data",
                  timer: 100,
                });
                console.log("793 harusnya close ");
              })
              .catch((err) => {});
          } else {
            // by API

            axios.post(`https://products.sold.co.id/get-product-details`)
              .then((res) => {
                allDataProduct = res.data;

                const querystring = $(location).attr("href");
                axios.post(`https://products.sold.co.id/get-product-details?product_code=${product_id}`)
                  .then((res) => {
                    item = res.data;
                    var split_product = res.data.Name.split(" ");
                    
                    var all_filter_product = [];
                    for (var i = 0; i < split_product.length; i++) {
                      var filter_product = allDataProduct.filter((val) => {
                        if (val.Name.includes(split_product[i])) {
                          
                          all_filter_product.push(val);
                          return val;
                        }
                      });
                    }
                    console.log(all_filter_product, " ini all filter product");
                    
                    // BATAS
                    var hargaAwal = parseInt(item.Sell_Price);
                    var discount = parseInt(item.Sell_Price * 0.1);
                    var hargaTotal = hargaAwal + discount;

                    $(".container-product").empty();
                    if (item.GroupBuy_Purchase == "false") {
                      console.log("masuk ke api if false");
                      $(".container-product").append(
                        // render untuk bukan groupbuy
                        `
                            <div class="new-product-detail-box">
                                <div class="npd-left">
                                    <div class="product-detail-isi">
                                        <div class="npdl-left">
                                            <div class="new-product-img-box" data-scale="1.6">
                                                <img id="gambar_zoom" src="${replace_vtintl_to_sold_co_id(
                                                    item.Picture_1
                                                )}" alt="">
                                            </div>
                                            <div class="new-product-video-box">
                                            </div>
                                            <div class="new-product-small-img-box">
                                                <div class="small-product-img active-small-img" id="gambar_id_1" onclick="ganti_gambar_product('${
                                                    item.Picture_1
                                                }', 'gambar','gambar_id_1')">
                                                    <img src="${replace_vtintl_to_sold_co_id(
                                                        item.Picture_1
                                                    )}" alt="">
                                                </div>
                                            </div>
                                        </div>   
                                        <div class="npdl-right">
                                            <div class="npd-left-product-name">
                                                <p>${
                                                    item.Name
                                                }</p>
                                            </div>
                                            <div class="npd-left-product-price">
                                                <p>RP.${commafy(
                                                    item.Sell_Price
                                                )}</p>
                                            </div>
                                            <div class="npdl-right-detail-product">
                                                <nav>
                                                    <div class="nav nav-tabs" id="nav-tab" role="tablist">
                                                        <button class="nav-link active" id="nav-detail-tab" data-bs-toggle="tab" data-bs-target="#nav-content-detail" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Detail</button>
                                                        <button class="nav-link" id="nav-info-tab" data-bs-toggle="tab" data-bs-target="#nav-content-info" type="button" role="tab" aria-controls="nav-spec" aria-selected="true">Info Penting</button>
                                                    </div>
                                                </nav>
                                                <div class="tab-content new-tab-content" id="nav-tabContent">
                                                    <div class="tab-pane fade show active" id="nav-content-detail" role="tabpanel" aria-labelledby="nav-home-tab">
                                                        <p>Kondisi : <span>Baru</span> </p>
                                                        <p>Berat : <span>${
                                                            item.Weight_KG
                                                        } KG</span> </p>
                                                        <p>Kategori : <span id="kategori-product-detail-pd">${
                                                            item.Category
                                                        }</span></p>
                                                        <div class="deskripsi-new-product-detail">
                                                            ${
                                                                item.Description
                                                            }
                                                            ${
                                                                item.Specification
                                                            }     
                                                        </div>
                                                    </div>
                                                    <div class="tab-pane fade" id="nav-content-info" role="tabpanel" aria-labelledby="nav-spec-tab">
                                                        <div class="info-penting-box-pengembalian">
                                                            <p>Kebijakan Pengembalian Produk</p>
                                                            <p>Silahkan Hubungi Customer Service Soldays</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>  
                                        </div>
                                    </div>
                                    <div class="box-company-detail">
                                        <div class="bcd-left">
                                            <div class="ins-bcd-left">
                                                <div class="bcd-image">
                                                    <img src="../img/vantsing_shipping_method.png" alt="">
                                                </div>
                                                <div class="bcd-name">
                                                    <i class="fas fa-check-circle"></i>
                                                    <p>${
                                                        detail_product_item.PIC_company_name
                                                    }</p>
                                                </div>
                                            </div>   
                                        </div>
                                        <div class="bcd-right">
                                            <div class="ins-detail-left">
                                                <p>Pengiriman</p>
                                                <div class="dikirim-dari">
                                                    <i class="fas fa-map-marker-alt"></i>
                                                    <p>Dikirim dari <span>${province_company_from_product}</span></p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="box-ulasan-detail">
                                        
                                    </div>
                                    <div class="box-input-ulasan">
                                        <p>Masukan Ulasan</p>
                                        <input type="text" maxlength="100" class="input-ulasan-npd">
                                        <div class="btn-upload-ulasan" onclick="send_comment_cust_product('${product_id}')">
                                            Masukan
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="npd-right">
                                    <div class="npd-right-box-qty">
                                        <div class="qty-top-right">
                                            <div class="box-qty-right-pd">
                                                <p>Masukan Quantity</p>
                                                <p>Quantity:1 Pcs</p>
                                            </div>
                                            <i class="fas fa-chevron-down down-product-detail"></i>
                                        </div>
                                        <input type="number" class="input-qty-product-detail" onchange="hitung_biaya_product('${product_id}','${
        item.Sell_Price
    }','${item.Stock_Quantity}')">
                                        <div class="total-qty-right">
                                            <div class="tqr-top">
                                                <p id="total-harga-p">Total Harga dan quantity</p>
                                                <i class="fas fa-chevron-down down-product-detail-2" ></i>
                                            </div>
                                            <div class="tqr-bottom">
                                                <div class="new-box-qty-top">
                                                    <div class="total-qty-cust">
                                                        <i class="fas fa-minus" onclick="kurang_qty_product('${
                                                            item.Stock_Quantity
                                                        }','${parseInt(
        item.Sell_Price
    )}')"></i>
                                                        <div class="box_for_total">
                                                            1
                                                        </div>
                                                        <i class="fas fa-plus" onclick="tambah_qty_product('${
                                                            item.Stock_Quantity
                                                        }','${parseInt(
        item.Sell_Price
    )}')"></i>
                                                    </div>
                                                    <p>Stok <span>${
                                                        item.Stock_Quantity
                                                    }</span> </p>
                                                </div>
                                                <div class="sub-total-box-product">
                                                    <p>Subtotal</p>
                                                    <p>Rp10.000</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="btn-tambah-cart disabled-btn" id="tambah-cart-product" onclick="tambah_product_ke_cart('${product_id}')">
                                            <p>+ Keranjang</p>
                                        </div>
                                        <div class="btn-beli-cart disabled-btn" id="beli-now-product" onclick="beli_product_sekarang('${product_id}')">
                                            <p>Beli</p>
                                        </div>
                                        <div class="npd-contact">
                                            <div class="box-icon-product-contact">
                                                <i class="fas fa-comment-alt"></i>
                                                Chat
                                            </div>
                                            <div class="box-icon-product-contact">
                                                <i class="fas fa-heart"></i>
                                                Wishlist
                                            </div>
                                            <div class="box-icon-product-contact-2">
                                                <i class="fas fa-share-alt"></i>
                                                Share
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            `
                      );
                    } else {
                      // render untuk groupbuy
                      console.log("masuk ke api false");
                      $(".container-product").append(
                        // render untuk bukan groupbuy
                        `
                            <div class="new-product-detail-box">
                                <div class="npd-left">
                                    <div class="product-detail-isi">
                                        <div class="npdl-left">
                                            <div class="new-product-img-box" data-scale="1.6">
                                                <img id="gambar_zoom" src="${replace_vtintl_to_sold_co_id(item.Picture_1)}" alt="">
                                            </div>
                                            <div class="new-product-video-box">
                                            </div>
                                            <div class="new-product-small-img-box">
                                                <div class="small-product-img active-small-img" id="gambar_id_1" onclick="ganti_gambar_product('${
                                                    item.Picture_1
                                                }', 'gambar','gambar_id_1')">
                                                    <img src="${replace_vtintl_to_sold_co_id(
                                                        item.Picture_1
                                                    )}" alt="">
                                                </div>
                                            </div>
                                        </div>   
                                        <div class="npdl-right">
                                            <div class="npd-left-product-name">
                                                <p>${item.Name}</p>
                                            </div>
                                            <div class="npd-left-product-price">
                                                <p>RP.${commafy(
                                                    item.Sell_Price
                                                )}</p>
                                            </div>
                                            <div class="npdl-right-detail-product">
                                                <nav>
                                                    <div class="nav nav-tabs" id="nav-tab" role="tablist">
                                                        <button class="nav-link active" id="nav-detail-tab" data-bs-toggle="tab" data-bs-target="#nav-content-detail" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Detail</button>
                                                        <button class="nav-link" id="nav-info-tab" data-bs-toggle="tab" data-bs-target="#nav-content-info" type="button" role="tab" aria-controls="nav-spec" aria-selected="true">Info Penting</button>
                                                    </div>
                                                </nav>
                                                <div class="tab-content new-tab-content" id="nav-tabContent">
                                                    <div class="tab-pane fade show active" id="nav-content-detail" role="tabpanel" aria-labelledby="nav-home-tab">
                                                        <p>Kondisi : <span>Baru</span> </p>
                                                        <p>Berat : <span>${
                                                            item.Weight_KG
                                                        } KG</span> </p>
                                                        <p>Kategori : <span id="kategori-product-detail-pd">${
                                                            item.Category
                                                        }</span></p>
                                                        <div class="deskripsi-new-product-detail">
                                                            ${
                                                                item.Description
                                                            }
                                                            ${
                                                                item.Specification
                                                            }     
                                                        </div>
                                                    </div>
                                                    <div class="tab-pane fade" id="nav-content-info" role="tabpanel" aria-labelledby="nav-spec-tab">
                                                        <div class="info-penting-box-pengembalian">
                                                            <p>Kebijakan Pengembalian Produk</p>
                                                            <p>Silahkan Hubungi Customer Service Soldays</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>  
                                        </div>
                                    </div>
                                    <div class="box-company-detail">
                                        <div class="bcd-left">
                                            <div class="ins-bcd-left">
                                                <div class="bcd-image">
                                                    <img src="../img/vantsing_shipping_method.png" alt="">
                                                </div>
                                                <div class="bcd-name">
                                                    <i class="fas fa-check-circle"></i>
                                                    <p>${
                                                        detail_product_item.PIC_company_name
                                                    }</p>
                                                </div>
                                            </div>   
                                        </div>
                                        <div class="bcd-right">
                                            <div class="ins-detail-left">
                                                <p>Pengiriman</p>
                                                <div class="dikirim-dari">
                                                    <i class="fas fa-map-marker-alt"></i>
                                                    <p>Dikirim dari <span>${province_company_from_product}</span></p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="box-ulasan-detail">
                                        
                                    </div>
                                    <div class="box-input-ulasan">
                                        <p>Masukan Ulasan</p>
                                        <input type="text" maxlength="100" class="input-ulasan-npd">
                                        <div class="btn-upload-ulasan" onclick="send_comment_cust_product('${product_id}')">
                                            Masukan
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="npd-right">
                                    <div class="npd-right-box-qty">
                                        <div class="qty-top-right">
                                            <div class="box-qty-right-pd">
                                                <p>Masukan Quantity</p>
                                                <p>Quantity:1 Pcs</p>
                                            </div>
                                            <i class="fas fa-chevron-down down-product-detail"></i>
                                        </div>
                                        <input type="number" class="input-qty-product-detail" onchange="hitung_biaya_product('${product_id}','${
                    item.Sell_Price
                }','${item.Stock_Quantity}')">
                                        <div class="total-qty-right">
                                            <div class="tqr-top">
                                                <p id="total-harga-p">Total Harga dan quantity</p>
                                                <i class="fas fa-chevron-down down-product-detail-2" ></i>
                                            </div>
                                            <div class="tqr-bottom">
                                                <div class="new-box-qty-top">
                                                    <div class="total-qty-cust">
                                                        <i class="fas fa-minus" onclick="kurang_qty_product('${
                                                            item.Stock_Quantity
                                                        }','${parseInt(
                    item.Sell_Price
                )}')"></i>
                                                        <div class="box_for_total">
                                                            1
                                                        </div>
                                                        <i class="fas fa-plus" onclick="tambah_qty_product('${
                                                            item.Stock_Quantity
                                                        }','${parseInt(
                    item.Sell_Price
                )}')"></i>
                                                    </div>
                                                    <p>Stok <span>${
                                                        item.Stock_Quantity
                                                    }</span> </p>
                                                </div>
                                                <div class="sub-total-box-product">
                                                    <p>Subtotal</p>
                                                    <p>Rp10.000</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="btn-tambah-cart disabled-btn" id="tambah-cart-product" onclick="tambah_product_ke_cart('${product_id}')">
                                            <p>+ Keranjang</p>
                                        </div>
                                        <div class="btn-beli-cart disabled-btn" id="beli-now-product" onclick="beli_product_sekarang('${product_id}')">
                                            <p>Beli</p>
                                        </div>
                                        <div class="btn-beli-cart disabled-btn" id="beli-groupbuy-product" onclick="beli_groupbuy_sekarang()">
                                            <p>Beli Groupbuy</p>
                                        </div>
                                        <div class="npd-contact">
                                            <div class="box-icon-product-contact">
                                                <i class="fas fa-comment-alt"></i>
                                                Chat
                                            </div>
                                            <div class="box-icon-product-contact">
                                                <i class="fas fa-heart"></i>
                                                Wishlist
                                            </div>
                                            <div class="box-icon-product-contact-2">
                                                <i class="fas fa-share-alt"></i>
                                                Share
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            `
                      );
                    }

                    if (
                      item.Picture_2 == undefined ||
                      item.Picture_2 == null ||
                      item.Picture_2 == "NULL" ||
                      item.Picture_2 == ""
                    ) {
                    } else {
                      $(".new-product-small-img-box").append(`
                        <div class="small-product-img" id="gambar_id_2" onclick="ganti_gambar_product('${
                            item.Picture_2
                        }', 'gambar','gambar_id_2')">
                            <img src="${replace_vtintl_to_sold_co_id(
                                item.Picture_2
                            )}" alt="">
                        </div>
                    `);
                    }
                    if (
                      item.Picture_3 == undefined ||
                      item.Picture_3 == null ||
                      item.Picture_3 == "NULL" ||
                      item.Picture_3 == ""
                    ) {
                    } else {
                      $(".new-product-small-img-box").append(`
                        <div class="small-product-img" id="gambar_id_3" onclick="ganti_gambar_product('${
                            item.Picture_3
                        }', 'gambar','gambar_id_3')">
                            <img src="${replace_vtintl_to_sold_co_id(
                                item.Picture_3
                            )}" alt="">
                        </div>
                    `);
                    }

                    if (
                      item.extra_column_1 == undefined ||
                      item.extra_column_1 == null ||
                      item.extra_column_1 == "NULL" ||
                      item.extra_column_1 == ""
                    ) {
                    } else {
                      $(".new-product-small-img-box").append(`
                        <div class="small-product-img" id="video-product" onclick="ganti_gambar_product('${
                            item.extra_column_1
                        }','video','video-product')"> 
                            <video  autoplay muted loop class="img-big" id="img-big-4" >
                                <source src="${replace_vtintl_to_sold_co_id(
                                    item.extra_column_1
                                )}" type="video/mp4">
                                <source src="${replace_vtintl_to_sold_co_id(
                                    item.extra_column_1
                                )}" type="video/ogg">
                            </video>
                        </div>
                    `);
                    }

                    axios.post(`https://products.sold.co.id/get_user_comment?Product_Code=${product_id}`)
                      .then((res) => {
                        console.log("717 jalan");

                        var cust_comment = res.data;
                        var comment_parse = JSON.parse(
                          cust_comment.User_Comments
                        );
                        console.log(comment_parse, "ini comment");

                        if (comment_parse == "null" || comment_parse == null) {
                          console.log("masuk ke if");
                          $(".box-ulasan-detail").css("display", "none");
                          //comment kosong.
                        } else if (comment_parse.length > 0) {
                          console.log("masuk ke else if  731");
                          var total_comment = comment_parse.length;
                          console.log(total_comment);
                          $(".box-ulasan-detail").css("display", "flex");
                          $(".box-ulasan-detail").append(`
                              <p>SEMUA ULASAN(${total_comment}) </p>
                          `);
                          if (total_comment == 1) {
                            $(".box-ulasan-detail").css("height", "300px");
                          } else if (total_comment == 2) {
                            $(".box-ulasan-detail").css("height", "500px");
                          }
                          comment_parse.map((val, index) => {
                            console.log(val);
                            axios
                              .post(
                                `https://customers.sold.co.id/get-profile-image?Customer_Code=${val.Customer_Code}`
                              )
                              .then((res) => {
                                console.log(val, " ini val");
                                console.log(val.Comment);
                                var comment_customer = val.Comment;
                                if (res.data !== "undefined") {
                                  console.log("masuk ke if 746");
                                  var link_gambar = res.data;
                                  axios.post(`https://customers.sold.co.id/get-customer-information?Customer_Code=${val.Customer_Code}`)
                                    .then((res) => {
                                      if(res.data){
                                        console.log(res.data)
                                        var data_render
                                        var isCustomer_information = Array.isArray(res.data)
                                        if(isCustomer_information) {
                                            data_render = res.data[0]
                                        }else {
                                            data_render = res.data
                        
                                        }
                                        console.log(comment_customer);
                                        $(".box-ulasan-detail").append(`
                                          <div class="box-item-ulasan">
                                              <div class="biu-left">
                                                  <div class="biu-image">
                                                      <img src="${link_gambar}" alt="">
                                                  </div>
                                                  <p>${data_render.First_Name} ${data_render.Last_Name}</p>
                                              </div>
                                              <div class="biu-right">
                                                  <p>${comment_customer}</p>
                                                  <div class="company-comment-box">
                                                      <div class="ccb-image">
                                                          <img src="../img/vantsing_shipping_method.png" alt="">
                                                      </div>
                                                      <div class="ccb-isi-comment">
                                                          <div class="ccb-isi-comment-name">
                                                              <p>${detail_product_item.PIC_company_name}</p>
                                                              <div class="btn-penjual-ccb">
                                                                  Penjual
                                                              </div>
                                                          </div>
                                                          <div class="ccb-thankyou">
                                                              Terima kasih telah berbelanja di ${detail_product_item.PIC_company_name}. Bagikan link toko kami https://www.soldays.id kepada teman-teman Anda dan favoritkan Toko kami untuk terus update mengenai stok dan produk terbaru
                                                          </div>
                                                      </div>
                                                  </div>
                                              </div>
                                          </div>
                                      `);
                                        
                                    }else {
                                        Swal.fire({
                                            html:`
                                            <div class="o-circle c-container__circle o-circle__sign--failure">
                                                <div class="o-circle__sign"></div>  
                                            </div> 
                                            Silahkan Login`,
                                            timer:2000,
                                        })
                                        setTimeout(()=>{
                                          window.parent.location.reload()
                                            window.parent.$('.iframe').css('display','none')
                                            window.parent.$('.force-close-all-command').css('display','none')
                                        },1500)
                                        
                                    }
                                      
                                      // })
                                    })
                                    .catch((err) => {});
                                } else {
                                  console.log("masuk ke else");
                                  axios.post(`https://customers.sold.co.id/get-customer-information?Customer_Code=${val.Customer_Code}`)
                                    .then((res) => {
                                      if(res.data){
                                        console.log(res.data)
                                        var isCustomer_information = Array.isArray(res.data)
                                        if(isCustomer_information) {
                                            alamat_pilihan = res.data[0].Address_1
                                        }else {
                                            alamat_pilihan = res.data.Address_1
                        
                                        }
                                        $(".box-ulasan-detail").append(`
                                            <div class="box-item-ulasan">
                                                <div class="biu-left">
                                                    <div class="biu-image">
                                                        <img src="../img/accounts.png" alt="">
                                                    </div>
                                                    <p>Anonymous</p>
                                                </div>
                                                <div class="biu-right">
                                                    <p>${comment_customer}</p>
                                                    <div class="company-comment-box">
                                                        <div class="ccb-image">
                                                            <img src="../img/vantsing_shipping_method.png" alt="">
                                                        </div>
                                                        <div class="ccb-isi-comment">
                                                            <div class="ccb-isi-comment-name">
                                                                <p>${detail_product_item.PIC_company_name}</p>
                                                                <div class="btn-penjual-ccb">
                                                                    Penjual
                                                                </div>
                                                            </div>
                                                            <div class="ccb-thankyou">
                                                                Terima kasih telah berbelanja di ${detail_product_item.PIC_company_name}. Bagikan link toko kami https://www.soldays.id kepada teman-teman Anda dan favoritkan Toko kami untuk terus update mengenai stok dan produk terbaru
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        `);
                                      
                                    }else {
                                        Swal.fire({
                                            html:`
                                            <div class="o-circle c-container__circle o-circle__sign--failure">
                                                <div class="o-circle__sign"></div>  
                                            </div> 
                                            Silahkan Login`,
                                            timer:2000,
                                        })
                                        setTimeout(()=>{
                                            window.parent.location.reload()
                                            window.parent.$('.iframe').css('display','none')
                                            window.parent.$('.force-close-all-command').css('display','none')
                                        },1500)
                                        
                                    }
                                    })
                                    .catch((err) => {});
                                }
                              })
                              .catch((err) => {
                                console.log(err);
                              });
                          });
                        }
                        Swal.fire({
                          title: "Uploading Data",
                          timer: 100,
                        });
                        console.log("793 harusnya close ");
                      })
                      .catch((err) => {});
                    //BATAS
                  })
                  .catch((err) => {});
              })
              .catch((err) => {});
          }
          console.log($('.mobile-left-footer-4'))
            console.log($('.mobile-left-footer-3'))
            $('.mobile-left-footer-3').css('display','flex')
            $('.mobile-left-footer-4').css('display','none')
        //   console.log($('.new-product-img-box', ' new product img box'))
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });
};
const buyNow = async (product_id) => {
  // addToCart(product_id)
  axios.post(`https://products.sold.co.id/get-product-details?product_code=${product_id}`)
    .then(async (res) => {
      var product = res.data;
      var province_company = "";
      var city_company = "";
      var district_company = "";
      var courier_price_code_company = "";
      var token = localStorage.getItem("token");
      var final_qty = $(".input-qty-product-detail").val(); 
      if (token === null) {
        if (token === null) {
          // swal.fire("Silahkan Login","","warning");
          Swal.fire({
            html: `
                    <div class="o-circle c-container__circle o-circle__sign--failure">
                        <div class="o-circle__sign"></div>  
                    </div> 
                    Silahkan Login`,
            timer: 2000,
          });
          // $('#loginModal',window.parent.document).modal('show')
          // window.location.href = "./sign-in.html";
        } else {
          // swal.fire("Pilih barang di keranjang","","warning");
          Swal.fire({
            html: `
                    <div class="o-circle c-container__circle o-circle__sign--failure">
                        <div class="o-circle__sign"></div>  
                    </div> 
                    Ada Kesalahan pada barang`,
            timer: 2000,
          });
        }
      } else {
        console.log(product);
        province_company = await find_province_from_product_company(
          product.PIC_company_address
        );
        city_company = await find_city_from_product_company(
          province_company,
          product.PIC_company_address
        );
        district_company = await find_district_from_product_company(
          city_company,
          product.PIC_company_address
        );
        courier_price_code_company =
          await find_courier_price_code_from_product_company(
            district_company,
            product.PIC_company_address
          );
        var array = [];

        localStorage.setItem("itemsToCheckout", array);
        axios.post(`https://products.sold.co.id/get-product-details?product_code=${product_id}`)
          .then((res) => {

            if (res.data.Stock_Quantity > 1) {
              console.log("masuk ke if 7067");
              var productToBeAdded = {
                productNo: product.Product_Code,
                quantity: final_qty,
                GroupCode: "NO COUPON",
                priceAgreed: res.data.Sell_Price,
                courier_price_code: courier_price_code_company,
                company_address: product.PIC_company_address,
                province_company: province_company,
                city_company: city_company,
                district_company: district_company.District,
                weight_kg: product.Weight_KG,
                berat_product: product.Weight_KG,
                product_name: product.Name,
              };

              array.push(productToBeAdded);
              console.log(productToBeAdded);
              var productToBeAddedStringify = JSON.stringify(array);
              localStorage.setItem(
                "itemsToCheckout",
                productToBeAddedStringify
              );
              

              $(".close-button", window.parent.parent.document).css(
                "display",
                "block"
              );

              $(".close", window.parent.parent.document).css("display", "none");
              $(".modals-new-product-detail",window.parent.parent.document).css("display", "none");
              if (
                $(".option-3", window.parent.parent.document).hasClass(
                  "background_grey"
                )
              ) {
                $(".option-3", window.parent.parent.document).removeClass(
                  "background_grey"
                );
              } else {
                $(".option-3", window.parent.parent.document).addClass(
                  "background_grey"
                );
              }

              // $('.main-body').css('display','none')
              // $('.modals-search-result').css('display','block')

              // $('.iframe').css('display','block')
              $(".modals-pengiriman", window.parent.parent.document).css(
                "display",
                "none"
              );
              $(".modals-check-harga", window.parent.parent.document).css(
                "display",
                "none"
              );
              $(".option-1", window.parent.parent.document).removeClass(
                "background_grey"
              );
              $(".option-2", window.parent.parent.document).removeClass(
                "background_grey"
              );
              $(".option-0", window.parent.parent.document).removeClass(
                "background_grey"
              );
              console.log(window.parent.$(".iframe"));
              window.parent.$(".iframe").css("display", "block");
              window.parent.$(".iframe").attr("src",`../WEB/Iframe/checkout.html?checkout_array=${productToBeAddedStringify}`);
              // $('.close-button',window.parent.document).css('display','none')

              // SEARCH ITEM BACK TO NORMAL
              $(".box-render-search", window.parent.document).css(
                "display",
                "none"
              );
              $(".input-name", window.parent.document).css(
                "border-bottom-left-radius",
                "10px"
              );
              $(".input-name", window.parent.document).css(
                "border-bottom-right-radius",
                "10px"
              );
              $(".input-name", window.parent.document).val(null);
            } else {
              // swal.fire("Barang Tidak Tersedia","","warning");
              Swal.fire({
                html: `
                        <div class="o-circle c-container__circle o-circle__sign--failure">
                            <div class="o-circle__sign"></div>  
                        </div> 
                        Barang Tidak Tersedia`,
                timer: 2000,
              });
            }
          })
          .catch((err) => {});
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
const render_product_detail_from_searching_page = (item_category) => {
  console.log(item_category, "render product detail from home jalan");
};

const tambah_product_ke_cart = (product_id) => {
  console.log("tambah product ke cart jalan");

  get_product_detail_func(product_id).done(function(response){
    var max_qty = response.Stock_Quantity
    var final_qty = $(".input_result_mp").val();
    if(max_qty >final_qty){
      addToCart(product_id, final_qty);
    }else {
      Swal.fire({
        html:`
        <div class="o-circle c-container__circle o-circle__sign--failure">
            <div class="o-circle__sign"></div>  
        </div> 
        Gagal Penambahan ke cart`,
        timer:2000,
        
    })
    }
  })

};
const beli_product_sekarang = (product_id) => {
  console.log("beli_product_sekarang");
  buyNow(product_id);
};
const beli_groupbuy_sekarang = (product_id) => {
  console.log("beli_groupbuy_sekarang");
};

const ganti_gambar_product = (src_gambar, status, id_product) => {
  console.log(src_gambar, " index ganti gambar jalan");
  $(".new-product-small-img-box .small-product-img").removeClass("active-small-img");
  if (status === "gambar") {
    $('.new-product-video-box').css('display','none')
    $(".new-product-img-box").css("display", "block");
    $(".new-product-img-box img").prop("src", `${src_gambar}`);
    
    $(`#${id_product}`).addClass("active-small-img");
    console.log(`#${id_product}`);
    console.log($(`#${id_product}`));
  } else {
    $(".new-product-img-box").css("display", "none");
    $('.new-product-video-box').css('display','flex')
    $('.new-product-video-box').empty()
    $('.new-product-video-box').append(`
        <video  autoplay muted loop class="img-big" id="img-big-4" >
            <source src="${replace_vtintl_to_sold_co_id(src_gambar)}" type="video/mp4">
            <source src="${replace_vtintl_to_sold_co_id(src_gambar)}" type="video/ogg">
        </video>
    `)
    $('.new-product-small-img-box #video-product').addClass('active-small-img')

  }
};



