<template>
  <div class="pos">
    {{ pDeparturePort ? pDeparturePort : startCity.name }}
    {{ pDestinationCityName ? `- ${pDestinationCityName}` : '出发' }}
  </div>
</template>

<script lang="ts" setup>
import { useStartCityId } from '@/hooks/common';

defineProps<{
  pDeparturePort: string;
  pDestinationCityName: string;
}>();
const startCity = useStartCityId();
</script>
<style scoped lang="scss">
@import './index.scss';
</style>
