App.MenuItem = DS.Model.extend({
    title:      DS.attr('string'),
    name:       DS.attr('string'),

    parentMenu: DS.belongsTo('menu', {inverse: 'menuItems'}),
    navigation: DS.belongsTo('navigation', {inverse: null}),

    deleteRecord: function() {
      var navigation = this.get('navigation');

      if (navigation) {
        navigation.deleteRecord();
        navigation.save();
      }

      this._super();
    },

    // Used to reload menuItems
    didCreate: function() {
      this._super();

      var self = this;

      this.get('parentMenu').save();
    },

    toXml: function(xmlDoc) {
      var elem = xmlDoc.createElement('menuItems');

      elem.setAttribute('title', this.get('title'));
      elem.setAttribute('id', this.get('name'));

      var navigation = this.get('navigation')

      if (navigation != null) {
        elem.appendChild(navigation.toXml(xmlDoc));
      }

      return elem;
    }
});
