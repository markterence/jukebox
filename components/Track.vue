<template>
  <div
    class="flex flex-col border-b border-b-solid border-b-slate-300 rounded-md"
  >
    <button class="flex items-center h-16 rounded-md text-left">
      <!-- start -->
      <div
        :class="{ 'bg-slate-700': props.active }"
        class="w-10 px-1 text-slate-100 rounded-l-md h-full flex justify-center items-center flex-col"
      >
        <div>
          <font-awesome-icon icon="fa-solid fa-play" />
        </div>
      </div>

      <div class="w-full">
        <div class="flex flex-col relative w-full">
          <div class="font-bold text-slate-800">Lorem ipsum</div>
          <div class="text-sm text-slate-500/80 font-semibold">
            dolor sit amet
          </div>
        </div>
      </div>

      <div class="px-1">
        <div class="font-semibold">00:00</div>
      </div>

      <div class="px-3">
        <font-awesome-icon icon="fa-solid fa-music" />
      </div>
    </button>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  active: {
    type: Boolean,
    default: false,
  },
});
</script>
