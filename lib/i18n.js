/**
 * Created by .
 * User: dan
 * Date: Feb 8, 2011
 * Time: 9:51:54 PM
 * To change this template use File | Settings | File Templates.
 */
//TODO: JSDoc

var _ = require("underscore");

var I18n = function(path, language, locale) {
  this.path = path;
  this.language = language;
  this.locale = locale;
};

I18n.prototype.load = function(language) {
  this.language = (this.language !== language)
    ? language
    : language;

  this.locale = require(this.path + "/" + language).all;
};

I18n.prototype.t = function(item, context) {
  var ret,
    _item = item.split(".");

  while(part = _item.shift()) {
    ret = (ret) ? ret[part] : this.locale[part];
    if(typeof ret === "undefined") {
      return "";
    }
  }

  if(typeof context === "object") {
    return _.template(ret, context);
  }

  return ret;
};

I18n.prototype.factory = function(path, language, locale, instance) {
  return (typeof instance !== "undefined")
    ? instance
    : new I18n(
        arguments.slice(
          0,
          arguments.length - 2
        )
      );
};

module.exports = I18n;