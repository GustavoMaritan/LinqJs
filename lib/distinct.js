Array.prototype.distinct = distinct();
Array.prototype.distinctRecursive = distinct(true);

function distinct(recursive) {
    return function () {
        let list = [];

        for (let i = 0; i < this.length; i++) {
            let exist = false;

            for (let j = i + 1; j < this.length; j++)
                if (exist = equals(this[i], this[j], recursive))
                    break;

            if (exist)
                continue;

            list.push(this[i]);
        }

        return list;
    };
}

function equals(obj1, obj2, recursive) {
    if (obj1 === null || obj1 === undefined || ['number', 'string', 'boolean', 'function'].any(x => x == typeof obj1))
        return obj1 === obj2;

    if (obj1 instanceof Date)
        return (obj2 instanceof Date) && (obj1.getTime() === obj2.getTime());

    if (!recursive)
        return obj1 === obj2;

    if (Array.isArray(obj1))
        return obj1.length == obj2.length && obj1.filter((x, i) => equals(x, obj2[i])).length == obj1.length;

    let keysObj1 = Object.keys(obj1);
    if (keysObj1.length != Object.keys(obj2).length || keysObj1.filter((prop, i) => equals(obj1[prop], obj2[prop])).length != keysObj1.length)
        return false;

    return true;
}
