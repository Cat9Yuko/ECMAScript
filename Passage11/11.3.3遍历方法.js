/*
 * @Author: Cat9Yuko 
 * @Date: 2020-08-12 09:58:45 
 * @Last Modified by: Cat9Yuko
 * @Last Modified time: 2020-08-12 10:41:08
 */


//  Map原生提供了3个遍历器生成函数和1个遍历方法.
// keys(): 返回键名的遍历器.
// values(): 返回键值的遍历器.
// entries(): 返回所有成员的遍历器.
// forEach(): 遍历Map的所有成员.
// 需要特别注意的是, Map的遍历顺序就是插入顺序.
const map = new Map([
    ['F', 'no'],
    ['T', 'yes'],
]);
for(let key of map.keys()) {
    console.log(key);
}

// "F"
// "T"
for(let value of map.values()) {
    console.log(value);
}

// "no"
// "yes"

for(let item of map.entries()) {
    console.log(item[0], item[1]);
}
// "F" "no"
// "T" "yes"

// 或者
for(let [key, value] of map.entries()) {
    console.log(key, value);
}

// 等同于使用map.entries()
for(let [key, value] of map) {
    console.log(key, value);
}

// 上面代码中最后的例子表示, Map结构的默认遍历器接口(Symbol.iterator属性) 就是entries方法.
map[Symbol.iterator] === map.entries

// true
// Map结构转为数组结构的比较快速的方法是结合扩展运算符(...).
const map = new Map([
    [1,'one'],
    [2,'two'],
    [3,'three'],
]);

console.log([...map.keys()]);
// [ 1, 2, 3 ]

console.log([...map.values()]);
// [ 'one', 'two', 'three' ]

console.log([...map.entries()]);
// [ [ 1, 'one' ], [ 2, 'two' ], [ 3, 'three' ] ]
console.log([...map]);
// [ [ 1, 'one' ], [ 2, 'two' ], [ 3, 'three' ] ]

// 结合数组的map方法、可以实现Map的遍历和过滤(Map本身没有map和filter方法).

const map0 = new Map()
    .set(1, 'a')
    .set(2, 'b')
    .set(3, 'c');

const map1 = new Map(
    [...map0].filter(([key, v]) => k < 3)
);
// 产生Map结构{1 => 'a', 2 => 'b'}

const map2 = new Map(
    [...map0].map(([k, v]) => [k * 2, '_' + v])
);
// 产生Map结构{2 => '_a', 4 => '_b', 6 => '_c'}
// 此外, Map还有一个forEach方法, 与数组的forEach方法类似, 也可以实现遍历.
map.forEach(function(value, key, map) {
    console.log("key: %s, value: %s", key, value);
});

// forEach方法还可以接受第二个参数, 用于绑定this.
const reporter = {
    report: function(key, value) {
        console.log("Key: %s, Value: %s", key, value);
    }
};

map.forEach(function(value, key, map) {
    this.report(key, value);
}, reporter);

// 上面的代码中, forEach方法的回调函数的this就指向reporter.