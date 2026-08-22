import {
    Bold,
    Italic,
    List,
    Quote,
    Code,
    Heading1,
    Heading2,
    FileCheck,
} from 'lucide-react'
import type { Editor } from '@tiptap/react'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { Toggle } from '@/components/ui/toggle'

// 2. SUBTLE FORMATTING TOOLBAR (Hidden in Zen Mode)
export default function Toolbar({ editor, isDictating }: { editor: Editor | null, isDictating: boolean }) {
    return (
        <div className="px-6 py-2 border-b border-border flex items-center justify-between text-xs font-mono text-foreground/70 bg-muted/50">
            <div className="flex items-center space-x-1">
                <Tooltip>
                    <TooltipTrigger render={
                        <Toggle
                            pressed={editor?.isActive('heading', { level: 1 }) ?? false}
                            onPressedChange={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()}
                            className="p-1.5 rounded hover:bg-background text-foreground transition-colors cursor-pointer"
                            title="Heading 1"
                        >
                            <Heading1 className="size-3.5" />
                        </Toggle>
                    } />
                    <TooltipContent>
                        <p>Heading 1</p>
                    </TooltipContent>
                </Tooltip>
                <Tooltip>
                    <TooltipTrigger render={
                        <Toggle
                            pressed={editor?.isActive('heading', { level: 2 }) ?? false}
                            onPressedChange={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
                            className="p-1.5 rounded hover:bg-background text-foreground transition-colors cursor-pointer"
                            title="Heading 2"
                        >
                            <Heading2 className="size-3.5" />
                        </Toggle>} />
                    <TooltipContent>
                        <p>Heading 2</p>
                    </TooltipContent>
                </Tooltip>
                <Tooltip>
                    <TooltipTrigger render={
                        <Toggle
                            pressed={editor?.isActive('bold') ?? false}
                            onPressedChange={() => editor?.chain().focus().toggleBold().run()}
                            className="p-1.5 rounded hover:bg-background text-foreground transition-colors cursor-pointer"
                            title="Bold"
                        >
                            <Bold className="size-3.5" />
                        </Toggle>} />
                    <TooltipContent>
                        <p>Bold</p>
                    </TooltipContent>
                </Tooltip>
                <Tooltip>
                    <TooltipTrigger render={
                        <Toggle
                            pressed={editor?.isActive('italic') ?? false}
                            onPressedChange={() => editor?.chain().focus().toggleItalic().run()}
                            className="p-1.5 rounded hover:bg-background text-foreground transition-colors cursor-pointer"
                            title="Italic"
                        >
                            <Italic className="size-3.5" />
                        </Toggle>} />
                    <TooltipContent>
                        <p>Italic</p>
                    </TooltipContent>
                </Tooltip>
                <Tooltip>
                    <TooltipTrigger render={
                        <Toggle
                            pressed={editor?.isActive('quote') ?? false}
                            onPressedChange={() => editor?.chain().focus().toggleBlockquote().run()}
                            className="p-1.5 rounded hover:bg-background text-foreground transition-colors cursor-pointer"
                            title="Blockquote"
                        >
                            <Quote className="size-3.5" />
                        </Toggle>} />
                    <TooltipContent>
                        <p>Blockquote</p>
                    </TooltipContent>
                </Tooltip>
                <Tooltip>
                    <TooltipTrigger render={
                        <Toggle
                            pressed={editor?.isActive('bulletList') ?? false}
                            onPressedChange={() => editor?.chain().focus().toggleBulletList().run()}
                            className="p-1.5 rounded hover:bg-background text-foreground transition-colors cursor-pointer"
                            title="Bullet List"
                        >
                            <List className="w-3.5 h-3.5" />
                        </Toggle>} />
                    <TooltipContent>
                        <p>Bullet List</p>
                    </TooltipContent>
                </Tooltip>
                <Tooltip>
                    <TooltipTrigger render={
                        <Toggle
                            pressed={editor?.isActive('code') ?? false}
                            onPressedChange={() => editor?.chain().focus().toggleCode().run()}
                            className="p-1.5 rounded hover:bg-background text-foreground transition-colors cursor-pointer"
                            title="Inline Code"
                        >
                            <Code className="size-3.5" />
                        </Toggle>} />
                    <TooltipContent>
                        <p>Inline Code</p>
                    </TooltipContent>
                </Tooltip>
            </div>

            <div className="flex items-center space-x-3 text-[11px]">
                {isDictating && (
                    <span className="flex items-center space-x-1 text-primary font-bold animate-pulse">
                        <span className="w-2 h-2 rounded-full bg-primary" />
                        <span>Dictating live into draft...</span>
                    </span>
                )}
                <span className="flex items-center space-x-1 opacity-70">
                    <FileCheck className="w-3 h-3 text-primary" />
                    <span>Auto-saved to local memory</span>
                </span>
            </div>
        </div>
    )
}