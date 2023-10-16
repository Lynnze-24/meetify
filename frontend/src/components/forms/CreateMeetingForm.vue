<script setup lang="ts">
const props = defineProps<{
  googleId: string;
  closeModal: () => void;
  addMeeting: (event: CalendarEventMongo) => void;
}>();
import { onBeforeMount, ref } from 'vue';
import BaseInput from '../ui/common/BaseInput.vue';
import BaseButton from '../ui/common/BaseButton.vue';
import BaseTextArea from '../ui/common/BaseTextArea.vue';
import randomID from '@/utils/randomID';
import {
  type CalendarEvent,
  type CalendarEventMongo,
} from '../../pages/pageTypes';
import Axios from '@/utils/axios';
import BaseSelect from '../ui/common/BaseSelect.vue';
import BaseCalendarInput from '../ui/common/BaseCalendarInput.vue';
import BaseTimePicker from '../ui/common/BaseTimePicker.vue';

const formVals = ref({
  name: '',
  timezone: '',
  start: null,
  startTime: '',
  endTime: '',
  end: null,
  attendees: '',
});

const isCreating = ref<boolean>(false);

const timeZonesRef = ref<string[]>([]);

async function createGoogleMeeting() {
  try {
    isCreating.value = true;
    const startArr = formVals.value.startTime.split(':');
    const endArr = formVals.value.endTime.split(':');
    if (!formVals.value?.start || !formVals.value?.end) return;
    (formVals.value?.start as Date).setHours(
      Number(startArr[0]),
      Number(startArr[1])
    );
    (formVals.value?.end as Date).setHours(
      Number(endArr[0]),
      Number(endArr[1])
    );

    const event: CalendarEvent = {
      summary: formVals.value?.name,
      start: {
        dateTime: (formVals.value?.start as Date).toISOString(),
        timeZone: formVals.value?.timezone,
      },
      end: {
        dateTime: (formVals.value?.end as Date).toISOString(),
        timeZone: formVals.value?.timezone,
      },
      attendees: formVals.value?.attendees ? [formVals.value?.attendees] : [],
      conferenceData: {
        createRequest: {
          requestId: randomID('calendarEvent'),
        },
      },
    };
    console.log(event);

    const res = await Axios.post('/calendar', {
      event,
      googleId: props.googleId,
    });

    console.log(res);
    props.addMeeting(res.data);
  } catch (e) {
    console.log(e);
  } finally {
    isCreating.value = false;
    props.closeModal();
  }
}

onBeforeMount(async () => {
  console.log(props.googleId);
  const r = fetch('/timezoneData.txt');
  const tz = (await r).text();
  timeZonesRef.value = (await tz)
    .split('\r\n')
    .sort()
    .filter((x) => x !== '');
});
</script>

<template>
  <form @submit.prevent="createGoogleMeeting">
    <h5>Create Meeting</h5>
    <BaseInput
      type="text"
      v-model="formVals.name"
      placeholder="Event Topic"
    ></BaseInput>
    <BaseSelect
      :options="timeZonesRef"
      v-model="formVals.timezone"
      placeholder="Timezones"
    />
    <div class="start">
      <BaseCalendarInput v-model="formVals.start" placeholder="Start Date" />
      <BaseTimePicker v-model="formVals.startTime" placeholder="Start Time" />
    </div>

    <div class="start">
      <BaseCalendarInput v-model="formVals.end" placeholder="End Date" />
      <BaseTimePicker v-model="formVals.endTime" placeholder="End Time" />
    </div>

    <BaseTextArea
      type="text"
      v-model="formVals.attendees"
      placeholder="Attendees..."
    ></BaseTextArea>
    <BaseButton :loading="isCreating" class-name="formBtn">Confirm</BaseButton>
  </form>
</template>

<style scoped>
form {
  min-width: 35rem;
}

.formBtn {
  font-size: clamp(1, 1.2vw, 1.3rem);
  height: 5rem;
  line-height: 5rem;
  --secondary: white;
  --btn: var(--primary);
}

h5 {
  font-size: 2rem;
  color: var(--primary);
  margin-bottom: 2rem;
}

.start {
  display: flex;
  align-items: center;
  gap: 1rem;
}
</style>
