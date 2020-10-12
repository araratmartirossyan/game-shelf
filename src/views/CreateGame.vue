<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Add game</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="add-game__content ion-padding">
      <gs-input name="title" v-model:title="gameForm.title" />
      {{ gameForm }}
    </ion-content>
  </ion-page>
</template>

<script>
import {
  IonContent,
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
} from '@ionic/vue'
import GsInput from '@/components/Input.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CreateGameModal',
  props: {
    title: { type: String, default: 'Add Game' },
  },
  data: () => ({
    gameForm: {
      title: '',
    },
  }),
  components: { IonContent, GsInput, IonPage, IonHeader, IonToolbar, IonTitle },
})
</script>

<style lang="scss">
.some {
  background: #f5f5f5;
  width: 100%;
  padding: 10px;
}
.modal-wrapper {
  background: transparent !important;
}
.create-game-modal {
  background: rgba(0, 0, 0, 0.5) !important;
  padding: 60% 0 0 0 !important;
  .modal-wrapper {
    opacity: 1;
    border-top-left-radius: 21px;
    border-top-right-radius: 21px;

    margin: 3px;
  }
}
ion-content {
  --background: #f5f5f5;
}
</style>
