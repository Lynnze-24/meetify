<script setup lang="ts">
const props = defineProps<{
  modelValue: string | number | undefined;
  placeholder: string;
  modelModifiers?: { emailValidate: Boolean };
}>();

const emit = defineEmits(['update:modelValue']);

function emitValue(e: Event) {
  let value = (e.target as HTMLInputElement).value;
  emit('update:modelValue', value);
}
</script>

<template>
  <div class="formControl">
    <textarea
      rows="3"
      :placeholder="placeholder"
      :value="modelValue"
      @input="emitValue"
    ></textarea>
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

.formControl textarea {
  font-family: 'Helvetica Neue';
  font-weight: 500;
  font-size: 1.4rem;
  width: 100%;
  padding: 1.5rem var(--inputPad);
  border-radius: 1rem;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background-color: rgba(255, 255, 255, 0.8);
  color: #323232;
}
.formControl textarea:focus {
  border-color: var(--primary);
}

.formControl textarea::placeholder {
  color: #c4c4c4;
  font-size: 14px;
}
</style>
