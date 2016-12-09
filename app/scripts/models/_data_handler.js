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

      if(prefHandler){
        elem.appendChild(prefHandler.toXml(xmlDoc));
      }

      return elem;
    }

});
