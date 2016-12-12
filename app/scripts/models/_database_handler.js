App.DatabaseHandler = DS.Model.extend({

      dataHandler:  DS.belongsTo('dataHandler'),

      entities:     DS.hasMany('entity', {async: true}),

      xmlName: 'DBHandler',

      toXml: function(xmlDoc) {

          var self = this;

          var elem = xmlDoc.createElement(self.get('xmlName'));

          this.get('entities').map(function(item) {
              elem.appendChild(item.toXml(xmlDoc));
          });

          return elem;
      }


});
