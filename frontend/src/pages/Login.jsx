import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Eye, EyeOff, Shield, Lock, Mail } from 'lucide-react'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import Card from '../components/ui/Card'
import axios from 'axios'
import toast from 'react-hot-toast'

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password is required'),
  remember: z.boolean().optional(),
})

export default function Login() {
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const { register, handleSubmit,setValue, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { 
      email: '', 
      password: '', 
      remember: true 
    },
  })



  const onSubmit = async (data) => {
    setLoading(true)
    
    try {
         const response = await axios.post(
        "http://localhost:5001/api/auth/sign-in",
        data,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(response,"this is response")
    if (response.data.success) {
       toast.success("✅ Login successful! Redirecting...");

       navigate("/dashboard");
      }
    } catch (error) {
      
    toast.error(error.response?.data?.message || "Something went wrong");
    setValue("email","")
    setValue("password","")
    
    } finally {
      setLoading(false)
    }
  }
  

  return (
    <div className="min-h-screen py-4  flex items-center justify-center px-4 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute  inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_24%,rgba(6,182,212,0.1)_25%,rgba(6,182,212,0.1)_26%,transparent_27%,transparent_74%,rgba(6,182,212,0.1)_75%,rgba(6,182,212,0.1)_76%,transparent_77%),linear-gradient(0deg,transparent_24%,rgba(6,182,212,0.1)_25%,rgba(6,182,212,0.1)_26%,transparent_27%,transparent_74%,rgba(6,182,212,0.1)_75%,rgba(6,182,212,0.1)_76%,transparent_77%)] bg-[length:50px_50px] opacity-20" />
        
        {/* Floating elements */}
        <motion.div
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ 
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-20 left-10 text-6xl opacity-10"
        >
          🛡️
        </motion.div>
        
        <motion.div
          animate={{ 
            y: [0, 20, 0],
            rotate: [0, -5, 0]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute bottom-20 right-10 text-4xl opacity-10"
        >
          🔒
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md relative z-10"
      >
       

        <Card gradient={true} className="backdrop-blur-xl border-cyan-500/20">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center mb-8"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  CyberLearn Pro
                </h2>
                <p className="text-gray-400 text-sm">Secure Learning Platform</p>
              </div>
            </div>
            
            <h1 className="text-2xl font-bold text-white mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-400">
              Good to see you again – let's continue your cybersecurity journey!
            </p>
          </motion.div>

          {/* Demo Accounts Quick Access */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-6"
          >
            
          </motion.div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email Field */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Input
                icon={<Mail className="w-4 h-4" />}
                label="Email Address"
                 id="email"
                  name="email"
                  type="email"
               
            
                placeholder="Enter your email address"
                {...register('email')}
                error={errors.email?.message}
                className="w-full"
              />
            </motion.div>

            {/* Password Field */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Input
                icon={<Lock className="w-4 h-4" />}
                label="Password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                {...register('password')}
                error={errors.password?.message}
                className="w-full"
                endAdornment={
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-400 hover:text-cyan-400 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                }
              />
            </motion.div>

            {/* Remember Me & Forgot Password */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex items-center justify-between"
            >
             
              
              <button 
                type="button" 
                className="text-cyan-400 hover:text-cyan-300 text-sm font-medium transition-colors"
              >
                Forgot password?
              </button>
            </motion.div>

            {/* Submit Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <Button 
                type="submit" 
                className="w-full"
                loading={loading}
                icon="🚀"
                size="lg"
              >
                {loading ? 'Signing In...' : 'Sign In to Your Account'}
              </Button>
            </motion.div>

            {/* Divider */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="relative my-6"
            >
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-3 bg-gray-800 text-gray-400">Or continue with</span>
              </div>
            </motion.div>

            {/* OAuth Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="flex gap-3"
            >
              <Button
                type="button"
                variant="secondary"
                className="flex-1"
                icon="🔗"
                onClick={() => console.log('Google OAuth')}
              >
                Google
              </Button>
              <Button
                type="button"
                variant="secondary"
                className="flex-1"
                icon="💻"
                onClick={() => console.log('GitHub OAuth')}
              >
                GitHub
              </Button>
            </motion.div>

            {/* Sign Up Link */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="text-center"
            >
              <p className="text-gray-400">
                Don't have an account?{' '}
              <Link
    to="/register"
                  className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
                >
                  Sign up here
                </Link>
              </p>
            </motion.div>
          </form>
        </Card>

        {/* Security Notice */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-6 text-center"
        >
          <p className="text-gray-500 text-sm flex items-center justify-center gap-2">
            <Shield className="w-4 h-4" />
            Your data is securely encrypted and protected
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}