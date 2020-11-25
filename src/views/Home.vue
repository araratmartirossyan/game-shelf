<template>
  <gs-page>
    <template #top>
      <div class="game-list__header">
        <div class="left">
          <img class="logo" src="@/assets/logo.svg" />
          <h2 class="heading">Game Shelf</h2>
        </div>
        <div class="right">
          <gs-button icon-name="loupe" />
        </div>
      </div>
    </template>
    <div class="heading">
      <gs-heading type="h3">
        Recent
      </gs-heading>
    </div>
    <div class="game-list__content--paddingless">
      <swiper v-if="!loading" :slides-per-view="1.5" :space-between="80">
        <swiper-slide
          zoom
          v-for="{ title, picture, id, genres, platform } in foundGames"
          :key="id"
        >
          <SlideCard
            :title="title"
            :bgImage="picture?.formats?.medium?.url"
            :genres="genres"
            :platform="platform.title"
          />
        </swiper-slide>
      </swiper>
    </div>
    <div class="game-list__content">
      <div class="games-list" v-if="!loading">
        <!-- <router-link :to="{ name: 'game-overview', params: { id } }"> -->
        <GameCard
          :title="title"
          class="games-list__item"
          v-for="({ title, picture, id }, key) in foundGames"
          @click="$router.push({ name: 'game-overview', params: { id } })"
          :key="key"
          :bgImage="picture?.formats?.medium?.url"
        />
        <!-- </router-link> -->
      </div>
    </div>
  </gs-page>
</template>

<script lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/swiper.scss';

import { defineComponent, ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useQuery } from '@vue/apollo-composable';

// graphQl
import gamesQuery from '@/graph/queries/games.query.graphql';

// components
import GsPage from '@/components/Page.vue';
import GsInput from '@/components/Input.vue';
import GsHeading from '@/components/GsHeading.vue';
import GsButton from '@/components/Button.vue';
import GameCard from '@/components/GameCard.vue';
import SlideCard from '@/components/GameCardBig.vue';

// hooks
import { useSearch } from '@/hooks/device/fuse.hook';
import { DocumentNode } from 'graphql';

export default defineComponent({
  name: 'CreateGameModal',
  components: {
    GameCard,
    SlideCard,
    GsButton,
    // GsInput,
    GsPage,
    GsHeading,
    Swiper,
    SwiperSlide,
  },
  setup() {
    const router = useRouter();
    const searchQuery = ref('');
    const { result, loading, error } = useQuery(gamesQuery);

    const onMove = () => {
      console.log('moved');
    };

    const foundGames = computed(() => {
      const { search } = useSearch(result.value.games);
      return searchQuery.value
        ? search(searchQuery.value).map(({ item }) => item)
        : result.value.games;
    });

    return {
      loading,
      error,
      router,
      searchQuery,
      foundGames,
      result,
      onMove,
    };
  },
});
</script>

<style lang="scss">
@import '@/theme/global.scss';
.heading {
  margin-top: 0;
  margin-bottom: 0;
}
.logo {
  width: 50px;
  margin-right: 10px;
}
.game-list {
  h2 {
    color: black;
    margin-top: 0;
  }

  &__header {
    display: flex;
    padding: $base-gap;
    margin-left: 20px;
    align-items: center;
    justify-content: space-between;

    .left {
      display: flex;
      align-items: center;
    }

    .right {
      margin-right: 10px;
    }
  }
  &__content {
    &--paddingless {
      max-height: 480px;
    }
  }
}

.swiper-slide {
  &:first-child {
    margin-left: $base-padding;
  }
}

.swiper-slide-active {
  .game-card {
    margin-top: 45px;
    &__main {
      transform: scaleY(1.15);
      transition: transform 230ms ease-in-out;
    }
  }

  .game-title {
    margin-top: 45px;
    transition: margin 0.25s;
  }
}

.heading {
  margin-left: $base-padding;
}

.games-list {
  display: -webkit-box;
  overflow-x: auto;
  overflow-x: scroll;
  scroll-snap-type: x mandatory;
  scroll-padding: 0 50%;

  margin-top: 60px;

  &__item {
    margin-right: 25px;
    &:first-child {
      margin-left: $base-padding;
    }
  }
}
</style>
