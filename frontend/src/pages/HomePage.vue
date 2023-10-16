<script setup lang="ts">
// defineProps<{ msg: string }>();
import HeroSection from '../components/ui/home/HeroSection.vue';
import FeatureSection from '../components/ui/home/FeatureSection.vue';
import FeedbackSection from '../components/ui/home/FeedbackSection.vue';
import QuizSection from '../components/ui/home/QuizSection.vue';
import FooterHome from '../components/ui/home/FooterHome.vue';
import ContactSection from '@/components/ui/home/ContactSection.vue';
</script>

<template>
  <main class="container">
    <HeroSection />
    <FeatureSection />
    <FeedbackSection />
    <ContactSection />
    <QuizSection />
    <FooterHome />
  </main>
</template>

<style scoped></style>
