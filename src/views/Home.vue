<template>
  <gs-page>
    <template #top>
      <ion-toolbar>
        <ion-title>Game List</ion-title>
        <ion-icon
          @click="router.push('/create')"
          slot="end"
          name="ios-add"
          size="large"
        />
      </ion-toolbar>
    </template>
    <div class="ion-padding game-list__content" color="gray">
      <div class="content">
        <GsInput
          placeholder="Search game"
          name="search"
          v-model:search="searchQuery"
        />

        <!-- <IonLoading
          v-if="loading"
          message="Please wait..."
          :is-open="loading"
        /> -->

        <ul class="game-list" v-if="!loading">
          <li v-for="({ title, picture, id }, key) in foundGames" :key="key">
            <router-link :to="{ name: 'game-overview', params: { id } }">
              <GameCard
                :title="title"
                :bgImage="picture?.formats?.thumbnail?.url"
              />
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </gs-page>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useQuery } from '@vue/apollo-composable';

// graphQl
import gamesQuery from '@/graph/queries/games.query.graphql';

// components
import { IonToolbar, IonTitle, IonIcon } from '@ionic/vue';
import GsPage from '@/components/Page.vue';

import GameCard from '@/components/GameCard.vue';
import GsInput from '@/components/Input.vue';

// hooks
import { useSearch } from '@/hooks/device/fuse.hook';

export default defineComponent({
  name: 'CreateGameModal',
  components: {
    IonToolbar,
    IonTitle,
    GameCard,
    IonIcon,
    GsInput,
    GsPage,
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
    };
  },
});
</script>

<style lang="scss">
.game-list {
  li {
    width: 100px;
    height: 100px;
  }
}
$base-gap: 15px;
$list-gap: 1.5 * $base-gap;
$item-size-width: calc(50vw - $list-gap);
.inner-scroll {
  background: #f5f5f5;
}
.game-list {
  list-style: none;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  position: relative;
  justify-content: space-between;
  --list-gap: 1.5 * $base-gap;
  --item-size-width: $item-size-width;
  --item-size-height: $item-size-width;
  padding-inline-start: 0px;

  li {
    width: calc(50vw - 1.5 * 15px);
    height: calc(50vw - 1.5 * 15px);
    margin-bottom: $base-gap;
  }
}
</style>
