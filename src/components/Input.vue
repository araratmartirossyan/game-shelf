<template>
  <div
    class="gs-input-text"
    :class="{
      'gs-input-text--invalid': isInvalid,
      'gs-input-text--valid': isValid,
      'gs-input-text--disabled': disabled,
      'gs-input-text--focus': hasFocus,
    }"
  >
    <span v-if="prefix" class="gs-input-text__prefix" @click="focusInput">
      {{ prefix }}
    </span>

    <input
      ref="input"
      :disabled="disabled"
      class="gs-input-text__field"
      :class="{
        'gs-input-text__field--invalid': isInvalid,
        'gs-input-text__field--valid': isValid,
        'gs-input-text__field--prefixed': prefix,
      }"
      :autofocus="autofocus"
      :placeholder="placeholder"
      :value="value"
      @input="$emit(`update:${name}`, $event.target.value)"
      @focus="hasFocus = true"
      @blur="hasFocus = false"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'GsInputText',
  inheritAttrs: false,
  props: {
    dirname: {
      type: String,
      default: undefined,
    },
    name: {
      type: String,
      default: '',
    },
    maxlength: {
      type: [Number, String],
      default: undefined,
    },
    minlength: {
      type: [Number, String],
      default: undefined,
    },
    type: {
      type: String,
      default: 'text',
    },
    valid: {
      type: Boolean,
      default: null,
    },
    value: {
      type: [String, Number],
      default: '',
    },
    prefix: {
      type: String,
      default: undefined,
    },
    autocomplete: {
      type: [Boolean, String],
      default: undefined,
    },
    autofocus: {
      type: [Boolean, String],
      default: undefined,
    },
    id: {
      type: String,
      default: undefined,
    },
    inputmode: {
      type: String,
      default: undefined,
    },
    readonly: {
      type: [Boolean, String],
      default: undefined,
    },
    required: {
      type: [Boolean, String],
      default: undefined,
    },
    tabindex: {
      type: [Number, String],
      default: undefined,
    },
    title: {
      type: String,
      default: undefined,
    },
    placeholder: {
      type: String,
      default: undefined,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    hasFocus: false,
    internalValue: '',
  }),
  computed: {
    isValid: (vm: { valid: boolean }) => vm.valid === true,
    isInvalid: (vm: { valid: boolean }) => vm.valid === false,
  },
});
</script>

<style scoped>
.gs-input-text input {
  width: 100%;
  border-radius: 6px;
  background: #fff;
  color: black;
  border: none;
  height: 60px;
  font-size: 16px;
  padding-left: 16px;
  box-shadow: 0 1px 1px 0 rgba(66, 66, 66, 0.08),
    0 1px 3px 1px rgba(66, 66, 66, 0.16);
}
</style>
