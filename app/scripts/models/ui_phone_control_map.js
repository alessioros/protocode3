App.Map = App.UiPhoneControl.extend({
  name:       DS.attr('string', {defaultValue: 'Map'}),

  lat:        DS.attr('number', {defaultValue: 45.478}),
  lon:        DS.attr('number', {defaultValue: 9.227}),

  width:      DS.attr('number', {defaultValue: 200}),
  height:     DS.attr('number', {defaultValue: 330}),

  xmlName:        'map',

  toXml: function(xmlDoc) {
    var map = xmlDoc.createElement(this.get('xmlName'));
    this.decorateXml(map);

    map.setAttribute('lat', this.get('lat'));
    map.setAttribute('lon', this.get('lon'));

    return map;
  },

  // Override because there's only one Map
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
