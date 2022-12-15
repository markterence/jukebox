<template>
  <div>
    {{ route.query }}
  </div>
</template>

<script setup>
const route = useRoute();

onMounted(() => {
  window.opener.postMessage(
    {
      ...route.query,

      target: "spotify-auth-callback",
    },
    window.origin
  );
});
</script>
