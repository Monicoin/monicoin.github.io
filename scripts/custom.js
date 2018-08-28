jQuery(function($) {
    AOS.init({
        easing: 'ease-out-back',
        duration: 1000
    });

    Highcharts.chart('container', {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false
                },
                showInLegend: true
            }
        },
        series: [{
            name: 'Brands',
            colorByPoint: true,
            data: [{
                name: 'Token Sale',
                y: 45,
                sliced: true,
                selected: true,
                color: '#61892F'
            }, {
                name: 'Private Round',
                y: 5,
                color: '#88c770'
            }, {
                name: 'Air Drops',
                y: 1,
                color: '#a8f58b'
            }, {
                name: 'Seed Subsidy',
                y: 4.5,
                color: '#c8fda5'
            }, {
                name: 'Referrals',
                y: 4.5,
                color: '#e7febf'
            }, {
                name: 'Reserves',
                y: 40,
                color: '#ffffda'
            }]
        }]
    });

    $('.news-btn a').on('click', function(e) {
        e.preventDefault();

        var type = $(this).attr('id');

        var item = $('div.section-news .news-list .news-item');
        var itemWidth = item.outerWidth();

        if (type === 'next-btn') {
            var temp = $('div.section-news .news-list .news-item').first().clone();

            $('div.section-news .news-list').append(temp);

            $('div.section-news .news-list').animate({'margin-left' : '-' + itemWidth + 'px'}, {
                complete: function() {
                    $('div.section-news .news-list .news-item').first().remove();
                    $('div.section-news .news-list').css('margin-left', '0');
                }
            });
        } else if (type === 'prev-btn') {
            var temp = $('div.section-news .news-list .news-item').last().clone();

            $('div.section-news .news-list').css('margin-left', '-' + itemWidth + 'px');
            $('div.section-news .news-list').prepend(temp);

            $('div.section-news .news-list').animate({'margin-left' : '0'}, {
                complete: function() {
                    $('div.section-news .news-list .news-item').last().remove();
                }
            });
        }
    });

    var sliderWidth = $('.section-hero .hero-frame .hero-item').outerWidth();
    var sliderLength = 0;

    var item = $(".hero-slider .hero-item").length;
    var maxLength = (parseInt(item) - 1) * sliderWidth;

    var interval;

    var phoneSliderWidth = 236;
    var phoneSliderLength = 0;

    var phoneItem = $(".phone-slider .phone-item").length;
    var phoneMaxLength = (parseInt(phoneItem) - 1) * phoneSliderWidth;

    var go = true;

    var slide = function() {
        $('.hero-slider').animate({"margin-left" : sliderLength + "px"});
        $('.phone-slider').animate({"margin-left" : phoneSliderLength + "px"});

        init();
    }

    var bannerSlider = function(index = false, slide = 'right') {
        var temp,
            active;

        if (slide == 'right') {
            temp = $('div.banner-wrapper ul li').first().clone();
            $('div.banner-wrapper ul').append(temp);
            $('div.banner-wrapper ul li').first().remove();
        } else {
            temp = $('div.banner-wrapper ul li').last().clone();
            $('div.banner-wrapper ul').prepend(temp);
            $('div.banner-wrapper ul li').last().remove();
        }

        active = $('div.banner-wrapper ul li:nth-child(3)').attr('data-index');

        if (index && index != active) {
            setTimeout(function() {
                bannerSlider(index, slide);
            }, 100);
        }
    }

    function init() {
        interval = setTimeout(function() {
            if (go) {
                sliderLength = sliderLength - sliderWidth;
            }

            if (sliderLength < -maxLength) {
                sliderLength = 0;
            }

            phoneSliderLength = phoneSliderLength - phoneSliderWidth;
            if (phoneSliderLength < -phoneMaxLength) {
                phoneSliderLength = 0;
            }

            if (go) {
                if (sliderLength == 0) {
                    $('.hero-slider-btn li').removeClass('active').first().addClass('active');
                } else {
                    $('.hero-slider-btn li.active').removeClass('active').next().addClass('active');
                }

                bannerSlider();
            }

            slide();
        }, 4000);
    }

    $('.hero-slider-btn').on('click', 'li', function(e, banner = true) {
        e.preventDefault();
        var index = $(this).index();

        $('.hero-slider-btn li').removeClass('active');
        $(this).addClass('active');

        clearTimeout(interval);
        sliderLength = -(sliderWidth * index);

        phoneSliderLength = -(phoneSliderWidth * index);

        slide();

        if (banner) {
            bannerSlider(index + 1);
        }
    });

    $(document).on('click', 'div.banner-wrapper ul li', function() {
        var index = $(this).index() + 1;

        clearTimeout(interval);

        var active = $(this).attr('data-index');

        $('.hero-slider-btn ul li:nth-child(' + active + ')').trigger('click', false);

        if (index < 3) {
            bannerSlider($(this).attr('data-index'), 'left');
            return;
        }

        bannerSlider($(this).attr('data-index'));
    });

    $('.section-hero .hero-frame, .section-hero .phone-wrapper').on('mouseover', function() {
        go = false;
    }).on('mouseout', function() {
        go = true;
    })

    init();

    // All list items
    menuItems = $('.side-navigation ul li').find("a"),

    // Anchors corresponding to menu items
    scrollItems = menuItems.map(function(){

    var item = $($(this).attr("href"));
        if (item.length) {
            return item;
        }
    });

    $(window).scroll(function() {
        // get vertical position
        var top = $(this).scrollTop();

        var headHeight = $('header .navbar').outerHeight();

        var nextSection = $('#section-pain-points').offset();

        $('header .navbar').css('top', '0');

        if (top > 0) {
            $('header .navbar').css('top', '-' + headHeight + 'px');
        }

        if (top > nextSection.top - 100) {
            $('.side-navigation').css('left', '10px');
        } else {
            $('.side-navigation').css('left', '-100px');
        }

        // Get container scroll position
        var fromTop = $(this).scrollTop() + 15;

        // Get id of current scroll item
        var current = scrollItems.map(function(){
            if ($(this).offset().top < fromTop) {
                return this;
            }
        });

        // Get the id of the current element
        current = current[current.length-1];
        var id = current && current.length ? current[0].id : "";

        // Set/remove active class
        menuItems
            .parent().removeClass("active")
            .end().filter("[href='#"+id+"']").parent().addClass("active");

    });

    $('.scroll-to').click(function(e) {
        var jump = $(this).attr('href');
        var position = $(jump).offset().top;

        $('html, body').stop().animate({ scrollTop: position }, 500);
        e.preventDefault();
    });

    // call fuction for form inquiry
    formInquiry();
});

