<template>
  <button @click="startAuthentication">
    <slot>
      {{ buttonText }}
    </slot>
  </button>
</template>

<script setup lang="ts">
import {
  SpotifyOAuthScope,
  OAUTH_PKCE_CHALLENGE_METHOD,
  SPOTIFY_OAUTH_AUTHORIZE_BASE_URL,
} from "../constants";
import { generateCodeChallenge, generateCodeVerifier } from "../utils/pkce";
import { generateRandomString } from "../utils/generate-random-string";
import spotify from "../api/auth";

const props = defineProps({
  buttonText: {
    type: String,
    default: "Login with Spotify",
  },

  redirectURI: {
    type: String,
    required: true,
  },

  scope: {
    default: [SpotifyOAuthScope.user_read_email],
  },
});

const codeVerifier = ref("");
const clientId = ref();
const oauthState = ref();

const vpSpotify: any = inject("$vpSpotify");

function getClientId(): string | undefined {
  return vpSpotify.clientId;
}

// Prepare the OAuth Authorize URL
function buildOauthAuthorizeURLWithChallenge(params: any): URL {
  const queryParams = new URLSearchParams({
    response_type: "code",
    client_id: params.client_id,
    scope: params.scope.join(" "),
    redirect_uri: params.redirect_uri,
    state: params.state || "",
    code_challenge_method: OAUTH_PKCE_CHALLENGE_METHOD,
    code_challenge: params.code_challenge,
  });

  const url = new URL(
    SPOTIFY_OAUTH_AUTHORIZE_BASE_URL + "/?" + queryParams.toString()
  );
  return url;
}

// Create the full Oauth authorize URL
async function getOauthAuthorizeURL() {
  // Generate the required PKCE parameters
  codeVerifier.value = generateCodeVerifier();
  const codeChallenge = await generateCodeChallenge(codeVerifier.value);
  oauthState.value = generateRandomString();
  clientId.value = getClientId();

  const oauthAuthorizeURLWithChallenge = buildOauthAuthorizeURLWithChallenge({
    client_id: getClientId(),
    redirect_uri: props.redirectURI,
    code_challenge: codeChallenge,
    state: oauthState.value,
    scope: props.scope,
  });

  return oauthAuthorizeURLWithChallenge.toString();
}

async function startAuthentication() {
  const oauthAuthorizeURL = await getOauthAuthorizeURL();

  // Open a browser window and redirect the user to the authorization page
  spotify.requestUserAuthorization_PKCE(oauthAuthorizeURL);
}

function handleWindowMessage(event: any) {
  if (window.origin !== event.origin) {
    return;
  }

  // if (event.data.target !== "spotify-auth-callback") {
  //   return;
  // }

  // Check if OAuth "state" is altered
  if (oauthState.value != event.data.state) {
    console.log("error state is altered");
  }

  console.log(
    "CMP",
    JSON.parse(
      JSON.stringify({
        cmp: {
          oauthState: oauthState.value,
        },
        message: event.data,
      })
    )
  );
  console.log("handleWindowMessage", event);
}

window.addEventListener("message", handleWindowMessage);
onBeforeUnmount(() => {
  window.removeEventListener("message", handleWindowMessage);
});
</script>
