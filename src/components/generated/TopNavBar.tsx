import React from 'react';
import { NavigationTab } from './ProcureApp';
import { FileText, Eye, BarChart3, Award } from 'lucide-react';
interface TopNavBarProps {
  activeTab: NavigationTab;
  onTabChange: (tab: NavigationTab) => void;
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
    description: 'Create new RFI/RFQ'
  }, {
    id: 'view' as NavigationTab,
    label: 'View',
    icon: Eye,
    description: 'View active requests'
  }, {
    id: 'score' as NavigationTab,
    label: 'Score',
    icon: BarChart3,
    description: 'Evaluate responses'
  }, {
    id: 'award' as NavigationTab,
    label: 'Award',
    icon: Award,
    description: 'Award contracts'
  }] as any[];

  // @return
  return <nav className="bg-gradient-to-r from-navy-900 to-navy-800 border-b border-navy-700 shadow-lg" style={{
    backgroundColor: '#1e293b'
  }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">P</span>
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              <span>Procure</span>
            </h1>
          </div>

          <div className="flex space-x-2">
            {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return <button key={item.id} onClick={() => onTabChange(item.id)} className={`
                    relative px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300
                    flex items-center space-x-2 group backdrop-blur-sm
                    ${isActive ? 'bg-white text-navy-800 shadow-xl transform scale-105' : 'text-blue-100 hover:text-white hover:bg-white/10 hover:backdrop-blur-md'}
                  `} style={isActive ? {
              color: '#1e293b'
            } : {}}>
                  <Icon className={`w-5 h-5 transition-colors duration-300 ${isActive ? 'text-navy-700' : 'text-blue-200 group-hover:text-white'}`} style={isActive ? {
                color: '#334155'
              } : {}} />
                  <span>{item.label}</span>
                  
                  {!isActive && <div className="absolute -bottom-14 left-1/2 transform -translate-x-1/2 bg-navy-900 text-blue-100 text-xs px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap z-10 shadow-xl" style={{
                backgroundColor: '#0f172a'
              }}>
                      <span>{item.description}</span>
                      <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-navy-900 rotate-45" style={{
                  backgroundColor: '#0f172a'
                }}></div>
                    </div>}
                </button>;
          })}
          </div>
        </div>
      </div>
    </nav>;
};