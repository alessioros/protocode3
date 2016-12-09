App.PreferenceRecordsController = Ember.ArrayController.extend({

      isCreating: false,
      keyPreferenceRecord: 'newKey',
      valuePreferenceRecord: 'newStringValue',
      typePreferenceRecord: 'string',
      types: ['string','boolean','int','float'],
      booleanOptions: ['true','false'],

      isBooleanRec: function(){

        if(this.get('typePreferenceRecord') === 'boolean'){

          this.set('valuePreferenceRecord','false');
          return true;
        }

        if(this.get('typePreferenceRecord') === 'string'){

          this.set('valuePreferenceRecord','newStringValue');
          return false;
        }

        if(this.get('typePreferenceRecord') === 'int'){

          this.set('valuePreferenceRecord','0');
          return false;
        }

        if(this.get('typePreferenceRecord') === 'float'){

          this.set('valuePreferenceRecord','0.0');
          return false;
        }

        if(this.get('typePreferenceRecord') === 'string'){

          this.set('valuePreferenceRecord','newStringValue');
          return false;
        }

      }.property('typePreferenceRecord'),

      isValidType: function(){

        var intReg = new RegExp('^[-+]?[0-9]*$');
        var floatReg = new RegExp('^[-+]?[0-9]*\.?[0-9]+$');

        if(this.get('typePreferenceRecord') === 'int'){

          return this.get('valuePreferenceRecord').match(intReg);
        }

        if(this.get('typePreferenceRecord') === 'float'){

          return this.get('valuePreferenceRecord').match(floatReg);
        }

        return true;

      }.property('valuePreferenceRecord'),

      isNumeric(n) {
        //return !isNaN(parseFloat(n)) && isFinite(n);
        return true;
      },

      isKeyValid: function(){

        var key = this.get('keyPreferenceRecord');
        if(this.store.hasRecordForId('prefRecord', key)){

            return false;

        }else if(key === ''){

            return false;
        }else{

          return true;
        }

      }.property('keyPreferenceRecord'),

      actions: {

          setCreating: function(value){
            this.set('isCreating', value);
          },

          createPrefRecord: function(){

              var self = this
              var key = this.get('keyPreferenceRecord');
              var value = this.get('valuePreferenceRecord');
              var type = this.get('typePreferenceRecord');

              if(!this.store.hasRecordForId('prefRecord', key)){

                this.store.find('prefHandler','pH1').then(
                  function(prefHandler){
                    self.store.createRecord('prefRecord',{

                        id: key,
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
                this.set('valuePreferenceRecord','newStringValue');
                this.set('typePreferenceRecord','string');

              }

          },

          deletePRecord: function(key){

            var self = this

            this.store.find('prefHandler','pH1').then(
              function(prefHandler){
                self.store.find('prefRecord', key).then(
                  function(pRecord){

                    pRecord.deleteRecord();
                    prefHandler.get('prefRecords').removeObject(pRecord);
                    prefHandler.save();
                    pRecord.save();
                });
            });
          }

      }

});
