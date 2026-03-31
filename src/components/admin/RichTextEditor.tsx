import { useEditor, EditorContent } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import { Image } from "@tiptap/extension-image";
import { Table, TableRow, TableCell, TableHeader } from "@tiptap/extension-table";
import { Color } from "@tiptap/extension-color";
import { TextStyle } from "@tiptap/extension-text-style";
import { Link } from "@tiptap/extension-link";
import { Underline } from "@tiptap/extension-underline";
import { TextAlign } from "@tiptap/extension-text-align";
import { Highlight } from "@tiptap/extension-highlight";
import { Placeholder } from "@tiptap/extension-placeholder";
import { adminApi } from "@/lib/api";
import {
  Bold, Italic, Underline as UnderlineIcon, Strikethrough, Code,
  Heading1, Heading2, Heading3, List, ListOrdered, Quote,
  AlignLeft, AlignCenter, AlignRight, AlignJustify,
  Link as LinkIcon, Unlink, ImageIcon, TableIcon,
  Highlighter, Palette, Undo, Redo, Minus, CodeSquare,
  Plus, Trash2, RowsIcon, ColumnsIcon,
} from "lucide-react";
import { useCallback, useRef } from "react";

interface Props {
  value: string;
  onChange: (html: string) => void;
}

const MenuButton = ({ onClick, active, title, children }: { onClick: () => void; active?: boolean; title: string; children: React.ReactNode }) => (
  <button
    type="button"
    onClick={onClick}
    title={title}
    className={`p-1.5 rounded transition-colors ${active ? "bg-primary/20 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-secondary"}`}
  >
    {children}
  </button>
);

const Separator = () => <div className="w-px h-5 bg-border mx-0.5" />;

