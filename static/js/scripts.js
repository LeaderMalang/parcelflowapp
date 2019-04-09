/* ------------------------------------------------
---------------------------------------------------

Main JavaScript Document
    Version: 1.0

---------------------------------------------------
--------------------------------------------------- */


/* ------------------------------------------------

    Navigation

--------------------------------------------------- */


/* ------------------------------------------------
    Responsive Scripts for Navigation
--------------------------------------------------- */


function navResponsive() {
	if (screenWidth > 991) {
		$(".main-nav .navbar-nav > .dropdown > a").attr("data-toggle", "");
		$(".main-nav .navbar-nav.nav-search > .dropdown > a").attr("data-toggle", "dropdown");
		$('.main-nav .navbar-nav > .dropdown').removeClass('open');
		$('.main-nav .navbar-nav .dropdown-submenu').removeClass('open');
		$('.main-nav .navbar-nav > li').find(':focus').blur();
		if ( $('.main-nav .navbar-collapse').hasClass('in') ) {
			$('.main-nav .navbar-collapse').removeClass('in');
		}
	}
	else if  (screenWidth <= 991)  {
		$(".main-nav .navbar-nav > .dropdown > a").attr("data-toggle", "dropdown");
		$('.main-nav .nav > li .dropdown-menu').removeAttr('style');
		$('.main-nav .nav > li > .dropdown-menu').removeAttr('style');
	}
}


/* ------------------------------------------------
    Navigation's Click, Hover and Keyup Events
--------------------------------------------------- */


function navEvents() {
	
    /*---- Dropdown Menu Events ----*/
    
    $('.main-nav .navbar-nav > .dropdown > .dropdown-menu').click(function(event) {
    	if(screenWidth <= 991) {
			event.stopPropagation();
		}
	});
	
	$( ".main-nav .navbar-nav>.dropdown>.dropdown-menu>.dropdown-submenu" ).click(function(event) {
		if(screenWidth < 991) {
			$(this)
				.siblings(".dropdown-submenu")
				.removeClass("open")
				.end(); 
			$( this ).parents(".dropdown-submenu").addClass('open');
			$( this ).toggleClass('open');
			event.stopPropagation();
		}
	});
	
	$('.main-nav .navbar-nav > .dropdown > a').click(function(event) {
    	$('.main-nav .navbar-nav .dropdown-submenu').removeClass('open');
    });	
	
	$('.main-nav .nav > li .dropdown-submenu > a').click(function(event) {
		if(screenWidth > 991) {
			event.stopPropagation();
		}
	});
	
	$('.main-nav .nav > li').hover(function() {
		var dropdownList = $(this).find("> .dropdown-menu");

		if (screenWidth > 991) {
			
			/*---- Dropdown Animation on Hover ----*/

			dropdownList.addClass('animated fadeIn');        
			window.setTimeout( function(){
				dropdownList.removeClass('animated fadeIn');
			}, 500);        

			/*---- Positioning Dropdown Menu ----*/
			
			if(!dropdownList.hasClass('megamenu')){
				var childDropdownList = $(this).find(".dropdown-submenu .dropdown-menu"),
				dropdownOffset = $(this).offset(),
				offsetLeft = dropdownOffset.left,
				dropdownWidth = dropdownList.width(),
				childWidth = childDropdownList.width(),
				docWidth = $(window).width(),
				aWidth = $(this).children("a").outerWidth(),
				shiftWidth = Math.abs(dropdownWidth - aWidth),
				childShiftWidth = dropdownWidth + childWidth - 1,
				isDropdownVisible = (offsetLeft + dropdownWidth <= docWidth),
				isChildDropdownVisible = (offsetLeft + dropdownWidth + childWidth <= docWidth);
				if (!isDropdownVisible) {
					dropdownList.css('margin-left','-'+shiftWidth+'px')
					childDropdownList.css('margin-left','-'+childShiftWidth+'px')
				} else if (!isChildDropdownVisible) {
					childDropdownList.css('margin-left','-'+childShiftWidth+'px')
				}
				else {
					dropdownList.removeAttr('style')
					childDropdownList.removeAttr('style')
				}
			}
			
			/*---- Positioning Mega Menu ----*/
			
			else if(dropdownList.hasClass('megamenu')){
				dropdownList.css('position','absolute');
				var dropdownOffset = $(this).offset(),
				linkWidth = $(this).width(),
				dropdownListOffset = dropdownList.offset(),
				offsetLeft = dropdownOffset.left,
				dropdownListoffsetLeft = dropdownListOffset.left,
				calculateOffset = 0,
				dropdownWidth = dropdownList.width(),
				docWidth = $(window).width(),
				shiftOffset = (($('.navigation').hasClass('transparent')) ? 30 : 30),
				positionedValue = Math.abs(offsetLeft),
				shiftWidth = Math.abs(positionedValue + dropdownWidth + shiftOffset),
				isDropdownVisible = (shiftWidth <= docWidth);
				if($('.navigation').hasClass('detached')){
					return;
				}
				else {
					if (!isDropdownVisible) {
						
						calculateOffset = docWidth - dropdownWidth - shiftOffset;
						dropdownList.css('left',+calculateOffset+'px');
					}
					else {
						dropdownList.css('left',+positionedValue+'px');
					}
				}
				
			}
		}
		
	});
	
	
/* ------------------------------------------------
	Side Navigation Events
--------------------------------------------------- */

	
	$(".nav-trigger").click(function(e) {
		e.preventDefault();
		if ($('.side-menu').hasClass("active")) {
			if ( $('ul.cosllapse').hasClass('in') ) {
				$('ul.collapse').removeClass('in');
			}
		}
		$(".side-menu").toggleClass("active");
	});

	$(".nav-icons-trigger").click(function(e) {
		e.preventDefault();
		if ($('.side-menu-icons').hasClass("active")) {
			if ( $('ul.collapse').hasClass('in') ) {
			$('ul.collapse').removeClass('in');
		}	
		}
		$(".side-menu-icons").toggleClass("active");
	});

	$( ".side-menu .navbar-nav > li > .menu-dropdown-link" ).click(function(event) {
		$(this)
			.parent(".with-dropdown")
			.siblings(".with-dropdown")
			.children(".menu-dropdown.collapse")
			.removeClass("in")
			.end(); 
		$( this ).parents(".with-dropdown").children(".menu-dropdown.collapse").toggleClass('in');
		event.stopPropagation();
	});

	$('.side-menu li.with-dropdown a.menu-dropdown-link').click(function () {
		$('.active-dropdown').not($(this)).removeClass('active-dropdown');
		$(this).toggleClass('active-dropdown');
	});

	$( ".side-menu-icons .navbar-nav > li > .menu-dropdown-link" ).click(function(event) {
		$(this)
			.parent(".with-dropdown")
			.siblings(".with-dropdown")
			.children(".menu-dropdown.collapse")
			.removeClass("in")
			.end(); 
		$( this ).parents(".with-dropdown").children(".menu-dropdown.collapse").toggleClass('in');
		event.stopPropagation();
	});

	
}


