'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import {
  Bold, Italic, Heading2, Heading3, List, ListOrdered,
  Quote, LinkIcon, Undo, Redo,
} from 'lucide-react'

function ToolbarButton({
  onClick, active, disabled, children, title,
}: {
  onClick: () => void
  active?: boolean
  disabled?: boolean
  children: React.ReactNode
  title: string
}) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      disabled={disabled}
      className={`p-2 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed ${
        active ? 'bg-[#0B2447] text-white' : 'text-gray-500 hover:bg-gray-100'
      }`}
    >
      {children}
    </button>
  )
}

export default function RichTextEditor({
  value,
  onChange,
}: {
  value: string
  onChange: (html: string) => void
}) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Link.configure({ openOnClick: false, HTMLAttributes: { rel: 'noopener noreferrer' } }),
    ],
    content: value,
    editorProps: {
      attributes: {
        class: 'prose prose-sm max-w-none min-h-[300px] px-4 py-3 focus:outline-none',
      },
    },
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  })

  if (!editor) return null

  const addLink = () => {
    const url = window.prompt('Nhập URL liên kết:')
    if (url) editor.chain().focus().setLink({ href: url }).run()
  }

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <div className="flex flex-wrap items-center gap-0.5 border-b border-gray-100 bg-gray-50/70 p-1.5">
        <ToolbarButton title="In đậm" onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive('bold')}>
          <Bold size={15} />
        </ToolbarButton>
        <ToolbarButton title="In nghiêng" onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive('italic')}>
          <Italic size={15} />
        </ToolbarButton>
        <div className="w-px h-5 bg-gray-200 mx-1" />
        <ToolbarButton title="Tiêu đề lớn" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive('heading', { level: 2 })}>
          <Heading2 size={15} />
        </ToolbarButton>
        <ToolbarButton title="Tiêu đề nhỏ" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive('heading', { level: 3 })}>
          <Heading3 size={15} />
        </ToolbarButton>
        <div className="w-px h-5 bg-gray-200 mx-1" />
        <ToolbarButton title="Danh sách gạch đầu dòng" onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive('bulletList')}>
          <List size={15} />
        </ToolbarButton>
        <ToolbarButton title="Danh sách đánh số" onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive('orderedList')}>
          <ListOrdered size={15} />
        </ToolbarButton>
        <ToolbarButton title="Trích dẫn" onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive('blockquote')}>
          <Quote size={15} />
        </ToolbarButton>
        <ToolbarButton title="Chèn liên kết" onClick={addLink} active={editor.isActive('link')}>
          <LinkIcon size={15} />
        </ToolbarButton>
        <div className="w-px h-5 bg-gray-200 mx-1" />
        <ToolbarButton title="Hoàn tác" onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()}>
          <Undo size={15} />
        </ToolbarButton>
        <ToolbarButton title="Làm lại" onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()}>
          <Redo size={15} />
        </ToolbarButton>
      </div>
      <EditorContent editor={editor} />
    </div>
  )
}
