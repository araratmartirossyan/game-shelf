<template>
  <ion-page>
    <ion-content>
      <ion-tabs>
        <ion-tab-bar>
          <ion-tab-button tab="tab1" href="/tabs/tab1">
            <ion-icon :icon="triangle" />
            <ion-label>Games</ion-label>
          </ion-tab-button>

          <ion-tab-button tab="tab2" @click="openModal">
            <ion-icon :name="addCircle" />
            <ion-label>Add game</ion-label>
          </ion-tab-button>

          <ion-tab-button tab="tab3" href="/tabs/tab3">
            <ion-icon :icon="square" />
            <ion-label>Profile</ion-label>
          </ion-tab-button>
        </ion-tab-bar>
      </ion-tabs>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonContent,
  IonLabel,
  IonIcon,
  IonPage,
  modalController,
} from "@ionic/vue";
import { ellipse, square, triangle, addCircle, person } from "ionicons/icons";
import CreateGameModal from "@/components/CreateGameModal.vue";

export default {
  name: "Tabs",
  components: {
    IonContent,
    IonLabel,
    IonTabs,
    IonTabBar,
    IonTabButton,
    IonIcon,
    IonPage,
  },
  setup() {
    const openModal = async () => {
      const modal = await modalController.create({
        component: CreateGameModal,
        cssClass: "create-game-modal",
        componentProps: {
          data: {
            content: "New Content",
          },
          cssClass: "create-game-modal",

          propsData: {
            title: "New title",
          },
        },
      });
      return modal.present();
    };
    return {
      ellipse,
      square,
      triangle,
      addCircle,
      person,
      openModal,
    };
  },
};
</script>
