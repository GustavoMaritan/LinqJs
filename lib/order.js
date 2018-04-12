Array.prototype.order = function (expression) {
    if (!this.length)
        return this;

    if (expression) {
        this.thenBy = thenBy(expression);
        this.thenByDesc = thenByDesc(expression);

        let typeOf = typeof (expression(this[0]));
        if (typeOf === 'string')
            return this.sort((item1, item2) => expression(item1).localeCompare(expression(item2)));

        return this.sort((a, b) => expression(a) - expression(b));
    }

    let typeOf = typeof this[0];
    if (typeOf === 'string')
        return this.sort((item1, item2) => item1.localeCompare(item2));

    return this.sort((a, b) => a - b);
};

Array.prototype.orderDesc = function (expression) {
    if (!this.length)
        return this;

    if (expression) {
        this.thenBy = thenBy(expression);
        this.thenByDesc = thenByDesc(expression);

        let typeOf = typeof (expression(this[0]));
        if (typeOf === 'string')
            return this.sort((item1, item2) => expression(item2).localeCompare(expression(item1)));

        return this.sort((a, b) => expression(b) - expression(a));
    }

    let typeOf = typeof this[0];
    if (typeOf === 'string')
        return this.sort((item1, item2) => item2.localeCompare(item1));

    return this.sort((a, b) => b - a);
};

Array.prototype.orderBy = function (expression) {
    if (typeof expression === undefined)
        throw { message: 'orderBy expected "expression" as parameter' };

    return this.order(expression);
};

Array.prototype.orderByDesc = function (expression) {
    if (typeof expression === undefined)
        throw { message: 'orderByDesc expected "expression" as parameter' };

    return this.orderDesc(expression);
};

function thenBy(lastExpression) {
    return function (expression) {
        let arr = [];
        this.groupBy(lastExpression).forEach(function (arrItem) {
            arr.addRange(arrItem.orderBy(expression));
        });
        return arr;
    };
}

function thenByDesc(lastExpression) {
    return function (expression) {
        let arr = [];
        this.groupBy(lastExpression).forEach(function (arrItem) {
            arr.addRange(arrItem.orderByDesc(expression));
        });
        return arr;
    };
}
