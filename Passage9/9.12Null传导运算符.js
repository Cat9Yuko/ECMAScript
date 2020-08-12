/*
 * @Author: Cat9Yuko 
 * @Date: 2020-08-03 10:28:34 
 * @Last Modified by: Cat9Yuko
 * @Last Modified time: 2020-08-03 10:37:09
 */


//  编程实务中, 如果读取对象内部的某个属性, 往往需要判断该对象是否存在. 比如, 要读取message.body.user.firstName, 安全的写法如下.

const firstName = (message
    && message.body
    && message.body.user
    && message.body.user.firstName) || 'default';

    const firstName = message?.body?.user?.firstName || 'default';

    // 上面的代码有3个?.运算符, 只要其中一个返回null或undefined, 就不再继续运算, 而是返回undefined.
    
    /* 
    "Null传导运算符" 有4种用法.
    obj?.prop: 读取对象属性
    obj?.[expr]:同上
    func?.(...args): 函数或对象方法的调用
    new C?.(...args): 构造函数的调用

    */
   
