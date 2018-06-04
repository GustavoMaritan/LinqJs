[![Build Status](https://travis-ci.org/GustavoMaritan/LinqJs.svg?branch=master)](https://travis-ci.org/GustavoMaritan/LinqJs)

# DEVBOX-LINQ
Lambda operations for js inspired by C# :)

## Installation
```shell
npm install devbox-linq
```

## Usage (Node.js)
```js
require('devbox-linq');
```
> only works on v6 and above

## Documentation
* [add](#additem)
* [addRange](#addrangearray)
* [all](#allcondition)
* [any](#anycondition)
* [count](#countcondition)
* [distinct](#distinct)
* [distinctRecursive](#distinctrecursive)
* [first](#firstcondition)
* [firstOrDefault](#firstordefaultcondition)
* [groupBy](#groupbyexpression)
* [last](#lastcondition)
* [lastOrDefault](#lastordefaultcondition)
* [max](#maxexpression)
* [min](#minexpression)
* [order](#order)
* [orderBy](#orderbyexpression)
* [orderByDesc](#orderbydescexpression)
* [orderDesc](#orderdesc)
* [remove](#removecondition)
* [removeAt](#removeatindex)
* [select](#selectexpression)
* [selectMany](#selectmanyexpression)
* [skip](#skiplength)
* [sum](#sumexpression)
* [take](#takelength)
* [thenBy](#thenbyexpression)
* [thenByDesc](#thenbydescexpression)
* [where](#whereexpression)

### add(item)
Add a item into a existing array.
```js
let array = [{ id: 1, name: 'Goku' }];

array.add({ id: 2, name: 'Vegeta' }); // Same as .push(), it's only semanthic

console.log(array);
/*
OUTPUT:
[
    { id: 1, name: 'Goku' },
    { id: 2, name: 'Vegeta' }
]
*/
```

### addRange(...array)
Add a list of items into a existing array.
```js
//Way 1
let array1 = [
    { id: 1, name: 'Goku' },
    { id: 2, name: 'Vegeta' }
];
let array2 = [
    { id: 3, name: 'Bulma' },
    { id: 4, name: 'Gohan' }
];

array1.addRange(array2);

console.log(array1);
/*
OUTPUT:
[
    { id: 1, name: 'Goku' },
    { id: 2, name: 'Vegeta' },
    { id: 3, name: 'Bulma' },
    { id: 4, name: 'Gohan' }
]
*/
```
```js
//Way 2
let array = [
    { id: 1, name: 'Goku' },
    { id: 2, name: 'Vegeta' }
];

array.addRange({ id: 3, name: 'Bulma' }, { id: 4, name: 'Gohan' });

console.log(array);
/*
OUTPUT:
[
    { id: 1, name: 'Goku' },
    { id: 2, name: 'Vegeta' },
    { id: 3, name: 'Bulma' },
    { id: 4, name: 'Gohan' }
]
*/
```

### all(condition)
Checks that all items in the list match the condition.
```js
let array = [
    { id: 1, name: 'Goku' },
    { id: 2, name: 'Vegeta' }
];

array.all(x => x.id == 1);  // false
array.all(x => x.id >= 1);  // true
```

### any(condition?)
Checks that one item in the list match the condition. If no condition, check if has something in the list.
```js
let array = [
    { id: 1, name: 'Goku' },
    { id: 2, name: 'Vegeta' }
];

array.any(x => x.id == 3); // false
array.any(x => x.id == 1); // true
array.any(); // true
```

### count(condition?)
Count all items that match the condition. If no condition, returns the list length.
```js
let array = [
    { id: 1, name: 'Goku' },
    { id: 2, name: 'Vegeta' }
];
array.count(x => x.id >= 2); //1
array.count(); //2
```

### distinct()
Distinguishes equal items from the list. If it's complex type, like object and array, it'll be by reference.
```js
let array = [
    { text: 'Object' },
    { text: 'Object' }
];
array.distinct(); // Nothing happens

let obj =  { text: 'Object2' };
array.add(obj); // Adding one time
array.add(obj); // Adding two times
array.distinct();
console.log(array);
/*
OUTPUT:
[
    { text: 'Object' },
    { text: 'Object' },
    { text: 'Object2' }
]
*/

[1, 2, 3, 4, 1, 2].distinct(); // [1, 2, 3, 4]
```

### distinctRecursive()
Distinguishes equal items from the list. If it's complex type, like object, it'll be done verifying the attributes.
```js
let array = [
    { text: 'Object' },
    { text: 'Object' }
];
array.distinctRecursive(); // [{ text: 'Object' }]

let obj =  { text: 'Object2' };
array.add(obj); // Adding one time
array.add(obj); // Adding two times
array.distinctRecursive();
console.log(array);
/*
OUTPUT:
[
    { text: 'Object' },
    { text: 'Object2' }
]
*/
```

### first(condition?)
Returns the first item that match the condition.
```js
let array = [
    { id: 1, name: 'Goku' },
    { id: 2, name: 'Vegeta' },
    { id: 2, name: 'Vegeta2' }
];

array.first(x => x.id == 2); // { id: 2, name: 'Vegeta' }
array.first(); // { id: 1, name: 'Goku' }

array.first(x => x.id == 3); // throws exception
[].first(); // throws exception
```

### firstOrDefault(condition?)
Returns the first item that match the condition, if anyone match, returns undefined instead exception.
```js
let array = [
    { id: 1, name: 'Goku' },
    { id: 2, name: 'Vegeta' },
    { id: 2, name: 'Vegeta2' }
];

array.firstOrDefault(x => x.id == 2); // { id: 2, name: 'Vegeta' }
array.firstOrDefault(); // { id: 1, name: 'Goku' }

array.firstOrDefault(x => x.id == 10); // undefined
[].firstOrDefault(); // undefined
```

### groupBy(expression)
Group the list by a expression.
```js
let array = [
    { id: 1, name: 'Goku', age: 20 },
    { id: 2, name: 'Vegeta', age: 20 },
    { id: 3, name: 'Bulma', age: 19 }
];

let group = array.groupBy(x => x.age);
console.log(group);
/*
OUTPUT:
[
    [
        { id: 1, name: 'Goku', age: 20 },
        { id: 2, name: 'Vegeta', age: 20 }
    ],
    [
        { id: 3, name: 'Bulma', age: 19 }
    ]
]
*/

console.log(group[0].key); // 20
console.log(group[1].key); // 19
```

### last(condition?)
Returns the last item that match the condition.
```js
let array = [
    { id: 1, name: 'Goku' },
    { id: 1, name: 'Goku2' },
    { id: 2, name: 'Vegeta' }
];

array.last(x => x.id == 1); // { id: 1, name: 'Goku2' }
array.last(); // { id: 2, name: 'Vegeta' }

array.last(x => x.id == 3); // throws exception
[].last(); // throws exception
```

### lastOrDefault(condition?)
Returns the last item that match the condition, if anyone match, returns undefined instead exception.
```js
let array = [
    { id: 1, name: 'Goku' },
    { id: 1, name: 'Goku2' },
    { id: 2, name: 'Vegeta' }
];

array.lastOrDefault(x => x.id == 1); // { id: 1, name: 'Goku2' }
array.lastOrDefault(); // { id: 2, name: 'Vegeta' }

array.lastOrDefault(x => x.id == 10); // undefined
[].lastOrDefault(); // undefined
```

### max(expression?)
Returns the largest item that match the expression.
```js
let array = [
    { id: 1, name: 'Goku', age: 22 },
    { id: 2, name: 'Vegeta', age: 20 }
];

array.max(x => x.age); // 22
[1, 5, 3].max(); // 5
```

### min(expression?)
Returns the smallest item that match the expression.
```js
let array = [
    { id: 1, name: 'Goku', age: 22 },
    { id: 2, name: 'Vegeta', age: 20 }
];

array.min(x => x.age); // 20
[1, 5, 3].min(); // 1
```

### order()
Order list ascending.
```js
[2, 3, 5, 1, 4].order(); // [1, 2, 3, 4, 5]
['B', 'C', 'E', 'A', 'D'].order(); // ['A', 'B', 'C', 'D', 'E']
```

### orderBy(expression)
Order list ascending by expression.
```js
let array = [
    { id: 1, name: 'Goku', age: 22 },
    { id: 2, name: 'Vegeta', age: 20 },
    { id: 3, name: 'Bulma', age: 15 }
];

array.orderBy(x => x.age);
console.log(array);
/*
OUTPUT:
[
    { id: 3, name: 'Bulma', age: 15 },
    { id: 2, name: 'Vegeta', age: 20 },
    { id: 1, name: 'Goku', age: 22 }
]
*/

array.orderBy(x => x.name);
console.log(array);
/*
OUTPUT:
[
    { id: 3, name: 'Bulma', age: 15 },
    { id: 1, name: 'Goku', age: 22 },
    { id: 2, name: 'Vegeta', age: 20 }
]
*/

[5, 4, 3, 2, 1].orderBy(x => x); // [1, 2, 3, 4, 5] - Same as .order()
```

### orderByDesc(expression)
Order list descending by expression.
```js
let array = [
    { id: 1, name: 'Goku', age: 15 },
    { id: 2, name: 'Vegeta', age: 20 },
    { id: 3, name: 'Bulma', age: 22 }
];

array.orderByDesc(x => x.age);
console.log(array);
/*
OUTPUT:
[
    { id: 3, name: 'Bulma', age: 22 },
    { id: 2, name: 'Vegeta', age: 20 },
    { id: 1, name: 'Goku', age: 15 }
]
*/

array.orderByDesc(x => x.name);
console.log(array);
/*
OUTPUT:
[
    { id: 2, name: 'Vegeta', age: 20 },
    { id: 1, name: 'Goku', age: 15 },
    { id: 3, name: 'Bulma', age: 22 }
]
*/

[1, 2, 3, 4, 5].orderByDesc(x => x); // [5, 4, 3, 2, 1] - Same as .orderDesc()
```

### orderDesc()
Order list descending.
```js
[2, 3, 5, 1, 4].orderDesc(); // [5, 4, 3, 2, 1]
['B', 'C', 'E', 'A', 'D'].orderDesc(); // ['E', 'D', 'C', 'B', 'A']
```

### remove(condition?)
Remove items from the list.
```js
let array = [
    { id: 1, name: 'Goku' },
    { id: 2, name: 'Vegeta' }
];

//By Condition
array.remove(x => x.id == 2);
console.log(array); //OUTPUT: [{ id: 1, name: 'Goku' }]

//By Ref
let goku = array.first(x => x.id == 1);
array.remove(goku);
console.log(array); //OUTPUT: []
```

### removeAt(index)
Remove a item from the list by index.
```js
let array = [
    { id: 1, name: 'Goku' },
    { id: 2, name: 'Vegeta' }
];

array.removeAt(1);
console.log(array); //OUTPUT: [{ id: 1, name: 'Goku' }]
```

### select(expression)
Transform your list.
```js
let array = [
    { id: 1, name: 'Goku' },
    { id: 2, name: 'Vegeta' }
];

array.select(x => x.id); // [1, 2]
array.select(x => x.id + 1); // [2, 3]
array.select(x => x.name + ' is very strong'); // ['Goku is very strong', 'Vegeta is very strong']

array.select(x => x = { user: x.id + ' - ' + x.name }); 
/*
OUTPUT:
[
    { user: '1 - Goku' },
    { user: '2 - Vegeta' }
]
*/
```

### selectMany(expression)
Joins multiple lists inside a object in one.
```js
let array = [
    { id: 1, name: 'Goku', friends: ['Chi-Chi', 'Kuririn', 'Trunks', 'Gohan'] },
    { id: 2, name: 'Vegeta', friends: ['Bulma', 'Trunks'] }
];

let allFriends = array.selectMany(x => x.friends);
console.log(allFriends); // ['Chi-Chi', 'Kuririn', 'Trunks', 'Gohan', 'Bulma', 'Trunks']
console.log(allFriends.distinct()); // ['Chi-Chi', 'Kuririn', 'Gohan', 'Bulma', 'Trunks']
```

### skip(length)
Skip the length informed.
```js
let array = [
    { id: 1, name: 'Goku' },
    { id: 2, name: 'Vegeta' },
    { id: 3, name: 'Bulma' }
];

let arraySkipped = array.skip(2);
console.log(arraySkipped); // [{ id: 3, name: 'Bulma' }]

[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].skip(5); // [6, 7, 8, 9, 10]
```

### sum(expression?)
Sum the items by expression.
```js
let array = [
    { id: 1, name: 'Goku', power: 8001 },
    { id: 2, name: 'Vegeta', power: 7000 }
];

array.sum(x => x.power); // 15001
[1, 2, 3, 4, 5].sum(); // 15
```

### take(length)
Take the length informed.
```js
let array = [
    { id: 1, name: 'Goku' },
    { id: 2, name: 'Vegeta' },
    { id: 3, name: 'Bulma' }
];

let arrayTook = array.take(1);
console.log(arrayTook); // [{ id: 1, name: 'Goku' }]

arrayTook = array.skip(1).take(1);
console.log(arrayTook); // [{ id: 2, name: 'Vegeta' }]

[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].take(5); // [1, 2, 3, 4, 5]
[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].skip(3).take(3); // [4, 5, 6]
```

### thenBy(expression)
Order the list ascending by a second expression after some "order" method (order, orderBy, orderByDesc or orderDesc)
```js
let array = [
    { id: 1, name: 'Goku', age: 20 },
    { id: 2, name: 'Vegeta', age: 22 },
    { id: 3, name: 'Bulma', age: 20 }
];

array.orderBy(x => x.age).thenBy(x => x.name);
console.log(array);
/*
OUTPUT
[
    { id: 3, name: 'Bulma', age: 20 },
    { id: 1, name: 'Goku', age: 20 },
    { id: 2, name: 'Vegeta', age: 22 }
]
*/

//Order the even first, then put them in the ascending order
[10, 9, 8, 7, 6, 5, 4, 3, 2, 1].orderBy(x => x % 2 == 0 ? 0 : 1).thenBy(x => x);
//OUTPUT: [2, 4, 6, 8, 10, 1, 3, 5, 7, 9]
```

### thenByDesc(expression)
Order the list descending by a second expression after some "order" method (order, orderBy, orderByDesc or orderDesc)
```js
let array = [
    { id: 1, name: 'Goku', age: 20 },
    { id: 2, name: 'Vegeta', age: 22 },
    { id: 3, name: 'Bulma', age: 20 }
];

array.orderBy(x => x.age).thenByDesc(x => x.name);
console.log(array);
/*
OUTPUT
[
    { id: 1, name: 'Goku', age: 20 }
    { id: 3, name: 'Bulma', age: 20 }
    { id: 2, name: 'Vegeta', age: 22 }
]
*/

//Order the even first, then put them in the descending order
[10, 9, 8, 7, 6, 5, 4, 3, 2, 1].orderBy(x => x % 2 == 0 ? 0 : 1).thenByDesc(x => x);
//OUTPUT: [10, 8, 6, 4, 2, 9, 7, 5, 3, 1]
```

### where(expression)
```js
let array = [
    { id: 1, name: 'Goku', power: 8001 },
    { id: 2, name: 'Vegeta', power: 7000 },
    { id: 3, name: 'Bulma', power: 12 },
];

let strongers = array.where(x => x.power > 5000);
console.log(strongers);
/*
OUTPUT:
[
    { id: 1, name: 'Goku', power: 8001 },
    { id: 2, name: 'Vegeta', power: 7000 }
]
*/

[1, 2, 3, 4, 5, 6].where(x => x % 2 == 0); // [2, 4, 6]
```
