function initializeAccordion() {
    $('.accordion-header').click(function() {
      var accordionContent = $(this).next('.accordion-content');
      accordionContent.slideToggle();
      $('.accordion-content').not(accordionContent).slideUp(); // Close other accordions
      
      var newImage = $(this).data('image');
      var currentImage = $('#image').attr('src');
      
      if (currentImage !== newImage) {
        $('#image').fadeOut(300, function() {
          $(this).attr('src', newImage).fadeIn(300); // Fade out and fade in with the new image
        });
      }
    });
  }

  $(document).ready(function() {
    initializeAccordion();
});

(function() {
    var previousWorkCarousel = new Splide('.previous-work-carousel', {
      type: 'loop', // Enable infinite looping
      arrows: false, // Hide default arrows
      pagination: false, // Hide page indicator
      gap: '1em'
    }).mount();

    var prevButtonPreviousWork = document.getElementById('prev-previous-work');
    var nextButtonPreviousWork = document.getElementById('next-previous-work');

    prevButtonPreviousWork.addEventListener('click', function() {
      previousWorkCarousel.go('-');
    });

    nextButtonPreviousWork.addEventListener('click', function() {
      previousWorkCarousel.go('+');
    });

    var reviewCarousel = new Splide('.review-carousel', {
      type: 'loop', // Enable infinite looping
      perPage: getPerPage(), // Display different number of slides based on screen size
      arrows: false, // Hide default arrows
      pagination: false, // Hide page indicator
      autoplay: 'play',
      interval: 5000,
      gap: '1em'
    }).mount();

    function getPerPage() {
      if (window.innerWidth >= 1024) {
        return 3; // Display 4 slides for large screens (1024px and above)
      } else if (window.innerWidth >= 768) {
        return 2; // Display 3 slides for medium screens (768px and above)
      } else {
        return 1; // Display 2 slides for small screens (below 768px)
      }
    }

    window.addEventListener('resize', function() {
      reviewCarousel.options.perPage = getPerPage(); // Update the perPage option
      reviewCarousel.refresh(); // Refresh the Splide instance
    });

    // // Custom button functionality
    // var prevButtonReview = document.getElementById('review-prev');
    // var nextButtonReview = document.getElementById('review-next');

    // prevButtonReview.addEventListener('click', function() {
    //   reviewCarousel.go('-');
    // });

    // nextButtonReview.addEventListener('click', function() {
    //   reviewCarousel.go('+');
    // });
  })();

  function navigationButton() {
    const navButton = document.getElementById('navButton');
    const menu = document.getElementById('menu');
    const links = menu.getElementsByTagName('a');
  
    const tl = gsap.timeline({ paused: true });
  
    tl.fromTo(
      menu,
      { opacity: 0, paddingTop: 0, paddingBottom: 0 },
      { opacity: 1, paddingTop: '64px', paddingBottom: '16px', duration: 0.3, ease: 'power2.out' }
    );
    tl.fromTo(
      menu,
      { clipPath: 'inset(0 0 100% 0)' },
      { clipPath: 'inset(0 0 0% 0)', duration: 0.3, ease: 'power2.out' }
    );
  
    navButton.addEventListener('click', function() {
      navButton.classList.toggle('active');
      menu.classList.toggle('active');
  
      if (menu.classList.contains('active')) {
        menu.style.height = '';
        menu.style.visibility = 'visible';
        menu.style.clipPath = 'inset(0 0 100% 0)';
        tl.play();
      } else {
        tl.reverse().then(() => {
          menu.style.height = '0';
          menu.style.visibility = 'hidden';
        });
      }
    });
  
    Array.from(links).forEach(function(link) {
      link.addEventListener('click', function() {
        navButton.classList.remove('active');
        menu.classList.remove('active');
        tl.reverse().then(() => {
          menu.style.height = '0';
          menu.style.visibility = 'hidden';
        });
      });
    });
  }
  
  navigationButton();