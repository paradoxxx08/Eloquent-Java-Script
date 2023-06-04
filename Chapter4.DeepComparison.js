function deepEqual (value1, value2) {
    if (value1 === null && value2 === null) {
        return true
    }
    if (typeof value1 === typeof value2 && typeof value1 === "object" && value1 !== null && value2 !== null) {
        let array1 = Object.keys(value1);
        let array2 = Object.keys(value2);
        if (array1.length === array2.length) {
            for (let i = 0; i < array1.length; i++) {
                if (array1[i] !== array2[i]) {
                    return false
                }
            }
            for (let i = 0; i < array1.length; i++) {
                return deepEqual (value1[array1[i]], value2[array2[i]])
            }
        } return false
    } else if (typeof value1 === typeof value2) {
        return value1 === value2
    } else { 
        return false
    }
}
let obj = {here: {is: "an"}, object: 2, car: 1};
console.log(deepEqual(obj, {here: {is: "an"}, object: 2, car: 6}));
// → true