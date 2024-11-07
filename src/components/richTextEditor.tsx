import React from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Button } from '@/components/ui/button'
import { Bold, Italic, List, Heading1, Heading2 } from 'lucide-react'
import { cn } from '@/lib'

type EditorProps = {
    content:string;
    onChange:any,
    clx?:string
}

const MenuBar = ({ editor }:any) => {
  if (!editor) {
    return null
  }

  return (
    <div className="flex gap-4 mb-2 px-4">
      <Button
        variant="outline"
        size="icon"
        type='button'
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`size-12 ${editor.isActive('bold') ? 'bg-gray-200' : ''}` }
      >
        <Bold className="size-8" />
      </Button>
      <Button
        variant="outline"
        type='button'
        size="icon"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`size-12 ${editor.isActive('italic') ? 'bg-gray-200' : ''}`}
      >
        <Italic className="size-6" />
      </Button>
      <Button
        variant="outline"
        type='button'
        size="icon"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`size-12 ${editor.isActive('bulletList') ? 'bg-gray-200' : ''}`}
      >
        <List className="size-6" />
      </Button>
      <Button
        variant="outline"
        type='button'
        size="icon"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={`size-12 ${editor.isActive('heading', { level: 1 }) ? 'bg-gray-200' : ''}`}
      >
        <Heading1 className="size-6" />
      </Button>
      <Button
        variant="outline"
        type='button'
        size="icon"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`size-12 ${editor.isActive('heading', { level: 2 }) ? 'bg-gray-200' : ''}`}
      >
        <Heading2 className="size-6" />
      </Button>
    </div>
  )
}

const RichTextEditor = ({ content, onChange,clx }:EditorProps) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    // editorProps
  })

  return (
    <div className="border rounded-md ">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} className={cn(["prose max-w-none m-0",clx])} />
    </div>
  )
}

export default RichTextEditor