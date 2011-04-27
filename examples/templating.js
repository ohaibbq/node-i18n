var i18n = require("./../index").i18n,
  instance = new i18n(__dirname + "/locales");
console.log(instance);
instance.setLocale("en");

console.log(instance.interpolate("sup") ===  "hi"); // true
console.log(instance.interpolate("object.what.is") ===  "new"); // true
console.log(instance.interpolate("object.value", { hi: "hello"}) === "testing hello"); // true
console.log(instance.interpolate("object.value") ===  "testing hello"); // false