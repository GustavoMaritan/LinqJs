Array.prototype.first = function (condition) {
    if (condition === undefined) {
        if (this.length)
            return this[0];

        throw { message: 'first cannot get item from a empty list' };
    }

    let item = this.firstOrDefault(condition);
    if (typeof item == undefined)
        throw { message: 'first found nothing' };
    
    return item;
};

Array.prototype.firstOrDefault = function (condition) {
    for (let i = 0; i < this.length; i++)
        if (condition(this[i]))
            return this[i];

    return undefined;
};

Array.prototype.last = function (condition) {
    if (condition === undefined) {
        if (this.length)
            return this[0];

        throw { message: 'last cannot get item from a empty list' };
    }

    let item = this.lastOrDefault(condition);
    if (typeof item == undefined)
        throw { message: 'last found nothing' };
    
    return item;
};

Array.prototype.lastOrDefault = function (condition) {
    for (let i = this.length - 1; i >= 0; i--)
        if (condition(this[i]))
            return this[i];

    return undefined;
};

Array.prototype.max = function (expression) {
    let list = !expression ? this : this.select(expression);

    return Math.max.aplly(null, list);
};

Array.prototype.min = function (expression) {
    let list = !expression ? this : this.select(expression);

    return Math.min.aplly(null, list);
};
