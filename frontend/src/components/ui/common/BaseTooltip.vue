<script setup lang="ts">
const { mode = 'fullWidth' } = defineProps<{
  mode?: 'maxWidth' | 'fullWidth';
}>();
</script>

<template>
  <div class="tooltip" :class="mode">
    <slot></slot>
    <div class="tooltip-text">
      <slot name="tooltip-content"></slot>
    </div>
  </div>
</template>

<style scoped>
.tooltip {
  width: 100%;
  position: relative;
}
.tooltip-text {
  visibility: hidden;
  transition: 0.3s ease-in-out;
  scale: 0;
  padding: 0.5rem 1rem;
  background-color: white;
  box-shadow: 0 0 0.5rem 0 rgba(0, 0, 0, 0.2);
  border-radius: 0.5rem;
  position: absolute;
  top: calc(100% + 0.3rem);
  left: 0;
  z-index: 9999;
}

.tooltip:hover .tooltip-text {
  visibility: visible;
  scale: 1;
}

.fullWidth {
  width: 100%;
}

.maxWidth {
  width: max-width;
}
</style>
