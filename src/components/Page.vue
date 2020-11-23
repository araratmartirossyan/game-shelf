<template>
  <div class="gs-page" @scroll="scrollHandler">
    <div class="gs-page__top">
      <slot name="top" />
    </div>
    <div ref="pageContent" class="gs-page__content" @scroll="scrollHandler">
      <slot />
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
  setup() {
    const pageContent = ref(null);
    const restoreScrollPosition = ref(0);
    const scrollHandler = ({ target: { scrollTop } }) =>
      sessionStorage.setItem('top', Number(scrollTop));

    onMounted(() => {
      const position = sessionStorage.getItem('top');
      console.log('CALL THIS');
      pageContent.value.scrollTo(0, position);
    });

    return {
      restoreScrollPosition,
      pageContent,
      scrollHandler,
    };
  },
});
</script>

<style lang="scss" scoped>
.gs-page {
  bottom: 0;
  display: flex;
  flex-direction: column;
  left: 0;
  padding: 0;
  position: absolute;
  right: 0;
  top: 0;

  &__top,
  &__bottom {
    flex-grow: 0;
    flex-shrink: 0;
    position: relative;
    z-index: 2;
  }

  &__content {
    flex-grow: 1;
    overflow-x: hidden;
    overflow-y: auto;
    z-index: 3;
  }
}
</style>
