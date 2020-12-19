<template>
  <svg aria-hidden="true" class="gs-icon" :style="styleObject">
    <use :xlink:href="`#${icon}`" />
  </svg>
</template>

<script>
export default {
  name: 'JsIcon',
  props: {
    icon: {
      type: String,
      required: true,
    },
    size: {
      type: [Number, String],
      required: false,
      default: null,
    },
  },
  computed: {
    styleObject() {
      const style = {};

      if (this.size) {
        style.height = `${this.size}px`;
        style.width = `${this.size}px`;
      }

      return style;
    },
  },
};
</script>

<style lang="scss" scoped>
.gs-icon {
  fill: currentColor;
  height: 16px * 1.25;
  width: 16px * 1.25;
}
</style>
