/*
 * @Author: Cat9Yuko 
 * @Date: 2020-11-05 14:15:30 
 * @Last Modified by: Cat9Yuko
 * @Last Modified time: 2020-11-05 14:16:40
 */


//  Object.getPrototypeOf方法可以用来从子类上获取父类.
Object.getPrototypeOf(ColorPoint) === Point
// true
// 因此, 可以使用这个方法判断一个类是否继承了另一个类.