'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit';
import BulletList from '@tiptap/extension-bullet-list';
import Color from '@tiptap/extension-color';
import Document from '@tiptap/extension-document';
import FontFamily from '@tiptap/extension-font-family';
import Heading from '@tiptap/extension-heading';
import Highlight from '@tiptap/extension-highlight';
import HorizontalRule from '@tiptap/extension-horizontal-rule';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import OrderedList from '@tiptap/extension-ordered-list';
import Paragraph from '@tiptap/extension-paragraph';
import Placeholder from '@tiptap/extension-placeholder';
import Table from '@tiptap/extension-table';
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header';
import TableRow from '@tiptap/extension-table-row';
import TextAlign from '@tiptap/extension-text-align';
import TextStyle from '@tiptap/extension-text-style';
import Typography from '@tiptap/extension-typography';
import Underline from '@tiptap/extension-underline';
import Toolbar from './Toolbar'

// use tittap (need make toolbar)
const RichTextEditorV1 = () => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          HTMLAttributes: {
            class: 'list-disc pl-5 mb-4', // Tailwind classes for bullet list
          },
        },
        listItem: {
          HTMLAttributes: {
            class: 'mb-2', // Tailwind class for list items
          },
        },
      }),
        Color,
        Document,
        FontFamily,
        Highlight,
        Image,
        Link,
        Paragraph,
        Placeholder,
        Table,
        TableHeader,
        TableRow,
        TableCell,
        TextAlign.configure({
          types: ['paragraph', 'heading'],
          alignments : ['left','center','right','justify']
        }),
        TextStyle,
        Typography,
        Underline
    ],
    editorProps: {
        attributes: {
          class: 'min-h-64 p-2 focus:outline-none',
        },
    },
    content: '',
    immediatelyRender: false,
  });

  console.log(editor?.getHTML());

  return (
      <div className='border border-primary-400 rounded-md'>
          <Toolbar editor={editor}/>
          <EditorContent editor={editor} />
      </div>
  )
  
}

export default RichTextEditorV1
