App.Menu = DS.Model.extend({
    menuItems: DS.hasMany('menuItem', {inverse: 'parentMenu'}),

    toXml: function(xmlDoc) {
        var elem = xmlDoc.createElement('menu');

        this.get('menuItems').map(function(item) {
            elem.appendChild(item.toXml(xmlDoc));
        });

        return elem;
    }
});
