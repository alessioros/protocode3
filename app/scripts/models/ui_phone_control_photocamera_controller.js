App.PhotocameraController = App.UiPhoneControl.extend({
  imageView: DS.belongsTo('imageView', {inverse: null}),

  width:            DS.attr('number', {defaultValue: 120}),
  height:           DS.attr('number', {defaultValue: 40}),

  backgroundType:   DS.attr('string', {defaultValue: 'normal'}),

  xmlName:   'photocameraController',

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

    var imageView = this.get('imageView');

    if (imageView != null) {
      elem.setAttribute('imageViewId', imageView.get('name'));
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
