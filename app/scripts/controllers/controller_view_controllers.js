/*
  templates/view_controllers.hbs
*/
App.ViewControllersController = Ember.ArrayController.extend({

    isCreating: false,
    newNameViewController: 'newView',
    newNameViewController: Ember.computed('viewContrCount', function() {
      if(this.get('viewContrCount') !== 0){
        return  'newView' + this.get('viewContrCount');
      }else{
        return 'newView';
      }
    }),
    viewContrCount: Ember.computed.alias('content.length'),
    needs: ['uiPhoneControlTemplates', 'editor'],

    actions: {
        setCreating: function(value) {
            this.set('isCreating', value);
        },

        createViewController: function() {
            var self = this;
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

            this.set('isCreating', false);
            this.send('refreshModel');
        }
    }
});
