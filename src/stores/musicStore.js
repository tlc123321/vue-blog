import { defineStore } from 'pinia';

export const useMusicStore = defineStore('music', {
  state: () => ({
    isMusicPlaying: false,
  }),
  actions: {
    toggleMusic() {
      this.isMusicPlaying = !this.isMusicPlaying;
    },
  },
}); 