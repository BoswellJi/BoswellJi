## 组件中响应式对象

* vue重写对象的getter,setter导致重写属性调用栈变长；
* 不该作为响应式对象的不要放到data中；

## v-if v-show

* v-if每次切换都会重新渲染；