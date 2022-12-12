<template>
  <div class="text-center">
    <div v-if="access_token">
      Copy the access token and paste it on Web Playback:
      <code>
        {{ access_token }}
      </code>
    </div>
  </div>
</template>

<script setup lang="ts">
// TODO: Move to serverless
const CLIENT_SECRET = "CLIENT_SECRET";
const CLIENT_ID = "CLIENT_ID";
const access_token = ref();
const route = useRoute();

function toBase64(str: string) {
  return window.btoa(str);
}

async function requestAccessToken() {
  const code = route.query.code;
  const url = "https://accounts.spotify.com/api/token";

  const requestOptions = {
    method: "post",
    params: {
      grant_type: "authorization_code",
      code: code?.toString(),
      redirect_uri: "http://localhost:3002/test-page/auth-callback",
    },
    headers: {
      Authorization: "Basic " + toBase64(CLIENT_ID + ":" + CLIENT_SECRET),
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };
  const res: any = await $fetch(url, requestOptions);

  if (res) {
    return res.access_token;
  }
}

onMounted(async () => {
  access_token.value = await requestAccessToken();
});
</script>
