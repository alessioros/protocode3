App.UiControl = DS.Model.extend({
  name:               DS.attr('string'),

  posX:               DS.attr('number', {defaultValue: 0}),
  posY:               DS.attr('number', {defaultValue: 0}),

  paddingTop:         DS.attr('number', {defaultValue: 0}),
  paddingBottom:      DS.attr('number', {defaultValue: 0}),
  paddingStart:       DS.attr('number', {defaultValue: 0}),
  paddingEnd:         DS.attr('number', {defaultValue: 0}),

  marginTop:          DS.attr('number', {defaultValue: 0}),
  marginBottom:       DS.attr('number', {defaultValue: 0}),
  marginStart:        DS.attr('number', {defaultValue: 0}),
  marginEnd:          DS.attr('number', {defaultValue: 0}),

  alignParentTop:     DS.attr('boolean', {defaultValue: false}),
  alignParentBottom:  DS.attr('boolean', {defaultValue: false}),
  alignParentStart:   DS.attr('boolean', {defaultValue: false}),
  alignParentEnd:     DS.attr('boolean', {defaultValue: false}),

  width:              DS.attr('number', {defaultValue: 125}),
  height:             DS.attr('number', {defaultValue: 30}),

});
