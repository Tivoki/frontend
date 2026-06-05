import type { DeviceType } from '../model/types';

interface MockWebsiteContentProps {
  device: DeviceType;
}

export const MockWebsiteContent = ({ device }: MockWebsiteContentProps) => {
  const isMobile = device === 'mobile';

  return (
    <div className="flex h-full flex-col bg-background">
      <nav className="flex h-11 shrink-0 items-center gap-6 border-b border-border/60 px-5">
        <div className="h-4 w-20 rounded-sm bg-muted" />
        {!isMobile && (
          <div className="flex gap-4">
            {[56, 44, 52].map((w) => (
              <div key={w} className="h-3 rounded-sm bg-muted/60" style={{ width: w }} />
            ))}
          </div>
        )}
        <div className="ml-auto h-7 w-16 rounded-lg bg-primary/15" />
      </nav>

      <div className={isMobile ? 'px-4 py-6' : 'px-8 py-8'}>
        <div className="mb-2 h-7 w-3/5 rounded-md bg-muted" />
        <div className="mb-1 h-4 w-full rounded-sm bg-muted/50" />
        <div className="mb-6 h-4 w-4/5 rounded-sm bg-muted/40" />
        <div className="flex gap-3">
          <div className="h-9 w-24 rounded-lg bg-primary/25" />
          <div className="h-9 w-20 rounded-lg bg-muted/50" />
        </div>
      </div>

      {isMobile ? (
        <div className="flex flex-col gap-3 px-4 pb-4">
          {[1, 2].map((i) => (
            <div key={i} className="rounded-xl border border-border/50 bg-muted/20 p-3">
              <div className="mb-2.5 h-16 rounded-lg bg-muted/50" />
              <div className="mb-1.5 h-3 w-3/4 rounded-sm bg-muted" />
              <div className="h-3 w-1/2 rounded-sm bg-muted/60" />
            </div>
          ))}
        </div>
      ) : (
        <div className={`grid gap-4 px-8 pb-8 ${device === 'tablet' ? 'grid-cols-2' : 'grid-cols-3'}`}>
          {(device === 'tablet' ? [1, 2] : [1, 2, 3]).map((i) => (
            <div key={i} className="rounded-xl border border-border/50 bg-muted/20 p-4">
              <div className="mb-3 h-28 rounded-lg bg-muted/50" />
              <div className="mb-1.5 h-3 w-3/4 rounded-sm bg-muted" />
              <div className="h-3 w-1/2 rounded-sm bg-muted/60" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
