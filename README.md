
[![Build Status](https://travis-ci.org/rafael-pinho/LinqJs.svg?branch=master)](https://travis-ci.org/rafael-pinho/module-proxy)
[![bitHound Overall Score](https://www.bithound.io/github/GustavoMaritan/LinqJs/badges/score.svg)](https://www.bithound.io/github/GustavoMaritan/LinqJs)

##DEVBOX-LINQ

    Lambda style operations for nodejs.

## Installation

    npm install devbox-linq

## Use Example

```javascript
require('devbox-linq');
```

#### Version >= 3.0.0

### Only works on v6 and above ####

Check the operation list below.

---------------------------------------

### BOOLEAN

* [All](#all-expression)
* [Any](#any-expression)

### RETURN OBJECT

* [First](#first-expression)
* [Last](#last-expression)
* [Single](#single-attribute-expression)

### RETURN ARRAY

* [Select](#select-expression)
* [Where](#where-expression)
* [Take](#take-amount)
* [Skip](#skip-start)
* [Union/UnionAll](#unionunionall-array-expression)

### DISTINCT

* [Distinct](#distinct-1)

### GROUP

* [GroupBy](#groupby-expression)

### ARRAY

* [AddRange](#addrange-list-expression)
* [Remove](#remove-expression)

### LOOP

* [For](#for-startindex-callback)

### AGGREGATION

* [Count](#count-expression)
* [Max](#max-expression)
* [Sum](#sum-expression)

### ORDER

* [Order](#order-2)
* [OrderBy/OrderByDesc](#orderbyorderbydesc-expression)

---------------------------------------

### Example
```javascript

let array = [
    { id: 1, name: 'Test 1', value: 20 },
    { id: 2, name: 'Test 2', value: 30 },
    { id: 3, name: 'Test 3', value: 40 },
];

```

## BOOLEAN

### All (expression)
```javascript
    array.All(x => x.value >= 40);  
    // false
``` 

### Any (expression)
```javascript
    array.Any(x => x.value >= 40);   
    // true
    array.Any(x => x.value > 40);    
    // false
    array.Any();                     
    // true
``` 

---------------------------------------

## RETURN OBJECT

### First (expression)
```javascript
    array.First();                   
    // { id: 1, name: 'Test 1', value: 20 }
    array.First(x => x.value > 10);  
    // { id: 1, name: 'Test 1', value: 20 }
    array.First(x => x.value > 40);  
    // null
``` 

### Last (expression)
```javascript
    array.Last();                    
    // { id: 3, name: 'Test 3', value: 40 }
    array.Last(x => x.value > 10);   
    // { id: 3, name: 'Test 3', value: 40 }
    array.Last(x => x.value > 40);   
    // null

``` 

### Single (attribute, expression)
```javascript
    array.Single(x => x.name, y => y.value > 20); 
    // 'Test 2'
```

---------------------------------------

## RETURN ARRAY

### Select (expression)
```javascript
    array.Select(x => x.value);                       
    // [ 20, 30, 40 ]
    array.Select(x => a = { f: x.value, g: x.name }); 
    // [
    //  { f: 20, g: 'Test 1' },
    //  { f: 30, g: 'Test 2' },
    //  { f: 40, g: 'Test 3' }
    // ]
``` 

### Where (expression)
```javascript
    array.Where(x => x.value > 30); 
    // [
    //  { id: 3, name: 'Test 3', value: 40 }
    // ]
```

### Take (amount)
```javascript
    array.Take(2); 
    // [
    //  { id: 1, name: 'Test 1', value: 20 },
    //  { id: 2, name: 'Test 2', value: 30 }
    // ]
```

### Skip (start)
```javascript
    array.Skip(1); 
    // [
    //  { id: 2, name: 'Test 2', value: 30 },
    //  { id: 3, name: 'Test 3', value: 40 }
    // ]
```



### Union/UnionAll (array, expression)

#### Example
```javascript

let array2 = [
    { id: 1, name: 'Test 1', value: 20 },
    { id: 2, name: 'Test 2', value: 30 },
    { id: 3, name: 'Test 6', value: 40 },
    { id: 4, name: 'Test 4', value: 40 },
];

```
*Union* 
```javascript
    array.Union(array2);
  //[ { id: 1, name: 'Test 1', value: 20 },
  //  { id: 2, name: 'Test 2', value: 30 },
  //  { id: 3, name: 'Test 3', value: 40 },
  //  { id: 1, name: 'Test 1', value: 20 },
  //  { id: 2, name: 'Test 2', value: 30 },
  //  { id: 3, name: 'Test 6', value: 40 },
  //  { id: 4, name: 'Test 4', value: 40 } ]
    array.Union(array2, x => x.value > 20);
  //[ { id: 2, name: 'Test 2', value: 30 },
  //  { id: 3, name: 'Test 3', value: 40 },
  //  { id: 2, name: 'Test 2', value: 30 },
  //  { id: 3, name: 'Test 6', value: 40 },
  //  { id: 4, name: 'Test 4', value: 40 } ]
```

*UnionAll -> distinct* 
```javascript
    array.UnionAll(array2);
  //[ { id: 3, name: 'Test 3', value: 40 },
  //  { id: 1, name: 'Test 1', value: 20 },
  //  { id: 2, name: 'Test 2', value: 30 },
  //  { id: 3, name: 'Test 6', value: 40 },
  //  { id: 4, name: 'Test 4', value: 40 } ]
    array.UnionAll(array2, x => x.value > 20);
  //[ { id: 3, name: 'Test 3', value: 40 },
  //  { id: 2, name: 'Test 2', value: 30 },
  //  { id: 3, name: 'Test 6', value: 40 },
  //  { id: 4, name: 'Test 4', value: 40 } ]
```
---------------------------------------

## DISTINCT

### Distinct

#### Example
```javascript

    let array2 = [
        { id: 1, name: 'Test 1', value: 20 },
        { id: 1, name: 'Test 1', value: 20 },
        { id: 1, name: 'Test 1', value: 30 },
        { id: 4, name: 'Test 1', value: 20 },
        { id: 4, name: 'Test 2', value: 20 },
        { id: 4, name: 'Test 2', value: 20 },
    ];
```

*Distinct*
```javascript
    array2.Distinct();
  //[ { id: 1, name: 'Test 1', value: 20 },
  //  { id: 1, name: 'Test 1', value: 30 },
  //  { id: 4, name: 'Test 1', value: 20 },
  //  { id: 4, name: 'Test 2', value: 20 } ]
    
```

---------------------------------------

### GROUP

- GroupBy

---------------------------------------

### ARRAY

### AddRange (list, expression)
```javascript
    let newArray = [],
        newArray2 = [];

    newArray.AddRange(array);
    // [
    //  { id: 1, name: 'Test 1', value: 20 },
    //  { id: 2, name: 'Test 2', value: 30 },
    //  { id: 3, name: 'Test 3', value: 40 }
    // ]
    newArray2.AddRange(array, x => x.value > 20)
    // [
    //  { id: 2, name: 'Test 2', value: 30 },
    //  { id: 3, name: 'Test 3', value: 40 }
    // ]
    
```

### Remove (expression)
```javascript
    array.Remove(x => x.value > 30)
    // [
    //  { id: 1, name: 'Test 1', value: 20 },
    //  { id: 2, name: 'Test 2', value: 30 }
    // ]
    
``` 

---------------------------------------

## LOOP

### For (startIndex, callback)
*startIndex optional* 
```javascript
    array.For((obj, index) => { console.log(obj) });
    // { id: 1, name: 'Test 1', value: 20 }
    // { id: 2, name: 'Test 2', value: 30 }
    // { id: 3, name: 'Test 3', value: 40 }

    array.For(2, (obj, index) => { console.log(obj) });
    // { id: 3, name: 'Test 3', value: 40 }
``` 

---------------------------------------

## AGGREGATION

### Count (expression)
```javascript
    array.Count(x => x.value >= 40) // 1
    array.Count()                   // 3
``` 
### Max (expression)
```javascript
    array.Max(x => x.value) // 40
``` 
### Sum (expression)
```javascript
    array.Sum(x => x.value) // 90
```

---------------------------------------

## ORDER

### Order
```javascript
    [5,6,1,7].Order();
    // [1,5,6,7]
    
```

### OrderBy/OrderByDesc (expression)

##### Example
```javascript

    let array = [
        { id: 3, name: 'Test 3', value: 40 },
        { id: 1, name: 'Test 2', value: 30 },
        { id: 1, name: 'Test 2', value: 20 },
        { id: 1, name: 'Test 1', value: 20 },
        { id: 2, name: 'Test 2', value: 30 },
    ];
```

*OrderBy/OrderByDesc*
```javascript
    array.OrderBy(x => x.id).ToList();
    /*
        [ 
            { id: 1, name: 'Test 2', value: 30 },
            { id: 1, name: 'Test 2', value: 20 },
            { id: 1, name: 'Test 1', value: 20 },
            { id: 2, name: 'Test 2', value: 30 },
            { id: 3, name: 'Test 3', value: 40 } 
        ]
    */
    array.OrderByDesc(x => x.id).ToList();
    /*
        [ 
            { id: 3, name: 'Test 3', value: 40 },
            { id: 2, name: 'Test 2', value: 30 },
            { id: 1, name: 'Test 2', value: 30 },
            { id: 1, name: 'Test 1', value: 20 },
            { id: 1, name: 'Test 2', value: 20 } 
        ]
    */
```

*(OrderBy/OrderByDesc).(ThenBy/ThenByDesc)*
```javascript
    array.OrderBy(x => x.id).ThenBy(x => x.name).ToList()
    /*
        [ 
            { id: 1, name: 'Test 1', value: 20 },
            { id: 1, name: 'Test 2', value: 30 },
            { id: 1, name: 'Test 2', value: 20 },
            { id: 2, name: 'Test 2', value: 30 },
            { id: 3, name: 'Test 3', value: 40 } 
        ]
    */

    array.OrderBy(x => x.id)
         .ThenBy(x => x.name)
         .ThenBy(x => x.value).ToList()
    /*
        [ 
            { id: 1, name: 'Test 1', value: 20 },
            { id: 1, name: 'Test 2', value: 20 },
            { id: 1, name: 'Test 2', value: 30 },
            { id: 2, name: 'Test 2', value: 30 },
            { id: 3, name: 'Test 3', value: 40 } 
        ]
    */

    array.OrderBy(x => x.id)
         .ThenBy(x => x.name)
         .ThenByDesc(x => x.value).ToList()
    /*
        [ 
            { id: 1, name: 'Test 1', value: 20 },
            { id: 1, name: 'Test 2', value: 30 },
            { id: 1, name: 'Test 2', value: 20 },
            { id: 2, name: 'Test 2', value: 30 },
            { id: 3, name: 'Test 3', value: 40 } 
        ]
    */
```


---------------------------------------




