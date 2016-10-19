module.exports = linqJs;

function linqJs() {
    let Array = global.Array;

    Array.prototype.Count = function (conditon) {
        let count = 0;

        if (!conditon)
            return this.length;

        this.map(x => {
            if (conditon(x))
                count++;
        });
        return count;
    };
    Array.prototype.Sum = function (conditon) {
        let list = this.Select(conditon);

        let sum = 0;

        list.For(function (obj) { sum += obj; });

        return sum;
    };
    Array.prototype.Max = function (conditon) {
        if (!conditon)
            console.error('Condition undefined');

        let list = this.Select(conditon);

        return list.Order().Last();
    };
}