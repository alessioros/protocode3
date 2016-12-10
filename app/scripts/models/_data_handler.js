App.DataHandler = DS.Model.extend({

    application:      DS.belongsTo('application'),

    prefHandler:      DS.belongsTo('prefHandler'),

    databaseHandler:  DS.belongsTo('databaseHandler'),
    /*

    filesHandler: belongsTo('filesHandler'),

    cloudHandler: belongsTo('cloudHandler'),

    */
    xmlName: 'dataHandler',

    toXml: function(xmlDoc) {

      var self = this;
      var elem = xmlDoc.createElement(self.get('xmlName'));
      var prefHandler = this.get('prefHandler');
      var databaseHandler = this.get('databaseHandler');

      if(prefHandler){
        elem.appendChild(prefHandler.toXml(xmlDoc));
      }

      if(databaseHandler){
        elem.appendChild(databaseHandler.toXml(xmlDoc));
      }

      return elem;
    }

});
