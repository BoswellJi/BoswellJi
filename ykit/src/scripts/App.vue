<template>
    <div id="app">
        <img src="http://oji8kngu4.bkt.clouddn.com/vue.png">
        <h1>ykit-starter-vue</h1>
        <ul>
            <li><a href="https://vuejs.org" target="_blank">core docs</a></li>
            <li><a href="http://router.vuejs.org/" target="_blank">vue-router</a></li>
            <li><a href="http://vuex.vuejs.org/" target="_blank">vuex</a></li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'app',
    data() {
        return {
            msg: 'Welcome to Your Vue.js App'
        }
    }
}
</script>

<style lang="scss">
body {
    h1 {
        color: #09c;
    }
}
</style>
