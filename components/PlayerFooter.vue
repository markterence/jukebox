<template>
  <div class="h-28 flex flex-col justify-center">
    <div class="absolute ml-5 z-20 -mt-6">
      <div class="w-24 h-24 rounded-full bg-slate-200">
        <img
          class="border border-slate-100 animate-spin [animation-duration:8s] rounded-full"
          :src="song.albumArt"
        />
      </div>
    </div>
    <footer class="w-full py-3 h-auto shadow-[0_-2px_8px_2px_rgba(0,0,0,0.3)]">
      <div class="flex px-6 relative overflow-visible">
        <div class="w-24 max-h-10"></div>
        <div class="flex flex-col relative ml-6">
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
    <div>
      <div class="px-4 flex">
        <div>Back</div>
        <div>
          <button><font-awesome-icon icon="fa-regular fa-heart" /></button>
        </div>
      </div>
    </div>
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
