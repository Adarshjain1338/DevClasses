
/******************************Clouser********************/
function powerCreator(obj) {
  let fun = function (base) {
    let rv = Math.pow(base, o2.exp);
    return rv;
  };
  return fun;
}
let o2 = {
  exp: 2,
};
let squarer = powerCreator(2);
let val = squarer(8);
console.log(val);
o2.exp = 3;
let val2 = squarer(8);
console.log(val2);
