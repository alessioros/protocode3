/*
  templates/control_audio_recorder/index.hbs
*/
App.ControlAudioRecorderIndexController = App.UiPhoneControlController.extend({

    allowedAudioPlayers: function() {
        return this.get('audioPlayers').filterBy('sourceType.type', 'hardwareFile');
    }.property('audioPlayers.@each'),

    actions: {
        acceptChanges: function() {
            this._super();

            if (this.get('model.audioPlayer')) {
                this.get('model.audioPlayer').save();
            }
        }
    }

});
