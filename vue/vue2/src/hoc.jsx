/**
 * 创建高阶组件的原理：将一个组件进行包装，每个组件都拥有高阶组件的复用过来的能力，同时，对高阶组件的props，listeners,slot操作都可以被穿透给原始组件，同时原始组件不会被修改；
 * 
 * 解决方案： https://github.com/jackmellis/vue-hoc
 * @param {*} WrappedComponent 
 * @returns 
 */
export default function WithConsole(WrappedComponent) {
  return {
    mounted() {
      console.log('I have already mounted')
    },
    props: WrappedComponent.props,
    render(h) {
      const slots = Object.keys(this.$slots)
        .reduce((arr, key) => arr.concat(this.$slots[key]), [])
        .map(vnode => {
          vnode.context = this._self
          return vnode
        })

      return h(WrappedComponent, {
        on: this.$listeners,
        props: this.$props,
        scopedSlots: this.$scopedSlots,
        attrs: this.$attrs
      }, slots);
    }
  };
}