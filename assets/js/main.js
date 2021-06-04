const projects = [
  {
    id:1,
    title: " مجمع اران السكني ",
    info: "مجمع سكني متكامل مع جميع الخدمات",
    img: "./assets/img/projects/aran/1.jpg",
    category:"management",
    href: "/ar/projects/aran"
  },
  {
    id:2,
    title: " مدينة العاب جنات واسط المائية",
    info: "",
    img: "./assets/img/projects/jannat-wasit/3.jpg",
    category:"management",
    href: "/ar/projects/jannat-wasit"
  },
]

const team = [
  {
    id:1,
    name: "Walter White",
    position: "Chief Executive Officer",
    bio: "Magni qui quod omnis unde et eos fuga et exercitationem. Odio veritatis perspiciatis quaerat qui aut aut aut",
    img: "assets/img/team/team-1.jpg",
  },
  {
    id:2,
    name: "Sarah Jhinson",
    position: "Product Manager",
    bio: "Magni qui quod omnis unde et eos fuga et exercitationem. Odio veritatis perspiciatis quaerat qui aut aut aut",
    img: "assets/img/team/team-2.jpg",
  },
  {
    id:1,
    name: "Walter White",
    position: "Chief Executive Officer",
    bio: "Magni qui quod omnis unde et eos fuga et exercitationem. Odio veritatis perspiciatis quaerat qui aut aut aut",
    img: "assets/img/team/team-1.jpg",
  },
  {
    id:2,
    name: "Sarah Jhinson",
    position: "Product Manager",
    bio: "Magni qui quod omnis unde et eos fuga et exercitationem. Odio veritatis perspiciatis quaerat qui aut aut aut",
    img: "assets/img/team/team-2.jpg",
  },
]
!(function($) {
  "use strict";

  // Smooth scroll for the navigation menu and links with .scrollto classes
  var scrolltoOffset = $('#header').outerHeight() - 1;
  $(document).on('click', '.nav-menu a, .mobile-nav a, .scrollto', function(e) {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      if (target.length) {
        e.preventDefault();

        var scrollto = target.offset().top - scrolltoOffset;

        if ($(this).attr("href") == '#header') {
          scrollto = 0;
        }

        $('html, body').animate({
          scrollTop: scrollto
        }, 1500, 'easeInOutExpo');

        if ($(this).parents('.nav-menu, .mobile-nav').length) {
          $('.nav-menu .active, .mobile-nav .active').removeClass('active');
          $(this).closest('li').addClass('active');
        }

        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
          $('.mobile-nav-overly').fadeOut();
        }
        return false;
      }
    }
  });

  // Activate smooth scroll on page load with hash links in the url
  $(document).ready(function() {
    if (window.location.hash) {
      var initial_nav = window.location.hash;
      if ($(initial_nav).length) {
        var scrollto = $(initial_nav).offset().top - scrolltoOffset;
        $('html, body').animate({
          scrollTop: scrollto
        }, 1500, 'easeInOutExpo');
      }
    }
  });

  // Mobile Navigation
  if ($('.nav-menu').length) {
    var $mobile_nav = $('.nav-menu').clone().prop({
      class: 'mobile-nav d-lg-none'
    });
    $('body').append($mobile_nav);
    $('body').prepend('<button type="button" class="mobile-nav-toggle d-lg-none"><i class="icofont-navigation-menu"></i></button>');
    $('body').append('<div class="mobile-nav-overly"></div>');

    $(document).on('click', '.mobile-nav-toggle', function(e) {
      $('body').toggleClass('mobile-nav-active');
      $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
      $('.mobile-nav-overly').toggle();
    });

    $(document).on('click', '.mobile-nav .drop-down > a', function(e) {
      e.preventDefault();
      $(this).next().slideToggle(300);
      $(this).parent().toggleClass('active');
    });

    $(document).click(function(e) {
      var container = $(".mobile-nav, .mobile-nav-toggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
          $('.mobile-nav-overly').fadeOut();
        }
      }
    });
  } else if ($(".mobile-nav, .mobile-nav-toggle").length) {
    $(".mobile-nav, .mobile-nav-toggle").hide();
  }

  // Navigation active state on scroll
  var nav_sections = $('section');
  var main_nav = $('.nav-menu, #mobile-nav');

  $(window).on('scroll', function() {
    var cur_pos = $(this).scrollTop() + 200;

    nav_sections.each(function() {
      var top = $(this).offset().top,
        bottom = top + $(this).outerHeight();

      if (cur_pos >= top && cur_pos <= bottom) {
        if (cur_pos <= bottom) {
          main_nav.find('li').removeClass('active');
        }
        main_nav.find('a[href="#' + $(this).attr('id') + '"]').parent('li').addClass('active');
      }
      if (cur_pos < 300) {
        $(".nav-menu ul:first li:first").addClass('active');
      }
    });
  });

  // Toggle .header-scrolled class to #header when page is scrolled
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('#header').addClass('header-scrolled');
      $('#topbar').addClass('topbar-scrolled');
    } else {
      $('#header').removeClass('header-scrolled');
      $('#topbar').removeClass('topbar-scrolled');
    }
  });

  if ($(window).scrollTop() > 100) {
    $('#header').addClass('header-scrolled');
    $('#topbar').addClass('topbar-scrolled');
  }

  // Intro carousel
  var heroCarousel = $("#heroCarousel");
  var heroCarouselIndicators = $("#hero-carousel-indicators");
  heroCarousel.find(".carousel-inner").children(".carousel-item").each(function(index) {
    (index === 0) ?
    heroCarouselIndicators.append("<li data-target='#heroCarousel' data-slide-to='" + index + "' class='active'></li>"):
      heroCarouselIndicators.append("<li data-target='#heroCarousel' data-slide-to='" + index + "'></li>");
  });

  heroCarousel.on('slid.bs.carousel', function(e) {
    $(this).find('h2').addClass('animate__animated animate__fadeInDown');
    $(this).find('p, .btn-get-started').addClass('animate__animated animate__fadeInUp');
  });

  // Back to top button
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
    } else {
      $('.back-to-top').fadeOut('slow');
    }
  });

  $('.back-to-top').click(function() {
    $('html, body').animate({
      scrollTop: 0
    }, 1500, 'easeInOutExpo');
    return false;
  });

  // Clients carousel (uses the Owl Carousel library)
  // $(".project-carousel").owlCarousel({
  //   autoplay: true,
  //   loop: true,
  //   responsive: {
  //     0: {
  //       items: 1
  //     },
  //     768: {
  //       items: 3
  //     },
  //     900: {
  //       items: 3
  //     }
  //   }
  // });

  $(".team-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    autoplayTimeout: 4000,
    autoplayHoverPause: true, 
    nav: true,
    navText: ["<div class='nav-button owl-prev d-flex align-items-center'>‹</div>", "<div class='nav-button owl-next d-flex align-items-center'>›</div>"],
    responsive: {
      0: {
        items: 1,
        nav: false
      },
      768: {
        items: 3
      },
      900: {
        items: 3
      }
    }
  })
  // Porfolio isotope and filter
  $(window).on('load', function() {
    var portfolioIsotope = $('.portfolio-container').isotope({
      itemSelector: '.portfolio-item'
    });

    $('#portfolio-flters li').on('click', function() {
      $("#portfolio-flters li").removeClass('filter-active');
      $(this).addClass('filter-active');

      portfolioIsotope.isotope({
        filter: $(this).data('filter')
      });
    });

    // Initiate venobox (lightbox feature used in portofilo)
    $(document).ready(function() {
      $('.venobox').venobox();
    });
  });

  // Portfolio details carousel
  // $(".portfolio-details-carousel").owlCarousel({
  //   autoplay: true,
  //   dots: true,
  //   loop: true,
  //   items: 1
  // });

  var owl = $('.portfolio-details-carousel');
  owl.owlCarousel({
    items:1,
    loop:true,
    autoplay:true,
    autoplayTimeout:3000,
    autoplayHoverPause:true
  });
  AOS.init();




  // map
  mapboxgl.accessToken = 'pk.eyJ1IjoiaHVzc2VpbnRhbGFsIiwiYSI6ImNrY3M4dWxwbzFtZDIycnM2OHQ4dXM4cnIifQ.ofCZrIlVF_r4YpQDzSi13g';
  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [44.433509826660156, 33.296268463134766],
    zoom: 4
});
 
// Create a default Marker and add it to the map.
const marker1 = new mapboxgl.Marker({
  color: "#FF1111"
  })
.setLngLat([44.016120243149615, 36.24856238136248])
.addTo(map);
const marker2 = new mapboxgl.Marker({
  color: "#FF1111"
})
.setLngLat([44.433509826660156, 33.296268463134766])
.addTo(map);

//adding the projects 

projects.forEach(project => {
  const container = $(".portfolio-container")[0];
  container.insertAdjacentHTML('afterbegin',`
  
    <div class="col-md-4 portfolio-item filter-${project.category}">
      <div class="property-card">
        <a href="${project.href}">
          <div class="property-image" style="background-image:url(${project.img});">
          </div>
        </a>
        <div class="property-description">
          <h5>${project.title}</h5>
          <p>${project.info}</p>
        </div>
      </div>
    </div>
  `)
})

})(jQuery);