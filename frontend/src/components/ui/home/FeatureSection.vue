<script setup lang="ts">
// defineProps<{ msg: string }>();
</script>

<template>
  <section class="wrapper">
    <div class="feature-wrapper">
      <h4>Streamline Your Schedule</h4>
      <div class="feature-content">
        <div class="feature-img">
          <img src="../../../assets/calendar.webp" alt="calendar image" />
        </div>
        <div class="featureCon">
          <div class="feature">
            <h5>Auto-generated Links</h5>
            <p>Effortlessly create and share Google Meet links.</p>
          </div>
          <div class="feature">
            <h5>Google Calendar Integration</h5>
            <p>Synchronize event links with Google Calendar effortlessly.</p>
          </div>
          <div class="feature">
            <h5>Never Miss a Meeting</h5>
            <p>Stay on track with smart reminders and notifications.</p>
          </div>
        </div>
      </div>
    </div>
    <div class="notice">
      <h4>Google Calendar Wonders</h4>
      <p>
        Tired of manually creating Google Meet links for your events? Our app
        automates the process, generating Google Meet links paired with calendar
        events. Make your life a breeze with Meet Link Generator!
      </p>
    </div>
  </section>
</template>

<style scoped>
.wrapper {
  background-color: var(--secondary);
  display: flex;
  flex-direction: column;
  align-items: center;
  --gapFeature: min(5rem, 5vw);
}

@media screen and (max-width: 1000px) {
  .wrapper {
    padding-inline: var(--homeSidePadding);
  }
}

.notice {
  max-width: 100rem;
  display: flex;
  padding: 10vw 0;
  align-items: center;
  gap: var(--gapFeature);
  color: var(--primary);
}

.notice h4,
.feature-wrapper h4 {
  font-family: var(--fontAbril);
  letter-spacing: 0.2rem;
  font-size: clamp(2.5rem, 3vw, 4.8rem);
  font-weight: normal;
}

.feature-wrapper h4 {
  text-align: center;
}

.notice p {
  letter-spacing: 0.1rem;
  line-height: 1.5em;
  font-size: clamp(1.5rem, 2vw, 2rem);
}

.notice * {
  width: 50%;
}

.feature-wrapper {
  max-width: 100rem;
  display: flex;
  flex-direction: column;
  padding: 5vw 0;
  padding-top: 10vw;
  color: var(--primary);
  gap: min(5rem, 5vw);
}

.feature-content {
  display: flex;
  align-items: center;
  gap: var(--gapFeature);
}

.feature-img {
  width: 50%;
}

.feature-img img {
  width: 100%;
  aspect-ratio: 1/1;
  object-fit: cover;
  border-radius: 2rem;
}

.featureCon {
  width: 50%;
  display: flex;
  flex-direction: column;
  gap: var(--gapFeature);
}

.feature {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.feature h5 {
  font-size: clamp(2rem, 2.5vw, 2.5rem);
  font-weight: normal;
}

.feature p {
  font-size: clamp(1.5rem, 2vw, 1.5rem);
  line-height: 1.5em;
  color: #323232;
}

@media screen and (max-width: 650px) {
  .notice {
    flex-direction: column;
    align-items: flex-start;
  }
  .notice * {
    width: 100%;
  }

  .feature-content {
    flex-direction: column;
  }

  .feature-img,
  .featureCon {
    width: 100%;
  }

  .feature-img img {
    border-radius: 1rem;
  }

  .feature-wrapper h4 {
    text-align: left;
  }
}
</style>
