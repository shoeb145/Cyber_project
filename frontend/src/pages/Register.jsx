import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { motion, AnimatePresence } from 'framer-motion'
import { Eye, EyeOff, Shield, Mail, User, Phone, Lock, CheckCircle } from 'lucide-react'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import Card from '../components/ui/Card'

const inviteSchema = z.object({
  inviteCode: z.string().min(1, 'Invite code is required'),
})

const registerSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirm: z.string().min(6, 'Please confirm your password'),
  mobile: z.string().optional(),
  subscribe: z.boolean().optional(),
  terms: z.literal(true, { errorMap: () => ({ message: 'You must accept terms' }) }),
}).refine((d) => d.password === d.confirm, { 
  message: 'Passwords must match', 
  path: ['confirm'] 
})

export default function Register() {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const { register, handleSubmit, formState: { errors: inviteErrors } } = useForm({ 
    resolver: zodResolver(inviteSchema) 
  })
  
  const { 
    register: registerForm, 
    handleSubmit: handleSubmitForm, 
    formState: { errors: formErrors },
    watch 
  } = useForm({ 
    resolver: zodResolver(registerSchema) 
  })

  const password = watch('password')

  const checkInvite = async (data) => {
    setLoading(true)
    
    try {
      await new Promise(resolve => setTimeout(resolve, 800))
      
      if (data.inviteCode.trim()) {
        setStep(2)
      }
    } catch (error) {
      // In demo, we'll always succeed with any code
      setStep(2)
    } finally {
      setLoading(false)
    }
  }

  const createAccount = async (data) => {
    setLoading(true)
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1200))
      
      console.log('Registration data:', {
        ...data,
        password: '***HIDDEN***'
      })
      
      // Success - show confirmation
      setStep(3)
      
    } catch (error) {
      // In demo, we'll always succeed
      setStep(3)
    } finally {
      setLoading(false)
    }
  }

  const passwordStrength = (password) => {
    if (!password) return { strength: 0, label: 'Empty', color: 'gray' }
    
    let strength = 0
    if (password.length >= 6) strength += 1
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength += 1
    if (password.match(/\d/)) strength += 1
    if (password.match(/[^a-zA-Z\d]/)) strength += 1
    
    const strengths = [
      { strength: 0, label: 'Very Weak', color: 'red' },
      { strength: 1, label: 'Weak', color: 'orange' },
      { strength: 2, label: 'Fair', color: 'yellow' },
      { strength: 3, label: 'Good', color: 'blue' },
      { strength: 4, label: 'Strong', color: 'green' }
    ]
    
    return strengths[strength] || strengths[0]
  }

  const strength = passwordStrength(password)

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_24%,rgba(6,182,212,0.1)_25%,rgba(6,182,212,0.1)_26%,transparent_27%,transparent_74%,rgba(6,182,212,0.1)_75%,rgba(6,182,212,0.1)_76%,transparent_77%),linear-gradient(0deg,transparent_24%,rgba(6,182,212,0.1)_25%,rgba(6,182,212,0.1)_26%,transparent_27%,transparent_74%,rgba(6,182,212,0.1)_75%,rgba(6,182,212,0.1)_76%,transparent_77%)] bg-[length:50px_50px] opacity-20" />
        
        {/* Floating elements */}
        <motion.div
          animate={{ 
            y: [0, -30, 0],
            rotate: [0, 10, 0]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 left-1/4 text-6xl opacity-10"
        >
          🔐
        </motion.div>
        
        <motion.div
          animate={{ 
            y: [0, 30, 0],
            rotate: [0, -10, 0]
          }}
          transition={{ 
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3
          }}
          className="absolute bottom-1/3 right-1/4 text-5xl opacity-10"
        >
          🚀
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Demo Banner */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <Card className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border-cyan-500/20">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                <span className="text-cyan-400 font-semibold text-sm">Demo Registration</span>
              </div>
              <p className="text-cyan-300 text-sm">
                Enter any invite code and test data to register
              </p>
            </div>
          </Card>
        </motion.div>

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
                  Join CyberLearn
                </h2>
                <p className="text-gray-400 text-sm">Start your cybersecurity journey</p>
              </div>
            </div>
          </motion.div>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step-1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <form className="space-y-6" onSubmit={handleSubmit(checkInvite)}>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <Input
                      label="Invite Code"
                      placeholder="Enter your invite code (any code works for demo)"
                      {...register('inviteCode')}
                      error={inviteErrors.inviteCode?.message}
                      className="w-full"
                    />
                    <p className="text-gray-400 text-sm mt-2">
                      🔒 Invite-only access ensures quality learning experience
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <Button 
                      type="submit" 
                      className="w-full"
                      loading={loading}
                      icon="🔑"
                      size="lg"
                    >
                      {loading ? 'Checking...' : 'Continue to Registration'}
                    </Button>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="text-center"
                  >
                    <p className="text-gray-400">
                      Don't have an invite code?{' '}
                      <button 
                        type="button" 
                        className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
                      >
                        Request one here
                      </button>
                    </p>
                  </motion.div>
                </form>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step-2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <form className="space-y-6" onSubmit={handleSubmitForm(createAccount)}>
                  {/* Full Name */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <Input
                      icon={<User className="w-4 h-4" />}
                      label="Full Name"
                      placeholder="Enter your full name"
                      {...registerForm('fullName')}
                      error={formErrors.fullName?.message}
                      className="w-full"
                    />
                  </motion.div>

                  {/* Email */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <Input
                      icon={<Mail className="w-4 h-4" />}
                      label="Email Address"
                      type="email"
                      placeholder="Enter your email address"
                      {...registerForm('email')}
                      error={formErrors.email?.message}
                      className="w-full"
                    />
                  </motion.div>

                  {/* Password */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <Input
                      icon={<Lock className="w-4 h-4" />}
                      label="Password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Create a strong password"
                      {...registerForm('password')}
                      error={formErrors.password?.message}
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

                    {/* Password Strength */}
                    {password && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-3"
                      >
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-gray-400">Password strength</span>
                          <span className={`${
                            strength.color === 'green' ? 'text-green-400' :
                            strength.color === 'blue' ? 'text-blue-400' :
                            strength.color === 'yellow' ? 'text-yellow-400' :
                            strength.color === 'orange' ? 'text-orange-400' :
                            'text-red-400'
                          } font-medium`}>
                            {strength.label}
                          </span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full transition-all duration-500 ${
                              strength.color === 'green' ? 'bg-green-500' :
                              strength.color === 'blue' ? 'bg-blue-500' :
                              strength.color === 'yellow' ? 'bg-yellow-500' :
                              strength.color === 'orange' ? 'bg-orange-500' :
                              'bg-red-500'
                            }`}
                            style={{ width: `${(strength.strength / 4) * 100}%` }}
                          />
                        </div>
                      </motion.div>
                    )}
                  </motion.div>

                  {/* Confirm Password */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                  >
                    <Input
                      icon={<Lock className="w-4 h-4" />}
                      label="Confirm Password"
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="Confirm your password"
                      {...registerForm('confirm')}
                      error={formErrors.confirm?.message}
                      className="w-full"
                      endAdornment={
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="text-gray-400 hover:text-cyan-400 transition-colors"
                        >
                          {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      }
                    />
                  </motion.div>

                  {/* Mobile (Optional) */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                  >
                    <Input
                      icon={<Phone className="w-4 h-4" />}
                      label="Mobile Number (Optional)"
                      placeholder="Enter your mobile number"
                      {...registerForm('mobile')}
                      className="w-full"
                    />
                  </motion.div>

                  {/* Checkboxes */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                    className="space-y-4"
                  >
                    <label className="flex items-start gap-3 text-sm text-gray-300 cursor-pointer">
                      <input 
                        type="checkbox" 
                        {...registerForm('subscribe')} 
                        className="rounded border-gray-600 bg-gray-700 text-cyan-500 focus:ring-cyan-500 focus:ring-offset-gray-800 mt-0.5"
                      />
                      <span>
                        Subscribe for security tips, course updates, and community news
                        <span className="text-cyan-400 block text-xs mt-1">
                          Get the latest cybersecurity insights delivered to your inbox
                        </span>
                      </span>
                    </label>
                    
                    <label className="flex items-start gap-3 text-sm text-gray-300 cursor-pointer">
                      <input 
                        type="checkbox" 
                        {...registerForm('terms')} 
                        className="rounded border-gray-600 bg-gray-700 text-cyan-500 focus:ring-cyan-500 focus:ring-offset-gray-800 mt-0.5"
                      />
                      <span>
                        I agree to the{' '}
                        <button type="button" className="text-cyan-400 hover:text-cyan-300">
                          Terms of Service
                        </button>{' '}
                        and{' '}
                        <button type="button" className="text-cyan-400 hover:text-cyan-300">
                          Privacy Policy
                        </button>
                        {formErrors.terms && (
                          <span className="text-red-400 block text-xs mt-1">
                            {formErrors.terms.message}
                          </span>
                        )}
                      </span>
                    </label>
                  </motion.div>

                  {/* Submit Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                  >
                    <Button 
                      type="submit" 
                      className="w-full"
                      loading={loading}
                      icon="🚀"
                      size="lg"
                    >
                      {loading ? 'Creating Account...' : 'Create My Account'}
                    </Button>
                  </motion.div>

                  {/* Login Link */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.1 }}
                    className="text-center"
                  >
                    <p className="text-gray-400">
                      Already have an account?{' '}
                      <a 
                        href="/login" 
                        className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
                      >
                        Sign in here
                      </a>
                    </p>
                  </motion.div>
                </form>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step-3"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                className="text-center py-8"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ 
                    type: "spring",
                    stiffness: 200,
                    damping: 15,
                    delay: 0.2
                  }}
                  className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6"
                >
                  <CheckCircle className="w-10 h-10 text-white" />
                </motion.div>
                
                <h3 className="text-2xl font-bold text-white mb-4">
                  Welcome to CyberLearn Pro!
                </h3>
                
                <p className="text-gray-300 mb-6 leading-relaxed">
                  Your account has been successfully created. We've sent a confirmation email 
                  to your inbox. Get ready to start your cybersecurity journey with hands-on 
                  labs and real-world challenges.
                </p>

                <div className="space-y-4 mb-8">
                  {[
                    '🔐 Access to all beginner modules',
                    '🛡️ Hands-on practice labs',
                    '👥 Join the community forum',
                    '📚 Personalized learning path'
                  ].map((feature, index) => (
                    <motion.div
                      key={feature}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      className="flex items-center gap-3 text-gray-300 text-left"
                    >
                      <div className="w-6 h-6 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                      </div>
                      <span>{feature}</span>
                    </motion.div>
                  ))}
                </div>

                <Button
                  onClick={() => window.location.href = '/dashboard'}
                  className="w-full"
                  icon="🎯"
                  size="lg"
                >
                  Start Learning Journey
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>

        {/* Security Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-6 text-center"
        >
          <p className="text-gray-500 text-sm flex items-center justify-center gap-2">
            <Shield className="w-4 h-4" />
            Enterprise-grade security & privacy protection
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}