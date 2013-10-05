/**
 * Adaptive
 */
module.exports = {

  name: 'adaptive',

  options: {
    adaptiveWidth: 120 + 290 + 290/1.5 + 20 + 20
  },

  methods: {

    // @extend
    _init: function () {

      var self = this
        , stepsContainer = this.opts.stepsContainer;

      $(window).resize(function() {

        var formWidth = self.$form.outerWidth()
          , isAdaptive = self.opts.adaptiveWidth > formWidth;

        self.$form.toggleClass('adaptive', isAdaptive);

        if (stepsContainer) {
          self.$stepsContainer.toggleClass('adaptive', isAdaptive);
        }
      });
    }

  }
};
