<template>
  <div class="game-card">
    <img alt="game-poster" v-if="bgImage" :src="`${baseUrl}${bgImage}`" />
    <img alt="game-poster" v-else src="@/assets/empty.png" />
    <gs-heading type="p" class="game-card__title">
      {{ title }}
    </gs-heading>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

// components
import GsHeading from '@/components/GsHeading.vue';

export default defineComponent({
  name: 'GameCard',
  components: {
    GsHeading,
  },
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
.game-card {
  img {
    width: 150px;
    height: 150px;
    border-radius: 38px;
    object-fit: cover;
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  }
  &__title {
    font-family: BR Candor L;
    font-size: 12px;
    width: 140px;
  }
}
</style>
