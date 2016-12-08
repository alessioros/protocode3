/*
  templates/app_menu/index.hbs
*/
App.AppMenuIndexController = Ember.ObjectController.extend({
    isCreating: false,
    newNameMenuItem: 'newMenuItem',
    needs: ['viewController'],

    actions: {
        setCreating: function(value) {
            this.set('isCreating', value);
        },

        createMenuItem: function() {
            var name = this.get('newNameMenuItem').trim();

            if (!name) {
                return;
            }

            var navigation = this.store.createRecord('navigation', {
                destination: this.get('controllers.viewController.model')
            });

            navigation.save();

            var menuItem = this.store.createRecord('menuItem', {
                name: name.replace(/ /g, ''),
                title: name,
                parentMenu: this.get('model'),
                navigation: navigation
            });

            this.set('newNameMenuItem', 'newMenuItem');
            this.set('isCreating', false);

            menuItem.save();
        }
    }
});
