// src/pages/ModuleVideoPage.jsx
import React, { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Play, Pause, Volume2, VolumeX, CheckCircle } from 'lucide-react'
import Sidebar from '../components/layout/Sidebar'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'

import courseService from '../services/courseService'
import { useAuthStore } from '../store/useAuthStore'
import toast from 'react-hot-toast'
import { useLocation } from 'react-router-dom'
export default function ModuleVideoPage() {
  const { courseId, moduleId } = useParams()
  const navigate = useNavigate()
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isMuted, setIsMuted] = useState(false)
  const [hasCompleted, setHasCompleted] = useState(false)
  const videoRef = useRef(null)
  const location = useLocation()

  const title = location.state


  const authUser = useAuthStore((s) => s.user)
  const userId = authUser?._id || authUser?.id || null

  // Placeholder moduleData
  const moduleData = {
    id: moduleId,
    title: moduleId === 'foundation' ? 'Foundation - Threat Detection Fundamentals' : `${moduleId} - Video`,
    description: 'Introduction to threat detection concepts and tools',
    video: {
      url: '/demo-videos/foundation.mp4',
      duration: '15:30',
      transcript: `0:00 - Introduction to threat detection
2:15 - Understanding attack vectors and threat actors
5:40 - SIEM architecture and components overview
8:10 - Real-time monitoring and alerting systems
10:20 - Case study: Detecting network intrusions
12:45 - Best practices for threat detection
15:30 - Summary and next steps`
    }
  }

  useEffect(() => {
    const savedProgress = localStorage.getItem(`video-${moduleId}-progress`)
    if (savedProgress) {
      setProgress(parseFloat(savedProgress))
    }
  }, [moduleId])

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime
      const total = videoRef.current.duration || 1
      setCurrentTime(current)
      setProgress((current / total) * 100)
      localStorage.setItem(`video-${moduleId}-progress`, (current / total).toString())
      if (current / total > 0.95 && !hasCompleted) {
        setHasCompleted(true)
      }
    }
  }

  const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const percent = (e.clientX - rect.left) / rect.width
    if (videoRef.current) {
      videoRef.current.currentTime = percent * videoRef.current.duration
    }
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const goBack = () => {
    navigate(`/courses/${courseId}/${moduleId}/learn`)
  }

  // When video has completed (setHasCompleted true), call API once
  useEffect(() => {
    if (!hasCompleted) return
    let cancelled = false
    const complete = async () => {
      if (!userId) {
        // not logged in
        return
      }
      try {
        await courseService.completeLesson({
          userId,
          courseId,
          moduleId,
          lessonId: moduleId, // if you have separate lesson id, replace this
        })
        if (!cancelled) {
          toast.success('Marked lesson complete')
        }
      } catch (err) {
        console.error('Error marking video complete:', err)
        if (!cancelled) {
          const message = err?.response?.data?.message || err.message || 'Could not mark complete'
          toast.error(String(message))
        }
      }
    }
    complete()
    return () => { cancelled = true }
  }, [hasCompleted, userId, courseId, moduleId])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
   

      <main className="p-6 pt-[70px] md:pt-6 md:mx-9 overflow-auto">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <Button variant="secondary" icon={<ArrowLeft className="w-4 h-4" />} onClick={goBack} className="mb-4">
            Back to Modules
          </Button>

          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">{title}</h1>
              {/* <p className="text-gray-400 text-lg">{moduleData.description}</p> */}
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-300 bg-gray-800/50 px-3 py-2 rounded-lg">
              {hasCompleted && <CheckCircle className="w-4 h-4 text-green-400" />}
              <span>{hasCompleted ? 'Completed' : 'In Progress'}</span>
            </div>
          </div>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 lg:w-2/3">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <Card className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 p-0 overflow-hidden">
                <div className="relative bg-black aspect-video">
                  <video
                    ref={videoRef}
                    className="w-full h-full"
                    onTimeUpdate={handleTimeUpdate}
                    onLoadedMetadata={() => setDuration(videoRef.current?.duration || 0)}
                    onEnded={() => {
                      setIsPlaying(false)
                      setHasCompleted(true)
                    }}
                  >
                    <source src={moduleData.video.url} type="video/mp4" />
                    <div className="absolute inset-0 flex items-center justify-center text-white">
                      <div className="text-center">
                        <div className="text-6xl mb-4">🎬</div>
                        <p className="text-xl">Video content would play here</p>
                        <p className="text-gray-400 mt-2">Demo video placeholder</p>
                      </div>
                    </div>
                  </video>

                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <div className="w-full bg-gray-600 h-2 rounded-full mb-4 cursor-pointer" onClick={handleSeek}>
                      <div className="bg-cyan-500 h-2 rounded-full transition-all" style={{ width: `${progress}%` }} />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <button onClick={togglePlay} className="w-10 h-10 bg-cyan-500 rounded-full flex items-center justify-center hover:bg-cyan-400 transition-colors">
                          {isPlaying ? <Pause className="w-5 h-5 text-white" /> : <Play className="w-5 h-5 text-white ml-0.5" />}
                        </button>

                        <button onClick={() => setIsMuted(!isMuted)} className="text-gray-300 hover:text-white transition-colors">
                          {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                        </button>

                        <div className="text-gray-300 text-sm">{formatTime(currentTime)} / {moduleData.video.duration}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2">Video Lesson</h2>
                    <p className="text-gray-400">Watch this video to understand the core concepts of threat detection fundamentals.</p>
                  </div>
                  <div className="text-sm text-gray-300">Duration: {moduleData.video.duration}</div>
                </div>
              </Card>

              <Card className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50">
                <h3 className="text-xl font-semibold text-white mb-4">Transcript</h3>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {moduleData.video.transcript.split('\n').map((line, index) => {
                    const [timestamp, ...textParts] = line.split(' - ')
                    const text = textParts.join(' - ')
                    return (
                      <div key={index} className="flex gap-4 p-3 rounded-lg hover:bg-gray-700/30 transition-colors">
                        <span className="text-cyan-400 text-sm font-mono flex-shrink-0">{timestamp}</span>
                        <p className="text-gray-300 flex-1">{text}</p>
                      </div>
                    )
                  })}
                </div>
              </Card>
            </motion.div>
          </div>

          <div className="lg:w-1/3 flex-shrink-0">
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
              <Card className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50">
                <h3 className="text-lg font-semibold text-white mb-4">Video Progress</h3>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white mb-1">{Math.round(progress)}%</div>
                    <div className="text-gray-400 text-sm">{formatTime(currentTime)} watched</div>
                  </div>

                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
                  </div>

                  {hasCompleted && (
                    <div className="text-center p-3 bg-green-500/20 border border-green-500/30 rounded-lg">
                      <CheckCircle className="w-6 h-6 text-green-400 mx-auto mb-2" />
                      <div className="text-green-400 font-medium">Video Completed</div>
                    </div>
                  )}
                </div>
              </Card>

              <Card className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50">
                <h3 className="text-lg font-semibold text-white mb-4">Continue Learning</h3>
                <div className="space-y-2">
                  <Button variant="secondary" className="w-full justify-start" onClick={() => navigate(`/courses/${courseId}/modules/${moduleId}/content`)}>
                    Read Content Lesson
                  </Button>
                  <Button variant="secondary" className="w-full justify-start" onClick={goBack}>
                    Back to Module List
                  </Button>
                </div>
              </Card>

              <Card className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50">
                <h3 className="text-lg font-semibold text-white mb-4">Tips</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-start gap-2"><div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0" /><span>Take notes on key concepts</span></li>
                  <li className="flex items-start gap-2"><div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0" /><span>Pause and replay complex sections</span></li>
                  <li className="flex items-start gap-2"><div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0" /><span>Use transcript for quick reference</span></li>
                </ul>
              </Card>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  )
}
