import { AppearanceSection } from './AppearanceSection';
import { BrandingSection } from './BrandingSection';

export const CustomizeTab = () => {
  return (
    <div className="space-y-6">
      <AppearanceSection />
      <div className="border-t border-border" />
      <BrandingSection />
    </div>
  );
};
