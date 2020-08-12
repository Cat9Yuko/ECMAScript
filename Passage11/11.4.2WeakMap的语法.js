/*
 * @Author: Cat9Yuko 
 * @Date: 2020-08-12 15:36:49 
 * @Last Modified by: Cat9Yuko
 * @Last Modified time: 2020-08-12 15:42:43
 */



 /* 
    WeakMap与Map在API上的区别只要有两个.一是没有遍历操作(即没有key()、values()和entries()方法), 也没有size属性. 因为没有办法列出所有键名, 某个键名
    是否存在完全不可预测, 和垃圾回收机制是否运行相关. 这一刻可以取到键名, 下一刻垃圾回收机制突然运行, 这个键名就消失了, 为了防止出现不确定性, 因此统一规定不能取到键名.
    二是无法清空, 即不支持clear方法. 因此, WeakMap只有4个方法可用: get()、set()、has()、delete().
    */
   const wm = new WeakMap();
//    size、forEach、clear方法都不存在
wm.size // undefined
wm.forEach // undefined
wm.clear // undefined