function formInquiry() {
    // set selected question to input
    $('form[name="form-inquiry"] select[id="select-question"]').change(function() {
        var question = $(this).val();
        $('input#inputQuestion').val(question);
    });

    // validate form input
    $('button#btn-form-submit').click(function() {
        var hasError = false;
        $('form[name="form-inquiry"] input').removeClass('is-invalid');
        $('form[name="form-inquiry"]').find('.alert').remove();

        if (!$('#inputFirst').val() || $('#inputFirst').val() === '') {
            $('#inputFirst')
                .addClass('is-invalid')
                .parent()
                .find('.invalid-feedback')
                .text('First Name is required.');

            hasError = true;
        }

        if (!$('#inputLast').val() || $('#inputLast').val() === '') {
            $('#inputLast')
                .addClass('is-invalid')
                .parent()
                .find('.invalid-feedback')
                .text('Last Name is required.');

            hasError = true;
        }

        if (!$('#inputCompany').val() || $('#inputCompany').val() === '') {
            $('#inputCompany')
                .addClass('is-invalid')
                .parent()
                .find('.invalid-feedback')
                .text('Company is required.');

            hasError = true;
        }

        if (!$('#inputEmail').val() || $('#inputEmail').val() === '') {
            $('#inputEmail')
                .addClass('is-invalid')
                .parent()
                .find('.invalid-feedback')
                .text('Email is required.');

            hasError = true;
        } else if (!validateEmail($('#inputEmail').val())) {
            $('#inputEmail')
                .addClass('is-invalid')
                .parent()
                .find('.invalid-feedback')
                .text('Invalid Email Address.');

            hasError = true;
        }

        if (!hasError) {
            // submit form
            $('form[name="form-inquiry"]').submit();
        } else {
            // add message error template
            $('form[name="form-inquiry"]').prepend(
                '<div class="alert alert-danger">' +
                'Please fill-in the required details.' +
                '</div>'
            );
        }
    });

    $('form[name="form-inquiry"]').on('submit', function(e) {
        e.preventDefault();

        // submit response
        $.ajax({
            url: $('form[name="form-inquiry"]').attr('action'),
            type: 'POST',
            data: $('form[name="form-inquiry"]').serialize()
        });

        // set form fields to readonly
        $('form[name="form-inquiry"] input').attr('readonly', true);
        $('form[name="form-inquiry"] select option').attr('disabled', 'disabled');
        $('form[name="form-inquiry"] button#btn-form-submit')
            .removeClass('btn-primary')
            .addClass('btn-secondary')
            .attr('disabled', 'disabled');

        // add message success template
        $('form[name="form-inquiry"]').prepend(
            '<div class="alert alert-success">' +
            'Your response had been submitted successfully!' +
            '</div>'
        );
    });

    $('a#modal-platform').click(function(e) {
        e.preventDefault();
        
        var platform = $(this).attr('data-platform');

        $('input#modalPlatform').val(platform);
    });

    $('.btn-modal-submit').click(function() {
        var hasError = false;

        $('form[name="form-signup"] input').removeClass('is-invalid');
        $('form[name="form-signup"] .modal-body').find('.alert').remove();

        // validate fields
        if (!$('#modalFirstName').val() || $('#modalFirstName').val() === '') {
            $('#modalFirstName')
                .addClass('is-invalid')
                .parent()
                .find('.invalid-feedback')
                .text('First Name is required.');

            hasError = true;
        }

        if (!$('#modalLastName').val() || $('#modalLastName').val() === '') {
            $('#modalLastName')
                .addClass('is-invalid')
                .parent()
                .find('.invalid-feedback')
                .text('Last Name is required.');

            hasError = true;
        }

        if (!$('#modalEmail').val() || $('#modalEmail').val() === '') {
            $('#modalEmail')
                .addClass('is-invalid')
                .parent()
                .find('.invalid-feedback')
                .text('Email is required.');

            hasError = true;
        } else if (!validateEmail($('#modalEmail').val())) {
            $('#modalEmail')
                .addClass('is-invalid')
                .parent()
                .find('.invalid-feedback')
                .text('Invalid Email Address.');

            hasError = true;
        }

        // submit form if has no error
        if (!hasError) {
            $('form[name="form-signup"]').submit();
        } else {
            // add message error template
            $('form[name="form-signup"] .modal-body').prepend(
                '<div class="alert alert-danger">' +
                'Please fill-in the required details.' +
                '</div>'
            );
        }
    });

    $('form[name="form-signup"]').on('submit', function(e) {
        e.preventDefault();

        // submit response
        $.ajax({
            url: $('form[name="form-signup"]').attr('action'),
            type: 'POST',
            data: $('form[name="form-signup"]').serialize()
        });

        // set form fields to readonly
        $('form[name="form-signup"] input').attr('readonly', true);
        $('form[name="form-signup"] button.btn-modal-submit')
            .removeClass('btn-primary')
            .addClass('btn-secondary')
            .attr('disabled', 'disabled');

        // add message success template
        $('form[name="form-signup"] .modal-body').prepend(
            '<div class="alert alert-success">' +
            'Your response had been submitted successfully!' +
            '</div>'
        );
    });

    // validate email address
    function validateEmail(email) {
        var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regex.test(String(email).toLowerCase());
    }
}
