// src/pages/ModulePage.jsx
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Clock, Users, Target } from 'lucide-react'
import Sidebar from '../components/layout/Sidebar'
import ModulePageCard from '../components/modules/ModulePageCard'
import Card from '../components/ui/Card'

export default function ModulePage() {
  const { courseId } = useParams()
  const navigate = useNavigate()
  const [course, setCourse] = useState(null)
  const [modules, setModules] = useState([])
  const [progress, setProgress] = useState({ completed: 0, total: 0 })

  useEffect(() => {
    // TODO: fetch from GET /api/courses/${courseId}
    const mockCourse = {
      id: courseId,
      title: 'Threat Detection Fundamentals',
      description: 'Identify and analyze malware and network threats in real time — the ideal starting point for cybersecurity beginners.',
      duration: '8–10 hours',
      difficulty: 'Beginner',
      rating: 4.9,
      students: 1250,
      progress: 25
    }
    setCourse(mockCourse)
  }, [courseId])

  useEffect(() => {
    // TODO: fetch from GET /api/courses/${courseId}/modules
    const mockModules = [
      {
        id: 'foundation',
        title: 'Foundation',
        description: 'Introduction to threat detection concepts and tools',
        duration: '45 min',
        number: 1,
        completion: {
          content: true,
          video: false,
          lab: false
        }
      },
      {
        id: 'network-security',
        title: 'Network Security',
        description: 'Network monitoring and intrusion detection',
        duration: '1 hour',
        number: 2,
        completion: {
          content: false,
          video: false,
          lab: false
        }
      },
      {
        id: 'linux-hardening',
        title: 'Linux Hardening',
        description: 'Securing Linux systems and services',
        duration: '1.5 hours',
        number: 3,
        completion: {
          content: false,
          video: false,
          lab: false
        }
      },
      {
        id: 'web-app-security',
        title: 'Web App Security',
        description: 'OWASP Top 10 and web application defenses',
        duration: '2 hours',
        number: 4,
        completion: {
          content: false,
          video: false,
          lab: false
        }
      },
      {
        id: 'cryptography',
        title: 'Cryptography Basics',
        description: 'Encryption and cryptographic protocols',
        duration: '1 hour',
        number: 5,
        completion: {
          content: false,
          video: false,
          lab: false
        }
      },
      {
        id: 'threat-modeling',
        title: 'Threat Modeling',
        description: 'Identifying and prioritizing potential threats',
        duration: '1.5 hours',
        number: 6,
        completion: {
          content: false,
          video: false,
          lab: false
        }
      }
    ].map(module => ({
      ...module,
      completion: module.completion || { content: false, video: false, lab: false }
    }))
    
    setModules(mockModules)
    
    // Calculate progress
    const completed = mockModules.filter(m => 
      m.completion?.content && m.completion?.video && m.completion?.lab
    ).length
    setProgress({ completed, total: mockModules.length })
  }, [courseId])

  const updateModuleProgress = (moduleId, type, completed) => {
    // TODO: POST /api/courses/${courseId}/modules/${moduleId}/progress
    setModules(prev => prev.map(m => 
      m.id === moduleId 
        ? { 
            ...m, 
            completion: { 
              ...(m.completion || { content: false, video: false, lab: false }), 
              [type]: completed 
            } 
          }
        : m
    ))

    // Update overall progress
    setProgress(prev => {
      const updatedModules = modules.map(m => 
        m.id === moduleId 
          ? { 
              ...m, 
              completion: { 
                ...(m.completion || { content: false, video: false, lab: false }), 
                [type]: completed 
              } 
            }
          : m
      )
      const newCompleted = updatedModules.filter(m => 
        m.completion?.content && m.completion?.video && m.completion?.lab
      ).length
      return { completed: newCompleted, total: prev.total }
    })
  }

  if (!course || modules.length === 0) {
    return (
      <div className="flex min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <Sidebar />
        <main className="flex-1 p-6 flex items-center justify-center">
          <div className="text-white text-xl">Loading...</div>
        </main>
      </div>
    )
  }

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
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-8">
            <div className="flex-1">
              <motion.h1 
                className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                {course.title}
              </motion.h1>
              <motion.p 
                className="text-gray-400 text-lg mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {course.description}
              </motion.p>
              
              {/* Progress Bar */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex items-center gap-4"
              >
                <div className="flex-1 bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${(progress.completed / progress.total) * 100}%` }}
                  />
                </div>
                <span className="text-sm text-gray-300 whitespace-nowrap">
                  {progress.completed} of {progress.total} modules completed
                </span>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Main Content Area */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Module List - 2/3 width */}
          <div className="flex-1 lg:w-2/3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <h2 className="text-2xl font-bold text-white mb-6">Course Modules</h2>
              
              {modules.map((module, index) => (
                <ModulePageCard 
                  key={module.id}
                  module={module}
                  courseId={courseId}
                  onProgressUpdate={updateModuleProgress}
                />
              ))}
            </motion.div>
          </div>

          {/* Sidebar - 1/3 width */}
          <div className="lg:w-1/3 flex-shrink-0">
            <CourseSidebar 
              course={course}
              progress={progress}
            />
          </div>
        </div>
      </main>
    </div>
  )
}

// Sidebar Component
function CourseSidebar({ course, progress }) {
  const stats = [
    { label: 'Duration', value: course.duration, icon: Clock },
    { label: 'Difficulty', value: course.difficulty, icon: Target },
    { label: 'Students', value: course.students.toLocaleString(), icon: Users },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      {/* Course Stats */}
      <Card className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50">
        <h3 className="text-lg font-semibold text-white mb-4">Course Overview</h3>
        <div className="space-y-3">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div key={stat.label} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4 text-cyan-400" />
                  <span className="text-gray-300 text-sm">{stat.label}</span>
                </div>
                <span className="text-white text-sm font-medium">{stat.value}</span>
              </div>
            )
          })}
        </div>
      </Card>

      {/* Progress */}
      <Card className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50">
        <h3 className="text-lg font-semibold text-white mb-4">Your Progress</h3>
        <div className="space-y-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-white mb-1">
              {Math.round((progress.completed / progress.total) * 100)}%
            </div>
            <div className="text-gray-400 text-sm">
              {progress.completed} of {progress.total} modules
            </div>
          </div>
          
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${(progress.completed / progress.total) * 100}%` }}
            />
          </div>
        </div>
      </Card>

      {/* Statistics */}
      <Card className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50">
        <h3 className="text-lg font-semibold text-white mb-4">Statistics</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-gray-300 text-sm">Time Spent</span>
            <span className="text-white text-sm font-medium">12h 30m</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-300 text-sm">Flags Captured</span>
            <span className="text-white text-sm font-medium">8</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-300 text-sm">Labs Mastered</span>
            <span className="text-white text-sm font-medium">3</span>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}