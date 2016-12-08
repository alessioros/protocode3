App.UiSpinnerView = Ember.View.extend({
  tagName: 'div',
  classNames: ['control-spinner', 'expanded'],
  classNameBindings: ['controller.controllers.editor.smartphone.platform'],
  templateName: 'views/ui_phone_control_view_spinner'

});
