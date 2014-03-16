define(['handlebars'], function(Handlebars) {

Handlebars.registerPartial("classified/_form_parameters", Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "    <div class=\"row\">\n      <div class=\"small-3 columns\">\n        <label for=\"prix\" class=\"right inline\">Prix</label>\n      </div>\n      <div class=\"small-9 columns\">\n        <div class=\"row collapse\">\n            <div class=\"small-10 columns\">\n                <input type=\"number\" name=\"prix\" value=\"";
  if (stack1 = helpers.price) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.price); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" id=\"prix\">\n            </div>\n            <div class=\"small-2 columns\">\n                <span class=\"postfix\">€</span>\n            </div>\n        </div>\n      </div>\n    </div>\n    <div class=\"row\">\n      <div class=\"small-3 columns\">\n        <label for=\"surface\" class=\"right inline\">Surface</label>\n      </div>\n      <div class=\"small-9 columns\">\n        <div class=\"row collapse\">\n            <div class=\"small-10 columns\">\n                <input type=\"number\" name=\"surface\" value=\"";
  if (stack1 = helpers.surface) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.surface); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" id=\"surface\">\n            </div>\n            <div class=\"small-2 columns\">\n                <span class=\"postfix\">m2</span>\n            </div>\n        </div>\n      </div>\n    </div>\n\n    <div class=\"row\">\n      <div class=\"small-3 columns\">\n        <label for=\"etage\" class=\"right inline\">Etage</label>\n      </div>\n      <div class=\"small-9 columns\">\n        <input type=\"number\" name=\"etage\" value=\"";
  if (stack1 = helpers.etage) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.etage); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" id=\"etage\">\n      </div>\n    </div>\n\n";
  return buffer;
  }));

});