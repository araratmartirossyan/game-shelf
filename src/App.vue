<template>
  <div id="app">
    <router-view v-slot="{ Component }" :key="$route.fullPath">
      <component :is="Component" />
    </router-view>
    <gs-icons />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import GsIcons from '@/components/Icons/GsIconRegistry.vue';

export default defineComponent({
  name: 'App',
  components: {
    GsIcons,
  },
});
</script>
