import { SortableContainer } from "@/dnd-kit/SortableContainer";
import React from 'react';
import { NavigationTab } from './ProcureApp';
import { FileText, Eye, BarChart3, Award } from 'lucide-react';
interface TopNavBarProps {
  activeTab: NavigationTab;
  onTabChange: (tab: NavigationTab) => void;
  mpid?: string;
}

// @component: TopNavBar
export const TopNavBar = ({
  activeTab,
  onTabChange
}: TopNavBarProps) => {
  const navItems = [{
    id: 'initiate' as NavigationTab,
    label: 'Initiate',
    icon: FileText,
    description: 'Create new RFI/RFQ',
    mpid: "55b00bd7-383d-4868-ad07-69bf784a8fb4"
  }, {
    id: 'view' as NavigationTab,
    label: 'View',
    icon: Eye,
    description: 'View active requests',
    mpid: "228a539a-1589-4346-ae49-702cebe74139"
  }, {
    id: 'score' as NavigationTab,
    label: 'Score',
    icon: BarChart3,
    description: 'Evaluate responses',
    mpid: "e0388935-b89a-4508-926b-45c8f6ab744f"
  }, {
    id: 'award' as NavigationTab,
    label: 'Award',
    icon: Award,
    description: 'Award contracts',
    mpid: "0633547e-4929-4944-a043-b8a6b6acfbad"
  }] as any[];

  // @return
  return <SortableContainer dndKitId="f91fbf1f-19d1-4507-ac81-31dcac923f5a" containerType="regular" prevTag="nav" className="bg-white border-b border-slate-200 shadow-sm" data-magicpath-id="0" data-magicpath-path="TopNavBar.tsx">
      <SortableContainer dndKitId="9ac99f7e-d7e1-487e-9313-a619efd702e7" containerType="regular" prevTag="div" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-magicpath-id="1" data-magicpath-path="TopNavBar.tsx">
        <SortableContainer dndKitId="c77e591b-f9cb-4369-a746-94b384243bb7" containerType="regular" prevTag="div" className="flex items-center justify-between h-16" data-magicpath-id="2" data-magicpath-path="TopNavBar.tsx">
          <SortableContainer dndKitId="69fd85a8-48cd-44bb-8611-9dd308104669" containerType="regular" prevTag="div" className="flex items-center space-x-2" data-magicpath-id="3" data-magicpath-path="TopNavBar.tsx">
            <SortableContainer dndKitId="6c34ef7b-a6d1-40ae-85b7-57127d65d7d8" containerType="regular" prevTag="div" className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center" data-magicpath-id="4" data-magicpath-path="TopNavBar.tsx">
              <span className="text-white font-bold text-sm" data-magicpath-id="5" data-magicpath-path="TopNavBar.tsx">P</span>
            </SortableContainer>
            <h1 className="text-xl font-bold text-slate-800" data-magicpath-id="6" data-magicpath-path="TopNavBar.tsx">
              <span data-magicpath-id="7" data-magicpath-path="TopNavBar.tsx">Procure</span>
            </h1>
          </SortableContainer>

          <SortableContainer dndKitId="ff30cda7-6a4a-4184-99c1-47771f5c03c9" containerType="collection" prevTag="div" className="flex space-x-1" data-magicpath-id="8" data-magicpath-path="TopNavBar.tsx">
            {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return <button key={item.id} onClick={() => onTabChange(item.id)} className={`
                    relative px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200
                    flex items-center space-x-2 group
                    ${isActive ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-600 hover:text-blue-600 hover:bg-blue-50'}
                  `} data-magicpath-uuid={(item as any)["mpid"] ?? "unsafe"} data-magicpath-id="9" data-magicpath-path="TopNavBar.tsx">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500 group-hover:text-blue-600'}`} data-magicpath-uuid={(item as any)["mpid"] ?? "unsafe"} data-magicpath-id="10" data-magicpath-path="TopNavBar.tsx" />
                  <span data-magicpath-uuid={(item as any)["mpid"] ?? "unsafe"} data-magicpath-field="label:string" data-magicpath-id="11" data-magicpath-path="TopNavBar.tsx">{item.label}</span>
                  
                  {!isActive && <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10" data-magicpath-uuid={(item as any)["mpid"] ?? "unsafe"} data-magicpath-id="12" data-magicpath-path="TopNavBar.tsx">
                      <span data-magicpath-uuid={(item as any)["mpid"] ?? "unsafe"} data-magicpath-field="description:string" data-magicpath-id="13" data-magicpath-path="TopNavBar.tsx">{item.description}</span>
                      <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-slate-800 rotate-45" data-magicpath-uuid={(item as any)["mpid"] ?? "unsafe"} data-magicpath-id="14" data-magicpath-path="TopNavBar.tsx"></div>
                    </div>}
                </button>;
          })}
          </SortableContainer>
        </SortableContainer>
      </SortableContainer>
    </SortableContainer>;
};