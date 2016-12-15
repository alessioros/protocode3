/*
templates/data_model_editor.hbs
*/
App.DataModelEditorRoute = Ember.Route.extend({

  model: function() {

    dataHandler: return this.store.find('dataHandler','dH1');
    prefHandler: return this.store.find('dataHandler','dH1').then(
      function(dataHandler){
        return dataHandler.get('prefHandler');
      }
    );
    databaseHandler: return this.store.find('dataHandler','dH1').then(
      function(dataHandler){
        return dataHandler.get('databaseHandler');
      }
    );
  }
});
