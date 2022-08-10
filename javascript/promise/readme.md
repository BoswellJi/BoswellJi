* catch
  + 与try , catch中的catch相同，当promise中状态失败，紧接着的then不会被调用，只会调用后面的catch，来捕获异常；

  
``` 
  new Promise(function(reslove,reject){
    reslove()
  }).then(data=>{ 
    console.log(data1);
  }).then(()=>{
    console.log('异常，所以不会继续执行')
  }).catch((err)=>{
    console.log('捕获异常'+err)
  }).then(()=>{
    console.log('捕获异常,可以正常执行')
  })

  同等

  try{
    const a=b=1;
    console.log(a+c);
    console.log('异常，这里不会打印');
  }catch(err){
    console.log('捕获了异常，这里会打印，下面的代码也会继续进行的');
  }
  console.log('异常被捕获，没有引起引擎挂掉，所以正常执行');
  ```

## 四个组合器

* Promise.allSettled()
  - 不会短路

* Promise.all()
  - 会短路，当一个Promise失败的时候；

* Promise.race()
  - 会短路，当输入是一个有状态Promise的时候，`即Promise稳定了settld`；

* Promise.any() 
  - 会短路,当一个Promise完成的时候；