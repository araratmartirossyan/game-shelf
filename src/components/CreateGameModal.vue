<template>
  <ion-content class="game0list">
    <div class="some">
      <gs-input name="title" v-model:title="gameForm.title" />
      {{ gameForm }}
    </div>
  </ion-content>
</template>

<script>
import { IonContent } from "@ionic/vue";
import GsInput from "@/components/Input";
import { defineComponent } from "vue";

export default defineComponent({
  name: "CreateGameModal",
  props: {
    title: { type: String, default: "Add Game" },
  },
  data: () => ({
    gameForm: {
      title: "",
    },
  }),
  components: { IonContent, GsInput },
});
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
