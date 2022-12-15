<template>
  <button @click="startAuthentication">
    <slot>
      {{ buttonText }}
    </slot>
  </button>
</template>

<script setup lang="ts">
import { generateCodeChallenge, generateCodeVerifier } from "../utils/pkce";

const props = defineProps({
  buttonText: {
    type: String,
    default: "Login with Spotify",
  },
});

const codeVerifier = ref("");

async function getOauthAuthorizeURL() {
  return "";
}
async function startAuthentication() {
  codeVerifier.value = generateCodeVerifier();
  const codeChallenge = await generateCodeChallenge(codeVerifier.value);
}
</script>
