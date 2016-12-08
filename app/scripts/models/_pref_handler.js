App.PrefHandler = DS.Model.extend({

      dataHandler:  DS.belongsTo('dataHandler'),

      prefRecords:  DS.hasMany('prefRecord'),

      xmlName: 'prefHandler',

      toXml: function(xmlDoc) {
          var elem = xmlDoc.createElement('prefHandler');

          this.get('prefRecords').map(function(item) {
              elem.appendChild(item.toXml(xmlDoc));
          });

          return elem;
      }
});
