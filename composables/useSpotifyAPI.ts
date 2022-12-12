const crypto = window.crypto;

function dec2hex(dec: any) {
  return ("0" + dec.toString(16)).substr(-2);
}

function generateRandomString(size = 16) {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

function sha256(plain: string): Promise<ArrayBuffer> {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  return crypto.subtle.digest("SHA-256", data);
}

function base64urlencode(a: any) {
  var str = "";
  var bytes = new Uint8Array(a);
  var len = bytes.byteLength;
  for (var i = 0; i < len; i++) {
    str += String.fromCharCode(bytes[i]);
  }
  return window
    .btoa(str)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

export function useSpotifyAPI(config: UseSpotifyAPIConfig) {
  const fetch = $fetch;

  async function getDevices(token: string) {
    return fetch(`https://api.spotify.com/v1/me/player/devices`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      method: "GET",
    });
  }

  function getSavedTracks(token: string) {
    return fetch("https://api.spotify.com/v1/me/tracks", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      method: "GET",
    });
  }

  async function play(
    token: string,
    playbackOptions: {
      context_uri?: string;
      deviceId: string;
      offset: number;
      uris?: any[];
    }
  ) {
    const { context_uri, deviceId, offset, uris } = playbackOptions;

    let body;

    if (context_uri) {
      const isArtist = context_uri.indexOf("artist") >= 0;
      let position;

      /* istanbul ignore else */
      if (!isArtist) {
        position = { position: offset };
      }

      body = JSON.stringify({ context_uri, offset: position });
    } else if (Array.isArray(uris) && uris.length) {
      body = JSON.stringify({ uris, offset: { position: offset } });
    }
    //
    return fetch(
      `https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`,
      {
        body,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        method: "PUT",
      }
    );
  }

  function loadSpotifyPlayer(): Promise<any> {
    return new Promise<void>((resolve, reject) => {
      const scriptTag = document.getElementById("spotify-player");

      if (!scriptTag) {
        const script = document.createElement("script");

        script.id = "spotify-player";
        script.type = "text/javascript";
        script.async = false;
        script.defer = true;
        script.src = "https://sdk.scdn.co/spotify-player.js";
        script.onload = () => resolve();
        script.onerror = (error: any) =>
          reject(new Error(`loadScript: ${error.message}`));

        document.head.appendChild(script);
      } else {
        resolve();
      }
    });
  }

  /**
   * PKCE - Step 1: Generate the Code Verifier
   */
  function generateCodeVerifier() {
    const array = new Uint32Array(56 / 2);
    crypto.getRandomValues(array);
    return Array.from(array, dec2hex).join("");
  }

  /**
   * PKCE - Step 2: Generate the Code Challenge
   *
   * - A code_challenge is the hashed version of your code_verifier.
   *
   * Hash the code verifier using the SHA256 algorithm
   * The code verifier is a random string between 43 and 128 characters in length.
   * It can contain letters, digits, underscores, periods, hyphens, or tildes.
   *
   */
  async function generateCodeChallenge(codeVerifier: any) {
    const hashed = await sha256(codeVerifier);
    const base64encoded = base64urlencode(hashed);
    return base64encoded;
  }

  function requestUserAuthorization_PKCE(
    options: SpotifyAuthorizationCodeOptions
  ) {
    const queryParams = new URLSearchParams({
      response_type: "code",
      client_id: config.spotifyClientId,
      scope: options.scope!.join(" "),
      redirect_uri: config.redirect_uri,
      state: options.state || "",
      code_challenge_method: options.code_challenge_method || "S256",
      code_challenge: options.code_challenge!,
    });

    window.open(
      `https://accounts.spotify.com/authorize/?${queryParams.toString()}`
    );
  }

  async function requestAccessToken_PKCE(params: RequestAccessTokenParams) {
    const requestOptions = {
      method: "post",
      params: {
        grant_type: "authorization_code",
        code: params.code,
        redirect_uri: params.redirect_uri || config.redirect_uri,
        client_id: config.spotifyClientId,
        code_verifier: params.code_verifier,
      },
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };

    return $fetch("https://accounts.spotify.com/api/token", requestOptions);
  }

  return {
    play,
    getDevices,
    loadSpotifyPlayer,
    getSavedTracks,
    auth: {
      requestUserAuthorization_PKCE,
      requestAccessToken_PKCE,
      pkce: {
        generateCodeVerifier,
        generateCodeChallenge,
      },
    },
  };
}

export interface UseSpotifyAPIConfig {
  spotifyClientId: string;
  redirect_uri: string;
}
export interface SpotifyAuthorizationCodeOptions {
  scope?: string[];
  code_challenge_method?: "S256" | string;
  code_challenge?: string;
  show_dialog?: boolean;
  state?: string;
}

export interface RequestAccessTokenParams {
  code: string;
  redirect_uri?: string | undefined;
  code_verifier?: string;
}
