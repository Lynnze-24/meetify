<script setup lang="ts">
// defineProps<{ msg: string }>();
import Axios from '@/utils/axios';
import BaseButton from '../common/BaseButton.vue';
import { ref } from 'vue';

const loading = ref(false);

const scrollToView = () => {
  (document.getElementById('contact') as HTMLElement).scrollIntoView({
    behavior: 'smooth',
  });
};

const fetchAuthUrl = async () => {
  try {
    loading.value = true;
    const res = await Axios.get('/authorize');
    if (res?.data?.authUrl) {
      window.open(res.data.authUrl, '_self');
    } else {
      console.log(res);
    }
  } catch (e) {
    console.log(e);
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <section class="hero">
    <div class="blendBg">
      <img src="../../../assets/hero.webp" alt="heroBg" />
    </div>

    <div class="logo">
      <img src="/logo.png" alt="heroBg" />
    </div>

    <div class="content">
      <h1>Meet magic in a flash.</h1>
      <div class="btnCon">
        <BaseButton
          @click="fetchAuthUrl"
          class-name="heroBtn"
          color="secondary"
          mode="contained"
          >Get Started</BaseButton
        >
        <BaseButton
          @click="scrollToView"
          class-name="heroBtn"
          color="secondary"
          mode="contained"
          >Contact Us</BaseButton
        >
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  height: min-content;
  max-height: 100vh;
  background-color: var(--primary);
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.logo {
  position: absolute;
  top: min(5rem, 5vw);
  left: min(5rem, 5vw);
  width: 13rem;
}

.logo img {
  width: 100%;
  aspect-ratio: 1/1;
  object-fit: cover;
}

@media screen and (max-width: 1000px) {
  .content {
    padding-inline: var(--homeSidePadding);
  }
}

.content {
  z-index: 2;
  margin: auto;
  inset: 0;
  position: absolute;
  display: flex;
  flex-direction: column;
  height: max-content;
  align-items: center;
  gap: 5rem;
}

.btnCon {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3rem;
  width: 100%;
}

.heroBtn {
  width: min(20rem, 30%);
  font-size: clamp(1.2rem, 2vw, 2rem);
  height: 6rem;
  line-height: 6rem;
}

.hero h1 {
  text-align: center;
  font-size: min(6vw, 8rem);
  font-family: var(--fontAbril);
  letter-spacing: 0.1rem;
  color: var(--tertiary);
}
.blendBg {
  width: 100%;
  max-width: 100rem;
  aspect-ratio: 1/1;

  mix-blend-mode: hard-light;
  filter: grayscale(1);
}

.blendBg img {
  width: 100%;
  height: 100%;
  opacity: 0.5;
  object-fit: cover;
}
</style>
