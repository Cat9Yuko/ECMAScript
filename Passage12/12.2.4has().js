/*
 * @Author: Cat9Yuko 
 * @Date: 2020-08-13 15:31:54 
 * @Last Modified by: Cat9Yuko
 * @Last Modified time: 2020-08-13 18:13:29
 */



//  has 方法用来拦截HasProperty操作, 即判断对象是否具有某个属性时, 这个方法会生效. 典型的操作就是in运算符.
// 下面的例子使用has方法隐藏了某些属性, 使其不被in运算符发现.
var handler = {
    has(target, key) {
        if(key[0] === '_') {
            return false;
        }
        return key in target;
    }
};
var target = { _prop: 'foo', prop: 'foo' };
var proxy = new Proxy(target, handler);
'_prop' in  proxy // false
// 上面代码中, 如果原对象的属性名的第一个字符是下画线, proxy.has就会返回false, 从而不会被in运算符发现.
// 如果原对象不可配置或者禁止扩展, name这时has拦截会报错.
var obj = {a: 10};
Object.preventExtensions(obj);
var p = new Proxy(obj, {
    has: function(target, prop) {
        return false;
    }
});
'a' in p
// TypeError: 'has' on proxy: trap returned falsish for property 'a' but the proxy target is not extensible
// 上面的代码中, obj对象禁止扩展, 结果使用has拦截就会报错. 也就是说, 如果某个属性不可配置(或者目标对象不可扩展), 则has方法就不得 "隐藏"(即返回false)目标对象的该属性.
/* 
    注意!
        has方法拦截的是HasProperty操作, 而不是HasOwnProperty操作, 即has方法不判断一个属性是对象自身的属性还是集成的属性.
*/
// 另外, 虽然for...in循环也用到了in运算符, 但是has拦截对for...in循环不生效.
let stu1 = {name: '张三', score: 59};
let stu2 = {name: '李四', score: 59};

let handler = {
    has(target, prop) {
        if(prop === 'score' && target[prop] < 60) {
            console.log(`${target.name} 不及格`);
            return false;
        }
        return prop in target;
    }
}

let oproxy1 = new Proxy(stu1, handler);
let oproxy2 = new Proxy(stu2, handler);

'score' in oproxy1
// 张三 不及格
// false

'score' in oproxy2
// 李四 不及格

for(let a in oproxy1) {
    console.log(oproxy1[a]);
}
// 张三
// 59

for(let b in oproxy2) {
    console.log(oproxy2[b]);
}
// 李四
// 99

// 上面的代码中 has拦截只对in循环生效, 对for...in循环不生效, 导致不符合要求的属性没有被排除在for...in循环之外.