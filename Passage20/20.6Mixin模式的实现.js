/*
 * @Author: Cat9Yuko 
 * @Date: 2020-11-09 14:50:46 
 * @Last Modified by: Cat9Yuko
 * @Last Modified time: 2020-11-09 14:56:39
 */


//  Mixin模式指的是将多个类的接口 "混入" (mix in) 另一个类, 在ES6中实现如下.
function mix(...mixin) {
    class Mix {}
    for (const mixin of mixins) {
        copyProperties(Mix, mixin);
        copyProperties(Mix.prototype, mixin.prototype);
    }
    return Mix;
}

function copyProperties(target, source) {
    for (const key of Reflect.ownKeys(source)) {
        if (key !== "constructor" && key !== "prototype" && key !== "name") {
            let desc = Object.getOwnPropertyDescriptor(source, key);
            Object.defineProperty(target, key, desc);
        }
    }
}
// 上面代码中的mix函数可以将多个对象合成为一个类. 使用的时候, 只要继承这个类即可.
class DistributedEdit extends mix(Loggable, Serializable) {
    // ...
}