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
import { useSpotifyStore } from "~~/store/spotify";
import { useStorage } from "@vueuse/core";

const config = useRuntimeConfig();
const CLIENT_ID = config.public.spotifyClientId;

const spotify = useSpotifyAPI({
  redirect_uri: "http://localhost:3000/test-page/auth-callback",
  spotifyClientId: CLIENT_ID,
});
const spotifyStore = useSpotifyStore();

const CLIENT_SECRET = "CLIENT_SECRET";
const access_token = ref();
const route = useRoute();

const storage = useStorage("vue-use-local-storage", {
  verifier: "Banana",
  challenge: "Yellow",
});

const tokenStorage = useStorage<any>("token", {
  token: {},
});

console.log(storage);
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
  const v = storage.value.verifier;
  const c = storage.value.challenge;

  const res = await spotify.auth.requestAccessToken_PKCE({
    code: route.query.code?.toString() || "",
    code_verifier: v,
  });

  spotifyStore.setToken(res);
  tokenStorage.value.token = res;
  setTimeout(() => {
    window.close();
  }, 2000);
});
</script>
