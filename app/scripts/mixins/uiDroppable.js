App.UiDroppable = Ember.Mixin.create({
  classNameBindings: ['draggingOver'],

  draggingOver: false,

  dragEnter: function(event) {
    this.set('draggingOver', true);
    return false;
  },

  dragLeave: function(event) {
    this.set('draggingOver', false);
  },

  dragOver: function(event) {
    this.set('draggingOver', true);
    event.preventDefault();
    return false;
  },

  drop: function(event) {
    event.preventDefault();
    this.get('controller').send('addUiPhoneControl', event.dataTransfer.getData('uiPhoneControlType'), this);
    this.set('draggingOver', false);

    // used to prevent multiple fires of drop in nested views
    return false;
  }
});