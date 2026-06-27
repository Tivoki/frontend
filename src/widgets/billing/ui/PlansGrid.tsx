import { PLAN_TIERS } from '~/entities/billing';
import { PlanTierCard } from './PlanTierCard';

export const PlansGrid = () => {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {PLAN_TIERS.map((plan) => (
        <PlanTierCard key={plan.id} plan={plan} />
      ))}
    </div>
  );
};
