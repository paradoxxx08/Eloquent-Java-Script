function reverseArray(array) {
    let reverseArray = [];
    for (let i = 0; i <= (array.length-1); i++) {
        reverseArray.unshift((array[i]));
    }
    return reverseArray;
}
function reverseArrayInPlace(array) {
    for (let i = 0; i <= (Math.floor((array.length / 2)) - 1); i++) {
        let a = array[i];
        array[i] = array[(array.length - (i + 1))];
        array[(array.length - (i + 1))] = a;
    }
    return array;
}
console.log(reverseArray(["A", "B", "C"]));
let arrayValue = [1, 2, 3, 4, 5];
reverseArrayInPlace(arrayValue);
console.log(arrayValue);