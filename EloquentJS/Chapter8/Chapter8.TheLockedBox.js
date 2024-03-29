const box = {
    locked: true,
    unlock() {this.locked = false; },
    lock() {this.locked = true; },
    _content: [],
    get content() {
        if (this.locked) throw new Error("Locked");
        return this._content;
    }
};

function withBoxUnlocked(body) {
    if (box.locked) {
        box.unlock();
    }
    try {
        return body();
    } finally {
        if (!box.locked) {
            box.lock();
        }
    }
}

withBoxUnlocked(function() {
    box.content.push("gold piece");
});

try {
    withBoxUnlocked(function() {
        throw new Error("Pitates on the horizon! Abort!");
    });
} catch (e) {
    console.log("Error raised: " + e);
}
console.log(box.locked);