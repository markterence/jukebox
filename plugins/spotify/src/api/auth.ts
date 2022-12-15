import { OAUTH_LOGIN_BUTTON_TEXT, OAUTH_WINDOW_FEATURES } from "../constants";

function requestUserAuthorization_PKCE(oauthAuthorizeURL: string) {
  window.open(
    oauthAuthorizeURL,
    OAUTH_LOGIN_BUTTON_TEXT,
    OAUTH_WINDOW_FEATURES
  );
}

export default {
  requestUserAuthorization_PKCE,
};
