import React, { useState, useEffect, useCallback } from 'react';
import { MobileStatusBar } from './components/MobileStatusBar';
import { NotesListView } from './components/NotesListView';
import { NoteEditorView } from './components/NoteEditorView';
import { OfflineIndicator } from './components/OfflineIndicator';
import { PWAInstallButton } from './components/PWAInstallButton';
import { Note, ViewMode, AppTheme } from './types';
import { Smartphone, Maximize2, Info } from 'lucide-react';

const STORAGE_KEY_NOTES = 'mobile_notepad_notes_v1';
const STORAGE_KEY_THEME = 'mobile_notepad_theme_v1';

const INITIAL_NOTES: Note[] = [
  {
    id: 'note-1',
    title: 'Grocery & Shopping List 🛒',
    content: '- [ ] Fresh fruits & vegetables\n- [ ] Milk & Yogurt\n- [ ] Eggs & whole wheat bread\n- [x] Olive oil\n- [ ] Green tea',
    updatedAt: Date.now() - 3600000,
    isPinned: true,
    category: 'todo',
    color: 'green',
  },
  {
    id: 'note-2',
    title: 'Daily Ideas & Thoughts 💡',
    content: '• Plan weekend family trip\n• Read 20 pages of new book\n• Check fitness routine and gym schedule\n• Call car mechanic',
    updatedAt: Date.now() - 7200000,
    isPinned: true,
    category: 'ideas',
    color: 'yellow',
  },
  {
    id: 'note-3',
    title: 'Work Project Updates 💼',
    content: 'Client meeting review completed.\nAction items:\n1. Send proposal email\n2. Prepare wireframe designs\n3. Review budget by Thursday',
    updatedAt: Date.now() - 86400000,
    isPinned: false,
    category: 'work',
    color: 'blue',
  },
];

export default function App() {
  const [notes, setNotes] = useState<Note[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_NOTES);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // fallback
    }
    return INITIAL_NOTES;
  });

  const [activeNoteId, setActiveNoteId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isPhoneFrame, setIsPhoneFrame] = useState<boolean>(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [theme, setTheme] = useState<AppTheme>(() => {
    return (localStorage.getItem(STORAGE_KEY_THEME) as AppTheme) || 'light';
  });

  // Apply Dark mode
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_THEME, theme);
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  // Persist Notes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_NOTES, JSON.stringify(notes));
  }, [notes]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Open note in editor
  const handleOpenNote = (id: string) => {
    setActiveNoteId(id);
    setViewMode('editor');
  };

  // Create new note
  const handleNewNote = () => {
    const newNote: Note = {
      id: `note_${Date.now()}`,
      title: '',
      content: '',
      updatedAt: Date.now(),
      isPinned: false,
      category: (selectedCategory !== 'all' && selectedCategory !== 'pinned'
        ? selectedCategory
        : 'personal') as Note['category'],
    };
    setNotes((prev) => [newNote, ...prev]);
    setActiveNoteId(newNote.id);
    setViewMode('editor');
  };

  // Update existing note
  const handleUpdateNote = useCallback((updates: Partial<Note>) => {
    if (!activeNoteId) return;
    setNotes((prev) =>
      prev.map((n) =>
        n.id === activeNoteId ? { ...n, ...updates, updatedAt: Date.now() } : n
      )
    );
  }, [activeNoteId]);

  // Delete note
  const handleDeleteNote = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (window.confirm('Delete this note?')) {
      setNotes((prev) => prev.filter((n) => n.id !== id));
      if (activeNoteId === id) {
        setViewMode('list');
        setActiveNoteId(null);
      }
      showToast('Note deleted');
    }
  };

  // Toggle Pin
  const handleTogglePin = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isPinned: !n.isPinned } : n))
    );
  };

  const activeNote = notes.find((n) => n.id === activeNoteId);

  return (
    <div
      id="mobile-notepad-container"
      className="w-full h-screen flex flex-col items-center justify-center bg-neutral-200 dark:bg-[#0c0c0c] transition-colors duration-200 overflow-hidden relative"
    >
      {/* Offline Status Alert */}
      <OfflineIndicator />

      {/* View Mode Switcher for Desktop Viewers (Phone Frame vs Full Screen) */}
      <div className="absolute top-3 right-4 z-40 hidden md:flex items-center gap-2.5 bg-white/90 dark:bg-[#202020]/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-neutral-300 dark:border-neutral-700 shadow-md text-xs text-neutral-700 dark:text-neutral-300">
        <PWAInstallButton />
        <div className="w-[1px] h-3.5 bg-neutral-300 dark:bg-neutral-700" />
        <button
          onClick={() => setIsPhoneFrame(!isPhoneFrame)}
          className="flex items-center gap-1.5 font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          {isPhoneFrame ? (
            <>
              <Maximize2 className="w-3.5 h-3.5" />
              <span>Full Screen</span>
            </>
          ) : (
            <>
              <Smartphone className="w-3.5 h-3.5" />
              <span>Mobile Phone View</span>
            </>
          )}
        </button>
      </div>

      {/* Main Device Chassis */}
      <div
        id="mobile-phone-device"
        className={`flex flex-col overflow-hidden bg-white dark:bg-[#151515] transition-all duration-300 ${
          isPhoneFrame
            ? 'w-full max-w-[420px] h-full sm:h-[92vh] sm:rounded-[44px] shadow-2xl border-0 sm:border-[8px] sm:border-neutral-800 dark:sm:border-neutral-700'
            : 'w-full h-full rounded-none border-none'
        }`}
      >
        {/* Mobile Phone Status Bar */}
        <MobileStatusBar />

        {/* Content Views: List or Editor */}
        {viewMode === 'list' || !activeNote ? (
          <NotesListView
            notes={notes}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onOpenNote={handleOpenNote}
            onNewNote={handleNewNote}
            onTogglePin={handleTogglePin}
            onDeleteNote={handleDeleteNote}
            theme={theme}
            onToggleTheme={() =>
              setTheme((t) => (t === 'dark' ? 'light' : 'dark'))
            }
          />
        ) : (
          <NoteEditorView
            note={activeNote}
            onUpdateNote={handleUpdateNote}
            onBack={() => {
              // If note is completely empty, clean it up
              if (!activeNote.title.trim() && !activeNote.content.trim()) {
                setNotes((prev) => prev.filter((n) => n.id !== activeNote.id));
              }
              setViewMode('list');
            }}
            onDeleteNote={(id) => handleDeleteNote(id)}
            onToast={showToast}
          />
        )}

        {/* Mobile Home Bar Indicator */}
        <div className="w-full flex justify-center py-2 bg-transparent shrink-0">
          <div className="w-32 h-1 rounded-full bg-neutral-400 dark:bg-neutral-600 opacity-60" />
        </div>
      </div>

      {/* Toast Alert */}
      {toastMessage && (
        <div
          id="mobile-toast"
          className="fixed bottom-10 z-50 bg-neutral-900/90 dark:bg-white/90 text-white dark:text-neutral-900 backdrop-blur-md px-4 py-2 rounded-full shadow-2xl text-xs font-medium flex items-center gap-2 animate-in fade-in slide-in-from-bottom-3 duration-200"
        >
          <Info className="w-3.5 h-3.5 text-blue-400 dark:text-blue-600" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
