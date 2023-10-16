<script setup lang="ts">
// defineProps<{ msg: string }>();
import { ref } from 'vue';
import BaseInput from '../ui/common/BaseInput.vue';
import BaseButton from '../ui/common/BaseButton.vue';
import BaseTextArea from '../ui/common/BaseTextArea.vue';

const formVals = ref({
  email: '',
  subject: '',
  messageBody: '',
});
</script>

<template>
  <form>
    <BaseInput
      type="text"
      v-model="formVals.email"
      placeholder="Email Address"
    ></BaseInput>
    <BaseInput
      type="text"
      v-model="formVals.subject"
      placeholder="Subject"
    ></BaseInput>
    <BaseTextArea
      type="text"
      v-model="formVals.messageBody"
      placeholder="Message..."
    ></BaseTextArea>
    <BaseButton class-name="formBtn">Send</BaseButton>
  </form>
</template>

<style scoped>
form {
  min-width: 35rem;
}
@media screen and (max-width: 800px) {
  form {
    min-width: 30rem;
  }
}

@media screen and (max-width: 650px) {
  form {
    min-width: 35rem;
  }
}

@media screen and (max-width: 380px) {
  form {
    min-width: 23rem;
  }
}

.formBtn {
  font-size: clamp(1.2rem, 2vw, 1.5rem);
  height: 5rem;
  line-height: 5rem;
  --secondary: white;
  --btn: var(--primary);
}
</style>
