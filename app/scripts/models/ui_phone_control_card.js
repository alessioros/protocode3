App.Card = App.UiPhoneControl.extend({
  name:       DS.attr('string', {defaultValue: 'Card'}),
  title:      DS.attr('string', {defaultValue: 'Title goes here'}),
  subtitle:      DS.attr('string', {defaultValue: 'Subtitle here'}),

  width:           DS.attr('number', {defaultValue: 398}),
  height:           DS.attr('number', {defaultValue: 398}),

  marginTop:          DS.attr('number', {defaultValue: 8}),
  marginBottom:       DS.attr('number', {defaultValue: 8}),
  marginStart:        DS.attr('number', {defaultValue: 8}),
  marginEnd:          DS.attr('number', {defaultValue: 8}),

  alignParentStart:   DS.attr('boolean', {defaultValue: true}),
  alignParentEnd:     DS.attr('boolean', {defaultValue: true}),

  numActions:        DS.attr('number', {defaultValue: 2}),

  xmlName:    'cards',

  hasOneAction: function() {
    return this.get('numActions') == 1;
  }.property('numActions'),

  hasTwoActions: function() {
    return this.get('numActions') == 2;
  }.property('numActions'),

  hasThreeActions: function() {
    return this.get('numActions') == 3;
  }.property('numActions'),

  toXml: function(xmlDoc) {
    var card = xmlDoc.createElement(this.get('xmlName'));
    this.decorateXml(card);
    card.setAttribute('title', this.get('title'));
    card.setAttribute('subtitle', this.get('subtitle'));
    card.setAttribute('numActions', this.get('numActions'));
    return card;
  }

});
