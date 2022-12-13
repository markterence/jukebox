<template>
  <client-only>
    <div>
      <div>
        <button @click="reqeustUserAuthorization">Login</button>

        <div>
          <p>
            {{ tokenStorage.token }}
          </p>
          <button @click="sync">sync</button>
        </div>
      </div>
      {{ devices }}
      <div class="p-2" v-if="savedTracks !== undefined">
        <div
          v-for="item in savedTracks.items"
          :key="item.track.id"
          @click="play(item)"
        >
          <div>
            {{ item.track.id }}
          </div>
        </div>
      </div>
    </div>
  </client-only>
</template>

<script setup lang="ts">
import { useSpotifyStore } from "~~/store/spotify";
import { useStorage } from "@vueuse/core";

function generateRandomString(size = 16) {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

const CLIENT_NAME = "Spotify Web Client";
const config = useRuntimeConfig();
const CLIENT_ID = config.public.spotifyClientId;

const access_token = ref("Enter Token Here");

const savedTracks = ref();
const devices = ref();
let player = undefined;

const spotify = useSpotifyAPI({
  redirect_uri: "http://localhost:3000/test-page/auth-callback",
  spotifyClientId: CLIENT_ID,
});
const spotifyStore = useSpotifyStore();

const verifier = spotify.auth.pkce.generateCodeVerifier();
const code_challenge = await spotify.auth.pkce.generateCodeChallenge(verifier);

const storage = useStorage("vue-use-local-storage", {
  verifier: verifier,
  challenge: code_challenge,
});

const tokenStorage = useStorage<any>("token", {
  token: {},
});

storage.value.challenge = code_challenge;
storage.value.verifier = verifier;

console.log("PKCE", unref(storage.value));

async function reqeustUserAuthorization() {
  // Redirect user to the Spotify /authorization page with the Oauth2 parameters

  const scope = [
    "streaming",
    "user-read-email",
    "user-read-private",
    "playlist-read-private",
    "playlist-read-collaborative",
    "user-library-read",
    "user-read-playback-state",
    "user-modify-playback-state",
  ];

  const state = generateRandomString();

  spotify.auth.requestUserAuthorization_PKCE(
    {
      code_challenge: code_challenge,
      state: state,
      scope: scope,
    },
    ["_blank"]
  );
}

async function sync() {
  console.log("token", tokenStorage.value.token.access_token);
  savedTracks.value = await spotify.getSavedTracks(
    tokenStorage.value.token.access_token
  );
  //   devices.value = await spotify.getDevices(access_token.value);
}

async function play(item: any) {
  const { track } = item;

  await spotify.play(tokenStorage.value.token.access_token, {
    uris: [track.uri],
    offset: 0,
    deviceId: devices.value.device_id,
  });
}

function handlePlayerErrors(str: string, message: any) {
  console.log(str, message);
}

function handlePlayerStateChanges(evt: any) {
  console.log("handlePlayerStateChange", evt);
}

function handlePlayerStatus(evt: any) {
  console.log("handlePlayerStatus", evt);
  devices.value = {
    ...devices.value,
    device_id: evt.device_id,
  };
}

let tokenSynced = false;
watch(
  tokenStorage,
  (newVal, oldVal) => {
    if (!tokenSynced && JSON.stringify(newVal) != "{}") {
      sync().then(() => {
        tokenSynced = true;
      });
    }
    console.log("changed", newVal);
    console.log("changed", oldVal);

    tokenStorage.value = newVal;
  },
  {
    deep: true,
  }
);
function initializePlayer() {
  const volume = 0.7;

  player = new (window as any).Spotify.Player({
    getOAuthToken: (callback: any) => {
      callback(tokenStorage.value.token.access_token);
    },
    CLIENT_NAME,
    volume,
  });

  player.addListener("ready", handlePlayerStatus);
  player.addListener("not_ready", handlePlayerStatus);
  player.addListener("player_state_changed", handlePlayerStateChanges);
  player.addListener("initialization_error", (error: any) =>
    handlePlayerErrors("initialization_error", error.message)
  );
  player.addListener("authentication_error", (error: any) =>
    handlePlayerErrors("authentication_error", error.message)
  );
  player.addListener("account_error", (error: any) =>
    handlePlayerErrors("account_error", error.message)
  );
  player.addListener("playback_error", (error: any) =>
    handlePlayerErrors("playback_error", error.message)
  );

  player.connect();
}

onMounted(async () => {
  if (process.client) {
    if (!(window as any).onSpotifyWebPlaybackSDKReady) {
      (window as any).onSpotifyWebPlaybackSDKReady = initializePlayer;
    } else {
      initializePlayer();
    }

    await spotify.loadSpotifyPlayer();
    await sync();
  }
});
</script>
