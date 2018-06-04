const assert = require('assert');
require('../lib/index.js');

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
    test('all for false', () => assert.equal([1, 2, 3, 4, 5].all(x => x < 5), true));
});

describe('.any()', () => {
    test('any empty condition throws "length > 0" (with empty array)', () => assert.equal([].any(), false));
    test('any empty condition throws "length > 0"', () => assert.equal([1, 2, 3, 4, 5].any(), true));
    test('any for true', () => assert.equal([1, 2, 3, 4, 5].any(x => x == 5), true));
    test('any for false', () => assert.equal([1, 2, 3, 4, 5].any(x => x == 6), false));
});

describe('.count()', () => {
    test('empty array should return 0', () => assert.equal([].count(), 0));
    test('counting array of numbers', () => assert.equal([1, 2, 3, 4].count(), 4));
    test('counting array of numbers with condition', () => assert.equal([1, 2, 3, 4, 5, 6, 7, 8, 9].count(x => x % 2 == 0), 4));
    test('counting array of objects', () => assert.equal([{age: 10}, {age: 20}, {age: 30}].count(), 3));
    test('counting array of objects with condition', () => assert.equal([{age: 10}, {age: 20}, {age: 30}].count(x => x.age >= 20), 2));
});

describe('.sum()', () => {
    test('empty array should return 0', () => assert.equal([].sum(), 0));
    test('sum array of numbers', () => assert.equal([1, 2, 3, 4].sum(), 10));
    test('sum array of numbers with condition', () => assert.equal([1, 2, 3, 4, 5, 6, 7, 8, 9].sum(x => x % 2 == 0 ? x : 0), 20));
    test('sum array of objects', () => assert.equal([{age: 10}, {age: 20}, {age: 30}].sum(x => x.age), 60));
    test('sum array of objects with condition', () => assert.equal([{age: 10}, {age: 20}, {age: 30}].sum(x => x.age >= 20 ? x.age : 0), 50));
});
