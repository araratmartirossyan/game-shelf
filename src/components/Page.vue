<template>
  <div
    class="gs-page"
    :style="{ backgroundColor: style[type] }"
    @scroll="scrollHandler"
  >
    <div class="gs-page__top">
      <slot name="top" />
    </div>
    <slot />

    <div
      ref="pageContent"
      class="gs-page__content"
      :class="{ 'gs-page__content--paddingless': paddingless }"
    >
      <slot name="content" />
    </div>
    <div class="gs-page__bottom">
      <slot name="bottom" />
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue';

export default defineComponent({
  name: 'GsPage',
  props: {
    type: {
      type: String,
      default: 'main',
    },
    paddingless: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const pageContent = ref(null);
    const restoreScrollPosition = ref(0);
    const scrollHandler = ({ target: { scrollTop } }) => {
      sessionStorage.setItem('top', Number(scrollTop));
    };

    onMounted(() => {
      const position = sessionStorage.getItem('top');
      pageContent.value.scrollTo(0, position);
    });

    return {
      restoreScrollPosition,
      pageContent,
      scrollHandler,

      style: {
        white: '#fff',
        main: '#f2f5f7',
      },
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/theme/global.scss';

.gs-page {
  bottom: 0;
  display: flex;
  flex-direction: column;
  left: 0;
  padding: 0;
  position: absolute;
  right: 0;
  top: 0;
  overflow: auto;

  &__top {
    position: fixed !important;
    display: flex;
    padding: $base-gap $base-gap * 2;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }

  &__top,
  &__bottom {
    flex-grow: 0;
    flex-shrink: 0;
    position: relative;
    z-index: 5;
  }

  &__content {
    flex-grow: 1;
    overflow-x: hidden;
    overflow-y: auto;
    z-index: 3;
    padding-top: $base-gap * 4;

    &--paddingless {
      padding-top: 0;
    }
  }
}
</style>
