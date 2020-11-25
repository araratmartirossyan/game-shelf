<template>
  <button class="btn" @click="$emit('click')">
    <slot />
    <img v-if="iconName" :src="require(`@/assets/${iconName}.svg`)" />
    {{ title }}
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'GsButton',
  props: {
    title: {
      type: String,
      default: '',
    },
    iconName: {
      type: String,
      default: null,
    },
  },
});
</script>

<style lang="scss" scoped>
.btn {
  background: none;
  img {
    width: 25px;
    height: 25px;
  }
}
</style>
