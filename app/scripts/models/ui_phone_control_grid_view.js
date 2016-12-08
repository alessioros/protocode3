App.GridView = App.UiPhoneControl.extend({
  gridViewCells:    DS.hasMany('gridViewCell', {inverse: 'parentGridView'}),
  clickListener:    DS.belongsTo('clickListener'),

  width:           DS.attr('number', {defaultValue: 204}),
  height:           DS.attr('number', {defaultValue: 408}),

  alignParentStart:   DS.attr('boolean', {defaultValue: true}),
  alignParentEnd:     DS.attr('boolean', {defaultValue: true}),

  gridType:         DS.attr('string', {defaultValue: 'simple'}),

  xmlName:        'gridViews',

  deleteRecord: function() {
    var gridViewCells = this.get('gridViewCells');

    gridViewCells.forEach(function (gridViewCell) {
      Ember.run.once(this, function () {
        gridViewCell.deleteRecord();
        gridViewCell.save();
      });
    });

    var clickListener = this.get('clickListener');

    if (clickListener) {
      clickListener.deleteRecord();
      clickListener.save();
    }

    this._super();
  },

  toXml: function(xmlDoc) {
    var self = this;

    var elem = xmlDoc.createElement(self.get('xmlName'));
    self.decorateXml(elem);

    elem.setAttribute('gridType', this.get('gridType'));

    var clickListener = self.get('clickListener');

    if (clickListener != null) {
        elem.appendChild(clickListener.toXml(xmlDoc));
    }

    self.get('gridViewCells').map(function(item) {
      elem.appendChild(item.toXml(xmlDoc));
    });

    return elem;
  }
});
/*
App.GridView.FIXTURES = [
  {
    id: 9,
    name: 'GridView1',
    gridViewCells: [1],
    posX: 10,
    posY: 10,
    paddingTop: 0,
    paddingBottom: 0,
    paddingStart: 0,
    paddingEnd: 0,
    marginTop: 0,
    marginBottom: 0,
    marginStart: 0,
    marginEnd: 0,
    alignParentTop: false,
    alignParentBottom: true,
    alignParentStart: true,
    alignParentEnd: true,
    width: 300,
    height: 200,
    viewController: 2,
    parentContainer: null
  }
];*/
