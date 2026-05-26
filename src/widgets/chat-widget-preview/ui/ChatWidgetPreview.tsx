export const ChatWidgetPreview = () => {
  return (
    <div className="rounded-xl border border-border bg-background p-4">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground">Widget Preview</h3>
        <button className="text-xs text-primary hover:underline">Primary</button>
      </div>
      <div className="rounded-lg border border-primary/20 bg-primary/5 p-3 text-center">
        <p className="text-xs text-foreground/70">Chat widget preview</p>
        <div className="mt-2 inline-flex size-8 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
          AI
        </div>
      </div>
    </div>
  );
};
