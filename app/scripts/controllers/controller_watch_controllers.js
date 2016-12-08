/*
  templates/watch_controllers.hbs
*/
App.WatchControllersController = Ember.ArrayController.extend({

    isCreating: false,
    newNameWatchController: 'newView',

    needs: ['uiWatchControlTemplates', 'editor'],

    actions: {
        setCreating: function(value) {
            this.set('isCreating', value);
        },

        createWatchController: function() {
            var name = this.get('newNameWatchController');
            var app = this.get('controllers.editor.model');

            if (!name.trim()) {
                return;
            }

            // Application model is in editor.model
            this.store.createRecord('watchController', {
                name: name,
                application: app
            }).save().then(function(watchController) {
                app.get('watchControllers').addObject(watchController);
                app.save();
            });

            this.set('newNameWatchController', 'newView');
            this.set('isCreating', false);

        }

    }

});
