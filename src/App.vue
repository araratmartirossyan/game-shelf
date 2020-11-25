<template>
  <router-view v-slot="{ Component }" :key="$route.fullPath">
    <component :is="Component" />
  </router-view>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
});
</script>

<style lang="scss" scoped>
body {
  background: white;
}
</style>
