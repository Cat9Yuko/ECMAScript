/*
 * @Author: Cat9Yuko 
 * @Date: 2020-06-12 10:21:59 
 * @Last Modified by: Cat9Yuko
 * @Last Modified time: 2020-06-12 10:45:12
 */


 /* 
    数组实例的copyWithin方法会在当前数组内部将指定位置的成员复制到其他位置(会覆盖原有成员), 然后返回当前数组.
    也就是说, 使用这个方法会修改当前数组.
 */
Array.prototype.copyWithin(target, start = 0, end = this.length);
/* 
    它接受3个参数.
    target(必选): 从该位置开始替换数据.
    start(可选): 从该位置开始读取数据, 默认为0. 如果为负值, 表示倒数.
    end(可选): 到该位置前停止读取数据, 默认等于数组长度. 如果为负值, 表示倒数.
    这3个参数都应该是数值, 如果不是, 会自动转为数值.
*/
[1, 2, 3, 4, 5].copyWithin(0, 3)
// [4, 5, 3, 4, 5]

// 上面的代码表示, 将从3号位置直到数组结束的成员(4和5)复制到从0号位置开始的位置, 结果覆盖了原来的1和2.
// 下面是更多例子.

// 将3号位复制到0号位
[1, 2, 3, 4, 5].copyWithin(0, 3, 4)
// [4, 2, 3, 4, 5]

// -2相当于3号位, -1相当于4号位
[1, 2, 3, 4, 5].copyWithin(0, -2, -1)
// [4, 2, 3, 4, 5]

// 将3号位复制到0号位
([].copyWithin.call({length: 5, 3: 1}, 0, 3))
// {0:1, 3: 1, length: 5}

// 将2号位到数组结束, 复制到0号位
var i32a = new Int32Array([1, 2, 3, 4, 5]);
i32a.copyWithin(0, 2);
// Int32Array[3, 4, 5, 4, 5]

// 对于没有部署TypedArray的copyWithin方法的平台
// 需要采用下面的写法
[].copyWithin.call(new Int32Array([1, 2, 3, 4, 5]), 3, 4);
// Int32Array [4, 2, 3, 4, 5]