function arrayToList (array) {
    let list = null;
    for (let i = array.length - 1; i >= 0; i--) {
        list = {
            value: array[i],
            rest: list
        };
    }
    return list;
}
function listToArray(list) {
    let array = [];
    for (let i = list; i; i = i.rest) {
        array.push(i.value)
    }
    return array;
}
function prepend(element, list) {
    let NewList = {
        value: element,
        rest: list
    }
    return NewList;
}
function nth(list, number) {
    let round = 0;
    for (let i = list; i; i = i.rest) {
        if (number === round) {
            return i.value
        }
        round ++;
    }
}
function nthRecursive(list, number) {
    if (number === 0) {
        return list.value
    }
    return nthRecursive(list.rest, number - 1)
}
console.log(arrayToList([10, 20]));
console.log(listToArray(arrayToList([10, 20, 30])));
console.log(prepend(10, prepend(20, null)));
console.log(nth(arrayToList([10, 20, 30]), 1));
console.log(nthRecursive(arrayToList([10, 20, 30, 50, 100]), 4));