define([
    'jquery',
    'underscore',
    'backbone',
    'models/character',
    'views/character',
    'hbs!templates/app'
  ], function($,_,Backbone,character,CharacterView,appTemplate) {
  "use strict";

  var AppView = Backbone.View.extend({
    el: '#main',
    className: "character-list",
    template: appTemplate,

    initialize: function(){
      var self = this;
      self.collection = new character.Collection();
      self.subviews = [];
      self.collection.fetch({
        success: function(){
          self.render();
        }
      });
    },

    render: function(house){
      var self = this;
      $('#main').html(this.template());

      self.removeSubviews();

      return this;
    },

    removeSubviews: function(){
      var self = this;

      $('#profiles').fadeOut(300, function(){
        if (self.subviews.length > 0) {
          _.each(self.subviews, function(view){
            view.remove();
          });
        }
        this.subviews = [];
        self.renderSubviews();
      });
    },

    renderSubviews: function(){
      var self = this;
      
      self.collection.each(function(character){
        var view = new CharacterView({model: character.attributes});
        $('#profiles').append(view.render().el);
        self.subviews.push(view);
      });

      $('#profiles').fadeIn(300);
    },

    events: {
      "click .dropdown-menu a.sort": "sortBy",
      "click .dropdown-menu a.house": "filterByHouse"
    },

    sortBy: function(e){
      e.preventDefault();

      var self = this;
      var sort = e.currentTarget.getAttribute('data-sort');
      self.collection.comparator = sort;
      self.collection.sort();
      self.removeSubviews();
      $('span.sort-label').text(sort)
    },

    filterByHouse: function(e){
      e.preventDefault();

      var self = this;
      var house = e.currentTarget.getAttribute('data-house');
      
      self.collection.fetch({
        success: function(){
          if (house.length > 0) self.collection = self.collection.filterByHouse(house);
          self.removeSubviews();

          $('span.house-label').text(house);
        }
      });
    }
  });

  return AppView;
});