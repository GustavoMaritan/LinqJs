let ToList = require('./toList.js');

module.exports = linqJs;

function linqJs() {
    let Array = global.Array;

    function EnumGroupBy() {
        this.Groups = [];
        this.SetGroup = setGroup;
        this.GetKeys = getKeys;

        function setGroup(group) {
            this.Groups.push(group);
        }
        function getKeys(group) {
            let list = [];
            for (let i = 0; i < this.Groups.length; i++)
                list.push(this.Groups[i].Key);

            return list;
        }
    }

    function ObjGroupBy(keyValue, list) {
        ToList.call(this, list);
        this.Key = keyValue;
    }

    Array.prototype.GroupBy = function (conditon) {
        if (this.length <= 0)
            return [];

        var list = new EnumGroupBy();

        while (this.length > 0) {
            var a = conditon(this[0]);
            var c = [];
            var excludeList = [];
            for (var i = 0; i < this.length; i++) {
                if (conditon(this[i]) == a) {
                    c.push(this[i]);
                    excludeList.push(i);
                }
            }
            for (var j = excludeList.length - 1; j >= 0; j--) {
                this.splice(excludeList[j], 1);
            }
            list.SetGroup(new ObjGroupBy(a, c));
        }
        return list;
    };
}