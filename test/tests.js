require('../lib/index.js');
const assert = require('assert');

let test = (description, assertTest) => {
    it(description, (done) => {
        try {
            assertTest();
            done();
        } catch (e) {
            done(e);
        }
    });
};

describe('.add()', () => {
    let arr = [1];
    arr.add(2);

    let length = arr.length;
    test('adding one item', () => assert.equal(length, 2));

    arr.add(3);
    test('adding one more', () => assert.equal(arr.length, 3));
});

describe('.addRange()', () => {
    let arr = [1];
    arr.addRange(2);

    let l1 = arr.length;
    test('adding one item', () => assert.equal(l1, 2));

    arr.addRange(3, 4);
    let l2 = arr.length;
    test('adding two items', () => assert.equal(l2, 4));

    arr.addRange([3, 4]);
    test('adding a list', () => assert.equal(arr.length, 6));
});

describe('.all()', () => {
    test('all empty condition throws false', () => assert.equal([1, 2, 3, 4, 5].all(), false));
    test('all for true', () => assert.equal([1, 2, 3, 4, 5].all(x => x <= 5), true));
    test('all for false', () => assert.equal([1, 2, 3, 4, 5].all(x => x < 5), false));
});

describe('.any()', () => {
    test('any empty condition throws "length > 0" (with empty array)', () => {
        assert.equal([].any(), false);
    });
    test('any empty condition throws "length > 0"', () => assert.equal([1, 2, 3, 4, 5].any(), true));
    test('any for true', () => assert.equal([1, 2, 3, 4, 5].any(x => x == 5), true));
    test('any for false', () => assert.equal([1, 2, 3, 4, 5].any(x => x == 6), false));
});

describe('.count()', () => {
    test('empty array should return 0', () => assert.equal([].count(), 0));
    test('counting array of numbers', () => assert.equal([1, 2, 3, 4].count(), 4));
    test('counting array of numbers with condition', () => {
        assert.equal([1, 2, 3, 4, 5, 6, 7, 8, 9].count(x => x % 2 == 0), 4);
    });
    test('counting array of objects', () => {
        assert.equal([{ age: 10 }, { age: 20 }, { age: 30 }].count(), 3);
    });
    test('counting array of objects with condition', () => {
        assert.equal([{ age: 10 }, { age: 20 }, { age: 30 }].count(x => x.age >= 20), 2);
    });
});

describe('.distinct()', () => {
    function checkDistinct(arr, expectedLength) {
        let distinct = arr.distinct();
        for (let i = 0; i < distinct.length; i++)
            for (let j = i + 1; j < distinct.length; j++)
                if (distinct[i] === distinct[j])
                    return false;

        return distinct.length == expectedLength;
    }

    test('distinct should remove repeated null or undefined', () => {
        assert(checkDistinct([null, null, null], 1));
        assert(checkDistinct([null, undefined, null, undefined], 2));
        assert(checkDistinct([null, null, undefined, undefined], 2));
    });

    test('distinct should remove repeated numbers', () => {
        assert(checkDistinct([1, 1, 1, 1], 1));
        assert(checkDistinct([1, 2, 1, 2, 1, 2], 2));
        assert(checkDistinct([1, 1, 2, 2, 3, 3, 4, 4], 4));
        assert(checkDistinct([1, 2, 3, 4, 4, 3, 2, 1], 4));
        assert(checkDistinct([1, 4, 3, 4, 1, 4, 7, 1], 4));
    });

    test('distinct should remove repeated strings', () => {
        assert(checkDistinct(['1', '1', '1', '1'], 1));
        assert(checkDistinct(['1', '2', '2', '1', '1', '2', '2', '1'], 2));
        assert(checkDistinct(['1', '2', '3', '3', '2', '1', '4'], 4));
        assert(checkDistinct(['1', '1', 'aa', 'aa', 'bb', 'bb', ''], 4));
        assert(checkDistinct(['', 'aa', '', ' ', '', '...'], 4));
    });

    test('distinct should remove repeated booleans', () => {
        assert(checkDistinct([true, true, true], 1));
        assert(checkDistinct([true, true, false, false], 2));
        assert(checkDistinct([true, false, true, false], 2));
        assert(checkDistinct([true, false, false, false, true, false], 2));
    });

    test('distinct should remove repeated dates', () => {
        assert(checkDistinct([new Date(2018, 6, 4), new Date(2018, 6, 4), new Date(2018, 6, 4)], 1));
        assert(checkDistinct([new Date(2018, 6, 4), new Date(2018, 7, 4), new Date(2018, 6, 4)], 2));
        assert(checkDistinct([
            new Date(2018, 6, 4),
            new Date(2018, 7, 4),
            new Date(2018, 6, 4),
            new Date(2018, 7, 4)
        ], 2));
    });

    test('distinct should remove repeated objects by reference', () => {
        let obj1 = { a: 1, b: 2 };
        let obj2 = { c: 3, d: 4 };
        assert(checkDistinct([obj1, obj2], 2));
        assert(checkDistinct([obj1, obj2, obj1, obj2], 2));
        assert(checkDistinct([obj1, obj1, obj1, obj2], 2));
        assert(checkDistinct([obj1, obj2, { e: 5 }, obj1, obj2, { e: 5 }], 4));
    });
});

