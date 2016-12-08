App.ClickListener = DS.Model.extend({
    navigation: DS.belongsTo('navigation'),

    deleteRecord: function() {
        var navigation = this.get('navigation');

        if (navigation) {
            navigation.deleteRecord();
            navigation.save();
        }

        this._super();
    },

    toXml: function(xmlDoc) {
        var elem = xmlDoc.createElement('clickListener');

        var navigation = this.get('navigation');

        if (navigation != null) {
            elem.appendChild(navigation.toXml(xmlDoc));
        }

        return elem;
    }
});
