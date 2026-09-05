// Same provider decision as tts/page.tsx applies here (Web Speech API vs.
// a server-backed Whisper route). If this ends up server-backed, it's the
// other endpoint from the architecture review that needs rate-limiting.
export default function SpeechToTextPage() {
  return (
    <div className="p-6">
      <h1 className="mb-4 text-lg font-medium">Speech to text</h1>
      <p className="text-sm text-muted-foreground">
        Provider not yet wired up — see the note in this file.
      </p>
    </div>
  )
}
