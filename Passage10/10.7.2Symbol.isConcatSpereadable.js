/*
 * @Author: Cat9Yuko 
 * @Date: 2020-08-04 16:25:51 
 * @Last Modified by: Cat9Yuko
 * @Last Modified time: 2020-08-04 16:41:53
 */



//  对象的Symbol.isConcatSpreadable属性等于一个布尔值, 表示该对象使用Array.prototype.concat()时是否可以展开.
let arr1 = ['c', 'd'];
console.log(['a', 'b'].concat(arr1, 'e'));
// [ 'a', 'b', 'c', 'd', 'e' ]
console.log(arr1[Symbol.isConcatSpreadable]);
// undefined

let arr2 = ['c', 'd'];
arr2[Symbol.isConcatSpreadable] == false;
console.log(['a', 'b'].concat(arr2, 'e'));
// [ 'a', 'b', 'c', 'd', 'e' ]

// 上面的代码说明, 数组的默认行为是可以展开的. Symbol.isConcatSpreadable属性等于true或undefined, 都有这个效果.
// 类似数组的对象也可以用展开, 但它的 Symbol.isConcatSpreadable属性默认为false, 必须手动打开.

let obj = {lefgth: 2, 0: 'c', 1: 'd'};
console.log(['a', 'b'].concat(obj, 'e'));
// [ 'a', 'b', { '0': 'c', '1': 'd', lefgth: 2 }, 'e' ]

obj[Symbol.isConcatSpreadable] = true;
console.log(['a', 'b'].concat(obj, 'e'));
// [ 'a', 'b', 'e' ]

// 对于一个类而言, Symbol.isConcatSpreadable属性必须写成实例的属性.
class A1 extends Array {
    constructor(args) {
        super(args);
        this[Symbol.isConcatSpreadable] = true;
    }
}

class A2 extends Array {
    constructor(args) {
        super(args);
        this[Symbol.isConcatSpreadable] = false;
    }
}


let a1 = new A1();
a1[0] = 3;
a1[1] = 4;
let a2 = new A2();
a2[0] = 5;
a2[1] = 6;
console.log([1, 2].concat(a1).concat(a2));
/* 
[
  1,
  2,
  3,
  4,
  A2(2) [ 5, 6, [Symbol(Symbol.isConcatSpreadable)]: false ]
]
*/