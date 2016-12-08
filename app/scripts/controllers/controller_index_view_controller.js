/*
  templates/view_controller/index.hbs
*/
App.ViewControllerIndexController = Ember.ObjectController.extend(App.Saveable, {

    actions: {
        createAsyncTask: function(value) {
            var viewController = this.get('model');
            var asyncTask = this.store.createRecord('asyncTask', {
                viewController: viewController
            });
            asyncTask.save();
            viewController.save();
        },

        createAlertDialog: function(value) {
            var viewController = this.get('model');
            var alertDialog = this.store.createRecord('alertDialog', {
                viewController: viewController
            });
            alertDialog.save();
            viewController.save();
        },

        createProgressDialog: function(value) {
            var viewController = this.get('model');
            var progressDialog = this.store.createRecord('progressDialog', {
                viewController: viewController
            });
            progressDialog.save();
            viewController.save();
        },

        deleteViewController: function() {
            if (confirm('Are you sure to delete?')) {
                var viewController = this.get('model');
                var application = viewController.get('application')
                application.get('viewControllers').removeObject(viewController);
                application.save();
                this.store.find('navigation').then(function(navigations) {
                    navigations.forEach(function(navigation) {
                        if (navigation.get('destination') == viewController) {
                            navigation.set('destination', null);
                            navigation.save();
                        }
                    });
                });
                viewController.deleteRecord();
                viewController.save();
                this.transitionToRoute('/editor/viewControllers');
            }
        }

    }

});
