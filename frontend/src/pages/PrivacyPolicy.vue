<script setup lang="ts">
import { useRouter, type Router, type RouterHistory } from 'vue-router';

interface RouterWithHistory extends Router {
  history: RouterHistory;
}

// defineProps<{ msg: string }>();
const sections = [
  {
    head: '1. Information We Collect',
    content: [
      '1.1. Account Information: When you register for an account, we may collect personal information such as your name, email address, and other relevant details.',
      '1.2. Google Account Information: The App may access and use your Google Account information, including but not limited to your Google Calendar and Meeting data, as required for its functionality.',
      '1.3. Usage Data: We collect information about your interactions with the App, including your actions, preferences, and the pages you visit.',
    ],
  },
  {
    head: '2. How We Use Your Information',
    content: [
      "2.1. To Provide Services: We use your information to provide and improve the App's functionality, such as creating Google Meetings and managing Google Calendar events.",
      '2.2. Communication: We may use your contact information to send you important updates and notifications related to the App.',
      '2.3. Analytics: We use data analytics to better understand how users interact with the App and to improve its features and performance.',
    ],
  },
  {
    head: '3. Data Security',
    content: [
      '3.1. We take appropriate measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction.',
    ],
  },
  {
    head: '4. Third-Party Services',
    content: [
      '4.1. The App may contain links to third-party websites or services. We are not responsible for the privacy practices or content of these third parties. Please review their privacy policies before using their services.',
    ],
  },
  {
    head: '5. Your Choices',
    content: [
      "5.1. You can access and update your account information through the App's settings.",
      '5.2. You can opt out of receiving non-essential communications from us.',
    ],
  },
  {
    head: "6. Children's Privacy",
    content: [
      '6.1. The App is not intended for use by individuals under the age of 13. We do not knowingly collect personal information from children under 13 years of age.',
    ],
  },
  {
    head: '7. Changes to Privacy Policy',
    content: [
      '7.1. We reserve the right to modify this Privacy Policy at any time. We will notify you of any changes by posting the updated Privacy Policy within the App.',
    ],
  },
  {
    head: '8. Contact Us',
    content: [
      '8.1. If you have questions or concerns about this Privacy Policy or the handling of your personal information, please contact us at aunghtetlinn.b@gmail.com.',
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
          <h1>Privacy Policy</h1>
          <p>Effective Date: Oct 5 2023.</p>
        </div>
        <p>
          This Privacy Policy describes how [Your Company Name] ("we," "our," or
          "us") collects, uses, and protects your personal information when you
          use the Meetify web application ("the App"). By using the App, you
          agree to the practices described in this Privacy Policy. If you do not
          agree to this Privacy Policy, please do not use the App.
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
          By using the Meetify web application, you consent to the practices
          described in this Privacy Policy. If you do not agree to this Privacy
          Policy, please do not use the App.
        </p>
        <p class="lastUpdate">Last Updated: Oct 5 2023 by Meetify Team.</p>
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
