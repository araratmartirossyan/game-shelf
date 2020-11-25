<template>
  <div class="game-card">
    <!-- <div class="game-card__content"> -->
    <img alt="game-poster" v-if="bgImage" :src="`${baseUrl}${bgImage}`" />
    <img alt="game-poster" v-else src="@/assets/empty.png" />

    <!-- <div class="game-card__bottom">
        {{ title }}
      </div> -->
    <!-- </div> -->
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
.game-card img {
  width: 150px;
  height: 150px;
  border-radius: 38px;
  object-fit: cover;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}
</style>
