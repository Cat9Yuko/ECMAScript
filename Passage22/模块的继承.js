/*
 * @Author: Cat9Yuko 
 * @Date: 2020-11-10 16:43:31 
 * @Last Modified by: Cat9Yuko
 * @Last Modified time: 2020-11-10 16:48:50
 */


//  模块之间可以继承.
// 假设有一个circleplus模块继承了circle模块.
export * from './circle.js';
export var e = 2.12412412124124;
export default function (x) {
    return Math.exp(x);
}
export {
    area as circleArea
}
from './circle.js'

/* 注意!
    export *命令会忽略cirlce模块的default方法. 之后, 又输出了自定义的e遍历和默认方法. */