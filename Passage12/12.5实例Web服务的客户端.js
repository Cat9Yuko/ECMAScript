/*
 * @Author: Cat9Yuko 
 * @Date: 2020-08-14 15:16:53 
 * @Last Modified by: Cat9Yuko
 * @Last Modified time: 2020-08-14 15:25:22
 */



//  Proxy对象可以拦截目标对象的任意属性, 这使得它很适合适用来编写Web服务的客户端.
const service = createWebService('http://example.com/data');

service.employees().then(json => {
    const employees = JSON.parse(json);
    // ...
});

// 上面的代码新建了一个Web服务的接口, 这个接口返回各种数据. Proxy可以拦截这个对象的任意属性, 所以不用为每一种数据写一个适配方法, 只要写一个Proxy拦截即可.
function createWebService(baseUrl) {
    return new Proxy({}, {
        get(target, propKey, receiver) {
            return () => httpGet(baseUrl+ '/' + propKey);
        }
    });
}
// 同理, Proxy也可以用来实现数据库的ORM层.