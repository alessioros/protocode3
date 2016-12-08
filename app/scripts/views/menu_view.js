App.MenuView = Ember.View.extend({
  tagName: 'div',
  classNames: ['app-menu'],
  classNameBindings: ['controller.controllers.editor.smartphone.platform'],
  templateName: 'views/menu_view',

  attributeBindings: ['style'],

  style: function() {
    var currentViewControllerIsMenu = false;
    var viewControllerName = this.get('context.name');
    var menuItems = this.get('context.menu.menuItems');
    menuItems.forEach(function(menuItem) {
      var menuItemDestination = menuItem.get('navigation.destination.name');
      if(viewControllerName == menuItemDestination) {
        currentViewControllerIsMenu = true;
      }
    });

    style = "";

    if(!currentViewControllerIsMenu) {
        style += "display:none";
    }

    return style;
  }.property(
    'context.name',
    'context.menu.menuItems',
    'context.menu.menuItems.length'
  )

});
