<template>
  <div>
    {{msg}}
  </div>
</template>

<script>
export default {
  props: {
    msg: String,
  },
  data: () => ({
    count: 0,
  }),
  methods: {

  },
};
</script>
