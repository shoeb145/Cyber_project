import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Shield, BookOpen, FlaskConical, Users, Trophy, Settings, LogOut, Zap, Target } from 'lucide-react'

const Sidebar = ({ user, stats }) => {
  const navigate = useNavigate()
  const location = useLocation()

  const navigationItems = [
    { icon: Shield, label: 'Dashboard', path: '/dashboard' },
    { icon: BookOpen, label: 'Modules', path: '/modules' },
    { icon: FlaskConical, label: 'Practice Labs', path: '/labs' },
    { icon: Users, label: 'Community', path: '/community' },
    // { icon: Trophy, label: 'Achievements', path: '/achievements' },
    // { icon: Settings, label: 'Settings', path: '/settings' }
  ]

  const quickActions = [
    { icon: Zap, label: 'Quick Lab', path: '/labs/quick' },
    { icon: Target, label: 'Daily Challenge', path: '/challenge' }
  ]

  const isActive = (path) => {
    return location.pathname === path
  }

  const handleNavigation = (path) => {
    navigate(path)
  }

  const handleLogout = () => {
    // Logout logic here
    navigate('/login')
  }

  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-80 bg-gradient-to-b from-gray-900 to-gray-800 border-r border-cyan-500/20 flex flex-col h-screen relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_24%,rgba(6,182,212,0.1)_25%,rgba(6,182,212,0.1)_26%,transparent_27%,transparent_74%,rgba(6,182,212,0.1)_75%,rgba(6,182,212,0.1)_76%,transparent_77%),linear-gradient(0deg,transparent_24%,rgba(6,182,212,0.1)_25%,rgba(6,182,212,0.1)_26%,transparent_27%,transparent_74%,rgba(6,182,212,0.1)_75%,rgba(6,182,212,0.1)_76%,transparent_77%)] bg-[length:40px_40px]" />
      </div>

      {/* Animated Background Elements */}
      <div className="absolute top-10 right-10 w-20 h-20 bg-cyan-500/10 rounded-full blur-xl"></div>
      <div className="absolute bottom-20 left-10 w-16 h-16 bg-blue-500/10 rounded-full blur-lg"></div>

      <div className="relative z-10 flex flex-col h-full">
        {/* User Profile Section */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="p-6 border-b border-cyan-500/20 bg-gradient-to-r from-cyan-500/5 to-blue-500/5"
        >
          <div className="flex items-center gap-4 mb-4">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="relative"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-cyan-500/25">
                {user?.name?.charAt(0) || 'A'}
              </div>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-2 border-gray-900 rounded-full"></div>
            </motion.div>
            
            <div className="flex-1 min-w-0">
              <motion.h3 
                className="font-bold text-white truncate text-lg"
                whileHover={{ color: "#22d3ee" }}
              >
                {user?.name || 'Atiq Shaikh'}
              </motion.h3>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-cyan-400 text-sm font-medium">Online</span>
              </div>
            </div>
          </div>

          {/* User Stats */}
          <div className="grid grid-cols-2 gap-3 mt-4">
            <div className="text-center p-2 bg-gray-800/50 rounded-lg backdrop-blur-sm">
              <div className="text-cyan-400 font-bold text-lg">{stats?.flagsCaptured || 0}</div>
              <div className="text-gray-400 text-xs">Flags</div>
            </div>
            <div className="text-center p-2 bg-gray-800/50 rounded-lg backdrop-blur-sm">
              <div className="text-green-400 font-bold text-lg">{stats?.labsMastered || 0}</div>
              <div className="text-gray-400 text-xs">Labs</div>
            </div>
          </div>
        </motion.div>

        {/* Quick Actions
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="p-4"
        >
          <h4 className="text-gray-400 text-sm font-semibold mb-3 px-2">QUICK ACTIONS</h4>
          <div className="space-y-2">
            {quickActions.map((action, index) => {
              const Icon = action.icon
              return (
                <motion.button
                  key={action.label}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  whileHover={{ x: 4, backgroundColor: "rgba(6, 182, 212, 0.1)" }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all duration-200 group"
                  onClick={() => handleNavigation(action.path)}
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-xl flex items-center justify-center group-hover:from-cyan-500/30 group-hover:to-blue-500/30 transition-colors">
                    <Icon className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <div className="font-medium text-white group-hover:text-cyan-400 transition-colors">
                      {action.label}
                    </div>
                    <div className="text-gray-400 text-xs">Instant access</div>
                  </div>
                </motion.button>
              )
            })}
          </div>
        </motion.div> */}

        {/* Main Navigation */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex-1 p-4"
        >
          <h4 className="text-gray-400 text-sm font-semibold mb-3 px-2">NAVIGATION</h4>
          <nav className="space-y-1">
            {navigationItems.map((item, index) => {
              const Icon = item.icon
              const active = isActive(item.path)
              
              return (
                <motion.button
                  key={item.label}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all duration-300 group relative ${
                    active
                      ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400 border-r-2 border-cyan-400 shadow-lg shadow-cyan-500/10'
                      : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                  }`}
                  onClick={() => handleNavigation(item.path)}
                >
                  {/* Animated background for active state */}
                  {active && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-xl"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors relative z-10 ${
                    active 
                      ? 'bg-cyan-500/20' 
                      : 'bg-gray-800/50 group-hover:bg-cyan-500/10'
                  }`}>
                    <Icon className={`w-5 h-5 ${active ? 'text-cyan-400' : 'text-gray-400 group-hover:text-cyan-400'}`} />
                  </div>
                  
                  <span className={`font-medium relative z-10 ${active ? 'text-cyan-400' : ''}`}>
                    {item.label}
                  </span>

                  {/* Hover effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"
                    whileHover={{ opacity: 1 }}
                  />
                </motion.button>
              )
            })}
          </nav>
        </motion.div>

        {/* Progress Section */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="p-4 border-t border-cyan-500/20 bg-gradient-to-t from-gray-800 to-transparent"
        >
          <div className="mb-4 flex justify-between items-center">
            <span className="text-gray-300 text-sm font-medium">Learning Progress</span>
            <span className="text-cyan-400 font-bold">
              {stats ? Math.round((stats.modulesCompleted / 12) * 100) : 0}%
            </span>
          </div>
          
          {/* Animated Progress Bar */}
          <div className="w-full bg-gray-700/50 rounded-full h-3 backdrop-blur-sm overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${stats ? Math.round((stats.modulesCompleted / 12) * 100) : 0}%` }}
              transition={{ duration: 1.5, ease: "easeOut", delay: 0.8 }}
              className="h-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full relative overflow-hidden"
            >
              {/* Shimmer effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={{ x: [-100, 100] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
              />
            </motion.div>
          </div>
          
          <div className="mt-2 text-xs text-gray-400 text-center">
            {stats?.modulesCompleted || 0} of 12 modules completed
          </div>

          {/* Weekly Goal
          <div className="mt-4 p-3 bg-gray-800/30 rounded-lg backdrop-blur-sm border border-gray-700/50">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-300">Weekly Goal</span>
              <span className="text-green-400 font-semibold">
                {stats?.weeklyGoal?.completed || 0}/{stats?.weeklyGoal?.total || 5} days
              </span>
            </div>
            <div className="w-full bg-gray-700/50 rounded-full h-2">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${((stats?.weeklyGoal?.completed || 0) / (stats?.weeklyGoal?.total || 5)) * 100}%` }}
                transition={{ duration: 1, delay: 1 }}
                className="h-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"
              />
            </div>
          </div> */}
        </motion.div>

        {/* Logout Button */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="p-4 border-t border-cyan-500/20"
        >
          <motion.button
            whileHover={{ x: 4, backgroundColor: "rgba(239, 68, 68, 0.1)" }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            className="w-full flex items-center gap-3 p-3 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all duration-200 group"
          >
            <div className="w-10 h-10 bg-red-500/20 rounded-xl flex items-center justify-center group-hover:bg-red-500/30 transition-colors">
              <LogOut className="w-5 h-5" />
            </div>
            <span className="font-medium">Log Out</span>
          </motion.button>
        </motion.div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gray-900 to-transparent pointer-events-none"></div>
    </motion.div>
  )
}

export default Sidebar