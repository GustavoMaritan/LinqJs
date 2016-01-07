/*
[Objeto Exemplo]
var listObject = [
    {
        Id : 0,
        Name : "",
        List : [{ Id : 0 , Name : "" }]
    },
    {
        Id : 1,
        Name : "",
        List : [{ Id : 0 , Name : "" }]
    },
]

[Uso LinqJs]
//console.log(listObject.Order());
//console.log(listObject.OrderBy(x => x.Id).ToList());
//console.log(listObject.OrderByDesc(x => x.Id));
//console.log(listObject.Where(x => x.Id >= 0 && x.Id <= 2 && x.List.Any(y => y.Id == 1)));
//console.log(listObject.Any(x => x.Id == 0));
//console.log(listObject.All(x => x.Id != 0));
//console.log(listObject.FirstOrDefault(x => x.Id == 0))
//console.log(listObject.Select(x => g = { d: x.Id, c: x.List }));
//console.log(listObject.Remove(x => x.Id == 0));
//console.log(listObject.Skip(1).Take(1));
//Teste mussak
*/

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

    if (conditon != undefined) {
        for (var i = 0; i < conditon.length; i++) {
            this.Condition.push(conditon[i])
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
        var list = [];
        for (var i = 0; i < this.Groups.length; i++)
            list.push(this.Groups[i].Key)

        return list;
    }
}
function ObjGroupBy(keyValue, list) {
    ToList.call(this, list);
    this.Key = keyValue;
}

function getProperties(obj) {
    var properties = [];
    for (var prop in obj) {
        if (typeof obj[prop] != 'function') {
            properties.push(prop);
        }
    }
    return properties;
}

EnumOrderBy.prototype.ThenBy = function (conditon) {
    var a = this.Condition;

    var list = this.Array.OrderBy(conditon).ToList();

    for (var i = a.length - 1; i >= 0 ; i--) {
        list = list.OrderBy(a[i]).ToList();
    }
    this.Condition.push(conditon)

    return new EnumOrderBy(list, this.Condition);
}
EnumOrderBy.prototype.ThenByDesc = function (conditon) {
    var a = this.Condition;

    var list = this.Array.OrderByDesc(conditon).ToList();

    for (var i = a.length - 1; i >= 0 ; i--) {
        list = list.OrderByDesc(a[i]).ToList();
    }
    this.Condition.push(conditon)

    return new EnumOrderBy(list, this.Condition);
}

