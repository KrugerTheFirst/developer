var Houses = {
    '1a': {
        'name': 'Dom 1A',
        'sibling': '1b'
    },
    '1b': {
        'name': 'Dom 1B',
        'sibling': '1a'
    },
    '2a': {
        'name': 'Dom 2A',
        'sibling': '2b'
    },
    '2b': {
        'name': 'Dom 2B',
        'sibling': '2a'
    },
    '3': {
        'name': 'Dom 3'
    }
};


var Dropdown = {
    $container: null,
    $houses: null,
    $places: null,

    init: function () {
        var _ = this;

        _.$container = $('[data-dropdown]');
        _.$houses = _.$container.filter('[data-dropdown="houses"]');
        _.$places = _.$container.filter('[data-dropdown="places"]');

        _.$container.find('a').on('click', function () {
            _.toggle($(this).parent());
        });

        _.$container.find('input[type="radio"]').on('change', function () {
            _.radios(this);
        });

        _.disableRadios();
        _.showHousesWhenYouSelectPlace();
        _.showPlaceForHouse();
    },


    toggle: function ($context) {
        if (!$context.hasClass('contact__form_dropdown--disabled')) {
            $context.toggleClass('contact__form_dropdown--open');
        }
    },

    disableNext: function (id) {
        var $context = $('[data-dropdown="' + id + '"]');
        $context.addClass('contact__form_dropdown--disabled')
            .removeClass('contact__form_dropdown--open');

        $context.find('li').removeClass('selected');
        $context.find('input[type="radio"]').prop('checked', false);
    },

    enableNext: function (id) {
        var $context = $('[data-dropdown="' + id + '"]');
        $context.removeClass('contact__form_dropdown--disabled');
    },

    radios: function (context) {
        var _ = this,
            $parent = $(context).closest('[data-dropdown]');

        $parent.find('li').removeClass('selected');
        $(context).closest('li').addClass('selected');

        if ($parent.find('input[type="radio"]:checked').length > 0) {
            _.enableNext('places');
        } else {
            _.disableNext('places');
        }
    },

    showHousesWhenYouSelectPlace: function () {
        var _ = this;

        _.$places.find('input[type="radio"]').on('change', function () {
            var actual = $(this).val();

            if (Reservations[actual] !== undefined) {
                var reservation = Reservations[actual];
                if (reservation.houses.length > 0) {
                    _.$houses.find('li').addClass('disabled');
                    _.$houses.find('input[type="radio"]').prop('disabled', true);

                    for (var i = 0; i < reservation.houses.length; ++i) {
                        var house = reservation.houses[i];
                        if (Houses[house] !== undefined) {
                            _.$houses.find('li[data-house="' + Houses[house].sibling + '"]').removeClass('disabled');
                            _.$houses.find('input[value="' + Houses[house].sibling + '"]').prop('disabled', false);
                        }
                    }
                } else {
                    _.$houses.find('li').removeClass('disabled');
                    _.$houses.find('input[type="radio"]').prop('disabled', false);
                
                }
            }
        });
    },

    showPlaceForHouse: function () {
        var _ = this;
        _.$houses.find('input[type="radio"]').on('change', function () {
            var actual = $(this).val(),
                places = Object.keys(Reservations);

            for (var i = 0; i < places.length; ++i) {
                var name = places[i],
                    reservationPlace = Reservations[name];

                if (reservationPlace.houses.indexOf(Houses[actual].sibling) > -1) {
                    _.$places.find('input[value="' + name + '"]').prop('checked', true);
                    _.$places.find('li[data-place="' + name + '"]').addClass('selected');

                    _.$houses.find('li').not('li[data-house="' + actual + '"]').addClass('disabled');
                    _.$houses.find('input').not('input[value="' + actual + '"]').prop('disabled', true);
                }
            }
        });
    },

    disableRadios: function () {
        var _ = this,
            places = Object.keys(Reservations);
        for (var i = 0; i < places.length; ++i) {
            var name = places[i],
                reservationPlace = Reservations[name];

            if (reservationPlace.disabled) {
                var $radio = _.$places.find('input[value="' + name + '"]');
                $radio.prop('disabled', true);
                $radio.closest('li').addClass('disabled');
            }
        }

    }
};

$(function () {
    Dropdown.init();
});