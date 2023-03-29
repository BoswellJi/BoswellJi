<script setup lang="ts">
import { ref } from 'vue'

const tableData = [
  {
    name: 'Boswell'
  }
]

// if (import.meta.hot) {
//   import.meta.hot.accept((newModule) => {
//     if (newModule) {
//       import.meta.hot?.invalidate()
//     }
//   })
// }
</script>

<template>
  <el-table :data="tableData">
    <el-table-column prop="name" label="test"></el-table-column>
    <el-table-column label="slot">
      <template #default="scope"> {{ scope.row.name }}e333deeed</template>
    </el-table-column>
  </el-table>

  <!--<HelloWorld :msg="'444'">
    <TheWelcome>
      <template #default="scope">{{ scope.data }}ddddd eeddde</template>
    </TheWelcome>
  </HelloWorld> -->

  <!-- 

 <test-com>
    <template #default>
      test
      <test-com1>
        <template #default="scope">222wwwtrtdddd{{ scope.data }}</template>
      </test-com1>
    </template>
  </test-com>

   -->
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
