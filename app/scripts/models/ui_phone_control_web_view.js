App.WebView = App.UiPhoneControl.extend({
  htmlFileName:    DS.attr('string', {defaultValue: ""}),

  width:    DS.attr('number', {defaultValue: 240}),
  height:   DS.attr('number', {defaultValue: 128}),

  xmlName:  'webViews',

  toXml: function(xmlDoc) {
    var elem = xmlDoc.createElement(this.get('xmlName'));
    this.decorateXml(elem);

    elem.setAttribute('HTMLFileName', this.get('htmlFileName'));

    return elem;
  }
});

/*
App.WebView.FIXTURES = [
  {
    id: 5,
    name: 'WebView1',
    htmlFileName: 'newHtmlFile',
    posX: 30,
    posY: 270,
    paddingTop: 8,
    paddingBottom: 8,
    paddingStart: 8,
    paddingEnd: 8,
    marginTop: 0,
    marginBottom: 0,
    marginStart: 0,
    marginEnd: 0,
    alignParentTop: false,
    alignParentBottom: false,
    alignParentStart: false,
    alignParentEnd: false,
    width: 200,
    height: 100,
    viewController: 1,
    parentContainer: null
  }
];*/
