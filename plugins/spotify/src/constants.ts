export const SPOTIFY_OAUTH_AUTHORIZE_BASE_URL =
  "https://accounts.spotify.com/authorize";

export const OAUTH_LOGIN_BUTTON_TEXT = "Login with Spotify";
export const OAUTH_WINDOW_SIZE = 800;
export const OAUTH_WINDOW_FEATURES = [
  "resizable=yes",
  "scrollbars=yes",
  "status=yes",
  `width=${OAUTH_WINDOW_SIZE}`,
  `height=${OAUTH_WINDOW_SIZE}`,
  `left=${window.screen.width / 2 - OAUTH_WINDOW_SIZE / 2}`,
  `top=${window.screen.height / 2 - OAUTH_WINDOW_SIZE / 2}`,
].join(",");

export const OAUTH_PKCE_CHALLENGE_METHOD = "S256";

export const SpotifyOAuthScope = {
  streaming: "streaming",
  user_read_email: "user-read-email",
  user_read_private: "user-read-private",
  playlist_read_private: "playlist-read-private",
  playlist_read_collaborative: "playlist-read-collaborative",
  user_library_read: "user-library-read",
  user_read_playback_state: "user-read-playback-state",
  user_modify_playback_state: "user-modify-playback-state",
};
