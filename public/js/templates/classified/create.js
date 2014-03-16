define(['handlebars'], function(Handlebars) {

return Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); partials = this.merge(partials, Handlebars.partials); data = data || {};
  var buffer = "", stack1, self=this;

function program1(depth0,data) {
  
  
  return "\n        <h3 class=\"classified-create-header\">Modifier une annonce</h3>\n        ";
  }

function program3(depth0,data) {
  
  
  return "\n        <h3 class=\"classified-create-header\">Ajouter une annonce</h3>\n        ";
  }

  buffer += "<div class=\"row\">\n    <div class=\"classified-create-wrapper large-12 columns\">\n        ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.id), {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        <section class=\"classified-create-main\">\n        ";
  stack1 = self.invokePartial(partials['classified/_form'], 'classified/_form', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        </section>\n    </div>\n</div>\n";
  return buffer;
  })

});