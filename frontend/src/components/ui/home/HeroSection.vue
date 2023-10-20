<script setup lang="ts">
// defineProps<{ msg: string }>();
import Axios from '@/utils/axios';
import BaseButton from '../common/BaseButton.vue';
import { ref } from 'vue';
import GoogleButton from '../common/GoogleButton.vue';

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
        <GoogleButton text="Continue with Google" @click="fetchAuthUrl">
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            style="display: block"
          >
            <path
              fill="#EA4335"
              d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
            ></path>
            <path
              fill="#4285F4"
              d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
            ></path>
            <path
              fill="#FBBC05"
              d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
            ></path>
            <path
              fill="#34A853"
              d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
            ></path>
            <path fill="none" d="M0 0h48v48H0z"></path>
          </svg>
        </GoogleButton>
        <GoogleButton text="Contact Us" @click="scrollToView"
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            height="21"
            viewBox="0 -960 960 960"
            width="21"
          >
            <path
              fill="white"
              d="M80-80v-720q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H240L80-80Zm126-240h594v-480H160v525l46-45Zm-46 0v-480 480Z"
            />
          </svg>
        </GoogleButton>
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
