import { create } from 'zustand'

interface State {
  isTransitionActive: boolean
  setIsTransitionActive: (val: boolean) => void
  routingPageOffset: number
  setRoutingPageOffset: (val: number) => void
}

export const useStore = create<State>((set) => ({
  isTransitionActive: false,
  setIsTransitionActive: (val: boolean) => set({ isTransitionActive: val }),
  routingPageOffset: 0,
  setRoutingPageOffset: (val: number) => set({ routingPageOffset: val })
}))
