import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { AuthError } from 'firebase/auth';

type AuthMode = 'login' | 'signup';

const AuthPage: React.FC = () => {
  const [mode, setMode] = useState<AuthMode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { login, signup } = useAuth();

  const handleAuthError = (err: unknown) => {
    // Log the full error to the console for debugging
    console.error("Authentication Error Object:", err);

    if (err instanceof Error && 'code' in err) {
        const authError = err as AuthError;
        switch (authError.code) {
            case 'auth/user-not-found':
            case 'auth/wrong-password':
            case 'auth/invalid-credential':
                setError('Invalid email or password.');
                break;
            case 'auth/email-already-in-use':
                setError('An account with this email already exists.');
                break;
            case 'auth/weak-password':
                setError('Password should be at least 6 characters.');
                break;
            case 'auth/operation-not-allowed':
                setError('Email/Password sign-in is not enabled. Please enable it in your Firebase console.');
                break;
            case 'auth/api-key-not-valid':
            case 'auth/invalid-api-key':
                setError('The application is misconfigured. Please check the Firebase API key.');
                break;
            default:
                setError('An unexpected error occurred. Please try again.');
        }
    } else {
        setError('An unexpected error occurred. Please try again.');
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    try {
      if (mode === 'login') {
        await login(email, password);
      } else {
        await signup(email, password);
      }
    } catch (err) {
      handleAuthError(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-slate-100 dark:bg-slate-800">
      <div className="w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-slate-900">
        <div className="px-6 py-8">
          <h2 className="text-3xl font-bold text-center text-green-600">
            AI Calorie Counter
          </h2>
          <p className="mt-1 text-center text-slate-500 dark:text-slate-400">
            {mode === 'login' ? 'Welcome back' : 'Create your account'}
          </p>
          <form onSubmit={handleSubmit}>
            <div className="w-full mt-4">
              <Input
                id="email"
                type="email"
                label="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            <div className="w-full mt-4">
              <Input
                id="password"
                type="password"
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            {error && <p className="mt-3 text-sm text-center text-red-500">{error}</p>}
            <div className="mt-6">
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Loading...' : mode === 'login' ? 'Sign In' : 'Sign Up'}
              </Button>
            </div>
          </form>
          <div className="flex items-center justify-between mt-4">
            <span className="w-1/5 border-b dark:border-slate-600 lg:w-1/4"></span>
            <button
              onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
              className="text-xs text-center text-slate-500 uppercase dark:text-slate-400 hover:underline"
            >
              {mode === 'login'
                ? "Don't have an account? Sign up"
                : 'Already have an account? Sign in'}
            </button>
            <span className="w-1/5 border-b dark:border-slate-600 lg:w-1/4"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;