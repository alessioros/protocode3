App.Container = App.UiPhoneControl.extend({
  name:         DS.attr('string', {defaultValue: 'DummyContainer'}),
  title:        DS.attr('string', {defaultValue: 'Dummy Container'}),
  width:        DS.attr('number', {defaultValue: 200}),
  height:       DS.attr('number', {defaultValue: 100}),

  uiPhoneControls:   DS.hasMany('uiPhoneControl', {polymorphic: true, inverse: 'parentContainer'}),

  toXml: function(xmlDoc) {
    var elem = xmlDoc.createElement('container');
    this.decorateXml(elem);
    
    elem.setAttribute('title', this.get('title'));

    var uiPhoneControls = this.get('uiPhoneControls');

    uiPhoneControls.map(function(item) {
      elem.appendChild(item.toXml(xmlDoc));
    });
    
    return elem;
  }
});