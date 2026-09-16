import React from 'react';
import {
  Search,
  X,
  Pin,
  Plus,
  Moon,
  Sun,
  Trash2,
  CheckCircle2,
  FileText,
} from 'lucide-react';
import { Note, AppTheme } from '../types';
import { PWAInstallButton } from './PWAInstallButton';

interface NotesListViewProps {
  notes: Note[];
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onOpenNote: (id: string) => void;
  onNewNote: () => void;
  onTogglePin: (id: string, e: React.MouseEvent) => void;
  onDeleteNote: (id: string, e: React.MouseEvent) => void;
  theme: AppTheme;
  onToggleTheme: () => void;
}

const CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'pinned', label: 'Pinned 📌' },
  { id: 'todo', label: 'To-Do ☑' },
  { id: 'personal', label: 'Personal 👤' },
  { id: 'work', label: 'Work 💼' },
  { id: 'ideas', label: 'Ideas 💡' },
];

export const NotesListView: React.FC<NotesListViewProps> = ({
  notes,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  onOpenNote,
  onNewNote,
  onTogglePin,
  onDeleteNote,
  theme,
  onToggleTheme,
}) => {
  // Filter logic
  const filteredNotes = notes.filter((n) => {
    // Search query filter
    const matchesSearch =
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.content.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    // Category filter
    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'pinned') return n.isPinned;
    return n.category === selectedCategory;
  });

  // Separate pinned and others
  const pinnedNotes = filteredNotes.filter((n) => n.isPinned);
  const otherNotes = filteredNotes.filter((n) => !n.isPinned);

  const formatDate = (timestamp: number) => {
    const d = new Date(timestamp);
    const now = new Date();
    const isToday = d.toDateString() === now.toDateString();

    if (isToday) {
      return d.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
    }
    return d.toLocaleDateString([], { month: 'short', day: 'numeric' });
  };

  return (
    <div
      id="mobile-notes-list"
      className="flex-1 flex flex-col h-full overflow-hidden bg-[#f9fafb] dark:bg-[#121212] relative"
    >
      {/* Mobile Top Header */}
      <div className="px-5 pt-3 pb-2 flex items-center justify-between shrink-0">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white flex items-center gap-2">
            <span>Notepad</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300 font-medium">
              {notes.length}
            </span>
          </h1>
          <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
            Mobile Notes & Checklist
          </p>
        </div>

        {/* Top Controls */}
        <div className="flex items-center gap-2">
          <PWAInstallButton />
          <button
            onClick={onToggleTheme}
            title="Toggle theme"
            className="w-9 h-9 rounded-full bg-neutral-200/80 dark:bg-neutral-800 flex items-center justify-center text-neutral-700 dark:text-neutral-300 hover:bg-neutral-300 dark:hover:bg-neutral-700 transition-colors"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className="px-5 py-2 shrink-0">
        <div className="relative flex items-center bg-white dark:bg-[#1e1e1e] rounded-2xl px-3 py-2 shadow-xs border border-neutral-200/80 dark:border-neutral-800 focus-within:ring-2 focus-within:ring-blue-500 transition-all">
          <Search className="w-4 h-4 text-neutral-400 shrink-0 mr-2" />
          <input
            type="text"
            placeholder="Search notes, checklists..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full text-xs text-neutral-900 dark:text-white bg-transparent outline-none placeholder:text-neutral-400"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="p-1 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Filter Category Chips */}
      <div className="px-5 py-1 flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
              selectedCategory === cat.id
                ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 shadow-xs'
                : 'bg-neutral-200/60 dark:bg-neutral-800/80 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Notes List Scroll Area */}
      <div className="flex-1 overflow-y-auto px-5 py-3 space-y-3 pb-24">
        {filteredNotes.length === 0 ? (
          <div className="flex flex-col items-center justify-center pt-16 text-center text-neutral-400 dark:text-neutral-500">
            <div className="w-14 h-14 rounded-full bg-neutral-100 dark:bg-[#1e1e1e] flex items-center justify-center mb-3 text-neutral-300 dark:text-neutral-600">
              <FileText className="w-7 h-7" />
            </div>
            <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              No notes found
            </p>
            <p className="text-xs text-neutral-400 mt-1 max-w-xs">
              {searchQuery
                ? 'Try a different search keyword.'
                : 'Tap the + button below to write your first mobile note.'}
            </p>
            {!searchQuery && (
              <button
                onClick={onNewNote}
                className="mt-4 px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-medium shadow-md hover:bg-blue-700 transition-all"
              >
                Create Note
              </button>
            )}
          </div>
        ) : (
          <>
            {/* Pinned Section */}
            {pinnedNotes.length > 0 && (
              <div className="space-y-2">
                <div className="text-[11px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider px-1">
                  Pinned Notes
                </div>
                <div className="grid grid-cols-1 gap-2.5">
                  {pinnedNotes.map((note) => (
                    <NoteCard
                      key={note.id}
                      note={note}
                      formatDate={formatDate}
                      onOpen={() => onOpenNote(note.id)}
                      onTogglePin={(e) => onTogglePin(note.id, e)}
                      onDelete={(e) => onDeleteNote(note.id, e)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Other Notes Section */}
            {otherNotes.length > 0 && (
              <div className="space-y-2">
                {pinnedNotes.length > 0 && (
                  <div className="text-[11px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider px-1 pt-2">
                    Other Notes
                  </div>
                )}
                <div className="grid grid-cols-1 gap-2.5">
                  {otherNotes.map((note) => (
                    <NoteCard
                      key={note.id}
                      note={note}
                      formatDate={formatDate}
                      onOpen={() => onOpenNote(note.id)}
                      onTogglePin={(e) => onTogglePin(note.id, e)}
                      onDelete={(e) => onDeleteNote(note.id, e)}
                    />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Floating Action Button (FAB +) */}
      <button
        id="btn-mobile-new-note"
        onClick={onNewNote}
        title="Create new note"
        className="absolute bottom-6 right-6 w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-700 active:scale-95 text-white shadow-xl flex items-center justify-center transition-all z-20"
      >
        <Plus className="w-7 h-7 stroke-[2.5]" />
      </button>
    </div>
  );
};

interface NoteCardProps {
  note: Note;
  formatDate: (t: number) => string;
  onOpen: () => void;
  onTogglePin: (e: React.MouseEvent) => void;
  onDelete: (e: React.MouseEvent) => void;
}

const NoteCard: React.FC<NoteCardProps> = ({
  note,
  formatDate,
  onOpen,
  onTogglePin,
  onDelete,
}) => {
  // Check if content has checklist items
  const hasChecklist = note.content.includes('- [ ]') || note.content.includes('- [x]');
  const totalTasks = (note.content.match(/- \[[ x]\]/g) || []).length;
  const completedTasks = (note.content.match(/- \[x\]/g) || []).length;

  return (
    <div
      onClick={onOpen}
      className={`group p-4 rounded-2xl border transition-all cursor-pointer select-none active:scale-[0.99] relative overflow-hidden ${
        note.color === 'yellow'
          ? 'bg-amber-50 dark:bg-[#232014] border-amber-200 dark:border-amber-900/40'
          : note.color === 'green'
          ? 'bg-emerald-50 dark:bg-[#122319] border-emerald-200 dark:border-emerald-900/40'
          : note.color === 'blue'
          ? 'bg-blue-50 dark:bg-[#131f2e] border-blue-200 dark:border-blue-900/40'
          : note.color === 'purple'
          ? 'bg-purple-50 dark:bg-[#20152b] border-purple-200 dark:border-purple-900/40'
          : 'bg-white dark:bg-[#1e1e1e] border-neutral-200/80 dark:border-neutral-800 shadow-xs hover:border-neutral-300 dark:hover:border-neutral-700'
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-semibold text-sm text-neutral-900 dark:text-neutral-100 truncate flex-1">
          {note.title || 'Untitled Note'}
        </h3>

        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={onTogglePin}
            title={note.isPinned ? 'Unpin note' : 'Pin note'}
            className={`p-1 rounded-full transition-colors ${
              note.isPinned
                ? 'text-amber-500 bg-amber-100/60 dark:bg-amber-950/40'
                : 'text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 opacity-60 group-hover:opacity-100'
            }`}
          >
            <Pin className="w-3.5 h-3.5 fill-current" />
          </button>

          <button
            onClick={onDelete}
            title="Delete note"
            className="p-1 rounded-full text-neutral-400 hover:text-red-500 opacity-40 group-hover:opacity-100 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Preview Snippet */}
      <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1 line-clamp-2 leading-relaxed whitespace-pre-wrap">
        {note.content.replace(/- \[[ x]\] /g, '• ') || 'Empty note...'}
      </p>

      {/* Card Footer: Date & Indicators */}
      <div className="flex items-center justify-between mt-3 pt-1 border-t border-neutral-100 dark:border-neutral-800/60 text-[11px] text-neutral-400 dark:text-neutral-500">
        <span>{formatDate(note.updatedAt)}</span>

        <div className="flex items-center gap-2">
          {hasChecklist && (
            <span className="flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 font-medium">
              <CheckCircle2 className="w-3 h-3 text-emerald-500" />
              {completedTasks}/{totalTasks}
            </span>
          )}

          {note.category !== 'all' && (
            <span className="capitalize px-1.5 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800 text-[10px] font-medium text-neutral-500">
              {note.category}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
