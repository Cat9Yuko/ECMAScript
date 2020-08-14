/*
 * @Author: Cat9Yuko 
 * @Date: 2020-08-14 11:46:38 
 * @Last Modified by: Cat9Yuko
 * @Last Modified time: 2020-08-14 11:53:40
 */



// preventExtensions方法拦截Object.preventExtensions().该方法必须返回一个布尔值, 否则会被自动转为布尔值.
var p = new Proxy({}, {
    preventExtensions: function (target) { 
        return true;
     }
});
Object.preventExtensions(p)
// TypeError: 'preventExtensions' on proxy: trap returned truish but the proxy target is extensible
// 上面的代码中, proxy.preventExtensions方法返回true, 但此时Object.isExtensible(proxy)会返回true, 因此报错.
// 为了防止出现这个问题, 通常要在proxy.preventExtensions方法中调用一次Object.preventExtensions, 代码如下.

var p = new Proxy({}, {
    preventExtensions: function (target) { 
        console.log('called');
        Object.preventExtensions(target);
        return true;
     }
});
Object.preventExtensions(p)
// "called"
// true
