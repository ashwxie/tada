import { create } from "zustand";

interface ResourceState {
  dice: number;
  xp: number;
  fp: number;

  gainDice: (amount?: number) => void;
  loseDice: (amount?: number) => void;
  gainXP: (amount?: number) => void;
  gainFP: (amount?: number) => void;
  triggerBFRBPenalty: () => void;
}

export const useResourceStore = create<ResourceState>((set) => ({
  dice: 0,
  xp: 0,
  fp: 0,

  gainDice: (amount = 1) => set((state) => ({ dice: state.dice + amount })),

  loseDice: (amount = 1) =>
    set((state) => ({
      dice: Math.max(0, state.dice - amount),
    })),

  gainXP: (amount = 10) =>
    set((state) => ({
      xp: state.xp + amount,
    })),

  gainFP: (amount = 1) =>
    set((state) => ({
      fp: Math.min(100, state.fp + amount),
    })),

  // The Atomic Penalty: Halves current Dice
  triggerBFRBPenalty: () =>
    set((state) => ({
      dice: Math.floor(state.dice * 0.5),
    })),
}));
