App.ObjectAttribute = DS.Model.extend({

    name: DS.attr('string'),
    type: DS.attr('string'),

    cloudObject: DS.belongsTo('cloudObject'),

    xmlName: 'objAttribute',

    toXml: function(xmlDoc) {

      var self = this;
      var objAttribute = xmlDoc.createElement(self.get('xmlName'));

      objAttribute.setAttribute('name', self.get('name'));
      objAttribute.setAttribute('type', self.get('type'));

      return objAttribute;
    }
});
