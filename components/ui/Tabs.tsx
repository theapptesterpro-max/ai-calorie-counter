import React from 'react';

interface TabsProps {
  tabs: string[];
  activeTab: string;
  onTabClick: (tab: string) => void;
}

const Tabs: React.FC<TabsProps> = ({ tabs, activeTab, onTabClick }) => {
  return (
    <div className="border-b border-slate-200 dark:border-slate-700">
      <nav className="-mb-px flex space-x-4" aria-label="Tabs">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => onTabClick(tab)}
            className={`${
              activeTab === tab
                ? 'border-green-500 text-green-600'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300 dark:hover:text-slate-200 dark:hover:border-slate-500'
            } whitespace-nowrap py-3 px-2 border-b-2 font-medium text-sm transition-colors`}
            aria-current={activeTab === tab ? 'page' : undefined}
          >
            {tab}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Tabs;