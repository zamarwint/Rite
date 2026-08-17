import React, { useState, useEffect } from 'react';
import {
  X,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  Mic,
  MicOff,
  CheckSquare,
  Square,
  Plus,
  Trash2,
  Sparkles,
  Maximize2,
  Minimize2,
  PenTool,
  Timer as TimerIcon,
  Download,
  Copy,
  Check,
} from 'lucide-react';
import { TaskItem } from '@/types/types';

interface InteractiveEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialFeature?: string;
}

export const InteractiveEditorModal: React.FC<InteractiveEditorModalProps> = ({
  isOpen,
  onClose,
  initialFeature = 'notes',
}) => {
  const [activeTab, setActiveTab] = useState<'notes' | 'todos' | 'timer' | 'speech'>('notes');

  // Editor State
  const [docTitle, setDocTitle] = useState('Deep_Focus_Article_Draft.rite');
  const [docContent, setDocContent] = useState(
    "Chapter 1: The Art of Hyper-Focus\n\nIn an age where every application competes for a slice of human consciousness, true craftsmanship requires a intentional withdrawal into quiet spaces.\n\nWhen you remove the noise of tabs, sidebars, and infinite scrolling notifications, your thoughts naturally organize into articulate sentences. Rite was built precisely for this sacred ritual..."
  );

  // Tasks State
  const [tasks, setTasks] = useState<TaskItem[]>([
    { id: '1', text: 'Outline key argument on context switching', completed: true, priority: 'high' },
    { id: '2', text: 'Draft 500 words during 25-min Pomodoro sprint', completed: false, priority: 'high' },
    { id: '3', text: 'Use Speech-to-Text dictation for conclusion paragraph', completed: false, priority: 'medium' },
    { id: '4', text: 'Listen to draft with Text-to-Speech playback', completed: false, priority: 'low' },
  ]);
  const [newTaskInput, setNewTaskInput] = useState('');

  // Pomodoro Timer State
  const [timerSeconds, setTimerSeconds] = useState(1500); // 25:00
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timerMode, setTimerMode] = useState<'work' | 'break'>('work');
  const [completedSprints, setCompletedSprints] = useState(2);

  // Audio / Speech State
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0) {
      if (timerMode === 'work') {
        setCompletedSprints((s) => s + 1);
        setTimerMode('break');
        setTimerSeconds(300); // 5 min break
      } else {
        setTimerMode('work');
        setTimerSeconds(1500);
      }
      setIsTimerRunning(false);
    }
    return () => clearInterval(interval as NodeJS.Timeout);
  }, [isTimerRunning, timerSeconds, timerMode]);

  if (!isOpen) return null;

  const wordCount = docContent.trim() ? docContent.trim().split(/\s+/).length : 0;

  // Add Task
  const handleAddTask = () => {
    if (!newTaskInput.trim()) return;
    setTasks([
      ...tasks,
      { id: Date.now().toString(), text: newTaskInput.trim(), completed: false, priority: 'medium' },
    ]);
    setNewTaskInput('');
  };

  const toggleTask = (id: string) => {
    setTasks(
      tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  // Text-to-Speech
  const handleToggleTTS = () => {
    if ('speechSynthesis' in window) {
      if (isSpeaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
      } else {
        const utterance = new SpeechSynthesisUtterance(docContent);
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = () => setIsSpeaking(false);
        window.speechSynthesis.speak(utterance);
        setIsSpeaking(true);
      }
    } else {
      alert('Text-to-Speech is simulated in this browser environment!');
    }
  };

  // Speech-to-Text simulation / dictation
  const handleToggleSTT = () => {
    if (isListening) {
      setIsListening(false);
    } else {
      setIsListening(true);
      // Simulate voice dictation adding words
      setTimeout(() => {
        setDocContent(
          (prev) =>
            prev +
            '\n\n[Dictation]: Dictating ideas effortlessly using Rite Speech-to-Text engine. Words flow directly into the editor.'
        );
        setIsListening(false);
      }, 3000);
    }
  };

  const handleCopyDoc = () => {
    navigator.clipboard.writeText(docContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-[#2f2d32]/90 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-5xl h-[92vh] bg-[#f2e0d2] text-[#2f2d32] rounded-2xl border-4 border-[#2f2d32] shadow-2xl flex flex-col overflow-hidden">
        {/* Top Header Bar */}
        <div className="bg-[#2f2d32] text-[#f2e0d2] px-4 py-3 flex items-center justify-between border-b-2 border-[#2f2d32]">
          <div className="flex items-center space-x-3">
            <div className="w-7 h-7 rounded bg-[#d42710] text-[#f2e0d2] font-bold flex items-center justify-center text-sm">
              R
            </div>
            <input
              type="text"
              value={docTitle}
              onChange={(e) => setDocTitle(e.target.value)}
              className="bg-transparent text-sm font-mono font-bold text-[#f2e0d2] border-b border-[#f2e0d2]/20 focus:border-[#d42710] outline-none"
            />
          </div>

          {/* Center Tabs */}
          <div className="hidden sm:flex items-center bg-[#f2e0d2]/10 p-1 rounded-lg">
            <button
              onClick={() => setActiveTab('notes')}
              className={`px-3 py-1 rounded text-xs font-semibold flex items-center space-x-1.5 transition-colors ${activeTab === 'notes' ? 'bg-[#d42710] text-[#f2e0d2]' : 'text-[#f2e0d2]/70 hover:text-[#f2e0d2]'
                }`}
            >
              <PenTool className="w-3.5 h-3.5" />
              <span>Note Editor</span>
            </button>
            <button
              onClick={() => setActiveTab('todos')}
              className={`px-3 py-1 rounded text-xs font-semibold flex items-center space-x-1.5 transition-colors ${activeTab === 'todos' ? 'bg-[#d42710] text-[#f2e0d2]' : 'text-[#f2e0d2]/70 hover:text-[#f2e0d2]'
                }`}
            >
              <CheckSquare className="w-3.5 h-3.5" />
              <span>To-Dos ({tasks.filter((t) => !t.completed).length})</span>
            </button>
            <button
              onClick={() => setActiveTab('timer')}
              className={`px-3 py-1 rounded text-xs font-semibold flex items-center space-x-1.5 transition-colors ${activeTab === 'timer' ? 'bg-[#d42710] text-[#f2e0d2]' : 'text-[#f2e0d2]/70 hover:text-[#f2e0d2]'
                }`}
            >
              <TimerIcon className="w-3.5 h-3.5" />
              <span>Timer ({formatTime(timerSeconds)})</span>
            </button>
            <button
              onClick={() => setActiveTab('speech')}
              className={`px-3 py-1 rounded text-xs font-semibold flex items-center space-x-1.5 transition-colors ${activeTab === 'speech' ? 'bg-[#d42710] text-[#f2e0d2]' : 'text-[#f2e0d2]/70 hover:text-[#f2e0d2]'
                }`}
            >
              <Mic className="w-3.5 h-3.5" />
              <span>TTS / STT Audio</span>
            </button>
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[#d42710] text-[#f2e0d2] transition-colors"
            title="Close Interactive Suite"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mobile Tab Strip */}
        <div className="flex sm:hidden items-center justify-around bg-[#2f2d32]/90 text-[#f2e0d2] p-2 text-xs font-mono">
          <button
            onClick={() => setActiveTab('notes')}
            className={activeTab === 'notes' ? 'text-[#d42710] font-bold' : 'opacity-60'}
          >
            Notes
          </button>
          <button
            onClick={() => setActiveTab('todos')}
            className={activeTab === 'todos' ? 'text-[#d42710] font-bold' : 'opacity-60'}
          >
            Tasks
          </button>
          <button
            onClick={() => setActiveTab('timer')}
            className={activeTab === 'timer' ? 'text-[#d42710] font-bold' : 'opacity-60'}
          >
            Timer
          </button>
          <button
            onClick={() => setActiveTab('speech')}
            className={activeTab === 'speech' ? 'text-[#d42710] font-bold' : 'opacity-60'}
          >
            Audio
          </button>
        </div>

        {/* Main Content Workspace Grid */}
        <div className="flex-1 overflow-hidden grid grid-cols-1 lg:grid-cols-4 bg-[#f2e0d2]">
          {/* Main Text Writing Canvas (3 Columns) */}
          <div className="lg:col-span-3 p-6 sm:p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#2f2d32]/10 overflow-y-auto">
            <div>
              {/* Quick Action Toolbar */}
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#2f2d32]/10 text-xs font-mono text-[#2f2d32]/70">
                <div className="flex items-center space-x-4">
                  <span className="font-bold text-[#d42710]">{wordCount} WORDS</span>
                  <span>~{Math.max(1, Math.ceil(wordCount / 200))} MIN READ</span>
                  <span className="hidden sm:inline">CHARACTERS: {docContent.length}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleCopyDoc}
                    className="flex items-center space-x-1 px-2.5 py-1 rounded bg-[#2f2d32]/10 hover:bg-[#2f2d32]/20 font-semibold text-xs"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-green-700" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied' : 'Copy Draft'}</span>
                  </button>
                  <button
                    onClick={handleToggleTTS}
                    className={`flex items-center space-x-1 px-2.5 py-1 rounded font-semibold text-xs transition-colors ${isSpeaking ? 'bg-[#d42710] text-[#f2e0d2]' : 'bg-[#2f2d32]/10 hover:bg-[#2f2d32]/20'
                      }`}
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>{isSpeaking ? 'Stop Reading' : 'Listen TTS'}</span>
                  </button>
                </div>
              </div>

              {/* Distraction-Free Writing Canvas */}
              <textarea
                value={docContent}
                onChange={(e) => setDocContent(e.target.value)}
                className="w-full h-[52vh] bg-transparent resize-none outline-none font-serif text-lg sm:text-xl text-[#2f2d32] leading-relaxed placeholder-[#2f2d32]/40"
                placeholder="Start typing your story, article, or chapter here..."
              />
            </div>

            {/* Bottom Status Bar */}
            <div className="pt-4 border-t border-[#2f2d32]/10 flex flex-wrap items-center justify-between text-xs font-mono text-[#2f2d32]/60 gap-2">
              <span className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-[#d42710] animate-ping" />
                <span>RITE FOCUS ENGINE ACTIVE • HYPER-FOCUS MODE</span>
              </span>
              <span>AUTO-SAVED TO BROWSER LOCAL STORAGE</span>
            </div>
          </div>

          {/* Right Sidebar Widget Column (1 Column) */}
          <div className="p-6 bg-[#2f2d32] text-[#f2e0d2] flex flex-col justify-between overflow-y-auto">
            {/* Tab 1: Integrated To-Dos */}
            {activeTab === 'todos' || activeTab === 'notes' ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-[#f2e0d2]/10 pb-3">
                  <div className="flex items-center space-x-2 font-mono text-xs font-bold text-[#d42710] uppercase">
                    <CheckSquare className="w-4 h-4" />
                    <span>Integrated Tasks</span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#f2e0d2]/10">
                    {tasks.filter((t) => t.completed).length}/{tasks.length}
                  </span>
                </div>

                {/* Add Task Input */}
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newTaskInput}
                    onChange={(e) => setNewTaskInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddTask()}
                    placeholder="Add task to draft outline..."
                    className="flex-1 bg-[#f2e0d2]/10 border border-[#f2e0d2]/20 rounded px-2.5 py-1.5 text-xs text-[#f2e0d2] placeholder-[#f2e0d2]/40 focus:outline-none focus:border-[#d42710]"
                  />
                  <button
                    onClick={handleAddTask}
                    className="p-1.5 rounded bg-[#d42710] hover:bg-[#b81f0b] text-[#f2e0d2]"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Task List */}
                <div className="space-y-2 max-h-[30vh] overflow-y-auto pr-1">
                  {tasks.map((task) => (
                    <div
                      key={task.id}
                      className="flex items-start justify-between p-2 rounded bg-[#f2e0d2]/5 hover:bg-[#f2e0d2]/10 border border-[#f2e0d2]/10 text-xs font-mono group"
                    >
                      <button
                        onClick={() => toggleTask(task.id)}
                        className="flex items-start space-x-2 text-left flex-1"
                      >
                        {task.completed ? (
                          <CheckSquare className="w-4 h-4 text-[#d42710] mt-0.5 shrink-0" />
                        ) : (
                          <Square className="w-4 h-4 text-[#f2e0d2]/40 mt-0.5 shrink-0" />
                        )}
                        <span className={task.completed ? 'line-through text-[#f2e0d2]/40' : 'text-[#f2e0d2]'}>
                          {task.text}
                        </span>
                      </button>
                      <button
                        onClick={() => deleteTask(task.id)}
                        className="text-[#f2e0d2]/30 hover:text-[#d42710] opacity-0 group-hover:opacity-100 transition-opacity ml-2"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            {/* Tab 2: Pomodoro Timer */}
            {activeTab === 'timer' || activeTab === 'notes' ? (
              <div className="mt-6 pt-6 border-t border-[#f2e0d2]/10 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-[#d42710] uppercase flex items-center space-x-1.5">
                    <TimerIcon className="w-4 h-4" />
                    <span>Pomodoro Sprint</span>
                  </span>
                  <span className="text-[10px] font-mono text-[#f2e0d2]/60">
                    Sprints Completed: {completedSprints}
                  </span>
                </div>

                {/* Big Timer Display */}
                <div className="text-center bg-[#f2e0d2]/5 p-4 rounded-xl border border-[#f2e0d2]/10">
                  <div className="text-3xl font-mono font-black text-[#d42710] tracking-widest mb-1">
                    {formatTime(timerSeconds)}
                  </div>
                  <span className="text-[10px] uppercase font-mono tracking-wider text-[#f2e0d2]/60">
                    {timerMode === 'work' ? 'Sprint Mode (25m)' : 'Rest Break (5m)'}
                  </span>

                  {/* Timer Controls */}
                  <div className="flex items-center justify-center space-x-3 mt-4">
                    <button
                      onClick={() => setIsTimerRunning(!isTimerRunning)}
                      className="px-4 py-1.5 rounded-full bg-[#d42710] text-[#f2e0d2] font-mono text-xs font-bold hover:bg-[#b81f0b] flex items-center space-x-1"
                    >
                      {isTimerRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                      <span>{isTimerRunning ? 'PAUSE' : 'START SPRINT'}</span>
                    </button>
                    <button
                      onClick={() => {
                        setIsTimerRunning(false);
                        setTimerSeconds(1500);
                      }}
                      className="p-1.5 rounded bg-[#f2e0d2]/10 text-[#f2e0d2]/70 hover:text-[#f2e0d2]"
                      title="Reset Timer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ) : null}

            {/* Tab 3: Speech Audio TTS / STT */}
            {activeTab === 'speech' && (
              <div className="space-y-4">
                <div className="flex items-center space-x-2 font-mono text-xs font-bold text-[#d42710] uppercase border-b border-[#f2e0d2]/10 pb-2">
                  <Mic className="w-4 h-4" />
                  <span>Speech-to-Text Dictation</span>
                </div>

                <div className="p-4 rounded-xl bg-[#f2e0d2]/5 border border-[#f2e0d2]/10 text-center space-y-3">
                  <p className="text-xs text-[#f2e0d2]/80">
                    Speak your outline ideas directly into your document draft.
                  </p>

                  <button
                    onClick={handleToggleSTT}
                    className={`w-full py-3 rounded-lg font-mono text-xs font-bold flex items-center justify-center space-x-2 transition-all ${isListening
                      ? 'bg-[#d42710] text-[#f2e0d2] animate-pulse'
                      : 'bg-[#f2e0d2] text-[#2f2d32] hover:bg-[#d42710] hover:text-[#f2e0d2]'
                      }`}
                  >
                    {isListening ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
                    <span>{isListening ? 'Listening & Dictating...' : 'Start Voice Dictation'}</span>
                  </button>

                  {isListening && (
                    <span className="text-[10px] font-mono text-[#d42710] block animate-bounce">
                      ● Recording voice input...
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
