class MultiplicatorUnitFailure extends Error {}

function primitiveMultiply(a, b) {
    if (Math.random() < 0.2) {
        return a*b;
    } else {
        throw new MultiplicatorUnitFailure("Klunk");
    }
}

function reliableMultiply(a, b) {
    for (;;) {
        try {
            if (Math.random() < 0.2) {
            return a*b;
            }
        } catch (e) {
            if (e instanceof MultiplicatorUnitFailure) {
                throw new MultiplicatorUnitFailure("Klunk");
            } else {
                throw e;
            }
        }
    }
}

console.log(reliableMultiply(8, 8));
// → 64