// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      spotifyClientId: process.env.SPOTIFY_CLIENT_ID,
      spotifyCallbackUri:
        process.env.SPOTIFY_CALLBACK_URI ||
        "http://localhost:3000/auth/callback",
    },
  },
  ssr: false,
  css: ["~/assets/css/main.css"],
  app: {
    head: {
      script: [
        {
          src: "https://sdk.scdn.co/spotify-player.js",
        },
      ],
    },
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  modules: ["@pinia/nuxt"],
});
