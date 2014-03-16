define(['handlebars'], function(Handlebars) {

Handlebars.registerPartial("classified/_form_costs", Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "    <div class=\"row\">\n      <div class=\"small-5 columns\">\n        <label for=\"charges\" class=\"right inline\">Charges</label>\n      </div>\n      <div class=\"small-7 columns\">\n        <div class=\"row collapse\">\n            <div class=\"small-8 columns\">\n                <input type=\"number\" name=\"charges\" value=\"";
  if (stack1 = helpers.charges) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.charges); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" id=\"charges\">\n            </div>\n            <div class=\"small-4 columns\">\n                <span class=\"postfix\">€ / mois</span>\n            </div>\n        </div>\n      </div>\n    </div>\n\n    <div class=\"row\">\n      <div class=\"small-5 columns\">\n        <label for=\"taxe_habitation\" class=\"right inline\">Taxe Habitation</label>\n      </div>\n      <div class=\"small-7 columns\">\n        <div class=\"row collapse\">\n            <div class=\"small-8 columns\">\n                <input type=\"number\" name=\"taxe_habitation\" value=\"";
  if (stack1 = helpers.taxe_habitation) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.taxe_habitation); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" id=\"taxe_habitation\">\n            </div>\n            <div class=\"small-4 columns\">\n                <span class=\"postfix\">€ / an</span>\n            </div>\n        </div>\n      </div>\n    </div>\n\n    <div class=\"row\">\n      <div class=\"small-5 columns\">\n        <label for=\"taxe_foncier\" class=\"right inline\">Taxe Foncier</label>\n      </div>\n      <div class=\"small-7 columns\">\n        <div class=\"row collapse\">\n            <div class=\"small-8 columns\">\n                <input type=\"number\" name=\"taxe_foncier\" value=\"";
  if (stack1 = helpers.taxe_foncier) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.taxe_foncier); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" id=\"taxe_foncier\">\n            </div>\n            <div class=\"small-4 columns\">\n                <span class=\"postfix\">€ / an</span>\n            </div>\n        </div>\n      </div>\n    </div>\n\n";
  return buffer;
  }));

});