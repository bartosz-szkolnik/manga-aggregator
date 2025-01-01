export interface MangaDexChapterResponse {
  result: string;
  response: string;
  data: Data[];
  limit: number;
  offset: number;
  total: number;
}

interface Data {
  id: string;
  type: string;
  attributes: MangaDexChapterAttributes;
  relationships: Relationship[];
}

export interface MangaDexChapterAttributes {
  volume: any;
  chapter: string | null; // if it's null, it probably means it a oneshot
  title: string;
  translatedLanguage: string;
  externalUrl: any;
  publishAt: string;
  readableAt: string;
  createdAt: string;
  updatedAt: string;
  pages: number;
  version: number;
}

interface Relationship {
  id: string;
  type: string;
}
