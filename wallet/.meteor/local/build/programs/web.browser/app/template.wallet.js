(function(){
Template.body.addContent((function() {
  var view = this;
  return [ HTML.Raw("<h1>My Wallet</h1>\n\n  "), Spacebars.include(view.lookupTemplate("wallet")) ];
}));
Meteor.startup(Template.body.renderToDocument);

Template.__checkName("wallet");
Template["wallet"] = new Template("Template.wallet", (function() {
  var view = this;
  return [ HTML.P("Address: ", Blaze.View("lookup:account.address", function() {
    return Spacebars.mustache(Spacebars.dot(view.lookup("account"), "address"));
  })), "\n  ", HTML.P("Balance: ", Blaze.View("lookup:account.tokenBalance", function() {
    return Spacebars.mustache(Spacebars.dot(view.lookup("account"), "tokenBalance"));
  })) ];
}));

}).call(this);
