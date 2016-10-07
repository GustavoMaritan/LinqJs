module.exports = lisqJs();

function lisqJs() {
    let Array = global.Array;

    function ToList(lista) {
        this.Array = lista;
        this.ToList = toList;

        function toList() {
            return this.Array;
        }
    }
    function EnumOrderBy(lista, conditon) {
        ToList.call(this, lista);
        this.Condition = [];

        if (conditon !== undefined) {
            for (let i = 0; i < conditon.length; i++) {
                this.Condition.push(conditon[i]);
            }
        }
    }
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
    function getProperties(obj) {
        let properties = [];
        for (let prop in obj) {
            if (typeof obj[prop] != 'function') {
                properties.push(prop);
            }
        }
        return properties;
    }
    EnumOrderBy.prototype.ThenBy = function (conditon) {
        let a = this.Condition;

        let list = this.Array.OrderBy(conditon).ToList();

        for (let i = a.length - 1; i >= 0; i--) {
            list = list.OrderBy(a[i]).ToList();
        }
        this.Condition.push(conditon);

        return new EnumOrderBy(list, this.Condition);
    };
    EnumOrderBy.prototype.ThenByDesc = function (conditon) {
        let a = this.Condition;

        let list = this.Array.OrderByDesc(conditon).ToList();

        for (let i = a.length - 1; i >= 0; i--) {
            list = list.OrderByDesc(a[i]).ToList();
        }
        this.Condition.push(conditon)

        return new EnumOrderBy(list, this.Condition);
    };
    Array.prototype.Order = function () {
        return this.sort(function (a, b) {
            return a - b;
        });
    };
    Array.prototype.OrderBy = function (condition) {
        for (let i = 0; i < this.length; i++) {
            for (let j = i + 1; j < this.length; j++) {
                if (condition(this[i]) > condition(this[j])) {
                    let a = this[j];
                    this[j] = this[i];
                    this[i] = a;
                }
            }
        }
        return new EnumOrderBy(this, [condition]);
    };
    Array.prototype.OrderByDesc = function (condition) {
        for (let i = 0; i < this.length; i++) {
            for (let j = i + 1; j < this.length; j++) {
                if (condition(this[i]) < condition(this[j])) {
                    let a = this[j];
                    this[j] = this[i];
                    this[i] = a;
                }
            }
        }
        return new EnumOrderBy(this, [condition]);
    };
    Array.prototype.Where = function (condition) {
        if (condition === undefined) {
            console.error('Informe a expressão para executar a tarefa.')
            return;
        }
        return this.filter(condition);
    };
    Array.prototype.Any = function (condition) {
        if (condition === undefined) {
            return this.length > 0;
        }
        for (let i = 0; i < this.length; i++) {
            if (condition(this[i]))
                return true;
        }
        return false;
    };
    Array.prototype.All = function (condition) {
        if (condition === undefined) {
            console.error('Informe a expressão para executar a tarefa.');
            return;
        }
        for (let i = 0; i < this.length; i++) {
            if (!condition(this[i]))
                return false;
        }
        return true;
    };
    Array.prototype.FirstOrDefault = function (condition) {
        if (condition === undefined) {
            console.error('Informe a expressão para executar a tarefa.');
            return;
        }
        for (let i = 0; i < this.length; i++) {
            if (condition(this[i]))
                return this[i];
        }
        return {};
    };
    Array.prototype.First = function (condition) {
        if (condition === undefined)
            return this[0];

        for (let i = 0; i < this.length; i++) {
            if (condition(this[i]))
                return this[i];
        }
        return {};
    };
    Array.prototype.Select = function (condition) {
        if (condition === undefined) {
            console.error('Informe a expressão para executar a tarefa.');
            return;
        }
        return this.map(condition);
    };
    Array.prototype.Remove = function (condition) {
        if (condition === undefined) {
            console.error('Informe a expressão para executar a tarefa.')
            return;
        }
        for (let i = 0; i < this.length; i++) {
            if (condition(this[i]))
                this.splice(i, 1);
        }
    };
    Array.prototype.Single = function (attr, condition) {
        if (condition === undefined)
            return this.length === 0
                ? null
                : attr(this[0]);

        for (let i = 0; i < this.length; i++) {
            if (condition(this[i]))
                return attr(this[i]);
        }
        return null;
    };
    Array.prototype.Skip = function (skip) {
        if (skip === undefined || isNaN(skip)) {
            console.error('Informe um valor válido.');
            return;
        }
        if (skip > this.length) {
            console.error('Valor maior que o indice da lista.');
            return;
        }

        if (skip > this.length)
            skip = this.length;

        return this.slice(skip);
    };
    Array.prototype.Take = function (take) {
        if (take === undefined || isNaN(take)) {
            console.error('Informe um valor válido.');
            return;
        }
        return this.slice(0, take);
    };
    Array.prototype.For = function (callback, indice) {
        if (callback === undefined) {
            console.error('Callback não definido.');
            return;
        }
        if (indice === undefined || isNaN(indice))
            indice = 0;
        if (indice > this.length)
            indice = this.length;

        let list = [];

        for (let i = indice; i < this.length; i++) {
            callback(i, this[i]);
        }
    };
    Array.prototype.Sum = function (conditon) {
        let list = this.Select(conditon);

        let sum = 0;

        list.For(function (i, obj) { sum += obj; });

        return sum;
    };
    Array.prototype.Max = function (conditon) {
        let list = this.Select(conditon).Order();

        return list[list.length - 1];
    };
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
    Array.prototype.Distinct = function () {
        let distinctList = [];

        for(let i = 0; i < this.length; i++){
            let hasTwin = false;

            for(let j = i + 1; j < this.length; j++){
                if((hasTwin = compare(this[i], this[j])))
                    break;
            }

            !hasTwin && distinctList.push(this[i]);
        }

        return distinctList;

        function compare(obj1, obj2){
            let typeOfObjectOne = typeof(obj1);

            if(typeOfObjectOne != typeof(obj2))
                return false;
            
            if(obj1 == null || obj1 == undefined || typeOfObjectOne == 'number' || typeOfObjectOne == 'string' || typeOfObjectOne == 'boolean' )
                return obj1 === obj2;
         
            if(obj1 instanceof Date)
                return (obj2 instanceof Date) && (obj1.getTime() === obj2.getTime());
            
            if(obj1.length){
                return obj1.length == obj2.length && 
                       obj1.filter((x, i) => compare(x, obj2[i])).length == obj1.length;
            }
            
            let keysObjectOne = Object.keys(obj1);

            if(keysObjectOne.length != Object.keys(obj2).length || 
               keysObjectOne.filter((prop, i) => compare(obj1[prop], obj2[prop])).length != keysObjectOne.length)
                return false;
            
            return true;
        }
    };
    Array.prototype.LastOrDefault = function (conditon) {
        for (let i = this.length - 1; i > 0; i--) {
            if (condition(this[i]))
                return this[i];
        }
        return {};
    };
    Array.prototype.Last = function (condition) {
        if (condition === undefined)
            return this[this.length - 1];

        for (let i = this.length - 1 ; i >= 0; i--) {
            if (condition(this[i]))
                return this[i];
        }
        return {};
    };
    Array.prototype.AddRange = function (array) {
        if(array === undefined)
            return;
            
        array.map(x => this.push(x));
    };
    Array.prototype.Exist = function (conditon) {
        for (let i = 0; i < this.length; i++) {
            if (conditon(this[i]))
                return true;
        }
        return false;
    };
};
