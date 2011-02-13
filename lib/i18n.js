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
  if(typeof arguments[0] === "object") {
    arguments = Array.prototype.slice.call(arguments[0]);
  }

  this.path = arguments[0];
  this.language = arguments[1];
  this.locale = arguments[2];
};

I18n.factory = function(path, language, locale, instance) {
  return (typeof instance !== "undefined")
    ? instance
    : new I18n(arguments);
};

I18n.prototype.setLocale = function(language) {
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

module.exports = I18n;