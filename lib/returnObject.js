module.exports = linqJs;

function linqJs() {
    let Array = global.Array;

    Array.prototype.FirstOrDefault = function (condition) {
        if (condition === undefined) {
            console.error('Informe a expressão para executar a tarefa.');
            return;
        }
        for (let i = 0; i < this.length; i++) {
            if (condition(this[i]))
                return this[i];
        }
        return {};
    };
    Array.prototype.First = function (condition) {
        if (condition === undefined)
            return this[0];

        for (let i = 0; i < this.length; i++) {
            if (condition(this[i]))
                return this[i];
        }
        return null;
    };
    Array.prototype.LastOrDefault = function (conditon) {
        for (let i = this.length - 1; i > 0; i--) {
            if (condition(this[i]))
                return this[i];
        }
        return {};
    };
    Array.prototype.Last = function (condition) {
        if (condition === undefined)
            return this[this.length - 1];

        for (let i = this.length - 1; i >= 0; i--) {
            if (condition(this[i]))
                return this[i];
        }
        return null;
    };
    Array.prototype.Single = function (attr, condition) {
        if (condition === undefined)
            return this.length === 0 ? null : attr(this[0]);

        for (let i = 0; i < this.length; i++) {
            if (condition(this[i]))
                return attr(this[i]);
        }
        return null;
    };
    Array.prototype.Select = function (condition) {
        if (condition === undefined) {
            console.error('Informe a expressão para executar a tarefa.');
            return;
        }
        return this.map(condition);
    };
    Array.prototype.Where = function (condition) {
        if (condition === undefined) {
            console.error('Informe a expressão para executar a tarefa.');
            return;
        }
        return this.filter(condition);
    };
    Array.prototype.Take = function (take) {
        if (take === undefined || isNaN(take)) {
            console.error('Informe um valor válido.');
            return;
        }
        return this.slice(0, take);
    };
    Array.prototype.Skip = function (skip) {
        if (skip === undefined || isNaN(skip)) {
            console.error('Informe um valor válido.');
            return;
        }
        if (skip > this.length) {
            console.error('Valor maior que o indice da lista.');
            return;
        }

        if (skip > this.length)
            skip = this.length;

        return this.slice(skip);
    };
    Array.prototype.Distinct = function () {
        let distinctList = [];

        for (let i = 0; i < this.length; i++) {
            let hasTwin = false;

            for (let j = i + 1; j < this.length; j++) {
                if ((hasTwin = compare(this[i], this[j])))
                    break;
            }

            !hasTwin && distinctList.push(this[i]);
        }

        return distinctList;

        function compare(obj1, obj2) {
            let typeOfObjectOne = typeof (obj1);

            if (typeOfObjectOne != typeof (obj2))
                return false;

            if (obj1 === null || obj1 === undefined || typeOfObjectOne == 'number' || typeOfObjectOne == 'string' || typeOfObjectOne == 'boolean')
                return obj1 === obj2;

            if (obj1 instanceof Date)
                return (obj2 instanceof Date) && (obj1.getTime() === obj2.getTime());

            if (obj1.length) {
                return obj1.length == obj2.length &&
                    obj1.filter((x, i) => compare(x, obj2[i])).length == obj1.length;
            }

            let keysObjectOne = Object.keys(obj1);

            if (keysObjectOne.length != Object.keys(obj2).length ||
                keysObjectOne.filter((prop, i) => compare(obj1[prop], obj2[prop])).length != keysObjectOne.length)
                return false;

            return true;
        }
    };
}