App.ClickListenable = Ember.Mixin.create({
    navigationTarget: function(key, value) {

        // setter
        if (arguments.length > 1) {

            // Delete
            if (value == null) {
                var clickListener = this.get('clickListener');
                if (clickListener != null) {
                    //var navigation = clickListener.get('navigation');
                    //navigation.destroyRecord();
                    clickListener.deleteRecord();
                    clickListener.save();
                    this.set('clickListener', null);
                    this.get('model').save();
                }
            } else {
                var clickListener = this.get('clickListener');

                if (clickListener == null) {
                    clickListener = this.store.createRecord('clickListener');

                    var navigation = this.store.createRecord('navigation', {
                        destination: value
                    });
                    navigation.save();

                    clickListener.set('navigation', navigation);
                    clickListener.save();

                    var button = this.get('model');
                    button.set('clickListener', clickListener);
                    button.save();
                } else {
                    var navigation = clickListener.get('navigation');

                    if (navigation == null) {
                        navigation = this.store.createRecord('navigation', {
                            destination: value
                        });
                        clickListener.set('navigation', navigation);
                    }

                    navigation.set('destination', value);
                    navigation.save();
                    clickListener.save();
                }
            }

        }

        // getter
        return this.get('clickListener.navigation.destination');
    }.property(
        'model',
        'model.clickListener',
        'model.clickListener.navigation.destination')
});
