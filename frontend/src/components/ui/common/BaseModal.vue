<template>
  <teleport to="body">
    <transition name="modal-scale">
      <div v-if="visible" class="modal">
        <div class="modal-content">
          <button @click="closeModal" class="modal-close-button">×</button>
          <slot></slot>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script setup lang="ts">
const props = defineProps({
  visible: Boolean, // Prop to control modal visibility
});

const emit = defineEmits(['closeModal']);

const closeModal = () => {
  emit('closeModal');
};
</script>

<style scoped>
.modal-scale-enter-active,
.modal-scale-leave-active {
  transition: 0.3s ease-in-out;
}
.modal-scale-enter-from,
.modal-scale-leave-to {
  transform: scale(0);
}

.modal-scale-enter-to,
.modal-scale-leave-from {
  transform: scale(1);
}

.modal {
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.modal-content {
  background: white;
  padding: 3rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;
  max-width: 80%;
}

.modal-close-button {
  position: absolute;
  top: 0rem;
  right: 0rem;
  border-top-right-radius: 0.5rem;
  border-bottom-left-radius: 0.5rem;
  width: 3rem;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--danger);
  color: white;
  cursor: pointer;
  font-size: 1.8rem;
  line-height: 3rem;
}

@media screen and (max-width: 400px) {
  .modal-content {
    max-width: 100%;
    width: 100%;
    height: 100%;
    border-radius: 0;
  }

  .modal-close-button {
    border-radius: 0;
  }
}

.modal-close-button:hover {
  background-color: white;
  color: var(--danger);
  box-shadow: 0 0 0.5rem 0 var(--danger);
}
</style>
