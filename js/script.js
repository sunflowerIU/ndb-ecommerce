(function ($) {
  "use strict";

  var initPreloader = function () {
    $(document).ready(function ($) {
      var Body = $("body");
      Body.addClass("preloader-site");
    });
    $(window).load(function () {
      $(".preloader-wrapper").fadeOut();
      $("body").removeClass("preloader-site");
    });
  };

  // init Chocolat light box
  var initChocolat = function () {
    Chocolat(document.querySelectorAll(".image-link"), {
      imageSize: "contain",
      loop: true,
    });
  };

  var initSwiper = function () {
    var swiper = new Swiper(".main-swiper", {
      speed: 500,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    });

    var category_swiper = new Swiper(".category-carousel", {
      slidesPerView: 6,
      spaceBetween: 30,
      speed: 500,
      navigation: {
        nextEl: ".category-carousel-next",
        prevEl: ".category-carousel-prev",
      },
      breakpoints: {
        0: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 3,
        },
        991: {
          slidesPerView: 4,
        },
        1500: {
          slidesPerView: 6,
        },
      },
    });

    var brand_swiper = new Swiper(".brand-carousel", {
      slidesPerView: 4,
      spaceBetween: 30,
      speed: 500,
      navigation: {
        nextEl: ".brand-carousel-next",
        prevEl: ".brand-carousel-prev",
      },
      breakpoints: {
        0: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 2,
        },
        991: {
          slidesPerView: 3,
        },
        1500: {
          slidesPerView: 4,
        },
      },
    });

    var products_swiper = new Swiper(".products-carousel", {
      slidesPerView: 5,
      spaceBetween: 30,
      speed: 500,
      navigation: {
        nextEl: ".products-carousel-next",
        prevEl: ".products-carousel-prev",
      },
      breakpoints: {
        0: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 3,
        },
        991: {
          slidesPerView: 4,
        },
        1500: {
          slidesPerView: 6,
        },
      },
    });
  };

  var initProductQty = function () {
    $(".product-qty").each(function () {
      var $el_product = $(this);
      var quantity = 0;

      $el_product.find(".quantity-right-plus").click(function (e) {
        e.preventDefault();
        var quantity = parseInt($el_product.find("#quantity").val());
        $el_product.find("#quantity").val(quantity + 1);
      });

      $el_product.find(".quantity-left-minus").click(function (e) {
        e.preventDefault();
        var quantity = parseInt($el_product.find("#quantity").val());
        if (quantity > 0) {
          $el_product.find("#quantity").val(quantity - 1);
        }
      });
    });
  };

  // init jarallax parallax
  var initJarallax = function () {
    jarallax(document.querySelectorAll(".jarallax"));

    jarallax(document.querySelectorAll(".jarallax-keep-img"), {
      keepImg: true,
    });
  };

  // document ready
  $(document).ready(function () {
    initPreloader();
    initSwiper();
    initProductQty();
    initJarallax();
    initChocolat();
  }); // End of a document
})(jQuery);

// for dynamic product load
document.addEventListener("DOMContentLoaded", () => {
  const url = `https://sunfloweriu.github.io/nepal-digital-bazar/NDB.json?timestamp=${new Date().getTime()}`;
  fetch(url)
    .then((res) => res.json())
    .then((products) => {
      console.log(products);
      let container_all = document.getElementById("product-all");
      let container_bottle = document.getElementById("product-bottle");
      let container_thermos = document.getElementById("product-thermos");
      let container_others = document.getElementById("product-others");

      container_all.innerHTML = "";
      container_bottle.innerHTML = "";
      container_thermos.innerHTML = "";
      container_others.innerHTML = "";

      products.forEach((product) => {
        let productDiv = document.createElement("div");
        productDiv.classList.add("col");
        productDiv.innerHTML = `
    
        <div class="product-item">
          ${
            product.discount
              ? `<span class="badge bg-success position-absolute m-3">-${product.discount}%</span>`
              : ""
          }
                       
                        <figure>
                          <a href="index.html" title="Product Title">
                            <img src="${product.img}"  class="tab-image">
                          </a>
                        </figure>
                        <h3>${product.title}</h3>
                     
                        <span class="price">

                        ${
                          product.discount
                            ? `<del class=''> &#8360 ${product.price}</del>`
                            : `<span class=''> &#8360 ${product.price}</span>`
                        }
                          

                        ${
                          product.discount
                            ? `<strong class="text-danger text-dark">&#8360 ${
                                product.price -
                                (product.discount / 100) * product.price
                              }</strong>`
                            : ""
                        }
                      </span>
                        <div class="d-flex align-items-center justify-content-between">
                          <a href="https://wa.me/+9779811169909?text=Hello,%20I%20am%20interested%20in%20your%20product!" id="buy-now" type="button" class="btn btn-danger nav-link">BUY NOW</a>
                        </div>
                      </div>
    
    
                      `;
        container_all.append(productDiv);

        if (product.category == "thermos") {
          container_thermos.appendChild(productDiv.cloneNode(true));
        }

        if (product.category == "bottle") {
          container_bottle.appendChild(productDiv.cloneNode(true));
        }
        if (product.category == "others") {
          container_others.appendChild(productDiv.cloneNode(true));
        }
      });
    });
});
