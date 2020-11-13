/*
 * @Author: Cat9Yuko 
 * @Date: 2020-11-13 09:08:02 
 * @Last Modified by: Cat9Yuko
 * @Last Modified time: 2020-11-13 09:51:53
 */


//  注意区分Object和Map, 只有模拟实体对象时才使用Object. 如果只需要key:value的数据结构, 则使用Map. 因为Map有内建的遍历机制.
let map = new Map(arr);

for (let key of map.keys()) {
    console.log(key);
}

for(let value of map.values()){
    console.log(value);
}

for(let item of map.entries()){
    console.log(item[0], item[1]);
}