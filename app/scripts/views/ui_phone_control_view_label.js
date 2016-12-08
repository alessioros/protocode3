App.UiLabelView = Ember.View.extend({
  tagName: 'div',
  classNames: ['control-label', 'expanded'],
  classNameBindings: ['controller.controllers.editor.smartphone.platform', 'context.textAlign'],
  templateName: 'views/ui_phone_control_view_label',

  attributeBindings: ['style'],

  smartphone: Ember.computed.alias('controller.controllers.editor.smartphone'),

  style: function () {

    var cssHeight = this.get('smartphone.cssHeight');
    var screenHeight = this.get('smartphone.screenHeight');
    var coefficient = cssHeight / screenHeight;

  	var style = ""
    style += 'color: '      + this.get('context.textColor') + ";";
    style += 'font-size: '  + this.get('context.textSize')*coefficient + "px;";
  	return style;
  }.property(
    'context.textColor',
    'context.textSize',
    'smartphone'
  )

});
