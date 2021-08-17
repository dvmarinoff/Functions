import {
    equals,
    isNull,
    isUndefined,
    exists,
    existance,

    // collections
    isArray,
    isObject,
    isString,
    isCollection,
    first,
    second,
    third,
    last,
    empty,
    map,
    traverse,
    getIn,
    avg,
    max,
    sum,

    // functions
    compose,
    pipe,
    repeat,

    // async
    delay,

    // events
    xf,

    // bits
    nthBit,
    bitToBool,
    nthBitToBool,
    dataviewToArray,
    dataviewToString,
    stringToCharCodes,
    toUint8Array,
    xor,
} from '../src/functions.js';

describe('exists', () => {
    describe('does not exist', () => {
        test('null does not exist', () => {
            expect(exists(null)).toBe(false);
        });

        test('undefined does not exist', () => {
            expect(exists(undefined)).toBe(false);
        });
    });

    describe('exists', () => {
        test('empty Collections exist', () => {
            expect(exists({})).toBe(true);
            expect(exists([])).toBe(true);
            expect(exists("")).toBe(true);
            expect(exists(new Uint8Array([]))).toBe(true);
        });

        test('zero exists', () => {
            expect(exists(0)).toBe(true);
        });

        test('Booleans exist', () => {
            expect(exists(true)).toBe(true);
            expect(exists(false)).toBe(true);
        });
    });
});

describe('existance check', () => {

    describe('when the input value does not exist it returns the fallback value', () => {
        test('with Null', () => {
            expect(existance(null, 1)).toBe(1);
        });

        test('with Undefined', () => {
            expect(existance(undefined, 1)).toBe(1);
        });
    });

    describe('when the input value exists it returns the input value', () => {
        test('with Collection', () => {
            expect(existance({}, 1)).toStrictEqual({});
            expect(existance([], 1)).toStrictEqual([]);
            expect(existance("", 1)).toBe("");
            expect(existance(new Uint8Array([]))).toStrictEqual(new Uint8Array([]));
        });

        test('with Number', () => {
            expect(existance(0, 1)).toBe(0);
        });

        test('with Boolean', () => {
            expect(existance(true, 1)).toBe(true);
            expect(existance(false, 1)).toBe(false);
        });
    });
});

describe('empty check', () => {
    describe('is empty', () => {
        test('with empty Array', () => {
            expect(empty([])).toBe(true);
        });

        test('with empty Object', () => {
            expect(empty({})).toBe(true);
        });

        test('with empty String', () => {
            expect(empty("")).toBe(true);
        });

        test('with undefined', () => {
            expect(empty(undefined)).toBe(true);
        });
    });

    describe('is not empty', () => {
        test('with Array', () => {
            expect(empty([0])).toBe(false);
        });

        test('with Object', () => {
            expect(empty({a: 0})).toBe(false);
        });

        test('with String', () => {
            expect(empty("zero")).toBe(false);
        });
    });

    describe('throws error', () => {
        test('with null', () => {
            expect(() => empty(null)).toThrow();
        });

        test('with number', () => {
            expect(() => empty(0)).toThrow();
        });
    });
});

describe('first element of collection', () => {
    describe('takes first element', () => {
        test('of Array', () => {
            expect(first([0])).toBe(0);
        });

        test('of String', () => {
            expect(first("zero")).toBe("z");
        });
    });

    describe('empty is undefined', () => {
        test('of Array', () => {
            expect(first([])).toBe(undefined);
        });

        test('of String', () => {
            expect(first("")).toBe(undefined);
        });
    });

    describe('first of undefined is undefined', () => {
        test('with undefined', () => {
            expect(first(undefined)).toBe(undefined);
        });
    });

    describe('throws error', () => {
        test('with number', () => {
            expect(() => first(0)).toThrow();
        });

        test('with null', () => {
            expect(() => first(null)).toThrow();
        });
    });
});

describe('second element of collection', () => {
    describe('takes second element', () => {
        test('of Array', () => {
            expect(second([0,1])).toBe(1);
        });

        test('of String', () => {
            expect(second("zero")).toBe("e");
        });
    });

    describe('index out of bound is undefined', () => {
        test('of Array', () => {
            expect(second([])).toBe(undefined);
        });

        test('of String', () => {
            expect(second("")).toBe(undefined);
        });
    });

    describe('empty is undefined', () => {
        test('of Array', () => {
            expect(second([])).toBe(undefined);
        });

        test('of String', () => {
            expect(second("")).toBe(undefined);
        });
    });

    describe('second of undefined is undefined', () => {
        test('with undefined', () => {
            expect(second(undefined)).toBe(undefined);
        });
    });

    describe('throws error', () => {
        test('with number', () => {
            expect(() => second(0)).toThrow();
        });

        test('with null', () => {
            expect(() => second(null)).toThrow();
        });
    });
});

