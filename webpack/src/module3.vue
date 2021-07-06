<template>
  <div>
    module3:{{ name }}
    <module5></module5>
    <com4></com4>
    <module7></module7>
    <mod8></mod8>
  </div>
</template>

<script lang="ts">
import module5 from './module5.vue';
import { com4 } from './module4.tsx';
import module7 from './module7.vue';
import {mod8} from './module8.jsx';

export default {
  components: {
    module5,
    com4,
    module7,
    mod8
  },
  data() {
    return {
      name: 'Boswell'
    };
  }
}

</script>
