<template>
  <div class="game-card">
    <div
      class="game-card__main"
      v-if="bgImage"
      :style="`background-image: url(${baseUrl}${bgImage})`"
    />
    <div
      class="game-card__main"
      v-else
      :style="`background-image: url(@/assets/empty.png)`"
    />

    <div class="game-card__bottom">
      <h2 class="game-title">{{ title }}</h2>
      <h4 class="subtitle">{{ platform }}</h4>
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
  },
});
</script>

<style lang="scss" scoped>
@import '@/theme/global.scss';

.game-title {
  font-size: 18px;
  color: black;
  font-family: BR Candor B;
  font-weight: 600;
}
.game-card {
  transition: 0.3s;
  margin-right: 24px;

  margin-top: 35px;

  &__main {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);

    width: 280px;
    min-height: 350px;
    transition: max-height 0.3s;
    background-size: cover;
    border-radius: 38px;
  }

  .subtitle {
    color: gray;
    font-size: 12px;
    font-weight: 600;
    font-family: sans-serif;
    margin-top: 10px;
  }
}
</style>
