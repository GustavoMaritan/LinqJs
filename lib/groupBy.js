Array.prototype.groupBy = function (expression) {
    if (!this.length)
        return this;

    var group = [];
    for (let i = 0; i < this.length; i++) {
        let result = expression(this[i]),
            ref;

        if (ref = group.first(x => x.key === result)) {
            ref.add(this[i]);
            continue;
        }

        let arr = [this[i]];
        arr.key = result;
        group.add(arr);
    }

    return group;
};
