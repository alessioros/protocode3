App.Application = DS.Model.extend({
    name:             DS.attr('string', {defaultValue: 'newApp'}),
    companyIdentifier: DS.attr('string',{defaultValue: 'it.polimi'}),

    menu:             DS.belongsTo('menu'),

    dataHandler:      DS.belongsTo('dataHandler'),

    watchControllers: DS.hasMany('watchController', {inverse: 'application'}),
    viewControllers:  DS.hasMany('viewController', {inverse: 'application'}),

    deleteRecord: function() {
        this.get('watchControllers').forEach(function(watchController) {
            Ember.run.once(this, function() {
                watchController.deleteRecord();
                watchController.save();
            });
        });

        this.get('viewControllers').forEach(function(viewController) {
            Ember.run.once(this, function() {
                viewController.deleteRecord();
                viewController.save();
            });
        });

        this._super();
    },

    toXml: function() {
        var self = this;
        var promise = new Promise(function(resolve, reject) {
            var xmlDocType = document.implementation.createDocumentType('appModel', 'MODEL', '<?xml version="1.0" encoding="ASCII"?>');
            var xmlDoc = document.implementation.createDocument('appModelXml', null, xmlDocType);

            var appModel = xmlDoc.createElement('metamodel:Application');
            appModel.setAttribute('xmi:version', '2.0');
            appModel.setAttribute('xmlns:xmi', 'http://www.omg.org/XMI');
            appModel.setAttribute('xmlns:xsi', 'http://www.w3.org/2001/XMLSchema-instance');
            appModel.setAttribute('xmlns:metamodel', 'http://metamodel/1.0');
            appModel.setAttribute('xsi:schemaLocation', 'http://metamodel/1.0 ../metamodel/metamodel.ecore');
            appModel.setAttribute('name', self.get('name'));
            appModel.setAttribute('companyIdentifier', self.get('companyIdentifier'));

            var viewControllers = self.get('viewControllers');
            var watchControllers = self.get('watchControllers');

            Promise.all(viewControllers.map(function(item_viewControllers) {
                return item_viewControllers.toXml(xmlDoc);
            })).then(function(values_viewControllers) {

                Promise.all(watchControllers.map(function(item_watchControllers) {
                    return item_watchControllers.toXml(xmlDoc);
                })).then(function(values_watchControllers) {

                    values_viewControllers.map(function(value) {
                        appModel.appendChild(value);
                    })

                    values_watchControllers.map(function(value) {
                        appModel.appendChild(value);
                    })

                    appModel.appendChild(self.get('menu').toXml(xmlDoc));
                    appModel.appendChild(self.get('dataHandler').toXml(xmlDoc));

                    xmlDoc.appendChild(appModel);

                    resolve(xmlDoc);
                });

            });

        });

        return promise;

    }
});
