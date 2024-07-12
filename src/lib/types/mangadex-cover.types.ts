export interface MangaDexCoverResponse {
  result: string;
  response: string;
  data: Daum[];
  limit: number;
  offset: number;
  total: number;
}

export interface Daum {
  id: string;
  type: string;
  attributes: Attributes;
  relationships: Relationship[];
}

export interface Attributes {
  description: string;
  volume: string;
  fileName: string;
  locale: string;
  createdAt: string;
  updatedAt: string;
  version: number;
}

export interface Relationship {
  id: string;
  type: string;
}