const RichTextEditor = ({ value, onChange }: Props) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
      }),
      Underline,
      TextStyle,
      Color,
      Highlight.configure({ multicolor: true }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Link.configure({ openOnClick: false, HTMLAttributes: { class: "text-primary underline" } }),
      Image.configure({ HTMLAttributes: { class: "rounded-lg max-w-full" } }),
      Table.configure({ resizable: true }),
      TableRow,
      TableCell,
      TableHeader,
      Placeholder.configure({ placeholder: "Start writing your blog post..." }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: "prose prose-invert max-w-none min-h-[300px] p-4 focus:outline-none",
      },
    },
  });

  const addLink = useCallback(() => {
    if (!editor) return;
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);
    if (url === null) return;
    if (url === "") { editor.chain().focus().extendMarkRange("link").unsetLink().run(); return; }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);

  const addImage = useCallback(() => {
    // Show option: URL or upload
    const choice = window.confirm("Click OK to upload an image, or Cancel to enter a URL");
    if (choice) {
      fileInputRef.current?.click();
    } else {
      const url = window.prompt("Image URL");
      if (url) editor?.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  const handleFileUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editor) return;
    try {
      const url = await adminApi.upload(file, "blog");
      editor.chain().focus().setImage({ src: url }).run();
    } catch {
      alert("Image upload failed");
    }
    e.target.value = "";
  }, [editor]);

  const addTable = useCallback(() => {
    editor?.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
  }, [editor]);

  if (!editor) return null;

  return (
    <div className="border border-border rounded-lg overflow-hidden bg-background">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-0.5 p-2 border-b border-border bg-secondary/30">
        {/* Undo / Redo */}
        <MenuButton onClick={() => editor.chain().focus().undo().run()} title="Undo"><Undo size={14} /></MenuButton>
        <MenuButton onClick={() => editor.chain().focus().redo().run()} title="Redo"><Redo size={14} /></MenuButton>

        <Separator />

        {/* Headings */}
        <MenuButton onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} active={editor.isActive("heading", { level: 1 })} title="Heading 1"><Heading1 size={14} /></MenuButton>
        <MenuButton onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive("heading", { level: 2 })} title="Heading 2"><Heading2 size={14} /></MenuButton>
        <MenuButton onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive("heading", { level: 3 })} title="Heading 3"><Heading3 size={14} /></MenuButton>

        <Separator />

        {/* Text formatting */}
        <MenuButton onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive("bold")} title="Bold"><Bold size={14} /></MenuButton>
        <MenuButton onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive("italic")} title="Italic"><Italic size={14} /></MenuButton>
        <MenuButton onClick={() => editor.chain().focus().toggleUnderline().run()} active={editor.isActive("underline")} title="Underline"><UnderlineIcon size={14} /></MenuButton>
        <MenuButton onClick={() => editor.chain().focus().toggleStrike().run()} active={editor.isActive("strike")} title="Strikethrough"><Strikethrough size={14} /></MenuButton>
        <MenuButton onClick={() => editor.chain().focus().toggleCode().run()} active={editor.isActive("code")} title="Inline Code"><Code size={14} /></MenuButton>

        <Separator />

        {/* Color */}
        <div className="relative">
          <MenuButton onClick={() => {}} title="Text Color"><Palette size={14} /></MenuButton>
          <input
            type="color"
            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
            onChange={(e) => editor.chain().focus().setColor(e.target.value).run()}
          />
        </div>
        <MenuButton onClick={() => editor.chain().focus().toggleHighlight({ color: "#fef08a" }).run()} active={editor.isActive("highlight")} title="Highlight"><Highlighter size={14} /></MenuButton>

        <Separator />

        {/* Alignment */}
        <MenuButton onClick={() => editor.chain().focus().setTextAlign("left").run()} active={editor.isActive({ textAlign: "left" })} title="Align Left"><AlignLeft size={14} /></MenuButton>
        <MenuButton onClick={() => editor.chain().focus().setTextAlign("center").run()} active={editor.isActive({ textAlign: "center" })} title="Align Center"><AlignCenter size={14} /></MenuButton>
        <MenuButton onClick={() => editor.chain().focus().setTextAlign("right").run()} active={editor.isActive({ textAlign: "right" })} title="Align Right"><AlignRight size={14} /></MenuButton>
        <MenuButton onClick={() => editor.chain().focus().setTextAlign("justify").run()} active={editor.isActive({ textAlign: "justify" })} title="Justify"><AlignJustify size={14} /></MenuButton>

        <Separator />

        {/* Lists */}
        <MenuButton onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive("bulletList")} title="Bullet List"><List size={14} /></MenuButton>
        <MenuButton onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive("orderedList")} title="Numbered List"><ListOrdered size={14} /></MenuButton>
        <MenuButton onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive("blockquote")} title="Quote"><Quote size={14} /></MenuButton>
        <MenuButton onClick={() => editor.chain().focus().toggleCodeBlock().run()} active={editor.isActive("codeBlock")} title="Code Block"><CodeSquare size={14} /></MenuButton>
        <MenuButton onClick={() => editor.chain().focus().setHorizontalRule().run()} title="Horizontal Rule"><Minus size={14} /></MenuButton>

        <Separator />

        {/* Link */}
        <MenuButton onClick={addLink} active={editor.isActive("link")} title="Add Link"><LinkIcon size={14} /></MenuButton>
        {editor.isActive("link") && (
          <MenuButton onClick={() => editor.chain().focus().unsetLink().run()} title="Remove Link"><Unlink size={14} /></MenuButton>
        )}

        {/* Image */}
        <MenuButton onClick={addImage} title="Add Image"><ImageIcon size={14} /></MenuButton>
        <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />

        {/* Table */}
        <MenuButton onClick={addTable} title="Insert Table"><TableIcon size={14} /></MenuButton>
        {editor.isActive("table") && (
          <>
            <MenuButton onClick={() => editor.chain().focus().addColumnAfter().run()} title="Add Column"><ColumnsIcon size={14} /></MenuButton>
            <MenuButton onClick={() => editor.chain().focus().addRowAfter().run()} title="Add Row"><RowsIcon size={14} /></MenuButton>
            <MenuButton onClick={() => editor.chain().focus().deleteTable().run()} title="Delete Table"><Trash2 size={14} /></MenuButton>
          </>
        )}
      </div>

      {/* Editor */}
      <EditorContent editor={editor} />

      {/* Hidden file input */}
      <style>{`
        .ProseMirror {
          min-height: 300px;
          padding: 1rem;
        }
        .ProseMirror:focus {
          outline: none;
        }
        .ProseMirror p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          float: left;
          color: hsl(var(--muted-foreground));
          pointer-events: none;
          height: 0;
        }
        .ProseMirror h1 { font-size: 1.75rem; font-weight: 700; margin: 1rem 0 0.5rem; }
        .ProseMirror h2 { font-size: 1.375rem; font-weight: 600; margin: 1rem 0 0.5rem; }
        .ProseMirror h3 { font-size: 1.125rem; font-weight: 600; margin: 0.75rem 0 0.5rem; }
        .ProseMirror p { margin: 0.5rem 0; line-height: 1.7; }
        .ProseMirror ul, .ProseMirror ol { padding-left: 1.5rem; margin: 0.5rem 0; }
        .ProseMirror ul { list-style-type: disc; }
        .ProseMirror ol { list-style-type: decimal; }
        .ProseMirror li { margin: 0.25rem 0; }
        .ProseMirror blockquote { border-left: 3px solid hsl(var(--primary)); padding-left: 1rem; margin: 0.75rem 0; color: hsl(var(--muted-foreground)); font-style: italic; }
        .ProseMirror code { background: hsl(var(--secondary)); padding: 0.15rem 0.4rem; border-radius: 4px; font-size: 0.875rem; }
        .ProseMirror pre { background: hsl(var(--secondary)); padding: 1rem; border-radius: 8px; overflow-x: auto; margin: 0.75rem 0; }
        .ProseMirror pre code { background: none; padding: 0; }
        .ProseMirror img { max-width: 100%; border-radius: 8px; margin: 0.75rem 0; }
        .ProseMirror a { color: hsl(var(--primary)); text-decoration: underline; }
        .ProseMirror hr { border: none; border-top: 1px solid hsl(var(--border)); margin: 1rem 0; }
        .ProseMirror table { border-collapse: collapse; width: 100%; margin: 0.75rem 0; }
        .ProseMirror th, .ProseMirror td { border: 1px solid hsl(var(--border)); padding: 0.5rem; text-align: left; }
        .ProseMirror th { background: hsl(var(--secondary)); font-weight: 600; }
        .ProseMirror mark { background-color: #fef08a; color: inherit; border-radius: 2px; padding: 0 2px; }
      `}</style>
    </div>
  );
};

export default RichTextEditor;
