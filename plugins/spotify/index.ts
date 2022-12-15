import SpotifyPlugin from "./src/index";

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  nuxtApp.vueApp.use(SpotifyPlugin, {
    clientId: config.public.spotifyClientId,
  });
});
