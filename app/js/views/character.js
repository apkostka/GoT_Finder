define([
    'jquery',
    'underscore',
    'backbone',
    'hbs!templates/character'
  ], function($,_,Backbone,characterTemplate) {
  "use strict";

  var CharacterView = Backbone.View.extend({
    tagName: "div",
    className: "character",
    template: characterTemplate,

    initialize: function(){
      this.render();
    },

    render: function(){
      $(this.el).html(this.template(this.model));
      return this;
    }
  });

  return CharacterView;
});