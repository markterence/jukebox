<template>
  <div>
    <spotify-oauth-login-button
      :scope="scope"
      :redirectURI="redirectURI"
    ></spotify-oauth-login-button>
  </div>
</template>

<script setup lang="ts">
import { SpotifyOAuthScope } from "~~/plugins/spotify/src/constants";
/**
 * Handle Spotify Authorization Flow callback
 */
import { useStorage } from "@vueuse/core";

const config = useRuntimeConfig();
const SPOTIFY_CLIENT_ID = config.public.spotifyClientId;
const redirectURI = "http://localhost:3000/auth/spotify-callback";
const scope = [
  SpotifyOAuthScope.streaming,
  SpotifyOAuthScope.user_read_email,
  SpotifyOAuthScope.user_read_private,
  SpotifyOAuthScope.user_library_read,
  SpotifyOAuthScope.user_modify_playback_state,
  SpotifyOAuthScope.user_read_playback_state,
  SpotifyOAuthScope.playlist_read_collaborative,
  SpotifyOAuthScope.playlist_read_private,
];
</script>
