<template>
  <div>
    <transition name="v" appear>
      <router-view></router-view>
    </transition>

    <transition-group name="v">
      <span v-for="(item, index) in items" v-bind:key="index" class="list-item">
        {{ item }}
      </span>
    </transition-group>

    <button v-on:click="add">Add</button>
    <button v-on:click="remove">Remove</button>

    <a href="#/a/jmzc1">test3</a>
    <a href="#/b">test2</a>
    <a href="#/c/20/d/Boswell">test4</a>
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
    <div @click="getAge">
      <div>state:{{ $store.state.age }}</div>
      <div>getterAge:{{ getterAge }}</div>
      <div>mod1Name：{{ mod1Name }}</div>
      <div>mod1NameCopy:{{ mod1NameCopy }}</div>
      <div>getterMod1Name:{{ getterMod1Name }}</div>
    </div>
  </div>
</template>

<script>
import test from "./components/test";
import test1 from "./components/test1";
import test4 from "./components/test4";
import hoc from "./hoc.js";
import { createHOC } from "vue-hoc";
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";

const options = {
  created() {
    console.log("Created", "createHOC");
  },
};

export default {
  name: "App",
  components: {
    testHoc: hoc(test),
    test: createHOC(test, options),
    test1: createHOC(test1, options),
    test4,
  },
  mounted() {
    // 这里有一个任务更新队列的问题,所以是有顺序的
    this.$nextTick(function() {
      const dom = document.querySelector("#text");
    });
    this.$store.state.name;
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
    };
  },
  methods: {
    ...mapMutations(["addAge"]),
    ...mapActions(["getAge"]),
    appClickhandle() {
      // this.$store.commit('addAge');
      this.$store.dispatch("getAge");
    },
    test1ClickHandle(e) {
      console.log(e);
    },
    add: function() {
      this.items.splice(this.randomIndex(), 0, this.nextNum++);
    },
    remove: function() {
      this.items.splice(this.randomIndex(), 1);
    },
    randomIndex: function() {
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
