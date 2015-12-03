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
//console.log(listObject.OrderBy(x => x.Id));
//console.log(listObject.OrderByDesc(x => x.Id));
//console.log(listObject.Where(x => x.Id >= 0 && x.Id <= 2 && x.List.Any(y => y.Id == 1)));
//console.log(listObject.Any(x => x.Id == 0));
//console.log(listObject.All(x => x.Id != 0));
//console.log(listObject.FirstOrDefault(x => x.Id == 0))
//console.log(listObject.Select(x => g = { d: x.Id, c: x.List }));
//console.log(listObject.Remove(x => x.Id == 0));
//console.log(listObject.Skip(1).Take(1));
*/
Array.prototype.Order = function () {
    return this.sort(function (a, b) { return a - b });
}
Array.prototype.OrderBy = function (condition) {
    var attr = this.Select(condition);
    var list = [];
    for (var i = 0 ; i < attr.length ; i++) {
        list.push({
            valor: attr[i],
            indice: i
        });
    }
    for (var i = 0 ; i < list.length ; i++) {
        for (var j = i + 1 ; j < list.length ; j++) {
            if (list[i].valor > list[j].valor) {
                var a = list[j];
                list[j] = list[i];
                list[i] = a;
            }
        }
    }
    var listItem = [];
    for (var i = 0 ; i < list.length ; i++) {
        listItem.push(this[list[i].indice]);
    }
    return listItem;
}
Array.prototype.OrderByDesc = function (condition) {
    var attr = this.Select(condition);
    var list = [];
    for (var i = 0 ; i < attr.length ; i++) {
        list.push({
            valor: attr[i],
            indice: i
        });
    }
    for (var i = 0 ; i < list.length ; i++) {
        for (var j = i + 1 ; j < list.length ; j++) {
            if (list[i].valor < list[j].valor) {
                var a = list[j];
                list[j] = list[i];
                list[i] = a;
            }

        }
    }
    var listItem = [];
    for (var i = 0 ; i < list.length ; i++) {
        listItem.push(this[list[i].indice]);
    }
    return listItem;
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
    if (funcao == undefined) {
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