App.Router.map(function() {
    this.resource('editor', function() {
        this.resource('watchControllers', function() {
            this.resource('watchController', {
                path: '/watchController/:watchController_id'
            }, function() {
                this.resource('dispatchUiWatchControl', {
                    path: '/uiWatchControl/:ui_watch_control_id'
                }, function() {});
                this.resource('controlWatchButton', {
                    path: '/watchButton/:watch_button_id'
                }, function() {});
                this.resource('controlWatchLabel', {
                    path: '/watchLabel/:watch_label_id'
                }, function() {});
                this.resource('controlWatchVoiceMessage', {
                    path: '/watchVoiceMessage/:watch_voice_message_id'
                }, function() {});
                this.resource('controlWatchSwitch', {
                    path: '/watchSwitch/:watch_switch_id'
                }, function() {});
                this.resource('controlWatchSlider', {
                    path: '/watchSlider/:watch_slider_id'
                }, function() {});
            });
        });
        this.resource('viewControllers', function() {
            this.resource('viewController', {
                path: '/viewController/:viewController_id'
            }, function() {
                this.resource('dispatchUiPhoneControl', {
                    path: '/uiPhoneControl/:ui_phone_control_id'
                }, function() {});
                this.resource('controlAudioPlayer', {
                    path: '/audioPlayer/:audioPlayer_id'
                }, function() {});
                this.resource('controlAudioRecorder', {
                    path: '/audioRecorder/:audioRecorder_id'
                }, function() {});
                this.resource('controlButton', {
                    path: '/button/:button_id'
                }, function() {});
                this.resource('controlCard', {
                    path: '/card/:card_id'
                }, function() {});
                this.resource('controlContainer', {
                    path: '/container/:container_id'
                }, function() {});
                this.resource('controlEditText', {
                    path: '/editText/:editText_id'
                }, function() {});
                this.resource('controlGridView', {
                    path: '/gridView/:gridView_id'
                }, function() {});
                this.resource('controlGridViewCell', {
                    path: '/gridViewCell/:gridViewCell_id'
                }, function() {});
                this.resource('controlImageView', {
                    path: '/imageView/:imageView_id'
                }, function() {});
                this.resource('controlLabel', {
                    path: '/label/:label_id'
                }, function() {});
                this.resource('controlListView', {
                    path: '/listView/:listView_id'
                }, function() {});
                this.resource('controlListViewCell', {
                    path: '/listViewCell/:listViewCell_id'
                }, function() {});
                this.resource('controlMap', {
                    path: '/map/:map_id'
                }, function() {});
                this.resource('controlDatepicker', {
                    path: '/datepicker/:datepicker_id'
                }, function() {});
                this.resource('controlTimepicker', {
                    path: '/timepicker/:timepicker_id'
                }, function() {});
                this.resource('controlSwitch', {
                    path: '/switch/:switch_id'
                }, function() {});
                this.resource('controlSlider', {
                    path: '/slider/:slider_id'
                }, function() {});
                this.resource('controlSpinner', {
                    path: '/spinner/:spinner_id'
                }, function() {});
                this.resource('controlPhotocameraController', {
                    path: '/photocameraController/:photocameraController_id'
                }, function() {});
                this.resource('controlVideocameraController', {
                    path: '/videocameraController/:videocameraController_id'
                }, function() {});
                this.resource('controlVideoView', {
                    path: '/videoView/:videoView_id'
                }, function() {});
                this.resource('controlWebView', {
                    path: '/webView/:webView_id'
                }, function() {});
                this.resource('appMenu', {
                    path: '/menu/:menu_id'
                }, function() {});
                this.resource('appMenuItem', {
                    path: '/menuItem/:menu_item_id'
                }, function() {});
                this.resource('asyncTask', {
                    path: '/asyncTask/:async_task_id'
                }, function() {});
                this.resource('alertDialog', {
                    path: '/alertDialog/:alert_dialog_id'
                }, function() {});
                this.resource('progressDialog', {
                    path: '/progressDialog/:progress_dialog_id'
                }, function() {});
            });
        });
    });

    this.resource('data_model_editor', function() {
        this.resource('preference_handler', function() {
            this.resource('preference_records', function(){});
        });
        this.resource('database_handler', function() {
            this.resource('entities', function() {
                this.resource('entity', {
                  path: '/entity/:entity_id'
                }, function() {});
            });
        });
    });

    this.resource('uiPhoneControls');
    this.resource('uiWatchControls');
    this.resource('about');
    this.resource('model');
});
