'use client'
import { type Editor } from '@tiptap/react'
import { AlignCenter, AlignJustify, AlignLeft, AlignRight, BoldIcon, Heading1Icon, Heading2Icon, HighlighterIcon, ItalicIcon, ListIcon, ListOrderedIcon, SeparatorHorizontalIcon, UnderlineIcon } from 'lucide-react'
import React from 'react'

interface ToolbarProps {
    editor: Editor | null
}

const Toolbar : React.FC<ToolbarProps> = ({editor}) => {

  if(!editor) return null;

  const setAlignment = (e : React.MouseEvent<HTMLButtonElement> , align : 'left' | 'center' | 'right' | 'justify') => {
    e.preventDefault();
    editor.chain().focus().setTextAlign(align).run();
  }

  return (
    <div className="flex flex-wrap gap-2 mb-4 border-b p-2">
      <div className=''>
        <button 
          onClick={() => editor.chain().focus().toggleBold().run()} 
          className={`px-2 py-1 rounded-l ${editor.isActive('bold') ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
          <BoldIcon/>
        </button>
        <button onClick={() => editor.chain().focus().toggleItalic().run()} className={`px-2 py-1 ${editor.isActive('italic') ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
          <ItalicIcon/>
        </button>
        <button onClick={() => editor.chain().focus().toggleUnderline().run()} className={`px-2 py-1 rounded-r ${editor.isActive('underline') ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
          <UnderlineIcon/>
        </button>
      </div>

        {/* alignment */}
      <div>
        <button onClick={(e) => setAlignment(e,'left')} className={`px-2 py-1 rounded-l ${editor.isActive({ textAlign: 'left' }) ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
          <AlignLeft />
        </button>
        <button onClick={(e) => setAlignment(e,'center')} className={`px-2 py-1  ${editor.isActive({ textAlign: 'center' }) ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
          <AlignCenter />
        </button>
        <button onClick={(e) => setAlignment(e,'right')} className={`px-2 py-1  ${editor.isActive({ textAlign: 'right' }) ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
          <AlignRight />
        </button>
        <button onClick={(e) => setAlignment(e,'justify')} className={`px-2 py-1 rounded-r ${editor.isActive({ textAlign: 'justify' }) ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
          <AlignJustify />
        </button>
      </div>


        {/* heading */}
        <button 
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} 
          className={`px-2 py-1 rounded ${editor.isActive('heading', { level: 1 }) ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
          <Heading1Icon/>
        </button>
        <button 
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} 
          className={`px-2 py-1 rounded ${editor.isActive('heading', { level: 2 }) ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
            <Heading2Icon />
          </button>

        {/* list */}
        <button 
          onClick={() => editor.chain().focus().toggleBulletList().run()} 
          className={`px-2 py-1 rounded ${editor.isActive('bulletList') ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
            <ListIcon />
        </button>
        <button 
          onClick={() => editor.chain().focus().toggleOrderedList().run()} 
          className={`px-2 py-1 rounded ${editor.isActive('orderedList') ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
          <ListOrderedIcon/>
        </button>


        {/* other */}
        {/* <button onClick={addImage} className="px-2 py-1 bg-gray-200 rounded">Image</button> */}
        <button 
          onClick={() => editor.chain().focus().setHorizontalRule().run()} 
          className="px-2 py-1 bg-gray-200 rounded">
          <SeparatorHorizontalIcon/>
        </button>

        {/* implementasi table (Tech Debt) */}

        <button 
          onClick={() => editor.chain().focus().toggleHighlight().run()} 
          className={`px-2 py-1 rounded ${editor.isActive('highlight') ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
          <HighlighterIcon/>
        </button>

    </div>
  )
}

export default Toolbar
