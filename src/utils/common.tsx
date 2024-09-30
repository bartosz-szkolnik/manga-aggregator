export function getShortcutSymbols(letter: string) {
  return (
    <span>
      {getTheMetaSymbol()}/{getTheCtrlSymbol()}+{wrapInCodeLikeStyle(letter)}
    </span>
  );
}

export function wrapInCodeLikeStyle(value: string) {
  return (
    <span className="text-sm text-muted-foreground">
      <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
        <span className="text-xs">{value}</span>
      </kbd>
    </span>
  );
}

export function getTheMetaSymbol() {
  return wrapInCodeLikeStyle('⌘');
}

export function getTheCtrlSymbol() {
  return wrapInCodeLikeStyle('Ctrl');
}
