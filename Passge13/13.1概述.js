/*
 * @Author: Cat9Yuko 
 * @Date: 2020-08-14 15:34:57 
 * @Last Modified by: Cat9Yuko
 * @Last Modified time: 2020-08-17 09:18:14
 */



/* 
   Reflect对象与Proxy对象一样, 也是ES6为了操作对象而提供的新的API.Reflect对象的设计目的有以下几个.
   1.将Object对象的一些明显属于语言内部的方法(比如Object.defineProperty)放到Reflect对象上. 现阶段, 
   某些方法同时在Object和Reflect对象上部署, 未来的新方法将只在Reflect对象上部署. 
   也就是说, 从Reflect对象上可以获得语言内部的方法.
   2.修改某些Object方法的返回结果, 让其变得更合理. 比如, Object.defineProperty(obj, name, desc) 在无法定义属性时会抛出一个错误, 
   Reflect.defineProperty(obj, name, desc) 则会返回false.
*/

//  旧写法 
try {
    Object.defineProperty(target, property, attributes);
    // success
} catch (e) {
    // failure
}

// 新写法
if (Reflect.defineProperty(target, property, attributes)) {
    // success
} else {
    // failure
}
/* 3.让Object操作都变成函数行为. 某些Object操作时命令式, 比如name in obj 和delete obj[name], 而Reflect.has(obj, name)
    和 Reflect.deleteProperty(obj, name)让它们变成了函数行为. */

// 旧写法
'assign' in Object // true

// 新写法
Reflect.has(Object, 'assign') // true

/* 4.Reflect对象的方法与Proxy对象的方法一一对应, 只要是Proxy对象方法, 就能在Reflect对象上找到对应的方法. 
这就使Proxy对象可以方便地调用对应的Reflect方法来完成默认行为, 作为修改行为的基础. 
也就是说, 无论Proxy怎么修改默认行为, 我们总可以在Reflect上获取默认行为.  
*/
Proxy(target, {
    set: function (target, name, value, receiver) {
        var success = Reflect.set(target, name, value, receiver);
        if (success) {
            log('property ' + name + ' on ' + target + ' set to ' + value);
        }
        return success;
    }
});

// 上面的代码中, Proxy方法拦截target对象的属性赋值行为. 它采用Reflect.set方法将值赋给对象的属性, 确保完成原有的行为, 然后再部署额外的功能.
// 下面是另一个例子.

var loggedObj = new Proxy(obj, {
    get(target, name) {
        console.log('get', target, name);
        return Reflect.get(target, name);
    },
    deleteProperty(target, name) {
        console.log('delete' + name);
        return Reflect.deleteProperty(target, name);
    },
    has(target, name) {
        console.log('has' + name);
        return Reflect.has(target, name);
    }
});

// 上面的代码中, 每一个Proxy对象的拦截操作(get、delete、has) 内部都调用对应的Reflect方法, 保证原生行为能够正常执行. 添加的工作就是将每一个操作输出一行日志.
// Reflect对象以后, 很多操作会更易懂.

// 旧写法
Function.prototype.apply.call(Math.floor, undefined, [1.75]) // 1

// 新写法
Reflect.apply(Math.floor, undefined, [1.75]) // 1