/* ------------------------------------------------
    Header Search Box
--------------------------------------------------- */


function headerSearch() {
    $(document).on("click", '.navbar-collapse form[role="search"]:not(.active) button[type="submit"]', function(e) {
        e.preventDefault();
        var t = $(this).closest("form"),
            n = t.find("input");
        t.addClass("active"), n.focus(), e.preventDefault()
    }); 
	$(document).on("click", '.navbar-collapse form[role="search"].active button[type="submit"]', function(e) {
        e.preventDefault();
        var t = $(this).closest("form"),
            n = t.find("input");
        "" != n.val() && t.submit(), closeSearch()
    }); 
	$(document).mouseup(function(e) {
        var t = $('.navbar-collapse form[role="search"].active');
        t.is(e.target) || 0 !== t.has(e.target).length || t.removeClass("active")
    })
}

function closeSearch() {
    var e = $('.navbar-collapse form[role="search"].active');
    e.find("input").val(""), e.removeClass("active"), $(".navbar-form").show()
}

/* ------------------------------------------------
    Top Header Search Panel
--------------------------------------------------- */


function topSearch() {
    var e = $(".searchbox-icon"),
        t = $(".searchbox-input"),
        n = $(".searchbox"),
        i = !1;
    e.click(function() {
        0 == i ? (n.addClass("searchbox-open"), t.focus(), i = !0) : (n.removeClass("searchbox-open"), t.focusout(), i = !1)
    }), e.mouseup(function() {
        return !1
    }), n.mouseup(function() {
        return !1
    }), $(document).mouseup(function() {
        1 == i && ($(".searchbox-icon").css("display", "block"), e.click())
    })
}

function buttonUp() {
    var e = $(".searchbox-input").val();
    e = $.trim(e).length, 0 !== e ? $(".searchbox-icon").css("display", "none") : ($(".searchbox-input").val(""), $(".searchbox-icon").css("display", "block"))
}

$("#searchBox").focus(function() {
    $("#searchBox").animate({
        width: "200px"
    }, 200)
});

$("#searchBox").blur(function() {
    $("#searchBox").animate({
        width: "80px"
    }, 200)
});

$("#searchBox").on("keyup", function(e) {
    13 == e.which && (e.preventDefault(), $("#search").submit())
});


/* ------------------------------------------------
    Sticky Navigation
--------------------------------------------------- */


/*---- Sticky Nav's Global Variables ----*/


var headerHeight = $('.main-nav').outerHeight(),
	headerVisiblePos = 0,
	headerFixedPos = 0,
	isHeaderFixed = false,
	isHeaderVisible = false;
	
