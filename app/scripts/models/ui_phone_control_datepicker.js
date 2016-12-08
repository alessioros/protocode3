App.Datepicker = App.UiPhoneControl.extend({
  name:       DS.attr('string', {defaultValue: 'Datepicker'}),

  width:      DS.attr('number', {defaultValue: 348}),
  height:     DS.attr('number', {defaultValue: 365}),

  xmlName:    'datepickers',

  toXml: function(xmlDoc) {
    var datepicker = xmlDoc.createElement(this.get('xmlName'));
    this.decorateXml(datepicker);
    return datepicker;
  }

});