describe('.distinctRecursive()', () => {
    function checkDistinct(arr, expectedLength) {
        let distinct = arr.distinctRecursive();
        for (let i = 0; i < distinct.length; i++)
            for (let j = i + 1; j < distinct.length; j++)
                try {
                    assert.deepStrictEqual(distinct[i], distinct[j]);
                    console.log(distinct);
                    console.log(distinct[i], distinct[j]);
                    return false;
                } catch (e) {
                    continue;
                }

        return distinct.length == expectedLength;
    }

    test('distinctRecursive should remove repeated arrays', () => {
        assert(checkDistinct([
            [1, 2, 3, 4],
            [1, 2, 3, 4],
            [1, 2, 3, 4]
        ], 1));

        assert(checkDistinct([
            [1, 2, 3, 4],
            [1, 2, 3, '4']
        ], 2));

        assert(checkDistinct([
            ['1', '2', '3', '4'],
            ['1', '2', '3', '4'],
            [1, 2, 3, 4],
            [1, 2, 3, 4],
            [1, 2, '3'],
            [1, 2, '3']
        ], 3));

        assert(checkDistinct([
            ['abc', 1, 2],
            [1, 2, 3, 4],
            ['1', 2, 3, 4],
            [1, 2, 3, 4, 5]
        ], 4));

        assert(checkDistinct([
            [1, 2],
            [1, 2, 3, 4],
            [],
            [],
            [1, 2, 3, 4, 5],
            [1, '2'],
        ], 5));
    });

    test('distinctRecursive should remove repeated objects', () => {
        assert(checkDistinct([
            { a: 1, b: 2, c: 3 },
            { a: 1, b: 2, c: 3 },
            { a: 1, b: 2, c: 3 }
        ], 1));

        assert(checkDistinct([
            { a: true, b: 2, c: '3' },
            { a: 'true', b: '2', c: 3 },
            { a: true, b: 2, c: '3' },
            { a: 'true', b: '2', c: 3 }
        ], 2));

        assert(checkDistinct([
            { a: 'true', b: '2', c: 3 },
            { b: 'true', a: '2', c: 3 },
            { a: true, b: 2, c: '3' },
            { a: true, b: 2, c: '3' },
        ], 3));

        assert(checkDistinct([
            { a: 'true', b: '2', c: 3 },
            { a: '2', b: 'true', c: 3 },
            { a: true, b: 2, c: '3' },
            { a: true, b: 2, c: '3' },
        ], 3));

        assert(checkDistinct([
            { a: [1, 2, 3], b: 2, c: '3' },
            { a: [1, 2, 3], b: 2, c: '3' },
            { a: 'true', b: '2', c: 3 },
            { a: 'true', b: '2', c: 3 },
            { a: [1, 2, 3], b: 2, c: 3 },
            { a: [1, 2, 3], b: 2, c: 3 },
            { a: 2, b: [1, 2, 3], c: 3 },
            { a: true, b: '2', c: 3 },
            { a: [1, 2, 3], c: 3 },
        ], 6));

        assert(checkDistinct([
            { a: 1, b: { aa: 1, bb: [1, 2, { aaa: true }] }, c: 3 },
            { a: 1, b: { aa: 1, bb: [1, 2, { aaa: true }] }, c: 3 },
            { a: 1, b: { aa: false, bb: { aaa: true } } },
            { a: 1, b: { aa: null, bb: [] }, c: '', d: {} },
            { a: 1, b: { aa: false, bb: { aaa: true } } }
        ], 3));

        assert(checkDistinct([
            { a: 1, b: { aa: 1, bb: [1, 1, { aaa: true }] }, c: 3 },
            { a: 2, b: { aa: 2, bb: [2, 2, { aaa: true }] }, c: 3 },
            { a: 1, b: { aa: 1, bb: [1, 1, { aaa: true }] }, c: 3 },
            { a: 3, b: { aa: 3, bb: [3, 3, { aaa: true }] }, c: 3 },
            { a: 3, b: { aa: 3, bb: [3, 3, { aaa: true }] }, c: 3 },
        ], 3));
    });
});

