const vi = require('./language/vi.json');

function _t(text){
  console.log({vi, text});
  return vi[text];
};

function lang(text){
  console.log({vi, text});
  return vi[text];
};


console.log(_t("Hello"));

console.log(_t("Hello" + "world"));

const name = 'win'
console.log(_t(`Hello ${name}`));

console.log(lang("Hello lang"))

console.log(_t(`
  template
  literal
`));