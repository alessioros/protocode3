/*
templates/storage_records.hbs
*/
App.StorageRecordsController = Ember.ArrayController.extend({

  isCreating: false,
  nameStorageRecord: Ember.computed('recordsCount', function() {
    if(this.get('recordsCount') !== 0){
      return  'newFile' + this.get('recordsCount');
    }else{
      return 'newFile';
    }
  }),
  pathStorageRecord: '/',
  extensionStorageRecord: 'text',
  extensions: ['text','img','other'],
  booleanOptions: ['true','false'],
  recordsCount: Ember.computed.alias('content.length'),

  // checks if the default path matches record extension
  isPathValid: function(){

    var intReg = new RegExp('^[-+]?[0-9]*$');
    var floatReg = new RegExp('^[-+]?[0-9]*\.?[0-9]+$');
    var recordExtension = this.get('extensionStorageRecord');
    var recordPath = this.get('pathStorageRecord');

    if(recordExtension === 'int'){
      return recordPath.match(intReg);

    }else if(recordExtension === 'long'){
      return recordPath.match(intReg);

    }else if(recordExtension === 'float'){
      return recordPath.match(floatReg);

    }else if(recordExtension === 'double'){
      return recordPath.match(floatReg);

    }else{
      return true;
    }
  }.property('pathStorageRecord'),

  // checks if the name already exists and if is a valid path
  isNameValid: function(){

    var name = this.get('nameStorageRecord');
    if(this.store.hasRecordForId('storageRecord', name)){
      return false;

    }else if(name === ''){
      return false;

    }else if(name.indexOf(' ') >= 0){
      return false;

    }else{
      return true;
    }
  }.property('nameStorageRecord'),

  actions: {

    setCreating: function(value){
      this.set('isCreating', value);
    },

    createStorageRecord: function(){

      var self = this
      var name = this.get('nameStorageRecord');
      var path = this.get('pathStorageRecord');
      var extension = this.get('extensionStorageRecord');

      if(!this.store.hasRecordForId('storageRecord', name)){

        this.store.find('storageHandler','sH1').then(
          function(storageHandler){
            self.store.createRecord('storageRecord',{

              id: name,
              name: name,
              path: path,
              extension: extension,
              storageHandler: storageHandler

            }).save().then(
            function(storageRecord){

              storageHandler.get('storageRecords').addObject(storageRecord);
              storageHandler.save();
              storageRecord.save();
            });
          });

        this.set('isCreating', false);
        this.set('pathStorageRecord','/');
        this.set('extensionStorageRecord','text');
        this.send('refreshModel');
      }
    },

    deleteStorageRecord: function(name){

      var self = this

      this.store.find('storageHandler','sH1').then(
        function(storageHandler){
          self.store.find('storageRecord', name).then(
            function(sRecord){

              sRecord.deleteRecord();
              storageHandler.get('storageRecords').removeObject(sRecord);
              storageHandler.save();
              sRecord.save();
            });
        });
    }
  }
});