describe('.first()', () => {
    test('first should throw an exception with empty array', () => {
        try {
            [].first();
            assert(false);
        } catch (e) {
            assert(true);
        }
    });

    test('first should throw an exception if cannot find any that matches the condition', () => {
        try {
            [1, 2, 3].first(x => x == 4);
            assert(false);
        } catch (e) {
            assert(true);
        }
    });

    let arr = [1, 2, 4, 3, 4, 5];
    test('first should return the first item', () => assert.equal(arr.first(), 1));
    test('first should return the first item that matches the condition', () => {
        assert.equal(arr.first(x => x == 4), 4);
    });
    test('first should return the first item that matches the condition (even)', () => {
        assert.equal(arr.first(x => x % 2 == 0), 2);
    });
});

describe('.firstOrDefault()', () => {
    test('firstOrDefault should return undefined with empty array', () => {
        assert.equal([].firstOrDefault(), undefined);
    });

    test('firstOrDefault should return undefined if cannot find any that matches the condition', () => {
        assert.equal([1, 2, 3].firstOrDefault(x => x == 4), undefined);
    });

    let arr = [1, 2, 4, 3, 4, 5];
    test('firstOrDefault should return the first item', () => assert.equal(arr.firstOrDefault(), 1));
    test('firstOrDefault should return the first item that matches the condition', () => {
        assert.equal(arr.firstOrDefault(x => x == 4), 4);
    });
    test('firstOrDefault should return the first item that matches the condition (even)', () => {
        assert.equal(arr.firstOrDefault(x => x % 2 == 0), 2);
    });
});

describe('.groupBy()', () => {
    test('groupBy should group objects', () => {
        let arr = [
            { name: 'Name1', age: 10 },
            { name: 'Name2', age: 20 },
            { name: 'Name3', age: 10 },
            { name: 'Name4', age: 20 },
            { name: 'Name5', age: 10 },
            { name: 'Name6', age: 30 }
        ].groupBy(x => x.age);

        assert.equal(arr[0].key, 10);
        assert.equal(arr[0].length, 3);

        assert.equal(arr[1].key, 20);
        assert.equal(arr[1].length, 2);

        assert.equal(arr[2].key, 30);
        assert.equal(arr[2].length, 1);

        assert.equal(arr.length, 3);
    });

    test('groupBy should group numbers', () => {
        let arr = [
            1, 2, 3,
            1, 2,
            1,
        ].groupBy(x => x);

        assert.equal(arr[0].key, 1);
        assert.equal(arr[0].length, 3);

        assert.equal(arr[1].key, 2);
        assert.equal(arr[1].length, 2);

        assert.equal(arr[2].key, 3);
        assert.equal(arr[2].length, 1);

        assert.equal(arr.length, 3);
    });

    test('groupBy should group strings', () => {
        let arr = [
            'a', 'b', 'c',
            'a', 'b',
            'a',
        ].groupBy(x => x);

        assert.equal(arr[0].key, 'a');
        assert.equal(arr[0].length, 3);

        assert.equal(arr[1].key, 'b');
        assert.equal(arr[1].length, 2);

        assert.equal(arr[2].key, 'c');
        assert.equal(arr[2].length, 1);

        assert.equal(arr.length, 3);
    });

    test('groupBy should group mixed array', () => {
        let obj = { a: true };
        let arr = [
            1, 1,
            2, '2',
            'a', 'a', 'A',
            obj, obj,
            { a: true },
            true, false,
            true, false
        ].groupBy(x => x);

        assert.equal(arr[0].key, 1);
        assert.equal(arr[0].length, 2);

        assert.equal(arr[1].key, 2);
        assert.equal(arr[1].length, 1);

        assert.equal(arr[2].key, '2');
        assert.equal(arr[2].length, 1);

        assert.equal(arr[3].key, 'a');
        assert.equal(arr[3].length, 2);

        assert.equal(arr[4].key, 'A');
        assert.equal(arr[4].length, 1);

        assert.equal(arr[5].key, obj);
        assert.equal(arr[5].length, 2);

        assert.equal(arr[6].length, 1);

        assert.equal(arr[7].key, true);
        assert.equal(arr[7].length, 2);

        assert.equal(arr[8].key, false);
        assert.equal(arr[8].length, 2);

        assert.equal(arr.length, 9);
    });
});