Array.prototype.Order = function () {
    return this.sort(function (a, b) {
        return a - b;
    });
}
Array.prototype.OrderBy = function (condition) {
    for (var i = 0 ; i < this.length ; i++) {
        for (var j = i + 1 ; j < this.length ; j++) {
            if (condition(this[i]) > condition(this[j])) {
                var a = this[j];
                this[j] = this[i];
                this[i] = a;
            }
        }
    }
    return new EnumOrderBy(this, [condition]);
}
Array.prototype.OrderByDesc = function (condition) {
    for (var i = 0 ; i < this.length ; i++) {
        for (var j = i + 1 ; j < this.length ; j++) {
            if (condition(this[i]) < condition(this[j])) {
                var a = this[j];
                this[j] = this[i];
                this[i] = a;
            }
        }
    }
    return new EnumOrderBy(this, [condition]);
}
Array.prototype.Where = function (condition) {
    if (condition == undefined) {
        console.error('Informe a expressão para executar a tarefa.')
        return;
    }

    var list = [];
    for (var i = 0 ; i < this.length ; i++) {
        if (condition(this[i])) {
            list.push(this[i])
        }
    }
    return list;
}
Array.prototype.Any = function (condition) {
    if (condition == undefined) {
        console.error('Informe a expressão para executar a tarefa.')
        return;
    }
    for (var i = 0 ; i < this.length ; i++) {
        if (condition(this[i]))
            return true;
    }
    return cond;

    //var cond = false;
    //this.For(function (i , obj) {
    //    if (condition(obj))
    //        cond = true;
    //})
}
Array.prototype.All = function (condition) {
    if (condition == undefined) {
        console.error('Informe a expressão para executar a tarefa.')
        return;
    }

    for (var i = 0 ; i < this.length ; i++) {
        if (!condition(this[i]))
            return false;
    }
    return true;
}
Array.prototype.FirstOrDefault = function (condition) {
    if (condition == undefined) {
        console.error('Informe a expressão para executar a tarefa.')
        return;
    }

    for (var i = 0 ; i < this.length ; i++) {
        if (condition(this[i]))
            return this[i];
    }
    return null;
}
Array.prototype.First = function () {
    return this[0];
}
Array.prototype.Select = function (condition) {
    if (condition == undefined) {
        console.error('Informe a expressão para executar a tarefa.')
        return;
    }

    var list = [];
    for (var i = 0 ; i < this.length ; i++) {
        list.push(condition(this[i]));
    }
    return list;
}
Array.prototype.Remove = function (condition) {
    if (condition == undefined) {
        console.error('Informe a expressão para executar a tarefa.')
        return;
    }

    for (var i = 0 ; i < this.length ; i++) {
        if (condition(this[i]))
            this.splice(i, 1);
    }
}
Array.prototype.Single = function (attr, condition) {
    if (condition == undefined)
        return this.length == 0
            ? null
            : attr(this[0])

    for (var i = 0 ; i < this.length ; i++) {
        if (condition(this[i]))
            return attr(this[i]);
    }
    return null;
}
Array.prototype.Skip = function (skip) {
    if (skip == undefined || isNaN(skip)) {
        console.error('Informe um valor válido.');
        return;
    }
    if (skip > this.length) {
        console.error('Valor maior que o indice da lista.');
        return;
    }

    if (skip > this.length)
        skip = this.length;

    var list = [];

    for (var i = skip ; i < this.length ; i++) {
        list.push(this[i]);
    }
    return list;
}
Array.prototype.Take = function (take) {
    if (take == undefined || isNaN(take)) {
        console.error('Informe um valor válido.');
        return;
    }
    if (take > this.length) {
        take = this.length;
    }

    var list = [];

    for (var i = 0 ; i < take ; i++) {
        list.push(this[i]);
    }
    return list;
}
Array.prototype.For = function (callback, indice) {
    if (callback == undefined) {
        console.error('Callback não definido.')
        return;
    }
    if (indice == undefined || isNaN(indice))
        indice = 0;
    if (indice > this.length)
        indice = this.length;

    var list = [];

    for (var i = indice ; i < this.length ; i++) {
        callback(i, this[i]);
    }
}
Array.prototype.Sum = function (conditon) {
    var list = this.Select(conditon);

    var sum = 0;

    list.For(function (i, obj) {
        sum += obj;
    });

    return sum;
}
Array.prototype.Max = function (conditon) {
    var list = this.Select(conditon).Order();

    return list[list.length - 1];
}
Array.prototype.GroupBy = function (conditon) {
    if (this.length <= 0)
        return [];

    var list = new EnumGroupBy();

    while (this.length > 0) {
        var a = conditon(this[0])
        var c = [];
        for (var i = 0; i < this.length; i++) {
            if (conditon(this[i]) == a)
                c.push(this[i]);
        }
        for (var j = 0; j < this.length; j++) {
            if (conditon(this[j]) == a)
                this.splice(j, 1);
        }
        list.SetGroup(new ObjGroupBy(a, c));
    }
    return list;
}
Array.prototype.Distinct = function () {
    var l = [];
    for (var i = 0; i < this.length; i++) {
        for (var k = i + 1; k < this.length; k++) {
            if (dist(this[i], this[k]))
                l.push({ i1: i, i2: k });
        }
    }
    var la = [];
    for (var g = 0; g < l.length; g++) {
        if (la.indexOf(l[g].i2) == -1) {
            la.push(l[g].i2);
            this.splice(l[g].i2 - i, 1);
        }
    }
    return this;

    function dist(obj1, obj2) {
        if (obj1.length > 0) {
            return distList(obj1, obj2);
        }
        var a = getProperties(obj1);
        var bl = false;
        for (var j = 0; j < a.length; j++) {
            if (typeof obj1[a[j]] == 'object') {
                bl = dist(obj1[a[j]], obj2[a[j]]);
                if (!bl) {
                    break;
                }
            }
            else if (obj1[a[j]] == obj2[a[j]]) {
                bl = true;
            } else {
                bl = false;
                break;
            }
        }
        return bl;
    }

    function distList(obj1, obj2) {
        if (obj1.length != obj2.length)
            return false;

        for (var i = 0; i < obj1.length; i++) {
            if (!dist(obj1[i], obj2[i]))
                return false;
        }
        return true;
    }
}
Array.prototype.Count = function (conditon) {
    if (conditon == undefined)
        return this.length;

    return this.Where(conditon).length;
}
Array.prototype.LastOrDefault = function (conditon) {
    for (var i = this.length - 1; i > 0; i--) {
        if (condition(this[i]))
            return this[i];
    }
    return null;
}
Array.prototype.Last = function () {
    return this[this.length - 1];
}
Array.prototype.AddRange = function (array) {
    for (var i = 0; i < array.length; i++) {
        this.push(array[i])
    }
}
Array.prototype.Exist = function (conditon) {
    for (var i = 0; i < this.length; i++) {
        if (conditon(this[i]))
            return true;
    }
    return false;
}