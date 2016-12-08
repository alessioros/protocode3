App.ViewController = DS.Model.extend({
	name:            	DS.attr('string'),
	backgroundColor:  DS.attr('string', {defaultValue: ''}),
  backgroundImage:  DS.attr('string', {defaultValue: ''}),
  launcher:         DS.attr('boolean', {defaultValue: false}),

  application:      DS.belongsTo('application', {inverse: 'viewControllers'}),

	uiPhoneControls:       DS.hasMany('uiPhoneControl', {polymorphic: true, async: true}),
  alertDialogs:     DS.hasMany('alertDialog', {inverse: 'viewController'}),
  progressDialogs:  DS.hasMany('progressDialog', {inverse: 'viewController'}),
  asyncTasks:       DS.hasMany('asyncTask', {inverse: 'viewController'}),

  xmlName:        	'viewControllers',

  deleteRecord: function () {
    var self = this;

    this.get('uiPhoneControls').then(function (uiPhoneControls) {
      uiPhoneControls.forEach(function (uiPhoneControl) {
        Ember.run.once(self, function () {
          uiPhoneControl.deleteRecord();
          uiPhoneControl.save();
        });
      });
    });

    var linkedModels = ['alertDialogs', 'progressDialogs', 'asyncTasks'];

    var self = this

    linkedModels.forEach(function (linkedModel) {
      self.get(linkedModel).forEach(function (uiPhoneControl) {
        Ember.run.once(self, function () {
          uiPhoneControl.deleteRecord();
          uiPhoneControl.save();
        });
      });
    });

    this._super();
  },

  toXml: function(xmlDoc) {
    var self = this;

    var promise = new Promise(function (resolve, reject) {
      var viewController = xmlDoc.createElement(self.get('xmlName'));
      viewController.setAttribute('name', self.get('name'));
			viewController.setAttribute('backgroundColor', self.get('backgroundColor'));
      viewController.setAttribute('backgroundImage', self.get('backgroundImage'));
      viewController.setAttribute('launcher', self.get('launcher'));

      self.get('alertDialogs').map(function (alertDialog) {
        viewController.appendChild(alertDialog.toXml(xmlDoc));
      });

      self.get('progressDialogs').map(function (progressDialog) {
        viewController.appendChild(progressDialog.toXml(xmlDoc));
      });

      self.get('asyncTasks').map(function (asyncTask) {
        viewController.appendChild(asyncTask.toXml(xmlDoc));
      });

      self.get('uiPhoneControls').then(function (uiPhoneControls) {

        Promise.all(uiPhoneControls.map(function (uiPhoneControl) {
          return uiPhoneControl.toXml(xmlDoc);
        })).then(function (uiPhoneControlXmls) {

          uiPhoneControlXmls.map(function (xml) {

            viewController.appendChild(xml);

          });

          resolve(viewController);

        });
      });
    });

    return promise;
  },

  getRefPath: function(path) {
    return '//@' + this.get('xmlName') + '[name=\'' + this.get('name') + '\']' + path;
  }

});