function stickyMenu(){
	if ($('.main-nav').hasClass('sticky')) {
		var headerY = $('.navigation').offset().top + 1;
		if ($('.main-nav').hasClass('extended')) {
			var headerHR = $('.main-nav').removeClass('shrink').height();
			$('.navigation').css('height',headerHR);
			headerFixedPos = headerY + headerHR;
		}
		else {
			$('.navigation').css('height',headerHeight);
			headerFixedPos = headerY + headerHeight;
		}
		headerVisiblePos = headerFixedPos + 20;
		if ($(window).scrollTop() > headerVisiblePos) {
				$('.main-nav').addClass('shrink slide-in')
				isHeaderFixed = true;
				isHeaderVisible = true;
		}
		window.addEventListener('scroll', function(e){
    		var winY = $(window).scrollTop();
			if((winY < headerFixedPos)&&(isHeaderFixed)){
				$('.main-nav').removeClass('shrink');
				isHeaderFixed = false;
				if (isHeaderVisible) {
					$('.main-nav').removeClass('slide-in');
					isHeaderVisible = false;
				}
			}
			 else if((winY > headerFixedPos)&&(!isHeaderFixed)){
				$('.main-nav').addClass('shrink');
				isHeaderFixed = true;
			}
			else if((winY > headerVisiblePos)&&(!isHeaderVisible)){
				$('.main-nav').addClass('slide-in');
				isHeaderVisible = true;
			}
			else if((winY > headerFixedPos)&&(winY < headerVisiblePos)&&(isHeaderVisible)){
				$('.main-nav').removeClass('slide-in')
				isHeaderVisible = false;
			}
		});
	}
}
	

/* ------------------------------------------------
    One Page Navigation
--------------------------------------------------- */


function navOnePage() {
    if( $('body').hasClass('one-page')){	
        var offset = 0,
			delay =0;
		var $sections = $('.one-page-section');
        if($('.main-nav').hasClass('sticky')){
            offset = 60;
        }
		if($('body').find('.owl-carousel.one-page-section')){
            delay = 800;
        }
		else {
			delay = 100;
		}
		window.setTimeout(function() {
			sectionOffset();
		}, delay);
		function sectionOffset(){
            var currentScroll = $(this).scrollTop() + offset;
            var $currentSection;
            $sections.each(function(){
				var divPosition = $(this).offset().top;
                var divHeight = $(this).outerHeight();
                var total = divPosition + divHeight;
                if($(window).scrollTop() + screenHeight >= $(document).height() - offset) {
                    $currentSection = $sections.last();
                }
                else if( divPosition - 1 < currentScroll ){
                    $currentSection = $(this);
                }
            });
            var id = $currentSection.attr('id');
            $('.main-nav .nav > li').removeClass('active');
            $("[href=#"+id+"]").parent('li').addClass('active');
        }
		var timer;  
        $(window).scroll(function(){
            if(timer){
                sectionOffset();
            }
            else {
                timer = window.setTimeout(function() {
                    sectionOffset();
                }, 100);
            }
        });
        var scrollActive = '';
        $('.main-nav .nav li a[href*=#]:not([href=#])').click(function(e) {
			e.preventDefault();
			if(scrollActive == true) {
			    event.preventDefault();	
            }
            else {
                var offset = 59;
                scrollActive = true;
                if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
                    var target = $(this.hash);
                    target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
                    if (target.length) {
                        $('html,body').animate({
                            scrollTop: target.offset().top - offset
                        }, 1000, "easeInQuart" , function() {
                            scrollActive = false;
                        });
                        return false;
                    }
                }
            }
        });
    }
}


/* ------------------------------------------------
    
	Fixed Footer

--------------------------------------------------- */


function fixedFooter() {
    var e = $(".uncover-footer").outerHeight();
    $(".footer-reveal").css("height", e + "px")
}


/* ------------------------------------------------

    Centering Modal Box

--------------------------------------------------- */


function centerModal() {
    $(window).height() >= 320 && adjustModal()
}

function adjustModal() {
    $(".modal").each(function() {
        0 == $(this).hasClass("in") && $(this).show();
        var e = $(window).height() - 60,
            t = $(this).find(".modal-header").outerHeight() || 2,
            n = $(this).find(".modal-footer").outerHeight() || 2;
        $(this).find(".modal-content").css({
            "max-height": function() {
                return e
            }
        }), $(this).find(".modal-body").css({
            "max-height": function() {
                return e - (t + n)
            }
        }), $(this).find(".modal-dialog").addClass("modal-dialog-center").css({
            "margin-top": function() {
                return -($(this).outerHeight() / 2)
            },
            "margin-left": function() {
                return -($(this).outerWidth() / 2)
            }
        }), 0 == $(this).hasClass("in") && $(this).hide()
    })
}

/* ------------------------------------------------

    Sticky Element

--------------------------------------------------- */

