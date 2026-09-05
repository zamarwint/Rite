'use client'

import { useTimerStore } from '@/store/timer-store'

function formatTime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
}

export function PersistentTimerBadge() {
  const { isRunning, secondsRemaining, pause, start } = useTimerStore()

  if (!isRunning && secondsRemaining === useTimerStore.getState().durationSeconds) {
    return null // nothing running, nothing paused mid-way — stay out of the way
  }

  return (
    <button
      onClick={() => (isRunning ? pause() : start())}
      className="w-full rounded-md border border-border px-3 py-2 text-left text-xs text-muted-foreground hover:bg-accent/50"
    >
      {isRunning ? 'Running · ' : 'Paused · '}
      {formatTime(secondsRemaining)}
    </button>
  )
}