describe('.last()', () => {
    test('last should throw an exception with empty array', () => {
        try {
            [].last();
            assert(false);
        } catch (e) {
            assert(true);
        }
    });

    test('last should throw an exception if cannot find any that matches the condition', () => {
        try {
            [1, 2, 3].last(x => x == 4);
            assert(false);
        } catch (e) {
            assert(true);
        }
    });

    let arr = [1, 2, 4, 3, 4, 5];
    test('last should return t7e last item', () => assert.equal(arr.last(), 5));
    test('last should return the last item that matches the condition', () => {
        assert.equal(arr.last(x => x == 4), 4);
    });
    test('last should return the last item that matches the condition (even)', () => {
        assert.equal(arr.last(x => x % 2 == 0), 4);
    });
});

describe('.lastOrDefault()', () => {
    test('lastOrDefault should return undefined with empty array', () => {
        assert.equal([].lastOrDefault(), undefined);
    });

    test('lastOrDefault should return undefined if cannot find any that matches the condition', () => {
        assert.equal([1, 2, 3].lastOrDefault(x => x == 4), undefined);
    });

    let arr = [1, 2, 4, 3, 4, 5];
    test('lastOrDefault should return the last item', () => assert.equal(arr.lastOrDefault(), 5));
    test('lastOrDefault should return the last item that matches the condition', () => {
        assert.equal(arr.lastOrDefault(x => x == 4), 4);
    });
    test('lastOrDefault should return the last item that matches the condition (even)', () => {
        assert.equal(arr.lastOrDefault(x => x % 2 == 0), 4);
    });
});

describe('.max()', () => {
    test('max should return 0 with empty array', () => {
        assert.equal([].max(), 0);
    });

    test('max should return maximum value', () => {
        assert.equal([1, 2, 5, 3, 4].max(), 5);
    });

    test('max should return maximum value that matches the expression (object)', () => {
        assert.equal([
            { age: 10 },
            { age: 20 },
            { age: 40 },
            { age: 30 }
        ].max(x => x.age), 40);
    });

    test('max should return maximum value that matches the expression', () => {
        assert.equal([1, 2, 3, 4, 5].max(x => x % 2 == 0 ? x : Number.MIN_VALUE), 4);
    });
});

describe('.min()', () => {
    test('min should return 0 with empty array', () => {
        assert.equal([].min(), 0);
    });

    test('min should return minimum value', () => {
        assert.equal([5, 2, 1, 3, 4].min(), 1);
    });

    test('min should return minimum value that matches the expression (object)', () => {
        assert.equal([
            { age: 40 },
            { age: 20 },
            { age: 10 },
            { age: 30 }
        ].min(x => x.age), 10);
    });

    test('min should return minimum value that matches the expression', () => {
        assert.equal([1, 2, 3, 4, 5].min(x => x % 2 == 0 ? x : Number.MAX_VALUE), 2);
    });
});

describe('.order()', () => {
    test('order should order numbers', () => {
        let arr = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0].order();
        for (let i = 0; i <= 9; i++)
            assert.equal(arr[i], i);
    });
    test('order should order strings', () => {
        let arrOrdered = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
        let arr = ['J', 'I', 'H', 'G', 'F', 'E', 'D', 'C', 'B', 'A'].order();
        for (let i = 0; i <= 9; i++)
            assert.equal(arr[i], arrOrdered[i]);
    });
});

describe('.orderBy()', () => {
    test('orderBy should order by condition', () => {
        let arr = [1, 2, 3, 4].orderBy(x => x % 2 == 0 ? 0 : 1);
        assert.equal(arr[0], 2);
        assert.equal(arr[1], 4);
        assert.equal(arr[2], 1);
        assert.equal(arr[3], 3);
    });
    test('orderBy should order by expression', () => {
        let arr = [
            { name: 'Name1', age: 20 },
            { name: 'Name2', age: 30 },
            { name: 'Name3', age: 10 }
        ].orderBy(x => x.age);

        assert.equal(arr[0].age, 10);
        assert.equal(arr[1].age, 20);
        assert.equal(arr[2].age, 30);
    });
});

