<script setup lang="ts">
// defineProps<{ msg: string }>();
const quizArr = [
  {
    id: 1,
    quiz: 'Does it require Google login?',
    des: 'Yes, our app requires you to log in with your Google account to access the Google Calendar API.',
  },
  {
    id: 2,
    quiz: 'Is my data secure?',
    des: 'Absolutely! Your data is protected and we adhere to high security standards.',
  },
  {
    id: 3,
    quiz: 'Do you offer support?',
    des: 'Yes, we provide support for any issues or questions. Our support team is ready to assist.',
  },
  {
    id: 4,
    quiz: 'Is there a mobile app?',
    des: 'We are working on a mobile app, and it will be available soon!',
  },
];
</script>

<template>
  <section class="wrapper">
    <div class="quizContent">
      <h4>You might want to know...</h4>
      <div class="quizCon">
        <div class="quiz" v-for="quiz of quizArr" :key="quiz.id">
          <h5>{{ quiz.quiz }}</h5>
          <p>{{ quiz.des }}</p>
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
}

@media screen and (max-width: 1000px) {
  .wrapper {
    padding-inline: var(--homeSidePadding);
  }
}

.quizContent {
  width: 100%;
  max-width: 100rem;
  display: flex;
  padding: 10vw 0;
  flex-direction: column;
  gap: 5rem;
}

.quizContent h4 {
  font-family: var(--fontAbril);
  letter-spacing: 0.2rem;
  font-size: clamp(2.5rem, 3vw, 4.8rem);
  font-weight: normal;
  color: var(--primary);
}

.quizCon {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5rem;
  flex-wrap: wrap;
}

.quiz {
  width: calc(50% - 2.5rem);
}

.quiz h5 {
  font-size: clamp(2rem, 2.5vw, 2.3rem);
  font-weight: normal;
  margin-bottom: 2rem;
}

.quiz p {
  font-size: clamp(1.5rem, 2vw, 1.5rem);
  line-height: 1.5em;
}

@media screen and (max-width: 700px) {
  .quiz {
    width: 100%;
  }
}
</style>
