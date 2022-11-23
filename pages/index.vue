<template>
  <div class="w-full h-screen flex">
    <div class="flex flex-col w-full h-full">
      <div class="h-full">
        content
        <Track
          v-for="i in 10"
          :key="i"
          @click="playTrack(i)"
          :active="active"
        ></Track>
      </div>
      <div class="w-full">
        <PlayerFooter />
      </div>
      <div class="flex h-11">
        <div class="px-4 py-1 flex">
          <div>Back</div>
          <div>
            <button><font-awesome-icon icon="fa-regular fa-heart" /></button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const active = ref(false);

function playTrack(track) {
  active.value = !active.value;
  console.debug("play", track, active.value);
}
</script>
