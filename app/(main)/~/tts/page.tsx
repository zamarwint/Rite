// Provider decision (from the architecture review) still needs to be made:
// Web Speech API (free, client-only, inconsistent browser support) vs. an
// API-backed route (Whisper/ElevenLabs/etc — reliable, costs money, needs
// rate-limiting). Wire the chosen provider's call into handleGenerate below.
export default function TextToSpeechPage() {
  return (
    <div className="p-6">
      <h1 className="mb-4 text-lg font-medium">Text to speech</h1>
      <p className="text-sm text-muted-foreground">
        Provider not yet wired up — see the note in this file.
      </p>
    </div>
  )
}
