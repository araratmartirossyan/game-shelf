<template>
  <gs-tabs class="tabs-page">
    <template #outlet>
      <router-view />
    </template>
    <template #tab-bar>
      <router-link
        v-for="{ id, icon } in tabs"
        :key="`tab-${id}`"
        event="click"
        :to="{ name: id }"
        class="tab-bar__item"
      >
        <gs-icon :icon="icon" size="32" />
      </router-link>
    </template>
  </gs-tabs>
</template>

<script lang="ts">
import GsTabs from '@/components/GsTabs.vue';
import GsIcon from '@/components/Icons/GsIcon.vue';

import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'TabsPage',
  components: { GsTabs, GsIcon },
  setup() {
    const tabs = ref([
      {
        id: 'overview',
        icon: 'gs-list',
        title: 'Game List',
      },
      {
        id: 'search-game',
        icon: 'gs-add',
        title: 'Add Game',
      },
    ]);
    return { tabs };
  },
});
</script>

<style lang="scss">
.tabs-page {
  background: none;
  .icon {
    width: 25px;
  }
  a {
    color: black;
    text-decoration: none;
  }

  .tab-bar {
    display: flex;
    background: red;

    &__item {
      align-items: center;
      display: flex;
      flex: 1 1 0;
      font-size: 10px;
      line-height: 14px;
      padding: 8px 0 0;
      text-align: center;
      justify-content: center;

      .gs-icon {
        color: gray;
      }

      &.router-link-active {
        .gs-icon {
          color: black;
        }
      }
    }
  }
}
</style>
