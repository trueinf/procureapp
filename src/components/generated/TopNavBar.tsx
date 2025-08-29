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
    mpid: "169307a2-ad06-4387-9f37-7bcd65c38ba3"
  }, {
    id: 'view' as NavigationTab,
    label: 'View',
    icon: Eye,
    description: 'View active requests',
    mpid: "657ebfec-bc8e-46f7-8d4c-460ae4e1cd0a"
  }, {
    id: 'score' as NavigationTab,
    label: 'Score',
    icon: BarChart3,
    description: 'Evaluate responses',
    mpid: "dd73d695-f56d-4863-abb4-8f3acd4642a5"
  }, {
    id: 'award' as NavigationTab,
    label: 'Award',
    icon: Award,
    description: 'Award contracts',
    mpid: "2d6aa75e-a6d5-433e-aacd-b0e5cac7f242"
  }] as any[];

  // @return
  return <SortableContainer dndKitId="24c43dab-af66-4ab5-8ba1-af67340f4a15" containerType="regular" prevTag="nav" className="bg-gradient-to-r from-navy-900 to-navy-800 border-b border-navy-700 shadow-lg" style={{
    backgroundColor: '#1e293b'
  }} data-magicpath-id="0" data-magicpath-path="TopNavBar.tsx">
      <SortableContainer dndKitId="fe93a5a1-424a-449e-a717-a116a9068242" containerType="regular" prevTag="div" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-magicpath-id="1" data-magicpath-path="TopNavBar.tsx">
        <SortableContainer dndKitId="32289bd6-4acc-4789-b9bc-a623d4e7021f" containerType="regular" prevTag="div" className="flex items-center justify-between h-16" data-magicpath-id="2" data-magicpath-path="TopNavBar.tsx">
          <SortableContainer dndKitId="918d515c-48d5-4066-858e-cc32711677f4" containerType="regular" prevTag="div" className="flex items-center space-x-3" data-magicpath-id="3" data-magicpath-path="TopNavBar.tsx">
            <SortableContainer dndKitId="711348aa-6ca6-4347-a20a-ea2c6ebd739e" containerType="regular" prevTag="div" className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center shadow-lg" data-magicpath-id="4" data-magicpath-path="TopNavBar.tsx">
              <span className="text-white font-bold text-lg" data-magicpath-id="5" data-magicpath-path="TopNavBar.tsx">P</span>
            </SortableContainer>
            <h1 className="text-2xl font-bold text-white tracking-tight" data-magicpath-id="6" data-magicpath-path="TopNavBar.tsx">
              <span data-magicpath-id="7" data-magicpath-path="TopNavBar.tsx">Procure</span>
            </h1>
          </SortableContainer>

          <SortableContainer dndKitId="0f7bebe3-d9a1-45fe-b2ee-1867d8cbc5fd" containerType="collection" prevTag="div" className="flex space-x-2" data-magicpath-id="8" data-magicpath-path="TopNavBar.tsx">
            {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return <button key={item.id} onClick={() => onTabChange(item.id)} className={`
                    relative px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300
                    flex items-center space-x-2 group backdrop-blur-sm
                    ${isActive ? 'bg-white text-navy-800 shadow-xl transform scale-105' : 'text-blue-100 hover:text-white hover:bg-white/10 hover:backdrop-blur-md'}
                  `} style={isActive ? {
              color: '#1e293b'
            } : {}} data-magicpath-uuid={(item as any)["mpid"] ?? "unsafe"} data-magicpath-id="9" data-magicpath-path="TopNavBar.tsx">
                  <Icon className={`w-5 h-5 transition-colors duration-300 ${isActive ? 'text-navy-700' : 'text-blue-200 group-hover:text-white'}`} style={isActive ? {
                color: '#334155'
              } : {}} data-magicpath-uuid={(item as any)["mpid"] ?? "unsafe"} data-magicpath-id="10" data-magicpath-path="TopNavBar.tsx" />
                  <span data-magicpath-uuid={(item as any)["mpid"] ?? "unsafe"} data-magicpath-field="label:unknown" data-magicpath-id="11" data-magicpath-path="TopNavBar.tsx">{item.label}</span>
                  
                  {!isActive && <div className="absolute -bottom-14 left-1/2 transform -translate-x-1/2 bg-navy-900 text-blue-100 text-xs px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap z-10 shadow-xl" style={{
                backgroundColor: '#0f172a'
              }} data-magicpath-uuid={(item as any)["mpid"] ?? "unsafe"} data-magicpath-id="12" data-magicpath-path="TopNavBar.tsx">
                      <span data-magicpath-uuid={(item as any)["mpid"] ?? "unsafe"} data-magicpath-field="description:unknown" data-magicpath-id="13" data-magicpath-path="TopNavBar.tsx">{item.description}</span>
                      <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-navy-900 rotate-45" style={{
                  backgroundColor: '#0f172a'
                }} data-magicpath-uuid={(item as any)["mpid"] ?? "unsafe"} data-magicpath-id="14" data-magicpath-path="TopNavBar.tsx"></div>
                    </div>}
                </button>;
          })}
          </SortableContainer>
        </SortableContainer>
      </SortableContainer>
    </SortableContainer>;
};