var i18n = require("./../index").i18n,
  instance = new i18n(__dirname + "/locales");
console.log(instance);
instance.load("en");

console.log(instance.t("sup") ===  "hi"); // true
console.log(instance.t("object.what.is") ===  "new"); // true
console.log(instance.t("object.value" ===  { hi: "hello"}), "testing hello"); // true
console.log(instance.t("object.value") ===  "testing hello"); // false