export function useSpotifyAPI() {
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

  return {
    play,
    getDevices,
    loadSpotifyPlayer,
    getSavedTracks,
  };
}

export interface UseSpotifyAPIOptions {
  access_token: string;
}
