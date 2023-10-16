<script setup lang="ts">
import { onBeforeMount } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ref } from 'vue';
import Axios from '@/utils/axios';

import { getDateTime } from '@/utils/formats';
import {  type CalendarEventMongo } from './pageTypes';
import BaseButton from '@/components/ui/common/BaseButton.vue';
import FooterHome from '../components/ui/home/FooterHome.vue';
import BaseTooltip from '@/components/ui/common/BaseTooltip.vue';
import gsap from 'gsap'
import BaseModal from '@/components/ui/common/BaseModal.vue';
import CreateMeetingForm from '@/components/forms/CreateMeetingForm.vue'
// defineProps<{ msg: string }>();
const route = useRoute();
const router = useRouter();
const id = route?.query?.id as string;
const meetings = ref<CalendarEventMongo[]>([]);
const loading = ref<boolean>(true)





async function getAllMeetings() {
  try{
    loading.value = true;
  const res = await Axios.get(`/calendar/${id}`);
  meetings.value = res.data;
  console.log(meetings.value);
  }catch(e){
      console.log(e)
  }finally{
    loading.value = false;
  }
 
}

function goTolink(link:string){
  window.open(link,'-self')
}

function statusCheck(start:string,end:string):string{
  const startDate = new Date(start).getTime();
  const endDate = new Date(end).getTime();
  const current = Date.now();
  if(startDate > current) return "upcoming";
  if(endDate < current) return "expired";
  if(startDate < current && endDate > current) return "now";
  return "unknown"
} 

function calcDuration(start:string,end:string):string{
  const startDate = new Date(start).getTime();
  const endDate = new Date(end).getTime();
  const duration = (endDate - startDate)/1000
  const displayHr = Math.floor(duration/3600);
  const displayMin = displayHr>0 ? Math.floor(((duration/3600) - displayHr)*60) : Math.floor(duration/60);
  let displayStr = "";
  if(displayHr > 0)displayStr += `${displayHr}hr `;
  if(displayMin > 0)displayStr += `${displayMin}mins`;
  if(displayHr <= 0 && displayMin <= 0)displayStr = "0 min"
  return displayStr;
}

onBeforeMount(async () => {
  if (!id) {
    router.push('home');
  } else {
    // fetch token here
    const res = await Axios.get(`/token?googleId=${id}`);
    if (!res?.data?.token) {
      router.push('home');
    } else {
      getAllMeetings();
    }
  }
});

function onEnter(el: Element, done: () => void): void {
  gsap.to(el, {
    opacity: 1,
    scale:1,
    ease:'expo',
    delay: Number((el as HTMLElement).dataset.index) * 0.15,
    onComplete: done
  });
}

function onLeave(el: Element, done: () => void): void {
  gsap.to(el, {
    opacity: 0,
    scale:0,
    duration:0.5,
    ease:'expo',
    onComplete: done
  });
}


const showModal = ref(false);

const openModal = () => {
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};

function addMeeting(item:CalendarEventMongo){
  meetings.value.push(item)
}

async function deletemeeting(meetingId:string){
  const res = await Axios.delete(`/calendar/${id}/meeting/${meetingId}`);
  console.log(res)
  meetings.value = meetings.value.filter(x => x.id !== meetingId);
  console.log(meetings.value);
}


</script>

<template>
  <div class="pageCon">
    <div class="content">
      <div class="topCon">
        <h3>Scheduled Meetings <span>({{ meetings.length }})</span></h3>
        <BaseButton @click="openModal" class-name="addBtn">
          <span>Add</span> <span class="material-icons"> add </span></BaseButton
        >
      </div>
        <div class="wrapper" v-if="loading">
            <p>Loading <span class="material-icons spin-around">
              donut_small
              </span></p>
            
        </div>

        <div class="wrapper" v-if="!loading && meetings.length <= 0">
            <p>Thre is no meeting yet.</p>
        </div>

          <TransitionGroup 
          v-show="!loading && meetings.length > 0"
          tag="div"
          :css="false"
          @enter="onEnter"
          @leave="onLeave"
          class="meetingsWrap"
          name="scale" >
          <div  class="meetingCon" v-for="(m,i) of meetings" :key="m.id" :data-index="i" >
            <button @click="()=>deletemeeting(m.id)" class="delete-button">×</button>
            <BaseTooltip>
              <h6 class="textWrap">{{ m.summary }}</h6>
              <template #tooltip-content>
              <p style="text-transform: capitalize;">{{ m.summary }}</p> 
              </template>
            </BaseTooltip>
            <p>{{ getDateTime(m.start) }}</p>
            <p class="double"><span class="material-icons"> schedule </span>{{ calcDuration(m.start,m.end) }}</p>
            <BaseTooltip>
            <p class="double textWrap">
              <span class="material-icons"> account_circle </span>
              <span >{{ m.creator }}</span>
            </p>
              <template #tooltip-content>
                {{ m.creator }}
              </template>
            </BaseTooltip> 
            <BaseTooltip v-if="m.attendees.length > 0"  >
            <p class="doubleAtt">
              <span class="material-icons"> groups </span>
              <div class="attendees textWrap">
                <p v-for="a of m.attendees.slice(0,2)">{{ a }}
                </p>
                <p v-if="m.attendees.length > 2"> and {{ m.attendees.length - 2 }} more</p>
                
              </div>
            </p>
            <template #tooltip-content>
              <p v-for="a of m.attendees">{{ a }}</p>
              </template>
          </BaseTooltip>
            <p v-if="m.attendees.length <= 0" class="double" >
              <span class="material-icons"> groups </span>
              <div class="attendees textWrap">
                <p>No invitation yet.</p>
              </div>
            </p>
          
            <div class="more">
              <p class="status" :class="statusCheck(m.start,m.end)">{{ statusCheck(m.start,m.end) }}</p>
              <BaseButton :disabled="statusCheck(m.start,m.end) === 'expired'" @click="()=> goTolink(m.hangoutLink)" class-name="goBtn">Go
                <span class="material-icons">
                  arrow_forward
                </span>
              </BaseButton>
            </div>
              
          </div>
        </TransitionGroup>
      
        
    </div>
    <BaseModal :visible="showModal" @close-modal="closeModal" >
      <CreateMeetingForm :addMeeting="addMeeting" :closeModal="closeModal"  :googleId="id" />
      </BaseModal>
   
  </div>
  <FooterHome />
