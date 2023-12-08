async function a() {
  try {
   const t1 = await Promise.resolve('P');
   const t2 = await p();

   console.log(t1,t2);
  } catch (e) {
    console.log(e)
  }
}

async function p(){
  return new Promise((resolve,reject)=>{
    setTimeout(()=>{
      resolve('Boswell');
    },100);
  });
}

a();