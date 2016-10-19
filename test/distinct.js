require('../lib/index.js');

let assert = require('assert');

function checkDistinctValues(fake, expectedLength){
    let distinct = fake.Distinct();
    for(let i = 0; i < distinct.length; i++){
        for(let j = i + 1; j < distinct.length; j++){
            if(distinct[i] === distinct[j])
                return false;
        }
    }

    return distinct.length == expectedLength;
}

function checkDistinctObjectValues(fake, expectedLength){
    let distinct = fake.Distinct();

    for(let i = 0; i < distinct.length; i++){
        for(let j = i + 1; j < distinct.length; j++){
            try{
                assert.deepStrictEqual(distinct[i], distinct[j]);
                return false;
            }
            catch(e){
                continue;
            }
        }
    }

    return distinct.length == expectedLength;
}

describe('testing distinct method', function() {
    it('should remove repeated null or undefined', function(done) {
        try{
            assert(checkDistinctValues([null, null, null], 1));    
            assert(checkDistinctValues([null, undefined, null, undefined], 2));    
            assert(checkDistinctValues([null, null, undefined, undefined], 2));    
            done();
        }
        catch(e){
            done(e);
        }
    });

    it('should remove repeated numbers', function(done) {
        try{
            assert(checkDistinctValues([1, 1, 1, 1], 1));
            assert(checkDistinctValues([1, 2, 1, 2, 1, 2], 2));
            assert(checkDistinctValues([1, 1, 2, 2, 3, 3, 4, 4], 4));
            assert(checkDistinctValues([1, 2, 3, 4, 4, 3, 2, 1], 4));
            assert(checkDistinctValues([1, 4, 3, 4, 1, 4, 7, 1], 4));    
            done();
        }
        catch(e){
            done(e);
        }
    });

    it('should remove repeated strings', function(done) {
        try{
            assert(checkDistinctValues(['1', '1', '1', '1'], 1));    
            assert(checkDistinctValues(['1', '2', '2', '1','1', '2', '2', '1'], 2));    
            assert(checkDistinctValues(['1', '2', '3', '3', '2', '1', '4'], 4));    
            assert(checkDistinctValues(['1', '1', 'aa', 'aa', 'bb', 'bb', ''], 4));    
            assert(checkDistinctValues(['', 'aa', '', ' ', '', '...'], 4));    
            done();
        }
        catch(e){
            done(e);
        }
    });

    it('should remove repeated booleans', function(done) {
        try{
            assert(checkDistinctValues([true, true, true], 1));    
            assert(checkDistinctValues([true, true, false, false], 2));    
            assert(checkDistinctValues([true, false, true, false], 2));    
            assert(checkDistinctValues([true, false, false, false, true, false], 2));    
            done();
        }
        catch(e){
            done(e);
        }
    });

    it('should remove repeated arrays', function(done) {
        try{
            assert(checkDistinctObjectValues([
                [1, 2, 3, 4],
                [1, 2, 3, 4],
                [1, 2, 3, 4]
            ], 1));

            assert(checkDistinctObjectValues([
                [1, 2, 3, 4],
                [1, 2, 3, '4']
            ], 2));

            assert(checkDistinctObjectValues([
                ['1', '2', '3', '4'],
                ['1', '2', '3', '4'],
                [1, 2, 3, 4],
                [1, 2, 3, 4],
                [1, 2, '3'],
                [1, 2, '3']
            ], 3));

            assert(checkDistinctObjectValues([
                ['abc', 1, 2],
                [1, 2, 3, 4],
                ['1', 2, 3, 4],
                [1, 2, 3, 4, 5]
            ], 4));

            assert(checkDistinctObjectValues([
                [1, 2],
                [1, 2, 3, 4],
                [],
                [],
                [1, 2, 3, 4, 5],
                [1, '2'],
            ], 5));   
             
            done();
        }
        catch(e){
            done(e);
        }
    });

    it('should remove repeated objects', function(done) {
        try{
            assert(checkDistinctObjectValues([
                {a: 1, b: 2, c: 3},
                {a: 1, b: 2, c: 3},
                {a: 1, b: 2, c: 3}
            ], 1));

            assert(checkDistinctObjectValues([
                {a: true, b: 2, c: '3'},
                {a: 'true', b: '2', c: 3},
                {a: true, b: 2, c: '3'},
                {a: 'true', b: '2', c: 3}
            ], 2));

            assert(checkDistinctObjectValues([
                {a: 'true', b: '2', c: 3},
                {b: 'true', a: '2', c: 3},
                {a: true, b: 2, c: '3'},
                {a: true, b: 2, c: '3'},
            ], 3));

            assert(checkDistinctObjectValues([
                {a: 'true', b: '2', c: 3},
                {b: 'true', a: '2', c: 3},
                {a: true, b: 2, c: '3'},
                {b: 2, a: true, c: '3'},
            ], 3));

            assert(checkDistinctObjectValues([
                {a: [1, 2, 3], b: 2, c: '3'},
                {a: 'true', b: '2', c: 3},
                {a: [1, 2, 3], b: 2, c: '3'},
                {a: 'true', b: '2', c: 3},
                {a: [1, 2, 3], b: 2, c: 3},
                {a: true, b: '2', c: 3},
                {b: [1, 2, 3], a: 2, c: 3},
                {b: 2, a: [1, 2, 3], c: 3},
                {a: [1, 2, 3], c: 3},
            ], 6));   

            assert(checkDistinctObjectValues([
                {a: 1, b: {aa: 1, bb: [1, 2, { aaa: true }]}, c: 3},
                {a: 1, b: {aa: 1, bb: [1, 2, { aaa: true }]}, c: 3},
                {a: 1, b: {aa: false, bb: { aaa: true }}},
                {a: 1, b: {aa: null, bb: []}, c: '', d: {}},
                {a: 1, b: {aa: false, bb: { aaa: true }}}
            ], 3)); 

            assert(checkDistinctObjectValues([
                {a: 1, b: {aa: 1, bb: [1, 1, { aaa: true }]}, c: 3},
                {a: 2, b: {aa: 2, bb: [2, 2, { aaa: true }]}, c: 3},
                {a: 1, b: {aa: 1, bb: [1, 1, { aaa: true }]}, c: 3},
                {a: 3, b: {aa: 3, bb: [3, 3, { aaa: true }]}, c: 3},
                {a: 3, b: {aa: 3, bb: [3, 3, { aaa: true }]}, c: 3},
            ], 3)); 
             
            done();
        }
        catch(e){
            done(e);
        }
    });
});
