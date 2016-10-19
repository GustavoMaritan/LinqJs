let ToList = require('./toList.js');

module.exports = linqJs;

function linqJs() {
    let Array = global.Array;

    function EnumOrderBy(lista, conditon) {
        ToList.call(this, lista);
        this.Condition = [];

        if (conditon !== undefined) {
            for (let i = 0; i < conditon.length; i++) {
                this.Condition.push(conditon[i]);
            }
        }
    }

    EnumOrderBy.prototype.ThenBy = function (conditon) {
        let a = this.Condition;

        let list = this.Array.OrderBy(conditon).ToList();

        for (let i = a.length - 1; i >= 0; i--) {
            list = list.OrderBy(a[i]).ToList();
        }
        this.Condition.push(conditon);

        return new EnumOrderBy(list, this.Condition);
    };
    EnumOrderBy.prototype.ThenByDesc = function (conditon) {
        let a = this.Condition;

        let list = this.Array.OrderByDesc(conditon).ToList();

        for (let i = a.length - 1; i >= 0; i--) {
            list = list.OrderByDesc(a[i]).ToList();
        }
        this.Condition.push(conditon);

        return new EnumOrderBy(list, this.Condition);
    };
    Array.prototype.Order = function () {
        return this.sort(function (a, b) {
            return a - b;
        });
    };
    Array.prototype.OrderBy = function (condition) {
        for (let i = 0; i < this.length; i++) {
            for (let j = i + 1; j < this.length; j++) {
                if (condition(this[i]) > condition(this[j])) {
                    let a = this[j];
                    this[j] = this[i];
                    this[i] = a;
                }
            }
        }
        return new EnumOrderBy(this, [condition]);
    };
    Array.prototype.OrderByDesc = function (condition) {
        for (let i = 0; i < this.length; i++) {
            for (let j = i + 1; j < this.length; j++) {
                if (condition(this[i]) < condition(this[j])) {
                    let a = this[j];
                    this[j] = this[i];
                    this[i] = a;
                }
            }
        }
        return new EnumOrderBy(this, [condition]);
    };
}