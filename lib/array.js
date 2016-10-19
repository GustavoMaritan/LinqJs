module.exports = linqJs;

function linqJs() {
    let Array = global.Array;

    Array.prototype.AddRange = function (array, condition) {
        if (array === undefined)
            return;

        if (condition)
            array.map(x => {
                if (condition(x))
                    this.push(x);
            });
        else
            array.map(x => this.push(x));

    };
    Array.prototype.Remove = function (condition) {
        if (condition === undefined) {
            console.error('Informe a expressão para executar a tarefa.');
            return;
        }
        for (let i = 0; i < this.length; i++) {
            if (condition(this[i]))
                this.splice(i, 1);
        }
    };
}