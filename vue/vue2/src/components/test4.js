export default {
  functional:true,
  render(h,c){
    console.log('functional component',c);
    return h('h1',{},'test4');
  }
};
