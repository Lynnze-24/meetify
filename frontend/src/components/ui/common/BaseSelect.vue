<script setup lang="ts">
import { ref } from 'vue';

defineProps<{
  modelValue: string;
  placeholder: string;
  options: any[];
  optionKey?: string;
  dropConClass?: string;
  textOptionKey?: string; // key name for the option text
}>();

const isOpen = ref(false);

const emit = defineEmits(['update:modelValue']);

const changeHandler = (item: any) => {
  emit('update:modelValue', item);
};
</script>

<template>
  <div :class="['formControl-select']">
    <div v-if="$slots.leftBlock" class="formControl-left">
      <slot name="leftBlock"></slot>
    </div>

    <div
      v-click-away="
        () => {
          isOpen = false;
        }
      "
      @click="isOpen = !isOpen"
      class="selectInput"
    >
      <p class="placeholder" v-if="modelValue === ''">{{ placeholder }}</p>
      <p v-else>{{ modelValue }}</p>
      <i :class="isOpen ? 'fas fa-chevron-up' : 'fas fa-chevron-down'"></i>

      <div
        v-if="isOpen"
        :class="['dropCon', { noLeftBlock: !$slots.leftBlock }]"
      >
        <div
          v-for="(item, index) in options"
          :key="
            typeof item === 'string' || typeof item === 'number'
              ? item + index.toString()
              : optionKey
              ? item[optionKey]
              : index
          "
          class="optionBlock"
          @click="() => changeHandler(item)"
        >
          <slot name="optionTemplate"></slot>
          <p v-if="!$slots.optionTemplate">
            {{
              typeof item === 'string' || typeof item === 'number'
                ? item
                : textOptionKey
                ? item[textOptionKey]
                : ''
            }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.formControl-select {
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
}

.selectInput {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  padding-left: var(--inputPad);
  font-size: 1.4rem;
  padding-right: 2rem;
  cursor: pointer;
  color: #323232;
  gap: 1rem;
  font-family: 'Helvetica Neue';
  position: relative;
}

.selectInput p {
  font-size: 1.4rem;
  width: 100%;
  font-family: 'Helvetica Neue';
}

.selectInput i {
  font-weight: bold;
  color: #323232;
  font-size: 1.6rem;
}

.formControl-select .placeholder {
  color: #c4c4c4;
  font-size: 1.4rem;
  font-family: 'Helvetica Neue';
  user-select: none;
}

/* dropdown */

.dropCon {
  width: 100%;
  padding: 0;
  z-index: 9999;
  font-size: 1rem;
  margin-top: 0.5rem;
  height: 12rem;
  overflow: auto;
  font-family: 'Helvetica Neue';
  position: absolute;
  top: 100%;
  left: 0;
  background-color: white;
  box-shadow: 0 0 0.5rem 0rem rgba(0, 0, 0, 0.15);
  border-radius: 0.5rem;
}

.halfCon {
  width: calc((var(--formSize) * 0.6) - 5rem);
}

/* .noLeftBlock {
} */

.optionBlock {
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  font-size: 1.2rem;
  cursor: pointer;
  font-family: 'Helvetica Neue';
}

.optionBlock p {
  margin-left: 1rem;
  font-family: 'Helvetica Neue';
}

.optionBlock:hover {
  background-color: aliceblue;
}
</style>
