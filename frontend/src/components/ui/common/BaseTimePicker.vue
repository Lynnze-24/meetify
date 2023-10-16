<script setup lang="ts">
const props = defineProps<{
  modelValue: string | null;
  placeholder: string;
}>();

import Datepicker from 'vuejs3-datepicker';

import { computed, ref } from 'vue';

const isOpen = ref<boolean>(false);
const currentTime = new Date();
const hour = ref<number>(currentTime.getHours());
const min = ref<number>(currentTime.getMinutes());

const dateStr = computed(() => (!props?.modelValue ? null : props?.modelValue));

const emit = defineEmits(['update:modelValue']);

function emitValue() {
  const hourVal = hour.value < 10 ? '0' + hour.value : hour.value;
  const minVal = min.value < 10 ? '0' + min.value : min.value;
  emit('update:modelValue', `${hourVal} : ${minVal}`);
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

    <div class="calendarInput" @click="isOpen = !isOpen">
      <p v-if="!dateStr" class="placeholder">{{ placeholder }}</p>
      <p v-else>{{ dateStr }}</p>
      <div @click.stop v-if="isOpen" class="timeBlock">
        <div class="hour">
          <span
            @click.stop="
              if (hour < 23) {
                hour += 1;
                emitValue();
              }
            "
            :class="{ disabled: hour >= 23 }"
            class="material-icons"
          >
            expand_less
          </span>
          <p>{{ hour < 10 ? '0' + hour : hour }}</p>
          <span
            @click.stop="
              if (hour > 0) {
                hour -= 1;
                emitValue();
              }
            "
            :class="{ disabled: hour <= 0 }"
            class="material-icons"
          >
            expand_more
          </span>
        </div>

        <p>:</p>

        <div class="minute">
          <span
            @click.stop="
              if (min < 59) {
                min += 1;
                emitValue();
              }
            "
            :class="{ disabled: min >= 59 }"
            class="material-icons"
          >
            expand_less
          </span>
          <p>{{ min < 10 ? '0' + min : min }}</p>
          <span
            @click.stop="
              if (min > 0) {
                min -= 1;
                emitValue();
              }
            "
            :class="{ disabled: min <= 0 }"
            class="material-icons"
          >
            expand_more
          </span>
        </div>
      </div>
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

.timeBlock {
  position: absolute;
  top: calc(100% + 0.5rem);
  left: 0;
  z-index: 999;
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding: 1rem 0;
  background-color: white;
  box-shadow: 0 0 0.5rem 0 rgba(0, 0, 0, 0.2);
  border-radius: 1rem;
  user-select: none;
}

.hour,
.minute {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  font-size: 2em;
}

.minute span,
.hour span {
  cursor: pointer;
}

.timeBlock > p {
  font-size: 2em;
}

.timeBlock .disabled {
  color: rgb(225, 225, 225);
}
</style>
