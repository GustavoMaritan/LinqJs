Array.prototype.first = function (condition) {
    let item = this.firstOrDefault(condition);
    if (typeof item == undefined)
        throw { message: 'first found nothing' };

    return item;
};

Array.prototype.firstOrDefault = function (condition) {
    if (condition === undefined)
        return this[0];

    for (let i = 0; i < this.length; i++)
        if (condition(this[i]))
            return this[i];

    return undefined;
};

Array.prototype.last = function (condition) {
    let item = this.lastOrDefault(condition);
    if (typeof item == undefined)
        throw { message: 'last found nothing' };

    return item;
};

Array.prototype.lastOrDefault = function (condition) {
    if (condition === undefined)
        return this[this.length - 1];

    for (let i = this.length - 1; i >= 0; i--)
        if (condition(this[i]))
            return this[i];

    return undefined;
};

Array.prototype.max = function (expression) {
    let list = !expression ? this : this.select(expression);

    return Math.max.apply(null, list);
};

Array.prototype.min = function (expression) {
    let list = !expression ? this : this.select(expression);

    return Math.min.apply(null, list);
};