function stickElement() {
    if (document.getElementById("stickyElement")) {
        var e = $(".stickyElement").width(),
            t = $(".stick-to-side").offset().top + $(".stick-to-side").height(),
            e = $(".stickyElement").width(),
            n = $(".stickyElement").parent().height(),
            i = document.getElementById("sticky-container");
			i.style.width = e + "px", stickyElementY = $(".stickyElement").offset().top - 60, stickyElementSetPoint = t - n - 60, stickyElementTop = $(".stick-to-side").innerHeight() - n, 991 > screenWidth ? ($(".stickyElement").removeClass("stickTop"), $(".stickyElement").removeAttr("style")) : $(window).scrollTop() > stickyElementSetPoint && ($(".stickyElement").removeAttr("style"), isStickyElementFixed = !1), window.addEventListener("scroll", function() {
            winScrollY = $(window).scrollTop(), screenWidth > 991 ? winScrollY > stickyElementY && stickyElementSetPoint > winScrollY ? ($(".stickyElement").addClass("stickTop"), $(".stickyElement").removeAttr("style"), isStickyElementFixed = !1) : winScrollY > stickyElementSetPoint && !isStickyElementFixed ? ($(".stickyElement").removeClass("stickTop"), $(".stickyElement").attr("style", "position:absolute; top:" + stickyElementTop + "px"), isStickyElementFixed = !0) : stickyElementY > winScrollY && ($(".stickyElement").removeClass("stickTop"), isStickyElementFixed = !1) : 991 > screenWidth && !stickyElementDisabled && ($(".stickyElement").removeClass("stickTop"), $(".stickyElement").removeAttr("style"), stickyElementDisabled = !0)
        })
    }
}

/* ------------------------------------------------

    Theme Background Section

--------------------------------------------------- */

function themeImageSection () {
    var fullScreenImage = document.getElementsByClassName("theme-background-section");
    if(document.getElementsByClassName("theme-background-section")){
        var windowH = window.innerHeight;
        $('.theme-background-section').each(function(){ 
            $selection =  $(this);
            if($selection.hasClass('custom-height')) {
                var customHeight = $selection.attr('data-custom-height');
                if (typeof customHeight !== typeof undefined && customHeight !== false && customHeight !== '') {
                    var decCustomHeight = customHeight/100;
                    windowH = windowH * decCustomHeight;
                }
            }
            else if($selection.hasClass('half-screen')){
                windowH = windowH/2;
            }
            else if($selection.hasClass('half-screen-width')){
                windowW = screenWidth/2;
                $selection.css('width', windowW + 'px');
            }
            else {
                var offsetContainer = $selection.attr('data-offset-container');
                if (typeof offsetContainer !== typeof undefined && offsetContainer !== false && offsetContainer !== '' && screenWidth > 767) {
                    var containerArray = offsetContainer.split(",");
                    var i, offsetHeight = 0, currentContainer;
                    for (i = 0; i < containerArray.length; i++) { 
                        currentContainer = String(containerArray[i]);
                        offsetHeight += $(currentContainer).outerHeight();
                    }
                    windowH = windowH - offsetHeight;
                }
            }
            if($selection.find('.content-container').outerHeight() > windowH) {
                $selection.css('height', 'auto');
                $selection.find('.fade-scroll').removeClass('fade-scroll');
            }
            else {
                $selection.css('height', windowH + 'px');
            }
            if($selection.closest(".owl-carousel").length ) {
                window.setTimeout(function(){
                    if($selection.find('.content-container').outerHeight() > windowH) {
                        $('.theme-background-section').css('height', 'auto');
                        $('.theme-background-section').find('.fade-scroll').removeClass('fade-scroll').addClass('no-fade-scroll');
                    }
                    else {
                        $('.theme-background-section').css('height', windowH + 'px');
                        $('.theme-background-section').find('.no-fade-scroll').removeClass('no-fade-scroll').addClass('fade-scroll');
                    }
                },300);
            }
            $(window).scroll(function(){
                $(".fade-scroll").css("opacity", 1 - $(window).scrollTop() / (windowH/2));
            });
        });
    }
}


/* ------------------------------------------------
    
	Fixed Social Icons

--------------------------------------------------- */


function fixedSocialIcons() {
    var e = $(".social-fixed").outerHeight(),
        t = e / 2;
    $(".social-fixed").css("margin-top", "-" + t + "px")
}


/* ------------------------------------------------
    
	Bottom Contact Form & Scroll to Top

--------------------------------------------------- */


function bottomLinks () {
	if ($(document).scrollTop() > 100) {
		$('.to-top, .floating-contact, .floating-contact-panel').addClass('active');
	}
	$(window).scroll(function(){
		if ($(document).scrollTop() > 100) {
			$('.to-top, .floating-contact, .floating-contact-panel').addClass('active');
		} 
		else {
			$('.to-top, .floating-contact, .floating-contact-panel').removeClass('active');
		}
	});
	$(window).scroll(function(){
		if ($(document).scrollTop() > 100) {
			$('.to-top, .floating-contact, .floating-contact-panel').addClass('active');
		} 
		else {
			$('.to-top, .floating-contact, .floating-contact-panel').removeClass('active');
		}
		
	});
	$('.floating-contact').click(function(event){
		event.preventDefault();
		$('.floating-contact-panel').fadeToggle();
	});
	$(document).mouseup(function (e) {
		if(!$(e.target).closest('.bottomContactPanel').length) {
			if($('.bottomContactPanel').is(":visible")) {
				$('.bottomContactPanel').hide()
			}
		}
	});	 
	$('.to-top').click(function () {
		$("html, body").animate({
			scrollTop: 0
		}, 1000);
		return false;
	});
}


