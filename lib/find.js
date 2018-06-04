Array.prototype.first = function (condition) {
    if (!this.length)
        throw 'first did not find anything';

    if (condition === undefined)
        return this[0];

    for (let i = 0; i < this.length; i++)
        if (condition(this[i]))
            return this[i];

    throw 'first did not find anything';
};

Array.prototype.firstOrDefault = function (condition) {
    if (condition === undefined)
        return this[0];

    for (let i = 0; i < this.length; i++)
        if (condition(this[i]))
            return this[i];

    return undefined;
}

Array.prototype.last = function (condition) {
    if (!this.length)
        throw 'last did not find anything';

    if (condition === undefined)
        return this[this.length - 1];

    for (let i = this.length - 1; i >= 0; i--)
        if (condition(this[i]))
            return this[i];

    throw 'last did not find anything';
};

Array.prototype.lastOrDefault = function (condition) {
    if (condition === undefined)
        return this[this.length - 1];

    for (let i = this.length - 1; i >= 0; i--)
        if (condition(this[i]))
            return this[i];

    return undefined;
}

Array.prototype.max = function (expression) {
    if (!this.length)
        return 0;

    let list = !expression ? this : this.select(expression);

    return Math.max.apply(null, list);
};

Array.prototype.min = function (expression) {
    if (!this.length)
        return 0;

    let list = !expression ? this : this.select(expression);

    return Math.min.apply(null, list);
};
