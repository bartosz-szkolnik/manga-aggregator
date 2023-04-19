import { Chapter as ChapterType } from '../db/db';

export type ChapterProps = {
  isNew: boolean;
  data: ChapterType;
};

export function Chapter(props: ChapterProps) {
  return (
    <div class="flex justify-between mx-6 my-2">
      <span class="truncate">
        {props.data.number} - {props.data.name}
      </span>
      {/* <hr /> */}
      {/* {props.data.isRead ? <span>Already read</span> : null} */}
      {/* <hr /> */}
      {props.isNew ? <span>New!</span> : null}
    </div>
  );
}
