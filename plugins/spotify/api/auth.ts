import { OAUTH_LOGIN_BUTTON_TEXT, OAUTH_WINDOW_FEATURES } from "../constants";

export function requestUserAuthorization_PKCE(params: any) {
  window.open(params.url, OAUTH_LOGIN_BUTTON_TEXT, OAUTH_WINDOW_FEATURES);
}
