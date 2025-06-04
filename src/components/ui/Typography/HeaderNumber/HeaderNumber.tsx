import React from 'react'

interface HeaderNumberProps {
  tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  number: string | number
  children: React.ReactNode
  className?: string
}

export const HeaderNumber = ({ tag, number, children, className = '' }: HeaderNumberProps) => {
  const baseClasses = "my-6 text-2xl flex items-center"
  const combinedClasses = `${baseClasses} ${className}`

  return React.createElement(
    tag,
    { className: combinedClasses },
    <span className="
      font-bold flex h-6 leading-6 px-3.5 text-white relative ml-2 mr-4
      before:content-[''] before:absolute before:left-0 before:top-0 
      before:bg-orange-500 before:w-full before:h-full before:ml-0 
      before:-z-10 before:-skew-x-[30deg]
    ">
      {number}
    </span>,
    <strong>{children}</strong>
  )
}
