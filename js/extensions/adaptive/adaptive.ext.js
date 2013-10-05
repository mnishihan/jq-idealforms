/**
 * Adaptive
 */
module.exports = {

  name: 'adaptive',

  options: {
    adaptiveWidth: $('<p class="idealforms-field-width"/>').appendTo('body').css('width').replace('px','')
  },

  methods: {

    // @extend
    _init: function () {

      var self = this;

      function adapt() {

        var formWidth = self.$form.outerWidth()
          , isAdaptive = self.opts.adaptiveWidth > formWidth;

        self.$form.toggleClass('adaptive', isAdaptive);

        if (self.opts.stepsContainer) {
          self.$stepsContainer.toggleClass('adaptive', isAdaptive);
        }
      }

      $(window).resize(adapt);
      adapt();

      $('p.idealforms-field-width').remove();
    }

  }
};
