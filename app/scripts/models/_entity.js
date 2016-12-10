App.Entity = DS.Model.extend({

    name: DS.attr('string'),

    primaryKey: DS.attr('string'),

    entityAttributes: DS.hasMany('entityAttribute'),

    entityRelationships: DS.hasMany('entityRelationship'),

    xmlName: 'entity',

    toXml: function(xmlDoc) {

      var self = this;

      var entity = xmlDoc.createElement(self.get('xmlName'));

      entity.setAttribute('name', self.get('name'));

      entity.setAttribute('primaryKey', self.get('primaryKey'));

      this.get('entityAttributes').map(function(item) {
          elem.appendChild(item.toXml(xmlDoc));
      });

      this.get('entityRelationships').map(function(item) {
          elem.appendChild(item.toXml(xmlDoc));
      });


      return entity;
    }
});
