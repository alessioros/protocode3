/*
templates/entity.hbs
*/
App.EntityController = Ember.ObjectController.extend(App.Saveable, {

  isCreatingAttribute: false,
  isCreatingRelationship: false,
  isAttributeValid: true,
  isRelationshipValid: true,

  attributeName: 'newAttribute',
  attributeType: 'String',
  relationshipName: 'newRelationship',
  relationshipDestination: '',
  relationshipType: '1 : N',
  types: ['String','Integer','Float','Double','Date','Boolean'],
  relTypes: ['1 : 1','1 : N','N : N'],

  // checks if the destination entity has been set
  isDestinationValid: function(){

    var destination = this.get('relationshipDestination');

    if(!destination){

      return false;

    }else if(destination === ''){

      return false;
    }

    return true;

  }.property('relationshipDestination'),

  // checks if the relationship name is valid and doesn't already exist for this entity
  isRelNameValid: function(){

    var self = this;
    var name = this.get('relationshipName');

    var entity = this.get('model');

    self.set('isRelationshipValid', true);

    this.store.all('entityRelationship').some(
      function(relationship){

        if(relationship.get('name') === name){
          if(relationship.get('entity') === entity){

            self.set('isRelationshipValid', false);
            return false;
          }
        }
      }
    );

    if(!this.get('isRelationshipValid')){
      return false;

    }else if(name === ''){

      return false;

    }else{
      return true;
    }
  }.property('relationshipName'),

  // checks if the attribute name is valid and doesn't already exist for this entity
  isAttNameValid: function(){

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
          if(value === false){
            this.set('attributeName','newAttribute');
            this.set('attributeType','string');
          }
        },

        setCreatingRelationship: function(value){
          this.set('isCreatingRelationship',value);

          if(value === false){
            this.set('relationshipName','newRelationship');
            this.set('relationshipDestination','');
            this.set('relationshipType','1 : N');
          }
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

                  this.set('isCreatingRelationship', false);
                  this.set('relationshipName','newRelationship');
                  this.set('relationshipDestination','');
                  this.set('relationshipType','1 : N');
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
