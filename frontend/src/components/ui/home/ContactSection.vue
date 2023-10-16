<script setup lang="ts">
// defineProps<{ msg: string }>();
import ContactForm from '../../forms/ContactForm.vue';
</script>

<template>
  <section id="contact" class="wrapper">
    <div class="contact-wrapper">
      <div class="contact-content">
        <div class="contact-img">
          <img
            src="https://images.unsplash.com/photo-1615840287214-7ff58936c4cf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80"
            alt="calendar image"
          />
        </div>
        <div class="contactCon">
          <h4>Drop Us DM!</h4>
          <ContactForm />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.wrapper {
  background-color: var(--secondary);
  display: flex;
  flex-direction: column;
  align-items: center;
  --gapcontact: min(5rem, 5vw);
}

@media screen and (max-width: 1000px) {
  .wrapper {
    padding-inline: var(--homeSidePadding);
  }
}

.contact-wrapper {
  max-width: 100rem;
  display: flex;
  flex-direction: column;
  padding: 5vw 0;
  padding-top: 10vw;
  color: var(--primary);
  gap: min(5rem, 5vw);
}

.contact-content {
  display: flex;
  align-items: center;
  gap: var(--gapcontact);
}

.contact-img {
  width: 50%;
}

.contact-img img {
  width: 100%;
  aspect-ratio: 1/1;
  object-fit: cover;
  border-radius: 2rem;
}

.contactCon {
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: var(--gapcontact);
}
.contactCon h4 {
  font-family: var(--fontAbril);
  letter-spacing: 0.2rem;
  font-size: clamp(2.5rem, 3vw, 4.8rem);
  font-weight: normal;
  color: var(--primary);
}

@media screen and (max-width: 650px) {
  .contactCon {
    width: 100%;
  }

  .contact-img {
    display: none;
  }
}
</style>
