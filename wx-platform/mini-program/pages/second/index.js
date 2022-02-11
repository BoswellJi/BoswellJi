import { definePage, reactive, computed } from '../../common/vue-mini'

definePage({
  setup() {
    const state = reactive({
      count: 0,
      double: computed(() => state.count * 2),
    })

    function clickhandle() {
      state.count++
    }

    return {
      state,
      clickhandle,
    }
  },
})