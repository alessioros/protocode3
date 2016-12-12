App.DatabaseHandlerRoute = Ember.Route.extend({

    model: function(){

      return this.store.find('dataHandler','dH1').then(
        function(dataHandler){
          return dataHandler.get('databaseHandler');

        });
    },

    actions: {

        enableDB: function(){

            var self = this
            this.store.createRecord('databaseHandler', {id: 'dbH1'}).save().then(
              function(dbHandler){
                  self.store.find('dataHandler','dH1').then(
                    function(dataHandler){
                        dataHandler.set('databaseHandler', dbHandler);
                        dataHandler.save();
                        dbHandler.save();
                    });
              });

              this.refresh();
              this.transitionTo('/data_model_editor/database_handler/entities');

        },

        disableDB: function(){

            var self = this

            this.store.find('databaseHandler','dbH1').then(
              function(dbHandler){

                self.store.findAll('entity').then(
                  function(array){
                    array.forEach(function (data) {
                      Ember.run.once(self, function () {
                        data.deleteRecord();
                        data.save();
                      });
                    });
                  }
                );
                dbHandler.deleteRecord();
                dbHandler.save();
              }
            );

            this.refresh();
            this.transitionTo('/data_model_editor/database_handler/');
        }


    }
});
