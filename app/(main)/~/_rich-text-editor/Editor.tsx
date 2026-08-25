'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Toolbar from './Toolbar';
import TextAlign from '@tiptap/extension-text-align';
import { DocumentEntry } from '@/types/types';

export default function Editor({
    isDictating,
    document,
    onUpdateContent
}: {
    isDictating: boolean;
    document: DocumentEntry
    onUpdateContent: (newContent: string) => void;
}) {
    const editor = useEditor({
        content: document.content,
        extensions: [
            StarterKit.configure({
                heading: {
                    levels: [1, 2, 3, 4]
                }
            }),
            TextAlign.configure({
                types: ['heading', 'paragraph']
            })],
        editorProps: {
            attributes: {
                class: 'prose prose-sm sm:prose-base lg:prose-lg dark:prose-invert max-w-none focus:outline-none p-8',
                placeholder: 'Close the tabs. Silence the noise. Begin typing your thoughts here...',
                spellCheck: 'true',
                autoFocus: 'true',
            },
            scrollThreshold: 100,
            scrollMargin: 100,
        },
        immediatelyRender: false

    })

    return (
        <>
            <Toolbar
                editor={editor}
                isDictating={isDictating}
            />
            <div className='size-full overflow-auto'>
                <EditorContent
                    editor={editor}
                    scrolling='true'
                />
            </div>
        </>
    )
}