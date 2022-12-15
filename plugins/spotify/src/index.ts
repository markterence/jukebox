import { App } from "vue";

import { SPOTIFY_OAUTH_AUTHORIZE_BASE_URL } from "./constants";
import SpotifyOauthLoginButton from "./components/spotify_oauth_login_button.vue";

export default {
  install: (app: App, options: VueSpotifyPluginOptions) => {
    // inject a globally available method
    const vpSpotify: SpotifyPluginProperties = {
      SPOTIFY_OAUTH_AUTHORIZE_BASE_URL,
      clientId: options.clientId,
    };

    app.config.globalProperties.$vpSpotify = vpSpotify;

    app.provide("$vpSpotify", vpSpotify);

    app.component("spotify-oauth-login-button", SpotifyOauthLoginButton);
  },
};

export interface VueSpotifyPluginOptions {
  /**
   * Your app's Client ID provided by Spotify that is found at the Spotify Developer Dashboard
   */
  clientId: string;
}

export interface SpotifyPluginProperties {
  SPOTIFY_OAUTH_AUTHORIZE_BASE_URL: string;
  clientId: string;
}
