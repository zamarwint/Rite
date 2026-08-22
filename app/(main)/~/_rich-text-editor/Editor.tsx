'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Toolbar from './Toolbar';
import TextAlign from '@tiptap/extension-text-align';
import Heading from '@tiptap/extension-heading';
import { DocumentEntry } from '@/types/types';

export default function Editor({
    isZenMode,
    isDictating,
    document,
    onUpdateContent
}: {
    isZenMode: boolean
    isDictating: boolean;
    document: DocumentEntry
    onUpdateContent: (newContent: string) => void;
}) {
    const editor = useEditor({
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
                class: 'prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none',
                value: document.content,
                placeholder: 'Close the tabs. Silence the noise. Begin typing your thoughts here...',
                spellCheck: 'true',
                autoFocus: 'true',
            },
        },
        immediatelyRender: false
    })

    return (
        <div>
            {!isZenMode && <Toolbar
                editor={editor}
                isDictating={isDictating}
            />}
            <EditorContent
                editor={editor}
            />
        </div>
    )
}