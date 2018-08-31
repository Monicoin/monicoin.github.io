jQuery(function($) {
    // call form modal form
    formModalPlatform();

    // call form airdrop function
    formAirdrop();
});

function formModalPlatform() {
    $('a#modal-platform').click(function(e) {
        e.preventDefault();

        var platform = $(this).attr('data-platform');

        $('input#modalPlatformInput').val(platform);
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
}

function formAirdrop() {
    var formWidth = $('div.form-container').outerWidth();

    var widthFourth = formWidth / 4;
    var widthHalf = formWidth / 2;

    $('form.form-airdrop').animate({'margin-left' :  widthFourth + 'px'});

    $('.btn-next-beta').on('click', function(e) {
        e.preventDefault();

        var hasError = false;

        $('form[name="form-airdrop"] input').removeClass('is-invalid');

        /*if (!$('#inputEthAddress').val() || $('#inputEthAddress').val() === '') {
            $('#inputEthAddress')
                .addClass('is-invalid')
                .parent()
                .find('.invalid-feedback')
                .text('ETH ERC20 address.');

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
        }*/

        if (!hasError) {
            $('form.form-airdrop .form-items').removeClass('active');
            $('form.form-airdrop .form-beta').addClass('active');
            $('form.form-airdrop').animate({'margin-left' : '-' + widthFourth + 'px'});
        }
    });

    $('.btn-next-download').on('click', function(e) {
        e.preventDefault();

        $('form.form-airdrop .form-share').removeClass('active');
        $('form.form-airdrop .form-download').addClass('active');

        $('form.form-airdrop').animate({'margin-left' : '-' + (widthFourth + widthHalf) + 'px'});
    });



    $('.btn-airdrop-send').on('click', function(e) {
        e.preventDefault();

        var hasError = false;

        $('form[name="form-airdrop"] input').removeClass('is-invalid');

        if (!$('#inputFacebook').val() || $('#inputFacebook').val() === '') {
            $('#inputFacebook')
                .addClass('is-invalid')
                .parent()
                .find('.invalid-feedback')
                .text('Facebook name is required.');

            hasError = true;
        }

        if (!$('#inputTwitter').val() || $('#inputTwitter').val() === '') {
            $('#inputTwitter')
                .addClass('is-invalid')
                .parent()
                .find('.invalid-feedback')
                .text('Twitter name is required.');

            hasError = true;
        }

        if (!$('#inputTelegram').val() || $('#inputTelegram').val() === '') {
            $('#inputTelegram')
                .addClass('is-invalid')
                .parent()
                .find('.invalid-feedback')
                .text('Telegram name is required.');

            hasError = true;
        }

        if (!$('#inputReddit').val() || $('#inputReddit').val() === '') {
            $('#inputReddit')
                .addClass('is-invalid')
                .parent()
                .find('.invalid-feedback')
                .text('Reddit name is required.');

            hasError = true;
        }

        if (!hasError) {
            // submit form
            $('form[name="form-airdrop"]').submit();
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
            // add message success template
            $('.form-container').html(
                '<div class="alert alert-success">' +
                '<i class="fas fa-check-circle"></i> Your response had been submitted successfully!' +
                '</div>'
            );
        }, 1000);

    });
}

// validate email address
function validateEmail(email) {
    var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(String(email).toLowerCase());
}
