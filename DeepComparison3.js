function deepEqual (value1, value2) {
    if (typeof value1 !== typeof value2) {
        return false
    }
    if (value1 === null && value2 !== null) {
        return false
    }
    if (value1 !== null && value2 === null) {
        return false
    }
    if (typeof value1 === "object") {
        let array1 = Object.keys(value1);
        let array2 = Object.keys(value2);
        if (array1.length !== array2.length) {
            return false
        }
        for (let i = 0; i < array1.length; i++) {
            if (array1[i] !== array2[i]) {
                return false
            }
        }
        for (let i = 0; i < array1.length; i++) {
            if (deepEqual (value1[array1[i]], value2[array2[i]]) === false) {
                return false
            }
        }
        return true;
    }
    return value1 === value2
}
let obj = {here: {is: "an"}, object: 2, car: 1};
console.log("final result: " + deepEqual(obj, obj));
// → true
console.log("final resul2: " + deepEqual(obj, {here: 1, object: 2}));
// → false
console.log("final resul3: " + deepEqual(obj, {here: {is: "an"}, object: 2, car: 1}));
// → true
console.log("final result4: " + deepEqual(7, 5));
// → false