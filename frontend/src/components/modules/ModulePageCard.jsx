// ModulePageCard.jsx - Enhanced version
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { BookOpen, Play, Code, CheckCircle, Clock } from 'lucide-react'

const ModulePageCard = ({ number, module, courseId, onProgressUpdate, onClick }) => {
  const navigate = useNavigate()

  // Safe completion check with default values
  const getCompletionStatus = () => {
    if (!module.completion) {
      return { completed: 0, total: 3 }
    }
    
    const completedCount = Object.values(module.completion).filter(Boolean).length
    const totalCount = Object.values(module.completion).length
    return { completed: completedCount, total: totalCount }
  }

  const handleContentClick = (e) => {
    e.stopPropagation()
    navigate(`/courses/${courseId}/${module._id}/learn`)
    // Mark as completed when user visits content
    if (onProgressUpdate) {
      onProgressUpdate(module.id, 'content', true)
    }
  }

  const handleVideoClick = (e) => {
    e.stopPropagation()
    navigate(`/courses/${courseId}/modules/${module.id}/video`)
    // Mark as completed when user visits video
    if (onProgressUpdate) {
      onProgressUpdate(module.id, 'video', true)
    }
  }

  const handleLabClick = (e) => {
    e.stopPropagation()
    // Lab functionality will be implemented later
    console.log('Lab functionality coming soon')
  }

  // Safe completion status with defaults
  const { completed, total } = getCompletionStatus()

  // Safe completion checks for individual types
  const isContentCompleted = module.completion?.content || false
  const isVideoCompleted = module.completion?.video || false
  const isLabCompleted = module.completion?.lab || false

  // Dynamic button colors based on completion
  const getContentButtonStyle = () => {
    return isContentCompleted 
      ? 'bg-green-500/20 text-green-400 border border-green-500/30 hover:bg-green-500/30'
      : 'bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 border border-blue-500/30'
  }

  const getVideoButtonStyle = () => {
    return isVideoCompleted 
      ? 'bg-green-500/20 text-green-400 border border-green-500/30 hover:bg-green-500/30'
      : 'bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 border border-blue-500/30'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      onClick={onClick}
      className="bg-gray-800/50 backdrop-blur-sm mb-4 rounded-2xl border border-gray-700 overflow-hidden hover:border-cyan-500/50 transition-all duration-300 cursor-pointer"
    >
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Left Side - Module Information (70%) */}
          <div className="flex-1 md:flex-[70%]">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                {number + 1}
              </div>
              <h3 className="text-xl font-bold text-white">{module.title || 'Untitled Module'}</h3>
              {completed === total && total > 0 && (
                <div className="flex items-center gap-1 text-green-400 text-sm">
                  <CheckCircle className="w-4 h-4" />
                  <span>Completed</span>
                </div>
              )}
            </div>
            
            <p className="text-gray-300 text-sm pl-11 mb-3">
              {module.description || 'Module description not available'}
            </p>
            
            {/* Progress Bar */}
            <div className="pl-11 mb-4">
              <div className="flex items-center justify-between text-sm text-gray-400 mb-2">
                <span>Progress</span>
                <span>{completed}/{total} completed</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${(completed / total) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Right Side - Action Buttons (30%) */}
          <div className="md:w-[30%]">
            <div className="flex flex-col sm:flex-row md:flex-col gap-2">
              {/* Content Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleContentClick}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium text-sm transition-all ${getContentButtonStyle()}`}
              >
                <BookOpen className="w-4 h-4" />
                Content
                {isContentCompleted && (
                  <CheckCircle className="w-4 h-4" />
                )}
              </motion.button>

        

              {/* Lab Button - Disabled for now */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLabClick}
                className="flex items-center gap-2 px-4 py-3 rounded-xl font-medium text-sm bg-gray-700/50 text-gray-400 border border-gray-600 cursor-not-allowed"
                disabled
              >
                <Code className="w-4 h-4" />
                Lab
                <span className="text-xs text-yellow-400">Soon</span>
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default ModulePageCard