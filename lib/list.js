Array.prototype.select = function (condition) {
    if (condition === undefined)
        throw { message: 'select expected "condition" as parameter' };

    return this.map(condition);
};

Array.prototype.selectMany = function (condition) {
    if (condition === undefined)
        throw { message: 'select expected "condition" as parameter' };

    let list = [];
    this.select(condition).forEach(function (arr) {
        list.addRange(arr);
    });

    return list;
};

Array.prototype.where = function (condition) {
    if (condition === undefined)
        throw { message: 'where expected "condition" as parameter' };

    return this.filter(condition);
};

Array.prototype.take = function (length) {
    return this.slice(0, +length || 0);
};

Array.prototype.skip = function (length) {
    length = +length || 0;
    if (length >= this.length)
        return [];

    return this.slice(length);
};
