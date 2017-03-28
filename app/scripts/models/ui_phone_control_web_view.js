App.WebView = App.UiPhoneControl.extend({
    htmlFileName: DS.attr('string', {defaultValue: ""}),

    width: DS.attr('number', {defaultValue: 240}),
    height: DS.attr('number', {defaultValue: 128}),

    xmlName: 'webViews',

    toXml: function (xmlDoc) {
        var elem = xmlDoc.createElement(this.get('xmlName'));
        this.decorateXml(elem);

        elem.setAttribute('HTMLFileName', this.get('htmlFileName'));

        return elem;
    }
});
