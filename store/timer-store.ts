import { create } from 'zustand'

interface TimerState {
  isRunning: boolean
  secondsRemaining: number
  durationSeconds: number
  intervalId: ReturnType<typeof setInterval> | null
  start: (durationSeconds?: number) => void
  pause: () => void
  reset: () => void
}

// Deliberately a module-level store, not component state — this is what
// lets the timer keep running while the active panel is Notes, Tasks, etc.
// Read from here in the Timer panel AND in the persistent nav badge.
export const useTimerStore = create<TimerState>((set, get) => ({
  isRunning: false,
  secondsRemaining: 25 * 60,
  durationSeconds: 25 * 60,
  intervalId: null,

  start: (durationSeconds) => {
    const existing = get().intervalId
    if (existing) clearInterval(existing)

    if (durationSeconds !== undefined) {
      set({ durationSeconds, secondsRemaining: durationSeconds })
    }

    const id = setInterval(() => {
      const remaining = get().secondsRemaining
      if (remaining <= 1) {
        clearInterval(id)
        set({ isRunning: false, secondsRemaining: 0, intervalId: null })
        return
      }
      set({ secondsRemaining: remaining - 1 })
    }, 1000)

    set({ isRunning: true, intervalId: id })
  },

  pause: () => {
    const existing = get().intervalId
    if (existing) clearInterval(existing)
    set({ isRunning: false, intervalId: null })
  },

  reset: () => {
    const existing = get().intervalId
    if (existing) clearInterval(existing)
    set((s) => ({ isRunning: false, intervalId: null, secondsRemaining: s.durationSeconds }))
  },
}))
