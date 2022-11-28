<template>
  <div class="flex flex-col justify-center">
    <div class="absolute ml-5 z-20">
      <div class="w-20 h-20 rounded-full bg-slate-200">
        <img
          class="border border-slate-100 animate-spin [animation-duration:24s] rounded-full"
          :src="song.albumArt"
        />
      </div>
    </div>
    <footer
      class="w-full py-2 h-auto shadow-[0_-2px_8px_2px_rgba(0,0,0,0.3)] bg-white"
    >
      <div class="flex px-6 relative overflow-visible">
        <!-- Spacer -->
        <div class="w-16 max-h-10"></div>
        <div class="flex flex-col relative ml-8">
          <div class="font-bold text-slate-800">Lorem ipsum {{ counter }}</div>
          <div class="text-sm text-slate-500/80 font-semibold">
            dolor sit amet
          </div>
        </div>
        <div class="flex items-center mr-2 ml-auto">
          <button>
            <font-awesome-icon :icon="['fas', 'fa-backward']" />
          </button>
          <PlayButton class="mx-4" />
          <button @click="nextSong">
            <font-awesome-icon :icon="['fas', 'fa-forward']" />
          </button>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";

const counter = ref(1);

const song = reactive({
  albumArt: `https://picsum.photos/200/200?random=${counter.value}`,
});

function nextSong() {
  counter.value++;
  song.albumArt = `https://picsum.photos/200/200?random=${counter.value}`;
}
</script>
