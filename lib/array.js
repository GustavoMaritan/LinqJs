Array.prototype.add = function (item) {
    this.push(item);
};

Array.prototype.addRange = function (...array) {
    let ref = this;
    array.forEach(function (item) {
        if (Array.isArray(item))
            item.forEach(function (arrItem) {
                ref.add(arrItem);
            });
        else
            ref.add(item);
    });
};

Array.prototype.remove = function (param) {
    if (typeof condition === 'function')
        removeByCondition(this, param);
    else
        removeByItem(this, param);
};

Array.prototype.removeAt = function (index) {
    this.splice(index, 1);
};

function removeByCondition(arr, condition) {
    for (let i = 0; i < arr.length; i++)
        if (condition(arr[i]))
            arr.splice(i, 1);
}

function removeByItem(arr, item) {
    let indexOf = arr.indexOf(item);
    if (indexOf >= 0)
        arr.splice(indexOf, 1);
}
