import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search, 
  Bell, 
  Users, 
  Trophy, 
  MessageCircle, 
  ThumbsUp, 
  Share2, 
  Bookmark,
  TrendingUp,
  Award,
  Calendar,
  Clock
} from 'lucide-react'
import Sidebar from '../components/layout/Sidebar'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'

export default function Community() {
  const [posts, setPosts] = useState([])
  const [text, setText] = useState('')
  const [activeTab, setActiveTab] = useState('all')
  const [studyGroups, setStudyGroups] = useState([])
  const [leaderboard, setLeaderboard] = useState([])
  const [notifications, setNotifications] = useState([])
  const [stats, setStats] = useState(null)
  const [showNotificationPanel, setShowNotificationPanel] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    // Enhanced demo data
    setPosts([
      { 
        id: 1, 
        user: 'Jane Cooper', 
        role: 'Security Analyst',
        avatar: '👩‍💻',
        text: 'New vulnerability in Windows Server – anyone has resources for mitigation? Found this CVE-2024-12345 that looks critical. Working on a write-up for the techniques used.', 
        votes: 12,
        comments: 8,
        time: '2 hours ago',
        tags: ['vulnerability', 'windows', 'resources', 'CVE'],
        type: 'question',
        userScore: 2450,
        isVerified: true
      },
      { 
        id: 2, 
        user: 'Mike Chen', 
        role: 'CEH Candidate',
        avatar: '👨‍💻',
        text: 'Study Group for CEH exam prep — we meet every Wednesday at 7 PM EST. Focus on module 3 this week! We\'ll be covering network scanning techniques and tools.', 
        votes: 23,
        comments: 15,
        time: '5 hours ago',
        tags: ['study-group', 'ceh', 'exam-prep', 'networking'],
        type: 'announcement',
        userScore: 1870,
        isVerified: false
      },
      { 
        id: 3, 
        user: 'Sarah Johnson', 
        role: 'Senior Pentester',
        avatar: '👩‍🎓',
        text: 'Just completed the Advanced Penetration Testing module! The buffer overflow lab was challenging but super rewarding. Anyone else working on it? Would love to discuss the exploitation techniques!', 
        votes: 45,
        comments: 22,
        time: '1 day ago',
        tags: ['achievement', 'pentesting', 'labs', 'buffer-overflow'],
        type: 'achievement',
        userScore: 3240,
        isVerified: true
      }
    ])

    setStudyGroups([
      {
        id: 1,
        name: 'CEH Certification Prep',
        members: 24,
        active: true,
        lastActivity: '2 hours ago',
        nextMeeting: 'Tomorrow, 7 PM EST',
        category: 'Certification',
        progress: 65
      },
      {
        id: 2,
        name: 'Network Defense Study',
        members: 18,
        active: true,
        lastActivity: '5 hours ago',
        nextMeeting: 'Friday, 6 PM EST',
        category: 'Networking',
        progress: 42
      },
      {
        id: 3,
        name: 'Web App Security',
        members: 32,
        active: false,
        lastActivity: '2 days ago',
        nextMeeting: 'Next week',
        category: 'Web Security',
        progress: 78
      }
    ])

    setLeaderboard([
      { id: 1, name: 'Sarah Johnson', role: 'Senior Pentester', points: 1245, avatar: '👩‍🎓', change: '+2', trend: 'up' },
      { id: 2, name: 'TechDefender', role: 'Bug Bounty Hunter', points: 1187, avatar: '🦸‍♂️', change: '+1', trend: 'up' },
      { id: 3, name: 'Mike Chen', role: 'CEH Candidate', points: 976, avatar: '👨‍💻', change: '+3', trend: 'up' },
      { id: 4, name: 'Jane Cooper', role: 'Security Analyst', points: 845, avatar: '👩‍💻', change: '-1', trend: 'down' },
      { id: 5, name: 'Alex Rivera', role: 'SOC Analyst', points: 789, avatar: '👨‍🔬', change: '+2', trend: 'up' }
    ])

    setNotifications([
      { id: 1, text: 'Mike replied to your post about network security', time: '10 min ago', read: false, type: 'reply' },
      { id: 2, text: 'Your post got 5 upvotes from the community', time: '1 hour ago', read: false, type: 'upvote' },
      { id: 3, text: 'New study group created for Cloud Security', time: '3 hours ago', read: true, type: 'announcement' }
    ])

    setStats({
      communityRank: 42,
      postsMade: 15,
      helpfulVotes: 89,
      groupsJoined: 3,
      reputation: 245
    })
  }, [])

  const createPost = async () => {
    if (!text.trim()) return
    
    const temp = { 
      id: Date.now(), 
      user: 'You', 
      role: 'Member',
      avatar: '👤',
      text, 
      votes: 0,
      comments: 0,
      time: 'Just now',
      tags: [],
      type: 'discussion',
      userScore: stats?.reputation || 0,
      isVerified: false
    }
    
    setPosts((p) => [temp, ...p])
    setText('')
  }

  const upvote = async (id) => {
    setPosts((p) => p.map(x => x.id === id ? {...x, votes: x.votes + 1 } : x))
  }

  const filteredPosts = posts.filter(post => {
    if (activeTab === 'all') return true
    return post.type === activeTab
  })

  const unreadNotifications = notifications.filter(n => !n.read).length

  const postTypes = [
    { id: 'all', label: 'All Posts', icon: '💬', color: 'from-blue-500 to-cyan-500' },
    { id: 'question', label: 'Questions', icon: '❓', color: 'from-green-500 to-emerald-500' },
    { id: 'announcement', label: 'Announcements', icon: '📢', color: 'from-purple-500 to-pink-500' },
    { id: 'achievement', label: 'Achievements', icon: '🏆', color: 'from-yellow-500 to-orange-500' }
  ]

  const communityStats = [
    { label: 'Community Rank', value: `#${stats?.communityRank || 42}`, icon: Trophy, color: 'from-cyan-500 to-blue-500' },
    { label: 'Posts Made', value: stats?.postsMade || 15, icon: MessageCircle, color: 'from-green-500 to-emerald-500' },
    { label: 'Helpful Votes', value: stats?.helpfulVotes || 89, icon: ThumbsUp, color: 'from-yellow-500 to-orange-500' },
    { label: 'Reputation', value: stats?.reputation || 245, icon: TrendingUp, color: 'from-purple-500 to-pink-500' }
  ]

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
                Cybersecurity Community
              </motion.h1>
              <motion.p 
                className="text-gray-400 text-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Connect, learn, and grow with fellow cybersecurity enthusiasts
              </motion.p>
            </div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-4"
            >
              {/* Search */}
              <div className="flex-1 max-w-md">
                <Input
                  icon="🔍"
                  placeholder="Search discussions, users, topics..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Notifications */}
              <div className="relative">
                <Button
                  variant="ghost"
                  icon="🔔"
                  onClick={() => setShowNotificationPanel(!showNotificationPanel)}
                  className="relative"
                >
                  {unreadNotifications > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {unreadNotifications}
                    </span>
                  )}
                </Button>

                {/* Notification Panel */}
                <AnimatePresence>
                  {showNotificationPanel && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 top-12 w-80 bg-gray-800/90 backdrop-blur-xl rounded-2xl shadow-xl border border-cyan-500/20 z-50"
                    >
                      <div className="p-4 border-b border-gray-700">
                        <h3 className="font-semibold text-white flex items-center gap-2">
                          <Bell className="w-4 h-4" />
                          Notifications
                        </h3>
                      </div>
                      <div className="max-h-96 overflow-y-auto">
                        {notifications.map(notification => (
                          <motion.div
                            key={notification.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className={`p-4 border-b border-gray-700/50 ${
                              !notification.read ? 'bg-cyan-500/10' : ''
                            }`}
                          >
                            <p className="text-sm text-white">{notification.text}</p>
                            <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                          </motion.div>
                        ))}
                      </div>
                      <div className="p-3 text-center border-t border-gray-700">
                        <button className="text-cyan-400 text-sm hover:text-cyan-300 font-medium">
                          Mark all as read
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Button 
                onClick={() => document.getElementById('post-creator')?.scrollIntoView({ behavior: 'smooth' })}
                icon="📝"
              >
                New Post
              </Button>
            </motion.div>
          </div>

          {/* Community Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          >
            {communityStats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className={`bg-gradient-to-br ${stat.color} rounded-2xl p-6 text-white relative overflow-hidden`}
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
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content - 2/3 width */}
          <div className="lg:col-span-2 space-y-6">
            {/* Post Creation Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              id="post-creator"
            >
              <Card gradient={true}>
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center text-white font-bold text-lg">
                    Y
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-white text-lg">Create a Post</h3>
                    <p className="text-gray-400 text-sm">Share news, ask questions, or celebrate wins with the community</p>
                  </div>
                </div>

                <textarea 
                  className="w-full p-4 border border-gray-600 rounded-xl bg-gray-800/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 resize-none transition-all"
                  rows={4} 
                  placeholder="What's on your mind? Share your cybersecurity insights, questions, or achievements..."
                  value={text}
                  onChange={e => setText(e.target.value)}
                />
                
                <div className="mt-4 flex justify-between items-center">
                  <div className="text-sm text-gray-400 flex items-center gap-2">
                    <span>💡</span>
                    <span>Be respectful — this is a supportive community</span>
                  </div>
                  <Button 
                    onClick={createPost} 
                    disabled={!text.trim()}
                    icon="🚀"
                  >
                    Publish Post
                  </Button>
                </div>
              </Card>
            </motion.div>

            {/* Post Filter Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex overflow-x-auto gap-2 pb-2 scrollbar-hide"
            >
              {postTypes.map((type) => (
                <motion.button
                  key={type.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveTab(type.id)}
                  className={`flex items-center gap-3 px-6 py-3 rounded-xl whitespace-nowrap transition-all ${
                    activeTab === type.id
                      ? `bg-gradient-to-r ${type.color} text-white shadow-lg`
                      : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 hover:text-white'
                  }`}
                >
                  <span className="text-lg">{type.icon}</span>
                  <span className="font-medium">{type.label}</span>
                </motion.button>
              ))}
            </motion.div>

            {/* Posts Feed */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="space-y-6"
            >
              <AnimatePresence>
                {filteredPosts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -2 }}
                    layout
                  >
                    <Card hover={true} gradient={true}>
                      <div className="flex items-start gap-4">
                        {/* User Avatar */}
                        <div className="flex-shrink-0">
                          <div className="relative">
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white text-xl">
                              {post.avatar}
                            </div>
                            {post.isVerified && (
                              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                                <span className="text-white text-xs">✓</span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Post Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-3">
                            <div>
                              <h4 className="font-semibold text-white">{post.user}</h4>
                              <div className="flex items-center gap-2 text-sm text-gray-400">
                                <span>{post.role}</span>
                                <span>•</span>
                                <span>{post.time}</span>
                                <span>•</span>
                                <span className="text-cyan-400">{post.userScore} pts</span>
                              </div>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              post.type === 'question' ? 'bg-blue-500/20 text-blue-400' :
                              post.type === 'announcement' ? 'bg-purple-500/20 text-purple-400' :
                              post.type === 'achievement' ? 'bg-yellow-500/20 text-yellow-400' :
                              'bg-gray-500/20 text-gray-400'
                            }`}>
                              {post.type.charAt(0).toUpperCase() + post.type.slice(1)}
                            </span>
                          </div>

                          <p className="text-gray-300 mb-4 leading-relaxed">{post.text}</p>

                          {/* Tags */}
                          {post.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-4">
                              {post.tags.map((tag, tagIndex) => (
                                <span 
                                  key={tagIndex}
                                  className="px-3 py-1 bg-gray-700/50 text-gray-300 rounded-full text-xs hover:bg-gray-600/50 transition-colors cursor-pointer"
                                >
                                  #{tag}
                                </span>
                              ))}
                            </div>
                          )}

                          {/* Actions */}
                          <div className="flex items-center gap-6 text-sm text-gray-400">
                            <motion.button 
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => upvote(post.id)}
                              className="flex items-center gap-2 hover:text-cyan-400 transition-colors group"
                            >
                              <div className="w-8 h-8 rounded-lg bg-gray-700/50 flex items-center justify-center group-hover:bg-cyan-500/20 transition-colors">
                                <ThumbsUp className="w-4 h-4" />
                              </div>
                              <span>{post.votes} votes</span>
                            </motion.button>
                            
                            <button className="flex items-center gap-2 hover:text-cyan-400 transition-colors group">
                              <div className="w-8 h-8 rounded-lg bg-gray-700/50 flex items-center justify-center group-hover:bg-cyan-500/20 transition-colors">
                                <MessageCircle className="w-4 h-4" />
                              </div>
                              <span>{post.comments} comments</span>
                            </button>
                            
                            <button className="flex items-center gap-2 hover:text-cyan-400 transition-colors group">
                              <div className="w-8 h-8 rounded-lg bg-gray-700/50 flex items-center justify-center group-hover:bg-cyan-500/20 transition-colors">
                                <Share2 className="w-4 h-4" />
                              </div>
                              <span>Share</span>
                            </button>
                            
                            <button className="flex items-center gap-2 hover:text-cyan-400 transition-colors group">
                              <div className="w-8 h-8 rounded-lg bg-gray-700/50 flex items-center justify-center group-hover:bg-cyan-500/20 transition-colors">
                                <Bookmark className="w-4 h-4" />
                              </div>
                              <span>Save</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>

              {filteredPosts.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-16"
                >
                  <div className="text-6xl mb-4">💬</div>
                  <h3 className="text-2xl font-semibold text-gray-300 mb-4">
                    No posts found
                  </h3>
                  <p className="text-gray-400 mb-6 max-w-md mx-auto">
                    Try selecting a different category or be the first to post in this category!
                  </p>
                  <Button
                    onClick={() => setActiveTab('all')}
                    variant="secondary"
                    icon="🔄"
                  >
                    Show All Posts
                  </Button>
                </motion.div>
              )}

              {/* Load More */}
              <div className="text-center">
                <Button variant="ghost" icon="📚">
                  Load More Posts
                </Button>
              </div>
            </motion.div>
          </div>

          {/* Sidebar - 1/3 width */}
          <div className="space-y-6">
            {/* Study Groups Panel */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card gradient={true}>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-bold text-white text-lg flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Study Groups
                  </h3>
                  <Button variant="ghost" size="sm" icon="➕">
                    Join More
                  </Button>
                </div>

                <div className="space-y-4">
                  {studyGroups.map((group, index) => (
                    <motion.div
                      key={group.id}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      whileHover={{ x: 4 }}
                      className={`p-4 rounded-xl border transition-all cursor-pointer ${
                        group.active 
                          ? 'border-cyan-500/30 bg-cyan-500/10' 
                          : 'border-gray-700 bg-gray-800/30'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="font-semibold text-white text-sm">{group.name}</h4>
                        {group.active && (
                          <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-medium">
                            Active
                          </span>
                        )}
                      </div>
                      
                      <div className="space-y-2 text-sm text-gray-300">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          <span>{group.members} members</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span>Last: {group.lastActivity}</span>
                        </div>
                        {group.nextMeeting && (
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>Next: {group.nextMeeting}</span>
                          </div>
                        )}
                      </div>

                      {/* Progress Bar */}
                      <div className="mt-3">
                        <div className="flex justify-between text-xs text-gray-400 mb-1">
                          <span>Group Progress</span>
                          <span>{group.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div 
                            className="h-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-500"
                            style={{ width: `${group.progress}%` }}
                          />
                        </div>
                      </div>

                      <Button variant="ghost" size="sm" className="w-full mt-3">
                        View Group
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Leaderboard Panel */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card gradient={true}>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-bold text-white text-lg flex items-center gap-2">
                    <Trophy className="w-5 h-5" />
                    Top Contributors
                  </h3>
                  <span className="text-sm text-gray-400">This Week</span>
                </div>

                <div className="space-y-3">
                  {leaderboard.map((user, index) => (
                    <motion.div
                      key={user.id}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      whileHover={{ x: 4 }}
                      className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-700/30 transition-colors group"
                    >
                      {/* Rank */}
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${
                        index === 0 ? 'bg-yellow-500/20 text-yellow-400' :
                        index === 1 ? 'bg-gray-500/20 text-gray-400' :
                        index === 2 ? 'bg-orange-500/20 text-orange-400' :
                        'bg-gray-700/50 text-gray-400'
                      }`}>
                        #{index + 1}
                      </div>

                      {/* User Info */}
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div className="text-xl">{user.avatar}</div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-white text-sm truncate">
                            {user.name}
                          </div>
                          <div className="text-xs text-gray-400 truncate">
                            {user.role}
                          </div>
                        </div>
                      </div>

                      {/* Points */}
                      <div className="text-right">
                        <div className="font-semibold text-cyan-400 text-sm">
                          {user.points} pts
                        </div>
                        <div className={`text-xs ${
                          user.trend === 'up' ? 'text-green-400' : 'text-red-400'
                        }`}>
                          {user.change}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* User Ranking */}
                <div className="mt-6 pt-4 border-t border-gray-700 text-center">
                  <div className="text-sm text-gray-300 mb-2">Your Ranking</div>
                  <div className="text-2xl font-bold text-cyan-400">#{stats?.communityRank || 42}</div>
                  <div className="text-xs text-gray-400 mt-1">
                    {stats?.helpfulVotes || 89} helpful votes this month
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Card gradient={true} className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border-cyan-500/20">
                <h4 className="font-bold text-white text-lg mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  Get Involved
                </h4>
                <p className="text-cyan-100 mb-6 text-sm">
                  Help others, share knowledge, and grow together as a cybersecurity community
                </p>
                <div className="space-y-3">
                  <Button 
                    variant="secondary" 
                    className="w-full justify-start"
                    icon="🎯"
                  >
                    Become a Mentor
                  </Button>
                  <Button 
                    variant="secondary" 
                    className="w-full justify-start"
                    icon="📅"
                  >
                    Host a Session
                  </Button>
                  <Button 
                    variant="secondary" 
                    className="w-full justify-start"
                    icon="💡"
                  >
                    Share Resources
                  </Button>
                </div>
              </Card>
            </motion.div>

            {/* Upcoming Events */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
            >
              <Card gradient={true}>
                <h4 className="font-bold text-white text-lg mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Upcoming Events
                </h4>
                <div className="space-y-3">
                  {[
                    { title: 'CTF Competition', date: 'Tomorrow', participants: 45 },
                    { title: 'Guest Speaker: Cloud Security', date: 'Friday', participants: 28 },
                    { title: 'Code Review Session', date: 'Next Week', participants: 32 }
                  ].map((event, index) => (
                    <div key={index} className="p-3 bg-gray-700/30 rounded-lg border border-gray-600/50">
                      <div className="font-medium text-white text-sm">{event.title}</div>
                      <div className="flex justify-between items-center mt-2 text-xs text-gray-400">
                        <span>📅 {event.date}</span>
                        <span>👥 {event.participants}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  )
}