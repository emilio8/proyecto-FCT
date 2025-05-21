export interface SongCreate {
  title: string;
  image?: File | null;
  file: File | null;
  description?: string;
}