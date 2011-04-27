var I18n = function(path, language, locale) {
  if(typeof arguments[0] === "object") {
    arguments = Array.prototype.slice.call(arguments[0]);
  }

  this.path = arguments[0];
  this.language = arguments[1];
  this.locale = arguments[2];
};

I18n.templateSettings = {
  'evaluate': /<%([\s\S]+?)%>/g,
  'interpolate': /<%=([\s\S]+?)%>/g
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
    _item = item.split("."),
    settings;

  while(part = _item.shift()) {
    ret = (ret) ? ret[part] : this.locale[part];
    if(typeof ret === "undefined") {
      return "";
    }
  }

  if(typeof context === "object") {
    settings = I18n.templateSettings;
    return Function('obj', 'var __p=[],print=function(){__p.push.apply(__p,arguments);};' +
      'with(obj||{}){__p.push(\'' +
      ret.replace(/\\/g, '\\\\')
         .replace(/'/g, "\\'")
         .replace(settings.interpolate, function(match, code) {
           return "'," + code.replace(/\\'/g, "'") + ",'";
         })
         .replace(settings.evaluate || null, function(match, code) {
           return "');" + code.replace(/\\'/g, "'").replace(/[\r\n\t]/g, ' ') + "__p.push('";
         })
         .replace(/\r/g, '\\r')
         .replace(/\n/g, '\\n')
         .replace(/\t/g, '\\t')
      + "');}return __p.join('');"
    )(ret, context);
  }

  return ret;
};

module.exports = I18n;