/*
 * @Author: Cat9Yuko 
 * @Date: 2020-08-12 15:48:47 
 * @Last Modified by: Cat9Yuko
 * @Last Modified time: 2020-08-12 16:09:31
 */


 /* 
    前文说过, WeakMap应用的典型场景就是以DOM节点作为键名的场景. 下面是一个例子.
 */
let myElement = document.getElementById('logo');
let myWeakmap = new WeakMap();
myWeakmap.set(myElement, {timesClicked: 0});

myElement.addEventListener('click', function() {
    let logoData = myWeakmap.get(myElement);
    logoData.timesClicked++;
}, false);

/* 
    上面的代码中, myElement是一个DOM节点, 每当发生click事件就更新一下状态.我们将这个状态作为键值放在WeakMap里, 对应的键值名就是
    myElement.一旦这个DOM节点删除, 该状态就会自动消失, 不存在内存泄漏风险.
    进一步说, 注册监听事件的listener对象很适合用WeakMap来实现.
*/
const listener = new WeakMap();
listener.set(element1, handler1);
listener.set(element2, handler2);

element1.addEventListener('click', listener.get(element1), false);
element2.addEventListener('click', listener.get(element2), false);

// 上面的代码中, 监听函数放在WeakMap里面. 一旦DOM对象消失, 与它绑定的监听函数也会自动消失.
// WeakMap的另一个用处是部署私有属性.
const _counter = new WeakMap();
const _action = new WeakMap();

class Countdown {
    constructor(counter, action) {
        _counter.set(this, counter);
        _action.set(this, action);
    }
    dec() {
        let counter = _counter.get(this);
        if(counter < 1) return;
        counter--;
        _counter.set(this, counter);
        if(counter === 0) {
            _action.get(this)();
        }
    }
}
const c = new Countdown(2, () => console.log('DONE'));
c.dec()
c.dec()
// DONE
// 上面的代码中, Countdown类的两个内部属性————_counter 和_action————是实例的弱引用, 如果删除实例, 它们也会随之消失, 不会造成内存泄漏.