<script setup lang="ts">
// defineProps<{ msg: string }>();
</script>

<template>
  <footer>
    <div class="footerContent">
      <div class="logo">
        <img src="/logo.png" alt="heroBg" />
      </div>
      <p>© 2023 TutorRoom Meetify Co.Ltd. All rights reserved.</p>
      <div class="links">
        <router-link to="/privacypolicy">Privacy Policy</router-link>
        <span>&nbsp;|&nbsp;</span>
        <router-link to="/termsofservice">Terms of service</router-link>
      </div>
    </div>
  </footer>
</template>

<style scoped>
footer {
  --s: 105px; /* control the size */
  --c1: #b9b9b9;
  --c2: #dcdcdc;
  --c3: #fafafa;
  background: linear-gradient(rgba(2, 48, 71, 0.9), rgba(2, 48, 71, 0.9)),
    conic-gradient(
        from 80deg,
        var(--c1) 10deg,
        var(--c2) 0 90deg,
        #0000 0 180deg,
        var(--c2) 0 265deg,
        var(--c1) 0 80deg,
        #0000 0
      )
      calc(0.5 * var(--s)) calc(0.5 * var(--s) / 0.577),
    conic-gradient(
      var(--c1) 30deg,
      var(--c3) 0 75deg,
      var(--c1) 0 90deg,
      var(--c2) 0 105deg,
      var(--c3) 0 150deg,
      var(--c2) 0 180deg,
      var(--c3) 0 210deg,
      var(--c1) 0 256deg,
      var(--c2) 0 270deg,
      var(--c1) 0 286deg,
      var(--c2) 0 331deg,
      var(--c3) 0
    );
  background-size: var(--s) calc(var(--s) / 1.5);
  display: flex;
  flex-direction: column;
  align-items: center;
}

@media screen and (max-width: 1000px) {
  footer {
    padding-inline: var(--homeSidePadding);
  }
}

.footerContent {
  width: 100%;
  max-width: 100rem;
  display: flex;
  padding: 5vw 0;
  flex-direction: column;
  align-items: center;
  color: white;
}

.footerContent p {
  font-size: clamp(1rem, 1.5vw, 1.5rem);
  margin-bottom: 1.5rem;
}

.footerContent a {
  color: white;
}

.footerContent a:hover {
  text-decoration: underline;
}

.logo {
  width: 13rem;
}

.logo img {
  width: 100%;
  aspect-ratio: 1/1;
  object-fit: cover;
}
</style>
