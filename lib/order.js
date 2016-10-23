let ToList = require('./toList.js');

module.exports = linqJs;

function linqJs() {
    let Array = global.Array;

    let direction = {
        crescent: 'crescent',
        decrescent: 'decrescent'
    }

    function EnumOrderBy(lista, condition) {
        ToList.call(this, lista);
        this.Condition = [];

        if (condition !== undefined) {
            for (let i = 0; i < condition.length; i++) {
                this.Condition.push({
                    condition: condition[i].condition,
                    direction: condition[i].direction
                });
            }
        }
    }

    EnumOrderBy.prototype.ThenBy = function (condition) {
        let a = this.Condition;

        let list = this.Array.OrderBy(condition).ToList();

        for (let i = a.length - 1; i >= 0; i--) {
            if (a[i].direction == direction.decrescent)
                list = list.OrderByDesc(a[i].condition).ToList();
            else
                list = list.OrderBy(a[i].condition).ToList();
        }
        this.Condition.push({ condition, direction: direction.crescent });

        return new EnumOrderBy(list, this.Condition);
    };
    EnumOrderBy.prototype.ThenByDesc = function (condition) {
        let a = this.Condition;

        let list = this.Array.OrderByDesc(condition).ToList();

        for (let i = a.length - 1; i >= 0; i--) {
            if (a[i].direction == direction.decrescent)
                list = list.OrderByDesc(a[i].condition).ToList();
            else
                list = list.OrderBy(a[i].condition).ToList();
        }
        this.Condition.push({ condition, direction: direction.decrescent });

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
        return new EnumOrderBy(this, [{
            condition,
            direction: direction.crescent
        }]);
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
        return new EnumOrderBy(this, [{
            condition,
            direction: direction.decrescent
        }]);
    };
}