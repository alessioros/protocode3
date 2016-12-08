App.Timepicker = App.UiPhoneControl.extend({
  name:       DS.attr('string', {defaultValue: 'Timepicker'}),

  width:      DS.attr('number', {defaultValue: 346}),
  height:     DS.attr('number', {defaultValue: 346}),

  xmlName:    'timepickers',

  toXml: function(xmlDoc) {
    var timepicker = xmlDoc.createElement(this.get('xmlName'));
    this.decorateXml(timepicker);
    return timepicker;
  }

});
