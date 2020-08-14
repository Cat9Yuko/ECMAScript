/*
 * @Author: Cat9Yuko 
 * @Date: 2020-08-14 10:19:43 
 * @Last Modified by: Cat9Yuko
 * @Last Modified time: 2020-08-14 11:02:31
 */



//  isExtensible方法拦截Object.isExtensible操作
var p = new Proxy({}, {
    isExtensible: function (target) { 
        console.log("called");
        return true;
    }
});
Object.isExtensible(p)
// "called"
// true

// 上面的代码设置了isExtensible方法, 在调用Object.isExtensible时会输出called.
// 注意, 以上方法只能返回布尔值, 否则返回值会被自动转为布尔值.
// 这个方法有一个强限制, 它的返回值必须与目标对象的isExtensible属性保持一致, 否则就会抛出错误.
Object.isExtensible(proxy) === Object.isExtensible(target)

// 下面是一个例子.
var p = new Proxy({}, {
    isExtensible: function (target) { 
        return false;
    }
});
Object.isExtensible(p);
// TypeError: 'isExtensible' on proxy: trap result does not reflect extensibility of proxy target (which is 'true')
