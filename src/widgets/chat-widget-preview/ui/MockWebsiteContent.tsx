import type { DeviceType } from '../model/types';

interface MockWebsiteContentProps {
  device: DeviceType;
}

export const MockWebsiteContent = ({ device }: MockWebsiteContentProps) => {
  const isMobile = device === 'mobile';

  return (
    <div className="bg-background flex h-full flex-col">
      <nav className="border-border/60 flex h-11 shrink-0 items-center gap-6 border-b px-5">
        <div className="bg-muted h-4 w-20 rounded-sm" />
        {!isMobile && (
          <div className="flex gap-4">
            {[56, 44, 52].map((w) => (
              <div key={w} className="bg-muted/60 h-3 rounded-sm" style={{ width: w }} />
            ))}
          </div>
        )}
        <div className="bg-primary/15 ml-auto h-7 w-16 rounded-lg" />
      </nav>

      <div className={isMobile ? 'px-4 py-6' : 'px-8 py-8'}>
        <div className="bg-muted mb-2 h-7 w-3/5 rounded-md" />
        <div className="bg-muted/50 mb-1 h-4 w-full rounded-sm" />
        <div className="bg-muted/40 mb-6 h-4 w-4/5 rounded-sm" />
        <div className="flex gap-3">
          <div className="bg-primary/25 h-9 w-24 rounded-lg" />
          <div className="bg-muted/50 h-9 w-20 rounded-lg" />
        </div>
      </div>

      {isMobile ? (
        <div className="flex flex-col gap-3 px-4 pb-4">
          {[1, 2].map((i) => (
            <div key={i} className="border-border/50 bg-muted/20 rounded-xl border p-3">
              <div className="bg-muted/50 mb-2.5 h-16 rounded-lg" />
              <div className="bg-muted mb-1.5 h-3 w-3/4 rounded-sm" />
              <div className="bg-muted/60 h-3 w-1/2 rounded-sm" />
            </div>
          ))}
        </div>
      ) : (
        <div
          className={`grid gap-4 px-8 pb-8 ${device === 'tablet' ? 'grid-cols-2' : 'grid-cols-3'}`}
        >
          {(device === 'tablet' ? [1, 2] : [1, 2, 3]).map((i) => (
            <div key={i} className="border-border/50 bg-muted/20 rounded-xl border p-4">
              <div className="bg-muted/50 mb-3 h-28 rounded-lg" />
              <div className="bg-muted mb-1.5 h-3 w-3/4 rounded-sm" />
              <div className="bg-muted/60 h-3 w-1/2 rounded-sm" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
