import { JSXElement, ParentProps } from 'solid-js';

export type CardProps = ParentProps & {
  title: string;
  imageSrc: string;
  footer?: JSXElement;
};

export function Card(props: CardProps) {
  return (
    <div class="flex flex-col rounded-xl bg-slate-100 bg-transparent bg-clip-border shadow-none">
      <div class="flex">
        <div class="w-1/3">
          <img class="rounded-lg" src={props.imageSrc} alt={props.title} />
        </div>
        <div class="text-secondary w-2/3 flex-1 p-6 flex flex-col justify-between">
          <div>
            <h4 class="text-2xl mb-4 font-bold truncate">{props.title}</h4>
            <p class="mb-5 opacity-80">{props.children}</p>
          </div>
          {props.footer}
        </div>
      </div>
    </div>
  );
}
