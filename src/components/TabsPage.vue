<template>
  <gs-tabs class="tabs-page">
    <template #outlet>
      <router-view />
    </template>
    <template #tab-bar>
      <router-link
        v-for="{ id, icon } in tabs"
        :key="`tab-${id}`"
        :event="click"
        :to="{ name: id }"
        class="tab-bar__item"
      >
        {{ icon }}
      </router-link>
    </template>
    <!-- <div slot="tab-bar" class="tab-bar">
      <router-link
        v-for="{ id, icon } in tabs"
        :key="`tab-${id}`"
        :event="click"
        :to="{ name: id }"
        class="tab-bar__item"
      >
        {{ icon }}
      </router-link>
    </div> -->
  </gs-tabs>
</template>

<script lang="ts">
import GsTabs from '@/components/GsTabs.vue';

import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'TabsPage',
  components: { GsTabs },
  setup() {
    const tabs = ref([
      {
        id: 'overview',
        icon: 'fc-calendar',
      },
      {
        id: 'search-game',
        icon: 'fc-add',
      },
    ]);
    console.log(tabs, 'tabds');
    return { tabs };
  },
});
</script>

<style lang="scss">
.tabs-page {
  a {
    color: black;
    text-decoration: none;
  }

  .tab-bar {
    display: flex;

    &__item {
      align-items: center;
      display: flex;
      flex: 1 1 0;
      flex-direction: column;
      font-size: 10px;
      line-height: 14px;
      padding: 8px 0 0;
      text-align: center;

      &.router-link-active {
        border-bottom: 3px solid black;

        .js-icon {
          color: black;
        }
      }
    }
  }
}
</style>
