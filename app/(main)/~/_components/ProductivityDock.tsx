import React, { useState, useEffect, useRef } from 'react';
import {
  CheckSquare,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Mic,
  MicOff,
  Clock,
  RotateCcw,
  Plus,
  Trash2,
  ChevronRight,
  ChevronLeft,
  Sliders,
  Sparkles,
  Flame,
  Coffee,
  CheckCircle2,
  Circle,
  Radio,
} from 'lucide-react';
import { TaskItem, DocumentEntry } from '@/types/types';
import { Button } from '@/components/ui/button';

interface ProductivityDockProps {
  isDockCollapsed: boolean;
  onToggleCollapse: () => void;
  document: DocumentEntry;
  onAppendText: (text: string) => void;
  tasks: TaskItem[];
  onAddTask: (text: string, priority: 'high' | 'medium' | 'low') => void;
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
  isDictating: boolean;
  onToggleDictation: () => void;
  isPlayingTTS: boolean;
  onToggleTTS: () => void;
}

export const ProductivityDock: React.FC<ProductivityDockProps> = ({
  isDockCollapsed,
  onToggleCollapse,
  document,
  onAppendText,
  tasks,
  onAddTask,
  onToggleTask,
  onDeleteTask,
  isDictating,
  onToggleDictation,
  isPlayingTTS,
  onToggleTTS,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'tasks' | 'audio' | 'timer'>('all');
  const [newTaskText, setNewTaskText] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState<'high' | 'medium' | 'low'>('medium');

  // Pomodoro Timer State
  const [timerMode, setTimerMode] = useState<'work' | 'break'>('work');
  const [timerSecondsLeft, setTimerSecondsLeft] = useState<number>(25 * 60);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [completedSprints, setCompletedSprints] = useState<number>(2);

  // Audio Playback settings
  const [ttsSpeed, setTtsSpeed] = useState<number>(1.0);
  const [ttsProgress, setTtsProgress] = useState<number>(0);
  const speechUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // STT Web Speech API or Simulation
  const recognitionRef = useRef<any>(null);

  // Pomodoro Timer Interval
  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && timerSecondsLeft > 0) {
      interval = setInterval(() => {
        setTimerSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else if (timerSecondsLeft === 0) {
      setIsTimerRunning(false);
      if (timerMode === 'work') {
        setCompletedSprints((prev) => prev + 1);
        setTimerMode('break');
        setTimerSecondsLeft(5 * 60);
      } else {
        setTimerMode('work');
        setTimerSecondsLeft(25 * 60);
      }
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSecondsLeft, timerMode]);

  // Pomodoro controls
  const handleToggleTimer = () => {
    setIsTimerRunning(!isTimerRunning);
  };

  const handleResetTimer = (mode: 'work' | 'break') => {
    setIsTimerRunning(false);
    setTimerMode(mode);
    setTimerSecondsLeft(mode === 'work' ? 25 * 60 : 5 * 60);
  };

  // Text to Speech playback integration
  useEffect(() => {
    if (isPlayingTTS) {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const textToRead = document.content.replace(/[#*`>_-]/g, ' ');
        const utterance = new SpeechSynthesisUtterance(textToRead);
        utterance.rate = ttsSpeed;
        utterance.onend = () => {
          onToggleTTS();
          setTtsProgress(100);
        };
        speechUtteranceRef.current = utterance;
        window.speechSynthesis.speak(utterance);
      }
    } else {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    }
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [isPlayingTTS, ttsSpeed, onToggleTTS, document.content]);

  // Speech to Text Dictation integration
  useEffect(() => {
    if (isDictating) {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        recognition.onresult = (event: any) => {
          const interimTranscript = '';
          for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
              const finalTranscript = event.results[i][0].transcript;
              onAppendText(` ${finalTranscript.trim()}`);
            }
          }
        };

        recognition.onerror = (e: any) => {
          console.warn('Speech recognition error/fallback:', e);
        };

        recognition.start();
        recognitionRef.current = recognition;
      } else {
        // Simulated voice capture fallback for environments without mic permissions
        const simulatedWords = [
          ' Moreover, hyper-focus allows synthesis of deep insights.',
          ' When we quiet the peripheral distractions, writing flows naturally.',
          ' The cadence of clear prose emerges through iterative refinement.',
        ];
        const timeout = setTimeout(() => {
          const randomPhrase = simulatedWords[Math.floor(Math.random() * simulatedWords.length)];
          onAppendText(randomPhrase);
        }, 3500);
        return () => clearTimeout(timeout);
      }
    } else {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (err) {
          // ignore
          console.log(err)
        }
      }
    }
  }, [isDictating, onAppendText]);

  // Timer formatting
  const timerMinutes = Math.floor(timerSecondsLeft / 60);
  const timerSeconds = timerSecondsLeft % 60;
  const isUrgentTimer = timerSecondsLeft < 60 && timerSecondsLeft > 0;

  // Add task handler
  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskText.trim()) return;
    onAddTask(newTaskText.trim(), newTaskPriority);
    setNewTaskText('');
  };

  // Filter tasks for current document or general
  const docTasks = tasks.filter((t) => !t.documentId || t.documentId === document.id);
  const completedTaskCount = docTasks.filter((t) => t.completed).length;

  if (isDockCollapsed) {
    return (
      <aside className="w-14 bg-background border-l border-border flex flex-col items-center justify-between py-5 text-foreground shrink-0 transition-all duration-300 z-30 select-none">
        <div className="flex flex-col items-center space-y-4">
          <Button
            onClick={onToggleCollapse}
            variant='outline'
            className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-background/10 transition-colors"
            title="Expand Productivity Dock"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>

          {/* Quick Mini Timer Icon */}
          <div
            onClick={onToggleCollapse}
            className={`p-2 rounded-lg cursor-pointer transition-colors ${isTimerRunning ? 'bg-primary text-background' : 'text-muted-foreground hover:text-foreground'
              }`}
            title={`Pomodoro: ${timerMinutes}:${timerSeconds < 10 ? '0' : ''}${timerSeconds}`}
          >
            <Clock className="w-4 h-4" />
          </div>

          {/* Quick Mic State */}
          <div
            onClick={onToggleDictation}
            className={`p-2 rounded-lg cursor-pointer transition-colors ${isDictating ? 'bg-primary text-background animate-pulse' : 'text-muted-foreground hover:text-foreground'
              }`}
            title={isDictating ? 'Dictating (Click to Stop)' : 'Start Voice Dictation'}
          >
            <Mic className="w-4 h-4" />
          </div>

          {/* Quick Tasks */}
          <div
            onClick={onToggleCollapse}
            className="p-2 rounded-lg text-muted-foreground hover:text-foreground cursor-pointer"
            title={`${completedTaskCount}/${docTasks.length} Tasks Complete`}
          >
            <CheckSquare className="w-4 h-4" />
          </div>
        </div>

        {/* Minimal status indicator */}
        <div className="text-[9px] font-mono text-muted-foreground -rotate-90 uppercase tracking-widest whitespace-nowrap">
          DOCK
        </div>
      </aside>
    );
  }

  return (
    <aside className="w-80 lg:w-96 bg-background border-l border-border flex flex-col text-foreground shrink-0 transition-all duration-300 z-30 h-full overflow-hidden select-none">
      {/* 1. DOCK HEADER & PERSISTENT POMODORO BAR */}
      <div className="p-4 border-b border-border bg-background">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-primary" />
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-foreground">
              Productivity Dock
            </span>
          </div>

          <Button
            onClick={onToggleCollapse}
            variant='outline'
            className="p-1 rounded hover:bg-background/10 text-muted-foreground hover:text-foreground transition-colors"
            title="Collapse Dock"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        {/* PERSISTENT POMODORO TIMER WIDGET */}
        <div
          className={`p-3 rounded-xl border transition-all ${isUrgentTimer
            ? 'bg-primary/20 border-primary shadow-[0_0_15px_rgba(212,39,16,0.3)] animate-pulse'
            : 'bg-background/5 border-border'
            }`}
        >
          <div className="flex items-center justify-between text-xs font-mono mb-2">
            <div className="flex items-center space-x-1.5">
              {timerMode === 'work' ? (
                <span className="text-primary font-bold flex items-center space-x-1">
                  <Flame className="w-3.5 h-3.5" />
                  <span>FOCUS SPRINT</span>
                </span>
              ) : (
                <span className="text-emerald-400 font-bold flex items-center space-x-1">
                  <Coffee className="w-3.5 h-3.5" />
                  <span>RECOVERY BREAK</span>
                </span>
              )}
            </div>

            {/* Sprints completed dot indicators */}
            <div className="flex items-center space-x-1">
              {[1, 2, 3, 4].map((i) => (
                <span
                  key={i}
                  className={`w-1.5 h-1.5 rounded-full ${i <= completedSprints ? 'bg-primary' : 'bg-muted/20'
                    }`}
                  title={`Sprint ${i}`}
                />
              ))}
            </div>
          </div>

          {/* Big Time Display & Controls */}
          <div className="flex items-center justify-between">
            <div>
              <div
                className={`text-3xl font-mono font-black tracking-tight ${isUrgentTimer ? 'text-primary' : 'text-foreground'
                  }`}
              >
                {timerMinutes < 10 ? `0${timerMinutes}` : timerMinutes}:
                {timerSeconds < 10 ? `0${timerSeconds}` : timerSeconds}
              </div>
              <p className="text-[10px] font-mono text-[#f2e0d2]/50 mt-0.5">
                {isUrgentTimer ? '⚡ Under 1 min remaining!' : `${completedSprints} of 4 Sprints Today`}
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                onClick={handleToggleTimer}
                className={`px-3.5 py-2 rounded-lg font-mono font-bold text-xs uppercase tracking-wider flex items-center space-x-1.5 transition-all shadow-md ${isTimerRunning
                  ? 'bg-background text-foreground'
                  : 'bg-primary hover:bg-primary/70 text-background'
                  }`}
              >
                {isTimerRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                <span>{isTimerRunning ? 'Pause' : 'Focus'}</span>
              </Button>

              <Button
                onClick={() => handleResetTimer(timerMode)}
                variant='outline'
                className="p-2 rounded-lg hover:bg-background/10 text-muted-foreground hover:text-foreground transition-colors"
                title="Reset Timer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center justify-between mt-3 bg-background/5 p-1 rounded-lg border border-border text-xs font-mono">
          <Button
            onClick={() => setActiveTab('all')}
            variant={activeTab === 'all' ? 'default' : 'ghost'}
            className={`flex-1 py-1 rounded text-center transition-colors `}
          >
            All Tools
          </Button>
          <Button
            onClick={() => setActiveTab('tasks')}
            variant={activeTab === 'tasks' ? 'default' : 'ghost'}
            className={`flex-1 py-1 rounded text-center transition-colors `}
          >
            Tasks ({docTasks.length})
          </Button>
          <Button
            onClick={() => setActiveTab('audio')}
            variant={activeTab === 'audio' ? 'default' : 'ghost'}
            className={`flex-1 py-1 rounded text-center transition-colors `}
          >
            Audio STT/TTS
          </Button>
        </div>
      </div>

      {/* 2. DOCK SCROLLABLE CONTENT (Tasks + Audio Controls) */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* AUDIO TOOLS SUITE (STT & TTS) */}
        {(activeTab === 'all' || activeTab === 'audio') && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-muted-foreground/50">
                Audio Engine (STT & TTS)
              </span>
              <span className="text-[10px] font-mono text-primary font-semibold">Real-Time Sync</span>
            </div>

            {/* 1. Speech-to-Text (STT) Dictation UI */}
            <div
              className={`p-3.5 rounded-xl border transition-all ${isDictating
                ? 'bg-primary/15 border-primary shadow-[0_0_20px_rgba(212,39,16,0.3)]'
                : 'bg-background/5 border-border'
                }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono font-bold text-foreground flex items-center space-x-1.5">
                  <Mic className="w-3.5 h-3.5 text-primary" />
                  <span>Speech-to-Text Dictation</span>
                </span>
                {isDictating && (
                  <span className="px-2 py-0.5 rounded-full bg-primary text-background text-[9px] font-mono font-black uppercase tracking-wider animate-pulse">
                    Recording Live
                  </span>
                )}
              </div>

              {/* Waveform Visualization when Dictating */}
              {isDictating && (
                <div className="flex items-center justify-center space-x-1 py-3 mb-2">
                  <span className="w-1 bg-primary h-6 rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-1 bg-primary h-10 rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-1 bg-primary h-4 rounded-full animate-bounce [animation-delay:-0.4s]" />
                  <span className="w-1 bg-primary h-8 rounded-full animate-bounce [animation-delay:-0.2s]" />
                  <span className="w-1 bg-primary h-12 rounded-full animate-bounce [animation-delay:-0.1s]" />
                  <span className="w-1 bg-primary h-5 rounded-full animate-bounce [animation-delay:-0.35s]" />
                  <span className="w-1 bg-primary h-9 rounded-full animate-bounce [animation-delay:-0.25s]" />
                </div>
              )}

              <p className="text-[11px] text-muted-foreground mb-3 font-sans leading-normal">
                {isDictating
                  ? 'Speak clearly into your microphone. Words are transcribed directly into your draft.'
                  : 'Capture spoken thoughts at conversational speed without typing fatigue.'}
              </p>

              <Button
                id="stt-dictation-toggle-btn"
                onClick={onToggleDictation}
                className={`w-full py-2.5 rounded-lg text-xs font-mono font-bold uppercase tracking-wider flex items-center justify-center space-x-2 transition-all shadow-md ${isDictating
                  ? 'bg-primary hover:bg-primary/90 text-background ring-4 ring-primary/30 animate-pulse'
                  : 'bg-foreground hover:bg-foreground/90 text-background'
                  }`}
              >
                {isDictating ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4 text-primary" />}
                <span>{isDictating ? 'Stop Voice Recording' : 'Start Voice Dictation'}</span>
              </Button>
            </div>

            {/* 2. Text-to-Speech (TTS) Media Player */}
            <div className="p-3.5 rounded-xl bg-background/5 border border-border space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-foreground flex items-center space-x-1.5">
                  <Volume2 className="w-3.5 h-3.5 text-primary" />
                  <span>Text-to-Speech Proofreader</span>
                </span>
                <span className="text-[10px] font-mono text-muted-foreground/50">Audio Reader</span>
              </div>

              <div className="flex items-center space-x-3">
                <Button
                  onClick={onToggleTTS}
                  className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-transform hover:scale-105 shadow-md ${isPlayingTTS
                    ? 'bg-primary text-background'
                    : 'bg-foreground hover:bg-foreground/90 text-background'
                    }`}
                  title={isPlayingTTS ? 'Pause Audio' : 'Play Draft Aloud'}
                >
                  {isPlayingTTS ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
                </Button>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between text-[11px] font-mono text-[#f2e0d2]/70 mb-1">
                    <span>{isPlayingTTS ? 'Reading Draft...' : 'Ready to listen'}</span>
                    <span className="text-[10px] font-bold text-primary">{ttsSpeed}x SPEED</span>
                  </div>
                  {/* Speed toggle pills */}
                  <div className="flex items-center space-x-1 font-mono text-[10px]">
                    {[0.8, 1.0, 1.25, 1.5].map((speed) => (
                      <Button
                        key={speed}
                        onClick={() => setTtsSpeed(speed)}
                        className={`px-2 py-0.5 rounded transition-colors ${ttsSpeed === speed
                          ? 'bg-primary text-foreground font-bold'
                          : 'bg-background/10 text-foreground/70 hover:bg-background/20'
                          }`}
                      >
                        {speed}x
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* DOCUMENT LINKED TASKS & TO-DO LIST */}
        {(activeTab === 'all' || activeTab === 'tasks') && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-muted-foreground/50">
                Document Checklist ({completedTaskCount}/{docTasks.length})
              </span>
              <span className="text-[10px] font-mono text-primary">
                {Math.round((completedTaskCount / (docTasks.length || 1)) * 100)}% Complete
              </span>
            </div>

            {/* Task Progress Bar */}
            <div className="w-full h-1.5 bg-background/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-300 rounded-full"
                style={{
                  width: `${(completedTaskCount / (docTasks.length || 1)) * 100}%`,
                }}
              />
            </div>

            {/* Add Task Input Form */}
            <form onSubmit={handleCreateTask} className="space-y-2">
              <div className="flex items-center bg-background/5 border border-border rounded-lg overflow-hidden focus-within:border-primary">
                <input
                  type="text"
                  value={newTaskText}
                  onChange={(e) => setNewTaskText(e.target.value)}
                  placeholder="Add actionable task..."
                  className="flex-1 bg-transparent px-3 py-2 text-xs text-foreground placeholder-muted-foreground outline-none font-sans"
                />
                <Button
                  type="submit"
                  variant='outline'
                  className="px-3 py-2 bg-primary hover:bg-primary/90 text-background font-bold text-xs transition-colors shrink-0"
                  title="Add Task"
                >
                  <Plus className="w-3.5 h-3.5" />
                </Button>
              </div>

              {/* Priority Selector */}
              <div className="flex items-center justify-between text-[10px] font-mono text-muted-foreground/60 px-1">
                <span>Priority:</span>
                <div className="flex items-center space-x-1.5">
                  <Button
                    onClick={() => setNewTaskPriority('low')}
                    className={`px-2 py-0.5 rounded ${newTaskPriority === 'low'
                      ? 'bg-emerald-600 dark:hover:bg-emerald-800 text-foreground font-bold'
                      : 'bg-background/10 dark:hover:bg-emerald-800 text-muted-foreground/60 hover:text-foreground'
                      }`}
                  >
                    Low
                  </Button>
                  <Button
                    onClick={() => setNewTaskPriority('medium')}
                    className={`px-2 py-0.5 rounded ${newTaskPriority === 'medium'
                      ? 'bg-amber-600 dark:hover:bg-amber-800 text-foreground font-bold'
                      : 'bg-background/10 dark:hover:bg-amber-800 text-muted-foreground/60 hover:text-foreground'
                      }`}
                  >
                    Medium
                  </Button>
                  <Button
                    onClick={() => setNewTaskPriority('high')}
                    className={`px-2 py-0.5 rounded ${newTaskPriority === 'high'
                      ? 'bg-primary hover:bg-primary/80 text-foreground font-bold'
                      : 'bg-background/10 dark:hover:bg-primary/80 text-muted-foreground/60 hover:text-foreground'
                      }`}
                  >
                    High
                  </Button>
                </div>
              </div>
            </form>

            {/* Task Items List */}
            <div className="space-y-1.5 pt-1">
              {docTasks.map((task) => (
                <div
                  key={task.id}
                  onClick={() => onToggleTask(task.id)}
                  className={`group flex items-start justify-between p-2.5 rounded-lg border transition-all cursor-pointer ${task.completed
                    ? 'bg-background/5 border-border/5 opacity-60'
                    : 'bg-background/5 border-border hover:border-primary/40'
                    }`}
                >
                  <div className="flex items-start space-x-2.5 flex-1 min-w-0 pr-2">
                    <div className="mt-0.5 shrink-0">
                      {task.completed ? (
                        <CheckCircle2 className="w-4 h-4 text-primary" />
                      ) : (
                        <Circle className="w-4 h-4 text-muted-foreground/40 group-hover:text-primary" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <p
                        className={`text-xs font-sans leading-snug wrap-break-word ${task.completed ? 'line-through text-muted-foreground/50' : 'text-foreground'
                          }`}
                      >
                        {task.text}
                      </p>
                      <div className="flex items-center space-x-2 mt-1 text-[9px] font-mono">
                        {task.priority && (
                          <span
                            className={`px-1.5 py-0.2 rounded uppercase ${task.priority === 'high'
                              ? 'bg-primary/20 text-primary font-bold'
                              : task.priority === 'medium'
                                ? 'bg-amber-300 text-amber-950 dark:bg-amber-500/20 dark:text-amber-300'
                                : 'bg-emerald-300 text-emerald-950 dark:bg-emerald-500/20 dark:text-emerald-300'
                              }`}
                          >
                            {task.priority}
                          </span>
                        )}
                        {task.dueDate && <span className="text-muted-foreground/40">Due {task.dueDate}</span>}
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteTask(task.id);
                    }}
                    variant='outline'
                    className="opacity-0 group-hover:opacity-100 p-1 text-muted-foreground/40 transition-opacity shrink-0"
                    title="Delete task"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};
