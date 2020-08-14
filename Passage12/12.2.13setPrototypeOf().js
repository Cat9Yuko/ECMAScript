/*
 * @Author: Cat9Yuko 
 * @Date: 2020-08-14 11:54:18 
 * @Last Modified by: Cat9Yuko
 * @Last Modified time: 2020-08-14 13:41:26
 */



//  setPrototypeOf方法主要用于拦截Object.setPrototypeOf方法.
// 下面是一个例子
var handler = {
    setPrototype(target, proto) {
        throw new Error('Changing the prototype is forbidden');
    }
};
var proto = {};
var target = function () {  };
var proxy = new Proxy(target, handler);
console.log(Object.setPrototypeOf(proxy, proto));

// Error: changing the prototype is forbidden
// 上面的代码中, 只要修改target的原型对象就会报错.
/* 
    注意!
        该方法只能返回布尔值, 否则会被自动转为布尔值. 另外, 如果目标对象不可扩展(extensible), setPrototypeOf方法不得改变目标对象的原型. 
*/
