<template>
  <gs-page v-if="game" paddingless>
    <template #top>
      <gs-icon icon="arrow-left" size="32" @click="$router.back()" />
    </template>

    <template #content>
      <img
        alt="game-poster"
        class="game-container__poster"
        v-if="game && gameImage"
        :src="gameImage"
      />
      <img
        alt="game-poster"
        class="game-container__poster"
        v-else
        src="@/assets/empty.png"
      />

      <gs-bottom-sheet>
        <ion-card-header>
          <ion-card-subtitle>Game title</ion-card-subtitle>
          <ion-card-title>{{ game.title }}</ion-card-title>
        </ion-card-header>
        <ion-card-header>
          <ion-card-subtitle>Platform</ion-card-subtitle>
          <ion-card-title>{{ game.platform.title }}</ion-card-title>
        </ion-card-header>
        <ion-card-header>
          <ion-chip
            outline
            color="primary"
            v-for="(genre, key) in game.genres"
            :key="key"
          >
            <ion-label> {{ genre.title }} </ion-label>
          </ion-chip>
        </ion-card-header>
        <ion-card-content style="color: black;">
          {{ game.description }}
        </ion-card-content>
      </gs-bottom-sheet>
    </template>
  </gs-page>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch, onMounted } from 'vue';
import { useQuery, useMutation } from '@vue/apollo-composable';
import { useRouter } from 'vue-router';

// components
import {
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonIcon,
  IonLabel,
  IonChip,
  alertController,
} from '@ionic/vue';
import GsPage from '@/components/Page.vue';
import GsIcon from '@/components/Icons/GsIcon.vue';
import GsBottomSheet from '@/components/GsBottomSheet.vue';

// hooks
import { gamesHook } from '@/hooks/api/fetchGames.hook';

// graphql
import gameQuery from '@/graph/queries/game.query.graphql';
import removeGameMutation from '@/graph/mutations/deleteGame.mutation.graphql';

export default defineComponent({
  name: 'Home',
  components: {
    IonCardContent,
    IonCardSubtitle,
    IonCardTitle,
    IonCardHeader,
    IonChip,
    IonLabel,
    GsIcon,
    GsBottomSheet,
    GsPage,
  },
  setup() {
    const { currentRoute, back } = useRouter();
    const gameId = currentRoute.value.params.id;

    const { result } = useQuery(gameQuery, {
      id: gameId,
    });

    const { mutate } = useMutation(removeGameMutation, {
      variables: { game: gameId },
    });

    const game = computed(() => result?.value?.game || null);

    const handleRemoveGame = async () => {
      const alert = await alertController.create({
        header: 'Remove game',
        message: 'Are you sure you wanna remove this game?',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
          },
          {
            text: 'Okay',
            handler: async () => {
              await mutate({ game: gameId });

              back();
            },
          },
        ],
      });

      await alert.present();
    };

    return {
      game,
      handleRemoveGame,
    };
  },
  computed: {
    baseUrl: () => process.env.VUE_APP_API_URL,
    gameImage: ({ game, baseUrl }) =>
      game.picture ? `${baseUrl}${game.picture?.url}` : null,
  },
});
</script>

<style lang="scss" scoped>
@import '@/theme/global.scss';

.page {
  &-top {
    position: fixed;
    margin-left: $base-padding;
    margin-top: 15px;
  }
  &__fixed {
    overflow: hidden;
  }
  bottom: 0;
  display: flex;
  flex-direction: column;
  left: 0;
  padding: 0;
  position: absolute;
  right: 0;
  top: 0;
  overflow: scroll;
}
</style>
