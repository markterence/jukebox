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
