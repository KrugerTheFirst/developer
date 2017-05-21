var Dropdown = {
    $container: null,

    init: function () {
        var _ = this;

        _.$container = $('[data-dropdown]');
        _.$container.find('a').on('click', function () {
            _.toggle($(this).parent());
        });

        _.$container.find('input[type="checkbox"]').on('change', function () {
            _.checkboxes(this);
        });
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
        $context.find('input[type="checkbox"]').prop('checked', false);
    },

    enableNext: function (id) {
        var $context = $('[data-dropdown="' + id + '"]');
        $context.removeClass('contact__form_dropdown--disabled');
    },

    checkboxes: function (context) {
        var _ = this,
            $parent = $(context).closest('[data-dropdown]'),
            id = parseInt($parent.attr('data-dropdown'));

        $(context).closest('li').toggleClass('selected', $(context).is(':checked'));

        if ($parent.find('input[type="checkbox"]:checked').length > 0) {
            _.enableNext(id + 1);
        } else {
            _.disableNext(id + 1);
        }
    }
};

$(function () {
    Dropdown.init();
});