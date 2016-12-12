App.EntitiesController = Ember.ArrayController.extend(App.Saveable, {

  isCreating: false,
  entityName: 'newName',
  entityPrimaryKey: 'newPrimaryKey',

  isNameValid: function(){

    var name = this.get('entityName');
    if(this.store.hasRecordForId('entity', name)){

        return false;

    }else if(name === ''){

        return false;

    }else{

      return true;
    }

  }.property('entityName'),

  actions: {

      setCreating: function(value){
        this.set('isCreating', value);
      },

      createEntity: function(){

          var self = this
          var name = this.get('entityName');
          var pKey = this.get('entityPrimaryKey');

          if(!this.store.hasRecordForId('entity', name)){

            this.store.find('databaseHandler','dbH1').then(
              function(databaseHandler){
                self.store.createRecord('entity',{

                    id: name,
                    name: name,
                    primaryKey: pKey,
                    databaseHandler: databaseHandler
                }).save().then(
                  function(entity){

                    databaseHandler.get('entities').addObject(entity);
                    databaseHandler.save();
                    entity.save();

                });
            });

            this.set('isCreating', false);
            this.set('entityName','newName');
            this.set('entityPrimaryKey','newPrimaryKey');
            
          }
      }

  }
});
