App.SmartphoneView = Ember.View.extend({
  tagName: 'div',
  attributeBindings: ['style'],
  classNames: ['smartphone-view'],
  classNameBindings: ['platform', 'smartphoneModel'],
  templateName: 'views/smartphone_view',

  platform: function () {
    return this.get('controller.controllers.editor.smartphone.platform');
  }.property('controller.controllers.editor.smartphone'),

  smartphoneModel: function() {
    return this.get('controller.controllers.editor.smartphone.name');
  }.property('controller.controllers.editor.smartphone'),

  zoomLevelStyle: function() {
    var zoomLevel = this.get('context.zoomLevel');
    return 'transform: scale(' + zoomLevel + ', '  + zoomLevel + ');' +
      '-webkit-transform: scale(' + zoomLevel + ', '  + zoomLevel + ');';
  }.property('context.zoomLevel'),

  style: function() {
    return this.get('zoomLevelStyle');
  }.property('zoomLevelStyle')

});
