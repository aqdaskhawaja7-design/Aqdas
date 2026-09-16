export interface Note {
  id: string;
  title: string;
  content: string;
  updatedAt: number;
  isPinned: boolean;
  category: 'all' | 'personal' | 'work' | 'ideas' | 'todo';
  color?: string;
}

export type ViewMode = 'list' | 'editor';

export type AppTheme = 'light' | 'dark' | 'system';

export interface TabItem {
  id: string;
  title: string;
  content: string;
  isModified: boolean;
  lineEnding: 'CRLF' | 'LF';
}

export interface FindReplaceState {
  isOpen: boolean;
  findText: string;
  replaceText: string;
  matchCase: boolean;
  mode: 'find' | 'replace';
}

export interface FontSettings {
  family: string;
  size: number;
}

export type DialogType = 'none' | 'about' | 'goTo' | 'font' | 'desktopNotepad' | 'settings';

export interface CursorPosition {
  line: number;
  col: number;
  selectedChars: number;
}
