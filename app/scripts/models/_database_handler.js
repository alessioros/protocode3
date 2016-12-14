App.DatabaseHandler = DS.Model.extend({

      dataHandler:  DS.belongsTo('dataHandler'),

      entities:     DS.hasMany('entity', {async: true}),

      xmlName: 'DBHandler',

      toXml: function(xmlDoc) {

          var self = this;

          var dbHandler = xmlDoc.createElement(self.get('xmlName'));

          var entities = self.get('entities');

          /*Promise.all(entities.map(function(item_entities) {

              return item_entities.toXml(xmlDoc);

          })).then(function(values_entities){

            values_entities.map(function(value) {
                elem.appendChild(value);
            })

            resolve(xmlDoc);
          });*/

          this.get('entities').map(
            function(entity) {
              dbHandler.appendChild(entity.toXml(xmlDoc));
          });

          return dbHandler
      }


});
