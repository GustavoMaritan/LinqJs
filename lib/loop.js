module.exports = linqJs;

function linqJs() {
    let Array = global.Array;

    Array.prototype.For = function (...parameters) {
        let indice = 0;
        let callback = null;

        if (!parameters) {
            console.error('Callback não definido.');
            return;
        }
        if (parameters.length == 1 && (typeof parameters[0]).toString() != 'function') {
            console.error('Callback não definido.');
            return;
        }
        callback = parameters[0];

        if (parameters.length > 1) {
            if (!isNaN(parameters[0]))
                indice = +parameters[0];
            if (indice > this.length - 1) {
                console.error('Index start maior que length.');
                return;
            }
            callback = parameters[1];
        }

        for (let i = indice; i < this.length; i++) {
            callback(this[i], i);
        }
    };
}