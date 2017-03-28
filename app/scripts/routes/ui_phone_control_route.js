App.DispatchUiPhoneControlRoute = Ember.Route.extend({

    model: function (params) {
        return this.store.find('uiPhoneControl', params.ui_phone_control_id);
    },

    afterModel: function (control, transition) {
        var controlType = control.constructor.toString();
        controlType = controlType.split(".")[1];
        this.transitionTo('control' + controlType, control);
    }
});