describe('.orderByDesc()', () => {
    test('orderByDesc should order by condition descending', () => {
        let arr = [1, 2, 3, 4].orderByDesc(x => x % 2 != 0 ? 1 : 0);
        assert.equal(arr[0], 1);
        assert.equal(arr[1], 3);
        assert.equal(arr[2], 2);
        assert.equal(arr[3], 4);
    });
    test('orderByDesc should order by expression descending', () => {
        let arr = [
            { name: 'Name1', age: 20 },
            { name: 'Name2', age: 30 },
            { name: 'Name3', age: 10 }
        ].orderByDesc(x => x.age);

        assert.equal(arr[0].age, 30);
        assert.equal(arr[1].age, 20);
        assert.equal(arr[2].age, 10);
    });
});

describe('.orderDesc()', () => {
    test('orderDesc should order numbers descending', () => {
        let arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].orderDesc();
        for (let i = 9; i >= 0; i--)
            assert.equal(arr[arr.length - 1 - i], i);
    });
    test('orderDesc should order strings descending', () => {
        let arrOrdered = ['J', 'I', 'H', 'G', 'F', 'E', 'D', 'C', 'B', 'A'];
        let arr = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'].orderDesc();
        for (let i = 0; i <= 9; i++)
            assert.equal(arr[i], arrOrdered[i]);
    });
});

describe('.remove()', () => {
    test('remove should remove one single equal item', () => {
        let arr = [1, 2, 3, 4, 2];
        arr.remove(2);
        assert.equal(arr.length, 4);
    });
    test('remove should remove one single object by reference', () => {
        let obj = { a: 1 };
        let arr = [obj, { a: 1 }, obj];
        arr.remove(obj);
        assert.equal(arr.length, 2);
    });
    test('remove should remove all items that match the condition', () => {
        let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        arr.remove(x => x % 2 == 0);
        assert.equal(arr.length, 5);
    });
    test('remove should remove all items that match the condition (object)', () => {
        let obj = { a: 1 };
        let arr = [obj, { a: 1 }, obj];
        arr.remove(x => x.a === 1);
        assert.equal(arr.length, 0);
    });
});

describe('.removeAt()', () => {
    test('removeAt should remove by index', () => {
        let arr = [1, 2, 3, 4, 2];
        arr.removeAt(2);
        assert.equal(arr.length, 4);
        assert.equal(arr.indexOf(3), -1);
    });
    test('removeAt should remove nothing if cannot find', () => {
        let arr = [1, 2, 3, 4, 2];
        arr.removeAt(7);
        assert.equal(arr.length, 5);
        assert.equal(arr.indexOf(3), 2);
    });
});

describe('.select()', () => {
    test('select should transform array of objects into a array of numbers', () => {
        let arr = [
            { a: 1 },
            { a: 2 },
            { a: 3 }
        ];

        let arrSelect = arr.select(x => x.a);
        assert.equal(arrSelect.length, arr.length);
        assert.equal(arrSelect[0], 1);
        assert.equal(arrSelect[1], 2);
        assert.equal(arrSelect[2], 3);
    });

    test('select should transform array of objects into another array of objects', () => {
        let arr = [
            { a: 1 },
            { a: 2 },
            { a: 3 }
        ];

        let arrSelect = arr.select(x => x = { b: x.a });
        assert.equal(arrSelect.length, arr.length);
        assert.equal(arrSelect[0].b, 1);
        assert.equal(arrSelect[1].b, 2);
        assert.equal(arrSelect[2].b, 3);
    });
});

describe('.selectMany()', () => {
    test('selectMany should join arrays into a single one', () => {
        let arr = [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9]
        ];

        let arrSelectMany = arr.selectMany(x => x);
        assert.equal(arrSelectMany.length, 9);
    });

    test('selectMany should join arrays inside a object into a single one', () => {
        let arr = [
            { id: 1, phones: [123456789, 987654321, 04535632] },
            { id: 2, phones: [12342345, 456321567, 987654321] },
            { id: 3, phones: [69765432, 76854321, 3425678543] }
        ];

        let arrSelectMany = arr.selectMany(x => x.phones);
        assert.equal(arrSelectMany.length, 9);
    });
});

describe('.skip()', () => {
    test('skip should return empty array with empty array', () => {
        assert.equal([].skip(3).length, 0);
    });
    test('skip should return empty array if jump all', () => {
        assert.equal([1, 2, 3, 4, 5].skip(5).length, 0);
    });
    test('skip should jump 2 index', () => {
        assert.equal([1, 2, 3, 4, 5].skip(2).length, 3);
    });
});

