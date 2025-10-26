'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, Lock } from 'lucide-react';
import RippleGrid from '@/components/Ripplegrid';
import ShinyText from '@/components/ShinyText';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Failed to login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* RippleGrid Background - Fixed to viewport */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        backgroundColor: '#0a0a0a'
      }}>
        <RippleGrid
          enableRainbow={false}
          gridColor="#8b5cf6"
          rippleIntensity={0.05}
          gridSize={10}
          gridThickness={15}
          mouseInteraction={true}
          mouseInteractionRadius={1.2}
          opacity={0.6}
          glowIntensity={0.2}
          vignetteStrength={1.5}
        />
      </div>

      {/* Content Overlay */}
      <div className="min-h-screen flex items-center justify-center p-4" style={{ position: 'relative', zIndex: 10, pointerEvents: 'none' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="p-8 w-full max-w-md"
          style={{ pointerEvents: 'auto' }}
        >
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-red-500/20 border border-red-500/50 text-red-200 p-3 rounded-lg text-sm"
            >
              {error}
            </motion.div>
          )}

          <div className="space-y-2">
            <ShinyText
              text="Email"
              disabled={false}
              speed={3}
              className='text-sm font-medium text-purple-300'
            />
            <div className="flex items-center border-b-2 border-white/30 focus-within:border-purple-500 transition-all duration-300">
              <Mail className="w-5 h-5 text-gray-400 mr-3" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent text-white placeholder-gray-500 py-3 outline-none"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <ShinyText
              text="Password"
              disabled={false}
              speed={3}
              className='text-sm font-medium text-purple-300'
            />
            <div className="flex items-center border-b-2 border-white/30 focus-within:border-purple-500 transition-all duration-300">
              <Lock className="w-5 h-5 text-gray-400 mr-3" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent text-white placeholder-gray-500 py-3 outline-none"
                placeholder="Minimum 8 characters"
                minLength={8}
                required
              />
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full bg-black border border-white/20 py-4 rounded-lg font-semibold hover:bg-gray-900 hover:border-white/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="text-white">Signing in...</span>
            ) : (
              <ShinyText
                text="Sign In"
                disabled={false}
                speed={3}
                className='text-base font-semibold'
              />
            )}
          </motion.button>
        </form>

        <p className="text-center mt-6 text-gray-200">
          Don't have an account?{' '}
          <Link href="/signup" className="text-purple-400 font-medium hover:underline hover:text-purple-300">
            Sign up
          </Link>
        </p>
      </motion.div>
    </div>
    </>
  );
}
