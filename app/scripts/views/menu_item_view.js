App.MenuItemView = Ember.View.extend({
  tagName: 'div',
  classNames: ['app-menu-item'],
  classNameBindings: ['controller.controllers.editor.smartphone.platform'],
  templateName: 'views/menu_item_view',

  attributeBindings: ['style'],

  style: function() {
    var isAndroid = this.get('controller.controllers.editor.smartphone.platform') == 'android';
    var menuItemDestination = this.get('context.navigation.destination.name');
    var viewControllerName = this.get('controller.name');
    var currentViewControllerIsMenuItem = menuItemDestination == viewControllerName;

    style = "";

    if(isAndroid && currentViewControllerIsMenuItem) {
        style += "border-bottom: 2px solid #FF4081";
    }

    return style;
  }.property(
    'controller.controllers.editor.smartphone.platform',
    'context.navigation.destination.name',
    'controller.name'
  )

});
