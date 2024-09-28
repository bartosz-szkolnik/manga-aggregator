export interface MangaDexResponse {
  result: string;
  response: string;
  data: Data;
}

export interface Data {
  id: string;
  type: string;
  attributes: MangaAttributes;
  relationships: Relationship[];
}

export interface MangaAttributes {
  title: Title;
  altTitles: AltTitle[];
  description: Description;
  isLocked: boolean;
  links: Links;
  originalLanguage: string;
  lastVolume: string;
  lastChapter: string;
  publicationDemographic: string;
  status: string;
  year: number;
  contentRating: string;
  tags: Tag[];
  state: string;
  chapterNumbersResetOnNewVolume: boolean;
  createdAt: string;
  updatedAt: string;
  version: number;
  availableTranslatedLanguages: string[];
  latestUploadedChapter: string;
}

export interface Title {
  en: string;
  es: string;
  fr: string;
  jp: string;
  ja: string;
  ko: string;
  ru: string;
  zh: string;
  'jp-ro': string;
  'ja-ro': string;
}

export interface AltTitle {
  ja?: string;
  ru?: string;
  vi?: string;
  'zh-hk'?: string;
  id?: string;
  'pt-br'?: string;
  ne?: string;
  de?: string;
  en?: string;
  'ja-ro'?: string;
  pl?: string;
  zh?: string;
  fr?: string;
  th?: string;
  ko?: string;
}

export interface Description {
  en: string;
  it: string;
  ja: string;
  jp: string;
  pl: string;
  ru: string;
  vi: string;
  fr: string;
  'pt-br': string;
  'jp-ro': string;
  'ja-ro': string;
}

export interface Links {
  al: string;
  ap: string;
  bw: string;
  kt: string;
  mu: string;
  nu: string;
  amz: string;
  cdj: string;
  ebj: string;
  mal: string;
  raw: string;
  engtl: string;
}

export interface Tag {
  id: string;
  type: string;
  attributes: Attributes2;
  relationships: any[];
}

export interface Attributes2 {
  name: Name;
  description: Description2;
  group: string;
  version: number;
}

export interface Name {
  en: string;
}

export interface Description2 {}

export interface Relationship {
  id: string;
  type: string;
  related?: string;
}
