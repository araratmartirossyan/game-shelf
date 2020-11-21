<template>
  <div class="game-card">
    <div class="game-card__content">
      <div class="game-card__image">
        <img v-if="bgImage" :src="`${baseUrl}${bgImage}`" />
        <img v-else :src="defaultImage" />
      </div>

      <div class="game-card__bottom">
        {{ title }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'GameCard',
  props: {
    title: {
      type: String,
      default: '',
    },
    bgImage: {
      type: String,
      default: '',
    },
    platform: {
      type: String,
      default: '',
    },
  },
  computed: {
    baseUrl: () => process.env.VUE_APP_API_URL,
    defaultImage: () =>
      'https://cdn.dribbble.com/users/947358/screenshots/14482318/media/909a16c4339896f8e21eb3d3473cb46f.png',
  },
});
</script>

<style lang="scss" scoped>
$base-gap: 15px;
$base-speed: 150ms;
$ease-out-back: cubic-bezier(0.175, 0.885, 0.32, 1.275);
$ease-out-expo: cubic-bezier(0.19, 1, 0.22, 1);

.game-card {
  display: block;
  width: 100%;
  height: 100%;
  position: relative;
  box-shadow: 0 1px 1px 0 rgba(66, 66, 66, 0.08),
    0 1px 3px 1px rgba(66, 66, 66, 0.16);
  border-radius: 6px;

  transform-origin: center;
  transition: transform 50ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
  transition: transform 50ms cubic-bezier(0.175, 0.885, 0.32, 1.275),
    -webkit-transform 50ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
  transition: transform 50ms $ease-out-back;
  transition: transform 50ms $ease-out-back,
    -webkit-transform 50ms $ease-out-back;

  &__content {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;

    justify-content: center;

    align-items: center;
    border-radius: 6px;
    overflow: hidden;
    z-index: 2;
  }

  &__image {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    &:after {
      content: '';
      width: 100%;
      height: 50%;
      display: block;
      position: absolute;
      z-index: 1;
      bottom: 0;
      left: 0;
      background: -webkit-gradient(
        linear,
        left top,
        left bottom,
        from(transparent),
        to(rgba(0, 0, 0, 0.1))
      );
      background: linear-gradient(180deg, transparent, rgba(0, 0, 0, 0.1));
    }

    img {
      object-fit: cover;
      width: 100%;
      height: 100%;
      position: absolute;
    }
  }

  &__bottom {
    background: linear-gradient(180deg, transparent, rgba(0, 0, 0));
    position: absolute;
    bottom: 0;
    padding: calc(15px / 1.5);
    color: #fff;
    width: 100%;
  }
}
</style>
