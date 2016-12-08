App.Button = App.UiPhoneControl.extend({
  title:            DS.attr('string', {defaultValue: 'Button'}),
  clickListener:    DS.belongsTo('clickListener'),

  width:            DS.attr('number', {defaultValue: 88}),
  height:           DS.attr('number', {defaultValue: 40}),

  textColor:        DS.attr('string', {defaultValue: ''}),
  backgroundColor:  DS.attr('string', {defaultValue: ''}),
  clickColor:       DS.attr('string', {defaultValue: ''}),
  borderRadius:     DS.attr('number', {defaultValue: 2}),

  xmlName:        'buttons',

  deleteRecord: function () {
    var clickListener = this.get('clickListener');

    if (clickListener) {
      clickListener.deleteRecord();
      clickListener.save();
    }

    this._super();
  },

  toXml: function(xmlDoc) {
    var button = xmlDoc.createElement(this.get('xmlName'));
    this.decorateXml(button);
    button.setAttribute('title', this.get('title'));

    button.setAttribute('textColor', this.get('textColor'));
    button.setAttribute('backgroundColor', this.get('backgroundColor'));
    button.setAttribute('borderRadius', this.get('borderRadius'));
    button.setAttribute('clickColor', this.get('clickColor'));

    var clickListener = this.get('clickListener');

    if (clickListener != null) {
        button.appendChild(clickListener.toXml(xmlDoc));
    }

    return button;
  }
});