describe('last element of Collection or String', () => {
    describe('works with non-empty Collection or String', () => {
        test('with Array', () => {
            expect(last([0])).toBe(0);
            expect(last([0,2])).toBe(2);
            expect(last([0,1,4])).toBe(4);
        });

        test('with String', () => {
            expect(last('a')).toBe('a');
            expect(last('ab')).toBe('b');
            expect(last('abcd')).toBe('d');
            expect(last('1')).toBe('1');
        });
    });

    describe('with empty Collection or String it returns undefined', () => {
        test('with Array', () => {
            expect(last([])).toBe(undefined);
        });

        test('with String', () => {
            expect(last('')).toBe(undefined);
        });
    });

    describe('last of undefined is undefined', () => {
        test('with undefined', () => {
            expect(second(undefined)).toBe(undefined);
        });
    });

    describe('throws error', () => {
        test('with number', () => {
            expect(() => last(0)).toThrow();
        });

        test('with null', () => {
            expect(() => last(null)).toThrow();
        });
    });
});

describe('traverse nested object', () => {

    function accumulate(acc, k, v, obj) {
        acc.push(v);
        return acc;
    }

    test('empty object', () => {
        expect(traverse({})).toEqual([]);
    });

    test('one entry object', () => {
        expect(traverse({crc: true}, accumulate, [])).toEqual([true]);
    });

    test('one level object', () => {
        expect(traverse({activity: true, session: true}, accumulate, [])).toEqual([true, true]);
    });

    test('many levels', () => {
        let obj = {data: {file_id: true,
                          event: {start: true,
                                  stop: false}},
                   crc: false};
        expect(traverse(obj, accumulate, [])).toEqual([true, true, false, false]);
    });
});

describe('map', () => {
    const inc = (n) => n + 1;

    test('map an Array', () => {
        expect(map([], inc)).toStrictEqual([]);
        expect(map([0], inc)).toStrictEqual([1]);
        expect(map([0,1,2,3], inc)).toStrictEqual([1,2,3,4]);
    });

    test('map an Object', () => {
        expect(map({}, inc)).toStrictEqual({});
        expect(map({x: 0}, inc)).toStrictEqual({x: 1});
        expect(map({x: 0, y: 1, z: 2}, inc)).toStrictEqual({x: 1, y: 2, z: 3});
    });

    test('map a String', () => {
        const toUpperCase = c => c.toUpperCase();

        expect(map('', toUpperCase)).toStrictEqual('');
        expect(map('ab cd', toUpperCase)).toStrictEqual('AB CD');
    });
});

describe('avg', () => {
    test('avg of array', () => {
        expect(avg([0,1,2])).toBe(1);
    });

    test('avg of array of objects', () => {
        expect(avg([{x: 0}, {x: 1}, {x: 2}], 'x')).toBe(1);
    });
});

describe('sum', () => {
    test('sum of array', () => {
        expect(sum([0])).toBe(0);
        expect(sum([0,1,2])).toBe(3);
    });

    test('sum of array of objects', () => {
        expect(sum([{x: 0}, {x: 1}, {x: 2}], 'x')).toBe(3);
    });
});

describe('max', () => {
    test('max of array', () => {
        expect(max([0])).toBe(0);
        expect(max([0,3,1])).toBe(3);
    });

    test('max of array of objects', () => {
        expect(max([{x: 0}], 'x')).toBe(0);
        expect(max([{x: 0}, {x: 3}, {x: 1},], 'x')).toBe(3);
    });
});

describe('getIn', () => {
    const data = {x: {a: {one: 1, two: 2}, b: {three: 3}}, y: {}};

    test('', () => {
        expect(getIn(data, 'x')).toStrictEqual({a: {one: 1, two: 2}, b: {three: 3}});
        expect(getIn(data, 'y')).toStrictEqual({});
        expect(getIn(data, 'x', 'a')).toStrictEqual({one: 1, two: 2});
        expect(getIn(data, 'x', 'a', 'one')).toBe(1);
        expect(getIn(data, 'x', 'a', 'two')).toBe(2);
        expect(getIn(data, 'x', 'b', 'three')).toBe(3);
        expect(getIn(data, 'z')).toBe(undefined);
    });
});

describe('compose', () => {
    const inc = (n) => n + 1;
    const dec = (n) => n - 1;
    const sqr = (n) => Math.pow(n, 2);

    test('inc . dec = identity', () => {
        expect(compose(dec, inc)(1)).toBe(1);
    });

    test('sqr . inc', () => {
        expect(compose(inc, sqr)(3)).toBe(10);
    });

    test('inc . sqr', () => {
        expect(compose(sqr, inc)(3)).toBe(16);
    });
});

