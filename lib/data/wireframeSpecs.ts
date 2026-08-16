import { FeatureCard, Testimonial, WireframeSectionSpec } from '../types';

export const WIREFRAME_SPECS: WireframeSectionSpec[] = [
  {
    id: 'header',
    sectionName: '1. Header / Navigation',
    designNotes: [
      'Background: LIGHT ORANGE (#f2e0d2)',
      'Layout: Sticky top header, clean and minimalist. Logo on far left with VIVID RED dot accent.',
      'Typography: DARK GREY (#2f2d32)',
      'Button: VIVID RED (#d42710) pill-shaped button with LIGHT ORANGE text',
    ],
    headline: 'Rite.',
    keyElements: ['Features Link', 'Methodology Link', 'Wall of Love Link', 'Start Writing Free CTA'],
    ctaText: 'Start Writing Free',
  },
  {
    id: 'hero',
    sectionName: '2. Hero Section',
    designNotes: [
      'Background: LIGHT ORANGE (#f2e0d2)',
      'Layout: Single-column, center-aligned to mimic blank page focus',
      'Visual: Large UI mockup in DARK GREY wrapper with bright VIVID RED timer counting down at top right',
    ],
    headline: 'Close the tabs. Silence the noise. Do your best work.',
    subHeadline:
      'Rite is the all-in-one productivity suite built for creators, journalists, and planners. A singular, distraction-free space where your ideas finally get the focus they deserve.',
    ctaText: 'Claim Your Free Workspace',
    microCopy: 'No credit card required. Setup takes 30 seconds.',
    keyElements: ['Centered typography', 'High-contrast CTA', 'Interactive app preview mockup with Pomodoro timer'],
  },
  {
    id: 'social-proof',
    sectionName: '3. Social Proof (Authority Strip)',
    designNotes: [
      'Background: LIGHT ORANGE (#f2e0d2) seamlessly continuing from Hero',
      'Layout: Horizontal carousel/strip of monochromatic DARK GREY logos at 40% opacity',
      'Goal: Build trust without distracting from core message',
    ],
    headline: 'Loved by focused creators at:',
    keyElements: ['Substack Logo', 'Medium Logo', 'The New York Times Logo', 'Ghost Logo', 'Patreon Logo'],
  },
  {
    id: 'agitation',
    sectionName: '4. The Agitation Section (Problem Statement)',
    designNotes: [
      'Background: DARK GREY (#2f2d32) - sudden shift in color signals a shift in tone',
      'Layout: 2-column layout. Left: persuasive copy; Right: interactive noise vs focus comparison',
      'Typography: LIGHT ORANGE (#f2e0d2) with VIVID RED (#d42710) highlights',
    ],
    headline: "You don't need another app. You need a quiet room.",
    subHeadline:
      'Context switching is the enemy of creativity. Bouncing between a notes app, a task manager, a timer on your phone, and a separate dictation tool drains your mental energy.',
    keyElements: ['~~15 open tabs~~', '~~Lost to-do lists~~', '~~Endless notifications~~', 'Vivid Red highlight banner'],
    ctaText: 'Rite puts everything you need in one window, and blocks out the rest.',
  },
  {
    id: 'features',
    sectionName: '5. Core Features (The "How It Works" Grid)',
    designNotes: [
      'Background: LIGHT ORANGE (#f2e0d2)',
      'Layout: 2x2 Grid of cards with 2px solid DARK GREY (#2f2d32) border',
      'Hover interaction: Border and icon snap to VIVID RED (#d42710), card lifts slightly',
    ],
    headline: 'Built for the flow state.',
    keyElements: [
      'Card 1: Distraction-Free Note-taking (Pen Icon)',
      'Card 2: Integrated To-Do Lists (Checklist Icon)',
      'Card 3: Built-in Focus Timers (Timer Icon)',
      'Card 4: TTS & STT Capabilities (Mic/Speaker Icon)',
    ],
  },
  {
    id: 'interactive-focus',
    sectionName: '6. Interactive Focus Feature (The Magic Moment)',
    designNotes: [
      'Background: LIGHT ORANGE (#f2e0d2) transitioning to DARK GREY (#2f2d32)',
      'Layout: Full-width centered block with stylized VIVID RED toggle switch',
      'Magic Moment: Toggling switch darkens full landing page into dark grey Focus Mode',
    ],
    headline: 'Enter "Hyper-Focus" with a single click.',
    subHeadline: 'See what it feels like to silence the digital noise. Hit the switch.',
    ctaText: 'Focus Mode [OFF / ON]',
    microCopy: 'Ahh, much better. This is what writing in Rite feels like.',
    keyElements: ['Interactive toggle switch', 'Global background color darkener', 'Ambient focus sound player'],
  },
  {
    id: 'testimonials',
    sectionName: '7. Testimonials (Wall of Love)',
    designNotes: [
      'Background: DARK GREY (#2f2d32)',
      'Layout: 3-column masonry grid of quote cards',
      'Typography: LIGHT ORANGE text with massive VIVID RED (#d42710) quotation marks',
    ],
    headline: 'Used by creators who finally found their focus.',
    keyElements: ['Sarah L. (Journalist)', 'Marcus T. (Novelist)', 'Elena R. (Content Creator)'],
  },
  {
    id: 'bottom-cta',
    sectionName: '8. Bottom CTA (The Final Hook)',
    designNotes: [
      'Background: VIVID RED (#d42710) - massive visual anchor',
      'Typography: LIGHT ORANGE (#f2e0d2) text',
      'Button: DARK GREY (#2f2d32) background with LIGHT ORANGE text',
    ],
    headline: 'Stop managing your writing. Start actually writing.',
    subHeadline:
      'Join thousands of creators who have reclaimed their attention and banished writer’s block. Your most productive session is one click away.',
    ctaText: 'Start Your Free Trial',
    microCopy: '14 days free. Cancel anytime. No obligations.',
    keyElements: ['High-contrast color shift', 'High urgency CTA button', 'Zero-risk microcopy'],
  },
  {
    id: 'footer',
    sectionName: '9. Footer',
    designNotes: [
      'Background: DARK GREY (#2f2d32)',
      'Layout: Standard 4-column footer (Brand, Product, Resources, Legal)',
      'Typography: LIGHT ORANGE at 70% opacity, hovering turns VIVID RED',
    ],
    headline: 'Rite. The quiet space for digital creators.',
    keyElements: ['Brand column', 'Product links', 'Resources & Pomodoro guide', 'Legal & Copyright'],
  },
];

