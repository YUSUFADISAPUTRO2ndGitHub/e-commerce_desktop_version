$(function(){
    $('.owl-carousel').owlCarousel({
        margin: 15,
        nav: true,
        dots:false,
        navText: ["<div class='nav-button owl-prev'><i class='fa fa-chevron-left'></i></div>", "<div class='nav-button owl-next'><i class='fa fa-chevron-right'></i></div>"],
        responsive: {
          0: {
            items: 1
          },
          600: {
            items: 2
          },
          1000: {
            items: 3
          }
        }
      });
      var owl = $('.owl-carousel');
    
      owl.on('mousewheel', '.owl-stage', function (e) {
      if (e.deltaY>0) {
          owl.trigger('next.owl');
      } else {
          owl.trigger('prev.owl');
      }
      e.preventDefault();
    });

});