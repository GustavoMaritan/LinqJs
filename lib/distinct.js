module.exports = linqJs;

function linqJs() {
    let Array = global.Array;

    Array.prototype.Distinct = function () {
        let distinctList = [];

        for (let i = 0; i < this.length; i++) {
            let hasTwin = false;

            for (let j = i + 1; j < this.length; j++) {
                if ((hasTwin = compare(this[i], this[j])))
                    break;
            }

            if (!hasTwin)
                distinctList.push(this[i]);
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