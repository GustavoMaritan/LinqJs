module.exports = toList;

function toList(lista) {
    this.Array = lista;
    this.ToList = toList;

    function toList() {
        return this.Array;
    }
}