App.UiMapView = Ember.View.extend({
  tagName: 'div',
  classNames: ['control-map', 'expanded'],
  classNameBindings: ['controller.controllers.editor.smartphone.platform'],
  templateName: 'views/ui_phone_control_view_map'

});