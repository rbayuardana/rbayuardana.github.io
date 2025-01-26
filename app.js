$(document).ready(function(){
    console.log('Hello World');

    $('.nav-button-nav').on('click', function(event) {
      event.preventDefault(); // Prevent the default behavior of the link
      // var target = $(this).attr('href'); // Get the target section id from the href attribute
      const target = $($(this).attr('href'));
      const id = $(this).attr('href');
      // console.log(id);
      var offset = 0;
      if(id != '#gallery'){
        offset = $(window).height() / 2 - target.outerHeight() / 2
      }else{
        offset = 0;
      }
      $('html, body').animate({
        
        scrollTop: $(target).offset().top - offset
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

    document.addEventListener("scroll", function () {
        const navbar = document.getElementById("nav");
        const navcon = document.getElementById("navcon");
        if (window.scrollY > 20) { // Adjust scroll threshold as needed
          navbar.classList.add("scrolled");
          navcon.classList.add("scrolled");
        } else {
          navbar.classList.remove("scrolled");
          navcon.classList.remove("scrolled");
        }
    });
      
    




});
