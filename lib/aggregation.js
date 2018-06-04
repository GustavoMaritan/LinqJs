Array.prototype.count = function (conditon) {
    if (!conditon)
        return this.length;

    return this.where(conditon).length;
};

Array.prototype.sum = function (expression) {
    let list = !expression ? this : this.select(expression);
    if (!this.length)
        return 0;

    return list.reduce((acum, cur) => acum + cur);
};
