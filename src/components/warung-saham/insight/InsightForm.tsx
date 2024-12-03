'use client'
import RichTextEditorV2 from '@/components/rich-text-editor-v2';
import RichTextEditorV1 from '@/components/rich-text-editor-v1';
import TextField from '@/components/ui/input/textfield'
import {EditorState} from 'draft-js';
import React from 'react'
import { Button } from '@/components/ui/button';

interface InsightFormProps {
    id?: string
}

const InsightForm : React.FC<InsightFormProps> = ({id = ''}) => {

  return (
    <>
      Insight Form Component
      {id !== '' && <p>Update Data ID : {id}</p>}
      <div className='min-h-[30rem]'>
        <TextField label='Title' key='title' type='text'/>
        <TextField label='Thumbnail' key='thumbnail' type='file'/>
        <label>Content</label>
        <RichTextEditorV1/>
      </div>
      
      <div className='flex p-2 justify-end items-end gap-2'>
        <Button variant='outline' size='lg'>Back</Button>
        <Button size='lg'>Submit</Button>
      </div>
    </>
  )
}

export default InsightForm
