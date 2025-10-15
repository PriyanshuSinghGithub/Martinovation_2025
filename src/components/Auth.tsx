import { useState, FormEvent } from 'react';
import { Mail, Lock, User, ArrowRight, Sparkles } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface AuthProps {
  onSuccess?: () => void;
}

const Auth = ({ onSuccess }: AuthProps) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  const { signIn, signUp } = useAuth();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setError('');
    setSuccess('');
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await signIn(email, password);
        if (error) {
          setError(error.message);
        } else {
          setSuccess('Successfully logged in!');
          if (onSuccess) onSuccess();
        }
      } else {
        if (!fullName.trim()) {
          setError('Please enter your full name');
          setLoading(false);
          return;
        }
        const { error } = await signUp(email, password, fullName);
        if (error) {
          setError(error.message);
        } else {
          setSuccess('Account created successfully! You can now log in.');
          setIsLogin(true);
        }
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A2540] via-[#0F1B2D] to-[#1A0B2E] flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00D4FF] rounded-full opacity-5 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#7B2CBF] rounded-full opacity-5 blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative w-full max-w-md">
        <div className="bg-[#0A1A2A]/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-[#1A334B] overflow-hidden">
          <div className="p-8 md:p-10">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#00D4FF] to-[#7B2CBF] rounded-2xl mb-4">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-extrabold text-white mb-2">
                {isLogin ? 'Welcome Back' : 'Join TechFest 2025'}
              </h2>
              <p className="text-gray-400">
                {isLogin ? 'Sign in to access your account' : 'Create an account to get started'}
              </p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-900/30 border border-red-700/50 rounded-xl text-red-300 text-sm">
                {error}
              </div>
            )}

            {success && (
              <div className="mb-6 p-4 bg-green-900/30 border border-green-700/50 rounded-xl text-green-300 text-sm">
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {!isLogin && (
                <div>
                  <label className="block text-gray-300 font-semibold mb-2 text-sm">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full pl-12 pr-4 py-3.5 bg-[#1A334B] border border-[#2A4058] rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-[#00D4FF] focus:border-[#00D4FF] transition-all outline-none"
                      placeholder="Enter your full name"
                      required={!isLogin}
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-gray-300 font-semibold mb-2 text-sm">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 bg-[#1A334B] border border-[#2A4058] rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-[#00D4FF] focus:border-[#00D4FF] transition-all outline-none"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-300 font-semibold mb-2 text-sm">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 bg-[#1A334B] border border-[#2A4058] rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-[#00D4FF] focus:border-[#00D4FF] transition-all outline-none"
                    placeholder={isLogin ? "Enter your password" : "Create a password (min 6 characters)"}
                    required
                    minLength={6}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-gradient-to-r from-[#00D4FF] to-[#7B2CBF] rounded-xl font-bold text-white shadow-lg hover:shadow-[0_0_30px_rgba(0,212,255,0.4)] hover:scale-[1.02] transition-all duration-300 transform flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  'Processing...'
                ) : (
                  <>
                    {isLogin ? 'Sign In' : 'Create Account'}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 text-center">
              <button
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError('');
                  setSuccess('');
                }}
                className="text-[#00D4FF] hover:text-[#7B2CBF] font-semibold transition-colors"
              >
                {isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Sign In'}
              </button>
            </div>
          </div>
        </div>

        <p className="text-center text-gray-500 text-sm mt-6">
          Secure authentication powered by Supabase
        </p>
      </div>
    </div>
  );
};

export default Auth;