describe('pipe', () => {
    const inc = (n) => n + 1;
    const dec = (n) => n - 1;
    const sqr = (n) => Math.pow(n, 2);

    test('inc | dec = identity', () => {
        expect(pipe(dec, inc)(1)).toBe(1);
    });

    test('sqr . inc', () => {
        expect(pipe(sqr, inc)(3)).toBe(10);
    });

    test('inc . sqr', () => {
        expect(pipe(inc, sqr)(3)).toBe(16);
    });
});

describe('repeat', () => {
    const inc = (n) => n + 1;

    test('0 x repeat inc', () => {
        expect(repeat(0)(inc)(0)).toBe(0);
    });

    test('1 x repeat inc', () => {
        expect(repeat(1)(inc)(0)).toBe(1);
    });

    test('4 x repeat inc', () => {
        expect(repeat(4)(inc)(0)).toBe(4);
    });
});

describe('XF', () => {

    describe('A counter', () => {
        // setup
        xf.create({count: 0});

        xf.reg('count-set', (value, db) => {
            db.count = value;
        });
        xf.reg('count-inc', (_, db) => {
            db.count += 1;
        });
        xf.reg('count-dec', (_, db) => {
            db.count -= 1;
        });

        // use
        let count = 0;

        function countSub(value) {
            count = value;
        }

        const subId = xf.sub('db:count', countSub);

        test('init value', () => {
            expect(count).toBe(0);
        });

        test('inc value', () => {
            xf.dispatch('count-inc');
            expect(count).toBe(1);
        });

        test('dec value', () => {
            xf.dispatch('count-dec');
            expect(count).toBe(0);
        });

        test('set value', () => {
            xf.dispatch('count-set', 4);
            expect(count).toBe(4);
        });

        test('unsub', () => {
            xf.unsub('db:count', subId);
            xf.dispatch('count-set', 3);
            expect(count).toBe(4);
        });
    });
});

describe('nthBit', () => {
    test('get the nth bit from a bit field', () => {
        expect(nthBit(0b00000001, 0)).toBe(1);
        expect(nthBit(0b00000101, 2)).toBe(1);
        expect(nthBit(0b00010101, 4)).toBe(1);
        expect(nthBit(0b10010101, 6)).toBe(0);
        expect(nthBit(0b10010101, 7)).toBe(1);
    });
});

describe('bitToBool', () => {
    test('get the nth bit from a bit field', () => {
        expect(bitToBool(1)).toBe(true);
        expect(bitToBool(0)).toBe(false);
    });
});

describe('nthBitToBool', () => {
    test('get the nth bit from a bit field', () => {
        expect(nthBitToBool(0b00000001, 0)).toBe(true);
        expect(nthBitToBool(0b00000101, 2)).toBe(true);
        expect(nthBitToBool(0b00010101, 4)).toBe(true);
        expect(nthBitToBool(0b10010101, 6)).toBe(false);
        expect(nthBitToBool(0b10010101, 7)).toBe(true);
    });
});

describe('dataviewToArray', () => {
    let uint8 = new Uint8Array([164, 3, 84, 0]);
    let dataview = new DataView(uint8.buffer);

    test('dataview to js array', () => {
        expect(dataviewToArray(dataview)).toStrictEqual([164, 3, 84, 0]);
    });
});


describe('stringToCharCodes', () => {
    test('string to char codes', () => {
        expect(stringToCharCodes('Functions')).toStrictEqual([70, 117, 110, 99, 116, 105, 111, 110, 115]);
    });
});

//
// TextDecoder is not available in Jest, but if it was that's the function usage:
//
// describe('dataviewToString', () => {
//     let uint8 = new Uint8Array([70, 117, 110, 99, 116, 105, 111, 110, 115]);
//     let dataview = new DataView(uint8.buffer);
//
//     test('dataview to string', () => {
//         expect(dataviewToString(dataview)).toBe('Functions');
//     });
// });

describe('toUint8Array', () => {
    test('to Uint8Array (16)', () => {
        expect(dataviewToArray(toUint8Array(2**8, 16))).toStrictEqual([0, 1]);
    });

    test('to Uint8Array (32)', () => {
        expect(dataviewToArray(toUint8Array(2**24, 32))).toStrictEqual([0, 0, 0, 1]);
    });
});

describe('xor', () => {
    test('xor', () => {
        let uint8 = new Uint8Array([70, 117, 110, 99, 116, 105, 111, 110, 115]);
        let dataview = new DataView(uint8.buffer);

        expect(xor(dataview)).toBe(81);
    });
});

// describe('', () => {
//     test('', () => {
//         expect().toBe();
//     });
// });

