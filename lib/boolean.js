module.exports = linqJs;

function linqJs() {
    let Array = global.Array;

    Array.prototype.Exist = function (conditon) {
        for (let i = 0; i < this.length; i++) {
            if (conditon(this[i]))
                return true;
        }
        return false;
    };
    Array.prototype.Any = function (condition) {
        if (condition === undefined) {
            return this.length > 0;
        }
        for (let i = 0; i < this.length; i++) {
            if (condition(this[i]))
                return true;
        }
        return false;
    };
    Array.prototype.All = function (condition) {
        if (condition === undefined) {
            console.error('Informe a expressão para executar a tarefa.');
            return;
        }
        for (let i = 0; i < this.length; i++) {
            if (!condition(this[i]))
                return false;
        }
        return true;
    };
}