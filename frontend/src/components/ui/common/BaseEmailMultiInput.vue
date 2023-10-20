<script setup lang="ts">
import { isValidEmail } from '@/utils/validate';
import { ref, type VNodeRef } from 'vue';
const props = defineProps<{
  modelValue: string[];
  placeholder: string;
}>();

interface ValueRef {
  email: string;
  valid: boolean;
}

const valuesRef = ref<ValueRef[]>([]);

const inputRef = ref<HTMLElement | undefined>();
const emit = defineEmits(['update:modelValue']);

function emitValue() {
  emit('update:modelValue', valuesRef?.value.map(x => x.email));
}



function keyPressHandler(e: KeyboardEvent) {
  console.log(e)
  if (e.code === 'Space' || e.code === 'Enter') {
    const changedVal = (inputRef.value as HTMLElement)?.innerText.replaceAll(
      '&nbsp;',
      ''
    ).trim();
    console.log(changedVal, 'add email');
    if (!changedVal){
      (inputRef.value as HTMLElement).innerHTML = '';
      return;
    } 
    valuesRef.value.push({
      email: changedVal,
      valid: isValidEmail(changedVal),
    });
    (inputRef.value as HTMLElement).innerHTML = '';
    emitValue()
  }
  if(e.code==='Backspace' &&  (inputRef.value as HTMLElement).innerHTML === ''){
     if(valuesRef.value.length) valuesRef.value.length = valuesRef.value.length -1;
      console.log('backspace')
      emitValue()
  }
  
}
</script>

<template>
  <div class="formControl">
    <p @click="()=>(inputRef as HTMLElement).focus()" class="textWrap">
      <p
        :class="{ invalid: !v.valid }"
        v-for="v of valuesRef"
        :contenteditable="false"
        >{{ v.email }}</p
      >

      <p
        ref="inputRef"
        @keyup="keyPressHandler"
        :contenteditable="true"
        class="input"
      ></p>
      <p v-if="valuesRef.length < 1 && !inputRef?.innerText" class="placeholder">Attendees</p>
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
  overflow-y: auto;
  display: flex;
  align-content: flex-start;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.textWrap p:not(.input,.placeholder) {
  background-color: var(--primary);
  color: white;
  border-radius: 0.5rem;
  padding: 0.005rem 0.5rem;
  height: max-content;
 
}

p.invalid:not(.input) {
  background-color: var(--danger);
  
}

.input {
  display: inline;
}

.formControl .textWrap:focus-within {
  border-color: var(--primary);
}

.formControl .textWrap:focus-within .placeholder{
  display: none;
}

.formControl .placeholder {
  color: #c4c4c4;
  font-size: 1.4rem;
  font-weight: normal;
  font-family: serif;
}
</style>
