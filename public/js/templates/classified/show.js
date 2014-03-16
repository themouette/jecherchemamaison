define(['handlebars'], function(Handlebars) {

return Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); partials = this.merge(partials, Handlebars.partials); data = data || {};
  var buffer = "", stack1, stack2, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, functionType="function", self=this;

function program1(depth0,data) {
  
  
  return "\n                Envoyer un message\n                ";
  }

function program3(depth0,data) {
  
  var buffer = "", stack1, stack2, options;
  buffer += "\n            <a href=\"http://maps.google.com?q=";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.encodeURIComponent || (depth0 && depth0.encodeURIComponent)),stack1 ? stack1.call(depth0, (depth0 && depth0.address), options) : helperMissing.call(depth0, "encodeURIComponent", (depth0 && depth0.address), options)))
    + "\">";
  options = {hash:{},data:data};
  stack2 = ((stack1 = helpers.nl2br || (depth0 && depth0.nl2br)),stack1 ? stack1.call(depth0, (depth0 && depth0.address), options) : helperMissing.call(depth0, "nl2br", (depth0 && depth0.address), options));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "</a>\n            ";
  return buffer;
  }

function program5(depth0,data) {
  
  
  return "\n                Adresse inconnue.\n            ";
  }

  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.viewClass || (depth0 && depth0.viewClass)),stack1 ? stack1.call(depth0, "classified-show", options) : helperMissing.call(depth0, "viewClass", "classified-show", options)))
    + "\n\n\n<div class=\"small-12 columns\">\n    <h3 class=\"classified-title\">";
  if (stack2 = helpers.name) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = (depth0 && depth0.name); stack2 = typeof stack2 === functionType ? stack2.call(depth0, {hash:{},data:data}) : stack2; }
  buffer += escapeExpression(stack2)
    + "</h3>\n</div>\n\n\n<div class=\"small-3 columns text-right\">\n    <h3>";
  if (stack2 = helpers.price) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = (depth0 && depth0.price); stack2 = typeof stack2 === functionType ? stack2.call(depth0, {hash:{},data:data}) : stack2; }
  buffer += escapeExpression(stack2)
    + " €</h3>\n    <ul class=\"no-bullet\">\n        <li>Surface: ";
  if (stack2 = helpers.surface) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = (depth0 && depth0.surface); stack2 = typeof stack2 === functionType ? stack2.call(depth0, {hash:{},data:data}) : stack2; }
  buffer += escapeExpression(stack2)
    + " m2</li>\n        <li>Etage: ";
  if (stack2 = helpers.etage) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = (depth0 && depth0.etage); stack2 = typeof stack2 === functionType ? stack2.call(depth0, {hash:{},data:data}) : stack2; }
  buffer += escapeExpression(stack2)
    + "</li>\n    </ul>\n    <ul class=\"no-bullet\">\n        <li>Charges: ";
  if (stack2 = helpers.charges) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = (depth0 && depth0.charges); stack2 = typeof stack2 === functionType ? stack2.call(depth0, {hash:{},data:data}) : stack2; }
  buffer += escapeExpression(stack2)
    + " € / mois</li>\n        <li>Foncier: ";
  if (stack2 = helpers.taxe_foncier) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = (depth0 && depth0.taxe_foncier); stack2 = typeof stack2 === functionType ? stack2.call(depth0, {hash:{},data:data}) : stack2; }
  buffer += escapeExpression(stack2)
    + " € / an</li>\n        <li>habitation: ";
  if (stack2 = helpers.taxe_habitation) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = (depth0 && depth0.taxe_habitation); stack2 = typeof stack2 === functionType ? stack2.call(depth0, {hash:{},data:data}) : stack2; }
  buffer += escapeExpression(stack2)
    + " € / an</li>\n    </ul>\n    <ul class=\"no-bullet\">\n        <li>\n            ";
  options = {hash:{
    'class': ("button")
  },data:data};
  buffer += escapeExpression(((stack1 = helpers.linkTo || (depth0 && depth0.linkTo)),stack1 ? stack1.call(depth0, "Retour à la liste", "classifieds", options) : helperMissing.call(depth0, "linkTo", "Retour à la liste", "classifieds", options)))
    + "\n        </li>\n        <li>\n            ";
  options = {hash:{
    'class': ("button secondary tiny")
  },data:data};
  buffer += escapeExpression(((stack1 = helpers.linkTo || (depth0 && depth0.linkTo)),stack1 ? stack1.call(depth0, "Editer", "classifieds/", (depth0 && depth0.id), "/edit", options) : helperMissing.call(depth0, "linkTo", "Editer", "classifieds/", (depth0 && depth0.id), "/edit", options)))
    + "\n            <a href=\""
    + escapeExpression(((stack1 = (depth0 && depth0.link)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"  class=\"button secondary tiny\" target=\"_blank\">Voir sur le site</a>\n        </li>\n        <li>\n        <p>";
  options = {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data};
  stack2 = ((stack1 = helpers.linkToEvent || (depth0 && depth0.linkToEvent)),stack1 ? stack1.call(depth0, "foo:bar", options) : helperMissing.call(depth0, "linkToEvent", "foo:bar", options));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "</p>\n        </li>\n        <li>\n            <a href=\"#\" class=\"classified-delete button alert tiny\">Supprimer</a>\n        </li>\n    </ul>\n    <ul class=\"no-bullet\">\n        <li>Ajoutée le: ";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.date || (depth0 && depth0.date)),stack1 ? stack1.call(depth0, (depth0 && depth0.created_at), options) : helperMissing.call(depth0, "date", (depth0 && depth0.created_at), options)))
    + "</li>\n        <li>Modifié le: ";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.date || (depth0 && depth0.date)),stack1 ? stack1.call(depth0, (depth0 && depth0.updated_at), options) : helperMissing.call(depth0, "date", (depth0 && depth0.updated_at), options)))
    + "</li>\n    </ul>\n</div>\n<div class=\"small-9 columns\">\n    <div class=\"row nested\">\n        <div class=\"small-6 columns\">\n            <a class=\"th classified-main-image\"><img src=\"";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.first || (depth0 && depth0.first)),stack1 ? stack1.call(depth0, (depth0 && depth0.images), options) : helperMissing.call(depth0, "first", (depth0 && depth0.images), options)))
    + "\" /></a>\n        </div>\n        <div class=\"small-6 columns\">\n            <div class=\"classified-map\"></div>\n            <p>";
  stack2 = helpers['if'].call(depth0, (depth0 && depth0.address), {hash:{},inverse:self.program(5, program5, data),fn:self.program(3, program3, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n            </p>\n        </div>\n    </div>\n    <p>";
  options = {hash:{},data:data};
  stack2 = ((stack1 = helpers.nl2br || (depth0 && depth0.nl2br)),stack1 ? stack1.call(depth0, (depth0 && depth0.content), options) : helperMissing.call(depth0, "nl2br", (depth0 && depth0.content), options));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "</p>\n    <div>";
  stack2 = self.invokePartial(partials['classified/_images6'], 'classified/_images6', depth0, helpers, partials, data);
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "</div>\n</div>\n";
  return buffer;
  })

});