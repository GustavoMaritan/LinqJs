module.exports = linqJs;

function linqJs() {
    let Array = global.Array;

    Array.prototype.For = function (...arguments) {
        let indice = 0;
        let callback = null;

        if (!arguments) {
            console.error('Callback não definido.');
            return;
        }
        if (arguments.length == 1 && (typeof arguments[0]).toString() != 'function') {
            console.error('Callback não definido.');
            return;
        }
        callback = arguments[0];

        if (arguments.length > 1) {
            if (!isNaN(arguments[0]))
                indice = +arguments[0];
            if (indice > this.length - 1) {
                console.error('Index start maior que length.');
                return;
            }
            callback = arguments[1];
        }

        for (let i = indice; i < this.length; i++) {
            callback(this[i], i);
        }
    };
}