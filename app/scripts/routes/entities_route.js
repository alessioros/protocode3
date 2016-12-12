App.EntitiesRoute = Ember.Route.extend({

      model: function(){

          return this.store.find('databaseHandler','dbH1').then(
            function(databaseHandler){

              return databaseHandler.get('entities');
            }
          );
      }
});
