App.UiPhoneControlView = Ember.View.extend(App.UiMoveable, {
  templateName: 'views/ui_phone_control_view_',
  classNames: ['ui-phone-control'],
  classNameBindings: ['active'],
  attributeBindings: ['style'],

  smartphone: Ember.computed.alias('controller.controllers.editor.smartphone'),

  uiPhoneControlType: function () {
    var controlType = this.get('context').constructor.toString();
    console.log('Choose view for: ' + controlType);

    switch (controlType) {
      case ('App.AudioPlayer'):
        return App.UiAudioPlayerView;
        break;

      case ('App.AudioRecorder'):
        return App.UiAudioRecorderView;
        break;

      case ('App.Button'):
        return App.UiButtonView;
        break;

      case ('App.Card'):
        return App.UiCardView;
        break;

      case ('App.Container'):
        return App.UiContainerView;
        break;

      case ('App.Datepicker'):
        return App.UiDatepickerView;
        break;

      case ('App.EditText'):
        return App.UiEditTextView;
        break;

      case ('App.GridView'):
        return App.UiGridViewView;
        break;

      case ('App.ImageView'):
        return App.UiImageViewView;
        break;

      case ('App.Label'):
        return App.UiLabelView;
        break;

      case ('App.ListView'):
        return App.UiListViewView;
        break;

      case ('App.Map'):
        return App.UiMapView;
        break;

      case ('App.PhotocameraController'):
        return App.UiPhotocameraControllerView;
        break;

      case ('App.Switch'):
        return App.UiSwitchView;
        break;

      case ('App.Slider'):
        return App.UiSliderView;
        break;

      case ('App.Spinner'):
        return App.UiSpinnerView;
        break;

      case ('App.Timepicker'):
        return App.UiTimepickerView;
        break;

      case ('App.VideocameraController'):
        return App.UiVideocameraControllerView;
        break;

      case ('App.VideoView'):
        return App.UiVideoViewView;
        break;

      case ('App.WebView'):
        return App.UiWebViewView;
        break;

    }
  }.property(),

  alignParentTop: function() {
    return this.get('context.alignParentTop');
  }.property('context.alignParentTop'),

  alignParentBottom: function() {
    return this.get('context.alignParentBottom');
  }.property('context.alignParentBottom'),

  alignParentStart: function() {
    return this.get('context.alignParentStart');
  }.property('context.alignParentStart'),

  alignParentEnd: function() {
    return this.get('context.alignParentEnd');
  }.property('context.alignParentEnd'),

  top: function() {
    return this.computeVerticalAxis(this.get('context.top'));
  }.property('context.top', 'smartphone'),

  bottom: function() {
    return this.computeVerticalAxis(this.get('context.bottom'));
  }.property('context.bottom', 'smartphone'),

  start: function() {
    return this.computeHorizontalAxis(this.get('context.start'));
  }.property('context.start', 'smartphone'),

  end: function() {
    return this.computeHorizontalAxis(this.get('context.end'));
  }.property('context.end', 'smartphone'),

  /**** Margin ****/
  marginTop: function() {
    return this.computeVerticalAxis(this.get('context.marginTop'));
  }.property('context.marginTop', 'smartphone'),

  marginBottom: function() {
    return this.computeVerticalAxis(this.get('context.marginBottom'));
  }.property('context.marginBottom', 'smartphone'),

  marginStart: function() {
    return this.computeHorizontalAxis(this.get('context.marginStart'));
  }.property('context.marginStart', 'smartphone'),

  marginEnd: function() {
    return this.computeHorizontalAxis(this.get('context.marginEnd'));
  }.property('context.marginEnd', 'smartphone'),

  /**** Padding ****/
  paddingTop: function() {
    return this.computeVerticalAxis(this.get('context.paddingTop'));
  }.property('context.paddingTop', 'smartphone'),

  paddingBottom: function() {
    return this.computeVerticalAxis(this.get('context.paddingBottom'));
  }.property('context.paddingBottom', 'smartphone'),

  paddingStart: function() {
    return this.computeHorizontalAxis(this.get('context.paddingStart'));
  }.property('context.paddingStart', 'smartphone'),

  paddingEnd: function() {
    return this.computeHorizontalAxis(this.get('context.paddingEnd'));
  }.property('context.paddingEnd', 'smartphone'),

  computedWidth: function() {
    return this.computeHorizontalAxis(this.get('context.computedWidth'));
  }.property('context.computedWidth', 'smartphone'),

  computedHeight: function() {
    return this.computeVerticalAxis(this.get('context.computedHeight'));
  }.property('context.computedHeight', 'smartphone'),

  style: function() {
    var result = '';

    result += 'top: ' + this.get('top') + 'px; ';
    result += 'left: ' + this.get('start') + 'px; ';

    //This changes the height of the card according to platform
    //It's ok because height will be evaluated dinamically later
    var controlType = this.get('uiPhoneControlType').toString();
    var platform = this.get('smartphone.platform').toString();
    if(controlType == 'App.UiCardView') {
        //Card always squared in ios
        if(platform == 'ios') {
          //this.set('computedHeight', this.get('computedWidth'));
          this.set('context.height', this.get('computedWidth'));
        }
        //Card height is always 175 + dynamic image height in android
        else if(platform == 'android') {
          //this.set('computedHeight', ((this.get('computedWidth')*9/16)+174));
          this.set('context.height', ((this.get('computedWidth')*9/16)+174));
        }
        console.log(this.get('context.width'));
    }

    result += 'height: ' + this.get('computedHeight') + 'px;';
    result += 'width: ' + this.get('computedWidth') + 'px;';

    result += 'margin-top: ' + this.get('marginTop') + 'px;';
    result += 'margin-bottom: ' + this.get('marginBottom') + 'px;';
    result += 'margin-left: ' + this.get('marginStart') + 'px;';
    result += 'margin-right: ' + this.get('marginEnd') + 'px;';

    result += 'padding-top: ' + this.get('paddingTop') + 'px;';
    result += 'padding-bottom: ' + this.get('paddingBottom') + 'px;';
    result += 'padding-left: ' + this.get('paddingStart') + 'px;';
    result += 'padding-right: ' + this.get('paddingEnd') + 'px;';

    return result;
  }.property(
    'start',
    'top',
    'computedWidth',
    'computedHeight',
    'marginTop',
    'marginBottom',
    'marginStart',
    'marginEnd',
    'paddingTop',
    'paddingBottom',
    'paddingStart',
    'paddingEnd'
    ),

  computeVerticalAxis: function(value) {
    return value / this.get('smartphone.screenHeight') * this.get('smartphone.cssHeight');
  },

  computeHorizontalAxis: function(value) {
    return value / this.get('smartphone.screenWidth') * this.get('smartphone.cssWidth');
  }

});
