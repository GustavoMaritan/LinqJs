Array.prototype.asyncFor = async function (callback) {
    for (let i = 0; i < this.length; i++)
        await callback(this[i], i);
};
