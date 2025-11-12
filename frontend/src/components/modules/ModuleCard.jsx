// src/components/modules/ModuleCard.jsx
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { BookOpen, Play, Code, CheckCircle, Clock } from 'lucide-react'

const ModuleCard = ({ module, showProgress = false, showActions = true }) => {
  const navigate = useNavigate()
  
  const getBadgeColor = (badge) => {
    switch (badge) {
      case 'Beginner Friendly':
        return 'from-green-500 to-emerald-400'
      case 'Most Popular':
        return 'from-cyan-500 to-blue-500'
      case 'Career Track':
        return 'from-purple-500 to-pink-500'
      default:
        return 'from-gray-500 to-gray-600'
    }
  }

  const getBadgeIcon = (badge) => {
    switch (badge) {
      case 'Beginner Friendly':
        return <Zap className="w-3 h-3" />
      case 'Most Popular':
        return <TrendingUp className="w-3 h-3" />
      case 'Career Track':
        return <Play className="w-3 h-3" />
      default:
        return <Zap className="w-3 h-3" />
    }
  }

  const handleStartLearning = () => {
    navigate(`/module/${module.id}`)
  }

  const handlePreview = () => {
    console.log('Preview module:', module.id)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700 overflow-hidden hover:border-cyan-500/50 transition-all duration-300"
    >
      {/* Gradient Border Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl opacity-0 group-hover:opacity-5 transition-opacity duration-300" />
      
      {/* Shine Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />

      <div className="p-6 flex-1 relative z-10">
        {/* Header with Badge */}
        <div className="flex justify-between items-start mb-4">
          <motion.span 
            className={`px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r ${getBadgeColor(module.badge)} text-white shadow-lg flex items-center gap-1.5`}
            whileHover={{ scale: 1.05 }}
          >
            {getBadgeIcon(module.badge)}
            {module.badge}
          </motion.span>
          
          {module.isNew && (
            <span className="px-2 py-1 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full text-xs font-semibold shadow-lg">
              NEW
            </span>
          )}
        </div>

        {/* Title and Description */}
        <h3 className="font-bold text-xl mb-3 text-white group-hover:text-cyan-400 transition-colors">
          {module.title}
        </h3>
        <p className="text-gray-300 text-sm mb-6 leading-relaxed">
          {module.description}
        </p>

        {/* Duration */}
        <div className="flex items-center gap-2 text-sm text-cyan-400 mb-6">
          <Clock className="w-4 h-4" />
          <span>{module.duration}</span>
        </div>

        {/* Progress Bar */}
        {showProgress && (
          <div className="mb-6">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-300">Progress</span>
              <span className="font-semibold text-cyan-400">{module.progress}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
              <motion.div 
                className="bg-gradient-to-r from-cyan-500 to-blue-600 h-2 rounded-full shadow-lg shadow-cyan-500/25"
                initial={{ width: 0 }}
                animate={{ width: `${module.progress}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>
          </div>
        )}

        {/* Topics */}
        <div className="mb-2">
          <div className="flex flex-wrap gap-2">
            {module.topics.slice(0, 3).map((topic, index) => (
              <motion.span 
                key={index}
                className="px-3 py-1.5 bg-gray-700/50 backdrop-blur-sm text-gray-300 rounded-xl text-xs border border-gray-600 group-hover:border-cyan-500/30 transition-colors"
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(6, 182, 212, 0.1)' }}
              >
                {topic}
              </motion.span>
            ))}
            {module.topics.length > 3 && (
              <span className="px-3 py-1.5 bg-gray-700/50 text-gray-400 rounded-xl text-xs border border-gray-600">
                +{module.topics.length - 3} more
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Actions */}
      {showActions && (
        <div className="p-6 pt-4 bg-gray-800/30 backdrop-blur-sm border-t border-gray-700 group-hover:border-cyan-500/30 transition-colors relative z-10">
          <div className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleStartLearning}
              className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white py-3 px-4 rounded-xl font-semibold text-sm shadow-lg shadow-cyan-500/25 transition-all flex items-center justify-center gap-2"
            >
              <Play className="w-4 h-4" />
              {module.progress > 0 ? 'Continue' : 'Start Learning'}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handlePreview}
              className="px-4 py-3 border border-gray-600 hover:border-cyan-500 text-gray-300 hover:text-cyan-400 rounded-xl font-medium text-sm hover:bg-cyan-500/10 transition-all flex items-center gap-2"
            >
              <Eye className="w-4 h-4" />
              Preview
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default ModuleCard
