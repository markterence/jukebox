<template>
  <div class="w-full h-screen flex">
    <div class="flex flex-col w-full h-full">
      <div class="h-full">
        content

        <div
          class="px-8 py-3 h-[calc(100%-9rem)] flex flex-col overflow-y-scroll mb-4"
        >
          <ul class="tracklist flex flex-col-reverse">
            <Listbox>
              <ListboxOption
                v-for="i in 10"
                :key="i"
                :value="i"
                v-slot="{ active, selected }"
              >
                <Track @click="playTrack(i)" :active="selected"></Track>
              </ListboxOption>
            </Listbox>
          </ul>
        </div>
      </div>

      <!-- Sticky Footer -->
      <div class="fixed bottom-0 lg:w-3/4 w-full">
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
  </div>
</template>

<script setup>
import { ref } from "vue";
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/vue";

const active = ref(false);

function playTrack(track) {
  active.value = !active.value;
  console.debug("play", track, active.value);
}
</script>
