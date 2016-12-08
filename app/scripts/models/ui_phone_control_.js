App.UiPhoneControl = App.UiControl.extend({

  //Override
  /*--------------------------------------------------------------*/
  posY:             DS.attr('number', {defaultValue: 96}),
  /*--------------------------------------------------------------*/

  viewController: DS.belongsTo('viewController'),
  parentContainer: DS.belongsTo('container', {inverse: 'uiPhoneControls'}),

  alignTop: DS.belongsTo('uiPhoneControl', {polymorphic: true, inverse: null}),
  alignBottom: DS.belongsTo('uiPhoneControl', {polymorphic: true, inverse: null}),
  alignStart: DS.belongsTo('uiPhoneControl', {polymorphic: true, inverse: null}),
  alignEnd: DS.belongsTo('uiPhoneControl', {polymorphic: true, inverse: null}),

  above: DS.belongsTo('uiPhoneControl', {polymorphic: true, inverse: null}),
  below: DS.belongsTo('uiPhoneControl', {polymorphic: true, inverse: null}),
  toStartOf: DS.belongsTo('uiPhoneControl', {polymorphic: true, inverse: null}),
  toEndOf: DS.belongsTo('uiPhoneControl', {polymorphic: true, inverse: null}),

  sameLevelControls: function() {
    var parentContainer = this.get('parentContainer');

    if (parentContainer != null) {
      return parentContainer.get('uiPhoneControls');
    }

    return this.get('viewController.uiPhoneControls');
  }.property(
    'parentContainer.uiPhoneControls.@each',
    'viewController.uiPhoneControls.@each'),

  siblings: function() {
    if (this.get('sameLevelControls') != null) {
      return this.get('sameLevelControls').without(this);
    }

    return null;
  }.property('sameLevelControls'),

  top: function() {
    if (this.get('alignTop')) {
      return this.get('alignTop.top');
    }
    else if (this.get('below')) {
      return this.get('below.bottom');
    }
    else if (this.get('alignParentTop')) {

      if (this.get('parentContainer') != null) {
        return 0;
      }
      else {
        // Check tab bar for menu in Android
        var isAndroid = this.get('viewController.application.smartphone.platform') == 'android';
        var currentViewControllerIsMenu = false;
        var viewControllerName = this.get('viewController.name');
        var menuItems = this.get('viewController.application.menu.menuItems');
        menuItems.forEach(function(menuItem, index) {
          if(viewControllerName == menuItem.get('navigation.destination.name')) {
            currentViewControllerIsMenu = true;
          }
        });
        // Offset from tab bar for menu in Android
        if (isAndroid && currentViewControllerIsMenu) {
          return this.get('viewController.application.smartphone.viewTop') + 48;
        }
        return this.get('viewController.application.smartphone.viewTop');
      }

    }
    else if (this.get('alignBottom')) {
      return this.get('alignBottom.bottom') - this.get('outerHeight');
    }
    else if (this.get('alignParentBottom')) {

      if (this.get('parentContainer') != null) {
        return this.get('bottom') - this.get('outerHeight');
      }
      else {
        return this.get('bottom') - this.get('outerHeight');
      }

    }
    else if (this.get('above')) {
      return this.get('bottom') - this.get('outerHeight');
    }
    else {

      if (this.get('parentContainer') != null) {
        return parseFloat(this.get('posY'));
      }
      else {
        // Offset of top bar
        return  parseFloat(this.get('posY')) + this.get('viewController.application.smartphone.viewTop');
      }

    }
  }.property(
    'posY',
    'outerHeight',
    'alignTop.top',
    'alignParentTop',
    'alignBottom.bottom',
    'alignParentBottom',
    'below.bottom',
    'viewController.application.smartphone.viewTop',
    'viewController.application.smartphone.platform',
    'viewController.application.menu.menuItems',
    'viewController.name',
    'above',
    'bottom'),

  bottom: function() {
    if (this.get('alignBottom')) {
      return this.get('alignBottom.bottom');
    }
    else if (this.get('alignParentBottom')) {

      if (this.get('parentContainer') != null) {
        return this.get('parentContainer.height');
      }
      else {
        // Check tab bar for menu in iOS
        var isIOS = this.get('viewController.application.smartphone.platform') == 'ios';
        var currentViewControllerIsMenu = false;
        var viewControllerName = this.get('viewController.name');
        var menuItems = this.get('viewController.application.menu.menuItems');
        menuItems.forEach(function(menuItem, index) {
          if(viewControllerName == menuItem.get('navigation.destination.name')) {
            currentViewControllerIsMenu = true;
          }
        });
        // Offset from tab bar for menu in iOS
        if (isIOS && currentViewControllerIsMenu) {
          return this.get('viewController.application.smartphone.viewBottom') - 48;
        }
        return this.get('viewController.application.smartphone.viewBottom');
      }

    }
    else if (this.get('above')) {
      return this.get('above.top');
    }
    else {
      return this.get('top') + parseFloat(this.get('outerHeight'));
    }
  }.property(
    'alignBottom.bottom',
    'alignParentBottom',
    'top',
    'outerHeight',
    'parentContainer.height',
    'above.top',
    'viewController.name',
    'viewController.application.smartphone.platform',
    'viewController.application.menu.menuItems',
    'viewController.application.smartphone.viewBottom'
  ),

  start: function() {
    if (this.get('alignStart')) {
      return this.get('alignStart.start');
    }
    else if (this.get('toEndOf')) {
      return this.get('toEndOf.end');
    }
    else if (this.get('alignParentStart')) {
      return 0;
    }
    else if (this.get('alignEnd')) {
      return this.get('alignEnd.end') - this.get('outerWidth');
    }
    else if (this.get('alignParentEnd')) {

      if (this.get('parentContainer') != null) {
        return this.get('parentContainer.width') - this.get('outerWidth');
      }
      else {
        return this.get('viewController.application.smartphone.screenWidth') - this.get('outerWidth');
      }

    }
    else if (this.get('toStartOf')) {
      return this.get('end') - this.get('outerWidth');
    }
    else {
      return parseFloat(this.get('posX'));
    }
  }.property(
    'posX',
    'outerWidth',
    'parentContainer',
    'alignStart.start',
    'toEndOf.end',
    'alignEnd.end',
    'alignParentStart',
    'alignParentEnd',
    'toStartOf',
    'end',
    'viewController.application.smartphone.screenWidth'),

  end: function() {
    if (this.get('alignEnd')) {
      return this.get('alignEnd.end');
    }
    else if (this.get('alignParentEnd')) {

      if (this.get('parentContainer') != null) {
        return this.get('parentContainer.width');
      }
      else {
        return this.get('viewController.application.smartphone.screenWidth');
      }

    }
    else if (this.get('toStartOf')) {
      return this.get('toStartOf.start');
    }
    else {
      return this.get('start') + parseFloat(this.get('outerWidth'));
    }
  }.property(
    'alignEnd',
    'alignParentEnd',
    'start',
    'parentContainer',
    'toStartOf.start',
    'outerWidth',
    'viewController.application.smartphone.screenWidth'),

  computedWidth: function() {
    return  parseFloat(this.get('end')) -
            parseFloat(this.get('start')) -
            parseFloat(this.get('marginStart')) -
            parseFloat(this.get('marginEnd'));
  }.property(
    'start',
    'end',
    'marginStart',
    'paddingStart',
    'paddingEnd',
    'marginEnd'),

  computedHeight: function() {
    return  parseFloat(this.get('bottom')) -
            parseFloat(this.get('top')) -
            parseFloat(this.get('marginTop')) -
            parseFloat(this.get('marginBottom'));
  }.property(
    'top',
    'bottom',
    'marginTop',
    'paddingTop',
    'paddingBottom',
    'marginBottom'),

  outerWidth: function() {
    return  parseFloat(this.get('marginStart')) +
            parseFloat(this.get('width')) +
            parseFloat(this.get('marginEnd'));
  }.property(
    'marginStart',
    'paddingStart',
    'width',
    'paddingEnd',
    'marginEnd'),

  outerHeight: function() {
    return  parseFloat(this.get('marginTop')) +
            parseFloat(this.get('height')) +
            parseFloat(this.get('marginBottom'));
  }.property(
    'marginTop',
    'paddingTop',
    'height',
    'paddingBottom',
    'marginBottom'),

  // Used to reload views
  didCreate: function() {
    this.set('name', this.get('id').replace(/[0-9]/g, '') + this.constructor.toString().split(".")[1]);

    var self = this;
    if (this.get('parentContainer')) {
      var uiPhoneControls = this.get('parentContainer.uiPhoneControls');
      uiPhoneControls.pushObject(self);
      this.get('parentContainer').save();
    }
    else {
      var viewController = this.get('viewController');
      viewController.get('uiPhoneControls').then(function (uiPhoneControls) {
        uiPhoneControls.pushObject(self);
        viewController.save();
      });

    this.save();

    }
  },

  deleteRecord: function() {
    var viewController = this.get('viewController');
    var self = this;

    if (viewController) {
      var constraints = [
        'alignTop',
        'alignBottom',
        'alignStart',
        'alignEnd',
        'above',
        'below',
        'toStartOf',
        'toEndOf'];


      viewController.get('uiPhoneControls').then(function(uiPhoneControls) {
        uiPhoneControls.forEach(function (uiPhoneControl) {
          constraints.forEach(function (constraint) {
            if (uiPhoneControl.get(constraint) == self) {
              uiPhoneControl.set(constraint, null);
              uiPhoneControl.save();
            }
          });
        });
      });
    }

    this._super();
  },

  decorateXml: function(xmlElem) {
    xmlElem.setAttribute('id', this.get('name'));

    xmlElem.setAttribute('posX', this.get('posX'));
    xmlElem.setAttribute('posY', this.get('posY'));

    xmlElem.setAttribute('width', this.get('width'));
    xmlElem.setAttribute('height', this.get('height'));

    xmlElem.setAttribute('paddingTop', this.get('paddingTop'));
    xmlElem.setAttribute('paddingBottom', this.get('paddingBottom'));
    xmlElem.setAttribute('paddingStart', this.get('paddingStart'));
    xmlElem.setAttribute('paddingEnd', this.get('paddingEnd'));

    xmlElem.setAttribute('marginTop', this.get('marginTop'));
    xmlElem.setAttribute('marginBottom', this.get('marginBottom'));
    xmlElem.setAttribute('marginStart', this.get('marginStart'));
    xmlElem.setAttribute('marginEnd', this.get('marginEnd'));

    xmlElem.setAttribute('alignParentTop', this.get('alignParentTop'));
    xmlElem.setAttribute('alignParentBottom', this.get('alignParentBottom'));
    xmlElem.setAttribute('alignParentStart', this.get('alignParentStart'));
    xmlElem.setAttribute('alignParentEnd', this.get('alignParentEnd'));

    if (this.get('alignTop')) {
      xmlElem.setAttribute('alignTop', this.get('alignTop').getRefPath(''));
    }
    if (this.get('alignBottom')) {
      xmlElem.setAttribute('alignBottom', this.get('alignBottom').getRefPath(''));
    }
    if (this.get('alignStart')) {
      xmlElem.setAttribute('alignStart', this.get('alignStart').getRefPath(''));
    }
    if (this.get('alignEnd')) {
      xmlElem.setAttribute('alignEnd', this.get('alignEnd').getRefPath(''));
    }

    if (this.get('above')) {
      xmlElem.setAttribute('above', this.get('above').getRefPath(''));
    }
    if (this.get('below')) {
      xmlElem.setAttribute('below', this.get('below').getRefPath(''));
    }
    if (this.get('toStartOf')) {
      xmlElem.setAttribute('toStartOf', this.get('toStartOf').getRefPath(''));
    }
    if (this.get('toEndOf')) {
      xmlElem.setAttribute('toEndOf', this.get('toEndOf').getRefPath(''));
    }

    if (this.get('viewController')) {
      xmlElem.setAttribute('viewController', this.get('viewController').getRefPath(''));
    }

    return xmlElem;
  },

  getRefPath: function(path) {
    var updatedPath = '/@' + this.get('xmlName') + '[id=\'' + this.get('name') + '\']';

    if (this.get('parentContainer') != null) {
      updatedPath = this.get('parentContainer').getRefPath(updatedPath);
    }
    else {
      updatedPath = this.get('viewController').getRefPath(updatedPath);
    }

    return updatedPath;
  },

  getRelatedUiPhoneControls: function() {
    var constraints = [
      'alignTop',
      'alignBottom',
      'alignStart',
      'alignEnd',
      'above',
      'below',
      'toStartOf',
      'toEndOf'];

    var self = this;

    return constraints.map(function (constraint) {
      return self.get(constraint);
    }).filter(function (item) {return item != null;});

  }

});
