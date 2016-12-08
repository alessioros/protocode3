/*
  templates/view_controller.hbs
*/
App.ViewControllerController = Ember.ObjectController.extend({
    needs: ['editor'],
    isActive: false,
    zoomLevel: 1,

    menu: Ember.computed.alias('controllers.editor.menu'),

    hasMenu: function() {
        return this.get('menu.menuItems.length') > 0;
    }.property('menu.menuItems.@each')

});
