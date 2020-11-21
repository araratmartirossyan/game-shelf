<template>
  <component :is="internalComponent" class="gs-label">
    <slot />
  </component>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'GsLabel',
  props: {
    legend: {
      default: '',
      type: String,
    },
  },
  computed: {
    internalComponent: ({ legend }) => (legend ? 'legend' : 'label'),
  },
});
</script>

<style lang="scss"></style>
