define(['handlebars'], function(Handlebars) {

return Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, options, functionType="function", escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing;


  buffer += "<div title=\"";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.name); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\n    <h5 class=\"classified-title\" style=\"white-space:nowrap;overflow: hidden\">";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.name); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "</h5>\n\n    <h6 class=\"text-center\">";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.currency || (depth0 && depth0.currency)),stack1 ? stack1.call(depth0, (depth0 && depth0.price), options) : helperMissing.call(depth0, "currency", (depth0 && depth0.price), options)))
    + "</h6>\n\n    <p class=\"classified-list-item-preview\">\n    <a href=\"";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.urlToClassified || (depth0 && depth0.urlToClassified)),stack1 ? stack1.call(depth0, depth0, options) : helperMissing.call(depth0, "urlToClassified", depth0, options)))
    + "\" class=\"th\"><img src=\"";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.first || (depth0 && depth0.first)),stack1 ? stack1.call(depth0, (depth0 && depth0.images), options) : helperMissing.call(depth0, "first", (depth0 && depth0.images), options)))
    + "\" /></a>\n    </p>\n\n    <ul class=\"inline-list\">\n        <li>";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.linkToClassified || (depth0 && depth0.linkToClassified)),stack1 ? stack1.call(depth0, depth0, options) : helperMissing.call(depth0, "linkToClassified", depth0, options)))
    + "</li>\n        <li>";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.linkTo || (depth0 && depth0.linkTo)),stack1 ? stack1.call(depth0, "Editer", "classifieds/", (depth0 && depth0._id), "/edit", options) : helperMissing.call(depth0, "linkTo", "Editer", "classifieds/", (depth0 && depth0._id), "/edit", options)))
    + "</li>\n    </ul>\n</div>\n";
  return buffer;
  })

});