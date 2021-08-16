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

    // async
    delay,

    // events
    xf,

    // bits

    dataviewToArray,
    dataviewToString,
    nthBit,
    bitToBool,
    nthBitToBool,
    fromUint16,
    fromUint32,
    toUint8Array,
    xor,
} from '../src/functions.js';

describe('Exists', () => {
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
    describe('does not exist', () => {
        test('with Null', () => {
            expect(exists(null)).toBe(false);
        });
        test('with Undefined', () => {
            expect(exists(undefined)).toBe(false);
        });
    });

    describe('exists', () => {
        test('with Collection', () => {
            expect(exists({})).toBe(true);
            expect(exists([])).toBe(true);
            expect(exists("")).toBe(true);
            expect(exists(new Uint8Array([]))).toBe(true);
        });
        test('with Number', () => {
            expect(exists(0)).toBe(true);
        });
        test('with Boolean', () => {
            expect(exists(true)).toBe(true);
            expect(exists(false)).toBe(true);
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
    describe('works non-empty Collection or String', () => {
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

    describe('empty Collection or String is undefined', () => {
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


describe('map', () => {
    const inc = (n) => n + 1;

    test('map an Array', () => {
        expect(map([0,1,2,3], inc)).toStrictEqual([1,2,3,4]);
    });

    test('map an Object', () => {
        expect(map({x: 0, y: 1, z: 2}, inc)).toStrictEqual({x: 1, y: 2, z: 3});
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

// describe('compose', () => {
//     test('', () => {
//         expect().toBe();
//     });
// });

// describe('pipe', () => {
//     test('', () => {
//         expect().toBe();
//     });
// });

// describe('repeat', () => {
//     test('', () => {
//         expect().toBe();
//     });
// });

// describe('', () => {
//     test('', () => {
//         expect().toBe();
//     });
// });
