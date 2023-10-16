<script setup lang="ts">
// defineProps<{ msg: string }>();
import customer1 from '../../../assets/customer1.webp';
import customer2 from '../../../assets/customer2.jpg';
import customer3 from '../../../assets/customer3.webp';

const feedbackArr = [
  {
    id: 1,
    imgSrc: customer1,
    des: 'Now I can schedule meetings in a jiffy, saving me so much time!',
    name: 'Sarah Thompson',
  },
  {
    id: 2,
    imgSrc: customer2,
    des: 'Meetify has made my scheduling experience hassle-free.',
    name: 'Jeremy Williams',
  },
  {
    id: 3,
    imgSrc: customer3,
    des: 'I love how it syncs with my Google Calendar. Fantastic!',
    name: 'Esperanza Martinez',
  },
];
</script>

<template>
  <section class="feedback-wrapper">
    <div class="feedback-content">
      <h4>Our User Feedbacks</h4>
      <div class="feedbackCon">
        <div
          class="feedback"
          v-for="feedback of feedbackArr"
          :key="feedback.id"
        >
          <img :src="feedback.imgSrc" alt="customer" />
          <q>{{ feedback.des }}</q>
          <p>{{ feedback.name }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.feedback-wrapper {
  background-color: var(--secondary);
  display: flex;
  flex-direction: column;
  align-items: center;
}

@media screen and (max-width: 1000px) {
  .feedback-wrapper {
    padding-inline: var(--homeSidePadding);
  }
}

.feedback-content {
  max-width: 100rem;
  display: flex;
  flex-direction: column;
  padding: 5vw 0;
  align-items: center;
}

.feedback-content h4 {
  font-family: var(--fontAbril);
  letter-spacing: 0.2rem;
  font-size: clamp(2.5rem, 3vw, 4.8rem);
  font-weight: normal;
  color: var(--primary);
  margin: 5rem 0;
  display: none;
}

.feedbackCon {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3rem;
}

.feedback {
  display: flex;
  align-items: center;
  flex-direction: column;
  min-height: 40rem;
  padding: 2rem;
  border-radius: 2rem;
  background-color: rgba(0, 0, 0, 0.1);
  gap: 2rem;
  width: 33.33%;
}

.feedback img {
  width: 7rem;
  height: 7rem;
  border-radius: 50%;
  object-position: center;
  object-fit: cover;
  align-self: flex-start;
}

.feedback q {
  font-size: clamp(2rem, 2.5vw, 2.3rem);
  font-weight: normal;
}

.feedback p {
  font-size: clamp(1.5rem, 2vw, 1.5rem);
  line-height: 1.5em;
  margin-top: auto;
  align-self: flex-end;
}

@media screen and (max-width: 700px) {
  .feedbackCon {
    flex-direction: column;
  }

  .feedback {
    width: 100%;
    min-height: 30rem;
  }
}
</style>
