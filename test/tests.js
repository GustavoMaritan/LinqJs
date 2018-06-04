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
            assert.equal([].first(), undefined);
        } catch (e) {
            assert.equal(true);
        }
    });

    test('first should throw an exception if cannot find any that matches the condition', () => {
        try {
            assert.equal([1, 2, 3].first(x => x == 4), undefined);
        } catch (e) {
            assert.equal(true);
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

describe('.last()', () => {
    test('last should throw an exception with empty array', () => {
        try {
            assert.equal([].last(), undefined);
        } catch (e) {
            assert.equal(true);
        }
    });

    test('last should throw an exception if cannot find any that matches the condition', () => {
        try {
            assert.equal([1, 2, 3].last(x => x == 4), undefined);
        } catch (e) {
            assert.equal(true);
        }
    });

    let arr = [1, 2, 4, 3, 4, 5];
    test('last should return the last item', () => assert.equal(arr.last(), 5));
    test('last should return the last item that matches the condition', () => {
        assert.equal(arr.last(x => x == 4), 4);
    });
    test('last should return the last item that matches the condition (even)', () => {
        assert.equal(arr.last(x => x % 2 == 0), 4);
    });
});
