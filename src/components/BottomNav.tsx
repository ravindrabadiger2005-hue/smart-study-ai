import React from 'react';

interface BottomNavProps {
  currentTab: 'home' | 'ai-tutor' | 'smart-notes' | 'planner';
  onSelectTab: (tab: 'home' | 'ai-tutor' | 'smart-notes' | 'planner') => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentTab, onSelectTab }) => {
  const tabs = [
    {
      id: 'home' as const,
      label: 'Home',
      icon: 'dashboard',
    },
    {
      id: 'ai-tutor' as const,
      label: 'AI Tutor',
      icon: 'smart_toy',
    },
    {
      id: 'smart-notes' as const,
      label: 'Smart Notes',
      icon: 'auto_awesome',
    },
    {
      id: 'planner' as const,
      label: 'Planner',
      icon: 'calendar_month',
    },
  ];

  return (
    <nav
      aria-label="Primary Navigation"
      className="fixed bottom-0 w-full z-40 pb-safe bg-surface/90 backdrop-blur-xl border-t border-surface-container shadow-[0_-4px_16px_rgba(88,75,246,0.06)]"
    >
      <div className="max-w-md mx-auto h-16 px-4 flex items-center justify-around">
        {tabs.map((tab) => {
          const isActive = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              aria-current={isActive ? 'page' : undefined}
              className={`group flex flex-col items-center justify-center min-w-[56px] min-h-[48px] px-2 py-1 rounded-xl transition-all ${
                isActive
                  ? 'text-primary'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
              type="button"
            >
              <div
                className={`flex items-center justify-center w-12 h-7 rounded-full transition-all group-active:scale-90 ${
                  isActive ? 'bg-primary-container/20 text-primary' : 'bg-transparent'
                }`}
              >
                <span
                  className="material-symbols-outlined text-[22px]"
                  style={isActive ? { fontVariationSettings: "'FILL' 1" } : undefined}
                >
                  {tab.icon}
                </span>
              </div>
              <span className={`font-headline text-[11px] tracking-tight mt-0.5 ${isActive ? 'font-bold' : 'font-medium'}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
