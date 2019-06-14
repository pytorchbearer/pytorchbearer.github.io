function animateScrollTop(target, duration) {
  duration = duration || 16;
  var scrollTopProxy = { value: $(window).scrollTop() };
  if (scrollTopProxy.value != target) {
    $(scrollTopProxy).animate(
      { value: target },
      { duration: duration, step: function (stepValue) {
          var rounded = Math.round(stepValue);
          $(window).scrollTop(rounded);
      }
    });
  }
}


function scroll_to(clicked_link, nav_height) {
	var element_class = clicked_link.attr('href').replace('#', '.');
	var scroll_to = 0;
	if(element_class != '.top-content') {
		element_class += '-container';
		scroll_to = $(element_class).offset().top - nav_height;
	}
	if($(window).scrollTop() != scroll_to) {
    animateScrollTop(scroll_to, 600);
	}
}


jQuery(document).ready(function() {
  /*
   * Top Carousel
   */
  $('#topCarousel').on('slide.bs.carousel', function(e) {
    $('#topIndicators li:nth-child(' + (e.from + 1) + ')').removeClass('active');
    $('#topIndicators li:nth-child(' + (e.to + 1) + ')').addClass('active');
  });

  $('#swipeTarget').swipe({
    swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
      if (direction == 'right') {
        $('#topCarousel').carousel('prev');
      } else if (direction == 'left') {
        $('#topCarousel').carousel('next');
      }
    }
  });


  // on('swiperight', function(e) {
  //   console.log('test');
  //   $('#topCarousel').carousel('next');
  // });
  //
  // $('#swipeTarget').on('swipeleft', function(e) {
  //   $('#topCarousel').carousel('prev');
  // });

  /*
   * Tootltips
   */
  $('[data-toggle="tooltip"]').tooltip();

  /*
   * Navbar size change
   */
   $("#navbarNavDropdown").on('hidden.bs.collapse', function () {
     Waypoint.refreshAll();
   })
   $("#navbarNavDropdown").on('shown.bs.collapse', function () {
     Waypoint.refreshAll();
   })

   /*
    * Navbar shade
    */
   $("#navbarNavDropdown").on('hide.bs.collapse', function () {
     $(".navbar").removeClass('open');
   })
   $("#navbarNavDropdown").on('show.bs.collapse', function () {
     $(".navbar").addClass('open');
   })

  $('.copy').on('click', function() {
    var $temp = $("<input>");
    $("body").append($temp);
    $temp.val($(this).text().trim()).select();
    document.execCommand("copy");
    $temp.remove();
    $(this).attr('data-original-title', "Copied!").tooltip('show');
    $(this).attr('data-original-title', "Click to Copy")
  });

	/*
	 * Navigation
	 */
	$('a.scroll-link').on('click', function(e) {
		e.preventDefault();
		scroll_to($(this), $('nav').outerHeight());
	});
	// toggle "navbar-no-bg" class
	$('.dummy-top').waypoint({
    handler: function() {
      $('nav').toggleClass('navbar-no-bg');
    },
    offset: function() {
      return - $('.dummy-top').outerHeight() + $('nav').outerHeight() + 1;
    }
  });

  /*
   * Collapse icons
   */
   $('.collapse-link').on('click', function() {
     $(this).toggleClass('down');
   });
});
