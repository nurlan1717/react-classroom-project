import React, { useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Underline from '@tiptap/extension-underline';
import { 
  Bold, 
  Italic, 
  List, 
  ListOrdered, 
  Link as LinkIcon, 
  Image as ImageIcon,
  Underline as UnderlineIcon,
  FileUp
} from 'lucide-react';
import LinkModal from './LinkModal';  
import FileUploadModal from './FileUploadModal';

const RichTextEditor = ({ content, onChange, placeholder = 'Add description (optional)' }) => {
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [showFileModal, setShowFileModal] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder,
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-blue-600 hover:underline',
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'max-w-full h-auto rounded-lg',
        },
      }),
      Underline,
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) {
    return null;
  }

  const addLink = ({ url, text }) => {
    if (url) {
      const selection = editor.state.selection;
      const hasSelection = !selection.empty;
      
      if (!hasSelection && text) {
        editor
          .chain()
          .focus()
          .insertContent(text)
          .setLink({ href: url })
          .run();
      } else {
        editor
          .chain()
          .focus()
          .setLink({ href: url })
          .run();
      }
    }
  };

  const addImage = (url) => {
    if (url) {
      editor
        .chain()
        .focus()
        .setImage({ src: url })
        .run();
    }
  };

  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="border-b bg-gray-50 p-2 flex gap-2 flex-wrap">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 rounded hover:bg-gray-200 ${
            editor.isActive('bold') ? 'bg-gray-200' : ''
          }`}
          title="Bold"
        >
          <Bold size={16} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 rounded hover:bg-gray-200 ${
            editor.isActive('italic') ? 'bg-gray-200' : ''
          }`}
          title="Italic"
        >
          <Italic size={16} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`p-2 rounded hover:bg-gray-200 ${
            editor.isActive('underline') ? 'bg-gray-200' : ''
          }`}
          title="Underline"
        >
          <UnderlineIcon size={16} />
        </button>
        <div className="w-px h-6 bg-gray-300 mx-1 self-center" />
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded hover:bg-gray-200 ${
            editor.isActive('bulletList') ? 'bg-gray-200' : ''
          }`}
          title="Bullet List"
        >
          <List size={16} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-2 rounded hover:bg-gray-200 ${
            editor.isActive('orderedList') ? 'bg-gray-200' : ''
          }`}
          title="Numbered List"
        >
          <ListOrdered size={16} />
        </button>
        <div className="w-px h-6 bg-gray-300 mx-1 self-center" />
        <button
          onClick={() => setShowLinkModal(true)}
          className={`p-2 rounded hover:bg-gray-200 ${
            editor.isActive('link') ? 'bg-gray-200' : ''
          }`}
          title="Add Link"
        >
          <LinkIcon size={16} />
        </button>
        <button
          onClick={() => setShowFileModal(true)}
          className="p-2 rounded hover:bg-gray-200"
          title="Upload File"
        >
          <FileUp size={16} />
        </button>
      </div>
      
      <EditorContent 
        editor={editor} 
        className="prose max-w-none p-4 min-h-[200px] focus:outline-none"
      />

      {showLinkModal && (
        <LinkModal
          onClose={() => setShowLinkModal(false)}
          onSubmit={addLink}
        />
      )}

      {showFileModal && (
        <FileUploadModal
          onClose={() => setShowFileModal(false)}
          onUpload={addImage}
        />
      )}
    </div>
  );
};

export default RichTextEditor;