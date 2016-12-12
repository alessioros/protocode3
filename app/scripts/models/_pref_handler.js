App.PrefHandler = DS.Model.extend({

      dataHandler:  DS.belongsTo('dataHandler'),

      prefRecords:  DS.hasMany('prefRecord', {async: true}),

      xmlName: 'prefHandler',

      toXml: function(xmlDoc) {

          var self = this;
          var elem = xmlDoc.createElement(self.get('xmlName'));

          this.get('prefRecords').map(function(item) {
              elem.appendChild(item.toXml(xmlDoc));
          });

          return elem;
      }
});
