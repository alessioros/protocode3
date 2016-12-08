/*
  templates/view_controllers.hbs
*/
App.ViewControllersController = Ember.ArrayController.extend({

    isCreating: false,
    newNameViewController: 'newView',

    needs: ['uiPhoneControlTemplates', 'editor'],

    actions: {
        setCreating: function(value) {
            this.set('isCreating', value);
        },

        createViewController: function() {
            var name = this.get('newNameViewController');
            var app = this.get('controllers.editor.model');

            if (!name.trim()) {
                return;
            }

            // Application model is in editor.model
            this.store.createRecord('viewController', {
                name: name,
                application: app
            }).save().then(function(viewController) {
                app.get('viewControllers').addObject(viewController);
                app.save();
            });

            this.set('newNameViewController', 'newView');
            this.set('isCreating', false);

        },

    }

});
