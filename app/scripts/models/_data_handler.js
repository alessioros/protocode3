App.DataHandler = DS.Model.extend({

    application:      DS.belongsTo('application'),

    prefHandler:      DS.belongsTo('prefHandler'),
    /*

    databaseHandler: belongsTo('databaseHandler'),

    filesHandler: belongsTo('filesHandler'),

    cloudHandler: belongsTo('cloudHandler'),

    */
    xmlName: 'dataHandler',

    toXml: function(xmlDoc) {

      var elem = xmlDoc.createElement('dataHandler');
      var prefHandler = this.get('prefHandler');

      if(prefHandler){
        elem.appendChild(prefHandler.toXml(xmlDoc));
      }

      return elem;
    }

});
