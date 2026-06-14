import type { HandoffChannel } from '~/entities/escalation';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '~/shared/ui/kit';

interface HandoffChannelConfigureSheetProps {
  channel: HandoffChannel | null;
  onClose: () => void;
}

export const HandoffChannelConfigureSheet = ({
  channel,
  onClose,
}: HandoffChannelConfigureSheetProps) => {
  return (
    <Sheet open={!!channel} onOpenChange={(open) => !open && onClose()}>
      <SheetContent side="right" className="w-full max-w-sm p-0" aria-describedby={undefined}>
        <SheetHeader className="border-border border-b px-4 py-3">
          <SheetTitle className="text-sm">{channel?.name} configuration</SheetTitle>
        </SheetHeader>
        <div className="flex flex-1 items-center justify-center p-6">
          <p className="text-muted-foreground text-sm">Configuration form coming soon.</p>
        </div>
      </SheetContent>
    </Sheet>
  );
};
