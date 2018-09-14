/* General jQuery & JS stuff goes here. */


jQuery(document).ready(function ($) {


    // Initialize wowjs 
    new WOW().init();

    /*-------------------
    MAGNIFICO STARTER - 
    Code from a starter example by the creator. 
    https://codepen.io/dimsemenov/pen/hutrb
    -------------------*/
    $('.with-caption').magnificPopup({
        type: 'image',
        closeBtnInside: false,
        mainClass: 'mfp-with-zoom mfp-img-mobile',

        image: {
            verticalFit: true,
            titleSrc: function (item) {
                //More could be done here......
                //Also doesn't fit so good on iPad.
                var caption = item.el.attr('title');
                return caption;
            }
        },

        //This will let us click through images eventually....
        gallery: {
            enabled: true
        },
    });
});

// Select all links with hashes
$('a[href*="#"]')
  // Remove links that don't actually link to anything
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function(event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
      && 
      location.hostname == this.hostname
    ) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Does a scroll target exist?
      var distancetocover = Math.abs($(document).scrollTop() - target.offset().top);
      var timetoscroll = distancetocover / 7 + 450; 
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top
        }, timetoscroll, function() {
          // Callback after animation
          // Must change focus!
          var $target = $(target);
        });
      }
    }
});
