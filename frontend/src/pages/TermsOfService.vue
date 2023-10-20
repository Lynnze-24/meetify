<script setup lang="ts">
// defineProps<{ msg: string }>();
import { useRouter, type Router, type RouterHistory } from 'vue-router';

interface RouterWithHistory extends Router {
  history: RouterHistory;
}
const sections = [
  {
    head: '1. Account Registration',
    content: [
      '1.1. You must register for an account to use certain features of the App.',
      '1.2. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.',
    ],
  },
  {
    head: '2. Use of the App',
    content: [
      '2.1. Meetify allows you to create Google Meetings and interact with your Google Calendar. You are responsible for the content and actions associated with your use of the App.',
      '2.2. You agree not to use the App for any unlawful or prohibited purposes.',
      '2.3. You understand and acknowledge that the App may access and modify your Google Calendar and Meeting data, as required for its functionality.',
    ],
  },
  {
    head: '3. User Content',
    content: [
      '3.1. By using the App, you may upload, submit, store, or send content. You retain ownership of your content, but you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, distribute, and display your content solely for the purpose of operating, developing, and improving the App.',
      '3.2. You are solely responsible for your content and any consequences that may arise from sharing or transmitting it through the App.',
    ],
  },
  {
    head: '4. Privacy',
    content: [
      '4.1. Your use of the App is also governed by our Privacy Policy, which outlines how we collect, use, and protect your personal information. By using the App, you consent to the practices described in the Privacy Policy.',
    ],
  },
  {
    head: '5. Termination',
    content: [
      '5.1. We reserve the right to terminate or suspend your access to the App at our sole discretion, without notice, for any reason, including, but not limited to, violation of these Terms.',
    ],
  },
  {
    head: '6. Disclaimer of Warranties',
    content: [
      '6.1. The App is provided "as is" and "as available" without any warranties, express or implied, including, but not limited to, the implied warranties of merchantability, fitness for a particular purpose, or non-infringement.',
      '6.2. We do not warrant that the App will be error-free, uninterrupted, or secure.',
    ],
  },
  {
    head: '7. Limitation of Liability',
    content: [
      '7.1. We shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or in connection with your use of the App.',
    ],
  },
  {
    head: '8. Changes to Terms',
    content: [
      '8.1. We reserve the right to modify these Terms at any time. We will post the updated Terms on the App, and it is your responsibility to review them periodically.',
    ],
  },
  {
    head: '9. Governing Law',
    content: [
      '9.1. These Terms are governed by and construed in accordance with the laws of [Your Jurisdiction], without regard to its conflict of law principles.',
    ],
  },
  {
    head: '10. Contact Information',
    content: [
      '10.1. For questions or concerns regarding these Terms, please contact us at aunghtetlinn.b@gmail.com.',
    ],
  },
];

const router = useRouter() as RouterWithHistory;

function goback() {
  console.log(router?.options?.history);
  if (router?.options?.history?.state?.back) router.back();
  else router.push('/home');
}
</script>

<template>
  <div class="wrapper">
    <div class="content">
      <header>
        <div class="topCon">
          <h1>Terms of Service</h1>
          <p>Effective Date: Oct 5 2023.</p>
        </div>
        <p>
          These Terms of Service ("Terms") govern your use of TutorRoom Meetify,
          a web application ("the App"), provided by TutorRoom Meetify.Co.Ltd
          ("we," "our," or "us"). By accessing or using the App, you agree to
          comply with and be bound by these Terms. If you do not agree to these
          Terms, please do not use the App.
        </p>
      </header>
      <main>
        <section v-for="sec of sections" :key="sec.head">
          <h2>{{ sec.head }}</h2>
          <p v-for="(des, i) of sec.content" :key="i + sec.head">{{ des }}</p>
        </section>

        <!-- Add more sections for each point in your Terms of Service -->
      </main>
      <footer>
        <p>
          By using TutorRoom Meetify, you agree to these Terms of Service. If
          you do not agree to these Terms, please do not use the App.
        </p>
        <p class="lastUpdate">
          Last Updated: Oct 5 2023 by TutorRoom Meetify Team.
        </p>
        <p @click="goback" class="homelink" to="/home">Go Back</p>
      </footer>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  background-color: var(--secondary);
  line-height: 2.3rem;
  min-height: 100vh;
  padding: 5vw 0;
}

@media screen and (max-width: 1000px) {
  .wrapper {
    padding: 5vw;
  }
}

.content {
  max-width: 1000px;
  margin: 0 auto;
  position: relative;
}

header p {
  font-size: 1.2rem;
}
header {
  margin-bottom: 2rem;
}

.topCon {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
}

.topCon p {
  font-weight: 600;
  font-style: italic;
}

main {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

section h2 {
  margin-bottom: 1rem;
}

section p,
footer p {
  font-size: 1.2rem;
}

footer {
  margin-top: 2rem;
}

.lastUpdate {
  font-weight: 600;
  margin-left: auto;
  margin-top: 5rem;
  text-align: right;
}

.homelink {
  position: absolute;
  bottom: 0;
  left: 0;
  color: var(--primary);
  text-decoration: underline;
  font-size: 1.2rem;
  cursor: pointer;
}

.homelink:hover {
  color: grey;
}
</style>
