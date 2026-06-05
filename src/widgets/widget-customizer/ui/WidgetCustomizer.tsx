'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/shared/ui/kit';

import { AdvancedSection } from './AdvancedSection';
import { BehaviorSection } from './BehaviorSection';
import { CustomizeTab } from './CustomizeTab';
import { InstallationTab } from './InstallationTab';
import { SecuritySection } from './SecuritySection';

export const WidgetCustomizer = () => {
  return (
    <Tabs defaultValue="customize">
      <TabsList className="w-full justify-start overflow-x-auto custom-scrollbar">
        <TabsTrigger value="customize">Customize</TabsTrigger>
        <TabsTrigger value="installation">Installation</TabsTrigger>
        <TabsTrigger value="behavior">Behavior</TabsTrigger>
        <TabsTrigger value="security">Security</TabsTrigger>
        <TabsTrigger value="advanced">Advanced</TabsTrigger>
      </TabsList>

      <TabsContent value="customize">
        <CustomizeTab />
      </TabsContent>
      <TabsContent value="installation">
        <InstallationTab />
      </TabsContent>
      <TabsContent value="behavior">
        <BehaviorSection />
      </TabsContent>
      <TabsContent value="security">
        <SecuritySection />
      </TabsContent>
      <TabsContent value="advanced">
        <AdvancedSection />
      </TabsContent>
    </Tabs>
  );
};