/* ------------------------------------------------
    
	Split Screen Section

--------------------------------------------------- */


function multiScroll() {
	if(document.getElementById('split-screen')) {
		$('#split-screen').multiscroll({
			sectionsColor: ['#1bbc9b', '#4BBFC3', '#7BAABE'],
			menu: '#menu',
			navigation: true,
			scrollingSpeed: 500,
			verticalCentered : true,
			loopBottom: true,
			loopTop: true,
		});
	}
}

function splitScreenImages() {
	if(document.getElementById('split-screen')) {
		if(window.innerWidth < 991) {
		   $( ".ms-section-right.ms-content" ).each(function(e) {
				var selector = $(this).attr('id');
				var baseDiv = document.getElementById(selector);
				var selectorID = selector.substr(selector.length - 1);
				var target = 'left'+ selectorID;
				var targetID = '#'+target;
				$(targetID).addClass('section-shifted');
				var targetDiv = document.getElementById(target);
				targetDiv.innerHTML = baseDiv.innerHTML;
		   });
		}
		else {
			$( ".ms-section-left" ).each(function(e) {
				if(!$(this).hasClass('ms-content')) {
					var selector = $(this).attr('id');
					var thisDiv = document.getElementById(selector);
					thisDiv.innerHTML = '';
				}
			});
		}
	}
}


/* ------------------------------------------------
    
	Promo Bar

--------------------------------------------------- */


$('.promo-bar a').click(function (e) {
	e.preventDefault();
	$('.promo-bar').slideUp('slow', function () {
		stickyMenu();	
	});
});


/* ------------------------------------------------
    
	Sliding Panel

--------------------------------------------------- */


$('.panel-trigger-button').click(function() {
	$('.sliding-panel .sliding-panel-content').slideToggle();
	$('.slide-panel').toggleClass('panel-close');
});


/* ------------------------------------------------
    
	# Links

--------------------------------------------------- */


$('a').click(function(e) {
	var link = $(this).attr('href');
	if(link == '#'){
		e.preventDefault();
	}
});


/* ------------------------------------------------
    
	Expandable Sections

--------------------------------------------------- */


$('.expandable-section a.expansion-trigger').click(function(e){
	e.preventDefault();
	if($(this).hasClass('down')) {
		$('.section-expand').slideDown();
		$('.expandable-section a.expansion-trigger.down, .expandable-section .expansion-text.exp').hide();
		$('.expandable-section a.expansion-trigger.up, .expandable-section .expansion-text.cls').fadeIn();
	}
	else if($(this).hasClass('up')) {
		$('.section-expand').slideUp();
		$('.expandable-section a.expansion-trigger.up, .expandable-section .expansion-text.cls').hide();
		$('.expandable-section a.expansion-trigger.down, .expandable-section .expansion-text.exp').fadeIn();

	}
});


/* ------------------------------------------------
    
	Career Form Conditional Fields

--------------------------------------------------- */


function ifEmployeed(e) {
	var option = val.value;
	if (option == 'Value1') {
		$('#current-company').show();
		$('#current-desig').show();
		$('#current-work-duration').show();
	}
	else {
		$('#current-company').hide();
		$('#current-desig').hide();
		$('#current-work-duration').hide();
	}
}


/* ------------------------------------------------
    
	Today's Date

--------------------------------------------------- */


function dateToday() {
    if (document.getElementById("dateToday")) {
        var e = new Date,
            t = e.getDay(),
            n = e.getMonth() + 1,
            i = e.getDate(),
            o = e.getFullYear();
        if ("0" == t) var a = "Sunday";
        else if ("1" == t) var a = "Monday";
        else if ("2" == t) var a = "Tuesday";
        else if ("3" == t) var a = "Wednesday";
        else if ("4" == t) var a = "Thursday";
        else if ("5" == t) var a = "Friday";
        else if ("6" == t) var a = "Saturday";
        document.getElementById("dateToday").innerHTML = a + ", " + n + "/" + i + "/" + o
    }
}


/* ------------------------------------------------
    
	Coupon Code

--------------------------------------------------- */


$('a.coupon-trigger').click(function() {
	$('.inner.coupon-code').slideDown();
	$('.coupon-trigger').hide();
	$('.coupon-close').fadeIn();
});

$('.coupon-close').click(function() {
	$('.inner.coupon-code').slideUp();
	$('.coupon-close').hide();
	$('.coupon-trigger').fadeIn();
});


/* ------------------------------------------------
    
	Jump Links

--------------------------------------------------- */


