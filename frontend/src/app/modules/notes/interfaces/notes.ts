export interface Note {
  id: string;
  created_at: string;
  title: string;
  description: string;
}
export interface NotePayload {
  title: string;
  description: string;
}

export interface NoteList {
  count: number;
  next: string | null;
  previous: string | null;
  results: Note[];
}
