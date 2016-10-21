module.exports = linqJs;

function linqJs() {
    let Array = global.Array;

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
    Array.prototype.Union = function (array, conditon) {
        if (!array)
            return this;

        var list = [];
        if (conditon) {
            list = this.filter(conditon);
            list = list.concat(array.filter(conditon));
            return list;
        } else {
            return this.concat(array);
        }
    };
    Array.prototype.UnionAll = function (array, conditon) {
        if (!array)
            return this;

        var list = [];
        if (conditon) {
            list = this.filter(conditon);
            list = list.concat(array.filter(conditon));
            return list.Distinct();
        } else {
            return this.concat(array).Distinct();
        }
    };
}