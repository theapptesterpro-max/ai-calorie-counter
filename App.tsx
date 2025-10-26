import React, { useCallback } from 'react';
import Onboarding from './components/onboarding/Onboarding';
import Dashboard from './components/dashboard/Dashboard';
import { useLocalStorage } from './hooks/useLocalStorage';
import { UserProfile, DailyLog } from './types';

const App: React.FC = () => {
  const [profile, setProfile] = useLocalStorage<UserProfile | null>('user-profile', null);
  const [logs, setLogs] = useLocalStorage<Record<string, DailyLog>>('daily-logs', {});

  const handleOnboardingComplete = useCallback((completedProfile: UserProfile) => {
    setProfile(completedProfile);
  }, [setProfile]);

  const updateLogs = (date: string, newLog: DailyLog) => {
    // FIX: Changed from functional update to direct update to satisfy the type signature of `setLogs`.
    setLogs({
      ...logs,
      [date]: newLog,
    });
  };
  
  const updateUserProfile = (updatedProfile: UserProfile) => {
    setProfile(updatedProfile);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 font-sans">
      {profile ? (
        <Dashboard 
          userProfile={profile} 
          updateUserProfile={updateUserProfile}
          logs={logs}
          updateLogs={updateLogs}
        />
      ) : (
        <Onboarding onComplete={handleOnboardingComplete} />
      )}
    </div>
  );
};

export default App;