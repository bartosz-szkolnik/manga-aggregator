import { ParentProps } from 'solid-js';

type ButtonProps = ParentProps & {
  type?: 'button' | 'submit' | 'link';
  href?: string;
  onClick?: (event: Event) => void;
};

export function Button(props: ButtonProps) {
  if (props.type === 'link') {
    return (
      <a
        href={props.href}
        target="__blank"
        class="middle none center rounded-lg py-3 px-6 font-sans text-xs font-bold uppercase text-blue-500 transition-all hover:bg-blue-500/10 active:bg-blue-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
      >
        {props.children}
      </a>
    );
  }

  return (
    <button
      class="middle none center rounded-lg bg-blue-500 py-3 px-6 font-sans text-md font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
      type={props.type ?? 'button'}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}
