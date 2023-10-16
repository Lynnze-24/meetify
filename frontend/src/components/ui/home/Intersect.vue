<template>
  <div id="wrap">
    <div class="output">Intersection Info: <span ref="debugInfo"></span></div>
    <div class="output">Target position: <span ref="output"></span></div>
    <div id="root">
      <p>scroll to see the target</p>
      <div class="buffer"></div>
      <div ref="target" class="small" id="target"></div>
      <div class="buffer"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, defineProps, ref, onMounted } from 'vue';
import useIntersectionObserver from '../../../composables/useIntersectionObserver';
export default defineComponent({
  setup() {
    const output = ref<null | HTMLElement>(null);
    const target = ref<null | HTMLElement>(null);
    const debugInfo = ref<null | HTMLElement>(null);

    function intersectCallback(entry: IntersectionObserverEntry) {
      const ratio = entry.intersectionRatio;
      const boundingRect = entry.boundingClientRect;
      const intersectionRect = entry.intersectionRect;

      if (output?.value) {
        if (ratio === 0) {
          output.value.innerText = 'outside';
        } else if (ratio < 1) {
          if (boundingRect.top < intersectionRect.top) {
            output.value.innerText = 'on the top';
          } else {
            output.value.innerText = 'on the bottom';
          }
        } else if (ratio >= 1) {
          output.value.innerText = 'inside';
        }
      }

      if (debugInfo?.value)
        debugInfo.value.innerText = `is Intersecting - ${entry.isIntersecting} - intersectionRatio: ${ratio}`;
    }

    onMounted(() => {
      if (target?.value)
        useIntersectionObserver.observeElemement(
          target?.value,
          intersectCallback
        );
    });

    return {
      output,
      target,
      debugInfo,
    };
  },
});
</script>

<style scoped>
#wrap {
  background-color: #26067d;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
}
#root {
  background-color: #fff;
  border: 3px solid rebeccapurple;
  height: 400px;
  margin: 20px auto;
  overflow: scroll;
  transition: 0.25s;
  width: 400px;
}

#root p {
  text-align: center;
}

#target {
  background-color: rebeccapurple;
  background-image: radial-gradient(
    ellipse at center,
    #ffffff 0%,
    #ffffff 14%,
    #663399 15%,
    #663399 34%,
    #ffffff 35%,
    #ffffff 50%,
    #663399 51%,
    #663399 99%
  );
  background-position: center;
  background-repeat: no-repeat;
  background-size: 300px 300px;
  height: 500px;
  margin: auto;
  pointer-events: none;
  transition: 0.25s;
  width: 300px;
}
#target.small {
  background-size: 200px;
  height: 200px;
}

.output {
  color: #fff;
  margin: 20px auto;
  width: 400px;
}

.buffer {
  height: 600px;
}
</style>
