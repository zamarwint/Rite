'use client'

import { useTimerStore } from '@/store/timer-store'

// This panel just presents the same store the nav badge reads —
// starting the timer here keeps it running if the user switches to Notes.
export default function TimerPage() {
  const { isRunning, secondsRemaining, start, pause, reset } = useTimerStore()
  const minutes = Math.floor(secondsRemaining / 60)
  const seconds = secondsRemaining % 60

  return (
    <div className="flex h-full flex-col items-center justify-center gap-6">
      <span className="text-6xl font-light tabular-nums">
        {minutes}:{seconds.toString().padStart(2, '0')}
      </span>
      <div className="flex gap-3">
        <button
          onClick={() => (isRunning ? pause() : start())}
          className="rounded-md border border-border px-4 py-2 text-sm"
        >
          {isRunning ? 'Pause' : 'Start'}
        </button>
        <button onClick={reset} className="rounded-md border border-border px-4 py-2 text-sm">
          Reset
        </button>
      </div>
    </div>
  )
}
