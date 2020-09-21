/*
 * @Author: Cat9Yuko 
 * @Date: 2020-09-21 14:44:01 
 * @Last Modified by: Cat9Yuko
 * @Last Modified time: 2020-09-21 14:57:17
 */



//  类似数组的对象包括好几类. 下面是for...of循环用于字符串、DOMNodeList对象、arguments对象的例子.
// 字符串
let str = "hello";
for(let s of str) {
    console.log(s);
    // h e l l o
}

// DOMNodeList对象
let paras = document.querySelectorAll("p");
for(let p of paras) {
    p.classList.add("test");
}

// arguments对象
function printArgs() {
    for(let x of arguments) {
        console.log(x);
    }
}
printArgs('a', 'b');
// 'a'
// 'b'

// 对于字符串来说, for...of循环还有一个特点, 就是可以正确识别32位UTF-16字符.
for(let x of 'a\uD83D\uDC0A') {
    console.log(x);
}
// a
// 🐊

// 并不是所有类似数组的对象都具有Iterator接口, 一个简单的解决方法就是使用Array.from方法将其转为数组.
let arrayLike = { length: 2, 0: 'a', 1: 'b' };
// 报错
for(let x of arrayLike) {
    console.log(x);
    // TypeError: arrayLike is not iterable
}

// 正确
for(let x of Array.from(arrayLike)) {
    console.log(x);
}