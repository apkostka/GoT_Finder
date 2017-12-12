define([
    'jquery',
    'underscore',
    'backbone'
  ], function($,_,Backbone) {
  "use strict";

  var Character = Backbone.Model.extend({
    defaults: function(){
      return {
        "name":     "Character Name",
        "house":    "House",
        "actor":    "Actor Name",
        "quote":    "Character Quote",
        "episodes": 1
      };
    }
  });

  var CharacterCollection = Backbone.Collection.extend({
    model: Character,
    url: 'characters.json',

    filterByHouse: function(house){
      if (house.length > 0) {
        var filtered = this.filter(function(character){
          return character.get('house') === house;
        });
      }
      return new CharacterCollection(filtered);
    }
  });

  return {
    Model: Character,
    Collection: CharacterCollection
  };
});