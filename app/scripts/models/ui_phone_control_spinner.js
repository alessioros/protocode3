App.Spinner = App.UiPhoneControl.extend({
  name:       DS.attr('string', {defaultValue: 'Spinner'}),

  width:      DS.attr('number', {defaultValue: 180}),
  height:     DS.attr('number', {defaultValue: 48}),

  xmlName:    'spinners',

  toXml: function(xmlDoc) {
    var spinner = xmlDoc.createElement(this.get('xmlName'));
    this.decorateXml(spinner);
    return spinner;
  }

});
