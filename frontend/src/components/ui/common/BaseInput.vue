<script setup lang="ts">
import { isValidEmail } from '../../../utils/validate';

const props = defineProps<{
  modelValue: string | number | undefined;
  type: string;
  placeholder: string;
  modelModifiers?: { emailValidate: Boolean };
}>();

const emit = defineEmits(['update:modelValue', 'emailValidate']);

function emitValue(e: Event) {
  let value = (e.target as HTMLInputElement).value;
  if (props.modelModifiers?.emailValidate) {
    emit('emailValidate', isValidEmail(value));
  }

  emit('update:modelValue', value);
}
</script>

<template>
  <div :class="['formControl-input', { noLeftBlock: !$slots.leftBlock }]">
    <div v-if="$slots.leftBlock" class="formControl-left">
      <slot name="leftBlock"></slot>
    </div>
    <div v-if="$slots.leftExtra" class="formControl-extraLeft">
      <slot name="leftExtra"></slot>
    </div>

    <div v-if="$slots.rightBlock" class="formControl-right">
      <slot name="rightBlock"></slot>
    </div>
    <input
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      @input="emitValue"
    />
  </div>
</template>

<style>
.formControl-left i {
  color: var(--secondary);
  font-size: 2.2rem;
  height: 5rem;
  line-height: 5rem;
  width: 5rem;
  display: grid;
  place-items: center;
}

.formControl-right i {
  font-size: 1.8rem;
  color: #323232;
}
</style>

<style scoped>
.formControl-input {
  width: 100%;
  display: flex;
  margin-bottom: var(--space);
  position: relative;
  height: 5rem;
}
.formControl-left {
  background-color: #323232;
  border-top-left-radius: 1rem;
  border-bottom-left-radius: 1rem;
}

.formControl-input input {
  font-family: 'Helvetica Neue';
  font-weight: 500;
  font-size: 1.4rem;
  width: 100%;
  padding: 0 1.5rem;
  border-top-right-radius: 1rem;
  border-bottom-right-radius: 1rem;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background-color: rgba(255, 255, 255, 0.8);
  color: #323232;
}

.formControl-input input:focus {
  border-color: var(--primary);
}

.formControl-input input::placeholder {
  color: #c4c4c4;
  font-size: 14px;
}

.formControl-right {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  border-radius: 50%;
  height: 2rem;
  width: 2rem;
  color: var(--secondary);
  /* display: grid;
  place-items: center; */
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.noLeftBlock input {
  padding-left: var(--inputPad);
  border-radius: 1rem;
}

.formControl-extraLeft {
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 5rem;
  border-radius: 1rem;
}

.formControl-extraLeft ~ input {
  border-left: none;
  margin-left: 11rem;
  z-index: 2;
}

.formControl-right ~ input {
  padding-right: 4.5rem;
}
</style>
