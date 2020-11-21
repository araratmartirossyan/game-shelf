<template>
  <div class="gs-select">
    <ion-select
      :placeholder="placeholder"
      ok-text="Okay"
      cancel-text="Dismiss"
      multiple
      searchable
      @ionChange="$emit(`update:${name}`, $event.target.value)"
    >
      <input slot="start" placeholder="search" />
      <ion-select-option
        v-for="({ option, value }, key) in options"
        :key="key"
        :value="value"
      >
        {{ option }}
      </ion-select-option>
    </ion-select>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonSelect, IonSelectOption } from '@ionic/vue';

export default defineComponent({
  name: 'GsSelect',
  inheritAttrs: false,
  components: {
    IonSelect,
    IonSelectOption,
  },
  props: {
    options: {
      type: Array,
      default: () => [],
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
  },

  data: () => ({
    hasFocus: false,
  }),
});
</script>

<style scoped>
.gs-select select {
  width: 100%;
  border-radius: 6px;
  background: #fff;
  border: none;
  height: 60px;
  font-size: 16px;
  padding: 0 16px;
  box-shadow: 0 1px 1px 0 rgba(66, 66, 66, 0.08),
    0 1px 3px 1px rgba(66, 66, 66, 0.16);
}
</style>
