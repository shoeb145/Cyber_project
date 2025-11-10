import React from 'react'
import { motion } from 'framer-motion'
import clsx from 'clsx'

export default function Input({ 
  label, 
  error,
  success,
  icon,
<<<<<<< HEAD
  endAdornment, // ✅ keep this here
  className = '',
  ...inputProps // ✅ all remaining props go to <input>
=======
  className = '',
  ...props 
>>>>>>> 6033a22ffa8694aa25dc2a407ae3fcb88c4c400d
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="block w-full"
    >
<<<<<<< HEAD
      {/* Label */}
=======
>>>>>>> 6033a22ffa8694aa25dc2a407ae3fcb88c4c400d
      {label && (
        <motion.label 
          className="block mb-3 text-sm font-medium text-gray-300"
          whileFocus={{ color: "#22d3ee" }}
        >
          {label}
        </motion.label>
      )}
      
<<<<<<< HEAD
      {/* Input wrapper */}
      <div className="relative flex items-center">
        {/* Left icon */}
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}

        {/* ✅ Make sure NOT to spread endAdornment into <motion.input> */}
=======
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}
        
>>>>>>> 6033a22ffa8694aa25dc2a407ae3fcb88c4c400d
        <motion.input
          whileFocus={{ 
            scale: 1.02,
            borderColor: "#22d3ee"
          }}
          className={clsx(
            'w-full px-4 py-3 rounded-xl border-2 bg-gray-800/50 backdrop-blur-sm',
            'text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50',
            'transition-all duration-300',
            icon && 'pl-10',
<<<<<<< HEAD
            endAdornment && 'pr-10',
=======
>>>>>>> 6033a22ffa8694aa25dc2a407ae3fcb88c4c400d
            error 
              ? 'border-red-500/50 focus:border-red-500' 
              : success 
                ? 'border-green-500/50 focus:border-green-500'
                : 'border-gray-600/50 focus:border-cyan-500',
            className
          )}
<<<<<<< HEAD
          {...inputProps} // ✅ this is safe now
        />

        {/* Right-side adornment */}
        {endAdornment && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center text-gray-400">
            {endAdornment}
          </div>
        )}
      </div>
      
      {/* Error message */}
=======
          {...props}
        />
      </div>
      
>>>>>>> 6033a22ffa8694aa25dc2a407ae3fcb88c4c400d
      {error && (
        <motion.p 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-2 text-sm text-red-400"
        >
          {error}
        </motion.p>
      )}
    </motion.div>
  )
<<<<<<< HEAD
}
=======
}
>>>>>>> 6033a22ffa8694aa25dc2a407ae3fcb88c4c400d
