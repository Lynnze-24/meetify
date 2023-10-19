<script setup lang="ts">
import { isValidEmail } from '@/utils/validate';
import { ref, type VNodeRef } from 'vue';
const props = defineProps<{
  modelValue: string | number | undefined;
  placeholder: string;
  modelModifiers?: { emailValidate: Boolean };
}>();

interface ValueRef {
  email: string;
  valid: boolean;
}

const valuesRef = ref<ValueRef[]>([{ email: 'aung@gmail.com', valid: true }]);

const inputRef = ref<HTMLElement | undefined>();
const emit = defineEmits(['update:modelValue']);

function emitValue(e: Event) {
  let value = (e.target as HTMLInputElement).value;
  emit('update:modelValue', value);
}

function handleInput(event: Event) {
  console.log(inputRef.value?.innerHTML, event);
  if (
    (event as InputEvent).data === ' ' &&
    (event as InputEvent).inputType === 'insertText'
  ) {
    const changedVal = (inputRef.value as HTMLElement)?.innerHTML.replace(
      '&nbsp;',
      ''
    );
    if (!changedVal) return;
    valuesRef.value.push({
      email: changedVal,
      valid: isValidEmail(changedVal),
    });
    (inputRef.value as HTMLElement).innerHTML = '';
  }
  console.log(valuesRef.value);
}

function focusHandler() {
  (inputRef.value as HTMLElement).focus();
  console.log('focussed');
}
</script>

<template>
  <div class="formControl">
    <p
      tabindex="0"
      @focus="focusHandler"
      @input="handleInput"
      class="textWrap"
      :contenteditable="true"
    >
      <span
        :class="{ invalid: !v.valid }"
        v-for="v of valuesRef"
        :contenteditable="false"
        >{{ v.email }}</span
      >

      <span ref="inputRef" :contenteditable="true" class="input"></span>
    </p>
  </div>
</template>

<style scoped>
.formControl {
  width: 100%;
  display: flex;
  margin-bottom: var(--space);
  position: relative;
  height: 10rem;
}

.formControl .textWrap {
  font-weight: 500;
  font-size: 1.4rem;
  width: 100%;
  padding: 1.5rem var(--inputPad);
  border-radius: 1rem;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background-color: rgba(255, 255, 255, 0.8);
  color: #323232;
  white-space: wrap;
  max-width: 35rem;
  line-height: 2.5rem;
}

.textWrap span:not(.input) {
  background-color: var(--primary);
  color: white;
  border-radius: 0.5rem;
  padding: 0.05rem 0.5rem;
  margin-right: 0.5rem;
}

span.invalid:not(.input) {
  background-color: var(--danger);
}

.input {
  display: inline;
}

.formControl .textWrap:focus {
  border-color: var(--primary);
}

.formControl .placeholder {
  color: #c4c4c4;
  font-size: 14px;
}
</style>
