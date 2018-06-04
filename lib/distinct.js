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

function equals(item1, item2, recursive) {
    if (item1 === null || item1 === undefined || ['number', 'string', 'boolean', 'function'].any(x => x == typeof item1))
        return item1 === item2;

    if (item1 instanceof Date)
        return (item2 instanceof Date) && (item1.getTime() === item2.getTime());

    if (!recursive)
        return item1 === item2;

    if (Array.isArray(item1)) {
        if (!Array.isArray(item2) || item1.length != item2.length)
            return false;

        for (let index in item1)
            if (!equals(item1[index], item2[index], recursive))
                return false;
    } else {
        let keys = Object.keys(item1);
        if (keys.length != Object.keys(item2).length)
            return false;
    
        for (let prop in item1)
            if (!equals(item1[prop], item2[prop], recursive))
                return false;
    }

    return true;
}