$('a[href*=#]:not([href=#]).jump').click(function() {
	if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
		var jumpOffset = 0;
		if($(this).attr('data-jump-offset')){
			jumpOffset = $(this).attr('data-jump-offset');
		}
		var target = $(this.hash);
		target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
		if (target.length) {
			$('html,body').animate({
				scrollTop: target.offset().top - jumpOffset
			}, 600);
			return false;
		}
	}
});
		

/* ------------------------------------------------
    
	Quantity Button

--------------------------------------------------- */


$('.qtyplus').click(function(e){
	e.preventDefault();
	fieldName = $(this).attr('title');
	var currentVal = parseInt($('input[name='+fieldName+']').val());
	if (currentVal == 24) {
		$('input[name='+fieldName+']').val(currentVal);
	}
	else if (!isNaN(currentVal) ) {
		$('input[name='+fieldName+']').val(currentVal + 1);
	} 
	else {
		$('input[name='+fieldName+']').val(0);
	}
});

$(".qtyminus").click(function(e) {
	e.preventDefault();
	fieldName = $(this).attr('title');
	var currentVal = parseInt($('input[name='+fieldName+']').val());
	if (!isNaN(currentVal) && currentVal > 0) {
		$('input[name='+fieldName+']').val(currentVal - 1);
	} else {
		$('input[name='+fieldName+']').val(0);
	}
});


/* ------------------------------------------------
    
	Checkout Form's Conditional Fields

--------------------------------------------------- */


$('input:checkbox[name=existingAddress]').click(function() {
	if ($(this).is(':checked')) {
		$("#addressForm :input").not('button').prop("disabled", true);
		$(this).prop("disabled", false);
	}
	else {
		$("#addressForm :input").prop("disabled", false);
	}
});

$('input:radio[name=paymentOptions]').click(function(){
	var val = $('input:radio[name=paymentOptions]:checked').val();
	if (val == 1) {
		$("#paymentForm :input").prop("disabled", false);
		$(".btn-card-type").removeAttr("style");	
	}
	else {
		$("#paymentForm :input").not('button').prop("disabled", true);
		$(".btn-card-type").attr("style","pointer-events: none; opacity:.65");
	}
});

/* ------------------------------------------------
    
	Initializing Tooltips

--------------------------------------------------- */


function tooltip() {
    $(".tip-top").tooltip({
        placement: "top",
        container: "body"
    }), $(".tip-right").tooltip({
        placement: "right",
        container: "body"
    }), $(".tip-bottom").tooltip({
        placement: "bottom",
        container: "body"
    }), $(".tip-left").tooltip({
        placement: "left",
        container: "body"
    })
}


/* ------------------------------------------------
    
	Google Map

--------------------------------------------------- */


function defaultMap() {
    if (document.getElementById("location-map")) {
        var e = "images/map-pin.png",
            t = {
                center: new google.maps.LatLng(40.7903, -73.9597),
                zoom: 13,
                zoomControl: !0,
                zoomControlOptions: {
                    style: google.maps.ZoomControlStyle.SMALL
                },
                panControl: !1,
                mapTypeControl: !1,
                scaleControl: !1,
                streetViewControl: !1,
                overviewMapControl: !1,
                rotateControl: !1,
                scrollwheel: !1,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                styles: [{
                    featureType: "water",
                    stylers: [{
                        visibility: "on"
                    }, {
                        color: "#acbcc9"
                    }]
                }, {
                    featureType: "landscape",
                    stylers: [{
                        color: "#f2e5d4"
                    }]
                }, {
                    featureType: "road.highway",
                    elementType: "geometry",
                    stylers: [{
                        color: "#c5c6c6"
                    }]
                }, {
                    featureType: "road.arterial",
                    elementType: "geometry",
                    stylers: [{
                        color: "#e4d7c6"
                    }]
                }, {
                    featureType: "road.local",
                    elementType: "geometry",
                    stylers: [{
                        color: "#fbfaf7"
                    }]
                }, {
                    featureType: "poi.park",
                    elementType: "geometry",
                    stylers: [{
                        color: "#c5dac6"
                    }]
                }, {
                    featureType: "administrative",
                    stylers: [{
                        visibility: "on"
                    }, {
                        lightness: 33
                    }]
                }, {
                    featureType: "road"
                }, {
                    featureType: "poi.park",
                    elementType: "labels",
                    stylers: [{
                        visibility: "on"
                    }, {
                        lightness: 20
                    }]
                }, {}, {
                    featureType: "road",
                    stylers: [{
                        lightness: 20
                    }]
                }]
            },
            n = new google.maps.Map(document.getElementById("location-map"), t);
        new google.maps.Marker({
            position: n.getCenter(),
            map: n,
            icon: e
        })
    }
}


/* ------------------------------------------------
    
	Initializing Owl Carousel

--------------------------------------------------- */


function owlC() {
    var e = $(".owl-carousel");
    e.owlCarousel({
        navigationText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"]
    })
}


/* ------------------------------------------------
    
	Initializing Counters

--------------------------------------------------- */


function counters() {
    $(".counter").counterUp({
        delay: 10,
        time: 2333
    })
}


