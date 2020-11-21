<template>
  <ion-page>
    <ion-header translucent>
      <ion-toolbar>
        <ion-title>Searchbar</ion-title>
      </ion-toolbar>
      <ion-toolbar>
        <ion-searchbar @ionChange="searchGames" :debounce="1000" />
      </ion-toolbar>
    </ion-header>
    <ion-content fullscreen>
      <ion-list>
        <ion-item v-for="(game, key) in foundGames" :key="key">
          <router-link :to="{ name: 'create-game', params: { id: game.id } }">
            {{ game.name }}
          </router-link>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script>
import {
  IonSearchbar,
  IonToolbar,
  IonList,
  IonItem,
  IonPage,
  IonContent,
  IonHeader,
  IonTitle,
} from '@ionic/vue';
import { computed, defineComponent, ref } from 'vue';

import { findGame } from '@/services/search.service';
import { useRouter } from 'vue-router';

export default defineComponent({
  components: {
    IonSearchbar,
    IonList,
    IonItem,
    IonPage,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
  },
  setup() {
    const searchString = ref('');
    const foundGames = ref(null);

    const searchGames = async ({ target: { value } }) => {
      const { results } = await findGame(value);
      foundGames.value = results;
    };

    return {
      searchString,
      searchGames,
      foundGames,
    };
  },
});
</script>
