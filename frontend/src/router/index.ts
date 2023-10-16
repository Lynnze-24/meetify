import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../pages/HomePage.vue';
import TermsOfServiceVue from '@/pages/TermsOfService.vue';
import PrivacyPolicyVue from '@/pages/PrivacyPolicy.vue';
import MeetingsPageVue from '@/pages/MeetingsPage.vue';
const routes = [
  { name: 'root', path: '/', redirect: '/home' },
  {
    path: '/home',
    component: HomePage,
  },
  {
    path: '/meetings',
    component: MeetingsPageVue,
  },
  {
    path: '/termsofservice',
    component: TermsOfServiceVue,
  },
  {
    path: '/privacypolicy',
    component: PrivacyPolicyVue,
  },
  {
    path: '/*',
    redirect: '/home',
  },

  //   {name:'editPost', path: '/post/edit/:id', component: NewPost,props:true },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
