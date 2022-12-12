import { defineStore } from "pinia";

interface State {
  token: any;
  pkce: {
    code_challenge: string;
    code_verifier: string;
  };
  cc: string;
  cv: string;
}

export const useSpotifyStore = defineStore("spotifyStore", {
  state: (): State => ({
    token: undefined,
    pkce: {
      code_challenge: "",
      code_verifier: "",
    },
    cc: "",
    cv: "",
  }),

  getters: {},

  actions: {
    setToken(token: any) {
      this.token = token;
    },

    setChallenge(verifier: string) {
      this.pkce.code_challenge = verifier;
    },

    setVerifier(verifier: string) {
      this.pkce.code_verifier = verifier;
    },
  },
});
