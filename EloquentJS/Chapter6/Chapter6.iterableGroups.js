class Group {
    constructor () {
        this.content = []
    }
    add(value) {
        if (this.content.indexOf(value) === -1) {
           this.content.push(value)
        }
    }
    delete(value) {
        if (this.content.indexOf(value) !== -1) {
            this.content.splice(this.content.indexOf(value), 1);
        }
    }
    has(value) {
        return this.content.indexOf(value) !== -1
    }
    static from(object) {
        let group = new Group;
        for (let element of object) {
            group.add(element)   
        }
        return group
    }
    [Symbol.iterator] () {
        return new GroupIterator(this);
    }
}

class GroupIterator {
    constructor(group) {
        this.index = 0;
        this.group = group;
    }
    next() {
        if (this.index === this.group.content.length) return {done: true};
        let value = this.group.content[this.index];
        this.index++;
        return {value, done: false};
        }
}


let group = Group.from([10, 20]);
console.log(group.has(10));
console.log(group.has(30));
group.add(10);
group.delete(10);
console.log(group.has(10));
for (let value of Group.from(["a", "b", "c"])) {
    console.log(value);
  }
