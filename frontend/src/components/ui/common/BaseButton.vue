<template>
  <button :class="[mode, color, className, { disabled: disabled }]">
    <slot></slot>
    <i v-if="loading" class="fas fa-spinner fa-pulse"></i>
  </button>
</template>
<script lang="ts">
export default {
  props: {
    btnColor: {
      type: String,
      required: false,
      default: 'black',
    },
    className: {
      type: String,
      required: false,
      default: '',
    },
    loading: {
      type: Boolean,
      required: false,
      default: false,
    },
    mode: {
      type: String,
      required: false,
      default: 'contained',
    },
    color: {
      type: String,
      required: false,
      default: '',
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
};
</script>
<style>
button {
  cursor: pointer;
  outline: none;
  border: none;
  transition: all 0.3s ease-in-out;
  display: flex;
  justify-content: center;
  align-items: baseline;
}

button i {
  margin-left: 0.6rem;
  font-size: 1.3rem;
}

.contained {
  --btn: var(--purple);
  --btnSec: var(--secondary);
  width: 100%;
  height: 5rem;
  line-height: 5rem;
  color: var(--btnSec);
  background-color: var(--btn);
  border-radius: 1rem;
  font-size: 1.3rem;
  letter-spacing: 0.1rem;
  font-weight: 500;
  text-align: center;
  transition: all 0.3s ease-in-out;
  cursor: pointer;
}

.contained:hover {
  background-color: var(--btnSec);
  color: var(--btn);
  box-shadow: 0 0 0.5rem 0rem var(--btn);
}

.primary {
  --btn: var(--primary);
}

.navy {
  --btn: var(--navy);
}

.danger {
  --btn: var(--danger);
}

button.disabled {
  background-color: var(--disabled);
  color: var(--txt);
  pointer-events: none;
  user-select: none;
}
</style>
