<script setup lang="ts">
import BaseInput from '../BaseInput.vue';
import { ref } from 'vue';
defineProps<{ modelValue: string; placeholder: string }>();
const emit = defineEmits(['update:modelValue']);

const isEmail = ref(false);

function validateToggle(val: boolean) {
  isEmail.value = val;
}

function updateModelValue(value: string) {
  emit('update:modelValue', value);
}
</script>

<template>
  <BaseInput
    type="text"
    :model-modifiers="{ emailValidate: true }"
    :placeholder="placeholder"
    @update:modelValue="updateModelValue"
    :modelValue="modelValue"
    @email-validate="validateToggle"
  >
    <template #leftBlock>
      <i class="fas fa-envelope"></i>
    </template>
    <template #rightBlock>
      <div :class="['normalTick', { colorTick: isEmail }]">
        <i class="fas fa-check-circle"></i>
      </div>
    </template>
  </BaseInput>
</template>

<style scoped>
.normalTick i {
  color: var(--disabled);
}

.colorTick i {
  color: var(--primary);
}
</style>
