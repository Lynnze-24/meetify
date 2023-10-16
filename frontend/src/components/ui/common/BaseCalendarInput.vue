<script setup lang="ts">
const props = defineProps<{
  modelValue: Date | null;
  placeholder: string;
}>();

import Datepicker from 'vuejs3-datepicker';

import { computed, ref } from 'vue';

const inputRef = ref<HTMLElement | null>(null);

const isOpen = ref<boolean>(false);

const dateStr = computed(() =>
  !props?.modelValue ? null : props?.modelValue.toDateString()
);

const emit = defineEmits(['update:modelValue']);

function emitValue(value: Date) {
  emit('update:modelValue', value);
}

function selectDate(date: Date) {
  emitValue(date);
  isOpen.value = false;
}
</script>

<template>
  <div
    v-click-away="
      () => {
        isOpen = false;
      }
    "
    :class="['formControl-calendar']"
  >
    <div v-if="$slots.leftBlock" class="formControl-left">
      <slot name="leftBlock"></slot>
    </div>

    <Datepicker
      :ref="
        (el:HTMLElement) => {
          inputRef = el;
        }
      "
      v-if="isOpen"
      @selected="selectDate"
      class="calendarBlock"
      inline
      :full-month-name="true"
      placeholder="YYYY-MM-DD"
    ></Datepicker>

    <div class="calendarInput" @click="isOpen = !isOpen">
      <p v-if="!dateStr" class="placeholder">{{ placeholder }}</p>
      <p v-else>{{ dateStr }}</p>
    </div>
  </div>
</template>

<style scoped>
.formControl-calendar {
  width: 100%;
  display: flex;
  position: relative;
  height: 5rem;
  font-family: 'Helvetica Neue';
  font-size: 1.4rem;
  border-radius: 1rem;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background-color: rgba(255, 255, 255, 0.8);
  color: #323232;
  margin-bottom: var(--space);
  font-weight: 500;
}

.calendarBlock {
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 999;
}

.formControl-left {
  background-color: #323232;
  border-top-left-radius: 1rem;
  border-bottom-left-radius: 1rem;
  z-index: 2;
}

.calendarInput {
  font-family: 'Helvetica Neue';
  font-weight: 500;
  font-size: 1.4rem;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  padding-left: var(--inputPad);
  border-top-right-radius: 1rem;
  border-bottom-right-radius: 1rem;
  color: #323232;
  cursor: pointer;
}
.calendarInput .placeholder {
  font-family: 'Helvetica Neue';
  color: #c4c4c4;
  font-size: 14px;
  user-select: none;
}

.calendarInput P {
  font-family: 'Helvetica Neue';
}
</style>
