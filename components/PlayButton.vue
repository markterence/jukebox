<template>
  <div class="relative w-12 h-12 overflow-visible">
    <ProgressCircle
      progressClass="transition-all duration[0.4s] ease-in-out"
      :progressValue="progressValue"
      class="text-slate-700"
    >
    </ProgressCircle>
    <button
      class="flex items-center justify-center right-0 left-0 top-0 absolute w-12 h-12 p-0 shadow-md rounded-full"
      @click="togglePlayState"
    >
      <font-awesome-icon
        v-if="isPlaying"
        class="ml-1"
        icon="fa-solid fa-play"
      />
      <font-awesome-icon v-else icon="fa-solid fa-pause" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from "vue";

const isPlaying = ref(false);
const progressValue = ref(25);
let interval: any;

function togglePlayState() {
  isPlaying.value = !isPlaying.value;
}

onMounted(() => {
  interval = setInterval(() => {
    if (!isPlaying.value) {
      if (progressValue.value >= 100) {
        return (progressValue.value = 0);
      }
      progressValue.value += 2;
    }
  }, 880);
});

onBeforeUnmount(() => {
  clearInterval(interval);
});
</script>

<style module>
.circularProgress {
  stroke: currentcolor;
  stroke-dasharray: 80px, 200px;
  stroke-dashoffset: 0px;
  stroke-width: 5.6px;
  fill: none;
}
.spinnerAnimation {
  animation: 0s linear 0s infinite normal none running spinner-circular;
  animation-name: spinner-circular;
  animation-duration: 0s;
  animation-timing-function: linear;
  animation-delay: 0s;
  animation-iteration-count: infinite;
  animation-direction: normal;
  animation-fill-mode: none;
  animation-play-state: running;
}
</style>
