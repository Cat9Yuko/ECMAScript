/*
 * @Author: Cat9Yuko 
 * @Date: 2020-11-04 10:28:54 
 * @Last Modified by: Cat9Yuko
 * @Last Modified time: 2020-11-04 11:07:06
 */


//  Class的实例属性可以用等式写入类的定义之中.
class MyClass {
    myProp = 42;
    constructor() {
        console.log(this.myProp);
        // 42
    }
}
// 上面的代码中, myProp就是MyClass的实例属性. 在MyClass的实例上可以读取这个属性.
// 以前, 我们定义实例属性时只能写在类的constructor方法里面.

class ReactCounter extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            count: 0
        };
    }
}

// 上面的代码中, 构造方法constructor中定义了this.state属性.
// 有了新的写法以后, 可以不在constructor方法里面定义.
class ReactCounter extends React.Component {
    state = {
        count: 0
    };
}
// 这种写法比以前更清晰.
// 为了获得更强的可读性, 对于那些在constructor里面已经定义的实例属性, 新写法允许直接列出.

class ReactCounter extends React.Component {
    state;
    constructor(props) {
        super(props);
        this.state = {
            count: 0
        };
    }
}
