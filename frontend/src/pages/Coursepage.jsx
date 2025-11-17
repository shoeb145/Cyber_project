import React, { useEffect, useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Filter, Star, Clock, Users, TrendingUp, BookOpen, Target } from 'lucide-react'
import Sidebar from '../components/layout/Sidebar'
import ModuleCard from '../components/modules/ModuleCard'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import axios from 'axios'

/* ============================
   Helper utility functions
   ============================ */

const safeString = (val) => (typeof val === 'string' ? val : '')
const safeNumber = (val, fallback = 0) => (typeof val === 'number' ? val : fallback)
const asArrayOfStrings = (val) => {
  if (!val) return []
  if (Array.isArray(val)) {
    return val
      .map(v => (typeof v === 'string' ? v : (v?.name ?? v?.title ?? String(v) ?? '')))
      .filter(Boolean)
  }
  if (typeof val === 'string') {
    return val.split(',').map(s => s.trim()).filter(Boolean)
  }
  return []
}
const parseDate = (val) => {
  if (!val && val !== 0) return null
  if (typeof val === 'number') {
    const d = new Date(val)
    return isNaN(d.getTime()) ? null : d
  }
  const d = new Date(val)
  return isNaN(d.getTime()) ? null : d
}
const isWithinDays = (date, days = 30) => {
  if (!date) return false
  const now = Date.now()
  return now - date.getTime() <= days * 24 * 60 * 60 * 1000
}

/* ============================
   ModulesPage component
   ============================ */

