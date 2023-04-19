type MangadexRepation = { id: string; type: 'scanlation_group' | 'manga' | 'user' };

type MangadexChapterAttributes = {
  /** Chapter number */
  chapter: string;
  createdAt: string;
  externalUrl: null;
  pages: number;
  publishAt: string;
  readableAt: string;
  title: string;
  translatedLanguage: string;
  updatedAt: string;
  version: number;
  volume: null;
};

export type MangadexChapter = {
  attributes: MangadexChapterAttributes;
  id: string;
  relationships: MangadexRepation[];
  type: 'chapter';
};

export type MangadexResponse = {
  data: MangadexChapter[];
  limit: number;
  offset: number;
  response: 'collection';
  result: 'ok';
  total: 78;
};

export type MangadexChapterList = {
  result: 'ok';
  response: 'collection';
  data: {
    id: string;
    type: 'chapter';
    attributes: {
      volume: null;
      chapter: string;
      title: string;
      translatedLanguage: string;
      externalUrl: null;
      publishAt: string;
      readableAt: string;
      createdAt: string;
      updatedAt: string;
      pages: number;
      version: number;
    };
    relationships: MangadexRepation[];
  }[];
  limit: number;
  offset: number;
  total: number;
};
