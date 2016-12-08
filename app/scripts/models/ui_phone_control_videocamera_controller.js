App.VideocameraController = App.UiPhoneControl.extend({
  videoView: DS.belongsTo('videoView', {inverse: null}),

  width:            DS.attr('number', {defaultValue: 120}),
  height:           DS.attr('number', {defaultValue: 40}),

  backgroundType:   DS.attr('string', {defaultValue: 'normal'}),

  xmlName:   'videocameraController',

  isNormalBackType: function() {
    return this.get('backgroundType') == 'normal';
  }.property('backgroundType'),

  isIconBackType: function() {
    return this.get('backgroundType') == 'icon';
  }.property('backgroundType'),

  toXml: function(xmlDoc) {
    var elem = xmlDoc.createElement(this.get('xmlName'));
    this.decorateXml(elem);

    elem.setAttribute('backgroundType', this.get('backgroundType'));

    var videoView = this.get('videoView');

    if (videoView != null) {
      elem.setAttribute('videoViewId', videoView.get('name'));
    }

    return elem;
  },

  // Override because there's only one PhotocameraController
  getRefPath: function(path) {
    var updatedPath = '/@' + this.get('xmlName');

    if (this.get('parentContainer') != null) {
      updatedPath = this.get('parentContainer').getRefPath(updatedPath);
    }
    else {
      updatedPath = this.get('viewController').getRefPath(updatedPath);
    }

    return updatedPath;
  }
});
