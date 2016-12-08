App.ViewControllerRoute = Ember.Route.extend({
  zIndex: 5,

  actions: {
    increaseZoom: function() {
      this.set('controller.zoomLevel', Math.round((this.get('controller.zoomLevel') + 0.2) * 100) / 100);
    },
    decreaseZoom: function() {
      this.set('controller.zoomLevel', Math.round((this.get('controller.zoomLevel') - 0.2) * 100) / 100);
    },
    addUiPhoneControl: function(controlType, receiver) {
      console.log('Receiver of drop event: ' + receiver.get('context.name'));
      console.log('Type of receiver: ' + receiver.get('context').constructor.toString());

      /*
        Multiple VideoViews or AudioPlayers
        May not work for some devices
      */
      var videoViewAlert = false;
      var audioPlayerAlert = false;
      this.get('context').get('uiPhoneControls').forEach(function(item){
        if(item.toString().indexOf('VideoView') > -1 && controlType == 'videoView') {
          videoViewAlert = true;
        } else if(item.toString().indexOf('AudioPlayer') > -1 && controlType == 'audioPlayer') {
          audioPlayerAlert = true;
        }
      });

      if(videoViewAlert) {
          alert('Multiple VideoViews in the same ViewControl, may not work within your real device!');
      } else if(audioPlayerAlert) {
          alert('Multiple AudioPlayers in the same ViewControl, may not work within your real device!');
      }

      var canInstantiate = true;

      /*
        Photo/Videocamera Controller, Audio Recorder and Map
        Must be instantiated at most once per ViewController
      */
      this.get('context').get('uiPhoneControls').forEach(function(item){
        if(item.toString().indexOf('PhotocameraController') > -1 && controlType == 'photocameraController') {
          alert('Only a single Photocamera Controller per each view is allowed!');
          canInstantiate = false;
        } else if(item.toString().indexOf('VideocameraController') > -1 && controlType == 'videocameraController') {
          alert('Only a single Videocamera Controller per each view is allowed!');
          canInstantiate = false;
        } else if(item.toString().indexOf('AudioRecorder') > -1 && controlType == 'audioRecorder') {
          alert('Only a single Audio Recorder per each view is allowed!');
          canInstantiate = false;
        } else if(item.toString().indexOf('Map') > -1 && controlType == 'map') {
          alert('Only a single Map per each view is allowed!');
          canInstantiate = false;
        }
      });

      if(canInstantiate) {
        var uiPhoneControl = this.store.createRecord(controlType, {
          viewController: this.get('controller.model')
        });

        this.get('controller.model').save();

        if (receiver.get('context').constructor.toString() == 'App.Container') {
          uiPhoneControl.set('parentContainer', receiver.get('context'));
          receiver.get('context').save();
        }

        uiPhoneControl.save();
      }


    }
  }
});
