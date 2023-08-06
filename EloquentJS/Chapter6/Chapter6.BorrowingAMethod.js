let map = {one: true, two: true, hasOwnProperty: true};
// Fix this call
console.log(Object.prototype.hasOwnProperty.call(map, "one"));
// → true


let map2 = {one: true, two: true, hasOwnProperty: true};
delete map2.hasOwnProperty;
let hasOwnProperty = Symbol("hasOwnProperty");
map2[hasOwnProperty] = true;
// Fix this call
console.log(map2.hasOwnProperty("one"));
// → true

