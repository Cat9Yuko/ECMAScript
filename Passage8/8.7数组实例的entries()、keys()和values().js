/*
 * @Author: Cat9Yuko 
 * @Date: 2020-06-12 13:59:47 
 * @Last Modified by: Cat9Yuko
 * @Last Modified time: 2020-06-12 14:11:10
 */


//  ES6提供了3个新方法————entries()、keys()和values()————用于遍历数组.它们都返回一个遍历器对象, 可用for...of循环遍历, 唯一的区别在于, keys()是对键名的遍历,values()是对键值的遍历, entries()是对键值对的遍历.
for(let index of ['a','b'].keys()) {
    console.log(index)
}
/* 
0
1 */

for(let elem of ['a','b'].values()) {
    console.log(elem)
}
/* 
a
b */

for(let [index, elem] of ['a', 'b'].entries()) {
    console.log(index, elem)
} 
/* 
0 a
1 b */

// 如果不适用for...of循环, 可以手动调用遍历器对象的next方法进行遍历.
let letter = ['a', 'b', 'c'];
let entries = letter.entries();
console.log(entries.next().value); 
console.log(entries.next().value); 
console.log(entries.next().value); 
/* 
[ 0, 'a' ]
[ 1, 'b' ]
[ 2, 'c' ] */