/* ------------------------------------------------
    
	Initializing Isotope For Filtering

--------------------------------------------------- */


function isotope() {
    document.querySelector("body").offsetHeight > window.innerHeight && (document.documentElement.style.overflowY = "scroll");
    var e = $(".js-isotope");
    e.isotope({
        filter: "*",
        animationOptions: {
            duration: 750,
            easing: "linear",
            queue: !1
        }
    });
    var t = $(".filterArea");
    t.isotope({
        filter: "*",
        animationOptions: {
            duration: 750,
            easing: "linear",
            queue: !1
        }
    }), $(".filter a").click(function() {
        $(".filter .current").removeClass("current"), $(this).addClass("current");
        var e = $(this).attr("data-filter");
        return t.isotope({
            filter: e,
            animationOptions: {
                duration: 750,
                easing: "linear",
                queue: !1
            }
        }), !1
    })
}


/* ------------------------------------------------
    
	Initializing Shop Slider

--------------------------------------------------- */


function shopSlider() {
    document.getElementById("slider-shop") && $("#slider-shop").nivoSlider({
        effect: "fade",
        controlNavThumbs: !0,
        manualAdvance: !0,
        directionNav: !1
    })
}


/* ------------------------------------------------
    
	Initialzing Nivo Lightbox

--------------------------------------------------- */


function nivoLightbox() {
    $("a").nivoLightbox()
}


/* ------------------------------------------------
    
	Initializing Wow.js

--------------------------------------------------- */


function wowInit() {
    var wow = new WOW({
        //disabled for mobile
        mobile: false
    });
    wow.init();
}


/* ------------------------------------------------
    
	Initializing Knobs

--------------------------------------------------- */


function knobs() {
    $(".dial").each(function() {
        var e = $(this),
            t = e.attr("data-chart-value");
        e.waypoint(function() {
            e.knob({
                format: function(e) {
                    return e + "%"
                },
                draw: function() {
                    if ("tron" == this.$.data("skin")) {
                        var e, t = this.angle(this.cv),
                            n = this.startAngle,
                            i = this.startAngle,
                            o = i + t,
                            a = !0;
                        return this.g.lineWidth = this.lineWidth, this.o.cursor && (i = o - .3) && (o += .3), this.o.displayPrevious && (e = this.startAngle + this.angle(this.value), this.o.cursor && (n = e - .3) && (e += .3), this.g.beginPath(), this.g.strokeStyle = this.previousColor, this.g.arc(this.xy, this.xy, this.radius - this.lineWidth, n, e, !1), this.g.stroke()), this.g.beginPath(), this.g.strokeStyle = a ? this.o.fgColor : this.fgColor, this.g.arc(this.xy, this.xy, this.radius - this.lineWidth, i, o, !1), this.g.stroke(), this.g.lineWidth = 2, this.g.beginPath(), this.g.strokeStyle = this.o.fgColor, this.g.arc(this.xy, this.xy, this.radius - this.lineWidth + 1 + 2 * this.lineWidth / 3, 0, 2 * Math.PI, !1), this.g.stroke(), !1
                    }
                }
            }), $({
                value: 0
            }).animate({
                value: t
            }, {
                duration: 1600,
                easing: "swing",
                step: function() {
                    e.val(Math.ceil(this.value)).trigger("change"), e.val(Math.ceil(this.value)).trigger("change")
                }
            })
        }, {
            triggerOnce: !0,
            offset: "110%"
        })
    })
}


/* ------------------------------------------------
    
	Initializing Progress Bars

--------------------------------------------------- */


function progressBarsOnView() {
    $("div.progress-bar").waypoint(function() {
        $(this).css("width", $(this).attr("aria-valuenow") + "%")
    }, {
        offset: "100%"
    })
}


/* ------------------------------------------------
    
	Initialzing News Carousel

--------------------------------------------------- */


function newsCarousel() {
    document.getElementById("example") && $("#example").vTicker()
}


/* ------------------------------------------------
    
	Initializing Countdown 

--------------------------------------------------- */


function countDown() {
    document.getElementById("countdown") && $("#countdown").countdown("2016/12/01", function(e) {
        $(this).html(e.strftime('<span class="ticker-1">%D<br/>Days</span> <span class="ticker-2">%H<br/>Hours</span> <span class="ticker-3">%M<br/>Min</span> <span class="ticker-4">%S<br/>Sec</span>'))
    })
}


/* ------------------------------------------------
    
	Intializing Tweet

--------------------------------------------------- */


function tweets() {
    document.getElementById("recentTweets") && ! function(e, t, n) {
        var i, o = e.getElementsByTagName(t)[0],
            a = /^http:/.test(e.location) ? "http" : "https";
        e.getElementById(n) || (i = e.createElement(t), i.id = n, i.src = a + "://platform.twitter.com/widgets.js", o.parentNode.insertBefore(i, o))
    }(document, "script", "twitter-wjs")
}


/* ------------------------------------------------
    
	Initializing Dribble Shots

--------------------------------------------------- */


