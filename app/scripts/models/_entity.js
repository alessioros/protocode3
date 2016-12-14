App.Entity = DS.Model.extend({

    name: DS.attr('string'),

    primaryKey: DS.attr('string'),

    entityAttributes: DS.hasMany('entityAttribute', {async: true}),

    entityRelationships: DS.hasMany('entityRelationship', {async: true}),

    databaseHandler:    DS.belongsTo('databaseHandler'),

    xmlName: 'entity',

    toXml: function(xmlDoc) {

      var self = this;

      var entity = xmlDoc.createElement(self.get('xmlName'));

      entity.setAttribute('name', self.get('name'));

      entity.setAttribute('primaryKey', self.get('primaryKey'));

      var entityAttributes = self.get('entityAttributes');
      var entityRelationships = self.get('entityRelationships');

      // retrieve async values
      /*Promise.all(entityAttributes.map(function(item_attributes) {

          return item_attributes.toXml(xmlDoc);

      })).then(
        function(values_attributes){

          Promise.all(entityRelationships.map(function(item_relationships) {
              return item_relationships.toXml(xmlDoc);
          })).then(function(values_relationships) {

              values_attributes.map(function(value) {
                  entity.appendChild(value);
              })

              values_relationships.map(function(value) {
                  entity.appendChild(value);
              })

              resolve(xmlDoc);
          });
      });*/

      self.get('entityAttributes').map(function(item) {
          entity.appendChild(item.toXml(xmlDoc));
      });

      self.get('entityRelationships').map(function(item) {
          entity.appendChild(item.toXml(xmlDoc));
      });

      return entity;
    }
});
