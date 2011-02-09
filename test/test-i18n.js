/**
 * Created by .
 * User: dan
 * Date: Feb 8, 2011
 * Time: 11:59:33 PM
 * To change this template use File | Settings | File Templates.
 */
var i18n = require("./../index").i18n;

exports["factory"] = {};
exports["factory"]["creates a new instance if one isnt passed"] = function(test) {

  test.equal(
    i18n.factory("asdf", "asdf").path,
    new i18n("asdf", "asdf").path
  );
  
  test.done();
}

exports["load"] = {};
exports["load"]["sets the locale to module.exports.all"] = function(test) {
  var instance = i18n.factory(__dirname + "/locales");
  instance.load("en");
  test.equal(instance.locale, require(__dirname + "/locales/en").all);
  test.done();
}