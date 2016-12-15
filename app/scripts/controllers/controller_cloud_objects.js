/*
  templates/cloud_objects.hbs
*/
App.CloudObjectsController = Ember.ArrayController.extend(App.Saveable, {

  isCreating: false,
  objectName: 'newObject',

  // checks if the entity name is valid and doesn't already exists
  isNameValid: function(){

    var name = this.get('objectName');
    if(this.store.hasRecordForId('cloudObject', name)){
      return false;

    }else if(name === ''){
      return false;

    }else if(name.indexOf(' ') >= 0){
      return false;

    }else{
      return true;

    }
  }.property('objectName'),

  actions: {

    setCreating: function(value){
      this.set('isCreating', value);
    },

    createCloudObject: function(){

      var self = this
      var name = this.get('objectName');

      if(!this.store.hasRecordForId('cloudObject', name)){

        this.store.find('cloudHandler','cH1').then(
          function(cloudHandler){
            self.store.createRecord('cloudObject',{

              id: name,
              name: name,
              cloudHandler: cloudHandler

            }).save().then(
              function(cloudObject){

                cloudHandler.get('cloudObjects').addObject(cloudObject);
                cloudHandler.save();
                cloudObject.save();
              });
            });

            this.set('isCreating', false);
            this.set('objectName','newObject');
            this.transitionToRoute('cloud_objects');
            this.send('refreshModel');

            Ember.run.later(
              function(){
                self.send('redirectToObject');
            }, 100);
          }
        }
    }
});
