<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button></ion-back-button>
        </ion-buttons>
        <ion-title>{{ game ? game.title : 'Loading...' }}</ion-title>
        <ion-icon
          slot="end"
          name="ios-remove"
          @click="handleRemoveGame"
          size="large"
        />
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" v-if="game">
      <!-- <ion-header collapse="condense">
        <ion-toolbar>
          <h2>{{ game.game.title }}</ion-title>
        </ion-toolbar>
      </ion-header> -->
      <!-- <ion-img :src="item.src"></ion-img> -->
      <img class="game-container__poster" v-if="gameImage" :src="gameImage" />

      <div class="game-container" v-if="game">
        <div class="game-container__info">
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
          <ion-card-content>
            {{ game.description }}
          </ion-card-content>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useQuery, useMutation } from '@vue/apollo-composable';
import { useRouter } from 'vue-router';

// components
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonIcon,
  IonItem,
  IonLabel,
  IonChip,
  IonButtons,
  IonBackButton,
  alertController,
} from '@ionic/vue';

// hooks
import { gamesHook } from '@/hooks/api/fetchGames.hook';

// graphql
import gameQuery from '@/graph/queries/game.query.graphql';
import removeGameMutation from '@/graph/mutations/deleteGame.mutation.graphql';

export default defineComponent({
  name: 'Home',
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonCardContent,
    IonCardSubtitle,
    IonCardTitle,
    IonCardHeader,
    IonChip,
    IonLabel,
    IonIcon,
    IonButtons,
    IonBackButton,
  },
  setup() {
    const { currentRoute, back } = useRouter();
    const { refetch } = gamesHook();
    const gameId = currentRoute.value.params.id;

    const { result, loading, error } = useQuery(gameQuery, {
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

              await refetch();
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
    defaultImage: () =>
      'https://cdn.dribbble.com/users/947358/screenshots/14482318/media/909a16c4339896f8e21eb3d3473cb46f.png',
    gameImage: ({ game, defaultImage, baseUrl }) =>
      game.picture ? `${baseUrl}${game.picture?.url}` : defaultImage,
  },
});
</script>

<style lang="scss" scoped>
ion-content {
  --ion-background-color: #111d12;
}
@keyframes animation-actionsheet-intro {
  0% {
    -webkit-transform: translateY(100%);
    transform: translateY(100%);
  }
  to {
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }
}
.game-container {
  animation: animation-actionsheet-intro 0.3s cubic-bezier(0.36, 0.66, 0.04, 1);
  position: relative;
  padding: 1px;
  &__title {
    &--genre {
      margin-bottom: 5px;
    }
  }
  &__info {
    width: 100%;
    border-top-left-radius: 25px;
    border-top-right-radius: 12px;
    background: white;
    margin-top: -40px;
    z-index: 999;
    padding: 10px;
  }

  &__poster {
    width: 100%;
    height: 340px;
  }
}
</style>
