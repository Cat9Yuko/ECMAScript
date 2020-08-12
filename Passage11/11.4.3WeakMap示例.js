/*
 * @Author: Cat9Yuko 
 * @Date: 2020-08-12 15:43:16 
 * @Last Modified by: Cat9Yuko
 * @Last Modified time: 2020-08-12 15:48:23
 */


//  WeakMap的例子很难演示, 因为无法观察它里面的引用自动消失. 此时, 其他引用都已解除, 已经没有引用指向WeakMap的键名, 导致无法证实键名是不是存在.
/* 
    提示!
        如果引用所指向的值占用特别多的内存, 就可以通过Node的process.memoryUsage方法看出来.
        根据以上思路, 网友vtxf补充了下面的例子.
*/