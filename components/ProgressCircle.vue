<template>
  <div>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      :viewBox="viewBox"
      class="-rotate-90 overflow-visible"
    >
      <circle
        class="progress-circle-bg"
        :stroke="bgColor"
        :stroke-width="strokeWidth"
        :stroke-dasharray="strokeDashArray"
        :stroke-dashoffset="0"
        fill="transparent"
        :r="radius"
        :cx="2 * viewBoxSize"
        :cy="2 * viewBoxSize"
      ></circle>
      <circle
        class="progress-circle-main"
        :class="progressClass"
        stroke="currentColor"
        :stroke-width="strokeWidth"
        :stroke-dasharray="strokeDashArray"
        :stroke-dashoffset="strokeDashOffset"
        fill="transparent"
        :r="radius"
        :cx="2 * viewBoxSize"
        :cy="2 * viewBoxSize"
      ></circle>
    </svg>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

const props = defineProps({
  progressValue: {
    type: [Number, String],
    default: 0,
  },
  size: {
    type: [Number, String],
    default: 32,
  },
  width: {
    type: [Number, String],
    default: 4,
  },
  bgColor: {
    type: String,
    default: "rgba(0,0,0,0.4)",
  },
  color: {
    type: String,
    default: "transparent",
  },
  progressClass: {
    type: [String, Object, Array],
    default: "",
  },
});

const radius = 20;

const viewBoxSize = computed(() => {
  return radius / (1 - Number(props.width) / +props.size);
});

const viewBox = computed(() => {
  return [
    viewBoxSize.value,
    viewBoxSize.value,
    2 * viewBoxSize.value,
    2 * viewBoxSize.value,
  ].join(" ");
});

const circumference = computed(() => {
  return 2 * Math.PI * radius;
});

const normalizedValue = computed(() => {
  if (props.progressValue < 0) {
    return 0;
  }

  if (props.progressValue > 100) {
    return 100;
  }

  return parseFloat(props.progressValue + "");
});

const strokeDashArray = computed(() => {
  return Math.round(circumference.value * 1000) / 1000;
});

const strokeWidth = computed(() => {
  return (Number(props.width) / +props.size) * viewBoxSize.value * 2;
});

const strokeDashOffset = computed(() => {
  return ((100 - normalizedValue.value) / 100) * circumference.value + "px";
});
</script>
