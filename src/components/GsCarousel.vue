<template>
  <div class="fc-carousel">
    <div class="fc-carousel__inner">
      <slot />
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'FcCarousel',
});
</script>

<style lang="scss">
@import '@/theme/global.scss';

.fc-carousel {
  display: flex;
  overflow: hidden;
  overflow-x: scroll;
  padding: $base-padding 0;
  scroll-padding: 0 $base-padding;
  scroll-snap-type: x proximity;

  &__inner {
    display: flex;
    padding: 0 $base-padding;

    > * {
      scroll-snap-align: start;
    }
  }
}
</style>
