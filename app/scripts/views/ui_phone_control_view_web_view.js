App.UiWebViewView = Ember.View.extend({
  tagName: 'div',
  classNames: ['control-web-view', 'expanded'],
  classNameBindings: ['controller.controllers.editor.smartphone.platform'],
  templateName: 'views/ui_phone_control_view_web_view'
});