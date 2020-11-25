<template>
  <component :is="type" class="js-heading">
    <slot />
  </component>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'GsButton',
  props: {
    type: {
      type: String,
      default: '',
    },
  },
});
</script>

<style lang="scss" scoped>
.js-heading {
  color: black;
  font-family: BR Candor B;
}
p {
}
h2 {
}
h3 {
}
h4 {
}
h5 {
}
h6 {
}
</style>
