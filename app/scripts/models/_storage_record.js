App.StorageRecord = DS.Model.extend({

  name:        DS.attr('string'),
  extension:      DS.attr('string'),
  path:       DS.attr('string', {defaultValue: 'string'}),

  storageHandler:    DS.belongsTo('storageHandler'),

  xmlName:    'storageRecord',

  toXml: function(xmlDoc) {

    var self = this;

    var record = xmlDoc.createElement(self.get('xmlName'));

    record.setAttribute('name', self.get('name'));
    record.setAttribute('extension', self.get('extension'));
    record.setAttribute('path', self.get('path'));

    return record;
  }

});
