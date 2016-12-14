App.EntityController = Ember.ObjectController.extend(App.Saveable, {

  isCreatingAttribute: false,
  isCreatingRelationship: false,
  isAttributeValid: true,

  attributeName: 'newAttribute',
  attributeType: 'string',
  relationshipName: 'newRelationship',
  relationshipDestination: '',
  relationshipType: '1 : N',
  types: ['string','int','float','Double','Date','boolean'],
  relTypes: ['1 : 1','1 : N','N : N'],

  init () {
    this._super();

  },

  isNameValid: function(){

    var self = this;
    var name = this.get('attributeName');

    var entity = this.get('model');
    var primary = entity.get('primaryKey');

    if(name === primary){
      return false;
    }

    self.set('isAttributeValid', true);

    this.store.all('entityAttribute').some(
      function(attribute){

        if(attribute.get('name') === name){
          if(attribute.get('entity') === entity){

            self.set('isAttributeValid', false);
            return false;
          }
        }
      }
    );

    if(!this.get('isAttributeValid')){

      return false;

    }else if(name === ''){

      return false;

    }else{
      return true;
    }

  }.property('attributeName'),

  actions: {

    deleteEntity: function(name){

      var self = this
      var model = this.get('model');
      var name = model.get('name');

      this.store.find('databaseHandler','dbH1').then(
        function(databaseHandler){
          self.store.find('entity', name).then(
            function(entity){

              self.store.findAll('entityAttribute', { entity: model}).then(
                function(array){
                  array.forEach(function (data) {
                    Ember.run.once(self, function () {
                      data.deleteRecord();
                      data.save();
                    });
                  });
                }
              );
              entity.deleteRecord();
              databaseHandler.get('entities').removeObject(entity);
              databaseHandler.save();
              entity.save();

          });
      });

      this.transitionToRoute('entities');
    },

    setCreatingAttribute: function(value){
      this.set('isCreatingAttribute',value);
    },

    setCreatingRelationship: function(value){
      this.set('isCreatingRelationship',value);
    },

    createAttribute: function(){

      var self = this;
      var name = this.get('attributeName');
      var type = this.get('attributeType');
      var entity = this.get('model');
      var entityName = entity.get('name');

      this.store.find('entity', entityName).then(
        function(entity){
            self.store.createRecord('entityAttribute', {

              name: name,
              type: type,
              entity: entity

            }).save().then(
              function(attribute){

                entity.get('entityAttributes').addObject(attribute);
                entity.save();
                attribute.save();
            });
      });

      this.set('isCreatingAttribute', false);
      this.set('attributeName','newAttribute');
      this.set('attributeType','string');

    },

    createRelationship: function(){

      var self = this;
      var name = this.get('relationshipName');
      var destination = this.get('relationshipDestination');
      var type = this.get('relationshipType');
      var entity = this.get('model');
      var entityName = entity.get('name');

      this.store.find('entity', entityName).then(
        function(entity){
            self.store.createRecord('entityRelationship', {

              name: name,
              destination: destination,
              type: type,
              entity: entity

            }).save().then(
              function(relationship){

              entity.get('entityRelationships').addObject(relationship);
              entity.save();
              relationship.save();

            });
      });

      this.set('isCreatingAttribute', false);
      this.set('attributeName','newAttribute');
      this.set('attributeType','string');

    },

    deleteRelationship: function(key){

      var self = this
      var entity = this.get('model');
      var entityName = entity.get('name');

      this.store.find('entity', entityName).then(
        function(entity){
          self.store.find('entityRelationship', key).then(
            function(relationship){

              relationship.deleteRecord();
              entity.get('entityRelationships').removeObject(relationship);
              entity.save();
              relationship.save();
          });
      });

    },

    deleteAttribute: function(key){

      var self = this
      var entity = this.get('model');
      var entityName = entity.get('name');

      this.store.find('entity', entityName).then(
        function(entity){
          self.store.find('entityAttribute', key).then(
            function(attribute){

              attribute.deleteRecord();
              entity.get('entityAttributes').removeObject(attribute);
              entity.save();
              attribute.save();
          });
      });

    }
  }
});
