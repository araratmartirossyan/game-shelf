<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Add game</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="add-game__content ion-padding">
      <gs-label>
        <p class="heading">Title</p>
        <gs-input
          name="title"
          v-model="gameForm.title"
          :value="gameForm.title"
          placeholder="Game title"
        />
      </gs-label>
      <gs-label>
        <p class="heading">Game Description</p>
        <ion-textarea
          class="game__description"
          placeholder="Add Description"
          v-model="gameForm.description"
          rows="10"
        />
      </gs-label>
      <gs-label v-if="genres">
        <p class="heading">Genre</p>
        <v-select
          :options="genres"
          label="option"
          name="genre"
          class="gs-select"
          multiple
          placeholder="Choose genre"
          index="value"
          v-model="gameForm.genres"
        />
      </gs-label>
      <gs-label v-if="platformsList">
        <p class="heading">Platform</p>
        <v-select
          :options="platformsList"
          label="option"
          class="gs-select"
          placeholder="Choose platform"
          index="value"
          v-model="gameForm.platform"
        />
      </gs-label>

      <gs-label>
        <p class="heading">Upload Photo</p>
        <p class="sub-heading">
          You can either select a photo from your gallery or take one now.
        </p>
        <ion-button @click="takePhoto">Make a picture</ion-button>
        <ion-img :src="image?.photo?.webviewPath" />
      </gs-label>
    </ion-content>
    <ion-footer class="footer-form">
      <ion-button expand="full" @click="submitForm">
        Create game
      </ion-button>
    </ion-footer>
  </ion-page>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, toRef, watch } from 'vue';
import { useRouter } from 'vue-router';

// graphql
import gamesQuery from '@/graph/queries/games.query.graphql';

// hooks
import genresHook from '@/hooks/api/fetchGenres.hook';
import platformsHook from '@/hooks/api/fetchPlatforms.hook';
import { createGameHook } from '@/hooks/api/createGame.hook';
import { usePhotoGallery } from '@/hooks/device/camera.hook';
import { gamesHook } from '@/hooks/api/fetchGames.hook';
import { findGenres, preparePlatforms } from '@/utils/prepareData';

// components
import {
  IonContent,
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButton,
  IonImg,
  IonFooter,
  IonSelect,
  IonSelectOption,
  IonTextarea,
  loadingController,
} from '@ionic/vue';
import GsInput from '@/components/Input.vue';
import GsLabel from '@/components/Label.vue';

// types
import { GameForm } from '@/types/games-shelf';
import { useQuery } from '@vue/apollo-composable';
import { fetchGame } from '@/services/search.service';

const defaultForm: GameForm = {
  title: '',
  genres: [],
  platform: { value: '' },
  picture: '',
  description: '',
};

export default defineComponent({
  name: 'CreateGameModal',
  props: {
    title: { type: String, default: 'Add Game' },
  },
  setup() {
    const platformsList = ref<{ title: string; id: string }[]>([]);
    const photos = ref<{ webviewPath: string }[]>([]);
    const data = ref<any>(null);
    const { createGame } = createGameHook();
    const { genres } = genresHook();
    const { platforms } = platformsHook();
    const { takePhoto, image } = usePhotoGallery();
    const { refetch } = gamesHook();
    const { currentRoute, back, replace } = useRouter();

    const gameForm = ref<GameForm>(defaultForm);

    onMounted(async () => {
      const {
        params: { id },
      } = currentRoute.value;
      data.value = await fetchGame(id);
    });

    watch(data, () => {
      platformsList.value = [
        ...preparePlatforms(data.value.platforms, platforms.value),
      ];
      photos.value = [{ webviewPath: data.value.background_image }];
      gameForm.value = {
        title: data.value.name,
        genres: [...findGenres(data.value.genres, genres.value)],
        platform: { value: '' },
        picture: '',
        description: data.value.description_raw,
      };
    });

    const submitForm = async () => {
      const loading = await loadingController.create({
        message: 'Please wait...',
      });

      await loading.present();
      const { genres, title, platform, description } = gameForm.value;
      const prepareForm = {
        genres: genres.map(i => i.value),
        title,
        platform: platform.value,
        description,
        picture: image.value.imageId,
      };

      await createGame(prepareForm);

      gameForm.value = defaultForm;

      loading.dismiss();
      replace({ name: 'home' });
      await refetch();
    };

    return {
      gameForm,
      createGame,
      genres,
      takePhoto,
      image,
      submitForm,
      platformsList,
      photos,
    };
  },
  components: {
    IonContent,
    GsInput,
    GsLabel,
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButton,
    IonImg,
    IonFooter,
    IonTextarea,
  },
});
</script>

<style lang="scss">
@import './../theme/global.scss';

.footer-form {
  background: white;

  .button {
    margin: 0;
  }
}

.game__description {
  box-shadow: 0 1px 1px 0 rgba(66, 66, 66, 0.08),
    0 1px 3px 1px rgba(66, 66, 66, 0.16);
  padding-left: 16px;
  border-radius: 6px;
}

.gs-select {
  box-shadow: 0 1px 1px 0 rgba(66, 66, 66, 0.08),
    0 1px 3px 1px rgba(66, 66, 66, 0.16);
  border-radius: 6px;
  height: 60px;

  .vs__dropdown-toggle {
    border: none;
    height: 60px;
  }
  .vs__selected {
    background: none;
    border-radius: 12px;
  }
}
</style>
