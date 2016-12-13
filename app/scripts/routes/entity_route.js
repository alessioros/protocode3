App.EntityRoute = Ember.Route.extend({

  model: function(params) {
    entity: return this.store.find('entity', params.entity_id);
    entityAttributes: return this.store.find('entity', params.entity_id).then(
      function(entity){
        return entity.get('entityAttributes');
      }
    );
    entityRelationships: return this.store.find('entity', params.entity_id).then(
      function(entity){
        return entity.get('entityRelationships');
      }
    );
  },

  setupController: function(controller, model) {
      this._super(controller, model);
      controller.set('model', model);
  },
});