export const FEATURE_CARDS: FeatureCard[] = [
  {
    id: 'notes',
    title: 'Distraction-Free Note-taking',
    headline: 'Blank Page, Zero Clutter.',
    body: 'A hyper-minimalist writing interface that hides all menus the moment you start typing. It’s just you and your words.',
    iconName: 'PenTool',
    badge: 'Core Writing Engine',
  },
  {
    id: 'todos',
    title: 'Integrated To-Do Lists',
    headline: 'Tasks, Tied to Your Text.',
    body: 'Keep your outlines, research tasks, and writing goals in the exact same view as your draft. Never switch windows to check off a task again.',
    iconName: 'CheckSquare',
    badge: 'Context Sync',
  },
  {
    id: 'timer',
    title: 'Built-in Focus Timers',
    headline: 'Pace Your Process.',
    body: 'Utilize integrated Pomodoro timers to work in deep, uninterrupted sprints. Set your time, block the world out, and write.',
    iconName: 'Timer',
    badge: 'Pomodoro Sprints',
  },
  {
    id: 'speech',
    title: 'TTS & STT Capabilities',
    headline: 'Speak Your Mind, Hear Your Rhythm.',
    body: 'Writer’s block? Dictate your first draft with highly accurate Speech-to-Text. Editing? Use Text-to-Speech to hear your draft read aloud to catch awkward phrasing.',
    iconName: 'Mic',
    badge: 'Audio Workflow',
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'sarah',
    quote:
      'As a journalist, I used to drown in my own research tabs. Rite’s integrated task list and minimalist UI doubled my daily word count. It’s my digital sanctuary.',
    author: 'Sarah L.',
    role: 'Investigative Journalist',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    publication: 'The Atlantic Contributor',
  },
  {
    id: 'marcus',
    quote:
      'The dictation feature combined with the focus timer is a game-changer. I outline by speaking, set a 25-minute timer, and just let it flow.',
    author: 'Marcus T.',
    role: 'Novelist & Sci-Fi Author',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    publication: 'Bestselling Author',
  },
  {
    id: 'elena',
    quote:
      'It forces me to stop tweaking my productivity systems and just do the actual work. Beautifully simple, crisp, and fast.',
    author: 'Elena R.',
    role: 'Content Creator & Essayist',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    publication: 'Substack 50k+ Subscribers',
  },
];