describe('.sum()', () => {
    test('empty array should return 0', () => assert.equal([].sum(), 0));
    test('sum array of numbers', () => assert.equal([1, 2, 3, 4].sum(), 10));
    test('sum array of numbers with condition', () => {
        assert.equal([1, 2, 3, 4, 5, 6, 7, 8, 9].sum(x => x % 2 == 0 ? x : 0), 20);
    });
    test('sum array of objects', () => {
        assert.equal([{ age: 10 }, { age: 20 }, { age: 30 }].sum(x => x.age), 60);
    });
    test('sum array of objects with condition', () => {
        assert.equal([{ age: 10 }, { age: 20 }, { age: 30 }].sum(x => x.age >= 20 ? x.age : 0), 50);
    });
});

describe('.take()', () => {
    test('take should return empty array with empty array (take 3)', () => {
        assert.equal([].take(3).length, 0);
    });
    test('take should return 2 indexs with array of 5 positions (take 2)', () => {
        assert.equal([1, 2, 3, 4, 5].take(2).length, 2);
    });
    test('take should return 5 indexs with array of 7 positions (take 5)', () => {
        assert.equal([1, 2, 3, 4, 5, 6, 7].take(5).length, 5);
    });
    test('take should return 2 indexs with array of 2 positions (take 5)', () => {
        assert.equal([1, 2].take(5).length, 2);
    });
});

describe('.thenBy()', () => {
    let arr = [
        { name: 'A', age: 20 },
        { name: 'C', age: 20 },
        { name: 'B', age: 20 },

        { name: 'E', age: 10 },
        { name: 'F', age: 10 },
        { name: 'D', age: 10 }
    ];

    test('thenBy should order a ordered list by a second condition', () => {
        arr.orderByDesc(x => x.age).thenBy(x => x.name);
        
        assert.equal(arr[0].age, 20);
        assert.equal(arr[0].name, 'A');
        assert.equal(arr[1].age, 20);
        assert.equal(arr[1].name, 'B');
        assert.equal(arr[2].age, 20);
        assert.equal(arr[2].name, 'C');

        assert.equal(arr[3].age, 10);
        assert.equal(arr[3].name, 'D');
        assert.equal(arr[4].age, 10);
        assert.equal(arr[4].name, 'E');
        assert.equal(arr[5].age, 10);
        assert.equal(arr[5].name, 'F');
    });
});

describe('.thenByDesc()', () => {
    let arr = [
        { name: 'B', age: 20 },
        { name: 'C', age: 20 },
        { name: 'A', age: 20 },

        { name: 'D', age: 10 },
        { name: 'F', age: 10 },
        { name: 'E', age: 10 }
    ];

    test('thenByDesc should order a ordered list by a second condition descending', () => {
        arr.orderBy(x => x.age).thenByDesc(x => x.name);

        assert.equal(arr[0].age, 10);
        assert.equal(arr[0].name, 'F');
        assert.equal(arr[1].age, 10);
        assert.equal(arr[1].name, 'E');
        assert.equal(arr[2].age, 10);
        assert.equal(arr[2].name, 'D');

        assert.equal(arr[3].age, 20);
        assert.equal(arr[3].name, 'C');
        assert.equal(arr[4].age, 20);
        assert.equal(arr[4].name, 'B');
        assert.equal(arr[5].age, 20);
        assert.equal(arr[5].name, 'A');
    });
});

describe('.where()', () => {
    let obj = { name: 'Name4', age: 20 };
    let arr = [
        { name: 'Name1', age: 10 },
        { name: 'Name2', age: 10 },
        { name: 'Name3', age: 10 },
        obj,
        { name: 'Name5', age: 20 },
        { name: 'Name6', age: 30 }
    ];

    test('where should filter by expression (number)', () => {
        assert.equal(arr.where(x => x.age == 10).length, 3);
        assert.equal(arr.where(x => x.age == 20).length, 2);
        assert.equal(arr.where(x => x.age == 30).length, 1);
        assert.equal(arr.where(x => x.age > 30).length, 0);
        assert.equal(arr.where(x => x.age <= 30).length, 6);
    });

    test('where should filter by expression (string)', () => {
        assert.equal(arr.where(x => x.name.indexOf('Name') >= 0).length, 6);
        assert.equal(arr.where(x => x.name == 'Name3').length, 1);
    });

    test('where should filter by expression (boolean)', () => {
        assert.equal(arr.where(x => true).length, 6);
        assert.equal(arr.where(x => false).length, 0);
    });

    test('where should filter by expression (object)', () => {
        assert.equal(arr.where(x => x == obj).length, 1);
    });
});
