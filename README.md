
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

#### Only works on v6 and above ####

Check the operation list below.

* [AddRange](#add-range)

- All
- Any 
- Count
- Exist
- First
- Last
- For
- Max
- Remove 
- Select
- Where 
- Sum
- Take
- Skip
- Single
- Order
- OrderBy
 - ThenBy
 - ThenByDesc
- OrderByDesc 
 - ThenBy
 - ThenByDesc
- GroupBy
- Distinct

---------------------------------------

### Example
```javascript

let array = [
    {
        id: 1,
        name: 'Test 1',
        value: 20
    },
    {
        id: 2,
        name: 'Test 2',
        value: 30
    },
    {
        id: 3,
        name: 'Test 3',
        value: 40
    },
]

```

### AddRange (list, expression)

```javascript
newArray.AddRange(array)
newArray2.AddRange(array, x => x.value > 20)
```

- All
```
array.All(x => x.value >= 40)   --> false
``` 

- Any 
```
array.Any(x => x.value >= 40)   --> true
array.Any(x => x.value > 40)    --> false
array.Any()                     --> true
``` 

- Count
```
array.Count(x => x.value >= 40) --> 1
array.Count()                   --> 3
``` 

- Exist
```
array.Exist(x => x.name == 'Test 2') --> true
``` 

- First
- FirstOrDefault 
```
array.First()                   --> { id: 1, name: 'Test 1', value: 20 }
array.First(x => x.value > 10)  --> { id: 1, name: 'Test 1', value: 20 }
array.First(x => x.value > 40)  --> {}

``` 

- Last
- LastOrDefault
```
array.Last()                    --> { id: 3, name: 'Test 3', value: 40 }
array.Last(x => x.value > 10)   --> { id: 3, name: 'Test 3', value: 40 }
array.Last(x => x.value > 40)   --> {}

``` 

- For
```
array.For((obj, index) => { console.log(obj) });
array.For((obj, index) => { console.log(obj) }, 2(start index));
``` 

- Max
```
array.Max(x => x.value) --> { id: 3, name: 'Test 3', value: 40 }
``` 

- Remove 
```
array.Remove(x => x.value > 30)
``` 

- Select == [].map
```
array.Select(x => x.value)                       --> [ 20, 30, 40 ]
array.Select(x => a = { f: x.value, g: x.name }) --> [{ f: 20, g: 'Test 1' },{ f: 30, g: 'Test 2' },{ f: 40, g: 'Test 3' }]
``` 
- Where 
```
array.Where(x => x.value > 30) --> [{ id: 3, name: 'Test 3', value: 40 }]
```

- Sum
```
array.Sum(x => x.value) --> 90
```
- Take
```
array.Take(2) --> [{ id: 1, name: 'Test 1', value: 20 },{ id: 2, name: 'Test 2', value: 30 }]
```

- Skip
```
array.Skip(1) --> [{ id: 2, name: 'Test 2', value: 30 },{ id: 3, name: 'Test 3', value: 40 }]
```

- Single
```
array.Single(x => x.name, y => y.value > 20) --> 'Test 2'
```

- Order
- OrderBy
 - ThenBy
 - ThenByDesc
- OrderByDesc 
 - ThenBy
 - ThenByDesc
- GroupBy
- Distinct

