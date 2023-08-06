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
}

let group = Group.from([10, 20]);
console.log(group.has(10));
console.log(group.has(30));
group.add(10);
group.delete(10);
console.log(group.has(10));
