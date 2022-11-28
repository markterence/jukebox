<template>
  <div
    :class="{
      'rounded-md': props.active,
      [$style.shadow]: props.active,
    }"
    class="track flex flex-col border-b border-b-solid border-b-slate-300 shadow-black"
  >
    <button
      :class="{ 'rounded-md': props.active }"
      class="flex items-center h-16 rounded-md text-left"
    >
      <!-- start -->
      <div
        :class="{ 'bg-slate-700 rounded-l-md': props.active }"
        class="w-10 px-1 text-slate-100 h-full flex justify-center items-center flex-col"
      >
        <div>
          <font-awesome-icon v-if="!props.active" icon="fa-solid fa-play" />
          <StaticEqualizer class="w-8 text-slate-100" v-else></StaticEqualizer>
        </div>
      </div>

      <div class="w-full px-2">
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

const isPlaying = computed(() => {
  return props.active;
});
</script>

<style module>
.shadow {
  box-shadow: 0 0px 8px 3px rgba(0, 0, 0, 0.48);
}
</style>
