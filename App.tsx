
import React, { useState, useEffect } from 'react';
import Onboarding from './components/onboarding/Onboarding';
import Dashboard from './components/dashboard/Dashboard';
import { useAuth } from './src/hooks/useAuth';
import { UserProfile } from './types';
import { getUserProfile, createUserProfile } from './src/services/firestoreService';
import { Loader2 } from 'lucide-react';
import AuthPage from './src/components/auth/AuthPage';

const App: React.FC = () => {
  const { user, loading } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [profileLoading, setProfileLoading] = useState(true);
  const [needsOnboarding, setNeedsOnboarding] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        setProfileLoading(true);
        const userProfile = await getUserProfile(user.uid);
        if (userProfile) {
          setProfile(userProfile);
          setNeedsOnboarding(false);
        } else {
          // New user, needs to go through onboarding
          setNeedsOnboarding(true);
        }
        setProfileLoading(false);
      } else {
        // No user, reset states
        setProfile(null);
        setNeedsOnboarding(false);
        setProfileLoading(false);
      }
    };

    if (!loading) { // Only run fetchProfile when auth state is resolved
      fetchProfile();
    }
  }, [user, loading]);

  const handleOnboardingComplete = async (completedProfile: UserProfile) => {
    if (user) {
      await createUserProfile(user.uid, completedProfile);
      setProfile(completedProfile);
      setNeedsOnboarding(false);
    }
  };

  const handleProfileUpdate = (updatedProfile: UserProfile) => {
    setProfile(updatedProfile);
  };
  
  // This is the top-level loading state for the app
  if (loading || (user && profileLoading)) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50 dark:bg-slate-900">
        <Loader2 className="h-12 w-12 animate-spin text-green-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 font-sans">
      {user ? (
        needsOnboarding ? (
          <Onboarding onComplete={handleOnboardingComplete} />
        ) : profile ? (
          <Dashboard 
            userProfile={profile} 
            updateUserProfile={handleProfileUpdate}
          />
        ) : (
          // This state can happen briefly while profile loads
          <div className="flex items-center justify-center min-h-screen bg-slate-50 dark:bg-slate-900">
             <Loader2 className="h-12 w-12 animate-spin text-green-500" />
          </div>
        )
      ) : (
        <AuthPage />
      )}
    </div>
  );
};

export default App;