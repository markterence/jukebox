import { defineStore } from "pinia";

interface State {
  player: any;
}
export const usePlayer = defineStore("player", {
  state: (): State => ({
    player: undefined,
  }),

  getters: {
    getPlayer: (state: State) => {
      return state.player;
    },
  },

  actions: {
    setPlayer(player: any) {
      this.player = player;
    },
  },
});
