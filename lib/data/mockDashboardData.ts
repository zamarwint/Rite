import { DocumentEntry, TaskItem, WorkspaceFolder } from '../types';

export const INITIAL_DOCUMENTS: DocumentEntry[] = [
  {
    id: 'doc-1',
    title: 'The Architecture of Silent Workspaces',
    content: `# Chapter 1: The Sanctuary of Focus

In an era saturated with pinging notifications, tab bloat, and perpetual cognitive overload, true creative craftsmanship requires a deliberate withdrawal into quiet digital spaces.

When you strip away distracting navigation sidebars, floating chat widgets, and chaotic feeds, your mind effortlessly enters the flow state. Sentences assemble themselves with clarity.

### The Problem of Context Switching
Studies demonstrate that shifting attention between a drafting app, an external task manager, and a phone timer incurs a 23-minute cognitive penalty for every major interruption. 

Rite unifies these tools into a single, cohesive canvas where to-dos are tethered directly to the text, the Pomodoro sprint beats quietly in the periphery, and voice dictation bridges the gap between spoken thought and the written word.

> "The true enemy of writing is not a lack of inspiration, but an excess of noise."

### Next Steps for This Draft:
- Expand on acoustic rhythm in prose
- Test the Text-to-Speech audio reader to audit rhythm and sentence cadence
- Conclude with actionable rules for deep focus sessions`,
    updatedAt: 'Just now',
    folder: 'essays',
    tags: ['Productivity', 'Essay', 'Focus'],
    wordCount: 174,
    isFavorite: true,
  },
  {
    id: 'doc-2',
    title: 'Investigative Dispatch: Urban Silence & Night Owls',
    content: `# Urban Silence: Midnight in the Metropolis

The city changes character at 2:00 AM. For journalists and writers, this nocturnal window represents the purest sanctuary from the daytime assault on human attention.

We interviewed fourteen investigative authors across three continents to understand how physical and digital noise pollution shapes modern long-form literature.

Key findings:
1. Continuous ambient noise degrades working memory by up to 34%.
2. Writers using dedicated distraction-free software produce 2.2x more finished pages per session.
3. Audio proofreading (listening to text read aloud) caught 40% more structural phrasing inconsistencies than visual skimming alone.`,
    updatedAt: '2 hours ago',
    folder: 'journalism',
    tags: ['Journalism', 'Investigation'],
    wordCount: 112,
    isFavorite: false,
  },
  {
    id: 'doc-3',
    title: 'Weekly Newsletter: Issue #42 - The Minimalist Stack',
    content: `# Issue #42: Less But Better

Welcome back to the weekly dispatch on intentional technology and creative focus.

This week, we are auditing our digital toolchains. If an app requires you to configure 50 settings before you write your first sentence, it is not a productivity tool—it is a hobby.

Let's focus on the essentials:
- A clean blank page
- A lightweight task outline
- A reliable sprint timer`,
    updatedAt: 'Yesterday',
    folder: 'newsletter',
    tags: ['Newsletter', 'Draft'],
    wordCount: 78,
    isFavorite: false,
  },
];

export const INITIAL_TASKS: TaskItem[] = [
  {
    id: 'task-1',
    text: 'Refine introduction on cognitive switching penalty',
    completed: true,
    priority: 'high',
    documentId: 'doc-1',
    dueDate: 'Today',
  },
  {
    id: 'task-2',
    text: 'Run 25-minute Pomodoro sprint for Section 2',
    completed: false,
    priority: 'high',
    documentId: 'doc-1',
    dueDate: 'Today',
  },
  {
    id: 'task-3',
    text: 'Test STT voice dictation for conclusion paragraph',
    completed: false,
    priority: 'medium',
    documentId: 'doc-1',
    dueDate: 'Today',
  },
  {
    id: 'task-4',
    text: 'Listen to draft with Text-to-Speech playback',
    completed: false,
    priority: 'low',
    documentId: 'doc-1',
    dueDate: 'Tomorrow',
  },
  {
    id: 'task-5',
    text: 'Interview audio engineer regarding ambient frequency',
    completed: false,
    priority: 'medium',
    documentId: 'doc-2',
    dueDate: 'Aug 18',
  },
];

export const INITIAL_FOLDERS: WorkspaceFolder[] = [
  { id: 'all', name: 'All Documents', count: 3, icon: 'FileText' },
  { id: 'essays', name: 'Essays & Longform', count: 1, icon: 'BookOpen' },
  { id: 'journalism', name: 'Investigative Desk', count: 1, icon: 'Compass' },
  { id: 'newsletter', name: 'Weekly Dispatch', count: 1, icon: 'Send' },
  { id: 'archive', name: 'Archive & Vault', count: 12, icon: 'Archive' },
];
