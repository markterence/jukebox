import SpotifyOauthLoginButton from "./components/spotify_oauth_login_button.vue";
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component(
    "spotify-oauth-login-button",
    SpotifyOauthLoginButton
  );
});
