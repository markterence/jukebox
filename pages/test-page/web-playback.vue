<template>
  <client-only>
    <div>
      <div>
        <button @click="reqeustUserAuthorization">Login</button>

        <div>
          <input type="text" v-model="access_token" />
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
const cc = await spotify.auth.pkce.generateCodeChallenge(verifier);
spotifyStore.cc = cc;
spotifyStore.cv = verifier;
(window as any).spotifyStore = {};
(window as any).spotifyStore.cc = cc;
(window as any).spotifyStore.cv = verifier;
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

  const code_challenge = spotify.auth.pkce.generateCodeVerifier();
  spotifyStore.setChallenge(code_challenge);

  spotify.auth.requestUserAuthorization_PKCE({
    code_challenge: cc,
    state: state,
    scope: scope,
  });

  // const queryParams = new URLSearchParams({
  //   response_type: "code",
  //   client_id: CLIENT_ID,
  //   scope: scope.join(" "),
  //   redirect_uri: "http://localhost:3002/test-page/auth-callback",
  //   state: state,
  // });

  // window.open(
  //   `https://accounts.spotify.com/authorize/?${queryParams.toString()}`
  // );
}

async function sync() {
  savedTracks.value = await spotify.getSavedTracks(access_token.value);
  //   devices.value = await spotify.getDevices(access_token.value);
}

async function play(item: any) {
  const { track } = item;

  await spotify.play(access_token.value, {
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

function initializePlayer() {
  const volume = 0.7;

  player = new (window as any).Spotify.Player({
    getOAuthToken: (callback: any) => {
      callback(access_token.value);
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
  }
});
</script>
