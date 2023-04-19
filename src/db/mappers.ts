import { MangadexChapter } from './types';
import { Chapter } from './db';

export function chapterResponseToChapterMap(chapter: MangadexChapter): Chapter {
  return {
    chapterId: chapter.id,
    isRead: false,
    name: chapter.attributes.title,
    number: chapter.attributes.chapter,
  };
}