</template>

<style scoped>

.meetingCon:hover .delete-button{
  display: flex;
}


.delete-button{
  position: absolute;
  top: 0;
  right: 0;
  width: 3rem;
  height: 3rem;
  display: none;
  justify-content: center;
  align-items: center;
  border-top-right-radius: 0.5rem;
  border-bottom-left-radius: 0.5rem;
  background-color: var(--danger);
  color: white;
  font-size: 2rem;
}

.wrapper{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
}

.wrapper p{
  font-size: clamp(1.3rem,2vw,2.3rem);
  display: flex;
  justify-content: center;
  align-items: center;
}

.spin-around{
  animation: spin-around 0.8s linear infinite;
  margin-left: 0.5rem;
  font-size: 3rem;
  display: block;
  position: relative;
  top: 0.15rem;
}

@keyframes spin-around {
  0%{
    transform: rotateZ(0deg);
  }
  50%{
    transform: rotateZ(180deg);
  }
 
  100%{
    transform: rotateZ(360deg);
  }
}

.pageCon {
  display: flex;
flex-direction: column;
  --s: 105px; /* control the size */
  --c1: #b9b9b9;
  --c2: #dcdcdc;
  --c3: #fafafa;

  background: linear-gradient(
      rgba(255, 255, 255, 0.9),
      rgba(255, 255, 255, 0.9)
    ),
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
  /* 0.577=tan(30deg)*/

  color: var(--primary);
  min-height: 100vh;
  width: 100%;
}





.content {
  width: 100%;
  max-width: 1000px;
  margin: 7rem auto;
  display: flex;
  flex-direction: column;
  min-height: 80vh;
}

.logo {
  width: 12rem;
  object-fit: cover;
  margin: 2rem auto;
}

.topCon {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.addBtn {
  width: 8rem;
  height: 4.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  --btn: white;
  --btnSec: var(--primary);
  font-size: 1.2rem;
  border: 1px solid var(--btnSec);
}

.addBtn span {
  font-size: 1.8rem;
}

.topCon h3 {
  font-family: var(--fontAbril);
  letter-spacing: 0.2rem;
  font-size: clamp(2rem, 2.5vw, 3rem);
  font-weight: normal;
}

.meetingsWrap{
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(24rem, 1fr));
  gap: 2rem;
  margin: 3rem 0;
}

.meetingCon{
  display: flex;
  flex-direction: column;
  /* border: 1px solid var(--primary); */
  box-shadow: 0 0 0.5rem 0.1rem var(--primary);
  border-radius: 0.5rem;
  padding: 2rem;
  gap: 1.5rem;
  opacity: 0;
  scale: 0.5;
  position: relative;
}

.meetingCon h6{
  font-size: clamp(1.3rem, 1.5vw, 2rem);
  text-transform: capitalize;
}

.meetingCon p,.attendees p{
  font-size: clamp(1rem, 1vw, 1.2rem);
}

.meetingCon > p:first-of-type{
  font-size: clamp(0.9rem, 1vw, 1rem);
}

.double{
  display: flex;
  align-items: center;
  gap: 1rem;
}

.doubleAtt{
  display: flex;
  gap: 1rem;
  
}

.doubleAtt .attendees{
  padding-top: 0.25rem;
}

.more{
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
}

.status{
  background-color: lightblue;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  text-transform: capitalize;
}

.expired{
  background-color: gray;
}

.now{
  background-color: rgb(213, 67, 9);
}

.goBtn{
  width: 5rem;
  height: 3rem;
  font-size: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  --btnSec:white;
  gap: 0.5rem;
}

.goBtn span{
  font-size: 1rem;
}

@media screen and (max-width: 1100px) {
  .pageCon{
    padding-inline:5vw;
  }
}

@media screen and (max-width: 400px) {
  .addBtn span:first-of-type{
    display: none;
  }

  .addBtn{
    width: 4rem;
    height: 4rem;
  }
}

</style>
