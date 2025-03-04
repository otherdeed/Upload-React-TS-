import type React from 'react'

type Props = {
    children: React.ReactNode
}

export const Layout = ({children}: Props) => {
  return (
    <div className='bg-gray-500 flex items-center justify-center h-screen font-inter'>
        {children}
    </div>
  )
}