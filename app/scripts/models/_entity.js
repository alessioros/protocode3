App.Entity = DS.Model.extend({

    primaryKey: DS.attr('string'),


    xmlName: 'entity',

    toXml: function(xmlDoc) {

      var self = this;

      var entity = xmlDoc.createElement(self.get('xmlName'));

      entity.setAttribute('primaryKey', self.get('primaryKey'));
      

      return entity;
    }



});
