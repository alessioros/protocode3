var App = window.App = Ember.Application.create();

/* Order and include as you please. */
require('scripts/mixins/*');
require('scripts/controllers/*');
require('scripts/store');
require('scripts/models/*');
require('scripts/routes/*');
require('scripts/views/*');
require('scripts/components/*');
require('scripts/router');

var get = Ember.get;

DS.ManyArray.reopen({
  reloadLinks: function() {
    var records = get(this, 'content'),
    store = get(this, 'store'),
    owner = get(this, 'owner'),
    type = get(this, 'type'),
    name = get(this, 'name'),
    resolver = Ember.RSVP.defer();

    var meta = owner.constructor.metaForProperty(name);
    var link = owner._data.links[meta.key];
    store.findHasMany(owner, link, meta, resolver);
  }
});
