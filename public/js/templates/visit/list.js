define(['handlebars'], function(Handlebars) {

return Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, stack2, options, self=this, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  
  return "\n<ul class=\"visit-list\">\n</ul>\n";
  }

function program3(depth0,data) {
  
  
  return "\n<p class=\"alert error\">Pas de visite.</p>\n";
  }

  stack2 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.collection)),stack1 == null || stack1 === false ? stack1 : stack1.length), {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n<p>\n    ";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.linkTo || (depth0 && depth0.linkTo)),stack1 ? stack1.call(depth0, "Nouvelle visite", "new/visit", options) : helperMissing.call(depth0, "linkTo", "Nouvelle visite", "new/visit", options)))
    + "\n</p>\n";
  return buffer;
  })

});