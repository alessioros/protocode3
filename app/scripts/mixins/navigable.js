App.Navigable = Ember.Mixin.create({
  navigationTarget: function(key, value) {

    // setter
    if (arguments.length > 1) {

      // Delete
      if (value == null) {
        
        var navigation = this.get('navigation');
        if (navigation != null) {
          navigation.destroyRecord();
          this.set('navigation', null);
          this.get('model').save();
        }
        
      }
      else {

        var navigation = this.get('navigation');

        if (navigation == null) {
          navigation = this.store.createRecord('navigation', {destination: value});
          navigation.save();

          var menuItem = this.get('model');
          menuItem.set('navigation', navigation);
          menuItem.save();
        }
        else {
          navigation.set('destination', value);
          navigation.save();
          this.get('model').save();
        }
        
      }

    }

    // getter
    return this.get('navigation.destination');
  }.property(
    'model',
    'model.navigation',
    'model.navigation.destination')
});