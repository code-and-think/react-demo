function* gen() {
  const arg1 = yield 111;
  console.log(arg1);
  try {
    yield 222;
  } catch (e) {
    console.log(e.message);
  }
  yield 333;
  console.log('已经 return 了，后面的没有机会执行');
}
const iteObj = gen();
iteObj.next();
// 相当于用这里的参数 “this is arg1” 去替换 yield 111，所以生成器函数内的代码相当于 const arg1 = "this is arg1"这样的赋值语句。
iteObj.next('this is arg1');
// 相当于用 throw new Error("surprise motherfucker") 去替换 yield 222，
// 所以生成器函数内的代码相当于 try { throw new Error("surprise motherfucker") } catch (e) { console.log(e.message); } 错误被 try/catch 所捕获
iteObj.throw(new Error('surprise motherfucker'));
// 相当于用 return  "已经结束嘞" 去替换 yield 333，所以生成器函数内的代码相当于 return "已经结束嘞"，相当于生成器函数提前结束所以 return 方法的返回值是 {value:"已经结束嘞",done:true} ，后面的 yield 就没有执行的机会了。
iteObj.return('已经结束嘞');
