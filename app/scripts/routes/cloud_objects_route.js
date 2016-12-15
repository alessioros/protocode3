/*
templates/cloud_objects.hbs
*/
App.CloudObjectsRoute = Ember.Route.extend({

  model: function(){

    return this.store.find('cloudHandler','cH1').then(
      function(cloudHandler){

        return cloudHandler.get('cloudObjects');
      }
    );
  }
});
