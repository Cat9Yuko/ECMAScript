/*
 * @Author: Cat9Yuko 
 * @Date: 2020-09-28 10:58:20 
 * @Last Modified by: Cat9Yuko
 * @Last Modified time: 2020-09-28 11:03:37
 */



//  如果一个对象的属性是Generator函数, 那么可以加您写成下面的形式.
let obj = {
    * myGeneratorMethod() {
        // ...
    }
}
// 上面的代码中, myGeneratorMethod属性前面有一个星号, 表示这个属性是一个Generator函数.
// 其完整形式如下, 与上面的写法是等价的.
let obj = {
    myGeneratorMethod: function* () {
        // ...
    }
}