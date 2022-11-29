<template>
  <div>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
    >
      <g transform="rotate(180 50 50)">
        <rect
          x="12"
          y="42.5"
          width="12"
          height="31.999999999999996"
          fill="currentColor"
        >
          <animate
            v-if="animate"
            attributeName="height"
            calcMode="spline"
            values="64;32;12;64"
            keyTimes="0;0.33;0.66;1"
            dur="0.4s"
            keySplines="0.5 0 0.5 1;0.5 0 0.5 1;0.5 0 0.5 1"
            repeatCount="indefinite"
            begin="-0.3s"
          ></animate>
        </rect>
        <rect
          x="28"
          y="42.5"
          width="12"
          height="45.25483399593904"
          fill="currentColor"
        >
          <animate
            v-if="animate"
            attributeName="height"
            calcMode="spline"
            values="64;32;12;64"
            keyTimes="0;0.33;0.66;1"
            dur="0.4s"
            keySplines="0.5 0 0.5 1;0.5 0 0.5 1;0.5 0 0.5 1"
            repeatCount="indefinite"
            begin="-0.6s"
          ></animate>
        </rect>
        <rect x="44" y="42.5" width="12" height="64" fill="currentColor">
          <animate
            v-if="animate"
            attributeName="height"
            calcMode="spline"
            values="64;32;12;64"
            keyTimes="0;0.33;0.66;1"
            dur="0.4s"
            keySplines="0.5 0 0.5 1;0.5 0 0.5 1;0.5 0 0.5 1"
            repeatCount="indefinite"
            begin="-0.9s"
          ></animate>
        </rect>
        <rect
          x="60"
          y="42.5"
          width="12"
          height="45.25483399593904"
          fill="currentColor"
        >
          <animate
            v-if="animate"
            attributeName="height"
            calcMode="spline"
            values="64;32;12;64"
            keyTimes="0;0.33;0.66;1"
            dur="0.4s"
            keySplines="0.5 0 0.5 1;0.5 0 0.5 1;0.5 0 0.5 1"
            repeatCount="indefinite"
            begin="-0.6s"
          ></animate>
        </rect>
        <rect
          x="76"
          y="42.5"
          width="12"
          height="31.999999999999996"
          fill="currentColor"
        >
          <animate
            v-if="animate"
            attributeName="height"
            calcMode="spline"
            values="64;32;12;64"
            keyTimes="0;0.33;0.66;1"
            dur="0.4s"
            keySplines="0.5 0 0.5 1;0.5 0 0.5 1;0.5 0 0.5 1"
            repeatCount="indefinite"
            begin="-0.3s"
          ></animate>
        </rect>
      </g>
      <g transform="rotate(0 50 50)">
        <rect
          x="12"
          y="42.5"
          width="12"
          height="31.999999999999996"
          fill="currentColor"
        >
          <animate
            v-if="animate"
            attributeName="height"
            calcMode="spline"
            values="64;32;12;64"
            keyTimes="0;0.33;0.66;1"
            dur="0.4s"
            keySplines="0.5 0 0.5 1;0.5 0 0.5 1;0.5 0 0.5 1"
            repeatCount="indefinite"
            begin="-0.3s"
          ></animate>
        </rect>
        <rect
          x="28"
          y="42.5"
          width="12"
          height="45.25483399593904"
          fill="currentColor"
        >
          <animate
            v-if="animate"
            attributeName="height"
            calcMode="spline"
            values="64;32;12;64"
            keyTimes="0;0.33;0.66;1"
            dur="0.4s"
            keySplines="0.5 0 0.5 1;0.5 0 0.5 1;0.5 0 0.5 1"
            repeatCount="indefinite"
            begin="-0.6s"
          ></animate>
        </rect>
        <rect x="44" y="42.5" width="12" height="64" fill="currentColor">
          <animate
            v-if="animate"
            attributeName="height"
            calcMode="spline"
            values="64;32;12;64"
            keyTimes="0;0.33;0.66;1"
            dur="0.4s"
            keySplines="0.5 0 0.5 1;0.5 0 0.5 1;0.5 0 0.5 1"
            repeatCount="indefinite"
            begin="-0.9s"
          ></animate>
        </rect>
        <rect
          x="60"
          y="42.5"
          width="12"
          height="45.25483399593904"
          fill="currentColor"
        >
          <animate
            v-if="animate"
            attributeName="height"
            calcMode="spline"
            values="64;32;12;64"
            keyTimes="0;0.33;0.66;1"
            dur="0.4s"
            keySplines="0.5 0 0.5 1;0.5 0 0.5 1;0.5 0 0.5 1"
            repeatCount="indefinite"
            begin="-0.6s"
          ></animate>
        </rect>
        <rect
          x="76"
          y="42.5"
          width="12"
          height="31.999999999999996"
          fill="currentColor"
        >
          <animate
            v-if="animate"
            attributeName="height"
            calcMode="spline"
            values="64;32;12;64"
            keyTimes="0;0.33;0.66;1"
            dur="0.4s"
            keySplines="0.5 0 0.5 1;0.5 0 0.5 1;0.5 0 0.5 1"
            repeatCount="indefinite"
            begin="-0.3s"
          ></animate>
        </rect>
      </g>
    </svg>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  animate: {
    type: Boolean,
    default: false,
  },
});
</script>
