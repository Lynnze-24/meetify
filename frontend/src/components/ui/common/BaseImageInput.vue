<script setup lang="ts">
const emit = defineEmits(['imgChange']);
import { ref } from 'vue';
import defaultImg from '../../../assets/images/profile.jpeg';

const inputRef = ref<HTMLInputElement | null>(null);
const selectedImage = ref<string>(defaultImg);

function clickInput() {
  inputRef.value?.click();
}

const handleChange = (event: Event) => {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];

  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      selectedImage.value = reader.result as string;
      emit('imgChange', reader.result);
    };
    reader.readAsDataURL(file);
  }
};
</script>

<template>
  <div class="studentForm-image">
    <img :src="selectedImage" alt="profile pic" />
    <div @click="clickInput" class="studentForm-camera">
      <input
        @change="handleChange"
        accept="image/*"
        ref="inputRef"
        type="file"
        hidden
      />
      <i class="fas fa-camera"></i>
    </div>
  </div>
</template>

<style scoped>
.studentForm-image {
  display: flex;
  align-items: center;
  flex-direction: column;
}

.studentForm-image img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 1rem;
  box-shadow: 0 0 0.5rem 0rem rgba(0, 0, 0, 0.1);
}

.studentForm-camera {
  position: relative;
  background-color: #00c8c8;
  display: grid;
  place-items: center;
  width: 50px;
  height: 50px;
  border-radius: 1rem;
  margin-top: 10px;
  cursor: pointer;
}

.studentForm-camera input {
  width: 100%;
  height: 100%;
  appearance: none;
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
  cursor: pointer !important;
}

.studentForm-camera i {
  color: white;
  font-size: 20px;
}
</style>
