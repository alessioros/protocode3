/*

 */
App.UiPhoneControlTemplateController = Ember.ObjectController.extend({
    needs: ['editor'],

    imageSource: function () {
        var platform = this.get('controllers.editor.smartphone.platform');
        return 'img/ui_phone_controls/' + platform + '/' + this.get('model.nameImg');
    }.property('controllers.editor.smartphone.platform')

});
