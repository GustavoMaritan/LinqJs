Array.prototype.any = function (condition) {
    if (condition === undefined)
        return this.length > 0;

    return this.some(condition);
};

Array.prototype.all = function (condition) {
    if (condition === undefined)
        return false;

    return this.every(condition);
};
