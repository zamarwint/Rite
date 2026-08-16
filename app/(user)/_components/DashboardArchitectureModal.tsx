import React, { useState } from 'react';
import {
  X,
  Layers,
  Layout,
  Palette,
  Sparkles,
  MousePointerClick,
  Check,
  Copy,
  ExternalLink,
  Sliders,
  Maximize2,
  Mic,
  Clock,
  FileText,
} from 'lucide-react';

interface DashboardArchitectureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DashboardArchitectureModal: React.FC<DashboardArchitectureModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'spatial' | 'components' | 'interactions' | 'palette'>(
    'spatial'
  );
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const fullArchitectureText = `RITE /DASHBOARD UX/UI ARCHITECTURAL SPECIFICATION & BLUEPRINT
==============================================================

1. SPATIAL LAYOUT STRATEGY (CSS Flexbox/Grid)
- Overall Layout: 3-column horizontal Flexbox with 100vh viewport lock and overflow isolation.
  * Left Sidebar (Collapsible): 280px (~18-20% desktop width), collapses to 64px icon rail.
  * Main Canvas (Central Workspace): Flexible 1fr (~55-60% desktop width), constrained to 68ch (max-w-3xl) optical measure for optimal reading cadence.
  * Productivity Dock (Right Panel): 340px-380px (~22-25% desktop width), collapses to 56px utility strip.
- Zen Mode Layout: Overrides layout to 100vw x 100vh full-screen focus canvas; sidebars and docks smoothly fade to 0 opacity.

2. COMPONENT BREAKDOWN & TYPOGRAPHY HIERARCHY
- Left Sidebar:
  * User Profile Widget: 36px Avatar, Workspace title (14px bold), subtitle (10px monospace uppercase).
  * Center Navigation: Icon-based folder/view tree (All Documents, Essays, Journalism, Newsletter, Archive).
  * Quick Actions: "+ New Entry" CTA button (12px bold uppercase), collapse toggle chevron.
- Main Canvas:
  * Title Input: 20px Serif bold with subtle underline focus state.
  * Metrics Bar: Word count (12px bold Red), character count, estimated reading time.
  * Text Editor Area: 18px-24px Serif/Sans body with 1.65 line-height and generous margins.
  * Zen Mode Trigger: Top-right action pill with ESC keybind indicator.
- Productivity Dock:
  * Pomodoro Timer: 32px Monospace bold digital countdown with 4-sprint dot matrix.
  * Speech-to-Text (STT): Prominent microphone trigger with animated 7-bar audio waveform.
  * Text-to-Speech (TTS): Audio reader pill with Play/Pause and speed toggles (0.8x - 1.5x).
  * Linked Task Checklist: Document-tethered items with completion progress bar.

3. MICRO-INTERACTIONS & STATES
- STT Recording: Vivid Red glowing pulse ring, live bouncing waveform bars, instant transcript append.
- Timer Alert State (< 1 min): Vivid Red background glow, pulsing text, sprint finish transition.
- Zen Mode Transition: 500ms ease-in-out opacity fade of chrome elements; mouse movement surfaces exit pill.
- Auto-save State: Subtle checkmark indicator confirming local state synchronization.

4. STRICT COLOR APPLICATION MAPPING
- VIVID RED (#d42710):
  * Active document indicator dot & badge.
  * Primary "+ New Entry" and "+ Focus" action buttons.
  * Active STT recording ring and audio waveform bars.
  * Timer countdown alert when under 1 minute remaining.
  * Task checkbox completion checkmark and priority badges.
- DARK GREY (#2f2d32):
  * Left sidebar background (#2f2d32).
  * Productivity dock background (#2f2d32).
  * Primary typography in the main writing canvas.
  * Modal overlays and high-contrast control pills.
- LIGHT ORANGE (#f2e0d2):
  * Primary main canvas paper background (#f2e0d2).
  * Text and icon contrast color inside Dark Grey sidebars.
  * Soft borders (10-15% opacity) between panels and cards.
  * Active document list item background in the sidebar.`;

  const handleCopySpec = () => {
    navigator.clipboard.writeText(fullArchitectureText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#2f2d32]/80 backdrop-blur-md animate-fadeIn select-none">
      <div className="bg-[#2f2d32] border-2 border-[#f2e0d2]/20 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl text-[#f2e0d2] overflow-hidden">
        {/* Modal Header */}
        <div className="p-5 border-b border-[#f2e0d2]/10 flex items-center justify-between bg-[#2f2d32]">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-[#d42710] flex items-center justify-center font-mono font-bold text-[#f2e0d2] shadow-sm">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="font-serif font-black text-lg sm:text-xl text-[#f2e0d2]">
                  /dashboard UX/UI Architecture Blueprint
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-[#d42710] text-[10px] font-mono font-bold text-[#f2e0d2] uppercase">
                  Spec v2.4
                </span>
              </div>
              <p className="text-xs font-mono text-[#f2e0d2]/60">
                Lead Designer Architectural & Layout Breakdown
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleCopySpec}
              className="px-3 py-1.5 rounded-lg bg-[#f2e0d2]/10 hover:bg-[#f2e0d2]/20 text-[#f2e0d2] text-xs font-mono font-semibold flex items-center space-x-1.5 transition-colors border border-[#f2e0d2]/10"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[#d42710]" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied Specs' : 'Copy Specs'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-[#f2e0d2]/10 text-[#f2e0d2]/60 hover:text-[#f2e0d2] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center px-5 border-b border-[#f2e0d2]/10 bg-[#f2e0d2]/5 text-xs font-mono overflow-x-auto">
          <button
            onClick={() => setActiveTab('spatial')}
            className={`py-3 px-4 border-b-2 font-bold flex items-center space-x-2 transition-colors whitespace-nowrap ${
              activeTab === 'spatial'
                ? 'border-[#d42710] text-[#f2e0d2]'
                : 'border-transparent text-[#f2e0d2]/60 hover:text-[#f2e0d2]'
            }`}
          >
            <Layout className="w-4 h-4 text-[#d42710]" />
            <span>1. Spatial Layout Strategy</span>
          </button>
          <button
            onClick={() => setActiveTab('components')}
            className={`py-3 px-4 border-b-2 font-bold flex items-center space-x-2 transition-colors whitespace-nowrap ${
              activeTab === 'components'
                ? 'border-[#d42710] text-[#f2e0d2]'
                : 'border-transparent text-[#f2e0d2]/60 hover:text-[#f2e0d2]'
            }`}
          >
            <Layers className="w-4 h-4 text-[#d42710]" />
            <span>2. Component Breakdown</span>
          </button>
          <button
            onClick={() => setActiveTab('interactions')}
            className={`py-3 px-4 border-b-2 font-bold flex items-center space-x-2 transition-colors whitespace-nowrap ${
              activeTab === 'interactions'
                ? 'border-[#d42710] text-[#f2e0d2]'
                : 'border-transparent text-[#f2e0d2]/60 hover:text-[#f2e0d2]'
            }`}
          >
            <MousePointerClick className="w-4 h-4 text-[#d42710]" />
            <span>3. Micro-Interactions & States</span>
          </button>
          <button
            onClick={() => setActiveTab('palette')}
            className={`py-3 px-4 border-b-2 font-bold flex items-center space-x-2 transition-colors whitespace-nowrap ${
              activeTab === 'palette'
                ? 'border-[#d42710] text-[#f2e0d2]'
                : 'border-transparent text-[#f2e0d2]/60 hover:text-[#f2e0d2]'
            }`}
          >
            <Palette className="w-4 h-4 text-[#d42710]" />
            <span>4. Color Application Mapping</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-sm font-sans">
          {/* TAB 1: SPATIAL LAYOUT STRATEGY */}
          {activeTab === 'spatial' && (
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-[#f2e0d2]/5 border border-[#f2e0d2]/10 space-y-2">
                <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[#d42710]">
                  Three-Tier Balanced Layout Ratio
                </h3>
                <p className="text-[#f2e0d2]/90 leading-relaxed">
                  The dashboard implements an isolated 100vh Flexbox layout preventing document-level
                  scrolling. The screen is partitioned into three purposeful zones designed to minimize
                  cognitive fatigue and focus the creator's gaze on the central writing canvas:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
                <div className="p-4 rounded-xl bg-[#2f2d32] border border-[#f2e0d2]/15 space-y-2">
                  <div className="text-[#d42710] font-bold">1. LEFT SIDEBAR</div>
                  <div className="text-xl font-bold text-[#f2e0d2]">280px (18-20%)</div>
                  <p className="text-[#f2e0d2]/70 font-sans text-xs">
                    Collapsible navigation rail. Houses profile, workspaces, document list, and quick creation.
                    Collapses to 64px icon rail for extra canvas width.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#f2e0d2] text-[#2f2d32] border border-[#f2e0d2] space-y-2 shadow-lg">
                  <div className="text-[#d42710] font-bold">2. MAIN CANVAS</div>
                  <div className="text-xl font-bold text-[#2f2d32]">Flex 1 (55-60%)</div>
                  <p className="text-[#2f2d32]/80 font-sans text-xs">
                    Central sanctuary. Constrained to 68ch optical text column to prevent eye strain. Expands
                    to 100% in Zen Mode.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#2f2d32] border border-[#f2e0d2]/15 space-y-2">
                  <div className="text-[#d42710] font-bold">3. PRODUCTIVITY DOCK</div>
                  <div className="text-xl font-bold text-[#f2e0d2]">340-380px (22-25%)</div>
                  <p className="text-[#f2e0d2]/70 font-sans text-xs">
                    Right utility panel. Persistent Pomodoro timer, audio suite (TTS/STT), and document-linked
                    tasks. Collapses to 56px.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#f2e0d2]/5 border border-[#f2e0d2]/10 space-y-2 font-mono text-xs">
                <span className="text-[#d42710] font-bold uppercase">Zen Mode Layout Override:</span>
                <p className="text-[#f2e0d2]/80 font-sans text-xs">
                  When Zen Mode is triggered, the left sidebar and productivity dock transition to{' '}
                  <code className="bg-[#2f2d32] px-1.5 py-0.5 rounded text-[#d42710]">
                    display: none; opacity: 0;
                  </code>
                  . The canvas expands to <code className="text-[#f2e0d2]">100vw x 100vh</code> with a warm
                  paper backdrop, typewriter centering, and subtle floating escape trigger.
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: COMPONENT BREAKDOWN */}
          {activeTab === 'components' && (
            <div className="space-y-6">
              {/* Left Sidebar */}
              <div className="p-4 rounded-xl bg-[#f2e0d2]/5 border border-[#f2e0d2]/10 space-y-3">
                <div className="flex items-center space-x-2 text-xs font-mono font-bold text-[#d42710]">
                  <FileText className="w-4 h-4" />
                  <span>SECTION 1: LEFT SIDEBAR</span>
                </div>
                <ul className="space-y-2 text-xs font-sans text-[#f2e0d2]/90">
                  <li className="flex items-start space-x-2">
                    <span className="text-[#d42710] font-bold font-mono">1.1</span>
                    <span>
                      <strong>User Profile Widget:</strong> 36px squared avatar with initials "R", workspace title
                      (Elena Rostova), desk badge (Investigative Desk), and dropdown for workspace switching.
                    </span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-[#d42710] font-bold font-mono">1.2</span>
                    <span>
                      <strong>Folder & View Selector:</strong> All Documents, Essays & Longform, Investigative Desk,
                      Weekly Dispatch, and Archive with live document count pills.
                    </span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-[#d42710] font-bold font-mono">1.3</span>
                    <span>
                      <strong>Active Drafts List:</strong> Scrollable list item cards displaying draft title, last
                      edited timestamp, and word count tag with active document red dot indicator.
                    </span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-[#d42710] font-bold font-mono">1.4</span>
                    <span>
                      <strong>Bottom Quick Actions:</strong> Primary "+ New Entry (⌘N)" Vivid Red button and
                      sidebar collapse chevron toggle.
                    </span>
                  </li>
                </ul>
              </div>

              {/* Main Canvas */}
              <div className="p-4 rounded-xl bg-[#f2e0d2]/5 border border-[#f2e0d2]/10 space-y-3">
                <div className="flex items-center space-x-2 text-xs font-mono font-bold text-[#d42710]">
                  <Maximize2 className="w-4 h-4" />
                  <span>SECTION 2: THE MAIN CANVAS</span>
                </div>
                <ul className="space-y-2 text-xs font-sans text-[#f2e0d2]/90">
                  <li className="flex items-start space-x-2">
                    <span className="text-[#d42710] font-bold font-mono">2.1</span>
                    <span>
                      <strong>Header & Document Meta:</strong> Inline title editor, real-time word counter,
                      character counter, and estimated reading time (~2 min read).
                    </span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-[#d42710] font-bold font-mono">2.2</span>
                    <span>
                      <strong>Typography Engine:</strong> Quick toggle between Serif (Playfair/Georgia), Sans
                      (Inter/Plus Jakarta), and Monospace with sizing steps (Normal, Large, Huge).
                    </span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-[#d42710] font-bold font-mono">2.3</span>
                    <span>
                      <strong>Floating Formatting Strip:</strong> Markdown shortcuts for H1, H2, Bold, Italic,
                      Blockquote, Bullet List, and Inline Code snippet.
                    </span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-[#d42710] font-bold font-mono">2.4</span>
                    <span>
                      <strong>Hyper-Focus Writing Area:</strong> Seamless full-height textarea styled like
                      premium literary bond paper.
                    </span>
                  </li>
                </ul>
              </div>

              {/* Productivity Dock */}
              <div className="p-4 rounded-xl bg-[#f2e0d2]/5 border border-[#f2e0d2]/10 space-y-3">
                <div className="flex items-center space-x-2 text-xs font-mono font-bold text-[#d42710]">
                  <Clock className="w-4 h-4" />
                  <span>SECTION 3: THE PRODUCTIVITY DOCK</span>
                </div>
                <ul className="space-y-2 text-xs font-sans text-[#f2e0d2]/90">
                  <li className="flex items-start space-x-2">
                    <span className="text-[#d42710] font-bold font-mono">3.1</span>
                    <span>
                      <strong>Persistent Pomodoro Bar:</strong> Large 32px digital clock, sprint cycle dots (1-4),
                      Focus/Pause toggle, reset, and Work/Break automatic switching.
                    </span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-[#d42710] font-bold font-mono">3.2</span>
                    <span>
                      <strong>Speech-to-Text (STT) Module:</strong> Prominent microphone button with live recording
                      indicator, 7-band bouncing audio equalizer waveform, and instant text streaming.
                    </span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-[#d42710] font-bold font-mono">3.3</span>
                    <span>
                      <strong>Text-to-Speech (TTS) Proofreader:</strong> Dedicated media player with Play/Pause,
                      playback speed selection pills (0.8x, 1.0x, 1.25x, 1.5x), and audio draft synthesis.
                    </span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-[#d42710] font-bold font-mono">3.4</span>
                    <span>
                      <strong>Linked Document Checklist:</strong> Progress bar, quick task creation with High / Med / Low
                      priorities, and completion checkboxes.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* TAB 3: MICRO-INTERACTIONS & STATES */}
          {activeTab === 'interactions' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-[#f2e0d2]/5 border border-[#f2e0d2]/10 space-y-2">
                <div className="flex items-center space-x-2 text-xs font-mono font-bold text-[#d42710]">
                  <Mic className="w-4 h-4" />
                  <span>Voice Dictation (STT) Trigger & Live Pulse</span>
                </div>
                <p className="text-xs text-[#f2e0d2]/90 leading-relaxed font-sans">
                  Clicking "Start Voice Dictation" initiates the Web Speech API. The microphone button shifts
                  from neutral Orange to a vibrant Vivid Red ring with an active pulse animation. 7 vertical
                  waveform equalizer bars animate to simulate acoustic amplitude. Transcribed text is appended
                  in real time into the active cursor position in the canvas.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#f2e0d2]/5 border border-[#f2e0d2]/10 space-y-2">
                <div className="flex items-center space-x-2 text-xs font-mono font-bold text-[#d42710]">
                  <Clock className="w-4 h-4" />
                  <span>Timer Urgent State (&lt; 1 Minute Remaining)</span>
                </div>
                <p className="text-xs text-[#f2e0d2]/90 leading-relaxed font-sans">
                  When the Pomodoro countdown drops below 01:00, the widget card transitions to a glowing
                  Vivid Red background overlay (<code className="text-[#d42710]">bg-[#d42710]/20</code>) with a
                  pulsing text glow. Upon reaching 00:00, the timer auto-increments the completed sprint counter
                  and prompts a 5-minute Recovery Break.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#f2e0d2]/5 border border-[#f2e0d2]/10 space-y-2">
                <div className="flex items-center space-x-2 text-xs font-mono font-bold text-[#d42710]">
                  <Maximize2 className="w-4 h-4" />
                  <span>Zen Mode Fade & Keyboard Wake</span>
                </div>
                <p className="text-xs text-[#f2e0d2]/90 leading-relaxed font-sans">
                  Activating Zen Mode causes a 500ms opacity transition that fades out the Left Sidebar, Top
                  Navigation, and Productivity Dock. The canvas expands to 100% viewport dimensions. Moving the
                  cursor gently reveals a floating top-right "ESC to Exit" pill, allowing effortless exit.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#f2e0d2]/5 border border-[#f2e0d2]/10 space-y-2">
                <div className="flex items-center space-x-2 text-xs font-mono font-bold text-[#d42710]">
                  <Sparkles className="w-4 h-4" />
                  <span>Real-Time Local Auto-Save & Copy Feedback</span>
                </div>
                <p className="text-xs text-[#f2e0d2]/90 leading-relaxed font-sans">
                  Every keystroke triggers an asynchronous debounce handler updating local document memory.
                  A quiet status indicator displays "Auto-saved to local memory" alongside word counts. Clicking
                  the Copy icon instantly morphs into a checkmark icon with a 2-second confirmation timeout.
                </p>
              </div>
            </div>
          )}

          {/* TAB 4: COLOR APPLICATION MAPPING */}
          {activeTab === 'palette' && (
            <div className="space-y-5">
              <div className="p-4 rounded-xl bg-[#f2e0d2]/5 border border-[#f2e0d2]/10">
                <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[#f2e0d2] mb-3">
                  Strict Three-Color Design System Rules
                </h3>
                <p className="text-xs text-[#f2e0d2]/80 font-sans leading-relaxed">
                  Every pixel on the /dashboard is strictly mapped to one of the three designated hex codes.
                  No arbitrary purple gradients, cyan highlights, or unrequested secondary hues are permitted.
                </p>
              </div>

              {/* Red */}
              <div className="p-4 rounded-xl bg-[#2f2d32] border-2 border-[#d42710] space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="w-4 h-4 rounded-full bg-[#d42710]" />
                    <span className="font-mono font-black text-sm text-[#d42710]">VIVID RED (#d42710)</span>
                  </div>
                  <span className="text-[10px] font-mono uppercase bg-[#d42710] text-[#f2e0d2] px-2 py-0.5 rounded font-bold">
                    Active & Critical Accent
                  </span>
                </div>
                <ul className="list-disc list-inside text-xs font-sans text-[#f2e0d2]/90 space-y-1 pt-1">
                  <li>Active document selection indicator dot and word count metric callouts.</li>
                  <li>Primary "+ New Entry" and "+ Focus" action buttons.</li>
                  <li>Microphone recording pulse indicator and animated audio waveform bars.</li>
                  <li>Urgent Pomodoro countdown highlight when &lt; 1 minute remains.</li>
                  <li>Completed task checkmark state and high-priority task tags.</li>
                  <li>Active navigation folder tab background.</li>
                </ul>
              </div>

              {/* Dark Grey */}
              <div className="p-4 rounded-xl bg-[#2f2d32] border border-[#f2e0d2]/20 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="w-4 h-4 rounded-full bg-[#2f2d32] border border-[#f2e0d2]/40" />
                    <span className="font-mono font-black text-sm text-[#f2e0d2]">DARK GREY (#2f2d32)</span>
                  </div>
                  <span className="text-[10px] font-mono uppercase bg-[#f2e0d2]/10 text-[#f2e0d2] px-2 py-0.5 rounded font-bold">
                    Structure & Contrast
                  </span>
                </div>
                <ul className="list-disc list-inside text-xs font-sans text-[#f2e0d2]/90 space-y-1 pt-1">
                  <li>Left sidebar full container background.</li>
                  <li>Productivity dock full container background.</li>
                  <li>Primary typography and headings rendered across the main light canvas.</li>
                  <li>Zen mode exit floating badge background.</li>
                  <li>Modal background overlay and high-contrast backdrop scrims.</li>
                </ul>
              </div>

              {/* Light Orange */}
              <div className="p-4 rounded-xl bg-[#f2e0d2] text-[#2f2d32] border border-[#f2e0d2] space-y-2 shadow-md">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="w-4 h-4 rounded-full bg-[#f2e0d2] border border-[#2f2d32]/40" />
                    <span className="font-mono font-black text-sm text-[#2f2d32]">LIGHT ORANGE (#f2e0d2)</span>
                  </div>
                  <span className="text-[10px] font-mono uppercase bg-[#2f2d32] text-[#f2e0d2] px-2 py-0.5 rounded font-bold">
                    Paper Canvas & Soft Chrome
                  </span>
                </div>
                <ul className="list-disc list-inside text-xs font-sans text-[#2f2d32]/90 space-y-1 pt-1">
                  <li>Main writing workspace canvas background (simulates warm literary bond paper).</li>
                  <li>Typography and icon color inside the Dark Grey sidebars and productivity dock.</li>
                  <li>Soft borders (10-15% opacity) creating clean separation between structural panels.</li>
                  <li>Active document item highlight card in the left sidebar.</li>
                  <li>Hover states on buttons and list items.</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#f2e0d2]/10 bg-[#2f2d32] flex items-center justify-between text-xs font-mono">
          <span className="text-[#f2e0d2]/60">Rite Product Design System • /dashboard</span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-[#d42710] hover:bg-[#b81f0b] text-[#f2e0d2] font-bold uppercase tracking-wider transition-colors"
          >
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
};
