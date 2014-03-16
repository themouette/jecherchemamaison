define(['handlebars'], function(Handlebars) {

Handlebars.registerPartial("classified/_form_identity", Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, stack2, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "    <div class=\"row\">\n      <div class=\"small-3 columns\">\n        <label for=\"lien\" class=\"right inline\">Lien</label>\n      </div>\n      <div class=\"small-9 columns\">\n        <div class=\"row collapse\">\n            <div class=\"small-10 columns\">\n                <input type=\"url\" name=\"lien\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.link)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" id=\"lien\">\n            </div>\n            <div class=\"small-2 columns\">\n                <a class=\"postfix classified-fetch\">crawl</a>\n            </div>\n        </div>\n      </div>\n    </div>\n\n    <div class=\"row\">\n      <div class=\"small-3 columns\">\n        <label for=\"titre\" class=\"right inline\">Titre</label>\n      </div>\n      <div class=\"small-9 columns\">\n        <input type=\"text\" name=\"titre\" value=\"";
  if (stack2 = helpers.name) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = (depth0 && depth0.name); stack2 = typeof stack2 === functionType ? stack2.call(depth0, {hash:{},data:data}) : stack2; }
  buffer += escapeExpression(stack2)
    + "\" id=\"titre\">\n      </div>\n    </div>\n\n    <div class=\"row\">\n      <div class=\"small-3 columns\">\n        <label for=\"adresse\" class=\"right inline\">Adresse</label>\n      </div>\n      <div class=\"small-9 columns\">\n        <textarea name=\"adresse\" id=\"adresse\">";
  if (stack2 = helpers.address) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = (depth0 && depth0.address); stack2 = typeof stack2 === functionType ? stack2.call(depth0, {hash:{},data:data}) : stack2; }
  buffer += escapeExpression(stack2)
    + "</textarea>\n      </div>\n    </div>\n\n    <div class=\"row\">\n      <div class=\"small-3 columns\">\n        <label for=\"description\" class=\"right inline\">Description</label>\n      </div>\n      <div class=\"small-9 columns\">\n        <textarea name=\"description\" id=\"description\" style=\"height: 300px;\">";
  if (stack2 = helpers.content) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = (depth0 && depth0.content); stack2 = typeof stack2 === functionType ? stack2.call(depth0, {hash:{},data:data}) : stack2; }
  buffer += escapeExpression(stack2)
    + "</textarea>\n      </div>\n    </div>\n\n";
  return buffer;
  }));

});