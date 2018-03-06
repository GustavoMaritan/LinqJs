module.exports = linqJs;

function linqJs() {
    let Array = global.Array;

    Array.prototype.FirstOrDefault = function (condition) {
        if (condition === undefined) {
            return this.length ? this[0] : {};
        }
        for (let i = 0; i < this.length; i++) {
            if (condition(this[i]))
                return this[i];
        }
        return {};
    };
    
    Array.prototype.First = function (condition) {
        if (condition === undefined)
            return this.length ? this[0] : null;

        for (let i = 0; i < this.length; i++) {
            if (condition(this[i]))
                return this[i];
        }
        return null;
    };

    Array.prototype.LastOrDefault = function (condition) {
        if (condition === undefined) {
            return this.length ? this[this.length - 1] : {};
        }
        for (let i = this.length - 1; i > 0; i--) {
            if (condition(this[i]))
                return this[i];
        }
        return {};
    };

    Array.prototype.Last = function (condition) {
        if (condition === undefined)
            return this.length ? this[this.length - 1] : null;

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
}