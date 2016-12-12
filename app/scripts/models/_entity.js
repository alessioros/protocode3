App.Entity = DS.Model.extend({

    name: DS.attr('string'),

    primaryKey: DS.attr('string'),

    entityAttributes: DS.hasMany('entityAttribute', {async: true}),

    entityRelationships: DS.hasMany('entityRelationship'),

    databaseHandler:    DS.belongsTo('databaseHandler'),

    xmlName: 'entity',

    toXml: function(xmlDoc) {

      var self = this;

      var entity = xmlDoc.createElement(self.get('xmlName'));

      entity.setAttribute('name', self.get('name'));

      entity.setAttribute('primaryKey', self.get('primaryKey'));

      self.get('entityAttributes').map(function(item) {
          entity.appendChild(item.toXml(xmlDoc));
      });

      self.get('entityRelationships').map(function(item) {
          entity.appendChild(item.toXml(xmlDoc));
      });

      return entity;
    }
});
