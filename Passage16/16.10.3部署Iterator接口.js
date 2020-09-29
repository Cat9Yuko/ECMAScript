/*
 * @Author: Cat9Yuko 
 * @Date: 2020-09-28 15:58:16 
 * @Last Modified by: Cat9Yuko
 * @Last Modified time: 2020-09-29 11:29:09
 */


//  利用Generator函数可以在任意对象上部署Iterator接口.
function* iterEntries(obj) {
    let keys = Object.keys(obj);
    for (let i = 0; i < keys.length; i++) {
        let key = keys[i];
        yield [key, obj[key]]
    }
}
let myObj = { foo: 3, bar: 7};
for(let [key, value] of iterEntries(myObj)) {
    console.log(key, value);
}
// foo 3
// foo 7


// 上述代码中, myObj是一个普通对象, 通过iterEntries函数就有了Iterator接口. 也就是说, 可以在任意对象上部署next方法.
// 下面是一个对数组部署Iterator接口的例子, 尽管数组原生具有这个接口.
function* makeSimpleGenerator(array) {
    var nextIndex = 0;
    while(nextIndex < array.length){
        yield array[nextIndex++];
    }
}

var gen = makeSimpleGenerator(['yo', 'ya']);
gen.next().value 
gen.next().value 
gen.next().done