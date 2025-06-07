$(function() {
    // Nav toggle on mobile

    let navToggle = $("#navToggle");
    let nav = $("nav");

    navToggle.on('click', function(event) {
        event.preventDefault();

        $("body").toggleClass('show-nav');
        $(this).toggleClass('active');
        nav.toggleClass('show');
    });

    $(window).on('resize', function() {
        $("body").removeClass('show-nav');
        navToggle.removeClass('active');
        nav.removeClass('show');
    });

    let intro = $("#intro");
    let introH = intro.innerHeight();
    let header = $("#header");
    let headerH = header.innerHeight();
    let scrollTop = $(window).scrollTop();

    // Header class on scroll

    headerScroll();

    $(window).on("scroll resize", function () {
        headerScroll();
    });

    function headerScroll() {
        introH = intro.innerHeight();
        headerH = header.innerHeight();

        let scrollTop = $(this).scrollTop();

        if (scrollTop >= (introH - headerH)) {
            header.addClass("header--dark");
        }
        else {
            header.removeClass("header--dark");
        }
    }

    // Smooth scroll to sections

    $(("[data-scroll]")).on("click", function(event) {
        event.preventDefault();

        let scrollElement = $(this).data("scroll");
        let scrollElementPos = $(scrollElement).offset().top;

        $("body").removeClass('show-nav');
        navToggle.removeClass('active');
        nav.removeClass('show');

        $("html, body").animate({
            scrollTop: scrollElementPos - headerH
        }, 500)
    })

    // ScrollSpy

    let windowH = $(window).height();

    scrollSpy(scrollTop);

    $(window).on("scroll", function() {
        scrollTop = $(this).scrollTop();

        scrollSpy(scrollTop);
    });

    function scrollSpy(scrollTop) {
        $("[data-scrollspy]").each(function() {
            let $this = $(this);
            let sectionID = $this.data('scrollspy');
            let sectionOffset = $this.offset().top;
            sectionOffset = sectionOffset - (windowH * 0.3);

            if (scrollTop >= sectionOffset) {
                $('#nav [data-scroll]').removeClass('active');
                $('#nav [data-scroll="' + sectionID + '"]').addClass('active');
            }

            if (scrollTop == 0) {
                $('#nav [data-scroll]').removeClass('active');
            }
        });
    }

    // Modal

    $('[data-modal]').on('click', function(event) {
        event.preventDefault();

        let modal = $(this).data('modal');

        $('body').addClass('no-scroll');
        $(modal).addClass('show');

        setTimeout(function() {
            $(modal).find('.modal__content').css({
                transform: 'translateY(0)',
                opacity: '1'
            })  
        }, 200)
    });

    $('[data-modal-close]').on('click', function(event) {
        event.preventDefault();

        let modal = $(this).parents('.modal');

        modalClose(modal);
    })

    $('.modal').on('click', function() {
        let modal = $(this);

        modalClose(modal);
    })

    $('.modal__content').on('click', function(event) {
        event.stopPropagation();
    })

    function modalClose(modal) {
        modal.find('.modal__content').css({
                transform: 'translateY(-100px)',
                opacity: '0'
        });

        setTimeout(function() {
            $('body').removeClass('no-scroll')
            modal.removeClass('show');
        }, 200)
    }

    // Slick slider https://kenwheeler.github.io/slick/

    // Intro slider
    let introSlider = $("#introSlider");

    $(introSlider).slick({
        infinite: true,
        slidesToShow: 1,
        sliderToScroll: 1,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 4000,
        speed: 1000,
        fade: true
    });

    $("#introSliderPrev").on('click', function() {
        introSlider.slick('slickPrev')
    });

    $("#introSliderNext").on('click', function() {
        introSlider.slick('slickNext')
    });

    // Reviews slider

    let reviewsSlider = $('#reviewsSlider');

    $(reviewsSlider).slick({
        infinite: true,
        slidesToShow: 1,
        sliderToScroll: 1,
        arrows: false,
        dots: true,
        autoplay: true,
        autoplaySpeed: 30000,
        speed: 500,
        draggable: false
    });

    $("#introSliderPrev").on('click', function() {
        introSlider.slick('slickPrev')
    });

    $("#introSliderNext").on('click', function() {
        introSlider.slick('slickNext')
    });
});