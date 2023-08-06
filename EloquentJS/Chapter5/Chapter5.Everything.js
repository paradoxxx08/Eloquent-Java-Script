function every(array, test) {
    for (let i of array) {
        if (!test(i)) {
            return false
        }
    }
    return true
}
function everyWithSome(array, test) {
    return !array.some(i => !test(i))
}

console.log(every([1, 3, 5], n => n < 10));
// → true
console.log(every([2, 4, 16], n => n < 10));
// → false
console.log(every([], n => n < 10));
// → true
console.log("Second version of function");
console.log(everyWithSome([1, 3, 5], n => n < 10));
// → true
console.log(everyWithSome([2, 4, 16], n => n < 10));
// → false
  console.log(everyWithSome([], n => n < 10));
// → true