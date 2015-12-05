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

EnumOrderBy.prototype.ThenBy = function (conditon) {
    var a = this.Condition;

    var list = this.Array.OrderBy(conditon).ToList();

    for (var i = a.length - 1; i >= 0 ; i--) {
        list = list.OrderBy(a[i]).ToList();
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
Array.prototype.Distinct = function () { }
