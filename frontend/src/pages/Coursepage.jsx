import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Filter, Star, Clock, Users, TrendingUp, BookOpen, Target } from 'lucide-react'
import Sidebar from '../components/layout/Sidebar'
import ModuleCard from '../components/modules/ModuleCard'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'

export default function ModulesPage() {
  const [modules, setModules] = useState([])
  const [filter, setFilter] = useState('All')
  const [sort, setSort] = useState('Popular')
  const [searchTerm, setSearchTerm] = useState('')
  const [progress, setProgress] = useState({ completed: 3, total: 12 })
  const [viewMode, setViewMode] = useState('grid') // 'grid' or 'list'

  useEffect(() => {
    // Enhanced demo data with more details
    setModules([
      { 
        id: 'm1', 
        badge: 'Beginner', 
        title: 'Threat Detection Fundamentals', 
        duration: '8–10 hours', 
        description: 'Identify and analyze malware and network threats in real time — the ideal starting point for cybersecurity beginners.', 
        topics: ['Malware analysis basics', 'Network monitoring', 'SIEM introduction', 'Incident reporting'],
        progress: 0,
        popularity: 95,
        isNew: false,
        students: 1250,
        rating: 4.9,
        image: '🛡️',
        color: 'from-blue-500 to-cyan-500'
      },
      { 
        id: 'm2', 
        badge: 'Intermediate', 
        title: 'Web Application Security', 
        duration: '12–16 hours', 
        description: 'Hands-on web app security: OWASP Top 10, Burp Suite practice, SQLi & XSS exploitation and defense.', 
        topics: ['OWASP Top 10', 'Burp Suite', 'SQL Injection', 'Cross Site Scripting'],
        progress: 65,
        popularity: 98,
        isNew: true,
        students: 890,
        rating: 4.8,
        image: '🌐',
        color: 'from-purple-500 to-pink-500'
      },
      { 
        id: 'm3', 
        badge: 'Intermediate', 
        title: 'Network Defense & SOC Ops', 
        duration: '10–14 hours', 
        description: 'Run a SOC workflow: configure firewalls, detect intrusions, and harden networks under attack.', 
        topics: ['Firewall setup', 'IDS/IPS', 'Network forensics', 'Incident response'],
        progress: 0,
        popularity: 87,
        isNew: false,
        students: 720,
        rating: 4.7,
        image: '🔒',
        color: 'from-green-500 to-emerald-500'
      },
      { 
        id: 'm4', 
        badge: 'Advanced', 
        title: 'Advanced Penetration Testing', 
        duration: '15–20 hours', 
        description: 'Master advanced exploitation techniques and post-exploitation tactics.', 
        topics: ['Advanced exploitation', 'Post-exploitation', 'Lateral movement', 'Persistence'],
        progress: 0,
        popularity: 76,
        isNew: false,
        students: 450,
        rating: 4.9,
        image: '⚔️',
        color: 'from-red-500 to-orange-500'
      },
      { 
        id: 'm5', 
        badge: 'Beginner', 
        title: 'Cybersecurity Fundamentals', 
        duration: '6–8 hours', 
        description: 'Learn the core concepts and principles of cybersecurity.', 
        topics: ['Security principles', 'Risk management', 'Cryptography basics', 'Security policies'],
        progress: 100,
        popularity: 92,
        isNew: false,
        students: 2100,
        rating: 4.6,
        image: '📚',
        color: 'from-indigo-500 to-purple-500'
      },
      { 
        id: 'm6', 
        badge: 'Intermediate', 
        title: 'Cloud Security Fundamentals', 
        duration: '10–12 hours', 
        description: 'Secure cloud infrastructure and services across major cloud platforms.', 
        topics: ['AWS security', 'Azure security', 'Cloud compliance', 'Identity management'],
        progress: 30,
        popularity: 88,
        isNew: true,
        students: 680,
        rating: 4.7,
        image: '☁️',
        color: 'from-cyan-500 to-blue-500'
      }
    ])
  }, [])

  const filteredModules = modules.filter(module => {
    if (filter === 'All') return true
    return module.badge.toLowerCase() === filter.toLowerCase()
  })

  const sortedModules = [...filteredModules].sort((a, b) => {
    switch (sort) {
      case 'Popular':
        return b.popularity - a.popularity
      case 'Newest':
        return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)
      case 'Difficulty':
        const difficultyOrder = { 'Beginner': 1, 'Intermediate': 2, 'Advanced': 3 }
        return difficultyOrder[a.badge] - difficultyOrder[b.badge]
      case 'Progress':
        return b.progress - a.progress
      default:
        return 0
    }
  })

  const searchResults = sortedModules.filter(module =>
    module.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    module.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    module.topics.some(topic => topic.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  const stats = [
    { label: 'Total Modules', value: '12', icon: BookOpen, color: 'blue' },
    { label: 'Completed', value: progress.completed.toString(), icon: Target, color: 'green' },
    { label: 'In Progress', value: '2', icon: TrendingUp, color: 'yellow' },
    { label: 'Hours Learned', value: '42', icon: Clock, color: 'purple' }
  ]

  const filters = ['All', 'Beginner', 'Intermediate', 'Advanced']
  const sortOptions = ['Popular', 'Newest', 'Difficulty', 'Progress']

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Sidebar />
      
      <main className="flex-1 p-6 overflow-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
            <div>
              <motion.h1 
                className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                Learning courses
              </motion.h1>
              <motion.p 
                className="text-gray-400 text-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Master cybersecurity through hands-on modules and real-world scenarios
              </motion.p>
            </div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-4"
            >
              {/* View Toggle */}
              <div className="flex bg-gray-800/50 rounded-xl p-1 backdrop-blur-sm border border-gray-700">
                {['grid', 'list'].map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setViewMode(mode)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      viewMode === mode
                        ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/25'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {mode === 'grid' ? 'Grid' : 'List'}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon
              const colorClasses = {
                blue: 'from-blue-500 to-cyan-500',
                green: 'from-green-500 to-emerald-500',
                yellow: 'from-yellow-500 to-orange-500',
                purple: 'from-purple-500 to-pink-500'
              }
              
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className={`bg-gradient-to-br ${colorClasses[stat.color]} rounded-2xl p-6 text-white relative overflow-hidden`}
                >
                  <div className="absolute top-4 right-4 opacity-20">
                    <Icon className="w-8 h-8" />
                  </div>
                  <div className="relative z-10">
                    <div className="text-2xl font-bold mb-1">{stat.value}</div>
                    <div className="text-sm opacity-90">{stat.label}</div>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>

          {/* Search and Filter Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 mb-8"
          >
            <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center">
              {/* Search */}
              <div className="flex-1 w-full">
                <Input
                  icon="🔍"
                  placeholder="Search modules, topics, or skills..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />
              </div>

              {/* Filters */}
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-3">
                  <Filter className="w-5 h-5 text-gray-400" />
                  <div className="flex gap-2">
                    {filters.map((filterOption) => (
                      <button
                        key={filterOption}
                        onClick={() => setFilter(filterOption)}
                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                          filter === filterOption
                            ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/25'
                            : 'bg-gray-700/50 text-gray-300 hover:bg-gray-700 hover:text-white'
                        }`}
                      >
                        {filterOption}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sort */}
                <div className="flex items-center gap-3">
                  <span className="text-gray-400 text-sm font-medium">Sort by:</span>
                  <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="bg-gray-700/50 border border-gray-600 rounded-xl px-4 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  >
                    {sortOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Modules Grid/List */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">
              Available courses {searchResults.length > 0 && `(${searchResults.length})`}
            </h2>
            <div className="text-gray-400 text-sm">
              Showing {searchResults.length} of {modules.length} modules
            </div>
          </div>

          <AnimatePresence mode="wait">
            {searchResults.length > 0 ? (
              <motion.div
                key={viewMode}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={viewMode === 'grid' 
                  ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                  : "space-y-4"
                }
              >
                {searchResults.map((module, index) => (
                  <motion.div
                    key={module.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    layout
                  >
                    <ModuleCard 
                      module={module} 
                      showProgress={true}
                      showActions={true}
                      viewMode={viewMode}
                    />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-16"
              >
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-semibold text-gray-300 mb-4">
                  No modules found
                </h3>
                <p className="text-gray-400 mb-6 max-w-md mx-auto">
                  Try adjusting your search terms or filters to find what you're looking for.
                </p>
                <Button
                  onClick={() => {
                    setSearchTerm('')
                    setFilter('All')
                  }}
                  variant="secondary"
                  icon="🔄"
                >
                  Reset Filters
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Learning Path Recommendation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-2xl p-8"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">
                🎯 Personalized Learning Path
              </h3>
              <p className="text-gray-300 mb-4">
                Based on your progress, we recommend starting with Threat Detection Fundamentals to build a strong foundation.
              </p>
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                  <span>Recommended for beginners</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>8-10 hours to complete</span>
                </div>
              </div>
            </div>
            <Button
              size="lg"
              icon="🚀"
              className="whitespace-nowrap"
            >
              Start Learning Path
            </Button>
          </div>
        </motion.div>
      </main>
    </div>
  )
}