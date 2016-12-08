App.PreferenceRecordsController = Ember.ArrayController.extend({

      isCreating: false,
      keyPreferenceRecord: 'newKey',
      valuePreferenceRecord: 'newValue',
      typePreferenceRecord: 'string',
      types: ['string','boolean','int','float'],

      actions: {

          setCreating: function(value){
            this.set('isCreating', value);
          },

          createPrefRecord: function(){

              var self = this
              var key = this.get('keyPreferenceRecord');
              var value = this.get('valuePreferenceRecord');
              var type = this.get('typePreferenceRecord');


              this.store.find('prefHandler','pH1').then(
                function(prefHandler){
                  self.store.createRecord('prefRecord',{

                      key: key,
                      value: value,
                      type: type,
                      prefHandler: prefHandler
                  }).save().then(
                    function(prefRecord){

                      prefHandler.get('prefRecords').addObject(prefRecord);
                      prefHandler.save();
                      prefRecord.save();

                  });
              });

              this.set('isCreating', false);
              this.set('keyPreferenceRecord','newKey');
              this.set('valuePreferenceRecord','newValue');
              this.set('typePreferenceRecord','string');

          }

      }

});
