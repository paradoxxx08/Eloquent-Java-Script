function range(start, end) {
    let array = [];
    for (let i = start; i <= end; i++) {
        array.push(i);
    }
    return array;
}
function sum(array) {
    let total = 0;
    for (let value of array) {
        total += value
    }
    return total;
}
function rangeWithStep(start, end, step = 1) {
    let array = [];
    if (step > 0) {
        for (let i = start; i <= end; i += step) {
        array.push(i);
        }
    } else {
        for (let i = start; i >= end; i += step) {
            array.push(i);
            }
    }
    return array;
}
console.log(range(1, 10));
console.log(sum(range(1, 10)));
console.log(rangeWithStep(5, 2, -1));
console.log(rangeWithStep(1, 10));