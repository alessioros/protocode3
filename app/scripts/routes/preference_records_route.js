App.PreferenceRecordsRoute = Ember.Route.extend({

        model: function(){

            return this.store.find('prefHandler','pH1').then(
              function(prefHandler){
                return prefHandler.get('prefRecords');

              });
        }
});
