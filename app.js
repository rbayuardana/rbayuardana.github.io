$(document).ready(function(){
    console.log('Hello World');

    $('.nav-button-nav').on('click', function(event) {
      event.preventDefault(); // Prevent the default behavior of the link
      var target = $(this).attr('href'); // Get the target section id from the href attribute
      $('html, body').animate({
        scrollTop: $(target).offset().top
      }, 200); // Smoothly scroll to the target div over 800 milliseconds
    });


    $('.navbar-toggler').click(function(){
        $('#nav-mbl').toggleClass('navbar-mbl');
    });

    $('.nav-mbl-link').click(function(){
        $('.navbar-toggler').click();
    });


    $(window).scroll(function() {
        if ($(this).scrollTop() > 50) { // Check if the scroll is more than 50px
            $('#nav-mbl').addClass('navbar-mbl-scr');
        } else {
            $('#nav-mbl').removeClass('navbar-mbl-scr');
        }    
    });

    $('.gallery').masonry({
        // options
        itemSelector: '.gallery-item',
        columnWidth: '.gallery-item',  // Optional if you want all items to have the same width
        percentPosition: true          // Ensures that items use percentage-based widths
    });
    


});
