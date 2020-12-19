<template>
  <gs-page>
    <template #top>
      <div class="page-head__left">
        <img class="logo" src="@/assets/logo.svg" />
        <gs-heading type="h3" class="page-heading">
          Game Shelf
        </gs-heading>
      </div>
      <div class="page-head__right">
        <gs-icon
          color="black"
          icon="gs-add"
          size="36"
          @click="$router.push({ name: 'search-game' })"
        />
        <gs-button icon-name="loupe" />
      </div>
    </template>
    <template #content>
      <div class="heading">
        <gs-heading type="h3">
          Recent
        </gs-heading>
      </div>
      <div class="game-list__content--paddingless">
        <GsCarousel>
          <div
            v-for="(cat, key) in categories"
            class="category-card"
            :key="`cat-${key}`"
          >
            {{ cat }}
          </div>
        </GsCarousel>
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
              @click="$router.push({ name: 'game-overview', params: { id } })"
            />
          </swiper-slide>
        </swiper>
      </div>
      <div class="game-list__content">
        <div class="games-list" v-if="!loading">
          <GameCard
            v-for="({ title, picture, id }, key) in foundGames"
            :key="key"
            :title="title"
            :bgImage="picture?.formats?.medium?.url"
            @click="$router.push({ name: 'game-overview', params: { id } })"
            class="games-list__item"
          />
        </div>
      </div>
    </template>
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
import GsIcon from '@/components/Icons/GsIcon.vue';
import GsButton from '@/components/Button.vue';
import GameCard from '@/components/GameCard.vue';
import SlideCard from '@/components/GameCardBig.vue';
import GsCarousel from '@/components/GsCarousel.vue';

// hooks
import { useSearch } from '@/hooks/device/fuse.hook';
import { DocumentNode } from 'graphql';

export default defineComponent({
  name: 'CreateGameModal',
  components: {
    GameCard,
    SlideCard,
    GsButton,
    GsPage,
    GsHeading,
    GsIcon,
    Swiper,
    SwiperSlide,
    GsCarousel,
  },
  setup() {
    const router = useRouter();
    const searchQuery = ref('');
    const { result, loading, error } = useQuery(gamesQuery);

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
      categories: [1, 2, 3, 4, 5, 6],
    };
  },
});
</script>

<style lang="scss">
@import '@/theme/global.scss';

.category-card {
  width: 100px;
  width: 100px;
  margin-right: 12px;
  border-radius: 32px;
  height: 40px;
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid;
}

.heading {
  margin-top: 0;
  margin-bottom: 0;
  margin-left: $base-padding;
}

.page-heading {
  margin: 0;
}

.page-head {
  &__left {
    width: 100%;
    display: flex;
    align-items: center;
  }

  &__right {
    display: flex;

    width: 30%;
    justify-content: space-evenly;
    align-items: flex-start;
  }
}

.logo {
  width: 50px;
  margin-right: 10px;
}

.game-list {
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
    will-change: transform;
    &__main {
      transform: scaleY(1.15);
      transition: transform 430ms;
      will-change: transform;
    }
  }

  .game-title {
    margin-top: 45px;
    transition: margin 0.25s;
  }
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
