<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Game List</ion-title>
        <ion-icon
          slot="end"
          name="ios-add"
          @click="router.push('/create')"
          size="large"
        />
      </ion-toolbar>
    </ion-header>
    <ion-content
      :fullscreen="true"
      class="ion-padding game-list__content"
      color="gray"
    >
      <div class="game-list__toolbar">
        <GsInput placeholder="Search" />
      </div>
      <ul class="game-list">
        <li v-for="(game, key) in gamesList" :key="key">
          <game-card :title="game.title" :bgImage="game.bgImage" />
        </li>
      </ul>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { addCircle } from "ionicons/icons";
import { addIcons } from "ionicons";

addIcons({
  "ios-add": addCircle,
});
const games = [
  {
    title: "Last of Us 2",
    bgImage: "https://media.s-bol.com/mOKjqDVlmqkO/550x694.jpg",
    platform: "PS4",
  },
  {
    title: "Red Dead Redemption 2",
    bgImage: "https://media.s-bol.com/7366kVl26WXr/550x685.jpg",
    platform: "PS4",
  },
  {
    title: "DOOM",
    bgImage: "https://media.s-bol.com/NZ185Z5w3qz/550x686.jpg",
    platform: "PS4",
  },
  {
    title: "Last of Us 2",
    bgImage: "https://media.s-bol.com/mOKjqDVlmqkO/550x694.jpg",
    platform: "PS4",
  },
  {
    title: "Red Dead Redemption 2",
    bgImage: "https://media.s-bol.com/7366kVl26WXr/550x685.jpg",
    platform: "PS4",
  },
  {
    title: "DOOM",
    bgImage: "https://media.s-bol.com/NZ185Z5w3qz/550x686.jpg",
    platform: "PS4",
  },
  {
    title: "Last of Us 2",
    bgImage: "https://media.s-bol.com/mOKjqDVlmqkO/550x694.jpg",
    platform: "PS4",
  },
  {
    title: "Red Dead Redemption 2",
    bgImage: "https://media.s-bol.com/7366kVl26WXr/550x685.jpg",
    platform: "PS4",
  },
  {
    title: "DOOM",
    bgImage: "https://media.s-bol.com/NZ185Z5w3qz/550x686.jpg",
    platform: "PS4",
  },
  {
    title: "Last of Us 2",
    bgImage: "https://media.s-bol.com/mOKjqDVlmqkO/550x694.jpg",
    platform: "PS4",
  },
  {
    title: "Red Dead Redemption 2",
    bgImage: "https://media.s-bol.com/7366kVl26WXr/550x685.jpg",
    platform: "PS4",
  },
  {
    title: "DOOM",
    bgImage: "https://media.s-bol.com/NZ185Z5w3qz/550x686.jpg",
    platform: "PS4",
  },
  {
    title: "Last of Us 2",
    bgImage: "https://media.s-bol.com/mOKjqDVlmqkO/550x694.jpg",
    platform: "PS4",
  },
  {
    title: "Red Dead Redemption 2",
    bgImage: "https://media.s-bol.com/7366kVl26WXr/550x685.jpg",
    platform: "PS4",
  },
  {
    title: "DOOM",
    bgImage: "https://media.s-bol.com/NZ185Z5w3qz/550x686.jpg",
    platform: "PS4",
  },
];

import {
  IonContent,
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonIcon,
} from "@ionic/vue";

import GameCard from "@/components/GameCard";
import GsInput from "@/components/Input";

import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "CreateGameModal",
  components: {
    IonContent,
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    GameCard,
    GsInput,
    IonIcon,
  },
  setup() {
    const gamesList = ref(games);
    const router = useRouter();
    return {
      gamesList,
      router,
    };
  },
});
</script>

<style lang="scss">
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
