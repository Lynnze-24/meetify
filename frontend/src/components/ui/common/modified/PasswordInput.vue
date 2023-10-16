<script setup lang="ts">
import BaseInput from '../BaseInput.vue';
import { ref, computed } from 'vue';
defineProps<{ modelValue: string; placeholder: string }>();
const emit = defineEmits(['update:modelValue']);

const typeRef = ref('password');

function eyeToggle() {
  if (typeRef.value === 'text') {
    typeRef.value = 'password';
  } else {
    typeRef.value = 'text';
  }
}

const isEyeOpen = computed<boolean>(() => {
  return typeRef.value === 'text';
});

function updateModelValue(value: string) {
  emit('update:modelValue', value);
}
</script>

<template>
  <BaseInput
    :type="typeRef"
    :placeholder="placeholder"
    @update:modelValue="updateModelValue"
    :modelValue="modelValue"
  >
    <template #leftBlock>
      <i class="fas fa-lock"></i>
    </template>
    <template #rightBlock>
      <div
        @click="eyeToggle"
        :class="['formControl-eye', { eyeOpen: isEyeOpen }]"
      >
        <i class="fas fa-eye"></i>
        <svg
          width="20"
          height="11"
          viewBox="0 0 20 11"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M0 1.50461C0 0.673637 0.706919 0 1.57895 0C2.30418 0 2.91398 0.4655 3.09977 1.09916C5.14917 7.62096 14.8453 7.6227 16.8987 1.10431C17.0827 0.467998 17.6939 0 18.4211 0C19.2931 0 20 0.673637 20 1.50461C20 1.6617 19.9746 1.81407 19.927 1.95766C19.5372 3.2006 18.9514 4.28336 18.2192 5.20276L19.2293 6.16532C19.8459 6.75291 19.8459 7.70557 19.2293 8.29316C18.6127 8.88075 17.613 8.88075 16.9963 8.29316L15.9324 7.27932C15.376 7.64276 14.7867 7.94845 14.1753 8.19657L14.4309 9.1056C14.6566 9.90825 14.1567 10.7333 13.3144 10.9484C12.4721 11.1634 11.6063 10.6871 11.3806 9.88444L11.1168 8.94609C10.3748 9.01934 9.62524 9.01933 8.88323 8.94608L8.61938 9.88444C8.39368 10.6871 7.52788 11.1634 6.68557 10.9484C5.84325 10.7333 5.34339 9.90825 5.56908 9.1056L5.8247 8.19652C5.21339 7.94843 4.62419 7.64277 4.06779 7.27938L3.00392 8.29316C2.3873 8.88075 1.38757 8.88075 0.770949 8.29316C0.154332 7.70558 0.154332 6.75291 0.770949 6.16532L1.78099 5.20283C1.05 4.28494 0.464897 3.20421 0.0750407 1.96383C0.0261789 1.81844 0 1.66396 0 1.50461Z"
            fill="#646464"
          />
        </svg>
      </div>
    </template>
  </BaseInput>
</template>

<style scoped>
.formControl-eye i,
.formControl-eye i {
  font-size: 1.8rem;
  color: #323232;
  visibility: hidden;
  transform: scaleY(0);
  transition: transform 0.1s ease-in-out;
}

.formControl-eye svg,
.formControl-eye svg {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: transform 0.1s ease-in-out;
}

/* dynamic classes  for password input */

.formControl-eye.eyeOpen svg,
.formControl-eye.eyeOpen svg {
  transform: translate(-50%, -50%) scaleY(0);
  transition: transform 0.1s 0.1s ease-in-out;
}

.formControl-eye.eyeOpen i,
.formControl-eye.eyeOpen i {
  transform: scaleY(1);
  visibility: visible;
  transition: transform 0.1s 0.1s ease-in-out;
}
</style>
