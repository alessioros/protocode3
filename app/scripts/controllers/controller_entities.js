/*
  templates/entities.hbs
*/
App.EntitiesController = Ember.ArrayController.extend(App.Saveable, {

  isCreating: false,
  entityName: Ember.computed('entityCount', function() {
    if(this.get('entityCount') !== 0){
      return  'newEntity' + this.get('entityCount');
    }else{
      return 'newEntity';
    }
  }),
  entityPrimaryKey: 'primaryKeyName',
  entityCount: Ember.computed.alias('content.length'),

  // checks if the entity name is valid and doesn't already exists
  isNameValid: function(){

    var name = this.get('entityName');
    if(this.store.hasRecordForId('entity', name)){
      return false;

    }else if(name === ''){
      return false;

    }else if(name.indexOf(' ') >= 0){
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

        this.set('isCreating',false);
        this.set('entityPrimaryKey','primaryKeyName');
        this.send('refreshModel');

        Ember.run.later(
          function(){
            self.send('redirectToEntity');
          }, 100);
      }
    }

  }
});
