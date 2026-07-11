import { Sheet, SheetContent, SheetHeader, SheetTitle } from '~/shared/ui/kit';

interface HandoffChannelAddSheetProps {
  open: boolean;
  onClose: () => void;
}

export const HandoffChannelAddSheet = ({
  open,
  onClose,
}: HandoffChannelAddSheetProps) => {
  return (
    <Sheet open={open} onOpenChange={(open) => !open && onClose()}>
      <SheetContent
        side="right"
        className="w-full max-w-sm p-0"
        aria-describedby={undefined}
      >
        <SheetHeader className="border-border border-b px-4 py-3">
          <SheetTitle className="text-sm">Add channel</SheetTitle>
        </SheetHeader>
        <div className="flex flex-1 items-center justify-center p-6">
          <p className="text-muted-foreground text-sm">Channel setup form coming soon.</p>
        </div>
      </SheetContent>
    </Sheet>
  );
};
