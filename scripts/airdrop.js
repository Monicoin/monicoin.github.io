jQuery(function($) {
    // call form airdrop function
    formAirdrop();
});

function formAirdrop() {
    var formWidth = $('div.form-container').outerWidth();

    var itemWidth = $('.form-wrapper .form-items').outerWidth();

    var widthFourth = (formWidth - itemWidth) / 4;
    var widthHalf = (formWidth - itemWidth) / 2;

    var location = window.location;

    var params = getURLParameters(location.href);

    if (params.utm_content) {
        $('#inputUtmContent').val(params.utm_content);
    }

    if (params.utm_medium) {
        $('#inputUtmMedium').val(params.utm_medium);
    }

    if (params.utm_source) {
        $('#inputUtmSource').val(params.utm_source);
    }

    if (params.utm_campaign) {
        $('#inputUtmCampaign').val(params.utm_campaign);
    }

    $('form.form-airdrop').animate({'margin-left' :  widthHalf + 'px'});

    $('.btn-back').on('click', function(e) {
        e.preventDefault();

        var backTo = $(this).attr('data-to');

        $('form.form-airdrop .form-items').removeClass('active');

        switch (backTo) {
            case 'form-beta':
                $('form.form-airdrop .form-social').addClass('active');
                $('form.form-airdrop').animate({'margin-left' :  widthHalf + 'px'});
                break;
            default:
        }
    });

    $('.btn-agree').on('click', function(e) {
        e.preventDefault();

        $('#modalEligibility').modal('hide');

        $('.loader-wrapper').removeClass('hidden');

        setTimeout(function() {
            // submit form
            $('form[name="form-airdrop"]').submit();
        }, 500);
    });

    $('input[name="beta_device"]').on('click', function() {
        var device = $(this).val();

        $('#inputDevice').val(device);
    });

    $('.btn-next-beta').on('click', function(e) {
        e.preventDefault();

        var hasError = false;

        $('form[name="form-airdrop"] input').removeClass('is-invalid');

        if (!$('#inputFacebook').val() || $('#inputFacebook').val().trim() === '') {
            $('#inputFacebook')
                .addClass('is-invalid')
                .val('')
                .parent()
                .find('.invalid-feedback')
                .text('Facebook URL/Name is required.');

            hasError = true;
        }

        if (!$('#inputLinkedIn').val() || $('#inputLinkedIn').val().trim() === '') {
            $('#inputLinkedIn')
                .addClass('is-invalid')
                .val('')
                .parent()
                .find('.invalid-feedback')
                .text('Linkedin URL/name is required.');

            hasError = true;
        }

        if (!$('#inputTwitter').val() || $('#inputTwitter').val().trim() === '') {
            $('#inputTwitter')
                .addClass('is-invalid')
                .val('')
                .parent()
                .find('.invalid-feedback')
                .text('Twitter URL/name is required.');

            hasError = true;
        }

        if (!$('#inputTelegram').val() || $('#inputTelegram').val().trim() === '') {
            $('#inputTelegram')
                .addClass('is-invalid')
                .val('')
                .parent()
                .find('.invalid-feedback')
                .text('Telegram name is required.');

            hasError = true;
        }

        if (!hasError) {
            $('form.form-airdrop .form-items').removeClass('active');
            $('form.form-airdrop .form-beta').addClass('active');
            $('form.form-airdrop').animate({'margin-left' : '-' + (itemWidth - widthHalf) + 'px'});
        }
    });

    $('.btn-airdrop-send').on('click', function(e) {
        e.preventDefault();

        var hasError = false;

        $('form[name="form-airdrop"] input').removeClass('is-invalid');
        $('.recaptcha-field').removeClass('is-invalid');

        if (!$('#inputFirst').val() || $('#inputFirst').val().trim() === '') {
            $('#inputFirst')
                .addClass('is-invalid')
                .val('')
                .parent()
                .find('.invalid-feedback')
                .text('First name is required.');

            hasError = true;
        }

        if (!$('#inputLast').val() || $('#inputLast').val().trim() === '') {
            $('#inputLast')
                .addClass('is-invalid')
                .val('')
                .parent()
                .find('.invalid-feedback')
                .text('Last name is required.');

            hasError = true;
        }

        if (!$('#inputEmail').val() || $('#inputEmail').val().trim() === '') {
            $('#inputEmail')
                .addClass('is-invalid')
                .val('')
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

        if (!$('#inputEthAddress').val() || $('#inputEthAddress').val().trim() === '') {
            $('#inputEthAddress')
                .addClass('is-invalid')
                .val('')
                .parent()
                .find('.invalid-feedback')
                .text('ETH ERC20 address is required.');

            hasError = true;
        }

        var recaptcha = grecaptcha.getResponse();
        if(recaptcha.length == 0) {
            $('.recaptcha-field')
                .addClass('is-invalid')
                .find('.invalid-feedback')
                .text('Captcha Failed');

            hasError = true;
        }

        if (!hasError) {
            $('#modalEligibility').modal('show');
        }
    });

    $('form[name="form-airdrop"]').on('submit', function(e) {
        e.preventDefault();

        // submit response
        $.ajax({
            url: $('form[name="form-airdrop"]').attr('action'),
            type: 'POST',
            data: $('form[name="form-airdrop"]').serialize()
        });

        setTimeout(function() {
            $('.loader-wrapper').addClass('hidden');

            // add message success template
            $('.form-container').html(
                '<div class="alert alert-success">' +
                '<i class="fas fa-check-circle"></i> Your response had been submitted successfully!' +
                '</div>'
            );
        }, 1000);

    });
}

function fbShare() {
    FB.ui({
        method: 'share',
        display: 'popup',
        href: 'https://www.moni.co/',
    }, function(response){});
}

// validate email address
function validateEmail(email) {
    var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(String(email).toLowerCase());
}

function getURLParameters(url) {
    var result = {};
    var searchIndex = url.indexOf("?");

    if (searchIndex == -1 ) return result;

    var sPageURL = url.substring(searchIndex +1);
    var sURLVariables = sPageURL.split('&');

    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');
        result[sParameterName[0]] = sParameterName[1];
    }

    return result;
}
