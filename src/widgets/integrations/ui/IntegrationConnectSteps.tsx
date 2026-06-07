import { CheckmarkCircle02Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';

const SETUP_STEPS = [
  {
    title: 'Authorize workspace access',
    description:
      'Redirect the user to the provider authorization screen and capture consent.',
  },
  {
    title: 'Validate credentials',
    description: 'Exchange the authorization response for secure tokens on the backend.',
  },
  {
    title: 'Choose event routing',
    description:
      'Select which escalations, transcripts, and AI insights should be synced.',
  },
  {
    title: 'Run a test event',
    description:
      'Send a sample payload and confirm the integration is ready for production.',
  },
] as const;

export const IntegrationConnectSteps = () => {
  return (
    <section className="border-border bg-background rounded-2xl border p-4 shadow-xs sm:p-5">
      <div className="space-y-1">
        <h2 className="font-heading text-foreground text-base font-semibold">
          Setup flow
        </h2>
        <p className="text-muted-foreground text-sm">
          This mirrors the final API flow, so wiring backend actions later stays
          contained.
        </p>
      </div>

      <div className="mt-5 grid gap-3">
        {SETUP_STEPS.map((step, index) => (
          <div
            key={step.title}
            className="border-border bg-card flex gap-3 rounded-xl border p-4"
          >
            <div className="bg-primary/10 text-primary flex size-8 shrink-0 items-center justify-center rounded-full">
              <HugeiconsIcon
                icon={CheckmarkCircle02Icon}
                strokeWidth={1.8}
                className="size-4"
              />
            </div>
            <div className="min-w-0 space-y-1">
              <p className="text-foreground text-sm font-semibold">
                {index + 1}. {step.title}
              </p>
              <p className="text-muted-foreground text-sm leading-6">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
