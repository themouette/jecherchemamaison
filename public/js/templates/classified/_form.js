define(['handlebars'], function(Handlebars) {

Handlebars.registerPartial("classified/_form", Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); partials = this.merge(partials, Handlebars.partials); data = data || {};
  var buffer = "", stack1, options, functionType="function", escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "/";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.id); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1);
  return buffer;
  }

function program3(depth0,data) {
  
  
  return "\n    <input type=\"hidden\" name=\"_method\" value=\"put\">\n    ";
  }

function program5(depth0,data) {
  
  var buffer = "", stack1, options;
  buffer += "\n            ";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.linkToClassified || (depth0 && depth0.linkToClassified)),stack1 ? stack1.call(depth0, depth0, options) : helperMissing.call(depth0, "linkToClassified", depth0, options)))
    + "\n            <a href=\"#\" class=\"classified-delete button alert tiny\">Supprimer</a>\n            <a href=\""
    + escapeExpression(((stack1 = (depth0 && depth0.link)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"  class=\"classified-form-link-external button secondary tiny\" target=\"_blank\">Voir sur le site</a>\n        ";
  return buffer;
  }

  buffer += "<form action=\"/api/classifieds";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.id), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" method=\"POST\">\n    ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.id), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n    <div class=\"row\">\n        <div class=\"small-7 columns\">\n            ";
  stack1 = self.invokePartial(partials['classified/_form_identity'], 'classified/_form_identity', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        </div>\n        <div class=\"small-5 columns\">\n            ";
  stack1 = self.invokePartial(partials['classified/_form_parameters'], 'classified/_form_parameters', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            ";
  stack1 = self.invokePartial(partials['classified/_form_costs'], 'classified/_form_costs', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            ";
  stack1 = self.invokePartial(partials['classified/_images'], 'classified/_images', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        </div>\n    </div>\n\n    <div class=\"row\">\n        ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.id), {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        <input type=\"submit\" name=\"submit\" value=\"Envoyer\" id=\"submit\" class=\"button radius right\">\n        <a href=\"";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.url || (depth0 && depth0.url)),stack1 ? stack1.call(depth0, "classifieds", options) : helperMissing.call(depth0, "url", "classifieds", options)))
    + "\" class=\"classified-delete button secondary radius right\">Retour à la liste</a>\n    </div>\n</form>\n\n";
  return buffer;
  }));

});