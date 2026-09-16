import React, { useState, useRef, useEffect } from 'react';
import {
  ArrowLeft,
  Pin,
  Share2,
  MoreVertical,
  CheckSquare,
  List,
  ListOrdered,
  Clock,
  Undo2,
  Redo2,
  Trash2,
  Download,
  Copy,
  Palette,
  Check,
} from 'lucide-react';
import { Note } from '../types';

interface NoteEditorViewProps {
  note: Note;
  onUpdateNote: (updates: Partial<Note>) => void;
  onBack: () => void;
  onDeleteNote: (id: string) => void;
  onToast: (msg: string) => void;
}

const COLORS = [
  { id: 'default', label: 'White', bg: 'bg-white dark:bg-[#1e1e1e]', ring: 'ring-neutral-400' },
  { id: 'yellow', label: 'Yellow', bg: 'bg-amber-100 dark:bg-[#382f12]', ring: 'ring-amber-400' },
  { id: 'green', label: 'Green', bg: 'bg-emerald-100 dark:bg-[#13321f]', ring: 'ring-emerald-400' },
  { id: 'blue', label: 'Blue', bg: 'bg-blue-100 dark:bg-[#132c48]', ring: 'ring-blue-400' },
  { id: 'purple', label: 'Purple', bg: 'bg-purple-100 dark:bg-[#2b133c]', ring: 'ring-purple-400' },
];

