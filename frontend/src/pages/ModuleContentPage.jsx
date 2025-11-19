// ModuleContentPage.jsx - Fixed version with complete markdownComponents
import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Check, CheckCircle, Download, FileText, X } from 'lucide-react'
import Sidebar from '../components/layout/Sidebar'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import axios from 'axios'
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import courseService from '../services/courseService'
import { useAuthStore } from '../store/useAuthStore'
import toast from 'react-hot-toast'

export default function ModuleContentPage({ user }) {
  const { courseId, moduleId } = useParams()
  const navigate = useNavigate()
  const [completedLessons, setCompletedLessons] = useState([])
  const [course, setCourse] = useState(null)
  const [allModules, setAllModules] = useState([])
  const [currentModule, setCurrentModule] = useState(null)
  const [lessons, setLessons] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showCompletionModal, setShowCompletionModal] = useState(false)
  const [isFinalModule, setIsFinalModule] = useState(false)

  const authUser = useAuthStore((s) => s.user)
  const userId = authUser?._id || authUser?.id || null

  useEffect(() => {
    fetchCurrentModuleData()
    fetchAllModules()
  }, [moduleId, courseId])

  const fetchCurrentModuleData = async () => {
    try {
      setLoading(true)
      const response = await axios.get(
        `http://localhost:5001/api/lesson/${moduleId}/lessons`,
        { withCredentials: true }
      )
      setCurrentModule(response.data.module)
      setLessons(response.data.lessons)
    } catch (error) {
      console.error("Error fetching lessons:", error)
    } finally {
      setLoading(false)
    }
  }

  const fetchAllModules = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5001/api/module/${courseId}/modules`,
        { withCredentials: true }
      )
      const modules = response.data.modules || []
      setAllModules(modules)
      
      // Check if current module is the last one
      const currentIndex = modules.findIndex(m => m._id === moduleId)
      setIsFinalModule(currentIndex === modules.length - 1)
    } catch (error) {
      console.error("Error fetching all modules:", error)
    }
  }

  const toggleLessonComplete = (lessonId) => {
    setCompletedLessons(prev =>
      prev.includes(lessonId)
        ? prev.filter(id => id !== lessonId)
        : [...prev, lessonId]
    )
  }

  const downloadResource = (resource) => {
    console.log('Downloading:', resource.name)
  }

  const goBack = () => {
    navigate(`/courses/${courseId}`)
  }

  // Enhanced mark as complete with navigation
  const markLessonComplete = async (lesson) => {
    try {
      await courseService.completeLesson({
        userId: user._id,
        courseId,
        moduleId,
        lessonId: lesson._id || lesson.id,
      })
      
      setCompletedLessons(prev => (prev.includes(lesson._id || lesson.id) ? prev : [...prev, lesson._id || lesson.id]))
      toast.success('Lesson marked complete')

      // Navigate to next module or show completion modal
      const currentIndex = allModules.findIndex(m => m._id === moduleId)
      
      if (currentIndex < allModules.length - 1) {
        // Navigate to next module
        const nextModule = allModules[currentIndex + 1]
        navigate(`/courses/${courseId}/${nextModule._id}/learn`)
      } else {
        // Show completion modal for final module
        setShowCompletionModal(true)
      }
    } catch (err) {
      console.error('completeLesson error', err)
      const message = err?.response?.data?.message || err.message || 'Could not mark lesson complete'
      toast.error(String(message))
    }
  }

  const handleModalClose = () => {
    setShowCompletionModal(false)
    navigate(`/courses/${courseId}`) // Return to module page
  }

  // Complete markdownComponents object
  const markdownComponents = {
    h1: ({ node, ...props }) => (
      <div className="relative mb-8 mt-12 first:mt-0">
        <div className="absolute -left-8 top-0 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
        <h1
          className="text-4xl font-bold text-left text-white pb-4 border-b border-gray-700"
          {...props}
        />
      </div>
    ),
    h2: ({ node, ...props }) => (
      <div className="relative mb-6 mt-10">
        <div className="absolute -left-6 top-1 w-1 h-8 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full"></div>
        <h2 className="text-3xl text-left font-bold text-white" {...props} />
      </div>
    ),
    h3: ({ node, ...props }) => (
      <h3
        className="text-2xl  text-left font-semibold text-white mb-4 mt-2"
        {...props}
      />
    ),
    h4: ({ node, ...props }) => (
      <h4
        className="text-xl  font-semibold text-gray-200 mb-3 mt-6"
        {...props}
      />
    ),
    p: ({ node, ...props }) => (
      <p
        className="text-gray-300 text-left leading-relaxed mb-6 text-lg font-serif"
        {...props}
      />
    ),
    ul: ({ node, ...props }) => (
      <ul className="space-y-3 mb-6 text-gray-300" {...props} />
    ),
    ol: ({ node, ...props }) => (
      <ol className="space-y-3 mb-6 text-gray-300" {...props} />
    ),
    li: ({ node, children, ...props }) => (
      <li
        className="ml-6 pl-2 text-left relative before:content-[''] before:absolute before:-left-6 before:top-[0.7em] before:w-2 before:h-2 before:bg-blue-500 before:rounded-full"
        {...props}
      >
        <span className="text-lg">{children}</span>
      </li>
    ),
    a: ({ node, ...props }) => (
      <a
        className="relative text-blue-400 hover:text-blue-300 transition-colors font-medium no-underline after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-gradient-to-r after:from-blue-500 after:to-purple-500 after:opacity-50 hover:after:opacity-100 after:transition-opacity"
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      />
    ),
    img: ({ node, ...props }) => (
      <div className="my-8 group">
        <div className="relative overflow-hidden rounded-2xl border border-gray-700 shadow-2xl hover:border-blue-500/50 transition-all">
          <img className="w-full h-auto" loading="lazy" {...props} />
        </div>
        {props.alt && (
          <p className="text-center text-sm text-gray-500 mt-3 italic">
            {props.alt}
          </p>
        )}
      </div>
    ),
    code: ({ node, inline, className, children, ...props }) => {
      const match = /language-(\w+)/.exec(className || "");
      const code = String(children).replace(/\n$/, "");
      return !inline && match ? (
        <div className="relative my-6 group">
          <div className="absolute top-4 right-4 z-10">
            <button
              onClick={() => navigator.clipboard.writeText(code)}
              className="px-3 py-1.5 bg-gray-800/80 hover:bg-gray-700 border border-gray-600 rounded-lg text-xs text-gray-300 backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 flex items-center gap-2"
            >
              Copy
            </button>
          </div>
          <div className="rounded-2xl overflow-hidden border border-gray-700 shadow-2xl">
            <div className="flex items-center justify-between px-5 py-3 bg-[#0d1117] border-b border-gray-800">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                {match[1]}
              </span>
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
              </div>
            </div>
            <SyntaxHighlighter
              style={vscDarkPlus}
              language={match[1]}
              PreTag="div"
              customStyle={{
                margin: 0,
                padding: "1.5rem",
                background: "#0d1117",
                fontSize: "0.95rem",
                lineHeight: "1.6",
              }}
              showLineNumbers={code.split("\n").length > 3}
              {...props}
            >
              {code}
            </SyntaxHighlighter>
          </div>
        </div>
      ) : (
        <div className='overflow-x-auto overflow-y-hidden scrollbar-hide-desktop '>
          <code
            className="px-2 py-1 bg-gray-800/70 text-blue-400 rounded-md text-sm font-mono border border-gray-700 whitespace-nowrap"
            {...props}
          >
            {children}
          </code>
        </div>
      );
    },
    blockquote: ({ node, ...props }) => (
      <blockquote className="relative border-l-4 border-blue-500 pl-6 py-4 my-6 bg-gradient-to-r from-blue-500/10 to-transparent rounded-r-xl">
        <div className="absolute top-3 left-3 text-blue-500/30 text-6xl leading-none">
          "
        </div>
        <div
          className="relative text-gray-300 italic text-lg pl-6"
          {...props}
        />
      </blockquote>
    ),
    table: ({ node, ...props }) => (
      <div className="my-8 overflow-hidden rounded-2xl border border-gray-700 shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full" {...props} />
        </div>
      </div>
    ),
    thead: ({ node, ...props }) => (
      <thead
        className="bg-gradient-to-r from-gray-800 to-gray-800/50"
        {...props}
      />
    ),
    tbody: ({ node, ...props }) => (
      <tbody className="divide-y divide-gray-800" {...props} />
    ),
    tr: ({ node, ...props }) => (
      <tr className="hover:bg-gray-800/30 transition-colors" {...props} />
    ),
    th: ({ node, ...props }) => (
      <th
        className="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider"
        {...props}
      />
    ),
    td: ({ node, ...props }) => (
      <td className="px-6 py-4 text-gray-300" {...props} />
    ),
    hr: ({ node, ...props }) => (
      <div className="my-12">
        <div className="h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent"></div>
      </div>
    ),
    strong: ({ node, ...props }) => (
      <strong className="font-bold text-white" {...props} />
    ),
    em: ({ node, ...props }) => (
      <em className="italic text-blue-300" {...props} />
    ),
    del: ({ node, ...props }) => (
      <del className="text-gray-500 line-through" {...props} />
    ),
  }

  // Module Navigation Sidebar Component
  const ModuleNavigationSidebar = () => (
    <div className="sticky top-24 max-h-[calc(100vh-6rem)] overflow-y-auto">
      <Card className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50">
        <h3 className="text-lg font-semibold text-white mb-4">Course Modules</h3>
        <div className="space-y-2">
          {allModules.map((module, index) => {
            const isCompleted = module.completion?.content && module.completion?.video && module.completion?.lab
            const isActive = module._id === moduleId
            
            return (
              <button
                key={module._id}
                onClick={() => navigate(`/courses/${courseId}/${module._id}/learn`)}
                className={`w-full text-left p-3 rounded-lg transition-all ${
                  isActive 
                    ? 'bg-cyan-500/20 border border-cyan-500/30 text-white' 
                    : 'hover:bg-gray-700/50 text-gray-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                      isActive ? 'bg-cyan-500 text-white' : 'bg-gray-600 text-gray-300'
                    }`}>
                      {index + 1}
                    </div>
                    <span className="truncate flex-1">{module.title}</span>
                  </div>
                  {isCompleted && (
                    <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                  )}
                </div>
              </button>
            )
          })}
        </div>
      </Card>
    </div>
  )

  // Course Completion Modal
  const CourseCompletionModal = () => (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gray-800 rounded-2xl border border-gray-700 max-w-md w-full p-6"
      >
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-white" />
          </div>
          
          <h3 className="text-2xl font-bold text-white mb-2">
            Congratulations! 🎉
          </h3>
          
          <p className="text-gray-300 mb-2">
            You've successfully completed the course
          </p>
          
          {course && (
            <p className="text-cyan-400 font-semibold mb-6">
              {course.title}
            </p>
          )}
          
          <div className="flex flex-col gap-3">
            <Button
              onClick={handleModalClose}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
            >
              Back to Course Page
            </Button>
            
            <Button
              variant="secondary"
              className="w-full"
              onClick={() => {
                // Add certificate functionality here
                toast.success('Certificate feature coming soon!')
              }}
            >
              View Certificate
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  )

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <main className="flex-1 p-6 pt-[70px] md:pt-6 md:mx-16 overflow-auto scrollbar-hide-desktop overflow-y-hidden">
        {/* Header with Back Button */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Button
            variant="secondary"
            icon={<ArrowLeft className="w-4 h-4" />}
            onClick={goBack}
            className="mb-4"
          >
            Back to Modules
          </Button>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Module Navigation Sidebar */}
          <div className="lg:w-1/4">
            <ModuleNavigationSidebar />
          </div>

          {/* Main Content */}
          <div className="flex-1 lg:w-3/4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {lessons && lessons.markdownContent ? (
                <div className="space-y-16 rounded-lg border border-gray-700 p-9">
                  <div
                    key={lessons._id}
                    id={`lesson-${lessons._id}`}
                    className="scroll-mt-24 border-gray-700"
                  >
                    <div className="mb-8">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                          <span className="text-white font-bold text-lg">
                            {lessons.order}
                          </span>
                        </div>
                        <div>
                          <h2 className="text-3xl font-bold text-white">
                            {lessons.title}
                          </h2>
                          <p className="text-sm text-gray-500">
                            ~
                            {Math.ceil(
                              lessons.markdownContent.split(" ").length / 200
                            )}{" "}
                            min read
                          </p>
                        </div>
                      </div>
                      <div className="h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-transparent rounded-full"></div>
                    </div>

                    <div className="prose prose-invert prose-blue prose-lg max-w-none border-gray-700">
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={markdownComponents}
                      >
                        {lessons.markdownContent}
                      </ReactMarkdown>
                    </div>

                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-8 flex justify-end"
                    >
                      <Button
                        variant="primary"
                        icon={<Check className="w-4 h-4" />}
                        onClick={() => markLessonComplete(lessons)}
                        className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                      >
                        Mark as Complete
                      </Button>
                    </motion.div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 bg-[#141d2b] rounded-2xl border border-gray-700">
                  <p className="text-gray-400">
                    No lessons in this module yet
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        </div>

        {/* Course Completion Modal */}
        {showCompletionModal && <CourseCompletionModal />}
      </main>
    </div>
  )
}