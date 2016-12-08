App.Slider = App.UiPhoneControl.extend({
  name:       DS.attr('string', {defaultValue: 'Slider'}),

  width:      DS.attr('number', {defaultValue: 150}),
  height:     DS.attr('number', {defaultValue: 50}),

  xmlName:    'sliders',

  toXml: function(xmlDoc) {
    var slider = xmlDoc.createElement(this.get('xmlName'));
    this.decorateXml(slider);
    return slider;
  }

});