export const NoteEditorView: React.FC<NoteEditorViewProps> = ({
  note,
  onUpdateNote,
  onBack,
  onDeleteNote,
  onToast,
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const titleInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // If note is brand new (empty title and content), focus title
    if (!note.title && !note.content) {
      titleInputRef.current?.focus();
    }
  }, [note.id]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdateNote({ title: e.target.value, updatedAt: Date.now() });
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onUpdateNote({ content: e.target.value, updatedAt: Date.now() });
  };

  // Insert formatting snippet at cursor
  const insertTextAtCursor = (textToInsert: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const current = note.content;

    const newContent =
      current.substring(0, start) + textToInsert + current.substring(end);

    onUpdateNote({ content: newContent, updatedAt: Date.now() });

    setTimeout(() => {
      textarea.selectionStart = start + textToInsert.length;
      textarea.selectionEnd = start + textToInsert.length;
      textarea.focus();
    }, 10);
  };

  // Insert Checklist item
  const handleInsertChecklist = () => {
    insertTextAtCursor('\n- [ ] ');
  };

  // Insert Bullet
  const handleInsertBullet = () => {
    insertTextAtCursor('\n• ');
  };

  // Insert Numbered List
  const handleInsertNumbered = () => {
    insertTextAtCursor('\n1. ');
  };

  // Insert Timestamp
  const handleInsertTimestamp = () => {
    const now = new Date();
    const formatted = `[${now.toLocaleDateString()} ${now.toLocaleTimeString([], {
      hour: 'numeric',
      minute: '2-digit',
    })}] `;
    insertTextAtCursor(formatted);
  };

  // Share Note
  const handleShare = async () => {
    const fullText = `${note.title}\n\n${note.content}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: note.title || 'Note',
          text: fullText,
        });
        onToast('Shared successfully!');
      } catch {
        // User cancelled or error
      }
    } else {
      navigator.clipboard.writeText(fullText);
      onToast('Note copied to clipboard!');
    }
  };

  // Download .txt
  const handleDownload = () => {
    const fullText = `${note.title}\n\n${note.content}`;
    const blob = new Blob([fullText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${note.title || 'Note'}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    onToast('Downloaded .txt file');
  };

  // Word count & Char count
  const wordCount = note.content.trim()
    ? note.content.trim().split(/\s+/).length
    : 0;
  const charCount = note.content.length;

  const formattedDate = new Date(note.updatedAt).toLocaleDateString([], {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });

  return (
    <div
      id="mobile-note-editor"
      className={`flex-1 flex flex-col h-full overflow-hidden transition-colors duration-200 ${
        note.color === 'yellow'
          ? 'bg-amber-50/70 dark:bg-[#1a170e]'
          : note.color === 'green'
          ? 'bg-emerald-50/70 dark:bg-[#0e1c14]'
          : note.color === 'blue'
          ? 'bg-blue-50/70 dark:bg-[#0e1724]'
          : note.color === 'purple'
          ? 'bg-purple-50/70 dark:bg-[#190e24]'
          : 'bg-white dark:bg-[#151515]'
      }`}
    >
      {/* Mobile Editor Top App Bar */}
      <div className="px-4 py-2.5 flex items-center justify-between border-b border-neutral-200/60 dark:border-neutral-800/60 bg-white/70 dark:bg-[#151515]/70 backdrop-blur-md shrink-0">
        <button
          onClick={onBack}
          className="flex items-center gap-1 px-2.5 py-1.5 -ml-1 rounded-xl hover:bg-neutral-200/60 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 font-medium text-xs transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Notes</span>
        </button>

        {/* Right Actions */}
        <div className="flex items-center gap-1">
          {/* Color Palette button */}
          <div className="relative">
            <button
              onClick={() => setShowColorPicker(!showColorPicker)}
              title="Change note color"
              className="p-2 rounded-xl text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200/60 dark:hover:bg-neutral-800 transition-colors"
            >
              <Palette className="w-4 h-4" />
            </button>

            {showColorPicker && (
              <div className="absolute right-0 top-full mt-1.5 p-2 bg-white dark:bg-[#252525] rounded-2xl shadow-xl border border-neutral-200 dark:border-neutral-700 flex gap-2 z-40">
                {COLORS.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => {
                      onUpdateNote({
                        color: c.id === 'default' ? undefined : c.id,
                      });
                      setShowColorPicker(false);
                    }}
                    className={`w-6 h-6 rounded-full ${c.bg} border border-neutral-300 dark:border-neutral-600 flex items-center justify-center transition-transform hover:scale-110 ${
                      (note.color || 'default') === c.id
                        ? 'ring-2 ring-offset-2 ' + c.ring
                        : ''
                    }`}
                  >
                    {(note.color || 'default') === c.id && (
                      <Check className="w-3 h-3 text-neutral-700 dark:text-neutral-300" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Pin Button */}
          <button
            onClick={() =>
              onUpdateNote({
                isPinned: !note.isPinned,
                updatedAt: Date.now(),
              })
            }
            title={note.isPinned ? 'Unpin' : 'Pin'}
            className={`p-2 rounded-xl transition-colors ${
              note.isPinned
                ? 'text-amber-500 bg-amber-100/70 dark:bg-amber-950/50'
                : 'text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200/60 dark:hover:bg-neutral-800'
            }`}
          >
            <Pin className="w-4 h-4 fill-current" />
          </button>

          {/* Share Button */}
          <button
            onClick={handleShare}
            title="Share Note"
            className="p-2 rounded-xl text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200/60 dark:hover:bg-neutral-800 transition-colors"
          >
            <Share2 className="w-4 h-4" />
          </button>

          {/* More options */}
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-2 rounded-xl text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200/60 dark:hover:bg-neutral-800 transition-colors"
            >
              <MoreVertical className="w-4 h-4" />
            </button>

            {showMenu && (
              <div className="absolute right-0 top-full mt-1.5 w-44 bg-white dark:bg-[#252525] rounded-2xl shadow-2xl border border-neutral-200 dark:border-neutral-700 py-1.5 z-40 text-xs text-neutral-700 dark:text-neutral-200">
                <button
                  onClick={() => {
                    handleDownload();
                    setShowMenu(false);
                  }}
                  className="w-full px-3.5 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 flex items-center gap-2.5 text-left"
                >
                  <Download className="w-4 h-4" />
                  Save as .txt
                </button>

                <button
                  onClick={() => {
                    navigator.clipboard.writeText(
                      `${note.title}\n\n${note.content}`
                    );
                    onToast('Copied to clipboard');
                    setShowMenu(false);
                  }}
                  className="w-full px-3.5 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 flex items-center gap-2.5 text-left"
                >
                  <Copy className="w-4 h-4" />
                  Copy All Text
                </button>

                <div className="my-1 border-t border-neutral-200 dark:border-neutral-700" />

                <button
                  onClick={() => {
                    onDeleteNote(note.id);
                    setShowMenu(false);
                  }}
                  className="w-full px-3.5 py-2 hover:bg-red-50 dark:hover:bg-red-950/40 text-red-600 dark:text-red-400 flex items-center gap-2.5 text-left"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete Note
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Editor Content Body */}
      <div className="flex-1 flex flex-col px-5 pt-4 pb-2 overflow-y-auto">
        {/* Title Input */}
        <input
          ref={titleInputRef}
          type="text"
          placeholder="Title"
          value={note.title}
          onChange={handleTitleChange}
          className="w-full text-xl font-bold text-neutral-900 dark:text-white bg-transparent outline-none placeholder:text-neutral-400 tracking-tight mb-1"
        />

        {/* Metadata subline: Date | Word Count | Category picker */}
        <div className="flex items-center gap-2 text-[11px] text-neutral-400 dark:text-neutral-500 pb-3 mb-2 border-b border-neutral-100 dark:border-neutral-800/80">
          <span>{formattedDate}</span>
          <span>•</span>
          <span>
            {wordCount} words, {charCount} chars
          </span>
          <span>•</span>
          <select
            value={note.category}
            onChange={(e) =>
              onUpdateNote({
                category: e.target.value as Note['category'],
                updatedAt: Date.now(),
              })
            }
            className="bg-transparent text-neutral-500 dark:text-neutral-400 text-[11px] outline-none font-medium capitalize cursor-pointer hover:text-neutral-700 dark:hover:text-neutral-300"
          >
            <option value="all">General</option>
            <option value="todo">To-Do</option>
            <option value="personal">Personal</option>
            <option value="work">Work</option>
            <option value="ideas">Ideas</option>
          </select>
        </div>

        {/* Note Body Textarea */}
        <textarea
          ref={textareaRef}
          value={note.content}
          onChange={handleContentChange}
          placeholder="Start typing your note here..."
          className="flex-1 w-full text-sm leading-relaxed text-neutral-800 dark:text-neutral-200 bg-transparent resize-none outline-none placeholder:text-neutral-400/80 pb-20 selection:bg-blue-500 selection:text-white"
        />
      </div>

      {/* Mobile Formatting Toolbar (Bottom Bar) */}
      <div className="px-4 py-2 border-t border-neutral-200/80 dark:border-neutral-800/80 bg-white/90 dark:bg-[#181818]/90 backdrop-blur-md flex items-center justify-between shrink-0 text-neutral-600 dark:text-neutral-300 z-10">
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Insert Checklist */}
          <button
            onClick={handleInsertChecklist}
            title="Checklist item"
            className="p-2 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 active:scale-95 transition-all"
          >
            <CheckSquare className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          </button>

          {/* Bullet List */}
          <button
            onClick={handleInsertBullet}
            title="Bullet point"
            className="p-2 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 active:scale-95 transition-all"
          >
            <List className="w-4 h-4" />
          </button>

          {/* Numbered List */}
          <button
            onClick={handleInsertNumbered}
            title="Numbered list"
            className="p-2 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 active:scale-95 transition-all"
          >
            <ListOrdered className="w-4 h-4" />
          </button>

          {/* Date / Timestamp */}
          <button
            onClick={handleInsertTimestamp}
            title="Insert timestamp"
            className="p-2 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 active:scale-95 transition-all"
          >
            <Clock className="w-4 h-4" />
          </button>
        </div>

        {/* Undo / Redo & Done */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => document.execCommand('undo')}
            title="Undo"
            className="p-2 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 active:scale-95 transition-all"
          >
            <Undo2 className="w-4 h-4" />
          </button>

          <button
            onClick={() => document.execCommand('redo')}
            title="Redo"
            className="p-2 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 active:scale-95 transition-all"
          >
            <Redo2 className="w-4 h-4" />
          </button>

          <button
            onClick={onBack}
            className="ml-2 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs active:scale-95 transition-all"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
