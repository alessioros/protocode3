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

      var prefHandler = this.get('prefHandler');
      var databaseHandler = this.get('databaseHandler');

      var dataHandler = xmlDoc.createElement(this.get('xmlName'));

      if(prefHandler){
        dataHandler.appendChild(prefHandler.toXml(xmlDoc));
      }

      if(databaseHandler){
        dataHandler.appendChild(databaseHandler.toXml(xmlDoc));
      }

      return dataHandler;
    }

});
