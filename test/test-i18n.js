var i18n = require("./../index").i18n;

exports["factory"] = {};
exports["factory"]["creates a new instance if one isnt passed"] = function(test) {

  test.equal(
    i18n("asdf", "asdf").path,
    new i18n("asdf", "asdf").path
  );
  
  test.done();
}

exports["setLocale"] = {};
exports["setLocale"]["sets the locale to module.exports.all"] = function(test) {
  var instance = i18n(__dirname + "/locales");
  instance.setLocale("en");
  test.equal(instance.locale, require(__dirname + "/locales/en").all);
  test.done();
}