export default function ModulesPage({ user }) {
  const [modulesRaw, setModulesRaw] = useState([])
  const [filter, setFilter] = useState('All')
  const [sort, setSort] = useState('Popular')
  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [progress, setProgress] = useState({ completed: 3, total: 12 })
  const [viewMode, setViewMode] = useState('grid')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(searchTerm.trim()), 300)
    return () => clearTimeout(t)
  }, [searchTerm])

  useEffect(() => {
    let cancelled = false

    const fetchData = async () => {
      setLoading(true)
      setError(null)
      try {
        const res = await axios.get('http://localhost:5001/api/courses', {
          withCredentials: true,
        })

        const rawList = res?.data?.course ?? res?.data?.courses ?? res?.data ?? []

        if (!Array.isArray(rawList)) {
          console.warn('courses response is not an array — adapt normalization if needed', rawList)
        }

        const normalized = (Array.isArray(rawList) ? rawList : []).map((c, index) => {
          const id = c?.id ?? c?._id ?? c?.courseId ?? `no-id-${index}`
          const title = safeString(c?.title ?? c?.name ?? c?.courseName)
          const description = safeString(c?.description ?? c?.summary ?? '')
          const topics = asArrayOfStrings(c?.topics ?? c?.tags ?? c?.categories ?? c?.skillTags)

          // ---- KEY CHANGE: prefer complexity field when present ----
          // Backend examples show: complexity: "Fundamental" | "Medium" | "Hard"
          // We normalize to the same UI labels; fallback to difficulty/badge if complexity missing.
          const complexityRaw = safeString(c?.complexity ?? c?.difficulty ?? c?.badge ?? c?.level ?? 'Fundamental').toLowerCase()

          const complexity =
            complexityRaw === 'beginner' ? 'Fundamental' : // in case backend still uses these old words
            complexityRaw === 'fundamental' ? 'Fundamental' :
            complexityRaw === 'intermediate' ? 'Medium' :
            complexityRaw === 'medium' ? 'Medium' :
            complexityRaw === 'advanced' ? 'Hard' :
            complexityRaw === 'hard' ? 'Hard' :
            'Fundamental' // default

          const popularity = safeNumber(c?.popularity ?? c?.views ?? c?.likes ?? 0)
          const progress = safeNumber(c?.progress ?? c?.userProgress ?? 0)
          const createdAt = parseDate(c?.createdAt ?? c?.publishedAt ?? c?.created_at ?? null)
          const isNewFlag = typeof c?.isNew === 'boolean' ? c.isNew : (createdAt ? isWithinDays(createdAt, 30) : false)

          return {
            ...c,
            id,
            title,
            description,
            topics,
            // keep both fields available: complexity is authoritative; difficulty/badge kept for compatibility
            complexity,
            difficulty: complexity, // alias for older code
            badge: complexity, // alias for older code
            popularity,
            progress,
            createdAt,
            isNew: isNewFlag,
          }
        })

        if (!cancelled) setModulesRaw(normalized)
      } catch (err) {
        console.error('Failed to fetch courses:', err)
        if (!cancelled) setError(err)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetchData()
    return () => { cancelled = true }
  }, [])

  /* apply filter -> sort -> search (use complexity for filter/sort) */
  const searchResults = useMemo(() => {
    const modules = Array.isArray(modulesRaw) ? modulesRaw : []

    // Filter: prefer module.complexity, fallback to badge/difficulty
    const filtered = modules.filter((m) => {
      if (filter === 'All') return true
      const comp = safeString(m.complexity ?? m.badge ?? m.difficulty ?? '')
      return comp.toLowerCase() === filter.toLowerCase()
    })

    // Sort
    const sorted = [...filtered].sort((a, b) => {
      const aComp = safeString(a.complexity ?? a.badge ?? a.difficulty)
      const bComp = safeString(b.complexity ?? b.badge ?? b.difficulty)

      switch (sort) {
        case 'Popular':
          return (b.popularity ?? 0) - (a.popularity ?? 0)

        case 'Newest': {
          const da = a.createdAt ? new Date(a.createdAt).getTime() : 0
          const db = b.createdAt ? new Date(b.createdAt).getTime() : 0
          if (db !== da) return db - da
          return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)
        }

        case 'Difficulty': {
          // use complexity order: Fundamental -> Medium -> Hard
          const difficultyOrder = { fundamental: 1, medium: 2, hard: 3 }
          return (difficultyOrder[aComp.toLowerCase()] || 99) - (difficultyOrder[bComp.toLowerCase()] || 99)
        }

        case 'Progress':
          return (b.progress ?? 0) - (a.progress ?? 0)

        default:
          return 0
      }
    })

    // Search on title, description, topics
    const q = debouncedSearch?.toLowerCase?.() ?? ''
    if (!q) return sorted

    return sorted.filter((m) => {
      const title = safeString(m.title).toLowerCase()
      const desc = safeString(m.description || m.detail || '').toLowerCase()
      const topics = Array.isArray(m.topics) ? m.topics.map(t => safeString(t).toLowerCase()) : []
      return (
        title.includes(q) ||
        desc.includes(q) ||
        topics.some(t => t.includes(q))
      )
    })
  }, [modulesRaw, filter, sort, debouncedSearch])

  const stats = [
    { label: 'Total Courses', value: String(modulesRaw.length), icon: BookOpen, color: 'blue' },
    { label: 'Completed', value: progress.completed.toString(), icon: Target, color: 'green' },
    { label: 'In Progress', value: '2', icon: TrendingUp, color: 'yellow' },
    { label: 'Hours Learned', value: '42', icon: Clock, color: 'purple' }
  ]

  // filters now show the labels you want
  const filters = ['All', 'Fundamental', 'Medium', 'Hard']
  const sortOptions = ['Popular', 'Newest', 'Difficulty', 'Progress']

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Sidebar user={user} />

      <main className="p-6 pt-[70px] md:pt-6 md:ml-80 overflow-auto">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
            <div>
              <motion.h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
                Learning Courses
              </motion.h1>
              <motion.p className="text-gray-400 text-lg" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                Master cybersecurity through hands-on modules and real-world scenarios
              </motion.p>
            </div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="flex items-center gap-4">
              <div className="flex bg-gray-800/50 rounded-xl p-1 backdrop-blur-sm border border-gray-700">
                {['grid', 'list'].map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setViewMode(mode)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      viewMode === mode ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/25' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {mode === 'grid' ? 'Grid' : 'List'}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              const colorClasses = {
                blue: 'from-blue-500 to-cyan-500',
                green: 'from-green-500 to-emerald-500',
                yellow: 'from-yellow-500 to-orange-500',
                purple: 'from-purple-500 to-pink-500'
              }
              return (
                <motion.div key={stat.label} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 + index * 0.1 }} whileHover={{ y: -5, scale: 1.02 }} className={`bg-gradient-to-br ${colorClasses[stat.color]} rounded-2xl p-6 text-white relative overflow-hidden`}>
                  <div className="absolute top-4 right-4 opacity-20"><Icon className="w-8 h-8" /></div>
                  <div className="relative z-10">
                    <div className="text-2xl font-bold mb-1">{stat.value}</div>
                    <div className="text-sm opacity-90">{stat.label}</div>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 mb-8">
            <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center">
              <div className="flex-1 w-full">
                <Input icon="🔍" placeholder="Search modules, topics, or skills..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full" />
              </div>

              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-3">
                  <Filter className="w-5 h-5 text-gray-400" />
                  <div className="flex gap-2">
                    {filters.map((filterOption) => (
                      <button key={filterOption} onClick={() => setFilter(filterOption)} className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${filter === filterOption ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/25' : 'bg-gray-700/50 text-gray-300 hover:bg-gray-700 hover:text-white'}`}>
                        {filterOption}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-gray-400 text-sm font-medium">Sort by:</span>
                  <select value={sort} onChange={(e) => setSort(e.target.value)} className="bg-gray-700/50 border border-gray-600 rounded-xl px-4 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent">
                    {sortOptions.map(option => (<option key={option} value={option}>{option}</option>))}
                  </select>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Available Courses {searchResults.length > 0 && `(${searchResults.length})`}</h2>
            <div className="text-gray-400 text-sm">Showing {searchResults.length} of {modulesRaw.length} modules</div>
          </div>

          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16 text-gray-300">Loading courses...</motion.div>
            ) : error ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16 text-red-400">Error loading courses. Check console for details.</motion.div>
            ) : searchResults.length > 0 ? (
              <motion.div key={viewMode} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className={viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" : "space-y-4"}>
                {searchResults.map((module, index) => (
                  <motion.div key={module.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.03 }} layout>
                    <ModuleCard module={module} showProgress={true} showActions={true} viewMode={viewMode} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-16">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-semibold text-gray-300 mb-4">No modules found</h3>
                <p className="text-gray-400 mb-6 max-w-md mx-auto">Try adjusting your search terms or filters to find what you're looking for.</p>
                <Button onClick={() => { setSearchTerm(''); setDebouncedSearch(''); setFilter('All') }} variant="secondary" icon="🔄">Reset Filters</Button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-2xl p-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">🎯 Personalized Learning Path</h3>
              <p className="text-gray-300 mb-4">Based on your progress, we recommend starting with Threat Detection Fundamentals to build a strong foundation.</p>
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <div className="flex items-center gap-2"><div className="w-2 h-2 bg-cyan-400 rounded-full"></div><span>Recommended for beginners</span></div>
                <div className="flex items-center gap-2"><Clock className="w-4 h-4" /><span>8-10 hours to complete</span></div>
              </div>
            </div>
            <Button size="lg" icon="🚀" className="whitespace-nowrap">Start Learning Path</Button>
          </div>
        </motion.div>
      </main>
    </div>
  )
}
