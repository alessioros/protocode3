App.UiSwitchView = Ember.View.extend({
  tagName: 'div',
  classNames: ['control-switch', 'expanded'],
  classNameBindings: ['controller.controllers.editor.smartphone.platform'],
  templateName: 'views/ui_phone_control_view_switch'

});
