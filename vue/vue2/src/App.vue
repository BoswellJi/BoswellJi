<template>
  <transition name="v" appear>
    <div>
      tranistion: enter enter-active enter-to, leave leave-active leave-to
      <div>路由器组件的transition组件使用</div>
      <transition name="v" appear>
        <router-view></router-view>
      </transition>
      <div>
        路由导航
        <a href="#/a/jmzc1">test3</a>
        <a href="#/b">test2</a>
        <a href="#/c/20/d/Boswell">test4</a>
      </div>

      <div>元素列表的transition组件使用</div>
      <transition-group name="list" tag="p">
        <span
          v-for="(item, index) in items"
          :key="index"
          :data-index="index"
          class="list-item"
        >
          {{ item }}
        </span>
      </transition-group>
      <button v-on:click="add">Add</button>
      <button v-on:click="remove">Remove</button>

      <div>异步组件的transition组件使用</div>
      <transition name="v" appear>
        <async-comp></async-comp>
      </transition>

      <div>动态组件的transition组件使用</div>
      <transition name="v" appear>
        <component :is="compName"></component>
      </transition>
      <button v-on:click="compName = compName === 'test' ? 'test1' : 'test'">
        切换组件
      </button>

      <div>元素之间的过度</div>
      <transition name="v" appear mode="out-in">
        <div v-if="testIndex === 1" key="6">1</div>
        <div v-else key="2">2</div>
      </transition>
      <button v-on:click="testIndex = testIndex === 1 ? 2 : 1">
        改变testIndex的值
      </button>

      <div>
        <test @testClickHandle="appClickhandle"></test>
      </div>
      <div>
        <test1 @test1ClickHandle="test1ClickHandle">
          <template v-slot:default="slotProps">
            default slot content<br />
            user:{{ slotProps.user.name }}<br />
            person:{{ slotProps.person.name }}<br />
          </template>
          <template v-slot:header="slotProps">
            {{ slotProps }}
          </template>
        </test1>
      </div>
      <div>test4: <test4></test4></div>
      <div>async-exampl：<async-example></async-example></div>
      <div @click="test1ClickHandle">
        <div>state:{{ $store.state.age }}</div>
        <div>getterAge:{{ getterAge }}</div>
        <div>mod1Name：{{ mod1Name }}</div>
        <div>mod1NameCopy:{{ mod1NameCopy }}</div>
        <div>getterMod1Name:{{ getterMod1Name }}</div>
      </div>
      <comp1 :msg="testIndex"></comp1>

      <treeselect v-model="value" :multiple="false" :options="options" />
    </div>
  </transition>
</template>

<script>
import test from "./components/Test";
import test1 from "./components/test1";
import test4 from "./components/test4";
import hoc from "./hoc.js";
import { createHOC } from "vue-hoc";
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";

const options = {
  created() {
    console.log("Created", "createHOC");
  },
};

export default {
  name: "App",
  components: {
    Treeselect,
    testHoc: hoc(test),
    test: createHOC(test, options),
    test1: createHOC(test1, options),
    test4,
    asyncComp: () => ({
      component: import("./components/async-comp"),
    }),
    Comp1: {
      props: {
        msg: Number,
      },
      render(h) {
        console.log("comp1 render");
        return h("div", {}, "comp1");
      },
    },
  },
  mounted() {
    // 这里有一个任务更新队列的问题,所以是有顺序的
    this.$nextTick(function () {
      const dom = document.querySelector("#text");
    });
    this.$store.state.name;
    console.log(process.env.NODE_ENV,'process.env.NODE_ENV');
  },
  computed: {
    ...mapGetters(["getterAge"]),
    ...mapGetters({
      getterMod1Name: "mod1/getterMod1Name",
    }),
    ...mapState({
      mod1Name: (state) => state.mod1.mod1Name,
    }),
    ...mapState({
      mod1NameCopy: (state) => state.mod1.mod1Name,
    }),
  },
  data() {
    return {
      text: "sync",
      name: "Boswell",
      age: 21,
      items: [1, 2, 2, 3, 4],
      nextNum: 10,
      compName: "test",
      testIndex: 0,

      value: null,
      options: [
        {
          id: "a",
          label: "a",
          children: [
            {
              id: "aa",
              label: "aa",
            },
            {
              id: "ab",
              label: "ab",
              children:[
                {
                  id:'abb',
                  label:'34'
                }
              ]
            },
          ],
        },
        {
          id: "b",
          label: "b",
        },
        {
          id: "c",
          label: "c",
        },
      ],
    };
  },
  methods: {
    ...mapMutations(["addAge"]),
    ...mapActions(["getAge"]),
    appClickhandle() {
      this.$store.dispatch("getAge");
    },
    test1ClickHandle(e) {
      this.testIndex++;
    },
    add: function () {
      this.items.splice(this.randomIndex(), 0, this.nextNum++);
    },
    remove: function () {
      this.items.splice(this.randomIndex(), 1);
    },
    randomIndex: function () {
      return Math.floor(Math.random() * this.items.length);
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.list-item {
  transition: all 1s;
  display: inline-block;
  margin-right: 10px;
}
.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.list-leave-active {
  position: absolute;
}

.v-enter {
  opacity: 0;
}

.v-enter-active {
  transition: opacity 0.5s;
}

.v-enter-to {
  opacity: 1;
}

.v-leave {
  opacity: 1;
}

.v-leave-active {
  transition: opacity 0.5s;
}

.v-leave-to {
  opacity: 0;
}

.bounce-enter-active {
  animation: bounce-in 0.5s;
}

.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
</style>