function dribbleShots () {
    if (document.getElementById('shotsByPlayerId')) {
        var callback = function (playerShots) {
            var html = '';
            $.each(playerShots.shots, function (i, shot) {
                html += '<a target="_blank" href="' + shot.url + '">';
                html += '<img src="' + shot.image_url + '" ';
                html += 'alt="' + shot.title + '"></a>';
            });
            $('#shotsByPlayerId').html(html);
        };
        $.jribbble.getShotsByPlayerId('envato', callback, {page: 1, per_page: 15});
    }
}


/* ------------------------------------------------
    
	Initializing Instagram Feed

--------------------------------------------------- */


function instagramFeed () {
    if (document.getElementById('widget-instagram')) {
        var userFeed = new Instafeed({
            get: 'user',
            userId: 1555075289,
            useHttp: true,
            limit: 5,
            target: 'widget-instagram',
            accessToken: '1555075289.1677ed0.d62c13234461442b88f353a895b591a4',
            template: '<a target="_blank" href="{{link}}"><img src="{{image}}" /></a>'
        });
        userFeed.run();
    }
}


/* ------------------------------------------------
    
	Initializing Flickr Thumbnails

--------------------------------------------------- */


function flickrThumbnails() {
    $(".flickr_badge_image a").attr("target", "_blank")
}


/* ------------------------------------------------
    
	Function Call and Initializing Global Variables

--------------------------------------------------- */


var headerHeight = $(".main-nav").outerHeight(),
    headerVisiblePos = 0,
    headerFixedPos = 0,
    isHeaderFixed = !1,
    isHeaderVisible = !1,
    isStickyElementFixed = !1,
    stickyElementSetPoint = 0,
    stickyElementY = 0,
    screenWidth = window.innerWidth,
	screenHeight = window.innerHeight,
    stickyElementDisabled = !1,
    winScrollY = 0,
    stickyElementTop = 0;

var $win = $(window);


/* ------------------------------------------------
    Window Resize Events
--------------------------------------------------- */


$win.on("resize", function() {
	
	var isStickyElementFixed = !1, 
	
	winScrollY = 0, 
	
	stickyElementSetPoint = 0, 
	
	stickyElementY = 0, 
	
	screenWidth = window.innerWidth,
	
	winScrollY = 0, 
	
	stickyElementTop = 0, 
	
	stickyElementDisabled = !1, 
	
	headerVisiblePos = 0, 
	
	headerFixedPos = 0, 
	
	isHeaderFixed = !1,
	
	isHeaderVisible = !1; 
	
	themeImageSection(), 
	
	navResponsive(), 
	
	navOnePage(),
	
	centerModal(), 
	
	setTimeout(stickElement, 3000), 
	
	setTimeout(stickyMenu, 300), 
	
	setTimeout(fixedFooter, 1300), 
	
	splitScreenImages()
	
}).resize(); 


/* ------------------------------------------------
    Window Load Events
--------------------------------------------------- */


$win.on("load", function() {
	
	navEvents(), 
	
	headerSearch(), 
	
	topSearch(), 
	
	navOnePage(), 
	
	dateToday(),
	
	bottomLinks(), 
	
	knobs(), 
	
	countDown(), 
	
	progressBarsOnView(), 
	
	owlC(),
	
	isotope(), 
	
	counters(), 
	
	wowInit(), 
	
	shopSlider(), 
	
	nivoLightbox(),
	
	newsCarousel(), 
	
	tooltip(), 
	
	fixedSocialIcons(), 
	
	flickrThumbnails(),
	
	multiScroll(), 
	
	tweets(), 
	
	instagramFeed(), 
	
	dribbleShots(),
	
	defaultMap();
	
    /*---- Auto Modal Box ----*/

	$(".modal.auto").modal("show");

    /*---- Hide Page Loader ----*/

	$(".loader").fadeOut("slow");
	


$(".LoginForm").hide();
$(".loginToggle").click(function(){
if($(".activeLoginBox").length == 0)
{
$(".LoginForm").addClass("activeLoginBox");
$(".LoginForm").slideDown();
}
else
{
$(".LoginForm").removeClass("activeLoginBox");
$(".LoginForm").slideUp();
}
});


/* Advance Search Panel */
$(".advancesearch").hide();
$(".toggle-up").hide();
$(".srch-advnc a").click(function(){
$(".advancesearch").show("slow");
$(".toggle-down").hide();
$(".toggle-up").show();
});
$(".toggle-down").click(function(){
$(".advancesearch").show("slow");
$(".toggle-down").hide();
$(".toggle-up").show();
});
$(".toggle-up").click(function(){
$(".advancesearch").hide();
$(".toggle-up").hide();
$(".toggle-down").show();
});

$(".closeAdvnceSrch").click(function(){
$(".advancesearch").hide();
$(".toggle-down").show();
$(".toggle-up").hide();
});

/* Price Range Slider */


/* $(".mapLink").click(function(){
$("#mapTab").show();
$("#summary").hide();
}); */
	
});